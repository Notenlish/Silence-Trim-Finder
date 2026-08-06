(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019fac75-f35b-71d2-99cf-4f320ac80fbc";
    }
  } catch (e) {}
})();
import "./ViifaoL66WRL.js";
var c = (e => {
  e.Java = "Java";
  e.Bedrock = "Bedrock";
  return e;
})(c || {});
var f = (e => {
  e[e.V1_7 = 100700] = "V1_7";
  e[e.V1_8 = 100800] = "V1_8";
  e[e.V1_9 = 100900] = "V1_9";
  e[e.V1_10 = 101000] = "V1_10";
  e[e.V1_11 = 101100] = "V1_11";
  e[e.V1_12 = 101200] = "V1_12";
  e[e.V1_13 = 101300] = "V1_13";
  e[e.V1_14 = 101400] = "V1_14";
  e[e.V1_15 = 101500] = "V1_15";
  e[e.V1_16 = 101600] = "V1_16";
  e[e.V1_17 = 101700] = "V1_17";
  e[e.V1_18 = 101800] = "V1_18";
  e[e.V1_19 = 101900] = "V1_19";
  e[e.V1_19_3 = 101903] = "V1_19_3";
  e[e.V1_20 = 102000] = "V1_20";
  e[e.V1_21 = 102100] = "V1_21";
  e[e.V1_21_2 = 102102] = "V1_21_2";
  e[e.V1_21_4 = 102104] = "V1_21_4";
  e[e.V1_21_5 = 102105] = "V1_21_5";
  e[e.V1_21_6 = 102106] = "V1_21_6";
  e[e.V1_21_9 = 102109] = "V1_21_9";
  e[e.V26_2 = 260200] = "V26_2";
  e[e.V26_3 = 260300] = "V26_3";
  return e;
})(f || {});
var w = (e => {
  e[e.V1_14 = 101400] = "V1_14";
  e[e.V1_16 = 101600] = "V1_16";
  e[e.V1_17 = 101700] = "V1_17";
  e[e.V1_18 = 101800] = "V1_18";
  e[e.V1_19 = 101900] = "V1_19";
  e[e.V1_20 = 102000] = "V1_20";
  e[e.V1_20_60 = 102006] = "V1_20_60";
  e[e.V1_21 = 102100] = "V1_21";
  e[e.V1_21_40 = 102104] = "V1_21_40";
  e[e.V1_21_50 = 102105] = "V1_21_50";
  e[e.V1_21_60 = 102106] = "V1_21_60";
  e[e.V1_21_70 = 102107] = "V1_21_70";
  e[e.V1_21_80 = 102108] = "V1_21_80";
  e[e.V1_21_90 = 102109] = "V1_21_90";
  e[e.V1_21_110 = 102111] = "V1_21_110";
  e[e.V1_21_120 = 102112] = "V1_21_120";
  e[e.V26_30 = 263000] = "V26_30";
  e[e.V26_40 = 264000] = "V26_40";
  e[e.V26_50 = 265000] = "V26_50";
  return e;
})(w || {});
var r = (e => {
  e.Overworld = "overworld";
  e.Nether = "nether";
  e.End = "end";
  return e;
})(r || {});
var d = (e => {
  e[e.ZOMBIE = 0] = "ZOMBIE";
  e[e.SPIDER = 1] = "SPIDER";
  e[e.SKELETON = 2] = "SKELETON";
  return e;
})(d || {});
var t = (e => {
  e.AbandonedCamp = "abandonedCamp";
  e.BastionRemnant = "bastionRemnant";
  e.BuriedTreasure = "buriedTreasure";
  e.Dungeon = "dungeon";
  e.EndCity = "endCity";
  e.NetherFortress = "netherFortress";
  e.SlimeChunk = "slimeChunk";
  e.Stronghold = "stronghold";
  e.Village = "village";
  e.Mineshaft = "mineshaft";
  e.WoodlandMansion = "woodlandMansion";
  e.PillagerOutpost = "pillagerOutpost";
  e.OceanRuin = "oceanRuin";
  e.OceanMonument = "oceanMonument";
  e.Shipwreck = "shipwreck";
  e.DesertTemple = "desertTemple";
  e.JungleTemple = "jungleTemple";
  e.WitchHut = "witchHut";
  e.Igloo = "igloo";
  e.RuinedPortalOverworld = "ruinedPortalOverworld";
  e.RuinedPortalNether = "ruinedPortalNether";
  e.Spawn = "spawn";
  e.Fossil = "fossil";
  e.FossilNether = "fossilNether";
  e.Ravine = "ravine";
  e.EndGateway = "endGateway";
  e.AmethystGeode = "amethystGeode";
  e.AncientCity = "ancientCity";
  e.ItemOverworld = "itemOverworld";
  e.OreVein = "oreVein";
  e.Cave = "cave";
  e.DesertWell = "desertWell";
  e.TrailRuin = "trailRuin";
  e.TrialChamber = "trialChamber";
  e.LavaPool = "lavaPool";
  return e;
})(t || {});
function a(e) {
  e = Math.round(e * 10) / 10;
  return (e + "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function g(e) {
  return e[2].map(function (n) {
    return [e[0], e[1], n];
  });
}
function y(e) {
  const n = e[2];
  if (n) {
    return g([e[0], e[1], n]);
  } else {
    return [[e[0], e[1], undefined]];
  }
}
function b(e, n) {
  if (n.edition === c.Java && n.javaVersion >= f.V1_18) {
    return [e[0] * 16, null, e[1] * 16];
  } else {
    return [e[0] * 16 + 8, null, e[1] * 16 + 8];
  }
}
const o = {
  chunkClassifier: 8,
  veryBig: 16,
  big: 32,
  normal: 128,
  small: 256
};
const i = {
  chunk: function (e) {
    return e[0] + "//" + e[1];
  },
  xzBlock: function (e, n) {
    return e + "/" + n;
  },
  xyBlockArr: function (e) {
    return i.xzBlock(e[2][0], e[2][2]);
  }
};
function S(e) {
  if (e.count < 600) {
    return "small";
  } else if (e.count < 1800) {
    return "medium";
  } else if (e.count < 5400) {
    return "large";
  } else {
    return "huge";
  }
}
function m(e) {
  return !!e && e[0] != null && e[2] != null;
}
function T(e) {
  if (e) {
    if (e === "units") {
      return "Housing units";
    } else if (e === "hoglin_stable") {
      return "Hoglin stables";
    } else if (e === "treasure") {
      return "Treasure room";
    } else if (e === "bridge") {
      return "Bridges";
    } else {
      return null;
    }
  } else {
    return null;
  }
}
function C(e) {
  if (e === d.ZOMBIE) {
    return "Zombie";
  } else if (e === d.SKELETON) {
    return "Skeleton";
  } else if (e === d.SPIDER) {
    return "Spider";
  } else {
    return null;
  }
}
function _(e) {
  return [e.isLarge ? "Large," : "Small,", e.type === "warm" ? "Warm" : "Cold", "Ruin", e.clusterSize > 0 && "with Cluster (" + e.clusterSize + " small ruins)"].filter(Boolean).join(" ");
}
function v(e) {
  if (e.oreCount < 6) {
    return "small";
  } else if (e.oreCount < 9) {
    return "medium";
  } else {
    return "large";
  }
}
function x(e) {
  if (e.type == null) {
    return null;
  }
  let n = {
    desert: "Desert Village",
    plains: "Plains Village",
    savanna: "Savanna Village",
    taiga: "Taiga Village",
    snowy: "Snowy Village"
  }[e.type];
  if (e.zombie) {
    n = "Zombie " + n;
  }
  return n;
}
const s = e => e;
const u = e => e;
const h = {
  [t.AbandonedCamp]: u({
    shortId: "Ab",
    label: "Camp",
    fullLabel: "Abandoned Camp",
    icon: "abandoned-camp",
    imgSrc: {
      default: "abandoned-camp.png",
      secretChest: "abandoned-camp-special-copper.png"
    },
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.normal,
    getTooltipText: function (e) {
      if (e[2].hasSecretChest) {
        return "Abandoned Camp (Copper Chest)";
      } else {
        return "Abandoned Camp";
      }
    },
    getImg: function (e) {
      if (e.hasSecretChest) {
        return "secretChest";
      } else {
        return "default";
      }
    },
    getCoords: function (e) {
      const {
        x: n,
        y: l,
        z: p
      } = e[2];
      return [n, l, p];
    },
    fillColor: "154,63,53",
    getHash: i.chunk
  }),
  [t.AmethystGeode]: s({
    shortId: "Ag",
    label: "Geode",
    fullLabel: "Amethyst Geode",
    icon: "amethyst",
    imgSrc: "amethyst.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.chunkClassifier,
    splitPois: g,
    getHoverText: function (e) {
      return "Likely Geode @ " + e[2].map(function (l) {
        return a(l[0]) + " / " + a(l[1]) + " / " + a(l[2]);
      }).join(", ");
    },
    getTooltipText: function () {
      return "Likely Amethyst Geode";
    },
    getCoords: function (e) {
      return e[2];
    },
    fillColor: "98,69,149",
    getHash: i.xyBlockArr
  }),
  [t.AncientCity]: u({
    shortId: "Ac",
    label: "Ancient City",
    icon: "ancient-city",
    imgSrc: "ancient-city.png",
    dimension: r.Overworld,
    biomeScanHeights: ["bottom"],
    maxTileSize: o.normal,
    getTooltipText: function () {
      return "Ancient City";
    },
    getCoords: function (e) {
      return [e[0] * 16 + 8, -51, e[1] * 16 + 8];
    },
    getHoverText: function (e, n) {
      const l = h[t.AncientCity].getCoords?.(e, n) ?? [0, 0, 0];
      return "Ancient City @ " + a(l[0]) + " / " + l[1] + " / " + a(l[2]);
    },
    fillColor: "5,35,30",
    getHash: i.chunk
  }),
  [t.BastionRemnant]: u({
    shortId: "Br",
    label: "Bastion",
    fullLabel: "Bastion Remnant",
    icon: "piglin",
    imgSrc: {
      default: "bastion.png",
      bridge: "bastion-bridge.png",
      stables: "bastion-stables.png",
      units: "bastion-units.png",
      treasure: "bastion-treasure.png"
    },
    dimension: r.Nether,
    maxTileSize: o.big,
    getCoords: function (e) {
      return [e[0] * 16, null, e[1] * 16];
    },
    getHoverText: function (e) {
      const n = T(e[2].type);
      if (n == null) {
        return null;
      } else {
        return "Type: " + n;
      }
    },
    getTooltipText: function (e) {
      return "Bastion (" + T(e[2].type) + ")";
    },
    getImg: function (e) {
      if (e.type === "hoglin_stable") {
        return "stables";
      } else if (e.type === "treasure") {
        return "treasure";
      } else if (e.type === "bridge") {
        return "bridge";
      } else {
        return "units";
      }
    },
    fillColor: function (e) {
      if (e?.type == null || e.type === "units") {
        return "140,140,140";
      } else if (e.type === "hoglin_stable") {
        return "245,0,122";
      } else if (e.type === "treasure") {
        return "139,69,19";
      } else if (e.type === "bridge") {
        return "8,145,17";
      } else {
        return "0,0,0";
      }
    },
    getHash: i.chunk
  }),
  [t.BuriedTreasure]: u({
    shortId: "Bt",
    label: "Treasure",
    fullLabel: "Buried Treasure",
    icon: "buried-treasure",
    imgSrc: "buried-treasure.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.big,
    getHoverText: function (e, n) {
      const l = h[t.BuriedTreasure].getCoords?.(e, n) ?? [0, 0, 0];
      return "Treasure @ " + a(l[0]) + " / " + a(l[2]);
    },
    getTooltipText: function () {
      return "Buried Treasure";
    },
    getCoords: function (e, n) {
      const l = n.edition === c.Java ? 9 : 8;
      return [e[0] * 16 + l, null, e[1] * 16 + l];
    },
    fillColor: "190,140,100",
    getHash: i.chunk
  }),
  [t.Cave]: s({
    shortId: "Ca",
    label: "Cave",
    fullLabel: "Cheese Cave",
    icon: "cave",
    imgSrc: {
      default: "cave.png",
      special: "cave-special.png"
    },
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.veryBig,
    splitPois: g,
    getCoords: function (e) {
      return e[2].reference.pos;
    },
    getTooltipText: function (e) {
      return "Cheese Cave (" + S(e[2]) + ")";
    },
    getImg: function (e) {
      if (S(e) === "huge") {
        return "special";
      } else {
        return "default";
      }
    },
    fillColor: function () {
      return "80,80,80";
    },
    getHash: function (e) {
      return i.xzBlock(e[2].reference.pos[0], e[2].reference.pos[2]);
    }
  }),
  [t.DesertTemple]: u({
    shortId: "Dt",
    label: "Desert Temple",
    icon: "desert-temple",
    imgSrc: "desert-temple.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.normal,
    getTooltipText: function (e, n) {
      if (n.edition === c.Java && n.javaVersion >= f.V1_18) {
        return "Likely Desert Temple";
      } else {
        return "Desert Temple";
      }
    },
    fillColor: "120,100,20",
    getHash: i.chunk
  }),
  [t.DesertWell]: u({
    shortId: "Dw",
    label: "Desert Well",
    icon: "desert-well",
    imgSrc: "desert-well.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.big,
    getTooltipText: function (e) {
      return "Likely Desert Well";
    },
    getCoords: function (e) {
      return e[2].slice(0, 3);
    },
    fillColor: "40,57,161",
    getHash: i.chunk
  }),
  [t.Dungeon]: s({
    shortId: "D",
    label: "Dungeon",
    icon: "dungeon",
    imgSrc: {
      default: "dungeon.png",
      zombie: "dungeon-zombie.png",
      spider: "dungeon-spider.png",
      skeleton: "dungeon-skeleton.png"
    },
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.chunkClassifier,
    getImg: function (e) {
      const n = e[3];
      if (n === d.ZOMBIE) {
        return "zombie";
      } else if (n === d.SKELETON) {
        return "skeleton";
      } else {
        return "spider";
      }
    },
    fillColor: function (e) {
      if (e == null || e.length > 1) {
        return "220,120,20";
      } else if (e[0][3] === d.ZOMBIE) {
        return "70,109,29";
      } else if (e[0][3] === d.SKELETON) {
        return "125,125,125";
      } else if (e[0][3] === d.SPIDER) {
        return "168,46,0";
      } else {
        return "0,0,0";
      }
    },
    splitPois: g,
    getCoords: function (e) {
      return e[2].slice(0, 3);
    },
    getTooltipText: function (e, n) {
      const l = C(e[2][3]) || "Unknown Mob";
      return (n.edition === c.Bedrock && n.bedrockVersion >= w.V1_18 || n.edition === c.Java && n.javaVersion >= f.V1_18 ? "Possible" : "Likely") + " Dungeon (" + l + ")";
    },
    getHoverText: function (e) {
      return e[2].map(function (n) {
        return (C(n[3]) || "Dungeon") + " @ " + [a(n[0]), n[1], a(n[2])].join(" / ");
      }, "").join(", ");
    },
    getHash: function (e) {
      return i.xyBlockArr([e[0], e[1], [e[2][0], e[2][1], e[2][2]]]);
    }
  }),
  [t.Fossil]: s({
    shortId: "F",
    label: "Fossil",
    icon: "fossil",
    imgSrc: "fossil.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.chunkClassifier,
    fillColor: "90,90,90",
    splitPois: y,
    getCoords: function (e) {
      if (m(e[2])) {
        return e[2].slice(0, 3);
      } else {
        return [e[0] * 16 + 8, null, e[1] * 16 + 8];
      }
    },
    getTooltipText: function (e) {
      let n = e[2] && e[2][3] === "diamond" ? "Diamond Fossil" : "Fossil";
      if (!m(e[2])) {
        n += " (Estimated)";
      }
      return n;
    },
    getHoverText: function (e) {
      const n = e[2].filter(Boolean);
      if (m(n[0])) {
        return n.map(function (l) {
          return "Fossil @ " + [a(l?.[0] ?? 0), l?.[1], a(l?.[2] ?? 0)].filter(Boolean).join(" / ");
        }, "").join(", ");
      } else {
        return null;
      }
    },
    getHash: i.chunk
  }),
  [t.FossilNether]: s({
    shortId: "Fn",
    label: "Nether Fossil",
    icon: "fossil",
    imgSrc: {
      default: "fossil.png",
      ghast: "fossil-ghast.png"
    },
    dimension: r.Nether,
    maxTileSize: o.chunkClassifier,
    fillColor: function (e) {
      if (e != null && e[0][3].hasDriedGhast) {
        return "0,122,108";
      } else {
        return "90,90,90";
      }
    },
    splitPois: g,
    getImg: function (e) {
      if (e[3].hasDriedGhast) {
        return "ghast";
      } else {
        return "default";
      }
    },
    getCoords: function (e) {
      return e[2].slice(0, 3);
    },
    getTooltipText: function (e, n) {
      let l;
      if (n.edition === c.Bedrock) {
        l = "Likely Nether Fossil";
      } else {
        l = "Nether Fossil";
      }
      if (e[2][3].hasDriedGhast) {
        l += " (Ghast)";
      }
      return l;
    },
    getHoverText: function (e) {
      return e[2].map(function (n) {
        return "Fossil " + (n[3].hasDriedGhast ? "(Ghast)" : "") + " @ " + [a(n[0]), n[1], a(n[2])].filter(Boolean).join(" / ");
      }, "").join(", ");
    },
    getHash: i.chunk
  }),
  [t.EndCity]: u({
    shortId: "E",
    label: "End City",
    icon: "end-city",
    imgSrc: {
      default: "end-city.png",
      ship: "end-city-ship.png"
    },
    dimension: r.End,
    maxTileSize: o.normal,
    getImg: function (e) {
      if (e.hasShip == null || e.hasShip) {
        return "ship";
      } else {
        return "default";
      }
    },
    fillColor: function (e) {
      if (e == null || e.hasShip == null || e.hasShip) {
        return "73,49,73";
      } else {
        return "130,130,130";
      }
    },
    getTooltipText: function (e) {
      return "Likely " + (e[2].hasShip == null ? "End City" : e[2].hasShip ? "End City (with ship)" : "End City (without ship)");
    },
    getHoverText: function (e) {
      if (e[2].hasShip == null) {
        return null;
      } else if (e[2].hasShip) {
        return "End City with ship";
      } else {
        return "End City without ship";
      }
    },
    getHash: i.chunk
  }),
  [t.EndGateway]: s({
    shortId: "Eg",
    label: "End Gateway",
    icon: "end-gateway",
    imgSrc: "end-gateway.png",
    dimension: r.End,
    maxTileSize: o.normal,
    fillColor: "20,100,85",
    splitPois: g,
    getCoords: function (e) {
      return [e[2].x, null, e[2].z];
    },
    getHoverText: function (e) {
      return "End Gateway @ " + a(e[2][0].x) + " / " + a(e[2][0].z);
    },
    getTooltipText: function () {
      return "End Gateway";
    },
    getHash: function (e) {
      return i.xzBlock(e[2].x, e[2].z);
    }
  }),
  [t.NetherFortress]: u({
    shortId: "N",
    label: "Nether Fortress",
    icon: "nether-fortress2",
    imgSrc: "nether-fortress.png",
    dimension: r.Nether,
    maxTileSize: o.big,
    fillColor: "195,65,55",
    getCoords: function (e) {
      return [e[0] * 16 + 11, null, e[1] * 16 + 11];
    },
    getTooltipText: function () {
      return "Nether Fortress (Crossing)";
    },
    getHoverText: function (e) {
      return "Crossing @ " + a((e[0] << 4) + 11) + " / " + a((e[1] << 4) + 11);
    },
    getHash: i.chunk
  }),
  [t.Igloo]: u({
    shortId: "I",
    label: "Igloo",
    icon: "igloo2",
    imgSrc: {
      default: "igloo.png",
      basement: "igloo-basement.png"
    },
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.normal,
    getImg: function (e) {
      if (e.hasBasement) {
        return "basement";
      } else {
        return "default";
      }
    },
    fillColor: function (e) {
      if (e?.hasBasement) {
        return "35,87,205";
      } else {
        return "100,100,100";
      }
    },
    getTooltipText: function (e) {
      if (e[2].hasBasement == null) {
        return "Igloo";
      } else if (e[2].hasBasement) {
        return "Igloo (with basement)";
      } else {
        return "Igloo (without basement)";
      }
    },
    getHoverText: function (e) {
      if (e[2].hasBasement == null) {
        return null;
      } else if (e[2].hasBasement) {
        return "Igloo with basement";
      } else {
        return "Igloo without basement";
      }
    },
    getHash: i.chunk
  }),
  [t.JungleTemple]: u({
    shortId: "J",
    label: "Jungle Temple",
    icon: "jungle-temple",
    imgSrc: "jungle-temple.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.normal,
    getTooltipText: function (e, n) {
      if (n.edition === c.Java && n.javaVersion >= f.V1_18) {
        return "Likely Jungle Temple";
      } else {
        return "Jungle Temple";
      }
    },
    fillColor: "114,133,10",
    getHash: i.chunk
  }),
  [t.WoodlandMansion]: u({
    shortId: "Ma",
    label: "Mansion",
    fullLabel: "Woodland Mansion",
    icon: "mansion3",
    imgSrc: "mansion.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.small,
    getTooltipText: function (e, n) {
      if (n.edition === c.Java && n.javaVersion >= f.V1_18) {
        return "Likely Woodland Mansion";
      } else {
        return "Woodland Mansion";
      }
    },
    fillColor: "160,82,45",
    getHash: i.chunk
  }),
  [t.LavaPool]: s({
    shortId: "Lp",
    label: "Lava Pool",
    fullLabel: "Underground Lava Pool",
    icon: "lava",
    imgSrc: {
      default: "lava.png",
      bucket: "lava-bucket.png",
      cave: "lava-cave.png"
    },
    getImg: function (e) {
      if (e.type === "undergroundLake") {
        return "bucket";
      } else {
        return "cave";
      }
    },
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.chunkClassifier,
    splitPois: g,
    fillColor: "240,90,20",
    getHash: function (e) {
      return i.xzBlock(e[2].pos[0], e[2].pos[2]);
    },
    getTooltipText: function (e) {
      if (e[2].type === "cave") {
        return "Lava-Flooded Cave";
      } else {
        return "Likely Underground Lava Lake";
      }
    },
    getTooltipAdditionalText: function () {
      return "Never dig straight down";
    },
    getCoords: function (e) {
      return e[2].pos;
    }
  }),
  [t.Mineshaft]: u({
    shortId: "M",
    label: "Mineshaft",
    icon: "mineshaft2",
    imgSrc: "mineshaft.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.veryBig,
    getTooltipText: function () {
      return "Mineshaft";
    },
    fillColor: "160,130,10",
    getHash: i.chunk
  }),
  [t.OceanMonument]: u({
    shortId: "Om",
    label: "Monument",
    fullLabel: "Ocean Monument",
    icon: "ocean-monument2",
    imgSrc: "ocean-monument.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.normal,
    getTooltipText: function () {
      return "Ocean Monument";
    },
    fillColor: "100,100,220",
    getHash: i.chunk
  }),
  [t.OceanRuin]: u({
    shortId: "Or",
    label: "Ocean Ruins",
    icon: "ocean-ruin",
    imgSrc: {
      default: "ocean-ruin.png",
      special: "ocean-ruin-special.png"
    },
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.big,
    getImg: function (e) {
      if (e.isLarge && e.clusterSize > 0) {
        return "special";
      } else {
        return "default";
      }
    },
    fillColor: function (e) {
      if (e?.type === "cold") {
        if (e.isLarge && e.clusterSize > 0) {
          return "51,102,255";
        } else {
          return "80,98,149";
        }
      } else if (e?.isLarge && e?.clusterSize > 0) {
        return "255,82,51";
      } else {
        return "149,91,80";
      }
    },
    getTooltipText: function (e) {
      return _(e[2]);
    },
    getHoverText: function (e) {
      return _(e[2]);
    },
    getHash: i.chunk
  }),
  [t.PillagerOutpost]: u({
    shortId: "Po",
    label: "Outpost",
    fullLabel: "Pillager Outpost",
    icon: "pillager-outpost2",
    imgSrc: "pillager-outpost.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    getCoords: b,
    maxTileSize: o.normal,
    getTooltipText: function () {
      return "Pillager Outpost";
    },
    fillColor: "80,50,20",
    getHash: i.chunk
  }),
  [t.Ravine]: s({
    shortId: "Rv",
    label: "Ravine",
    icon: "ravine",
    imgSrc: {
      default: "ravine.png",
      special: "ravine-special.png",
      underwater: "ravine-underwater.png",
      underwaterSpecial: "ravine-underwater-special.png"
    },
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.chunkClassifier,
    splitPois: g,
    getCoords: function (e) {
      return [e[2].x, e[2].y, e[2].z];
    },
    getImg: function (e) {
      if (e.isUnderwater) {
        if (e.isMegaRavine) {
          return "underwaterSpecial";
        } else {
          return "underwater";
        }
      } else if (e.isMegaRavine) {
        return "special";
      } else {
        return "default";
      }
    },
    getTooltipText: function (e) {
      const n = e[2];
      return [n.isMegaRavine && "Mega", n.isUnderwater && "Underwater", "Ravine", n.thickness && "(Width: " + a(n.thickness) + ")"].filter(Boolean).join(" ");
    },
    getHoverText: function (e) {
      const n = e[2][0];
      return [n.isMegaRavine && "Mega", n.isUnderwater && "Underwater", "Ravine", "@ " + a(n.x) + " / " + a(n.y) + " / " + a(n.z)].filter(Boolean).join(" ");
    },
    fillColor: function (e) {
      if (e == null) {
        return "20,90,0";
      }
      const n = e[0];
      if (n.isUnderwater) {
        if (n.isMegaRavine) {
          return "168,7,213";
        } else {
          return "0,0,255";
        }
      } else if (n.isMegaRavine) {
        return "128,25,0";
      } else {
        return "20,90,0";
      }
    },
    getHash: function (e) {
      return i.xzBlock(e[2].x, e[2].z);
    }
  }),
  [t.OreVein]: s({
    shortId: "Ov",
    label: "Ore Veins",
    icon: "ore-vein",
    imgSrc: {
      default: "raw-iron.png",
      copper: "raw-copper.png",
      iron: "raw-iron.png"
    },
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    splitPois: g,
    getCoords: function (e) {
      return e[2].reference;
    },
    getImg: function (e) {
      return e.type;
    },
    maxTileSize: o.chunkClassifier,
    getTooltipText: function (e) {
      return [e[2].type === "copper" ? "Copper Vein" : "Iron Vein", "(" + v(e[2]) + ")"].join(" ");
    },
    fillColor: "110,75,40",
    getHash: function (e) {
      return i.xzBlock(e[2].reference[0], e[2].reference[2]);
    }
  }),
  [t.RuinedPortalOverworld]: u({
    shortId: "Rp",
    label: "Ruined Portal",
    fullLabel: "Ruined Portal Overworld",
    icon: "ruined-portal",
    imgSrc: "ruined-portal.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.big,
    getTooltipText: function () {
      return "Estimated Ruined Portal";
    },
    fillColor: "109,9,109",
    getHash: i.chunk
  }),
  [t.RuinedPortalNether]: u({
    shortId: "Rpn",
    label: "Ruined Portal",
    fullLabel: "Ruined Portal Nether",
    icon: "ruined-portal",
    imgSrc: "ruined-portal.png",
    dimension: r.Nether,
    maxTileSize: o.big,
    getTooltipText: function () {
      return "Estimated Ruined Portal";
    },
    fillColor: "109,9,109",
    getHash: i.chunk
  }),
  [t.Shipwreck]: u({
    shortId: "Sw",
    label: "Shipwreck",
    icon: "shipwreck2",
    imgSrc: "shipwreck.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.big,
    getTooltipText: function () {
      return "Shipwreck";
    },
    fillColor: "108,88,97",
    getHash: i.chunk
  }),
  [t.SlimeChunk]: u({
    shortId: "Sc",
    label: "Slime Chunk",
    icon: "slime",
    imgSrc: "slime.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.chunkClassifier,
    getTooltipText: function () {
      return "Slime Chunk";
    },
    fillColor: "29,145,44",
    fillColorOuter: "40,199,60",
    getHash: i.chunk,
    canOverlay: true,
    preferFill: true
  }),
  [t.Spawn]: u({
    shortId: "Sp",
    label: "Spawn Point",
    icon: "spawn",
    imgSrc: "spawn.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.small,
    getCoords: function (e) {
      return [e[2].x, null, e[2].z];
    },
    getTooltipText: function () {
      return "Estimated Spawn Point";
    },
    fillColor: "40,40,40",
    getHash: i.chunk
  }),
  [t.Stronghold]: u({
    shortId: "St",
    label: "Stronghold",
    icon: "stronghold",
    imgSrc: "stronghold.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.small,
    fillColor: "195,65,55",
    getCoords: function (e) {
      return [e[0] * 16 + 4, null, e[1] * 16 + 4];
    },
    getTooltipText: function () {
      return "Stronghold (Stairway)";
    },
    getHoverText: function (e) {
      return "Stronghold stairway @ " + a((e[0] << 4) + 4) + " / " + a((e[1] << 4) + 4);
    },
    getHash: i.chunk
  }),
  [t.TrailRuin]: u({
    shortId: "Tr",
    label: "Trail Ruins",
    icon: "trail-ruin",
    imgSrc: "trail-ruin.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground"],
    maxTileSize: o.normal,
    getTooltipText: function (e) {
      return "Trail Ruins";
    },
    getCoords: function (e) {
      return e[2].slice(0, 3);
    },
    fillColor: "123,80,20",
    getHash: i.chunk
  }),
  [t.TrialChamber]: u({
    shortId: "Tc",
    label: "Trial Chamber",
    icon: "trial-chamber",
    imgSrc: "trial-chamber.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: o.big,
    getTooltipText: function () {
      return "Trial Chamber";
    },
    getCoords: function (e) {
      return e[2] ?? [e[0] * 16, null, e[1] * 16];
    },
    fillColor: "113,45,25",
    getHash: i.chunk
  }),
  [t.Village]: u({
    shortId: "V",
    label: "Village",
    icon: "village2",
    imgSrc: {
      default: "village.png",
      zombie: "village-zombie.png"
    },
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.normal,
    getImg: function (e) {
      if (e.zombie) {
        return "zombie";
      } else {
        return "default";
      }
    },
    getCoords: b,
    fillColor: function (e) {
      if (e?.zombie) {
        return "200,0,190";
      } else if (e?.type == null) {
        return "179,163,60";
      } else {
        return {
          desert: "180,101,4",
          plains: "100,131,63",
          savanna: "138,128,56",
          taiga: "11,102,89",
          snowy: "120,120,120"
        }[e.type];
      }
    },
    getTooltipText: function (e) {
      return x(e[2]) || "Village";
    },
    getHoverText: function (e) {
      return x(e[2]);
    },
    getHash: i.chunk
  }),
  [t.WitchHut]: u({
    shortId: "Wh",
    label: "Witch Hut",
    icon: "witch-hut2",
    imgSrc: "witch-hut.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.normal,
    getTooltipText: function () {
      return "Witch Hut";
    },
    fillColor: "169,44,212",
    getHash: i.chunk
  }),
  [t.ItemOverworld]: u({
    shortId: "IOw",
    label: "Apple",
    fullLabel: "Enchanted Golden Apple",
    icon: "golden-apple",
    imgSrc: "golden-apple.png",
    dimension: r.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: o.small,
    fillColor: "145,81,13",
    getTooltipText: function () {
      return "Likely Enchanted Apple (temple chest)";
    },
    getHoverText: function () {
      return "Likely Enchanted Apple (temple chest)";
    },
    getHash: i.chunk,
    canOverlay: true
  })
};
const R = Object.fromEntries(Object.entries(h).map(e => [e[1].shortId, e[0]]));
function E(e, n) {
  return `${e}/${h[e].getHash(n)}`;
}
const H = [t.Spawn, t.SlimeChunk, t.Village, t.AncientCity, t.Dungeon, t.Stronghold, t.WoodlandMansion, t.OceanMonument, t.PillagerOutpost, t.Mineshaft, t.RuinedPortalOverworld, t.JungleTemple, t.DesertTemple, t.WitchHut, t.BuriedTreasure, t.Shipwreck, t.Igloo, t.OceanRuin, t.Fossil, t.Cave, t.Ravine, t.LavaPool, t.EndCity, t.EndGateway, t.NetherFortress, t.BastionRemnant, t.RuinedPortalNether, t.AmethystGeode, t.ItemOverworld, t.OreVein, t.DesertWell, t.TrailRuin, t.TrialChamber, t.FossilNether, t.AbandonedCamp];
const L = H.map(e => ({
  key: e,
  ...h[e]
}));
export { w as B, h as C, r as D, c as E, f as J, t as P, R as a, L as b, H as c, d, E as g };
/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */
//# chunkId=019fac75-f35b-71d2-99cf-4f320ac80fbc