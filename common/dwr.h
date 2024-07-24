
#ifndef _DWR_H_
#define _DWR_H_

#include <stdint.h>
#include <stdarg.h>
#include <stddef.h>

#include "build.h"
#include "dwr_types.h"

#define DWR_VERSION "UNOFFICIAL - JUEF v3.0.3.8"
#define VERSION DWR_VERSION

#define DEFAULT_FLAGS "IVIAAVCAKACAAAAAAAAAAEAAAAIAAAAA"
#define CHEST_COUNT 31

#define SHUFFLE_CHESTS(x)         (x->flags[ 0] & 0xc0)
#define RANDOM_CHEST_LOCATIONS(x) (x->flags[ 0] & 0x30)
#define RANDOMIZE_GROWTH(x)       (x->flags[ 0] & 0x0c)
#define RANDOM_MAP(x)             (x->flags[ 0] & 0x03)
#define RANDOMIZE_SPELLS(x)       (x->flags[ 1] & 0xc0)
#define RANDOMIZE_SHOPS(x)        (x->flags[ 1] & 0x30)
#define RANDOM_PRICES(x)          (x->flags[ 1] & 0x0c)
#define RANDOM_XP_REQS(x)         (x->flags[ 1] & 0x03)
#define HEAL_HURT_B4_MORE(x)      (x->flags[ 2] & 0xc0)
#define STAIR_SHUFFLE(x)          (x->flags[ 2] & 0x0c)

#define MENU_WRAP(x)              (x->flags[ 3] & 0xc0)
#define DEATH_NECKLACE(x)         (x->flags[ 3] & 0x30)
#define TORCH_IN_BATTLE(x)        (x->flags[ 3] & 0x0c)
#define REPEL_IN_DUNGEONS(x)      (x->flags[ 4] & 0xc0)
#define PERMANENT_REPEL(x)        (x->flags[ 4] & 0x30)
#define PERMANENT_TORCH(x)        (x->flags[ 4] & 0x0c)
#define ALTERNATE_RUNNING(x)      (x->flags[ 4] & 0x03)

#define RANDOMIZE_PATTERNS(x)     (x->flags[ 5] & 0xc0)
#define RANDOMIZE_ZONES(x)        (x->flags[ 5] & 0x30)
#define RANDOM_ENEMY_STATS(x)     (x->flags[ 5] & 0x0c)
#define RANDOM_ENEMY_DROPS(x)     (x->flags[ 5] & 0x03)
#define CONSISTENT_STATS(x)       (x->flags[ 6] & 0xc0)
#define SCARED_SLIMES(x)          (x->flags[ 6] & 0x30)
#define SCALED_SLIMES(x)          (x->flags[ 6] & 0x0c)

#define FAST_TEXT(x)              (x->flags[ 7] & 0xc0)
#define SPEED_HACKS(x)            (x->flags[ 7] & 0x30)
#define OPEN_CHARLOCK(x)          (x->flags[ 7] & 0x0c)
#define SHORT_CHARLOCK(x)         (x->flags[ 7] & 0x03)
#define NO_KEYS(x)                (x->flags[ 8] & 0xc0)
#define SUMMER_SALE(x)            (x->flags[13] & 0x0c)
#define FAST_XP(x)                (x->flags[13] & 0x10)
#define VERY_FAST_XP(x)           (x->flags[13] & 0x20)
#define SMALL_MAP(x)              (x->flags[13] & 0x40)
#define VERY_SMALL_MAP(x)         (x->flags[13] & 0x80)
#define RANDOM_MAP_SIZE(x)        (x->flags[13] & 0xc0)

#define NO_HURTMORE(x)            (x->flags[ 9] & 0xc0)
#define NO_NUMBERS(x)             (x->flags[ 9] & 0x30)
#define INVISIBLE_HERO(x)         (x->flags[ 9] & 0x0c)
#define INVISIBLE_NPCS(x)         (x->flags[ 9] & 0x03)
#define TREASURE_GUARDS(x)        (x->flags[13] & 0x03)
#define BIG_SWAMP(x)              (x->flags[10] & 0x03)
#define ROTATE_DUNGEONS(x)        (x->flags[10] & 0x0c)
#define NO_ARMOR_IN_CHARLOCK(x)   (x->flags[10] & 0x30)
#define EASY_CHARLOCK(x)          (x->flags[10] & 0xc0)

