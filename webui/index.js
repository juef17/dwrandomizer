
$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)

/**
 * Imports a javascript file
 *
 * @param jsFile The name of the javascript file to import
 */
function require(jsFile) {
    let el = document.createElement('script');
    el.setAttribute('src', jsFile);
    document.head.append(el);
    return el;
}

/**
 * Determines if we are running in electron
 */
function isElectron() {
    return /electron/i.test(navigator.userAgent);
}

require('interface.js');
require('dwrandomizer.js');
require('base32.js');

let rom; let sprite_choices = [];
let log = ''
let error = ''

/**
 * Handler for wasm stdout
 */
function stdout(asciiCode) {
    new_char = String.fromCharCode(asciiCode);
    log += new_char
    if (new_char.endsWith('\n')) {
        console.log(log);
        log = '';
    }
}

/**
 * Handler for wasm stderr.
 */
function stderr(asciiCode) {
    new_char = String.fromCharCode(asciiCode);
    error += new_char
    if (new_char.endsWith('\n')) {
        console.error(error);
        error = '';
    }
}

/**
 * A class for holding ROM data
 */
class Rom extends Uint8Array {
    header() {
        return this.slice(0, 16);
    }

    /**
     * Overwrites data in the ROM
     *
     * @param addr The address to overwrite (not including the header)
     * @param data The new data
     */
    set(addr, data) {
        for (let i = 0; i < data.length; i++) {
            // add 16 to skip the header
            this[addr + 16 + i] = data[i];
        }
    }

    /**
     * Calls the wasm randomize() function with the provided arguments
     *
     * @param seed The seed number (64-bit).
     * @param flags The flags string (base32-encoded).
     * @param sprite The player's chosen sprite.
     */
    randomize(seed, flags, sprite) {
        console.log("Randomizing...");
        FS.writeFile('/'+this.name, this);
        this.seed = seed;
        this.flags = flags;
        let checksum = Module.ccall('dwr_randomize', 'BigInt',
            ['string', 'BigInt', 'string', 'string', 'string'],
            ['/'+this.name, seed, flags, sprite, '/'])
        this.outname = 'DWRando.' + seed + '.' + flags + '.nes';
        // return value is signed, so fix it if it's negative
        if (checksum < 0) checksum += 18446744073709551616n;
        return checksum;
    }

    /**
     * Prompts the user to save the generated ROM file
     */
    save() {
        this.output = FS.readFile('/'+this.outname);
        FS.unlink('/'+this.outname);
        let url = URL.createObjectURL(new Blob([this.output]), {
            type: 'application/octet-stream'
        });
        let downloader = document.createElement('a');
        downloader.href = url;
        downloader.download = this.outname;
        downloader.click();
        URL.revokeObjectURL(url);
    }
}

/**
 * Initializes the user interface
 */
