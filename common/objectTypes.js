import {
    ObjectType,
    PortDefinition,
    PlacementRule,
    GeneratorBehavior,
    Direction,
} from "@spup/sdk";
import {ITEM_TYPE_PEBBLE, GENERATOR_TICKS} from "./constants.js";

/**
 * A machine players can build: it takes nothing in and pushes a pebble out of its top side, where a
 * belt or a pipe can pick it up.
 *
 * toolId       its place in the toolbar; any number, unique inside this mod.
 * geometry     how many tiles it covers: "1x1", "1x2", "2x2", "3x3".
 * textureName  a sprite from sprites.png, under the name sprites.json gives it.
 * behavior     what it actually does. GeneratorBehavior makes an item out of nothing;
 *              MachineBehavior turns input items into output ones; ExtractorBehavior digs up the
 *              tile it stands on.
 */
export const PebbleGeneratorType = new ObjectType({
    name: "PebbleGenerator",
    toolId: 1,
    // One tile above the machine, pointing away from it. Positions are relative to the machine.
    outputPorts: [new PortDefinition("out", {x: 0, y: -1, direction: Direction.UP})],
    geometry: "1x1",
    renderConnections: true,
    textureName: "generator/0",
    label: "Pebble Generator",
    inspectable: true,
    // Building one on top of another replaces it, instead of being refused.
    placement: new PlacementRule({replaceSameKind: true}),
    behavior: new GeneratorBehavior({
        processingTicks: GENERATOR_TICKS,
        output: ITEM_TYPE_PEBBLE,
    }),
});
