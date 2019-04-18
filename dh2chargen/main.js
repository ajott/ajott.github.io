var character = {
    homeworld: "none",
    background: "none",
    role: "none",
    WS: 0,
    BS: 0,
    S: 0,
    T: 0,
    Ag: 0,
    Int: 0,
    Per: 0,
    WP: 0,
    Fel: 0,
    Infl: 0,
    Wounds: 0,
    Fate: 0,
    Movement: [],
    Fatigue: 0,
    Carry: 0,
    Aptitudes: ["General"],
    Talents: [],
    Equip: [],
    Skills: [],
    HomeBonus: "",
    BackBonus: "",
    RoleBonus: "",
    CharPlus: [],
    CharMinus: "",
    Divination: "",
    Experience: 1000
}

var homeworlds = {
    // The homeworld determines a character's characteristics for which they get a bonus or mallus,
    // as well as their fate points, the threshold for getting an additional fate point ("Emperor's Blessing"),
    // their base amount of wounds, a bonus, as well as their first real aptitude.

    "none": {
        aptitude: ""
    },
    "feral": {
        charPlus: ["S", "T"],
        charMinus: "Infl",
        fate: 2,
        blessing: 3,
        wounds: 9,
        bonus: "The Old Ways: A Feral World character's Low-Tech weapons lose any present Primitive Qualities and gain the Proven (3) Quality.",
        aptitude: "Toughness",
        name: "Feral World"
    },
    "forge": {
        charPlus: ["Int", "T"],
        charMinus: "Fel",
        fate: 3,
        blessing: 8,
        wounds: 8,
        bonus: "Omnissiah's Chosen: A Forge World character gains the Technical Knock or Weapon-Tech Talent. ",
        aptitude: "Intelligence",
        talent: "Technical Knock ZZ Weapon-Tech",
        name: "Forge World"
    },
    "highborn": {
        charPlus: ["Fel", "Infl"],
        charMinus: "T",
        fate: 4,
        blessing: 10,
        wounds: 9,
        bonus: "Breeding Counts: A Highborn character reduces Influence losses by 1, to a minimum loss of 1. ",
        aptitude: "Fellowship",
        name: "Highborn"
    },
    "hive": {
        charPlus: ["Ag", "Per"],
        charMinus: "WP",
        fate: 2,
        blessing: 6,
        wounds: 7,
        bonus: "Teeming Masses in Metal Mountains: A Hive World character moves through crowds as if they were open terrain and gains a +20 bonus to Navigate (Surface) Tests in closed spaces. ",
        aptitude: "Perception",
        name: "Hive World"
    },
    "shrine": {
        charPlus: ["Fel", "WP"],
        charMinus: "Per",
        fate: 3,
        blessing: 6,
        wounds: 8,
        bonus: "Faith in the Creed: When spending a Fate Point, a Shrine World character's number of Fate Points are not reduced on a 1d10 result of 1.",
        aptitude: "Willpower",
        name: "Shrine World"
    },
    "voidborn": {
        charPlus: ["Int", "WP"],
        charMinus: "S",
        fate: 3,
        blessing: 5,
        wounds: 7,
        bonus: "Child of the Dark: A voidborn character starts with the Strong Minded talent, and gains a +30 bonus to tests for moving in zero-gravity",
        aptitude: "Intelligence",
        talent: "Strong Minded",
        name: "Voidborn"
    },
    "agri": {
        charPlus: ["Fel", "S"],
        charMinus: "Ag",
        fate: 2,
        blessing: 7,
        wounds: 8,
        bonus: "Strength from the Land: An agri-world character starts with the Brutal Charge (2) Trait",
        aptitude: "Strength",
        name: "Agri-World"
    },
    "feudal": {
        charPlus: ["Per", "WS"],
        charMinus: "Int",
        fate: 3,
        blessing: 6,
        wounds: 9,
        bonus: "At Home in Armour: A feudal world character ignores the maximum Agility value imposed by any armour he is wearing",
        aptitude: "Weapon Skill",
        name: "Feudal World"
    },
    "frontier": {
        charPlus: ["BS", "Per"],
        charMinus: "Fel",
        fate: 3,
        blessing: 7,
        wounds: 7,
        bonus: "Rely on None but Yourself: A frontier world character gains a +20 bonus to Tech-Use tests when applying a personal weapon modification, and a +10 bonus when repairing damaged items",
        aptitude: "Ballistic Skill",
        name: "Frontier World"
    },
    "death": {
        charPlus: ["Ag", "Per"],
        charMinus: "Fel",
        fate: 2,
        blessing: 5,
        wounds: 9,
        bonus: "Survivor's Paranoia: While a death world character is Surprised, non-Surprised attackers do not gain the normal +30 bonus to their Weapon and Ballistic Skill tests when targeting this character",
        aptitude: "Fieldcraft",
        name: "Death World"
    },
    "garden": {
        charPlus: ["Fel", "Ag"],
        charMinus: "T",
        fate: 2,
        blessing: 4,
        wounds: 7,
        bonus: "Serenity of the Green: A garden world character halves the duration (rounding up) of any result from Shock or Mental Traumas, and can remove Insanity Points for 50xp per point, rather than the normal 100xp",
        aptitude: "Social",
        name: "Garden World"
    },
    "research": {
        charPlus: ["Int", "Per"],
        charMinus: "Fel",
        fate: 2,
        blessing: 4,
        wounds: 8,
        bonus: "Pursuit of Data: Whenever a research station character reaches Rank 2 (Trained) in a Scholastic Lore skill, he also gains Rank 1 (Known) in one related or identical Forbidden Lore skill specialisation of their choice. The GM is the final arbiter of whether the two specialisations are related.",
        aptitude: "Knowledge",
        name: "Research Station"
    },
    "daemon": {
        charPlus: ["WP", "Per"],
        charMinus: "Fel",
        fate: 3,
        blessing: 4,
        wounds: 7,
        bonus: "Touched by the Warp: A Daemon world native begins with one rank in the Psyniscience skill. Should he gain this skill again in a later step of character creation, he instead gains one additional rank of this skill. This character also begins with 1d10+5 Corruption Points ",
        aptitude: "Willpower",
        skill: "Psyniscience",
        name: "Daemon World"
    },
    "penal": {
        charPlus: ["T", "Per"],
        charMinus: "Fel",
        fate: 3,
        blessing: 8,
        wounds: 10,
        bonus: "Finger on the Pulse: One survives a penal colony by instinctively knowing who is in charge and who is a threat. A penal colony character begins with one rank in Common Lore (Underworld) and Scrutiny skills, and starts with the Peer (Criminal Cartels) talent.",
        talent: "Peer (Criminal Cartels)",
        aptitude: "Toughness",
        name: "Penal Colony"
    },
    "quarantine": {
        charPlus: ["BS", "Int"],
        charMinus: "S",
        fate: 3,
        blessing: 9,
        wounds: 8,
        bonus: "Secretive by Nature: Those who manage to leave a quarantine world learn how to keep secrets. Wheneve the warband's Subtlety would decrease, it decreases by 2 less (to a minimum of 1)",
        aptitude: "Fieldcraft",
        name: "Quarantine World"
    }
}

