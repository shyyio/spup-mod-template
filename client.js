import {AbstractClientMod, startHeartbeat} from "@spup/sdk/client";
import {CLOCK_REQUEST_MS} from "./common/constants.js";
import {WorldClockRequestMessage} from "./common/messages.js";
import {WorldClockEvent} from "./common/events.js";
import {templateAtlases} from "./client/atlas.js";
import {WorldClockHud} from "./client/WorldClockHud.js";

/**
 * The half of the mod that runs in the browser. A machine already gets its sprite, its toolbar
 * button and its build preview without any code here, so this file is for extras: this mod's
 * spritesheet, and a box in the corner showing what the server reports.
 */
export class TemplateClientMod extends AbstractClientMod {

    constructor() {
        super();
        this._hud = null;
    }

    /**
     * Runs before anything is drawn.
     * @param {Client} client
     * @returns {void}
     */
    setup(client) {
        this._hud = new WorldClockHud();
    }

    /**
     * The spritesheets this mod adds. Sprite names are shared with every other mod, so prefix yours.
     * @returns {TextureAtlas[]}
     */
    textureAtlases() {
        return templateAtlases;
    }

    /**
     * Drawn on top of the screen, staying put as the player scrolls. drawLayers() draws in the
     * world instead, moving with it.
     * @param {Client} client
     * @returns {Container[]}
     */
    hudLayers(client) {
        return [this._hud];
    }

    /**
     * Sprites are loaded and the connection is up: safe to build things and start timers.
     * @param {Client} client
     * @returns {void}
     */
    onReady(client) {
        this._hud.build();
        client.session.sendMessage(new WorldClockRequestMessage());
        startHeartbeat(CLOCK_REQUEST_MS, () => client.session.sendMessage(new WorldClockRequestMessage()));
    }

    /**
     * Everything the server sends comes through here. Pick out what you sent for, ignore the rest.
     * @param {AbstractEvent} event
     * @param {Client} client
     * @returns {void}
     */
    onEvent(event, client) {
        if (event instanceof WorldClockEvent) {
            this._hud.setTicks(event.ticks);
        }
    }
}
