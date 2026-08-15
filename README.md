# spup-mod-template

A starting point for a [Shy's Power-Up Factory](https://spupgame.com) mod. It holds one machine that
makes an item, its art, and a small example of everything else a mod can do.

Your mod is named after its directory: clone this into `pebble-generator/` => mod is called
`pebble-generator`.

```
npm install
npm run dev          # Start game client + local play
npm run dev:server   # Start game server
npm test             # tests
npm run build        # -> dist/
npm run check        # Check mod public listing compatibility
```

## Structure

```
declaration.js              what the mod adds: machines, items, messages
sim.js, sim/                server code (optional)
client.js, client/          client code (optional)
common/                     shared code (optional)
sprites.png, sprites.json   art, (pixi.js / TexturePacker format)
test/                       tests
```

`declaration.js` is the only required file.
Import the game as `@spup/sdk` (and `@spup/sdk/client` in client code)
and your own files by path; nothing else may be imported.

## Publishing

Push your mod to a public repo, then open a PR against 
[shyyio/spup-mods](https://github.com/shyyio/spup-mods#listing-a-mod).