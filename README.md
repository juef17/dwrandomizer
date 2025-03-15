# Dragon Warrior Randomizer - juef edition #

This is a fork of [mcgrew's official Dragon Warrior Randomizer](https://dwrandomizer.com/), which you should use if you're looking for a fine, balanced and tuned experience! This unofficial version is merely a playground for me 🙂 Seed numbers and flags are incompatible with the official version. A prebuilt web app of this fork can be found [here](https://snestop.jerther.com/misc/dwr/unofficial_juef/), with <b>most of the new features in the 'New 1', 'New 2' and 'New 3' tabs</b>.

## New features ##

#### New post-credit music ####

Credits go to bran, auriplane, nicetas and myself. See `./expansion/music` for a list of songs. Open them with FamiStudio for more information.


#### Disguised Dragonlord ####

- A random NPC will have the Dragonlord dialogue;
- The NPC at the bottom of Charlock, still with the Dragonlord sprite, will tell the player the location and disguise (or *sprite*) of the new Dragonlord.
- Upon getting the Ball of Light, the player is teleported outside of the area the Dragonlord was fought in.

Every NPC can be the Dragonlord, except for:

- the King;
- the coordinates old man;
- the uncurse old man;
- the Rimuldar key vendor.

Additionnally, if the `Open Charlock` flag is off, it cannot be:

- the Staff of Rain old man;
- the Rainbow Drop old man.

Also, if the `No Keys` flag is on, it obviously cannot be a key vendor, and if the `Radish Finish` flag is on, it cannot be the radish vendor.

This makes an approximate probability of 1/120 that a specific NPC is the Dragonlord.

In order to make room for the hint, one of the merchants in the bottom left corner of Tantegel has had his text hijacked and will be the same as the other merchant. Therefore, if they both have the same text, the flag is active (but the Dragonlord may still be in his vanilla location with a small probability).


#### Randomized Flute Music ####

Randomizes the Fairy Flute song that is played when using the flute in a battle or on the overworld. The new song is chosen at random from over 60 possible songs (including the original). Since their lengths are variable, the song is tied to the seed number, not to give an advantage in a race situation. The songs are all between 2.4 and 8.2 seconds long, averaging about 5 seconds, and the original song is about 5 seconds long. For a preview of the songs or to know where they are from, see #community-contributions channel on Discord (Flute Toots thread). Major thanks to AsmadiGames for the initial work on this, as well as a handful of flute songs.


#### Vendor Shuffle ####

This shuffles every weapon, tool, fairy water and key vendor, as well as the radish vendor. The locations, positions, sprites and prices are not modified. If `Don't Require Magic Keys` flag is on, then the Rimuldar key vendor and the two other key vendors, wherever they are, are removed as they would ordinarily be. Otherwise, the Rimuldar key vendor will stay in Rimuldar, so the key logic does not have to change.


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
- Keys: between 2 and 9 (or 1 and 9 if `Unbreakable Keys` is on, or between 3 and 9 if `Random Princess Location` is on, or between 4 and 9 if `Stair Shuffle` and `Short Charlock` are on, or between 5 and 9 if `Stair Shuffle`, `Short Charlock` and `Random Princess Location` are on).


#### Flute Target ####

The Fairy Flute can now put all enemies to sleep. The Dragonlord's second form can be excluded or not.


#### Level 1 Radiant / Repel ####

Makes sure the player starts with Radiant and/or Repel and some MP. Like the No Hurtmore flag, this only works with `Randomized Spells` on.


#### Hurtmore Doors ####

Blast doors open with a cast of Hurtmore.


#### Winter Theme ####

Thanks to Cyberdark86, Angel_FM and friends, you can now save a very wintery-looking Alefgard. Newly implemented: this will not change a seed's checksum!


#### Radish Finish ####

A new way to win the game: talk to the radish vendor while carrying Gwaelin so you can share those sweet, sweet radishes with her.


#### Safer DWI, DWII & DWIV Running Mechanics ####

Make the game use alternate mechanics for running away from an enemy from another game in the series. For Safer Dragon Warrior I, mechanics are untouched but a 4th run attempt will always be successful. For Dragon Warrior II, it's a flat 2/3 chance everytime. For Dragon Warrior IV, it goes like this:
- On your first and second run attempt in a battle, you have a 50% chance to get away.
- On your third run attempt in a battle, you have a 75% chance to get away.
- On your fourth run attempt, or if the enemy's asleep, you're guaranteed to get away.

This flag overrides both `Easy Charlock` and `Alternate Running Algorithm`.


#### Unbreakable Keys ####

Any key used outside of the throne room will not be removed from your inventory.


#### Ascetic King ####

King Lorik is feeling fair today and will let you keep your hard-earned gold when you die.


#### Step Counter ####

The post-credits sequence will show how many steps you've taken in your entire playthrough.


#### Differences from Standard ####

The `Summary` tab will now show differences between the chosen flagset and the standard flagset.


#### Modifiable Tristate Summer Sale chance ####

Normally, having `Summer Sale` on tristate will make each piece of gear have a 50% chance to have a reduced price. This probability can now be modified.


#### Unguarded Overworld Search Spot ####

There is now a flag to ensure the overworld search spots, a.k.a. coordinates, will be unguarded, even if `Treasure Guards` is on.


#### Gold Chest Contents ####

The amount of gold that gold chests hold can now be modified.


#### Random Princess Location ####

Gwaelin might not be in her usual Swamp Cave today. Look for her in [one of these](https://snestop.jerther.com/misc/dwr/random_princess_location/) locations (or in her vanilla spot). **Beware:** if `Stair Shuffle` is on, the randomizer will ***not*** check if the princess is accessible without going through Charlock. If you do turn both flags on, it is strongly recommended to also have `Open Charlock` on.


#### Normal Flute Speed ####

When On, this flag will ensure that `Speed Hacks` does not speed up the flute music.


#### Hints ####

In the vanilla game, some NPCs give directions that become just plain wrong when randomizing the map. `Hints` set to `Corrected` is an attempt at fixing them, making the detour to some NPCs somehow worth it.

Here's a list of changed dialog:
* NPC in Tantegel: `East of this castle is a town…` (this is a throne room guard's dialogue about Brecconary... but only before you leave it the first time!)
* NPC in Brecconary: `Within sight of Tantegel Castle to the south is Charlock…`
* NPC in Brecconary: `Go north to the seashore, then follow the coastline west until thou hath reached Garinham…` (the message is changed to give just one generic direction)
* NPC in Kol: `Dreadful is the South island.` (now says `entire world`, because there's not always 2 continents, and it may be confusing to give a single direction from one to the other)
* NPC in Kol: `Hast thou been to the southern island?` (changed to `outside of this hamlet`), for the same reason)
* Same NPC in Kol, if you say 'No': `To the south, I believe, there is a town called Rimuldar.`
* NPC in Kol: `East of Hauksness there is a town, ’tis said, where one may purchase weapons of extraordinary quality.`
* NPC in Garinham: `Once there was a town called Hawksness far to the south…`
* NPC in Garinham: `It is said that the Princess was kidnapped and taken eastward.` (for this one, I scrapped the direction: it might get confusing with 2 entrances to the cave, and with any or both of them being possibly in a town. I opted to instead give an hint about which cave she is in, in case you're playing with `Random Princess Location`.)
* NPC in Rimuldar: `Heed my warning! Travel not to the south` (changed to `inside caves`, because I didn't want to mess with zones and enemies to find out the most difficult one. It'd be kinda pointless.)
* NPC in Rimuldar: `Hast thou found a magic temple? (No:) Go to the south.`
* NPC in Rimuldar: `Over the western part of this island Erdrick created a rainbow.` (again, the island thing is bad, so I opted for a more generic message without a direction)

In most of the above, just the direction is changed. For instance, if you're in Kol, and Hawksness is at (50, 43) and Cantlin is at (44, 19), the NPC in the weapon shop will say: `North of Hauksness, 'tis said there is a town where one may purchase weapons of extraordinary quality.`, since Cantlin is just a bit West but a whole lot North of Hawksness.

Also, the NPC in Rimuldar hinting towards the Rainbow Drop cave will give directions to Tantegel or Garinham, should that cave's entrance be there.


## Known Issues ##
- In mcgrew's official DWR version, when a vendor is missing in Rimuldar (e.g. key vendor), the very top left tile of the town is an invisible wall. It doesn't matter then because there is no point in going there if there is no vendor. But since vendors can now be shuffled, it can be a valid check, and notably, coupling this with Damage Bonks could ruin a player's day. The block has been replaced with a water tile to avoid player frustration.
- When there is no vendor in Tantegel's vanilla key shop, returning the princess will make a throne room guard disappear. The player can leave the room to fix this.
- With the `Disguised Dragonlord` flag, there may be some graphical glitches in both Dragonlord fights, depending on his location. They are purely cosmetic and do not affect the ability to run away or to complete the game.
- The village music plays after spending the night at the `Inn In Charlock`, but it fixes itself as the music changes to something else (e.g. enemy encounter, death necklace use, …).
- The list of visited inns for the `Warp Whistle` flag is not saved in SRAM, meaning that turning off the game will reset your warpable location list to Tantegel only.
