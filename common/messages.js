import {AbstractMessage} from "@spup/sdk";

// What the browser asks the server for. Answers come back as events (common/events.js).

/**
 * Asks how many ticks the world has run. Nothing to send with it.
 */
export class WorldClockRequestMessage extends AbstractMessage {

    static wireFields = {};
}
