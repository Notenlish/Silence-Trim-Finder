#include "finders.h"
#include "generator.h"
#include "jigsaw/jigsaw.h"
#include "loot/items.h"
#include "loot/loot_table_context.h"
#include "loot/loot_tables.h"

#include <inttypes.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// gcc ancient_city.c -L. -lcubiomes -fwrapv -lm -o ancient.exe

// This must be the same value as the JS code
#define MAX_CHESTS 500

struct chest_position {
  int64_t x;
  int64_t y;
  int64_t z;
};

static int floor_div(int a, int b) {
  int q = a / b;
  int r = a % b;
  return q - ((r != 0) && ((r < 0) != (b < 0)));
}

static int is_ancient_city_loot_table(const char *lootTable) {
  return lootTable &&
         (strcmp(lootTable, "chests/ancient_city") == 0 ||
          strcmp(lootTable, "minecraft:chests/ancient_city") == 0 ||
          strcmp(lootTable, "ancient_city") == 0);
}

static int is_ancient_city_ice_box_loot_table(const char *lootTable) {
  return lootTable &&
         (strcmp(lootTable, "chests/ancient_city_ice_box") == 0 ||
          strcmp(lootTable, "minecraft:chests/ancient_city_ice_box") == 0 ||
          strcmp(lootTable, "ancient_city_ice_box") == 0);
}

static int generated_loot_has_silence_trim(LootTableContext *ctx) {
  for (int i = 0; i < ctx->generated_item_count; i++) {
    ItemStack *item = &ctx->generated_items[i];
    if (get_global_item_id(ctx, item->item) ==
        ITEM_SILENCE_ARMOR_TRIM_SMITHING_TEMPLATE) {
      return 1;
    }
  }
  return 0;
}

static int generated_loot_has_item(enum Item target, LootTableContext *ctx) {
  for (int i = 0; i < ctx->generated_item_count; i++) {
    ItemStack *item = &ctx->generated_items[i];
    // is this correct?
    if (get_global_item_id(ctx, item->item) == target) {
      return 1;
    }
  }
  return 0;
}

/*
 * Searches ancient cities in the rectangle:
 *   [centerBlockX - rangeX, centerBlockX + rangeX]
 *   [centerBlockZ - rangeZ, centerBlockZ + rangeZ]
 *
 * centerBlockX/Z and rangeX/Z are block coordinates / block distances.
 * Prints every ancient city chest that generates a silence armor trim.
 * Returns the number of matching chests found.
 */
