(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019fb98d-ff81-79f2-b0a0-6946825bcc4d";
    }
  } catch (e) {}
})();
import { D as e } from "./BtLKJFoOO27o.js";
const t = 0;
const n = "none";
const i = [];
const s = {};
const p = a({
  id: 0,
  key: "ocean",
  name: "Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1,
  rgb: [0, 0, 112],
  dimension: e.Overworld,
  displayCategory: "water"
});
const l = a({
  id: 1,
  key: "plains",
  name: "Plains",
  category: "plains",
  temperature: 0.8,
  precipitation: "rain",
  depth: 0.125,
  rgb: [141, 179, 96],
  dimension: e.Overworld,
  displayCategory: "plains"
});
const y = a({
  id: 2,
  key: "desert",
  name: "Desert",
  category: "desert",
  temperature: 2,
  precipitation: "none",
  depth: 0.125,
  rgb: [250, 148, 24],
  dimension: e.Overworld,
  displayCategory: "sandy"
});
const g = a({
  id: 3,
  key: "windswept_hills",
  name: "Windswept Hills",
  oldNames: ["Mountains"],
  category: "extreme_hills",
  temperature: 0.2,
  precipitation: "rain",
  depth: 1,
  rgb: [96, 96, 96],
  dimension: e.Overworld,
  displayCategory: "mountains"
});
const c = a({
  id: 4,
  key: "forest",
  name: "Forest",
  category: "forest",
  temperature: 0.7,
  precipitation: "rain",
  depth: 0.1,
  rgb: [5, 102, 33],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
const m = a({
  id: 5,
  key: "taiga",
  name: "Taiga",
  category: "taiga",
  temperature: 0.25,
  precipitation: "rain",
  depth: 0.2,
  rgb: [11, 102, 89],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
const u = a({
  id: 6,
  key: "swamp",
  name: "Swamp",
  category: "swamp",
  temperature: 0.8,
  precipitation: "rain",
  depth: -0.2,
  rgb: [7, 249, 178],
  dimension: e.Overworld,
  displayCategory: "swamps"
});
const W = a({
  id: 7,
  key: "river",
  name: "River",
  category: "river",
  temperature: 0.5,
  precipitation: "rain",
  depth: -0.5,
  rgb: [0, 0, 255],
  dimension: e.Overworld,
  displayCategory: "water"
});
const j = a({
  id: 8,
  key: "nether_wastes",
  name: "Nether Wastes",
  category: "nether",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [191, 59, 59],
  climates: [{
    temperature: 0,
    humidity: 0,
    altitude: 0,
    weirdness: 0,
    offset: 0
  }],
  dimension: e.Nether,
  displayCategory: "nether"
});
const z = a({
  id: 9,
  key: "the_end",
  name: "The End",
  category: "the_end",
  temperature: 0.5,
  precipitation: "none",
  depth: 0.1,
  rgb: [128, 128, 255],
  dimension: e.End,
  displayCategory: "end"
});
const J = a({
  id: 10,
  key: "frozen_ocean",
  name: "Frozen Ocean",
  category: "ocean",
  temperature: 0,
  precipitation: "snow",
  depth: -1,
  rgb: [112, 112, 214],
  dimension: e.Overworld,
  displayCategory: "water"
});
const x = a({
  id: 11,
  key: "frozen_river",
  name: "Frozen River",
  category: "river",
  temperature: 0,
  precipitation: "snow",
  depth: -0.5,
  rgb: [160, 160, 255],
  dimension: e.Overworld,
  displayCategory: "water"
});
const w = a({
  id: 12,
  key: "snowy_plains",
  name: "Snowy Plains",
  oldNames: ["Snowy Tundra"],
  category: "icy",
  temperature: 0,
  precipitation: "snow",
  depth: 0.125,
  rgb: [255, 255, 255],
  dimension: e.Overworld,
  displayCategory: "plains"
});
a({
  id: 13,
  name: "Snowy Mountains",
  category: "icy",
  temperature: 0,
  precipitation: "snow",
  depth: 0.45,
  rgb: [160, 160, 160],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const L = a({
  id: 14,
  key: "mushroom_fields",
  name: "Mushroom Fields",
  category: "mushroom",
  temperature: 0.9,
  precipitation: "rain",
  depth: 0.2,
  rgb: [255, 0, 255],
  dimension: e.Overworld,
  displayCategory: "plains"
});
const R = a({
  id: 15,
  name: "Mushroom Fields Shore",
  category: "mushroom",
  temperature: 0.9,
  precipitation: "rain",
  depth: 0,
  rgb: [160, 0, 255],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const I = a({
  id: 16,
  key: "beach",
  name: "Beach",
  category: "beach",
  temperature: 0.8,
  precipitation: "rain",
  depth: 0,
  rgb: [250, 222, 85],
  dimension: e.Overworld,
  displayCategory: "sandy"
});
a({
  id: 17,
  name: "Desert Hills",
  category: "desert",
  temperature: 2,
  precipitation: "none",
  depth: 0.45,
  rgb: [210, 95, 18],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const U = a({
  id: 18,
  key: "windswept_forest",
  name: "Windswept Forest",
  oldNames: ["Wooded Hills"],
  category: "forest",
  temperature: 0.7,
  precipitation: "rain",
  depth: 0.45,
  rgb: [34, 85, 28],
  dimension: e.Overworld,
  displayCategory: "mountains"
});
a({
  id: 19,
  name: "Taiga Hills",
  category: "taiga",
  temperature: 0.25,
  precipitation: "rain",
  depth: 0.45,
  rgb: [22, 57, 51],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
a({
  id: 20,
  name: "Mountain Edge",
  category: "extreme_hills",
  temperature: 0.2,
  precipitation: "rain",
  depth: 0.8,
  rgb: [114, 120, 154],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const h = a({
  id: 21,
  key: "jungle",
  name: "Jungle",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.1,
  rgb: [83, 123, 9],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
a({
  id: 22,
  name: "Jungle Hills",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.45,
  rgb: [44, 66, 5],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const v = a({
  id: 23,
  key: "sparse_jungle",
  name: "Sparse Jungle",
  oldNames: ["Jungle Edge"],
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.1,
  rgb: [98, 139, 23],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
const V = a({
  id: 24,
  key: "deep_ocean",
  name: "Deep Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1.8,
  rgb: [0, 0, 48],
  dimension: e.Overworld,
  displayCategory: "water"
});
a({
  id: 25,
  key: "stony_shore",
  name: "Stony Shore",
  oldNames: ["Stone Shore"],
  category: "none",
  temperature: 0.2,
  precipitation: "rain",
  depth: 0.1,
  rgb: [162, 162, 132],
  dimension: e.Overworld,
  displayCategory: "mountains"
});
const A = a({
  id: 26,
  key: "snowy_beach",
  name: "Snowy Beach",
  category: "beach",
  temperature: 0.05,
  precipitation: "snow",
  depth: 0,
  rgb: [250, 240, 192],
  dimension: e.Overworld,
  displayCategory: "sandy"
});
const b = a({
  id: 27,
  key: "birch_forest",
  name: "Birch Forest",
  category: "forest",
  temperature: 0.6,
  precipitation: "rain",
  depth: 0.1,
  rgb: [48, 116, 68],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
const C = a({
  id: 28,
  name: "Birch Forest Hills",
  category: "forest",
  temperature: 0.6,
  precipitation: "rain",
  depth: 0.45,
  rgb: [31, 95, 50],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const O = a({
  id: 29,
  key: "dark_forest",
  name: "Dark Forest",
  category: "forest",
  temperature: 0.7,
  precipitation: "rain",
  depth: 0.1,
  rgb: [64, 81, 26],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
const k = a({
  id: 30,
  key: "snowy_taiga",
  name: "Snowy Taiga",
  category: "taiga",
  temperature: -0.5,
  precipitation: "snow",
  depth: 0.2,
  rgb: [49, 85, 74],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
a({
  id: 31,
  name: "Snowy Taiga Hills",
  category: "taiga",
  temperature: -0.5,
  precipitation: "snow",
  depth: 0.45,
  rgb: [36, 63, 54],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const _ = a({
  id: 32,
  key: "old_growth_pine_taiga",
  name: "Old Growth Pine Taiga",
  oldNames: ["Giant Tree Taiga"],
  category: "taiga",
  temperature: 0.3,
  precipitation: "rain",
  depth: 0.2,
  rgb: [89, 102, 81],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
const f = a({
  id: 33,
  name: "Giant Tree Taiga Hills",
  category: "taiga",
  temperature: 0.3,
  precipitation: "rain",
  depth: 0.45,
  rgb: [69, 79, 62],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const S = a({
  id: 34,
  name: "Wooded Mountains",
  category: "extreme_hills",
  temperature: 0.2,
  precipitation: "rain",
  depth: 1,
  rgb: [80, 112, 80],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const B = a({
  id: 35,
  key: "savanna",
  name: "Savanna",
  category: "savanna",
  temperature: 1.2,
  precipitation: "none",
  depth: 0.125,
  rgb: [189, 178, 95],
  dimension: e.Overworld,
  displayCategory: "plains"
});
const F = a({
  id: 36,
  key: "savanna_plateau",
  name: "Savanna Plateau",
  category: "savanna",
  temperature: 1,
  precipitation: "none",
  depth: 1.5,
  rgb: [167, 157, 100],
  dimension: e.Overworld,
  displayCategory: "mountains"
});
const T = a({
  id: 37,
  key: "badlands",
  name: "Badlands",
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [217, 69, 21],
  dimension: e.Overworld,
  displayCategory: "sandy"
});
const P = a({
  id: 38,
  key: "wooded_badlands",
  name: "Wooded Badlands",
  oldNames: ["Wooded Badlands Plateau"],
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 1.5,
  rgb: [176, 151, 101],
  dimension: e.Overworld,
  displayCategory: "sandy"
});
const D = a({
  id: 39,
  name: "Badlands Plateau",
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 1.5,
  rgb: [202, 140, 101],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const q = a({
  id: 40,
  key: "small_end_islands",
  name: "Small End Islands",
  category: "the_end",
  temperature: 0.5,
  precipitation: "none",
  depth: 0.1,
  rgb: [0, 0, 42],
  dimension: e.End,
  displayCategory: "end"
});
const K = a({
  id: 41,
  key: "end_midlands",
  name: "End Midlands",
  category: "the_end",
  temperature: 0.5,
  precipitation: "none",
  depth: 0.1,
  rgb: [235, 248, 182],
  dimension: e.End,
  displayCategory: "end"
});
const Q = a({
  id: 42,
  key: "end_highlands",
  name: "End Highlands",
  category: "the_end",
  temperature: 0.5,
  precipitation: "none",
  depth: 0.1,
  rgb: [195, 189, 137],
  dimension: e.End,
  displayCategory: "end"
});
const X = a({
  id: 43,
  key: "end_barrens",
  name: "End Barrens",
  category: "the_end",
  temperature: 0.5,
  precipitation: "none",
  depth: 0.1,
  rgb: [144, 144, 114],
  dimension: e.End,
  displayCategory: "end"
});
const Y = a({
  id: 44,
  key: "warm_ocean",
  name: "Warm Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1,
  rgb: [0, 0, 172],
  dimension: e.Overworld,
  displayCategory: "water"
});
const Z = a({
  id: 45,
  key: "lukewarm_ocean",
  name: "Lukewarm Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1,
  rgb: [0, 0, 144],
  dimension: e.Overworld,
  displayCategory: "water"
});
const $ = a({
  id: 46,
  key: "cold_ocean",
  name: "Cold Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1,
  rgb: [32, 32, 112],
  dimension: e.Overworld,
  displayCategory: "water"
});
a({
  id: 47,
  key: "deep_warm_ocean",
  name: "Deep Warm Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1.8,
  rgb: [0, 0, 80],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const ee = a({
  id: 48,
  key: "deep_lukewarm_ocean",
  name: "Deep Lukewarm Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1.8,
  rgb: [0, 0, 64],
  dimension: e.Overworld,
  displayCategory: "water"
});
const ae = a({
  id: 49,
  key: "deep_cold_ocean",
  name: "Deep Cold Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1.8,
  rgb: [32, 32, 56],
  dimension: e.Overworld,
  displayCategory: "water"
});
const re = a({
  id: 50,
  key: "deep_frozen_ocean",
  name: "Deep Frozen Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1.8,
  rgb: [64, 64, 144],
  dimension: e.Overworld,
  displayCategory: "water"
});
a({
  id: 129,
  name: "Sunflower Plains",
  key: "sunflower_plains",
  category: "plains",
  temperature: 0.8,
  precipitation: "rain",
  depth: 0.125,
  rgb: [181, 219, 136],
  parent: l.id,
  dimension: e.Overworld,
  displayCategory: "plains"
});
a({
  id: 130,
  name: "Desert Lakes",
  category: "desert",
  temperature: 2,
  precipitation: "none",
  depth: 0.125,
  rgb: [255, 188, 64],
  parent: y.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const te = a({
  id: 131,
  key: "windswept_gravelly_hills",
  name: "Windswept Gravelly Hills",
  oldNames: ["Gravelly Mountains"],
  category: "extreme_hills",
  temperature: 0.2,
  precipitation: "rain",
  depth: 1,
  rgb: [136, 136, 136],
  parent: g.id,
  dimension: e.Overworld,
  displayCategory: "mountains"
});
const ne = a({
  id: 132,
  key: "flower_forest",
  name: "Flower Forest",
  category: "forest",
  temperature: 0.7,
  precipitation: "rain",
  depth: 0.1,
  rgb: [45, 142, 73],
  parent: c.id,
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
a({
  id: 133,
  name: "Taiga Mountains",
  category: "taiga",
  temperature: 0.25,
  precipitation: "rain",
  depth: 0.3,
  rgb: [51, 142, 129],
  parent: m.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
a({
  id: 134,
  name: "Swamp Hills",
  category: "swamp",
  temperature: 0.8,
  precipitation: "rain",
  depth: -0.1,
  rgb: [47, 255, 218],
  parent: u.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const ie = a({
  id: 140,
  key: "ice_spikes",
  name: "Ice Spikes",
  category: "icy",
  temperature: 0,
  precipitation: "snow",
  depth: 0.425,
  rgb: [180, 220, 220],
  parent: w.id,
  dimension: e.Overworld,
  displayCategory: "plains"
});
a({
  id: 149,
  name: "Modified Jungle",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.2,
  rgb: [123, 163, 49],
  parent: h.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
a({
  id: 151,
  name: "Modified Jungle Edge",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.2,
  rgb: [138, 179, 63],
  parent: v.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const oe = a({
  id: 155,
  key: "old_growth_birch_forest",
  name: "Old Growth Birch Forest",
  oldNames: ["Tall Birch Forest"],
  category: "forest",
  temperature: 0.6,
  precipitation: "rain",
  depth: 0.2,
  rgb: [88, 156, 108],
  parent: b.id,
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
a({
  id: 156,
  name: "Tall Birch Hills",
  category: "forest",
  temperature: 0.6,
  precipitation: "rain",
  depth: 0.55,
  rgb: [71, 135, 90],
  parent: C.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
a({
  id: 157,
  name: "Dark Forest Hills",
  category: "forest",
  temperature: 0.7,
  precipitation: "rain",
  depth: 0.2,
  rgb: [104, 121, 66],
  parent: O.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
a({
  id: 158,
  name: "Snowy Taiga Mountains",
  category: "taiga",
  temperature: -0.5,
  precipitation: "snow",
  depth: 0.3,
  rgb: [89, 125, 114],
  parent: k.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const de = a({
  id: 160,
  key: "old_growth_spruce_taiga",
  name: "Old Growth Spruce Taiga",
  oldNames: ["Giant Spruce Taiga"],
  category: "taiga",
  temperature: 0.25,
  precipitation: "rain",
  depth: 0.2,
  rgb: [129, 142, 121],
  parent: _.id,
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
a({
  id: 161,
  name: "Giant Spruce Taiga Hills",
  category: "taiga",
  temperature: 0.25,
  precipitation: "rain",
  depth: 0.2,
  rgb: [109, 119, 102],
  parent: f.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
a({
  id: 162,
  name: "Gravelly Mountains+",
  category: "extreme_hills",
  temperature: 0.2,
  precipitation: "rain",
  depth: 1,
  rgb: [120, 152, 120],
  parent: S.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const se = a({
  id: 163,
  key: "windswept_savanna",
  name: "Windswept Savanna",
  oldNames: ["Shattered Savanna"],
  category: "savanna",
  temperature: 1.1,
  precipitation: "none",
  depth: 0.3625,
  rgb: [229, 218, 135],
  parent: B.id,
  dimension: e.Overworld,
  displayCategory: "mountains"
});
a({
  id: 164,
  name: "Shattered Savanna Plateau",
  category: "savanna",
  temperature: 1,
  precipitation: "none",
  rgb: [207, 197, 140],
  depth: 1.05,
  parent: F.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const pe = a({
  id: 165,
  key: "eroded_badlands",
  name: "Eroded Badlands",
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [255, 109, 61],
  parent: T.id,
  dimension: e.Overworld,
  displayCategory: "sandy"
});
a({
  id: 166,
  name: "Modified Wooded Badlands Plateau",
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 0.45,
  rgb: [216, 191, 141],
  parent: P.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
a({
  id: 167,
  name: "Modified Badlands Plateau",
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 0.45,
  rgb: [242, 180, 141],
  parent: D.id,
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const le = a({
  id: 168,
  key: "bamboo_jungle",
  name: "Bamboo Jungle",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.1,
  rgb: [118, 142, 20],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
a({
  id: 169,
  name: "Bamboo Jungle Hills",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.45,
  rgb: [59, 71, 10],
  dimension: e.Overworld,
  displayCategory: "legacy"
});
const ye = a({
  id: 170,
  key: "soul_sand_valley",
  name: "Soul Sand Valley",
  category: "nether",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [94, 56, 48],
  climates: [{
    temperature: 0,
    humidity: -0.5,
    altitude: 0,
    weirdness: 0,
    offset: 0
  }],
  dimension: e.Nether,
  displayCategory: "nether"
});
const ge = a({
  id: 171,
  key: "crimson_forest",
  name: "Crimson Forest",
  category: "nether",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [221, 8, 8],
  climates: [{
    temperature: 0.4,
    humidity: 0,
    altitude: 0,
    weirdness: 0,
    offset: 0
  }],
  dimension: e.Nether,
  displayCategory: "nether"
});
const ce = a({
  id: 172,
  key: "warped_forest",
  name: "Warped Forest",
  category: "nether",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [73, 144, 123],
  climates: [{
    temperature: 0,
    humidity: 0.5,
    altitude: 0,
    weirdness: 0,
    offset: 0.375
  }],
  dimension: e.Nether,
  displayCategory: "nether"
});
const me = a({
  id: 173,
  key: "basalt_deltas",
  name: "Basalt Deltas",
  category: "nether",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [64, 54, 54],
  climates: [{
    temperature: -0.5,
    humidity: 0,
    altitude: 0,
    weirdness: 0,
    offset: 0.175
  }],
  dimension: e.Nether,
  displayCategory: "nether"
});
const H = a({
  id: 174,
  key: "dripstone_caves",
  name: "Dripstone Caves",
  category: "none",
  temperature: 0.8,
  precipitation: "rain",
  depth: t,
  rgb: [193, 165, 143],
  dimension: e.Overworld,
  displayCategory: "caves"
});
const M = a({
  id: 175,
  key: "lush_caves",
  name: "Lush Caves",
  category: "none",
  temperature: 0.5,
  precipitation: "rain",
  depth: t,
  rgb: [223, 150, 52],
  dimension: e.Overworld,
  displayCategory: "caves"
});
const ue = a({
  id: 177,
  key: "meadow",
  name: "Meadow",
  category: "mountain",
  temperature: 0.5,
  precipitation: "rain",
  depth: t,
  rgb: [140, 164, 112],
  dimension: e.Overworld,
  displayCategory: "mountains"
});
const we = a({
  id: 178,
  key: "grove",
  name: "Grove",
  category: "forest",
  temperature: -0.2,
  precipitation: "snow",
  depth: t,
  rgb: [146, 178, 160],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
const he = a({
  id: 179,
  key: "snowy_slopes",
  name: "Snowy Slopes",
  category: "mountain",
  temperature: -0.3,
  precipitation: "snow",
  depth: t,
  rgb: [218, 241, 241],
  dimension: e.Overworld,
  displayCategory: "mountains"
});
const ve = a({
  id: 180,
  key: "frozen_peaks",
  name: "Frozen Peaks",
  category: "mountain",
  temperature: -0.7,
  precipitation: "snow",
  depth: t,
  rgb: [234, 251, 251],
  dimension: e.Overworld,
  displayCategory: "mountains"
});
const be = a({
  id: 181,
  key: "jagged_peaks",
  name: "Jagged Peaks",
  category: "mountain",
  temperature: -0.7,
  precipitation: "snow",
  depth: t,
  rgb: [186, 188, 182],
  dimension: e.Overworld,
  displayCategory: "mountains"
});
const Ce = a({
  id: 182,
  key: "stony_peaks",
  name: "Stony Peaks",
  category: "mountain",
  temperature: 1,
  precipitation: "rain",
  depth: t,
  rgb: [209, 209, 209],
  dimension: e.Overworld,
  displayCategory: "mountains"
});
const E = a({
  id: 183,
  key: "deep_dark",
  name: "Deep Dark",
  category: "none",
  temperature: 0.8,
  precipitation: "rain",
  depth: t,
  rgb: [0, 0, 0],
  dimension: e.Overworld,
  displayCategory: "caves"
});
const Oe = a({
  id: 184,
  key: "mangrove_swamp",
  name: "Mangrove Swamp",
  category: "none",
  temperature: 0.8,
  precipitation: "rain",
  depth: t,
  rgb: [36, 196, 142],
  dimension: e.Overworld,
  displayCategory: "swamps"
});
a({
  id: 185,
  key: "cherry_grove",
  name: "Cherry Grove",
  category: "mountain",
  temperature: 0.5,
  precipitation: n,
  depth: t,
  rgb: [247, 185, 220],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
const ke = a({
  id: 186,
  key: "pale_garden",
  name: "Pale Garden",
  category: "forest",
  temperature: 0.7,
  precipitation: n,
  depth: t,
  rgb: [108, 111, 150],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
const N = a({
  id: 187,
  key: "sulfur_caves",
  name: "Sulfur Caves",
  category: "none",
  temperature: 0.8,
  precipitation: n,
  depth: t,
  rgb: [200, 200, 40],
  dimension: e.Overworld,
  displayCategory: "caves"
});
const _e = a({
  id: 188,
  key: "dappled_forest",
  name: "Dappled Forest",
  category: "forest",
  temperature: 0.6,
  precipitation: n,
  depth: t,
  rgb: [154, 63, 53],
  dimension: e.Overworld,
  displayCategory: "woodlands"
});
function a(r) {
  i[r.id] = r;
  if (r.parent != null) {
    s[r.parent] = r.id;
  }
  return r;
}
function fe(r) {
  if (r >= 0 && r <= i.length) {
    return i[r];
  } else {
    return p;
  }
}
function Se(r) {
  if (o(r)) {
    return "caveDepth";
  } else if (d(r)) {
    return "bottom";
  } else {
    return "depth0";
  }
}
function o(r) {
  return [M.id, H.id, N.id].includes(r);
}
function d(r) {
  return r === E.id;
}
function Be(r) {
  return o(r) || d(r);
}
export { w as $, we as A, ke as B, _e as C, T as D, pe as E, P as F, g as G, U as H, te as I, ue as J, ve as K, be as L, Ce as M, he as N, B as O, F as P, se as Q, j as R, ye as S, ge as T, ce as U, me as V, z as W, Q as X, K as Y, q as Z, X as _, le as a, ie as a0, E as a1, y as a2, Oe as a3, H as a4, M as a5, N as a6, Se as a7, fe as a8, L as a9, R as aa, Be as ab, l as ac, u as ad, i as b, ae as c, re as d, V as e, ee as f, J as g, $ as h, I as i, h as j, A as k, Z as l, x as m, k as n, p as o, _ as p, de as q, W as r, v as s, m as t, c as u, ne as v, Y as w, b as x, oe as y, O as z };
/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */
//# chunkId=019fb98d-ff81-79f2-b0a0-6946825bcc4d