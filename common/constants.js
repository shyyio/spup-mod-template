// Every id a mod invents lives in one place. Item types are global: pick a range that no other mod
// you run alongside uses, and keep it here so a collision is one file to look at.

export const ITEM_TYPE_PEBBLE = 9000;

// How long the collector takes to produce one pebble, in ticks (a tick is 600ms by default).
export const COLLECTOR_TICKS = 8;
