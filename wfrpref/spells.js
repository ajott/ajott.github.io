function spellFilter(input) {

    $(".grid-item").remove();

    let htmlString = "";

    let lore = input;


    for (let i = 0; i < spell.length; i++) {
        if (spell[i]["lore"] == lore) {


            var $div = $('#defaultSpellCard');

            var $klon = $div.clone().prop('id', 'spell' + i);

            if ($("#spell" + (i - 1)).length === 0) {
                $div.after($klon.show().removeClass("w3-hide"));
            } else {
                $("#spell" + (i - 1)).after($klon.show().removeClass("w3-hide"));
            }


            $("#spell" + i).children().children().children(".spellName").text(spell[i]["name"])


            // $("#spell" + i).children().children().children(".copyText").text(String(window.location).split('?s=')[0] + "?s=" + encodeURIComponent(spell[i]["name"]))

            // if (spell[i]["concentration"]) {
            //     $("#spell" + i).children().children().children().children(".concentration").text("Concentration")
            // }

            $("#spell" + i).children().children().children().children().children(".spellLore").text("Lore of " + spell[i]["lore"])

            $("#spell" + i).children().children().children(".spellCN").text(spell[i]["CN"])
            $("#spell" + i).children().children().children(".spellRange").html(spell[i]["range"])
            $("#spell" + i).children().children().children(".spellTarget").html(spell[i]["target"])
            $("#spell" + i).children().children().children(".spellDuration").html(spell[i]["duration"])
            // $("#spell" + i).children().children().children(".spellClasses").text(spell[i]["classes"])
            if (spell[i]["description"] != undefined) {
                if (typeof (spell[i]["description"]) == "object") {
                    for (let j = 0; j < spell[i]["description"].length; j++) {
                        htmlString += "<p>" + spell[i]["description"][j] + "</p>";
                    }
                } else {
                    htmlString = "<p>" + spell[i]["description"] + "</p>"
                }
            }
            // if (spell[i]["ritual"] == "YES") {
            //     $("#spell" + i).children().children().children().children(".ritual").text("Ritual")
            // }
            $("#spell" + i).children().children().children(".spellDescription").html(htmlString)
            $("#spell" + i).addClass("grid-item")
            // if (spell[i]["homebrew"] != undefined) {
            //     $("#spell" + i).children().addClass("homebrew-card");
            // } 

            htmlString = "";
        }

        $('.spellGrid').isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: 25,
                horizontalOrder: true
            },
            getSortData: {
                name: '.spellName',
                CN: '.spellCN'
            }
        });
        $('.spellGrid').isotope({
            sortBy: 'name'
        })
        $('spellGrid').isotope('updateSortData').isotope();


    }



}


