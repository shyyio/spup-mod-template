import {AbstractEvent} from "@spup/sdk";

// What the server tells the browser.

/**
 * How many ticks this world has run.
 */
export class WorldClockEvent extends AbstractEvent {

    // Field name to type. Send numbers where you can — they are cheaper than strings, and this
    // travels on every answer.
    static wireFields = {
        ticks: "int32",
    };

    /**
     * @param {number} ticks
     */
    constructor(ticks) {
        super();
        this.ticks = ticks;
    }
}
