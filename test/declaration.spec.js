// Checks the mod says what it means to say: names, ids, what travels between browser and server.

import {test} from "node:test";
import assert from "node:assert/strict";
import {TemplateDeclaration} from "../declaration.js";
import {ITEM_TYPE_PEBBLE} from "../common/constants.js";
import {WorldClockEvent} from "../common/events.js";

test("the mod adds its generator and its item", () => {
    const declaration = new TemplateDeclaration();

    assert.equal(declaration.name, "Template");
    assert.deepEqual(declaration.objectTypes.map(type => type.name), ["PebbleGenerator"]);
    assert.equal(declaration.items[ITEM_TYPE_PEBBLE].name, "Pebble");
});

test("the clock answer can be sent", () => {
    const declaration = new TemplateDeclaration();

    assert.ok(declaration.wireClasses.includes(WorldClockEvent));
    assert.deepEqual(Object.keys(WorldClockEvent.wireFields), ["ticks"]);
});