var backgrounds = {
    // A character's background provides a further choice in aptitudes, another bonus,
    // as well as some starting skills, talents, and equipment

    // The "ZZ" denotes that the user will have a dropdown to choose which option they'd like.
    // This was used rather than "or" as no strings other than those specifically with choices
    // would have a "ZZ" in them... probably.

    "none": {
        aptitude: "",
        bonus: "",
        skills: [],
        talents: [],
        equipment: []
    },
    "admin": {
        aptitude: "Knowledge ZZ Social",
        bonus: "Master of Paperwork: An Adeptus Administratum character counts the Availability of all items as one level more available (Very Rare items count as Rare, Average items count as Common, etc.)",
        skills: ["Commerce ZZ Medicae", "Common Lore (Adeptus Administratum)", "Linguistics (High Gothic)", "Logic", "Scholastic Lore (Pick One)"],
        talents: ["Weapon Training (Las) ZZ Weapon Training (Solid Projectile)"],
        equipment: ["Laspistol ZZ Stub Automatic", "Imperial Robes", "Autoquill", "Chrono", "Dataslate", "Medi-Kit"],
        name: "Adeptus Administratum"
    },
    "arbite": {
        aptitude: "Offense ZZ Defense",
        bonus: "The Face of the Law: An Arbitrator can intimidation and Interrogation test, and can substitute his Willpower bonus for his degrees of success on these tests.",
        skills: ["Awareness", "Common Lore (Adeptus Arbites)", "Common Lore (Underworld)", "Inquiry ZZ Interrogation", "Intimidate", "Scrutiny"],
        talents: ["Weapon Training (Shock) ZZ Weapon Training (Solid Projectile)"],
        equipment: ["Shotgun ZZ Shock Maul", "Enforcer Light Carapace Armour ZZ Carapace Chest Plate", "3 doses of Stimm", "Manacles", "12 Lho Sticks"],
        name: "Adeptus Arbites"
    },
    "astra": {
        aptitude: "Defense ZZ Psyker",
        bonus: "The Constant Threat: When the character or an ally within 10 meters triggers a roll on the Table 6-2: Psychic Phenomenon (pg 196). Adeptus Astra Telepathica character can increase or decrease the result by amount equal to his Willpower bonus. Tested on Terra: If the character takes the Psyker elite advance during character creation, he also gains the Sanctioned trait (pg 138).",
        skills: ["Awareness", "Common Lore (Adeptus Astra Telepathica)", "Deceive ZZ Interrogation", "Forbidden Lore (the Warp)", "Psyniscience ZZ Scrutiny"],
        talents: ["Weapon Training (Las)", "Weapon Training (Low-Tech)"],
        equipment: ["Laspistol", "Staff ZZ Whip", "Light Flak Cloak ZZ Flak Vest", "Micro-bead ZZ Psy Focus"],
        name: "Adeptus Astra Telepathica"
    },
    "admech": {
        aptitude: "Knowledge ZZ Tech",
        bonus: "Replace the Weak Flesh: An Adeptus Mechanicus character counts the Availability of all cybernetics as two levels more available (Rare items count as Average, Very Rare items count as Scarce, etc.).Starting Trait: Mechanicus Implants (pg 137).",
        skills: ["Awareness ZZ Operate (Pick One)", "Common Lore (Adeptus Mechanicus)", "Logic", "Security", "Tech-Use"],
        talents: ["Mechadendrite Use (Utility)", "Weapon Training (Solid Projectile)"],
        equipment: ["Autogun ZZ Hand Cannon", "Monotask Servo-skull (Utility) ZZ Optical Mechadendrite", "Imperial Robes", "2 vials of Sacred Unguents"],
        name: "Adeptus Mechanicus"
    },
    "ministorum": {
        aptitude: "Leadership ZZ Social",
        bonus: "Faith is All: When spending a Fate point to gain a+10 bonus to any one test, an Adeptus Ministorum character gains a +20 bonus instead.",
        skills: ["Charm", "Command", "Common Lore (Adeptus Ministorum)", "Inquiry ZZ Scrutiny", "Linguistics (High Gothic)"],
        talents: ["Weapon Training (Flame) ZZ Weapon Training (Low-Tech, Solid Projectile)"],
        equipment: ["Hand Flamer ZZ Warhammer and Stub Revolver", "Imperial Robes ZZ Flak Vest", "Backpack", "Glow-globe", "Monotask Servo-skull (Laud Hailer)"],
        name: "Adeptus Ministorum"
    },
    "guard": {
        aptitude: "Fieldcraft ZZ Leadership",
        bonus: "Hammer of the Emperor: When attacking a target that an ally attacked since the end of the Guardsman's last turn, the Guardsman can re-roll any results of 1 or 2 damage rolls. ",
        skills: ["Athletics", "Command", "Common Lore (Imperial Guard)", "Medicae ZZ Operate (Surface)", "Navigate (Surface)"],
        talents: ["Weapon Training (Las)", "Weapon Training (Low-Tech)"],
        equipment: ["Lasgun ZZ Laspistol and Sword", "Combat Vest", "Imperial Guard Flak Armour", "Grapnel and Line", "12 Lho Sticks", "Magnoculars"],
        name: "Imperial Guard"
    },
    "outcast": {
        aptitude: "Fieldcraft ZZ Social",
        bonus: "Never Quit: An Outcast character counts his Toughness bonus as two higher for purposes of determining Fatigue.",
        skills: ["Acrobatics ZZ Sleight of Hand", "Common Lore (Underworld)", "Deceive", "Dodge", "Stealth"],
        talents: ["Weapon Training (Chain)", "Weapon Training (Las) ZZ Weapon Training (Solid Projectile)"],
        equipment: ["Autopistol ZZ Laspistol", "Chainsword", "Armoured Body Glove ZZ Flak Vest", "Injector", "2 doses of Obscura ZZ 2 doses of Slaught"],
        name: "Outcast"
    },
    "sororitas": {
        aptitude: "Offense ZZ Social",
        bonus: "Incorruptible Devotion: Whenever an Adepta Sororitas character would gain 1 or more Corruption Points, she gains that many Insanity Points minus 1 (to a minimum of 0) instead.",
        skills: ["Athletics", "Charm ZZ Intimidate", "Common Lore (Adepta Sororitas)", "Linguistics (High Gothic)", "Medicae ZZ Parry"],
        talents: ["Weapon Training (Chain)", "Weapon Training (Las) ZZ Weapon Training (Flame)"],
        equipment: ["Hand Flamer ZZ Laspistol", "Chainblade", "Armoured Body Glove", "Chrono", "Dataslate", "Stablight", "Micro-bead"],
        name: "Adepta Sororitas"
    },
    "mutant": {
        aptitude: "Fieldcraft ZZ Offense",
        bonus: "Twisted Flesh: A Mutant character can always choose to fail any test associated with resisting malignancy or mutation. Whenever he would gain a malignancy, he may roll to gain a mutation instead. Starts with 10 corruption and rolls 5d10 to determine starting mutation. Has one of the following Traits: Amphibious, Dark-sight, Natural Weapons, Sonar Sense, Sturdy, Toxic (1), Unnatural Agility (1), Unnatural Strength (1), or Unnatural Toughness (1)",
        skills: ["Acrobatics ZZ Athletics", "Awareness", "Deceive ZZ Intimidate", "Forbidden Lore (Mutants)", "Survival"],
        talents: ["Weapon Training (Low-Tech)", "Weapon Training (Solid Projectile)"],
        equipment: ["Shotgun ZZ Stub Revolver and Great Weapon", "Grapnel and Line", "Heavy Leathers", "Combat Vest", "2 doses of Stimm"],
        name: "Mutant"
    },
    "heretek": {
        aptitude: "Finesse ZZ Tech",
        bonus: "Master of Hidden Lores: When a Heretek makes a Tech-Use test to comprehend, use, repair, or modify an unfamiliar device, he gains a +20 bonus if he has one or more relevant Forbidden Lore skill specialisations at Rank 1 (Known) or higher. Hereteks also start with Mechanicus Implants.",
        skills: ["Deceive ZZ Inquiry", "Forbidden Lore (Pick One)", "Medicae ZZ Security", "Tech-Use", "Trade (Pick One)"],
        talents: ["Weapon Training (Solid Projectile)"],
        equipment: ["Stub Revolver", "2 clips of Man-Stopper Rounds ZZ 2 clips of Expander Bullets", "Web Grenade", "Combi-Tool", "Flak Cloak", "Filtration Plugs", "1 dose of De-Tox", "Dataslate", "Stablight"],
        name: "Heretek"
    },
    "navy": {
        aptitude: "Offense ZZ Tech",
        bonus: "Close Quarters Discipline: An Imperial Navy character scores one additional degree of success on successful Ballistic Skill tests he makes against targets at Point-Blank range, at Short range, and with whom he is engaged in melee.",
        skills: ["Athletics", "Command ZZ Intimidate", "Common Lore (Imperial Navy)", "Navigate (Stellar)", "Operate (Aeronautica) ZZ Operate (Voidship)"],
        talents: ["Weapon Training (Chain) ZZ Weapon Training (Shock)", "Weapon Training (Solid Projectile)"],
        equipment: ["Combat Shotgun ZZ Hand Cannon", "Chainsword ZZ Shock Whip", "Flak Coat", "Rebreather", "Micro-bead"],
        name: "Imperial Navy"
    },
    "rogue": {
        aptitude: "Finesse ZZ Social",
        bonus: "Inured to the Xenos: A character from a Rogue Trader Fleet gains a +10 bonus to Fear tests caused by aliens and a +20 bonus to Interaction skill tests with alien characters.",
        skills: ["Charm ZZ Scrutiny", "Commerce", "Common Lore (Rogue Traders)", "Linguistics (Pick One Alien Language)", "Operate (Surface) ZZ Operate (Aeronautica)"],
        talents: ["Weapon Training (Las) ZZ Weapon Training (Solid Projectile)", "Weapon Training (Shock)"],
        equipment: ["Laspistol ZZ Autopistol (Compact)", "Shock Maul", "Mesh Cloak ZZ Carapace Chest Plate", "Auspex", "Chrono"],
        name: "Rogue Trader Fleet"
    },
    "exorcised": {
        aptitude: "Defense ZZ Knowledge",
        bonus: "Touched by a Daemon: An exorcised character counts his Insanity Bonus as 2 higher for purposes of avoiding Fear tests. Additionally, he can never again be possessed by a daemon. In addition, an exorcised character begins with one Malignancy",
        skills: ["Awareness", "Deceive ZZ Inquiry", "Dodge", "Forbidden Lore (Daemonology)", "Intimidate ZZ Scrutiny"],
        talents: ["Hatred (Daemons)", "Weapon Training (Solid Projectile)", "Weapon Training (Chain)"],
        equipment: ["Autopistol ZZ Stub Revolver", "Chainblade", "Imperial Robes", "3 doses of Obscura ZZ 3 doses of Tranq", "Disguise Kit ZZ Excruciator Kit", "Rebreather", "Stablight ZZ Glow-globe"],
        name: "Exorcised"
    }
}

