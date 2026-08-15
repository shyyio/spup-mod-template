import {TextureAtlas} from "@spup/sdk";
import spritesImageUrl from "../sprites.png";
import spritesSheet from "../sprites.json";

// The mod's art: an image, and the JSON naming each sprite inside it (TexturePacker writes both).
// Building the mod folds them into the package, so a published mod carries its own art and nothing
// has to be hosted. The names in the JSON are what objectTypes.js and declaration.js ask for.

export const templateAtlases = [
    new TextureAtlas(spritesImageUrl, spritesSheet),
];
