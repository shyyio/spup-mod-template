# spup-mod-template

A starting point for a [Shy's Power-Up Factory](https://spupgame.com) mod. Clone it, rename things,
build, list it.

What's here: one placeable — a Pebble Collector that produces a pebble every few ticks — and the
item it makes. That is the smallest complete mod: a declaration, an object type, an item.

```
declaration.js        the mod: its name, what it adds
common/objectTypes.js the placeable itself
common/constants.js   its ids and tuning numbers
declaration.spec.js   a test, run with plain `node --test`
```

Your mod is named after its directory: clone this into `pebble-collector/` and you get a mod called
`pebble-collector`. That name is what a server pins and what your registry listing must use, so pick
the directory name you want to keep.

## Working on it

```
npm install
npm test          # your own tests, no game checkout needed
npm run build     # -> dist/mod.js + dist/mod.json
npm run check     # what a registry listing must pass
```

`npm run build` bundles your mod into a single file with its art inlined. Your source can be as many
modules as you like; import the SDK as `@/sdk/common.js` (and `@/sdk/client.js` from client-side
files), and your own files relatively. Those are the only imports allowed — a package has to load
with no module resolution at all, and `check` fails a bundle that reaches anything else
(`fetch`, `document`, `eval` and friends included).

## Growing it

- **More content** — more `ObjectType`s in `common/objectTypes.js`. Swap `GeneratorBehavior` for
  `MachineBehavior` (consumes inputs by recipe) or `ExtractorBehavior` (sits on a resource).
- **Its own art** — put `sprites.png` and its TexturePacker `sprites.json` at the mod root and use
  your frame names in `textureName`. They get inlined into the bundle.
- **Server-side behavior** the object model can't express — add `sim.js` exporting one
  `AbstractSimMod`, with `sim/` beside it.
- **Bespoke rendering or input** — add `client.js` exporting one `AbstractClientMod`, with
  `client/` beside it.

Each entry file exports exactly one class.

## Publishing it

Push your mod to a public repo, then open a PR against
[shyyio/spup-mods](https://github.com/shyyio/spup-mods#listing-a-mod) adding a listing that pins the
commit. The registry builds it from that commit, and server operators install it from there — you
never upload a bundle.