var roles = {
    // A character's role gives them their final pre-set aptitudes, as well as
    // another talent and another bonus

    "none": {
        aptitudes: [],
        talent: "",
        bonus: ""
    },
    "assassin": {
        aptitudes: ["Agility", "Ballistic Skill ZZ Weapon Skill", "Fieldcraft", "Finesse", "Perception"],
        talent: "Jaded ZZ Leap Up",
        bonus: "Sure Kill: In addition to the normal uses of Fate points(pg 293), when an Assassin successfully hits with an attack, he may spend a Fate point to inflict additional damage equal to his degrees of success on the attack roll on the first hit the attack inflicts.",
        name: "Assassin"
    },
    "chirurgeon": {
        aptitudes: ["Fieldcraft", "Intelligence", "Knowledge", "Strength", "Toughness"],
        talent: "Resistance (Pick One) ZZ Takedown",
        bonus: "Dedicated Healer: In addition to the normal uses of Fate points (pg 293), when a Chirurgeon character fails a test to provide First Aid, he can spend a Fate point to automatically succeed instead with the degrees of success equal to his Intelligence bonus.",
        name: "Chirurgeon"
    },
    "desperado": {
        aptitudes: ["Agility", "Ballistic Skill", "Defense", "Fellowship", "Finesse"],
        talent: "Catfall ZZ Quick Draw",
        bonus: "Move and Shoot: Once per round, after performing Move action, a Desperado character may perform a single Standard Attack with a Pistol weapon he is currently wielding as a Free Action.",
        name: "Desperado"
    },
    "hierophant": {
        aptitudes: ["Fellowship", "Offense", "Social", "Toughness", "Willpower"],
        talent: "Double Team ZZ Hatred (Choose Group)",
        bonus: "Sway the Masses: In addition to the normal uses of Fate points (pg 293), a Hierophant character may spend a Fate point to automatically succeed at a Charm, Command, or Intimidate skill test with a number of degrees of success equal to his Willpower bonus. ",
        name: "Hierophant"
    },
    "mystic": {
        aptitudes: ["Defense", "Intelligence", "Knowledge", "Perception", "Willpower"],
        talent: "Resistance (Psychic Powers) ZZ Warp Sense",
        bonus: "Stare into the Warp: A Mystic character starts the game with the Psyker elite advance (pg 90). It is recommended that a character who wishes to be a Mystic have a Willpower of at least 35.",
        name: "Mystic"
    },
    "sage": {
        aptitudes: ["Intelligence", "Knowledge", "Perception", "Tech", "Willpower"],
        talent: "Ambidextrous ZZ Clues from the Crowds",
        bonus: "Quest for Knowledge: In addition to the normal uses of Fate points (pg 293), a Sage character may spend a Fate point to automatically succeed at a Logic or any Lore skill test with a number of degrees of success equal to his Intelligence bonus.",
        name: "Sage"
    },
    "seeker": {
        aptitudes: ["Fellowship", "Intelligence", "Perception", "Social", "Tech"],
        talent: "Keen Intuition ZZ Disarm",
        bonus: "Nothing Escapes My Sight: In addition to the normal uses of Fate points (pg 293), a Seeker character may spend a Fate point to automatically succeed at an Awareness or Inquiry skill test with a number of degrees of success equal to his Perception bonus.",
        name: "Seeker"
    },
    "warrior": {
        aptitudes: ["Ballistic Skill", "Defense", "Offense", "Strength", "Weapon Skill"],
        talent: "Iron Jaw ZZ Rapid Reload",
        bonus: "Expert at Violence: In addition to the normal uses of Fate points (pg 293), after making a successful attack test, but before determining hits, a Warrior character may spend a Fate point to substitute his Weapon Skill (for melee) or Ballistic Skill (for ranged) bonus for the degrees of success scored on the attack test.",
        name: "Warrior"
    },
    "fanatic": {
        aptitudes: ["Leadership","Offense", "Toughness", "Weapon Skill", "Willpower"],
        talent: "Deny the Witch ZZ Jaded",
        bonus: "Death to All Who Oppose Me!: In addition to the normal uses of Fate points (see page 293 of the DARK HERESY Core Rulebook), a Fanatic character may spend a Fate point to count as having the Hatred talent against his current foe for the duration of the encounter. Should he choose to leave combat against a Hated foe in that encounter, however, he gains 1 Insanity point.",
        name: "Fanatic"
    },
    "penitent": {
        aptitudes: ["Agility", "Fieldcraft", "Intelligence", "Offense", "Toughness"],
        talent: "Die Hard ZZ Flagellant",
        bonus: "Cleansing Pain: Whenever a Penitent character sufers 1 or more points of damage (after reductions for Toughnessbonus and Armour), he gains a +10 bonus to the first test he makes before the end of his next turn.",
        name: "Penitent"
    },
    "ace": {
        aptitudes: ["Agility", "Finesse", "Perception", "Tech", "Willpower"],
        talent: "Hard Target ZZ Hotshot Pilot",
        bonus: "Right Stuff: In addition to the normal uses of Fate points (see page 293 of the Dark Heresy Core Rulebook), an Ace character may spend a Fate point to automatically succeed at an Operate or Survival skill test involving vehicles or living steeds with a number of degrees of success equal to his Agility bonus",
        name: "Ace"
    },
    "crusader": {
        aptitudes: ["Knowledge", "Offense", "Strength", "Toughness", "Willpower"],
        talent: "Bodyguard ZZ Deny the Witch",
        bonus: "Smite the Unholy: In addition to the normal uses of Fate Points, a crusader can also spend a Fate Point to automatically pass a Fear test with a DoS equal to his Willpower Bonus. In addition, whenever he inflicts a hit with a melee weapon against a target with the Fear (X) trait, he inflicts X additional damage and counts his weapon's Penetration as being X higher.",
        name: "Crusader"
    }
}

