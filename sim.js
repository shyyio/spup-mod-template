import {AbstractSimMod} from "@spup/sdk";
import {WorldClockRequestMessage} from "./common/messages.js";
import {WorldClockEvent} from "./common/events.js";
import {WorldClock} from "./sim/WorldClock.js";

/**
 * The half of the mod that runs on the server, for anything a placed machine cannot do by itself:
 * keeping score, reacting to players, answering questions. This one counts ticks.
 */
export class TemplateSimMod extends AbstractSimMod {

    constructor() {
        super();
        this._clock = new WorldClock();
    }

    /**
     * Runs once at startup. Nothing to set up for a counter.
     * @param {GameEngine} sim
     * @returns {void}
     */
    setup(sim) {}

    /**
     * Runs once per tick, after everything has moved.
     * @param {Game} game
     * @returns {void}
     */
    onTick(game) {
        this._clock.advance();
    }

    /**
     * A message from one player. Answer that player only; `publish` would tell everyone.
     * @param {AbstractMessage} message
     * @param {AbstractSession} session
     * @param {Game} game
     * @returns {boolean} true when this mod handled it
     */
    onSessionMessage(message, session, game) {
        if (message instanceof WorldClockRequestMessage) {
            game.bus.publishTo(session.id, new WorldClockEvent(this._clock.ticks));
            return true;
        }
        return false;
    }
}
