import {
    ObjectType,
    PortDefinition,
    PlacementRule,
    GeneratorBehavior,
    Direction,
} from "@/sdk/common.js";
import {ITEM_TYPE_PEBBLE, COLLECTOR_TICKS} from "./constants.js";

/**
 * One placeable: a 1x1 machine that needs no input and pushes a pebble out of its top port.
 *
 * The pieces worth knowing:
 *   toolId       a number unique within your mod; it orders the toolbar.
 *   geometry     "1x1", "2x2", "1x2", "3x3" — how many tiles it occupies.
 *   textureName  a frame in an atlas the loadout has. "demo-machine/0" comes from the base
 *                textures; ship your own atlas (sprites.png + sprites.json beside this file's mod
 *                root) and name its frames instead.
 *   behavior     what it does each tick. GeneratorBehavior produces from nothing; MachineBehavior
 *                consumes inputs by recipe; ExtractorBehavior sits on a resource.
 */
export const CollectorType = new ObjectType({
    name: "PebbleCollector",
    toolId: 1,
    outputPorts: [new PortDefinition("out", {x: 0, y: -1, direction: Direction.UP})],
    geometry: "1x1",
    renderConnections: true,
    textureName: "demo-machine/0",
    label: "Pebble Collector",
    inspectable: true,
    placement: new PlacementRule({replaceSameKind: true}),
    behavior: new GeneratorBehavior({
        processingTicks: COLLECTOR_TICKS,
        output: ITEM_TYPE_PEBBLE,
    }),
});
