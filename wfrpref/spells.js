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


            $("#spell" + i + " .spellName").html(spell[i]["name"])
            
            $("#spell" + i + " .spellCN").text(spell[i]["CN"])
            $("#spell" + i + " .spellRange").html(spell[i]["range"])
            $("#spell" + i + " .spellTarget").html(spell[i]["target"])
            $("#spell" + i + " .spellDuration").html(spell[i]["duration"])

            if (spell[i]["description"] != undefined) {
                if (typeof (spell[i]["description"]) == "object") {
                    for (let j = 0; j < spell[i]["description"].length; j++) {
                        htmlString += "<p>" + spell[i]["description"][j] + "</p>";
                    }
                } else {
                    htmlString = "<p>" + spell[i]["description"] + "</p>"
                }
            }
            
            $("#spell" + i + " .spellDescription").html(htmlString)
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
        "desc": "The Amber wind, <em>Ghur</em>, carries with it a chill, primal ferocity, that is unnerving to beasts and sentient creatures alike. Whenever you successfully cast a spell from the Lore of Beasts, you may also gain the <em>Fear (1)</em> Creature Trait (see page 190) for the next 1d10 Rounds. <br/><p> <b>Ingredients: </b>Shamans use animal fur, skin, bone, and pelt, wrapped in sinews and daubed with blood runes to focus the Amber wind. Often claws are scrimshawed, organs dried, and feathers dipped in rare humours, and it’s not uncommon to find excrement, urine, and other excretions also used.</p>",
        "wind": "Ghur"
    },
    "Death": {
        "desc": "The purple wind of <em>Shyish</em> carries with it dry, dusty winds and the insistent rustling of sand passing through Time’s hourglass. Targets afflicted by spells from the Lore of Death are drained of life, enervated, and listless. You may assign +1 <em>Fatigued</em> Condition to any living target affected by a spell from this lore. A target may only ever have a single <em>Fatigued</em> Condition gained in this manner at any one time. <br/> <p><b>Ingredients:</b> The bones of sentient creatures feature heavily in Amethyst magic, as do the trappings of death, including wood or nails from coffins, embalming fluids, hourglasses, silver coins, and grave dirt, all carefully presented or engraved. Purple gemstones, materials, and flowers (particularly roses) are also common.</p>",
        "wind": "Shyish"
    },
    "Fire": {
        "desc": "The Lore of Fire, and the Bright wind of <em>Aqshy</em>, is anything but subtle. Its spells are bellowed with fervour and manifest themselves in bombastic fashion, with bright flame and searing heat. You may inflict +1 <em>Ablaze</em> Condition on anyone targeted by spells from the Lore of Fire, unless they also possess the <em>Arcane Magic (Fire)</em> Talent. Every <em>Ablaze</em> condition within <eh>Willpower Bonus</eh> yards adds +10 to attempts to Channel or Cast with <em>Aqshy</em>. <br/> <p><b>Ingredients:</b> Pyromancers use a wide selection of flammable materials as ingredients, which are often immolated as the spell is cast, including coal, oils, fats, and ruddy woods. Trappings immune to fire are also common, such as iron keys, carved sections of fire-grate, and small oven stones.</p>",
        "wind": "Aqshy"
    },
    "Heavens":{
        "desc":"Arcane spells cast from the Lore of Heavens are accompanied by the crackling of lightning and the smell of ozone. Spells causing Damage ignore Armour Points from metal armour, and will arc to all other targets within 2 yards, except those with the <em>Arcane Magic (Heavens)</em> Talent, inflicting hits with a Damage equal to your <eh>Willpower Bonus</eh>, handled like a <em>magical missile</em>. <br/> <p><b>Ingredients:</b> Astronomical instruments, charts, lenses, and symbols dominate Celestial magic, as do ingredients associated with augury, such as animal innards, mirrors, glass balls, and bird tongues. Some wind-based spells use wings and feathers, where those involving electricity prefer slivers of carved metal.</p>",
        "wind":"Azyr"
    },
    "Metal":{
        "desc":"The wind of <em>Chamon</em> is very dense, and quickly attaches itself to metallic substances. Spells from this lore are accompanied with golden light and heat, and are especially effective against foes foolish enough to encase themselves in metal. Spells inflicting Damage ignore Armour Points from metal armour, and inflict bonus Damage equal to the number of Armour Points of metal armour being worn on any Hit Location struck. So, if your spell hit an Arm location protected by 2 Armour Points of metal armour, it would cause an additional +2 Damage and ignore the Armour Points. <br/> <p><b>Ingredients:</b> Heavy metals of all types, esoterically inlaid or carved, comprise the majority of Gold ingredients, though many spells also use trappings associated with a forge, including sections of a bellows marked with mathematical formula, inscribed chunks of an anvil, or fragments of a furnace.</p>",
        "wind": "Chamon"
    },
    "Life":{
        "desc":"Spells cast with <em>Ghyran</em>, the Jade Wind, are suffused with life, tending to manifest with a vibrant green light, and are often accompanied by natural phenomena given supernatural qualities. Vines, undergrowth, trees, and rivers all bend to the Druids’ wills. <br/> Receive a +10 bonus to <em>Casting</em> and <em>Channelling</em> rolls when in a rural or wilderness environment. Living creatures — e.g. those without the <em>Daemonic</em> or <em>Undead</em> Creature Traits — targeted by Arcane Spells from the Lore of Life have all <em>Fatigued</em> and <em>Bleeding</em> Conditions removed after any other effects have been applied as life magic floods through them. Creatures with the <em>Undead Creature</em> Trait, on the other hand, suffer additional Damage equal to your <eh>Willpower Bonus</eh>, ignoring Toughness Bonus and Armour Points, if affected by any spell cast with the Lore of Life. <br/><p> <b>Ingredients: </b>Druids use a wide variety of naturally occurring ingredients, ranging from rare seeds and nuts, humours gathered from sentient creatures in the flush of life, uncommon tree saps, fertile loam, spring waters, and a variety of living ingredients, including plants and smaller animals.</p>",
        "wind": "Ghyran"
    },
    "Light":{
        "desc":"Arcane Spells sung from the Lore of Light tend to emit dazzling rays of blinding white light, or shroud the caster in shimmering waves of radiant purity. You may inflict one <em>Blinded</em> Condition on those targeted by Lore of Light spells, unless they possess the <em>Arcane Magic (Light)</em> Talent. <br/> If a target has the <em>Daemonic</em> or <em>Undead</em> Creature Traits, spells also inflict an additional hit with Damage equal to your <eh>Intelligence Bonus</eh> that ignores Toughness Bonus and Armour Points. <br/> <p><b>Ingredients:</b> Hierophants of the Lore of Light use many artefacts associated with holiness and holy places, supplemented by crystals, glass, pyramidions, and small statues, all carved with sacred symbols, twisting snakes, and moral tales. White candles, silver carvings, and bleached paper are also common.</p>",
        "wind": "Hysh"
    },
    "Shadows":{
        "desc":"Spells cast from the Lore of Shadows are surreptitious and sly, and so the <em>lingua praestantia</em> may be muttered stealthily. Any protective spells you may cast wreath you in shadows and billow smoke, making your body insubstantial, possibly even allowing blades to pass through you seemingly without harm. Further, all spells cast from the Lore of Shadows inflicting Damage ignore all non-magical Armour Points. <br/> <p><b>Ingredients:</b> Anything used to hide, shroud, or conceal is repurposed as Grey ingredients, including cosmetics, scents, scarfs, spectacles, mirrors, and wigs. Items drawn from professions steeped in intrigue and wisdom are also common, with diplomatic artefacts, symbols of rank, and the ultimate expression of power &ndash; a blade &ndash; prevalent.</p>",
        "wind": "Ulgu"
    },
    "Petty": {
        "desc": "For the few Humans blessed — or cursed, depending upon your point of view — with the spark of magic, it generally manifests around puberty, and almost always before 25 summers have passed. The first indications of impending witchery are often little tricks, knacks, cantrips, or similar, showing the wizard-to-be should probably be trained for everyone else’s safety. <br/> For Elves, this is just a part of growing up, and those with interest in magic are schooled to develop their burgeoning talents. For Humans, assuming they avoid being lynched, it likely means years of training as an apprentice to a wizard from one of the Eight Colleges of Magic, after which they should never use the little tricks they learned when young again. But most do. <br/> As Petty spells are not formally codified, they have many different names. Players are encouraged to devise their own, more characterful names, reflecting their personality.<br/><br/> Petty spells are learned when taking the <em>Petty Magic</em> Talent, which may be available to your Career. Additional Petty spells can be learned for an XP cost"
    },
    "Arcane":{
        "desc": "The Arcane spells represent common formulations of the <em>lingua praestantia</em>. How these spells manifest in practice will depend on your <em>Arcane Magic</em> Talent. For instance, a spellcaster with the <em>Arcane Magic (Fire)</em> Talent casting Drop may cause the object to overheat, while one with <em>Arcane Magic (Shadows)</em> may make it slightly insubstantial, causing the object to literally slip between the target’s fingers. <br/> Treat Arcane spells as extra options for every Lore of Magic, including Witch, Dark, and Chaos Lores. They are counted as Lore spells in all ways, meaning they get all the benefits of Lore spells, and can only be learned from and taught to those sharing the same Arcane Magic Talent. <br/> <p><b>Note: </b>Any spell marked with a ‘+’ at the end of the Duration gains the following extra text: When the spell should end, you may make a <em>Willpower</em> Test to extend the Duration for +1 round.</p>"
    },
    "Hedgecraft":{
        "desc": "The Hedgefolk believe their Lore is a gift from the Gods, referring to their spellcasters as the Blessed Few. Due to their ancient traditions and ingrained belief, their spells cannot be cast without ingredients, which are an integral part of their spellcasting process. <br/> Fortunately, the ingredients they use are easily found on the fringes of settlements and are usually herbs or plants. You receive 1 + SL ingredients on a successful foraging roll, using <em>Lore (Herbalism)</em>, as described under Gathering Food and Herbs on page 127, or you can buy them for 5 brass pennies each. <br/> <p><b>Ingredients:</b> Hedgefolk use easily sourced local materials prepared to exacting standards using special tools. So, ingredients may include things such as the wings of a dragonfly killed with a silver pin, rods of poplar polished with beeswax on Sonnstill, or bones buried beneath a hedgerow for a winter’s month.</p>"
    },
    "Witchcraft":{
        "desc": "Spells from the Lore of Witchcraft draw on whichever winds of magic are available, without care or concern for mingling the winds and the potentially horrific results. Each time practitioners of Witchcraft roll on a Miscast table, they also gain 1 Corruption point. Further, you may inflict one Bleeding Condition on anyone targeted by spells from the Lore of Witchcraft. Lastly, channelling or casting spells from this Lore automatically require a roll on the Minor Miscast table unless cast with an ingredient, where the ingredient provides no further protection should you roll a Miscast. Fortunately, ingredients for the Lore of Witchcraft are cheap and readily available: body parts of small animals for the most part. Ingredients cost a spell’s CN in brass pennies, instead of silver shillings, to purchase. Alternatively, a Witch may forage for parts, using the Outdoor Survival skill: a successful foraging roll receives 1 + SL ingredients, as described under Gathering Food and Herbs on page 127. <br/> <p><b>Ingredients:</b> Witches use a horrific mixture of animal body parts, often harvested when a creature is still alive. It is not uncommon to find them clutching lizard eyes, dog toes, donkey gizzard, or much, much worse in their bloody hands as they cast their foul magics.</p>"
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
        "description": "You can commune with all creatures possessing the Bestial Trait. <em>Ghur</em> clogs your throat, and your language comes out as snarls, hisses, and roars as befits the beasts to whom you talk. While the creatures are not compelled to answer you, or do as you bid, most will be curious enough to hear you out. You gain +20 on all <b>Charm Animal</b> and <b>Animal Training</b> Tests While this spell is active, you may only speak with beasts &mdash; you may not speak any civilised tongues, and can only communicate with your party using gestures or Language (Battle). Note, this also means you cannot cast any spells, or dispel, while Beast Tongue is active."
    }, {
        "name": "Flock of Doom",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You call down a murder of crows or similar local birds to assail your foes. The flock attacks everyone in the Area of Effect who does not possess the <em>Arcane Magic (Beasts)</em> Talent ferociously, inflicting a +7 Damage hit at the end of the Round. The flock remains in play for the duration of the spell. For your Action you may make an <b>Average (+20) Charm Animal</b> Test to move the flock to another target within range. While within the Area of Effect, all creatures gain +1 <em>Blinded</em> Condition."
    }, {
        "name": "Hunter's Hide",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": 6,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You cloak yourself in a shimmering mantle of <em>Ghur</em>. While the spell lasts, gain a bonus of +20 Toughness and the <em>Dark Vision</em> and <em>Fear (1)</em> Creature Traits (see page 339), as well as the <em>Acute Sense (Smell)</em> Talent."
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
    }, {
        "name": "Aqshy\'s Aegis",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 5,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You wrap yourself in a fiery cloak of <em>Aqshy</em>, which channels flame into the Aegis. You are completely immune to damage from non-magical fire, including the breath attacks of monsters, and ignore any <em>Ablaze</em> Conditions you receive. You receive the <em>Ward (9+)</em> Creature Trait (see page 343) against magical fire attacks including spells from the Lore of Fire."
    }, {
        "name": "Cauterise",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 4,
        "range": "Touch",
        "target": "1",
        "duration": "Instant",
        "description": "Channelling <em>Aqshy</em> through your hands you lay them on an ally\’s wounds. Immediately heal 1d10 Wounds and remove all <em>Bleeding</em> Conditions. Further, the wounds will not become infected. <br/> Targets without the <em>Arcane Magic (Fire)</em> Talent, must pass a <b>Challenging (+0) Cool</b> Test or scream in agony. If Failed by –6 or more SL, the target gains the <em>Unconscious</em> Condition and is permanently scarred, waking up 1d10 hours later."
    }, {
        "name": "Crown of Flame",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 8,
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You channel <em>Aqshy</em> into a majestic crown of inspiring fire about your brow. Gain the <em>Fear (1)</em> Trait and +1 <em>War Leader</em> Talent while the spell is active. <br/> For every +2 SL, you may increase your <em>Fear</em> value by +1, or take <em>War Leader</em> Talent again. Furthermore, gain a bonus of +10 on all attempts to Channel and Cast with <em>Aqshy</em> while the spell is in effect."
    }, {
        "name": "Flaming Hearts",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "Your voice takes on a rich resonance, echoing with <em>Aqshy’s</em> fiery passion. Affected allies lose all <em>Broken</em> and <em>Fatigued</em> Conditions, and gain +1 <em>Drilled</em>, <em>Fearless</em> and <em>Stout-hearted</em> Talents while the spell is in effect."
    }, {
        "name": "Firewall",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 6,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (Special)",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You channel a fiery streak of <em>Aqshy</em>, creating a wall of flame. The Firewall is <eh>Willpower Bonus</eh> yards wide, and 1 yard deep. <br/> For every +2 SL you may extend the length of the Firewall by <eh>+Willpower Bonus</eh> yards. Anyone crossing the firewall gains 1 <em>Ablaze</em> condition and suffers a hit with a Damage equal to your <eh>Willpower Bonus</eh>, handled like a <em>magical missile</em>."
    }, {
        "name": "Great Fires of U\'Zhul",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 10,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<em>Willpower Bonus</em> yards)",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You hurl a great, explosive blast of <em>Aqshy</em> into an enemy, which erupts into a furious blaze, burning with the heat of a forge. This is a <em>magical missil</em>e with Damage +10 that ignores Armour Points and inflicts +2 <em>Ablaze</em> Conditions and the <em>Prone</em> Condition on a target. Everyone within the Area of Effect of that target suffers a Damage +5 hit ignoring Armour Points, and must pass a <b>Dodge Test</b> or also gain +1 <em>Ablaze</em> Condition.  <br/>The spell stops behaving like a <em>magic missile</em> as the fire continues to burn in the Area of Effect for the duration. Anyone within the Area of Effect at the start of a round suffers 1d10+6 Damage, ignoring APs, and gains +1 <em>Ablaze</em> Condition."
    }, {
        "name": "Flaming Sword of Rhuin",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "1",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You wreathe a sword in magical flames. The weapon has Damage +6 and the Impact Quality (see page 298), and anyone struck by the blade gains +1 <em>Ablaze</em> Condition. If wielders do not possess the <em>Arcane Magic (Fire)</em> Talent, and they fumble an attack with the Flaming Sword, they gain +1 <em>Ablaze</em> Condition."
    }, {
        "name": "Purge",
        "lore": "Fire",
        "wind": "Aqshy",
        "CN": 10,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<em>Willpower Bonus</em> yards)",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You funnel intense flame to burn away the taint and corruption in an area. Anything flammable is set alight, and any creatures in the area takes +SL <em>Ablaze</em> conditions. If the location contains a Corrupting Influence, such as <em>Dhar</em>, warpstone, or a Chaos-ttainted object, it too will smoulder and blacken, beginning to burn. This spell may be maintained in subsequent rounds by passing a <b>Challenging (+0) Channelling Test</b>.  <br/>The precise time needed to eliminate the Corrupting Influence will be determined by your GM. As a rough guideline, a small quantity (smaller than an acorn) of warpstone, or a minor Chaos-tainted object may require 10–Willpower Bonus Rounds (minimum of 1 Round). A larger quantity of warpstone — fist-sized — or a more potent Chaos-tainted object may require double this. A powerful Chaos Artefact may take hours, or even longer… See page 182 for detail on Corrupting Influences."
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
        "description": "The target gains 1 <em>Blinded</em> Condition, and gains 1 <em>Blinded</em> Condition at the start of each round for the duration of the spell."
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
        "description": "You touch your opponent, sending them into a deep sleep. If the target has the Prone Condition, they gain the <em>Unconscious</em> Condition as they fall asleep. They remain unconscious for the duration, although loud noises or being moved or jostled will awaken them instantly. If your targets are standing or sitting when affected, they start themselves awake as they hit the ground, gaining the <em>Prone</em> Condition, but remaining conscious. <br/> <br/> If your targets are not resisting, and are suitably tired, they will, at the spell’s end, pass into a deep and restful sleep."
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
        "description": "Your target receives 1 <em>Stunned</em> condition."
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
        "description": "You channel a heavy flow of <em>Dhar</em> into bare earth, causing old bones to gather and rise. SL+1 Skeletons will claw upwards into the affected area at the end of the Round, which are organised as you prefer within the area of effect. They start with the <em>Prone</em> Condition. <br/>The summoned undead are entirely under your control and can perform simple orders as you command. If you are killed or gain an <em>Unconscious</em> Condition, the spell comes to an end and the summoned Undead collapse. For each +2 SL you score, you may summon an extra SL Skeletons."
    }, {
        "name": "Reanimate",
        "lore": "Necromancy",
        "wind": "",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "Until Sunrise",
        "description": "You channel worming strands of thick <em>Dhar</em> before you, sinking it into corpses, reanimating that which was once dead. Reanimate <eh>Willpower Bonus + SL</eh> dead bodies (as Zombies) or skeletons (as Skeletons) within range. They start with the <em>Prone</em> Condition.<br/> The summoned Undead are entirely under your control and can perform simple orders as you command. If you die or gain an <em>Unconscious</em> Condition, the spell comes to an end and the reanimated corpses fall dead again. For each +2 SL you score, you may reanimate an extra <eh>Willpower Bonus + SL</eh> Skeletons or Zombies."
    }, {
        "name": "Screaming Skull",
        "lore": "Necromancy",
        "wind": "",
        "CN": 8,
        "range": "<eh>Willpower</eh> yards",
        "target": "Special",
        "duration": "Instant",
        "description": "You shriek the high-pitched words of the spell and a large, black skull wreathed with greenish-purple fire forms before you, then flies forwards, screaming and cackling as it goes. The skull moves in a straight line for the spell range, following the contours of the land, passing through any obstacles in its way. <em>Screaming Skull</em> is a <em>magic missile</em> that only affects targets without the <em>Undead</em> Creature Trait, and has a Damage equal to your <eh>Willpower Bonus</eh>. Any suffering Wounds from the spell must pass a <b>Challenging (+0) Cool Test</b> or also take a <em>Broken</em> Condition."
    }, {
        "name": "Vanhel\'s Call",
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
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "You encase yourself in a crackling cage of sparking electricity and <em>Azyr</em>. For the spell’s duration, gain +SL Armour Points to all locations against melee attacks. If attacked by metal weapons &mdash; such as daggers, swords, and spears with metal tips &mdash; your attacker takes <eh>+Willpower Bonus</eh> Damage."
    }, {
        "name": "Comet of Casandora",
        "lore": "Heavens",
        "wind": "Azyr",
        "CN": 10,
        "range": "Initiative yards",
        "target": "AoE (Initiative Bonus yards)",
        "duration": "Special",
        "description": "<p>You channel all the <em>Azyr</em> you can muster and reach out to the skies, calling down a comet to wreak havoc amongst your foes. Select a target point within range. At the end of the next round, make an <b>Average (+20) Perception Test</b>. For every +SL you achieve, you may move your point of impact by Initiative Bonus yards.</p> <p>For every –SL, the GM will move the point of impact by Initiative Bonus yards in a random direction. Comet of Casandora then acts as a magical missile with Damage +12 that hits all targets in the Area of Effect, who also gain +1 Ablaze and the Prone Condition.</p>"
    }
];