var skills = {
    "Commerce": {
        "description": "Gain a bonus when attempting a Requsition test, try to track down a rare item, or ascertain the value of an item."
    },
    "Medicae": {
        "description": "Apply first aid to a wounded ally, diagnose an affliction and develop a treatment, or perform a surgical procedure for removal of a organ or implantation of a cybernetic"
    },
    "Common Lore": {
        "description": "Learn about a situation, location, character, or object; subject to specialization."
    },
    "Linguistics": {
        "description": "Decipher an archaic text, compose a moving piece of prose, or convey a message with limited vocabulary."
    },
    "Logic": {
        "description": "Solve a riddle, look for clues in vast amounts of unreleated information, or try to win a game of chance."
    },
    "Scholastic Lore": {
        "description": "Recount legends from the past, understand an obscure law, or identify a rare beast."
    },
    "Awareness": {
        "description": "Spot ambushes, search for clues or hidden items, or evesdrop on conversations"
    },
    "Inquiry": {
        "description": "Try to track down a local crime lord, attempt to learn the attidues of the local populace, or gather information about specific locations."
    },
    "Interrogation": {
        "description": "Attempt to learn battle plans from a commander, force an Imperial Adept to reveal hidden information, or have a cultist reveal a hidden meeting place."
    },
    "Intimidate": {
        "description": "Coerce someone into acting a certain way, or try to make an opponent back down from a fight."
    },
    "Scrutiny": {
        "description": "Tell if someone is lying, collate information and gather conclusions from a report, or interpret augur or auspex readings."
    },
    "Deceive": {
        "description": "Tell a convincing lie, distract someone with rambling nonsense, or try to disguise oneself."
    },
    "Forbidden Lore": {
        "description": "Seek information about potential cult activity, learn about the operations of xenos, or determine the proper procedure to summon a Daemon."
    },
    "Psyniscience": {
        "description": "Hunt for the location of daemons, detect the effects of psychic power, or determine a thin point in the veil between the Materium and the Warp."
    },
    "Operate": {
        "description": "Drive a surface vehicle, pilot an aero, or manoeuvre a voidship; or any affiliated activities with the related"
    },
    "Security": {
        "description": "Open a locked door, break into a cogiator and discover its secrets, or lay traps for a ambush."
    },
    "Tech-Use": {
        "description": "Repair a broken weapon or vehicle, push a piece of technology beyond its normal limits, or determine how to use unknown technology."
    },
    "Charm": {
        "description": "Improve someone's opinion of thet character, distract someone by drawing his focus away from others, or gather information from locals or strangers."
    },
    "Command": {
        "description": "Send an NPC ally into an extremely dangerous situation or into open combat, rally allied fighting forces, or organise them in the face of a surprise attack."
    },
    "Athletics": {
        "description": "Swim across water, push beyond one's limits, or climb difficult terrain"
    },
    "Navigate": {
        "description": "Make a journey over land, through the void or starsystem, or through the Warp itself"
    },
    "Acrobatics": {
        "description": "Keep balance or to avoid falling, jump to or from a height, or move around obstacles without falling."
    },
    "Sleight of Hand": {
        "description": "Attempt to steal something from the target's pocket, seek to palm evidence at a crime scene, or try to plant illegal narcotics into a suspect's robes."
    },
    "Dodge": {
        "description": "Dodge a melee or ranged attack, or to avoid hazards."
    },
    "Stealth": {
        "description": "Scout an enemy force without being detected, sneak up on a foe and kill him quietly, or follow someone without arousing suspicion."
    }, 
    "Parry": {
        "description": "Attempt to deflect blows in melee."
    }, 
    "Survival": {
        "description": "Find food or water in a hostile environment, start a fire with homemade tools, or track a foe across a hive."
    },
    "Trade": {
        "description": "Prepare a meal for high ranking officers, carve one's sigil on a chainsword, or uncover the remains of a lost colony."
    }

}

var talents = {
    "Technical Knock": {
        tier: 1,
        description: "Un-jam gun as Half Action."
    },
    "Weapon-Tech": {
        tier: 1,
        description: "May enhance any Melta, Plasma, Power, or Exotic weapon by increases the weapon's damage and penetration by an amount equal to the character's Intelligence bonus until the end of the round once per encounter."
    },
    "Bodyguard": {
        tier: 1,
        description: "After an enemy makes a successful attack against an ally, the character may use a Reaction to move up to his Half Move distance in order to interpose himself between the attacker and target. The attack is then resolved against the character instead of the original target. In the case of a melee attack, the character may also attempt to Parry the attack as part of his Reaction."
    },
    "Deny the Witch": {
        tier: 2,
        description: "Can use Willpower to Evade against psychic attacks."
    },
    "Strong Minded": {
        tier: 2,
        description: "May reroll failed WP tests to resist psychic powers."
    },
    "Weapon Training (Las)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Solid Projectile)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Low-Tech)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Shock)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Flame)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Chain)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Weapon Training (Low-Tech, Solid Projectile)": {
        tier: 1,
        description: "Use Weapon Group without penalty."
    },
    "Mechadendrite Use (Utility)": {
        tier: 2,
        description: "Gain ability to use Utility Mechadendrites"
    },
    "Jaded": {
        tier: 1,
        description: "Ignore mundane horrors - dead bodies, xenos abominations, etc. do not cause the Acolyte to gain Insanity points, nor do they require a fear rolls."
    },
    "Leap Up": {
        tier: 1,
        description: "Stand as a Free Action."
    },
    "Resistance (Pick One)": {
        tier: 1,
        description: "Gain +10 bonus to particular resistance test."
    },
    "Takedown": {
        tier: 1,
        description: " 	Make special attack to stun opponent."
    },
    "Catfall": {
        tier: 1,
        description: "Reduces the effective distance of all falls by a number of metres equal to his Agility bonus. Also adds +20 to his Acrobatics skill tests when using Jump"
    },
    "Quick Draw": {
        tier: 1,
        description: "Draw weapon as Free Action."
    },
    "Double Team": {
        tier: 1,
        description: "Gain additional +10 for outnumbering opponent."
    },
    "Hatred (Choose Group)": {
        tier: 1,
        description: "Gain +10 bonus to attack Weapon Skill tests. Must make a Challenging (+0) Willpower test to retreat or surrender."
    },
    "Hatred (Daemons)": {
        tier: 1,
        description: "Gain +10 bonus to attack Weapon Skill tests. Must make a Challenging (+0) Willpower test to retreat or surrender."
    },
    "Resistance (Psychic Powers)": {
        tier: 1,
        description: "Gain +10 bonus to psychic power resistance tests."
    },
    "Warp Sense": {
        tier: 1,
        description: "Allows Psyniscience test as Free Action."
    },
    "Ambidextrous": {
        tier: 1,
        description: "When combined with Two-Weapon Wielder, the penalty for attacks with both weapons in the same turn drops to -10."
    },
    "Clues from the Crowds": {
        tier: 1,
        description: "Once per day, re-roll a test made to gather information from a group of people."
    },
    "Keen Intuition": {
        tier: 1,
        description: "Can retry Awareness test once with -10 modifier."
    },
    "Disarm": {
        tier: 1,
        description: "As a Full Action, may make an Opposed Weapon Skill test and force opponent to drop weapon. If 3 or more DoS, can steal weapon."
    },
    "Iron Jaw": {
        tier: 1,
        description: "Test Challenging (+0) Toughness Test to overcome Stunning."
    },
    "Rapid Reload": {
        tier: 1,
        description: "Reload times are halved."
    },
    "Peer (Criminal Cartels)": {
        tier: 1,
        description: "Gain a +10 bonus to all Fellowship and Influence tests with this group."
    },
    "Die Hard": {
        tier: 1,
        description: "Test Willpower to avoid Fatigue from Blood Loss with a Challenging (+0) Willpower test."
    },
    "Flagellant": {
        tier: 1,
        description: "As a full action, gain 1d5-2 Fatigue (minimum 1) to gain +10 to WP tests to resist Fear, Pinning, Psychic powers, or Corruption, for 1 hour."
    },
    "Hard Target": {
        tier: 2,
        description: "-20 to hit character when he Charges or Runs."
    },
    "Hotshot Pilot": {
        tier: 2,
        description: "On an succesful Operate test, he may voluntarily suffer 1 level of Fatigue to add a number of DoS equal to half of his Agility bonus. When failed an Operate test, he may voluntarily suffer 1 level of Fatigue in order to reduce the degrees of failure by an amount equal to his Agility bonus, to a minimum of 1. "
    }
}