int searchAncientCityForTrims(uint64_t seed, int mc, int centerBlockX,
                              int centerBlockZ, int rangeX, int rangeZ,
                              enum Item item,
                              struct chest_position *chest_positions) {
  const int structureType = Ancient_City;
  StructureConfig sconf;
  Generator g;
  LootTableContext *lootCtx = NULL;
  LootTableContext *iceBoxCtx = NULL;
  int matches = 0;

  if (!getStructureConfig(structureType, mc, &sconf)) {
    fprintf(stderr, "Ancient cities are not supported for mc version %d\n", mc);
    return 0;
  }
  if (!init_loot_table_name(&lootCtx, "ancient_city", mc) || !lootCtx) {
    fprintf(stderr, "Could not initialise ancient_city loot table\n");
    return 0;
  }
  if (!init_loot_table_name(&iceBoxCtx, "ancient_city_ice_box", mc) ||
      !iceBoxCtx) {
    fprintf(stderr, "Could not initialise ancient_city_ice_box loot table\n");
    return 0;
  }

  setupGenerator(&g, mc, 0);
  applySeed(&g, DIM_OVERWORLD, seed);

  const uint64_t structureSeed = seed & ((1ULL << 48) - 1);
  const int regionBlockSize = sconf.regionSize * 16;
  const int minBlockX = centerBlockX - rangeX;
  const int maxBlockX = centerBlockX + rangeX;
  const int minBlockZ = centerBlockZ - rangeZ;
  const int maxBlockZ = centerBlockZ + rangeZ;
  const int minRegX = floor_div(minBlockX, regionBlockSize);
  const int maxRegX = floor_div(maxBlockX, regionBlockSize);
  const int minRegZ = floor_div(minBlockZ, regionBlockSize);
  const int maxRegZ = floor_div(maxBlockZ, regionBlockSize);

  for (int regX = minRegX; regX <= maxRegX; regX++) {
    for (int regZ = minRegZ; regZ <= maxRegZ; regZ++) {
      Pos p;
      if (!getStructurePos(structureType, mc, structureSeed, regX, regZ, &p))
        continue;

      if (p.x < minBlockX || p.x > maxBlockX || p.z < minBlockZ ||
          p.z > maxBlockZ)
        continue;

      if (!isViableStructurePos(structureType, &g, p.x, p.z, 0))
        continue;

      JigsawPiece pieces[1024];
      JigsawChest chests[256];
      int nPieces = 0;
      int nChests = getJigsawStructureLoot(structureType, mc, -1, seed,
                                           p.x >> 4, p.z >> 4, NULL, NULL,
                                           pieces, 1024, &nPieces, chests, 256);

      if (nChests < 0) {
        fprintf(stderr,
                "Failed to generate ancient city jigsaw loot at (%d, %d)\n",
                p.x, p.z);
        continue;
      }

      for (int i = 0; i < nChests; i++) {
        if (!chests[i].seedExact)
          continue;
        if (is_ancient_city_loot_table(chests[i].lootTable)) {
          set_loot_seed(lootCtx, chests[i].lootSeed);
          generate_loot(lootCtx);

          if (generated_loot_has_item(item, lootCtx) &&
              matches < (MAX_CHESTS)) {
            printf("MATCH seed=%" PRIu64
                   " city=(%d,%d) chest=(%d %d %d) lootSeed=%" PRIu64
                   " pieces=%d chestIndex=%d\n",
                   seed, p.x, p.z, chests[i].x, chests[i].y, chests[i].z,
                   chests[i].lootSeed, nPieces, i);
            chest_positions[matches].x = chests[i].x;
            chest_positions[matches].y = chests[i].y;
            chest_positions[matches].z = chests[i].z;

            matches++;
          }
        } else if (is_ancient_city_ice_box_loot_table(chests[i].lootTable)) {
          // Ice boxes never contain silence trims, but generate their loot
          // anyway so loot generation can be verified against vanilla.
          set_loot_seed(iceBoxCtx, chests[i].lootSeed);
          generate_loot(iceBoxCtx);
          // printf("ICEBOX seed=%" PRIu64
          //        " city=(%d,%d) chest=(%d %d %d) lootSeed=%" PRIu64
          //        " items=%d\n",
          //        seed, p.x, p.z, chests[i].x, chests[i].y, chests[i].z,
          //        chests[i].lootSeed, iceBoxCtx->generated_item_count);
        }
      }
    }
  }

  return matches;
}

/*
 * Parses a version argument into an MCVersion enum value.
 * Accepts either a plain integer (the enum value) or a version string
 * such as "1.20", "1.21.4", "1.21.11", "26.1".
 * Returns -1 on failure.
 */
static int parse_mc_version(const char *arg) {
  char *end = NULL;
  long v = strtol(arg, &end, 10);
  if (end && *end == '\0') {
    // plain integer: the MCVersion enum value
    if (v >= MC_1_19 && v <= MC_NEWEST)
      return (int)v;
    return -1;
  }

  int major = 0, minor = 0, patch = 0;
  if (sscanf(arg, "%d.%d.%d", &major, &minor, &patch) == 3) {
    if (major == 1 && minor == 21) {
      switch (patch) {
      case 0:
      case 1:
        return MC_1_21_1; // 1.21 - 1.21.1
      case 2:
      case 3:
        return MC_1_21_3; // 1.21.2 - 1.21.3
      case 4:
        return MC_1_21_WD; // 1.21.4
      case 5:
        return MC_1_21_5;
      case 6:
      case 7:
      case 8:
        return MC_1_21_6; // 1.21.6 - 1.21.8
      case 9:
      case 10:
        return MC_1_21_9; // 1.21.9 - 1.21.10
      case 11:
        return MC_1_21_11;
      default:
        return -1;
      }
    }
    if (major == 1 && minor == 20 && patch >= 0)
      return MC_1_20;
    if (major == 26 && minor == 1 && patch == 0)
      return MC_26_1;
    if (major == 26 && minor == 2 && patch == 0)
      return MC_26_2;
    return -1;
  }

  int a = 0, b = 0;
  if (sscanf(arg, "%d.%d", &a, &b) == 2) {
    if (a == 1 && b == 20)
      return MC_1_20;
    if (a == 1 && b == 21)
      return MC_1_21_1; // 1.21 -> 1.21.1
    if (a == 26 && b == 1)
      return MC_26_1;
    if (a == 26 && b == 2)
      return MC_26_2;
  }
  return -1;
}

