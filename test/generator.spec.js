// Tests run the actual game: build the machine, let time pass, see what came out. No browser is
// involved, so anything drawn on screen (client.js) is tested by playing it, not here.

import {test} from "node:test";
import assert from "node:assert/strict";
import {makeGameEngine, ModPackage, CreateObjectMessage, Direction} from "@spup/game-server/test";
import {TemplateDeclaration} from "../declaration.js";
import {TemplateSimMod} from "../sim.js";
import {PebbleGeneratorType} from "../common/objectTypes.js";
import {ITEM_TYPE_PEBBLE, GENERATOR_TICKS} from "../common/constants.js";

// One production cycle, plus a few ticks of slack for starting and delivering.
const TICK_BUDGET = GENERATOR_TICKS + 4;

/**
 * @returns {Promise<GameEngine>} a world with the base game and this mod in it
 */
async function gameWithMod() {
    return await makeGameEngine([new ModPackage(new TemplateDeclaration(), {sim: new TemplateSimMod()})]);
}

test("a generator fills its output with a pebble", async () => {
    const game = await gameWithMod();

    game.applyMessage(new CreateObjectMessage(PebbleGeneratorType.typeId, 5, 5, Direction.UP));
    const [built] = game.placed.eidsOf(PebbleGeneratorType.typeId);
    const machines = game.component("Generator");
    const output = machines.store.out[machines.row(built)];

    let delivered = false;
    for (let tick = 0; tick < TICK_BUDGET && !delivered; tick += 1) {
        game.tickAll();
        delivered = game.portItem(output) === ITEM_TYPE_PEBBLE;
    }

    assert.ok(delivered, `a pebble arrived within ${TICK_BUDGET} ticks`);
});

test("a generator takes the time it is configured to take", async () => {
    const game = await gameWithMod();

    game.applyMessage(new CreateObjectMessage(PebbleGeneratorType.typeId, 2, 2, Direction.UP));
    const [built] = game.placed.eidsOf(PebbleGeneratorType.typeId);
    const machines = game.component("Generator");
    const output = machines.store.out[machines.row(built)];

    let ticks = 0;
    while (game.portItem(output) !== ITEM_TYPE_PEBBLE && ticks < TICK_BUDGET) {
        game.tickAll();
        ticks += 1;
    }

    assert.ok(ticks >= GENERATOR_TICKS, `took ${ticks} ticks, at least ${GENERATOR_TICKS} expected`);
});