var rangedWeapons = {
    "Laspistol": {
        "class": "Pistol",
        "range": "30m",
        "damage": "1d10+2",
        "type": "Energy",
        "pen": "0",
        "RoF": "S/2/-",
        "clip":"30",
        "reload": "Half",
        "special": "Reliable"
    },
    "Stub Automatic": {
        "class": "Pistol",
        "range": "30m",
        "damage": "1d10+3",
        "type": "Impact",
        "pen": "0",
        "RoF": "S/3/-",
        "clip":"9",
        "reload": "Full",
        "special": ""
    },
    "Shotgun": {
        "class": "Basic",
        "range": "30m",
        "damage": "1d10+4",
        "type": "Impact",
        "pen": "0",
        "RoF": "S/-/-",
        "clip":"8",
        "reload": "2 Full",
        "special": "Scatter"
    },
    "Autogun": {
        "class": "Basic",
        "range": "100m",
        "damage": "1d10+3",
        "type": "Impact",
        "pen": "0",
        "RoF": "S/3/10",
        "clip":"30",
        "reload": "Full",
        "special": ""
    },
    "Hand Cannon": {
        "class": "Pistol",
        "range": "35m",
        "damage": "1d10+4",
        "type": "Impact",
        "pen": "2",
        "RoF": "S/-/-",
        "clip":"5",
        "reload": "2 Full",
        "special": "Two-Handed"
    },
    "Hand Flamer": {
        "class": "Pistol",
        "range": "10m",
        "damage": "1d10+4",
        "type": "Energy",
        "pen": "2",
        "RoF": "S/-/-",
        "clip":"2",
        "reload": "2 Full",
        "special": "Flame, Spray"
    },
    "Stub Revolver": {
        "class": "Pistol",
        "range": "30m",
        "damage": "1d10+3",
        "type": "Impact",
        "pen": "0",
        "RoF": "S/-/-",
        "clip":"6",
        "reload": "2 Full",
        "special": "Reliable"
    },
    "Lasgun": {
        "class": "Basic",
        "range": "100m",
        "damage": "1d10+3",
        "type": "Energy",
        "pen": "0",
        "RoF": "S/3/-",
        "clip":"60",
        "reload": "Full",
        "special": "Reliable"
    },
    "Laspistol": {
        "class": "Pistol",
        "range": "30m",
        "damage": "1d10+2",
        "type": "Energy",
        "pen": "0",
        "RoF": "S/2/-",
        "clip":"30",
        "reload": "Half",
        "special": "Reliable"
    },
    "Autopistol": {
        "class": "Pistol",
        "range": "30m",
        "damage": "1d10+2",
        "type": "Impact",
        "pen": "0",
        "RoF": "S/-/6",
        "clip":"18",
        "reload": "Full",
        "special": ""
    },
    "Autopistol (Compact)": {
        "class": "Pistol",
        "range": "15m",
        "damage": "1d10+1",
        "type": "Impact",
        "pen": "0",
        "RoF": "S/-/6",
        "clip":"9",
        "reload": "Full",
        "special": ""
    },
    "Combat Shotgun": {
        "class": "Basic",
        "range": "30m",
        "damage": "1d10+4",
        "type": "Impact",
        "pen": "0",
        "RoF": "S/3/-",
        "clip":"18",
        "reload": "Full",
        "special": "Scatter"
    }
}

var meleeWeapons = {
    "Shock Maul": {
        "class": "Shock",
        "damage": "1d10+3",
        "type": "Impact",
        "pen": "0",
        "special": "Shock"
    }, 
    "Staff": {
        "class": "Low-Tech",
        "damage": "1d10",
        "type": "Impact",
        "pen": "0",
        "special": "Balanced, Primitive (7), Two-Handed"
    }, 
    "Whip": {
        "class": "Low-Tech",
        "damage": "1d10",
        "type": "Rending",
        "pen": "0",
        "special": "3m Range, Flexible, Primitive (6)"
    }, 
    "Warhammer": {
        "class": "Low-Tech",
        "damage": "1d10+3",
        "type": "Impact",
        "pen": "1",
        "special": "Concussive (1), Primitive (8), Two-Handed"
    }, 
    "Sword": {
        "class": "Low-Tech",
        "damage": "1d10",
        "type": "Rending",
        "pen": "0",
        "special": "Balanced"
    },
    "Chainsword": {
        "class": "Chain",
        "damage": "1d10+2",
        "type": "Rending",
        "pen": "2",
        "special": "Balanced, Tearing"
    },
    "Chainblade": {
        "class": "Chain",
        "damage": "1d10+1",
        "type": "Rending",
        "pen": "1",
        "special": "Tearing"
    }, 
    "Great Weapon": {
        "class": "Low-Tech",
        "damage": "2d10",
        "type": "Rending",
        "pen": "0",
        "special": "Unbalanced, Two-Handed"
    }, 
    "Whip": {
        "class": "Shock",
        "damage": "1d10+1",
        "type": "Impact",
        "pen": "0",
        "special": "3m Range, Flexible, Shocking"
    }
}

