

#ifndef _MAP_H_
#define _MAP_H_

#include <stdint.h>

#include "dwr_types.h"
#include "dwr.h"

/** Map tile indexes */
typedef enum {
    TILE_NOTSWAMP = -2,
    TILE_NONE     = -1,
    TILE_GRASS    = 0x0,
    TILE_DESERT   = 0x1,
    TILE_HILL     = 0x2,
    TILE_MOUNTAIN = 0x3,
    TILE_WATER    = 0x4,
    TILE_BLOCK    = 0x5,
    TILE_TREES    = 0x6,
    TILE_SWAMP    = 0x7,
    TILE_TOWN     = 0x8,
    TILE_CAVE     = 0x9,
    TILE_CASTLE   = 0xa,
    TILE_BRIDGE   = 0xb,
    TILE_STAIRS   = 0xc
} dw_tile;

/** Town border tile indexes */
typedef enum {
    BORDER_GRASS     = 0x0,
    BORDER_DESERT    = 0x1,
    BORDER_HILL      = 0x2,
    BORDER_BRICK     = 0x4,
    BORDER_SWAMP     = 0x6,
    BORDER_TREES     = 0xb,
    BORDER_WATER     = 0xf,
    BORDER_BLOCK     = 0x10,
    BORDER_MOUNTAIN  = 0x12,
} dw_border_tile;

/** Warp indices */
typedef enum {
    WARP_GARINHAM,
    WARP_STAFF_SHRINE,
    WARP_KOL,
    WARP_BRECCONARY,
    WARP_TANTEGEL,
    WARP_SWAMP_NORTH, /* 5 */
    WARP_CHARLOCK,
    WARP_SWAMP_SOUTH,
    WARP_MOUNTAIN_CAVE,
    WARP_RIMULDAR,
    WARP_HAUKSNESS,  /* 10 */
    WARP_CANTLIN, 
    WARP_JERK_CAVE,
    WARP_ERDRICKS_CAVE,
    WARP_CHARLOCK_SURFACE_1,
    WARP_CHARLOCK_SURFACE_2, /* 15 */
    WARP_CHARLOCK_SURFACE_3,
    WARP_TANTEGEL_BASEMENT,
    WARP_GARINS_GRAVE = 19,
    WARP_CHARLOCK_CHEST = 21,
    WARP_CHARLOCK_POINTLESS_1 = 24,
    WARP_CHARLOCK_POINTLESS_2 = 25,
    WARP_CHARLOCK_THRONE = 38,
    WARP_MOUNTAIN_CAVE_POINTLESS = 39,
    WARP_GARINS_GRAVE_POINTLESS = 45
} dw_warp_index;

enum {
    KEY_IN_TABLET   = 0x01,
    KEY_IN_MOUNTAIN = 0x02,
    KEY_IN_GRAVE    = 0x04,
    KEY_IN_BASEMENT = 0x10,
};

enum Direction {
    DIR_EAST,
    DIR_WEST,
    DIR_SOUTH,
    DIR_NORTH
};

#ifdef __cplusplus
extern "C" {
#endif

/**
 * Decodes the in-game map into a 2 dimentional array of tiles
 *
 * @param map The map struct
 */
void map_decode(dw_map *map);

/**
 * Generates a new in-game map.
 *
 * @param rom The rom struct
 * @return A boolean indicating whether terrain generation was successful or not
 */
void map_generate_terrain(dw_rom *rom);

/**
 * Changes directions in various NPC dialogs to reflect new map
 *
 * @param rom The rom struct
 * @return Nothing
 */
void fix_geography_talk(dw_rom *rom);

/**
 * Changes NPCs dialogue to give hints to the player
 *
 * @param rom The rom struct
 * @return Nothing
 */
void hints(dw_rom *rom);

/**
 * Gives "main" direction from one warp to another
 *
 * @param rom The rom struct
 * @param w1, w2, two warps
 * @return Direction (see above enum)
 */
enum Direction find_direction(dw_rom *rom, dw_warp_index w1, dw_warp_index w2);

/**
 * Sets given direction at specific point in the game's text
 *
 * @param rom The rom struct
 * @param address
 * @param Direction
 * @param cap
 * @return Nothing
 */
void set_direction(dw_rom *rom, const size_t address, enum Direction dir, BOOL cap);

/**
 * Remove useless spaces post hint generation.
 *
 * @param rom The rom struct
 * @param address
 * @return Nothing
 */
void remove_useless_spaces(dw_rom *rom, size_t address);

#ifdef __cplusplus
}
#endif
#endif


