import {AbstractModDeclaration, ItemDefinition} from "@spup/sdk";
import {PebbleGeneratorType} from "./common/objectTypes.js";
import {ITEM_TYPE_PEBBLE} from "./common/constants.js";
import {WorldClockRequestMessage} from "./common/messages.js";
import {WorldClockEvent} from "./common/events.js";

/**
 * What this mod adds. Data only: no game code runs here, and the server, the browser and the mod
 * registry all read the same file.
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
        return [PebbleGeneratorType];
    }

    /**
     * Anything this mod sends between browser and server has to be listed here, on both sides.
     * @returns {Function[]}
     */
    get wireClasses() {
        return [WorldClockRequestMessage, WorldClockEvent];
    }

    /**
     * Item id to its name, sprite and color.
     * @returns {Object.<number, ItemDefinition>}
     */
    get items() {
        return {
            [ITEM_TYPE_PEBBLE]: new ItemDefinition("Pebble", "items/pebble", 0xFFFFFF),
        };
    }
}