var spell = [
    {
        "name": "",
        "lore": "",
        "wind": "",
        "CN": "",
        "range": "",
        "target": "",
        "duration": "",
        "description": ""
    }, {
        "name": "Amber Talons",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": "6",
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> Rounds",
        "description": "Your nails grow into wickedly sharp talons of crystal amber. Unarmed attacks made using Melee (Brawling) count as magical, have a Damage equal to your <eh>Willpower Bonus</eh>, and inflict +1 <em>Bleeding</em> Condition whenever they cause a loss of wounds."
    }, {
        "name": "Beast Form",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": "5",
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower</eh> minutes",
        "description": "You infuse your very bones and flesh with <em>Ghur</em>, warping your body into that of a creature. When cast, select a new form from any of the Beasts of the Reikland section of the Bestiary. Gain all the standard Traits of the creature, except the Bestial Trait. Further, replace your S, T, Agi, and Dex with those of the creature, then recalculate your Wounds. For every + 2 SL, you may include 1 of the included Optional Creature Trait. While in Beast Form, you look like a normal version of the creature, with amber and brown colouring. You may not speak, which means you cannot cast spells, or attempt to dispel. If you have lost any Wounds when the spell ends, you lose the same number of Wounds when you revert to your true form, to a minimum of 0 Wounds."
    }, {
        "name": "Beast Master",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": "10",
        "range": "<eh>Willpower Bonus</eh> yards",
        "target": "1",
        "duration": "<eh>Willpower Bonus</eh> days",
        "description": "Your breath steams and your eyes take on a shining amber sheen as <em>Ghur</em> suffuses you. Your gaze and words convince 1 creature possessing the <em>Bestial</em> trait that you are its pack master, and it will fight to the death to protect you. While subject to your mastery it will follow your instructions, instinctively understanding simple instructions. If the creature is released from the spell &mdash; through the duration running out, or the spell being dispelled &mdash; it will retain enough residual respect and fear not to attack you, unless compelled to. Your allies may not be so fortunate."
    }, {
        "name": "Beast Tongue",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": "3",
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower</eh> minutes",
        "description": "You can commune with all creatures possessing the Bestial Trait. <em>Ghur</em> clogs your throat, and your language comes out as snarls, hisses, and roars as befits the beasts to whom you talk. While the creatures are not compelled to answer you, or do as you bid, most will be curious enough to hear you out. You gain +20 on all <strong>Charm Animal</strong> and <strong>Animal Training</strong> Tests While this spell is active, you may only speak with beasts &mdash; you may not speak any civilised tongues, and can only communicate with your party using gestures or Language (Battle). Note, this also means you cannot cast any spells, or dispel, while Beast Tongue is active."
    }, {
        "name": "Flock of Doom",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": "8",
        "range": "<eh>Willpower</eh> yards",
        "target": "AoE (<eh>Willpower Bonus</eh> yards)",
        "duration": "<eh>Willpower Bonus</eh> rounds",
        "description": "You call down a murder of crows or similar local birds to assail your foes. The flock attacks everyone in the Area of Effect who does not possess the <em>Arcane Magic (Beasts)</em> Talent ferociously, inflicting a +7 Damage hit at the end of the Round. The flock remains in play for the duration of the spell. For your Action you may make an <strong>Average (+20) Charm Animal</strong> Test to move the flock to another target within range. While within the Area of Effect, all creatures gain +1 <em>Blinded</em> Condition."
    }, {
        "name": "Hunter's Hide",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": "6",
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> rounds",
        "description": "You cloak yourself in a shimmering mantle of <em>Ghur</em>. While the spell lasts, gain a bonus of +20 Toughness and the Dark Vision and Fear (1) <em>Creature</em> Traits (see page 339), as well as the <em>Acute Sense (Smell)</em> Talent."
    }, {
        "name": "The Amber Spear",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": "8",
        "range": "<em>Willpower</em> yards",
        "target": "Special",
        "duration": "Instant",
        "description": "You hurl a great spear of pure <em>Ghur</em> in a straight line. This is a <em>magic missile</em> with a Damage of +12. It strikes the first creature in its path, ignoring APs from armour made of leather and furs. If the target suffers any Wounds, also inflict +1 <em>Bleeding</em> Condition, after which the spear continues on its path, striking each target in the same manner, but at –1 Damage each time. If the spear fails to inflict any Wounds, its progress is stopped and the spell comes to an end. <em>The Amber Spear</em> only inflicts the minimum 1 Wound (see page 236) on the first target it strikes."
    }, {
        "name": "Wyssan's Wildform",
        "lore": "Beasts",
        "wind": "Ghur",
        "CN": "8",
        "range": "You",
        "target": "You",
        "duration": "<eh>Willpower Bonus</eh> rounds",
        "description": "You call on the wild power of <em>Ghur</em> to infuse you, surrendering to its savage delights. Gain the following Creature Traits (see page 338): <em>Arboreal, Armour (2), Belligerent, Big, Bite (Strength Bonus +1), Fear (1), Fury, Magical, Weapon (Strength Bonus +2)</em>. While the spell is in place you are incapable of using any Language or Lore skills."
    }
];