function setup_ui() {
    if (!localStorage.flags)
        localStorage.flags = 'IVIAAVCAKACAAAAAAAAAAEAAAAIAAAAA'
    if (!localStorage.retainFlags)
        localStorage.retainFlags = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    ui = new Interface(20);
    ui.addTab('Gamepl.');
    ui.addTab('Feat.');
    ui.addTab('Monst.');
    ui.addTab('Shortc.');
    ui.addTab('Chall.');
    ui.addTab('Cosm.');
    ui.addTab('New 1');
    ui.addTab('New 2');
    ui.addSummaryTab('Summary');
    ui.setActiveTab('Gamepl.');

    ui.addTriOption('Gamepl.',  0,  0, 6, 'Shuffle Chests & Searches',
        'The items in chests and search locations will be randomized.');
    ui.addTriOption('Gamepl.',  2,  0, 4, 'Random Chest Locations',
        'Chests will be at a random set of predetermined locations.');
    ui.addTriOption('Gamepl.',  4,  0, 2, 'Random Growth',
        'Player statistical growth at each level will be randomized.');
    ui.addTriOption('Gamepl.',  6,  0, 0, 'Random Map',
        'The overworld map will be randomly generated.');
    ui.addTriOption('Gamepl.',  8,  1, 6, 'Random Spell Learning',
        'The order and level you learn spells will be random.');
    ui.addTriOption('Gamepl.',  1,  1, 4, 'Random Weapon Shops',
        'The weapons available in each shop will be randomized.');
    ui.addTriOption('Gamepl.',  3,  1, 2, 'Random Weapon Prices',
        'Pretty self-explanatory.');
    ui.addTriOption('Gamepl.',  5,  1, 0, 'Random XP Requirements',
        'Experience requirements for each level will be randomized.');
    ui.addTriOption('Gamepl.',  7,  2, 6, 'Heal/Hurt Before "More"',
        'HEAL must come before HEALMORE; HURT before HURTMORE.');
    ui.addTriOption('Gamepl.', 10,  2, 2, 'Stair Shuffle',
        'Where stairs take you inside dungeons will be randomized.');

    ui.addTriOption('Feat.',  0,  3, 6, 'Enable Menu Wrapping',
        'This enables cursor wrapping in menus.');
    ui.addTriOption('Feat.',  2,  3, 4, 'Enable Death Necklace',
        'Equipping the death necklace will cause +10AP and -25% HP.');
    ui.addTriOption('Feat.',  4,  3, 2, 'Enable Torches In Battle',
        'Torches and Fairy water can be thrown at monsters.');
    ui.addTriOption('Feat.',  1,  4, 6, 'Repel in Dungeons',
        'Enables REPEL to work in dungeons');
    ui.addTriOption('Feat.',  3,  4, 4, 'Permanent Repel',
        'REPEL will always be active.');
    ui.addTriOption('Feat.',  5,  4, 2, 'Permanent Torch',
        'At least a 3x3 area will always be lit in dungeons.');
    ui.addTriOption('Feat.',  6,  4, 0, 'Alternate Running Algorithm',
        'The run blocking multiplier will depend on where you are.');
    ui.addTriOption('Monst.',  0,  5, 6, 'Random Monster Abilities',
        'Monster spells and abilities will be randomized.');
    ui.addTriOption('Monst.',  2,  5, 4, 'Random Monster Zones',
        'Monster encounters in each zone will be randomized.');
    ui.addTriOption('Monst.',  4,  5, 2, 'Random Monster Stats',
        'Monster strength, agility, and HP will be randomized.');
    ui.addTriOption('Monst.',  6,  5, 0, 'Random Monster XP & Gold',
        'The XP and GOLD gained from monsters will be randomized.');
    ui.addTriOption('Monst.',  8,  6, 6, 'Make Random Stats Consistent',
        'This makes the random stats, XP, and GOLD consistent with one another.');
    ui.addTriOption('Monst.',  1,  6, 4, 'Scared Metal Slimes',
        'Metal Slimes will always have a chance to run.');
    ui.addTriOption('Monst.',  3,  6, 2, 'Scaled Metal Slime XP',
        'Metal Slime XP will depend on your current level.');

    ui.addTriOption('Shortc.',  0,  7, 6, 'Fast Text',
        'All text will progress much faster.');
    ui.addTriOption('Shortc.',  2,  7, 4, 'Speed Hacks',
        'Various aspects of the game will be much faster.');
    ui.addTriOption('Shortc.',  4,  7, 2, 'Open Charlock',
        'No need to create a bridge to enter Charlock Castle.');
    ui.addTriOption('Shortc.',  6,  7, 0, 'Short Charlock',
        'Charlock Dungeon will be much shorter.');
    ui.addTriOption('Shortc.',  8,  8, 6, "Don't Require Magic Keys",
        'All of the doors are unlocked. Just open them.');
    ui.addTriOption('Shortc.', 10, 13, 2, "Summer Sale",
        'All weapons and armor 35-65% off!');
    ui.addTriOption('Shortc.',  1,  8, 2, 'Cursed Princess',
        'Get Gwaelin to take a Cursed Belt when you return her to win.');
    ui.addTriOption('Shortc.',  3,  8, 0, "Three's Company",
        'Bring Gwaelin to the Dragonlord and accept his offer to win.');
    // leveling speed
    ui.addDropDown ('Shortc.',  7, 13, 4, 'Leveling Speed', {
        'Normal' : 0,
        'Fast' : 1,
        'Very Fast': 2
    });
    ui.addDropDown ('Shortc.',  9, 13, 6, 'Random Map Size', {
        'Normal' : 0,
        'Small' : 1,
        'Very Small': 2,
        'Random': 3
    });

    ui.addTriOption('Chall.',  0,  9, 6, 'No Hurtmore',
        'You will never learn HURTMORE. Monsters can still have it.');
    ui.addTriOption('Chall.',  2,  9, 4, 'No Numbers',
        'No numbers will be visible until the Dragonlord fight.');
    ui.addTriOption('Chall.',  4,  9, 2, 'Invisible Hero',
        'Your sprite will be invisible.');
    ui.addTriOption('Chall.',  6,  9, 0, 'Invisible NPCs',
        'All NPCs will be invisible.');
    ui.addTriOption('Chall.',  1, 13, 0, 'Treasure Guards',
        'Important items will have a mid-level monster guarding them.');
    ui.addTriOption('Chall.',  3, 10, 0, 'Big Swamp',
        'Approximately 60% of the overworld will be poisonous swamp.');
    ui.addTriOption('Chall.',  5, 10, 2, 'Randomly Rotate/Mirror Dungeons',
        'All dungeons will be rotated at random angles and/or mirrored.');
    ui.addTriOption('Chall.',  7, 10, 4, "No Armor in Charlock",
        "Prevent Erdrick's Armor from being in a chest in Charlock Castle.");
    ui.addTriOption('Chall.',  9, 10, 6, "Easy Charlock",
        "Make it slightly easier to run from high level monsters.");

    ui.addTriOption('Cosm.',  4, 11, 6, 'Modern Spell Names',
        'Use spell names from more recent DQ releases.');
    ui.addTriOption('Cosm.',  7, 11, 4, 'Noir Mode',
        "It's all black and white baby!");
    ui.addOption   ('Cosm.',  0, 14, 7, 'Shuffle Music',
        'Music in each area will be randomized.');
    ui.addOption   ('Cosm.',  2, 14, 6, 'Disable Music',
        'This disables the game music in most situations.');
    ui.addOption   ('Cosm.',  9, 14, 5, 'Disable Spell Flashing',
        'Prevents the screen from flashing when you cast spells.', true);
    ui.addOption   ('Cosm.',   6, 14, 4, 'Show Death Counter',
        'The stats window will also have a death counter.');
    ui.addOption   ('Cosm.',   3, 14, 3, 'Allow Custom Spell Names',
        'Allow spell names to be changed based on the chosen sprite.', true);
    ui.addOption   ('Cosm.',   5, 14, 2, 'Skip Original Credits',
        'Skip the original credits and go straight to stat scroll.', true);
    ui.addOption   ('Cosm.',   5, 14, 2, 'Skip Original Credits',
        'Skip the original credits and go straight to stat scroll.', true);

    ui.addTriOption('New 1',   0, 16, 2, 'Disguised Dragonlord',
        'The Dragonlord is now roaming Alefgard as a random NPC. The original Dragonlord location gives an hint to his whereabouts.');
    ui.addTriOption('New 1',   2, 16, 4, 'Randomize Flute Music',
        'Change the Fairy Flute sound to a new random tune.');
    ui.addTriOption('New 1',   4, 16, 6, 'Vendor Shuffle',
        'Weapon, fairy water, item, radishes and key vendors (except the Rimuldar key vendor) are shuffled.');
    ui.addTriOption('New 1',   6, 15, 6, 'Charlock Inn',
        'Make the final dive easier by having a comfy bed and breakfast at the Dragonlord\'s.');
    ui.addTriOption('New 1',   8, 15, 4, 'Only Healmore',
        'Never learn any spell other than this. Like the No Hurtmore flag, only works with Randomized Spells on.');
    ui.addTriOption('New 1',  10, 16, 0, 'Magic Herbs',
        'Make herbs refill MP rather than HP.');
    ui.addDropDown ('New 1',   1, 15, 2, 'Inn Prices', {
        'Vanilla' : 0,
        'Shuffled' : 1,
        'Random 1G-255G' : 2,
        'One of the above': 3
    });
    ui.addDropDown ('New 1',   3, 15, 0, 'Key Prices', {
        'Vanilla' : 0,
        'Shuffled' : 1,
        'Random 1G-255G' : 2,
        'One of the above': 3
    });
    ui.addTriOption('New 1',   5, 17, 2, 'DL1 Crits',
        'Allow excellent moves against the Dragonlord\'s 1st form.');
    ui.addTriOption('New 1',   7, 17, 0, 'DL2 Crits',
        'Allow excellent moves against the Dragonlord\'s 2nd form.');
    ui.addDropDown ('New 1',   9, 17, 4, 'Crit Chance', {
        'Vanilla (1/32)' : 0,
        'Double (1/16)' : 1,
        'Always (100%)' : 2,
        'Random (1-32)/32' : 3,
        'One of the above': 4
    });
    ui.addDropDown ('New 1',  11, 18, 5, 'Bonk Dmg', {
        'None' : 0,
        '1 HP' : 1,
        '2 HP' : 2,
        '20 HP' : 3,
        'Instakill' : 4,
        'Random (0-80)': 5,
        'One of the above': 6
    });
    ui.addTriOption('New 2',  0, 18, 3, 'Discardable Flute',
        'Make it possible to drop the flute on finding a new item with a full inventory.');
    ui.addDropDown ('New 2',  1, 18, 1, 'Flute is for', {
        'Golem' : 0,
        'All but DL2' : 1,
        'All' : 2,
        'One of the above': 3
    });
    ui.addOption   ('New 2',  2, 17, 7, 'Disable Red Flashes',
        'Prevents the screen from flashing when walking on damage tiles.');
    ui.addOption   ('New 2',  3, 18, 0, 'Level 1 Radiant',
        'If spells are randomized, makes sure the hero always knows Radiant.');
    ui.addOption   ('New 2',  4, 19, 7, 'Return Escapes',
        'Return can be used in battle for a guaranteed escape.');
    ui.addOption   ('New 2',  5, 19, 6, 'Return to Town',
        'Wings and Return send you to the last place you saved or used an inn at.');
    ui.addOption   ('New 2',  6, 19, 5, 'Warp Whistle',
        'The Fairy Flute will work as a warp whistle outside of battle, cycling between places you saved or used an inn at.');
    ui.addOption   ('New 2',  7, 19, 4, 'Hurtmore Doors',
        'Blast doors open with a cast of Hurtmore.');
    ui.addOption   ('New 2',  8, 19, 3, 'Levelup Refill',
        'Have HP and MP refilled after leveling up.');

    // player sprite
    let spriteBox;
    if (!isElectron()) {
        spriteBox = ui.addTextBox('Cosm.', 1, 'Player Sprite');
        spriteBox.setAttribute('list', 'sprites');
        spriteBox.value = localStorage.getItem('sprite') || 'Random';
        spriteBox.addEventListener('focus', function(event) {
            this.value = '';
        });
    } else {
        spriteBox = ui.addDropDown('Cosm.', 1, null, null,
            'Player Sprite', null, true);
        spriteBox.style.marginRight = '0.2em';
        spriteBox.style.width = '190px';
        spriteBox.parentElement.style.marginRight = "0";
    }
    spriteBox.getValue = function() {
        if (!sprite_choices.includes(this.value))
            return 'Random';
        return this.value;
    }
    spriteBox.id = "sprite-box";
    spriteBox.addEventListener(isElectron() ? 'change' : 'focusout',
        function(event) {
            if (this.value == '') {
                this.value = localStorage.getItem('sprite') || 'Random';
            }
            if (sprite_choices.includes(this.value)) {
                this.classList.remove('invalid');
                localStorage.setItem('sprite', this.value);
                spritePreview.setAttribute('src', 'sprites/' + this.getValue()
                    + '.png');
            } else {
                this.classList.add('invalid');
            }
            ui.updateSummary();
    });
    let spritePreview = ui.create('img', null, {
        'background-color': '#ccc',
        'border': '2px solid #ccc',
        'float': 'right',
        'height': '32px',
        'width': '32px'
    })
    spritePreview.id = 'sprite-preview';
    spritePreview.setAttribute('src', 'sprites/'
        + (localStorage.getItem('sprite') || 'Random') + '.png');
    spriteBox.parentElement.append(spritePreview);
    ui.updateSummary();
}

window.addEventListener('load', event => {
    Module["noFSInit"] = true;
    FS.init(() => {}, stdout, stdout);

    setup_ui();
    Module.onRuntimeInitialized = () => {
        ui.setVersion(Module.ccall('version', 'string'));
        let sprite_name = Module.cwrap('sprite_name', 'string', ['number']);
        let sprites_datalist = $('datalist#sprites');
        let spriteBox = $('#sprite-box');
        let i=0;
        while(true) {
            let name = sprite_name(i++);
            if (!name) break;
            let option = document.createElement('option');
            option.value = option.innerText = name;
            sprite_choices.push(name);
            if (isElectron()) {
                spriteBox.append(option);
            } else {
                sprites_datalist.append(option);
            }
        }
        if (isElectron())
            spriteBox.value = localStorage.getItem('sprite') || 'Random';
    };

    let rom_data = localStorage.getItem('rom_data');
    if (rom_data) {
        rom = new Rom(rom_data.split(','));
        ui.setInputFile(localStorage.getItem('rom_name'));
    }
});