#define CURSED_PRINCESS(x)        (x->flags[ 8] & 0x0c)
#define THREES_COMPANY(x)         (x->flags[ 8] & 0x03)

#define MODERN_SPELLS(x)          (x->flags[11] & 0xc0)
#define NOIR_MODE(x)              (x->flags[11] & 0x30)
#define RANDOMIZE_MUSIC(x)        (x->flags[14] & 0x80)
#define DISABLE_MUSIC(x)          (x->flags[14] & 0x40)
#define NO_SCREEN_FLASH(x)        (x->flags[14] & 0x20)
#define DEATH_COUNTER(x)          (x->flags[14] & 0x10)
#define CUSTOM_SPELLS(x)          (x->flags[14] & 0x08)
#define SKIP_VANILLA_CREDITS(x)   (x->flags[14] & 0x04)

#define INN_IN_CHARLOCK(x)        ((x->flags[15] & 0xc0) >> 6) // 2-
#define ONLY_HEALMORE(x)          ((x->flags[15] & 0x30) >> 4) // 2-
#define SHUFFLE_INN_PRICES(x)     ((x->flags[15] & 0x0c) >> 2) // 2-
#define SHUFFLE_KEY_PRICES(x)     ((x->flags[15] & 0x03)     ) // 2-
#define SHUFFLE_VENDORS(x)        ((x->flags[16] & 0xc0) >> 6) // 2-
#define RANDOMIZE_FLUTE_MUSIC(x)  ((x->flags[16] & 0x30) >> 4) // 2-
#define DISGUISED_DRAGONLORD(x)   ((x->flags[16] & 0x0c) >> 2) // 2-
#define MAGIC_HERBS(x)            ((x->flags[16] & 0x03)     ) // 2-
#define NO_RED_FLASH(x)           ((x->flags[17] & 0x80) >> 7) // 1-
#define CRIT_DL1(x)               ((x->flags[17] & 0x0c) >> 2) // 2-
#define CRIT_DL2(x)               ((x->flags[17] & 0x03)     ) // 2-
#define CRIT_CHANCE(x)            ((x->flags[17] & 0x70) >> 4) // 3-
#define DAMAGE_BONKS(x)           ((x->flags[18] & 0xe0) >> 5) // 3-
#define DISCARDABLE_FLUTE(x)      ((x->flags[18] & 0x18) >> 3) // 2-
#define FORMIDABLE_FLUTE(x)       ((x->flags[18] & 0x06) >> 1) // 2-
#define LEVEL_1_RADIANT(x)        ((x->flags[18] & 0x01)     ) // 1-
#define RETURN_ESCAPES(x)         ((x->flags[19] & 0x80) >> 7) // 1-
#define RETURN_TO_ZOOM(x)         ((x->flags[19] & 0x40) >> 6) // 1-
#define WARP_WHISTLE(x)           ((x->flags[19] & 0x20) >> 5) // 1-
#define HURTMORE_DOORS(x)         ((x->flags[19] & 0x10) >> 4) // 1-
#define LEVELUP_REFILL(x)         ((x->flags[19] & 0x08) >> 3) // 1-
#define MAX_HERBS(x)              ((x->flags[19] & 0x04) >> 2) // 1-
#define MAX_KEYS(x)               ((x->flags[19] & 0x02) >> 1) // 1-



#ifdef __cplusplus
extern "C" {
#endif

/**
 * Randomizes a Dragon Warrior rom file
 *
 * @param input_file The name of the input file
 * @param seed The seed number to use for the random number generator
 * @param flags The flags to use for randomization options
 * @param output_dir The directory to write the new file to
 * @return A checksum for the new rom. This checksum is taken before certain
 *      options which don't affect gameplay.
 */
uint64_t dwr_randomize(const char* input_file, uint64_t seed, char *flags,
        const char *sprite_name, const char* output_dir);
uint16_t set_text(dw_rom *rom, const size_t address, char *text);

#ifdef __cplusplus
}
#endif
#endif

