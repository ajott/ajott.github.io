function spellFilter(input) {
    $('.btn-selected').removeClass('btn-selected')
    $('#loreDesc').html("");

    try {
        $(".spellGrid").isotope('destroy')
    } catch (error) {
        
    };

    $('.grid-item').remove();

    let htmlString = "";

    let lore = input;

    $('#loreBtn'+lore).addClass('btn-selected');

    if (lores[lore]["wind"]) {
        $('.loreDesc').html("<div class=\"w3-card-2 w3-round-large w3-center loreDescDetail\"><img class=\"loreDescIcon\" w3-card src=\"img/" + lores[lore]["wind"] + ".png\"/><h3><em>Lore of "+lore+"</em></h3>"+lores[lore]["desc"]+"</div>");
    } else if (lore == "Petty" || lore == "Arcane") {
        $('.loreDesc').html("<div class=\"w3-card-2 w3-round-large w3-center loreDescDetail\"><h3 style=\"padding-top:1em;\"><em>"+lore+" Magic</em></h3>"+lores[lore]["desc"]+"</div>");
    } else {
        $('.loreDesc').html("<div class=\"w3-card-2 w3-round-large w3-center loreDescDetail\"><h3 style=\"padding-top:1em;\"><em>Lore of "+lore+"</em></h3>"+lores[lore]["desc"]+"</div>");
    }
    

    for (let i = 0; i < spell.length; i++) {
        if (spell[i]["lore"] == lore) {


            var $div = $('#defaultSpellCard');

            var $klon = $div.clone().prop('id', 'spell' + i);

            if ($("#spell" + (i - 1)).length === 0) {
                $div.after($klon.show().removeClass("w3-hide"));
            } else {
                $("#spell" + (i - 1)).after($klon.show().removeClass("w3-hide"));
            }


            $("#spell" + i).children().children().children(".spellName").html(spell[i]["name"])


            // $("#spell" + i).children().children().children().children().children(".spellLore").text("Lore of " + spell[i]["lore"])

            $("#spell" + i).children().children().children(".spellCN").text(spell[i]["CN"])
            $("#spell" + i).children().children().children(".spellRange").html(spell[i]["range"])
            $("#spell" + i).children().children().children(".spellTarget").html(spell[i]["target"])
            $("#spell" + i).children().children().children(".spellDuration").html(spell[i]["duration"])

            if (spell[i]["description"] != undefined) {
                if (typeof (spell[i]["description"]) == "object") {
                    for (let j = 0; j < spell[i]["description"].length; j++) {
                        htmlString += "<p>" + spell[i]["description"][j] + "</p>";
                    }
                } else {
                    htmlString = "<p>" + spell[i]["description"] + "</p>"
                }
            }
            
            $("#spell" + i).children().children().children(".spellDescription").html(htmlString)
            $("#spell" + i).addClass("grid-item")

            htmlString = "";
        }

        setTimeout(() => {
            $('.spellGrid').isotope({
                itemSelector: '.grid-item',
                masonry: {
                    columnWidth: 25
                },
                getSortData: {
                    name: '.spellName',
                    CN: '.spellCN',
                    lore: '.spellLore'
                }
            });
            $('.spellGrid').isotope({
                sortBy: 'name'
            })
            $('spellGrid').isotope('updateSortData').isotope();
        },150)


    }



}