var equipment = {
    "Laspistol": {
        "description": "Las Weapon. 30m Range, ROF: S/2/-, 1d10+2 Energy damage, 0 Pen, 30 round clip",
        "weight": "1.5kg"
    },
    "Flak Cloak": {
        "description": "3 Armour Points, Coverage: Arms, Body, Legs. Max Ag: 55",
        "weight": "8kg"
    },
    "Stub Automatic": {
        "description": "Solid Projectile Weapon. 30m Range, ROF: S/3/-, 1d10+3 Impact damage, 0 pen, 9 round clip",
        "weight": "1.5kg"
    },
    "Imperial Robes": {
        "description": "1 Armour Point, Coverage: Arms, Body, Legs",
        "weight": "4kg"
    },
    "Autoquill": {
        "description": "Grants +10 to recording data",
        "weight": "0kg"
    },
    "Chrono": {
        "description": "Keeps time",
        "weight": "0kg"
    },
    "Dataslate": {
        "description": "Used for data storage and communication - it's a tablet",
        "weight": "0.5kg"
    },
    "Medi-Kit": {
        "description": "Grants +10 bonus to Medicae tests",
        "weight": "2kg"
    },
    "Shotgun": {
        "description": "Solid Projectile weapon. 30m Range, ROF: S/-/-, 1d10+4 Impact damage, 0 pen, 8 round clip",
        "weight": "5kg"
    },
    "Shock Maul": {
        "description": "Shock weapon. Melee range, 1d10+3 Impact damage, 0 pen",
        "weight": "2.5kg"
    },
    "Enforcer Light Carapace Armour": {
        "description": "5 Armour Points, Coverage: All",
        "weight": "15kg"
    },
    "Carapace Chest Plate": {
        "description": "6 Armour Points, Coverage: Body",
        "weight": "7kg"
    },
    "3 doses of Stimm": {
        "description": "Lasts 3d10 rounds and ignores any negative effects from damage, Critical damage, Fatigue, and cannot be stunned. When it wears off, they suffer a -20 to Strength, Toughness, and Agility tests for one hour and gains one level of Fatigue.",
        "weight": "0kg"
    },
    "Manacles": {
        "description": "Handcuffs",
        "weight": "1kg"
    },
    "12 Lho Sticks": {
        "description": "Cigarettes for the grim darkness of the 41st millennium",
        "weight": "0kg"
    },
    "Staff": {
        "description": "Low-Tech weapon. Melee range, 1d10 Impact damage, 0 pen",
        "weight": "3kg"
    },
    "Whip": {
        "description": "Low-Tech weapon. 3m range, 1d10 Rending damage, 0 pen",
        "weight": "2kg"
    },
    "Light Flak Cloak": {
        "description": "2 Armour Points, Coverage: Arms, Body, Legs",
        "weight": "4kg"
    },
    "Flak Vest": {
        "description": "3 Armour Points, Coverage: Body",
        "weight": "5kg"
    },
    "Micro-bead": {
        "description": "Can communicate with other characters using Micro-beads up to 1km away",
        "weight": "0kg"
    },
    "Psy Focus": {
        "description": "Grants +10 to Focus Power tests",
        "weight": "0kg"
    },
    "Autogun": {
        "description": "Solid Projectile weapon. 300m range, ROF: S/3/10, 1d10+3 Impact damage, 0 pen, 30 round clip",
        "weight": "5kg"
    },
    "Hand Cannon": {
        "description": "Solid Projectile weapon. 35m range, ROF: S/-/-, 1d10+4 Impact damage, 2 pen, 5 round clip",
        "weight": "3kg"
    },
    "Monotask Servo-skull (Utility)": {
        "description": "Counts as a Combi-tool (+10 to Tech-Use tests)",
        "weight": "2kg"
    },
    "Combi-Tool": {
        "description": "+10 to Tech-Use tests",
        "weight": "1kg"
    },
    "Optical Mechadendrite": {
        "description": "Grants +10 to all vision-based Perception tests. Has an infrared torch and sensors with a range of 40m, as well as a Stablight (flashlight)",
        "weight": "0kg"
    },
    "2 vials of Sacred Unguents": {
        "description": "Applied to weapon as a full action and becomes immune to jamming for one clip. Can be applied to an already-jammed weapon to immediately clear the jam.",
        "weight": "0kg"
    },
    "Hand Flamer": {
        "description": "Flame weapon. 10m range, ROF: S/-/-, 1d10+4 Energy damage, 2 pen, 2 round clip",
        "weight": "3.5kg"
    },
    "Warhammer and Stub Revolver": {
        "description": "Low-Tech weapon. Melee range, 1d10+3 Impact damage, 1 pen. <br/>Solid Projectile weapon. 30m range, ROF: S/-/-, 1d10+3 Impact damage, 0 pen, 6 round clip",
        "weight": "4.5kg/1.5kg"
    },
    "Stub Revolver": {
        "description": "Solid Projectile weapon. 30m range, ROF: S/-/-, 1d10+3 Impact damage, 0 pen, 6 round clip",
        "weight": "1.5kg"
    },
    "Backpack": {
        "description": "Allows 30kg of extra carry weight, but items in the Backpack require a full action to retrieve. Can't be worn with a Combat Vest",
        "weight": "2kg"
    },
    "Glow-globe": {
        "description": "Projects light in a 12m radius. Lasts 5 hours",
        "weight": "0.5kg"
    },
    "Stablight": {
        "description": "Projects light 24m in a narrow beam. Lasts 5 hours",
        "weight": "0.5kg"
    },
    "Monotask Servo-skull (Laud Hailer)": {
        "description": "Records speech and amplifies the user's voice",
        "weight": "2kg"
    },
    "Lasgun": {
        "description": "Las weapon. 100m Range, ROF: S/3/-, 1d10+3 Energy damage, 0 pen, 60 round clip",
        "weight": "4kg"
    },
    "Laspistol and Sword": {
        "description": "Las Weapon. 30m Range, ROF: S/2/-, 1d10+2 Energy damage, 0 Pen, 30 round clip <br/>Low-Tech weapon. Melee range, 1d10 Rending damage, 0 pen",
        "weight": "1.5kg/3kg"
    },
    "Combat Vest": {
        "description": "Carries 15kg of items, which can be drawn in combat as a Free Action. Can't be worn with a Backpack",
        "weight": "2kg"
    },
    "Imperial Guard Flak Armour": {
        "description": "4 Armour Points, Coverage: All",
        "weight": "11kg"
    },
    "Grapnel and Line": {
        "description": "A Clip-harness and Gas powered pistol to shoot a hook and line 100 m away.",
        "weight": "2kg"
    },
    "Magnoculars": {
        "description": "Binoculars",
        "weight": "0.5kg"
    },
    "Autopistol": {
        "description": "Solid Projectile weapon. 30m range, ROF: S/-/6, 1d10+2 Impact damage, 0 pen, 18 round clip",
        "weight": "1.5kg"
    },
    "Chainsword": {
        "description": "Chain weapon. Melee range, 1d10+2 Rending damage, 2 pen",
        "weight": "6kg"
    },
    "Chainblade": {
        "description": "Chain weapon. Melee range, 1d10+1 Rending damage, 1 pen",
        "weight": "2kg"
    },
    "Armoured Body Glove": {
        "description": "2 Armour Points, Coverage: Arms, Body, Legs",
        "weight": "5kg"
    },
    "Injector": {
        "description": "Can administer drugs as a Half Action",
        "weight": "0.5kg"
    },
    "2 doses of Obscura": {
        "description": "User enters a dream like state for 1d5 hours. If in combat, consider them under the effects of a Hallucinogen grenade",
        "weight": "0kg"
    },
    "3 doses of Obscura": {
        "description": "User enters a dream like state for 1d5 hours. If in combat, consider them under the effects of a Hallucinogen grenade",
        "weight": "0kg"
    },
    "2 doses of Slaught": {
        "description": "User increases Agility and Perception bonus by 3 for 2d10 minutes. When the effect ends, take a toughness test or suffer -20 to Agility and Perception tests for 1d5 hours.",
        "weight": "0kg"
    },
    "3 doses of Tranq": {
        "description": "Numbs the body and mind.",
        "weight": "0kg"
    },
    "Disguise Kit": {
        "description": "Make you look like someone else. +10 to deceive tests",
        "weight": "2kg"
    },
    "Excruciator Kit": {
        "description": "Grants +20 to Interrogation tests.",
        "weight": "2kg"
    },
    "Rebreather": {
        "description": "Immune to toxic atmospheres, even allowing water-breathing. Last for 1 hour, takes Full Action to replace. ",
        "weight": "1kg"
    },
    "Stub Revolver and Great Weapon": {
        "description": "Solid Projectile weapon. 30m range, ROF: S/-/-, 1d10+3 Impact damage, 0 pen, 6 round clip <br/>Low-Tech weapon. Melee range, 2d10 Rending damage, 0 pen. ",
        "weight": "8.5kg"
    },
    "Heavy Leathers": {
        "description": "1 Armour Point, Coverage: Arms, Body",
        "weight": "5kg"
    },
    "2 clips of Man-Stopper Rounds": {
        "description": "Adds 3 to weapon penetration",
        "weight": "0kg"
    },
    "2 clips of Expander Bullets": {
        "description": "Adds 1 to weapon damage and penetration",
        "weight": "0kg"
    },
    "Web Grenade": {
        "description": "Thrown weapon. 3xSB range, 0 damage, 0 pen. Blast (3), Snare (2)",
        "weight": "0.5kg"
    },
    "Filtration Plugs": {
        "description": "Nose plugs. Grant +20 against gas.",
        "weight": "0kg"
    },
    "1 dose of De-Tox": {
        "description": "Clears any chemical effects. User is Stunned for 1d10-TB rounds.",
        "weight": "0kg"
    },
    "Shock Whip": {
        "description": "Shock weapon. 3m range, 1d10+1 Impact damage, 0 pen. Flexible, Shocking",
        "weight": "3kg"
    },
    "Autopistol (Compact)": {
        "description": "Solid Projectile weapon. 15m range, ROF: S/-/6, 1d10+1 Impact damage, 0 pen, 9 round clip",
        "weight": "0.75kg"
    },
    "Mesh Cloak": {
        "description": "4 Armour Points, Coverage: Arms, Body, Legs. Max Ag: 60",
        "weight": "3kg"
    },
    "Auspex": {
        "description": "Grants +20 to awareness tests and counts as a Free Action once per turn. With Tech-Use can see through walls less than 50 cm, has a range of 50 meters.",
        "weight": "0.5kg"
    },
    "Flak Coat": {
        "description": "3 Armour Points, Coverage: Arms, Body. Max Ag: 60",
        "weight": "5kg"
    },
    "Combat Shotgun": {
        "description": "Solid Projectile weapon. 30m range, ROF: S/3/-, 1d10+4 Impact damage, 0 pen, 18 round clip",
        "weight": "6.5kg"
    },
    "2 doses of Stimm": {
        "description": "Lasts 3d10 rounds and ignores any negative effects from damage, Critical damage, Fatigue, and cannot be stunned. When it wears off, they suffer a -20 to Strength, Toughness, and Agility tests for one hour and gains one level of Fatigue.",
        "weight": "0kg"
    }
}

