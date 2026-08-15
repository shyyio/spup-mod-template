/**
 * Counts the ticks the world has run. Server-side state can sit in plain classes like this one;
 * sim.js owns the instance.
 */
export class WorldClock {

    constructor() {
        this.ticks = 0;
    }

    /**
     * @returns {void}
     */
    advance() {
        this.ticks += 1;
    }
}