var lores = {
    "Beasts": {
        "desc": "The Amber wind, <em>Ghur</em>, carries with it a chill, primal ferocity, that is unnerving to beasts and sentient creatures alike. Whenever you successfully cast a spell from the Lore of Beasts, you may also gain the <em>Fear (1)</em> Creature Trait (see page 190) for the next 1d10 Rounds. <br/><p> <strong>Ingredients: </strong>Shamans use animal fur, skin, bone, and pelt, wrapped in sinews and daubed with blood runes to focus the Amber wind. Often claws are scrimshawed, organs dried, and feathers dipped in rare humours, and it’s not uncommon to find excrement, urine, and other excretions also used.</p>",
        "wind": "Ghur"
    },
    "Death": {
        "desc": "The purple wind of <em>Shyish</em> carries with it dry, dusty winds and the insistent rustling of sand passing through Time’s hourglass. Targets afflicted by spells from the Lore of Death are drained of life, enervated, and listless. You may assign +1 <em>Fatigued</em> Condition to any living target affected by a spell from this lore. A target may only ever have a single <em>Fatigued</em> Condition gained in this manner at any one time. <br/> <p><strong>Ingredients:</strong> The bones of sentient creatures feature heavily in Amethyst magic, as do the trappings of death, including wood or nails from coffins, embalming fluids, hourglasses, silver coins, and grave dirt, all carefully presented or engraved. Purple gemstones, materials, and flowers (particularly roses) are also common.</p>",
        "wind": "Shyish"
    },
    "Fire": {
        "desc": "The Lore of Fire, and the Bright wind of <em>Aqshy</em>, is anything but subtle. Its spells are bellowed with fervour and manifest themselves in bombastic fashion, with bright flame and searing heat. You may inflict +1 <em>Ablaze</em> Condition on anyone targeted by spells from the Lore of Fire, unless they also possess the <em>Arcane Magic (Fire)</em> Talent. Every <em>Ablaze</em> condition within <eh>Willpower Bonus</eh> yards adds +10 to attempts to Channel or Cast with <em>Aqshy</em>. <br/> <p><strong>Ingredients:</strong> Pyromancers use a wide selection of flammable materials as ingredients, which are often immolated as the spell is cast, including coal, oils, fats, and ruddy woods. Trappings immune to fire are also common, such as iron keys, carved sections of fire-grate, and small oven stones.</p>",
        "wind": "Aqshy"
    },
    "Heavens":{
        "desc":"Arcane spells cast from the Lore of Heavens are accompanied by the crackling of lightning and the smell of ozone. Spells causing Damage ignore Armour Points from metal armour, and will arc to all other targets within 2 yards, except those with the <em>Arcane Magic (Heavens)</em> Talent, inflicting hits with a Damage equal to your <eh>Willpower Bonus</eh>, handled like a <em>magical missile</em>. <br/> <p><strong>Ingredients:</strong> Astronomical instruments, charts, lenses, and symbols dominate Celestial magic, as do ingredients associated with augury, such as animal innards, mirrors, glass balls, and bird tongues. Some wind-based spells use wings and feathers, where those involving electricity prefer slivers of carved metal.</p>",
        "wind":"Azyr"
    },
    "Metal":{
        "desc":"The wind of <em>Chamon</em> is very dense, and quickly attaches itself to metallic substances. Spells from this lore are accompanied with golden light and heat, and are especially effective against foes foolish enough to encase themselves in metal. Spells inflicting Damage ignore Armour Points from metal armour, and inflict bonus Damage equal to the number of Armour Points of metal armour being worn on any Hit Location struck. So, if your spell hit an Arm location protected by 2 Armour Points of metal armour, it would cause an additional +2 Damage and ignore the Armour Points. <br/> <p><strong>Ingredients:</strong> Heavy metals of all types, esoterically inlaid or carved, comprise the majority of Gold ingredients, though many spells also use trappings associated with a forge, including sections of a bellows marked with mathematical formula, inscribed chunks of an anvil, or fragments of a furnace.</p>",
        "wind": "Chamon"
    },
    "Life":{
        "desc":"Spells cast with <em>Ghyran</em>, the Jade Wind, are suffused with life, tending to manifest with a vibrant green light, and are often accompanied by natural phenomena given supernatural qualities. Vines, undergrowth, trees, and rivers all bend to the Druids’ wills. <br/> Receive a +10 bonus to <em>Casting</em> and <em>Channelling</em> rolls when in a rural or wilderness environment. Living creatures — e.g. those without the <em>Daemonic</em> or <em>Undead</em> Creature Traits — targeted by Arcane Spells from the Lore of Life have all <em>Fatigued</em> and <em>Bleeding</em> Conditions removed after any other effects have been applied as life magic floods through them. Creatures with the <em>Undead Creature</em> Trait, on the other hand, suffer additional Damage equal to your <eh>Willpower Bonus</eh>, ignoring Toughness Bonus and Armour Points, if affected by any spell cast with the Lore of Life. <br/><p> <strong>Ingredients: </strong>Druids use a wide variety of naturally occurring ingredients, ranging from rare seeds and nuts, humours gathered from sentient creatures in the flush of life, uncommon tree saps, fertile loam, spring waters, and a variety of living ingredients, including plants and smaller animals.</p>",
        "wind": "Ghyran"
    },
    "Light":{
        "desc":"Arcane Spells sung from the Lore of Light tend to emit dazzling rays of blinding white light, or shroud the caster in shimmering waves of radiant purity. You may inflict one <em>Blinded</em> Condition on those targeted by Lore of Light spells, unless they possess the <em>Arcane Magic (Light)</em> Talent. <br/> If a target has the <em>Daemonic</em> or <em>Undead</em> Creature Traits, spells also inflict an additional hit with Damage equal to your <eh>Intelligence Bonus</eh> that ignores Toughness Bonus and Armour Points. <br/> <p><strong>Ingredients:</strong> Hierophants of the Lore of Light use many artefacts associated with holiness and holy places, supplemented by crystals, glass, pyramidions, and small statues, all carved with sacred symbols, twisting snakes, and moral tales. White candles, silver carvings, and bleached paper are also common.</p>",
        "wind": "Hysh"
    },
    "Shadows":{
        "desc":"Spells cast from the Lore of Shadows are surreptitious and sly, and so the <em>lingua praestantia</em> may be muttered stealthily. Any protective spells you may cast wreath you in shadows and billow smoke, making your body insubstantial, possibly even allowing blades to pass through you seemingly without harm. Further, all spells cast from the Lore of Shadows inflicting Damage ignore all non-magical Armour Points. <br/> <p><strong>Ingredients:</strong> Anything used to hide, shroud, or conceal is repurposed as Grey ingredients, including cosmetics, scents, scarfs, spectacles, mirrors, and wigs. Items drawn from professions steeped in intrigue and wisdom are also common, with diplomatic artefacts, symbols of rank, and the ultimate expression of power &ndash; a blade &ndash; prevalent.</p>",
        "wind": "Ulgu"
    },
    "Petty": {
        "desc": "For the few Humans blessed — or cursed, depending upon your point of view — with the spark of magic, it generally manifests around puberty, and almost always before 25 summers have passed. The first indications of impending witchery are often little tricks, knacks, cantrips, or similar, showing the wizard-to-be should probably be trained for everyone else’s safety. <br/> For Elves, this is just a part of growing up, and those with interest in magic are schooled to develop their burgeoning talents. For Humans, assuming they avoid being lynched, it likely means years of training as an apprentice to a wizard from one of the Eight Colleges of Magic, after which they should never use the little tricks they learned when young again. But most do. <br/> As Petty spells are not formally codified, they have many different names. Players are encouraged to devise their own, more characterful names, reflecting their personality."
    },
    "Arcane":{
        "desc": "The Arcane spells represent common formulations of the <em>lingua praestantia</em>. How these spells manifest in practice will depend on your <em>Arcane Magic</em> Talent. For instance, a spellcaster with the <em>Arcane Magic (Fire)</em> Talent casting Drop may cause the object to overheat, while one with <em>Arcane Magic (Shadows)</em> may make it slightly insubstantial, causing the object to literally slip between the target’s fingers. <br/> Treat Arcane spells as extra options for every Lore of Magic, including Witch, Dark, and Chaos Lores. They are counted as Lore spells in all ways, meaning they get all the benefits of Lore spells, and can only be learned from and taught to those sharing the same Arcane Magic Talent. <br/> <p><strong>Note: </strong>Any spell marked with a ‘+’ at the end of the Duration gains the following extra text: When the spell should end, you may make a <em>Willpower</em> Test to extend the Duration for +1 round.</p>"
    },
    "Hedgecraft":{
        "desc": "The Hedgefolk believe their Lore is a gift from the Gods, referring to their spellcasters as the Blessed Few. Due to their ancient traditions and ingrained belief, their spells cannot be cast without ingredients, which are an integral part of their spellcasting process. <br/> Fortunately, the ingredients they use are easily found on the fringes of settlements and are usually herbs or plants. You receive 1 + SL ingredients on a successful foraging roll, using <em>Lore (Herbalism)</em>, as described under Gathering Food and Herbs on page 127, or you can buy them for 5 brass pennies each. <br/> <p><strong>Ingredients:</strong> Hedgefolk use easily sourced local materials prepared to exacting standards using special tools. So, ingredients may include things such as the wings of a dragonfly killed with a silver pin, rods of poplar polished with beeswax on Sonnstill, or bones buried beneath a hedgerow for a winter’s month.</p>"
    },
    "Witchcraft":{
        "desc": "Spells from the Lore of Witchcraft draw on whichever winds of magic are available, without care or concern for mingling the winds and the potentially horrific results. Each time practitioners of Witchcraft roll on a Miscast table, they also gain 1 Corruption point. Further, you may inflict one Bleeding Condition on anyone targeted by spells from the Lore of Witchcraft. Lastly, channelling or casting spells from this Lore automatically require a roll on the Minor Miscast table unless cast with an ingredient, where the ingredient provides no further protection should you roll a Miscast. Fortunately, ingredients for the Lore of Witchcraft are cheap and readily available: body parts of small animals for the most part. Ingredients cost a spell’s CN in brass pennies, instead of silver shillings, to purchase. Alternatively, a Witch may forage for parts, using the Outdoor Survival skill: a successful foraging roll receives 1 + SL ingredients, as described under Gathering Food and Herbs on page 127. <br/> <p><strong>Ingredients:</strong> Witches use a horrific mixture of animal body parts, often harvested when a creature is still alive. It is not uncommon to find them clutching lizard eyes, dog toes, donkey gizzard, or much, much worse in their bloody hands as they cast their foul magics.</p>"
    },
    "Daemonology":{
        "desc": "The forbidden Lore of Daemonology is concerned with summoning, binding, and controlling Daemons, typically to empower the spellcaster. It is horrifically dangerous, usually leading to the Daemonologist’s downfall as their soul is taken by the Ruinous Powers and a new Chaos Sorcerer is born."
    },
    "Necromancy":{
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
        "description": "Your nails grow into wickedly sharp talons of crystal amber. Unarmed attacks made using Melee (Brawling) count as magical, have a Damage equal to your <eh>Willpower Bonus</eh>, and inflict +1 <em>Bleeding</em> Condition whenever they cause a loss of wounds."
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
        "description": "You can commune with all creatures possessing the Bestial Trait. <em>Ghur</em> clogs your throat, and your language comes out as snarls, hisses, and roars as befits the beasts to whom you talk. While the creatures are not compelled to answer you, or do as you bid, most will be curious enough to hear you out. You gain +20 on all <strong>Charm Animal</strong> and <strong>Animal Training</strong> Tests While this spell is active, you may only speak with beasts &mdash; you may not speak any civilised tongues, and can only communicate with your party using gestures or Language (Battle). Note, this also means you cannot cast any spells, or dispel, while Beast Tongue is active."
    }, {
        "name": "Flock of Doom",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "<eh>Willpower Bonus</eh> rounds",
        "description": "You call down a murder of crows or similar local birds to assail your foes. The flock attacks everyone in the Area of Effect who does not possess the <em>Arcane Magic (Beasts)</em> Talent ferociously, inflicting a +7 Damage hit at the end of the Round. The flock remains in play for the duration of the spell. For your Action you may make an <strong>Average (+20) Charm Animal</strong> Test to move the flock to another target within range. While within the Area of Effect, all creatures gain +1 <em>Blinded</em> Condition."
    }, {
        "name": "Hunter's Hide",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 6,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> rounds",
        "description": "You cloak yourself in a shimmering mantle of <em>Ghur</em>. While the spell lasts, gain a bonus of +20 Toughness and the Dark Vision and Fear (1) <em>Creature</em> Traits (see page 339), as well as the <em>Acute Sense (Smell)</em> Talent."
    }, {
        "name": "The Amber Spear",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "Special",
        "duration": "Instant",
        "description": "You hurl a great spear of pure <em>Ghur</em> in a straight line. This is a <em>magic missile</em> with a Damage of +12. It strikes the first creature in its path, ignoring APs from armour made of leather and furs. If the target suffers any Wounds, also inflict +1 <em>Bleeding</em> Condition, after which the spear continues on its path, striking each target in the same manner, but at –1 Damage each time. If the spear fails to inflict any Wounds, its progress is stopped and the spell comes to an end. <em>The Amber Spear</em> only inflicts the minimum 1 Wound (see page 236) on the first target it strikes."
    }, {
        "name": "Wyssan's Wildform",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 8,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> rounds",
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
        "duration": "<eh>Willpower Bonus</eh> rounds",
        "description": "Touching the body of a recently departed soul (one that passed away within the last day), you call its soul back briefly. For the spell’s duration, you can communicate with the dead soul, though it cannot take any action other than talking. It is not compelled to answer you, but the dead do not lie."
    }, {
        "name": "Purple Pall of <em>Shyish</em>",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 9,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> rounds",
        "description": "You pull about you a pall fashioned from fine strands of purple magic. Gain +<en>Willpower Bonus</en> Armour Points on all locations, and the <em>Fear (1)</em> Creature Trait (see page 339). For every +2 SL you may increase your Fear rating by 1."
    }, {
        "name": "Sanctify",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 10,
        "range": "Touch",
        "target": "AoE (<eh>Willpower Bonus</eh> rounds)",
        "duration": "<eh>Willpower</eh> minutes",
        "description": "Inscribing a magical circle, you ward it with <em>Shyish</em>, forming an impenetrable barrier to the Undead. Creatures with the Undead Creature Trait cannot enter or leave the circle."
    }, {
        "name": "Scythe of <em>Shyish</em>",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 6,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> rounds",
        "description": "You conjure a magical scythe, which can be wielded in combat, using the Melee (Polearm) Skill. It acts like a normal scythe with a Damage equal to your <eh>Willpower Bonus</eh>+3. Enemies with the <em>Undead</em> Creature Trait do not receive Advantage when Engaged in combat with you."
    }, {
        "name": "Soul Vertex",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "Instant",
        "description": "You hurl a shimmering ball of <em>Shyish</em> which erupts into purple flames, swirling with ghostly faces, mouths agape in silent terror. Targets within the Area of Effect receive +1 <em>Broken</em> Condition. Against targets with the <em>Undead</em> Creature Trait, <em>Soul Vortex</em> is a <em>magic missile</em> with a Damage of +10 that ignores Toughness Bonus and Armour Points."
    }, {
        "name": "Steal Life",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 7,
        "range": "<eh>Willpower</eh> yards",
        "target": "1",
        "duration": "Instant",
        "description": "Thin strands of purple mist connect you briefly to your target, who wastes away before your very eyes. This counts as a <em>magic missile</em> with a Damage of +6 that ignores Armour Points and inflicts +1 <em>Fatigued</em> Condition. Further, you remove all <em>Fatigued</em> Conditions you currently suffer, and may heal yourself up to half the Wounds the target suffers, rounding up."
    }, {
        "name": "Swift Passing",
        "lore": "Death",
        "wind": "Shyish",
        "CN": 6,
        "range": "Touch",
        "target": "Special",
        "duration": "Instant",
        "description": "Your touch brings the release of death to a single mortally wounded target. If you successfully touch a target with 0 wounds remaining and at least 2 Critical Wounds, death swiftly follows. Further, the target cannot be raised as Undead."
    }
];