var divinations = {
    "0-1": {
        "name": "Mutation without, corruption within",
        "desc": "Roll once on the Malignancies table and apply the result."
    },
    "02-05": {
        "name": "Trust in your fear",
        "desc": "Increase this character's Perception by 5. He also gains the Phobia Mental Disorder."
    },
    "06-09": {
        "name": "Humans must die so that humanity can endure",
        "desc": "This character gains the Jaded talent. If he already possesses this talent, increase his Willpower characteristic by 2 instead."
    },
    "10-13": {
        "name": "The pain of the bullet is ecstasy compared to damnation",
        "desc": "Reduce this character's Agility characteristic by 3. The first time this character suffers Critical damage each session, roll a 1d10. On a result of 10, he does not suffer any Critical Effects, though the damage still counts as Critical Damage."
    },
    "14-17": {
        "name": "Be a boon to your allies and the bane of your enemies",
        "desc": "The character gains the Hatred (choose any one) talent. If he already possessed this talent, increase his Strength characteristic by 2 instead."
    },
    "18-21": {
        "name": "The wise learn from the deaths of others",
        "desc": "Increase this character's Agility or Intelligence Characteristic by 3. Reduce his Weapon Skill of Ballistic skill characteristic by 3."
    },
    "22-25": {
        "name": "Kill the alien before it can speak its lies",
        "desc": "This character gains the Quick Draw talent. If he already possesses this talent, increase his Agility characteristic by 2 instead."
    },
    "26-29": {
        "name": "Truth is subjective",
        "desc": "Increase this character's Perception by 3. The first time he would gain 1 or more Corruption points each session, he gains that amount plus 1 instead."
    },
    "30-33": {
        "name": "Thought begets Heresy",
        "desc": "Reduce this character's Intelligence by 3. The first time he would gain 1 or more Corruption points each session, he reduces that amount by 1 (to a minimum of 0) instead."
    },
    "34-38": {
        "name": "Heresy begets Retribution",
        "desc": "Increase this character's Fellowship or Strength characteristic by 3. Reduce his Toughness or Willpower characteristic by 3."
    },
    "39-43": {
        "name": "A mind without purpose wanders in dark places",
        "desc": "When gaining Mental Disorders, the character may choose to gain a new Disorder instead of increasing the severity of an existing Disorder."
    },
    "44-49": {
        "name": "If a job is worth doing, it is worth dying for",
        "desc": "Increase this character's Toughness or Willpower characteristic by 3. Reduce his Fellowship or Strength characteristic by 3."
    },
    "50-54": {
        "name": "Dark dreams lie upon the heart",
        "desc": "Whenever this character would roll on the Malignancies table, he may instead select any one result and gain that Malignancy."
    },
    "55-59": {
        "name": "Violence solves everything",
        "desc": "Increase this character's Weapon Skill or Ballistic Skill characteristic by 3. Reduce his Agility or Intelligence characteristic by 3."
    },
    "60-63": {
        "name": "Ignorance is a wisdom of its own",
        "desc": "Reduce this character's Perception characteristic by 3. The first time he would gain 1 or more Insanity points each session, he reduces that amount by 1 (to a minimum of 0) instead."
    },
    "64-67": {
        "name": "Only the insane have the strength to prosper",
        "desc": "Increase this character's Willpower characteristic by 3. The first time he would gain 1 or more Insanity points each session, he gains that amount plus 1 instead."
    },
    "68-71": {
        "name": "A suspicious mind is a healthy mind",
        "desc": "Increase this character's Perception characteristic by 2. Additionally, he may re-roll Awareness tests to avoid being Surprised."
    },
    "72-75": {
        "name": "Suffering is an unrelenting instructor",
        "desc": "Reduce this character's Toughness characteristic by 3. The first time that this character suffers any damage each session, he gains a +20 bonus to the next test he makes before the end of his next turn."
    },
    "76-79": {
        "name": "The only true fear is dying without your duty done",
        "desc": "This character gains the Resistance (Cold, Heat, or Fear) talent. If he already possesses this Talent, increase his Toughness characteristic by 2 instead."
    },
    "80-83": {
        "name": "Only in death does duty end",
        "desc": "The first time this character would suffer Fatigue each session, he suffers that amount of Fatigue minus 1 (to a minimum of 0) instead."
    },
    "84-87": {
        "name": "Innocence is an illusion",
        "desc": "This character gains the Keen Intuition talent. If he already possesses this talent, increase his Intelligence characteristic by 2 instead."
    },
    "88-91": {
        "name": "To war is human",
        "desc": "This character gains the Dodge skill as a Known skill (rank 1). If he already posses this skill, increase his Agility characteristic by 2 instead."
    },
    "92-95": {
        "name": "There is no substitute for zeal",
        "desc": "This character gains the Clues from the Crowds talent. If he already possesses this talent, increase his Fellowship characteristic by 2 instead."
    },
    "96-99": {
        "name": "Even one who has nothing can still offer his life",
        "desc": "When this character burns Fate threshold to survive a lethal injury, roll 1d10. On a result of 10, he survives whatever grievous wound would have killed him but does not reduce his Fate threshold."
    },
    "100-101": {
        "name": "Do not ask why you serve. Only ask how",
        "desc": "Increase this character's Fate threshold by 1."
    }
}


// Carry weights are defined in the CRB. They don't appear to follow any sort of logic or reason
var carry = [0.9, 2.25, 4.5, 9, 18, 27, 36, 45, 56, 67, 78, 90, 112, 225, 337, 450, 675, 900, 1350, 1800, 2250];

// Personal use shorthand function
function el(str) {
    return document.getElementById(str);
}

// Takes a number and a range in the form of a string ("10-16") and determines if the number
// falls in that range, inclusive
function inRangeInclusive(num, range) {
    let lowerBound = Number(range.split("-")[0]);
    let upperBound = Number(range.split("-")[1]);

    return (num >= lowerBound && num <= upperBound);
}

// Sums all elements of an array
function sumArr(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}


// Takes a string argument for number of dice to roll ("3d10") and a modifier.
// The modifier is only used for Characteristic rolls.
// A 1 indicates the player has advantage (roll 3 dice, throw away the lowest)
// A -1 indicates they have disadvantage (roll 3 dice, throw away the highest)
function roll(str, mod = 0) {

    if (str == "-") {
        return 1;
    }

    let numRolls = Number(str.split("d")[0]);
    let diceValue = Number(str.split("d")[1]);

    let result = [];

    for (let i = 0; i < numRolls; i++) {
        result.push(Math.floor((Math.random() * diceValue) + 1))
    }

    // Sorts the array of rolls for ease of removing high/low values
    result.sort(function (a, b) {
        return a - b
    })

    if (mod == 1) {
        // Remove lowest value
        result.shift()
    } else if (mod == -1) {
        // Remove highest value
        result.pop()
    }

    let total = sumArr(result);

    return total;
}

function homeChange() {
    var selectBox = el("homeworld");
    var home = selectBox.options[selectBox.selectedIndex].value;
    character.homeworld = home;
    character.CharPlus = homeworlds[home]["charPlus"].slice(0);
    character.CharMinus = homeworlds[home]["charMinus"];

    // HTML ids for the various characteristic labels
    let labels = ["WSLbl", "BSLbl", "SLbl", "TLbl", "AgLbl", "IntLbl", "PerLbl", "WPLbl", "FelLbl", "InflLbl"]


    // Removes any extant coloring
    for (let i = 0; i < labels.length; i++) {
        el(labels[i]).classList.remove("w3-red");
        el(labels[i]).classList.remove("w3-green");
    }

    // If the character has advantage on this characteristic, make the label green
    for (let i = 0; i < character.CharPlus.length; i++) {
        let statLbl = character.CharPlus[i] + "Lbl";
        el(statLbl).classList.add("w3-green");
    }

    // Make the label red if the character has disadvantage
    let malLbl = character.CharMinus + "Lbl";
    el(malLbl).classList.add("w3-red")

    character.fate = homeworlds[home].fate;

    // If a player rolls above their "Emperor's Blessing" number on a d10,
    // they get an additional fate point
    if (roll("1d10") >= homeworlds[home].blessing) {
        character.fate += 1;
        // Turns the fate points green to show the Emperor showed his favor
        el("fate").setAttribute("style", "background: lime;");
    } else {
        el("fate").setAttribute("style", "");
    }

    el("fate").innerHTML = character.fate;

    // Wounds are determined by a base value (from the character's homeworld)
    // plus 1d5
    character.wounds = homeworlds[home].wounds + roll("1d5");
    el("wounds").innerHTML = character.wounds;

    // Populates the list of attributes
    getApts();
    getBonuses();
}

function backChange() {
    var selectBox = el("background");
    var back = selectBox.options[selectBox.selectedIndex].value;
    character.background = back;

    // Populates the list of attributes
    getApts();
    getTalents();
    getEquipment();
    getBonuses();
}

function roleChange() {
    var selectBox = el("role");
    var role = selectBox.options[selectBox.selectedIndex].value;
    character.role = role;

    // Populates the list of attributes
    getApts();
    getTalents();
    getBonuses();
}

