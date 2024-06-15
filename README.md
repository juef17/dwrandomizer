# Dragon Warrior Randomizer - juef edition #

This is a fork of [mcgrew's official Dragon Warrior Randomizer](https://dwrandomizer.com/), which you should use if you're looking for a fine, balanced and tuned experience! This unofficial version is merely a playground for me 🙂 Seed numbers and flags are incompatible with the official version. A prebuilt web app of this fork can be found [here](https://snestop.jerther.com/misc/dwr/unofficial_juef/), with <b>most of the new features in the 'New 1' and 'New 2' tabs</b>.

## New features ##

#### New post-credit music ####

Credits go to bran, auriplane, nicetas and myself. See `./expansion/music` for a list of songs. Open them with FamiStudio for more information.


#### Disguised Dragonlord ####

- A random NPC will have the Dragonlord dialogue;
- The NPC at the bottom of Charlock, still with the Dragonlord sprite, will tell the player the location and disguise of the new Dragonlord.
- Upon getting the Ball of Light, the player is teleported outside of the area the Dragonlord was fought in.

Every NPC can be the Dragonlord, except for:

- the King;
- the coordinates old man;
- the uncurse old man;
- the Rimuldar key vendor.

Additionnally, if the `Open Charlock` flag is off, it cannot be:

- the Staff of Rain old man;
- the Rainbow Drop old man.

Also, if the `No Keys` flag is on, it obviously cannot be a key vendor.

This makes an approximate probability of 1/120 that a specific NPC is the Dragonlord.


#### Randomized Flute Music ####

Randomizes the Fairy Flute song that is played when using the flute in a battle or on the overworld. The new song is chosen at random from over 60 possible songs (including the original). Since their lengths are variable, the song is tied to the seed number, not to give an advantage in a race situation. The songs are all between 2.4 and 8.2 seconds long, averaging about 5 seconds, and the original song is about 5 seconds long. For a preview of the songs or to know where they are from, see #community-contributions channel on Discord (Flute Toots thread). Major thanks to AsmadiGames for the initial work on this, as well as a handful of flute songs.


#### Vendor Shuffle ####

This shuffles every weapon, tool, fairy water and key vendor (except for Rimuldar's key vendor), as well as the radish vendor. The locations, positions, sprites and prices are not modified. If `Don't Require Magic Keys` flag is on, then the Rimuldar key vendor and the two other key vendors, wherever they are, are removed as they would ordinarily be. Otherwise, the Rimuldar key vendor will stay in Rimuldar, so the key logic does not have to change.


#### Charlock Inn ####

There is now an innkeeper in Charlock, near the treasury. Why an inn in Charlock? Why not?


#### Only Healmore ####

Never learn any spell other than Healmore (and Radiant, should the `Level 1 Radiant` flag be on). Like the No Hurtmore flag, this only works with `Randomized Spells` on.


#### Magic Herbs ####

Herbs refill MP rather than HP.


#### Inn & Key Prices ####

Inn and key prices can now be shuffled or randomized (1G - 255G). If you sell a key to an item vendor, you will get half the amount needed to buy a key in Rimuldar.


#### Dragonlord Crits ####

You can now allow critical hits against the Dragonlord. There is a separate flag for each of his two forms.


#### Crit Chance ####

The Excellent Move rate can be modified.


#### Damage Bonks ####

This makes every bonk deal damage to the player.


#### Disable Red Flashes ####

Prevents the screen from flashing when walking on damage tiles. If the `Damage Bonks` flag is on, the usual swamp damage sound is used instead of the bonking sound.


#### Discardable Flute ####

Make it possible to drop the flute on finding a new item with a full inventory.


#### Return Escapes ####

The Return spell can be used in battle for a guaranteed escape.


#### Return To Town ####

Wings and Return send you to the last place you saved or used an inn at.


#### Warp Whistle ####

The Fairy Flute will work as a warp whistle outside of battle, cycling between places you saved or used an inn at. The order is:

- Tantegel
- Brecconary
- Kol
- Garinham
- Cantlin
- Rimuldar


#### Levelup Refill ####

Have HP and MP refilled after leveling up.


#### Random Key & Herb Capacity ####

The maximum number of keys and herbs will be randomized.

- Herbs: between 0 and 9;
- Keys: between 2 and 9 (or 4 and 9 if Stair Shuffle or Random Chests Locations is on).


#### Flute Target ####

The Fairy Flute can now put all enemies to sleep. The Dragonlord's second form can be excluded or not.


#### Level 1 Radiant ####

Makes sure the player starts with Radiant and some MP. Like the No Hurtmore flag, this only works with `Randomized Spells` on.


#### Hurtmore Doors ####

Blast doors open with a cast of Hurtmore.


## Known Issues I intend to fix ##
- When there is no vendor in Rimuldar's vanilla key shop, the very top left tile of the town is an invisible wall. This is present in the official DWR version, where it usually doesn't matter. But since vendors can now be shuffled, it can be an important check, and Damage Bonks can ruin a player's day.


## Known Issues I do not intend to fix ##
- The bonk counter will not be active if `Damage Bonks` is on.
- With the `Disguised Dragonlord` flag, there may be some graphical glitches in both Dragonlord fights, depending on his's location. None of these affect the ability to run or to complete the game.
- The village music plays after spending the night at the inn, but it fixes itself as the music changes to something else (e.g. enemy encounter, cursed belt or death necklace use, outside, …).
- The list of visited inns for the `Warp Whistle` flag is not saved in SRAM, meaning that turning off the game will reset your warpable location list to Tantegel only. I have attempted to fix this and it didn't work, so unless there is a popular demand for it, it's gonna stay that way.
- When in critical HP and gaining a level with the `Levelup Refill` flag on, the text borders will stay red until the player's HP changes. I'd rather leave this as is because I estimate my chances of messing things up greater than the chances of fixing the problem 🙂
- When there is no vendor in Tantegel's vanilla key shop, returning the princess will make a throne room guard disappear. The player can leave the room to fix this.


## Issues I haven't been able to reproduce but you might run into ##
- Once, the original credits played a bit and then skipped to the post-credits stats screens. I was using cheats to progress more quickly.
- It was reported to me that a levelup in Charlock did not trigger the intended refill with the `Levelup Refill` flag on.
