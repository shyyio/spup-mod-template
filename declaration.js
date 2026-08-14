import {AbstractModDeclaration, ItemDefinition} from "@/sdk/common.js";
import {CollectorType} from "./common/objectTypes.js";
import {ITEM_TYPE_PEBBLE} from "./common/constants.js";

/**
 * The whole mod, as data: what it is called, what it adds, and what those things are made of. A
 * declaration is pure — no side effects, no engine access — which is why the same file describes
 * the mod to a server, a client, and the registry's checks.
 *
 * Add a sim.js for behavior the ObjectType model cannot express, or a client.js for bespoke
 * rendering and input. Neither is needed for a mod like this one.
 */
export class TemplateDeclaration extends AbstractModDeclaration {

    /**
     * @returns {string}
     */
    get name() {
        return "Template";
    }

    /**
     * @returns {ObjectType[]}
     */
    get objectTypes() {
        return [CollectorType];
    }

    /**
     * Item type -> what it is called and how it draws.
     * @returns {Object.<number, ItemDefinition>}
     */
    get items() {
        return {
            [ITEM_TYPE_PEBBLE]: new ItemDefinition("Pebble", "items/1-gray", 0x9AA0A6),
        };
    }
}
