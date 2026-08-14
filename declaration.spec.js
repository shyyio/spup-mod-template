// A mod's own tests run with plain `node --test` — no game engine involved, because a declaration
// is data. Test the decisions you care about keeping: ids, recipes, geometry.

import {test} from "node:test";
import assert from "node:assert/strict";
import {TemplateDeclaration} from "./declaration.js";
import {ITEM_TYPE_PEBBLE} from "./common/constants.js";

test("the mod declares its collector and its item", () => {
    const declaration = new TemplateDeclaration();

    assert.equal(declaration.name, "Template");
    assert.deepEqual(declaration.objectTypes.map(type => type.name), ["PebbleCollector"]);
    assert.equal(declaration.items[ITEM_TYPE_PEBBLE].name, "Pebble");
});