int find_silence_trims(uint64_t seed, int centerX, int centerZ, int rangeX,
                       int rangeZ, int mc, struct chest_position *output) {
  printf("Searching seed=%" PRIu64 " mc=%d center=(%d,%d) range=(%d,%d)\n",
         seed, mc, centerX, centerZ, rangeX, rangeZ);
  // struct chest_position chest_positions[MAX_CHESTS];

  int matches = searchAncientCityForTrims(
      seed, mc, centerX, centerZ, rangeX, rangeZ,
      ITEM_SILENCE_ARMOR_TRIM_SMITHING_TEMPLATE, output);

  printf("Found %d silence trim chest(s).\n", matches);
  return matches;
  // return 1;
}

int find_ward_trims(uint64_t seed, int centerX, int centerZ, int rangeX,
                    int rangeZ, int mc, struct chest_position *output) {
  printf("Searching seed=%" PRIu64 " mc=%d center=(%d,%d) range=(%d,%d)\n",
         seed, mc, centerX, centerZ, rangeX, rangeZ);
  // struct chest_position chest_positions[MAX_CHESTS];

  int matches =
      searchAncientCityForTrims(seed, mc, centerX, centerZ, rangeX, rangeZ,
                                ITEM_WARD_ARMOR_TRIM_SMITHING_TEMPLATE, output);

  printf("Found %d silence trim chest(s).\n", matches);
  return matches;
  // return 1;
}

int main(int argc, char **argv) {
  uint64_t seed = 3075358256516822746ULL;
  int centerX = 0;
  int centerZ = 0;
  int rangeX = 10000;
  int rangeZ = 10000;
  int mc = MC_1_21_11;

  // collect positional args, ignoring -mc <version> flag pairs
  int positional[8];
  int npos = 0;
  for (int i = 1; i < argc; i++) {
    if (strcmp(argv[i], "-mc") == 0 && i + 1 < argc) {
      mc = parse_mc_version(argv[++i]);
      if (mc < 0) {
        fprintf(stderr, "Invalid version '%s'\n", argv[i]);
        return 1;
      }
    } else {
      positional[npos++] = i;
    }
  }

  if (npos > 0)
    seed = strtoull(argv[positional[0]], NULL, 10);
  if (npos > 2) {
    centerX = atoi(argv[positional[1]]);
    centerZ = atoi(argv[positional[2]]);
  }
  if (npos > 4) {
    rangeX = atoi(argv[positional[3]]);
    rangeZ = atoi(argv[positional[4]]);
  }
  if (npos > 5) {
    mc = parse_mc_version(argv[positional[5]]);
    if (mc < 0) {
      fprintf(stderr, "Invalid version '%s'\n", argv[positional[5]]);
      return 1;
    }
  }

  struct chest_position chest_positions[MAX_CHESTS];

  printf("Searching seed=%" PRIu64 " mc=%d center=(%d,%d) range=(%d,%d)\n",
         seed, mc, centerX, centerZ, rangeX, rangeZ);
  int matches = searchAncientCityForTrims(
      seed, mc, centerX, centerZ, rangeX, rangeZ,
      ITEM_WARD_ARMOR_TRIM_SMITHING_TEMPLATE, chest_positions);
  printf("Found %d ward trim chest(s).\n", matches);

  return 0;
}
