var masterDict = []
var masterFuse = []

$(document).ready(function () {
    let lists = [career, skill, talent, spell, miracle, condition, weapon, armour, trait, weaponQual, armourQual, endeavour]
    let listTypes = ["career", "skill", "talent", "spell", "miracle", "condition", "weapon", "armour", "trait", "qual", "armQual", "endeavour"]
    for (let j = 0; j < lists.length; j++) {
        for (let i = 0; i < lists[j].length; i++) {
            masterDict.push({ "name": lists[j][i]["name"], "type": listTypes[j] })
        }
    };

    masterFuse = new Fuse(masterDict, { keys: ["name"], threshold: 0.3 })
});

var currYear = new Date().getFullYear()

var CRNotice = "Warhammer Fantasy Roleplay 4th Edition &copy; Copyright Games Workshop and Cubicle 7 Games Limited 2018-" + currYear

var modals = {
    "skill": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large padCard\"><div class=\"w3-row-padding\"><h3><span style=\"display: none;\" class=\"skillID\"></span><span class=\"skillName\"></span> (<span class=\"skillChar\"></span>)</h3></div><div class=\"w3-row-padding\"><h4 style=\"margin-top:-1em !important;\"><em><span class=\"skillTier\"></span></em></h4></div><div class=\"w3-row-padding\"><div class=\"skillDesc\"></div><div class=\"skillSpec\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"skillModalSearch(this)\" class=\"w3-button w3-deep-amber firstBtn\">Skill List</button><button onclick=\"hideModal(this)\"class=\"w3-button w3-deep-red-l1 w3-round-large lastBtn\">Close</button></div></div></div>",
    "talent": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large padCard\"><div class=\"w3-row-padding\"><h3><span class=\"talentName\"></span></h3></div><div class=\"w3-row-padding\"><h5 style=\"text-align: left !important;\">Max: <span class=\"talentMax\"></span></h5><h5 style=\"text-align: left !important;\"><span class=\"talentTest\"></span></h5></div><div class=\"w3-row-padding\"><div class=\"talentDesc\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"talentModalSearch(this)\" class=\"w3-button w3-deep-amber firstBtn\">Talent List</button><button onclick=\"hideModal(this)\" class=\"w3-button w3-deep-red-l1 w3-round-large lastBtn\">Close</button></div></div></div>",
    "miracle": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large padCard\"><div class=\"w3-row-padding\"><h3 class=\"miracleName\"></h3><div class=\"miracleTier w3-hide\"></div><h5> <em><span class=\"miracleGod\"></span> </em></h5></div><div class=\"w3-row-padding\"><emph>Range: </emph><span class=\"miracleRange\"></span><br /><emph>Target: </emph><span class=\"miracleTarget\"></span><br /><emph>Duration: </emph><span class=\"miracleDuration\"></span></div><div class=\"w3-row-padding\"><div class=\"miracleDescription\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"hideModal(this)\" class=\"w3-button w3-deep-red-l1 w3-round-large \">Close</button></div></div></div>",
    "condition": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large padCard\"><div class=\"w3-row-padding\"><h3><span class=\"conditionName\"></span></h3></div><div class=\"w3-row-padding\"><div class=\"conditionDesc\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"hideModal(this)\" class=\"w3-button w3-deep-red-l1 w3-round-large \">Close</button></div></div></div>",
    "trait": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large padCard\"><div class=\"w3-row-padding\"><h3><span class=\"traitName\"></span></h3></div><div class=\"w3-row-padding\"><div class=\"traitDesc\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"hideModal(this)\" class=\"w3-button w3-deep-red-l1 w3-round-large \">Close</button></div></div></div>",
    "qual": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large padCard\"><div class=\"w3-row-padding\"><h3><span class=\"qualName\"></span></h3></div><div class=\"w3-row-padding\"><div class=\"qualDesc\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"hideModal(this)\" class=\"w3-button w3-deep-red-l1 w3-round-large \">Close</button></div></div></div>",
    "armQual": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large padCard\"><div class=\"w3-row-padding\"><h3><span class=\"qualName\"></span></h3></div><div class=\"w3-row-padding\"><div class=\"qualDesc\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"hideModal(this)\" class=\"w3-button w3-deep-red-l1 w3-round-large \">Close</button></div></div></div>",
    "spell": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large grid-card\"><div class=\"w3-row-padding\"><h3 class=\"spellName\"></h3><h5> <em><span class=\"spellLore\"></span> </em></div><div class=\"w3-row-padding\"><emph>Casting Number: </emph><span class=\"spellCN\"></span><br /><emph>Range: </emph><span class=\"spellRange\"></span><br /><emph>Target: </emph><span class=\"spellTarget\"></span><br /><emph>Duration: </emph><span class=\"spellDuration\"></span></div><div class=\"w3-row-padding\"><div class=\"spellDescription\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"hideModal(this)\" class=\"w3-button w3-deep-red-l1 w3-round-large \">Close</button></div></div></div>",
    "weapon": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large padCard\"><div class=\"w3-row-padding\"><h3><span class=\"weapName\"></span></h3></div><div class=\"w3-row-padding\"><h5 style=\"margin-top: -1em !important;\"><em><div class=\"weapGroup\"></div></em></h5><div class=\"weapPrice\"></div><div class=\"weapEnc\"></div><div class=\"weapAvail\"></div><div class=\"weapDamage\"></div><div class=\"weapReach\"></div><div class=\"weapQuals\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"hideModal(this)\" class=\"w3-button w3-deep-red-l1 w3-round-large \">Close</button></div></div></div>",
    "armour": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large padCard\"><div class=\"w3-row-padding\"><h3><span class=\"weapName\"></span></h3></div><div class=\"w3-row-padding\"><h5 style=\"margin-top: -1em !important;\"><em><div class=\"weapGroup\"></div></em></h5><div class=\"weapPrice\"></div><div class=\"weapEnc\"></div><div class=\"weapAvail\"></div><div class=\"weapDamage\"></div><div class=\"weapReach\"></div><div class=\"weapQuals\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"hideModal(this)\" class=\"w3-button w3-deep-red-l1 w3-round-large \">Close</button></div></div></div>",
    "endeavour": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large padCard\"><div class=\"w3-row-padding\"><h3><span class=\"endeavourName\"></span></h3></div><div class=\"w3-row-padding\"><h4><span class=\"endeavourType\"></span></h4></div><div class=\"w3-row-padding\"><div class=\"endeavourDesc\"></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"hideModal(this)\"class=\"w3-button w3-deep-red-l1 w3-round-large \">Close</button></div></div></div>",
    "career": "<div class=\"popupCard\"><div class=\"w3-card-2 w3-round-large grid-card\"><div class=\"w3-row-padding\"><h3 class=\"careerName\"></h3><h5><span class=\"careerClass\"></span></h5><div class=\"w3-center\"><span class=\"careerRaces\"></span></div><div class=\"w3-center\"><em class=\"careerDesc\"></em></div></div><div class=\"w3-row-padding w3-center\"><br/><div class=\"well-s\"><h6>Advance Scheme</h6><table class=\"centerTable attrTable \"><thead><tr><th style=\"display:none;\" class=\"careerAttr careerWSth\">WS</th><th style=\"display:none;\" class=\"careerAttr careerBSth\">BS</th><th style=\"display:none;\" class=\"careerAttr careerSth\">S</th><th style=\"display:none;\" class=\"careerAttr careerTth\">T</th><th style=\"display:none;\" class=\"careerAttr careerIth\">I</th><th style=\"display:none;\" class=\"careerAttr careerAgith\">Agi</th><th style=\"display:none;\" class=\"careerAttr careerDexth\">Dex</th><th style=\"display:none;\" class=\"careerAttr careerIntth\">Int</th><th style=\"display:none;\" class=\"careerAttr careerWPth\">WP</th><th style=\"display:none;\" class=\"careerAttr careerFelth\">Fel</th></tr></thead><tbody><tr><td style=\"display:none;\" class=\"careerAttr careerWS\"></td><td style=\"display:none;\" class=\"careerAttr careerBS\"></td><td style=\"display:none;\" class=\"careerAttr careerS\"></td><td style=\"display:none;\" class=\"careerAttr careerT\"></td><td style=\"display:none;\" class=\"careerAttr careerI\"></td><td style=\"display:none;\" class=\"careerAttr careerAgi\"></td><td style=\"display:none;\" class=\"careerAttr careerDex\"></td><td style=\"display:none;\" class=\"careerAttr careerInt\"></td><td style=\"display:none;\" class=\"careerAttr careerWP\"></td><td style=\"display:none;\" class=\"careerAttr careerFel\"></td></tr></tbody></table></div></div><br/><div class=\"w3-row-padding w3-center\"><b>Income Skill: </b><em class=\"careerIncome\"></em></div><br/><div class=\"w3-row-padding well\"><div class=\"careerpath1\"><h5 class=\"path1name\"></h5><p><b>Skills: </b><span class=\"path1skills\"></span></p><p><b>Talents: </b><span class=\"path1talents\"></span></p><p><b>Trappings: </b><span class=\"path1trappings\"></span></p></div></div><div class=\"w3-row-padding well\"><div class=\"careerpath2\"><h5 class=\"path2name\"></h5><p><b>Skills: </b><span class=\"path2skills\"></span></p><p><b>Talents: </b><span class=\"path2talents\"></span></p><p><b>Trappings: </b><span class=\"path2trappings\"></span></p></div></div><div class=\"w3-row-padding well\"><div class=\"careerpath3\"><h5 class=\"path3name\"></h5><p><b>Skills: </b><span class=\"path3skills\"></span></p><p><b>Talents: </b><span class=\"path3talents\"></span></p><p><b>Trappings: </b><span class=\"path3trappings\"></span></p></div></div><div class=\"w3-row-padding well\"><div class=\"careerpath4\"><h5 class=\"path4name\"></h5><p><b>Skills: </b><span class=\"path4skills\"></span></p><p><b>Talents: </b><span class=\"path4talents\"></span></p><p><b>Trappings: </b><span class=\"path4trappings\"></span></p></div></div><br /><div class=\"w3-center\" style=\"padding-bottom: 1em !important;\"><button onclick=\"careerModalSearch(this)\" class=\"w3-button w3-deep-amber firstBtn\">Career List</button><button onclick=\"hideModal(this)\"class=\"w3-button w3-deep-red-l1 w3-round-large lastBtn\">Close</button></div></div></div>"
    
}

var lores = {
    "Beasts": {
        "desc": "The Amber wind, <em>Ghur</em>, carries with it a chill, primal ferocity, that is unnerving to beasts and sentient creatures alike. Whenever you successfully cast a spell from the Lore of Beasts, you may also gain the <em>Fear (1)</em> Creature Trait (see page 190) for the next 1d10 Rounds. <br/><p> <b>Ingredients: </b>Shamans use animal fur, skin, bone, and pelt, wrapped in sinews and daubed with blood runes to focus the Amber wind. Often claws are scrimshawed, organs dried, and feathers dipped in rare humours, and it’s not uncommon to find excrement, urine, and other excretions also used.</p>",
        "wind": "Ghur"
    },
    "Death": {
        "desc": "The purple wind of <em>Shyish</em> carries with it dry, dusty winds and the insistent rustling of sand passing through Time’s hourglass. Targets afflicted by spells from the Lore of Death are drained of life, enervated, and listless. You may assign +1 <condition>Fatigued</condition> Condition to any living target affected by a spell from this lore. A target may only ever have a single <condition>Fatigued</condition> Condition gained in this manner at any one time. <br/> <p><b>Ingredients:</b> The bones of sentient creatures feature heavily in Amethyst magic, as do the trappings of death, including wood or nails from coffins, embalming fluids, hourglasses, silver coins, and grave dirt, all carefully presented or engraved. Purple gemstones, materials, and flowers (particularly roses) are also common.</p>",
        "wind": "Shyish"
    },
    "Fire": {
        "desc": "The Lore of Fire, and the Bright wind of <em>Aqshy</em>, is anything but subtle. Its spells are bellowed with fervour and manifest themselves in bombastic fashion, with bright flame and searing heat. You may inflict +1 <condition>Ablaze</condition> Condition on anyone targeted by spells from the Lore of Fire, unless they also possess the <talent>Arcane Magic (Fire)</talent> Talent. Every <condition>Ablaze</condition> condition within <eh>Willpower Bonus</eh> yards adds +10 to attempts to Channel or Cast with <em>Aqshy</em>. <br/> <p><b>Ingredients:</b> Pyromancers use a wide selection of flammable materials as ingredients, which are often immolated as the spell is cast, including coal, oils, fats, and ruddy woods. Trappings immune to fire are also common, such as iron keys, carved sections of fire-grate, and small oven stones.</p>",
        "wind": "Aqshy"
    },
    "Heavens": {
        "desc": "Arcane spells cast from the Lore of Heavens are accompanied by the crackling of lightning and the smell of ozone. Spells causing Damage ignore Armour Points from metal armour, and will arc to all other targets within 2 yards, except those with the <talent>Arcane Magic (Heavens)</talent> Talent, inflicting hits with a Damage equal to your <eh>Willpower Bonus</eh>, handled like a <condition>magical missile</condition>. <br/> <p><b>Ingredients:</b> Astronomical instruments, charts, lenses, and symbols dominate Celestial magic, as do ingredients associated with augury, such as animal innards, mirrors, glass balls, and bird tongues. Some wind-based spells use wings and feathers, where those involving electricity prefer slivers of carved metal.</p>",
        "wind": "Azyr"
    },
    "Metal": {
        "desc": "The wind of <em>Chamon</em> is very dense, and quickly attaches itself to metallic substances. Spells from this lore are accompanied with golden light and heat, and are especially effective against foes foolish enough to encase themselves in metal. Spells inflicting Damage ignore Armour Points from metal armour, and inflict bonus Damage equal to the number of Armour Points of metal armour being worn on any Hit Location struck. So, if your spell hit an Arm location protected by 2 Armour Points of metal armour, it would cause an additional +2 Damage and ignore the Armour Points. <br/> <p><b>Ingredients:</b> Heavy metals of all types, esoterically inlaid or carved, comprise the majority of Gold ingredients, though many spells also use trappings associated with a forge, including sections of a bellows marked with mathematical formula, inscribed chunks of an anvil, or fragments of a furnace.</p>",
        "wind": "Chamon"
    },
    "Life": {
        "desc": "Spells cast with <em>Ghyran</em>, the Jade Wind, are suffused with life, tending to manifest with a vibrant green light, and are often accompanied by natural phenomena given supernatural qualities. Vines, undergrowth, trees, and rivers all bend to the Druids’ wills. <br/> Receive a +10 bonus to <em>Casting</em> and <em>Channelling</em> rolls when in a rural or wilderness environment. Living creatures — e.g. those without the <em>Daemonic</em> or <em>Undead</em> Creature Traits — targeted by Arcane Spells from the Lore of Life have all <condition>Fatigued</condition> and <condition>Bleeding</condition> Conditions removed after any other effects have been applied as life magic floods through them. Creatures with the <em>Undead Creature</em> Trait, on the other hand, suffer additional Damage equal to your <eh>Willpower Bonus</eh>, ignoring Toughness Bonus and Armour Points, if affected by any spell cast with the Lore of Life. <br/><p> <b>Ingredients: </b>Druids use a wide variety of naturally occurring ingredients, ranging from rare seeds and nuts, humours gathered from sentient creatures in the flush of life, uncommon tree saps, fertile loam, spring waters, and a variety of living ingredients, including plants and smaller animals.</p>",
        "wind": "Ghyran"
    },
    "Light": {
        "desc": "Arcane Spells sung from the Lore of Light tend to emit dazzling rays of blinding white light, or shroud the caster in shimmering waves of radiant purity. You may inflict one <condition>Blinded</condition> Condition on those targeted by Lore of Light spells, unless they possess the <talent>Arcane Magic (Light)</talent> Talent. <br/> If a target has the <em>Daemonic</em> or <em>Undead</em> Creature Traits, spells also inflict an additional hit with Damage equal to your <eh>Intelligence Bonus</eh> that ignores Toughness Bonus and Armour Points. <br/> <p><b>Ingredients:</b> Hierophants of the Lore of Light use many artefacts associated with holiness and holy places, supplemented by crystals, glass, pyramidions, and small statues, all carved with sacred symbols, twisting snakes, and moral tales. White candles, silver carvings, and bleached paper are also common.</p>",
        "wind": "Hysh"
    },
    "Shadows": {
        "desc": "Spells cast from the Lore of Shadows are surreptitious and sly, and so the <special>lingua praestantia</special> may be muttered stealthily. Any protective spells you may cast wreath you in shadows and billow smoke, making your body insubstantial, possibly even allowing blades to pass through you seemingly without harm. Further, all spells cast from the Lore of Shadows inflicting Damage ignore all non-magical Armour Points. <br/> <p><b>Ingredients:</b> Anything used to hide, shroud, or conceal is repurposed as Grey ingredients, including cosmetics, scents, scarfs, spectacles, mirrors, and wigs. Items drawn from professions steeped in intrigue and wisdom are also common, with diplomatic artefacts, symbols of rank, and the ultimate expression of power &ndash; a blade &ndash; prevalent.</p>",
        "wind": "Ulgu"
    },
    "Petty": {
        "desc": "For the few Humans blessed — or cursed, depending upon your point of view — with the spark of magic, it generally manifests around puberty, and almost always before 25 summers have passed. The first indications of impending witchery are often little tricks, knacks, cantrips, or similar, showing the wizard-to-be should probably be trained for everyone else’s safety. <br/> For Elves, this is just a part of growing up, and those with interest in magic are schooled to develop their burgeoning talents. For Humans, assuming they avoid being lynched, it likely means years of training as an apprentice to a wizard from one of the Eight Colleges of Magic, after which they should never use the little tricks they learned when young again. But most do. <br/> As Petty spells are not formally codified, they have many different names. Players are encouraged to devise their own, more characterful names, reflecting their personality.<br/><br/> Petty spells are learned when taking the <talent>Petty Magic</talent> Talent, which may be available to your Career. Additional Petty spells can be learned for an XP cost"
    },
    "Arcane": {
        "desc": "The Arcane spells represent common formulations of the <special>lingua praestantia</special>. How these spells manifest in practice will depend on your <talent>Arcane Magic</talent> Talent. For instance, a spellcaster with the <talent>Arcane Magic (Fire)</talent> Talent casting <spell>Drop</spell> may cause the object to overheat, while one with <talent>Arcane Magic (Shadows)</talent> may make it slightly insubstantial, causing the object to literally slip between the target’s fingers. <br/> Treat Arcane spells as extra options for every Lore of Magic, including Witch, Dark, and Chaos Lores. They are counted as Lore spells in all ways, meaning they get all the benefits of Lore spells, and can only be learned from and taught to those sharing the same Arcane Magic Talent. <br/> <p><b>Note: </b>Any spell marked with a ‘&plus;’ at the end of the Duration gains the following extra text: When the spell should end, you may make a <em>Willpower</em> Test to extend the Duration for +1 round.</p>"
    },
    "Hedgecraft": {
        "desc": "The Hedgefolk believe their Lore is a gift from the Gods, referring to their spellcasters as the Blessed Few. Due to their ancient traditions and ingrained belief, their spells cannot be cast without ingredients, which are an integral part of their spellcasting process. <br/> Fortunately, the ingredients they use are easily found on the fringes of settlements and are usually herbs or plants. You receive 1 + SL ingredients on a successful foraging roll, using <em>Lore (Herbalism)</em>, as described under Gathering Food and Herbs on page 127, or you can buy them for 5 brass pennies each. <br/> <p><b>Ingredients:</b> Hedgefolk use easily sourced local materials prepared to exacting standards using special tools. So, ingredients may include things such as the wings of a dragonfly killed with a silver pin, rods of poplar polished with beeswax on Sonnstill, or bones buried beneath a hedgerow for a winter’s month.</p>"
    },
    "Witchcraft": {
        "desc": "Spells from the Lore of Witchcraft draw on whichever winds of magic are available, without care or concern for mingling the winds and the potentially horrific results. Each time practitioners of Witchcraft roll on a Miscast table, they also gain 1 Corruption point. Further, you may inflict one Bleeding Condition on anyone targeted by spells from the Lore of Witchcraft. Lastly, channelling or casting spells from this Lore automatically require a roll on the Minor Miscast table unless cast with an ingredient, where the ingredient provides no further protection should you roll a Miscast. Fortunately, ingredients for the Lore of Witchcraft are cheap and readily available: body parts of small animals for the most part. Ingredients cost a spell’s CN in brass pennies, instead of silver shillings, to purchase. Alternatively, a Witch may forage for parts, using the Outdoor Survival skill: a successful foraging roll receives 1 + SL ingredients, as described under Gathering Food and Herbs on page 127. <br/> <p><b>Ingredients:</b> Witches use a horrific mixture of animal body parts, often harvested when a creature is still alive. It is not uncommon to find them clutching lizard eyes, dog toes, donkey gizzard, or much, much worse in their bloody hands as they cast their foul magics.</p>"
    },
    "Daemonology": {
        "desc": "The forbidden Lore of Daemonology is concerned with summoning, binding, and controlling Daemons, typically to empower the spellcaster. It is horrifically dangerous, usually leading to the Daemonologist’s downfall as their soul is taken by the Ruinous Powers and a new Chaos Sorcerer is born."
    },
    "Necromancy": {
        "desc": "Necromancy is an ancient and bloody magic art concerned with mastering death and seeking immortality, often by carving up rotting corpses. Considered one of the foulest and most heretical of magics, few take to studying its fell secrets lightly, for the horrors of the dead, and the undead, cannot be underestimated."
    }

}


var spell = [
    {
        "name": "",
        "lore": "",
        "wind": "",
        "CN": 0,
        "range": "",
        "target": "",
        "duration": "",
        "description": ""
    }, {
        "name": "Amber Talons",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 6,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "Your nails grow into wickedly sharp talons of crystal amber. Unarmed attacks made using Melee (Brawling) count as magical, have a Damage equal to your <eh>Willpower Bonus</eh>, and inflict +1 <condition>Bleeding</condition> Condition whenever they cause a loss of wounds."
    }, {
        "name": "Beast Form",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 5,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower</eh> minutes",
        "description": "You infuse your very bones and flesh with <em>Ghur</em>, warping your body into that of a creature. When cast, select a new form from any of the Beasts of the Reikland section of the Bestiary. Gain all the standard Traits of the creature, except the Bestial Trait. Further, replace your S, T, Agi, and Dex with those of the creature, then recalculate your Wounds. For every + 2 SL, you may include 1 of the included Optional Creature Trait. While in Beast Form, you look like a normal version of the creature, with amber and brown colouring. You may not speak, which means you cannot cast spells, or attempt to dispel. If you have lost any Wounds when the spell ends, you lose the same number of Wounds when you revert to your true form, to a minimum of 0 Wounds."
    }, {
        "name": "Beast Master",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 10,
        "range": "<eh>Willpower Bonus</eh> yards",
        "target": "1",
        "duration": "<eh>Willpower Bonus</eh> days",
        "description": "Your breath steams and your eyes take on a shining amber sheen as <em>Ghur</em> suffuses you. Your gaze and words convince 1 creature possessing the <em>Bestial</em> trait that you are its pack master, and it will fight to the death to protect you. While subject to your mastery it will follow your instructions, instinctively understanding simple instructions. If the creature is released from the spell &mdash; through the duration running out, or the spell being dispelled &mdash; it will retain enough residual respect and fear not to attack you, unless compelled to. Your allies may not be so fortunate."
    }, {
        "name": "Beast Tongue",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 3,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower</eh> minutes",
        "description": "You can commune with all creatures possessing the Bestial Trait. <em>Ghur</em> clogs your throat, and your language comes out as snarls, hisses, and roars as befits the beasts to whom you talk. While the creatures are not compelled to answer you, or do as you bid, most will be curious enough to hear you out. You gain +20 on all <skill>Charm Animal</skill> and <skill>Animal Training</skill> Tests While this spell is active, you may only speak with beasts &mdash; you may not speak any civilised tongues, and can only communicate with your party using gestures or Language (Battle). Note, this also means you cannot cast any spells, or dispel, while Beast Tongue is active."
    }, {
        "name": "Flock of Doom",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You call down a murder of crows or similar local birds to assail your foes. The flock attacks everyone in the Area of Effect who does not possess the <talent>Arcane Magic (Beasts)</talent> Talent ferociously, inflicting a +7 Damage hit at the end of the Round. The flock remains in play for the duration of the spell. For your Action you may make an <test>Average (+20) Charm Animal Test</test> to move the flock to another target within range. While within the Area of Effect, all creatures gain +1 <condition>Blinded</condition> Condition."
    }, {
        "name": "Hunter’s Hide",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 6,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You cloak yourself in a shimmering mantle of <em>Ghur</em>. While the spell lasts, gain a bonus of +20 Toughness and the <em>Dark Vision</em> and <em>Fear (1)</em> Creature Traits (see page 339), as well as the <talent>Acute Sense (Smell)</talent> Talent."
    }, {
        "name": "The Amber Spear",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "Special",
        "duration": "Instant",
        "description": "You hurl a great spear of pure <em>Ghur</em> in a straight line. This is a <em>magic missile</em> with a Damage of +12. It strikes the first creature in its path, ignoring APs from armour made of leather and furs. If the target suffers any Wounds, also inflict +1 <condition>Bleeding</condition> Condition, after which the spear continues on its path, striking each target in the same manner, but at –1 Damage each time. If the spear fails to inflict any Wounds, its progress is stopped and the spell comes to an end. <em>The Amber Spear</em> only inflicts the minimum 1 Wound (see page 236) on the first target it strikes."
    }, {
        "name": "Wyssan’s Wildform",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 8,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You call on the wild power of <em>Ghur</em> to infuse you, surrendering to its savage delights. Gain the following Creature Traits (see page 338): <em>Arboreal, Armour (2), Belligerent, Big, Bite (Strength Bonus +1), Fear (1), Fury, Magical, Weapon (Strength Bonus +2)</em>. While the spell is in place you are incapable of using any Language or Lore skills."
    }, {
        "name": "Caress of Laniph",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 7,
        "range": "Touch",
        "target": "Special",
        "duration": "Instant",
        "description": "As you reach out your hand, it appears withered, even skeletal, drawing <em>Shyish</em> from your target’s corpus. This counts as a <em>magic missile</em> with a Damage of +6 that ignores Toughness Bonus and Armour Points. For every 2 Wounds inflicted, you may recover 1 Wound."
    }, {
        "name": "Dying Words",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 6,
        "range": "Touch",
        "target": "1",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "Touching the body of a recently departed soul (one that passed away within the last day), you call its soul back briefly. For the spell’s duration, you can communicate with the dead soul, though it cannot take any action other than talking. It is not compelled to answer you, but the dead do not lie."
    }, {
        "name": "Purple Pall of <em>Shyish</em>",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 9,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You pull about you a pall fashioned from fine strands of purple magic. Gain +<en>Willpower Bonus</en> Armour Points on all locations, and the <em>Fear (1)</em> Creature Trait (see page 339). For every +2 SL you may increase your Fear rating by 1."
    }, {
        "name": "Sanctify",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 10,
        "range": "Touch",
        "target": "AoE (<eh>Willpower Bonus</eh> Rounds)",
        "duration": "<eh>Willpower</eh> minutes",
        "description": "Inscribing a magical circle, you ward it with <em>Shyish</em>, forming an impenetrable barrier to the Undead. Creatures with the Undead Creature Trait cannot enter or leave the circle."
    }, {
        "name": "Scythe of <em>Shyish</em>",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 6,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You conjure a magical scythe, which can be wielded in combat, using the Melee (Polearm) Skill. It acts like a normal scythe with a Damage equal to your <eh>Willpower Bonus</eh>+3. Enemies with the <em>Undead</em> Creature Trait do not receive Advantage when Engaged in combat with you."
    }, {
        "name": "Soul Vertex",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "Instant",
        "description": "You hurl a shimmering ball of <em>Shyish</em> which erupts into purple flames, swirling with ghostly faces, mouths agape in silent terror. Targets within the Area of Effect receive +1 <condition>Broken</condition> Condition. Against targets with the <em>Undead</em> Creature Trait, <em>Soul Vortex</em> is a <em>magic missile</em> with a Damage of +10 that ignores Toughness Bonus and Armour Points."
    }, {
        "name": "Steal Life",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 7,
        "range": "<eh>Willpower</eh> yards",
        "target": "1",
        "duration": "Instant",
        "description": "Thin strands of purple mist connect you briefly to your target, who wastes away before your very eyes. This counts as a <em>magic missile</em> with a Damage of +6 that ignores Armour Points and inflicts +1 <condition>Fatigued</condition> Condition. Further, you remove all <condition>Fatigued</condition> Conditions you currently suffer, and may heal yourself up to half the Wounds the target suffers, rounding up."
    }, {
        "name": "Swift Passing",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 6,
        "range": "Touch",
        "target": "Special",
        "duration": "Instant",
        "description": "Your touch brings the release of death to a single mortally wounded target. If you successfully touch a target with 0 wounds remaining and at least 2 Critical Wounds, death swiftly follows. Further, the target cannot be raised as Undead."
    }, {
        "name": "Aqshy’s Aegis",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 5,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You wrap yourself in a fiery cloak of <em>Aqshy</em>, which channels flame into the Aegis. You are completely immune to damage from non-magical fire, including the breath attacks of monsters, and ignore any <condition>Ablaze</condition> Conditions you receive. You receive the <em>Ward (9+)</em> Creature Trait (see page 343) against magical fire attacks including spells from the Lore of Fire."
    }, {
        "name": "Cauterise",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 4,
        "range": "Touch",
        "target": "1",
        "duration": "Instant",
        "description": "Channelling <em>Aqshy</em> through your hands you lay them on an ally\’s wounds. Immediately heal 1d10 Wounds and remove all <condition>Bleeding</condition> Conditions. Further, the wounds will not become infected. <br/> Targets without the <talent>Arcane Magic (Fire)</talent> Talent, must pass a <test>Challenging (+0) Cool Test</test> or scream in agony. If Failed by –6 or more SL, the target gains the <condition>Unconscious</condition> Condition and is permanently scarred, waking up 1d10 hours later."
    }, {
        "name": "Crown of Flame",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 8,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You channel <em>Aqshy</em> into a majestic crown of inspiring fire about your brow. Gain the <em>Fear (1)</em> Trait and +1 <talent>War Leader</talent> Talent while the spell is active. <br/> For every +2 SL, you may increase your <em>Fear</em> value by +1, or take <talent>War Leader</talent> Talent again. Furthermore, gain a bonus of +10 on all attempts to Channel and Cast with <em>Aqshy</em> while the spell is in effect."
    }, {
        "name": "Flaming Hearts",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "Your voice takes on a rich resonance, echoing with <em>Aqshy’s</em> fiery passion. Affected allies lose all <condition>Broken</condition> and <condition>Fatigued</condition> Conditions, and gain +1 <talent>Drilled</talent>, <talent>Fearless</talent> and <talent>Stout-hearted</talent> Talents while the spell is in effect."
    }, {
        "name": "Firewall",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 6,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (Special)",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You channel a fiery streak of <em>Aqshy</em>, creating a wall of flame. The Firewall is <eh>Willpower Bonus</eh> yards wide, and 1 yard deep. <br/> For every +2 SL you may extend the length of the Firewall by <eh>+Willpower Bonus</eh> yards. Anyone crossing the firewall gains 1 <condition>Ablaze</condition> condition and suffers a hit with a Damage equal to your <eh>Willpower Bonus</eh>, handled like a <em>magical missile</em>."
    }, {
        "name": "Great Fires of U’Zhul",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 10,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<em>Willpower Bonus</em> yards)",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You hurl a great, explosive blast of <em>Aqshy</em> into an enemy, which erupts into a furious blaze, burning with the heat of a forge. This is a <em>magical missil</em>e with Damage +10 that ignores Armour Points and inflicts +2 <condition>Ablaze</condition> Conditions and the <condition>Prone</condition> Condition on a target. Everyone within the Area of Effect of that target suffers a Damage +5 hit ignoring Armour Points, and must pass a <b>Dodge Test</b> or also gain +1 <condition>Ablaze</condition> Condition.  <br/>The spell stops behaving like a <em>magic missile</em> as the fire continues to burn in the Area of Effect for the duration. Anyone within the Area of Effect at the start of a round suffers 1d10+6 Damage, ignoring APs, and gains +1 <condition>Ablaze</condition> Condition."
    }, {
        "name": "Flaming Sword of Rhuin",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "1",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You wreathe a sword in magical flames. The weapon has Damage +6 and the Impact Quality (see page 298), and anyone struck by the blade gains +1 <condition>Ablaze</condition> Condition. If wielders do not possess the <talent>Arcane Magic (Fire)</talent> Talent, and they fumble an attack with the Flaming Sword, they gain +1 <condition>Ablaze</condition> Condition."
    }, {
        "name": "Purge",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 10,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<em>Willpower Bonus</em> yards)",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You funnel intense flame to burn away the taint and corruption in an area. Anything flammable is set alight, and any creatures in the area takes +SL <condition>Ablaze</condition> conditions. If the location contains a Corrupting Influence, such as <em>Dhar</em>, warpstone, or a Chaos-ttainted object, it too will smoulder and blacken, beginning to burn. This spell may be maintained in subsequent rounds by passing a <b>Challenging (+0) Channelling Test</b>.  <br/>The precise time needed to eliminate the Corrupting Influence will be determined by your GM. As a rough guideline, a small quantity (smaller than an acorn) of warpstone, or a minor Chaos-tainted object may require 10–Willpower Bonus Rounds (minimum of 1 Round). A larger quantity of warpstone — fist-sized — or a more potent Chaos-tainted object may require double this. A powerful Chaos Artefact may take hours, or even longer… See page 182 for detail on Corrupting Influences."
    }, {
        "name": "Animal Friend",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "1 yard",
        "target": "1",
        "duration": "1 hour",
        "description": "You make friends with a creature that is smaller than you and possesses the <em>Bestial</em> Creature Trait. The animal trusts you completely and regards you as a friend."
    }, {
        "name": "Bearings",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "You",
        "target": "You",
        "duration": "Instant",
        "description": "You sense the influx of the Winds of Magic from their source. You know which direction North is."
    }, {
        "name": "Dazzle",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "Touch",
        "target": "1",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "The target gains 1 <condition>Blinded</condition> Condition, and gains 1 <condition>Blinded</condition> Condition at the start of each round for the duration of the spell."
    }, {
        "name": "Careful Step",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower</eh> Minutes",
        "description": "The magic flowing through your feet ensures any organic matter you tread upon remains undamaged: twigs do not break, grass springs back to its original position, and even delicate flowers are unharmed. Those seeking to use the Track skill to pursue you through rural terrain suffer a –30 penalty to their Tests."
    }, {
        "name": "Conserve",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "1 yard",
        "target": "1",
        "duration": "<eh>Willpower Bonus</eh> days",
        "description": "You preserve up to a day’s worth of rations. During this time they will not rot, develop mould, or go stale, although they can still be harmed by external factors, such as getting wet or being burned or poisoned."
    }, {
        "name": "Dart",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "<eh>Willpower</eh> yards",
        "target": "1",
        "duration": "Instant",
        "description": "You cause a small dart of magical energy to fly from your fingers. This is a <em>magic missile</em> with a Damage of +0."
    }, {
        "name": "Drain",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "Touch",
        "target": "1",
        "duration": "Instant",
        "description": "You touch your targets, draining their life. This counts as a <em>magic missile</em> with Damage +0 that ignores Armour Points. <br/>You then heal 1 Wound."
    }, {
        "name": "Eavesdrop",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "<eh>Willpower</eh> yards",
        "target": "1",
        "duration": "<eh>Initiative Bonus</eh> minutes",
        "description": "You can hear what your targets say as if you were standing right next to them."
    }, {
        "name": "Gust",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "<eh>Willpower</eh> yards",
        "target": "Special",
        "duration": "Instant",
        "description": "You create a brief gust of wind, strong enough to blow out a candle, cause an open door to slam, or blow a few pages to the floor."
    }, {
        "name": "Light",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower</eh> minutes",
        "description": "You create a small light, roughly equivalent to a torch, which glows from your hand, staff or some other part of your person. While the spell is active, you may choose to increase the illumination to that of a lantern, or decrease it to that of a candle, if you pass an <b>Average (+20) Channelling Test</b>."
    }, {
        "name": "Magic Flame",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You kindle a small flame that flickers to life in the palm of your hand. It will not burn you, but will emit heat and set flammable objects alight, like a natural flame."
    }, {
        "name": "Marsh Lights",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "<eh>Willpower</eh> yards",
        "target": "Special",
        "duration": "<eh>Willpower</eh> minutes",
        "description": "You create a number of flickering magical lights up to your <eh>Intelligence Bonus</eh>. They resemble torches or hooded lanterns. Providing they remain within line of sight, for your Action you may control the lights by passing an <b>Average (+20) Channelling Test</b>; a success allows you to send the lights moving in any direction. They will move at walking pace in a straight line, passing through any objects (or witnesses) in their path, unless you test again to change their direction."
    }, {
        "name": "Murmured Whisper",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "<eh>Willpower</eh> yards",
        "target": "Special",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You cast your voice at a point within <eh>Willpower</eh> yards, regardless of line of sight. Your voice sounds from this point, and all within earshot will hear it."
    }, {
        "name": "Open Lock",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "Touch",
        "target": "Special",
        "duration": "Instant",
        "description": "One non-magical lock you touch opens."
    }, {
        "name": "Produce Small Animal",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "Touch",
        "target": "Special",
        "duration": "Instant",
        "description": "You reach into a bag, pocket, or hat, or under a rock, bush or burrow, producing a small animal of a type you would expect to find in the vicinity, such as a rabbit, dove, or rat. If there are no appropriate local animals, the spell does nothing. The temperament of the animal is not guaranteed."
    }, {
        "name": "Protection from Rain",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "You",
        "target": "You",
        "duration": "<eh>Toughness Bonus</eh> hours",
        "description": "You can keep yourself dry whatever the weather, unaffected by precipitation. This affects rain, hail, sleet and snow, and any similar water falling from the heavens, but not standing water."
    }, {
        "name": "Purify Water",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "1 yard",
        "target": "Special",
        "duration": "Instant",
        "description": "You purify all water within a receptacle, such as a water flask, stein, or jug. All non-magical impurities, such as poison or contaminants are removed, leaving crisp, clear, potable water. If the vessel contained another liquid that is predominantly water – such as ale, or wine – this is also purified, turning into delicious, pure, non-alcoholic water."
    }, {
        "name": "Rot",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "1 yard",
        "target": "Special",
        "duration": "Instant",
        "description": "You cause a roughly fist-sized volume of organic material to immediately rot. Food stuffs perish, clothes crumble, leathers shrivel (losing 1 Armour Point on 1 hit location), and similar, as dictated by the GM."
    }, {
        "name": "Sleep",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "Touch",
        "target": "1",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You touch your opponent, sending them into a deep sleep. If the target has the <condition>Prone</condition> Condition, they gain the <condition>Unconscious</condition> Condition as they fall asleep. They remain unconscious for the duration, although loud noises or being moved or jostled will awaken them instantly. If your targets are standing or sitting when affected, they start themselves awake as they hit the ground, gaining the <condition>Prone</condition> Condition, but remaining conscious. <br/> <br/> If your targets are not resisting, and are suitably tired, they will, at the spell’s end, pass into a deep and restful sleep."
    }, {
        "name": "Spring",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "Touch",
        "target": "Special",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You touch the ground and water bubbles forth at the rate of 1 pint per Round, to a total of your <eh>Initiative Bonus</eh> in pints."
    }, {
        "name": "Shock",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "Touch",
        "target": "1",
        "duration": "Instant",
        "description": "Your target receives 1 <condition>Stunned</condition> condition."
    }, {
        "name": "Sly Hands",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You teleport a small object &mdash; no bigger than your fist &mdash; from about your person into your hand."
    }, {
        "name": "Sounds",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "<eh>Willpower</eh> yard",
        "target": "Special",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You create small noises nearby. You can create quiet, indistinct noises that sound as if they come from a specific location within range, regardless of line of sight. The noises can evoke something specific, such as footsteps, whispers or the howl of an animal, but nothing so distinct that it might convey a message. <br/> <br/> While the spell is active, you may control the sounds by passing an <b>Average (+20) Channelling Test</b>. A success allows you to move the sounds to another point within range, or to increase or decrease their volume."
    }, {
        "name": "Twitch",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "<eh>Willpower Bonus</eh> yards",
        "target": "Special",
        "duration": "Instant",
        "description": "You cause a small object to move, slightly. Something may fall from a shelf, or a book may slam its pages shut. If the object is held, the holder must pass an <b>Average (+20) Dexterity Test</b> or drop the object."
    }, {
        "name": "Warning",
        "lore": "Petty",
        "wind": "",
        "CN": 0,
        "range": "1 yard",
        "target": "Special",
        "duration": "Instant",
        "description": "You channel magic into an object, noticing immediately if it has been poisoned or trapped."
    }, {
        "name": "Destroy Lesser Daemon",
        "lore": "Daemonology",
        "wind": "",
        "CN": 6,
        "range": "<eh>Willpower</eh> yards",
        "target": "1",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "Your spell disrupts the <em>Dhar</em> holding a target Daemon together, and draws it back to you. A target with the <em>Daemonic</em> Creature Trait and a lower Willpower than you loses Wounds equal to your <eh>Willpower Bonus</eh>, ignoring Toughness Bonus or Armour Points. In turn, you may increase one of your Characteristic by +10 for the duration as you siphon profane energies."
    }, {
        "name": "Detect Daemon",
        "lore": "Daemonology",
        "wind": "",
        "CN": 4,
        "range": "<eh>Willpower</eh> yards",
        "target": "Special",
        "duration": "Instant",
        "description": "Your spell homes in on the daemonic influences in the surrounding area. You automatically know if there is a manifested Daemon within range, be it summoned, bound into an artefact, possessing another, or similar."
    }, {
        "name": "Manifest Lesser Daemon",
        "lore": "Daemonology",
        "wind": "",
        "CN": 8,
        "range": "<eh>Willpower Bonus</eh> yards",
        "target": "Special",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You channel a sickening flow of <em>Dhar</em>, briefly forcing a rent into the fabric of reality. A Lesser Daemon immediately manifests through the rent (see page 335 for two examples of this: a Bloodletter or a Daemonette). Perform an <b>Opposed Channel (Dhar )/Willpower Test</b> with the Daemon. If successful, the Daemon will respond to one command issued by you, quite literally, then vanish (assuming the command is completed before the Duration ends). If failed, the Daemon immediately attacks."
    }, {
        "name": "Octogram",
        "lore": "Daemonology",
        "wind": "",
        "CN": 10,
        "range": "Touch",
        "target": "AoE (maximum, <eh>Willpower Bonus</eh> yards across)",
        "duration": "<eh>Willpower</eh> minutes",
        "description": "Daubing an octagram to the floor, and marking it with unholy symbols, you ward against all daemonic influence. Those with the <em>Daemonic</em> Creature Trait cannot enter or leave the octagram unless their Willpower is more than twice yours."
    }, {
        "name": "Raise Dead",
        "lore": "Necromancy",
        "wind": "",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "Until Sunrise",
        "description": "You channel a heavy flow of <em>Dhar</em> into bare earth, causing old bones to gather and rise. SL+1 Skeletons will claw upwards into the affected area at the end of the Round, which are organised as you prefer within the area of effect. They start with the <condition>Prone</condition> Condition. <br/>The summoned undead are entirely under your control and can perform simple orders as you command. If you are killed or gain an <condition>Unconscious</condition> Condition, the spell comes to an end and the summoned Undead collapse. For each +2 SL you score, you may summon an extra SL Skeletons."
    }, {
        "name": "Reanimate",
        "lore": "Necromancy",
        "wind": "",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "Until Sunrise",
        "description": "You channel worming strands of thick <em>Dhar</em> before you, sinking it into corpses, reanimating that which was once dead. Reanimate <eh>Willpower Bonus + SL</eh> dead bodies (as Zombies) or skeletons (as Skeletons) within range. They start with the <condition>Prone</condition> Condition.<br/> The summoned Undead are entirely under your control and can perform simple orders as you command. If you die or gain an <condition>Unconscious</condition> Condition, the spell comes to an end and the reanimated corpses fall dead again. For each +2 SL you score, you may reanimate an extra <eh>Willpower Bonus + SL</eh> Skeletons or Zombies."
    }, {
        "name": "Screaming Skull",
        "lore": "Necromancy",
        "wind": "",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "Special",
        "duration": "Instant",
        "description": "You shriek the high-pitched words of the spell and a large, black skull wreathed with greenish-purple fire forms before you, then flies forwards, screaming and cackling as it goes. The skull moves in a straight line for the spell range, following the contours of the land, passing through any obstacles in its way. <em>Screaming Skull</em> is a <em>magic missile</em> that only affects targets without the <em>Undead</em> Creature Trait, and has a Damage equal to your <eh>Willpower Bonus</eh>. Any suffering Wounds from the spell must pass a <b>Challenging (+0) Cool Test</b> or also take a <condition>Broken</condition> Condition."
    }, {
        "name": "Vanhel’s Call",
        "lore": "Necromancy",
        "wind": "",
        "CN": 6,
        "range": "<eh>Willpower</eh> yards",
        "target": "Special",
        "duration": "Instant",
        "description": "You manipulate complicated flows of <em>Dhar</em> into your targets, filling them with overwhelming energy. <eh>Intelligence Bonus</eh> targets with the <em>Undead</em> Trait gain a free Move or Action — you choose one or the other to affect all targets — this is taken the moment the spell is cast. For each +2 SL you score, you may invigorate an extra <eh>Intelligence Bonus</eh> targets."
    }, {
        "name": "Cerulean Shield",
        "lore": "Heavens",
        "wind": "Azyr",
        "CN": 7,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds",
        "description": "You encase yourself in a crackling cage of sparking electricity and <em>Azyr</em>. For the spell’s duration, gain +SL Armour Points to all locations against melee attacks. If attacked by metal weapons &mdash; such as daggers, swords, and spears with metal tips &mdash; your attacker takes +Willpower Bonus Damage."
    }, {
        "name": "Comet of Casandora",
        "lore": "Heavens",
        "wind": "Azyr",
        "CN": 10,
        "range": "Initiative yards",
        "target": "AoE (Initiative Bonus yards)",
        "duration": "Special",
        "description": "<p>You channel all the <em>Azyr</em> you can muster and reach out to the skies, calling down a comet to wreak havoc amongst your foes. Select a target point within range. At the end of the next round, make an <b>Average (+20) Perception Test</b>. For every +SL you achieve, you may move your point of impact by Initiative Bonus yards.</p> <p>For every –SL, the GM will move the point of impact by Initiative Bonus yards in a random direction. Comet of Casandora then acts as a magical missile with Damage +12 that hits all targets in the Area of Effect, who also gain +1 <condition>Ablaze</condition> and the <condition>Prone</condition> Condition.</p>"
    }, {
        "name": "Fate's Fickle Fingers",
        "lore": "Heavens",
        "wind": "Azyr",
        "CN": 6,
        "range": "You",
        "target": "AoE (Initiative Bonus yards)",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>All allies within the Area of Effect, excluding those with the <talent>Arcane Magic (Heavens)</talent> Talent, create a single pool for their Fortune Points. All may draw on the pool, first come, first served. When the spell ends, you reallocate any remaining Fortune Points as fairly as possible. </p>"
    }, {
        "name": "Starcrossed",
        "lore": "Heavens",
        "wind": "Azyr",
        "CN": 7,
        "range": "Willpower yards",
        "target": "1",
        "duration": "Initiative Bonus Rounds",
        "description": "<p>While this spell is active, you can spend Fortune Points to force an opponent to reroll Tests. </p>"
    }, {
        "name": "T'Essla's Arc",
        "lore": "Heavens",
        "wind": "Azyr",
        "CN": 7,
        "range": "Willpower yards",
        "target": "1",
        "duration": "Instant",
        "description": "<p>A crackling bolt of lightning shoots from your fingertips, striking your target. This is a magic missile with Damage +10 that inflicts +1 <condition>Blinded</condition> condition. </p>"
    }, {
        "name": "The First Portent of Amul",
        "lore": "Heavens",
        "wind": "Azyr",
        "CN": 3,
        "range": "You",
        "target": "You",
        "duration": "Initiative Bonus Rounds",
        "description": "<p>Gain +1 Fortune Point. For every +2 SL, gain +1 more. Any of these points unused at the end of the Duration are lost.</p>"
    }, {
        "name": "The Second Portent of Amul",
        "lore": "Heavens",
        "wind": "Azyr",
        "CN": 6,
        "range": "You",
        "target": "You",
        "duration": "Initiative Bonus Rounds",
        "description": "<p>Gain +SL Fortune Points. For every +2 SL, gain +1 additional Fortune point. Any unused points at the end of the Duration are lost.</p>"
    }, {
        "name": "The Third Portent of Amul",
        "lore": "Heavens",
        "wind": "Azyr",
        "CN": 12,
        "range": "You",
        "target": "You",
        "duration": "Initiative Bonus Rounds",
        "description": "<p>Gain +1 Fate Point. If the Fate point is not used by the end of the Duration, it is lost.</p>"
    }, {
        "name": "Crucible of <em>Chamon</em>",
        "lore": "Metal",
        "wind": "Chamon",
        "CN": 7,
        "range": "Willpower Bonus yards",
        "target": "1",
        "duration": "Instant",
        "description": "<p>You channel <em>Chamon</em> into a single non-magical, metallic object, such as a weapon or piece of armour. The item melts, dripping to the floor as molten metal, cooling almost immediately. If held, the item is dropped. If worn, the wearer takes a hit like a magic missile with Damage equal to your Willpower Bonus that ignores Toughness Bonus. While the object is destroyed, the metal retains its base value, and may be used by a smith as raw material. </p>"
    }, {
        "name": "Enchant Weapon",
        "lore": "Metal",
        "wind": "Chamon",
        "CN": 6,
        "range": "Touch",
        "target": "Special",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You encase a single non-magical weapon with heavy bands of <em>Chamon</em>, enhancing its potency. For the duration of the spell it counts as magical, gains a bonus to Damage equal to your Willpower Bonus, and gains the <weaponQual>Unbreakable</weaponQual> Quality (see page 298). For every +3 SL you may also add 1 Quality or remove 1 Flaw from the weapon, while the spell is in effect.</p>"
    }, {
        "name": "Feather of Lead",
        "lore": "Metal",
        "wind": "Chamon",
        "CN": 5,
        "range": "Willpower yards",
        "target": "AoE (Willpower Bonus yards)",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>Calling on the golden wind, you alter the density of your target’s belongings, raising or lowering their weight. For the duration of the spell, choose one effect for everyone within the area of effect:<ul><li>Count as two steps more Overburdened</li><li>Do not count as Overburdened</li></ul></p><p>See page 293 for details on Encumbrance.</p>"
    }, {
        "name": "Fool's Gold",
        "lore": "Metal",
        "wind": "Chamon",
        "CN": 4,
        "range": "Touch",
        "target": "1",
        "duration": "Willpower minutes",
        "description": "<p>You weave <em>Chamon</em> into a non-magical object made of metal, fundamentally altering its alchemical nature. For the duration of the spell, all metal in the object becomes gold. This is not an illusion: it has actually transformed into gold. When the spell ends, the item reverts to its original metal. This spell can ruin good weapons, make armour too heavy to wear, and turn lead coins into something much more appealing. Spot effects arising from this spell are left in the hands of the GM.</p>"
    }, {
        "name": "Forge of <em>Chamon</em>",
        "lore": "Metal",
        "wind": "Chamon",
        "CN": 9,
        "range": "Willpower Bonus yards",
        "target": "Special",
        "duration": "Willpower minutes",
        "description": "<p>You alter the quality of a single item made of metal. You may add 1 Quality or remove 1 Flaw. For every +2 SL, you may add another Quality or remove another Flaw.</p>"
    }, {
        "name": "Glittering Robe",
        "lore": "Metal",
        "wind": "Chamon",
        "CN": 5,
        "range": "You",
        "target": "You",
        "duration": "Toughness Bonus Rounds",
        "description": "<p>Wild flurries of <em>Chamon</em> whirl around you, deflecting blows and intercepting missiles and magical attacks. Gain the <trait>Ward (9+)</trait> Creature Trait (see page 343) against all attacks and spells targeting you. Each hit successfully saved increases the Ward’s effectiveness by 1, to a maximum of Ward (3+). </p>"
    }, {
        "name": "Mutable Metal",
        "lore": "Metal",
        "wind": "Chamon",
        "CN": 5,
        "range": "Touch",
        "target": "1",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You touch a non-magical object made of metal, which instantly becomes warm to the touch as you squeeze <em>Chamon</em> into it. You may bend and mangle the object with an <strong>Average (+20) Strength Test</strong>. If you wish to make a more complex alteration, you may attempt an <strong>Average (+20) <skill>Trade (Smith, or similar)</skill> Test</strong> instead. </p>"
    }, {
        "name": "Transmutation of <em>Chamon</em>",
        "lore": "Metal",
        "wind": "Chamon",
        "CN": 12,
        "range": "Willpower yards",
        "target": "AoE (Willpower Bonus yards)",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You wrench <em>Chamon</em> from the metals worn by your foes, and the earth itself, briefly transforming the flesh of your enemies into metal. This is a magic missile affecting all in the Area of Effect, with a Damage equal to your Willpower Bonus; the spell ignores Toughness Bonus and inflicts +1 <condition>Blinded</condition>, <condition>Deafened</condition>, and <condition>Stunned</condition> Condition, all of which last for the duration of the spell. All affected targets gain +1 Armour Point from the gold wrapped about their bodies, but also suffer from Suffocation (see page 181). If targets die while the spell is in effect, they are permanently encased in a shell of base metals, a macabre reminder of the risks of sorcery.</p>"
    }, {
        "name": "Barkskin",
        "lore": "Life",
        "wind": "Ghyran",
        "CN": 3,
        "range": "Touch",
        "target": "1",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You cause the target’s skin to become hard and rough like the bark of a tree. While affected by the spell, add +2 to the target’s Toughness Bonus, but suffer a penalty of –10 to Agility and Dexterity. </p>"
    }, {
        "name": "Earthblood",
        "lore": "Life",
        "wind": "Ghyran",
        "CN": 6,
        "range": "You",
        "target": "AoE (Willpower Bonus yards)",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>To cast this spell, you must be in direct contact with the earth. Standing barefoot counts. For the duration of the spell, any creatures in direct contact with the earth within AoE heal Wounds equal to your Willpower Bonus at the start of every Round. </p>"
    }, {
        "name": "Earthpool",
        "lore": "Life",
        "wind": "Ghyran",
        "CN": 8,
        "range": "You",
        "target": "You",
        "duration": "Instant",
        "description": "<p>On casting the spell, you immediately disappear into the ground in a wild torrent of <em>Ghyran</em>. You appear at the start of the next Round at any point within your Willpower in yards, erupting from the earth violently. For every +2 SL you may increase the distance travelled by your Willpower in yards. Any enemies engaged by you on your appearance gain the <condition>Surprised</condition> Condition. This spell will not allow you to move through stone but will allow you to move through water.</p>"
    }, {
        "name": "Fat of the Land",
        "lore": "Life",
        "wind": "Ghyran",
        "CN": 4,
        "range": "Touch",
        "target": "1",
        "duration": "Willpower Bonus days",
        "description": "<p>You flood the target’s body with nourishing <em>Ghyran</em>. The target need not eat or drink, but will still excrete as normal, though any leavings will be verdant green.</p>"
    }, {
        "name": "Forest of Thorns",
        "lore": "Life",
        "wind": "Ghyran",
        "CN": 6,
        "range": "Willpower yards",
        "target": "AoE (Willpower Bonus yards)",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>This spell may only target a patch of earth (though the patch can be very small). You cause a dense knot of wickedly spiked brambles and tangled vines to burst upwards, covering the Area of Effect.</p><p>While the spell is active, anyone attempting to traverse the area on foot without the <talent>Arcane Magic (Life)</talent> Talent must make a <strong>Hard (–20) Agility Test</strong>. Failure means they gain 1 <condition>Bleeding</condition> Condition, and 1 <condition>Entangled</condition> Condition, with your Willpower used for its Strength. After the spell concludes, the growth remains, but loses its preternatural properties.</p>"
    }, {
        "name": "Lie of the Land",
        "lore": "Life",
        "wind": "Ghyran",
        "CN": 5,
        "range": "Initiative Bonus miles",
        "target": "You",
        "duration": "Special",
        "description": "<p>Touching the earth, your senses flow through the <em>Ghyran</em> tracing the nearby area. After communing for 1 minute, you receive a detailed mental map of all-natural features — land, forests, rivers, but not settlements — within range. Settlements may be alluded to — areas of clear terrain, or dug trenches, for example. Each time you increase the range with SL increases the time taken communing with the land by +1 minute. </p>"
    }, {
        "name": "Lifebloom",
        "lore": "Life",
        "wind": "Ghyran",
        "CN": 8,
        "range": "Willpower Bonus yards",
        "target": "Special",
        "duration": "Special",
        "description": "<p>You cause <em>Ghyran</em> to flood an area that is blighted or desolate. You may target either a dry riverbed, well, field, or a domestic animal. If you successfully cast the spell, the target bursts to life: <ul><li>A dry river begins to flow once again</li><li>A dry of polluted well becomes clean and fresh</li><li>A planted field, vineyard, or orchard bursts into life, with all crops immediately reaching full ripeness</li><li>A sick or unproductive animal becomes healthy. The affected beast is now healthily productive (cows produce milk, hens lay eggs, coats and hides of sheep and cows are healthy and lustrous) and any diseases are cured.</li></ul></p>"
    }, {
        "name": "Regenerate",
        "lore": "Life",
        "wind": "Ghyran",
        "CN": 6,
        "range": "Touch",
        "target": "1",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>Your target gains the <trait>Regenerate</trait> Creature Trait (see page 341).</p>"
    }, {
        "name": "Banishment",
        "lore": "Light",
        "wind": "Hysh",
        "CN": 12,
        "range": "You",
        "target": "AoE (Willpower Bonus yards)",
        "duration": "Instant",
        "description": "<p>You send a cleansing halo of <em>Hysh</em> out from your hands, affecting all creatures within the Area of Effect whose Toughness is lower than your Willpower. Targets with the <trait>Undead</trait> and <trait>Daemonic</trait> Creature Traits gain the <trait>Unstable</trait> Creature Trait (see page 343). If they already have the <trait>Unstable</trait> Trait, they are reduced to 0 Wounds. </p>"
    }, {
        "name": "Blinding Light",
        "lore": "Light",
        "wind": "Hysh",
        "CN": 5,
        "range": "Willpower yards",
        "target": "You",
        "duration": "Instant",
        "description": "<p>You emit a bright, blinding flash of light from your hand or staff. Everyone looking at you, unless they possess the <talent>Arcane Magic (Light)</talent> Talent, receives +SL <condition>Blinded</condition> Conditions.</p>"
    }, {
        "name": "Clarity of Thought",
        "lore": "Light",
        "wind": "Hysh",
        "CN": 6,
        "range": "Touch",
        "target": "1",
        "duration": "Intelligence minutes",
        "description": "<p>You calm your target’s mind, allowing them to think clearly. All negative modifiers on their thinking processes — from Conditions, Mental Mutations, Psychologies, or any other source — are ignored while the spell is in effect. </p>"
    }, {
        "name": "Daemonbane",
        "lore": "Light",
        "wind": "Hysh",
        "CN": 10,
        "range": "Willpower Bonus yards",
        "target": "1",
        "duration": "Instant",
        "description": "<p>You summon a blast of <em>Hysh</em> that passes through the border between the Realm of Chaos and the material world. The <skill>Casting</skill> Test is Opposed by the target making a Willpower Test. If you win, you obliterate a target with the <trait>Daemonic</trait> Creature Trait with a blinding white light, sending it back whence it came. If the spell successfully banishes a Daemon, everyone looking at your target, unless they possess the <talent>Arcane Magic (Light)</talent> Talent, receives +SL <condition>Blinded</condition> Conditions.</p>"
    }, {
        "name": "Healing Light",
        "lore": "Light",
        "wind": "Hysh",
        "CN": 9,
        "range": "Willpower Bonus yards",
        "target": "1",
        "duration": "Instant",
        "description": "<p>Your target glows with a bright, cleansing light (equivalent light to a campfire), healing Intelligence Bonus + Willpower Bonus Wounds. If the Target passes a <test>Very Hard (–20) Endurance Test</test>, 1 Corruption point gained in the last hour is also lost. </p>"
    }, {
        "name": "Net of Amyntok",
        "lore": "Light",
        "wind": "Hysh",
        "CN": 8,
        "range": "Intelligence Bonus yards",
        "target": "1",
        "duration": "Target's Intelligence Bonus Rounds",
        "description": "<p>You cast a delicate net woven from strands of <em>Hysh</em> over your targets, whose minds are overcome with conundrums and puzzles, leaving them paralysed with indecision. Targets gain +1 <condition>Stunned</condition> Condition, which they cannot lose while the spell is in effect. When recovering from the Condition, targets test their Intelligence instead of the Endurance Skill. Targets with the <trait>Bestial</trait> Creature Trait are immune to this spell.</p>"
    }, {
        "name": "Phâ's Protection",
        "lore": "Light",
        "wind": "Hysh",
        "CN": 10,
        "range": "You",
        "target": "AoE (Willpower Bonus yards)",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You summon a protective aura of pure, holy light. Profane creatures — those with the <trait>Undead</trait> or <trait>Daemonic</trait> Creature Trait, those with mutations, and those with more Corruption than their Willpower Bonus and Toughness Bonus combined — cannot enter the Area of Effect. Any already within the Area gain the <condition>Broken</condition> Condition until they leave. Creatures within the Area cannot gain any Corruption points while the spell is active. </p>"
    }, {
        "name": "Speed of Thought",
        "lore": "Light",
        "wind": "Hysh",
        "CN": 8,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>A lattice of <em>Hysh</em> overlays your mind, allowing you to think rapidly. Gain a bonus of +20 to Intelligence and Initiative.</p>"
    }, {
        "name": "Choking Shadows",
        "lore": "Shadows",
        "wind": "Ulgu",
        "CN": 6,
        "range": "Willpower Bonus yards",
        "target": "1",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You wrap shadowy tendrils of <em>Ulgu</em> around your foes’ necks. Assuming they need to breathe, they gain +1 <condition>Fatigued</condition> Condition, cannot talk, and are subject to rules for Suffocation (see page 181).</p>"
    }, {
        "name": "Doppelganger",
        "lore": "Shadows",
        "wind": "Ulgu",
        "CN": 10,
        "range": "You",
        "target": "You",
        "duration": "Intelligence Bonus minutes",
        "description": "<p>You weave a mask and cloak of <em>Ulgu</em> around your form, assuming the likeness of another humanoid creature with whom you are familiar (as determined by the GM). Your appearance will automatically fool anyone without the <talent>Second Sight</talent> Talent, though some may note if any of your mannerisms are incorrect. Those with that Talent must pass a <test>Difficult (–10) Perception Test</test> to notice you are disguising your form. This does not let them see through the spell. They must dispel it to do so. </p>"
    }, {
        "name": "Illusion",
        "lore": "Shadows",
        "wind": "Ulgu",
        "CN": 8,
        "range": "Willpower yards",
        "target": "AoE (Initiative Bonus yards)",
        "duration": "Willpower minutes",
        "description": "<p>You spin a web of intricate strands of <em>Ulgu</em>, obfuscating the Area of Effect with an illusory image of your choosing. You will automatically fool anyone without the <talent>Second Sight</talent> Talent. Those with that Talent must pass a <test>Difficult (–10) Perception Test</test> to notice the illusion. This does not let them see through the spell. They must dispel it to do so. </p><p>The illusion is, by default, static. For your Action, you may make a <test>Hard (–20) Channelling Test</test> to make the illusion move for that Round. </p>"
    }, {
        "name": "Mindslip",
        "lore": "Shadows",
        "wind": "Ulgu",
        "CN": 6,
        "range": "1 yard",
        "target": "1",
        "duration": "Willpower minutes",
        "description": "<p>You conjure delicate threads of <em>Ulgu</em> in your Target’s mind, causing all prior memory of you to disappear for the spell’s duration. Once the spell is over, the Target must pass an <strong>Average (+20) Intelligence Test</strong>, or the memory loss becomes permanent until dispelled.</p>"
    }, {
        "name": "Mystifying Miasma",
        "lore": "Shadows",
        "wind": "Ulgu",
        "CN": 6,
        "range": "Willpower yard",
        "target": "AoE (Willpower Bonus yards)",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You conjure forth a swirling mass of mist shot through with roiling shadow that flits and confounds the senses. Anyone within the mist who does not possess the <talent>Arcane Magic (Shadows)</talent> Talent is affected by the Miasma, gaining +1 <condition>Blinded</condition>, <condition>Deafened</condition>, and <condition>Fatigued</condition> Condition, which remain for the spell’s duration. Anyone affected attempting to move must pass a <test>Challenging (+0) Perception Test</test>, or gain the <condition>Prone</condition> Condition. If the spell is dispelled once in play, anyone affected by the spell must make a <strong>Routine (+40) Initiative Test</strong>, or gain the <condition>Stunned</condition> Condition. </p>"
    }, {
        "name": "Shadowsteed",
        "lore": "Shadows",
        "wind": "Ulgu",
        "CN": 6,
        "range": "Willpower Bonus yards",
        "target": "1",
        "duration": "Until the next sunrise",
        "description": "<p>You summon forth a shadowy steed. The creature’s unnatural flesh is black as midnight, and at times it appears to be both solid and insubstantial. Use the rules for a riding horse. When the Shadowsteed is out of sunlight, it also gains the following Creature Traits: <trait>Dark Vision</trait>, <trait>Ethereal</trait>, <trait>Magical</trait>, <trait>Painless</trait>, <trait>Stealthy</trait>, <trait>Stride</trait>, <trait>Fear (1)</trait> and <trait>Ward (+9)</trait> .</p><p>Even when insubstantial, Shadowsteeds may be ridden. Riders with the <talent>Arcane Magic (Shadow)</talent> Talent do so with a bonus of +20 to <skill>Ride</skill> Tests. Those without suffer a penalty of –20 to Ride Tests. Shadowsteeds are tireless, so need no rest (though their unsettled riders might!). As the first rays of dawn break over the horizon the steeds melt into insubstantial mist. If still being ridden when the spell ends, or when dispelled, the rider will suffer Falling Damage (see page 166).</p>"
    }, {
        "name": "Shadowstep",
        "lore": "Shadows",
        "wind": "Ulgu",
        "CN": 8,
        "range": "Willpower yards",
        "target": "You",
        "duration": "Instant",
        "description": "<p>You create a shadowy portal of <em>Ulgu</em> through the aethyr. You disappear from your current location and immediately appear up to your Willpower yards away. Any enemies <condition>Engaged</condition> by you on your disappearance or reappearance gain the <condition>Surprised</condition> Condition.</p>"
    }, {
        "name": "Shroud of Invisibility",
        "lore": "Shadows",
        "wind": "Ulgu",
        "CN": 8,
        "range": "Touch",
        "target": "1",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You wrap the target in a shroud of <em>Ulgu</em>. The Target becomes invisible and cannot be perceived by mundane senses. The spell will automatically fool anyone without the <talent>Second Sight</talent> Talent. Those with the Talent must pass a <test>Challenging (+0) Perception Test</test> to notice that someone is nearby, though they will not be able to pin down the precise location. They must dispel the <em>Shroud of Invisibility</em> to do so . You are still perceptible to the other senses, and the spell will come to an end if you bring attention to yourself by making large noises or attacking someone.</p>"
    }, {
        "name": "Aethyric Armour",
        "lore": "Arcane",
        "wind": "",
        "CN": 2,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds&plus;",
        "description": "<p>You gain +1 Armour Point to all Hit Locations as you wrap yourself in a protective swathe of magic.</p>"
    }, {
        "name": "Aethyric Arms",
        "lore": "Arcane",
        "wind": "",
        "CN": 2,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds&plus;",
        "description": "<p>You create a melee weapon with a Damage equal to your Willpower Bonus. This may take any form, and so use any <skill>Melee</skill> Skill you may possess. The weapon counts as <weaponqual>Magical</weaponqual>.</p>"
    }, {
        "name": "Arrow Shield",
        "lore": "Arcane",
        "wind": "",
        "CN": 3,
        "range": "You",
        "target": "AoE (Willpower Bonus yards)",
        "duration": "Willpower Bonus Rounds&plus;",
        "description": "<p>Any missiles containing organic matter, such as arrows with wooden shafts, are automatically destroyed if they pass within the Area of Effect, causing no damage to their target. Missiles comprising only inorganic matter, such as throwing knives or pistol shots, are unaffected.</p>"
    }, {
        "name": "Blast",
        "lore": "Arcane",
        "wind": "",
        "CN": 4,
        "range": "Willpower ards",
        "target": "AoE (Willpower Bonus yards)",
        "duration": "Instant",
        "description": "<p>You channel magic into an explosive blast. This is a <em>magic missile</em> with Damage +3 that targets everyone in the Area of Effect.</p>"
    }, {
        "name": "Bolt",
        "lore": "Arcane",
        "wind": "",
        "CN": 4,
        "range": "Willpower ards",
        "target": "1",
        "duration": "Instant",
        "description": "<p>You channel magic into a damaging bolt. Bolt is a <em>magic missile</em> with a Damage of +4. </p>"
    }, {
        "name": "Breath",
        "lore": "Arcane",
        "wind": "",
        "CN": 6,
        "range": "1 yard",
        "target": "Special",
        "duration": "Instant",
        "description": "<p>You immediately make a Breath attack, as if you had spent 2 Advantage to activate the <trait>Breath</trait> Creature Trait (see page 338). Breath is a <em>magic missile</em> with a Damage equal to your Toughness Bonus. The GM decides which type of Breath attack best suits your <talent>Arcane Magic</talent> Talent. </p>"
    }, {
        "name": "Bridge",
        "lore": "Arcane",
        "wind": "",
        "CN": 4,
        "range": "Willpower yards",
        "target": "AoE (see description)",
        "duration": "Willpower Bonus Rounds&times;",
        "description": "<p>You create a bridge of magical energy, with a maximum length and breadth of your Willpower Bonus in yards. For every +2 SL you may increase length or breadth by your Willpower Bonus in yards.</p>"
    }, {
        "name": "Chain Attack",
        "lore": "Arcane",
        "wind": "",
        "CN": 6,
        "range": "Willpower yards",
        "target": "Special",
        "duration": "Instant",
        "description": "<p>You channel a twisting spur of rupturing magic into your target. This is a <em>magic missile</em> with a Damage of +4. If Chain Attack reduces a target to 0 Wounds, it leaps to another target within the spell’s initial range, and within Willpower Bonus yards of the previous target, inflicting the same Damage again. It may leap a maximum number of times equal to your Willpower Bonus. For every +2 SL achieved, it may chain to an additional target.</p>"
    }, {
        "name": "Corrosive Blood",
        "lore": "Arcane",
        "wind": "",
        "CN": 4,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You infuse yourself with magic, lending your blood a fearsome potency. You gain the <trait>Corrosive Blood</trait> Creature Trait (see page 339).</p>"
    }, {
        "name": "Dark Vision",
        "lore": "Arcane",
        "wind": "",
        "CN": 1,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You boost your <talent>Second Sight</talent> to assist your mundane senses. While the spell is active, gain the <trait>Dark Vision</trait> Creature Trait (see page 339).</p>"
    }, {
        "name": "Distracting",
        "lore": "Arcane",
        "wind": "",
        "CN": 4,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You wreathe yourself in magic, which swirls around you, distracting your foes. While the spell is active, gain the <trait>Distracting</trait> Creature Trait (see page 339). </p>"
    }, {
        "name": "Dome",
        "lore": "Arcane",
        "wind": "",
        "CN": 7,
        "range": "You",
        "target": "AoE (Willpower Bonus yards)",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You create a dome of magical energy overhead, blocking incoming attacks. Anyone within the Area of Effect gains the <trait>Ward (6+)</trait> Creature Trait (see page 343) against magical or ranged attacks originating outside the dome. Those within may attack out of the dome as normal, and the dome does not impede movement. </p>"
    }, {
        "name": "Drop",
        "lore": "Arcane",
        "wind": "",
        "CN": 1,
        "range": "Willpower yards",
        "target": "1",
        "duration": "Instant",
        "description": "<p>You channel magic into an object being held by an opponent. This could be a weapon, a rope, or someone’s hand. Unless a <strong>Challenging (+0) Dexterity Test</strong> is passed, the item is dropped. For every +2 SL you may impose an additional –10 on the Dexterity Test.</p>"
    }, {
        "name": "Entangle",
        "lore": "Arcane",
        "wind": "",
        "CN": 3,
        "range": "Willpower yards",
        "target": "1",
        "duration": "Special",
        "description": "<p>Using magic, you entrap your target, wrapping them in whatever suits your Lore: vines, shadows, their own clothing… Your target gains one <condition>Entangled</condition> Condition with a Strength equal to your Intelligence. For every +2 SL, you may give the target +1 additional <condition>Entangled</condition> Condition. The spell lasts until all <condition>Entangled</condition> Conditions are removed.</p>"
    }, {
        "name": "Fearsome",
        "lore": "Arcane",
        "wind": "",
        "CN": 3,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>Shrouding yourself in magic, you become fearsome and intimidating. Gain <trait>Fear 1</trait>. For every +3 SL, you may increase your Fear value by one.</p>"
    }, {
        "name": "Flight",
        "lore": "Arcane",
        "wind": "",
        "CN": 8,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds&plus;",
        "description": "<p>You can fly, whether by sprouting wings, ascending on a pillar of magical light, or some other method. Gain the <trait>Flight (Agility)</trait> Creature Trait (see page 339).</p>"
    }, {
        "name": "Magic Shield",
        "lore": "Arcane",
        "wind": "",
        "CN": 4,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You encase yourself in bands of protective magic. While the spell is active, add +Willpower Bonus SL to any dispel attempts you make. </p>"
    }, {
        "name": "Move Object",
        "lore": "Arcane",
        "wind": "",
        "CN": 4,
        "range": "Willpower Yards",
        "target": "1",
        "duration": "1 Round",
        "description": "<p>Using magic, you grab hold of an non-sentient object no larger than you, moving it with the sheer force of your will, which is considered to have a Strength equal to your Willpower. You may move the object up to Willpower Bonus yards. If anyone attempts to impede the object’s movement, make an <b>Opposed Willpower/Strength Test</b>. For every +2 SL you may increase the distance the object is moved by Willpower Bonus yards. </p>"
    }, {
        "name": "Mundane Aura",
        "lore": "Arcane",
        "wind": "",
        "CN": 4,
        "range": "You",
        "target": "You",
        "duration": "Willpower minutes",
        "description": "<p>You drain all the Winds of Magic from within your body and your possessions, removing any magical aura. For the duration of the spell you appear mundane to the <talent>Magical Sense</talent> Talent and similar. You effectively have no magical ability and your magical nature cannot be detected by any means. While this spell is in effect, you cannot cast any other spells. Mundane Aura is immediately dispelled if you make a <skill>Channelling</skill> Test. </p>"
    }, {
        "name": "Push",
        "lore": "Arcane",
        "wind": "",
        "CN": 6,
        "range": "You",
        "target": "You",
        "duration": "Instant",
        "description": "<p>All living creatures within Willpower Bonus yards are pushed back your Willpower Bonus in yards and gain the <condition>Prone</condition> Condition. If this brings them into contact with a wall or other large obstacle, they take Damage equal to the distance travelled in yards. For every +2 SL, you may push creatures back another Willpower Bonus in yards.</p>"
    }, {
        "name": "Teleport",
        "lore": "Arcane",
        "wind": "",
        "CN": 5,
        "range": "You",
        "target": "You",
        "duration": "Instant",
        "description": "<p>Using magic, you can teleport up to your Willpower Bonus in yards. This movement allows you to traverse gaps, avoid perils and pitfalls, and ignore obstacles. For every +2 SL you may increase the distance travelled by your Willpower Bonus in yards. </p>"
    }, {
        "name": "Terrifying",
        "lore": "Arcane",
        "wind": "",
        "CN": 7,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You gain the <trait>Terror (1)</trait> Creature Trait (see page 191).</p>"
    }, {
        "name": "Ward",
        "lore": "Arcane",
        "wind": "",
        "CN": 5,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You wrap yourself in protective magic, gaining the <trait>Ward (9+)</trait> Creature Trait (see page 343). </p>"
    }, {
        "name": "Goodwill",
        "lore": "Hedgecraft",
        "wind": "",
        "CN": 0,
        "range": "You",
        "target": "AoE (Fellowship Bonus yards)",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You create an atmosphere conducive to friendliness and good spirits.  All Fellowship Tests within the Area of Effect receive a bonus of +10, and <trait>Animosity</trait> and <trait>Hatred</trait> Psychologies have no effect.</p>"
    }, {
        "name": "Mirkride",
        "lore": "Hedgecraft",
        "wind": "",
        "CN": 0,
        "range": "You",
        "target": "You",
        "duration": "Willpower Bonus minutes",
        "description": "<p>Speaking ancient words of magic, your spirit leaves your body, stepping into the Hedge, the dark space between the material world and the spirit realm. For the duration, your stand apart from the world, able to witness it invisibly, but not affect it in any way. Physical barriers are no impediment to you, and you may walk through non-magical obstacles at will. Your body remains in place, immobile and insensate. </p><p>At the end of the spell you will be pulled suddenly back to your body. If your body is killed while you are walking the Hedge, your spirit will wander aimlessly for eternity. </p>"
    }, {
        "name": "Nepenthe",
        "lore": "Hedgecraft",
        "wind": "",
        "CN": 0,
        "range": "Touch",
        "target": "Special",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You mutter words of power over a premade potion of herbs, magically transforming it into a potent philtre. If drunk while the spell is in effect, the target may choose to completely forget one individual, permanently. </p>"
    }, {
        "name": "Nostrum",
        "lore": "Hedgecraft",
        "wind": "",
        "CN": 0,
        "range": "Touch",
        "target": "Special",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You incant a spell over an already prepared draught, imbuing it with magical power. If drunk while the spell is in effect, the target immediately heals your Willpower Bonus in Wounds and is cured of one disease. For every +2 SL you may cure an extra disease. </p>"
    }, {
        "name": "Part the Branches",
        "lore": "Hedgecraft",
        "wind": "",
        "CN": 0,
        "range": "You",
        "target": "You",
        "duration": "Willpower minutes",
        "description": "<p>Your pupils dilate as you complete your incantation, and you are able to see into the Spirit world. This allows you to perceive invisible creatures, spirits, and Daemons, even those marked as impossible to see.</p>"
    }, {
        "name": "Protective Charm",
        "lore": "Hedgecraft",
        "wind": "",
        "CN": 0,
        "range": "Touch",
        "target": "Special",
        "duration": "Willpower Bonus days",
        "description": "<p>You imbue a protective charm with a spell of protection. Those bearing the charm gain the <talent>Magic Resistance</talent> Talent. If they already have that Talent, the charm does nothing more.</p>"
    }, {
        "name": "Blight",
        "lore": "Witchcraft",
        "wind": "",
        "CN": 14,
        "range": "Willpower Bonus yards",
        "target": "Special",
        "duration": "Special",
        "description": "<p>You may target either a well, a field, or a domestic animal. If you successfully cast the spell, the target suffers from a blight: <ul><li>A blighted well becomes instantly brackish and stagnant</li><li>Any crops currently planted in a blighted field rot overnight</li><li>A blighted animal sickens.  The afflicted beast no longer produces anything (cows produce no milk, hens produce no eggs, coats and hides grow mangy and unusable) and will die in 10-SL days.</li></ul></p>"
    }, {
        "name": "Creeping Menace",
        "lore": "Witchcraft",
        "wind": "",
        "CN": 6,
        "range": "Willpower yards",
        "target": "1",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>You summon a swarm of creeping, slithering creatures to harass your foes. Each target affected is immediately engaged by a swarm of Giant Rats, Giant Spiders, or Snakes. Use the standard profiles for the relevant creature type, adding the Swarm Trait. For your Action you may make a <test>Challenging (+0) Charm Animal Test</test> to direct 1 or more swarms to attack a different target. </p><p>When the spell ends, any remaining swarms disappear into the shadows. </p>"
    }, {
        "name": "Curse of Crippling Pain",
        "lore": "Witchcraft",
        "wind": "",
        "CN": 10,
        "range": "Willpower yards",
        "target": "1",
        "duration": "Willpower Bonus Rounds",
        "description": "<p>Stabbing a crude representation of your target — a doll or puppet — you inflict crippling pain. When successfully cast, choose which hit location to stab: <ul><li><strong>Leg: </strong>Leg becomes useless, as if it was Amputated (see page 180). If running, the target also gains the <condition>Prone</condition> Condition and takes falling Damage.</li><li><strong>Arm: </strong>Arm becomes useless, as if it was Amputated (see page 180). If target was holding anything in that hand, it is automatically dropped. </li><li><strong>Body: </strong>Target doubles up in agony, gaining +1 <condition>Fatigued</condition> Condition, and must pass a <test>Hard (–20) Endurance Test</test> or gain the <condition>Prone</condition> Condition.</li><li><strong>Head: </strong>Target gains the <condition>Stunned</condition> Condition, and must pass an <test>Average (+20) Endurance Test</test> or gain the <condition>Unconscious</condition> Condition for the Duration.</li></ul></p><p>While the spell is in effect, for your Action you may make a Channelling Test, stabbing the doll again, to affect a different location.</p>"
    }, {
        "name": "Curse of Ill-Fortune",
        "lore": "Witchcraft",
        "wind": "",
        "CN": 8,
        "range": "Willpower Bonus miles",
        "target": "1",
        "duration": "Willpower Bonus days",
        "description": "<p>The ingredient for this spell is something belonging to the target, either a personal possession or a strand of hair. For the duration, your target suffers bad luck. Laces snap, chairs break, and other minor narrative effects inconvenience them. The target suffers a penalty of –10 to all Tests, in addition to any other modifiers, and may not spend Fortune points.</p>"
    }, {
        "name": "Haunting Horror",
        "lore": "Witchcraft",
        "wind": "",
        "CN": 8,
        "range": "Touch",
        "target": "AoE (a single location)",
        "duration": "Willpower days",
        "description": "<p>You target a single location, such as a house or clearing, and inflict haunting dreams and waking nightmares on any who enter there. Those entering while the spell is in effect are unnerved by eerie sensations, flitting shadows, and whispered voices lurking on the threshold of hearing. Unless they possess the <talent>Arcane Magic (Witchcraft)</talent> Talent, they gain +1 <condition>Fatigued</condition> Condition. Then, unless they pass an <test>Challenging (+0) Cool Test</test>, they gain another +1 <condition>Fatigued</condition> Condition and the <condition>Broken</condition> Condition, both of which are only removed upon leaving the location.</p>"
    }, {
        "name": "The Evil Eye",
        "lore": "Witchcraft",
        "wind": "",
        "CN": 6,
        "range": "Willpower yards",
        "target": "Special",
        "duration": "Instant",
        "description": "<p>You lock eyes with a single target, who must be looking at you. Perform an <strong>Opposed <skill>Intimidate</skill>/<skill>Cool</skill> Test</strong>, adding any SL from your casting roll to your result. Your opponent gains 1 <condition>Fatigued</condition> Condition per +2 SL by which you win. If you win by 6+ SL, your opponent gains the <condition>Broken</condition> Condition.</p>"
    }
];

var cults = {
    "Manann": {
        "title": "Manann, God of the Sea",
        "SOP": "Marienburg, the Wasteland",
        "HOC": "Matriarch of the Sea",
        "Orders": "Order of the Albatross, Order of the Mariner",
        "Festivals": "Spring Equinox, Autumn Equinox",
        "Books": "The 1000 Shanties, Tales of the Albatross, Liber Manaan",
        "Symbols": "Five-tined Crown, Waves, Anchors",
        "GodDesc": "<p>Volatile Manann, the son of Taal and Rhya, is the capricious King of the Sea, Master of the Maelstroms, and Summoner of Storms. Known for his black moods and erratic temper, folk claim his cult is needed more than any other, for if ever there is a god that must be appeased, it’s Manaan. He’s depicted as an enormous, blackbearded man with seaweed in his hair and a great, five-pointed crown of black iron upon his troubled brow. He’s said to dwell at the bottom of the ocean, the rise and fall of his massive chest forming the waves and tides as the greatest monsters of the deep gather in his court.</p>",
        "Worshippers": "<p>Manann is worshipped along coasts throughout the Old World, wherever people make their living from the sea or live close enough for storms and floods to threaten their homes. Even those who know little of Manann will throw a coin or other small treasure into the water before beginning a sea voyage in the hope of a smooth crossing.</p><p> The cult has a significant number of orders, mostly monastic, tasked to guard isolated, sacred islands. The Order of the Albatross is largest, comprised of priests who maintain temples across the Old World and bless merchant or naval vessels with their presence. Often accompanying them, the Order of the Mariner is the military arm of Manann, the cult’s templar-marines, sworn protectors of Marienburg.</p><p> Manann’s clerics usually wear robes of dark greenish-blue or blue-grey, trimmed with a white wave-pattern.</p>",
        "Sites": "<p>Manann’s temples are found in all coastal towns and cities, and in most river ports where seagoing vessels berth. The high temple is in the great port-city of Marienburg: a huge, lavishly decorated complex open to the tides. The Matriarch of the Sea, head of the Order of the Albatross, is based there, a woman who ostensibly leads the entire cult of Manann, although in practice the sea-god’s clerics are as mercurial as their god, and as likely to be stubborn as to serve. The cult also maintains many monasteries and abbeys on small isolated islands, most dedicated to one of Manann’s many saints.</p> ",
        "Penances": "<p>Penances from Manann often involve hazardous, maritime pilgrimages, tests of sailing skills, or expeditions against the sea-god’s enemies, especially followers of the heretical cult of Stromfels, God of Pirates, Wreckers, and Sharks.</p>",
        "Strictures": "<li>No whistling or swearing when at sea or on holy ground.</li><li>Never harm an albatross.</li><li>First catch to Manann.</li><li>A silver and fish to every Manannite temple and shrine approached.</li><li>Hunt down the servants of Stromfels wherever they may hide.</li>"
    },
    "Morr": {
        "title": "Morr, God of Death",
        "SOP": "Luccini, Tilea",
        "HOC": "Custode del Portale",
        "Orders": "Order of the Shroud, Order of the Black Guard, Order of the Augurs",
        "Festivals": "Hexensnacht, Geheimisnacht",
        "Books": "The Book of Doorways, Libro Dei Morti, Thernodies of the Raven",
        "Symbols": "Portals, Ravens, Black Roses",
        "GodDesc": "<p>Urbane Morr, God of Death and King of the Underworld, is husband to Verena, brother to murderous Khaine, and father of Myrmidia and Shallya. He sends divine ravens to guide dead souls to the Portal, the pillared gateway between the mortal realms and the realm of the gods. He then leads each soul from there to its final resting place: either Morr’s Underworld, or the afterlife of another god. He is commonly portrayed as a tall, dark-haired man of aristocratic bearing, with a brooding, intense air.</p>",
        "Worshippers": "<p>Outside Ostermark, where Morr has special importance, few wish to attract the God of Death’s attention, so normally only the bereaved pray to him. However, those desperate or brave enough may pray for dreams of what the future may bring, though it is said he rarely divulges anything not associated with dying.</p><p>The Order of the Shroud dominates the cult, directly controlling all other orders and the Mourners’ Guild, those responsible for overseeing burials and burial grounds. Supporting them, the Black Guard are the cult’s largest templar order, tasked to guard temples and hunt down the Undead. The Order of Augurs may be small, but it guides the leadership with its foretellings, and organises the Order of Doomsayers: these wandering priests of Morr tour the land performing Doomings for all Human children on their tenth year. Bringing them all together, every decade a grand convocation of the priesthood of Morr is held at Luccini in Tilea, where the future for the cult is discussed around city-wide festivities.</p><p>All Morr’s clerics wear plain, black, hooded robes without adornment or trimming.</p>",
        "Sites": "<p>Temples of Morr are within Gardens of Morr: great graveyards wrapped with black roses that bloom all year, and are rarely used for anything other than funeral services. Most are plain structures of dark stone, distinguished by a broad doorway with a heavy lintel-stone &mdash; representing Morr’s Portal. The doors are always open, like the doors to the Kingdom of Death.  Inside, the temples are bare. Any necessary furniture and other equipment is kept in storage until it is needed for a funeral service. Shrines to Morr also take the form of a gateway, usually consisting of two plain pillars and a lintel. In some cases, one pillar is white marble and the other black basalt.</p>",
        "Penances": "<p>Morr’s penances typically involve hunting Necromancers and destroying Undead, or finding and restoring burial places and holy sites fallen to disuse and disrepair. He also occasionally requires servants of Khaine be stopped from fulfilling their dark deeds.</p>",
        "Strictures": "<li>Respect and protect the dead.</li><li>Hunt down Necromancers and the Undead wherever they may gather.</li><li>Pay heed to your dreams.</li><li>Never refuse to conduct a funeral service.</li><li>At no time be a party to raising the dead, unless allowed by Morr.</li>"
    },
    "Myrmidia": {
        "title": "Myrmidia, Goddess of Strategy",
        "SOP": "Magritta, Estalia",
        "HOC": "La Aguila Ultima",
        "Orders": "Order of the Eagle, Order of the Righteous Spear, Order of the Blazing Sun",
        "Festivals": "None in the Empire",
        "Books": "Bellona Myrmidia, Bellum Strategia, The Book of War",
        "Symbols": "Spear behind a shield, Eagles, Suns",
        "GodDesc": "<p>In the Empire, bronzed Myrmidia, daughter of Verena and Morr, sister of Shallya, is the Goddess of Strategy and Scientific Warfare. However, in the sun-drenched south, Myrmidia is much more than this: she acts as the patron deity of both the Estalian Kingdoms and the Tilean City States, and is fanatically worshipped in both realms. Because of this, her cult is the largest in the Old World, for all it has a limited presence in the Empire. She is commonly portrayed as a tall, muscular, young woman armed and equipped in archaic, southern stylings. She is known for her calm, honourable approach to all matters, and her clerics do what they can to emulate this.</p>",
        "Worshippers": "<p>Myrmidia grants generals the insight to win battles with minimal losses, and soldiers the skill-at-arms to defeat enemies quickly and without significant losses. Because of this, her cult is steadily growing among the armies and garrisons of the Empire, especially in the Reikland, Averland, and Wissenland. In the Empire, the cult has three orders of significance. The Order of the Eagle tends to the temples and their surrounding communities, and is led from Nuln by the ‘Eagle of the North’, the most powerful Myrmidian north of the Vaults. The templar Order of the Righteous Spear has a chapterhouse attached to each of these temples, each commanded by the local high priest. A second templar order, the Order of the Blazing Sun, is the oldest Myrmidian order in the Empire, and works independently of the Order of the Eagle.</p><p>Myrmidia’s clerics in the Empire normally wear blue cowls over white robes with red edging, with her symbol either sewn onto the left breast or worn as a cloak-clasp.</p>",
        "Sites": "<p>Most of Myrmidia’s holy sites are found in Estalia and Tilea, and are associated with the goddess’s campaigns across those realms when she manifested as a mortal over two-thousand years ago. In the Empire, the goddess has much less of a presence, with temples only in major towns and cities, and only a single monastic order cloistered in the Monastery of the Black Maiden in Wissenland. Temples to Myrmidia tend to follow the architectural styles of Tilea and Estalia, with domed roofs covering square or rectangular halls. Their exteriors are often carved with low reliefs showing battle scenes or tableaux of weapons and shields. Shrines may take the form of miniature temples, statues of the goddess, or free-standing sculptures of stacked weapons, shields, and armour. Myrmidia’s holy sites are also known for their scandalous depictions of the goddess and her saints, who are often presented wearing little more than scarves about their waists, which many Sigmarites find completely unacceptable.</p>",
        "Penances": "<p>Penances from Myrmidia are usually military in nature. A cultist may be ordered to defeat an enemy champion in single combat, or to train a group of peasants and lead them in the defence of their village. Protecting pilgrimage routes to sites of importance to Myrmidia are also not uncommon.</p>",
        "Strictures": " <li>Act with honour and dignity in all matters.</li> <li>Respect prisoners of war, and never kill an enemy who surrenders.</li> <li>Show no mercy to the unrepentant enemies of Humanity.</li> <li>Obey all honourable orders.</li> <li>Preserve the weak from the horrors of war.</li>"
    },
    "Ranald": {
        "title": "Ranald, God of Trickery",
        "SOP": "None officially",
        "HOC": "None officially, though rumours persist of a cult leader marked with ten crosses",
        "Orders": "The Crosses, the Brotherhood, the Crooked Fingers",
        "Festivals": "The Day of Folly",
        "Books": "The Riddles Ten, Midnight and the Black Cat, The Great Joke",
        "Symbols": "Crossed fingers, Cats, Magpies",
        "GodDesc": "<p>According to myth, Ranald was once mortal, a gentle bandit who robbed from the rich and gave to the poor. This so charmed Shallya that the goddess fell in love. One fateful day, she found Ranald dying, fatally touched by the plagues of the Fly Lord. Unable to accept this, she let Ranald drink from her holy chalice, granting the rogue eternal life. But it was all a trick &emsp; Ranald had faked it all &emsp; and, laughing, the new god gleefully danced into the heavens. While generally portrayed as a dapper Human wearing a perpetual smile, there is little consistency to the height, weight, skin colour, or even gender of Ranald, though the god is more commonly portrayed as male in the Empire. More a cheerful trickster than outright criminal, Ranald is said to have a love of deflating pride with clever tricks and ruses.</p>",
        "Worshippers": "<p>Ranald most commonly stands as a patron to thieves and rogues, but the cult also attracts gamblers, liars, merchants, tricksters, and the poor and downtrodden.</p><p>The cult of Ranald is, by general perception, a disorganised rabble of charlatans, thieves, and ne’er-do-wells. However, it is more co-ordinated than it appears, and split into three primary orders. The Crosses are the most accepted &emsp; a priesthood overseeing the cult’s gambling-dens, typically using the proceeds to administer to the poor. The Brotherhood is less open, and is somewhat akin to a secret society of merchants &emsp; they use business to bring the pompous and greedy to their knees. Lastly, and most widespread, is the publicly disavowed Crooked Fingers, the thieves, rogues, and liars of Ranald, a group that is roundly distrusted.</p><p>Cultists of Ranald have no conventional garb to identify them, but always work cross symbols into their clothing somewhere, perhaps as a repeating pattern.</p>",
        "Sites": "<p>Ranald has no formal temple organisation, although the cult maintains seemingly unconnected gambling dens in most towns and cities. Small shrines are found in the headquarters of many criminal gangs and merchant houses, and the poorer quarters of many cities have street-corner shrines dedicated to the God of Luck. The latter are often maintained by local ‘shrine clubs’ which operate as both social and religious bodies, and are usually led by one of the Crooked Fingers. Shrines are almost never elaborate, often just a simple, smiling statue with crossed fingers behind the back, or a crudely depicted cat or magpie, often fashioned as if smiling.</p>",
        "Penances": "<p>Ranald’s penances usually involve stealing into locked and guarded locations to recover precious items or leave a token of their presence. Humiliating oppressors of the poor is also common &mdash; perhaps by framing a brutal Watch captain for a ludicrous crime, for example, or locking him in his own cells. Ranald often sends favoured and disfavoured cultists alike on a ‘Pilgrimage of Fingers’, a set of tasks proving capability and loyalty.</p>",
        "Strictures": "<li>One coin in ten belongs to Ranald.</li> <li>Never betray another to the authorities; there is no greater sin than informing.</li> <li>Violence is prohibited except in self-defence.</li> <li>It is better to live free and die than live under oppression.</li> <li>There is no honour among thieves, but there is amongst Ranaldans.</li>"
    },
    "Rhya": {
        "title": "Rhya, Goddess of Fertility",
        "SOP": "None officially",
        "HOC": "None",
        "Orders": "None",
        "Festivals": "Summer Solstice, with equinoxes also celebrated",
        "Books": "<span style=\"font-style: normal !important;'\">None, though many oral traditions exist</span>",
        "Symbols": "Sheaf of wheat, Fruit, Spirals",
        "GodDesc": "<p>Bountiful Rhya is the Goddess of Fertility and Summer, widely known as the Earth Mother and She Who Sustains Life. Though typically depicted as the wife of Taal, myths connect her to many gods, and she has children from many of those relationships. Most commonly portrayed as a tall, beautiful women wreathed in leaves and bedecked in fruit, Rhya’s statues are normally nude, pregnant, and surrounded by her children. Many theologians tie Rhya to the Old Faith, a prehistoric cult comprised of ancient farmers and hunters who wrested a living from the land before the Empire was born, and one still found in secluded communities to this day.</p>",
        "Worshippers": "<p>Rural folk across the Old World venerate Rhya, relying on her to provide the crops upon which their lives depends. Womanfolk comprise the main body of the cult, and most midwives pay at least lip-service to Rhya’s Wisdom, a set of oral traditions surrounding childbirth. Although she is not openly worshipped in the towns and cities &mdash; townsfolk often turning to Shallya in her stead &mdash; her name is frequently tied with Taal’s, so she is still well known amongst such people. </p><p>Because the cult has no great temples and protects no holy books or relics of significance, many scholars believe her worship to be declining, and possibly already dead. Her many cultists do nothing to contradict such talk.</p><p>Rhya’s cultists have no fixed vestment or preferred garb, though greens are very common, as is using plants, flowers, or herbs to accessorise any clothing. They often dress in a fashion considered far too revealing by Sigmarite doctrine, which can cause friction as the Rhyans believe giving in to such prudishness is tantamount to encouraging the Prince of Excess into your lives, as it builds forbidden desires. Devotees of Sigmar invariably disagree, believing abstinence and restricting temptation is a better response to such dangers than indulgence.</p>",
        "Sites": "<p>Rhya has no large temples, though many ancient sites constructed from oghams (standing stones) are centres of worship for her cult, and some still echo each equinox with the cries of fevered celebrants.</p> <p>Shrines to Rhya are usually simple statues of the goddess, often piled high with offerings of food and drink. Older shrines are often made of small standing stones marked with worn, spiralled patterns.</p>",
        "Penances": "<p>Rhyan penances may involve replanting devastated areas, helping broken households, and maintaining sacred groves. It is also common to find Rhyans tasked to protect helpless families, which can often put them at odds with local bailiffs and law enforcement. </p>",
        "Strictures": "<li>Defend families, children, and crops from all harm.</li><li>Never feel shame for the flesh Rhya gave you.</li><li>Life is sacred, do no harm lest another life is in danger.</li><li>Never judge whom another loves.</li><li>Interrupt the work of the Prince of Excess wherever it may thirst.</li>"
    },
    "Shallya": {
        "title": "Shallya, Goddess of Mercy",
        "SOP": "Couronne, Bretonnia",
        "HOC": "Grande Matriarch",
        "Orders": "Order of the Bleeding Heart, Order of the Chalice",
        "Festivals": "None",
        "Books": "The Book of Suffering, Livre des Larmes, The Testament of Pergunda",
        "Symbols": "White doves, Keys, Heart with a drop of blood",
        "GodDesc": "<p>Shallya is the Goddess of Healing, Mercy, and Compassion. She is the daughter of Verena and Morr, and the sister of Myrmidia. Shallya is normally portrayed as a young, beautiful maiden whose eyes are perpetually welling with tears as she weeps for the world’s pain. It is said Shallya’s compassion knows no bounds, and in some myths &mdash; such as the stories of Ranald tricking her into granting him immortality, or Manaan trapping her at the bottom of the sea &mdash; she seems trusting to the point of foolishness. However, her cultists maintain her mercy is available to all, without judgment. True foolishness consists of presuming to judge who is worthy of Shallya’s grace and who is not.</p>",
        "Worshippers": "<p>Most Old Worlders think of Shallya’s cult as composed of healers and physicians, but her worshippers also include many who work to help alleviate suffering of other kinds: charitable souls who help the poor; workers in orphanages, asylums, and refuges; and even brave folk who go in search of lost and missing people on behalf of their loved ones.  The cult is ruled by the far-reaching Order of the Bleeding Heart, which maintains all the temples, hospices, mercyhouses, and other holy sites. The significantly smaller Order of the Chalice tasks its mendicants to cleanse the Fly Lord’s influence, tackling the worst diseases and plagues wherever they may fester.</p><p>Shallya’s cultists all wear white robes, often hooded, with a bleeding heart symbol embroidered on the left breast.</p>",
        "Sites": "<p>The high temple of all Shallya’s cult is in Couronne, Bretonnia, built over a famous healing spring. Locals claim the magical waters were once poured there from the same chalice Shallya used to grant Ranald immortality, which they claim is the holy grail of the Lady, the patron Goddess of Bretonnia. Whatever the truth, it is a popular destination for pilgrims, many of whom travel there to be healed from intractable disease. Elsewhere, every town or city of any size has a temple to Shallya, and most smaller settlements have at least a shrine dedicated to her. Temples of Shallya normally consist of a courtyard with a temple on one side and an infirmary on the other, all constructed in southern styles. Larger temples have smaller subsidiary chapels, commonly endowed by local families, and are often connected to hospitals. Shrines are usually simple, often with the dove or heart of Shallya carved into stone, or with small fountains gushing eternal tears from simple statues.</p>",
        "Penances": "<p>Penances set by Shallya always involve helping the sick, poor, or downtrodden. A cultist might be sent to a village struck by a plague to tend the sick until the disease has passed. Shallya often tasks her servants to help the wounded at war, or patrol popular pilgrimage routes for those unable to complete their journeys due to ill health.</p>",
        "Strictures": "<li>Always render assistance without judgement, based only on a person’s need.</li><li>Never kill except in self-defence or when facing followers of the Fly Lord.</li><li>Hunt down servants of the Fly Lord wherever they may fester.</li><li>Shallya’s work is never done, so turn not to self-indulgence.</li><li>Never take up arms; a walking stick and courage will suffice.</li>"
    },
    "Sigmar": {
        "title": "Sigmar, God of the Empire",
        "SOP": "Altdorf, Reikland",
        "HOC": "The Grand Theogonist",
        "Orders": "Order of the Anvil, Order of the Cleansing Flame, Order of the Silver Hammer, Order of the Torch",
        "Festivals": "Sigmarday (28th Sigmarzeit)",
        "Books": "The Book of Sigmar, Deus Sigmar, The Geistbuch",
        "Symbols": "<em>Ghal-maraz</em> (Sigmar’s Warhammer, ‘Skull-Splitter’), Twin-tailed Comets, Griffons",
        "GodDesc": "<p>Sigmar is the Empire’s patron, and his cult dominates the realm. Because Sigmar was once the emperor, his worship is inextricably interwoven with politics, and three of the cult’s highest-ranking members are directly involved with electing new emperors. According to legend, 2,500 years ago Sigmar’s birth was heralded by a twin-tailed comet, and he was born the first son of the chief of the Unberogen tribe. When older, he received the magical warhammer Ghal-maraz (‘Skull-splitter’) as a gift from the Dwarf king Kurgan Ironbeard for saving his life from Greenskins. Sigmar later allied with the Dwarfs and their combined forces defeated the Greenskins. He was then crowned as the first emperor of the Human tribes he’d united. After fifty years of extraordinary rule, Sigmar mysteriously vanished, only to later ascend to divinity, crowned as a god by Ulric, Sigmar’s patron in life.</p>",
        "Worshippers": "<p>Most folk of the Empire pay at least lip-service to their patron deity. In the most devout provinces, like Reikland, Sigmar worship is an unquestioned part of daily life. Folk attend weekly ‘throngs’ where the lessons of Sigmar are preached. Many also attend temple to train as local militia, confess sins and purify the soul, or receive advice on how to be more like the God-King of old.  Sigmar’s cult is comprised of an uncounted number of different orders. The largest is the Order of the Torch: Sigmar’s priests who lead their local communities. Other orders of importance include: the Order of the Cleansing Flame, comprised of inquisitors and witch hunters; the Order of the Silver Hammer, which includes warrior priests and yet more witch hunters; and the Order of the Anvil, a monastic order concerned with preserving Sigmar’s deeds and laws. The cult also has many templar orders. The most famous are the proud Knights of Sigmar’s Blood, the fanatical Knights of the Fiery Heart, and the militaristic Knights Griffon. Given the cult is so large, there are many different uniforms, vestments, and robes worn, all of which have different colours, cuts, and accessories according to local tradition and requirement.</p>",
        "Sites": "<p>Every city, town, and village in the Empire has at least one temple to Sigmar. The Grand Cathedral in Altdorf is staffed by hundreds of priests and lay workers, and guarded by at least two orders of templars; at the other end of the scale, a village chapel may be visited just once every week by a travelling priest, who serves the needs of several small settlements.  Shrines can be found in most homes, and wayshrines dot every major highway, mostly marked with hammers or comets.</p>",
        "Penances": "<p>Sigmarite cultists may be ordered to destroy a cell of Chaos-worshippers, or expose a corrupt official who is secretly in league with the Ruinous Powers or a foreign power. It is also common to be tasked with building, or rebuilding, local communities to better promote unity and strength in the Empire.</p>",
        "Strictures": "<li>Obey your orders.</li><li>Aid Dwarf-folk, never do them harm.</li><li>Promote the unity of the Empire.</li><li>Bear true allegiance to the imperial throne.</li><li>Root out Greenskins, Chaos worshippers, and foul witches without mercy</li>"
    },
    "Taal": {
        "title": "Taal, God of the Wild",
        "SOP": "Talabheim, Talabecland",
        "HOC": "The Hierarch",
        "Orders": "Order of the Antler, The Longshanks",
        "Festivals": "Spring Equinox, with other equinoxes also celebrated",
        "Books": "The Book of Green, Rites of the Ancient Grove, Tome of Summer’s Path",
        "Symbols": "Antlers, Oaks, Stone axes",
        "GodDesc": "<p>Taal is the God of Wild Places and Animals, and the King of Nature. He is the husband to Rhya, and father to Manaan, and is perceived by Taalites to be the king of the gods, though other cults dispute this. All nature is under his purview, from the snaking rivers to the tallest mountains, from the smallest insect to the greatest beast. He is normally portrayed as a powerfully built, virile man with long, wild hair and great spreading antlers, and is known for his volatile moods and his need to hunt.</p>",
        "Worshippers": "<p>Rural folk across the Old World venerate Taal, and any who make their living in wild places take care not to offend him. Taal is the patron deity of Talabecland in the Empire, where his cult holds significant sway, influencing all levels of society.</p><p>Taal’s cult has a variety of smaller orders dedicated to holy sites and groves throughout the Old World, but two orders drive the cult forwards. The Order of the Antler are the priests of the cult, who are tasked to teach Taal’s ways and protect the wild places from intrusion. </p><p>These Taalites are particularly widespread in Talabecland, and their forest temples are hubs of activity for rural folk. The Longshanks are a mix of warrior-priest and templar who typically wander as individuals, cleansing Taal’s wild places of corruption and ensuring rural communities do nothing to upset Father Taal.</p>",
        "Sites": "<p>Normally, temples to Taal are small, rustic affairs, built of wood and rough stone in a manner unchanged for countless centuries. They are usually sited close to natural features of wonder such as waterfalls, swirling pools, and mountains, and often have small sweat lodges attached. The high temple of Taal in Talabheim is something of an anomaly when compared to this. It appears more a well-maintained, albeit wild, noble garden than a temple, and huge services are held there under the spreading rowan trees weekly. </p>Officially, the Hierarch leads the cult from there, though he spends most of his time in the wild groves of the nearby Taalgrunhaar Forest. Shrines to Taal are barely structures at all. Some old trees are regarded as sacred, and offerings pile up at their bases. Caves, forest groves, and other natural places are also used as shrines, and usually only a local or a devout follower of Taal can find them.<p></p>",
        "Penances": "<p>Taal’s penances usually involve clearing diseased or mutated monsters from wild areas, replanting sacred trees, and maintaining groves important to the cult. A cultist might also be ordered to climb a high mountain and leave a stone on a cairn at the top, or clear an obstruction at the top of a waterfall. Whatever the specific task that must be undertaken, Taal’s penances almost always challenge the cultist to survive in the wild.</p>",
        "Strictures": "<li>Offer a prayer of thanks for every animal taken.</li> <li>Spend a week alone communing with the wilderness every year.</li> <li>Eschew metal armour; clad yourself in the hides of Taal.</li> <li>Rely on your own skill, not the advances of gunpowder or cold technology.</li> <li>Never harm an animal except in self-defence or for food or sacrifice.</li>"
    },
    "Ulric": {
        "title": "Ulric, God of War",
        "SOP": "Middenheim, Middenland",
        "HOC": "Ar-Ulric",
        "Orders": "Order of the Howling Wolf, Order of the Knights of the White Wolf",
        "Festivals": "Campaign Start, Hochwinter, Campaign End",
        "Books": "Liber Lupus, Teutognengeschichte, The Ulric Creed",
        "Symbols": "White Wolves, stylised ‘U’s, claws",
        "GodDesc": "<p>Ulric is the ferocious God of Wolves, Winter, and Warfare. He is the brother of Taal and, according to Ulrican lore, the king of the gods, although other cults dispute this. He is normally portrayed as a massive, heavily bearded barbarian wearing a white wolf-pelt cloak, and bearing a mighty war-axe named Blitzbeil. He’s a distant, harsh, and unforgiving god who expects his cultists to rely on individual strength and prowess. He despises weakness, cowardice, and trickery, and favours the direct approach in all matters.</p>",
        "Worshippers": "<p>Ulric’s cult is strongest in the north of the Empire. The city-state of Middenheim, with its enormous high temple to Ulric, is the heart of his cult, and the god is regarded as the city’s patron. Elsewhere, he is worshipped mainly by warriors and soldiers. Devout Ulricans can usually be spotted by their long hair and beards, for most choose not to cut it, imitating their wild deity. Ulric’s cult is split into just two orders: the priestly Howling Wolves, and the templar White Wolves. The Howling Wolves are not very popular outside Middenland and Nordland, viewed by most folk to be too coarse for this enlightened era. By comparison, the Knights of the White Wolf are enormously popular, easily the largest knightly order in the Empire, and the oldest templar order in the Old World. Ulric’s priests wear black robes with a howling white wolf emblem on the chest. A wolf pelt across the shoulders is also common, as is fur trimmings.</p>",
        "Sites": "<p>Ulric’s high temple is in Middenheim, and the cult’s leader, Ar-Ulric (which means the son of Ulric), has enormous temporal and spiritual sway. At the back of the high temple lies the Flame of Ulric, a huge, ever-burning, argent fire granted by the winter god to guide his people. This miracle is the focus of several pilgrimage routes, and all Ulricans of Middenland are expected to bathe in its cold light at least once in their lives. Smaller temples are found in every city and town of any size, but are grander and more numerous in the north than in the south. Chapels and shrines can be found in barracks and forts throughout the Old World.</p><p>Temples resemble fortified keeps and are normally square. The interior of the main hall is lit by small windows high in the walls, and by an ever-stocked fire in a circular hearth tended by the priesthood. Behind the fire, usually against a rear wall, stands a statue of Ulric enthroned, often flanked by a pair of enormous wolves. Shrines are similar but smaller, with a lamp in place of a fire and small statues just a foot or two tall.</p>",
        "Penances": "<p>Penances set by Ulric are almost always tests of strength, courage, and martial skill. Slaying a powerful monster, or clearing out a nest of Beastmen or outlaws, are typical tasks.</p>",
        "Strictures": "<li>Obey your betters.</li> <li>Defend your honour in all matters, and never refuse a challenge.</li> <li>Stand honest and true; outside an ambush, trickery and deception are forbidden.</li> <li>Only wear pelts from wolves killed by weapons crafted of your own hands.</li> <li>Blackpowder, helmets, crossbows, and technology are not Ulric’s way.</li>"
    },
    "Verena": {
        "title": "Verena, Goddess of Wisdom",
        "SOP": "None",
        "HOC": "None",
        "Orders": "The Order of Scalebearers, the Order of Lorekeepers, the Order of Mysteries, the Order of Everlasting Light",
        "Festivals": "Year Blessing",
        "Books": "Canticum Verena, Eulogium Verena, The Book of Swords",
        "Symbols": "Scales of Justice, Owls, Downward-pointing Swords",
        "GodDesc": "<p>Wise Verena, the Goddess of Learning and Justice, is the wife of dark Morr and the mother of Myrmidia and Shallya. She is generally depicted as a tall, classically beautiful woman, and usually carries a sword and a set of scales. As the patron of justice she is concerned with fairness rather than the letter of the law: she opposes tyranny and oppression as much as crime. </p>",
        "Worshippers": "<p>Verena is worshipped throughout the Old World, especially in the south. Her devout followers include scholars, lawyers, and magistrates, as well as some wizards of the Colleges of Magic, particularly of the Grey and Light orders.</p> <p> The cult of Verena has no rigid hierarchy: it is said that Verena alone heads the cult, and no mortal intermediary is needed because truth is self-evident and requires no interpretation. Temple priests from the Order of Lorekeepers are tasked to preserve knowledge and communicate it to the community. They keep up a voluminous correspondence with each other, exchanging information and news.</p> <p> Priests from the equally influential Order of Scalebearers are much sought after to act as judges, arbitrators, and go-betweens, because of their famed impartiality and mastery of the law. The Order of Mysteries is much smaller and less well-known, and contains warrior-priests who seek lost and forgotten lore, wherever it may lie. The last major order is the Knights of the Everlasting Light, templars famed for their sword skills, sense of fairness, and legendary bad luck. Verena’s cultists usually wear plain white robes, symbolic of pure truth and impartiality.</p>",
        "Sites": "<p>Temples to Verena can be found in most cities and larger towns, generally situated in the administrative or university quarters. Most libraries and court-houses include a shrine to the goddess, and smaller shrines can be found in the homes of many scholars and lawyers. Temples usually have colonnaded facades, with symbols of the goddess and allegorical figures of learning presented in low relief. Inside is a large statue of Verena, normally seated with a book in her lap, a pair of scales in her left hand, and her right hand resting on the hilt of a sword. Smaller rooms lead off from the main temple, including a library and chambers for the attendant priests. Each temple has at least one meeting room where negotiations can take place under the eyes of the goddess.</p> ",
        "Penances": "<p>Penances set by Verena normally involve the recovery or preservation of knowledge, the righting of an injustice, or the resolution of a dispute. Cultists may also be sent to recover a longforgotten book of lore, or to mediate in a difficult quarrel. This could be anything from a farmers’ boundary dispute to unpicking the complicated politics of two realms on the brink of war. </p>",
        "Strictures": "<li>Never refuse to arbitrate a dispute when asked.</li> <li>Always tell the truth without fear or favour.</li> <li>Protect knowledge at all costs.</li> <li>Combat must be a last resort when all alternative routes are fruitless.</li> <li>Never become a tool of injustice or heresy.</li>"
    }
}



var blessByCult = {
    "Manann": ["Battle", "Breath", "Courage", "Hardiness", "Savagery", "Tenacity"],
    "Morr": ["Breath", "Courage", "Fortune", "Righteousness", "Tenacity", "Wisdom"],
    "Myrmidia": ["Battle", "Conscience", "Courage", "Fortune", "Protection", "Righteousness"],
    "Ranald": ["Charisma", "Conscience", "Finesse", "Fortune", "Protection", "Wit"],
    "Rhya": ["Breath", "Conscience", "Grace", "Healing", "Protection", "Recuperation"],
    "Shallya": ["Breath", "Conscience", "Healing", "Protection", "Recuperation", "Tenacity"],
    "Sigmar": ["Battle", "Courage", "Hardiness", "Might", "Protection", "Righteousness"],
    "Taal": ["Battle", "Breath", "Conscience", "Hardiness", "The Hunt", "Savagery"],
    "Ulric": ["Battle", "Courage", "Hardiness", "Might", "Savagery", "Tenacity"],
    "Verena": ["Conscience", "Courage", "Fortune", "Righteousness", "Wisdom", "Wit"],
}

var blessings = ["Battle", "Breath", "Charisma", "Conscience", "Courage", "Finesse", "Fortune", "Grace", "Hardiness", "Healing", "The Hunt", "Might", "Protection", "Recuperation", "Righteousness", "Savagery", "Tenacity", "Wisdom", "Wit"]

var miracle = [
    {
        "name": "",
        "god": "",
        "range": "",
        "target": "",
        "duration": "",
        "desc": ""
    },
    {
        "name": "Battle",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Weapon Skill.</p>"
    },
    {
        "name": "Breath",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target does not need to breathe and ignores rules for suffocation.</p>"
    },
    {
        "name": "Charisma",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Fellowship.</p>"
    },
    {
        "name": "Conscience",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target must pass an <b>Average (+20) Willpower Test</b> to break any of the Strictures of your deity. If they fail, they are overcome with shame and do not take the action.</p>"
    },
    {
        "name": "Courage",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Willpower.</p>"
    },
    {
        "name": "Finesse",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Dexterity.</p>"
    },
    {
        "name": "Fortune",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target's next failed test may be rerolled. The reroll must stand.</p>"
    },
    {
        "name": "Grace",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Agility.</p>"
    },
    {
        "name": "Hardiness",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Toughness.</p>"
    },
    {
        "name": "Healing",
        "range": "6 yards",
        "target": "1",
        "duration": "Instant",
        "desc": "<p>Your target heals +1 Wound.</p>"
    },
    {
        "name": "The Hunt",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Ballistic Skill.</p>"
    },
    {
        "name": "Might",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Strength.</p>"
    },
    {
        "name": "Protection",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Enemies must make an <b>Average (+20) Willpower Test</b> to attack your target as shame wells within for considering violence. If they fail, they must choose a different target, or a different Action.</p>"
    },
    {
        "name": "Recuperation",
        "range": "6 yards",
        "target": "1",
        "duration": "Instant",
        "desc": "<p>Your target may reduce the duration of 1 disease with which they are inflicted by 1 day. This prayer may only be attempted once per instance of a disease per person.</p>"
    },
    {
        "name": "Righteousness",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target's weapon counts as <weaponqual>Magical</weaponqual>.</p>"
    },
    {
        "name": "Savagery",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>When your target next inflicts a Critical Wound, roll twice and choose the best result.</p>"
    },
    {
        "name": "Tenacity",
        "range": "6 yards",
        "target": "1",
        "duration": "Instant",
        "desc": "<p>Your target may remove 1 condition.</p>"
    },
    {
        "name": "Wisdom",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Intelligence.</p>"
    },
    {
        "name": "Wit",
        "range": "6 yards",
        "target": "1",
        "duration": "6 rounds",
        "desc": "<p>Your target gains +10 Initiative.</p>"
    },
    {
        "name": "As Verena Is My Witness",
        "god": "Verena",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>By calling Verena as your witness, the truth of your words shines out for all to see. For the duration of the Miracle, providing you speak only the truth, all listeners will believe you speak truly. This does not necessarily mean they will agree with your conclusions, of course.</p>"
    },
    {
        "name": "Blind Justice",
        "god": "Verena",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>You articulate prayers concerning Verena’s acute perceptions, able pierce through to the truth of all things. You may make a <b>Simple Challenging (+0) Perception Test</b> to see through spells and Miracles of involving illusion or misdirection. You may also make an <b>Average (+20) Intuition Test</b> to tell whether a character speaking to you is lying.</p><p><b>Note:</b> this will only tell you if the character believes they speak the truth, it will not alert you if they are mistaken.</p>"
    },
    {
        "name": "Shackles of Truth",
        "god": "Verena",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>You appeal to Verena, requesting her judgement concerning a suspected criminal. If your target committed a crime and claims they did not, while affected by this miracle they gain an <condition>Entangled</condition> Condition that cannot be removed for the duration. If you have falsely accused the target, Verena is displeased with your lack of wisdom: you gain +1 Sin point and must immediately roll on The Wrath of the Gods table.</p>"
    },
    {
        "name": "Sword of Justice",
        "god": "Verena",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>You pray to Verena to guide your blade to strike down the unjust. If wielding a sword, it ignores APs, and counts as <weaponqual>Magical</weaponqual>. Further, if struck opponents are criminals (as determined by the GM), they must make an <b>Average (+20) Endurance Test</b> or suffer an <em>Unconscious</em> Condition that lasts for at least Fellowship Bonus Rounds. If any crime is perpetrated on the unconscious opponents, you suffer +1 Sin point per crime.</p>"
    },
    {
        "name": "Truth Will Out",
        "god": "Verena",
        "range": "Fellowship Bonus yards",
        "target": "1",
        "duration": "Instant",
        "desc": "<p>You intone prayers of Verena’s ability to find any truth. You may ask the targets a single question. It will be immediately answered truthfully and fully. If desired, targets may attempt to resist, by contesting your SL with an <b>Average (+20) Cool Test</b>. If successful, they may stubbornly refuse to answer. If they achieve +2 SL they may withhold minor information. +4 SL allows them to withhold significant information while +6 SL allows them to lie outright. You will know if they resist successfully, though you will lack specific knowledge about their deceit, or proof of their dishonesty.</p>"
    },
    {
        "name": "Wisdom of the Owl",
        "god": "Verena",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>You call on Verena to instil you with her wisdom and knowledge. You gain a bonus of +20 on all Intelligence Tests while this Miracle is in effect. Further, your pupils dilate widely, and your gaze becomes piercing and unsettling: gain +1 Menacing and <talent>Acute Sense (Sight)</talent> Talent.</p>"
    },
    {
        "name": "Blazing Sun",
        "god": "Myrmidia",
        "range": "You",
        "target": "Area of Effect",
        "duration": "Instant",
        "desc": "You call on Myrmidia to scour the battlefield of dishonourable foes, and a blinding flash of golden light bursts forth. All non- Myrmidians looking in your direction receive 1 <condition>Blinded</condition> Condition. For every +2 SL, they receive +1 <condition>Blinded</condition> Condition."
    },
    {
        "name": "Eagle&apos;s Eye",
        "god": "Myrmidia",
        "range": "Fellowship yards",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You call on Myrmidia to send a Divine Servant to grant you knowledge of your enemies. A spectral Eagle manifests, soaring into the sky above. The eagle looks like and has the capabilities of a normal eagle, but cannot physically affect the world, or be harmed in any way. While the Miracle is in effect, you can see through the eagle’s eyes and control its flight, surveying the battlefield and spying upon your enemies. Your vision is acute, but you do not have access to any of your own sense-enhancing Talents such as <talent>Night Vision</talent>. While looking through the eagle’s eyes, you cannot see through your own eyes, leaving you potentially vulnerable."
    },
    {
        "name": "Fury&apos;s Call",
        "god": "Myrmidia",
        "range": "Fellowship yards",
        "target": "Intelligence Bonus allies",
        "duration": "Fellowship Bonus Rounds",
        "desc": "Your passionate prayers instil your allies with a furious disdain for their foes. All allies affected receive the <em>Hatred</em> Psychology towards any engaging them in combat."
    },
    {
        "name": "Inspiring",
        "god": "Myrmidia",
        "range": "Fellowship yards",
        "target": "Intelligence Bonus allies",
        "duration": "Fellowship Bonus Rounds",
        "desc": "Your rousing prayers inspire discipline and coordination within the ranks. Affected targets gain the +1 <talent>Drilled</talent> Talent."
    },
    {
        "name": "Shield of Myrmidia",
        "god": "Myrmidia",
        "range": "Fellowship yards",
        "target": "Intelligence Bonus allies",
        "duration": "Fellowship Bonus Rounds",
        "desc": "Your stalwart prayers incite Myrmidia to shield your allies in glittering, gossamer strands of light, warding enemy blows. All those affected gain +1 AP on all locations."
    },
    {
        "name": "Spear of Myrmidia",
        "god": "Myrmidia",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "If wielding a spear, it gains the <weaponqual>Impact</weaponqual> Quality, and counts as <weaponqual>Magical</weaponqual>."
    },
    {
        "name": "Becalm",
        "god": "Manann",
        "range": "Initiative Bonus miles",
        "target": "1 sailing vessel within Line of Sight",
        "duration": "1 hour",
        "desc": "You steal the wind from the sails of a ship or boat. It is completely becalmed. Even in stormy weather an area of eerie calm and smooth waters surrounds the vessel while gales, lashing rains and towering crests surge and crash around it. This area of calm extends for Initiative yards from the vessel, and if the ship is propelled by some other method, such as oars, the area of calm travels with it."
    },
    {
        "name": "Drowned Man&apos;s Face",
        "god": "Manann",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You implore Manann to drown your foes. Your targets’ lungs continuously fill with saltwater while the Miracle is active, and their hair floats around their head as if submerged. Your targets gains a <condition>Fatigued</condition> Condition, and are subject to the rules for Drowning and Suffocation (page 181) while the Miracle is in effect. When the Miracle ends, your targets must attempt a <b>Challenging (–20) Endurance Test</b>. If a Failure is scored, also inflict a <condition>Prone</condition> Condition."
    },
    {
        "name": "Fair Winds",
        "god": "Manann",
        "range": "Initiative Bonus miles",
        "target": "1 sailing vessel within Line of Sight",
        "duration": "1 Hour",
        "desc": "The target vessels’ sails fill with favourable winds, speeding them safely towards their destination. While this Miracle is active, the sailing vessel moves at top speed, no matter the prevailing wind, tide, or current, and all Tests made to steer the vessel gain a bonus of +10."
    },
    {
        "name": "Manann&apos;s Bounty",
        "god": "Manann",
        "range": "Touch",
        "target": "1",
        "duration": "Instant",
        "desc": "You implore Manann to provide you with sustenance. Reaching into a body of water you catch enough fish to feed 1 person; if you reach into the sea, you provide enough fish for 2 people. For every +2 SL, you may feed another person."
    },
    {
        "name": "Sea Legs",
        "god": "Manann",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Fellowship Bonus Rounds",
        "desc": "Your targets are immediately drenched in saltwater, and reel as if on the rolling deck of a tempest-tossed vessel. Their hair is whipped by spectral winds, and a torrent of spray lashes their skin. They gain one each of the <condition>Blinded</condition>, <condition>Deafened</condition>, and <condition>Fatigued</condition> Conditions, and must attempt an <b>Average (+20) Agility Test</b> to use their Move. If they fail, they also gain a <condition>Prone</condition> Condition."
    },
    {
        "name": "Waterwalk",
        "god": "Manann",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus minutes",
        "desc": "You call on Manann to allow you to cross a stretch of open water as if it were solid ground. This only works on larger bodies of water that are at least 10 yards wide. Anything smaller is too far removed from Manann’s domain for it to be noticed."
    },
    {
        "name": "Death Mask",
        "god": "Morr",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "Morr works through you, piercing the Portal to make his presence known to your foes. Your visage takes on a cadaverous mien, and you gain <trait>Fear 1</trait>."
    },
    {
        "name": "Destroy Undead",
        "god": "Morr",
        "range": "You",
        "target": "Area of Effect",
        "duration": "Instant",
        "desc": "You call the power of Morr to smite all Undead. A black fire ripples forth from your body in a perfect circle for Fellowship Bonus yards. All potential targets with the <trait>Undead</trait> Creature Trait lose 1d10 Wounds, ignoring Toughness Bonus and AP. Any Undead destroyed by this Miracle can never be raised with Necromancy again under normal conditions. For every +2 SL, you may increase the area of effect by +Fellowship Bonus yards."
    },
    {
        "name": "Dooming",
        "god": "Morr",
        "range": "Touch",
        "target": "1",
        "duration": "Instant",
        "desc": "Gazing deeply into your target’s eyes while muttering a threnody to Morr, you are granted a vision of the target’s Doom, a glimpse of what the future holds. This is almost always related to the target’s death. This Miracle may only be performed on a character once, after which the <talent>Doomed</talent> Talent may be purchased with XP as if it were in the target’s Career."
    },
    {
        "name": "Last Rites",
        "god": "Morr",
        "range": "1 yard",
        "target": "1",
        "duration": "Instant",
        "desc": "You chant a solemn requiem over a corpse. This miracle ensures that the soul is sent through the portal to Morr’s realm, and guarantees the cadaver may not be targeted by any Necromantic spells. If the Miracle targets a foe with the <trait>Undead</trait> and <trait>Construct</trait> Creature Traits, it will be destroyed."
    },
    {
        "name": "Portal&apos;s Threshold",
        "god": "Morr",
        "range": "Touch",
        "target": "Area of Effect",
        "duration": "Special",
        "desc": "You draw a line up to 8 yards long on the ground while incanting a dirge to Morr. Upon enacting the Miracle, an indistinct, shadowy portal seems to manifest to the hoarse croaking of ravens. Creatures with the <trait>Undead</trait> Creature Trait must pass a <b>Challenging (+0) Willpower Test</b> to cross the line. Creatures with both <trait>Undead</trait> and <trait>Construct</trait> simply cannot cross the line. The Miracle remains in effect until dawn."
    },
    {
        "name": "Stay Morr&apos;s Hand",
        "god": "Morr",
        "range": "Touch",
        "target": "1",
        "duration": "Fellowship Bonus Hours (Special)",
        "desc": "You touch the eyes of someone close to death and request Morr guide the soul within, but not take it. The target must have 0 Wounds and be willing. For the duration of the Miracle, the target gains the <condition>Unconscious</condition> Condition and will not deteriorate until the Miracle ends, staving off disease, ignoring critical wounds and poisons, and similar. This miracle comes to an end should appropriate healing be provided, or should you perform the last rites. If you do this, which takes about a minute, the target’s soul will pass through Morr’s portal upon death, and the resulting corpse may never be targeted by Necromancy."
    },
    {
        "name": "An Invitation",
        "god": "Ranald",
        "range": "1 yard",
        "target": "1",
        "duration": "Instant",
        "desc": "You spin one of Ranald’s riddles concerning portals, and whether they exist if closed. A door, window, or hatch you target has one method of securing it undone — a lock unlocks, a latch unlatches, a rope unties. For every +2 SL you may target another method of securing the door, window, or hatch."
    },
    {
        "name": "Cat&apos;s Eyes",
        "god": "Ranald",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Fellowship Bonus Rounds",
        "desc": "Does anything exist that cannot be seen? You riddle with Ranald, who sends a Divine Servant in the form of a cat as an answer. The cat looks like and has the capabilities of a normal cat, but cannot be harmed in any way. While the Miracle is in effect, you perceive everything the cat perceives &mdash; sight, sound, touch &mdash; and control its movement. Your senses are as sharp as a cat’s, but you do not have access to any of your own sense-enhancing Talents such as <talent>Night Vision</talent>. While the Miracle is in effect, you cannot perceive anything through your own senses, leaving you vulnerable."
    },
    {
        "name": "Ranald&apos;s Grace",
        "god": "Ranald",
        "range": "Touch",
        "target": "1",
        "duration": "Agility Bonus Rounds",
        "desc": "You call on Ranald to let your target negotiate the riddles of reality. Your target gains +10 Agility, +10 Stealth, and +1 <talent>Catfall</talent> Talent for the duration of the Miracle."
    },
    {
        "name": "Rich Man, Poor Man, Beggar Man, Thief",
        "god": "Ranald",
        "range": "1 yard",
        "target": "1",
        "duration": "Fellowship Bonus minutes",
        "desc": "You smile at Ranald as you cheekily ask others what, exactly, is wealth? For each target affected, choose one option: <ul> <li>the target’s purse appears empty</li> <li>the target’s purse appears full</li> <li>the target’s attire appears cheap and unremarkable</li> <li>the target’s attire appears rich and finely crafted</li> <li>a single valuable item is impossible to perceive</li> </ul> For every +2 SL you may select an additional effect for one of your targets."
    },
    {
        "name": "Stay Lucky",
        "god": "Ranald",
        "range": "You",
        "target": "You",
        "duration": "Special",
        "desc": "Crossing your fingers, you pose Ranald’s enigma and ask what, exactly, is luck? Gain +1 Fortune point. For every +2 SL you may gain an extra +1 Fortune point, which may take you beyond your normal maximum. You may not invoke this Miracle again until you reach 0 Fortune points."
    },
    {
        "name": "You Ain&apos;t Seen Me, Right?",
        "god": "Ranald",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You spin a complex conundrum concerning the reality of that which is unperceived. Targets affected by this Miracle may pass unnoticed and remarked, providing they do nothing to draw attention to themselves, such as touching, attacking, calling out to someone, casting a spell, or making a loud noise. You may only invoke this Miracle if no-one is looking directly at you."
    },
    {
        "name": "Rhya&apos;s Children",
        "god": "Rhya",
        "range": "You",
        "target": "Area of Effect",
        "duration": "Fellowship Bonus Rounds",
        "desc": "Laying hands on the earth, you chant a prayer to Rhya appealing for her aid in understanding her Realm. This Miracle may only be invoked outdoors, outside settlements. You sense the presence and passing of all sentient creatures within Fellowship yards. Each +2 SL extents the area of effect by +Fellowship yards."
    },
    {
        "name": "Rhya&apos;s Harvest",
        "god": "Rhya",
        "range": "Touch",
        "target": "You",
        "duration": "1 Round",
        "desc": "You chant to Rhya, and life springs forth. Edible fruit, vegetables, and fungi grow at the point where you touch. For each round in which the Miracle is in effect, you cause enough food to feed 1 person to grow. The type of food depends on your location: in a cavern you may grow mushrooms, while outdoors you may cause many different fruits and vegetables to spring forth."
    },
    {
        "name": "Rhya&apos;s Shelter",
        "god": "Rhya",
        "range": "You",
        "target": "You",
        "duration": "Special",
        "desc": "You sing one of Rhya’s hymns concerning shelter and safety. You may only invoke this Miracle outdoors and outside settlements. You discover a perfect natural shelter. Some combination of earth, and trees has formed a perfect location to camp for the night. The spot is protected from all naturally occurring wind and rain, and lasts as long as you remain camped there. The shelter is large enough for 1 person. For every +2 SL it fits another individual. When you break camp, the shelter cannot be rediscovered, as though it only existed through your goddess’s will."
    },
    {
        "name": "Rhya&apos;s Succour",
        "god": "Rhya",
        "range": "Fellowship yards",
        "target": "Fellowship Bonus allies",
        "duration": "Instant",
        "desc": "You chant Rhya’s song of revitalisation. All affected targets have 1 Condition removed. If this removes all suffered Conditions, the targets feel as refreshed as if they had just awoken from a good night’s sleep, and gain a bonus of +10 to any tests on their next Turn."
    },
    {
        "name": "Rhya&apos;s Touch",
        "god": "Rhya",
        "range": "Touch",
        "target": "1",
        "duration": "Special",
        "desc": "You lay hands upon an injured or diseased target as you sing your prayers. Choose one of the following effects: <ul><li>Heal Fellowship Bonus wounds</li> <li>Cure 1 naturally occuring disease</li></ul> For every + 2 SL, you may choose another effect, and may choose the same effect repeatedly. This Miracle is slow, with the effects taking at least 10 minutes to manifest. If interrupted, the Miracle will need to be attempted again."
    },
    {
        "name": "Rhya&apos;s Union",
        "god": "Rhya",
        "range": "Touch",
        "target": "Special",
        "duration": "Fellowship Bonus hours",
        "desc": "You bless and consecrate the union between two souls. While the Miracle is in effect, if biologically possible, the couple will conceive a child."
    },
    {
        "name": "Anchorite&apos;s Endurance",
        "god": "Shallya",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Fellowship Bonus Rounds",
        "desc": "Your earnest prayers appeal to Shallya to grant the target the strength to endure. The target feels no pain, and suffers no penalties caused by Conditions."
    },
    {
        "name": "Balm to a Wounded Mind",
        "god": "Shallya",
        "range": "Touch",
        "target": "1",
        "duration": "Fellowship Bonus minutes",
        "desc": "You call on Shallya to calm the troubled mind of your targets. All Psychology traits are removed for the duration, and afterwards the targets enter deep and restful slumbers that last until next sunrise, assuming they are not disturbed. Unwilling targets may make a <b>Challenging (+0) Cool Test</b> to resist sleeping."
    },
    {
        "name": "Bitter Catharsis",
        "god": "Shallya",
        "range": "Touch",
        "target": "1",
        "duration": "Instant",
        "desc": "In answer to your heartfelt prayers, Shallya draws a poison or disease into you and purges it, completely removing it from your target’s system. For every +2 SL you may purge another disease or poison. For each poison removed or disease cured in this manner, you suffer Wounds equal to 1d10 – your Fellowship Bonus, not modified for Toughness Bonus or Armour Points."
    },
    {
        "name": "Martyr",
        "god": "Shallya",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You intone prayers concerning Shallya’s need to take on the world’s pain. Any Damage taken by your targets are instead suffered by you. If you suffer any Damage because of this Miracle, your Toughness Bonus is doubled for the purposes of calculating the Wounds suffered from that Damage."
    },
    {
        "name": "Shallya&apos;s Tears",
        "god": "Shallya",
        "range": "Touch",
        "target": "1",
        "duration": "Special",
        "desc": "You passionately appeal to Shallya to spare a poor, wounded soul as tears flow freely down your cheeks. You pray for 10 – your Fellowship Bonus Rounds, at which point you heal the target of 1 Critical Wound. For every +2 SL you may heal another Critical Wound. If your prayer is interrupted, the target receives no benefit. This Miracle cannot reattach amputated body parts."
    },
    {
        "name": "Unblemished Innocence",
        "god": "Shallya",
        "range": "Touch",
        "target": "1",
        "duration": "Instant",
        "desc": "Laying hands on the afflicted, you beg Shallya to rid them of recently acquired corruption. The target loses 1 Corruption point, and can lose another per +2 SL scored. However, the Ruinous Powers do not like to be so directly opposed. Should an attempt to invoke the Miracle Fumble, you and the target both gain 1d10 Corruption points on top of any other effects. This Miracle must be enacted within an hour of the target gaining a Corruption point."
    },
    {
        "name": "Beacon of Righteous Virtue",
        "god": "Sigmar",
        "range": "You",
        "target": "Area of Effect",
        "duration": "Fellowship Bonus Rounds",
        "desc": "As you bellow prayers in Sigmar’s name, you become infused with holy fire of righteousness. All allies with Line of Sight to you instantaneously remove all <condition>Broken</condition> Conditions, and gain the <talent>Fearless</talent> Talent while the Miracle is in effect and they remain in your Line of Sight. Any Greenskins with Line of Sight to you are subject to <trait>Fear 1</trait>."
    },
    {
        "name": "Heed Not the Witch",
        "god": "Sigmar",
        "range": "You",
        "target": "Area of Effect",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You call on Sigmar to protect those close to you from the fell influence of Chaos. Any spells that target anyone or anywhere within Fellowship Bonus yards suffer a penalty of –20 to Language (Magick) Tests, in addition to any other penalties. For every +2 SL, you may increase the area of effect by your Fellowship Bonus in yards."
    },
    {
        "name": "Sigmar&apos;s Fiery Hammer",
        "god": "Sigmar",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You chant benedictions of Sigmar’s might. If wielding a warhammer, it counts as <weaponqual>Magical</weaponqual>, deals +Fellowship Bonus Damage, and any target struck receives the <condition>Ablaze</condition> and <condition>Prone</condition> Conditions."
    },
    {
        "name": "Soulfire",
        "god": "Sigmar",
        "range": "You",
        "target": "Area of Effect",
        "duration": "Instant",
        "desc": "You call the power of Sigmar to smite the enemies of the Empire. A holy fire explodes from your body blasting outwards for Fellowship Bonus yards. All targets within range take 1d10 Wounds ignoring Toughness Bonus and APs. Targets with the <trait>Undead</trait> and <trait>Daemon</trait> Creature Traits also gain the <condition>Ablaze</condition> Condition. For every +2 SL, you may increase the area of effect by +Fellowship Bonus yards, or cause an extra +2 Damage to any Greenskins, Undead, or servants of the Ruinous Powers affected."
    },
    {
        "name": "Twin-tailed Comet",
        "god": "Sigmar",
        "range": "Fellowship yards",
        "target": "Area of Effect",
        "duration": "Instant",
        "desc": "You invoke litanies to Sigmar, calling on him to smite his foes. A twin-tailed comet, blazing a trail of fire in its wake, plummets from the heavens to strike a point within Line of Sight and range. Everything within Fellowship Bonus yards of the point of impact suffers 1d10 + SL Damage, ignoring Toughness Bonus and Armour Points, and gains the <condition>Ablaze</condition> condition. The target location must be outdoors, and may only target those Sigmar would deem an enemy."
    },
    {
        "name": "Vanquish the Unrighteous",
        "god": "Sigmar",
        "range": "Fellowship yards",
        "target": "Fellowship Bonus allies",
        "duration": "Fellowship Bonus Rounds",
        "desc": "Your prayers instil your chosen allies with a furious disdain for the enemies of Sigmar. All allies affected receive the Hatred Psychology towards Greenskins, Undead, and any associated with Chaos."
    },
    {
        "name": "Animal Instincts",
        "god": "Taal",
        "range": "Touch",
        "target": "1",
        "duration": "Fellowship Bonus hours",
        "desc": "You intone chants describing Taal’s extraordinary senses, and calling upon him for aid. While the Miracle is in effect, you gain +1 <talent>Acute Sense (choose one)</talent> Talent and, if you rest, you will automatically awaken should any threats come within Initiative yards."
    },
    {
        "name": "King of the Wild",
        "god": "Taal",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You chant a low prayer, and Taal answers with a wild animal appropriate for the surrounding area, which will act according to your wishes for the duration of the Miracle. See <b>The Beasts of the Reikland</b> on page 314 for sample animals that may be summoned."
    },
    {
        "name": "Leaping Stag",
        "god": "Taal",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You chant to Father Taal, and he grants you his favour, imbuing you with speed and agility. You gain +1 Movement and +1 <talent>Strong Legs</talent> Talent. Further, you automatically pass all Athletics Tests to jump with at least +0 SL; should you score lower, increase the SL to 0."
    },
    {
        "name": "Lord of the Hunt",
        "god": "Taal",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Hours",
        "desc": "You call on Taal to guide you in the hunt for your quarry, which must be an animal you have seen, or an individual you know (as limited by the GM). While the Miracle is in effect, you cannot lose your quarry’s trail save by supernatural means. Should your quarry enter a settlement, the trail ends there. You also receive +10 bonus to all Tests regarding your quarry while under the influence of the Miracle."
    },
    {
        "name": "Tooth and Claw",
        "god": "Taal",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You call on Taal to grant you the ferocious might of his kingdom. Gain the <trait>Bite (<mono>Strength Bonus+3</mono>)</trait> and <trait>Weapon (<mono>Strength Bonus+4</mono>)</trait> Creature Traits. These attacks are <weaponqual>Magical</weaponqual>."
    },
    {
        "name": "Tanglefoot",
        "god": "Taal",
        "range": "Fellowship yards",
        "target": "Area of Effect",
        "duration": "Instant",
        "desc": "You call on Taal, chanting prayers to protect his wild places. Roots, vines, and creepers wrap themselves around your foes. All targets within Fellowship Bonus yards of the target point gain an <condition>Entangled</condition> Condition. For every +2 SL you may increase the area of effect by your Fellowship Bonus in yards, or inflict an extra <condition>Entangled</condition> Condition. Tanglefoot has a Strength equal to your Willpower for the purposes of breaking free."
    },
    {
        "name": "Hoarfrost&apos;s Chill",
        "god": "Ulric",
        "range": "You",
        "target": "Area of Effect",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You scream angry prayers, and cold Ulric answers. Your eyes gain a steely blue glint and the air around you grows unnaturally cold. You cause <trait>Fear (<mono>1</mono>)</trait> (see page 190) in all enemies, and all within your Fellowship yards range lose –1 Advantage at the start of each Round, as they are chilled to the bone."
    },
    {
        "name": "Howl of the Wolf",
        "god": "Ulric",
        "range": "Fellowship yards",
        "target": "Special",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You howl for Ulric’s aid, and he sends a minor Divine Servant in the form of a White Wolf. The wolf fights your enemies for the duration of the Miracle, before vanishing to Ulric’s Hunting Grounds with a spectral, blood-chilling howl. The White Wolves have the statistics of a Wolf (see page 317) with the <trait>Frenzy</trait>, <trait>Magical</trait>, and <trait>Size (<mono>Large</mono>)</trait> Creature Traits."
    },
    {
        "name": "Ulric&apos;s Fury",
        "god": "Ulric",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You chant furious prayers, and Ulric’s ferocity spreads. Targets gain the Frenzy psychology."
    },
    {
        "name": "Pelt of the Winter Wolf",
        "god": "Ulric",
        "range": "Touch",
        "target": "1",
        "duration": "Fellowship Bonus hours",
        "desc": "Your bellowed prayers bring Ulric’s attention, allowing your targets to survive the bite of his realm. While targets still feel the pain and discomfort caused by cold and wintry weather, they suffer no mechanical penalties."
    },
    {
        "name": "The Snow King&apos;s Judgement",
        "god": "Ulric",
        "range": "Fellowship yards",
        "target": "1",
        "duration": "Instant",
        "desc": "You call on Ulric to make manifest his disdain for the weak, the cowardly and the deceitful. The target suffers 1d10 wounds ignoring Toughness Bonus and Armour Points. If the GM rules that the target is neither weak, cowardly, or deceitful, you suffer the effects instead."
    },
    {
        "name": "Winter&apos;s Bite",
        "god": "Ulric",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "You roar prayers concerning <em>Blitzbeil</em>, Ulric’s ever-thirsty axe. If wielding an axe, it counts as <weaponqual>Magical</weaponqual>, causes an additional + SL Damage, and any living targets struck must make a <b>Challenging (+0) Endurance Test</b> or gain a <condition>Stunned</condition> Condition. Further, struck targets lose any <condition>Bleeding</condition> Conditions as their blood freezes; similarly, attacks from your axe cannot cause any <condition>Bleeding</condition> Conditions."
    }
]

var talent = [
    {
        "name": "",
        "max": "",
        "test": "",
        "desc": ""
    },
    {
        "name": "Accurate Shot",
        "max": "Ballistic Skill Bonus",
        "test": "",
        "desc": "<p>You are an exceptional shot and know where to shoot an enemy in order to inflict maximum damage. You deal your Accurate Shot level in extra Damage with all ranged weapons.</p>"
    },
    {
        "name": "Acute Sense (Sense)",
        "max": "Initiative Bonus",
        "test": "Perception (Sense)",
        "desc": "<p>One of your primary five senses is highly developed, allowing you to spot what others miss. You may take Perception Tests to detect normally imperceptible details with the associated sense, as dictated by the GM. This could include: seeing an eagle beyond everyone else’s eyeshot, smelling an almost odourless poison, hearing the breath of an unmoving mouse within a wall, feeling a worn away letter in a carving, or tasting that two beers from the same brewer have been drawn from two different barrels.</p>"
    },
    {
        "name": "Aethyric Attunement",
        "max": "Initiative Bonus",
        "test": "Channeling (Any)",
        "desc": "<p>Your experience, talent or training lets you more safely manipulate the Winds of Magic. You do not suffer a Miscast if you roll a double on a successful Channel Test.</p>"
    },
    {
        "name": "Alley Cat",
        "max": "Initiative Bonus",
        "test": "Stealth (Urban)",
        "desc": "<p>You are at home in shadowy backstreets. When using <skill>Stealth (Urban)</skill>, you may reverse the dice of any failed Test if this will score a Success.</p>"
    },
    {
        "name": "Ambidextrous",
        "max": "2",
        "test": "",
        "desc": "<p>You can use your off-hand far better than most folk, either by training or innate talent. You only suffer a penalty of –10 to Tests relying solely on your secondary hand, not –20. If you have this Talent twice, you suffer no penalty at all.</p>"
    },
    {
        "name": "Animal Affinity",
        "max": "Willpower Bonus",
        "test": "Charm Animal",
        "desc": "<p>Wild animals feel comfortable in your presence, and often follow your lead. All creatures with the Bestial Trait not trained to be belligerent will automatically be calm in your presence unless they have a reason not to be, such as pain, an attack, being naturally hyper-aggressive, or having nearby young.</p>"
    },
    {
        "name": "Arcane Magic (Lore)",
        "max": "1",
        "test": "",
        "desc": "<p>You either study one of the 8 Arcane Lores of Magic — Beasts, Death, Fire, Heavens, Metal, Shadow, Light, or Life — or practice a lesser known Lore, such as Hedgecraft or Necromancy. You may now memorise spells from your chosen Lore for the following cost in XP.</p> <p><table class=\"w3-table table-dark w3-striped w3-hoverable w3-bordered\"> <thead> <tr> <th>Number of Spells Currently Known</th> <th>XP Cost for a New Spell</th> </tr> </thead> <tbody> <tr> <td>Up to Intelligence Bonus &times; 1</td> <td>100 XP</td> </tr> <tr> <td>Up to Intelligence Bonus &times; 2</td> <td>200 XP</td> </tr> <tr> <td>Up to Intelligence Bonus &times; 3</td> <td>300 XP</td> </tr> <tr> <td>Up to Intelligence Bonus &times; 4</td> <td>400 XP</td> </tr> <tr> <td colspan=\"2\">And so on...</td> </tr> </tbody> </table></p> <p>So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first spell, and the next 4, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one <em>Arcane Magic (Lore) Talent</em>.</p> <p>Further, you may not learn the <em>Bless</em> or <em>Invoke</em> Talents when you have the <em>Arcane Magic</em> Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so.</p>"
    },
    {
        "name": "Argumentative",
        "max": "Fellowship Bonus",
        "test": "Charm Tests when arguing and debating",
        "desc": "<p>You are used to arguing your points and winning. If you roll a successful Charm Test to debate with an opponent, you can choose to either use your rolled SL, or the number rolled on your units die. So, a successful roll of 24 could be used for +4 SL.</p>"
    },
    {
        "name": "Artistic",
        "max": "Dexterity Bonus",
        "test": "Art (Any)",
        "desc": "<p>You have a natural talent for art, able to produce precise sketches with nothing but time and appropriate media. This ability has several in-game uses, ranging from creating Wanted Posters to sketching accurate journals, and has spot benefits as determined by the GM. Further to this, add Art (Any) to any Career you enter; if it is already in Career, you may instead purchase the Skill for 5 XP fewer per Advance.</p>"
    },
    {
        "name": "Attractive",
        "max": "Fellowship Bonus",
        "test": "Charm Tests to influence those attracted to you",
        "desc": "<p>Whether it’s your piercing eyes, your strong frame, or maybe the way you flash your perfect teeth, you know how to make the best use of what the gods gave you. When you successfully use Charm to influence those attracted to you, you can choose to either use your rolled SL, or the number rolled on your units die. So, a successful roll of 38 could be used for +8 SL.</p>"
    },
    {
        "name": "Battle Rage",
        "max": "Willpower Bonus",
        "test": "Melee Tests when Frenzied",
        "desc": "<p>You are better able to control your Frenzy in combat. You can end your Frenzy with a successful Cool Test at the end of the round.</p>"
    },
    {
        "name": "Beat Blade",
        "max": "Weapon Skill Bonus",
        "test": "Melee for a Beat Blade",
        "desc": "<p>You are trained to make sharp controlled blows to your opponent’s weapon, creating an opening for an attack or simply impeding an incoming attack. For your Action, you can choose to Beat Blade before rolling. Perform a Melee Test; if successful, your opponent loses –1 Advantage, and loses a further –1 per SL you score. This Test is not Opposed. This Talent is of no use if your opponent has no weapon, or has a larger Size than you (see page 341).</p>"
    },
    {
        "name": "Beneath Notice",
        "max": "Fellowship Bonus",
        "test": "Stealth when in plain sight",
        "desc": "<p>The high and mighty pay no attention to your presence, knowing you are well beneath their notice. Assuming you are properly attired and not in an incongruous position, those of a higher Status Tier will normally ignore you unless your presence becomes inappropriate, which can make it very easy to listen into conversations you perhaps shouldn’t. Further, characters with a higher Status Tier than you gain no Advantage for striking or wounding you in combat, as there is nothing to be gained for defeating such a lowly cur.</p>"
    },
    {
        "name": "Berserk Charge",
        "max": "Strength Bonus",
        "test": "Melee on a Round when you Charge",
        "desc": "<p>You hurl yourself at your enemies with reckless abandon, using the force of your charge to add weight to your strikes. When you Charge, you gain +1 Damage to all Melee attacks per level in this Talent.</p>"
    },
    {
        "name": "Blather",
        "max": "Fellowship Bonus",
        "test": "Charm to Blather",
        "desc": "<p>Called ‘opening your mouth and letting your belly rumble’ in Nordland, or simply ‘bullshitting’ in Ostland, blathering involves talking rapidly and incessantly, or talking volubly and at-length, about inconsequential or nonsense matters, and is used to verbally confuse and confound a target. You use your Charm Skill to Blather. Attempt an <b>Opposed Charm/Intelligence Test</b>. Success gives your opponent a <em>Stunned</em> Condition.</p> <p>Further, for each level you have in Blather, your opponent gains another <em>Stunned</em> Condition. Targets <em>Stunned</em> by Blather may do nothing other than stare at you dumbfounded as they try to catch-up with or understand what you are saying. Once the last <em>Stunned</em> Condition comes to an end, the target finally gets a word in, and may not be best pleased with you — after all, you have been talking about nothing or nonsense for some time. Should you stop talking, your opponent immediately loses all <em>Stunned</em> Conditions caused by your Blather. Generally, you can only attempt to Blather at a character once per scene, or perhaps longer as determined by the GM, as the target soon wises up to your antics.</p>"
    },
    {
        "name": "Bless (Divine Lore)",
        "max": "1",
        "test": "",
        "desc": "<p>You are watched over by one of the Gods and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.</p>"
    },
    {
        "name": "Bookish",
        "max": "Intelligence Bonus",
        "test": "Research",
        "desc": "<p>You are as at home in a library as a seaman at sea or a farmer a-farming. When using Research, you may reverse the dice of any failed Test if this will score a success.</p>"
    },
    {
        "name": "Break and Enter",
        "max": "Strength Bonus",
        "test": "Melee when forcing or breaking inanimate objects",
        "desc": "<p>You are an expert at quickly breaking down doors and forcing entry. You may add +1 Damage for each level in this Talent when determining damage against inanimate objects such as windows, chests, doors, and similar.</p>"
    },
    {
        "name": "Briber",
        "max": "Fellowship Bonus",
        "test": "Bribery",
        "desc": "<p>You are an exceedingly skilled briber. The GM should reduce the base cost of any required bribe by 10% per level you have in Briber, to a minimum of 10% of the original amount.</p>"
    },
    {
        "name": "Cardsharp",
        "max": "Intelligence Bonus",
        "test": "Gamble and Sleight of Hand when playing card games",
        "desc": "<p>You are used to playing, and winning, at cards, although your methods <em>may</em> involve a little cheating. When you successfully use Gamble or Sleight of Hand when playing cards, you can choose to either use your rolled SL, or the number rolled on your units die. So, a successful roll of 28 could be used for +8 SL. If you play a real card game to represent what is happening in-game, you may receive an extra number of cards per deal equal to your level in Cardsharp, then discard down to the appropriate hand-size before each round of play.</p>"
    },
    {
        "name": "Careful Strike",
        "max": "Initiative Bonus",
        "test": "",
        "desc": "<p>You are skilled at hitting your enemy exactly where you want to, either at range or in melee. You may modify your Hit Location result by up to +/–10 per time you have this Talent. So, if you had this Talent twice and hit location 34, the Right Arm, you could modify this down to 14, the Left Arm, or up to 54, the Body (see page 159).</p>"
    },
    {
        "name": "Carouser",
        "max": "Toughness Bonus",
        "test": "Charm at Parties, Gossip at Parties, Consume Alcohol",
        "desc": "<p>You are a seasoned drinker and know how to party hard. You may reverse the dice of any failed Consume Alcohol Test if this will score a Success.</p>"
    },
    {
        "name": "Catfall",
        "max": "Agility Bonus",
        "test": "Athletics when falling",
        "desc": "<p>You are nimble and balanced like a cat, and are able to fall much greater distances unharmed than others might. Whenever you fall, you attempt an Athletics Test. If successful, reduce the distance fallen by 1 yard, +1 extra yard per +1 SL scored, for the purposes of calculating Damage.</p>"
    },
    {
        "name": "Cat-tongued",
        "max": "Fellowship Bonus",
        "test": "Charm when lying",
        "desc": "<p>Like Ranald the Trickster God, you blend truth and lies as if there were no difference. When using Charm to lie, listeners do not get to oppose your Charm with their Intuition to detect if there is something fishy in what you say.</p>"
    },
    {
        "name": "Chaos Magic (Lore)",
        "max": "Number of Spells available in chosen Chaos Magic Lore",
        "test": "",
        "desc": "<p>By accident or design you have lost a portion of your soul to one of the Dark Gods, and can now practice the foul magics of Chaos. Your ruinous patron immediately grants you access to a single spell from the chosen Lore (most commonly the Nurgle, Slaanesh, or Tzeentch Lores) and you gain a Corruption point as the spell infiltrates your mind, never to be forgotten.</p> <p>Each time you take this Talent, which always costs 100 XP per time instead of the normal cost, you learn another spell from your chosen Lore and gain a Corruption point. For more about the available spells, see Chapter 8: Magic. Under normal circumstances, you may only ever know one Lore of Chaos Magic.</p>"
    },
    {
        "name": "Combat Aware",
        "max": "Initiative Bonus",
        "test": "Perception during melee",
        "desc": "<p>You are used to scanning the battlefield to make snap decisions informed by the shifting tides of war. You may take a <b>Challenging (+0) Perception Test</b> to ignore Surprise, which is modified by circumstance as normal.</p>"
    },
    {
        "name": "Combat Reflexes",
        "max": "Initiative Bonus",
        "test": "",
        "desc": "<p>You react like a flash of lightning. Add 10 to your Initiative for each level in this Talent when determining Combat Initiative.</p>"
    },
    {
        "name": "Commanding Presence",
        "max": "Fellowship Bonus",
        "test": "Leadership",
        "desc": "<p>Your presence fills others with hushed awe and admiration. Such is your aura of authority, those with a lower Status may not resist your Leadership tests with their Willpower. Of course, enemies are still no more likely to respect or obey you, but the common folk rarely stand against you.</p>"
    },
    {
        "name": "Concoct",
        "max": "Intelligence Bonus",
        "test": "Lore (Apothecary)",
        "desc": "<p>You are skilled at making potions, philtres, and draughts on the go. You may take one free <em>Crafting</em> Endeavour to use Lore (Apothecary) without need of a Workshop. Other <em>Crafting</em> Endeavours use the normal rules.</p>"
    },
    {
        "name": "Contortionist",
        "max": "Agility Bonus",
        "test": "Perform and Agility tests when contorting helps",
        "desc": "<p>You can bend and manipulate your body in a myriad of seemingly unnatural ways. This allows you to squeeze through unlikely gaps and bend your body in crazy ways, giving benefits determined by the GM, possibly with a successful Agility test.</p>"
    },
    {
        "name": "Coolheaded",
        "max": "1",
        "test": "",
        "desc": "<p>You gain a permanent +5 bonus to your starting Willpower Characteristic. This does not count toward your Advances.</p>"
    },
    {
        "name": "Crack the Whip",
        "max": "Dexterity Bonus",
        "test": "Drive or Ride Tests when Fleeing or Running",
        "desc": "<p>You know how to get the most out of your animals. When an animal you control is Fleeing or Running, it gains +1 Movement if you are using a whip.</p>"
    },
    {
        "name": "Craftsman (Trade)",
        "max": "Dexterity Bonus",
        "test": "Trade (any one)",
        "desc": "<p>You have true creative talent. Add the associated Trade Skill to any Career you enter. If the Trade Skill is already in your Career, you may instead purchase the Skill for 5 XP fewer per Advance.</p>"
    },
    {
        "name": "Criminal",
        "max": "None",
        "test": "",
        "desc": "<p>You are an active criminal making money from illegal sources, and you’re not always quiet about it. For the purposes of securing money, either when Earning during play or performing an Income Endeavour, refer to the following table:</p> <p><table class=\"w3-table table-dark w3-striped w3-hoverable w3-bordered\"> <thead> <tr> <th>Career Level</th> <th>Bonus Money per time the Talent is taken</th> </tr> </thead> <tbody> <tr> <td>1</td> <td>+2d10 brass pennies</td> </tr> <tr> <td>2</td> <td>+1d10 silver shillings</td> </tr> <tr> <td>3</td> <td>+2d10 silver shillings</td> </tr> <tr> <td>4</td> <td>+1 gold crown</td> </tr> </tbody> </table></p> <p>Because of your obvious criminal nature, others consider you lower Status than them unless they also have the Criminal Talent, where Status is compared as normal — perhaps you have gang tattoos, look shifty, or are just rough around the edges, it’s your choice. Because of this, local law enforcers are always suspicious of you and suspect your motivations, which only gets worse the more times you have this Talent, with the exact implications determined by the GM. Lawbreakers without the Criminal Talent earn significantly less coin but are not obviously the sort to be breaking the law, so maintain their Status. With GM consent, you may spend XP to remove levels of the Criminal Talent for the same XP it cost to buy.</p>"
    },
    {
        "name": "Deadeye Shot",
        "max": "1",
        "test": "",
        "desc": "<p>You always hit an opponent right between the eyes… or wherever else you intended to hit. Instead of reversing the dice to determine which Hit Location is struck with your ranged weapons, you may pick a location.</p>"
    },
    {
        "name": "Dealmaker",
        "max": "Fellowship Bonus",
        "test": "Haggle",
        "desc": "<p>You are a skilled businessman who knows how to close a deal. When using the Haggle skill, you reduce or increase the price of the products by an extra 10%.</p> <p><b>Note:</b> The GM may put a lower limit on prices here to show a seller refusing to sell below cost.</p>"
    },
    {
        "name": "Detect Artefact",
        "max": "Initiative Bonus",
        "test": "Intuition tests to detect magical artefacts",
        "desc": "<p>You are able to sense when magic lies within an artefact. You may attempt an Intuition Test for any magical artefact touched. If successful, you sense the item is magical; further, each SL also provides a specific special rule the item uses, if it has any. Normally, you may only attempt this Test once per artefact touched.</p>"
    },
    {
        "name": "Diceman",
        "max": "Intelligence Bonus",
        "test": "Gamble and Sleight of Hand when playing dice games",
        "desc": "<p>You are a dicing master, and all claims you cheat are clearly wrong. When you successfully use Gamble or Sleight of Hand when playing with dice, you can choose to either use your rolled SL, or the number rolled on your units die. So, a successful roll of 06 could be used for +6 SL. If you play any real-life dice games to represent in-game dice games, always roll extra dice equal to your Diceman level and choose the best results.</p>"
    },
    {
        "name": "Dirty Fighting",
        "max": "Weapon Skill Bonus",
        "test": "Melee (Brawling)",
        "desc": "<p>You have been taught all the dirty tricks of unarmed combat. You may choose to cause an extra +1 Damage for each level in Dirty Fighting with any successful Melee (Brawling) hit.</p> <p><b>Note:</b> using this Talent will be seen as cheating in any formal bout.</p>"
    },
    {
        "name": "Disarm",
        "max": "Initiative Bonus",
        "test": "Melee Tests concerning this Talent",
        "desc": "<p>You are able to disarm an opponent with a careful flick of the wrist or a well-aimed blow to the hand. For your Action, you may attempt an <b>Opposed Melee/Melee Test</b>. If you win, your opponent loses a held weapon, which flies 1d10 feet in a random direction (with further effects as determined by the GM). If you win by 2 SL, you can determine how far the weapon is flung instead of rolling randomly; if you win by 4 SL, you can also choose the direction the weapon goes in; if you win by 6 SL or more, you can take your opponent’s weapon if you have a free hand, plucking it from the air with a flourish. This Talent is of no use if your opponent has no weapon, or is a larger Size than you (see page 341).</p>"
    },
    {
        "name": "Distract",
        "max": "Agility Bonus",
        "test": "Athletics to Distract",
        "desc": "<p>You are trained in simple movements to distract or startle your opponent, drawing eyes from your true intent. You may use your Move to perform a Distraction. This is resolved by an <b>Opposed Athletics/Cool Test</b>. If you win, your opponent can gain no Advantage until the end of the next Round.</p>"
    },
    {
        "name": "Doomed",
        "max": "1",
        "test": "",
        "desc": "<p>At the age of 10, a Priest of Morr called a Doomsayer took you aside to foretell your death in an incense-laden, coming-of-age ritual called the Dooming. In conjunction with your GM, come up with a suitable Dooming. Should your character die in a fashion that matches your Dooming, your next character gains a bonus of half the total XP your dead character accrued during play.</p>"
    },
    {
        "name": "Drilled",
        "max": "Weapon Skill Bonus",
        "test": "Melee Tests when beside an ally with Drilled",
        "desc": "<p>You have been trained to fight shoulder-to-shoulder with other soldiers. If an enemy causes you to lose Advantage when standing beside an active ally with the Drilled Talent, you may keep 1 lost Advantage for each time you’ve taken the Drilled Talent.</p>"
    },
    {
        "name": "Dual Wielder",
        "max": "Agility Bonus",
        "test": "Melee or Ranged when attacking with two weapons",
        "desc": "<p>When armed with two weapons, you may attack with both for your Action. Roll to hit with the weapon held in your primary hand. If you hit, determine Damage as normal, but remember to keep your dice roll, as you will use it again. If the first strike hits, once it is resolved, the weapon in your secondary hand can then target an available opponent of your choice using the same dice roll for the first strike, but reversed. So, if you rolled 34 to hit with the first weapon, you use 43 to hit with the second. Remember to modify this second roll by your off-hand penalty (–20 unless you have the Ambidextrous Talent). This second attack is Opposed with a new defending roll, and damage for this second strike is calculated as normal. The only exception to this is if you roll a Critical for your first strike. If this happens, use the roll on the Critical Table to also act as the roll for the second attack. So, if you scored a critical to the head and rolled 56 on the Critical table for a Major Eye Wound, your second attack would then strike out with a to-hit value of 56. If you choose to attack with both weapons, all your defensive rolls until the start of your next Turn suffer a penalty of –10. You do not gain an Advantage when you successfully strike or Wound an opponent when Dual Wielding unless both attacks hit.</p>"
    },
    {
        "name": "Embezzle",
        "max": "Intelligence Bonus",
        "test": "Intelligence (Embezzling)",
        "desc": "<p>You are skilled at skimming money from your employers without being detected. Whenever you secure money when Earning (during play or performing an <em>Income</em> Endeavour), you may attempt an <b>Opposed Intelligence Test</b> with your employer (assuming you have one). If you win, you skim 2d10 + SL brass pennies, 1d10 + SL silver shillings, or 1 + SL gold crowns (depending upon the size of the business in question, as determined by the GM) without being detected. If your employer wins by 6+ SL, you gain the money, but your embezzling is detected; what then happens is left to the GM. Any other result means you have failed to embezzle any money.</p>"
    },
    {
        "name": "Enclosed Fighter",
        "max": "Agility Bonus",
        "test": "Dodge in enclosed environments",
        "desc": "<p>You have learned to make the most benefit out of fighting in enclosed spaces. You ignore penalties to Melee caused by confined spaces such as tunnels, the frontline, small fighting pits, and similar, and can use the Dodge Skill, even if it would normally be disallowed due to lack of space.</p>"
    },
    {
        "name": "Etiquette (Social Group)",
        "max": "Fellowship Bonus",
        "test": "Charm and Gossip (Social Group)",
        "desc": "<p>You can blend in socially with the chosen group so long as you are dressed and acting appropriately. Example social groups for this Talent are: Criminals, Cultists, Guilders, Nobles, Scholars, Servants, and Soldiers. If you do not have the Talent, those with it will note your discomfort in the unfamiliar environment. This is primarily a matter for roleplaying, but may confer a bonus to Fellowship Tests at the GM’s discretion.</p>"
    },
    {
        "name": "Fast Hands",
        "max": "Dexterity Bonus",
        "test": "Sleight of Hand, Melee (Brawling) to touch an opponent",
        "desc": "<p>You can move your hands with surprising dexterity. Bystanders get no passive Perception Tests to spot your use of the Sleight of Hand Skill, instead they only get to Oppose your Sleight of Hand Tests if they actively suspect and are looking for your movements. Further, attempts to use Melee (Brawling) to simply touch an opponent gain a bonus of +10 &times; your level in Fast Hands.</p>"
    },
    {
        "name": "Fast Shot",
        "max": "Agility Bonus",
        "test": "Ranged when making a Fast Shot",
        "desc": "<p>If you have a loaded ranged weapon, you can fire it outside the normal Initiative Order before any other combatant reacts in the following Round. You roll to hit using all the normal modifiers. Employing Fast Shot requires both your Action and Move for your upcoming turn, and these will count as having been spent when your next turn arrives. If two or more characters use Fast Shot, the character who has taken this Talent most goes first. If any characters have taken Fast Shot an equal number of times, both shots are fired simultaneously, and should both be handled at the same time.</p>"
    },
    {
        "name": "Fearless (Enemy)",
        "max": "Willpower Bonus",
        "test": "Cool to oppose your Enemy's Intimidate, Fear, and Terror",
        "desc": "<p>You are either brave enough or crazy enough that fear of certain enemies has become a distant memory. With a single <b>Average (+20) Cool Test</b>, you may ignore any Intimidate, Fear, or Terror effects from the specified enemy when encountered. Typical enemies include Beastmen, Greenskins, Outlaws, Vampires, Watchmen, and Witches.</p>"
    },
    {
        "name": "Feint",
        "max": "Weapon Skill Bonus",
        "test": "Melee (Fencing) for Feints",
        "desc": "<p>You have trained how to make false attacks in close combat to fool your opponent. You may now make a Feint for your Action against any opponent using a weapon. This is resolved with an <b>Opposed Melee (Fencing)/Melee Test</b>. If you win, and you attack the same opponent before the end of the next Round, you may add the SL of your Feint to your attack roll.</p>"
    },
    {
        "name": "Field Dressing",
        "max": "Intelligence Bonus",
        "test": "Heal during combat Rounds",
        "desc": "<p>You are used to treating wounds quickly. If you fail a Heal Test when using Bandages, you may reverse the result if this will score a success; however, if you do so, you may not score more than +1 SL as you focus on speed over accuracy.</p>"
    },
    {
        "name": "Fisherman",
        "max": "Initiative Bonus",
        "test": "Any Test involving fishing",
        "desc": "<p>You are a very capable fisherman and know all the best ways to land fish. Assuming a large enough body of water is available, you are automatically assumed to be able to fish enough to feed yourself and a number of others equal to your level in Fisherman, assuming you choose to spend at least an hour or so with a line and bait. You may secure more fish in addition to this using the normal rules for foraging (see page 127).</p>"
    },
    {
        "name": "Flagellant",
        "max": "Toughness Bonus",
        "test": "Any for resisting the Ruinious Powers",
        "desc": "<p>You have dedicated your pain to the service of your God. Each day, you must spend half a bell (half an hour) praying as you maintain a number of Wounds suffered equal to your level in Flagellent. Until you next sleep, if you have the <em>Frenzy</em> Talent you may enter Frenzy immediately without testing.</p> <p>The <em>Frenzy</em> Talent is added to the Talent list of any career you are in. Should you fail to flagellate yourself on any given day, or allow your castigated flesh to be healed, you may not spend any Resilience or Resolve until you flagellate yourself again.</p>"
    },
    {
        "name": "Flee!",
        "max": "Agility Bonus",
        "test": "Athletics when fleeing",
        "desc": "<p>When your life is on the line you are capable of impressive bursts of speed. Your Movement Attribute counts as 1 higher when Fleeing (see page 165).</p>"
    },
    {
        "name": "Fleet Footed",
        "max": "1",
        "test": "",
        "desc": "<p>You gain +1 to your Movement Attribute.</p>"
    },
    {
        "name": "Frenzy",
        "max": "1",
        "test": "",
        "desc": "<p>With a Willpower Test, you can work yourself into a state of frenzy by psyching yourself up, howling, biting your shield, or similar. If you succeed, you become subject to Frenzy .</p> While subject to Frenzy you are immune to all other psychology, and will not flee or retreat for any reason; indeed you must always move at full rate towards the closest enemy you can see in order to attack. Generally, the only Action you may take is a Weapon Skill Test or an Athletics Test to reach an enemy more quickly. Further, you may take a Free Action Melee Test each Round as you are throwing everything you have into your attacks. Lastly, you gain a bonus of +1 Strength Bonus, such is your ferocity. You remain in Frenzy until all enemies in your line of sight are pacified, or you receive the Stunned or Unconscious condition. After your Frenzy is over you immediately receive a Fatigued condition.</p>"
    },
    {
        "name": "Frightening",
        "max": "Strength Bonus",
        "test": "",
        "desc": "<p>Anyone sane thinks twice before approaching you. If you wish, you have a Fear Rating of 1 (see page 190). Add +1 to this number per extra time you have this Talent.</p>"
    },
    {
        "name": "Furious Assault",
        "max": "Agility Bonus",
        "test": "Melee when making extra attacks",
        "desc": "<p>Your blows follow one another in quick succession, raining down on your opponents with the fury of Ulric. Once per Round, if you hit an opponent in close combat, you may immediately spend an Advantage or your Move to make an extra attack (assuming you have your Move remaining).</p>"
    },
    {
        "name": "Gregarious",
        "max": "Fellowship Bonus",
        "test": "Gossip Tests with travellers",
        "desc": "<p>You just like talking to other folk and it seems they like talking to you. You may reverse any failed Gossip Test if this allows the Test to succeed.</p>"
    },
    {
        "name": "Gunner",
        "max": "Dexterity Bonus",
        "test": "",
        "desc": "<p>You can reload blackpowder weapons with practiced ease. Add SL equal to your level in Gunner to any Extended Test to reload a Blackpowder weapon.</p>"
    },
    {
        "name": "Hardy",
        "max": "Toughness Bonus",
        "test": "",
        "desc": "<p>You gain a permanent addition to your Wounds, equal to your Toughness Bonus. If your Toughness Bonus should increase, then the number of Wounds Hardy provides also increases.</p>"
    },
    {
        "name": "Hatred (Group)",
        "max": "Willpower Bonus",
        "test": "Willpower (Resist Group)",
        "desc": "<p>You are consumed with hatred for something in the Old World, as described on page 190. Each time you take this Talent you develop hatred for a new group. Examples you could take include: Beastmen, Greenskins, Monsters, Outlaws, Sigmarites, Undead, Witches.</p>"
    },
    {
        "name": "Holy Hatred",
        "max": "Fellowship Bonus",
        "test": "",
        "desc": "<p>Your prayers drip with the hatred you feel for your blasphemous enemies. You deal +1 Damage with Miracles for each level in this Talent.</p>"
    },
    {
        "name": "Holy Visions",
        "max": "Initiative Bonus",
        "test": "Intuition Tests when on holy ground",
        "desc": "<p>You clearly see the great works of the Gods all around you. You automatically know when you enter Holy Ground, and may take an Intuition Test to receive visions (often obscure, and seen through the paradigm of your cult or individual belief-system) regarding the local area if significant events have occurred there in the past.</p>"
    },
    {
        "name": "Hunter’s Eye",
        "max": "Initiative Bonus",
        "test": "Any Test to trail or capture game",
        "desc": "<p>You are a skilled hunter and know all the best techniques to find game. When travelling through well-stocked lands, you are automatically assumed to be able to hunt down enough game to feed yourself and a number of others equal to your level in Hunter’s Eye, so long as you have time and the correct equipment. You may secure more food in addition to this using the normal rules for foraging (see page 127).</p>"
    },
    {
        "name": "Impassioned Zeal",
        "max": "Fellowship Bonus",
        "test": "Charm when speaking about your cause",
        "desc": "<p>When you talk about your cause, case, or religion, your words fill with passion and fervent zeal. You may double your Fellowship for the purposes of determining the number of people influenced by your Public Speaking (see page 142) when talking about your cause.</p>"
    },
    {
        "name": "Implacable",
        "max": "Toughness Bonus",
        "test": "",
        "desc": "<p>It takes a lot to finish you off. You can ignore the Wound loss from a <em>Bleeding</em> Condition. Each level in this Talent lets you ignore the Wound loss from an extra <em>Bleeding</em> Condition.</p>"
    },
    {
        "name": "In-fighter",
        "max": "Dexterity Bonus",
        "test": "Melee when in-fighting, or to enter in-fighting",
        "desc": "<p>You are skilled at drawing in close to an opponent. You suffer no penalties for fighting against an opponent with a longer weapon than you. Further, if you use the optional rules for In-fighting (see page 297), gain a bonus of +10 to hit your opponent.</p>"
    },
    {
        "name": "Inspiring",
        "max": "Fellowship Bonus",
        "test": "Leadership during war",
        "desc": "<p>Your rousing words and pleas can turn the tide of a battle. Refer to the following table to see how many people you can now influence with your Leadership Skill (see page 126) when at war.</p><p><table class=\"w3-table table-dark w3-striped w3-hoverable w3-bordered\"> <thead> <tr> <th>Talent Taken</th> <th>Number of soldiers influenced</th> </tr> </thead> <tbody> <tr> <td>1</td> <td>As normal &times; 5</td> </tr> <tr> <td>2</td> <td>As normal &times; 10</td> </tr> <tr> <td>3</td> <td>As normal &times; 20</td> </tr> <tr> <td>4</td> <td>As normal &times; 50</td> </tr> <tr> <td>5</td> <td>As normal &times; 100</td> </tr> <tr> <td>6</td> <td>As normal &times; 200</td> </tr> <tr> <td>7</td> <td>As normal &times; 500</td> </tr> <tr> <td>8</td> <td>As normal &times; 1000</td> </tr> <tr> <td>9</td> <td>All who can hear your inspiring voice</td> </tr> </tbody> </table></p><p><div class=\"w3-panel w3-round-large w3-light-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Example</h4> <p>Abbess Birgitte van der Hoogenband’s monastery is under attack by Greenskins, and things are going badly. So, she decides to bolster her soldiers’ spirits with a Leadership Test, granting them +10 to all Psychology Tests. Her Leadership Test scores 3 SL. Given she has a Fellowship Bonus of 6, and she can influence her Fellowship Bonus + SL of her soldiers using Leadership, she bolsters 9 soldiers. However, as she has Inspiring 3, that number is multiplied by 20, meaning 180 of her soldiers take heart from her screamed encouragement to, ‘HOLD THE LINE!’</p></div></p>"
    },
    {
        "name": "Instinctive Diction",
        "max": "Initiative Bonus",
        "test": "Language (Magick) when casting",
        "desc": "<p>You instinctively understand the language of Magick, and are capable of articulating the most complex phrases rapidly without error. You do not suffer a Miscast if you roll a double on a successful Language (Magick) Test. </p>"
    },
    {
        "name": "Invoke (Divine Lore)",
        "max": "1",
        "test": "",
        "desc": "<p>You are blessed by one of the Gods and can empower one of your Cult’s Miracles. Further, you may purchase extra miracles for 100 XP per miracle you currently know. So, if you already know 3 miracles, your next miracle costs 300 XP to purchase. Full rules for learning new miracles are provided in Chapter 7: Religion and Belief. Under normal circumstances, you may not learn more than one Invoke (Divine Lore) Talent. Further, you may not learn the <em>Petty Magic</em> or <em>Arcane Magic</em> Talents when you have the Invoke Talent. You can unlearn this Talent for 100 XP, but will lose all of your miracles if you do so, and will also garner the extreme disfavour of your God, with effects determined by your GM.</p>"
    },
    {
        "name": "Iron Jaw",
        "max": "Toughness Bonus",
        "test": "Endurance tests to resist <em>Stunned</em>",
        "desc": "<p>You are made of sturdy stuff and can weather even the strongest blows. Whenever you gain one or more Stunned Conditions, you may make an immediate <b>Challenging (+0) Endurance Test</b> to not take one of them, with each SL removing an extra Stunned Condition.</p>"
    },
    {
        "name": "Iron Will",
        "max": "Willpower Bonus",
        "test": "Cool Tests to oppose Intimidate",
        "desc": "<p>You have an indomitable will of iron, and will never willingly bow down before another. Use of the Intimidate skill does not cause Fear in you, and will not stop you speaking out against the intimidating party.</p>"
    },
    {
        "name": "Jump Up",
        "max": "1",
        "test": "",
        "desc": "<p>You are hard to keep down. You may perform a <b>Challenging (+0) Athletics Test</b> to immediately regain your feet whenever you gain a Prone Condition. This Athletics Test is often modified by the Strength behind the blow that knocks you down: for every +10 Strength the blow has over your Toughness, you suffer a penalty of –10 to the Athletics Test, and vice versa .</p>"
    },
    {
        "name": "Kingpin",
        "max": "1",
        "test": "",
        "desc": "<p>You have earned an air of respectability despite your nefarious ways. You may ignore the Status loss of the <em>Criminal</em> Talent.</p>"
    },
    {
        "name": "Lightning Reflexes",
        "max": "1",
        "test": "",
        "desc": "<p>You gain a permanent +5 bonus to your starting Agility Characteristic (this does not count towards your Advances).</p>"
    },
    {
        "name": "Linguistics",
        "max": "Intelligence Bonus",
        "test": "Language (All)",
        "desc": "<p>You have a natural affinity for languages. Given a month’s exposure to any Language, you count the associated Language Skill as a Basic Skill with a successful Intelligence Test (which can be attempted once per month). </p><p><b>Note:</b> Linguistics only works for languages used to frequently communicate with others, so does not work with Language (Magick).</p>"
    },
    {
        "name": "Lip Reading",
        "max": "Initiative Bonus",
        "test": "Perception Tests concerning this Talent",
        "desc": "<p>You can tell what people are saying by simply watching their lips; you do not need to hear what they are saying. If you have an unobstructed view of the speaker’s lower face, you can attempt a Perception Test to understand what they are saying.</p>"
    },
    {
        "name": "Luck",
        "max": "Fellowship Bonus",
        "test": "",
        "desc": "<p>They say when you were born, Ranald smiled. Your maximum Fortune Points now equal your current Fate points plus the number of times you’ve taken Luck.</p>"
    },
    {
        "name": "Magical Sense",
        "max": "Initiative Bonus",
        "test": "Intuition Tests to detect Wizards",
        "desc": "<p>You are able to sense the Winds of Magic in others. You may attempt an <b>Average (+20) Intuition Test</b> whenever you encounter a spellcaster. If you pass, you sense the target is a witch. Further, if you score an Astounding Success (+6), can also determine the target’s highest Channelling Specialisation.</p>"
    },
    {
        "name": "Magic Resistance",
        "max": "Toughness Bonus",
        "test": "",
        "desc": "<p>You are resistant to magic. The SL of any spell affecting you is reduced by 2 per point you have in this Talent. The SL of a spell is only modified by the highest Magic Resistance Talent within its target area. Further, you may never learn the <em>Arcane Magic</em>, <em>Bless</em>, <em>Invoke</em>, <em>Petty Magic</em>, or <em>Witch!</em> Talents.</p>"
    },
    {
        "name": "Magnum Opus",
        "max": "None",
        "test": "",
        "desc": "<p>You are an undisputed master in your field, able to create work of such incredible complexity others can but sit back and marvel at your genius. Each time you take this Talent you may create a single, extraordinary work of art with one of your Art or Trade Skills. This work is unrivalled in your field, a unique piece that will always impress, giving bonuses as determined by the GM, most commonly to Fellowship Tests from those who have witnessed your astounding work. Selling the piece will net you at least ten times its normal value, and sometimes significantly more than this.</p>"
    },
    {
        "name": "Marksman",
        "max": "1",
        "test": "",
        "desc": "<p>You gain a permanent +5 bonus to your starting Ballistic Skill (this does not count towards your Advances).</p>"
    },
    {
        "name": "Master of Disguise",
        "max": "Fellowship Bonus",
        "test": "Entertain (Acting) when being someone else",
        "desc": "<p>You are an expert at taking on the appearance and mannerisms of others. With nothing but posture changes, face twisting, and careful use of appropriate clothing, you no longer look like yourself without having to use a Disguise Kit.</p>"
    },
    {
        "name": "Master Orator",
        "max": "Fellowship Bonus",
        "test": "",
        "desc": "<p>You are skilled at firing up crowds. You gain a gain a SL bonus equal to your levels of Master Orator to any Charm Test when Public Speaking before a crowd.</p>"
    },
    {
        "name": "Master Tradesman (Trade)",
        "max": "Dexterity Bonus",
        "test": "Any appropriate Extended Trade Tests",
        "desc": "<p>You are exceptionally skilled at your specified Trade skill. You reduce the required SL of any Extended Test using your Trade Skill by the level of your Master Tradesman Talent.</p>"
    },
    {
        "name": "Menacing",
        "max": "Strength Bonus",
        "test": "Intimidate",
        "desc": "<p>You have an imposing presence. When using the Intimidate Skill, gain a SL bonus equal to your levels of Menacing.</p>"
    },
    {
        "name": "Mimic",
        "max": "Initiative Bonus",
        "test": "Entertain (Acting) Tests where accents are important",
        "desc": "<p>You have a good ear for accents and dialects, and can reproduce them accurately. You may replicate any accent you are exposed to for at least a day with an Initiative Test; this Test may be attempted once per day. Once passed, you may always mimic the accent, and locals will believe you to be one of their own.</p>"
    },
    {
        "name": "Night Vision",
        "max": "Initiative Bonus",
        "test": "Perception tests in low-light conditions",
        "desc": "<p>You can see very well in natural darkness. Assuming you have at least a faint source of light (such as starlight, moonlight, or bioluminescence) you can see clearly for 20 yards per level of Night Vision. Further, you can extend the effective illumination distance of any light sources by 20 yards per level of Night Vision.</p>"
    },
    {
        "name": "Nimble Fingered",
        "max": "1",
        "test": "",
        "desc": "<p>You gain a permanent +5 bonus to your starting Dexterity (this does not count towards your Advances).</p>"
    },
    {
        "name": "Noble Blood",
        "max": "1",
        "test": "Any Test influenced by your Status",
        "desc": "<p>You are either born into the nobility, or otherwise elevated to it by in-game events. Assuming you are dressed appropriately, you are always considered of higher Status than others unless they also have the Noble Blood Talent, where Status is compared as normal.</p>"
    },
    {
        "name": "Nose for Trouble",
        "max": "Initiative Bonus",
        "test": "Any Test to spot Troublemakers",
        "desc": "<p>You are used to getting into, and preferably out of, trouble. You may attempt an Intuition Test to spot those seeking to cause trouble or seeking to cause you harm, even if normally you would not be allowed a Test (because of Talents or a Spell, for example). This Test will likely be Opposed if others are hiding, and the GM may prefer to take this Test on your behalf in secret so you do not know the results should you fail. If any troublemakers you spot start combat, you may ignore any Surprised Condition they would normally inflict.</p>"
    },
    {
        "name": "Numismatics",
        "max": "Initiative Bonus",
        "test": "Evaluate Tests to establish the worth of coins",
        "desc": "<p>You are well versed with the different coinage of the Old World, and are adept at determining their value. You can judge the true value of a coin by experience alone, not even requiring a Test. Further, you can identify forged coins with a Simple Evaluate Test; it is never Opposed by the SL of the Forger.</p>"
    },
    {
        "name": "Old Salt",
        "max": "Agility Bonus",
        "test": "Sail (any Sea-worthy Vessels)",
        "desc": "<p>You are an experienced seaman, and are very used to sea life. You can ignore all negative modifiers to Tests at sea derived from poor weather, rolling ships, and similar. Further, you count as two seamen towards the minimum number of crew to pilot a sea-going vessel.</p>"
    },
    {
        "name": "Orientation",
        "max": "Initiative Bonus",
        "test": "Navigation",
        "desc": "<p>You have an instinctual feel for direction. You automatically know which direction is north with a glimpse at the stars, trees, or whatever other signs you are familiar with.</p>"
    },
    {
        "name": "Panhandle",
        "max": "Fellowship Bonus",
        "test": "Charm (Begging)",
        "desc": "<p>You are a skilled beggar, able to get even the most jaded individual to contribute to your cause. You can perform a Charm Test every half hour when Begging, not every hour (see page 120).</p>"
    },
    {
        "name": "Perfect Pitch",
        "max": "Initiative Bonus",
        "test": "Entertain (Sing), Language (Tonal Languages, such as Elthárin, Cathayan, and Magick)",
        "desc": "<p>You have perfect pitch, able to replicate notes perfectly and identify them without even making a Test. Further, add Entertain (Sing) to any Career you enter; if it is already in your Career, you may instead purchase the Skill for 5 XP fewer per Advance.</p>"
    },
    {
        "name": "Petty Magic",
        "max": "1",
        "test": "",
        "desc": "<p>You have the spark to cast magic within you and have mastered techniques to control it at a basic level. When you take this Talent, you manifest, and permanently memorise, a number of spells equal to your Willpower Bonus. You can learn extra Petty spells for the following cost in XP.</p> <p><table class=\"w3-table table-dark w3-striped w3-hoverable w3-bordered\"> <thead> <tr> <th>Number of Petty Spells Currently Known</th> <th>XP Cost for a New Spell</th> </tr> </thead> <tbody> <tr> <td>Up to Willpower Bonus &times; 1</td> <td>50 XP</td> </tr> <tr> <td>Up to Willpower Bonus &times; 2</td> <td>100 XP</td> </tr> <tr> <td>Up to Willpower Bonus &times; 3</td> <td>150 XP</td> </tr> <tr> <td>Up to Willpower Bonus &times; 4</td> <td>200 XP</td> </tr> <tr> <td colspan=\"2\">And so on...</td> </tr> </tbody> </table></p> <p>So, if your Willpower Bonus is 3 and you had 3 Petty spells, it will cost you 50XP for the first learned spell, then 100 XP for the next three, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. </p>"
    },
    {
        "name": "Pharmacist",
        "max": "Intelligence Bonus",
        "test": "Trade (Apothecary)",
        "desc": "<p>You are highly skilled at pharmacy, better able than most to make pills, ointments, unguents, oils, creams, and more. You may reverse any failed Trade (Apothecary) test if this allows the Test to succeed.</p>"
    },
    {
        "name": "Pilot",
        "max": "Initiative Bonus",
        "test": "Row or Sail Tests while navigating unsure waters",
        "desc": "<p>You are skilled at leading vessels through dangerous waters. If you fail a Test to pass through dangerous waters, you may reverse the result if it will score a success; however, if you do so, you may not score more than +1 SL as you catch the incoming danger at the last moment.</p>"
    },
    {
        "name": "Public Speaker",
        "max": "Fellowship Bonus",
        "test": "",
        "desc": "<p>You are a skilled orator and know how to work large groups of people. Refer to the following table to see how many people you can now influence with your Charm Skill (see page 120) when Public Speaking.</p> <p><table class=\"w3-table table-dark w3-striped w3-hoverable w3-bordered\"><thead><tr><th>Talent Taken</th><th>Number influenced</th></tr></thead><tbody><tr><td>1</td><td>As normal &times; 5</td></tr><tr><td>2</td><td>As normal &times; 10</td></tr><tr><td>3</td><td>As normal &times; 20</td></tr><tr><td>4</td><td>As normal &times; 50</td></tr><tr><td>5</td><td>As normal &times; 100</td></tr><tr><td>6</td><td>As normal &times; 200</td></tr><tr><td>7</td><td>As normal &times; 500</td></tr><tr><td>8</td><td>As normal &times; 1000</td></tr><tr><td>9</td><td>All who can hear your golden voice</td></tr></tbody></table></p>"
    },
    {
        "name": "Pure Soul",
        "max": "Willpower Bonus",
        "test": "",
        "desc": "<p>Your soul is pure, quite resistant to the depredations of Chaos. You may gain extra Corruption points equal to your level of Pure Soul before having to Test to see if you become corrupt.</p>"
    },
    {
        "name": "Rapid Reload",
        "max": "Dexterity Bonus",
        "test": "",
        "desc": "<p>You can reload ranged weapons with practiced ease. You add SL equal to your level in Rapid Reload to any Test to reload a ranged weapon.</p>"
    },
    {
        "name": "Reaction Strike",
        "max": "Initiative Bonus",
        "test": "Initiative Tests concerning this Talent",
        "desc": "<p>Your fast reactions have allowed you to fell many opponents before they have even swung their blades. When you are Charged, you may attempt a <b>Challenging (+0) Initiative Test</b> to gain an immediate Free Attack outside the normal turn sequence. This attack is resolved with whatever weapon you are carrying in your primary hand. You may make as many Reaction Strikes in a Round as you have levels in this Talent, but can only attack each individual charger once each.</p>"
    },
    {
        "name": "Read/Write",
        "max": "1",
        "test": "",
        "desc": "<p>You are one of the rare literate individuals in the Old World. You are assumed to be able to read and write (if appropriate) all of the Languages you can speak.</p>"
    },
    {
        "name": "Relentless",
        "max": "Agility Bonus",
        "test": "",
        "desc": "<p>When you have your mind set on a target, there is nothing anyone can do to stop you reaching them. If you use Advantage when Disengaging, you may keep a number of Advantage equal to your level of Relentless. Further, you may use Advantage to Disengage even if you have lower Advantage than your opponents.</p>"
    },
    {
        "name": "Resistance (Threat)",
        "max": "Toughness Bonus",
        "test": "All those to resist the associated Threat",
        "desc": "<p>Your strong constitution allows you to more readily survive a specific threat. You may automatically pass the first Test to resist the specified threat, such as Magic, Poison, Disease, Mutation, every session. If SL is important, use your Toughness Bonus as SL for the Test.</p>"
    },
    {
        "name": "Resolute",
        "max": "Strength Bonus",
        "test": "",
        "desc": "<p>You launch into attacks with grim determination. Add your level of Resolute to your Strength Bonus when you Charge.</p>"
    },
    {
        "name": "Reversal",
        "max": "Weapon Skill Bonus",
        "test": "Melee when defending",
        "desc": "<p>You are used to desperate combats, able to turn even the direst circumstances to your Advantage. If you win an <b>Opposed Melee Test</b>, instead of gaining +1 Advantage, you may take all your opponent’s Current Advantage. If you do this, you do not cause any Damage, even if it is your Turn in the Round.</p>"
    },
    {
        "name": "Riposte",
        "max": "Agility Bonus",
        "test": "Melee when defending",
        "desc": "<p>Conforming to ‘the best defence is offence’, you respond to an incoming attack with a lightning-fast counterstrike of your own. If your weapon has the Fast quality, you may cause Damage when you are attacked, just as if it was your Action. You can Riposte a number of attacks per round equal to your Riposte level.</p>"
    },
    {
        "name": "River Guide",
        "max": "Initiative Bonus",
        "test": "Any Lore Test concerning river matters",
        "desc": "<p>You know all the tricks for navigating dangerous rivers. You don’t need to Test for passing through dangerous stretches of water until the Difficulty for doing so is –10 or lower — you automatically pass all Tests easier than this. Further, if you have the appropriate Lore (Local) Skill, you need never Test for navigating dangerous waters — you are assumed to know the route through.</p>"
    },
    {
        "name": "Robust",
        "max": "Toughness Bonus",
        "test": "",
        "desc": "<p>You are as tough as old boots and just soak up damage. You reduce all incoming Damage by an extra +1 per time you have taken the Robust Talent, even if the Damage cannot normally be reduced, but still suffer a minimum of 1 Wound from any Damage source.</p>"
    },
    {
        "name": "Roughrider",
        "max": "Agility Bonus",
        "test": "Ride (Horse) when in combat",
        "desc": "<p>You are at home in the saddle in even the most difficult of circumstances, and know how to get the best out of your mount during conflict. Assuming you have the Ride skill, you can direct your mount to take an Action, not just a Move, without a Ride test.</p>"
    },
    {
        "name": "Rover",
        "max": "Agility Bonus",
        "test": "Stealth Tests in a Rural environment",
        "desc": "<p>You are at home roaming the wild places. When using Stealth in a rural environment, bystanders do not get passive Perception Tests to detect you; they can only spot you if they are specifically on look-out, or watching for hidden spies.</p>"
    },
    {
        "name": "Savant (Lore)",
        "max": "Intelligence Bonus",
        "test": "Lore (chosen Lore)",
        "desc": "<p>You are exceptionally learned, and have a significant degree of specialised knowledge in a single field of study. You automatically know a number of pieces of correct information equal to your Savant (Lore) level about a relevant issue without having to test your Lore Skill. Testing, as always, will provide yet more information as normal as determined by the GM.</p>"
    },
    {
        "name": "Savvy",
        "max": "1",
        "test": "",
        "desc": "<p>You gain a permanent +5 bonus to your starting Intelligence Characteristic (this does not count towards your Advances).</p>"
    },
    {
        "name": "Scale Sheer Surface",
        "max": "Strength Bonus",
        "test": "Climb",
        "desc": "<p>You are an exceptional climber. You can attempt to climb even seemingly impossible surfaces such as sheer fortifications, ice shelves, plastered walls, and similar, and you ignore any penalties to Climb Tests derived from the difficulty of the surface climbed.</p>"
    },
    {
        "name": "Schemer",
        "max": "Intelligence Bonus",
        "test": "Intelligence Tests concerning this Talent",
        "desc": "<p>You are a master of politics and see conspiracy around every corner. Once per session, you may ask the GM one question regarding a political situation or entangled web of social connections; the GM will perform a secret Intelligence Test and provide you some observations regarding the situation based upon your SL.</p>"
    },
    {
        "name": "Sea Legs",
        "max": "Toughness Bonus",
        "test": "All those taken to resist Sea Sickness",
        "desc": "<p>You are used to the rolling motion of the oceans, and are very unlikely to get sea sick, even in the worst storms. Under normal conditions at sea, you need never Test to see if you become Sea Sick. At other times (such as a storm, or a magically induced bout of Sea Sickness), you can ignore any penalties to Tests to avoid Sea Sickness.</p>"
    },
    {
        "name": "Seasoned Traveller",
        "max": "Intelligence Bonus",
        "test": "Any Lore Test concerning local detail",
        "desc": "<p>You are an inquisitive soul who has travelled far and wide, learning all manner of local information. Add Lore (Local) to any Career you enter; if it is already in Career, you may purchase the Skill, both times &mdash; a different Speciality each time, such as Altdorf, Vorbergland, or Ubersreik &mdash; for 5 XP fewer per Advance.</p>"
    },
    {
        "name": "Second Sight",
        "max": "Initiative Bonus",
        "test": "Any Test to detect the Winds of Magic",
        "desc": "<p>You can perceive the shifting Winds of Magic that course from the Chaos Gates at the poles of the world. You now have the Sight (see page 233).</p>"
    },
    {
        "name": "Secret Identity",
        "max": "Intelligence Bonus",
        "test": "Entertain (Acting) Tests to support your secret identities",
        "desc": "<p>You maintain a secret identity that allows you to appear richer, or perhaps poorer, than you actually are. With GM permission, choose any one Career. As long as you are dressed appropriately, you may use the Social Status of the chosen Career you masquerade as rather than your own for modifying Fellowship Tests, and can even ignore the Criminal Talent. However, maintaining this identity will require Entertain (Acting) rolls when you encounter those who may recognise your falsehood. You may create a new Secret Identity for each level you have in this Talent.</p>"
    },
    {
        "name": "Shadow",
        "max": "Agility Bonus",
        "test": "Any Test involving Shadowing",
        "desc": "<p>You are skilled at following people without being spotted. You may use the Shadowing rules on page 130 without doing a Combined Test. Instead you test against just your Perception or your Stealth Skill, whichever is higher.</p>"
    },
    {
        "name": "Sharp",
        "max": "1",
        "test": "",
        "desc": "<p>You gain a permanent +5 bonus to your starting Initiative Characteristic (this does not count towards your Advances).</p>"
    },
    {
        "name": "Sharpshooter",
        "max": "1",
        "test": "",
        "desc": "<p>You can make aimed shots of exceptional accuracy. You ignore any negative Difficulty modifiers to Ranged Tests due to the size of your target.</p>"
    },
    {
        "name": "Shieldsman",
        "max": "Strength Bonus",
        "test": "Any Test to defend with a shield",
        "desc": "<p>You are skilled at using your shield to manoeuvre others in combat so you can take advantage of a desperate situation. When using a Shield to defend, you gain Advantage equal to the number of levels you have in Shieldsman if you lose the Opposed Test.</p>"
    },
    {
        "name": "Sixth Sense",
        "max": "Initiative Bonus",
        "test": "Intuition Tests involving your Sixth Sense",
        "desc": "<p>You get a strange feeling when you are threatened, and can react accordingly. The GM may warn you if you are walking into danger; this will normally come after a secret Intuition Test on your behalf. Further, you may ignore Surprise if you pass an Intuition Test.</p>"
    },
    {
        "name": "Slayer",
        "max": "1",
        "test": "",
        "desc": "<p>When determining Damage use your opponent’s Toughness Bonus as your Strength Bonus if it is higher; always determine this before any other rules modify your Strength or Strength Bonus. Further, if your target is larger than you, and your score a Critical (see page 159), multiply all melee Damage you cause by the number of steps larger your target is (so, 2 steps = &times;2, 3 steps = &times;3, and so on); this multiplication is calculated after all modifiers are applied. See page 341 for more about Size .</p>"
    },
    {
        "name": "Small",
        "max": "1",
        "test": "",
        "desc": "<p>You are much shorter than most folk in the Old World. The full rules for different Sizes are found in Chapter 12: Bestiary on page 341.</p>"
    },
    {
        "name": "Sniper",
        "max": "4",
        "test": "Ranged (Long-Extreme Range)",
        "desc": "<p>Distance is of no import to your shooting skills, and you are just as adept at picking off far away targets as those nearby. You suffer no penalties for shooting at Long range, and half the penalties for Extreme range.</p>"
    },
    {
        "name": "Speedreader",
        "max": "Intelligence Bonus",
        "test": "Research and Language Tests where speed of reading is important",
        "desc": "<p>You read books at a voracious pace. You may reverse a failed Research Test if this will grant success. If the speed at which you read is important during combat, a successful Language Test lets you read and fully comprehend a number of pages per Round equal to your SL plus Speedreader level (minimum of 1, even if you fail the Test).</p>"
    },
    {
        "name": "Sprinter",
        "max": "Strength Bonus",
        "test": "Athletics Tests concerning Running",
        "desc": "<p>You are a swift runner. Your Movement Attribute counts as 1 higher when Running.</p>"
    },
    {
        "name": "Step Aside",
        "max": "Agility Bonus",
        "test": "Dodge Tests to activate this Talent",
        "desc": "<p>You are skilled at being where enemy weapons are not. If you use Dodge to defend against an incoming attack and win the Opposed Test, you may move up to 2 yards as you dive away, and no longer count as Engaged. None of your opponents will gain a Free Attack when you do this.</p>"
    },
    {
        "name": "Stone Soup",
        "max": "Toughness Bonus",
        "test": "Endurance Tests to resist hunger",
        "desc": "<p>You are used to getting by with less, and know how to survive lean times. You can subsist on half the amount of food required without any negative penalties (bar feeling really hungry), and need only test for Starvation every 3 days, not 2 (see page 181).</p>"
    },
    {
        "name": "Stout-hearted",
        "max": "Willpower Bonus",
        "test": "Cool Tests to remove <em>Broken</em> Conditions",
        "desc": "<p>No matter how bad things get, you always seem to come back for more. You may attempt a Cool Test to remove a Broken Condition at the end of each of your Turns as well as at the end of the Round (see page 168 for more on this).</p>"
    },
    {
        "name": "Strider (Terrain)",
        "max": "Agility Bonus",
        "test": "Athletics Tests to traverse the Terrain",
        "desc": "<p>You are experienced in traversing difficult ground. You ignore all movement penalties when crossing over or through a specified terrain. Typical specialities include: Coastal, Deserts, Marshes, Rocky, Tundra, Woodlands.</p>"
    },
    {
        "name": "Strike Mighty Blow",
        "max": "Strength Bonus",
        "test": "",
        "desc": "<p>You know how to hit <em>hard!</em> You deal your level of Strike Mighty Blow in extra Damage with melee weapons.</p>"
    },
    {
        "name": "Strike to Injure",
        "max": "Initiative Bonus",
        "test": "",
        "desc": "<p>You are an expert at striking your enemies most vulnerable areas. You inflict your level of Strike to Injure in additional Wounds when you cause a Critical Wound.</p>"
    },
    {
        "name": "Strike to Stun",
        "max": "Weapon Skill Bonus",
        "test": "Melee Tests when Striking to Stun",
        "desc": "<p>You know where to hit an opponent to bring him down fast. You ignore the ‘Called Shot’ penalty to strike the Head Hit Location when using a melee weapon with the <em>Pummel</em> Quality (see page 298). Further, you count all improvised weapons as having the <em>Pummel</em> Quality.</p>"
    },
    {
        "name": "Strong Back",
        "max": "Strength Bonus",
        "test": "Row and Swim",
        "desc": "<p>You have a strong back that is used to hard work. You may add your levels in Strong Back to your SL in any Opposed Strength Tests, and can carry additional Encumbrance points of trappings (see page 293) equal to your level of Strong Back.</p>"
    },
    {
        "name": "Strong Legs",
        "max": "Strength Bonus",
        "test": "",
        "desc": "<p>You have strong legs able to carry you great distances when you jump. Add your Strong Legs level to your SL in any Athletics Tests involving Leaping (see page 166).</p>"
    },
    {
        "name": "Strong-minded",
        "max": "Willpower Bonus",
        "test": "",
        "desc": "<p>You are the epitome of determination and resolve. Add your level in Strong Minded to your maximum Resolve pool.</p>"
    },
    {
        "name": "Strong Swimmer",
        "max": "Strength Bonus",
        "test": "Swim",
        "desc": "<p>You are an especially strong swimmer and used to holding your breath for a long time underwater. Gain a bonus of your level in Strong Swimmer to your Toughness Bonus for the purposes of holding your breath.</p>"
    },
    {
        "name": "Sturdy",
        "max": "Strength Bonus",
        "test": "Strength Tests when lifting",
        "desc": "<p>You have a brawny physique, or are very used to carrying things. Increase the number of Encumbrance Points you can carry by your Sturdy level &times; 2.</p>"
    },
    {
        "name": "Suave",
        "max": "1",
        "test": "",
        "desc": "<p>You gain a permanent +5 bonus to your starting Fellowship Characteristic (this does not count towards your Advances).</p>"
    },
    {
        "name": "Super Numerate",
        "max": "Intelligence Bonus",
        "test": "Evaluate, Gamble",
        "desc": "<p>You have a gift for calculation and can work out the solution to most mathematical problems with ease. You may use a simple calculator to represent what your PC is capable of mentally computing.</p>"
    },
    {
        "name": "Supportive",
        "max": "Fellowship Bonus",
        "test": "Social Tests to influence a superior",
        "desc": "<p>You know what to say and when to make the most impact upon your superiors. When you successfully use a social Skill to influence those with a higher Status tier, you can choose to either use your rolled SL, or the number rolled on your units die. So, a successful roll of 46 could be used for +6 SL.</p>"
    },
    {
        "name": "Sure Shot",
        "max": "Initiative Bonus",
        "test": "",
        "desc": "<p>You know how to find the weak spots in a target’s armour. When you hit a target with a Ranged weapon, you may ignore Armour Points equal to your Sure Shot level.</p>"
    },
    {
        "name": "Surgery",
        "max": "Intelligence Bonus",
        "test": "Heal Tests outside combat Rounds; i.e. when you have time to do it \'properly\'",
        "desc": "<p>You are a surgeon, able to open and close the flesh in order to heal others. You can treat any Critical Wound marked as needing Surgery. You can also perform surgery to resolve internal issues with an <b>Extended Challenging (+0) Heal Test</b> with a target SL determined by the GM (usually 5–10) depending upon the difficulty of the procedure at hand. This will cause 1d10 Wounds and 1 Bleeding Condition per Test, meaning surgery has a high chance of killing a patient if the surgeon is not careful. After surgery, the patient must pass an <b>Average (+20) Endurance Test</b> or gain a Minor Infection (see page 187).</p>"
    },
    {
        "name": "Tenacious",
        "max": "Toughness Bonus",
        "test": "Endurance Tests for enduring hardships",
        "desc": "<p>You never give up, no matter how impossible your travails appear. You can double the length of time successful Endurance Tests allow you to endure a hardship. This includes enduring prolonged riding, exposure, rituals, and similar adversities.</p>"
    },
    {
        "name": "Tinker",
        "max": "Dexterity Bonus",
        "test": "Trade tests to repair broken items",
        "desc": "<p>You are somewhat of a Johann-of-all-trades, able to repair almost anything. You count all non-magical Trade Skills as Basic when repairing broken items.</p>"
    },
    {
        "name": "Tower of Memories",
        "max": "Intelligence Bonus",
        "test": "",
        "desc": "<p>A recollection technique first instigated by the Cult of Verena, reputedly from Elven practices taught by the Loremasters of Hoeth, Tower of Memories allows you to perfectly recall a sequence of facts by storing them in an imaginary spire. You can recall a sequence as long as your Intelligence without having to make a Test. For every 10 more items you attempt to memorise, you must make an increasingly difficult Intelligence Test to recall the list correctly, starting at <b>Very Easy (+60)</b> for +10, <b>Easy (+40)</b> for +20, <b>Average (+20)</b> for +30, and so on. Beyond its obvious utility for Gamble Tests, where having this Talent adds a bonus of +20 to +60 depending upon how useful recalling sequences is to the game at hand, the GM can apply bonuses to other Tests as appropriate. Each time you take this Talent you may recall an extra sequence without having to forget a previously stored one.</p>"
    },
    {
        "name": "Trapper",
        "max": "Initiative Bonus",
        "test": "Perception Tests to spot traps, Set Trap",
        "desc": "<p>You are skilled at spotting and using traps. You may take a Perception Test to spot traps automatically without having to tell the GM of your intention; the GM may prefer to make some of these Tests on your behalf in private.</p>"
    },
    {
        "name": "Trick Riding",
        "max": "Agility Bonus",
        "test": "Dodge Tests on Horseback, Ride (Horse)",
        "desc": "<p>You are capable of amazing feats of agility on horseback. You can use any of your Performer Skills and unmodified Dodge skill when on horseback. Further, when mounted, you can make your Move at the start of the Round instead of on your Turn.</p>"
    },
    {
        "name": "Tunnel Rat",
        "max": "Agility Bonus",
        "test": "Stealth Tests when underground",
        "desc": "<p>You are at home in tunnels, sewers, and other underground environments. When using Stealth in an underground environment, bystanders do not get passive Perception Tests to detect you; they can only spot you if they are specifically on look-out, or watching for hidden others.</p>"
    },
    {
        "name": "Unshakable",
        "max": "Willpower Bonus",
        "test": "Cool Tests to resist Blackpowder panic",
        "desc": "<p>You are a jaded veteran who has survived more than one hail of shots from Blackpowder weapons. You need only take a Cool Test to resist a <em>Broken</em> Condition if you are successfully wounded by a Blackpowder weapon, not just if you are shot at.</p>"
    },
    {
        "name": "Very Resilient",
        "max": "1",
        "test": "",
        "desc": "<p>You gain a permanent +5 bonus to your starting Toughness Characteristic (this does not count towards your Advances).</p>"
    },
    {
        "name": "Very Strong",
        "max": "1",
        "test": "",
        "desc": "<p>You gain a permanent +5 bonus to your starting Strength Characteristic (this does not count towards your Advances).</p>"
    },
    {
        "name": "War Leader",
        "max": "Fellowship Bonus",
        "test": "Leadership Tests during War",
        "desc": "<p>Your stern gaze and inspiring words motivate your soldiers to fight on to the end. All subordinates able to see you may add your level in War Leader to their SL in one Willpower Test per Round. This bonus does not stack.</p>"
    },
    {
        "name": "War Wizard",
        "max": "1",
        "test": "",
        "desc": "<p>You are trained to cast magic while in the thick of combat. On your Turn, you may cast one Spell with a Casting Number of 5 or less for free without using your Action. However, if you do this, you may not cast another spell this Turn.</p>"
    },
    {
        "name": "Warrior Born",
        "max": "1",
        "test": "",
        "desc": "<p>You gain a permanent +5 bonus to your starting Weapon Skill Characteristic (doesn’t count as Advances).</p>"
    },
    {
        "name": "Waterman",
        "max": "Agility Bonus",
        "test": "Sail Tests for river-going vessels",
        "desc": "<p>You are an experienced freshwater sailor and are well-versed with river vessels. You can ignore all negatives to your Tests when onboard a barge derived from rolling waters, swaying vessels, unsure footing, and similar. Further, you count as two boatmen towards the minimum number of crew to pilot a river vessel.</p>"
    },
    {
        "name": "Wealthy",
        "max": "None",
        "test": "",
        "desc": "<p>You are fabulously wealthy, and are rarely ever short of coin. When Earning (including <em>Income</em> Endeavours) you secure +1 GC per time you have this Talent.</p>"
    },
    {
        "name": "Well-prepared",
        "max": "Initiative Bonus",
        "test": "",
        "desc": "<p>You are used to anticipating the needs of others, and yourself. A number of times per session equal to your level of Well-Prepared, you may pull the trapping required for the current situation from your backpack (or similar) as long as it is Encumbrance 0, could feasibly been bought recently, and doesn’t stretch credibility too far. This could be anything from a flask of spirits to fortify a wounded comrade to a pfennig-whistle needed by a passing entertainer. Whenever you do this, you must deduct the cost for the prepared item from your purse, representing the coin you spent earlier.</p>"
    },
    {
        "name": "Witch!",
        "max": "Willpower Bonus",
        "test": "",
        "desc": "<p>You have learned magic through trial and error. Add <em>Language (Magick)</em> to any Career you enter; if it is already in your Career, you may purchase the Skill for 5 XP fewer per Advance. Further, you may spend 1 Resilience point to immediately cast any spell as if it were one of your Arcane Lore spells; you also instantly memorise that spell as one of your Arcane Lore spells for 0 XP. You can do this a number of times equal to your level in this Talent.</p>"
    }
]


var skill = [
    {
        "name": "",
        "tier": "",
        "char": "",
        "spec": "",
        "desc": ""
    },
    {
        "name": "Animal Care",
        "tier": "Advanced",
        "char": "Int",
        "spec": "",
        "desc": "<p>The Animal Care Skill lets you tend and care for animals, and heal them should they fall sick or become wounded.</p> <p>Having a single Advance in Animal Care means you can keep animals healthy without needing to Test. You can also enact an Animal Care Test to identify and resolve problems with animals, such as: <ul><li>Spotting an illness.</li> <li>Understanding reasons for fractiousness or discomfort.</li> <li>Determining the quality of the animal.</li> <li>Heal Intelligence Bonus + SL Wounds (Note: an animal can only benefit from one healing roll after each encounter).</li> <li>Staunching a <em>Bleeding</em> condition.</li> <li>Preparing the animal for display.</li></ul></p> <p>In combat, you may appraise an enemy animal with an Animal Care Test. If successful, you and all you inform gain +10 to hit when attacking that animal &mdash; or anyone using it as a mount &mdash; until the end of your next turn, as you point out loose tack, a limp from a niggling wound, or highlight some other weakness or vulnerability. Animal Care may only provide a maximum of +10 to hit per animal, no matter how many Tests are made to spot weaknesses.</p>"
    },
    {
        "name": "Animal Training",
        "tier": "Advanced",
        "char": "Int",
        "spec": "Demigryph, Dog, Horse, Pegasus, Pigeon",
        "desc": "<p>Animal Training represents your understanding of a particular type of animal, and your ability to train them. A successful use of the Skill allows you to identify the Trained abilities possessed by an animal belonging to your Specialisation (see page 118). The Animal Training Skill also allows you to undertake the Animal Training Endeavour between adventures (see page 196).</p> <p>In combat, a successful <b>Opposed Animal Training/Willpower Test</b> allows you to intimidate a single animal belonging to your Specialisation; you cause Fear in the animal targeted until the end of your next turn (see page 190). When causing Fear in this way, you may subsequently use your Animal Training Skill instead of Melee when defending against your target; with your GM’s approval you may also use Animal Training to attack your target, issuing specific commands.</p>"
    },
    {
        "name": "Art",
        "tier": "Basic",
        "char": "Dex",
        "spec": "Cartography, Engraving, Mosaics, Painting, Sculpture, Tattoo, Weaving",
        "desc": "<p>Create works of art in your chosen medium.</p> <p>Not having access to appropriate Trade Tools will incur a penalty to your Test. The SL achieved determines the quality of the final piece. For complicated or large works of art, an Extended Test may be required. The Art Skill has little use in combat, but marble busts make marvellous improvised weapons.</p>"
    },
    {
        "name": "Athletics",
        "tier": "Basic",
        "char": "Agi",
        "spec": "",
        "desc": "<p>Your ability to run, jump and move with speed or grace, and to perform any general physical activity. Refer to Moving (see page 164) for details on using Athletics in combat movement.</p>"
    },
    {
        "name": "Bribery",
        "tier": "Basic",
        "char": "Fel",
        "spec": "",
        "desc": "<p>Your ability to judge how likely a person is to accept a bribe, and how best to offer the bribe so they will accept it.</p> <p>A successful <b>Bribery Test</b> tells you if a target may be bribed. If so, your GM will secretly determine the price of their cooperation using the target’s Earnings (see page 52), increasing the amount according to their usual honesty and the risk involved in taking the bribe. You then guess that target amount and the GM will tell you if the price is higher, lower, or equal. Each SL from your initial Bribery Test gives you another guess. At the end of this process, you determine how much money to offer, based on what you have gleaned.</p>"
    },
    {
        "name": "Channeling",
        "tier": "Advanced",
        "char": "WP",
        "spec": "<em>Aqshy, Azyr, Chamon, Dhar, Ghur, Ghyran, Hysh, Shyish, Ulgu</em>",
        "desc": "<p>The Channelling Skill measures your ability to call upon and control the various Winds of Magic, and is solely used by the magic rules. Channelling is a special skill in that it is both Grouped, allowing for Specialisations, and also ungrouped, for those not properly trained to channel magic. See Chapter 8: Magic for details concerning this.</p>"
    },
    {
        "name": "Charm",
        "tier": "Basic",
        "char": "Fel",
        "spec": "",
        "desc": "<p>Charm makes people think favourably of you, your opinions, and proposed actions. Passing an <b>Opposed Charm/Cool Test</b> allows you to influence the behaviour of one or more targets, up to a maximum number equal to your Fellowship Bonus + SL, affecting those with the lowest Willpower first. If a target is amenable to your Charm, the Test will be uncontested.</p> <p>Your GM may permit you to use Charm in Combat if they think your foes might be susceptible to you pleading for your life or making persuasive arguments to stop the violence (although good luck charming a Goblin)!</p> <p>If you use Charm as your Action, calculate the number of targets affected as normal. If you use it to defend, you only affect your attacker. If you succeed, any affected targets will not attack you this round and you gain +1 Advantage as normal. You may do this in successive rounds until you choose to stop or fail a Charm Test, after which your words carry no more weight.</p><p><div class=\"w3-panel w3-round-large w3-light-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Public Speaking</h4> <p>The Charm Skill can be used to make impressive speeches to sway multiple targets to your way of thinking. Assuming they can hear you and are inclined to listen, you can influence up to your Fellowship Bonus + SL targets with a single Charm Test, influencing targets with the lowest Willpower first. If the crowd is unruly, or not receptive to your words, the Test is Opposed by the crowd’s average Willpower (typically 35). A failure shows the crowd is unconvinced.</p> <p>The <em>Public Speaking</em> and <em>Master Orator</em> Talents can significantly increase the number of people you affect with public speaking. An Astounding Failure (-6) (see page 152) in a Charm Test means your crowd quickly becomes an angry mob, with you as the target of their ire…</p> </div></p><p><div class=\"w3-panel w3-round-large w3-light-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Begging</h4> <p>The Charm Skill can be used to beg on the streets. A successful Test will scrounge Fellowship Bonus &times; SL brass pennies per hour from passers-by, with the Difficulty modified by the pitch chosen for begging, and how much sympathy your appearance can elicit. If you score no SL, but still pass the Skill Test, you only manage to scrounge a single pfennig. An Astounding Failure (-6) means you may have attracted problems from the local Watchmen, found some trouble with other, local beggars, or suffer some other significant set-back.</p> <p><b>Note: </b>characters who are caught begging by their peers or associates will likely lose Status unless they are already in the Beggar, or in some other destitute, career.</p> </div></p>"
    },
    {
        "name": "Charm Animal",
        "tier": "Basic",
        "char": "WP",
        "spec": "",
        "desc": "<p>Your aptitude for befriending, quickly calming, or subjugating animals.</p> <p>Passing a Charm Animal Test allows you to influence the behaviour of one or more animals, to a maximum of Willpower Bonus + SL. If the target animals are naturally docile, this Test may be uncontested, but it will generally be Opposed by the target’s Willpower.</p> <p>In combat, you may use Charm Animal when facing animals. If you succeed, any affected targets will not attack you this Round and you gain +1 Advantage. You may do this in successive rounds until you choose to stop or fail a Charm Test, after which the creature’s instincts take over and you have no further influence.</p>"
    },
    {
        "name": "Climb",
        "tier": "Basic",
        "char": "S",
        "spec": "",
        "desc": "<p>The ability to ascend steep or vertical surfaces.</p> <p>If time isn’t an issue, and a climb is relatively easy, anyone with Climb Skill is automatically assumed to be able to climb any reasonably small height.</p> <p>For any other climbing, refer to page 165, which also handles Climbing during combat. You may even find yourself climbing large opponents, though whether that is prudent is debatable.</p>"
    },
    {
        "name": "Consume Alcohol",
        "tier": "Basic",
        "char": "T",
        "spec": "",
        "desc": "<p>Your ability to handle alcohol without letting it cloud your judgment or render you senseless.</p> <p>After each alcoholic drink make a Consume Alcohol Test, modified by the strength of the drink. For each Test you fail, you suffer a –10 penalty to WS, BS, Ag, Dex, and Int, to a maximum of –30 per Characteristic. After you fail a number of Tests equal to your Toughness Bonus, you are Stinking Drunk. Roll on the following table to see what happens:</p><p> <table class=\"w3-table table-dark w3-striped w3-hoverable w3-bordered\"> <thead> <tr> <th>1d10</th> <th>Stinking Drunk</th> </tr> </thead> <tbody> <tr> <td>1-2</td> <td><b>\'Marienburgher’s Courage!\': </b>Gain a bonus of +20 to your Cool skill.</td> </tr> <tr> <td>3-4</td> <td><b>\'You\'re my Besht Mate!\': </b>Ignore all your existing <em>Prejudices</em> and <em>Animosities</em> (see page 190).</td> </tr> <tr> <td>5-6</td> <td><b>\'Why’s Everything Wobbling!\': </b>On your Turn, you can either Move or take an Action, but not both (see page 157).</td> </tr> <tr> <td>7-8</td> <td><b>\'I\'ll Take Yer All On!\': </b>Gain Animostity (Everybody) (see page 190).</td> </tr> <tr> <td>9-10</td> <td><b>\'How Did I Get Here?\': </b>You wake up the next day, massively hungover, with little memory of what transpired. The GM and other players with you will fill in the embarrassing gaps if you investigate. Pass a <b>Consume Alcohol Test</b> or also gain a Poisoned Condition (see page 169).</td> </tr> </tbody> </table> </p> <p>After not drinking for an hour, enact a Challenging (+0) Consume Alcohol Test. The effects of being drunk will wear off after 10–SL hours, with any Characteristic modifiers for being drunk lost over that time. After all effects wear off, enact another Challenging (+0) Consume Alcohol Test. You now gain a hangover, which is an Fatigued Condition that cannot be removed for 5–SL hours.</p> <p>You may expend 1 Resolve point to ignore the negative modifiers of being drunk until the end of the next round (see page 171).</p>"
    },
    {
        "name": "Cool",
        "tier": "Basic",
        "char": "WP",
        "spec": "",
        "desc": "<p>Cool allows you to remain calm under stress, resist fear when faced with horror, and stick to your convictions. Cool is generally used to resist other Skills — Charm, Intimidate, and similar — but you may also be required to make a Cool Test when faced with anything forcing you to do something you would rather not. Cool is also the primary Skill used to limit Psychology (see page 190).</p>"
    },
    {
        "name": "Dodge",
        "tier": "Basic",
        "char": "Agi",
        "spec": "",
        "desc": "<p>Dodge is your ability to avoid things, through ducking, diving, and moving quickly, and is used extensively to sidestep falling rocks, incoming weapons, unexpected traps, and the like.</p> <p>In combat, Dodge is generally used to resist attacks or avoid damage. Refer to Chapter 5: Rules for more on this.</p>"
    },
    {
        "name": "Drive",
        "tier": "Basic",
        "char": "Agi",
        "spec": "",
        "desc": "<p>Drive lets you guide vehicles — most commonly simple carts and lumbering coaches, not to mention the more ‘experimental’ creations of the Imperial Engineers — along the roads of the Empire with as little incident as possible.</p> <p>Under normal circumstances, if you possess the Drive Skill, there is no need to Test. If conditions are less than ideal — perhaps the road is in poor condition, or the weather is terrible — a Drive Test will be required. If you do not possess the Drive Skill, you may be required to make a Test to carry out even basic manoeuvres. An Astounding Failure (-6) on a Drive Test means something bad has happened. Roll on the following table:</p> <p> <table class=\"w3-table table-dark w3-striped w3-hoverable w3-bordered\"> <thead> <tr> <th>1d10</th> <th>Result</th> </tr> </thead> <tbody> <tr> <td>1-2</td> <td><b>Snapped Harness: </b>One horse (or equivalent) breaks free; reduce speed accordingly.</td> </tr> <tr> <td>3-5</td> <td><b>Jolted Carriage: </b>Passengers suffer 1 Wound and fragile cargos might be damaged.</td> </tr> <tr> <td>6-8</td> <td><b>Broken Wheel: </b>Pass a Drive Test every round to avoid Crashing. Two-wheeled vehicles with a Broken Wheel Crash automatically.</td> </tr> <tr> <td>9-10</td> <td><b>Broken Axle: </b>The vehicle goes out of control and Crashes.</td> </tr> </tbody> </table> </p> <p><b>Crashing:</b> Occupants of Crashing vehicles usually suffer 2d10 Wounds modified by Toughness Bonus and Armour Points unless the vehicle was moving slowly (as determined by the GM). Crashed vehicles must be repaired by someone with an appropriate Trade Skill, such as Trade (Carpenter) or Trade (Cartwright). Spare wheels can be installed by anyone with a Drive Test or with an appropriate Trade Test.</p> <p>In combat, Drive may be used if circumstances allow — for instance, if the party is in a coach being raided by outlaws, and you wish to ram an enemy, or outrun them (see page 165).</p>"
    },
    {
        "name": "Endurance",
        "tier": "Basic",
        "char": "T",
        "spec": "",
        "desc": "<p>The Endurance Skill is called upon when you must endure hardship, withstand deprivation, sit without moving for long periods of time, or survive harsh environments. In particular, Endurance is Tested to resist or recover from various Conditions (see page 167) and helps you recover lost Wounds. Refer to Chapter 5: Rules for more on this.</p>"
    },
    {
        "name": "Entertain",
        "tier": "Basic",
        "char": "Fel",
        "spec": "Acting, Comedy, Singing, Storytelling",
        "desc": "<p>Allows you to delight crowds with the spoken word, perhaps by singing, acting, or attempting a few jokes. A successful use of the Entertain Skill means you have entertained patrons near enough to hear you; the SL indicates how well you have done.</p> <p>In combat, it is unlikely that Entertain will be of much use, although you may come up with an interesting way to use Entertain (Acting) to confuse or mislead your opponents.</p>"
    },
    {
        "name": "Evaluate",
        "tier": "Advanced",
        "char": "Int",
        "spec": "",
        "desc": "<p>Lets you determine the value of rare artefacts, unusual trade goods, and works of art. Everybody is assumed to know the relative worth of general items, but a successful use of the Evaluate allows you to identify the value of curious and unique items.</p> <p>A successful Evaluate Test may also alert you if the goods (or coins) you are studying are counterfeit — this Test will usually be Opposed by the forger’s SL on their Art or Trade Test. Your GM may apply modifiers based on just how rare or obscure the item is, or on your character’s particular expertise or background.</p>"
    },
    {
        "name": "Gamble",
        "tier": "Basic",
        "char": "Int",
        "spec": "",
        "desc": "<p>Allows you to measure the likelihood that a bet will pay off, as well as successfully engage in various games of chance. To represent a gambling match, all players make a Gamble Test — applying any appropriate modifiers for familiarity with the game — and the player with the highest SL wins. On a tie, any lower scoring players drop out, and those remaining enact another Gamble Test, repeating this process until you have a winner. If you wish to influence the game through less honest mechanics, see Sleight of Hand.</p>"
    },
    {
        "name": "Gossip",
        "tier": "Basic",
        "char": "Fel",
        "spec": "",
        "desc": "<p>You can quickly ferret out interesting and useful news, and spread rumours of your own. A successful Gossip Test means you have found out one useful piece of information, which your GM can impart to you, about the local area. Each SL either offers you an additional piece of information, or the chance to spread a rumour to a number of individuals equal to your Fellowship Bonus. The time required for a Gossip Test depends on how circumspect the players are being, and how busy the area is, as determined by the GM.</p> <p>It is unlikely that Gossip will be much use in combat, but if your attacker happens to be local, and you happen to know something really juicy…</p>"
    },
    {
        "name": "Haggle",
        "tier": "Basic",
        "char": "Fel",
        "spec": "",
        "desc": "<p>Haggle allows you to secure better deals when negotiating with others. In general, Haggle is used to see whether you do, or do not, make a good deal, most commonly with an Opposed Haggle Test. Specifically, it can be used when shopping to secure better prices. For information on this, refer to Chapter 11: Consumers’ Guide.</p>"
    },
    {
        "name": "Heal",
        "tier": "Advanced",
        "char": "Int",
        "spec": "",
        "desc": "<p>You’ve been trained to deal with injuries and diseases. A successful Heal Test allows you to do one of the following: <ul> <li>Diagnose an illness, infection, or disease.</li> <li>Treat a disease (see page 188).</li> <li>Heal wounds equal to your Intelligence Bonus + SL (Note: a patient can only benefit from one Heal roll after each encounter). If sterile liquids or appropriate poultices and dressings are used, no Infection will develop from the injury (see page 181).</li> <li>Staunch a <em>Bleeding</em> Condition, with each SL removing an extra <em>Bleeding</em> Condition.</li> </ul></p> <p>A Failed Heal Test can potentially cause Wounds if your Intelligence Bonus + SL totals less than 0. On an Astounding Failure, your patient will also contract a Minor Infection (see page 187).</p> <p>If administering to someone who has a disease, a successful Heal Test ensures that you do not contract the disease for that day. Each SL also prevents one other character encountering the patient that day from catching the disease. For each full day the patient spends resting under your care, the duration of the disease is reduced by one, to a minimum of one. For more information see <b>Disease and Infection</b> in Chapter 5: Rules.</p> <p>Certain injuries require Surgery; see the Surgery Talent for details. For more information on healing wounds, refer to Injury in Chapter 5: Rules.</p> <p>Your GM may apply modifiers to Heal Tests to reflect the virulence of the disease, the suitability of conditions and materials, or the stress of your circumstances. If healing during combat, Tests will likely be <b>Challenging (+0)</b> at the very least.</p>"
    },
    {
        "name": "Intimidate",
        "tier": "Basic",
        "char": "S",
        "spec": "",
        "desc": "<p>Allows you to coerce or frighten sentient creatures. The precise manner of initiating an Intimidate Test depends on context: while it is generally accompanied by an overt threat, sometimes a subtle implication or even a look is enough. Intimidate is almost always Opposed by your target’s Cool Skill; if successful, you can intimidate a number of targets up to your Strength Bonus + SL. Each will react to Intimidate based on their individual personalities and how successful you were in menacing them, but in all cases, they will back down or move out of the way and will not speak out against you, or they will alternatively accept combat is the only way forward and prepare their weapons.</p> <p>In combat, you cause Fear (see page 190) in all Intimidated targets. You may also use your Intimidate Skill instead of Melee when defending against those afraid of you, causing the Intimidated parties to back away from the fight with your will and posture alone. Further, with your GM’s approval, you may use Intimidate to ‘attack’ such targets, issuing specific commands, such as ‘drop your weapons’ or ‘get out of here!’. However, if you fail any of these subsequent Intimidate Tests, you no longer Intimidate (or cause Fear) in affected opponents. With your GM’s permission you may try to Intimidate them again in a later Round, but this will incur a negative modifier, as they are less likely to fear you having seen through your bravado once already.</p> <p><div class=\"w3-panel w3-round-large w3-light-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Alternative Characteristics</h4> <p>While Strength is the default stat for Intimidate Tests, the GM may decree certain situations may allow you to use a different Characteristic: a steely witch hunter may use Willpower to stare down an inquisitive bystander, or an academic may use Intelligence to cow a lowly student with his intimidating knowledge, for instance.</p> </div></p>"
    },
    {
        "name": "Intuition",
        "tier": "Basic",
        "char": "I",
        "spec": "",
        "desc": "<p>The Intuition Skill allows you to get a feel for your surroundings, leading you to notice when something is wrong, and gives you a sense of when people may be hiding something from you. A successful use of the Intuition Skill gives you subtle or implicit intelligence relating to your environment, determined by your GM. This may be information such as whether someone believes what they are saying, what the general attitude is towards the local noble, or if the helpful local’s motives are as pure as they seem. If someone is actively trying to hide their intent, they may resist your Intuition with Cool or Entertain (Acting).</p> <p>In combat, a successful Intuition Test may be used to give you +1 Advantage as you weigh the environment and your opponents. You may continue building Advantage in subsequent turns providing you are able to observe your targets and are not interrupted (such as being attacked); you may gain a maximum Advantage equal to your Intelligence Bonus in this manner.</p>"
    },
    {
        "name": "Language",
        "tier": "Advanced",
        "char": "Int",
        "spec": "Albion, Battle Tongue, Bretonnian, Classical, Elthárin, Estalian, Gospodarinyi, Grumbarth, Guilder, Khazalid, Magick, Mootish, Norse, Queekish, Reikspiel*, Thieves\' Tongue, Tilean, Wastelander",
        "desc": "<p>The Language Skill grants you access to extra languages beyond your native tongue. All characters are automatically assumed to be able to speak ‘Reikspiel’ &mdash; the language of the Empire &mdash; and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set in the Empire, replace Reikspiel with the local language.</p> <p>If you possess a Language Skill, you are generally able to make yourself understood in that language, or to understand simple concepts. You will be asked to Test your Language Skill when a particularly difficult concept must be conveyed, or an obscure dialect or vocabulary is employed.</p> <p><b>Note:</b> Language (Magick) is used to cast spells and may occasionally be Tested, with… unpleasant consequences if failed. Refer to Chapter 8: Magic, for more on this.</p><p><div class=\"w3-panel w3-round-large w3-light-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Options: Battle Tongue</h4> <p>Battle Tongue represents a series of simple commands and gestures that may be made in the heat of combat. Players with Language (Battle Tongue) may communicate briefly with one another during combat without penalty. Those without the Skill cannot quickly coordinate their attacks or discuss strategy once combat begins.</p> </div></p>"
    },
    {
        "name": "Leadership",
        "tier": "Basic",
        "char": "Fel",
        "spec": "",
        "desc": "<p>A measure of your ability to lead others and command their respect. While most often associated with martial situations, a resolute leader can quickly direct a fast response to a fire or other such calamity, and nobles use the Skill frequently to command their lessers.</p> <p>A successful Leadership Test allows you to issue orders to a number of targets equal to your Fellowship Bonus + SL. If the targets are your natural subordinates — a noble commanding serfs, or a sergeant commanding his troops — commands are usually unopposed. If there is no natural hierarchy in place, or the order is particularly challenging — such as ordering your soldiers to charge a Hydra head on — the Test is Opposed by your targets’ Cool.</p> <p>In combat, you may use Leadership to encourage your subordinates. A successful Leadership Test confers a bonus of +10 to all Psychology Tests until the end of the next round (see page 190).</p> <p>Further, Leadership can be used to transfer Advantage to allies able to hear you; following a successful Leadership Test, you may transfer an Advantage to one ally of your choice, plus a further +1 Advantage per SL scored, which can again go to any allies of your choice within earshot.</p>"
    },
    {
        "name": "Lore",
        "tier": "Advanced",
        "char": "Int",
        "spec": "Engineering, Geology, Heraldry, History, Law, Magick, Metallurgy, Science, Theology",
        "desc": "<p>Having a Lore Skill means you’ve been formally taught, or have somehow otherwise learned, a branch of specialist knowledge. Possessing a Lore Skill means you are broadly knowledgeable in the specialisation and don’t need to make a Test in order for the GM to supply you with relevant facts. If you are seeking specific, less well-known information, you will be required to make a Lore Test, modified by how obscure the information is, with the SL indicating how much detail you recall.</p> <p>In combat, successful Lore Tests may afford you +1 Advantage if appropriate (with your GM’s approval). For instance, Lore (Geology) may give you an edge if fighting in a rocky cavern, or Lore (Engineering) may help you if fighting a foe armed with a complex mechanical device. You may continue building Advantage in subsequent turns providing the circumstances are correct (as determined by the GM) and you are not interrupted; you may gain a maximum Advantage equal to your Intelligence Bonus in this manner.</p>"
    },
    {
        "name": "Melee",
        "tier": "Basic",
        "char": "WS",
        "spec": "Basic, Brawling, Cavalry, Fencing, Flail, Parry, Pole-Arm, Two-Handed",
        "desc": "<p>The Melee Skill represents specific training with a single type of close combat weaponry. Each Melee Specialisation indicates training in using a specific class of weapon. If you don’t have the correct Specialisation for a weapon you wish to use, refer to Chapter 11: Consumers’ Guide for the correct weapon entry, and what penalties you will suffer.See Chapter 5: Rules for more detail about combat and using the Melee Skill.</p>"
    },
    {
        "name": "Navigation",
        "tier": "Basic",
        "char": "I",
        "spec": "",
        "desc": "<p>Navigation allows you to find your way in the wilderness using landmarks, stellar bodies or maps. Possessing the Navigation Skill means you know roughly where you are, and can find your way between well-known landmarks without a Test. A Test is only required if you are disoriented or travelling far from the beaten path, with success showing you the correct direction, or allowing you to avoid mishap.</p> <p>If you are navigating a long journey, your GM may ask for an extended Navigation Test, modified by conditions, visible landmarks, and access to reliable geographical information. The SL required to succeed depends on how far the destination is, with each Test representing between an hour and a day’s travel, depending on the nature of the journey.</p>"
    },
    {
        "name": "Outdoor Survival",
        "tier": "Basic",
        "char": "Int",
        "spec": "",
        "desc": "<p>The Outdoor Survival Skill is used to survive in the wild, including the ability to fish, hunt, forage, and build fires and shelters. Experienced travellers are skilled at reading the signs of incoming inclement weather and finding the spoor of various dangerous beasts.</p> <p>When camping, make an Outdoor Survival Test, modified by the harshness of conditions — for instance, a Test is <b>Challenging (+0)</b> if it is raining, <b>Hard (–20)</b> in a storm. A successful Test indicates you can provide yourself sustenance and shelter for the night. Each SL allows you to provide for one more character. If the Test is failed, you must make a <b>Challenging (+0) Endurance Test</b> or receive the <em>Fatigued</em> Condition. If you suffer an Astounding Failure, something untoward has happened, as determined by the GM; perhaps your camp is attacked in the night?</p> <p>When fighting in the wilderness, you may make an Outdoor Survival Test to receive +1 Advantage, in the same way as Intuition, to a maximum number of Advantage equal to your Intelligence Bonus, as you spy out treacherous and advantageous terrain that you can best use to your advantage.</p> <p><div class=\"w3-panel w3-round-large w3-light-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Options: Gathering Food and Herbs</h4> <p> Gathering food or herbs normally takes around 2 hours. Hunting and foraging parties make one Assisted Outdoor Survival Test for the group, with the Difficulty determined by the circumstances. <ul> <li>Foraging: A success grants enough food for one character. Every SL yields sufficient extra food for one more person.</li> <li>Hunting and Fishing: If you have appropriate bows, spears, fishing rods, or nets, a successful Test feeds two people, and an extra two people per SL.</li> <li>Trapping: Use the Set Trap Skill to place Animal traps (see page 303). Feeds the same number of people as Hunting and Fishing.</li> <li>Lore (Herbs): If you are instead gathering herbs using Lore (Herbs), a success gathers enough for a dose of the sought herb (see page 307), with each SL adding an extra dose. Gathering tests are modified by herb Availability: Common (0), Scarce (–10), Rare (–20), or Exotic (–30).</li> </ul> </p></div></p>"
    },
    {
        "name": "Perception",
        "tier": "Basic",
        "char": "I",
        "spec": "",
        "desc": "<p>Your ability to notice things with your senses — sight, smell, hearing, touch, and taste, and any other senses you may possess, such as magical or non-Human senses. Your GM may ask for a Perception Test to detect something, like movement behind the treeline, the presence of a trap, or someone following you, modified by how easy it is to notice. Perception is also used to resist attempts to hide things through Skills such as Sleight of Hand or Stealth.</p> <p>Perception has multiple uses in combat, most commonly to notice important details beyond the immediately obvious about the surrounding environment and your opponents, as determined by the GM.</p>"
    },
    {
        "name": "Perform",
        "tier": "Advanced",
        "char": "Agi",
        "spec": "Acrobatics, Clowning, Dancing, Firebreathing, Juggling, Miming, Rope Walking",
        "desc": "<p>You’ve learned a physically demanding art, perhaps as a way of making a living, maybe as a street entertainer or as part of a travelling carnival. A successful use of the Perform Skill allows you to entertain all patrons close enough to see and hear you; the SL indicate how well you have done.</p> <p>In combat, certain physical Perform specialisations may give you an edge. With your GM’s permission, Perform (Acrobatics) may be used in lieu of Dodge. Other Perform Skills may be useful in distracting foes, perhaps gaining you an Advantage if you can come up with a creative way to do so. And some Perform skills can be directly used as a weapon if you have the correct trappings, such as Perform (Firebreathing)!</p>"
    },
    {
        "name": "Pick Lock",
        "tier": "Advanced",
        "char": "Dex",
        "spec": "",
        "desc": "<p>You know the mechanisms of locks and how to open them without their proper keys. Picking a lock is often an Extended Test, with the number of SL required to open the lock dependent on the complexity of the lock.</p> <p>Lock Difficulty ratings assume the use of lock picks. Improvised picks such as hairpins and nails can be used at –10 penalty. Each Test normally takes a Round to complete, though the GM may determine some locks are particularity stiff or rusted, and take longer. If the GM deems a lock is sufficiently simple, unskilled characters can attempt a single Very Hard (–30) Dexterity Test to pick the lock. The following provides some standard difficulties for locks typically encountered in the Old World.</p> <p> <table class=\"w3-table table-dark w3-striped w3-hoverable w3-bordered\"> <thead> <tr> <th>Lock Type</th> <th>Difficulty</th> <th>SL</th> </tr> </thead> <tbody> <tr> <td>Latch</td> <td>Average (+20)</td> <td>0</td> </tr> <tr> <td>Normal Door</td> <td>Challenging (+0)</td> <td>2</td> </tr> <tr> <td>Secure Door</td> <td>Difficult (-10)</td> <td>2</td> </tr> <tr> <td>Treasure Chest</td> <td>Hard (-20)</td> <td>5</td> </tr> <tr> <td>Vault Door</td> <td>Very Hard (-30)</td> <td>10</td> </tr> </tbody> </table> </p>"
    },
    {
        "name": "Play",
        "tier": "Advanced",
        "char": "Dex",
        "spec": "Bagpipe, Lute, Harpsichord, Horn, Violin",
        "desc": "<p>Your ability to make music with an instrument, hopefully well enough to impress others. A successful Play Test lets you entertain those near enough to see and hear you; the SL indicates the quality of the piece played.</p>"
    },
    {
        "name": "Pray",
        "tier": "Advanced",
        "char": "Fel",
        "spec": "",
        "desc": "<p>Your ability to invoke, or otherwise commune with, a deity. For more information on using the Pray Skill to seek divine intervention, see Chapter 7: Religion & Belief.</p> <p>In combat, if your GM deems it appropriate considering your circumstances and faith, you may use Pray to meditate and focus your mind. Each round you spend praying in combat — and making a successful Pray Test — gives you +1 Advantage. You can gain additional Advantage this way, up to a maximum of your Fellowship Bonus.</p> <p>Further, if your enemies understand your language and recognise (and fear) your deity, the GM may allow you to use Pray in lieu of the Intimidate Skill.</p>"
    },
    {
        "name": "Ranged",
        "tier": "Advanced",
        "char": "BS",
        "spec": "Blackpowder, Bow, Crossbow, Engineering, Entangling, Explosives, Sling, Throwing",
        "desc": "<p>Whilst anyone can throw a rock simply using their Ballistic Skill, it takes training and practice to use weapons like bows and pistols. Each Ranged Specialisation is specific to a group of ranged weapons. If you don’t have the Ranged Specialisation for a weapon you wish to use, refer to Chapter 11: Consumers’ Guide to see what penalties you will suffer when using the weapon. See Chapter 5: Rules for full detail about ranged combat.</p>"
    },
    {
        "name": "Research",
        "tier": "Advanced",
        "char": "Int",
        "spec": "",
        "desc": "<p>How adept you are at pulling useful and frequently obscure knowledge from libraries and other such storehouses of information. Research requires you have the Read/Write Talent (see page 142).</p> <p>Simply possessing the Research Skill indicates you can find straightforward information from a clearly indexed library without a Test given enough time. If you are seeking specific, less well-known information, or you are in a rush, you will be required to make an Extended Research Test, with the Difficulty modified by the library size, and the target SL depending upon the obscurity of the topic.</p> <p>Research has no use in combat beyond perhaps finding you a useful manual on sword-fighting techniques.</p>"
    },
    {
        "name": "Ride",
        "tier": "Basic",
        "char": "Agi",
        "spec": "Demigryph, Great Wolf, Griffon, Horse, Pegasus",
        "desc": "<p>How proficient you are at riding a particular group of animals; Ride (Horse), for example, will let you ride Horses, Mules, Donkeys, and similar. You’ll only need to make a Test when doing something out of the ordinary, such as racing, dressage, traversing dangerous terrain, or charging into combat. Otherwise, if you have at least one Advance in the Skill, you are presumed to be able to ride around without need of a Test.</p> <p>If mounted on a steed, you move using the steed’s Movement statistic; if you wish to run, jump, or leap, you use your Ride Skill, not Athletics. An extended Ride Test may be needed if you are racing somewhere, the target SL depending on the length of the journey, the number of Tests indicating how long you take to arrive. A Ride Test may be modified by environmental conditions, and the temperament of your mount. For more information on mounts, see Chapter 12: Bestiary.</p> <p>The Ride skill can be used extensively in combat. See Chapter 5: Rules, for more on mounted combat.</p>"
    },
    {
        "name": "Row",
        "tier": "Basic",
        "char": "S",
        "spec": "",
        "desc": "<p>Your prowess at pulling an oar and moving a boat through the water. The Row Skill is typically only used when racing, navigating rapids, desperately avoiding Bog Octopuses, or similar unusual or dangerous feats. Anyone with the Skill is automatically presumed to be able to scull about a pond, or over a gentle river, without a Test. Those without the skill may have to make a Test for anything but the most basic manoeuvres.</p>"
    },
    {
        "name": "Sail",
        "tier": "Advanced",
        "char": "Agi",
        "spec": "Barge, Caravel, Cog, Frigate, Warship",
        "desc": "<p>Your ability to operate and manoeuvre a sailing vessel — including knotwork, steering, gauging the wind, and more. Assuming you have enough trained crew for your vessel, you only use the Sail Skill when you must push your vessel to perform, either by racing, navigating particularly dangerous shoals, struggling against bad weather, or similar difficulties. Simply sailing with a gentle wind, or guiding a ship downriver, doesn’t require a Test for those with Sail. The skill can also be used for sailing-related activities like tying knots, or tying others up in knots.</p> <p>As sailing one ship is not so different to sailing another, having any Sail Speciality makes all other Sail Specialities Basic Skills for you.</p>"
    },
    {
        "name": "Secret Signs",
        "tier": "Advanced",
        "char": "Int",
        "spec": "Cult (any one), Grey Order, Guild (any one), Ranger, Scout, Thief, Vagabond",
        "desc": "<p>You’ve been taught how to use clandestine markings only intelligible to members of a select group. There are all manner of reasons why someone may want to leave a secret message: vagabonds might indicate which homeowners are likely to offer alms, thieves may want to indicate weaknesses, or likely marks, while scouts may want to warn one another about a dangerous monster’s lair nearby.</p> <p>This Skill does not usually need to be Tested — you can decipher any appropriate signs you can see if you have this Skill. But if the signs have been disturbed, worn away, or if you are pressed for time, then a Test will likely be required. Most messages are very simple, no more than three words.</p>"
    },
    {
        "name": "Set Trap",
        "tier": "Advanced",
        "char": "Dex",
        "spec": "",
        "desc": "<p>From a simple snare, or bear-trap, to more spectacular devices like Von Grizzel’s Thief-Render, players are unlikely to venture far in the Old World without encountering traps. The Set Trap Skill measures your ability to set and disarm traps of all varieties. Anyone with the skill is automatically assumed to be able to activate and disarm traps given enough time. A Test is normally only required if attempting to use the Skill swiftly or if otherwise under pressure, or if the trap is especially complex. A selection of simple traps can be found in Chapter 11: Consumers’ Guide. </p> <p>Setting or disarming most traps requires an <b>Average (+20) Set Trap Test</b>, but more complex devices may require an extended Test, needing several SL over multiple rounds to set.</p>"
    },
    {
        "name": "Sleight of Hand",
        "tier": "Advanced",
        "char": "Dex",
        "spec": "",
        "desc": "<p>Lets you pick pockets, palm objects, and perform minor tricks of prestidigitation, as well as cheating with games of chance. This Skill is typically Opposed by the Perception Skill of your target; success means you have palmed the object, picked the pocket, or swapped the cards, while a Marginal Success (+0 to +1) may suggest that your nefarious misdeeds have left your opponent suspicious.</p> <p>You can also use Sleight of Hand to ‘help’ your Gamble Skill when playing appropriate games of chance. Before any round (or similar, depending upon the game at hand) you can attempt a <skill>Sleight of Hand</skill> Test (which will be opposed if others suspect). If successful, you may reverse your Gamble Test for the round if this will score a Success. If failed, your opponents may not be best pleased…</p> <p>Sleight of Hand and combat rarely mix, though inventive players may be able to conjure an impressive distraction with GM approval, perhaps even gaining Advantage by making a Dagger seemingly appear from nowhere, surprising a superstitious foe.</p>"
    },
    {
        "name": "Stealth",
        "tier": "Basic",
        "char": "Agi",
        "spec": "Rural, Underground, Urban",
        "desc": "<p>Allows you to creep quietly and conceal yourself in shadows more readily than most. Stealth is generally Opposed by an opponent’s Perception Skill, and Tests will be modified by how dark or well concealed your route is, as well as how circumspectly you are dressed. An Impressive or Astounding Failure on a Stealth Test will likely draw the immediate attention of the enemies you were trying to avoid in the first place.</p> <p>Stealth has many potential applications in combat, most usefully to hide oneself in preparation for an Ambush, or to creep around an opponent in order to attack from behind. See Chapter 5: Rules for the implications of this. Of course, you can also use the Skill to escape a conflict unseen…</p>"
    },
    {
        "name": "Swim",
        "tier": "Advanced",
        "char": "S",
        "spec": "",
        "desc": "<p>Your ability to swim in water without drowning. If you have the Swim Skill, you are automatically presumed to be able to swim freely without a Test. But if you find yourself in difficult currents, racing, or fleeing from an oversized shark sent by Stromfels, the God of Drowning, a Test will be required. This may be modified by the condition of the water, or how encumbered you are by clothes, armour, and other trappings.</p> <p>Swim is only used in combat if you happen to be fighting in the water, where it replaces Skills like Athletics to govern Movement. If exact speeds are required, you swim at half your Movement rate, using the normal rules for moving found on page 164.</p>"
    },
    {
        "name": "Track",
        "tier": "Advanced",
        "char": "I",
        "spec": "",
        "desc": "<p>Your ability to follow subtle trails left by others. Track is used to follow difficult trails across the wilderness. This is not a skill for following a set of footprints in the snow — a simple Perception test covers that — Track involves deeper knowledge and awareness used to recognise the subtle signs of a quarry’s passage. You can also attempt to hide your trail, in which case use your Track skill to oppose your pursuer’s Track Test.</p> <p>Often an Extended Track Test is required to follow a trail, with the Difficulty modified by how fresh the tracks are, and how suitable the ground is: damp earth betrays passage better than stony ground. The GM may also use the Pursuit rules to determine if you manage to track down a fleeing quarry (see page 166).</p>"
    },
    {
        "name": "Trade",
        "tier": "Advanced",
        "char": "Dex",
        "spec": "Apothecary, Calligrapher, Chandler, Carpenter, Cook, Embalmer, Smith, Tanner",
        "desc": "<p>Most folk of the Reikland follow a trade; even adventurers often have a more reliable, or respectable career to fall back on, between bouts of hair-raising, bowel-loosening excitement.</p>  <p>The Trade Skill represents your ability to create something or provide a service, as well as your knowledge of the relevant lore surrounding your trade.</p> <p>Having the Skill is enough to automatically perform the tasks associated with your trade, assuming you have the correct resources and tools. You need only Test your Trade Skill if you are seeking to create something quickly, conditions are adverse, or you are seeking to invent or create a high-quality item. Often Trade Tests of this type are extended Test, with the SL and time required depending upon the scope or scale of what is being produced; a quick meal with Trade (Cook) to impress a local lord will take far less time than constructing a warship with Trade (Shipwright).</p> <p>You may also make a Trade Test as a Lore Skill, to determine information relevant to the trade in question. In such circumstances, the GM may prefer to use Int over Dex as the base Characteristic, though often this is ignored to keep play simple. While most Trade Skills have little function in combat, there are as many Trade Skills as there are trades, and some may be of use depending upon the circumstances. For example, a successful Trade (Apothecary) Test may be useful if fighting in an Apothecary’s shop as you identify some astringent chemicals to hurl at your foes.</p> <p>The Trade Skill is also used for enacting a Crafting Endeavour (see page 197).</p>"
    }
]


var condition = [
    {
        "name": "Ablaze",
        "desc": "<p>You are on fire! This Condition is normally only applied if you are flammable — for example: wearing clothes that can be set alight — but some magical and divine effects can set you alight even if you are not normally combustible!</p><p>At the end of every Round, you suffer 1d10 Wounds, modified by Toughness Bonus and the Armour Points on the least protected Hit Location, with a minimum of 1 Wound suffered. Each extra <em>Ablaze</em> Condition you have adds +1 to the Damage suffered; so, three <em>Ablaze</em> Conditions result in 1d10+2 Damage suffered.</p><p>One <em>Ablaze</em> Condition can be removed with a successful Athletics Test, with each SL removing an extra <em>Ablaze</em> Condition. The Difficulty for this Test is modified by circumstances: it’s much easier to put out a fire rolling around on sand than it is in the middle of an oil-soaked kitchen.</p>"
    },
    {
        "name": "Bleeding",
        "desc": "<p>You are bleeding badly. Lose 1 Wound at the end of every Round, ignoring all modifiers. Further, suffer a penalty of –10 to any Tests to resist Festering Wounds, Minor Infection, or Blood Rot (see page 186). If you reach 0 Wounds, you no longer lose Wounds and instead fall immediately unconscious (gain the <condition>Unconscious</condition> Condition). At the end of Round, you have a 10% chance of dying per <em>Bleeding</em> Condition you have; so, if you had 3 <em>Bleeding</em> Conditions, you would die from blood loss on a roll of 0–30. If a double is scored on this roll, your wound clots a little: lose 1 <em>Bleeding</em> Condition. You cannot regain consciousness until all <em>Bleeding</em> Conditions are removed (see Injury on page 172).</p><p>A <em>Bleeding</em> Condition can be removed with: a successful <skill>Heal</skill> Test, with each SL removing an extra <em>Bleeding</em> Condition; or with any spell or prayer that heals Wounds, with one Condition removed per Wound healed.</p><p>Once all <em>Bleeding</em> Conditions are removed, gain one <condition>Fatigued</condition> Condition.</p>"
    },
    {
        "name": "Blinded",
        "desc": "<p>Perhaps because of a flash of light, or because of liquid sprayed in your face, you are unable to see properly. You suffer a –10 penalty to all Tests involving sight, and any opponent attacking you in close combat gains a bonus of +10 to hit you.</p><p>One <em>Blinded</em> Condition is removed at the end of every other Round.</p>"
    },
    {
        "name": "Broken",
        "desc": "<p>You are terrified, defeated, panicked, or otherwise convinced you are going to die. On your turn, your Move and Action must be used to run away as fast as possible until you are in a good hiding place beyond the sight of any enemy; then you can use your Action on a Skill that allows you to hide more effectively. You also receive a penalty of –10 to all Tests not involving running and hiding.</p><p>You cannot Test to rally from being Broken if you are <condition>Engaged</condition> with an enemy (see page 159). If you are unengaged, at the end of each Round, you may attempt a <skill>Cool</skill> Test to remove a Broken Condition, with each SL removing an extra Broken Condition, and the Difficulty determined by the circumstances you currently find yourself: it is much easier to rally when hiding behind a barrel down an alleyway far from danger (Average +20) than it is when three steps from a slavering Daemon screaming for your blood (Very Hard –30).</p><p>If you spend a full Round in hiding out of line-of-sight of any enemy, you remove 1 Broken Condition.</p><p>Once all Broken Conditions are removed, gain 1 <condition>Fatigued</condition> Condition.</p>"
    },
    {
        "name": "Deafened",
        "desc": "<p>Whether caused by a loud noise or a blow to the head, you are unable to hear properly. You suffer a –10 penalty to all Tests involving hearing, and any opponent attacking you in close combat from the flank or rear gains an extra bonus of +10 to hit you (this bonus does not increase with multiple Deafened Conditions). One Deafened condition is removed at the end of every other Round and is often replaced with tinnitus.</p>"
    },
    {
        "name": "Engaged",
        "desc": "<p>Whenever you attack an opponent, or are attacked, in melee combat, you count as Engaged. This means you are tussling with each other in a fight, and other rules (due to Talents, Skills, etc.) for being Engaged might apply. If you don't attack each other for a full Round, you are no longer Engaged.</p>"
    },
    {
        "name": "Entangled",
        "desc": "<p>You are wrapped in something restricting your movement; it could be ropes, spider’s webbing, or an opponent’s bulging biceps. On your turn, you may not Move, and all your actions involving movement of any kind suffer a penalty of –10 (including Grappling; see page 163). For your Action, you can remove an Entangled Condition if you win an Opposed Strength Test against the source of the entanglement, with each SL removing an extra Entangled Condition.</p>"
    },
    {
        "name": "Fatigued",
        "desc": "<p>You are exhausted or stressed, and certainly in need of rest. You suffer a –10 penalty to all Tests. Removing a Fatigued Condition normally requires rest, a spell, or a divine effect, though in some instances, such as when a Fatigued Condition is caused by carrying too much (see Encumbrance on page 293), simply changing your circumstances (carrying fewer trappings, for example) can remove a Condition.</p><div class=\"w3-panel w3-round-large w3-light-blue w3-leftbar w3-rightbar w3-border-blue w3-round-large\"><h4>How Much Rest?</h4><p>How much rest is required to remove a Fatigued condition is up to the GM and the style of game you are playing. Some groups prefer a relatively realistic approach and remove a Fatigue condition after a prolonged rest. Others require only an hour or so of rest for each Fatigue condition, preferring to press on with the adventure rather than worry about tired characters. And some remove a Fatigue condition per round of rest, keeping things fast and simple. It’s up to you and your group to decide how much rest you need.</p></div>"
    },
    {
        "name": "Poisoned",
        "desc": "<p>You have been poisoned or injected with venom. All Tests to remove poison have their difficulty determined by the poison or venom suffered. At the end of each Round, lose 1 Wound, ignoring all modifiers. Also, suffer a penalty of –10 to all Tests.</p><p>If you reach 0 Wounds when Poisoned, you cannot heal any Wounds until all Poisoned conditions are removed. If you fall <condition>Unconscious</condition> when Poisoned, make an Endurance Test after a number of Rounds equal to your Toughness Bonus or die horribly. See Injury on page 172 for more on this.</p><p>At the end of each Round, you may attempt an Endurance Test. If successful, remove a Poisoned Condition, with each SL removing an extra Poisoned Condition. A <skill>Heal</skill> Test provides the same results. Once all Poisoned Conditions are removed, gain 1 <condition>Fatigued</condition> Condition.</p>"
    },
    {
        "name": "Prone",
        "desc": "<p>You have fallen to the ground, possibly because you have run out of Wounds, you’ve tripped, or because you’ve been hit by something rather large. On your turn, your Move can only be used to stand up or crawl at half your Movement in yards (note: if you have 0 Wounds remaining, you can only crawl). You suffer a –20 penalty to all Tests involving movement of any kind, and any opponent trying to strike you in Melee Combat gains +20 to hit you.</p><p>Unlike most other conditions, Prone does not stack — you are either Prone , or you are not. You lose the Prone Condition when you stand up.</p>"
    },
    {
        "name": "Stunned",
        "desc": "<p>You have been struck about the head or otherwise disorientated or confused; your ears are likely ringing, and little makes sense. </p><p>You are incapable of taking an Action on your turn but are capable of half your normal movement. You can defend yourself in opposed Tests — but not with <skill>Language (Magick)</skill>. You also suffer a –10 penalty to all Tests. If you have any Stunned Conditions, any opponent trying to strike you in Melee Combat gains +1 Advantage before rolling the attack.</p><p>At the end of each Round, you may attempt a Challenging (+0) Endurance Test. If successful, remove a Stunned Condition, with each SL removing an extra Stunned Condition.</p><p>Once all Stunned Conditions are removed, gain 1 <condition>Fatigued</condition> Condition if you don’t already have one.</p>"
    },
    {
        "name": "Surprised",
        "desc": "<p>You have been caught unawares and you aren’t at all ready for what’s about to hit you. You can take no Action or Move on your turn and cannot defend yourself in opposed Tests. Any opponent trying to strike you in Melee Combat gains a bonus of  +20 to hit.</p><p>The Surprised Condition does not stack, so you do not collect multiple Surprised Conditions, even should you be technically surprised multiple times in a Round.</p><p>At the end of each Round, or after the first attempt to attack you, you lose the Surprised Condition.</p>"
    },
    {
        "name": "Unconscious",
        "desc": "<p>You are knocked out, asleep, or otherwise insensible. You can do nothing on your turn and are completely unaware of your surroundings. An attacker targeting you gains the benefit of the I Will Not Fail rule on page 171 without having to spend a Resilience point. Or, if the GM prefers, any close combat hit simply kills you. Any ranged combat hit automatically does the same if the shooter is at Point Blank range.</p><p>The Unconscious Condition does not stack — you are either Unconscious , or you are not — so you do not collect multiple Unconscious Conditions.</p><p>Recovering from unconsciousness requires different circumstances depending upon why you fell unconscious. Refer to Injury on page 172 for more on this. If you spend a Resolve point to remove an Unconscious condition, but have not resolved the cause of the incapacitation, you gain another Unconscious Condition at the end of the round. When you lose the Unconscious Condition, you gain the <condition>Prone</condition> and <condition>Fatigued</condition> Conditions.</p>"
    }
]

var weaponQual = [
    {
        "name": "Accurate",
        "desc": "The weapon is accurate an easy to hit with. Gain a bonus of +10 to any Test when firing this weapon."
    },
    {
        "name": "Blackpowder",
        "desc": "The crack of gunfire followed by gouts of smoke and confusion can be terrifying. If you are targeted by a Blackpowder weapon, you must pass an <test>Average (+20) Cool Test</test> or take a <condition>Broken</condition> Condition, even if the shot misses. <br/>Those with <skill>Ranged (Engineering)</skill> can use Blackpowder and Explosive weapons without penalty."
    },
    {
        "name": "Blast (Rating)",
        "desc": "All Characters within <mono>(Rating)</mono> yards of the struck target point take <mono>SL+Weapon Damage</mono>, and suffer any Conditions the weapon inflicts."
    },
    {
        "name": "Crossbow/Throwing",
        "desc": "Crossbows and Thrown weapons are relatively simple to use. You can attempt a <skill>Ranged</skill> (Crossbow) or <skill>Ranged</skill> (Throwing) Test using your Ballistic Skill, but the weapon loses all Qualities whilst retaining its Flaws."
    },
    {
        "name": "Damaging",
        "desc": "A Damaging weapon can use the higher score from either the units die or the SL to determine the Damage caused from a successful hit. For example, if you roll 34 in your attack Test and the target number was 52, you can choose to use the SL (which in this case is 2) or the units die result, which is 4. An <weaponqual>Undamaging</weaponqual> weapon can never also be Damaging (Undamaging takes precedent)."
    },
    {
        "name": "Defensive",
        "desc": "Defensive weapons are designed to parry incoming attacks. If you are wielding such a weapon, gain a bonus of +1 SL to any <skill>Melee</skill> Test when you oppose an incoming attack."
    },
    {
        "name": "Distract",
        "desc": "Distracting weapons can be used to drive an opponent back due to their dangerous or whip-like natures. Instead of causing Damage, a successful attack with a Distracting weapon can force an opponent back 1 yard per SL by which you win the Opposed Test."
    },
    {
        "name": "Engineering",
        "desc": "All Engineering weapons can be used by characters with <skill>Ranged</skill> (Blackpowder), but the weapons lose all Weapon Qualities whilst retaining their flaws."
    },
    {
        "name": "Entangle",
        "desc": "Your weapon wraps around your opponents, entangling them. Any opponent successfully hit by your weapon gains the <condition>Entangled</condition> Condition with a Strength value equal to your Strength Characteristic. When Entangling an opponent, you cannot otherwise use the weapon to hit. You can end the Entangling whenever you wish."
    },
    {
        "name": "Explosive",
        "desc": "Those with <skill>Ranged</skill> (Engineering) can use Blackpowder and Explosive weapons without penalty."
    },
    {
        "name": "Fast",
        "desc": "Fast weapons are designed to strike out with such speed that parrying is not an option, leaving an opponent skewered before they can react. A wielder of a Fast weapon can choose to attack with the Fast weapon outside of the normal Initiative sequence, either striking first, last, or somewhere in between as desired. <br/><br/>Further, all <skill>Melee</skill> Tests to defend against Fast weapons suffer a penalty of –10 if your opponent is using a weapon without the Fast Quality; other Skills defend as normal. Two opponents with Fast weapons fight in Initiative order (relative to each other) as normal. A Fast weapon may never also be <weaponqual>Slow</weaponqual> (Slow takes precedent)."
    },
    {
        "name": "Hack",
        "desc": "Hacking weapons have heavy blades that can hack through armour with horrific ease. If you hit an opponent, you Damage a struck piece of armour or shield by 1 point as well as wounding the target."
    },
    {
        "name": "Impact",
        "desc": "Some weapons are just huge or cause terrible damage due to their weight or design. On a successful hit, add the result of the units die of the attack roll to any Damage caused by an Impact weapon. An <weaponqual>Undamaging</weaponqual> weapon can never also have Impact (Undamaging takes precedent)."
    },
    {
        "name": "Impale",
        "desc": "Impale weapons can kill with a single clean blow. Impale weapons cause a Critical Hit on any number divisible by 10 (i.e.: 10, 20, 30, etc.) as well as on doubles (i.e.: 11, 22, 33) rolled equal or under an appropriate Test in combat."
    },
    {
        "name": "Incendiary",
        "desc": "Incendiary weapons give every affected target <mono>1+SL</mono> <condition>Ablaze</condition> Conditions."
    },
    {
        "name": "Magical",
        "desc": "This weapon can harm creatures that are only susceptible to magical attacks."
    },
    {
        "name": "Penetrating",
        "desc": "The weapon is highly effective at penetrating armour. Non-metal APs are ignored, and the first point of all other armour is ignored."
    },
    {
        "name": "Pistol",
        "desc": "You can use this weapon to attack in Close Combat."
    },
    {
        "name": "Precise",
        "desc": "The weapon is easy to get on target. Gain a bonus of +1 SL to any successful Test when attacking with this weapon."
    },
    {
        "name": "Pummel",
        "desc": "Pummel weapons are especially good at battering foes into submission. If you score a Head hit with a Pummel weapon, attempt an Opposed Strength/Endurance test against the struck opponent. If you win the test, your opponent gains a <condition>Stunned</condition> Condition."
    },
    {
        "name": "Repeater (Rating)",
        "desc": "Your weapon holds <mono>(Rating)</mono> shots, automatically reloading after each time you fire. When you use all your shots, you must fully reload the weapon using the normal rules."
    },
    {
        "name": "Shield (Rating)",
        "desc": "If you use this weapon to oppose an incoming attack, you count as having <mono>(Rating)</mono> Armour Points on all locations of your body. If your weapon has a Shield Rating of 2 or higher (so: Shield 2 or Shield 3), you may also Oppose incoming missile shots in your Line of Sight."
    },
    {
        "name": "Trap-blade",
        "desc": "Some weapons are designed to trap other weapons, and sometimes even break them. If you score a Critical when defending against an attack from a bladed weapon you can choose to trap it instead of causing a Critical Hit. <br/><br/>If you choose to do this, enact an Opposed Strength Test, adding your SL from the previous Melee Test. If you succeed, your opponent drops the blade as it is yanked free. If you score an Astounding Success, you not only disarm your opponent, but the force of your maneuver breaks their blade unless it has the <weaponqual>Unbreakable</weaponqual> quality. If you fail the Test, your opponent frees the blade and may fight on as normal."
    },
    {
        "name": "Unbreakable",
        "desc": "The weapon is exquisitely well-made or constructed from an especially strong material. Under almost all circumstances, this weapon will not break, corrode, or lose its edge."
    },
    {
        "name": "Wrap",
        "desc": "Wrap weapons typically have long chains with weights at the end, making it very difficult to parry them effectively. <skill>Melee</skill> Tests opposing an attack from a Wrap weapon suffer a penalty of –1 SL, as parried strikes wrap over the top of shields, or around blades."
    },
    {
        "name": "Dangerous",
        "flaw": true,
        "desc": "Some weapons are almost as likely to hurt you as your opponent. Any failed test including an 9 on either 10s or units die results in a Fumble (see Chapter 5: Rules for more on Fumbles)."
    },
    {
        "name": "Imprecise",
        "flaw": true,
        "desc": "Imprecise weapons are difficult to bring to bear as they are unwieldy or hard to aim. Suffer a penalty of –1 SL when using the weapon to attack. An Imprecise Weapon can never be <weaponqual>Precise</weaponqual> (Imprecise takes precedent)."
    },
    {
        "name": "Lance",
        "flaw": true,
        "desc": "Lances count as Improvised Weapons if used on a round where you have not Charged."
    },
    {
        "name": "Reload (Rating)",
        "flaw": true,
        "desc": "The weapon is slow to reload. An unloaded weapon with this flaw requires an Extended <skill>Ranged</skill> Test for the appropriate Weapon Group scoring <mono>(Rating)</mono> SL to reload. If you are interrupted while reloading, you must start again from scratch."
    },
    {
        "name": "Slow",
        "flaw": true,
        "desc": "Slow weapons are unwieldy and heavy, making them difficult to use properly. Characters using Slow weapons always strike last in a Round, regardless of Initiative order. Further, opponents gain a bonus of +1 SL to any Test to defend against your attacks."
    },
    {
        "name": "Tiring",
        "flaw": true,
        "desc": "The weapon is fatiguing to use or difficult to bring to bear. You only gain the benefit of the <weaponqual>Impact</weaponqual> and <weaponqual>Damaging</weaponqual> Weapon Qualities on a Turn you Charge."
    },
    {
        "name": "Undamaging",
        "flaw": true,
        "desc": "Some weapons are not very good at penetrating armour. All APs are doubled against Undamaging weapons. Further, you do not automatically inflict a minimum of 1 Wound on a successful hit in combat."
    }
]

var weapon = [
    {
        "name": "",
        "group": "",
        "price": "",
        "enc": "",
        "avail": "",
        "reach": "",
        "damage": "",
        "qual": ""
    },
    {
        "name": "Hand Weapon",
        "group": "Basic",
        "price": "1GC",
        "enc": "1",
        "avail": "Common",
        "reach": "Average",
        "damage": "+SB+4",
        "qual": ""
    },
    {
        "name": "Improvised Weapon",
        "group": "Basic",
        "price": "N/A",
        "enc": "Varies",
        "avail": "N/A",
        "reach": "Varies",
        "damage": "+SB+1",
        "qual": "<weaponqual>Undamaging</weaponqual>"
    },
    {
        "name": "Dagger",
        "group": "Basic",
        "price": "16/&ndash;",
        "enc": "0",
        "avail": "Common",
        "reach": "Very Short",
        "damage": "+SB+2",
        "qual": ""
    },
    {
        "name": "Knife",
        "group": "Basic",
        "price": "8/&ndash;",
        "enc": "0",
        "avail": "Common",
        "reach": "Very Short",
        "damage": "+SB+1",
        "qual": "<weaponqual>Undamaging</weaponqual>"
    },
    {
        "name": "Shield (Buckler)",
        "group": "Basic",
        "price": "18/2",
        "enc": "0",
        "avail": "Common",
        "reach": "Personal",
        "damage": "+SB+1",
        "qual": "<weaponqual>Shield 1</weaponqual>, <weaponqual>Defensive</weaponqual>, <weaponqual>Undamaging</weaponqual>"
    },
    {
        "name": "Shield",
        "group": "Basic",
        "price": "2GC",
        "enc": "1",
        "avail": "Common",
        "reach": "Very Short",
        "damage": "+SB+2",
        "qual": "<weaponqual>Shield 2</weaponqual>, <weaponqual>Defensive</weaponqual>, <weaponqual>Undamaging</weaponqual>"
    },
    {
        "name": "Shield (Large)",
        "group": "Basic",
        "price": "3GC",
        "enc": "3",
        "avail": "Common",
        "reach": "Very Short",
        "damage": "+SB+3",
        "qual": "<weaponqual>Shield 3</weaponqual>, <weaponqual>Defensive</weaponqual>, <weaponqual>Undamaging</weaponqual>"
    },
    {
        "name": "Cavalry Hammer",
        "2h": "2h",
        "group": "Cavalry",
        "price": "3GC",
        "enc": "3",
        "avail": "Scarce",
        "reach": "Long",
        "damage": "+SB+5",
        "qual": "<weaponqual>Pummel</weaponqual>"
    },
    {
        "name": "Lance",
        "group": "Cavalry",
        "price": "1GC",
        "enc": "3",
        "avail": "Rare",
        "reach": "Very Long",
        "damage": "+SB+6",
        "qual": "<weaponqual>Impact</weaponqual>, <weaponqual>Impale</weaponqual>, <weaponqual>Lance</weaponqual>"
    },
    {
        "name": "Foil",
        "group": "Fencing",
        "price": "5GC",
        "enc": "1",
        "avail": "Scarce",
        "reach": "Medium",
        "damage": "+SB+3",
        "qual": "<weaponqual>Fast</weaponqual>, <weaponqual>Impale</weaponqual>, <weaponqual>Precise</weaponqual>, <weaponqual>Undamaging</weaponqual>"
    },
    {
        "name": "Rapier",
        "group": "Fencing",
        "price": "5GC",
        "enc": "1",
        "avail": "Scarce",
        "reach": "Long",
        "damage": "+SB+4",
        "qual": "<weaponqual>Fast</weaponqual>, <weaponqual>Impale</weaponqual>"
    },
    {
        "name": "Unarmed",
        "group": "Brawling",
        "price": "N/A",
        "enc": "0",
        "avail": "&ndash;",
        "reach": "Personal",
        "damage": "+SB+0",
        "qual": "<weaponqual>Undamaging</weaponqual>"
    },
    {
        "name": "Knuckledusters",
        "group": "Brawling",
        "price": "2/6",
        "enc": "0",
        "avail": "Common",
        "reach": "Personal",
        "damage": "+SB+2",
        "qual": ""
    },
    {
        "name": "Grain Flail",
        "group": "Flail",
        "price": "10/&ndash;",
        "enc": "1",
        "avail": "Common",
        "reach": "Average",
        "damage": "+SB+3",
        "qual": "<weaponqual>Distract</weaponqual>, <weaponqual>Imprecise</weaponqual>, <weaponqual>Wrap</weaponqual>"
    },
    {
        "name": "Flail",
        "group": "Flail",
        "price": "2GC",
        "enc": "1",
        "avail": "Scarce",
        "reach": "Average",
        "damage": "+SB+5",
        "qual": "<weaponqual>Distract</weaponqual>, <weaponqual>Wrap</weaponqual>"
    },
    {
        "name": "Military Flail",
        "2h": "2h",
        "group": "Flail",
        "price": "3GC",
        "enc": "2",
        "avail": "Rare",
        "reach": "Long",
        "damage": "+SB+6",
        "qual": "<weaponqual>Distract</weaponqual>, <weaponqual>Impact</weaponqual>, <weaponqual>Tiring</weaponqual>, <weaponqual>Wrap</weaponqual>"
    },
    {
        "name": "Main Gauche",
        "group": "Parry",
        "price": "1GC",
        "enc": "0",
        "avail": "Rare",
        "reach": "Very Short",
        "damage": "+SB+2",
        "qual": "<weaponqual>Defensive</weaponqual>"
    },
    {
        "name": "Swordbreaker",
        "group": "Parry",
        "price": "1GC 2/6",
        "enc": "1",
        "avail": "Scarce",
        "reach": "Short",
        "damage": "+SB+3",
        "qual": "<weaponqual>Defensive</weaponqual>, <weaponqual>Trap-blade</weaponqual>"
    },
    {
        "name": "Halberd",
        "2h": "2h",
        "group": "Polearm",
        "price": "2GC",
        "enc": "3",
        "avail": "Common",
        "reach": "Long",
        "damage": "+SB+4",
        "qual": "<weaponqual>Defensive</weaponqual>, <weaponqual>Hack</weaponqual>, <weaponqual>Impale</weaponqual>"
    },
    {
        "name": "Spear",
        "2h": "2h",
        "group": "Polearm",
        "price": "15/&ndash;",
        "enc": "2",
        "avail": "Common",
        "reach": "Very Long",
        "damage": "+SB+4",
        "qual": "<weaponqual>Impale</weaponqual>"
    },
    {
        "name": "Pike",
        "2h": "2h",
        "group": "Polearm",
        "price": "18/&ndash;",
        "enc": "4",
        "avail": "Rare",
        "reach": "Massive",
        "damage": "+SB+4",
        "qual": "<weaponqual>Impale</weaponqual>"
    },
    {
        "name": "Quarter Staff",
        "2h": "2h",
        "group": "Polearm",
        "price": "3/&ndash;",
        "enc": "2",
        "avail": "Common",
        "reach": "Long",
        "damage": "+SB+4",
        "qual": "<weaponqual>Defensive</weaponqual>, <weaponqual>Pummel</weaponqual>"
    },
    {
        "name": "Bastard Sword",
        "2h": "2h",
        "group": "Two-Handed",
        "price": "8GC",
        "enc": "3",
        "avail": "Scarce",
        "reach": "Long",
        "damage": "+SB+5",
        "qual": "<weaponqual>Damaging</weaponqual>, <weaponqual>Defensive</weaponqual>"
    },
    {
        "name": "Great Axe",
        "2h": "2h",
        "group": "Two-Handed",
        "price": "4GC",
        "enc": "3",
        "avail": "Scarce",
        "reach": "Long",
        "damage": "+SB+6",
        "qual": "<weaponqual>Hack</weaponqual>, <weaponqual>Impact</weaponqual>, <weaponqual>Tiring</weaponqual>"
    },
    {
        "name": "Great Axe",
        "2h": "2h",
        "group": "Two-Handed",
        "price": "4GC",
        "enc": "3",
        "avail": "Scarce",
        "reach": "Long",
        "damage": "+SB+6",
        "qual": "<weaponqual>Hack</weaponqual>, <weaponqual>Impact</weaponqual>, <weaponqual>Tiring</weaponqual>"
    },
    {
        "name": "Pick",
        "2h": "2h",
        "group": "Two-Handed",
        "price": "9/&ndash;",
        "enc": "3",
        "avail": "Common",
        "reach": "Average",
        "damage": "+SB+5",
        "qual": "<weaponqual>Damaging</weaponqual>, <weaponqual>Impale</weaponqual>, <weaponqual>Slow</weaponqual>"
    },
    {
        "name": "Warhammer",
        "2h": "2h",
        "group": "Two-Handed",
        "price": "3GC",
        "enc": "3",
        "avail": "Common",
        "reach": "Average",
        "damage": "+SB+6",
        "qual": "<weaponqual>Damaging</weaponqual>, <weaponqual>Pummel</weaponqual>, <weaponqual>Slow</weaponqual>"
    },
    {
        "name": "Zweihänder",
        "2h": "2h",
        "group": "Two-Handed",
        "price": "10GC",
        "enc": "3",
        "avail": "Scarce",
        "reach": "Long",
        "damage": "+SB+5",
        "qual": "<weaponqual>Damaging</weaponqual>, <weaponqual>Hack</weaponqual>"
    },
    {
        "name": "Blunderbuss",
        "2h": "2h",
        "group": "Blackpowder",
        "price": "2GC",
        "enc": "1",
        "avail": "Scarce",
        "reach": "20",
        "damage": "+8",
        "qual": "<weaponqual>Blackpowder</weaponqual>, <weaponqual>Blast 3</weaponqual>, <weaponqual>Dangerous</weaponqual>, <weaponqual>Reload 2</weaponqual>"
    },
    {
        "name": "Hochland Long Rifle",
        "2h": "2h",
        "group": "Blackpowder",
        "price": "100GC",
        "enc": "3",
        "avail": "Exotic",
        "reach": "100",
        "damage": "+9",
        "qual": "<weaponqual>Accurate</weaponqual>, <weaponqual>Blackpowder</weaponqual>, <weaponqual>Precise</weaponqual>, <weaponqual>Reload 4</weaponqual>"
    },
    {
        "name": "Handgun",
        "2h": "2h",
        "group": "Blackpowder",
        "price": "4GC",
        "enc": "2",
        "avail": "Scarce",
        "reach": "50",
        "damage": "+9",
        "qual": "<weaponqual>Blackpowder</weaponqual>, <weaponqual>Dangerous</weaponqual>, <weaponqual>Reload 3</weaponqual>"
    },
    {
        "name": "Pistol",
        "group": "Blackpowder",
        "price": "8GC",
        "enc": "0",
        "avail": "Rare",
        "reach": "20",
        "damage": "+8",
        "qual": "<weaponqual>Blackpowder</weaponqual>, <weaponqual>Pistol</weaponqual>, <weaponqual>Reload 1</weaponqual>"
    },
    {
        "name": "Elf Bow",
        "2h": "2h",
        "group": "Bow",
        "price": "10GC",
        "enc": "2",
        "avail": "Exotic",
        "reach": "150",
        "damage": "+SB+4",
        "qual": "<weaponqual>Damaging</weaponqual>, <weaponqual>Precise</weaponqual>"
    },
    {
        "name": "Longbow",
        "2h": "2h",
        "group": "Bow",
        "price": "5GC",
        "enc": "3",
        "avail": "Scarce",
        "reach": "100",
        "damage": "+SB+4",
        "qual": "<weaponqual>Damaging</weaponqual>"
    },
    {
        "name": "Bow",
        "2h": "2h",
        "group": "Bow",
        "price": "4GC",
        "enc": "2",
        "avail": "Common",
        "reach": "50",
        "damage": "+SB+3",
        "qual": ""
    },
    {
        "name": "Shortbow",
        "2h": "2h",
        "group": "Bow",
        "price": "3GC",
        "enc": "1",
        "avail": "Common",
        "reach": "20",
        "damage": "+SB+2",
        "qual": ""
    },
    {
        "name": "Crossbow Pistol",
        "group": "Crossbow",
        "price": "6GC",
        "enc": "0",
        "avail": "Scarce",
        "reach": "10",
        "damage": "+7",
        "qual": "<weaponqual>Pistol</weaponqual>"
    },
    {
        "name": "Heavy Crossbow",
        "2h": "2h",
        "group": "Crossbow",
        "price": "7GC",
        "enc": "3",
        "avail": "Rare",
        "reach": "100",
        "damage": "+9",
        "qual": "<weaponqual>Damaging</weaponqual>, <weaponqual>Reload 2</weaponqual>"
    },
    {
        "name": "Crossbow",
        "2h": "2h",
        "group": "Crossbow",
        "price": "5GC",
        "enc": "2",
        "avail": "Common",
        "reach": "60",
        "damage": "+9",
        "qual": "<weaponqual>Reload 1</weaponqual>"
    },
    {
        "name": "Repeater Handgun",
        "2h": "2h",
        "group": "Engineering",
        "price": "10GC",
        "enc": "3",
        "avail": "Rare",
        "reach": "30",
        "damage": "+9",
        "qual": "<weaponqual>Dangerous</weaponqual>, <weaponqual>Engineering</weaponqual>, <weaponqual>Reload 5</weaponqual>, <weaponqual>Repeater 4</weaponqual>"
    },
    {
        "name": "Repeater Pistol",
        "group": "Engineering",
        "price": "15GC",
        "enc": "1",
        "avail": "Rare",
        "reach": "10",
        "damage": "+8",
        "qual": "<weaponqual>Dangerous</weaponqual>, <weaponqual>Engineering</weaponqual>, <weaponqual>Pistol</weaponqual>, <weaponqual>Reload 4</weaponqual>, <weaponqual>Repeater 4</weaponqual>"
    },
    {
        "name": "Lasso",
        "group": "Entangling",
        "price": "6/&ndash;",
        "enc": "0",
        "avail": "Common",
        "reach": "SB&times;2",
        "damage": "&ndash;",
        "qual": "<weaponqual>Entangle</weaponqual>"
    },
    {
        "name": "Whip",
        "group": "Entangling",
        "price": "5/&ndash;",
        "enc": "0",
        "avail": "Common",
        "reach": "6",
        "damage": "+SB+2",
        "qual": "<weaponqual>Entangle</weaponqual>"
    },
    {
        "name": "Bomb",
        "group": "Explosives",
        "price": "3GC",
        "enc": "0",
        "avail": "Rare",
        "reach": "SB",
        "damage": "+12",
        "qual": "<weaponqual>Blast 5</weaponqual>, <weaponqual>Dangerous</weaponqual>, <weaponqual>Explosive</weaponqual>, <weaponqual>Impact</weaponqual>"
    },
    {
        "name": "Incendiary",
        "group": "Explosives",
        "price": "1GC",
        "enc": "0",
        "avail": "Scarce",
        "reach": "SB",
        "damage": "<weaponqual>Incendiary</weaponqual>",
        "qual": "<weaponqual>Blast 4</weaponqual>, <weaponqual>Dangerous</weaponqual>"
    },
    {
        "name": "Sling",
        "group": "Sling",
        "price": "1/&ndash;",
        "enc": "0",
        "avail": "Common",
        "reach": "60",
        "damage": "+6",
        "qual": ""
    },
    {
        "name": "Staff Sling",
        "2h": "2h",
        "group": "Sling",
        "price": "4/&ndash;",
        "enc": "2",
        "avail": "Scarce",
        "reach": "100",
        "damage": "+7",
        "qual": ""
    },
    {
        "name": "Bolas",
        "group": "Throwing",
        "price": "10/&ndash;",
        "enc": "0",
        "avail": "Rare",
        "reach": "SB&times;3",
        "damage": "+SB",
        "qual": "<weaponqual>Entangle</weaponqual>"
    },
    {
        "name": "Dart",
        "group": "Throwing",
        "price": "2/&ndash;",
        "enc": "0",
        "avail": "Scarce",
        "reach": "SB&times;2",
        "damage": "+SB+1",
        "qual": "<weaponqual>Impale</weaponqual>"
    },
    {
        "name": "Javelin",
        "group": "Throwing",
        "price": "10/6",
        "enc": "1",
        "avail": "Scarce",
        "reach": "SB&times;3",
        "damage": "+SB+3",
        "qual": "<weaponqual>Impale</weaponqual>"
    },
    {
        "name": "Rock",
        "group": "Throwing",
        "price": "&ndash;",
        "enc": "0",
        "avail": "Common",
        "reach": "SB&times;3",
        "damage": "+SB",
        "qual": ""
    },
    {
        "name": "Throwing Axe",
        "group": "Throwing",
        "price": "1GC",
        "enc": "1",
        "avail": "Common",
        "reach": "SB&times;2",
        "damage": "+SB+3",
        "qual": "<weaponqual>Hack</weaponqual>"
    },
    {
        "name": "Throwing Knife",
        "group": "Throwing",
        "price": "18/&ndash;",
        "enc": "0",
        "avail": "Common",
        "reach": "SB&times;2",
        "damage": "+SB+2",
        "qual": ""
    },
    {
        "name": "Bullet and Powder (12)",
        "group": "Blackpowder &amp; Engineering Ammunition",
        "price": "3/3",
        "enc": "0",
        "avail": "Common",
        "reach": "As weapon",
        "damage": "+1",
        "qual": "<weaponqual>Impale</weaponqual>, <weaponqual>Penetrating</weaponqual>"
    },
    {
        "name": "Improvised Shot and Powder",
        "group": "Blackpowder &amp; Engineering Ammunition",
        "price": "3d",
        "enc": "0",
        "avail": "Common",
        "reach": "Half weapon",
        "damage": "&ndash;",
        "qual": ""
    },
    {
        "name": "Small Shot &amp; Powder",
        "group": "Blackpowder &amp; Engineering Ammunition",
        "price": "3/3",
        "enc": "0",
        "avail": "Common",
        "reach": "As weapon",
        "damage": "&ndash;",
        "qual": "<weaponqual>Blast +1</weaponqual>"
    },
    {
        "name": "Arrow (12)",
        "group": "Bow Ammunition",
        "price": "5/&ndash;",
        "enc": "0",
        "avail": "Common",
        "reach": "As weapon",
        "damage": "&ndash;",
        "qual": "<weaponqual>Impale</weaponqual>"
    },
    {
        "name": "Elf Arrow",
        "group": "Bow Ammunition",
        "price": "6/&ndash;",
        "enc": "0",
        "avail": "Exotic",
        "reach": "+50",
        "damage": "+1",
        "qual": "<weaponqual>Accurate</weaponqual>, <weaponqual>Impale</weaponqual>, <weaponqual>Penetrating</weaponqual>"
    },
    {
        "name": "Bolt (12)",
        "group": "Crossbow Ammunition",
        "price": "5/&ndash;",
        "enc": "0",
        "avail": "Common",
        "reach": "As weapon",
        "damage": "&ndash;",
        "qual": "<weaponqual>Impale</weaponqual>"
    },
    {
        "name": "Lead Bullet (12)",
        "group": "Sling Ammunition",
        "price": "4d",
        "enc": "0",
        "avail": "Common",
        "reach": "-10",
        "damage": "+1",
        "qual": "<weaponqual>Pummel</weaponqual>"
    },
    {
        "name": "Stone Bullet (12)",
        "group": "Sling Ammunition",
        "price": "2d",
        "enc": "0",
        "avail": "Common",
        "reach": "As weapon",
        "damage": "&ndash;",
        "qual": "<weaponqual>Pummel</weaponqual>"
    }
]

var trait = [
    {
        "name": "",
        "desc": ""
    },
    {
        "name": "Afraid (Target)",
        "desc": "<p>The creature gains <trait>Fear (0)</trait> to the target. See page 190 for Fear rules.</p>"
    },
    {
        "name": "Amphibious",
        "desc": "<p>The creature is at home in water. It can add its Agility Bonus to the SL of all <skill>Swim</skill> Tests and move at full Movement through water.</p>"
    },
    {
        "name": "Arboreal",
        "desc": "<p>The creature is at home in the forests. In the woodlands, it adds its Agility Bonus to the SL of all <skill>Climb</skill> and <skill>Stealth</skill> Tests.</p>"
    },
    {
        "name": "Animosity (Target)",
        "desc": "<p>You harbour an enmity for the Target, which will normally be a group of people or creatures, such as ‘Nordlanders’, ‘Beastmen’, or ‘Nobles’. You must attempt a Psychology Test whenever you encounter the group. If you pass, you may grumble and spit, but only suffer a penalty of –20 to all Fellowship Tests towards that group. Should you fail you are subject to Animosity.</p><p>At the end of every subsequent Round, you may attempt another Psychology test to bring the Animosity to an end. If you do not, the effects of Animosity naturally come to an end when all members of the specified group in your line of sight are utterly pacified or gone, or you gain the <condition>Stunned</condition> or <condition>Unconscious</condition> Condition, or you become subject to another Psychology.</p><p>When subject to Animosity , you must immediately attack the disagreeable creatures, either socially (insults, jibes, and similar) or physically (most commonly with fists), as appropriate. You also gain a bonus of +1 SL on any attempts to socially or mentally attack the group. Animosity is over-ridden by <trait>Fear</trait> and <trait>Terror</trait>.</p>"
    },
    {
        "name": "Armour (Rating)",
        "desc": "<p>The creature is protected by armour or thick hide.  It has <mono>Rating</mono> Armour Points on all Hit Locations. </p>"
    },
    {
        "name": "Belligerent",
        "desc": "<p>The creature loves to win a fight. As long as it has more Advantage than its opponent, it is Immune to Psychology.</p>"
    },
    {
        "name": "Bestial",
        "desc": "<p>The creature has no rational thought or language. It shies away from fire and gains a <condition>Broken</condition> Condition if struck by it. In defence, it only uses the <skill>Dodge</skill> Skill. If it loses more than half its Wounds, it will attempt to Flee unless protecting its young or cornered, or unless it has the <trait>Territorial</trait> Trait. If so, it enters Frenzy (see page 190). Bestial creatures have no Fellowship characteristic.</p>"
    },
    {
        "name": "Big",
        "desc": "<p>The creature is a large example of its species. It receives +10 Strength and Toughness, and –5 Agility.</p>"
    },
    {
        "name": "Bite (Rating)",
        "desc": "<p>On its turn, the creature may make a Free Attack by spending 1 Advantage. The Damage of the attack equals <mono>Rating</mono> and includes the creature’s Strength Bonus already.</p>"
    },
    {
        "name": "Blessed (Various)",
        "desc": "<p>The creature is Blessed and can enact Blessings; the relevant deity is indicated in brackets. </p>"
    },
    {
        "name": "Bounce",
        "desc": "<p>The creature can bounce high, perhaps with powerful limbs, magic, or stubby wings. When Charging or Running, it doubles its Movement Characteristic, and can ignore all intervening terrain and characters as it leap over them.</p>"
    },
    {
        "name": "Breath (Rating) [Type]",
        "desc": "<p>The creature’s breath is a powerful weapon. On its turn, for the cost of 2 Advantage, it can activate its Breath as a Free Attack.</p><p>Choose 1 target it can see within 20+Toughness Bonus yards. All characters within Strength Bonus yards of that target are struck, as are all characters between the creature and the target. Perform an <strong>Opposed <skill>Ballistic Skill</skill>/<skill>Dodge</skill> Test</strong> against all affected targets (the creature’s single roll opposed by each individual target).</p><p>All targets that fail take Damage equal to the attack’s <mono>Rating</mono>. Further, if the Trait is marked with any of the following types in brackets, apply the associated rules.</p><p><ul><li><b>Cold: </b>Targets gain a <condition>Stunned</condition> Condition for every full 5 Wounds suffered (minimum of 1).</li><li><b>Corrosion:</b> All Armour and Weapons carried by affected targets suffer 1 Damage.</li><li><b>Fire: </b>Any Wounds caused ignore Armour Points. Targets gain an <condition>Ablaze</condition> Condition.</li><li><b>Electricity:</b> Any Wounds caused ignore Armour Points. Targets gain a <condition>Stunned</condition> Condition.</li><li><b>Poison: </b>Any Wounds caused ignore Armour Points. Targets gain a <condition>Poisoned</condition> Condition.</li><li><b>Smoke: </b>The area fills with smoke, blocking Line of Sight for Toughness Bonus Rounds.</li></ul></p><p>The creature is immune to its own Breath. This attack is <weaponqual>Magical</weaponqual>.</p>"
    },
    {
        "name": "Brute",
        "desc": "<p>The creature is heavy and brutish. It receives –1 Movement, –10 Agility, and +10  Strength and Toughness.</p>"
    },
    {
        "name": "Champion",
        "desc": "<p>The creature is an extraordinarily skilled warrior. If it wins an Opposed Test when defending in melee combat, it can cause Damage just as if it was the attacker. </p>"
    },
    {
        "name": "Chill Grasp",
        "desc": "<p>The creature’s touch chills its enemy’s souls. For the cost of 2 Advantage and its Action, it can attempt an <b>Opposed Weapon Skill/<skill>Melee</skill> or <skill>Dodge</skill> Test</b>. If it wins, its target loses <mono>1d10 + SL</mono> Wounds with no modification for Toughness Bonus or Armour Points. This attack is <weaponqual>Magical</weaponqual>.</p>"
    },
    {
        "name": "Clever",
        "desc": "<p>The creature is particularly sharp-minded. It receives +20 Intelligence and +10 Initiative.</p>"
    },
    {
        "name": "Cold-Blooded",
        "desc": "<p>The creature is cold-blooded and slow to react. It can reverse all failed Willpower Tests.</p>"
    },
    {
        "name": "Constrictor",
        "desc": "<p>The creature can squeeze and crush its prey. Any successful roll to hit gives the target an <condition>Entangled</condition> Condition. The creature may then enter a Grapple if it wishes. See page 163.</p>"
    },
    {
        "name": "Construct",
        "desc": "<p>The creature is a construct of magic, quite mindless, bound together with magical sinews. It has no Intelligence, Willpower, or Fellowship Characteristics, and need never Test them. If it has no wizard controlling it, or does not possess the <trait>Territorial</trait> Trait, it meanders mindlessly, following flows of ambient magic.</p><p>For the purposes of calculating its Wounds, it uses its Strength Bonus whenever Willpower Bonus is required. All its attacks are <weaponqual>Magical</weaponqual>.</p>"
    },
    {
        "name": "Corrosive Blood",
        "desc": "<p>The creature’s blood is corrosive. Every time its is Wounded, blood splashes free, and all targets <condition>Engaged</condition> with it take 1d10 Wounds modified by Toughness Bonus and Armour Points, to a minimum of 1.</p>"
    },
    {
        "name": "Corruption (Strength)",
        "desc": "<p>The creature is tainted by Chaos, or perhaps suffused with Dark Magics. The Strength of the Corruption is marked in brackets &mdash; Minor, Moderate, or Major. See page 182.</p>"
    },
    {
        "name": "Cunning",
        "desc": "<p>The creature is exceptionally cunning. It receives +10 Fellowship, Intelligence, and Initiative.</p>"
    },
    {
        "name": "Dark Vision",
        "desc": "<p>The creature can see in the dark as daylight.</p>"
    },
    {
        "name": "Daemonic (Target)",
        "desc": "<p>The creature’s essence is raw magic, and unholy ichor pumps through what passes for its veins. Daemonic creatures do not require the normal prerequisites for life: food, water, air…</p><p>All its attacks are <weaponqual>Magical</weaponqual>. Roll 1d10 after any blow is received; if the creature rolls the <mono>Target</mono> number or higher, the blow is ignored, even if it is a critical. Should the creature be reduced to 0 Wounds, its soul returns to the Realms of Chaos immediately, removing it from play.</p>"
    },
    {
        "name": "Die Hard",
        "desc": "<p>No matter how hard the creature is hit, it gets back up. All Critical Wounds not resulting in death can be healed; just attach the requisite body parts to the correct places, perhaps with staples or large spikes to hold them in place, and it’s good to go. Even ‘death’ may be ‘healed’ if the appropriate parts, such as a lost head, are attached to the body. If death occurs and all parts are in place, it may attempt a <test>Challenging (+0) Endurance Test</test> requiring an SL of 6 at the start of every round for Toughness Bonus Rounds after death. If a Test is successful, the creature chokes back to life with 1 Wound.</p>"
    },
    {
        "name": "Disease (Type)",
        "desc": "<p>The creature carries the disease listed. Others will have to Test as appropriate for Contraction. See page 186.</p>"
    },
    {
        "name": "Distracting",
        "desc": "<p>The creature distracts or confuse foes, possibly exuding a soporific musk or nauseating reek, or maybe its appearance is bizarrely horrifying. All living targets within a number of yards equal to its Toughness Bonus suffer a penalty of –20 to all Tests. A target can only suffer this penalty once, no matter how many Distracting foes there are.</p>"
    },
    {
        "name": "Elite",
        "desc": "<p>The creature is a hard-nosed veteran. It receives +20 to Weapon Skill, Ballistic Skill, and Willpower.</p>"
    },
    {
        "name": "Ethereal",
        "desc": "<p>The creature’s form is insubstantial, allowing it to pass through solid objects. It can only be harmed by <weaponqual>Magical</weaponqual> attacks.</p>"
    },
    {
        "name": "Fast",
        "desc": "<p>The creature moves unexpectedly fast. It receives +1 Movement and +10 Agility.</p>"
    },
    {
        "name": "Fear (Rating)",
        "desc": "<p>The creature causes supernatural Fear in other creatures, with a rating equal to its <mono>Rating</mono>.</p><p>The Fear trait represents an extreme aversion to something. Creatures that cause Fear have a <mono>Fear Rating</mono>; this value reflects the SL you are required to pass on an Extended <skill>Cool</skill> Test to overcome your Fear. You may continue to Test at the end of every round until your SL equals or surpasses the creature’s Fear rating. Until you do this, you are subject to Fear.</p><p>When subject to Fear, you suffer –1 SL on all Tests to affect the source of your fear. You may not move closer to whatever is causing Fear without passing a <test>Challenging (+0) Cool Test</test>. If it comes closer to you, you must pass a <test>Challenging (+0) Cool Test</test>, or gain a <condition>Broken</condition> Condition.</p>"
    },
    {
        "name": "Flight (Rating)",
        "desc": "<p>As the creature’s Move, it can fly up to <mono>Rating</mono> yards. When flying, it ignores all intervening terrain, obstacles, or characters. At the end of the move, it decides whether it has landed or is still flying. It can use this move to Charge. If it starts its turn flying, it must choose to Fly for its Move. If it cannot do this, the GM decides how far the creature falls (see page 166).</p><p>When targeting it, measure horizontal distance as normal, then increase range by 1 step. So, a Long Range shot would become Extreme Range, and if it was at Extreme Range it could not be shot at all.</p><p>When flying, it suffers a penalty of –20 to all ranged combat attempts as it swoops and wheels in the sky.</p>"
    },
    {
        "name": "Frenzy",
        "desc": "<p>The creature can Frenzy.</p><p>With a Willpower Test, you can work yourself into a state of frenzy by psyching yourself up, howling, biting your shield, or similar.  If you succeed, you become subject to Frenzy.</p><p>While subject to Frenzy you are immune to all other psychology, and will not flee or retreat for any reason; indeed you must always move at full rate towards the closest enemy you can see in order to attack. Generally, the only Action you may take is a <skill>Weapon Skill</skill> Test or an <skill>Athletics</skill> Test to reach an enemy more quickly. Further, you may take a Free Action <skill>Melee</skill> Test each Round as you are throwing everything you have into your attacks. Lastly, you gain a bonus of +1 Strength Bonus, such is your ferocity. You remain in Frenzy until all enemies in your line of sight are pacified, or you receive the <condition>Stunned</condition> or <condition>Unconscious</condition> condition. After your Frenzy is over you immediately receive a <condition>Fatigued</condition> condition. </p>"
    },
    {
        "name": "Fury",
        "desc": "<p>The creature can work itself into an all-consuming rage. It can spend all of its Advantage (minimum of 1) to become subject to Hatred to close combat opponents. If the creature has at least 3 Advantage, it may instead expend all of its Advantage to become subject to <trait>Frenzy</trait>. See page 190.</p>"
    },
    {
        "name": "Ghostly Howl",
        "desc": "<p>The creature can emit a chilling howl, capable of killing those who hear it. On its turn the creature can spend all its Advantage (minimum of 2), to unleash a hideous scream as a Free Attack.</p><p>All living targets within a number of yards equal to the creature’s Initiative immediately gain 3 <condition>Deafened</condition> Conditions and suffer 1d10 Wounds ignoring Toughness Bonus and Armour Points. Those affected must also pass a <test>Average (+20) Endurance Test</test> or gain a <condition>Broken</condition> Condition. </p>"
    },
    {
        "name": "Hardy",
        "desc": "<p>The creature can sustain more damage than most. Increase its Wounds by a number equal to its Toughness Bonus (applied before any Size modifiers).</p>"
    },
    {
        "name": "Hatred (Target)",
        "desc": "<p>The creature really hates the Target.</p><p>You are consumed with Hatred for the Target, which is normally a group of people or creatures, such as ‘Hochlanders’, ‘Bog Octopuses’, or ‘Slavers’. You will never socially interact with someone or something you hate in this manner. On encountering the object of your Hatred, you must attempt a Psychology Test. If failed, you are subject to Hatred. At the end of every subsequent Round, you may attempt another Psychology Test to bring the Hatred to an end. If you do or not, the effects of Hatred naturally come to an end when all members of the specified group in your line of sight are dead or gone, or you gain the <condition>Unconscious</condition> condition. While subject to Hatred, you must immediately attempt to destroy the hated group by the fastest and most deadly means possible. You gain a bonus of +1 SL on all combat Tests against the specified group, and are immune to <trait>Fear</trait> and <skill>Intimidate</skill> (but not <trait>Terror</trait>) caused by your hated foe. </p>"
    },
    {
        "name": "Horns (Rating) [Feature]",
        "desc": "<p>The creature has horns or some other sharp appendage (if its Horns Trait represents a different feature it will be noted in brackets). When the creature gains an Advantage for Charging, it may make a Free Attack with its Horns, performed as normal, using <mono>Rating</mono> to calculate Damage (its Strength Bonus is already included).</p>"
    },
    {
        "name": "Hungry",
        "desc": "<p>The creature is always hungry for fresh meat. If it kills or incapacitates a living opponent (or encounters a fresh body), it must pass an <strong>Average (+20) Willpower Test</strong> or feast, losing its next Action and Move.</p>"
    },
    {
        "name": "Immunity (Type)",
        "desc": "<p>The creature is completely immune to a certain type of Damage, such as poison, magic, or electricity. All Damage of that type, including from a Critical Wound, is ignored.</p>"
    },
    {
        "name": "Immunity to Psychology",
        "desc": "<p>Whether brave, exceedingly stupid, or just caught up in the moment, the creature is utterly fearless. It ignores the Psychology rules. See page 190.</p>"
    },
    {
        "name": "Infected",
        "desc": "<p>The creature, or its weapon, carries a nasty infection. If it causes a living opponent to lose Wounds, it must pass an <test>Easy (+40) Endurance Test</test> or contract a Festering Wound (see page 187).</p>"
    },
    {
        "name": "Infestation",
        "desc": "<p>The creature’s hide is infested with biting fleas or similar. All opponents suffer a penalty of –10 to hit it in melee combat as the parasites distract and overwhelm them.</p>"
    },
    {
        "name": "Leader",
        "desc": "<p>The creature is a practiced leader. It receives a bonus of +10 to Fellowship and Willpower. Note: this Trait cannot be taken by creatures with the <trait>Bestial</trait> Trait.</p>"
    },
    {
        "name": "Magical",
        "desc": "<p>The creature is wreathed in magic. All its attacks count as Magical, meaning it can harm creatures only susceptible to magical attacks.</p>"
    },
    {
        "name": "Magic Resistance (Rating)",
        "desc": "<p>Magic has a reduced effect on the creature. The SL of any spell affecting it is reduced by the <mono>Rating</mono> given. So, Magic Resistance 2 would reduce the SL by 2.</p>"
    },
    {
        "name": "Mental Corruption",
        "desc": "<p>The creature has Chaos on the mind. Roll on the Mental Corruption Table found on page 185.</p>"
    },
    {
        "name": "Miracles (Various)",
        "desc": "<p>The creature can enact Miracles; the relevant deity is indicated in brackets. </p>"
    },
    {
        "name": "Mutation",
        "desc": "<p>The creature is ‘blessed’ with a Mutation. Roll on the Physical Corruption Table found on page 184.</p>"
    },
    {
        "name": "Night Vision",
        "desc": "<p>The creature has the <talent>Night Vision</talent> Talent.</p>"
    },
    {
        "name": "Painless",
        "desc": "<p>The creature feels no pain or can ignore it. All non-amputation penalties suffered from Critical Wounds are ignored, although Conditions are suffered as normal.</p>"
    },
    {
        "name": "Petrifying Gaze",
        "desc": "<p>The creature’s gaze can turn flesh to stone. For its Action, it can spend all its Advantage to unleash its gaze (minimum of 1). The creature performs an Opposed <skill>Ballistic Skill</skill>/Initiative Test, adding 1 SL per Advantage spent. Its opponent gains 1 <condition>Stunned</condition> status per 2 SL by which it wins. If it wins by at least 6 SL, its target is permanently turned to stone.</p><p>If the target is a spellcaster, the test can be Opposed with <skill>Language (Magick)</skill> instead of Initiative as counter spells are cast.</p>"
    },
    {
        "name": "Prejudice (Target)",
        "desc": "<p>The creature just doesn’t like the Target.</p><p>You really dislike the Target , which is normally a group of people or creatures such as ‘Ostlanders’, ‘Elves’, or ‘Wizards’. You must attempt a Psychology Test whenever you encounter the group against which you are prejudiced. If you pass, you may frown a lot, but will otherwise act normally, only suffering a penalty of –10 to all Fellowship Tests towards that group. Should you fail you are subject to Prejudice . At the end of every subsequent Round, you may attempt another Psychology test to bring the Prejudice to an end. If you do not, the effects of Prejudice naturally come to an end when all members of the specified group in your line of sight are gone, or you gain the Stunned or Unconscious Condition, or you become subject to another Psychology.</p><p>When subject to Prejudice , you must immediately insult the target of your prejudice. Loudly.</p>"
    },
    {
        "name": "Ranged (Rating) [Range]",
        "desc": "<p>The creature has a ranged weapon. The weapon does Damage equal to the <mono>Rating</mono> and the range in yards is marked in brackets.</p>"
    },
    {
        "name": "Rear",
        "desc": "<p>For its Move, the creature may make a Stomp attack if it is larger than its opponent (see Size).</p>"
    },
    {
        "name": "Regenerate",
        "desc": "<p>The creature is capable of healing at an extraordinary rate, even regrowing severed parts. At the start of each round, if it has more than 0 Wounds remaining, it will automatically regenerate 1d10 Wounds. If it has 0 Wounds remaining, it will regenerate a single Wound on a 1d10 roll of 8+. If it ever rolls a 10 for regenerating, it also fully regenerates a Critical Wound, losing all penalties and Conditions associated with it. Any Critical Wounds or Wounds caused by Fire may not be regenerated and should be recorded separately.</p>"
    },
    {
        "name": "Size (Various)",
        "desc": "<p>This trait represents creatures whose size differ from the game standard (i.e. roughly human sized). There are seven steps of Size, ranging from Tiny to Monstrous.</p><p><h5>Size Combat Modifiers</h5><strong>If larger:</strong><li>Its weapons gain the <weaponqual>Damaging</weaponqual> Quality if the creature is one step larger, and <weaponqual>Impact</weaponqual> if two or more steps larger.</li><li>It multiplies any Damage caused by the number of steps larger it is (so, 2 steps = &times;2, 3 steps = &times;3, and so on); this multiplication is calculated after all modifiers are applied.</li><li>All successful strikes against smaller targets activate the Deathblow rule, even if the target survives (see page 160).</li><br/><br/><strong>If smaller:</strong><li>It gains a bonus of +10 to hit.</li></p>"
    },
    {
        "name": "Size (Various)",
        "desc": "<p>This trait represents creatures whose size differ from the game standard (i.e. roughly human sized). There are seven steps of Size, ranging from Tiny to Monstrous.</p><p>See page 341 for full rules surrounding disparate sizes.</p>"
    },
    {
        "name": "Skittish",
        "desc": "<p>The creature is easily scared by magic or loud noises. If such occurs, it receives +3 <condition>Broken</condition> Conditions.</p>"
    },
    {
        "name": "Spellcaster (Various)",
        "desc": "<p>The creature can cast spells; the specific Lore of Magic will be indicated in brackets. </p>"
    },
    {
        "name": "Stealthy",
        "desc": "<p>The creature is especially stealthy. It adds a number equal to its Agility Bonus to the SL of all <skill>Stealth</skill> Tests.</p>"
    },
    {
        "name": "Stride",
        "desc": "<p>The creature has a long stride, perhaps because it is a quadruped or has especially long legs. Multiply Run Movement by 1.5 when Running.</p>"
    },
    {
        "name": "Stupid",
        "desc": "<p>While not entirely devoid of self-awareness (and so lacking the <trait>Bestial</trait> trait), the creature is stupid. If it is near any allies without the Stupid Trait, they guide it and nothing happens. Otherwise, it must pass an <strong>Easy (+40) Intelligence Test</strong> at the start of each round, or become very confused. Should this occur it will drool, perhaps sitting down or picking its nose, doing little of use, losing both its Move and Action for that Turn.</p>"
    },
    {
        "name": "Swamp-strider",
        "desc": "<p>The creature is at home in a swamp. It suffers no Movement penalties for moving through boggy ground.</p>"
    },
    {
        "name": "Swarm",
        "desc": "<p>Swarms are large numbers of the same creature acting as one. The swarm counts as a single Creature that ignores the Psychology rules (see page 190), and can ignore the Engaged rules when using its Move. If the Swarm successfully strikes an opponent it activates the Deathblow rule (even if it has not killed its opponent — see page 160). All opponents <condition>Engaged</condition> with a Swarm automatically lose 1 Wound at the end of every Round as the Swarm overwhelms anything close. The Swarm has five times the Wounds of a normal example of the creature and gains +10 Weapon Skill. Any attempts to shoot the Swarm gain a bonus of +40 to hit. Swarms ignore all the <trait>Size</trait> Creature Trait rules.</p>"
    },
    {
        "name": "Tail Attack (Rating)",
        "desc": "<p>The creature’s tail is capable of sweeping foes from their feet. On its turn, it may make a Free Attack by spending 1 Advantage. The Tail does <mono>Rating</mono> Damage, which includes its Strength Bonus already. Opponents with a smaller Size than the creature, that suffer any Wounds from the attack, also gain the <condition>Prone</condition> Condition.</p>"
    },
    {
        "name": "# Tentacles (Rating)",
        "desc": "<p>The creature has a number of tentacles equal to <mono>#</mono>. It gains one Free Attack Action per tentacle. Each tentacle’s attack does <mono>Rating</mono> Damage, which includes its Strength Bonus already. If it causes Damage, it can also give its opponent an <condition>Entangled</condition> Condition, which will initiate a Grapple between the target and that tentacle. If a tentacle is Grappling, use the tentacle’s Free Attack Action to resolve that Grapple, not the creature’s Action (see page 338).</p>"
    },
    {
        "name": "Territorial",
        "desc": "<p>This creature is protective of a particular area or location. It will fight to the death to protect it and will not normally pursue enemies if they flee this area. </p>"
    },
    {
        "name": "Terror (Rating)",
        "desc": "<p>The creature supernaturally causes bone-chilling Terror in other creatures, at the <mono>Rating</mono> given.</p><p>When you first encounter a creature causing Terror, make a <skill>Cool</skill> Test. If you pass, you suffer no further effects of Terror; if you fail, you receive a number of <condition>Broken</condition> conditions equal to the creature’s Terror <mono>Rating</mono>, plus the number of SL below 0. </p><p>After resolving the Psychology Test, the creature causes <trait>Fear</trait>, with a Fear <mono>Rating</mono> equal to its Terror Rating.</p>"
    },
    {
        "name": "Trained (Trained Skills)",
        "desc": "<p>This trait represents animals that have been trained through the <skill>Animal Training</skill> Skill. The skills the animal knows is marked in the brackets. Feel free to create your own trained skills. </p><p><ul><li><strong>Broken: </strong>The animal is trained to ignore its <trait>Bestial</trait> trait. It receives 2d10 Fellowship.</li><li><strong>Drive: </strong>The animal is trained to pull a coach, cart, plough, buggy, or similar.</li><li><strong>Entertain: </strong>The animal is trained to entertain others. It adds a +10 bonus to appropriate <skill>Entertain</skill>, <skill>Perform</skill>, or <skill>Play</skill> Tests.</li><li><strong>Fetch: </strong>The animal is trained to fetch. This is normal reserved for Dogs and similar.</li><li><strong>Guard: </strong>The animal is trained to stay in one place or prowl around as a guard, granting it the <trait>Territorial</trait> Trait.</li><li><strong>Home: </strong>The animal is trained to return home if it is released or lost. </li><li><strong>Magic: </strong>The animal is trained to ignore <trait>Skittish</trait> when it comes to magic, which is required for most horses used by Wizards. </li><li><strong>Mount: </strong>The animal will accept a rider. Some creatures are especially belligerent, and will not accept a rider without the correct skill. So, to ride a Griffon, you need the <skill>Ride (Griffon)</skill> skill.</li><li><strong>War: </strong>The animal is trained for war, gaining +10 Weapon Skill. It can also ignore <trait>Skittish</trait> for loud noises.</li></ul></p>"
    },
    {
        "name": "Tongue Attack (Rating) [Range]",
        "desc": "<p>The creature’s prehensile tongue can wrap itself around prey, dragging it to a grisly end. On its turn, it may make a Free Attack by spending 1 Advantage. This is a ranged attack that does Damage equal to its <mono>Rating</mono> (the range is in brackets). If the attack hits, the target receives 1 <condition>Entangled</condition> Condition and, if a smaller Size, is dragged towards the creature, and is <condition>Engaged</condition> in melee combat. The creature can then choose whether to release the target, perform a Free Attack using its Weapon Trait, or to keep the target wrapped in its tongue, initiating a Grapple (see page 163).</p>"
    },
    {
        "name": "Tough",
        "desc": "<p>The creature is more resistant to damage than normal, and unlikely to back down. It receives +10 Toughness and Willpower.</p>"
    },
    {
        "name": "Tracker",
        "desc": "<p>Trackers are adept at following their prey, generally through scent or hearing. They add SL equal to their Initiative Bonus to all <skill>Track</skill> Tests.</p>"
    },
    {
        "name": "Undead",
        "desc": "<p>The Undead are neither living, nor dead, meaning they are not reliant on the usual prerequisites for life: air, food, water… This Trait most commonly come into use when spells, miracles, or other abilities affect Undead only.</p>"
    },
    {
        "name": "Unstable",
        "desc": "<p>The creature’s corpus is maintained by foul magics that are inherently unstable in the material realm. Whenever it ends a Round engaged with any opponents with higher Advantage, the creature is driven back, and the magics holding it together weaken. It loses as many Wounds as the difference between its Advantage, and the highest Advantage engaged with it. So, if the creature had 1 Advantage, and its opponent had 3, the creature would lose 2 Wounds. If the creature ever reach 0 Wounds, the magics holding it in place collapse, and it ‘dies’.</p>"
    },
    {
        "name": "Vampiric",
        "desc": "<p>The creature feeds on blood and draws great physical strength from this act. Whenever it performs a successful Bite attack against an appropriate opponent, it heals as many Wounds as its opponent loses. Drinking blood in this way is the only way it can heal.</p>"
    },
    {
        "name": "Venom (Difficulty)",
        "desc": "<p>The creature’s attacks are poisoned or envenomed. When it causes Wounds, its opponent gains a <condition>Poisoned</condition> Condition. If no Difficulty is marked to resist the Venom, it is assumed to be Challenging. See page 169.</p>"
    },
    {
        "name": "Vomit",
        "desc": "<p>The creature can spew a stream of corrosive corruption, dowsing its opponents in foul, semi-digested filth. On its turn, by spending 3 Advantage, the creature can activate its Vomit as a Free Attack. The creature chooses 1 target it can see within Toughness Bonus yards and lets loose; all targets within two yards are also hit.</p><p>The creature performs an <strong>Opposed <skill>Ballistic Skill</skill>/<skill>Dodge</skill> Test</strong> against all affected targets (its single roll opposed by each individual target). The Test is typically Easy (+40) for the vomiting creature, due to the close range, and Challenging (+0) for opponents. All losing targets suffer a hit with a Weapon Damage of the creature’s Toughness Bonus +4 and receive a <condition>Stunned</condition> condition.</p><p>All Armour and Weapons carried by affected targets suffer 1 Damage as the acidic vomit corrodes it away.</p>"
    },
    {
        "name": "Ward (Rating)",
        "desc": "<p>Perhaps because they are magical, wear a special talisman, or are just plain lucky, some blows just seem to miss. Roll 1d10 after any blow is received, if the creature rolls <mono>Rating</mono> or higher, the blow is ignored, even if it is a critical.</p>"
    },
    {
        "name": "Wallcrawler",
        "desc": "<p>The creature can effortlessly scale vertical surfaces and even traverse ceilings, ready to drop on unwary prey. It moves at full Movement across any appropriate surface and automatically passes all <skill>Climb</skill> tests.</p>"
    },
    {
        "name": "Weapon (Rating)",
        "desc": "<p>The creature carries a melee weapon, or uses teeth, claws, or similar in combat.</p><p>The weapon causes Damage equal to its <mono>Rating</mono> which already includes the creature’s Strength Bonus. Typically it will be <mono>4 + its Strength Bonus</mono> (representing a Hand Weapon).</p>"
    },
    {
        "name": "Web (Rating)",
        "desc": "<p>The creature can create webbing to trap unwary foes. Whenever it successfully hits, opponents gain 1 <condition>Entangled</condition> status, with a Strength of the <mono>Rating</mono> given. See page 168.</p>"
    }
]


var career = [
    {
      "name": "",
      "class": "",
      "races": "",
      "desc": "",
      "advances": [
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      "incomeSkill": "",
      "path1": {
        "name": "",
        "status": "",
        "skills": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "talents": [
          "",
          "",
          "",
          ""
        ],
        "trappings": [
          "",
          "",
          ""
        ]
      },
      "path2": {
        "name": "",
        "status": "",
        "skills": [
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "talents": [
          "",
          "",
          "",
          ""
        ],
        "trappings": [
          "",
          "",
          ""
        ]
      },
      "path3": {
        "name": "",
        "status": "",
        "skills": [
          "",
          "",
          "",
          ""
        ],
        "talents": [
          "",
          "",
          "",
          ""
        ],
        "trappings": [
          "",
          "",
          "",
          ""
        ]
      },
      "path4": {
        "name": "",
        "status": "",
        "skills": [
          "",
          ""
        ],
        "talents": [
          "",
          "",
          "",
          ""
        ],
        "trappings": [
          ""
        ]
      },
      "flavour": [
        "",
        ""
      ],
      "quotes": [
        {
          "quote": "",
          "author": ""
        },
        {
          "quote": "",
          "author": ""
        }
      ]
    },
    {
      "name": "Apothecary",
      "class": "Academics",
      "desc": "Skilled in chemistry and concoctions, you create and sell medicine of all kinds.",
      "flavour": [
        "Apothecaries specialise in preparing pharmaceutical medication — commonly pills, draughts, and ointments — for sale to patients and doktors alike. Their workshops are filled with a dazzling array of bubbling alembics, overflowing beakers, worn mortar and pestles, and other physic-making paraphernalia. Some Apothecaries supplement their income selling illicit substances — from stimulants for desperate students, to hallucinogenic weirdroot for bored nobles or shady commissions from even shadier groups. Supplying these is lucrative, but also dangerous. Rare ingredients are expensive, so Apothecaries frequently have cash flow problems, and journey the wilds to collect their own ingredients. Many take temporary employment with expeditions, mercenaries, or the military for extra coin.",
        "<h5>Adventuring</h5>",
        "Due to Physician Guild pressure, most towns ban Apothecaries from formally practicing medicine, but during play Apothecaries can easily fill the role of a healer. Indeed, they are versatile in this role because they can also identify dangerous and unusual substances the party may encounter, and even turn some into useful medicine."
      ],
      "quotes": [
        {
          "quote": "Look for this sigil: white mortar, black pestle. Don’t ask for our order without it or you’ll be reported to the Watch. And lad, don’t ever short our Apothecary; you’ll spend the rest of your days wondering if the next drink will be your last.",
          "author": "Kathe the Unseen, Assassin"
        },
        {
          "quote": "Human chemistry? As shoddy as their architecture! And just as likely to kill you! I asked for tonic after a hard night’s drinking. Had the flux for a week!",
          "author": "Thorica Norrasdotr, Dwarf Merchant"
        }
      ],
      "path1": {
        "name": "Apothecary&apos;s Apprentice",
        "skills": [
          "Consume Alcohol",
          "Heal",
          "Language (Classical)",
          "Lore (Chemistry)",
          "Lore (Medicine)",
          "Lore (Plants)",
          "Trade (Apothecary)",
          "Trade (Poisoner)"
        ],
        "talents": [
          "Concoct",
          "Craftsman (Apothecary)",
          "Etiquette (Scholar)",
          "Read/Write"
        ],
        "trappings": [
          "Book (Blank)",
          "Healing Draught",
          "<armour>Leather Jerkin</armour>",
          "Pestle and Mortar"
        ],
        "status": "Brass 3"
      },
      "path2": {
        "name": "Apothecary",
        "skills": [
          "Charm",
          "Haggle",
          "Lore (Science)",
          "Gossip",
          "Language (Guilder)",
          "Perception"
        ],
        "talents": [
          "Criminal",
          "Dealmaker",
          "Etiquette (Guilder)",
          "Pharmacist"
        ],
        "trappings": [
          "Guild License",
          "Trade Tools"
        ],
        "status": "Silver 1"
      },
      "path3": {
        "name": "Master Apothecary",
        "skills": [
          "Intuition",
          "Leadership",
          "Research",
          "Secret Signs (Guilder)"
        ],
        "talents": [
          "Bookish",
          "Master Tradesman (Apothecary)",
          "Resistance (Poison)",
          "Savvy"
        ],
        "trappings": [
          "Book (Apothecary)",
          "Apprentice",
          "Workshop"
        ],
        "status": "Silver 3"
      },
      "path4": {
        "name": "Apothecary-General",
        "skills": [
          "Intimidate",
          "Ride (Horse)"
        ],
        "talents": [
          "Acute Sense (Taste)",
          "Coolheaded",
          "Master Tradesman (Poisoner)",
          "Savant (Apothecary)"
        ],
        "trappings": [
          "Commission Papers",
          "Large Workshop"
        ],
        "status": "Gold 1"
      },
      "advances": [
        "T",
        "Dex",
        "Int",
        "Fel",
        "I",
        "WP"
      ],
      "incomeSkill": "Trade (Apothecary)",
      "races": "Dwarf, Halfling, High Elf, Human"
    },
    {
      "name": "Engineer",
      "class": "Academics",
      "desc": "You create machines and constructions both useful and bizarre, and often downright deadly.",
      "flavour": [
        "Engineers design and build mechanical devices or structures such as bridges, canals, or fortifications. Most are educated, Dwarfs at the hide-bound Dwarf Engineers Guild, Humans at forward-thinking establishments such as the Imperial Engineers’ School at Altdorf, though self-taught prodigies are not unknown. Human Engineers value innovation and discovery, whereas Dwarfs favour traditional, tried-and-tested designs passed down for generations. Mining company engineers are well-paid; less so the State Army Engineers who maintain the Imperial war machines and act as sappers and bridge-builders. Master Engineers often find themselves leading teams on ambitious construction projects. Chartered Engineers are the most trusted in the Empire, called upon to design, test, and build such prestigious Imperial Commissions like the complex Steam Wheel Locks, which have revolutionised the speed of travel in the canals of the Vorbergland.",
        "<h5>Adventuring</h5>",
        "Some Engineers are drawn to investigate ancient Dwarf Holds, most now abandoned, for entombed within are the secrets of the master builders of old. Those who dare their depths may find millennia-old marvels, many of which are repurposed by Goblins and Skaven for their own nefarious purposes. Equally enticing are the stone sky bridges soaring above the Holds, some stretching for many miles, true wonders of bygone engineering that once connected thriving Dwarf settlements, forts, and farmlands."
      ],
      "quotes": [
        {
          "quote": "What will it do? Well, it’s supposed to pluck the chicken, Smallnose. Stand well back!",
          "author": "Wolfgang Kugelschreiber, Inventor"
        },
        {
          "quote": "Master Engineer Volker von Meinkopt found inspiration watching students reloading at the Imperial Gunnery School. He had a revelation: more barrels = more shots = more lethality. He soon produced the first repeating handgun, ‘Von Meinkopt’s Whirling Cavalcade of Death’, and pistol, ‘Von Meinkopt’s Micro-mainspring of Multitudinous Precipitation of Pernicious Lead’. Not content to rest on those laurels, he then created the enormous nine-barrelled cannon, the Helblaster Volley Gun, which is utterly lethal to enemies and, all too often, its crew.",
          "author": "<em>‘Great Engineers of the Empire’</em>,<br/> Lady Theodora Holzenauer, Engineer and Journalist"
        }
      ],
      "path1": {
        "name": "Student Engineer",
        "skills": [
          "Consume Alcohol",
          "Cool",
          "Endurance",
          "Language (Classical)",
          "Lore (Engineer)",
          "Perception",
          "Ranged (Blackpowder)",
          "Trade (Engineer)"
        ],
        "talents": [
          "Artistic",
          "Gunner",
          "Read/Write",
          "Tinker"
        ],
        "trappings": [
          "Book (Engineer)",
          "Hammer and Spikes"
        ],
        "status": "Brass 4"
      },
      "path2": {
        "name": "Engineer",
        "skills": [
          "Drive",
          "Dodge",
          "Navigation",
          "Ranged (Engineering)",
          "Research",
          "Language (Guilder)"
        ],
        "talents": [
          "Craftsman (Engineer)",
          "Etiquette (Guilder)",
          "Marksman",
          "Orientation"
        ],
        "trappings": [
          "Guild License",
          "Trade Tools"
        ],
        "status": "Silver 2"
      },
      "path3": {
        "name": "Master Engineer",
        "skills": [
          "Language (Khazalid)",
          "Leadership",
          "Ride (Horse)",
          "Secret Signs (Guilder)"
        ],
        "talents": [
          "Etiquette (Scholar)",
          "Master Tradesman (Engineering)",
          "Sniper",
          "Supernumerate"
        ],
        "trappings": [
          "Workshop"
        ],
        "status": "Silver 4"
      },
      "path4": {
        "name": "Chartered Engineer",
        "skills": [
          "Language (Any)",
          "Lore (Any)"
        ],
        "talents": [
          "Magnum Opus",
          "Rapid Reload",
          "Savant (Engineering)",
          "Unshakeable"
        ],
        "trappings": [
          "Guild License",
          "Library (Engineer)",
          "Quality Trade Tools (Engineer)",
          "Large Workshop (Engineer)"
        ],
        "status": "Gold 1"
      },
      "advances": [
        "BS",
        "Dex",
        "Int",
        "I",
        "T",
        "WP"
      ],
      "incomeSkill": "Trade (Engineer)",
      "races": "Dwarf, Halfling, Human"
    },
    {
      "name": "Lawyer",
      "class": "Academics",
      "desc": "You navigate treacherous legal systems, defending clients and prosecuting the guilty.",
      "flavour": [
        "Lawyers give legal counsel, interpret the law, and argue on behalf of their clients before the courts. They are often specialists in the laws of the province in which they practice, or in ecclesiastical law. Most are university educated and therefore rich and well-connected, although gifted individuals of low birth are sometimes apprenticed. Cult lawyers learn from their venerable peers, with those trained by the Cults of Verena and Sigmar especially well-regarded. Some Lawyers are hired as mediators, settling informal disputes outside costly courts, a practice favoured by Halflings. Others work for criminal gangs, exploiting legal loopholes to free their always-guilty clients. At the top end of society, Barristers are the only lawyers allowed to address higher appeal courts in the city-states, charging exorbitant prices for their services.",
        "<h5>Adventuring</h5>",
        "Lawyers excel at getting people out of trouble, while adventurers excel at getting into it. They can use their knowledge of obscure local laws to avoid problems by suggesting unusual approaches to solve thorny dilemmas. After all, tying up a local thug in court is just as valuable, and arguably much safer, than tying one up in a basement."
      ],
      "quotes": [
        {
          "quote": "Sharks! No, worse! Leeches! But not the good kind that suck out bad humours, oh no. They’re leeches that drain your coffers and leave you nothing to show for it.",
          "author": "Stefan Bachler, Merchant"
        },
        {
          "quote": "It is not what the lawyer says I may do that concerns me, but what is right by reason and justice. Such matters need then be the basis of our new law.",
          "author": "Lector Agatha von Böhrn, Supreme Law Lord of the Empire"
        }
      ],
      "path1": {
        "name": "Student Lawyer",
        "skills": [
          "Consume Alcohol",
          "Endurance",
          "Haggle",
          "Language (Classical)",
          "Lore (Law)",
          "Lore (Theology)",
          "Perception",
          "Research"
        ],
        "talents": [
          "Blather",
          "Etiquette (Scholar)",
          "Read/Write",
          "Speedreader"
        ],
        "trappings": [
          "Book (Law)",
          "Magnifying Glass"
        ],
        "status": "Brass 4"
      },
      "path2": {
        "name": "Lawyer",
        "skills": [
          "Bribery",
          "Charm",
          "Gossip",
          "Intuition",
          "Language (Guilder)",
          "Secret Signs (Guilder)"
        ],
        "talents": [
          "Argumentative",
          "Criminal",
          "Etiquette (Guilder)",
          "Suave"
        ],
        "trappings": [
          "Court Robes",
          "Guild License",
          "Writing Kit"
        ],
        "status": "Silver 3"
      },
      "path3": {
        "name": "Barrister",
        "skills": [
          "Art (Writing)",
          "Entertain (Speeches)",
          "Intimidate",
          "Lore (Any)"
        ],
        "talents": [
          "Bookish",
          "Cat-Tongued",
          "Impassioned Zeal",
          "Savvy"
        ],
        "trappings": [
          "Office",
          "Assistant (Student or Servant)"
        ],
        "status": "Gold 1"
      },
      "path4": {
        "name": "Judge",
        "skills": [
          "Cool",
          "Lore (Any)"
        ],
        "talents": [
          "Commanding Presence",
          "Kingpin",
          "Savant (Law)",
          "Wealthy"
        ],
        "trappings": [
          "Gavel",
          "Ostentatious Wig"
        ],
        "status": "Gold 2"
      },
      "advances": [
        "I",
        "Dex",
        "Int",
        "Fel",
        "WP",
        "T"
      ],
      "incomeSkill": "Lore (Law)",
      "races": "Dwarf, Halfling, High Elf, Human"
    },
    {
      "name": "Nun",
      "class": "Academics",
      "desc": "You are devoted to the service of your deity, having sworn vows for a life of service.",
      "path1": {
        "name": "Novitiate",
        "skills": [
          "Art (Calligraphy)",
          "Cool",
          "Endurance",
          "Entertain (Storyteller)",
          "Gossip",
          "Heal",
          "Lore (Theology)",
          "Pray"
        ],
        "talents": [
          "Bless (Any)",
          "Stone Soup",
          "Panhandle",
          "Read/Write"
        ],
        "trappings": [
          "Religious Symbol",
          "Robes"
        ],
        "status": "Brass 1"
      },
      "path2": {
        "name": "Nun",
        "skills": [
          "Charm",
          "Melee (Any)",
          "Research",
          "Trade (Brewer)",
          "Trade (Herbalist)",
          "Trade (Vintner)"
        ],
        "talents": [
          "Etiquette (Cultists)",
          "Field Dressing",
          "Holy Visions",
          "Invoke (Any)"
        ],
        "trappings": [
          "Book (Religion)",
          "Religious Relic",
          "Trade Tools (Any)"
        ],
        "status": "Brass 4"
      },
      "path3": {
        "name": "Abbess",
        "skills": [
          "Leadership",
          "Lore (Local)",
          "Lore (Politics)",
          "Perception"
        ],
        "talents": [
          "Resistance (Any)",
          "Robust",
          "Savant (Theology)",
          "Stout-hearted"
        ],
        "trappings": [
          "Abbey",
          "Library (Theology)"
        ],
        "status": "Silver 2"
      },
      "path4": {
        "name": "Prioress General",
        "skills": [
          "Language (Any)",
          "Lore (Any)"
        ],
        "talents": [
          "Commanding Presence",
          "Iron Will",
          "Pure Soul",
          "Strong-minded"
        ],
        "trappings": [
          "Religious Order"
        ],
        "status": "Silver 5"
      },
      "advances": [
        "Dex",
        "Int",
        "Fel",
        "WP",
        "I",
        "T"
      ],
      "incomeSkill": "Lore (Theology)",
      "races": "Human",
      "flavour": [
        "Nuns are members of religious orders, normally cloistered within an abbey, convent, or monastery. Most rise before the sun for morning prayer before toiling in fields, tending to the sick, or preserving important manuscripts. Vows of pilgrimage cause some to travel the Empire, while others take oaths to serve the community, moving amongst the people, tending to their spiritual needs. Devoted hermits and tenders to shrines are also thought of as ‘Nuns’ or ‘Monks’ by the folk of the Empire. Many Nuns learn valuable trades such as vintners, brewers or calligraphers. Abbesses use these activities to attract donations and patronage from the local nobility. Leaders of particularly large or martial Orders can gather significant influence both within their own cult and with the ruling classes of a province. For more on religion and the different Orders, see Chapter 7: Religion and Belief.",
        "<h5>Adventuring</h5>",
        "When a religious order discovers terrible secrets or fragments of prophecy, its leaders may feel they must act, sending brothers and sisters abroad. Abbeys along pilgrimage routes will often also send their members abroad to guard the many pilgrims traversing the lengthy holy roads across the Empire. And there are always itinerant Friars wandering the world, risking adventure with every new land they enter."],
      "quotes": [
        {
          "quote": "They came thinking it a simple task to slay a few poor, hapless Brothers and take our relics. I ask Morr not judge too harshly the seven bandits we bury today, as Brother Hild has already inflicted punishment enough",
          "author": "Abbot Ernst Halfhauser"
        },
        {
          "quote": "Quick! Come quick! The Sisters of Faith and Chastity are about to parade through the streets. I want to see if I can get a few coppers caught in their thorns. It brings luck for the whole year!",
          "author": "Bengt, Altdorf Street Rat"
        }
      ]
    },
    {
      "name": "Physician",
      "class": "Academics",
      "desc": "With a strong stomach and steady hand, you practice the art of medicine, striving to save lives.",
      "path1": {
        "name": "Physician&apos;s Apprentice",
        "skills": [
          "Bribery",
          "Cool",
          "Drive",
          "Endurance",
          "Gossip",
          "Heal",
          "Perception",
          "Sleight of Hand"
        ],
        "talents": [
          "Bookish",
          "Field Dressing",
          "Read/Write",
          "Strike to Stun"
        ],
        "trappings": [
          "Bandages",
          "Healing Draught"
        ],
        "status": "Brass 4"
      },
      "path2": {
        "name": "Physician",
        "skills": [
          "Charm",
          "Haggle",
          "Language (Guilder)",
          "Lore (Anatomy)",
          "Lore (Medicine)",
          "Trade (Barber)"
        ],
        "talents": [
          "Coolheaded",
          "Criminal",
          "Etiquette (Guilder)",
          "Surgery"
        ],
        "trappings": [
          "Book (Medicine)",
          "Guild License",
          "Trade Tools (Medicine)"
        ],
        "status": "Silver 3"
      },
      "path3": {
        "name": "Doktor",
        "skills": [
          "Consume Alcohol",
          "Intimidate",
          "Leadership",
          "Research"
        ],
        "talents": [
          "Etiquette (Scholars)",
          "Resistance (Disease)",
          "Savvy",
          "Strike to Injure"
        ],
        "trappings": [
          "Apprentice",
          "Workshop (Medicine)"
        ],
        "status": "Silver 5"
      },
      "path4": {
        "name": "Court Physician",
        "skills": [
          "Lore (Noble)",
          "Perform (Dancing)"
        ],
        "talents": [
          "Etiquette (Nobles)",
          "Nimble Fingered",
          "Savant (Medicine)",
          "Strong-minded"
        ],
        "trappings": [
          "Courtly Attire",
          "Letter of Appointment"
        ],
        "status": "Silver 5"
      },
      "advances": [
        "Dex",
        "Int",
        "WP",
        "Fel",
        "I",
        "Agi"
      ],
      "incomeSkill": "Heal",
      "races": "Dwarf, Halfling, High Elf, Human",
      "flavour": [
        "Physicians study patients’ symptoms and prescribe remedies and surgeries. While the healing arts are ancient, many deriving from Elven practices, the formal science of medicine is relatively new and not-entirely-trusted. Due to the Empire’s history with necromancy and the safe-guards imposed by the Cult of Morr, studying cadavers is forbidden, making learning of anatomy hard. Medicine’s reputation suffered further from swindlers selling ‘miracle cure-alls’ that do nothing or cause actual harm. Physicians learn their profession at a university or while apprenticed to a Guild Physician. Most cheap surgery is undertaken by back-street physicians known as barber-surgeons whose training is informal. Trained doctors with strong stomachs are in demand for the State Armies. The most famed Physicians almost exclusively tend to wealthy merchants and the nobility.",
        "<h5>Adventuring</h5>",
        "Physician’s Guild fees are notoriously expensive, which can cause newer Physicians without steady clientele to seek alternate sources of income. Some Physicians consistently search for more effective treatments and new medicines, which can take them far afield. Others like to expand their knowledge of anatomy by studying grievous wounds first hand, and there are few better ways to do that than by travelling with adventurers."
      ],
      "quotes": [
        {
          "quote": "Come to Neuber for all your limb removals! I’ll ’ave your arm off in seconds! I’ll suture it a’fore you even wake up. My work’s so fine you’ll never miss it!",
          "author": "Gotthard Neuber, Barber-Surgeon"
        },
        {
          "quote": "Beware the Brass Doktor.",
          "author": "Reikland Proverb warning against cheap Physicians"
        },
        {
          "quote": "They’re bastards, all. I can’t so much as give you a proper bloodletting without their leave. “Practicing medicine without a license” my arse. I know you can’t afford them, deary. Here, luv, take this nice tea. What? Oh no, just tea is all. Just tea. And if you feel better, why, thank Shallya, eh?",
          "author": "Jana Palner, Part-time Surgeon"
        }
      ] 
    },
    {
      "name": "Priest",
      "class": "Academics",
      "desc": "You carry the word of your god, tending to the spiritual needs of the masses.",
      "path1": {
        "name": "Initiate",
        "skills": [
          "Athletics",
          "Cool",
          "Endurance",
          "Intuition",
          "Lore (Theology)",
          "Perception",
          "Pray",
          "Research"
        ],
        "talents": [
          "Bless (Any)",
          "Holy Visions",
          "Read/Write",
          "Suave"
        ],
        "trappings": [
          "Religious Symbol",
          "Robes"
        ],
        "status": "Brass 2"
      },
      "path2": {
        "name": "Priest",
        "skills": [
          "Charm",
          "Entertain (Storytelling)",
          "Gossip",
          "Heal",
          "Intimidate",
          "Melee (Basic)"
        ],
        "talents": [
          "Blather",
          "Bookish",
          "Etiquette (Cultists)",
          "Invoke (Any)"
        ],
        "trappings": [
          "Book (Religion)",
          "Ceremonial Robes"
        ],
        "status": "Silver 1"
      },
      "path3": {
        "name": "High Priest",
        "skills": [
          "Art (Writing)",
          "Entertain (Speeches)",
          "Leadership",
          "Lore (Heraldry)"
        ],
        "talents": [
          "Acute Sense (Any)",
          "Hatred (Any)",
          "Impassioned Zeal",
          "Strong-minded"
        ],
        "trappings": [
          "Quality Robes",
          "Religious Relic",
          "Subordinate Priests",
          "Temple"
        ],
        "status": "Gold 1"
      },
      "path4": {
        "name": "Lector",
        "skills": [
          "Language (Any)",
          "Lore (Politics)"
        ],
        "talents": [
          "Master Orator",
          "Pure Soul",
          "Resistance (Any)",
          "Savant (Theology)"
        ],
        "trappings": [
          "Library (Theology)",
          "Subordinate High Priests"
        ],
        "status": "Gold 2"
      },
      "advances": [
        "T",
        "Agi",
        "WP",
        "Fel",
        "Int",
        "I"
      ],
      "incomeSkill": "Pray",
      "races": "Human",
      "flavour": [
        "Priests tend to congregations of the faithful throughout the Old World. While many are assigned to a specific temple, others choose a wandering life to reach worshippers who cannot, or will not, attend temple. They are expected to exemplify the beliefs of their religion — which vary greatly depending on which deity they serve. High Priests are responsible for a temple and all its Cult and lay members. Alongside Lectors, they will often be called upon to advise the ruling classes, with many active in local politics. Priests have many duties connected to their God, such as Priests of Manann’s responsibility to consecrate new ships, or a Shallyan’s duty to tend to the sick and wounded, so they touch on most aspects of life in the Empire. For more on religion and the different Orders, see Chapter 7: Religion and Belief.",
        "<h5>Adventuring</h5>",
        "Some temple-bound Priests seek distractions to justify sojourns away. Disturbing matters heard from their congregations can send them on a quest for answers. Some High Priests find their administrative duties so far removed from the life they envisaged when they joined the Cult that they take extended pilgrimages away from their temple."
      ],
      "quotes": [
        {
          "quote": "For sound advice, I seek a Priest of Verena. For everything else, I seeka Priest of Ranald.",
          "author": "Wermer Losch, Merchant"
        },
        {
          "quote": "The Shallyan, just a girl she was, stroked my little Anton’s forehead and whispered, and the screaming stopped. He smiled at me for the first time in days. I will never forget it. Oh, aye, he died not long after, but not in pain. Not in pain.’",
          "author": "Sabine Schmidt, Fishmonger"
        },
        {
          "quote": "Listen, there is nothing to fear. Hexensnacht comes every year. We need only call on the Lord of Death to watch over us. So, come the midnight hour, we cry MORR! MORR! MORR!",
          "author": "Father Wilhelm Abgott, Priest of Morr"
        }
      ]
    },
    {
      "name": "Scholar",
      "class": "Academics",
      "desc": "You dedicate your life to the pursuit and study of knowledge, wherever that may take you.",
      "path1": {
        "name": "Student",
        "skills": [
          "Consume Alcohol",
          "Entertain (Storytelling)",
          "Gamble",
          "Gossip",
          "Haggle",
          "Language (Classical)",
          "Lore (Any)",
          "Research"
        ],
        "talents": [
          "Carouser",
          "Read/Write",
          "Savvy",
          "Super Numerate"
        ],
        "trappings": [
          "Alcohol",
          "Book",
          "Opinions",
          "Writing Kit"
        ],
        "status": "Brass 3"
      },
      "path2": {
        "name": "Scholar",
        "skills": [
          "Art (Writing)",
          "Intuition",
          "Language (Any)",
          "Lore (Any)",
          "Perception",
          "Trade (Any)"
        ],
        "talents": [
          "Bookish",
          "Etiquette (Scholars)",
          "Speedreader",
          "Suave"
        ],
        "trappings": [
          "Access to a Library",
          "Degree"
        ],
        "status": "Silver 2"
      },
      "path3": {
        "name": "Fellow",
        "skills": [
          "Entertain (Lecture)",
          "Intimidate",
          "Language (Any)",
          "Lore (Any)"
        ],
        "talents": [
          "Linguistics",
          "Public Speaker",
          "Savant (Any)",
          "Tower of Memories"
        ],
        "trappings": [
          "Mortarboard",
          "Robes"
        ],
        "status": "Silver 5"
      },
      "path4": {
        "name": "Professor",
        "skills": [
          "Entertain (Rhetoric)",
          "Lore (Any)"
        ],
        "talents": [
          "Magnum Opus",
          "Master Orator",
          "Savant (Any)",
          "Sharp"
        ],
        "trappings": [
          "Study"
        ],
        "status": "Gold 1"
      },
      "advances": [
        "T",
        "Int",
        "WP",
        "I",
        "Fel",
        "Dex"
      ],
      "incomeSkill": "Lore (Any)",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "flavour": [
        "Scholars generally study at one of the Old World’s learning institutions, foremost amongst them the university in Altdorf. Most specialise in one or two subjects, and many learn just enough to provide a useful career, or give them something to talk about at dinner parties. Poorer Scholars act as scribes, reading and writing notes for others as most of the Empire’s citizens are illiterate. Others become tutors educating the wealthy.",
        "The most gifted Masters are invited to join a university, with renowned Professors delivering popular lectures to hundreds of Students. Dwarfs and High Elves are less likely to be employed in an Imperial institution, though they may tour the Empire in search of esoteric knowledge.",
        "<h5>Adventuring</h5>",
        "Poor Scholars who cannot or will not tutor often need funds to continue their research. A few search the dark corners of the world for lost secrets and ancient tomes. Others are hired to accompany adventuring expeditions where their knowledge can be put to more practical use.",
        "Scholar is a useful Career, with access to rare Lore skills, a good way for the GM to share information with players. Played with commonsense they can counter-balance rash and martially-inclined characters’ tendencies to solve every problem with a blade. Scholars can use their knowledge to solve puzzles or come up with unusual strategies and tactics."
      ],
      "quotes": [
        {
          "quote": "None of us thought much of her. Scrawny thing the Captain dragged out a library in Altdorf, name of Sosber. Kept to herself. Nose in a book. But when we finally faced the Corpse Render, when so-called warriors ran, she stood fast. Her quiet voice rang with steel as she called out where to strike. Not the heads as you’d think, no, but the body. Steel slew the beast that day, but knowledge made it possible.",
          "author": "Oskar Reisdorf, Mercenary"
        }
      ]
    },
    {
      "name": "Wizard",
      "class": "Academics",
      "desc": "Feared and distrusted by the citizens of the Empire, you legally wield powerful and dangerous magic.",
      "path1": {
        "name": "Wizard&apos;s Apprentice",
        "skills": [
          "Channeling (Any Colour)",
          "Dodge",
          "Intuition",
          "Language (Magick)",
          "Lore (Magic)",
          "Melee (Basic)",
          "Melee (Polearm)",
          "Perception"
        ],
        "talents": [
          "Aetheryic Attunement",
          "Petty Magic",
          "Read/Write",
          "Second Sight"
        ],
        "trappings": [
          "Grimoire",
          "Staff"
        ],
        "status": "Brass 3"
      },
      "path2": {
        "name": "Wizard",
        "skills": [
          "Charm",
          "Cool",
          "Gossip",
          "Intimidate",
          "Language (Battle)",
          "Language (Any)"
        ],
        "talents": [
          "Arcane Magic (Any Arcane Lore)",
          "Detect Artefact",
          "Fast Hands",
          "Sixth Sense"
        ],
        "trappings": [
          "Magical License"
        ],
        "status": "Silver 3"
      },
      "path3": {
        "name": "Master Wizard",
        "skills": [
          "Animal Care",
          "Evaluate",
          "Lore (Warfare)",
          "Ride (Horse)"
        ],
        "talents": [
          "Dual Wielder",
          "Instinctive Diction",
          "Magical Sense",
          "Menacing"
        ],
        "trappings": [
          "Apprentice",
          "Light Warhorse",
          "Magical Item"
        ],
        "status": "Gold 1"
      },
      "path4": {
        "name": "Wizard Lord",
        "skills": [
          "Language (Any)",
          "Lore (Any)"
        ],
        "talents": [
          "Combat Aware",
          "Frightening",
          "Iron Will",
          "War Wizard"
        ],
        "trappings": [
          "Apprentice",
          "Library (Magic)",
          "Workshop (Magic)"
        ],
        "status": "Gold 2"
      },
      "advances": [
        "WS",
        "Int",
        "WP",
        "Agi",
        "I",
        "Fel"
      ],
      "incomeSkill": "Language (Magick)",
      "races": "High Elf, Human, Wood Elf",
      "flavour": [
        "Wizards channel one of the eight ‘Winds of Magic’ only spellcasters perceive, to cast potent spells. To legally cast magic in the Empire, a Human must follow the Articles of Imperial Magic and belong to one of the Eight Colleges of Magic in Altdorf — each dedicated to a specific wind, as Wizards can only safely channel one. After graduation, Apprentices become Wizards and serve the Empire. Wizards carefully study and practice their art, which, according to the Articles, they can only use outside their colleges in defence of their own life, or against the enemies of the Empire. Many Wizards are attached to the Empire State Army, and although they are treated with cautious suspicion, none can deny their effectiveness on the battlefield.",
        "<h5>Adventuring</h5>",
        "Many Wizards leave the Colleges of Magic in debt for the cost of their tuition. These Wizards may be keen to find immediate employment, or seek out their fortune on land, at sea, or anywhere else they might be able to find relics, artefacts or lost tomes of magical lore. Journeying Wizards, eager to prove themselves, are actively encouraged to test their skills across the Empire by hunting down whatever dangers threaten the local populace.",
        "Wizards are excellent characters to add some firepower to a group, but it can be intimidating for new players to have to learn a whole additional set of rules for spells. Because of this the GM should be aware that they might initially need some extra support to ensure that they are using these rules effectively and to the group’s best advantage. You’ll choose the colour of magic you study when you take the Arcane Magic Talent. For more on magic see Chapter 8: Magic."
      ],
      "quotes": [
        {
          "quote": "I don’t care what promises they make, or what colleges they belong to, they are dangerous abominations. I am continuing to petition for their destruction in the name of Sigmar, for the good of us all.",
          "author": "Reikhardt Mair, Witch Hunter"
        }
      ]
    },
    {
      "name": "Agitator",
      "class": "Burghers",
      "desc": "Charismatic and articulate, you champion your cause in the face of establishment oppression.",
      "path1": {
        "name": "Pamphleteer",
        "skills": [
          "Art (Writing)",
          "Bribery",
          "Charm",
          "Consume Alcohol",
          "Gossip",
          "Haggle",
          "Lore (Politics)",
          "Trade (Printing)"
        ],
        "talents": [
          "Blather",
          "Gregarious",
          "Panhandle",
          "Read/Write"
        ],
        "trappings": [
          "Writing Kit",
          "Hammer and Nails",
          "Pile of Leaflets"
        ],
        "status": "Brass 1"
      },
      "path2": {
        "name": "Agitator",
        "skills": [
          "Cool",
          "Dodge",
          "Entertain (Storytelling)",
          "Gamble",
          "Intuition",
          "Leadership"
        ],
        "talents": [
          "Alley Cat",
          "Argumentative",
          "Impassioned Zeal",
          "Public Speaker"
        ],
        "trappings": [
          "Leather Jack"
        ],
        "status": "Brass 2"
      },
      "path3": {
        "name": "Rabble Rouser",
        "skills": [
          "Athletics",
          "Intimidate",
          "Melee (Brawling)",
          "Perception"
        ],
        "talents": [
          "Cat-tongued",
          "Dirty Fighting",
          "Flee!",
          "Step Aside"
        ],
        "trappings": [
          "Hand Weapon",
          "Pamphleteer"
        ],
        "status": "Brass 3"
      },
      "path4": {
        "name": "Demagogue",
        "skills": [
          "Lore (Heraldry)",
          "Ride (Horse)"
        ],
        "talents": [
          "Etiquette (Any)",
          "Master Orator",
          "Schemer",
          "Suave"
        ],
        "trappings": [
          "3 Pamphleteers",
          "Patron",
          "Printing Press",
          "Impressive Hat"
        ],
        "status": "Brass 5"
      },
      "advances": [
        "BS",
        "Int",
        "Fel",
        "Agi",
        "WS",
        "I"
      ],
      "incomeSkill": "Charm",
      "races": "Dwarf, Halfling, Human",
      "flavour": [
        "Agitators lobby for political causes using print, protest, and public speaking. They muster the down-trodden populace’s sympathy and support but must be wary of drawing the attention of Sigmarites or Dwarfs interested in maintaining established traditions. The most dangerous Agitators have destabilised the rule of nobles, towns, and even entire provinces. Pamphleteers nail signs to billboards, or distribute them in market squares, though often those they seek to reach cannot read. ",
        "Religious Agitators can make a good living as street preachers, receiving donations from pious devotees and attracting flagellants and zealots as followers. Agitators who survive long enough to become Demagogues are often supported by powerful, hidden allies pursuing change for their own motives.",
        "<h5>Adventuring</h5>",
        "Agitators often move around, in search of larger crowds or fleeing the authorities. They may become leaders of motley groups of the restless and disaffected, exhorting — or even extorting — them to fight for a greater cause.",
        "Altdorf has a legendary reputation for deep fogs and riots. Perhaps this happens because Altdorf is the Imperial Capital, or maybe its because the Grey College draws swathes of treacherous Ulgu , the Grey Wind of Magic, to the city. Whatever the case, it seems that whenever the fog draws in from the Altdorf Flats, mobs rise in the streets, and woe betide any watchmen who try to silence their right to be heard. "
      ],
      "quotes": [
        {
          "quote": "Mark my words, if you’re looking to root out the agents of the Spinner of Fate, follow the clamouring in the streets. They can’t resist it. They’ll surface, sooner or later.",
          "author": "Adrian Hoven, Cleric-Captain, Knights of the Fiery Heart"
        }
      ]
    },
    {
      "name": "Artisan",
      "class": "Burghers",
      "desc": "A skilled craftsperson, you take pride in your work, creating products for sale and commission.",
      "advances": [
        "S",
        "T",
        "Dex",
        "Fel",
        "WP",
        "Int"
      ],
      "incomeSkill": "Trade (Any)",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "path1": {
        "name": "Apprentice Artisan",
        "status": "Brass 2",
        "skills": [
          "Athletics",
          "Cool",
          "Consume Alcohol",
          "Dodge",
          "Endurance",
          "Evaluate",
          "Stealth (Urban)",
          "Trade (Any)"
        ],
        "talents": [
          "Artistic",
          "Craftsman (Any)",
          "Strong Back",
          "Very Strong"
        ],
        "trappings": [
          "Chalk",
          "Leather Jerkin",
          "<mono>1d10</mono> rags"
        ]
      },
      "path2": {
        "name": "Artisan",
        "status": "Silver 1",
        "skills": [
          "Charm",
          "Haggle",
          "Lore (Local)",
          "Gossip",
          "Language (Guilder)",
          "Perception"
        ],
        "talents": [
          "Dealmaker",
          "Etiquette (Guilder)",
          "Nimble Fingered",
          "Sturdy"
        ],
        "trappings": [
          "Guild License",
          "Trade Tools"
        ]
      },
      "path3": {
        "name": "Master Artisan",
        "status": "Silver 3",
        "skills": [
          "Intuition",
          "Leadership",
          "Research",
          "Secret Signs (Guilder)"
        ],
        "talents": [
          "Acute Sense (Taste or Touch)",
          "Master Tradesman (Any)",
          "Read/Write",
          "Tinker"
        ],
        "trappings": [
          "Apprentice",
          "Workshop"
        ]
      },
      "path4": {
        "name": "Guildmaster",
        "status": "Gold 1",
        "skills": [
          "Bribery",
          "Intimidate"
        ],
        "talents": [
          "Briber",
          "Magnum Opus",
          "Public Speaker",
          "Schemer"
        ],
        "trappings": [
          "Guild",
          "Quality Clothing"
        ]
      },
      "flavour": [
        "Artisans produce goods, ranging from everyday necessities sold by Bakers and Chandlers, to weapons and riverboats crafted by Smiths and Shipwrights. The Empire’s larger towns and cities have guilds to protect local Artisans from fraudsters, as an Artisan’s entire livelihood can be jeopardised by unskilled competitors hawking cheap low-quality merchandise. Guild Artisans observe strict quality standards, with those failing to meet them blackballed and forbidden to trade locally.  ",
        "Artisans work at all levels of society not just producing goods, but also repairing them. They are employed by navies to maintain vessels, by armies to manage war machines and siegeworks, and by merchant houses of all sizes to transform raw materials into sellable goods.",
        "<h5>Adventuring</h5>",
        "Artisans in training can be sent to practice under other masters. The constant pressure to achieve perfection is so stifling that young Artisans sometimes take a break to pursue more liberating enterprises, sometimes supporting the army or navy.",
        "Dwarf Guilds don’t usually admit Humans, and Dwarfs are traditionally allowed to practice their trade in Imperial cities without joining a local Guild. This can cause conflict as the Guilds are rarely pleased with skilled competition. Halflings are not so particular, and most will happily join Human Guilds (if admitted) and allow Humans to join their Guilds. Elves do not have Artisan’s Guilds, and though they could join one it is unlikely they would lower themselves to do so. "
      ],
      "quotes": [
        {
          "quote": " Sorry, mistress, all the shoes are gone! I forgot to put the milk out last night. The Spite must have taken them.",
          "author": "Wiebke, Cobbler’s Apprentice and Thief"
        },
        {
          "quote": "You must understand, my boy, that Wurtbad’s wine has a reputation. This bottle looks like it was blown through a Hochland long rifle. Simply unacceptable.",
          "author": "Frau Glasmeister, Glassblowers’ Guildmaster"
        }
      ]
    },
    {
      "name": "Beggar",
      "class": "Burghers",
      "desc": "Street-smart,  you make a living from the charity of others using persuasion and charm.",
      "advances": [
        "T",
        "Agi",
        "Fel",
        "WP",
        "WS",
        "I"
      ],
      "incomeSkill": "Charm",
      "races": "Dwarf, Halfling, Human",
      "path1": {
        "name": "Pauper",
        "status": "Brass 0",
        "skills": [
          "Athletics",
          "Charm",
          "Consume Alcohol",
          "Cool",
          "Dodge",
          "Endurance",
          "Intuition",
          "Stealth (Urban)"
        ],
        "talents": [
          "Panhandle",
          "Resistance (Disease)",
          "Stone Soup",
          "Very Resilient"
        ],
        "trappings": [
          "Poor-quality blanket",
          "Cup"
        ]
      },
      "path2": {
        "name": "Beggar",
        "status": "Brass 2",
        "skills": [
          "Entertain (Acting)",
          "Entertain (Any)",
          "Gossip",
          "Haggle",
          "Perception",
          "Sleight of Hand"
        ],
        "talents": [
          "Alley Cat",
          "Beneath Notice",
          "Criminal",
          "Etiquette (Criminals)"
        ],
        "trappings": [
          "Crutch",
          "Bowl"
        ]
      },
      "path3": {
        "name": "Master Beggar",
        "status": "Brass 4",
        "skills": [
          "Charm Animal",
          "Leadership",
          "Lore (Local)",
          "Secret Signs (Vagabond)"
        ],
        "talents": [
          "Blather",
          "Dirty Fighting",
          "Hardy",
          "Step Aside"
        ],
        "trappings": [
          "Disguise Kit",
          "Hiding Place",
          "Pauper Follower"
        ]
      },
      "path4": {
        "name": "Beggar King",
        "status": "Silver 2",
        "skills": [
          "Bribery",
          "Intimidate"
        ],
        "talents": [
          "Cat-tongued",
          "Fearless (Watchmen)",
          "Kingpin",
          "Suave"
        ],
        "trappings": [
          "Lair",
          "Large group of Beggar followers"
        ]
      },
      "flavour": [
        "The countryside rumour that Altdorf ’s streets are lined with gold is a cruel taunt to its Beggars. They rely upon the generosity of strangers and scraps scavenged from the mud and detritus of city life, though posturing dandies will happily dispose of a few pfennigs to make them go away. The law affords them little protection and the watch has no sympathy for loiterers.",
        "Paupers often land on the streets as orphans and have been in and out of Mercy Houses all their lives. Once the basic skills of scrounging and panhandling are learned, Beggars can advance their techniques using disguises and sympathy ploys. Other Paupers are not destitute but simply employed in some of the worst occupations, on the lowest rung of the social ladder, like Gong Farmers, Bone Pickers, and Rag and Bone Men. ",
        "<h5>Adventuring</h5>",
        "The only direction from rock-bottom is upward. Some Beggars will eagerly leave the gutter behind for adventuring opportunities, so long as they aren’t being exploited as battle-fodder. Those unable to afford a porter might hire a Beggar instead, and a Beggar’s savvy is useful when penniless and hungry. And, if it all goes wrong, it’s easy to return to the begging life."
      ],
      "quotes": [
        {
          "quote": "Please, frau, I beg humbly for enough coppers to buy bread tonight. Even a pfennig would do — Gutbäcker is selling day-olds.",
          "author": "Elsie, Halfling Panhandler"
        },
        {
          "quote": "I lost my leg in the Battle of Bögenwasser. Both hands were eaten by a Squig when Goblins ambushed our patrol near Bögenauer. All to protect the Reikland and our Emperor.",
          "author": "Klaas, Veteran Soldier"
        },
        {
            "quote": "You can have Königplatz next week — I need you loud and dirty on Luitpoldstrasse today. For why? Best not ask, all you need to know is the Cutters want the Watch distracted. I make it my business not to offend the Cutters, and if you want a prosperous career you’ll follow my example.",
            "author": "‘The Kaiser’, Altdorf Beggar-King"
        }
      ]
    },
    {
      "name": "Investigator",
      "class": "Burghers",
      "desc": "Perceptive and suspicious, you probe deep into the heart of any crime, and find answers",
      "advances": [
        "I",
        "Agi",
        "Int",
        "Fel",
        "Dex",
        "WP"
      ],
      "incomeSkill": "Perception",
      "races": "Dwarf, Halfling, High Elf, Human",
      "path1": {
        "name": "Sleuth",
        "status": "Silver 1",
        "skills": [
          "Charm",
          "Climb",
          "Cool",
          "Gossip",
          "Intuition",
          "Perception",
          "Stealth (Urban)",
          "Track"
        ],
        "talents": [
          "Alley Cat",
          "Beneath Notice",
          "Read/Write",
          "Sharp"
        ],
        "trappings": [
          "Lantern",
          "Lamp Oil",
          "Journal",
          "Quill and Ink"
        ]
      },
      "path2": {
        "name": "Investigator",
        "status": "Silver 2",
        "skills": [
          "Consume Alcohol",
          "Dodge",
          "Lore (Law)",
          "Melee (Brawling)",
          "Pick Lock",
          "Sleight of Hand"
        ],
        "talents": [
          "Etiquette (Any)",
          "Savvy",
          "Shadow",
          "Tenacious"
        ],
        "trappings": [
          "Leather Jack",
          "Hand Weapon",
          "Magnifying Glass",
          "Lockpick"
        ]
      },
      "path3": {
        "name": "Master Investigator",
        "status": "Silver 3",
        "skills": [
          "Bribery",
          "Evaluate",
          "Leadership",
          "Lore (Any)"
        ],
        "talents": [
          "Bookish",
          "Break and Enter",
          "Sixth Sense",
          "Suave"
        ],
        "trappings": [
          "Assistant",
          "Office"
        ]
      },
      "path4": {
        "name": "Detective",
        "status": "Silver 5",
        "skills": [
          "Intimidate",
          "Lore (Any)"
        ],
        "talents": [
          "Acute Sense (Any)",
          "Savant (Any)",
          "Speedreader",
          "Tower of Memories"
        ],
        "trappings": [
          "Network of Informants",
          "Spyglass"
        ]
      },
      "flavour": [
        "Most Investigators pursue cases involving stolen property, missing persons, or murders, although some research stories for the emerging newssheets, or even blackmail crime suspects for ‘hush money’. Investigative techniques include footprint tracking, cross-examination, deductive reasoning and — if necessary — breaking and entry. Where secular investigators operate on the edge of the law or for an institution like the watch of a Merchant House, religious investigators — most commonly serving Sigmar and Verena —  follow stricter ethical codes. ",
        "Some experienced Investigators cultivate matter-of-fact airs of sophistication to improve their credibility. While Master Investigators often sell themselves as ‘observation specialists’ possessing skills they claim cannot be learned. Considerable self-promotion is required to become one of the famous Detectives who receive job offers from across the Old World. ",
        "<h5>Adventuring</h5>",
        "Investigators are sometimes hired to solve mysteries far too dangerous to tackle alone, which can be the informal creation of an adventuring party. Of course, the very nature of mysteries can result in each solved case leading to yet another mystery. Investigators may therefore enjoy steady employment, provided they’re able to identify willing customers for every new mystery they uncover. "
      ],
      "quotes": [
        {
          "quote": "I regret to inform you that your husband is buried in Frau Kohl’s vegetable garden, beneath the turnips. That will be 6 shillings and 4 pence, please.",
          "author": "Hemlock Surelight, Elven Sleuth"
        },
        {
          "quote": "We can deduce from this splintered door the thief exited with assistance from a very large creature. But said creature couldn’t have descended the narrow stairwell. This leaves only two possible conclusions. Either it materialised from thin air, or else our thief is a shape-changer&hellip;",
          "author": "Zavant Konniger, ‘Sage-Detective’ "
        },
        {
          "quote": "As I am sure you know, I am the world’s greatest detective.  You ’ave ’eard of Alphonse, no?",
          "author": "Alphonse Hercules de Gascoigne, Diminutive Bretonnian Detective"
        }
      ]
    },
    {
      "name": "Merchant",
      "class": "Burghers",
      "desc": "Shrewd and numerate, you buy low to sell high, making more money than most will ever see.",
      "advances": [
        "Agi",
        "WP",
        "Fel",
        "Int",
        "I",
        "WS"
      ],
      "incomeSkill": "Haggle",
      "races": "Dwarf, Halfling, High Elf, Human",
      "path1": {
        "name": "Trader",
        "status": "Silver 2",
        "skills": [
          "Animal Care",
          "Bribery",
          "Charm",
          "Consume Alcohol",
          "Drive",
          "Gamble",
          "Gossip",
          "Haggle"
        ],
        "talents": [
          "Blather",
          "Dealmaker",
          "Read/Write",
          "Suave"
        ],
        "trappings": [
          "Abacus",
          "Mule and Cart",
          "Caravan Tarpaulin",
          "<mono>3d10</mono> Silver Shillings"
        ]
      },
      "path2": {
        "name": "Merchant",
        "status": "Silver 5",
        "skills": [
          "Evaluate",
          "Intuition",
          "Language (Any)",
          "Language (Guilder)",
          "Lore (Local)",
          "Perception"
        ],
        "talents": [
          "Briber",
          "Embezzle",
          "Etiquette (Guilder)",
          "Savvy"
        ],
        "trappings": [
          "Riverboat <em>or</em> 2 Wagons",
          "Guild License",
          "20 GC"
        ]
      },
      "path3": {
        "name": "Master Merchant",
        "status": "Gold 1",
        "skills": [
          "Cool",
          "Language (Classical)",
          "Navigation",
          "Secret Signs (Guilder)"
        ],
        "talents": [
          "Cat-tongued",
          "Etiquette (Any)",
          "Numismatics",
          "Sharp"
        ],
        "trappings": [
          "Town House with Servants",
          "Warehouse",
          "100 GC"
        ]
      },
      "path4": {
        "name": "Merchant Prince",
        "status": "Gold 3",
        "skills": [
          "Intimidate",
          "Lore (Any)"
        ],
        "talents": [
          "Iron Will",
          "Luck",
          "Schemer",
          "Wealthy"
        ],
        "trappings": [
          "2 Riverboats <em>or</em> 4 Wagons",
          "Large Town Estate",
          "2 Warehouses",
          "1,000 GC",
          "Quality Clothing"
        ]
      },
      "flavour": [
        "Most Merchants trade in simple goods such as alcohol, textiles, woodcraft, and pottery. For the ambitious, rare exotic goods such as Dwarf gromril or Eastern spices command higher profits, but risk longer transport routes and require strong foreign contacts. Merchants cannot sell in most towns without approval from (and payments to) a Merchants’ Guild, powerful institutions rivalling the noble courts in political influence. Local commerce is managed by Traders who ship goods between backwater villages and nearby towns. ",
        "Traders can join guilds by apprenticing under Master Merchants as junior business partners. Powerful Merchant Princes owning warehouses and sales offices in multiple cities enjoy the same status as minor nobles. In addition to trading, some Merchants also branch out into banking, moneylending, and investing.",
        "<h5>Adventuring</h5>",
        "Merchants share a certain kinship with adventurers, often hiring them over professional caravan guards. Adventurers are adaptable and enterprising by nature, making them ideal candidates for partnership in a trading company, bringing Merchants into contact with all manner of colourful characters."
      ],
      "quotes": [
        {
          "quote": "If Nuln wants trade wars, so be it, I’ll see their river blockaded and raise taxes on guns. After all, the Emperor owes me a few favours&hellip;",
          "author": "Leo van Haagen, Marienburg Merchant Prince"
        },
        {
          "quote": "How did I become a millionaire? Well, when I was a girl with only a pfennig to my name, I went to the local farmer and bought an apple. Then I walked to the market and sold the apple for two pfennigs. The next day I bought two apples from the farmer and walked to the market again and sold the apples for four pfennigs. And so it went on, every day; I walked to the farm bought some apples, and then walked to the market to sell them at a profit. And by the time I was twenty-five years old, my grandfather died and left me a million crowns.",
          "author": "Johanna Sainzburg, Fresh Fruit Magnate"
        }
      ]
    },
    {
      "name": "Rat Catcher",
      "class": "Burghers",
      "desc": "You spare civilisation from being overrun by vermin with help from your trusty, canine companion.",
      "advances": [
        "WS",
        "BS",
        "WP",
        "T",
        "I",
        "S"
      ],
      "incomeSkill": "Melee (Basic)",
      "races": "Dwarf, Halfling, Human",
      "path1": {
        "name": "Rat Hunter",
        "status": "Brass 3",
        "skills": [
          "Athletics",
          "Animal Training (Dog)",
          "Charm Animal",
          "Consume Alcohol",
          "Endurance",
          "Melee (Basic)",
          "Ranged (Sling)",
          "Stealth (Underground <em>or</em> Urban)"
        ],
        "talents": [
          "Night Vision",
          "Resistance (Disease)",
          "Strike Mighty Blow",
          "Strike to Stun"
        ],
        "trappings": [
          "Sling with Ammunition",
          "Sack",
          "Small but Vicious Dog"
        ]
      },
      "path2": {
        "name": "Rat Catcher",
        "status": "Silver 1",
        "skills": [
          "Animal Care",
          "Gossip",
          "Haggle",
          "Lore (Poison)",
          "Perception",
          "Set Trap"
        ],
        "talents": [
          "Enclosed Fighter",
          "Etiquette (Guilder)",
          "Fearless (Rats)",
          "Very Resilient"
        ],
        "trappings": [
          "Animal Traps",
          "Pole for Dead Rats"
        ]
      },
      "path3": {
        "name": "Sewer Jack",
        "status": "Silver 2",
        "skills": [
          "Climb",
          "Cool",
          "Dodge",
          "Ranged (Crossbow Pistol)"
        ],
        "talents": [
          "Hardy",
          "Stout-hearted",
          "Strong Legs",
          "Tunnel Rat"
        ],
        "trappings": [
          "Davrich Lantern",
          "Hand Weapon",
          "Leather Jack"
        ]
      },
      "path4": {
        "name": "Exterminator",
        "status": "Silver 3",
        "skills": [
          "Leadership",
          "Track"
        ],
        "talents": [
          "Fearless (Skaven)",
          "Menacing",
          "Robust",
          "Strong-minded"
        ],
        "trappings": [
          "Assistant",
          "Large and Vicious Dog",
          "Sack of Poisoned Bait (10 doses of Heartkill)"
        ]
      },
      "flavour": [
        "Rat Catchers patrol every town and city, and for good reason. The Empire’s streets are clogged with food scraps and foulness, perfect breeding grounds for vermin. Rat Catchers earn their crusts by killing these rats, clearing their nests from cellars, and by delving the Empire’s hopelessly infested sewer systems… provided they’re brave enough to face the other things down there. When apprenticed, Rat Catchers usually adopt a stray puppy that they train for ratting. The toughest Rat Catchers are hired by towns as Sewer Jacks to hunt giant rats and other subterranean nasties. On rare occasions, entire towns are overrun and later reclaimed with the aid of Exterminators.",
        "<h5>Adventuring</h5>",
        "Rat Catchers move to new towns when the rats become ‘too big’ or ‘too clever’, or when competition becomes fierce. When journeying, they may befriend those who welcome help from a streetwise slinger, and Rat Catchers are willing to venture into places normal people won’t.",
        "If you want to play a character who may be aware of the ‘too big’ and ‘too clever’ Skaven (see page 336), Rat Catcher is for you. However, the Skaven frequently assassinate any who spread rumours of their existence. Because of this, wise Ratcatchers are unlikely to admit what they know, some even using their professional opinion to actively discredit ‘tall tales’ of ‘rat men’. "
      ],
      "quotes": [
        {
          "quote": "See there by the midden-heap, Otmar? There’s a big one! Make sure it’s dead before you pick it up. It’ll bite yer hand with its poisonous teeth.",
          "author": "Annaliese Rattenfänger, Sewer Jack"
        },
        {
          "quote": "Sorry, mate. The rest of the guild deal with the rats. Me and me mates deal with the bigger ones in the sewers. Tide of them down there, there is...",
          "author": "Mårten Stormdal, Ubersreik Exterminator"
        }
      ]
    },
    {
      "name": "Townsman",
      "class": "Burghers",
      "desc": "Ambitious and socially mobile, you are the hardworking glue that holds urban society together.",
      "advances": [
        "Agi",
        "Int",
        "Fel",
        "I",
        "Dex",
        "WP"
      ],
      "incomeSkill": "Haggle",
      "races": "Dwarf, Halfling, High Elf, Human",
      "path1": {
        "name": "Clerk",
        "status": "Silver 1",
        "skills": [
          "Charm",
          "Climb",
          "Consume Alcohol",
          "Drive",
          "Dodge",
          "Gamble",
          "Gossip",
          "Haggle"
        ],
        "talents": [
          "Alley Cat",
          "Beneath Notice",
          "Etiquette (Servants)",
          "Sturdy"
        ],
        "trappings": [
          "Lodgings",
          "Sturdy Boots"
        ]
      },
      "path2": {
        "name": "Townsman",
        "status": "Silver 2",
        "skills": [
          "Bribery",
          "Evaluate",
          "Intuition",
          "Lore (Local)",
          "Melee (Brawling)",
          "Play (Any)"
        ],
        "talents": [
          "Dealmaker",
          "Embezzle",
          "Etiquette (Any)",
          "Gregarious"
        ],
        "trappings": [
          "Modest Townhouse",
          "Servant",
          "Quill and Ink"
        ]
      },
      "path3": {
        "name": "Town Councillor",
        "status": "Silver 5",
        "skills": [
          "Cool",
          "Lore (Law)",
          "Perception",
          "Research"
        ],
        "talents": [
          "Briber",
          "Public Speaker",
          "Read/Write",
          "Supportive"
        ],
        "trappings": [
          "Coach and Driver",
          "Townhouse"
        ]
      },
      "path4": {
        "name": "Burgomeister",
        "status": "Gold 1",
        "skills": [
          "Lore (Politics)",
          "Intimidate"
        ],
        "talents": [
          "Commanding Presence",
          "Master Orator",
          "Schemer",
          "Suave"
        ],
        "trappings": [
          "Chains of Office",
          "Coach and Footman",
          "Quality Clothing",
          "Large Townhouse with Gardens and Servants"
        ]
      },
      "flavour": [
        "Townsmen meet these thriving centres of trade and commerce’s demand for workers. They fill various roles for private artisans or municipal councils: Bankers, Clerks, Hawkers, Innkeepers, Newspaper Vendors, Ostlers, Shopkeepers, Toll-keepers, Washers, and many more. Pay rates vary; some can haggle for extra commission, whereas civil employees such as lamplighters and toll-keepers are paid fixed salaries. There is little opportunity for promotion, but those with determination, savvy, and luck might eventually own property or a business. ",
        "The most successful Townsmen often join local councils overseeing civic matters, with Burgomeisters — the most important municipal leaders — often enjoying the same social status as Merchant Princes and Guildmasters.",
        "<h5>Adventuring</h5>",
        "Townsmen are part of a growing class of citizen with both time and money at their disposal. Many take one or two days off a week and can easily fit in a life of adventure between shifts or after closing time. Some may wish to go even further afield, and if the Townsman has some money put aside, it should be simple to negotiate some time off with an employer. It’s very common for citizens of the Empire to go on pilgrimages for weeks or months at a time. Skilled workers are always in demand, and there will likely be a role waiting when they come home.  "
      ],
      "quotes": [
        {
          "quote": "I'm afraid you’ll have to remove your backpacks in this shop and leave polearms at the door. The owner deducts broken ceramics from me wage.’",
          "author": "Frida, Part-time Shopkeeper"
        }
      ]
    },
    {
      "name": "Watchman",
      "class": "Burghers",
      "desc": "You maintain the peace and keep the rabble in line so your town doesn't descend into anarchy.",
      "advances": [
        "WS",
        "S",
        "Fel",
        "WP",
        "I",
        "Int"
      ],
      "incomeSkill": "Perception",
      "races": "Dwarf, Halfling, High Elf, Human",
      "path1": {
        "name": "Watch Recruit",
        "status": "Brass 3",
        "skills": [
          "Athletics",
          "Climb",
          "Consume Alcohol",
          "Dodge",
          "Endurance",
          "Gamble",
          "Melee (Any)",
          "Perception"
        ],
        "talents": [
          "Drilled",
          "Hardy",
          "Strike to Stun",
          "Tenacious"
        ],
        "trappings": [
          "Hand Weapon",
          "Leather Jack",
          "Uniform"
        ]
      },
      "path2": {
        "name": "Watchman",
        "status": "Silver 1",
        "skills": [
          "Charm",
          "Cool",
          "Gossip",
          "Intimidate",
          "Intuition",
          "Lore (Local)"
        ],
        "talents": [
          "Break and Enter",
          "Criminal",
          "Night Vision",
          "Sprinter"
        ],
        "trappings": [
          "Lantern and Pole",
          "Lamp Oil",
          "Copper Badge"
        ]
      },
      "path3": {
        "name": "Watch Sergeant",
        "status": "Silver 3",
        "skills": [
          "Entertain (Storytelling)",
          "Haggle",
          "Leadership",
          "Lore (Law)"
        ],
        "talents": [
          "Disarm",
          "Etiquette (Soldiers)",
          "Fearless (Criminals)",
          "Nose for Trouble"
        ],
        "trappings": [
          "Breastplate",
          "Helm",
          "Symbol of Rank"
        ]
      },
      "path4": {
        "name": "Watch Captain",
        "status": "Gold 1",
        "skills": [
          "Lore (Politics)",
          "Ride (Horse)"
        ],
        "talents": [
          "Public Speaker",
          "Robust",
          "Kingpin",
          "Schemer"
        ],
        "trappings": [
          "Riding Horse with Saddle and Tack",
          "Quality Hat",
          "Quality Hand Weapon",
          "Quality Symbol of Rank"
        ]
      },
      "flavour": [
        "Watchmen are employed by local authorities to patrol streets throughout the Empire. Most are little more than well-meaning keepers of the peace, and few know the laws they’re supposed to enforce. Corruption is rampant, and many Watchmen enlist purely for the authority to hurt people or to support local criminal gangs. Some can earn triple their wages by turning a blind eye. ",
        "Only a few towns and cities have professional Watchmen paid to understand and uphold the law; instead, the Emperor’s Peace is normally maintained by the local State Army, who man walls, guard gates, and patrol the streets according to the instructions of their superiors. ",
        "<h5>Adventuring</h5>",
        "Not every Watchman is crooked, but those with morals are soon jaded by the corruption inherent in the system. By joining adventuring parties, principled Watchmen can champion justice on their own terms. Experience of the street makes Watchmen effective combatants in a small party, and their presence can help legitimise a wandering band of ne’er-do-wells."
      ],
      "quotes": [
        {
          "quote": "So I go up to Middenheim, Ulric’s own country, and what did I find? I swear more than half of their City Watch are women! I would have stayed up there for the rest of my career if I could’ve.’",
          "author": "Jana Tennisohn, Chief Inspektor (retired), Nuln City Watch"
        },
        {
          "quote": "Sorry, sir, I’ve got a Halfling killer, a Weirdroot smuggling ring, a gang war, and a noble threatening to have me arrested by my own Station. Your missing cat will have to wait until tomorrow.’",
          "author": "Sergeant Harri Makkenpieser, Altdorf City Watch"
        }
      ]
    },
    {
      "name": "Advisor",
      "class": "Courtiers",
      "desc": "Wise and well-informed, you provide advice and guidance so your employer prospers.",
      "advances": [
        "T",
        "I",
        "Agi",
        "Fel",
        "Int",
        "WP"
      ],
      "incomeSkill": "Lore (Politics)",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "path1": {
        "name": "Aide",
        "status": "Silver 2",
        "skills": [
          "Bribery",
          "Consume Alcohol",
          "Endurance",
          "Gossip",
          "Haggle",
          "Language (Classical)",
          "Lore (Politics)",
          "Perception"
        ],
        "talents": [
          "Beneath Notice",
          "Etiquette (Any)",
          "Gregarious",
          "Read/Write"
        ],
        "trappings": [
          "Writing Kit"
        ]
      },
      "path2": {
        "name": "Advisor",
        "status": "Silver 4",
        "skills": [
          "Charm",
          "Cool",
          "Evaluate",
          "Gamble",
          "Intuition",
          "Lore (Local)"
        ],
        "talents": [
          "Blather",
          "Criminal",
          "Schemer",
          "Supportive"
        ],
        "trappings": [
          "Livery"
        ]
      },
      "path3": {
        "name": "Counsellor",
        "status": "Gold 1",
        "skills": [
          "Entertain (Storytelling)",
          "Language (Any)",
          "Leadership",
          "Lore (Any)"
        ],
        "talents": [
          "Argumentative",
          "Briber",
          "Carouser",
          "Cat-tongued"
        ],
        "trappings": [
          "Quality Clothing",
          "Aide"
        ]
      },
      "path4": {
        "name": "Chancellor",
        "status": "Gold 3",
        "skills": [
          "Lore (Heraldry)",
          "Ride (Horse)"
        ],
        "talents": [
          "Commanding Presence",
          "Embezzle",
          "Kingpin",
          "Suave"
        ],
        "trappings": [
          "Riding Horse with Saddle and Harness",
          "Quality Courtly Garb",
          "Staff of Advisors and Aides"
        ]
      },
      "flavour": [
        "Advisors provide counsel to those they serve. Well-versed in the political and social conditions of their employer’s domain, they are privy to confidential and sensitive information. While many Advisors are born into their positions, others actively seek noble patronage as a path to wealth and power. Some young royals pick their university or childhood friends as their first Aide, trusting them to say what no-one else will. ",
        "Long years at court or in service to a lesser noble pave the way to the loftier heights of their careers. Many Advisors do not serve the nobility at all, instead lending their extensive capabilities to criminals, warlords, merchants, cults, or guilds.",
        "<h5>Adventuring</h5>",
        "If there is something peculiar or dangerous happening within their employer’s domain, then an Advisor is well-placed to investigate. At the higher levels of the career, a Counsellor or Chancellor will have their own trusted staff they can rely on to look after matters if they take a short leave of absence. Advisors can approach different classes of people, including the most difficult to access, and they are already in a position where they are expected to ask questions on behalf of their employer."
      ],
      "quotes": [
        {
          "quote": "Sigmar votes with Reikland for three. The dead Emperor, Mootland, and Reikland will vote the same way, taking Reikland to six. As you know, you need seven votes to become emperor. Given Ar’Ulric always votes for Middenheim, it’s highly unlikely the Imperial seat will return to Nuln while the House of Third Wilhelm flourishes. Best hope for a daughter, your Grace. A marriageable one.",
          "author": "Krammond, Advisor to the Elector Count of Nuln, 2475 IC"
        }
      ]
    },
    {
      "name": "Artist",
      "class": "Courtiers",
      "desc": "You possess an artistic gift, one that transcends daily life and uplifts the souls of others.",
      "path1": {
        "name": "Artist&apos;s Apprentice",
        "skills": [
          "Art (Any)",
          "Cool",
          "Consume Alcohol",
          "Evaluate",
          "Endurance",
          "Gossip",
          "Perception",
          "Stealth (Urban)"
        ],
        "talents": [
          "Artistic",
          "Sharp",
          "Strong Back",
          "Tenacious"
        ],
        "trappings": [
          "Brush <em>or</em> Chisel <em>or</em> Quill Pen"
        ],
        "status": "Silver 1"
      },
      "path2": {
        "name": "Artist",
        "skills": [
          "Climb",
          "Gamble",
          "Haggle",
          "Intuition",
          "Language (Classical)",
          "Trade (Art Supplies)"
        ],
        "talents": [
          "Carouser",
          "Criminal",
          "Gregarious",
          "Nimble Fingered"
        ],
        "trappings": [
          "Sling Bag containing Trade Tools (Artist)"
        ],
        "status": "Silver 3"
      },
      "path3": {
        "name": "Master Artist",
        "skills": [
          "Charm",
          "Leadership",
          "Lore (Art)",
          "Lore (Heraldry)"
        ],
        "talents": [
          "Acute Sense (Any)",
          "Dealmaker",
          "Etiquette (Any)",
          "Nose for Trouble"
        ],
        "trappings": [
          "Apprentices",
          "Patron",
          "Workshop (Artist)"
        ],
        "status": "Silver 5"
      },
      "path4": {
        "name": "Maestro",
        "skills": [
          "Research",
          "Ride (Horse)"
        ],
        "talents": [
          "Ambidextrous",
          "Kingpin",
          "Magnum Opus",
          "Read/Write"
        ],
        "trappings": [
          "Large Workshop (Artist)",
          "Library (Art)",
          "3 Apprentices"
        ],
        "status": "Gold 2"
      },
      "advances": [
        "S",
        "I",
        "Dex",
        "Fel",
        "WP",
        "Int"
      ],
      "incomeSkill": "Art",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "flavour": [
        "Artists use their talents — for painting, sculpting, writing and similar — to create works of fine art. Often their careers begin as Apprentices to experienced Master Artists, though some are simply prodigies. The best can attract a patron, and some end up teaching, forming their own schools of art and attracting the wealthiest of benefactors to their fashionable salons.  ",
        "Sadly, most Artists spend their lives in a vain attempt to prove their value to a society that rarely appreciates them. Some make ends meet through different means: satirising nobles and politicians in cartoons for the Altdorf broadsheets, sketching suspects for watch captains, writing social commentary, or even forging the work of more renowned artists. ",
        "<h5>Adventuring</h5>",
        "Attracting suitable patrons is not always a simple matter, so Artists of all stripes find themselves traveling abroad in search of one. Even those who have the means to support themselves take to the road in search of new sights to paint, sculpt, or inspire them. Holy frescos and reliefs dedicated to the gods are often commissioned in faraway temples, churches, and abbeys. "
      ],
      "quotes": [
        {
          "quote": "Please remain still, my lord. It is rather difficult to capture the majesty of your countenance if you continue to scratch yourself so. Perfect! Now hold that pose for just a few seconds more if you please. And there you’ve gone and done it again. Might I suggest you pay a visit to the apothecary? He may have several effective remedies for lice, especially if you find your incessant squirming as bothersome as I do...",
          "author": "Gottlieb Toman, Painter, prior to his execution"
        }
      ]
    },
    {
      "name": "Duelist",
      "class": "Courtiers",
      "desc": "Your blade is an instrument of justice, bound by long tradition and employed with deadly precision.",
      "advances": [
        "WS",
        "I",
        "Agi",
        "BS",
        "S",
        "WP"
      ],
      "incomeSkill": "Melee (Any)",
      "races": "Dwarf, High Elf, Human",
      "path1": {
        "name": "Fencer",
        "status": "Silver 3",
        "skills": [
          "Athletics",
          "Dodge",
          "Endurance",
          "Heal",
          "Intuition",
          "Language (Classical)",
          "Melee (Any)",
          "Perception"
        ],
        "talents": [
          "Beat Blade",
          "Distract",
          "Feint",
          "Step Aside"
        ],
        "trappings": [
          "Hand Weapon or Rapier",
          "Sling Bag containing Clothing and <mono>1d10</mono> bandages"
        ]
      },
      "path2": {
        "name": "Duellist",
        "status": "Silver 5",
        "skills": [
          "Charm",
          "Cool",
          "Gamble",
          "Melee (Parry)",
          "Ranged (Blackpowder)",
          "Trade (Gunsmith)"
        ],
        "talents": [
          "Combat Reflexes",
          "Etiquette (Any)",
          "Fast Shot",
          "Reversal"
        ],
        "trappings": [
          "Main Gauche or Swordbreaker",
          "Pistol with Gunpowder and Ammunition"
        ]
      },
      "path3": {
        "name": "Duelmaster",
        "status": "Gold 1",
        "skills": [
          "Intimidate",
          "Leadership",
          "Melee (Basic)",
          "Perform (Acrobatics)"
        ],
        "talents": [
          "Ambidextrous",
          "Disarm",
          "Dual Wielder",
          "Riposte"
        ],
        "trappings": [
          "Quality Rapier",
          "Hand Weapon",
          "Trusty Second",
          "2 Wooden Training Swords"
        ]
      },
      "path4": {
        "name": "Judicial Champion",
        "status": "Gold 3",
        "skills": [
          "Lore (Law)",
          "Melee (Any)"
        ],
        "talents": [
          "Combat Master",
          "Menacing",
          "Reaction Strike",
          "Strike to Injure"
        ],
        "trappings": [
          "2 Quality Weapons"
        ]
      },
      "flavour": [
        "Duellists fight on behalf of others — settling matters of honour between organisations or individuals — or as surrogates for the law, representing the accused or the accuser in trials by combat. For some Duellists the act of fighting is reward enough for the considerable risks they face. Training is dangerous, leaving some apprentices crippled or scarred for life. Those who live long enough to learn from their mistakes can aspire to the fame of a Blademaster, teaching their techniques to eager students. Judicial Champions duel on behalf of governments and nobles, and their blades can determine the fates of nations. Some modern Duellists, especially hot-headed Altdorf students, favour pistols. This is regarded by the older generation as dishonourable and foolhardy. ",
        "<h5>Adventuring</h5>",
        "Both inexperienced and esteemed Duellists alike travel the Empire in search of opponents with which to bolster their reputations. For others, the hunt for a veteran instructor drives them to explore the furthest flung of the Old World’s locales. Masters of foreign techniques are also sought by Duellists who wish to add unique styles of fighting to their repertoires. As skilled combatants, Duellists often augment their livelihood with mercenary work, even acting as guards for caravans and riverboats in a pinch. Although Dwarfs have no interest in fencing with flimsy swords and the frippery of the duelling scene, they have long traditions of using combat to resolve bitter disputes, and will travel far to enhance their skills. "
      ],
      "quotes": [
        {
          "quote": "First blood, ye fool! First blood! And here ye’ve gone ’n run ’im through!",
          "author": "Ortolf Ehardt, Burgher"
        },
        {
            "quote": "In my defence, sir, he was the first to do any sort of bleeding.",
            "author": "Rosabel Viernau, Duellist"
        },
        {
          "quote": "Always make sure you have Doktor Schuller on site. Deniability? Good question. Pay her in advance, treat her with civility, and she’ll turn around. Then she sees nothing until the duel is over, one way or another.",
          "author": "Blademaster Aleksandr Amblestadt’s advice to his students"
        }
      ]
    },
    {
      "name": "Envoy",
      "class": "Courtiers",
      "desc": "An articulate emissary, you travel far and wide, negotiating favourable pacts and treaties.",
      "advances": [
        "T",
        "Fel",
        "Agi",
        "Int",
        "I",
        "WP"
      ],
      "incomeSkill": "Charm",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "path1": {
        "name": "Herald",
        "status": "Silver 2",
        "skills": [
          "Athletics",
          "Charm",
          "Drive",
          "Dodge",
          "Endurance",
          "Intuition",
          "Ride (Horse)",
          "Row"
        ],
        "talents": [
          "Blather",
          "Etiquette (Nobles)",
          "Read/Write",
          "Suave"
        ],
        "trappings": [
          "Leather Jack",
          "Livery",
          "Scroll Case"
        ]
      },
      "path2": {
        "name": "Envoy",
        "status": "Silver 4",
        "skills": [
          "Art (Writing)",
          "Bribery",
          "Cool",
          "Gossip",
          "Haggle",
          "Lore (Politics)"
        ],
        "talents": [
          "Attractive",
          "Cat-tongued",
          "Etiquette (Any)",
          "Seasoned Traveler"
        ],
        "trappings": [
          "Quill and Ink",
          "10 sheets of Parchment"
        ]
      },
      "path3": {
        "name": "Diplomat",
        "status": "Gold 2",
        "skills": [
          "Intimidate",
          "Language (Any)",
          "Leadership",
          "Navigation"
        ],
        "talents": [
          "Carouser",
          "Dealmaker",
          "Gregarious",
          "Schemer"
        ],
        "trappings": [
          "Aide",
          "Quality Clothes",
          "Map"
        ]
      },
      "path4": {
        "name": "Ambassador",
        "status": "Gold 5",
        "skills": [
          "Language (Any)",
          "Lore (Any)"
        ],
        "talents": [
          "Briber",
          "Commanding Presence",
          "Noble Blood",
          "Savvy"
        ],
        "trappings": [
          "Aide",
          "Best Quality Courtly Clothes",
          "Staff of Diplomats",
          "Herald"
        ]
      },
      "flavour": [
        "Experts in negotiation and social interaction, Envoys act as agents serving the interests of the Empire, a regional estate, a foreign entity, or a merchant house. Intrigue abounds in courtly circles, and such a career choice is a risky proposition that only grows more perilous at the highest levels of government. Even when granted some manner of immunity against foreign laws or customs, Ambassadors must tread carefully. ",
        "Envoys must first prove their abilities in a lesser capacity as a Herald, assisting Diplomats in hammering out the tedious minutiae of deals, or representing merchants, guilds, or cults, building their reputations with each pact they establish. Some Envoys find employ with Mercenary Companies; the best of these can secure a profit for their employers without shedding a drop of blood. ",
        "<h5>Adventuring</h5>",
        "Envoys travel a great deal, meeting countless individuals from all walks of life, cultivating contacts across the Old World. They are sometimes expected to get their hands dirty to ensure their master’s wishes are fulfilled. If failure doesn’t lead to their immediate death, they might find themselves on the run from their own employers."
      ],
      "quotes": [
        {
          "quote": "Watch that one. She’s got a tongue like a snake and nary a scruple. Still, she’s got a weakness for Elven wine and handsome young footmen. I’m sure you can arrange something... scandalous.",
          "author": "Odmar Horst, Guild Envoy"
        },
        {
          "quote": "My advice to his Imperial Majesty to ensure we maintain our vital trade link with Karak Ziflin: grow a beard and keep your promises.",
          "author": "Letter to the High Lord of the Chair, from Ambassador Willemijna von Kotzdam"
        }
      ]
    },
    {
      "name": "Noble",
      "class": "Courtiers",
      "desc": "As the scion of a noble bloodline, you stand proudly from the common rabble.",
      "advances": [
        "WS",
        "I",
        "Dex",
        "Fel",
        "Int",
        "WP"
      ],
      "incomeSkill": "Leadership",
      "races": "Dwarf, High Elf, Human, Wood Elf",
      "path1": {
        "name": "Scion",
        "status": "Gold 1",
        "skills": [
          "Bribery",
          "Consume Alcohol",
          "Gamble",
          "Intimidate",
          "Leadership",
          "Lore (Heraldry)",
          "Melee (Fencing)",
          "Play (Any)"
        ],
        "talents": [
          "Etiquette (Nobles)",
          "Luck",
          "Noble Blood",
          "Read/Write"
        ],
        "trappings": [
          "Courtly Garb",
          "Foil <em>or</em> Hand Mirror",
          "Jewellery worth <mono>3d10</mono> GC",
          "Personal Servant"
        ]
      },
      "path2": {
        "name": "Noble",
        "status": "Gold 3",
        "skills": [
          "Charm",
          "Gossip",
          "Language (Classical)",
          "Lore (Local)",
          "Ride (Horse)",
          "Melee (Parry)"
        ],
        "talents": [
          "Attractive",
          "Briber",
          "Carouser",
          "Suave"
        ],
        "trappings": [
          "4 Household Servants",
          "Quality Courtly Garb",
          "Courtly Garb",
          "Riding Horse with Saddle and Harness <em>or</em> Coach",
          "Main Gauche <em>or</em> Quality Cloak",
          "Jewellery worth 50 GC"
        ]
      },
      "path3": {
        "name": "Magnate",
        "status": "Gold 5",
        "skills": [
          "Language (Any)",
          "Intuition",
          "Lore (Politics)",
          "Perception"
        ],
        "talents": [
          "Coolheaded",
          "Dealmaker",
          "Public Speaker",
          "Schemer"
        ],
        "trappings": [
          "2 sets of Quality Courtly Garb",
          "200 GC",
          "Fiefdom",
          "Jewellery worth 200 GC",
          "Signet Ring"
        ]
      },
      "path4": {
        "name": "Noble Lord",
        "status": "Gold 7",
        "skills": [
          "Lore (Any)",
          "Track"
        ],
        "talents": [
          "Commanding Presence",
          "Iron Will",
          "Warleader",
          "Wealthy"
        ],
        "trappings": [
          "4 sets of Best Quality Courtly Garb",
          "Quality Foil <em>or</em> Hand Mirror",
          "500 GC",
          "Jewellery worth 500 GC",
          "Province"
        ]
      },
      "flavour": [
        "The blood of highborn ancestors courses through the veins of the nobility, granting Nobles the power to rule, make laws, and dispense justice. Nobles often inherit vast wealth and holdings, although only those with a direct line of succession can expect to wield any genuine power. Many spend their lives consolidating this wealth and power through business, politics, and conquest. Those without substantial inheritance must make their own way in the world, joining the State Army or navy as a commissioned officer, or commit to service of one of the gods. It is common to find Nobles working for more powerful noble houses, such as sending their daughters to serve as hand maidens to royalty.",
        "<h5>Adventuring</h5>",
        "Many Nobles serve their families abroad in the hopes they can advance their station and earn acclaim amongst their peers. Others, bored by pampered living, search for excitement as adventurers and would-be heroes. Scions with few prospects sometimes seek their fortunes far from courtly intrigue and betrayal, taking up other occupations to expand their options. ",
        "The GM should consider carefully whether to allow players to choose the Noble career. It comes with a lot of trappings and temporal power, especially at the higher levels of the career. "
      ],
      "quotes": [
        {
          "quote": "Everyone thinks that Nobles have it easy, but it’s a treacherous life and you’re always standing in someone’s way. I’d rather take my chances out here with you lot than risk assassins back home. Give me a herd of Beastmen any day.",
          "author": "‘Lugner’ Rodziner, Tenth of his Line"
        }
      ]
    },
    {
      "name": "Servant",
      "class": "Courtiers",
      "desc": "You serve the great and the good, performing tasks in support of your employer.",
      "advances": [
        "S",
        "T",
        "Agi",
        "I",
        "Int",
        "Fel"
      ],
      "incomeSkill": "Endurance",
      "races": "Dwarf, Halfling, Human",
      "path1": {
        "name": "Menial",
        "status": "Silver 1",
        "skills": [
          "Athletics",
          "Climb",
          "Drive",
          "Dodge",
          "Endurance",
          "Intuition",
          "Perception",
          "Stealth (Any)"
        ],
        "talents": [
          "Beneath Notice",
          "Strong Back",
          "Strong-minded",
          "Sturdy"
        ],
        "trappings": [
          "Floor Brush"
        ]
      },
      "path2": {
        "name": "Servant",
        "status": "Silver 3",
        "skills": [
          "Animal Care",
          "Consume Alcohol",
          "Evaluate",
          "Gamble",
          "Gossip",
          "Haggle"
        ],
        "talents": [
          "Etiquette (Servants)",
          "Shadow",
          "Tenacious",
          "Well-prepared"
        ],
        "trappings": [
          "Livery"
        ]
      },
      "path3": {
        "name": "Attendant",
        "status": "Silver 5",
        "skills": [
          "Charm",
          "Cool",
          "Initimidate",
          "Lore (Local)"
        ],
        "talents": [
          "Embezzle",
          "Resistance (Poison)",
          "Suave",
          "Supportive"
        ],
        "trappings": [
          "Quality Livery",
          "Storm Lantern",
          "Tinderbox",
          "Lamp Oil"
        ]
      },
      "path4": {
        "name": "Steward",
        "status": "Gold 1",
        "skills": [
          "Leadership",
          "Melee (Basic)"
        ],
        "talents": [
          "Etiquette (Any)",
          "Numismatics",
          "Read/Write",
          "Savvy"
        ],
        "trappings": [
          "Hand Weapon",
          "Fine Clothes",
          "Servant"
        ]
      },
      "flavour": [
        "Most who serve the nobility come from peasant stock, grateful to escape the beleaguered masses tending the fields. Servants are taught comportment along with the skills necessary to cook, clean, buttle, and groom on behalf of their betters. They are provided with room, board, and a wage, but the quality of a Servant’s life depends on how well treated they are. Some Servants dress their employer, cook or serve meals, manage stores of wine and other consumables, or tend to the grounds. ",
        "Experienced Servants can aspire to the role of personal Attendant, or even Steward, managing the domestic affairs of their employer and overseeing other Servants. Those directly serving royalty are often drawn from noble stock rather than the peasantry.",
        "<h5>Adventuring</h5>",
        "A Servant may be required to accompany their employer, travelling from winter to summer domains, or visiting the great cities. This can provide opportunities for adventures around the Empire. Bored heirs, closeted by over-protective parents, might treat their young Servants more like friends, providing them with encouragement and funds to seek out adventures, living vicariously through them when they report back with tales of derring-do. Favoured Servants are, on occasion, entrusted with duties that take them beyond their familiar surroundings, or even loaned to other family members or peers."
      ],
      "quotes": [
        {
          "quote": "Only a fool mistreats those entrusted to cook food and pour wine. Believe me, there’s no end of damage a spiteful servant can wreak upon the unwise.",
          "author": "Baron Gerber Jochutzmann"
        },
        {
          "quote": "Why she insists on takin’ that blasted cat with her is beyond me. Between her wardrobes, her travelling library, and her damned butterfly collection, I’m at my wit’s end! And when it gets lost — oh, it will, believe me — she’ll expect me to find her a new one. Sigmar! Where does one find a leopard kitten in Ubersreik?",
          "author": "Reynald, Lady Kirstin Gottlieb’s Porter"
        }
      ]
    },
    {
      "name": "Spy",
      "class": "Courtiers",
      "desc": "You are the eyes and ears of another, exposing secrets and spreading lies.",
      "advances": [
        "Agi",
        "WP",
        "Fel",
        "WS",
        "I",
        "Int"
      ],
      "incomeSkill": "Gossip",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "path1": {
        "name": "Informer",
        "status": "Brass 3",
        "skills": [
          "Bribery",
          "Charm",
          "Cool",
          "Gamble",
          "Gossip",
          "Haggle",
          "Perception",
          "Stealth (Any)"
        ],
        "talents": [
          "Blather",
          "Carouser",
          "Gregarious",
          "Shadow"
        ],
        "trappings": [
          "Charcoal stick",
          "Sling Bag containing 2 different sets of Clothing and Hooded Cloak"
        ]
      },
      "path2": {
        "name": "Spy",
        "status": "Silver 3",
        "skills": [
          "Climb",
          "Entertain (Act)",
          "Intuition",
          "Melee (Basic)",
          "Secret Signs (Any)",
          "Sleight of Hand"
        ],
        "talents": [
          "Etiquette (Any)",
          "Lip Reading",
          "Read/Write",
          "Secret Identity"
        ],
        "trappings": [
          "Informer",
          "Hand Weapon",
          "Disguise Kit",
          "Ring of Informers",
          "Telescope"
        ]
      },
      "path3": {
        "name": "Agent",
        "status": "Gold 1",
        "skills": [
          "Animal Care",
          "Animal Training (Pigeon)",
          "Language (Any)",
          "Leadership"
        ],
        "talents": [
          "Attractive",
          "Cat-tongued",
          "Master of Disguise",
          "Mimic"
        ],
        "trappings": [
          "Book (Cryptography)",
          "Ring of Spies and Informers",
          "Loft of Homing Pigeons",
          "Quill and Ink"
        ]
      },
      "path4": {
        "name": "Spymaster",
        "status": "Gold 4",
        "skills": [
          "Research",
          "Lore (Any)"
        ],
        "talents": [
          "Briber",
          "Schemer",
          "Suave",
          "Tower of Memories"
        ],
        "trappings": [
          "Office and Staff",
          "Large Spy Ring of Agents, Spies, and Informers"
        ]
      },
      "flavour": [
        "Spies are brave (or foolhardy) individuals who secretly gather information for their clients. A well-placed Spy is an asset to anyone desiring knowledge of an opponent’s activities.  Many take months, even years, cultivating an unremarkable identity with ties to one or more groups or individuals. Their actions are risky. If caught, Spies are rarely executed quickly and often tortured at length.  Many Informers are forced into spying via blackmail or other threats. A skilled Spy will earn well, but extrication from such activities can be more perilous than the activities themselves. Given Spies avoid undue attention, they aren’t typically known by their reputations unless those reputations are as anonymous as they are.",
        "<h5>Adventuring</h5>",
        "Spies are found throughout the Old World and in service to many prominent organisations. During their investigations, Spies are easily embroiled in plots both sinister and benign. They are often forced to flee when their identities or allegiances are exposed. These individuals use their abilities to disguise their true nature and avoid capture. Joining a group of unwitting heroes under false pretences as part of an escape attempt has led more than one Spy to an adventuring career."
      ],
      "quotes": [
        {
          "quote": "Treason? That’s it? For the love of... why didn’t I qualify for high treason? I’ve done plenty of other terrible things. Should I list them off for you? What’s that? It’s not personal? Well, it is now, you prig-powdered gaff",
          "author": "Sieben Dietmund, Accused of Treason and Contempt"
        }
      ]
    },
    {
      "name": "Warden",
      "class": "Courtiers",
      "desc": "You oversee another's territory, ensuring it is porperly maintained and, if necessary, protected.",
      "advances": [
        "S",
        "T",
        "WP",
        "WS",
        "Fel",
        "Int"
      ],
      "incomeSkill": "Perception",
      "races": "Dwarf, Halfling, High Elf, Human",
      "path1": {
        "name": "Custodian",
        "status": "Silver 1",
        "skills": [
          "Athletics",
          "Charm Animal",
          "Consume Alcohol",
          "Cool",
          "Endurance",
          "Intuition",
          "Lore (Local)",
          "Perception"
        ],
        "talents": [
          "Menacing",
          "Night Vision",
          "Sharp",
          "Strike to Stun"
        ],
        "trappings": [
          "Keys",
          "Lantern and Lamp Oil",
          "Livery"
        ]
      },
      "path2": {
        "name": "Warden",
        "status": "Silver 3",
        "skills": [
          "Animal Care",
          "Melee (Basic)",
          "Outdoor Survival",
          "Ranged (Bow)",
          "Ride (Horse)",
          "Swim"
        ],
        "talents": [
          "Animal Affinity",
          "Etiquette (Servants)",
          "Strider (Any)",
          "Rover"
        ],
        "trappings": [
          "Hand Weapon <em>or</em> Bow with 10 Arrows",
          "Riding Horse with Saddle and Harness",
          "Leather Jack"
        ]
      },
      "path3": {
        "name": "Seneschal",
        "status": "Gold 1",
        "skills": [
          "Bribery",
          "Charm",
          "Gossip",
          "Leadership"
        ],
        "talents": [
          "Embezzle",
          "Numismatics",
          "Read/Write",
          "Supportive"
        ],
        "trappings": [
          "Breastplate",
          "Ceremonial Staff of Office",
          "Staff of Wardens and Custodians"
        ]
      },
      "path4": {
        "name": "Governor",
        "status": "Gold 3",
        "skills": [
          "Evaluate",
          "Language (Any)"
        ],
        "talents": [
          "Commanding Presence",
          "Etiquette (Any)",
          "Savant (Local)",
          "Suave"
        ],
        "trappings": [
          "Aide",
          "Governor's Residence",
          "Servant"
        ]
      },
      "flavour": [
        "Wardens see to the care and stewardship of their employer’s holdings. Failure to improve — or, at the very least, maintain — an employer’s lands or provisions is often met with disfavour. In some instances, multiple wardens work together to keep their employer’s estate in correct order. ",
        "A Warden’s oversight can cover a variety of duties: ensuring the upkeep of a grand estate, overseeing a lord’s hunting grounds, or caring for a rarely-visited holidaying home. Wardens might keep watch over forested or agricultural lands, or see to the maintenance of lakes, rivers, or ponds. Those in the employ of the richest and most powerful can rise to immensely powerful positions themselves. ",
        "<h5>Adventuring</h5>",
        "Wardens rarely travel unless their duties call for it. That said, even those assigned to oversee an estate’s lands or hunting grounds must make regular patrols to assess the property’s condition and to discourage poachers. When between jobs, Wardens often find work as guides or hunters, and such activities can lead to much excitement or terror. Wardens with a grudge against former masters might even be inclined to provide enemies with confidential information regarding their old estates."
      ],
      "quotes": [
        {
          "quote": "Yes, m’lord, the duke has been a-bed this last decade. And, yes, m’lord, I am running his estate. No, m’lord, I don’t see that changing any time soon. After all, in Penzkirchen, my word is now law… Arrest him!",
          "author": "W. Edvart Kurtz, Governor of Penzkirchen"
        }
      ]
    },
    {
      "name": "Baliff",
      "class": "Peasants",
      "desc": "You are an official trusted by local rulers to administer their lands efficiently and firmly.",
      "advances": [
        "WS",
        "I",
        "WP",
        "Fel",
        "Agi",
        "Int"
      ],
      "incomeSkill": "Intimidate",
      "races": "Dwarf, Halfling, Human",
      "path1": {
        "name": "Tax Collector",
        "status": "Silver 1",
        "skills": [
          "Cool",
          "Dodge",
          "Endurance",
          "Gossip",
          "Haggle",
          "Intimidate",
          "Melee (Basic)",
          "Perception"
        ],
        "talents": [
          "Embezzle",
          "Numismatics",
          "Strong Back",
          "Tenacious"
        ],
        "trappings": [
          "Hand Weapon",
          "Small Lock Box and Key"
        ]
      },
      "path2": {
        "name": "Baliff",
        "status": "Silver 5",
        "skills": [
          "Bribery",
          "Charm",
          "Evaluate",
          "Intuition",
          "Leadership",
          "Lore (Local)"
        ],
        "talents": [
          "Break and Enter",
          "Criminal",
          "Public Speaking",
          "Strike to Stun"
        ],
        "trappings": [
          "Leather Jack",
          "3 Tax Collectors"
        ]
      },
      "path3": {
        "name": "Reeve",
        "status": "Gold 1",
        "skills": [
          "Animal Care",
          "Lore (Heraldry)",
          "Navigation",
          "Ride (Horse)"
        ],
        "talents": [
          "Kingpin",
          "Menacing",
          "Nose for Trouble",
          "Read/Write"
        ],
        "trappings": [
          "Horse with Saddle and Tack",
          "Breastplate",
          "Baliff"
        ]
      },
      "path4": {
        "name": "Magistrate",
        "status": "Gold 3",
        "skills": [
          "Language (Classical)",
          "Lore (Law)"
        ],
        "talents": [
          "Commanding Presence",
          "Iron Will",
          "Savvy",
          "Schemer"
        ],
        "trappings": [
          "Library (Law)",
          "Quality Robes",
          "Seal of Office"
        ]
      },
      "flavour": [
        "Nobles entrust Bailiffs to gather dues from their lands. Some Bailiffs are respected and upstanding, attending throng at the temple of Sigmar every week. Others are bullies, happy to enforce their lord’s rights over property and possessions with threats and violence. Long-serving bailiffs often become trusted servants of the local noble family and enjoy considerable perks. Reeves have a broader reach and greater responsibility. They keep order and maintain the borders of the lord’s lands, resolving disputes with neighbouring estates. ",
        "Some magistrates are lay-members of the cult of Verena, seeking guidance and wisdom from blind Justice on any difficult cases they judge. However, most provincial magistrates simply find themselves arbitrating a series of petty disputes over livestock and farmland borders.",
        "<h5>Adventuring</h5>",
        "Most Bailiffs have a degree of autonomy, granting them ample opportunity to turn their attention to private matters, or to hire others to do so on their behalf. As many also have broad authority in the areas they influence, they are frequently sent by their employers to resolve problems, which can often lead to unexpected places."
      ],
      "quotes": [
        {
          "quote": "Aye, it’s been a poor harvest, but dues are dues. I’ll take half now and half on Marktag. How’s that? It’s the best I can offer, can’t say fairer than that.",
          "author": "Lena Sauer, Bailiff"
        },
        {
          "quote": "I’ll go up and have a look at the grazing land in question myself. Until then, I want no trouble from any of your boisterous offspring, do I make myself clear, Bauer, Meier? And you will pay equal shares for the damage to the inn, or you will forfeit any claim you might, or might not have, on the land.",
          "author": "Lorenz Schulte, Reeve of Elster Vale"
        }
      ]
    },
    {
      "name": "Hedge Witch",
      "class": "Peasants",
      "desc": "Wise and secretive, you guide your community using ancient magic handed down for generations.",
      "advances": [
        "T",
        "I",
        "Dex",
        "Int",
        "Fel",
        "WP"
      ],
      "incomeSkill": "Intuition",
      "races": "Human",
      "path1": {
        "name": "Hedge Apprentice",
        "status": "Brass 1",
        "skills": [
          "Channelling",
          "Endurance",
          "Intuition",
          "Language (Magick)",
          "Lore (Folklore)",
          "Lore (Herbs)",
          "Outdoor Survival",
          "Perception"
        ],
        "talents": [
          "Fast Hands",
          "Petty Magic",
          "Rover",
          "Strider (Woodlands)"
        ],
        "trappings": [
          "<mono>1d10</mono> Lucky Charms",
          "Quarterstaff",
          "Backpack"
        ]
      },
      "path2": {
        "name": "Hedge Witch",
        "status": "Brass 2",
        "skills": [
          "Cool",
          "Gossip",
          "Heal",
          "Lore (Local)",
          "Trade (Charms)",
          "Trade (Herbalist)"
        ],
        "talents": [
          "Aethyric Attunement",
          "Animal Affinity",
          "Arcane Magic (Hedgecraft)",
          "Sixth Sense"
        ],
        "trappings": [
          "Antitoxin Kit",
          "Healing Poultice",
          "Trade Tools (Herbalist)"
        ]
      },
      "path3": {
        "name": "Hedge Master",
        "status": "Brass 3",
        "skills": [
          "Haggle",
          "Lore (Genealogy)",
          "Lore (Magic)",
          "Lore (Spirits)"
        ],
        "talents": [
          "Craftsman (Herbalist)",
          "Magical Sense",
          "Pure Soul",
          "Resistance (Disease)"
        ],
        "trappings": [
          "Isolated Hut",
          "Apprentice"
        ]
      },
      "path4": {
        "name": "Hedgewise",
        "status": "Brass 5",
        "skills": [
          "Intimidate",
          "Pray"
        ],
        "talents": [
          "Acute Sense (Any)",
          "Master Craftsman (Herbalist)",
          "Night Vision",
          "Strong-minded"
        ],
        "trappings": [
          "Assortment of Animal Skulls",
          "Ceremonial Cloak and Garland"
        ]
      },
      "flavour": [
        "Witch Hunters use the term ‘Hedge Witch’ for any illegal spellcaster, but this was not always so. Once Hedge Witches were respected members of rural communities, practising magics older than the forests. But decades of persecution since the founding of the Colleges of Magic have left the few surviving Hedge Witches disparate and broken. They hide in the quietest corners of the Old World, their smoky huts and creaking hovels standing astride the boundary between civilisation and the trackless wilds.  Most Hedge Witches are solitary to protect themselves from prying strangers, but their talents are often known to locals. Their knowledge of warding evil is usually secret, but their herbalism, midwifery, and healing arts are quickly sought in times of need.",
        "<h5>Adventuring</h5>",
        "A Hedge Witch is often the first to notice supernatural foul play. The subsequent investigations often lead to all sorts of dangers and adventure. When Witch Hunters come to town, Hedge Witches often take a leave of absence, lying low or travelling elsewhere until danger is passed.",
        "The Hedgefolk are known by many names across the Empire, but have one thing in common: the goal of preserving their ancient traditions from destruction. Hedge Witches have little love for the Colleges of Magic, knowing any child taken by them will likely never return to serve their community, instead pressed into service in some far-off war. Whenever possible they hide children they consider ‘blessed’ from passing wizards, although occasionally one will be sent to the Colleges — as a sacrifice or a spy, who can say?"
      ],
      "quotes": [
        {
          "quote": "We tell the folk that the offering o’ fish is for Grandfather Reik, ‘cause it makes them feel safer than having to explain the river is home to an ‘ungry spirit. It keeps the spirit safe, too.",
          "author": "Alt Zaunreiter, Hedgewise"
        }
      ]
    },
    {
      "name": "Herbalist",
      "class": "Peasants",
      "races": "Halfling, High Elf, Human, Wood Elf",
      "desc": "Skilled botanists who use Rhya's bounty to create cures for many ailments.",
      "advances": [
        "T",
        "I",
        "Agi",
        "Dex",
        "Fel",
        "Int"
      ],
      "incomeSkill": "Trade (Herbalist)",
      "path1": {
        "name": "Herb Gatherer",
        "status": "Brass 2",
        "skills": [
          "Charm Animal",
          "Climb",
          "Endurance",
          "Lore (Herbs)",
          "Outdoor Survival",
          "Perception",
          "Swim",
          "Trade (Herbalist)"
        ],
        "talents": [
          "Acute Sense (Taste)",
          "Orientation",
          "Rover",
          "Strider (Any)"
        ],
        "trappings": [
          "Boots",
          "Cloak",
          "Sling Bag containing Assortment of Herbs"
        ]
      },
      "path2": {
        "name": "Herbalist",
        "status": "Brass 4",
        "skills": [
          "Consume Alcohol",
          "Cool",
          "Gossip",
          "Haggle",
          "Heal",
          "Lore (Local)"
        ],
        "talents": [
          "Dealmaker",
          "Nimble Fingered",
          "Sharp",
          "Sturdy"
        ],
        "trappings": [
          "Hand Weapon (Sickle)",
          "Healing Poultice",
          "Trade Tools (Herbalist)"
        ]
      },
      "path3": {
        "name": "Herb Master",
        "status": "Silver 1",
        "skills": [
          "Intuition",
          "Leadership",
          "Lore (Medicine)",
          "Trade (Poisons)"
        ],
        "talents": [
          "Craftsman (Herbalist)",
          "Field Dressing",
          "Hardy",
          "Savvy"
        ],
        "trappings": [
          "Herb Gatherer",
          "3 Healing Poultices",
          "Healing Draught",
          "Workshop (Herbalist)"
        ]
      },
      "path4": {
        "name": "Herbwise",
        "status": "Silver 3",
        "skills": [
          "Drive",
          "Navigation"
        ],
        "talents": [
          "Concoct",
          "Master Tradesman (Herbalist)",
          "Resistance (Poison)",
          "Savant (Herbs)"
        ],
        "trappings": [
          "Pony and Cart"
        ]
      },
      "flavour": [
        "Medicines from apothecaries are expensive and rarely available in the Reikland’s hinterlands, so peasants rely on the healing power of plants gathered, doctored, and administered by Herbalists. Most Herbalists’ lore is verbally passed down from master to apprentice, so names for illnesses and treatments often vary from village to village. The most experienced Herbwises are sent for in cases of mysterious or stubborn sicknesses. Herbalists dedicate time to visiting the sick, diagnosing their ailments and searching for herbs to treat them with. Some Herbalists ply a darker trade, sought out by those who can pay a high price for the illicit substances they offer. Although an untrue stereotype, it’s a standing joke in the trade that Halfling Herbalists are only interested in pipeweed and wyrdroot.",
        "<h5>Adventuring</h5>",
        "With knowledge of poultices and potions, Herbalists can easily find a place with a band of travellers or mercenaries. When particularly virulent diseases take hold, Herbwises often send their apprentices to far off places in search of rarer herbs, and some find themselves in all manner of unexpected trouble. The Wood Elves’ knowledge of plants and herbs is legendary. In the Grey Mountains it is said that The Goddess Shallya wandered Athel Loren to learn their lore when Ranald was dying of an affliction she could not cure. High Elves who study the art of herbalism follow Lileath the Maiden’s teachings, and it’s rumoured there is an ancient elven library in Marienburg which records the medicinal use of every plant in the Old World, although no Human has yet been granted access. "
      ],
      "quotes": [
        {
          "quote": "This is beyond my skill to heal. The wound’s been infected and it’s tainting his blood; he needs a doctor, or Shallya’s aid. I can give you something to make sure he’s comfortable on the journey to town. And something for you, too, to calm your nerves.",
          "author": "Kurtis Schwarz, Herbalist"
        }
      ]
    },
    {
      "name": "Hunter",
      "class": "Peasants",
      "desc": "Tough, independent killers who make a living off the fur and flesh of wild creatures.",
      "path1": {
        "name": "Trapper",
        "skills": [
          "Charm Animal",
          "Climb",
          "Endurance",
          "Lore (Beasts)",
          "Outdoor Survival",
          "Perception",
          "Ranged (Sling)",
          "Set Trap"
        ],
        "talents": [
          "Hardy",
          "Rover",
          "Strider (Any)",
          "Trapper"
        ],
        "trappings": [
          "Selection of Animal Traps",
          "<weapon>Hand Weapon</weapon>",
          "<weapon>Sling</weapon> with 10 <weapon>Stone Bullets</weapon>",
          "Sturdy Boots and Cloak"
        ],
        "status": "Brass 2"
      },
      "path2": {
        "name": "Hunter",
        "skills": [
          "Cool",
          "Intuition",
          "Melee (Basic)",
          "Ranged (Bow)",
          "Secret Signs (Hunter)",
          "Stealth (Rural)"
        ],
        "talents": [
          "Accurate Shot",
          "Fast Shot",
          "Hunter&apos;s Eye",
          "Marksman"
        ],
        "trappings": [
          "<weapon>Bow</weapon> with 10 <weapon>arrows</weapon>"
        ],
        "status": "Brass 4"
      },
      "path3": {
        "name": "Tracker",
        "skills": [
          "Navigation",
          "Ride (Horse)",
          "Swim",
          "Track"
        ],
        "talents": [
          "Acute Sense (Any)",
          "Deadeye Shot",
          "Fearless (Animals)",
          "Sharpshooter"
        ],
        "trappings": [
          "Backpack",
          "Bedroll",
          "Tent"
        ],
        "status": "Silver 1"
      },
      "path4": {
        "name": "Huntsmaster",
        "skills": [
          "Animal Care",
          "Animal Training (Any)"
        ],
        "talents": [
          "Fearless (Monsters)",
          "Robust",
          "Sniper",
          "Sure Shot"
        ],
        "trappings": [
          "Riding Horse with Saddle and Tack",
          "Kennel of Hunting Dogs"
        ],
        "status": "Gold 2"
      },
      "advances": [
        "S",
        "T",
        "Dex",
        "BS",
        "I",
        "Int"
      ],
      "incomeSkill": "Outdoor Survival",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "flavour": [
        "‘Taal’s Bounty’ is a common greeting in Hochland, where locals proclaim a proud hunting heritage that goes back to the time of Sigmar. Most in the Empire hunt, either as a hobby, a profession, or a necessity, and many Hunters turn to poaching when times are lean. ",
        "Particularly skilled Hunters might be engaged as a noble’s Huntsmaster, granting access to fine weapons, horses, and falcons. Elves and Dwarfs have little care for the boundaries of men and will occasionally venture deep into Human territory tracking a challenging prize. Stories of the Wood Elves’ Wild Hunt petrify children of the Grey Mountains, and not without cause, for if any intruder strays too close to Elven lands, then the hunters quickly become the hunted.",
        "<h5>Adventuring</h5>",
        "A common punishment for hunter caught poaching is to lose two fingers. Faced with being unable to draw a bow, many will cut and run before the punishment can be administered, preferring to take a chance in the forests.  Around the fertile villages of the Suden Vorbergland, Hunters are losing ground to farmers as the trees are cut back and nobles reserve what hunting is left for sport.  The Imperial Army is always on the lookout for reliable, local hunters to support their army as they march, acting as support archers or scouts. A life of adventure awaits any Hunter willing to take the Emperor’s Shilling."
      ],
      "quotes": [
        {
          "quote": "My lord, those tracks… we’re not following a stag. There are Turnskins in these woods.’",
          "author": "Gundred Maynir, Huntsmaster"
        },
        {
          "quote": "Are you trying to tell me hunting’s not a sport because both sides don’t know they’re playing? Might I suggest you’d been hunting the wrong game.",
          "author": "Graf Bernard Leutze von Holthausen"
        }
      ]
    },
    {
      "name": "Miner",
      "class": "Peasants",
      "races": "Dwarf, Halfling, Human",
      "desc": "A hewer of stone, you pursue back-breaking work in the darkest depths of the world.",
      "advances": [
        "S",
        "T",
        "WP",
        "WS",
        "I",
        "Fel"
      ],
      "incomeSkill": "Melee (Two-Handed)",
      "path1": {
        "name": "Prospector",
        "status": "Brass 2",
        "skills": [
          "Cool",
          "Endurance",
          "Intuition",
          "Lore (Local)",
          "Melee (Two-Handed)",
          "Outdoor Survival",
          "Perception",
          "Swim"
        ],
        "talents": [
          "Rover",
          "Strider (Rocky)",
          "Sturdy",
          "Tenacious"
        ],
        "trappings": [
          "Charcoal Stick",
          "Crude Map",
          "Pan",
          "Spade"
        ]
      },
      "path2": {
        "name": "Miner",
        "status": "Brass 4",
        "skills": [
          "Climb",
          "Consume Alcohol",
          "Evaluate",
          "Melee (Basic)",
          "Secret Signs (Miners)",
          "Trade (Explosives)"
        ],
        "talents": [
          "Night Vision",
          "Strike Mighty Blow",
          "Strong Back",
          "Very Strong"
        ],
        "trappings": [
          "Davrich Lamp",
          "Hand Weapon (Pick)",
          "Lamp Oil",
          "Leather Jack"
        ]
      },
      "path3": {
        "name": "Master Miner",
        "status": "Brass 5",
        "skills": [
          "Gossip",
          "Lore (Geology)",
          "Stealth (Underground)",
          "Trade (Engineer)"
        ],
        "talents": [
          "Careful Strike",
          "Craftsman (Explosives)",
          "Tinker",
          "Tunnel Rat"
        ],
        "trappings": [
          "Great Weapon (Two-handed Pick)",
          "Helmet",
          "Trade Tools (Engineer)"
        ]
      },
      "path4": {
        "name": "Mine Foreman",
        "status": "Silver 4",
        "skills": [
          "Charm",
          "Leadership"
        ],
        "talents": [
          "Argumentative",
          "Strong-minded",
          "Embezzle",
          "Read/Write"
        ],
        "trappings": [
          "Crew of Miners",
          "Writing Kit"
        ]
      },
      "flavour": [
        "Many prospectors are tempted by stories of gold in the Skaag Hills, but real mining is hard work down dark, dangerous tunnels. Adept at constructing supports and assessing mineral ores for their value, Miners are alert to unexpected dangers from explosive gas to tunnelling Greenskins, and are notoriously tough, both physically and mentally. Prospectors usually work on commission, with a license to prospect in return for sharing finds with the local lord. Some noble houses’ fortunes are built on the rich mines in their lands, and often Miners in these pits will be criminals or debtors pressed into service. Quarrymen hewing open-face stone ostensibly have a safer job than those underground, but accidents are common and Beastman attack from the forest is an ever-present danger. ",
        "<h5>Adventuring</h5>",
        "Many independent Miners find themselves thrust into peril when set upon by Goblins or other subterranean horrors. Some find the rewards of this life more lucrative, if not less dangerous, than slaving away for a mine owner for a pittance. Prospectors have many opportunities for adventure and can easily pull together a band of like-minded folk eager for riches and glory.",
        "To Dwarfs, mining is not an occupation limited to commoners. Rather, they are considered artisans of great skill and are well-respected amongst the Dawi. Possessed of a keen sense for stone, Dwarfs are drawn to valuable seams and seemingly have a sixth-sense for when to shore up passages. Some Dwarf clans hold such pride in their mining ability that they march to war armed with picks rather than axes."
      ],
      "quotes": [
        {
          "quote": "After your supplies from the store are deducted, and your load of sixteen tons added, you made… let me see… no, you actually owe us two for today. Another day older and deeper in debt, boy.",
          "author": "Frederika, Victualler of the Delfgruber Minehead."
        }
      ]
    },
    {
      "name": "Mystic",
      "class": "Peasants",
      "races": "Human, Wood Elf",
      "desc": "You have a talent for divining the future, or for convincing others you can&hellip;",
      "advances": [
        "I",
        "Dex",
        "Fel",
        "WP",
        "Agi",
        "Int"
      ],
      "incomeSkill": "Intuition",
      "path1": {
        "name": "Fortune Teller",
        "status": "Brass 1",
        "skills": [
          "Charm",
          "Entertain (Fortune Telling)",
          "Dodge",
          "Gossip",
          "Haggle",
          "Intuition",
          "Perception",
          "Sleight of Hand"
        ],
        "talents": [
          "Attractive",
          "Luck",
          "Second Sight",
          "Suave"
        ],
        "trappings": [
          "Deck of Cards <em>or</em> Dice",
          "Cheap Jewellery"
        ]
      },
      "path2": {
        "name": "Mystic",
        "status": "Brass 2",
        "skills": [
          "Bribery",
          "Cool",
          "Entertain (Prophecy)",
          "Evaluate",
          "Intimidate",
          "Lore (Astrology)"
        ],
        "talents": [
          "Detect Artefact",
          "Holy Visions",
          "Sixth Sense",
          "Well-prepared"
        ],
        "trappings": [
          "Selection of Amulets"
        ]
      },
      "path3": {
        "name": "Sage",
        "status": "Brass 3",
        "skills": [
          "Art (Writing)",
          "Charm Animal",
          "Entertain (Storytelling)",
          "Language (Any)"
        ],
        "talents": [
          "Nose for Trouble",
          "Petty Magic",
          "Read/Write",
          "Witch!"
        ],
        "trappings": [
          "Trade Tools (Writing)"
        ]
      },
      "path4": {
        "name": "Seer",
        "status": "Brass 4",
        "skills": [
          "Lore (Prophecy)",
          "Channelling (Azyr)"
        ],
        "talents": [
          "Arcane Magic (Heavens)",
          "Magical Sense",
          "Menacing",
          "Strong-minded"
        ],
        "trappings": [
          "Trade Tools (Astrology)"
        ]
      },
      "flavour": [
        "Searching for meaning in a dangerous world, people turn to Mystics for a glimpse of their future. Wandering caravans of Strigany are a common sight in Reikland, and locals scrape together coin to hear their fortune, and buy charms and love potions. Most Mystics are perceptive and intuitive, able to divine their customers’ hopes and fears and give readings just specific enough to be believable. Mystics must be careful, and walk a fine line between accusations of trickery and heretical witchery. Mystics demonstrate their talent in a wide variety of ways: palmists and card readers are common amongst the Strigany, while a Wood Elf is more likely to interpret the signs and symbols to be found around them in nature, or to be inspired by dreams and visions. Many cults also have their own Seers and Sages, each prophesising the future through the paradigm of their beliefs.",
        "<h5>Adventuring</h5>",
        "Mystics might seek a life of adventure if their insights draw the attention of priests and witch hunters. Dreams and visions also provide an incentive to join a band of adventurers: perhaps the Mystic foresees a terrible future ahead if action is not taken? No matter their motivation, once on the road, Mystics can easily ply their trade wherever they should travel."
      ],
      "quotes": [
        {
          "quote": "I’ll tell you for why we have wheels on our houses: it’s because no-one likes to hear the cold truth of Morr a-coming, and if there’s one thing for sure, Morr is always a-coming. So, it ain’t because we’re cheaters, but because we are honest folk!",
          "author": "Honest Chupra, Strigany Pedlar"
        },
        {
          "quote": "I never met a Priest who could tell me what the future holds. Well, unless you count the Priest of Morr who Doomed me for thruppence, but don’t they say that death and taxes are the only things we can be certain of?",
          "author": "Sylvestr Jutzenbach, Ostermarker Noble"
        }
      ]
    },
    {
      "name": "Scout",
      "class": "Peasants",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "desc": "Intrepid and resourceful, you guide others through the dangers wilds of the Old World.",
      "advances": [
        "T",
        "I",
        "Agi",
        "BS",
        "Int",
        "Dex"
      ],
      "incomeSkill": "Perception",
      "path1": {
        "name": "Guide",
        "status": "Brass 3",
        "skills": [
          "Charm Animal",
          "Climb",
          "Endurance",
          "Gossip",
          "Lore (Local)",
          "Melee (Basic)",
          "Outdoor Survival",
          "Perception"
        ],
        "talents": [
          "Orientation",
          "Rover",
          "Sharp",
          "Strider (Any)"
        ],
        "trappings": [
          "Hand Weapon",
          "Leather Jack",
          "Sturdy Boots and Cloak",
          "Rope"
        ]
      },
      "path2": {
        "name": "Scout",
        "status": "Brass 5",
        "skills": [
          "Athletics",
          "Navigation",
          "Ranged (Bow)",
          "Ride (Horse)",
          "Stealth (Rural)",
          "Track"
        ],
        "talents": [
          "Combat Aware",
          "Night Vision",
          "Nose for Trouble",
          "Seasoned Traveller"
        ],
        "trappings": [
          "Bow and 10 Arrows",
          "Mail Shirt"
        ]
      },
      "path3": {
        "name": "Pathfinder",
        "status": "Silver 1",
        "skills": [
          "Animal Care",
          "Haggle",
          "Secret Signs (Hunter)",
          "Swim"
        ],
        "talents": [
          "Acute Sense (Sight)",
          "Sixth Sense",
          "Strong Legs",
          "Very Resilient"
        ],
        "trappings": [
          "Map",
          "Riding Horse with Saddle and Tack",
          "Saddlebags with 2 weeks' Rations",
          "Tent"
        ]
      },
      "path4": {
        "name": "Explorer",
        "status": "Silver 5",
        "skills": [
          "Language (Any)",
          "Trade (Cartographer)"
        ],
        "talents": [
          "Hardy",
          "Linguistics",
          "Savant (Local)",
          "Tenacious"
        ],
        "trappings": [
          "Selection of Maps",
          "Trade Tools (Cartographer)"
        ]
      },
      "flavour": [
        "Among an illiterate populace where maps are rare, local knowledge can mean the difference between life and death for travellers. Scouts are experts at finding safe paths through the backwoods and muddy roads of the Empire. Local guides will accompany their clients, warning of upcoming dangers, sharing village gossip or showing the best places to forage. Experienced Scouts will barely be seen by their employers as they explore the trails ahead and keep a watchful eye out for hidden dangers.  While most Scouts keep to familiar territory, some specialise in safely navigating unmapped terrain. Explorers might venture even further into treacherous and hostile territory, filling in the blank spaces on their maps. Most Scouts do not tackle dangers themselves, preferring to slip away quietly to warn their companions and enable their employers to avoid potential hazards completely.",
        "<h5>Adventuring</h5>",
        "Scouts can be invaluable to a group of adventurers, especially those venturing out from a city for the first time to find their fortune. Reliable and knowledgeable Guides may find themselves asked to stay on and act as Scouts, although many still act the loner, slipping in and out of the woods to protect the group from ambush or warn of enemies ahead."
      ],
      "quotes": [
        {
          "quote": "You don’t want to be going off the road down by the bluff without a guide.􀀁There’s man-traps in them woods what the reeve put down to catch poachers. Almost ’ad old Billi’s leg off last week it did.",
          "author": "Gwyn, Scout"
        }
      ]
    },
    {
      "name": "Villager",
      "class": "Peasants",
      "races": "Dwarf, Halfling, Human",
      "desc": "You are the beating heart of rural life, working the countryside to feed civilisation.",
      "advances": [
        "T",
        "S",
        "Agi",
        "WS",
        "Fel",
        "Int"
      ],
      "incomeSkill": "Endurance",
      "path1": {
        "name": "Peasant",
        "status": "Brass 2",
        "skills": [
          "Animal Care",
          "Athletics",
          "Consume Alcohol",
          "Endurance",
          "Gossip",
          "Melee (Brawling)",
          "Lore (Local)",
          "Outdoor Survival"
        ],
        "talents": [
          "Rover",
          "Strong Back",
          "Strong-minded",
          "Stone Soup"
        ],
        "trappings": [
          "None"
        ]
      },
      "path2": {
        "name": "Villager",
        "status": "Brass 3",
        "skills": [
          "Dodge",
          "Drive",
          "Entertain (Storytelling)",
          "Haggle",
          "Melee (Basic)",
          "Trade (Any)"
        ],
        "talents": [
          "Animal Affinity",
          "Hardy",
          "Tenacious",
          "Very Strong"
        ],
        "trappings": [
          "Leather Jerkin",
          "Hand Weapon (Axe)",
          "Trade Tools (as Trade)"
        ]
      },
      "path3": {
        "name": "Councillor",
        "status": "Brass 4",
        "skills": [
          "Bribery",
          "Charm",
          "Intimidate",
          "Leadership"
        ],
        "talents": [
          "Craftsman (Any)",
          "Dealmaker",
          "Stout-hearted",
          "Very Resilient"
        ],
        "trappings": [
          "Mule and Cart",
          "Village Home",
          "Workshop (as Trade)"
        ]
      },
      "path4": {
        "name": "Village Elder",
        "status": "Silver 2",
        "skills": [
          "Intuition",
          "Lore (History)"
        ],
        "talents": [
          "Master Tradesman (as Trade)",
          "Nimble Fingered",
          "Public Speaker",
          "Savant (Local)"
        ],
        "trappings": [
          "The Respect of the Village"
        ]
      },
      "flavour": [
        "Sigmar’s bountiful Empire provides an abundant harvest of crops, livestock, and other marketable goods, so there is always plenty of work to be found in the countryside. Villagers make up most of the Empire’s population and perform a variety of valuable roles, including Farmers, Charcoal Burners, Woodsmen, Millers, Herders, and many more.  Most villages fall under the domain of a noble family, where day-to-day administration of the estate is overseen by a bailiff. Village affairs are usually managed by a village council of local tradesmen and farmers led by an Elder. A village Councillor or Elder can hold significant local influence overseeing many decisions concerning the surrounding land.",
        "<h5>Adventuring</h5>",
        "The pastoral safety of a sheltered village is an unspeakable bore for some young Villagers who listen avidly to the tales of faraway lands. Of course, the stories they hear from wandering Pedlars and Strigany, all fuelling schemes to escape, bear little relation to the harsh reality of Empire life. During winter, when food is short, and the fields do not need tending, young folk venturing to nearby towns and cities for work often never return, soon caught in the net of civilisation’s excitement and adventure."
      ],
      "quotes": [
        {
          "quote": "It’s a hard life, for sure, but it’s a good one. Every year the lady from the manor sends out her guard to clear out the forest and drive off the beastmen and the like. The family keep us safe, we keep their flocks. It’s a fair trade most of the time.",
          "author": "Gunni Ackermann, Shepherdess"
        },
        {
          "quote": "Look, you can sneer at me all you want, but Konrad the Hero his-bloomin’-self was from a village just like mine, so don’t you be talking us down, you hear! Us villagers are good folk!",
          "author": "Erika Bauer, Farmer"
        }
      ]
    },
    {
      "name": "Bounty Hunter",
      "class": "Rangers",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "desc": "Ruthless and determined, you pursue your quarry to the bitter end: for justice, or for money.",
      "advances": [
        "T",
        "WS",
        "Agi",
        "BS",
        "S",
        "Int"
      ],
      "incomeSkill": "Melee (Basic)",
      "path1": {
        "name": "Thief Taker",
        "status": "Silver 1",
        "skills": [
          "Bribery",
          "Charm",
          "Gossip",
          "Haggle",
          "Intuition",
          "Melee (Basic)",
          "Outdoor Survival",
          "Perception"
        ],
        "talents": [
          "Break and Enter",
          "Shadow",
          "Strike to Stun",
          "Suave"
        ],
        "trappings": [
          "Hand Weapon",
          "Leather Jerkin",
          "Rope"
        ]
      },
      "path2": {
        "name": "Bounty Hunter",
        "status": "Silver 3",
        "skills": [
          "Athletics",
          "Endurance",
          "Intimidate",
          "Ranged (Crossbow)",
          "Ranged (Entangling)",
          "Track"
        ],
        "talents": [
          "Marksman",
          "Relentless",
          "Seasoned Traveller",
          "Strong Back"
        ],
        "trappings": [
          "Crossbow and 10 Bolts",
          "Leather Skullcap",
          "Manacles",
          "Net",
          "Warrant Paper"
        ]
      },
      "path3": {
        "name": "Master Bounty Hunter",
        "status": "Silver 5",
        "skills": [
          "Animal Care",
          "Climb",
          "Ride (Horse)",
          "Swim"
        ],
        "talents": [
          "Accurate Shot",
          "Careful Strike",
          "Dual Wielder",
          "Sprinter"
        ],
        "trappings": [
          "Mail Shirt",
          "Riding Horse and Saddle"
        ]
      },
      "path4": {
        "name": "Bounty Hunter General",
        "status": "Gold 1",
        "skills": [
          "Drive",
          "Lore (Law)"
        ],
        "talents": [
          "Deadeye Shot",
          "Fearless (Bounties)",
          "Hardy",
          "Sure Shot"
        ],
        "trappings": [
          "Draught Horse and Cart",
          "Mail Shirt",
          "4 Pairs of Manacles"
        ]
      },
      "flavour": [
        "Bounty Hunters track down fugitives and outlaws for coin. Most are legally appointed by provincial courts and receive warrant papers granting licence to seize or sometimes kill the target. While some are motivated by Verena’s justice, most are more concerned by the rewards, often finding the ‘dead’ in ‘dead or alive’ to be the most convenient route to their fortune. Many Bounty Hunters start as Thief-Takers, those hired by crime victims to retrieve stolen goods. Over time, those with an established reputation may find permanent work from a merchant or noble house, guild, or cult, or may build a company of Bounty Hunters, working as a group to collect the largest rewards. ",
        "<h5>Adventuring</h5>",
        "In their pursuit of wanted criminals, Bounty Hunters often stumble into unplanned adventures. As independent operatives, Bounty Hunters are perfectly suited to dropping their day job to pursue whatever business is afoot. Further, given their broad base of skills are always in demand, it is not uncommon to see Bounty Hunters turning their hand to adventuring full-time, hiring their skills out in return for payments. Bounty Hunters are a perfect starting career as they present a solid mixture of social and combat skills allowing you to contribute no matter the circumstances. "
      ],
      "quotes": [
        {
          "quote": "It’s amazing just how many boys will wrap themselves in manacles if you smile sweetly enough. And if that doesn’t work, it’s out with the knives!",
          "author": "Anke Dorflinger, Bounty Hunter"
        }
      ]
    },
    {
      "name": "Coachman",
      "class": "Rangers",
      "races": "Dwarf, Halfling, Human",
      "desc": "Determined and rugged, you deliver passengers safely by coach despite the daily dangers you face.",
      "advances": [
        "BS",
        "T",
        "WP",
        "Agi",
        "WS",
        "I"
      ],
      "incomeSkill": "Drive",
      "path1": {
        "name": "Postilion",
        "status": "Silver 1",
        "skills": [
          "Animal Care",
          "Charm Animal",
          "Climb",
          "Drive",
          "Endurance",
          "Perception",
          "Ranged (Entangling)",
          "Ride (Horse)"
        ],
        "talents": [
          "Animal Affinity",
          "Seasoned Traveller",
          "Trick-Riding",
          "Tenacious"
        ],
        "trappings": [
          "Warm Coat and Gloves",
          "Whip"
        ]
      },
      "path2": {
        "name": "Coachman",
        "status": "Silver 2",
        "skills": [
          "Consume Alcohol",
          "Gossip",
          "Intuition",
          "Lore (Local)",
          "Navigation",
          "Ranged (Blackpowder)"
        ],
        "talents": [
          "Coolheaded",
          "Crack the Whip",
          "Gunner",
          "Strong-minded"
        ],
        "trappings": [
          "Blunderbuss with 10 Shots",
          "Coach Horn",
          "Leather Jack",
          "Hat"
        ]
      },
      "path3": {
        "name": "Coach Master",
        "status": "Silver 3",
        "skills": [
          "Animal Training (Horse)",
          "Intimidation",
          "Language (Any)",
          "Lore (Routes) "
        ],
        "talents": [
          "Accurate Shot",
          "Dealmaker",
          "Fearless (Outlaws)",
          "Nose for Trouble "
        ],
        "trappings": [
          "Mail Shirt",
          "Pistol",
          "Quality Cloak"
        ]
      },
      "path4": {
        "name": "Route Master",
        "status": "Silver 5",
        "skills": [
          "Charm",
          "Leadership"
        ],
        "talents": [
          "Fearless (Beastmen)",
          "Marksman",
          "Orientation",
          "Rapid Reload"
        ],
        "trappings": [
          "Fleet of Coaches and Horses",
          "Maps"
        ]
      },
      "flavour": [
        "For many, the coach is the only way to get from one town to the next. The wild places between teem with Beastmen, Bandits, and worse, but with just a team of fresh horses and a blunderbuss, brave and hardworking Coachmen make travel possible. To help evade danger, most coaching companies relentlessly pursue speed, and their employees have a reputation for ruthlessness towards other travellers on the roads, never trusting anyone. Coachmen often start as Postilions, riding the lead horse of the team through wind and rain. Instead of transporting passengers, some Coachmen deliver mail, work as chauffeurs for nobles, drive cabs or goods wagons, or the big omnibuses of the great cities, or even become a getaway driver.",
        "<h5>Adventuring</h5>",
        "Good Coachmen are always in demand for unusual, dangerous or illegal jobs. A Coachman looking for a change may find winter is a good time to take a break, as cross-country services are greatly reduced. Coaching companies are always ready to snap up experienced coachmen, so returning to work is usually simple."
      ],
      "quotes": [
        {
          "quote": "Get ‘em fed in a quarter bell. No second portions. We ain’t paid for that. Coach Mistress eats last but save ‘er the best. One minute longer than the quarter and I take a pfennig off you, the Mistress takes a shilling off me, and Castle Rock Coaches will be in here as quick as silver.",
          "author": "Bettina Hoch, Innkeeper"
        },
        {
          "quote": "Three days I was stuck in Weissbruck during the storms. Not a single thing came in and out. Then just when I thought I’d miss my appointment in Bogenhafen there appeared three coaches coming up the frozen track, all together. Bloody typical! You wait days for a coach, and then three come along at once.",
          "author": "Stelle Grabbe, Merchant"
        }
      ]
    },
    {
      "name": "Entertainer",
      "class": "Rangers",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "desc": "Whether high-born or low-brow, you distract people from the harsh realities of life.",
      "advances": [
        "Agi",
        "Dex",
        "Fel",
        "WS",
        "BS",
        "T"
      ],
      "incomeSkill": "Entertain (Any)",
      "path1": {
        "name": "Busker",
        "status": "Brass 3",
        "skills": [
          "Athletics",
          "Charm",
          "Entertain (Any)",
          "Gossip",
          "Haggle",
          "Perform (Any)",
          "Play (any)",
          "Sleight of Hand "
        ],
        "talents": [
          "Attractive",
          "Mimic",
          "Public-Speaking",
          "Suave "
        ],
        "trappings": [
          "Bowl",
          "Instrument"
        ]
      },
      "path2": {
        "name": "Entertainer",
        "status": "Brass 5",
        "skills": [
          "Entertain (Any)",
          "Ride (Any)",
          "Melee (Basic)",
          "Perform (Any)",
          "Play (Any) Ranged (Throwing) "
        ],
        "talents": [
          "Contortionist",
          "Jump Up",
          "Sharpshooter",
          "Trick Riding "
        ],
        "trappings": [
          "Costume",
          "Instrument",
          "Selection of Scripts (that you can't yet read)",
          "Throwing Weapons"
        ]
      },
      "path3": {
        "name": "Troubadour",
        "status": "Silver 3",
        "skills": [
          "Animal Care",
          "Animal Training (Any)",
          "Art (Writing)",
          "Language (Any) "
        ],
        "talents": [
          "Blather",
          "Master of Disguise",
          "Perfect Pitch",
          "Read/Write "
        ],
        "trappings": [
          "Trained Animal",
          "Writing Kit"
        ]
      },
      "path4": {
        "name": "Troupe Leader",
        "status": "Gold 1",
        "skills": [
          "Drive",
          "Leadership "
        ],
        "talents": [
          "Dealmaker",
          "Etiquette (Any)",
          "Seasoned Traveller",
          "Sharp "
        ],
        "trappings": [
          "Draught Horses and Wagon (Stage)",
          "Wardrobe of Costumes and Props",
          "Troupe of Entertainers"
        ]
      },
      "flavour": [
        "Entertainers crop up all over the Old World, and many wander the Reikland’s roads, earning their crust. Some stay put at a single theatre, some work as individuals, some as part of a troupe. The worst are little more than itinerant beggars, the best lauded in the company of counts and princes. It is not an easy life and the people will not tolerate poor acts, running them out of town pelted with rotten vegetables. ",
        "The most common Entertainers are the perennial crowd-pleasers like jesters, singers, actors, musicians, acrobats, dancers, and jugglers, but the Old World is also home to more obscure and bizarre acts. ",
        "<h5>Adventuring</h5>",
        "The open road, a new village every night, the smell of greasepaint and the roar of the crowd — life itself can be an adventure for the Entertainer as they bring excitement to the humdrum, everyday reality of those they captivate. Given their existence on the edge of respectable society, curious Entertainers all-too-often find real adventures of their own. "
      ],
      "quotes": [
        {
          "quote": "A wandering minstrel I,<br/>A thing of shreds and patches,<br/> Of ballads, songs, and snatches,<br/> And dreamy lullaby!",
          "author": "Libretto from The Emperor of Nippon, by Guillibert and Solomon"
        },
        {
          "quote": "How do you get to the Luitpold Theatre? Practise!",
          "author": "Well known Altdorf joke"
        },
        {
          "quote": "Musician and prodigy, Vladimira Tchaikofiev, toured the courts of the Empire performing her compositions for the great and good. On her triumphant return to her native Kislev, during the reign of Bloody Katerin, she premiered her first opera, “The Vampire Counts of Stirland” based on her travels in Sylvania. Unconventionally, she always chose to conduct with a silver baton.",
          "author": "‘A Defence Against Necromancy’, Patriarch Felip Iyrtu, 2415IC,<br/>from the 1st year required reading list, Amethyst College"
        }
      ]
    },
    {
      "name": "Flagellant",
      "class": "Rangers",
      "desc": "Just when you abandoned all hope, your suffering and the righteousness of Sigmar saved you!",
      "path1": {
        "name": "Zealot",
        "skills": [
          "Dodge",
          "Endurance",
          "Heal",
          "Intimidate",
          "Intuition",
          "Lore (Sigmar)",
          "Melee (Flail)",
          "Outdoor Survival"
        ],
        "talents": [
          "Berserk Charge",
          "Frenzy",
          "Read/Write",
          "Stone Soup"
        ],
        "trappings": [
          "<weapon>Flail</weapon>",
          "Tattered Robes"
        ],
        "status": "Brass 0"
      },
      "path2": {
        "name": "Flagellant",
        "skills": [
          "Art (Icons)",
          "Athletics",
          "Cool",
          "Language (Classical)",
          "Lore (The Empire)",
          "Ranged (Sling)"
        ],
        "talents": [
          "Hardy",
          "Hatred (Heretics)",
          "Flagellant",
          "Implacable"
        ],
        "trappings": [
          "Placard",
          "Religious Symbol",
          "<weapon>Sling</weapon>"
        ],
        "status": "Brass 0"
      },
      "path3": {
        "name": "Penitent",
        "skills": [
          "Charm",
          "Language (Any)",
          "Lore (Theology)",
          "Perception"
        ],
        "talents": [
          "Field Dressing",
          "Furious Assault",
          "Menacing",
          "Seasoned Traveller"
        ],
        "trappings": [
          "Religious Relic"
        ],
        "status": "Brass 0"
      },
      "path4": {
        "name": "Prophet of Doom",
        "skills": [
          "Entertain (Speeches)",
          "Leadership"
        ],
        "talents": [
          "Battle Rage",
          "Fearless (Heretics)",
          "Frightening",
          "Impassioned Zeal"
        ],
        "trappings": [
          "Book (Religion)",
          "Followers (including Penitents, Flagellants, and Zealots"
        ],
        "status": "Brass 0"
      },
      "advances": [
        "WS",
        "S",
        "T",
        "WP",
        "I",
        "Fel"
      ],
      "incomeSkill": "Melee (Flail)",
      "races": "Human",
      "flavour": [
        "Forgiveness does not come easily, only through struggle, pain, and doing Sigmar’s will. Flagellants travel the Empire, flogging themselves in penance for their sins, and the sins of others. They are determined to serve Sigmar until the end of the world, something they believe is imminent. All good folk are expected to welcome, help, and feed them, and to pray with them.  ",
        "Most Flagellants wander in large groups, guided by a Prophet of Doom who interprets Sigmar’s will. Some follow armies, whipping themselves into a frenzy as battle is joined and fighting without any thought for their own safety. Others wander by themselves, believing they best serve Sigmar by righting the wrongs he guides them towards.",
        "<h5>Adventuring</h5>",
        "It’s not hard for Flagellants to stumble upon an adventure, especially involving recognised foes of Sigmar. Flagellants can continue their lifestyle as they adventure, relying on the honest folk of the Empire to offer them food, drink and shelter as they trudge ever onwards to the end of all things."
      ],
      "quotes": [
        {
          "quote": "We strike this flesh and spill this blood, for his Empire, in the name of Sigmar!",
          "author": "Viktorina Schwefel, Flagellant"
        },
        {
          "quote": "We had some flagellants going through the village a couple of months back. Terrible they were: the agony, the pain, the suffering, and that was just watching them. We knew what to do. We knew we had to open our doors and feed them and pray with them. But in the end, we just hid in the cellar until they’d gone. Scary folk.",
          "author": "Wulfrum Barth, villager"
        },
        {
          "quote": "The Ende is Nigh!",
          "author": "Common placard carried by Flagellants"
        }
      ]
    },
    {
      "name": "Messenger",
      "class": "Rangers",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "desc": "Swift and sure-footed, nothing stops you delivering your messages on time.",
      "advances": [
        "Agi",
        "T",
        "I",
        "WS",
        "WP",
        "Fel"
      ],
      "incomeSkill": "Endurance",
      "path1": {
        "name": "Runner",
        "status": "Brass 3",
        "skills": [
          "Athletics",
          "Climb",
          "Dodge",
          "Endurance ",
          "Gossip",
          "Navigation",
          "Perception",
          "Melee (Brawling) "
        ],
        "talents": [
          "Flee!",
          "Fleet Footed",
          "Sprinter",
          "Step Aside "
        ],
        "trappings": [
          "Scroll Case"
        ]
      },
      "path2": {
        "name": "Messenger",
        "status": "Silver 1",
        "skills": [
          "Animal Care",
          "Charm",
          "Cool",
          "Lore (Local)",
          "Melee (Basic)",
          "Ride (Horse) "
        ],
        "talents": [
          "Crack the Whip",
          "Criminal",
          "Orientation",
          "Seasoned Traveller "
        ],
        "trappings": [
          "Hand Weapon",
          "Leather Jack",
          "Riding Horse with Saddle and Tack"
        ]
      },
      "path3": {
        "name": "Courier",
        "status": "Silver 3",
        "skills": [
          "Charm Animal",
          "Bribery",
          "Consume Alcohol",
          "Outdoor Survival "
        ],
        "talents": [
          "Nose for Trouble",
          "Relentless",
          "Tenacious",
          "Trick Rider "
        ],
        "trappings": [
          "Backpack",
          "Saddlebags",
          "Shield"
        ]
      },
      "path4": {
        "name": "Courier-Captain",
        "status": "Silver 5",
        "skills": [
          "Intimidate",
          "Leadership "
        ],
        "talents": [
          "Dealmaker",
          "Hatred (Outlaws)",
          "Kingpin",
          "Very Resilient "
        ],
        "trappings": [
          "Couriers",
          "Mail Shirt",
          "Writing Kit"
        ]
      },
      "flavour": [
        "When the postal service is unsecure or too slow, people send a Messenger. Several courier companies provide express services, competing to show they are the fastest and safest. Most Messengers take their duties very seriously, guarding their packages with their lives. Some courier companies have arrangements with coaching houses allowing their Messengers to swap tired horses for fresh ones, for top-speed delivery.",
        "Runners are employed to carry urgent messages in cities. Many larger settlements host competitions to celebrate the fastest, with the winners taking prizes and lucrative job contracts. Messengers can also be found working for the military, noble houses, large merchant houses, and for criminal gangs seeking to maintain their privacy.",
        "<h5>Adventuring</h5>",
        "Messages can contain all sorts of information, and some lead to adventure should they be intercepted. The easiest way for any villain (or innocent party) to get hold of such information will be to waylay a Messenger. If this happens, it will be the Messenger’s duty to follow things through until the message is recovered. As Messengers are usually freelance, paid per package delivered, it is simple enough to drop everything then pick-up work when they return."
      ],
      "quotes": [
        {
          "quote": "Are you Herr Schmidt of Hochplatz, Kemperbad? Erm, do you know a Herr Schmidt of Hochplatz, Kemperbad? Erm, do you know a Hochplatz? Kemperbad?",
          "author": "Willi Winkle, Messenger on his first day"
        },
        {
          "quote": "It looked like an interesting package, if you know what I mean. I thought I’d just have a quick peek. Thought it was to his girlfriend. Thought it might be a bit, you know, juicy. How was I to know it was all that boring spying stuff. Where’s Bretonnia, anyway?",
          "author": "Rufus Drucht, Messenger who single-handedly busted the Bloody Bretonnian spy ring, then lost his job."
        }
      ]
    },
    {
      "name": "Pedlar",
      "class": "Rangers",
      "races": "Dwarf, Halfling, Human",
      "desc": "Worldly-wise and free of interference, you wander the Empire selling your wares where you will.",
      "advances": [
        "T",
        "Dex",
        "WP",
        "Fel",
        "I",
        "Int"
      ],
      "incomeSkill": "Haggle",
      "path1": {
        "name": "Vagabond",
        "status": "Brass 1",
        "skills": [
          "Charm",
          "Endurance",
          "Entertain (Storytelling)",
          "Gossip",
          "Haggle ",
          "Intuition",
          "Outdoor Survival",
          "Stealth (Rural or Urban) "
        ],
        "talents": [
          "Fisherman",
          "Flee!",
          "Rover",
          "Tinker "
        ],
        "trappings": [
          "Backpack",
          "Bedroll",
          "Goods worth 2d10 Brass",
          "Tent"
        ]
      },
      "path2": {
        "name": "Pedlar",
        "status": "Brass 4 ",
        "skills": [
          "Animal Care",
          "Charm Animal",
          "Consume Alcohol",
          "Evaluate",
          "Ride (Horse)",
          "Trade (Tinker)"
        ],
        "talents": [
          "Dealmaker",
          "Orientation",
          "Seasoned Traveller",
          "Strong Back"
        ],
        "trappings": [
          "Mule and Saddlebags",
          "Goods worth <mono>2d10</mono> Silver",
          "Selection of Pots and Pans",
          "Trade Tools (Tinker)"
        ]
      },
      "path3": {
        "name": "Master Pedlar",
        "status": "Silver 1",
        "skills": [
          "Drive",
          "Intimidate",
          "Language (any)",
          "Perception "
        ],
        "talents": [
          "Numismatics",
          "Sturdy",
          "Well-prepared",
          "Very Resilient "
        ],
        "trappings": [
          "Cart",
          "Goods worth at least <mono>2d10</mono> Gold"
        ]
      },
      "path4": {
        "name": "Wandering Trader",
        "status": "Silver 3",
        "skills": [
          "Lore (Local)",
          "Lore (Geography)"
        ],
        "talents": [
          "Cat-tongued",
          "Strong-minded",
          "Suave",
          "Tenacious"
        ],
        "trappings": [
          "Draught Horse and Wagon",
          "Goods worth at least 5d10 Gold",
          "50 Silver in Coin"
        ]
      },
      "flavour": [
        "Pedlars traipse from village to hamlet, selling goods and services such as knife sharpening, mending, and tinkering. Most carry cheap stock readily available in larger towns, including small luxuries such as ribbons and hair pins. Pedlars are always welcome as even suspicious folk like to treat themselves to baubles and knickknacks.",
        "Some Pedlars also take on messenger work; others act as de facto town criers, bringing news and gossip to the quietest corners of the Empire in exchange for bed-and-board. Given the dangers on the road, some Pedlars prefer to keep a stall at a regular town marketplace. It is also common to find them on pilgrim routes making a living selling relics to the devout. ",
        "<h5>Adventuring</h5>",
        "Hearing of profits to be made in far-off lands and listening to the stories of well-travelled merchants is always going to whet the appetite of an ambitious Pedlar. Being self-reliant, they can follow up on any adventure, making a decent profit along the way. They can also gain access to strongholds and settlements without awkward questions."
      ],
      "quotes": [
        {
          "quote": "This here is an absolutely unique, one-of-a-kind, only-one-in-existence, work of art. If you want more, don’t worry, I’ve got another couple of dozen on the back of the cart.",
          "author": "Delberz Trötte, Trader"
        }
      ]
    },
    {
      "name": "Road Warden",
      "class": "Rangers",
      "desc": "With a wary eye and ready weapon, you tour the highways of the Empire enforcing the law.",
      "path1": {
        "name": "Toll Keeper",
        "skills": [
          "Bribery",
          "Consume Alcohol",
          "Gamble",
          "Gossip",
          "Haggle",
          "Melee (Basic)",
          "Perception",
          "Ranged (Crossbow)"
        ],
        "talents": [
          "Coolheaded",
          "Embezzle",
          "Marksman",
          "Numismatics"
        ],
        "trappings": [
          "<weapon>Crossbow</weapon> with 10 <weapon>Bolts</weapon>",
          "<armour>Leather Jack</armour>"
        ],
        "status": "Brass 5"
      },
      "path2": {
        "name": "Road Warden",
        "skills": [
          "Animal Care",
          "Endurance",
          "Intimidate",
          "Intuition",
          "Outdoor Survival",
          "Ride (Horse)"
        ],
        "talents": [
          "Crack the Whip",
          "Criminal",
          "Roughrider",
          "Seasoned Traveller"
        ],
        "trappings": [
          "<weapon>Hand Weapon</weapon>",
          "<armour>Mail Shirt</armour>",
          "Riding Horse with Saddle and Harness",
          "Rope"
        ],
        "status": "Silver 2"
      },
      "path3": {
        "name": "Road Sergeant",
        "skills": [
          "Athletics",
          "Charm",
          "Leadership",
          "Ranged (Blackpowder)"
        ],
        "talents": [
          "Etiquette (Soldiers)",
          "Fearless (Outlaws)",
          "Hatred (Any)",
          "Nose for Trouble"
        ],
        "trappings": [
          "Squad of Road Wardens",
          "<weapon>Pistol</weapon> with 10 <weapon>Bullets</weapon>",
          "<weapon>Shield</weapon>",
          "Symbol of Rank"
        ],
        "status": "Silver 4"
      },
      "path4": {
        "name": "Road Captain",
        "skills": [
          "Lore (Empire)",
          "Navigation"
        ],
        "talents": [
          "Combat Aware",
          "Commanding Presence",
          "Kingpin",
          "Public Speaker"
        ],
        "trappings": [
          "Light Warhorse",
          "<weapon>Pistol</weapon> with 10 <weapon>Bullets</weapon>",
          "Quality Hat and Cloak",
          "Unit of Road Wardens"
        ],
        "status": "Gold 1"
      },
      "advances": [
        "BS",
        "T",
        "I",
        "WS",
        "Fel",
        "Int"
      ],
      "incomeSkill": "Perception",
      "races": "Halfling, Human",
      "flavour": [
        "Road Wardens protect travellers from the bandits, Greenskins, Beastmen and other dangers that threaten the Empire’s highways. The Wardens are supported by a system of tolls, taxes they often collect personally. Successful Road Wardens are well-received and respected, and often have bunks in each inn along their route. Most main-road Road Wardens are part of the State Army, patrolling primary thoroughfares during peace time, so are well-trained and resplendent in neat uniforms. Less-travelled roads make do with local equivalents, some of whom take advantage of their position and lack of supervision for their own gain. Some Wardens prefer sitting in their safe, fortified toll stations to clearing the roads, but travellers often balk at handing over coin when the roads are dangerous and in disrepair. ",
        "<h5>Adventuring</h5>",
        "Road Wardens frequently find adventure. Anything untoward happening in the countryside is often close to a well-patrolled roadside. When trouble occurs, Road Wardens are summoned to resolve any problems. If they follow up and become involved in an investigation, they are simply doing their job, and might even secure extra pay for their time, even if the resulting adventure takes them far from their regular beat."
      ],
      "quotes": [
        {
          "quote": "What can I say, it’s a pfennig a leg. Them’s the rules. Nothing I can do about it. Perhaps you should try to find a different route to get your bees to Grünburg.",
          "author": "Andreas Muller, jobsworth Toll Keeper"
        },
        {
          "quote": "So, I was stopped by a road warden t’other day. She said I should beware an unscrupulous character out patrolling the roads and charging hapless travellers a thruppence to let them pass. I thanked the warden for the valuable advice. “Taal guide you,” she said, “that will be thruppence.”",
          "author": "Ullrich the Pedlar"
        }
      ]
    },
    {
      "name": "Witch Hunter",
      "class": "Rangers",
      "races": "Human",
      "desc": "You hunt the illegal witches plaguing the Empire by any and all means necessary. ",
      "advances": [
        "WS",
        "T",
        "WP",
        "BS",
        "Fel",
        "Int"
      ],
      "incomeSkill": "Intimidate",
      "path1": {
        "name": "Interrogator",
        "status": "Silver 1",
        "skills": [
          "Charm",
          "Consume Alcohol",
          "Heal",
          "Intimidate ",
          "Intuition",
          "Lore (Torture)",
          "Melee (Brawling)",
          "Perception "
        ],
        "talents": [
          "Coolheaded",
          "Menacing",
          "Read/Write",
          "Resolute "
        ],
        "trappings": [
          "Hand Weapon",
          "Instruments of Torture"
        ]
      },
      "path2": {
        "name": "Witch Hunter",
        "status": "Silver 3",
        "skills": [
          "Cool",
          "Gossip",
          "Melee (Basic)",
          "Lore (Witches)",
          "Ranged (Any)",
          "Ride (Horse)"
        ],
        "talents": [
          "Dual Wielder",
          "Marksman",
          "Seasoned Traveller",
          "Shadow"
        ],
        "trappings": [
          "Crossbow Pistol or Pistol",
          "Hat (Henin)",
          "Leather Jack",
          "Riding Horse with Saddle and Tack",
          "Rope",
          "Silvered Sword"
        ]
      },
      "path3": {
        "name": "Inquisitor",
        "status": "Silver 5",
        "skills": [
          "Endurance",
          "Leadership",
          "Lore (Law)",
          "Lore (Local) "
        ],
        "talents": [
          "Fearless (Witches)",
          "Nose for Trouble",
          "Relentless",
          "Strong-minded"
        ],
        "trappings": [
          "Quality Clothing",
          "Subordinate Interrogators"
        ]
      },
      "path4": {
        "name": "Witchfinder General",
        "status": "Gold 1",
        "skills": [
          "Lore (Chaos)",
          "Lore (Politics)"
        ],
        "talents": [
          "Frightening",
          "Iron Will",
          "Magical Sense",
          "Pure Soul "
        ],
        "trappings": [
          "Best Quality Courtly Garb",
          "Subordinate Witch Hunters"
        ]
      },
      "flavour": [
        "There are few so feared and respected as the Witch Hunter, and they are given extraordinary leeway in performing their duties. Typically armed with silvered blades and a brace of pistols — for lead is not so easily dispelled — they stalk all corners of the Old World ready to dispense judgement on any witch they find, or any who would harbour them. Most Witch Hunters in the Empire are attached to the Cult of Sigmar. Secular Witch Hunters are sometimes employed by provincial government, though these are little more than specialist bounty hunters. The Colleges of Magic also have Witch Hunters called Wizards Vigilant who pursue rogue wizards, necromancers, and daemonologists — they believe it is wisest to set a witch to catch a witch.",
        "<h5>Adventuring</h5>",
        "A Witch Hunter’s existence is one of constant adventure, often ranging the length and breadth of the grand provinces. They are called upon whenever the foul influence of unsanctioned magic emerges, and are expected to hunt it down. The bigger the reputation a Witch Hunter earns, the more dangerous the foes assigned, and the greater the adventures that follow.  If you play a Witch Hunter, it is worth while making sure others aren’t playing a Hedge Witch or Witch as this may immediately bring the party into conflict."
      ],
      "quotes": [
        {
          "quote": "I ain’t met a witch yet that won’t catch fire.",
          "author": "Father Linken Donatus, Priest of Sigmar<br/>(murdered by a rogue pyromancer)"
        },
        {
          "quote": "If you’re not a witch, you have nothing to fear.",
          "author": "Walter Keller, Witch Hunter Captain<br/>said the night before the burning of Almshof"
        }
      ]
    },
    {
      "name": "Boatman",
      "class": "Riverfolk",
      "desc": "You ply the dangerous waters of the Old World, transporting people, goods, and the latest news.",
      "advances": [
        "S",
        "T",
        "Agi",
        "I",
        "Dex",
        "Int"
      ],
      "incomeSkill": "Sail",
      "races": "Dwarf, Halfling, High Elf, Human",
      "path1": {
        "name": "Boat-hand",
        "status": "Silver 1",
        "skills": [
          "Consume Alcohol",
          "Dodge",
          "Endurance",
          "Gossip",
          "Melee (Brawling)",
          "Row",
          "Sail",
          "Swim"
        ],
        "talents": [
          "Dirty Fighting",
          "Fisherman",
          "Strong Back",
          "Strong Swimmer"
        ],
        "trappings": [
          "Hand Weapon (Boat Hook)",
          "Leather Jack",
          "Pole"
        ]
      },
      "path2": {
        "name": "Boatman",
        "status": "Silver 2",
        "skills": [
          "Athletics",
          "Entertain (Storytelling)",
          "Haggle",
          "Intuition",
          "Lore (Riverways)",
          "Perception"
        ],
        "talents": [
          "Etiquette (Guilder)",
          "Seasoned Traveller",
          "Very Strong",
          "Waterman"
        ],
        "trappings": [
          "Rope",
          "Rowboat"
        ]
      },
      "path3": {
        "name": "Bargeswain",
        "status": "Silver 3",
        "skills": [
          "Climb",
          "Entertain (Singing)",
          "Heal",
          "Trade (Boatbuilding)"
        ],
        "talents": [
          "Dealmaker",
          "Embezzle",
          "Nose for Trouble",
          "Strike Mighty Blow"
        ],
        "trappings": [
          "Backpack",
          "Trade Tools (Carpenter)"
        ]
      },
      "path4": {
        "name": "Barge Master",
        "status": "Silver 5",
        "skills": [
          "Leadership",
          "Navigation"
        ],
        "talents": [
          "Menacing",
          "Orientation",
          "Pilot",
          "Public Speaker"
        ],
        "trappings": [
          "Hat",
          "Riverboat and Crew"
        ]
      },
      "flavour": [
        "Boats and barges travel the Empire’s waterways, bringing goods from the remotest corners of the provinces to the greatest cities. These shallow-drafted vessels can travel much further upriver than larger ships, and a comprehensive network of canals adds to their reach. Barge Masters are expert river sailors and have an exhaustive knowledge of their rivers. A Boat-hand is the dogsbody, but will learn the ropes swiftly. Boatmen crew merchant barges carrying cargo to and from markets, either working for themselves or for a larger Merchant House. Many Boatmen are also ferrymen, taking passengers across rivers, or to and from towns. In large towns, some also crew rivertaxis, sail pleasure vessels, or otherwise pilot boats on the behalf of others.",
        "<h5>Adventuring</h5>",
        "A boatman will not need to seek out adventure, for more than likely adventure will come to them. Boats are useful to nearly everyone, and therefore useful to almost any adventure plot; they also make an excellent base of operations. Boatmen will not need to worry about following investigation and adventure if the plot stays on or close to the river. Even if the plot leaves the river, they could still easily allow a talented Boathand to look after their business while they take a break from river life."
      ],
      "quotes": [
        {
          "quote": "Someday a real rain will come. So, don’t forget your hat, madam.",
          "author": "Travis Binckel, Rivertaxi"
        },
        {
          "quote": "Beware of forking. I say this as an experienced bargeswain. If you approach a dangerous rock or other river hazard be sure to go astarboard and stay astarboard while laying astarboard, or go alarboard and stay alarboard while laying alarboard. Or you will fork, and you might sink. And no-one wants to sink their forking barge.",
          "author": "Jacob Walles, Bargeswain who sank his forking barge"
        }
      ]
    },
    {
      "name": "Huffer",
      "class": "Riverfolk",
      "desc": "You pilot ships and boats through the most treacherous waters of the Old World.",
      "advances": [
        "WS",
        "T",
        "I",
        "WP",
        "Int",
        "Fel"
      ],
      "incomeSkill": "Lore (Riverways)",
      "races": "Dwarf, Halfling, Human",
      "path1": {
        "name": "Riverguide",
        "status": "Brass 4",
        "skills": [
          "Consume Alcohol",
          "Gossip",
          "Intuition",
          "Lore (Local)",
          "Lore (Riverways)",
          "Perception",
          "Row",
          "Swim"
        ],
        "talents": [
          "Fisherman",
          "Night Vision",
          "Orientation",
          "Waterman"
        ],
        "trappings": [
          "Hand Weapon (Boat Hook)",
          "Storm Lantern and Oil"
        ]
      },
      "path2": {
        "name": "Huffer",
        "status": "Silver 2",
        "skills": [
          "Charm",
          "Cool",
          "Entertain (Storytelling)",
          "Language (Any)",
          "Melee (Basic)",
          "Navigation"
        ],
        "talents": [
          "Dealmaker",
          "Etiquette (Guilder)",
          "Nose for Trouble",
          "River Guide"
        ],
        "trappings": [
          "Leather Jerkin",
          "Rope",
          "Rowboat"
        ]
      },
      "path3": {
        "name": "Pilot",
        "status": "Silver 3",
        "skills": [
          "Haggle",
          "Intimidate",
          "Lore (Local)",
          "Lore (Wrecks)"
        ],
        "talents": [
          "Acute Sense (Sight)",
          "Pilot",
          "Sea Legs",
          "Very Strong"
        ],
        "trappings": [
          "Pole",
          "Storm Lantern and Oil"
        ]
      },
      "path4": {
        "name": "Master Pilot",
        "status": "Silver 5",
        "skills": [
          "Leadership",
          "Sail"
        ],
        "talents": [
          "Sixth Sense",
          "Sharp",
          "Strong Swimmer",
          "Tenacious"
        ],
        "trappings": [
          "Boathand",
          "Small Riverboat"
        ]
      },
      "flavour": [
        "Huffers are specialist river guides with expert knowledge of local river systems. They are a common sight near the most dangerous stretches of the Empire’s rivers and can command significant wages for what many view as easy work. Others view it as cheap compared to the potential cost of lost cargo. ",
        "Many Huffers specialise in a single, notorious stretch of water, while others make their money at certain times of the year when the waters are at their worst. Other Huffers have broader knowledge and will guide vessels for their entire journey, effectively acting as navigators. This is especially true of merchant ships with particularly valuable cargo at difficult times of the year.",
        "<h5>Adventuring</h5>",
        "As an expert for hire, Huffers are often hired by wealthy patrons, frequently brought in as specialists on journeys of discovery. Even when travelling into the unknown, Huffers are useful for their broad range of knowledge concerning river conditions and piloting. Because of the regional and seasonal nature of the work, many Huffers are ready to drop everything and travel to where they’re needed. This freedom transfers well to the adventuring lifestyle, and also suits those seeking to return to Huffing should adventuring not supply their needs."
      ],
      "quotes": [
        {
          "quote": "A great big ship came in from Marienburg, low in the water and packed to the gunwales. I said that it would cost them a crown to take them through the Furdienst. Steep, yes, but it was a big ship. The arrogant Wastelander scoffed, said he’d do it himself. But sure enough, they drifted right into the shallows and were holed. They lost a good part of their cargo and it took them a week to repair the damage. Reckon it cost them a bit more than a crown.",
          "author": "Ilsa Dasche, Huffer"
        }
      ]
    },
    {
      "name": "Riverwarden",
      "class": "Riverfolk",
      "desc": "Strong-backed and sure, you patrol the riverways in pursuit of lawbreakers and troublemakers.",
      "advances": [
        "BS",
        "S",
        "Fel",
        "WS",
        "I",
        "Int"
      ],
      "incomeSkill": "Melee (Basic)",
      "races": "Halfling, Human",
      "path1": {
        "name": "River Recruit",
        "status": "Silver 1",
        "skills": [
          "Athletics",
          "Dodge",
          "Endurance",
          "Melee (Basic)",
          "Perception",
          "Row",
          "Sail",
          "Swim"
        ],
        "talents": [
          "Strong Swimmer",
          "Strong Back",
          "Very Strong",
          "Waterman"
        ],
        "trappings": [
          "Hand Weapon (Sword)",
          "Leather Jack",
          "Uniform"
        ]
      },
      "path2": {
        "name": "Riverwarden",
        "status": "Silver 2",
        "skills": [
          "Bribery",
          "Charm",
          "Intimidate",
          "Gossip",
          "Lore (Riverways)",
          "Ranged (Blackpowder)"
        ],
        "talents": [
          "Criminal",
          "Gunner",
          "Fisherman",
          "Seasoned Traveller"
        ],
        "trappings": [
          "Lantern and Oil",
          "Pistol with 10 shot",
          "Shield"
        ]
      },
      "path3": {
        "name": "Shipsword",
        "status": "Silver 4",
        "skills": [
          "Climb",
          "Cool",
          "Intuition",
          "Leadership"
        ],
        "talents": [
          "Fearless (Wreckers)",
          "Hatred (Any)",
          "Pilot",
          "Sea Legs"
        ],
        "trappings": [
          "Grappling Hook",
          "Helmet",
          "Mail Shirt"
        ]
      },
      "path4": {
        "name": "Shipsword Master",
        "status": "Gold 1",
        "skills": [
          "Lore (Law)",
          "Navigation"
        ],
        "talents": [
          "Commanding Presence",
          "Kingpin",
          "Menacing",
          "Orientation"
        ],
        "trappings": [
          "Patrol Boats and Crew",
          "Symbol of Rank"
        ]
      },
      "flavour": [
        "A clarion call across the waterways heralds the arrival of the Imperial River Patrol, a river-borne police force known as much for its harassing thugs as for its good work. Most riverside villages and inns set aside moorings for them as, without them, worse criminals would rule the waters. The overworked patrols concentrate on egregious crimes, resolving petty misdemeanours with spot fines. On major trade-routes, the patrols have larger vessels manned by ‘Shipswords’ trained to tackle larger threats like Greenskins or Trolls.",
        "Some Riverwardens rarely see the water, instead manning remote outposts overlooking strategically important waters. Others crew fast riverboats charged to intercept smugglers in the night. The largest Riverwarden vessels are effectively sea-worthy warships, bristling with cannon and mortars, ready for almost any eventuality.",
        "<h5>Adventuring</h5>",
        "A diligent Riverwarden, searching vessels and following up leads, might stumble across any sort of nefarious plot or sinister cargo. Riverwardens typically work month-long shifts, but this means they also have months off. This structure is ideal for adventuring: as a Riverwarden need not desert their post to pursue private matters, or even have to persuade their Sergeant that it is their duty to follow up crimes. They can head off, investigate, and be back long before their next cycle begins. "
      ],
      "quotes": [
        {
          "quote": " So back in the day, when I was a riverwarden, Big Willi came round to tell me I had to leave a certain shipment alone. He said I should just let it through and everything would be alright. Of course, I was young, wasn’t I? I told the ship’s Master all about it. And was I rewarded for my honesty? Nah, Big Willi came round and beat me up, and the next day I was drummed out of the river patrol. They were all in it together, weren’t they?",
          "author": "Nikki Schnelling, ex-riverwarden"
        }
      ]
    },
    {
      "name": "Riverwoman",
      "class": "Riverfolk",
      "desc": "Rivers carry the Old World's traffic, and you stand in the heart of that excitement.",
      "advances": [
        "T",
        "Agi",
        "Dex",
        "WS",
        "I",
        "Fel"
      ],
      "incomeSkill": "Endurance",
      "races": "Dwarf, Halfling, Human",
      "path1": {
        "name": "Greenfish",
        "status": "Brass 2",
        "skills": [
          "Athletics",
          "Consume Alcohol",
          "Dodge",
          "Endurance",
          "Gossip",
          "Outdoor Survival",
          "Row",
          "Swim"
        ],
        "talents": [
          "Fisherman",
          "Gregarious",
          "Strider (Marshes)",
          "Strong Swimmer"
        ],
        "trappings": [
          "Bucket",
          "Fishing Rod and Bait",
          "Leather Leggings"
        ]
      },
      "path2": {
        "name": "Riverwoman",
        "status": "Brass 3",
        "skills": [
          "Gamble",
          "Lore (Local)",
          "Lore (Riverways)",
          "Ranged (Entangling)",
          "Ranged (Throwing)",
          "Set Trap"
        ],
        "talents": [
          "Craftsman (Boatbuilder)",
          "Rover",
          "Strong Back",
          "Waterman"
        ],
        "trappings": [
          "Eel Trap",
          "Leather Jerkin",
          "Net",
          "Spear"
        ]
      },
      "path3": {
        "name": "Riverwise",
        "status": "Brass 5",
        "skills": [
          "Charm",
          "Intuition",
          "Melee (Polearm)",
          "Perception"
        ],
        "talents": [
          "Savant (Riverways)",
          "Stout-hearted",
          "Tenacious",
          "Very Strong"
        ],
        "trappings": [
          "Row Boat",
          "Storm Lantern and Oil"
        ]
      },
      "path4": {
        "name": "River Elder",
        "status": "Silver 2",
        "skills": [
          "Entertain (Storytelling)",
          "Lore (Folklore)"
        ],
        "talents": [
          "Master Craftsman (Boatbuilder)",
          "Public Speaker",
          "Sharp",
          "Strong-minded"
        ],
        "trappings": [
          "Hut <em>or</em> Riverboat"
        ]
      },
      "flavour": [
        "The fertile banks of the great rivers of the Empire are densely populated, and the folk working day-in, day-out in the nearby waters and marshes provide much of the fresh fish, eels, and crustaceans feeding the towns and cities. Unlike the inland villages, those on the great rivers frequently receive outsiders who trade and restock, meaning Riverwomen are somewhat more open and diverse, and often the first with news from distant lands. There are any number of diverse jobs supported by the river. Many harvest the Reik’s bounty: fisherfolk (using rod, spear, or net), eelers (using traps or pots), or diggers for shellfish. Many live in riverside villages labouring, dredging, or lugging, and maintaining the Reik’s many thousands of vessels. ",
        "<h5>Adventuring</h5>",
        "A Riverwoman will feel at home on any stretch of water, and their skills ensure they can drop everything, confident that they will be able to find work elsewhere should they need to. A Riverwoman is well-placed to get the lowdown on the more iniquitous side of river life and may have contacts among the river’s lowlifes. With their knowledge and experience they can make all the difference to a water-based expedition or investigation."
      ],
      "quotes": [
        {
          "quote": "If I drop this branch in the water now, it will eventually get to Marienburg. Unless it sticks in the mud, of course.",
          "author": "Jemima the Greenfish"
        },
        {
          "quote": "They say the whole Empire will eventually float by if you sit by the Reik long enough. Well, I’ve sat here, rod in hand, for twenty years, watching the flow downriver. The things I could tell you. I’ve seen war and I’ve seen peace. I’ve seen good times and bad. I’ve seen happiness and sorrow.  And in all that time, I can honestly say, I’ve not caught a single bloody fish.",
          "author": "Thys Lange, the Reikland’s worst Fisherman"
        }
      ]
    },
    {
      "name": "Seaman",
      "class": "Riverfolk",
      "desc": "A life on the ocean waves calls to you, though many Reiklander Seamen never see the sea&hellip;",
      "advances": [
        "Agi",
        "Fel",
        "Dex",
        "WS",
        "I",
        "Int"
      ],
      "incomeSkill": "Sail",
      "races": "Dwarf, Halfling, High Elf, Human",
      "path1": {
        "name": "Landsman",
        "status": "Silver 1",
        "skills": [
          "Climb",
          "Consume Alcohol",
          "Gamble",
          "Gossip",
          "Row",
          "Melee (Brawling)",
          "Sail",
          "Swim"
        ],
        "talents": [
          "Fisherman",
          "Strider (Coastal)",
          "Strong Back",
          "Strong Swimmer"
        ],
        "trappings": [
          "Bucket",
          "Brush",
          "Mop"
        ]
      },
      "path2": {
        "name": "Seaman",
        "status": "Silver 3",
        "skills": [
          "Athletics",
          "Dodge",
          "Endurance",
          "Entertain (Singing)",
          "Language (Any)",
          "Melee (Basic)"
        ],
        "talents": [
          "Catfall",
          "Sea Legs",
          "Seasoned Traveller",
          "Strong Legs"
        ],
        "trappings": [
          "Hand Weapon (Boat Hook)",
          "Leather Jerkin"
        ]
      },
      "path3": {
        "name": "Boatswain",
        "status": "Silver 5",
        "skills": [
          "Cool",
          "Leadership",
          "Perception",
          "Trade (Carpenter)"
        ],
        "talents": [
          "Old Salt",
          "Strike Mighty Blow",
          "Tenacious",
          "Very Strong"
        ],
        "trappings": [
          "Trade Tools (Carpenter)"
        ]
      },
      "path4": {
        "name": "Ship's Master",
        "status": "Gold 2",
        "skills": [
          "Charm",
          "Navigation"
        ],
        "talents": [
          "Orientation",
          "Pilot",
          "Public Speaking",
          "Savvy"
        ],
        "trappings": [
          "Shipping Charts",
          "Sailing Ship and Crew",
          "Sextant",
          "Spyglass"
        ]
      },
      "flavour": [
        "Seamen sail the high seas in the Imperial Navy or for one of the Merchant houses. The Reikland may have no coast, but the River Reik from the Wasteland to Altdorf is miles wide and full of ocean-going vessels. The Imperial First Fleet that patrols these waters rarely sees the open sea, because the taxes to pass warships through Marienburg are exorbitantly high. ",
        "Seamen can always find work, whether as cabin staff on an Imperial battleship or on the crew of a small trading sloop. Some Seamen travel the world by working to pay their passage. The Reik also houses many ‘Missions’, buildings provided by the Imperial Navy for their staff, many of which employ Seamen.",
        "<h5>Adventuring</h5>",
        "Beyond Marienburg, the whole world awaits a Seaman: the perilous Sea of Claws, the unfathomable Great Ocean, the exotic Thousand Islands, the Southern Sea, the Black Gulf. And at home, a Seaman can spend a whole life plying the Reik’s waters and never have the same day twice. "
      ],
      "quotes": [
        {
          "quote": "I can see the Sea!",
          "author": "Marian Zelman, Optimistic Reiklander Sailor"
        },
        {
          "quote": "Yeah, I’ve sailed through Marienburg. Bloody Wastelanders made it as difficult as possible for us to get out to sea. I swear the huffer took us three times round the islands just for fun before we even smelled salt water. And they taxed us twice for everything. Even the ship’s cat got taxed. Glad to be home, to be honest.",
          "author": "Thom Wesserbrug, Boatswain"
        }
      ]
    },
    {
      "name": "Smuggler",
      "class": "Riverfolk",
      "desc": "You smuggle cargo, avoiding taxes and risking riverwarden inspections to secure maximum profit.",
      "advances": [
        "Agi",
        "WP",
        "Dex",
        "I",
        "Int",
        "Fel"
      ],
      "incomeSkill": "Stealth (Rural or Urban)",
      "races": "Dwarf, Halfling, High Elf, Human",
      "path1": {
        "name": "River Runner",
        "status": "Brass 2",
        "skills": [
          "Athletics",
          "Bribery",
          "Cool",
          "Consume Alcohol",
          "Row",
          "Stealth (Rural or Urban)",
          "Sail",
          "Swim"
        ],
        "talents": [
          "Criminal",
          "Strider (Marshes)",
          "Fisherman",
          "Strong Back"
        ],
        "trappings": [
          "Large Sack",
          "Mask <em>or</em> Scarves",
          "Tinderbox",
          "Storm Lantern and Oil"
        ]
      },
      "path2": {
        "name": "Smuggler",
        "status": "Brass 3",
        "skills": [
          "Haggle",
          "Gossip",
          "Lore (Local)",
          "Melee (Basic)",
          "Perception",
          "Secret Signs (Smuggler)"
        ],
        "talents": [
          "Dealmaker",
          "Etiquette (Criminals)",
          "Waterman",
          "Very Strong"
        ],
        "trappings": [
          "2 Barrels",
          "Hand Weapon",
          "Leather Jack",
          "Row Boat"
        ]
      },
      "path3": {
        "name": "Master Smuggler",
        "status": "Brass 5",
        "skills": [
          "Evaluate",
          "Intimidate",
          "Intuition",
          "Lore (Riverways)"
        ],
        "talents": [
          "Briber",
          "Fearless (Riverwardens)",
          "Pilot",
          "Strong Swimmer"
        ],
        "trappings": [
          "River Runner",
          "Speedy Riverboat"
        ]
      },
      "path4": {
        "name": "Smuggler King",
        "status": "Silver 2",
        "skills": [
          "Language (Any)",
          "Leadership"
        ],
        "talents": [
          "Kingpin",
          "Savvy",
          "Strider (Coastal)",
          "Sea Legs"
        ],
        "trappings": [
          "Disguise Kit",
          "Small Fleet of Riverboats"
        ]
      },
      "flavour": [
        "Most trade is legally taxed by local lords, as well as illegally taxed by bandits and protection rackets. Smugglers see themselves as charitable helpers: merchants make more profit, customers pay less coin, morally flexible Riverwardens take a cut, outlaws are avoided, and more besides. It takes experience and ingenuity to circumvent all the bailiffs, custom officials, excisemen, and busy bodies keen to stop them, but Smugglers dare the risks to support themselves and their families. ",
        "Smugglers come in many forms, perhaps transporting tiny, high-value goods for nobles, or large cargoes for shady merchants. Some Smugglers also deal in illicit goods, a crime that will incur significantly more repercussions than a burned finger or smugglers’ brand.",
        "<h5>Adventuring</h5>",
        "Smugglers find adventure, even though they usually want things to stay quiet and uneventful. Any number of things can go wrong on a smuggling mission, and even if things go right, there will always be the lure of the next job, likely bigger and better than the last. Whole adventures can be played out solely on smuggling missions. Similarly, it will be easy for a smuggler to find gainful employment away from their usual work. Someone with a trick up their sleeve, an eye for detail, and a cool head when things get hot is always going to be a desirable companion on dangerous expeditions and adventures."
      ],
      "quotes": [
        {
          "quote": "See, this is where the bottle of best Bordeleaux goes. The river wardens will search behind here, and find it, and confiscate it. That’s what we want because it means they don’t find the twelve bottles we have hidden under here. And if they find those, all is not lost, because they will be so pleased with themselves they won’t even bother searching over there where there’s twenty-four bottles.",
          "author": "Hansel Solomon, Smuggler"
        }
      ]
    },
    {
      "name": "Stevedore",
      "class": "Riverfolk",
      "desc": "You may officially load cargo for coin, but everyone knows the Stevedores rule the docklands.",
      "advances": [
        "WS",
        "T",
        "I",
        "S",
        "WP",
        "Int"
      ],
      "incomeSkill": "Endurance",
      "races": "Dwarf, Halfling, Human",
      "path1": {
        "name": "Dockhand",
        "status": "Brass 3",
        "skills": [
          "Athletics",
          "Climb",
          "Consume Alcohol",
          "Dodge",
          "Endurance",
          "Gossip",
          "Melee (Basic)",
          "Swim"
        ],
        "talents": [
          "Dirty Fighting",
          "Strong Back",
          "Sturdy",
          "Very Strong"
        ],
        "trappings": [
          "Hand Weapon (Boat Hook)",
          "Leather Gloves"
        ]
      },
      "path2": {
        "name": "Stevedore",
        "status": "Silver 1",
        "skills": [
          "Bribery",
          "Entertain (Storytelling)",
          "Gamble",
          "Intimidate",
          "Perception",
          "Stealth (Urban)"
        ],
        "talents": [
          "Criminal",
          "Etiquette (Guilders)",
          "Strong Legs",
          "Tenacious"
        ],
        "trappings": [
          "Guild License",
          "Leather Jerkin",
          "Pipe and Tobacco",
          "Porter Cap"
        ]
      },
      "path3": {
        "name": "Foreman",
        "status": "Silver 3",
        "skills": [
          "Cool",
          "Evaluate",
          "Intuition",
          "Leadership"
        ],
        "talents": [
          "Dealmaker",
          "Embezzle",
          "Etiquette (Criminals)",
          "Public Speaking"
        ],
        "trappings": [
          "Gang of Stevedores",
          "Whistle"
        ]
      },
      "path4": {
        "name": "Dock Master",
        "status": "Silver 5",
        "skills": [
          "Charm",
          "Lore (Taxes)"
        ],
        "talents": [
          "Kingpin",
          "Menacing",
          "Numismatics",
          "Read/Write"
        ],
        "trappings": [
          "Office and Staff",
          "Writing Kit"
        ]
      },
      "flavour": [
        "With their sole right to load and unload vessels, Stevedore Guilds can slow or even stop trade. This grants power, with many docksides effectively ruled by the guilds. In larger towns, several gangs might violently compete for supremacy. Scowling Foremen deal with guild matters and blow their whistles to summon their gangs from riverside inns, either for fresh work or to defend their territory. ",
        "A Stevedore might work alone in a riverside village, or in a large gang on a busy, chaotic city dockside. Sometimes they might be part of a criminal gang that just moves a bit of cargo on the side to cover their tracks. Some Stevedores are enforcers, making sure everyone else is working hard.",
        "<h5>Adventuring</h5>",
        "Amid the humdrum and repetition of the dockside there are good opportunities for adventure as a Stevedore. Stevedore gangs are virtually a law unto themselves, and they fight for every foot of riverside that they command. Stevedores are useful characters to have around, able to handle themselves, and deal with lowlifes. "
      ],
      "quotes": [
        {
          "quote": "Look, I know we specialise in coal, but don’t fence us in, we’ll port anything if the coin’s good. So, let’s do it afore the deal porters arrive; anything goes here, mate.",
          "author": "Albert Pförtner, Coal Porter"
        },
        {
          "quote": "Listen, boy. Don’t think them dockers have it easy. It’s dangerous, claustrophobic work, with heavy goods and high stacks, and if it’s done wrong, the cargo may overbalance, perhaps even capsizing the boat. What I’m saying is, pay the Stevedores right — and if you want a boat to sink, pay them extra.",
          "author": "Aleida Fuchs, Merchant"
        }
      ]
    },
    {
      "name": "Wrecker",
      "class": "Riverfolk",
      "desc": "You lure vessels into a watery doom and make off with their cargo.",
      "advances": [
        "WS",
        "S",
        "I",
        "WP",
        "BS",
        "Fel"
      ],
      "incomeSkill": "Melee (Basic)",
      "races": "Dwarf, Human, Wood Elf",
      "path1": {
        "name": "Cargo Scavenger",
        "status": "Brass 2",
        "skills": [
          "Climb",
          "Consume Alcohol",
          "Dodge",
          "Endurance",
          "Row",
          "Melee (Basic)",
          "Outdoor Survival",
          "Swim"
        ],
        "talents": [
          "Break and Enter",
          "Criminal",
          "Fisherman",
          "Strong Back"
        ],
        "trappings": [
          "Crowbar",
          "Large Sack",
          "Leather Gloves"
        ]
      },
      "path2": {
        "name": "Wrecker",
        "status": "Brass 3",
        "skills": [
          "Bribery",
          "Cool",
          "Intuition",
          "Navigation",
          "Perception",
          "Set Trap"
        ],
        "talents": [
          "Flee!",
          "Rover",
          "Strong Swimmer",
          "Trapper"
        ],
        "trappings": [
          "Hand Weapon (Boat Hook)",
          "Leather Jack",
          "Storm Lantern and Oil"
        ]
      },
      "path3": {
        "name": "River Pirate",
        "status": "Brass 5",
        "skills": [
          "Gossip",
          "Intimidate",
          "Ranged (Crossbow)",
          "Stealth (Rural)"
        ],
        "talents": [
          "Dirty Fighting",
          "Etiquette (Criminals)",
          "Menacing",
          "Waterman"
        ],
        "trappings": [
          "Crossbow with 10 Bolts",
          "Grappling Hook and Rope",
          "Riverboat"
        ]
      },
      "path4": {
        "name": "Wrecker Captain",
        "status": "Silver 2",
        "skills": [
          "Leadership",
          "Lore (Riverways)"
        ],
        "talents": [
          "Furious Assault",
          "In-fighter",
          "Pilot",
          "Warrior Born"
        ],
        "trappings": [
          "Fleet of Riverboats and Wrecker Crew",
          "Keg of Ale",
          "Manacles"
        ]
      },
      "flavour": [
        "Sometimes the gods send riverfolk an unexpected windfall as goods wash up from an ill-fated vessel. Sometimes the gods need a helping hand: that’s where Wreckers come in. Laying devious traps and sending disorienting signals, Wreckers lure unwary river traffic onto sand banks and rocks, then loot the wreck, no matter how any surviving crew may protest.",
        "Some Wreckers pride themselves on their clever traps, making any wreck seem like an accident, and keeping a plausible distance from the actual looters. Some board ships by force and throw its crew overboard, expert at spotting under-armed boats with valuable cargo. These River Pirates are hunted by road and riverwardens, constantly moving to evade the authorities.",
        "<h5>Adventuring</h5>",
        "A well-planned and executed wrecking is an adventure in itself: avoiding the authorities, disposing of the goods, keeping people’s mouths shut, and spending the ill-gotten gains all present their own opportunities and dangers. And who knows what cargo they will find, and who may come pursuing those who stole it. Wreckers who come across such adventure will have no trouble leaving their old lives behind or returning to them again when times are lean."
      ],
      "quotes": [
        {
          "quote": "We spied this juicy ripe sloop on its way to Carroburg just as night was falling, and lit some fires on the left bank to make them think the village was a few hundred yards closer. They tacked to starboard just like we planned and hit the sand bank dead on. Sweet as. How were we to know the boat was transporting a company of pistoliers?",
          "author": "Greta Lachsmann, shortly before her hanging"
        },
        {
          "quote": "Look, if we let the crew live, they’ll tell the wardens where we operate, so the only sensible thing is to kill ’em all.",
          "author": "Mandel Stein, Pragmatic River Pirate"
        }
      ]
    },
    {
      "name": "Bawd",
      "class": "Rogues",
      "races": "Halfling, High Elf, Human",
      "desc": "Street-wise and mercenary, you make a living selling illicit goods in the seedier side of town.",
      "advances": [
        "Agi",
        "Dex",
        "Fel",
        "I",
        "WP",
        "Int"
      ],
      "incomeSkill": "Charm",
      "path1": {
        "name": "Hustler",
        "status": "Brass 1",
        "skills": [
          "Bribery",
          "Charm ",
          "Consume Alcohol",
          "Entertain (Any)",
          "Gamble",
          "Gossip",
          "Haggle",
          "Intimidate"
        ],
        "talents": [
          "Attractive",
          "Alley Cat",
          "Blather",
          "Gregarious "
        ],
        "trappings": [
          "Flask of Spirits"
        ]
      },
      "path2": {
        "name": "Bawd",
        "status": "Brass 3",
        "skills": [
          "Dodge",
          "Endurance",
          "Intuition",
          "Lore (Local)",
          "Melee (Basic)",
          "Perception"
        ],
        "talents": [
          "Ambidextrous",
          "Carouser",
          "Criminal",
          "Resistant (Disease)"
        ],
        "trappings": [
          "Dose of Weirdroot",
          "Quality Clothing"
        ]
      },
      "path3": {
        "name": "Procurer",
        "status": "Silver 1",
        "skills": [
          "Cool",
          "Evaluate",
          "Language (any)",
          "Lore (Law) "
        ],
        "talents": [
          "Dealmaker",
          "Embezzle",
          "Etiquette (Any)",
          "Suave "
        ],
        "trappings": [
          "A Ring of Hustlers"
        ]
      },
      "path4": {
        "name": "Ringleader",
        "status": "Silver 3",
        "skills": [
          "Leadership",
          "Lore (Heraldry)"
        ],
        "talents": [
          "Briber",
          "Kingpin",
          "Numismatics",
          "Savvy "
        ],
        "trappings": [
          "Townhouse with Discreet Back Entrance",
          "a Ring of Bawds"
        ]
      },
      "flavour": [
        "Bawds guide folk to establishments offering a variety of illegal and immoral services. Though many Humans and Dwarfs have objections to such activities, most Halflings and High Elves are quite matter-of-fact about drug-dens, brothels, or other houses of vice. ",
        "Bawds include drug-dealers, dancers, hustlers and artists’ models. Many famous masterpieces of the modern era have been posed for by Bawds plucked from the street. Traveling armies are followed by camp followers, with Bawds among them looking to make coin in any way they can. Ringleaders, proprietors of establishments where Bawds gather, can accrue significant empires providing services to all types of rogues, from fences who need discreet access to rich clients, to providing safe bolt-holes for gang bosses and crime lords.",
        "<h5>Adventuring</h5>",
        "Bawds living in urban areas sometimes travel to flee plagues and religious persecutions, the latter of which crop up all-too-frequently in areas dominated by Sigmar worship. Others, such as those who rove with entertainers, consider travel as part and parcel of their occupation. Those who secure a patron might have significant lengths of time left to their own devices."
      ],
      "quotes": [
        {
          "quote": "Come to the Hammer and Bucket, home of the best music and entertainment in old Altdorf town! You will not be disappointed!",
          "author": "Raynald Schmid, Bawd"
        },
        {
          "quote": "Scoff all you like, but those clothes cost money. For a lad born ’neath the dung heap, he lives a life of luxury.",
          "author": "Hertel Netzhoch, Innkeep"
        }
      ]
    },
    {
      "name": "Charlatan",
      "class": "Rogues",
      "races": "Halfling, High Elf, Human",
      "desc": "Unscrupulous and charming, you separate fools from their money; thankfully, there is no shortage of fools&hellip;",
      "advances": [
        "I",
        "Dex",
        "Fel",
        "WP",
        "Agi",
        "Int"
      ],
      "incomeSkill": "Charm",
      "path1": {
        "name": "Swindler",
        "status": "Brass 3",
        "skills": [
          "Bribery",
          "Consume Alcohol",
          "Charm ",
          "Entertain (Storytelling)",
          "Gamble",
          "Gossip",
          "Haggle",
          "Sleight of Hand "
        ],
        "talents": [
          "Cardsharp",
          "Diceman",
          "Etiquette (Any)",
          "Luck "
        ],
        "trappings": [
          "Backpack",
          "2 Sets of Clothing",
          "Deck of Cards",
          "Dice"
        ]
      },
      "path2": {
        "name": "Charlatan",
        "status": "Brass 5",
        "skills": [
          "Cool",
          "Dodge",
          "Entertain (Acting)",
          "Evaluate",
          "Intuition",
          "Perception"
        ],
        "talents": [
          "Blather",
          "Criminal",
          "Fast Hands",
          "Secret Identity "
        ],
        "trappings": [
          "1 Forged Document",
          "2 Sets of Quality Clothing",
          "Selection of Coloured Powders and Water",
          "Selection of Trinkets and Charms"
        ]
      },
      "path3": {
        "name": "Con Artist",
        "status": "Silver 2",
        "skills": [
          "Language (Thief )",
          "Lore (Heraldry)",
          "Pick Lock",
          "Secret Signs (Thief )"
        ],
        "talents": [
          "Attractive",
          "Cat-tongued",
          "Dealmaker",
          "Read/Write "
        ],
        "trappings": [
          "Disguise Kit",
          "Lock Picks",
          "Multiple Forged Documents"
        ]
      },
      "path4": {
        "name": "Scoundrel",
        "status": "Silver 4",
        "skills": [
          "Lore (Genealogy)",
          "Research"
        ],
        "talents": [
          "Gregarious",
          "Master of Disguise",
          "Nose for Trouble",
          "Suave"
        ],
        "trappings": [
          "Forged Seal",
          "Writing Kit"
        ]
      },
      "flavour": [
        "A Charlatan traffics in trust, yet profits from treachery. By preying on emotions and psychological weaknesses, Charlatans offer their ‘mark’ a prize that is too good to be true. Social privilege provides no protection, and even the loftiest citizens can fall victim to a skilled Charlatan. In addition to a knack for lying, a lack of conscience is also of benefit to Charlatans.",
        "Charlatans include Swindlers, Con Artists, Gamblers, and other Scoundrels seeking to prey on the gullible. Halflings often operate distraction cons in small family groups. Young High Elves, slumming it with Humans, treat their cons as one big game, not motivated by profit, but to prove their superiority. Some experienced Charlatans work with artists, who forge documentation for a cut of any profits.",
        "<h5>Adventuring</h5>",
        "To avoid rousing suspicion, Charlatans rarely stay in one area for long. Few Swindlers openly admit to their calling, preferring instead to masquerade as anyone other than themselves. Because of this, there is little stopping Charlatans from pursuing side-matters of interests; equally, afterwards, they can return to grafting anywhere with rich fools willing to part with coin on naught but a promise."
      ],
      "quotes": [
        {
          "quote": "I’ve carried this across countless leagues from the highest towers of the Elves. See how it sparkles in the moonlight? Only magic can cause this inner light! Unbelievable as it may be, I must grudgingly part with it. For such power, any price is but a trifle!",
          "author": "Wolmar Rotte, Con Man"
        },
        {
          "quote": "The last living heir of Lord Schwalb, you say? Hogwash! You’re the fifth ‘heir’ to call this afternoon! How much did you pay for that scrap of paper? Better yet, who’s the swindler what sold it to you?",
          "author": "Gerold Behn, Irritated Butler"
        }
      ]
    },
    {
      "name": "Fence",
      "class": "Rogues",
      "races": "Dwarf, Halfling, Human",
      "desc": "A shrewd assessor of valuables, you’ll buy anything, legal or not, and turn it around for a tidy profit.",
      "advances": [
        "I",
        "Agi",
        "Fel",
        "Dex",
        "Int",
        "WP"
      ],
      "incomeSkill": "Evaluate",
      "path1": {
        "name": "Broker",
        "status": "Silver 1",
        "skills": [
          "Charm",
          "Consume Alcohol",
          "Dodge",
          "Evaluate ",
          "Gamble",
          "Gossip",
          "Haggle",
          "Melee (Basic)"
        ],
        "talents": [
          "Alley Cat",
          "Cardsharp",
          "Dealmaker",
          "Gregarious "
        ],
        "trappings": [
          "Hand Weapon",
          "Stolen Goods worth 3d10 Shillings"
        ]
      },
      "path2": {
        "name": "Fence",
        "status": "Silver 2",
        "skills": [
          "Cool",
          "Intimidate",
          "Intuition",
          "Perception",
          "Secret Signs (Thief )",
          "Trade (Engraver)"
        ],
        "talents": [
          "Criminal",
          "Etiquette (Criminals)",
          "Numismatics",
          "Savvy"
        ],
        "trappings": [
          "Eye-glass",
          "Trade Tools (Engraver)",
          "Writing Kit"
        ]
      },
      "path3": {
        "name": "Master Fence",
        "status": "Silver 3",
        "skills": [
          "Bribery",
          "Entertain (Storytelling)",
          "Lore (Art)",
          "Lore (Local)"
        ],
        "talents": [
          "Kingpin",
          "Strike to Stun",
          "Suave",
          "Super Numerate"
        ],
        "trappings": [
          "Pawnbroker’s Shop"
        ]
      },
      "path4": {
        "name": "Black Marketeer",
        "status": "Silver 4",
        "skills": [
          "Lore (Heraldry)",
          "Research"
        ],
        "talents": [
          "Dirty Fighting",
          "Iron Will",
          "Menacing",
          "Briber "
        ],
        "trappings": [
          "Hired Muscle",
          "Network of Informants",
          "Warehouse"
        ]
      },
      "flavour": [
        "A Fence buys thieves’ spoils and sells it on for profit, often to those unaware the goods are stolen. Successful Fences sometimes operate as pawn brokers, importers, or other merchants. Others prefer to remain mobile, trafficking only in portable items. Though the average Fence deals in goods and valuables, there are also well-informed specialists who focus on information and forbidden knowledge. Some Fences move stolen items across the Empire. A painting stolen in Altdorf is easier to sell in Talabheim to an audience unaware of the theft. When high profile items vanish, Fences are also the first individuals to be consulted by those looking to acquire them. Some Fences even take commissions from clients, connecting them with those who can steal to order.",
        "<h5>Adventuring</h5>",
        "The search for buyers and sellers, or the need to escape a terrible situation, can take a Fence anywhere. They can be found across the Empire and in many regions beyond its borders. Up-and-coming Brokers transport illicit goods between Old World cities in search of buyers. Others, looking to make a name for themselves elsewhere, attempt to make their own niches in existing city underworlds. Given that their interests often collide, Fences and merchants make occasional bedfellows, as well. With all of this criminal activity and movement, trouble often follows."
      ],
      "quotes": [
        {
          "quote": "I know it’s stolen. You know it’s stolen. Even old Sigmar knows it’s stolen. So when I ask you if it’s stolen, don’t insult me by telling me it isn’t stolen. Lucky for you, I deal in stolen, so stop panicking.",
          "author": "Elene Weslach, Mover"
        },
        {
          "quote": "Why am I called a Fence? Well, it’s because I provide you with some de-fence from being caught, innit. So, you go thief, and I’ll make sure you don’t have to worry about how to shift the merchandise. Think of me like your partner-in-crime.",
          "author": "‘Boil’ Vakram, Fence"
        }
      ]
    },
    {
      "name": "Grave Robber",
      "class": "Rogues",
      "races": "Halfling, Human",
      "desc": "You brave the threat of necromancy, stealing from the dead to line your own pockets.",
      "advances": [
        "S",
        "I",
        "WP",
        "WS",
        "Dex",
        "Int"
      ],
      "incomeSkill": "Stealth (Any)",
      "path1": {
        "name": "Body Snatcher",
        "status": "Brass 2",
        "skills": [
          "Climb",
          "Cool",
          "Dodge",
          "Endurance",
          "Gossip",
          "Intuition",
          "Perception",
          "Stealth (Any)"
        ],
        "talents": [
          "Alley Cat",
          "Criminal",
          "Flee!",
          "Strong Back "
        ],
        "trappings": [
          "Crowbar",
          "Handcart",
          "Hooded Cloak",
          "Tarpaulin"
        ]
      },
      "path2": {
        "name": "Grave Robber",
        "status": "Brass 3",
        "skills": [
          "Bribery",
          "Drive",
          "Evaluate",
          "Haggle",
          "Lore (Medicine)",
          "Melee (Basic)"
        ],
        "talents": [
          "Break and Enter",
          "Night Vision",
          "Resistance (Disease)",
          "Very Strong"
        ],
        "trappings": [
          "Backpack",
          "Hand Weapon",
          "Spade",
          "Storm Lantern and Oil"
        ]
      },
      "path3": {
        "name": "Tomb Robber",
        "status": "Silver 1",
        "skills": [
          "Lore (History)",
          "Pick Lock",
          "Research",
          "Set Trap "
        ],
        "talents": [
          "Read/Write",
          "Strike Mighty Blow",
          "Tenacious",
          "Tunnel Rat"
        ],
        "trappings": [
          "Hand Weapon (Pick)",
          "Horse and Cart",
          "Leather Jack",
          "Rope",
          "Trade Tools (Thief)"
        ]
      },
      "path4": {
        "name": "Treasure Hunter",
        "status": "Silver 5",
        "skills": [
          "Navigation",
          "Trade (Engineer)"
        ],
        "talents": [
          "Fearless (Undead)",
          "Sixth Sense",
          "Strong-minded",
          "Trapper"
        ],
        "trappings": [
          "Bedroll",
          "Maps",
          "Tent",
          "Trade Tools (Engineer)",
          "Writing Kit"
        ]
      },
      "flavour": [
        "Trafficking in bodies and body parts is lucrative, with high demand from universities and physicians for fresh cadavers. As well as the scholarly market, corpses sometimes interred with all manner of valuables can be found beneath the ravenstones in the tombs of Morr’s Gardens. Because their labours are obvious, illegal, and sacrilegious, Grave Robbers usually work under cover of darkness. Body Snatchers have been known to cut out the middle man and take beggars or other unfortunates straight off the streets. Tomb Robbers avoid the legal dangers of looting the recently dead, and instead journey to ancient ruins and barrows, risking the restless dead and brigands alike. Peculiarly, some  successful Treasure Hunters find themselves celebrated as heroes, their treasures sold to, and displayed by, the aristocracy. It’s even rumoured that the great wealth of one of the Knightly Orders came from a group of their members plundering a foreign tomb.",
        "<h5>Adventuring</h5>",
        "Grave Robbers easily take to the adventuring life, especially if their nocturnal sojourns are discovered by unsympathetic authorities. They may also be sought out by antiquarians who wish to engage their expert services in the excavation of a tomb, or perhaps they will feel compelled to track down a suspected necromancer who is using corpses for nefarious purposes. "
      ],
      "quotes": [
        {
          "quote": "You can’t take it with you... but I can certainly take it with me.",
          "author": "Symon Schreiber, Grave Robber"
        },
        {
          "quote": "It’s not just the jewels, Herbert. Look at all the bones! There’s professors in Altdorf who’d pay good money for these!",
          "author": "Tyle ‘the Ghoul’ Grubsch, Body Snatcher"
        },
        {
          "quote": "The nightmares of Khemri still haunt me. The curses cast by those long-dead tyrants have sealed my fate. I only hope Morr can put a stop to the necromancy that rots my bones and blackens my heart.",
          "author": "Lady Estelle Hauptleiter, Treasure Hunter (deceased)"
        }
      ]
    },
    {
      "name": "Outlaw",
      "class": "Rogues",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "desc": "You prey upon travellers, extracting a toll from the vulnerable and the unsuspecting.",
      "advances": [
        "WS",
        "S",
        "T",
        "BS",
        "I",
        "Fel"
      ],
      "incomeSkill": "Intimidate",
      "path1": {
        "name": "Brigand",
        "status": "Brass 1 ",
        "skills": [
          "Athletics",
          "Consume Alcohol",
          "Cool",
          "Endurance",
          "Gamble",
          "Intimidate ",
          "Melee (Basic)",
          "Outdoor Survival "
        ],
        "talents": [
          "Combat Aware",
          "Criminal",
          "Rover",
          "Flee!"
        ],
        "trappings": [
          "Bedroll",
          "Hand Weapon",
          "Leather Jerkin",
          "Tinderbox"
        ]
      },
      "path2": {
        "name": "Outlaw",
        "status": "Brass 2 ",
        "skills": [
          "Dodge",
          "Heal",
          "Lore (Local)",
          "Perception",
          "Ranged  (Bow)",
          "Stealth (Rural) "
        ],
        "talents": [
          "Dirty Fighting",
          "Marksman",
          "Strike to Stun",
          "Trapper "
        ],
        "trappings": [
          "Bow with 10 Arrows",
          "Shield",
          "Tent"
        ]
      },
      "path3": {
        "name": "Outlaw Chief",
        "status": "Brass 4 ",
        "skills": [
          "Gossip",
          "Intuition",
          "Leadership",
          "Ride (Horse) "
        ],
        "talents": [
          "Rapid Reload",
          "Roughrider",
          "Menacing",
          "Very Resilient "
        ],
        "trappings": [
          "Helmet",
          "Riding Horse with Saddle and Tack",
          "Sleeved Mail Shirt",
          "Band of Outlaws"
        ]
      },
      "path4": {
        "name": "Bandit King",
        "status": "Silver 2 ",
        "skills": [
          "Charm",
          "Lore (Empire) "
        ],
        "talents": [
          "Deadeye Shot",
          "Fearless (Road Wardens)",
          "Iron Will",
          "Robust "
        ],
        "trappings": [
          "‘Fiefdom’ of Outlaw Chiefs",
          "Lair"
        ]
      },
      "flavour": [
        "Outlaws ply the roads of the Old World in search of vulnerable travellers and merchant caravans. They lead dangerous and often hardscrabble lives. Many do not see themselves as criminals, but as oppressed groups trying to live their lives free from outside constraints. Many Wood Elf outlaws fit this description, pushing back against the Humans proliferating at the edge of the forests, willing to take more drastic action than others of their kind. Particularly savvy and brutal Outlaws may form bands of their own, sometimes even uniting several bands under a single banner. Such Bandit Kings are feared and reviled by noble and peasant alike. Though few Outlaws discriminate in choosing their prey, some claim to protect the common man. These do-gooders focus their larceny on greedy nobles and, in return, locals may provide them with food, information, and safe harbour. ",
        "<h5>Adventuring</h5>",
        "Outlaw bands are not all wild mobs, so many can be reasoned with if approached correctly. An Outlaw might be asked to accompany a group of adventurers as a guide or to protect them, especially if the group are trying to stop unholy activity in a Bandit King’s domain. Individual Outlaws may find it simple to join an adventuring band, although they may need to disguise themselves if they go anywhere the Outlaw is wanted. "
      ],
      "quotes": [
        {
          "quote": "They were children, not brigands. Starving, filthy, sickly. They held us under the sight of their arrows and we stood fast… my son’s age, they were. Children. Killed six of us…",
          "author": "Valentin Behr, Road Warden"
        },
        {
          "quote": "...and he says, “Titus, why d’you carry them shears?” And I says, “These?” And he says, “Aye, those’re the only shears I see.” So I laughed and answered: “Sometimes they don’t want to take off their rings like I ask ’em to. When I show ’em the shears, most of ’ em change their tune right quick. And if they don’t…’’   Hehehe.",
          "author": "Titus Widmann, Outlaw"
        }
      ]
    },
    {
      "name": "Racketeer",
      "class": "Rogues",
      "races": "Dwarf, Halfling, Human",
      "desc": "You are part of an organised criminal gang, collecting debts and extorting money from the weak.",
      "advances": [
        "WS",
        "S",
        "T",
        "Fel",
        "WP",
        "Int"
      ],
      "incomeSkill": "Intimidate",
      "path1": {
        "name": "Thug",
        "status": "Brass 3 ",
        "skills": [
          "Consume Alcohol",
          "Cool",
          "Dodge",
          "Endurance",
          " Intimidate ",
          "Lore (Local)",
          "Melee (Brawling)",
          "Stealth (Urban) "
        ],
        "talents": [
          "Criminal",
          "Etiquette (Criminals)",
          "Menacing",
          "Strike Mighty Blow "
        ],
        "trappings": [
          " Knuckledusters",
          "Leather Jack"
        ]
      },
      "path2": {
        "name": "Racketeer",
        "status": "Brass 5 ",
        "skills": [
          "Bribery",
          "Charm",
          "Evaluate",
          "Gossip",
          "Language (Estalian or Tilean)",
          "Melee (Basic) "
        ],
        "talents": [
          "Dirty Fighting",
          "Embezzle",
          "Strike to Stun",
          "Warrior Born "
        ],
        "trappings": [
          "Hand Weapon",
          "Hat",
          "Mail Shirt"
        ]
      },
      "path3": {
        "name": "Gang Boss",
        "status": "Silver 3 ",
        "skills": [
          "Intuition",
          "Leadership",
          "Perception",
          "Ranged (Crossbow) "
        ],
        "talents": [
          "Fearless (Watchmen)",
          "Iron Will",
          "Resistance (Poison)",
          "Robust "
        ],
        "trappings": [
          "Crossbow Pistol with 10 Bolts",
          "Gang of Thugs and Racketeers",
          "Lair"
        ]
      },
      "path4": {
        "name": "Crime Lord",
        "status": "Silver 5 ",
        "skills": [
          "Lore (Law)",
          "Lore (Politics) "
        ],
        "talents": [
          "Commanding Presence",
          "Kingpin",
          "Frightening",
          "Wealthy "
        ],
        "trappings": [
          "Network of Informers",
          "Quality Clothing and Hat",
          "Subordinate Gang Bosses"
        ]
      },
      "flavour": [
        "Racketeers extort money from law-abiding citizens and merchants, providing ‘protection’ or some similar fraudulent ‘service’. If the ‘fees’ are not paid on time, the victims, their families, and their livelihoods are at considerable risk. Large gangs bribe or intimidate local authorities to ignore their activities; their Thugs are always willing to kill — or worse — to keep business running smoothly. Thugs are employed to collect debts of all kind, especially those incurred through gambling losses or high-interest-rate loans. In a world brimming with poverty, the promise of easy wealth is an allure countless fools are unable to ignore. The more organised the graft, the larger and more complex the organisations running them become. While the smallest rackets are run by small gangs with limited territory beyond a building or two, the largest can span cities or even entire provinces, and the Crime Lords who run them can wield extraordinary power. ",
        "<h5>Adventuring</h5>",
        "Thugs and Racketeers are always willing to resort to threats and violence, making them valuable members of any party that expects to face aggressive opposition. Gang Bosses might even take their business on the road, looking to expand their territory or explore new opportunities for intrigue and profit. Given the competitive nature of such rackets, even the most powerful Crime Lords might find themselves deposed by opponents or treachery. Forced to hide or flee, such experienced crooks can seek to use a group of experienced adventurers to their advantage."
      ],
      "quotes": [
        {
          "quote": "I hope you have Hazelmann’s money because I really hate the sound of breaking fingers.",
          "author": "Claus Betelhof, Well-Mannered Racketeer"
        },
        {
          "quote": "IF YOU CAN’T PAE THE DEBT, DON’T MAKE THE BET.",
          "author": "Sign in Bosco’s Bones (Altdorf gambling house)"
        },
        {
          "quote": "or bosco wil brake ya legs",
          "author": "Bosco’s Bones Sign Addendum scrawled in chalk"
        }
      ]
    },
    {
      "name": "Thief",
      "class": "Rogues",
      "races": "Dwarf, Halfling, Human",
      "desc": "You steal from others in order to line your own pockets, and you’re rather good at it.",
      "advances": [
        "I",
        "Agi",
        "WP",
        "Dex",
        "S",
        "Fel"
      ],
      "incomeSkill": "Stealth (Urban)",
      "path1": {
        "name": "Prowler",
        "status": "Brass 1 ",
        "skills": [
          "Athletics",
          "Climb",
          "Cool",
          "Dodge",
          "Endurance",
          "Intuition",
          "Perception",
          "Stealth (Urban) "
        ],
        "talents": [
          "Alley Cat",
          "Criminal",
          "Flee!",
          "Strike to Stun "
        ],
        "trappings": [
          "Crowbar",
          "Leather Jerkin",
          "Sack"
        ]
      },
      "path2": {
        "name": "Thief",
        "status": "Brass 3 ",
        "skills": [
          "Evaluate",
          "Gossip",
          "Lore (Local)",
          "Pick Lock",
          "Secret Signs (Thief)",
          "Sleight of Hand "
        ],
        "talents": [
          "Break and Enter",
          "Etiquette (Criminals)",
          "Fast Hands",
          "Shadow "
        ],
        "trappings": [
          "Trade Tools (Thief)",
          "Rope"
        ]
      },
      "path3": {
        "name": "Master Thief",
        "status": "Brass 5 ",
        "skills": [
          "Bribery",
          "Gamble",
          "Intimidate",
          "Ranged (Crossbow) "
        ],
        "talents": [
          "Night Vision",
          "Nimble Fingered",
          "Step Aside",
          "Trapper "
        ],
        "trappings": [
          "Crossbow Pistol with 10 Bolts"
        ]
      },
      "path4": {
        "name": "Cat Burglar",
        "status": "Silver 3 ",
        "skills": [
          "Charm",
          "Set Trap "
        ],
        "talents": [
          "Catfall",
          "Scale Sheer Surface",
          "Strong Legs",
          "Wealthy "
        ],
        "trappings": [
          "Dark Clothing",
          "Grappling Hook",
          "Mask or Scarves"
        ]
      },
      "flavour": [
        "Thieves steal all manner of wealth and goods from their fellow man. From the lowliest footpad to the wiliest burglar, the thought of an honest day’s work in return for a respectable wage is little more than a bad joke. Thieves often organize themselves into gangs alongside charlatans, racketeers, and fences to further their mutual wealth. Bitter feuds between such illicit organisations have been known to last for years or even decades. The lowliest Thieves target individuals, picking pockets or waylaying victims in rat-infested alleyways. Burglars avoid confrontation by breaking into businesses and residences, carrying off portable valuables. More ambitious thieves scope out their targets for days or weeks, even going so far as to infiltrate their target locations to get a more precise lay of the land. Working with other professional burglars, such experts can organise heists of which their lesser peers can only dream.",
        "<h5>Adventuring</h5>",
        "Thieves who run afoul of the law are obliged to hide or flee from justice, putting many would-be inmates on the run. Sometimes the very items stolen by Thieves are of such exorbitant value or supernatural quality they seem to attract trouble like a mouldering corpse draws flies, which can lead them into all sorts of unexpected adventures. Of course, a Burglar’s talents are always valuable to adventurers, and reliable examples can expect to be well-compensated for their skills."
      ],
      "quotes": [
        {
          "quote": "One creaky floorboard in the whole place and I’m the one to find it…",
          "author": "Alette Zimmermann, Thief, Jailed"
        },
        {
          "quote": "What the...? Those aren’t dogs... they’re bears!",
          "author": "Marx the Mauled, Unlucky Thief"
        },
        {
          "quote": "No, the list of charges does not include, “Stealing the magistrate’s heart away.” You must have me confused with a magistrate who has a heart.",
          "author": "Leonora Nithardt, Magistrate"
        }
      ]
    },
    {
      "name": "Witch",
      "class": "Rogues",
      "races": "Human",
      "desc": "Wilful and ambitious, you strive to master magic without an officially sanctioned licence to operate.",
      "advances": [
        "WS",
        "T",
        "WP",
        "I",
        "Fel",
        "Int"
      ],
      "incomeSkill": "Language (Magick)",
      "path1": {
        "name": "Hexer",
        "status": "Brass 1 ",
        "skills": [
          "Channelling",
          "Cool",
          "Endurance",
          "Gossip",
          "Intimidate",
          "Language (Magick)",
          "Sleight of Hand",
          "Stealth (Rural) "
        ],
        "talents": [
          "Criminal",
          "Instinctive Diction",
          "Menacing",
          "Petty Magic "
        ],
        "trappings": [
          "Candles",
          "Chalk",
          "Doll",
          "Pins"
        ]
      },
      "path2": {
        "name": "Witch",
        "status": "Brass 2 ",
        "skills": [
          "Charm Animal",
          "Dodge",
          "Intuition",
          "Melee (Polearm)",
          "Perception",
          "Trade (Herbalist) "
        ],
        "talents": [
          "Arcane Magic (Witchery)",
          "Attractive",
          "Second Sight",
          "Witch! "
        ],
        "trappings": [
          "Quarterstaff",
          "Sack",
          "Selection of Herbs",
          "Trade Tools (Herbalist)"
        ]
      },
      "path3": {
        "name": "Wyrd",
        "status": "Brass 3 ",
        "skills": [
          "Bribery",
          "Charm",
          "Haggle",
          "Lore (Dark Magic) "
        ],
        "talents": [
          "Animal Affinity",
          "Fast Hands",
          "Frightening",
          "Magical Sense "
        ],
        "trappings": [
          "Backpack",
          "Cloak with Several Pockets",
          "Lucky Charm"
        ]
      },
      "path4": {
        "name": "Warlock",
        "status": "Brass 5 ",
        "skills": [
          "Lore (Daemonology)",
          "Lore (Magic) "
        ],
        "talents": [
          "Aethyric Attunement",
          "Luck",
          "Strong-minded",
          "Very Resilient "
        ],
        "trappings": [
          "Robes",
          "Skull"
        ]
      },
      "flavour": [
        "Any with the rare talent to wield magic must, by law, be trained by wizards of the College of Magic. Not everyone accepts such a fate; some hide their powers or go on the run. Such folk are called Witches. They risk insanity and damnation as magic burns through them without correct tutelage, and rarely understand the nature of the forces in which they dabble. Others embrace their burgeoning powers wholeheartedly, accepting the risks. Witches come in all varieties, with the talent to wield magic playing no favourites. Some are benign figures simply seeking freedom. Others are nobles refusing to accept they are Witches, for to do so is to be disinherited. Yet others are terrified of what they may become, so run away. Whatever the case, few will admit what they are, as all risk burning by over-zealous Sigmarites. ",
        "<h5>Adventuring</h5>",
        "Witches lead dangerous lives. Though some pose as wizards, such deceptions are easily discerned by anyone with any knowledge of magic. Nevertheless, bands of adventurers — especially those without unwavering faith or moral qualms — rarely care for the specifics of a Witch’s education so long as the methods used are effective and have no truck with the Dark Gods. Although unsanctioned witchery is illegal — carrying the death penalty — most wizards have a brief experience as a Witch before entering the Colleges of Magic. This is acknowledged by both the Colleges and the cults, so a Witch, if discovered, should submit to the authorities. Training in the Colleges could be covered as time between adventures, meaning the Witch can return at a later date in the Wizard career, or it could become the focus of a new adventure."
      ],
      "quotes": [
        {
          "quote": "Do you think only wizards can wield magic? Think again! I, too, have such understanding, and I refuse to become a slave to the so-called Colleges.",
          "author": "Apprentice Franz Zimmel of the Gold Order,<br/>3 months before being captured by a Witch Hunter "
        }
      ]
    },
    {
      "name": "Cavalryman",
      "class": "Warriors",
      "races": "High Elf, Human, Wood Elf",
      "desc": "A dashing and fearless rider, you bring speed, versatility, and skill-at-arms to the battlefield.",
      "advances": [
        "WS",
        "S",
        "Agi",
        "BS",
        "I",
        "Fel"
      ],
      "incomeSkill": "Ride (Horse)",
      "path1": {
        "name": "Horseman",
        "status": "Silver 2 ",
        "skills": [
          "Animal Care",
          "Charm Animal",
          "Endurance",
          "Language (Battle)",
          "Melee (Basic)",
          "Outdoor Survival",
          "Perception",
          "Ride (Horse) "
        ],
        "talents": [
          "Combat Aware",
          "Crack the Whip",
          "Lightning Reflexes",
          "Roughrider "
        ],
        "trappings": [
          "Leather Jack",
          "Riding Horse with Saddle and Tack"
        ]
      },
      "path2": {
        "name": "Cavalryman",
        "status": "Silver 4 ",
        "skills": [
          "Charm",
          "Consume Alcohol",
          "Cool",
          "Gossip",
          "Melee (Cavalry)",
          "Ranged (Blackpowder) "
        ],
        "talents": [
          "Etiquette (Soldiers)",
          "Gunner",
          "Seasoned Traveller",
          "Trick Riding "
        ],
        "trappings": [
          "Breastplate",
          "Helmet",
          "Light Warhorse with Saddle and Tack",
          "Pistol with 10 Shots",
          "Shield"
        ]
      },
      "path3": {
        "name": "Cavalry Sergeant",
        "status": "Gold 1 ",
        "skills": [
          "Intimidate",
          "Intuition",
          "Leadership",
          "Lore (Warfare) "
        ],
        "talents": [
          "Combat Reflexes",
          "Fast Shot",
          "Hatred (Any)",
          "Warleader "
        ],
        "trappings": [
          "Sash"
        ]
      },
      "path4": {
        "name": "Cavalry Officer",
        "status": "Gold 2 ",
        "skills": [
          "Gamble",
          "Lore (Heraldry) "
        ],
        "talents": [
          "Accurate Shot",
          "Inspiring",
          "Reaction Strike",
          "Robust "
        ],
        "trappings": [
          "Deck of Cards",
          "Quality Clothing"
        ]
      },
      "flavour": [
        "Whether it’s units of Pistoliers, Outriders, Demilancers, Horse Archers, or similar, Cavalrymen are deployed for maximum strategic advantage. On campaign, that means scouting, raiding, harassing the enemy lines, or defending foragers. On the battlefield, they are also particularly versatile, able to strike quickly and melt away. For speed of movement, scouting, versatility, and sheer élan, Cavalrymen cannot be rivalled. Swift, lightly-armoured cavalry is employed by most armies, including forces of the cults and less formal armed bands including mercenaries or private armies. Bretonnian armies make use of mounted men at arms, while Wood Elf Gladeriders are some of the most feared light cavalry in the Old World. ",
        "<h5>Adventuring</h5>",
        "A cavalryman currently in the State Army is not just going to drop everything on a whim. Should they have something they wish to personally pursue, they will require permission from senior officers, perhaps buy out their commission if they have one, or go absent without leave. As an alternative, they could be ordered to investigate matters of importance by their superiors? Mercenary cavalrymen have more flexibility to strike out adventuring, being little more than hired swords. "
      ],
      "quotes": [
        {
          "quote": "Any pistolier not dead by thirty is a scoundrel.",
          "author": "General Lasaal, Reikland’s 5th Regiment of Cavalry"
        },
        {
          "quote": "An outrider came by yesterday, checking to see if we were safe. Gosh, he was so handsome and dashing, who wouldn’t want to go outriding with him? He grabbed my buns and was off like the wind. Never paid for them, mind.",
          "author": "Lena Fluffe, Walfenburg baker"
        }
      ]
    },
    {
      "name": "Guard",
      "class": "Warriors",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "desc": "Your job is simple: keep undesirables out.",
      "advances": [
        "WS",
        "T",
        "Agi",
        "I",
        "S",
        "Int"
      ],
      "incomeSkill": "Perception",
      "path1": {
        "name": "Sentry",
        "status": "Silver 1 ",
        "skills": [
          "Consume Alcohol",
          "Endurance",
          "Entertain  (Storytelling)",
          "Gamble",
          "Gossip",
          "Intuition",
          "Melee (Basic)",
          "Perception "
        ],
        "talents": [
          "Diceman",
          "Etiquette (Servants)",
          "Strike to Stun",
          "Tenacious "
        ],
        "trappings": [
          "Buckler",
          "Leather Jerkin",
          "Storm Lantern with Oil"
        ]
      },
      "path2": {
        "name": "Guard",
        "status": "Silver 2 ",
        "skills": [
          "Athletics",
          "Cool",
          "Dodge",
          "Intimidate",
          "Melee (Polearm)",
          "Ranged (Bow) "
        ],
        "talents": [
          "Relentless",
          "Reversal",
          "Shieldsman",
          "Strike Mighty Blow "
        ],
        "trappings": [
          "Bow with 10 Arrows",
          "Sleeved Mail Shirt",
          "Shield",
          "Spear"
        ]
      },
      "path3": {
        "name": "Honour Guard",
        "status": "Silver 3 ",
        "skills": [
          "Heal",
          "Language (Battle)",
          "Lore (Etiquette)",
          "Melee (Two-handed) "
        ],
        "talents": [
          "Fearless (Intruders)",
          "Jump Up",
          "Stout-hearted",
          "Unshakeable "
        ],
        "trappings": [
          "Great Weapon or Halberd",
          "Helmet",
          "Uniform"
        ]
      },
      "path4": {
        "name": "Guard Officer",
        "status": "Silver 5 ",
        "skills": [
          "Leadership",
          "Lore (Warfare) "
        ],
        "talents": [
          "Combat Master",
          "Furious Assault",
          "Iron Will",
          "Robust "
        ],
        "trappings": [
          "Breastplate"
        ]
      },
      "flavour": [
        "The best way to keep something safe is to post a guard. Guarding looks easy enough, it’s usually standing around doing very little. Guards live and die, quite literally, by how they behave during that one moment when they are required to spring into action. The best can command high wages and are entrusted with the lives of the Empire’s finest personages and most valuable items. Guards are everywhere, from the Imperial palace down to bouncers who stand outside taverns all night, ready to throw drunkards into the street. They also include grave wardens — those who defend Morr’s Gardens in the dead of night, watchful for grave robbers — and temple guards who defend holy sites and important priests. Merchants often employ many Guards to defend their valuable stock. Some claim bodyguards have it best because they stay close to their esteemed employers, and often partake of a life far beyond that which their station would normally allow.",
        "<h5>Adventuring</h5>",
        "Guards can find adventure when their guardianship is compromised. Any guard worth his salt would wish to follow up and investigate those who have thwarted them, and get whatever they were guarding back to its true owner. This could easily turn into an exciting adventure. Many of those going on expeditions will require guards to accompany them, to adventure, profit or an untimely demise."
      ],
      "quotes": [
        {
          "quote": "I stood outside the shrine for thirty days and thirty nights, without fail. No-one got in and no-one got out. Of course, it turned out I was stood outside the wrong door.",
          "author": "Ernst Bluchard, Ex-Temple Guard of Manann"
        },
        {
          "quote": "If you’re not on the list, you’re not coming in!",
          "author": "Anonymous Altdorf guard to the Grand Theogonist<br/>at the coronation of Karl-Franz I, apocryphal"
        }
      ]
    },
    {
      "name": "Knight",
      "class": "Warriors",
      "races": "High Elf, Human, Wood Elf",
      "desc": "Thundering into battle on a heavy charger, you dominate the field, spreading fear in your wake.",
      "advances": [
        "S",
        "I",
        "Agi",
        "WS",
        "WP",
        "Fel"
      ],
      "incomeSkill": "Melee (Cavalry)",
      "path1": {
        "name": "Squire",
        "status": "Silver 3 ",
        "skills": [
          "Athletics",
          "Animal Care",
          "Charm Animal",
          "Heal",
          "Lore (Heraldry)",
          "Melee (Cavalry) ",
          "Ride (Horse)",
          "Trade (Farrier) "
        ],
        "talents": [
          "Etiquette (any)",
          "Roughrider",
          "Sturdy",
          "Warrior Born "
        ],
        "trappings": [
          "Leather Jack",
          "Mail Shirt",
          "Riding Horse with Saddle and Tack",
          "Shield",
          "Trade Tools (Farrier)"
        ]
      },
      "path2": {
        "name": "Knight",
        "status": "Silver 5 ",
        "skills": [
          "Cool",
          "Dodge",
          "Endurance",
          "Intimidate",
          "Language (Battle)",
          "Melee (Any) "
        ],
        "talents": [
          "Menacing",
          "Seasoned Traveller",
          "Shieldsman",
          "Strike Mighty Blow "
        ],
        "trappings": [
          "Destrier with Saddle and Tack",
          "Melee Weapon (Any)",
          "Lance",
          "Plate Armour and Helm"
        ]
      },
      "path3": {
        "name": "First Knight",
        "status": "Gold 2 ",
        "skills": [
          "Charm",
          "Consume Alcohol",
          "Leadership",
          "Lore (Warfare) "
        ],
        "talents": [
          "Fearless (Any)",
          "Stout-hearted",
          "Unshakeable",
          "Warleader "
        ],
        "trappings": [
          "Barding",
          "Small Unit of Knights"
        ]
      },
      "path4": {
        "name": "Knight of the Inner Circle",
        "status": "Gold 4 ",
        "skills": [
          "Lore (Any)",
          "Secret Signs (Knightly Order) "
        ],
        "talents": [
          "Disarm",
          "Inspiring",
          "Iron Will",
          "Strike to Injure "
        ],
        "trappings": [
          "Plumed Great Helm",
          "Squire",
          "Large Unit of Knights or Several Small Units of Knights"
        ]
      },
      "flavour": [
        "Many believe heavy cavalry are the pre-eminent warriors of the Old World. A massed charge is an awesome sight, but even alone a Knight can stand as a one-person army. There are many Knightly Orders in the Empire, the most famous including the Reiksguard, the White Wolves, the Knights Panther, and the Knights Griffon, each of which have their own gloried history and mighty heroes. Most Empire Knights belong to secular knightly orders, partly because training heavy lancers is too prohibitively expensive for most nobles. The templar orders, those dedicated to the service of a single deity are just as common but are somewhat more independent. Alongside these are an uncounted number of free-lances, mercenary knights, and disgraced knights, most of whom sell their lance to the highest bidder.",
        "<h5>Adventuring</h5>",
        "Knights might be asked to venture out to fulfil a duty on behalf of their Order or be sought out by nobles and employed to accompany a restless heir around the Empire. Similarly, templars will have responsibility to do their god’s will. All of these provide perfect opportunities for Knights looking to adventure. By comparison, a free-lance is just that, and a life of adventure is what they follow by default."
      ],
      "quotes": [
        {
          "quote": "The knight demanded I get out of his way. “Why?” I asked. “I am in the service of the people,” he replied. “Well, I’m the people,” I said, “so I don’t have to get out of your way.” He didn’t have an answer to that, of course. So he punched me in the face!",
          "author": "Holger Kass, 1st Bögenhafen Halberdiers"
        },
        {
          "quote": "Lady Myrmaelia Jaeke is the finest knight in the Order of the Blazing Sun. How can I be so sure? Well, I used to hold that title, and she bested me.",
          "author": "Birgitte van der Hoogenband, Abbess-General of the Monastery<br/>of the Black Maiden, former Knight of the Blazing Sun. "
        }
      ]
    },
    {
      "name": "Pit Fighter",
      "class": "Warriors",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "desc": "You fight for money, for glory, and for the entertainment of the masses.",
      "advances": [
        "WS",
        "T",
        "S",
        "I",
        "Agi",
        "Fel"
      ],
      "incomeSkill": "Melee (Any)",
      "path1": {
        "name": "Pugilist",
        "status": "Brass 4 ",
        "skills": [
          "Athletics",
          "Cool",
          "Dodge",
          "Endurance",
          "Gamble",
          "Intimidate",
          "Melee (Any) ",
          "Melee (Brawling) "
        ],
        "talents": [
          "Dirty Fighting",
          "In-fighter",
          "Iron Jaw",
          "Reversal "
        ],
        "trappings": [
          "Bandages",
          "Knuckledusters",
          "Leather Jack"
        ]
      },
      "path2": {
        "name": "Pit Fighter",
        "status": "Silver 2 ",
        "skills": [
          "Haggle",
          "Intuition",
          "Melee (Basic)",
          "Melee (Flail or Two-handed)",
          "Perception",
          "Ranged (Entangling) "
        ],
        "talents": [
          "Ambidextrous",
          "Combat Reflexes",
          "Dual Wielder",
          "Shieldsman "
        ],
        "trappings": [
          "Flail or Great Weapon",
          "Hand Weapon",
          "Net or Whip",
          "Shield or Buckler"
        ]
      },
      "path3": {
        "name": "Pit Champion",
        "status": "Silver 5 ",
        "skills": [
          "Consume Alcohol",
          "Gossip",
          "Lore (Anatomy)",
          "Perform (Fight) "
        ],
        "talents": [
          "Combat Master",
          "Disarm",
          "Menacing",
          "Robust "
        ],
        "trappings": [
          "Breast Plate",
          "Helmet"
        ]
      },
      "path4": {
        "name": "Pit Legend",
        "status": "Gold 2 ",
        "skills": [
          "Charm",
          "Ranged (Any) "
        ],
        "talents": [
          "Frightening",
          "Furious Assault",
          "Implacable",
          "Reaction Strike "
        ],
        "trappings": [
          "Quality Helmet"
        ]
      },
      "flavour": [
        "Watching fights is a popular pastime. In the cities, organised fights take place every night. There is money to be made charging spectators, and even more in gambling on the result. Winners earn coin and are celebrated as local heroes. Losers are hurt or killed. Because pit fighting is officially frowned upon, the fights are often controlled by criminal gangs, but the rich love to slum it on occasion, especially if it involves a little bloodshed.  The gladiators of Tilea are the most renowned pit fighters, though the chain-fighters of Marienburg and bear-wrestlers of Kislev draw a crowd. Pugilists and wrestlers might work a travelling fair, challenging the public to survive three minutes in the ring with them, or they might fight a celebrated opponent in front of cheering crowds. Knives, clubs, chains, boxing, wrestling, there is an almost endless variation of styles and codes a Pit Fighter might adopt.",
        "<h5>Adventuring</h5>",
        "Many Pit Fighters fall into their sport because they have the talent and they simply need the money. Some would jump at the chance to leave their seedy world behind and put their talents to a slightly better use. Fortunately, Pit fighters are generally free to use their time as they will, provided they turn up on time for the next big fight, and even if they don’t, there is always another pit…"
      ],
      "quotes": [
        {
          "quote": "It was my big chance. The biggest fight of my life. Then the Hooks came and told me to go down in the fourth or they’d chop off my hand. Well, you know me, of course I went and won anyway. And I’ve no regrets. After all, there are lots of things you can do with one hand.",
          "author": "Sigurda the Bull, Arm Wrestler"
        },
        {
          "quote": "Roll up! Roll up! Dare you face the might of Gosser Papa? Could you last three minutes with Resige Heuhaufer!",
          "author": "Raimund Heenan, Ring Announcer"
        }
      ]
    },
    {
      "name": "Protagonist",
      "class": "Warriors",
      "races": "Dwarf, High Elf, Human",
      "desc": "A strong-arm for hire, you bully, fight, and maybe even kill for coin.",
      "advances": [
        "WS",
        "T",
        "Agi",
        "I",
        "BS",
        "Fel"
      ],
      "incomeSkill": "Melee (Any)",
      "path1": {
        "name": "Braggart",
        "status": "Brass 2 ",
        "skills": [
          "Athletics",
          "Dodge",
          "Endurance",
          "Entertain (Taunt)",
          "Gossip",
          "Haggle",
          "Intimidate",
          "Melee (Any) "
        ],
        "talents": [
          "In-fighter",
          "Dirty Fighting",
          "Menacing",
          "Warrior Born "
        ],
        "trappings": [
          "Hood or Mask",
          "Knuckledusters",
          "Leather Jack"
        ]
      },
      "path2": {
        "name": "Protagonist",
        "status": "Silver 1 ",
        "skills": [
          "Bribery",
          "Charm",
          "Intuition",
          "Melee (Basic)",
          "Perception",
          "Ride (Horse) "
        ],
        "talents": [
          "Combat Reflexes",
          "Criminal",
          "Reversal",
          "Strike to Stun "
        ],
        "trappings": [
          "Hand Weapon",
          "Mail Shirt",
          "Riding Horse with Saddle and Tack",
          "Shield"
        ]
      },
      "path3": {
        "name": "Hitman",
        "status": "Silver 4 ",
        "skills": [
          "Climb",
          "Cool",
          "Navigation",
          "Ranged (Thrown) "
        ],
        "talents": [
          "Careful Strike",
          "Disarm",
          "Marksman",
          "Relentless "
        ],
        "trappings": [
          "Cloak",
          "Garotte",
          "Poison",
          "Throwing Knives"
        ]
      },
      "path4": {
        "name": "Assassin",
        "status": "Gold 1 ",
        "skills": [
          "Entertain (Acting)",
          "Ranged (Crossbow) "
        ],
        "talents": [
          "Accurate Shot",
          "Ambidextrous",
          "Furious Assault",
          "Strike to Injure "
        ],
        "trappings": [
          "Crossbow with 10 shots",
          "Disguise Kit"
        ]
      },
      "flavour": [
        "Protagonists live by their wits and their muscles and are not generally fussy about the sort of work they take on. A merchant might want to frighten their business rival. An employer might decide his workers need a bit of encouragement to get a job done quicker. A noble might want his daughter’s no-good suitor to be frightened off. Protagonists are the ones they turn to, and those with the worst reputation get the best jobs. A Protagonist could be the brute in the local bar everyone knows will bully for coin, or with the reputation for unflinching violence. Some Protagonists have their own code of what they will or won’t do; others care for nothing but the coin. Some are simple bullies who resort to picking arguments and fights with likely looking targets to see if they can score any money from the situation.",
        "<h5>Adventuring</h5>",
        "On the face of it, Protagonists are always up for an adventure because they’re always up for a fight. But they will usually expect to get paid for services rendered. Whether they will join others without a guarantee of payment is a question they will need to ask themselves. Could a hardened protagonist find a cause they will voluntarily pursue? Perhaps they could even turn over a new leaf?"
      ],
      "quotes": [
        {
          "quote": "Remember Thommy Two Knives? I’m not saying he crossed me. I’m just saying you don’t see him walking round town no more, do you?",
          "author": "Gilly Three Knives, Protagonist"
        },
        {
          "quote": "Yeah, Big Yuri came round and destroyed all my merchandise. Said this town was only big enough for one lotus dealer, and that was that. I completely agreed, so I doubled his pay and sent him back to White Tiger’s den. And that was the end of that.",
          "author": "Toni Miragliano, Lotus Dealer"
        }
      ]
    },
    {
      "name": "Slayer",
      "class": "Warriors",
      "races": "Dwarf",
      "desc": "You are rage and shame incarnate, seeking a worthy death to reclaim your lost honour.",
      "advances": [
        "WS",
        "S",
        "WP",
        "T",
        "Agi",
        "I"
      ],
      "incomeSkill": "Melee (Basic)",
      "path1": {
        "name": "Troll Slayer",
        "status": "Brass 2 ",
        "skills": [
          "Consume Alcohol",
          "Cool",
          "Dodge",
          "Endurance",
          "Gamble",
          "Heal",
          "Lore (Trolls)",
          "Melee (Basic) "
        ],
        "talents": [
          "Dual Wielder",
          "Fearless (Everything)",
          "Frenzy",
          "Slayer "
        ],
        "trappings": [
          "Axe",
          "Flask of Spirits",
          "Shame",
          "Tattoos"
        ]
      },
      "path2": {
        "name": "Giant Slayer",
        "status": "Brass 2 ",
        "skills": [
          "Evaluate",
          "Intimidate",
          "Language (Battle)",
          "Lore (Giants)",
          "Melee (Two-handed)",
          "Outdoor Survival "
        ],
        "talents": [
          "Hardy",
          "Implacable",
          "Menacing",
          "Reversal "
        ],
        "trappings": [
          "Great Axe",
          "Jewellery",
          "Troll’s Head"
        ]
      },
      "path3": {
        "name": "Dragon Slayer",
        "status": "Brass 2 ",
        "skills": [
          "Entertain (Storytelling)",
          "Lore (Dragons)",
          "Perception",
          "Ranged (Thrown) "
        ],
        "talents": [
          "Ambidextrous",
          "Furious Assault",
          "Relentless",
          "Robust "
        ],
        "trappings": [
          "Giant’s Head",
          "Throwing Axes"
        ]
      },
      "path4": {
        "name": "Daemon Slayer",
        "status": "Brass 2 ",
        "skills": [
          "Intuition",
          "Lore (Chaos) "
        ],
        "talents": [
          "Combat Master",
          "Frightening",
          "Strike Mighty Blow",
          "Very Strong "
        ],
        "trappings": [
          "Dragon’s Head"
        ]
      },
      "flavour": [
        "When Dwarfs suffer an unacceptable shame and lose their honour, they take the Slayer’s Oath and walk the path of Grimnir, their ancestral god of warriors. Covering their bodies in tattoos, shaving the sides of their head, dying their remaining hair a brilliant orange, and spiking it with animal grease, they set off into the world, axe in hand, seeking a glorious death.",
        "Slayers wander the Old World hunting deadly beasts, such as Trolls, Giants, or Dragons. Because of the shame they carry, many suffer from bouts of depression, glutting themselves on food, alcohol, or stronger stimulants. The more foes Slayers face and survive, the more dangerous and crazed they become, hunting progressively deadlier creatures in the hopes of finding something that can kill them. ",
        "<h5>Adventuring</h5>",
        "Till they fall in battle, a Slayer’s life is one of adventure — they seek out opportunities to face powerful foes in battle. Slayers will occasionally take other odd jobs, for drinking money or to finance their travels, but will seek death along the way. All Slayers previously had a life and a career, so there is more to them than simply being a warrior with a deathwish.",
        "Playing a Slayer is a unique experience because your character wants to die. Embrace this. Seek a mighty doom. Reclaim your honour. Die well. "
      ],
      "quotes": [
        {
          "quote": "We avoid them, if given the choice. They are outcasts and have no honour, only the hope of reclaiming such. Still, we’ll feed them, and give them a place to rest. They are Grimnir’s Chosen, now…",
          "author": "Dimrond Zindrisson, Miner"
        },
        {
          "quote": "Herwig didn’t mean nothing by it, honest. He just asked why the Dwarf had them strange tattoos. It happened so fast, I didn’t even see the Dwarf move, just Herwig hitting the floor.",
          "author": "Regimius, Stevedore"
        },
        {
          "quote": "We’re all going to die, manling. It’s the manner of our going that counts.",
          "author": "Gotrek Gurnisson, Slayer"
        }
      ]
    },
    {
      "name": "Soldier",
      "class": "Warriors",
      "races": "Dwarf, Halfling, High Elf, Human, Wood Elf",
      "desc": "You are paid to train, be disciplined, and, when the need comes, go to war.",
      "advances": [
        "WS",
        "T",
        "WP",
        "BS",
        "I",
        "Fel"
      ],
      "incomeSkill": "Melee (Basic)",
      "path1": {
        "name": "Recruit",
        "status": "Silver 1 ",
        "skills": [
          "Athletics",
          "Climb",
          "Cool",
          "Dodge",
          "Endurance",
          "Language (Battle)",
          "Melee (Basic) ",
          "Play (Drum or Fife) "
        ],
        "talents": [
          "Diceman",
          "Marksman",
          "Strong Back",
          "Warrior Born "
        ],
        "trappings": [
          "Dagger",
          "Leather Breastplate",
          "Uniform"
        ]
      },
      "path2": {
        "name": "Soldier",
        "status": "Silver 3 ",
        "skills": [
          " Consume Alcohol",
          "Gamble",
          "Gossip",
          "Melee (Any)",
          "Ranged (Any)",
          "Outdoor Survival "
        ],
        "talents": [
          "Drilled",
          "Etiquette (Soldiers)",
          "Rapid Reload",
          "Shieldsman "
        ],
        "trappings": [
          "Breastplate",
          "Helmet",
          "Weapon (Any)"
        ]
      },
      "path3": {
        "name": "Sergeant",
        "status": "Silver 5 ",
        "skills": [
          "Heal",
          "Intuition",
          "Leadership",
          "Perception "
        ],
        "talents": [
          "Combat Aware",
          "Enclosed Fighter",
          "Unshakeable",
          "Warleader "
        ],
        "trappings": [
          "Symbol of Rank",
          "Unit of Troops"
        ]
      },
      "path4": {
        "name": "Officer",
        "status": "Gold 1 ",
        "skills": [
          "Lore (Warfare)",
          "Navigation "
        ],
        "talents": [
          "Inspiring",
          "Public Speaking",
          "Seasoned Traveller",
          "Stout-hearted "
        ],
        "trappings": [
          "Letter of Commission",
          "Light Warhorse with Saddle and Tack",
          "Map",
          "Orders",
          "Unit of Soldiers",
          "Quality Uniform",
          "Symbol of Rank"
        ]
      },
      "flavour": [
        "By the command of Emperor Magnus the Pious after the Great War Against Chaos, all provinces of the Empire had to maintain a standing State Army. Soldiers are the mainstay of these armies, trained to fight as part of a larger group with individual skill supplemented by strength in numbers. Rarely encouraged to think for themselves, Soldiers are famous for their stoic fatalism as they are ordered from pillar to post in the service of their betters. Soldiers could be archers, crossbowmen, halberdiers, handgunners, swordsmen, or spearmen, and that’s just in a typical State regiment. Dwarfs employ soldiers like Hammerers and Thunderers, while Elven rank and file are usually archers and spearmen. There are many other Soldiers, such as Mercenaries, local Militias (which are rarely better than Recruits), private armies, cult forces, and more. ",
        "<h5>Adventuring</h5>",
        "Soldiers have little free time, but they still have adventuring opportunities. Outside campaigning season, many receive extended periods of leave. Officers of the State Armies can also command small bands of Soldiers to investigate unusual happenings in their regiment’s ‘territory’ and some officers view this kind of adventuring as excellent training to keep their Soldiers sharp.  Non-human Soldiers will often be on missions in the Empire that are adventures by their very nature."
      ],
      "quotes": [
        {
          "quote": "Go down to the bottom of the hill, the captain told us. So we did, and the general told us to go up to the top of the hill and await further orders. Then the captain told us we were wanted at the bottom.",
          "author": "Holger Kass, 1st Bögenhafen Halberdiers"
        },
        {
          "quote": "Though Lords and Ladies come and go, <br/>A soldier’s life is all I know, <br/>Karl-Franz commands, and we obey, <br/>O’er the hills and far away. ",
          "author": "Marching Song, Reikland 118th Regiment of Foot,<br/>‘The Greenbacks’"
        }
      ]
    },
    {
      "name": "Warrior Priest",
      "class": "Warriors",
      "desc": "You bring divinity to the thick of battle, slaying the enemies of the Empire with righteous fury.",
      "path1": {
        "name": "Novitiate",
        "skills": [
          "Cool",
          "Dodge",
          "Endurance",
          "Heal",
          "Leadership",
          "Lore (Theology)",
          "Melee (Any)",
          "Pray"
        ],
        "talents": [
          "Bless (Any)",
          "Etiquette (Cultists)",
          "Read/Write",
          "Strong-minded"
        ],
        "trappings": [
          "Book (Religion)",
          "Leather Jerkin",
          "Religious Symbol",
          "Robes",
          "Weapon (Any Melee)"
        ],
        "status": "Brass 2"
      },
      "path2": {
        "name": "Warrior Priest",
        "skills": [
          "Charm",
          "Entertain (Speeches)",
          "Intimidate",
          "Language (Battle)",
          "Melee (Any)",
          "Ranged (Any)"
        ],
        "talents": [
          "Dual Wielder",
          "Inspiring",
          "Invoke (Any)",
          "Seasoned Traveller"
        ],
        "trappings": [
          "Breastplate",
          "Weapon (Any)"
        ],
        "status": "Silver 2"
      },
      "path3": {
        "name": "Priest Sergeant",
        "skills": [
          "Animal Care",
          "Intuition",
          "Perception",
          "Ride (Horse)"
        ],
        "talents": [
          "Combat Aware",
          "Holy Visions",
          "Pure Soul",
          "Stout-hearted"
        ],
        "trappings": [
          "Light Warhorse with Saddle and Tack"
        ],
        "status": "Silver 3"
      },
      "path4": {
        "name": "Priest Captain",
        "skills": [
          "Consume Alcohol",
          "Lore (Warfare)"
        ],
        "talents": [
          "Fearless (Any)",
          "Furious Assault",
          "Holy Hatred",
          "Warleader"
        ],
        "trappings": [
          "Religious Relic"
        ],
        "status": "Silver 4"
      },
      "advances": [
        "WS",
        "T",
        "WP",
        "S",
        "I",
        "Fel"
      ],
      "incomeSkill": "Leadership",
      "races": "Human",
      "flavour": [
        "Some cults of the Empire have clerics trained for war. In the Reikland, the Warrior Priests of Sigmar are the most common example of this, and most armies of the Empire are accompanied by hammer-bearing priests encouraging the soldiers in the name of Sigmar. But other cults, especially those of Myrmidia, Ulric, Taal, and Morr, have Warrior Priests of their own, each with their unique views as to how war should be conducted. Away from the battlefield, Warrior Priests are also expected to administer to soldiers’ spiritual wellbeing, as well as making sure morale stays high and discipline is ordered. Some orders of Warrior Priests swear oaths to roam the Empire, seeking heresy wherever it lies, helping where they can. Others prefer not to join armies, but lead them…",
        "<h5>Adventuring</h5>",
        "While many Warrior Priests stay with the army, some serve their cult in missionary work, and others wander the Empire as they will. As such, Warrior Priests can be natural adventurers. Of course, to pursue leads to the ends of the Empire they might require the permission of their cult, and perhaps their commanders."
      ],
      "quotes": [
        {
          "quote": "Surrounded, we were, Greenskins on all sides. They knew we were done. Then the priest raises his hammer towards the sky and bellows his prayer. And as the words echoed to silence, the lightning struck. And we were all unharmed, I swear to Sigmar. But the Goblins? All dead.",
          "author": "Holger Kass, 1st Bögenhafen Halberdiers"
        }
      ]
    }
  ]

var armour = [
    {
        "name": "",
        "group": "",
        "price": "",
        "enc": "",
        "avail": "",
        "penalty": "",
        "loc": "",
        "aps": "",
        "qual": ""
    },
    {
        "name": "Leather Jack",
        "group": "Soft Leather",
        "price": "12/&ndash;",
        "enc": "1",
        "avail": "Common",
        "penalty": "&ndash;",
        "loc": "Arms, Body",
        "aps": "1",
        "qual": "<armourqual>Soft Leather</armourqual>"
    },
    {
        "name": "Leather Jerkin",
        "group": "Soft Leather",
        "price": "10/&ndash;",
        "enc": "1",
        "avail": "Common",
        "penalty": "&ndash;",
        "loc": "Body",
        "aps": "1",
        "qual": "<armourqual>Soft Leather</armourqual>"
    },
    {
        "name": "Leather Leggings",
        "group": "Soft Leather",
        "price": "14/&ndash;",
        "enc": "1",
        "avail": "Common",
        "penalty": "&ndash;",
        "loc": "Legs",
        "aps": "1",
        "qual": "<armourqual>Soft Leather</armourqual>"
    },
    {
        "name": "Leather Skullcap",
        "group": "Soft Leather",
        "price": "8/&ndash;",
        "enc": "0",
        "avail": "Common",
        "penalty": "&ndash;",
        "loc": "Head",
        "aps": "1",
        "qual": "<armourqual>Soft Leather</armourqual>, <armourqual>Partial</armourqual>"
    },
    {
        "name": "Breastplate (Leather)",
        "group": "Boiled Leather",
        "price": "18/&ndash;",
        "enc": "2",
        "avail": "Scarce",
        "penalty": "&ndash;",
        "loc": "Body",
        "aps": "2",
        "qual": "<armourqual>Weakpoints</armourqual>"
    },
    {
        "name": "Mail Chausses",
        "group": "Mail",
        "price": "2GC",
        "enc": "3",
        "avail": "Scarce",
        "penalty": "&ndash;",
        "loc": "Legs",
        "aps": "2",
        "qual": "<armourqual>Flexible</armourqual>, <armourqual>Mail/Plate</armourqual>"
    },
    {
        "name": "Mail Coat",
        "group": "Mail",
        "price": "3GC",
        "enc": "3",
        "avail": "Common",
        "penalty": "&ndash;",
        "loc": "Arms, Body",
        "aps": "2",
        "qual": "<armourqual>Flexible</armourqual>, <armourqual>Mail/Plate</armourqual>"
    },
    {
        "name": "Mail Coif",
        "group": "Mail",
        "price": "1GC",
        "enc": "2",
        "avail": "Scarce",
        "penalty": "-10% Perception",
        "loc": "Head",
        "aps": "2",
        "qual": "<armourqual>Flexible</armourqual>, <armourqual>Mail/Plate</armourqual>, <armourqual>Partial</armourqual>"
    },
    {
        "name": "Mail Shirt",
        "group": "Mail",
        "price": "2GC",
        "enc": "2",
        "avail": "Scarce",
        "penalty": "&ndash;",
        "loc": "Body",
        "aps": "2",
        "qual": "<armourqual>Flexible</armourqual>, <armourqual>Mail/Plate</armourqual>"
    },
    {
        "name": "Breastplate (Plate)",
        "group": "Plate",
        "price": "10GC",
        "enc": "3",
        "avail": "Scarce",
        "penalty": "&ndash;",
        "loc": "Body",
        "aps": "2",
        "qual": "<armourqual>Flexible</armourqual>, <armourqual>Mail/Plate</armourqual>, <armourqual>Weakpoints</armourqual>"
    },
    {
        "name": "Open Helm",
        "group": "Plate",
        "price": "2GC",
        "enc": "1",
        "avail": "Common",
        "penalty": "-10% Perception",
        "loc": "Head",
        "aps": "2",
        "qual": "<armourqual>Mail/Plate</armourqual>, <armourqual>Partial</armourqual>"
    },
    {
        "name": "Bracers",
        "group": "Plate",
        "price": "8GC",
        "enc": "3",
        "avail": "Rare",
        "penalty": "&ndash;",
        "loc": "Arms",
        "aps": "2",
        "qual": "<armourqual>Impenetrable</armourqual>, <armourqual>Mail/Plate</armourqual>, <armourqual>Weakpoints</armourqual>"
    },
    {
        "name": "Plate Leggings",
        "group": "Plate",
        "price": "10GC",
        "enc": "3",
        "avail": "Rare",
        "penalty": "-10 Stealth",
        "loc": "Legs",
        "aps": "2",
        "qual": "<armourqual>Impenetrable</armourqual>, <armourqual>Mail/Plate</armourqual>, <armourqual>Weakpoints</armourqual>"
    },
    {
        "name": "Helm",
        "group": "Plate",
        "price": "3GC",
        "enc": "2",
        "avail": "Rare",
        "penalty": "-20% Perception",
        "loc": "Head",
        "aps": "2",
        "qual": "<armourqual>Impenetrable</armourqual>, <armourqual>Mail/Plate</armourqual>, <armourqual>Weakpoints</armourqual>"
    }
]

var armourQual = [
    {
        "name": "",
        "desc": "",
        "flaw": false
    },
    {
        "name": "Flexible",
        "desc": "Flexible armour can be worn under a layer of non-Flexible armour if you wish. If you do so, you gain the benefit of both.",
        "flaw": false
    },
    {
        "name": "Impenetrable",
        "desc": "The armour is especially resilient, meaning most attacks simply cannot penetrate it. All Critical Wounds caused by an odd number to hit you, such as 11 or 33, are ignored.",
        "flaw": false
    },
    {
        "name": "Soft Leather",
        "desc": "Soft Leather Armour can be worn without penalty under any other Armour",
        "flaw": false
    },
    {
        "name": "Mail/Plate",
        "desc": "Wearing any Mail or Plate confers a Penalty of -10 to <skill>Stealth</skill> each.",
        "flaw": true
    },
    {
        "name": "Partial",
        "desc": "The armour does not cover the entire hit location. An opponent that rolls an even number to hit, or rolls a Critical Hit, ignores the partial armour's APs.",
        "flaw": true
    },
    {
        "name": "Weakpoints",
        "desc": "The armour has small weakpoints where a blade can slip in if your opponent is successfully skilled or lucky. If your opponent has a weapon with the <weaponqual>Impale</weaponqual> Quality and scores a Critical, the APs of your armour are ignored.",
        "flaw": true
    }
]

var endeavour = [
    {
        "name": "With Great Power...",
        "type": "Duties & Responsibilities",
        "flavor": "The common folk will never understand my burdens. The sheer weight of the duties I bear. The guilty will not judge themselves and there are always so many villages to cleanse, for our enemies are legion.",
        "appelation": "Lothar Metzger, Witch Hunter",
        "description": ["As you climb the ranks of your career, you accrue expectations and responsibilities that cannot be avoided. Noble Lords must see to the affairs of their estates, Guildmasters must oversee their guild’s work, and Watch Captains must watch their watchmen. Ifyou neglect your responsibilities, you will soon lose status amongst your peers.",
        "If you have attained one of the top two tiers of your Career Path and do not undertake the Income Endeavour, which reflects taking care of your obligations, you drop one level within your Career; reverting from the fourth level to the third, or the third to the second. This costs no Experience Points, acting as a free Career change, albeit downwards.",
        "With this step backwards in your Career Path, you will now have a lower Status, and will earn less money should you perform future Income Endeavours. See Chapter 3: Class and Careers for more about Status. The loss in status does not remove any Advances acquired while you were in your previous Career.",
         "If you wish to reclaim your lost Career level, you must once again pay the XP cost to re-enter the higher level of your Career and retake your ‘proper’ place in society. "]
    },
    {
        "name": "Elf Improvement",
        "type": "Duties & Responsibilities",
        "flavor": "There are times when I can barely stand Altdorf. It is not the stench — though that is abhorrent — it is not the noise, either — it is just that you are all so very ugly to look upon, I feel that I must gaze at something beautiful for a time or I know that I shall start screaming, and never stop.",
        "appelation": "Irlianmaris Ellarel, Asur Envoy",
        "description": ["Elves, even those resident within the borders of Empire, do not consider themselves citizens of the Empire. There are High Elves with diplomatic positions in Karl-Franz I’s court, as well as traders and merchant princes in many of the great cities of the Empire, but the majority of the Asur avoid entanglements with Humans (not to mention Dwarfs) and few would call a Reiklander ‘friend’. ",
        "The Wood Elves are even more removed; nearly mythical, rarely seen, and when they do appear they always have their own concerns that they rarely share with others.",
        "Between adventures, all Elven characters must undertake one Endeavour maintaining contact with their own kind, seeing to their responsibilities to their people. High Elves commonly give reports on interesting things they’ve learned to agents of Ulthuan in either Altdorf or Marienburg, whereas Asrai do the same with the spies from their arboreal homes. This Endeavour offers no advantage beyond the inherent advantage of being an Elf. Note: Elves only lose an Endeavour if the Between Adventures section is at least 3 weeks long, thus the Elves have at least 3 Endeavours to complete."
        ]
    },
    {
        "name": "Animal Training",
        "type": "General Endeavours",
        "description": ["You spend time training one of your animals. Make an Average (+20) Animal Training Test. If successful, add one skill to your animal from the <trait>Trained</trait> Creature Trait (see page 342)."]
    },
    {
        "name": "Banking",
        "type": "General Endeavours",
        "description": ["This Endeavour allows you to store funds for future use. As noted in Money to Burn, all coin remaining at the end of your ‘Between Adventures’ phase is lost before the next adventure begins unless it is saved with this Endeavour. So, if you have a lot of money spare it may be worth a trip to the bank. If you are using a Banking Endeavour to retain your money, you must first decide whether to save your money by investing it with a reputable banking institution, or to stash it somewhere less secure.",
            "<strong>Investing:</strong> You must be of the Gold and Silver social tiers to save with a banking house. Your money will be reasonably safe and it should accrue interest. When undertaking a Banking Endeavour to deposit money in a bank, determine the interest rate of your account, by choosing a number between 1 and 10 (alternatively you may simply roll 1d10). This is the rate of interest you will accrue, and also how risky the investment is. Withdrawing funds requires another Banking Endeavour. This may take place immediately after the initial Endeavour, or after subsequent adventures have occurred. Roll 1d100: if you roll equal to or less than your rate of interest, the venture has gone bankrupt and you have lost all of your money. If you roll over the interest rate, you receive your initial funds, plus the interest accrued. ",
            "<strong>Stashing: </strong>All characters may choose to stash their loot. This is a risky strategy, involving hiding it on your person, in your mattress, or burying it somewhere. Stashed money never accrues any interest. Players may withdraw money from a stash before the start of an adventure, without undertaking an Endeavour. Roll 1d100: if you roll 10 or lower, your stash has been found and you have lost all your money, otherwise you recieve your initial funds. ",
            "If you successfully withdraw your funds they will be available for you when you start your next adventure, in addition to any funds secured via an Income Endeavour. "
        ]
    },
    {
        "name": "Changing Career",
        "type": "General Endeavours",
        "description": ["In a society as rigidly hierarchical as the Empire, changing Careers may require grit and perseverance. Taking time to forge the right connections, and learn what is expected of you, can help,  significantly. Assuming you GM agrees, and you have completed you current Career, you can move to any Career Level that fits the story of your Character for free. If you have not completed your current Career, the change costs 100 XP. The time spent on this Endeavour represents making the appropriate introductions, doling out bribes, acquiring permits and licences, advertising, and similar activities."]
    },
    {
        "name": "Commission",
        "type": "General Endeavours",
        "description": ["So, you wish to own one of Von Meinkopt’s legendary repeating pistols? Or a custom helm, with a personalised crest representing your epic victories? The Commission Endeavour allows you to acquire unusual or highly specialized items that are never simply ‘stocked’ in the shops of the Empire. It also allows for you to arrange for the creation of unique items. Such things take time, though…",
                        "If you are seeking an item with an Exotic rarity and know a source capable of acquiring or manufacturing it, then undertake this Endeavour, spend the necessary funds, and place your order. The item will then be ready for collection after your next adventure.  A character can only commission a single Exotic item per Endeavour; acquiring further items, will require undertaking further Commission Endeavours. If you are unaware of an appropriate source for their item, you will first have to undertake the Consult an Expert Endeavour."
    ]
    },
    {
        "name": "Consult an Expert",
        "type": "General Endeavours",
        "description": ["The Old World is replete with ancient and arcane knowledge, yet this information is not readily available on some magical box in your pocket. If you want to seek out some piece of obscure arcana, you must first seek out an expert. You may undertake the Consult an Expert Endeavour either to facilitate another Endeavour for example: Commission, Training , or Unusual Learning Endeavours), or to secure a piece of specific knowledge.",
            "There are two stages to this Endeavour: locating the expert, then consulting. ",
            "First, you must locate your expert (this stage may be skipped with the GM’s permission if you have already identified an appropriate expert during your adventures).  Attempt a <test>Challenging (+0) Gossip Test</test> (the Difficulty of this Test will vary according to the size of the settlement where your character is currently living). If you succeed, you have located your expert. If you fail, you have located the loudest self-proclaimed specialist in your location, and the GM is given free rein to vary the quality or accuracy of the advice procured. You can of course refuse to deal with this somewhat suspect source, but you never know if you might have found a diamond in the rough. GMs are contrary like that sometimes.",
            "Once successfully locate an expert, you then need to convince them to talk with you. Depending on what you wish to know, this may require no more than a Simple Charm Test or a modest donation to the local Temple of Verena. In more extreme cases, you may have to commit to performing one or more Favours (see Do Me A Favour! ) which may be called in during a future adventure, or ‘bought off ’ by spending Endeavours between future adventures. The level of Favour owed depends on the complexity — and danger — of the information you want as determined by the GM.",
            "The precise nature of the information gleaned depends on the expert consulted and what you seek to know. Academics will know the origins and full history on a subject with which they are familiar; wizards of the Colleges of Magic in Altdorf understand the history of magic and various mystical objects, particularly aspects relevant to their own order; an Apothecary General can identify even the rarest poison; a Verenan scholar may have information relating to any number of historical incidents. In short, the expert’s background will influence how the knowledge is presented, and with which biases.",
            "In addition to any specific information the GM imparts to their player, a successful Consult an Expert Endeavour used to seek out knowledge (and not to facilitate another Endeavour) gives you an Expert Reroll (mark this on your character sheet under Notes). This reroll may only be used on a Test specifically relating to the lore revealed and must be used before the end of your next adventure."
    ]
    },
    {
        "name": "Crafting",
        "type": "General Endeavours",
        "description": ["Rather than browse shops or commissioning someone else to do the hard work, you can fashion your own trappings. Crafting allows you to make any trapping from Chapter 11: Consumers’ Guide (or anything else the GM allows) if you have the correct Trade Skills. To do this, you require appropriate Trade Tools, raw materials, and access to an appropriate workshop. In general, the raw materials to create the trapping of your choice will cost a quarter of the trapping’s list price, and must be purchased before Crafting begins (with an Availability as determined by the GM); the GM may rule the raw materials are cheaper or more expensive according to the trapping to be created, and the nature of the raw materials required.",
            "To craft the trapping, attempt an Extended Trade Test, with a Difficulty set by the GM, typically using the Trapping’s Availability as a loose guide.",
            "<table class='w3-table table-dark w3-striped w3-hoverable w3-bordered'><thead><tr><th>Availability</th><th>Difficulty</th></tr></thead><tbody><tr><td>Common</td><td>Average (+20)</td></tr><tr><td>Scarce</td><td>Challenging (+0)</td></tr><tr><td>Rare</td><td>Difficult (-10)</td></tr><tr><td>Exotic</td><td>Very Hard (-30)</td></tr></tbody></table>",
            "The number of SL required to succeed at the Test is also set by the GM, using the listed price for the trapping in the Consumers’ Guide as a reference. An item with a price in Brass Pennies usually requires about 5 SL, Silver requires about 10 SL, and Gold items require at least 15 SL.",
            "The SL required is further modified by the Qualities or Flaws you work into the trapping. Each Flaw halves the SL required, and each Quality adds +5 (worked out after halving for Flaws).",
            "Each Endeavour you spend Crafting allows you to make one roll towards your Extended Test. Unfinished work can be kept in whatever you have that amounts to lodgings, or carried around with you as you adventure, should that be possible."
    ]
    },
    {
        "name": "Income",
        "type": "General Endeavours",
        "description": ["This Endeavour covers the many ways you can make money between your bouts of adventuring. The majority will most likely work in a recognized profession — bounty hunters hunt bounties, riverwardens ward rivers, troll slayers slay Trolls — others may rely on a lucrative skill. Wealthier characters, such as Nobles and Merchants, might collect a stipend by (briefly) indulging their family, or collecting interest on their investments and business ventures. Roguish types have any number of means to acquire funds, though it’s best not to ask for any details. ",
            "You should briefly narrate exactly how your character makes money. This is intended more for fun background detail than to have any direct consequences, though GMs may well gather useful or sinister ideas for future use depending on what you describe. You then acquire the income you’ll start your next adventure with, which is your standard income determined by your Status. ",
            "<table class='w3-table table-dark w3-striped w3-hoverable w3-bordered'><thead><tr><th>Status</th><th>Amount Earned per Standing</th></tr></thead><tbody><tr style='background-color: #b5a642 !important; color: black !important;'><td>Brass</td><td>2d10 Brass Pennies</td></tr><tr style='background-color: silver !important; color: black !important;'><td>Silver</td><td>1d10 Silver Shillings</td></tr><tr style='background-color: gold !important; color: black !important;'><td>Gold</td><td>1 Gold Crown</td></tr></tbody></table>",
            "Certain results on the Events Table on page 193 may directly affect your income. The money you get from an Income Endeavour is given to you after your money from the last adventure is spent (see Money to Burn). ",
            "In addition to acquiring funds for later use, if you are in the third or fourth level of a Career and undertake this Endeavour, you automatically maintain your standing in your career. See With Great Power… on page 195 for details. "
            
            
    ]
    },
    {
        "name": "Invent!",
        "type": "General Endeavours",
        "description": ["Invent allows you to invent new trappings. This is done in two stages: Plan and Build. To Plan your new trapping, you first decide the trappings you wish to combine to create your invention. As examples, Pistols have been combined with other Pistols to create Repeating Pistols, and Pigeons and been combined with Bombs to create Pigeon Bombs. Let your imagination go wild. Once you have your plan, it’s time to make the blueprints, which costs 1 Endeavour to attempt. Take a Trade (Engineer) Test, with a Difficulty set by how outlandish your proposed trapping combination is as determined by the GM. If you succeed, you are ready to start Building. Each SL scored adds +1 SL to the attempt to build your invention, as the plans are well laid out and easy to follow.",
            "To Build the invention, you must either undertake a Crafting or Commission Endeavour. If it’s Crafting , you are building the item yourself, and you must have the appropriate Skills to do so for the trappings being combined; so, if you were combining Pigeons with Bombs, you would need Animal Training and Trade (Explosives). The Difficulty to craft the invention is always Very Hard (–30), and the SL is set as normal. The raw materials needed to build the invention cost twice the listed price for the trappings being combined, and have an Availability rating equal to the most scarce of the trappings used in your invention. If you Commission the invention, you will likely need to undertake a Consult an Expert Endeavour first to find someone with the required Skills. That done, follow the Commission Endeavour as normal; it costs six times the listed price for the trappings to be combined to commission the work. The exact rules for your new invention are left to your GM to finalise."
            
            
    ]
    },
    {
        "name": "Training",
        "type": "General Endeavours",
        "description": ["The Training Endeavour allows you to train in a Skill or Characteristic outside of your Career, treating it as if it were in your Career. In addition to the normal XP cost, you must also pay money to the tutor. Training for Basic Skills and all Characteristics costs XP+1d10 brass pennies , where XP is the number of XP it costs to buy the Advance. Tutoring in all Advanced Skills costs double that amount. For more, see Advances, see page 43.",
            "You should be able to find a tutor for most skills, certainly in a city-state like Altdorf, but some particularly unusual skills may require you seek out the right instructor, likely by using the Consult an Expert Endeavour — ‘Professionals’ who can teach you how to properly pick a lock generally don’t advertise, after all. Other skills, especially Lore Skills, often require an institution of learning, and some are flat out forbidden in the Empire. Finding a tutor capable (and willing) to instruct someone in proscribed matters — such as those relating to the Ruinous Powers or Necromancy — may be particularly dangerous, and perhaps an adventure to even source such an individual. Such tutors will also ask for far more than the ‘going rate’ for tutoring and will likely require a Significant Favour (see Do Me A Favour!)."
            
            
    ]
    },
    {
        "name": "Unusual Learning",
        "type": "General Endeavours",
        "description": ["It is one thing to pick up a Skill that can be readily practised, quite another to learn something for which one may have no aptitude at all. This Endeavour allows you to attempt to learn a Talent outside of your Career. There is no guarantee this attempt will be successful, meaning there is a good chance you will fail to learn the Talent you hope to acquire, expending XP and money to no avail. ",
            "You can only learn a Talent if you have an appropriate tutor. In most big cities, this will not be a problem, but if the Talent is particularly obscure, or you are far from a large city, the GM may require you complete a Consult an Expert Endeavour first. ",
            "Once you have acquired a tutor, the fee to train the Talent is 2d10 shillings per 100 XP it costs to purchase the Talent. If you pay this fee, attempt a Hard (-20) Test using the Characteristic or Skill most relevant to the Talent as determined by the GM. If you succeed, you have learned the Talent. If not, you have failed this time but can try again with a future Endeavour and gain a +10 modifier for each failed attempt."
            
    ]
    }
]

var betweenAdventureEvents = [
    {
        "name": "",
        "roll": "",
        "desc": ""
    },
    {
        "name": "Accused Ally",
        "roll": "01-03",
        "desc": "One of your allies (GM’s choice) is implicated in a terrible crime. A character with a Law Guild Licence can spend an Endeavour to free the ally with a successful <strong>Average (+20) <skill>Lore (Law)</skill> Test</strong>. Otherwise, 3 Endeavours spent by the party will exonerate their ally (or, if guilty, manufacture an alibi). If the ally is freed, gain a Major Favour (see Do Me a Favour Endeavour on page 198) for future use. If not, their ally hangs!"
    },
    {
        "name": "Arcane Auction",
        "roll": "04-06",
        "desc": "The belongings of a recently deceased neighbour are auctioned, including a dusty, old book of unknown origin. If you are able to pay the 10 GC asking price, the book is yours! Beyond any other advantage the book may bring as determined by the GM, any Academic characters attempting the Research Lore Endeavour gains +20 on the Test."
    },
    {
        "name": "Betrayed!",
        "roll": "07-10",
        "desc": "A friend, family member, or ally turns on you, the ramifications of which will impact your next adventure. If you have no friends, family, or allies, your time between adventures is blissfully uneventful though somewhat dull."
    },
    {
        "name": "Bolt from the Blue",
        "roll": "11-14",
        "desc": "A lazy ostler didn’t lock the stable door, and your mount bolted! If you succeed at an <strong>Average (+20) <skill>Animal Training (Horse)</skill> Test</strong>, your well-trained beast returns to the hand that feeds it. If you fail, your steed is gone, unlikely to be ever seen again. If you don’t have a mount, you have developed a painful new blister on your foot. "
    },
    {
        "name": "Oi! You spilled my pint!",
        "roll": "15-18",
        "desc": "A petty argument in the local area has developed into a feud – the GM decides who you offended and how. This person will not pass up an opportunity for petty revenge, probably during the next adventure..."
    },
    {
        "name": "Crime Crackdown",
        "roll": "19-21",
        "desc": "The Watch is cracking down on crime hard. Rogues can get no funds from the Income Endeavour, and if Rogues undertake a Banking Endeavour, they may only select a High-risk deposit, as legitimate banking houses won’t handle dirty money. "
    },
    {
        "name": "The Exciseman Cometh",
        "roll": "22-25",
        "desc": "An unexpected visit by the tax collector (with several soldiers in tow) sweeps through your local settlement. All characters lose 30% of their funds before any can be spent on Endeavours."
    },
    {
        "name": "False Silver",
        "roll": "26-29",
        "desc": "To the horror of the merchants, a run of counterfeit coins plagues the characters’ locale. A fifth of all coins are affected. Characters who undertake the Banking Endeavour will lose 20% of money banked, and characters undertaking the Income Endeavour similarly reduce any money earned by 20%. "
    },
    {
        "name": "Flowing Profit",
        "roll": "30-33",
        "desc": "Business is particularly good for folk involved in river trade. All Riverfolk make an additional 50% from any Income Endeavour pursued during the next batch of Endeavours."
    },
    {
        "name": "Forewarned is Forearmed",
        "roll": "34-36",
        "desc": "You are given a cryptic omen by a dream, Strigany mystic, or Celestial wizard you encounter on the street. During your next adventure, your maximum Fortune points are increased by 1."
    },
    {
        "name": "Festivities",
        "roll": "37-40",
        "desc": "A celebration is called! Decide the nature of the event with the GM. Possibilities include a local wedding, a bountiful harvest, or a public execution! You are caught up in the event (and its aftermath) and lose an Endeavour."
    },
    {
        "name": "Inclement Weather",
        "roll": "41-44",
        "desc": "Particularly bad weather arrives. For the next adventure, all social Skill Tests suffer a penalty of –10 (everyone is in a foul mood) and food prices increase by 20% (due to spoiling of stored provender)."
    },
    {
        "name": "Glorious Weather",
        "roll": "45-48",
        "desc": "Beautiful conditions inspire you and give you cheer. You can add a new Short-term Ambition. When it’s concluded, you do not replace it with a new one."
    },
    {
        "name": "Local Crop Failure",
        "roll": "49-52",
        "desc": "Food becomes exceedingly scarce and many folk suffer terribly. Characters from the Peasant class cannot undertake the Income Endeavour, and food prices are doubled in the area for the duration of the next adventure. "
    },
    {
        "name": "Malicious Malady",
        "roll": "53-56",
        "desc": "The Bloody Flux sweeps through town. Make an <strong>Easy (+40) Toughness Test</strong>. On a success, the Flux passes by. On a failure, you and the Washers Guild are soon to know each other very well. Contract the Bloody Flux see page 186."
    },
    {
        "name": "Monstrous Complications",
        "roll": "57-60",
        "desc": "A monster (chosen by the GM from Chapter 12: Bestiary) is causing panic among the locals. The Income Endeavour provides no funds until the beast is dealt with. The characters can choose to each sacrifice one Endeavour to deal with the menace (and this encounter should be roleplayed). If you succeed, you gain a free Income Endeavour to represent their individual rewards, and a feast is held in their honour. If not, or if the party chooses to ignore the creature, it will move on or be killed by a local rival."
    },
    {
        "name": "Morr's Embrace",
        "roll": "61-63",
        "desc": "One of the character’s relatives, friends, or allies dies. It could be of natural causes, an accident, or the beginning of something sinister… "
    },
    {
        "name": "New Moon",
        "roll": "64-65",
        "desc": "The nights are particularly dark. All Rogue characters undertaking the Income Endeavour receive a +20% bonus to their monies earned. "
    },
    {
        "name": "Old Debts",
        "roll": "66-67",
        "desc": "You have a Major or Significant Favour called in. Dealing with the favour will be part of your next adventure and you lose one Endeavour in preparation for what is to come."
    },
    {
        "name": "Opportunity Saunters Through",
        "roll": "68-69",
        "desc": "Passing soldiers, well-heeled merchants, or vacationing nobles pass through the area, and characters willing to suck up reap the benefits. Burgher and Peasant Class characters gain +50% money from the Income Endeavour. "
    },
    {
        "name": "Peace and Quiet",
        "roll": "70-71",
        "desc": "It’s times like these that remind you what life is all about: good sleep and fine cheese. Be smugly content at the start of your next adventure."
    },
    {
        "name": "Pedlar",
        "roll": "72-73",
        "desc": "A wizened, well-travelled pedlar who likes a gossip passes through. For the price of a flagon of ale — 3d — you receive a +10 bonus to any Latest News Endeavours you attempt. "
    },
    {
        "name": "Pestilential Pet",
        "roll": "74-76",
        "desc": "One of your animals falls ill; make a <strong>Challenging (+0) <skill>Animal Care</skill> Test</strong>. If successful, your beast pulls through. If not, the unfortunate creature dies. If you have no animals, you are troubled by ill omens of the GM’s creation."
    },
    {
        "name": "Ransacked",
        "roll": "77-79",
        "desc": "Before you can undertake a Banking Endeavour, your stash is raided, and all your money is taken. If your money amounts to less than 1 GC, the thieves also steal your most highly-valued trapping."
    },
    {
        "name": "Riots",
        "roll": "80-82",
        "desc": "The common folk are furious at the high and mighty! Characters of the Courtier Class cannot take the Income Endeavour as, no matter how many bodyguards they hire, it isn’t even vaguely safe for them to be abroad on business. Further, any deposits at reputable banks (see page 196) must immediately check to see if the violence and disruption has caused their bank to go out of business. However, players attempting a Foment Dissent Endeavour receive +10 bonus to all related Tests."
    },
    {
        "name": "Sticky Fingers",
        "roll": "83-85",
        "desc": "Your purse is cut! You lose half of the money you ended the last adventure with. "
    },
    {
        "name": "Suspicion of Heresy",
        "roll": "86-88",
        "desc": "You fall foul of a Witch Hunter who suspects you have been consorting with Mutants, Cultists, or worse on your so-called ‘adventures’. It takes a <strong>Very Hard (-30) <skill>Charm</skill> Test</strong> to convince the hunter you are innocent. Failure to do this means you have earned an implacable nemesis who is certain to cause trouble in the future… "
    },
    {
        "name": "Under Suspicion",
        "roll": "89-91",
        "desc": "The party’s irregular movements and sudden wealth has drawn suspicion. All characters must forfeit one Endeavour laying low or proving their innocence. Characters in the Rogue class cannot use the Income Endeavour until after their next adventure.  "
    },
    {
        "name": "Uneventful",
        "roll": "92-94",
        "desc": "Little of interest occurs, perhaps leaving you with a boredom-inspired appetite for taking risks!"
    },
    {
        "name": "Unexpected Esteem",
        "roll": "95-97",
        "desc": "Someone you helped in the past has a chance to repay your efforts. The precise nature of the reward should be appropriate to your past deeds, and the NPCs you have assisted during play or in your back story. The tokens of gratitude may vary from a single high-quality item, to a purse of silver (which will be available at the start of the next adventure). Of course, all that glitters is not gold, and not all gifts are what they appear…"
    },
    {
        "name": "Unusual Mercenaries",
        "roll": "98-00",
        "desc": "One or more rare mercenaries turn up in a nearby settlement looking for work: a Tilean Duellist of great repute, the so-called Birdmen of Catrazza, unemployed Ogres under the command of a Halfling captain, or other unlikely bands. The mercenaries will gladly train any character in any martial Skills or Talents, at a 20% reduction in costs, should the characters undertake a Training or Unusual Learning Endeavour. Additionally, any characters undertaking a Combat Training Endeavour gain a +20 bonus to any relevant Test."
    }
]