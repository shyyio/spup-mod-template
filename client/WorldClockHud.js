import {Container, Graphics, Sprite, PANEL_TINT, panelText, TextRole} from "@spup/sdk/client";

// A small box in the top-left showing the tick count the server sent, with the mod's own pebble
// sprite beside it. Everything here is plain drawing: a background, a sprite, a line of text.

const PANEL_WIDTH = 210;
const PANEL_HEIGHT = 44;
const PANEL_X = 16;
const PANEL_Y = 96;
const PANEL_RADIUS = 6;
const ICON_X = 12;
const ICON_Y = 10;
// The sprite is 32px and the box wants it at 24.
const ICON_SCALE = 0.75;
const TEXT_X = 52;
const TEXT_Y = 13;

export class WorldClockHud extends Container {

    constructor() {
        super();
        // Filled in by the game once the sprites are loaded.
        this.textureRegistry = null;
        this.x = PANEL_X;
        this.y = PANEL_Y;
        const background = new Graphics();
        background.roundRect(0, 0, PANEL_WIDTH, PANEL_HEIGHT, PANEL_RADIUS).fill(PANEL_TINT);
        this.addChild(background);
        this._text = panelText("World age: ...", TextRole.BODY);
        this._text.x = TEXT_X;
        this._text.y = TEXT_Y;
        this.addChild(this._text);
    }

    /**
     * Adds the sprite. Call it after the sprites are loaded, not in the constructor.
     * @returns {void}
     */
    build() {
        const icon = new Sprite(this.textureRegistry.get("items/pebble"));
        icon.x = ICON_X;
        icon.y = ICON_Y;
        icon.scale.set(ICON_SCALE);
        this.addChild(icon);
    }

    /**
     * @param {number} ticks
     * @returns {void}
     */
    setTicks(ticks) {
        this._text.text = `World age: ${ticks} ticks`;
    }
}
