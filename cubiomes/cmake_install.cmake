# Install script for directory: C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "C:/Program Files (x86)/cubiomes")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Release")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

# Set path to fallback-tool for dependency-resolution.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "C:/nim/dist/mingw64/bin/objdump.exe")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY OPTIONAL FILES "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/libcubiomes.dll.a")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE SHARED_LIBRARY FILES "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/cubiomes.dll")
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cubiomes.dll" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cubiomes.dll")
    if(CMAKE_INSTALL_DO_STRIP)
      execute_process(COMMAND "C:/nim/dist/mingw64/bin/strip.exe" "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cubiomes.dll")
    endif()
  endif()
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  include("C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/CMakeFiles/cubiomes.dir/install-cxx-module-bmi-Release.cmake" OPTIONAL)
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY FILES "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/libcubiomes_static.a")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  include("C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/CMakeFiles/cubiomes_static.dir/install-cxx-module-bmi-Release.cmake" OPTIONAL)
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include" TYPE FILE FILES
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/finders.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/carver.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/generator.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/layers.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/biomenoise.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/biomes.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/noise.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/terrainnoise.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/rng.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/util.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/quadbase.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/xrms.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/features/end_city.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/features/fortress.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/features/ore.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/features/stronghold.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/features/mineshaft.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_data.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_1_16_5.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_1_18_2.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_1_19_2.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_1_19_4.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_1_20_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_1_20_6.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_1_21_4.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/jigsaw/jigsaw_1_21_8.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/items.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/logging.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_functions.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_table_context.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_table_parser.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/mc_loot.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/ancient_city_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/ancient_city_1_21_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/ancient_city_1_21_6.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/ancient_city_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/ancient_city_26_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/ancient_city_26_2.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/ancient_city_ice_box_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/ancient_city_ice_box_26_2.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_bridge_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_bridge_1_16_5.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_bridge_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_hoglin_stable_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_hoglin_stable_1_16_5.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_other_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_other_1_16_5.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_other_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_other_1_21_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_other_1_21_9.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_treasure_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/bastion_treasure_1_16_5.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/buried_treasure_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/buried_treasure_1_18.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/buried_treasure_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/desert_pyramid_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/desert_pyramid_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/desert_pyramid_1_21_6.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/desert_pyramid_1_21_9.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/desert_pyramid_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/end_city_treasure_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/end_city_treasure_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/end_city_treasure_1_21_9.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/end_city_treasure_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/igloo_chest_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/jungle_temple_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/jungle_temple_1_14.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/jungle_temple_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/jungle_temple_1_21_6.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/jungle_temple_1_21_9.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/jungle_temple_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/jungle_temple_dispenser_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/nether_bridge_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/nether_bridge_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/nether_bridge_1_21_9.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/pillager_outpost_1_14.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/pillager_outpost_1_19_2.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/pillager_outpost_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/pillager_outpost_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/ruined_portal_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/ruined_portal_1_21_5.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_map_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_map_1_18.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_map_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_map_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_supply_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_supply_1_14.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_supply_1_17.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_supply_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_supply_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_treasure_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_treasure_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/shipwreck_treasure_1_21_11.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/simple_dungeon_1_14.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/stronghold_corridor_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/stronghold_corridor_1_18.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/stronghold_corridor_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/stronghold_corridor_1_21_6.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/stronghold_corridor_1_21_9.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/stronghold_crossing_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/stronghold_library_1_13.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/stronghold_library_1_20.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_armorer_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_butcher_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_cartographer_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_desert_house_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_fisher_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_fletcher_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_mason_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_plains_house_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_savanna_house_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_shepherd_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_snowy_house_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_taiga_house_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_tannery_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_temple_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_toolsmith_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/loot_tables/village_weaponsmith_1_16_1.h"
    "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/loot/cjson/cJSON.h"
    )
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
if(CMAKE_INSTALL_LOCAL_ONLY)
  file(WRITE "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/install_local_manifest.txt"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
endif()
if(CMAKE_INSTALL_COMPONENT)
  if(CMAKE_INSTALL_COMPONENT MATCHES "^[a-zA-Z0-9_.+-]+$")
    set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
  else()
    string(MD5 CMAKE_INST_COMP_HASH "${CMAKE_INSTALL_COMPONENT}")
    set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INST_COMP_HASH}.txt")
    unset(CMAKE_INST_COMP_HASH)
  endif()
else()
  set(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  file(WRITE "C:/Users/MONSTER/Documents/GitHub/Silence Trim Finder/cubiomes/${CMAKE_INSTALL_MANIFEST}"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
endif()