function rollChars() {

    // Defines the characteristics
    let chars = ["WS", "BS", "S", "T", "Ag", "Int", "Per", "WP", "Fel", "Infl"]

    for (let i = 0; i < chars.length; i++) {

        if (character.CharPlus.indexOf(chars[i]) == -1 && character.CharMinus != chars[i]) {
            // If the character's homeworld doesn't give them a bonus or a mallus to this characterstic,
            // roll 2d10+20

            character[chars[i]] = roll("2d10") + 20;

        } else if (character.CharPlus.indexOf(chars[i]) != -1) {
            // If the character's homeworld gives them a bonus, roll 3d10 + 20
            // The modifier (1) causes the roll function to throw away the lowest of the 3 rolls

            character[chars[i]] = roll("3d10", 1) + 20;

        } else {
            // If the character's homeworld gives them a mallus, roll 3d10 + 20
            // The modifier (-1) causes the roll function to throw away the highest of the 3 rolls

            character[chars[i]] = roll("3d10", -1) + 20;
        }

        el(chars[i]).innerHTML = character[chars[i]];
    }

    // The character can reroll one single characteristic, once.
    // The reroll buttons are hidden until the player rolls their characteristics
    var rerolls = document.getElementsByClassName("reroll");

    for (let i = 0; i < rerolls.length; i++) {
        rerolls[i].setAttribute("style", "visibility: visible");
    }

    let fatigue = 0

    // Outcast characters get two additional levels towards their fatigue threshold
    if (character.background == "outcast") {
        fatigue = Math.floor(character.T / 10) + 2 + Math.floor(character.WP / 10)
    } else {
        fatigue = Math.floor(character.T / 10) + Math.floor(character.WP / 10)
    }

    el("fatigue").innerHTML = fatigue;

    // Movement is dependent upon the character's AgB (ten's place of their Agility)
    character.Movement[0] = Math.floor(character.Ag / 10);
    character.Movement[1] = Math.floor(character.Ag / 10) * 2;
    character.Movement[2] = Math.floor(character.Ag / 10) * 3;
    character.Movement[3] = Math.floor(character.Ag / 10) * 6;

    el("halfMove").innerHTML = character.Movement[0] + "m";
    el("fullMove").innerHTML = character.Movement[1] + "m";
    el("chargeMove").innerHTML = character.Movement[2] + "m";
    el("runMove").innerHTML = character.Movement[3] + "m";

    // Uses those carry weights from earlier.
    // This is determined by the character's SB + TB
    character.Carry = carry[(Math.floor(character.S / 10) + Math.floor(character.T / 10))]
    el("carryWeight").innerHTML = character.Carry;
}

function reRollChar(str) {
    // The character can reroll one single characteristic, once.
    // The reroll buttons are hidden until the player rolls their characteristics
    if (character.CharPlus.indexOf(str) == -1 && character.CharMinus != str) {
        character[str] = roll("2d10") + 20;
    } else if (character.CharPlus.indexOf(str) != -1) {
        character[str] = roll("3d10", 1) + 20;
    } else {
        character[str] = roll("3d10", -1) + 20;
    }

    el(str).innerHTML = character[str];

    let btnName = str + "btn";

    var rerolls = document.getElementsByClassName("reroll");

    // Hides the reroll buttons once one of them has been used
    for (let i = 0; i < rerolls.length; i++) {
        rerolls[i].setAttribute("style", "visibility: hidden");
    }

    let fatigue = 0;

    if (character.background == "outcast") {
        fatigue = Math.floor(character.T / 10) + 2 + Math.floor(character.WP / 10)
    } else {
        fatigue = Math.floor(character.T / 10) + Math.floor(character.WP / 10)
    }

    character.Fatigue = fatigue;

    try {
        el("fatigue").innerHTML = fatigue;

        character.Movement[0] = Math.floor(character.Ag / 10);
        character.Movement[1] = Math.floor(character.Ag / 10) * 2;
        character.Movement[2] = Math.floor(character.Ag / 10) * 3;
        character.Movement[3] = Math.floor(character.Ag / 10) * 6;

        el("halfMove").innerHTML = character.Movement[0] + "m";
        el("fullMove").innerHTML = character.Movement[1] + "m";
        el("chargeMove").innerHTML = character.Movement[2] + "m";
        el("runMove").innerHTML = character.Movement[3] + "m";

        character.Carry = carry[(Math.floor(character.S / 10) + Math.floor(character.T / 10))]
        el("carryWeight").innerHTML = character.Carry;
    } catch {

    }
}



function getApts() {
    // Builds (or re-builds) the character's aptitudes from their
    // homeworld, background, and role
    character.Aptitudes = ["General"];
    character.Aptitudes.push(homeworlds[character.homeworld]["aptitude"]);
    character.Aptitudes.push(backgrounds[character.background]["aptitude"]);
    character.Aptitudes = character.Aptitudes.concat(roles[character.role]["aptitudes"]);

    // Starting with an empty string for the inner HTML of the aptitude table
    let htmlStr = ""

    for (let i = 0; i < character.Aptitudes.length; i++) {

        let str = character.Aptitudes[i];

        // If the aptitude includes a choice (the aforementioned "ZZ")
        if (str.search("ZZ") != -1) {
            htmlStr += "<tr><td>";

            // Build a dropdown box for the user to choose
            htmlStr += "<select><option>" + str.slice(0, str.search("ZZ") - 1) + "</option><option>" + str.slice(str.search("ZZ") + 3, str.length) + "</option></select>"

            htmlStr += "</td></tr>"
        } else {
            // Otherwise, just add it to the table
            htmlStr += "<tr><td>";

            htmlStr += str;

            htmlStr += "</td></tr>"
        };
    }

    el("aptTable").innerHTML = htmlStr;
}

function getTalents() {
    // Builds (or re-builds) the character's talents from their
    // background and role
    character.Talents = [];
    character.Talents = character.Talents.concat(backgrounds[character.background]["talents"]);
    character.Talents.push(roles[character.role]["talent"]);

    // Starting with an empty string for the inner HTML of the talent table
    let htmlStr = ""

    for (let i = 0; i < character.Talents.length; i++) {

        let str = character.Talents[i];

        // If the talent includes a choice (the aforementioned "ZZ")
        if (str.search("ZZ") != -1) {
            htmlStr += "<tr><td>";

            // Build a dropdown box for the user to choose
            htmlStr += "<select><option>" + str.slice(0, str.search("ZZ") - 1) + "</option><option>" + str.slice(str.search("ZZ") + 3, str.length) + "</option></select>"

            htmlStr += "</td></tr>"
        } else {
            // Otherwise, just add it to the table
            htmlStr += "<tr><td>";

            htmlStr += str;

            htmlStr += "</td></tr>"
        };
    }

    el("talents").innerHTML = htmlStr;
}

function getEquipment() {
    // Builds (or re-builds) the character's equipment from their background
    character.Equip = [];
    character.Equip = character.Equip.concat(backgrounds[character.background]["equipment"]);

    // Starting with an empty string for the inner HTML of the talent table
    let htmlStr = ""

    for (let i = 0; i < character.Equip.length; i++) {

        let str = character.Equip[i];

        // If the talent includes a choice (the aforementioned "ZZ")
        if (str.search("ZZ") != -1) {
            htmlStr += "<tr><td>";

            // Build a dropdown box for the user to choose
            htmlStr += "<select><option>" + str.slice(0, str.search("ZZ") - 1) + "</option><option>" + str.slice(str.search("ZZ") + 3, str.length) + "</option></select>"

            htmlStr += "</td></tr>"
        } else {
            // Otherwise, just add it to the table
            htmlStr += "<tr><td>";

            htmlStr += str;

            htmlStr += "</td></tr>"
        };
    }

    el("equip").innerHTML = htmlStr;
}

function getBonuses() {
    // Builds (or re-builds) the character's bonuses and
    // special abilities from their homeworld, background, and role
    character.HomeBonus = homeworlds[character.homeworld]["bonus"];
    character.BackBonus = backgrounds[character.background]["bonus"];
    character.RoleBonus = roles[character.role]["bonus"];

    // Starting with an empty string for the inner HTML of the talent table
    let htmlStr = ""

    htmlStr += "<tr><td>";
    htmlStr += character.HomeBonus;
    // htmlStr += "<hr/>"
    htmlStr += "</tr></td>";

    htmlStr += "<tr><td>";
    htmlStr += character.BackBonus;
    // htmlStr += "<hr/>"
    htmlStr += "</tr></td>";

    htmlStr += "<tr><td>";
    htmlStr += character.RoleBonus;
    // htmlStr += "<hr/>"
    htmlStr += "</tr></td>";

    el("bonus").innerHTML = htmlStr;
}

function exportChar() {
    var today = new Date();

    $('#exportText').val(window.btoa(JSON.stringify(character)));
    $('#exportText').select();

    $("#saveCharTime").val(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes());
    $('#saveCharString').val(window.btoa(JSON.stringify(character)));
}

function importChar() {

    try {
        var importString = window.atob($('#importInput').val());
    } catch {
        $("#noString").text("Invalid character code").show();
    }

    if (importString == "") {
        $("#noString").show();
    } else {
        document.getElementById('importModal').style.display = 'none'

        character = JSON.parse(importString);

        navFromMenuToSheet();

        buildSheet();

    }
}