function miracleFilter(input) {
    $('.btn-selected').removeClass('btn-selected')
    $('#cultDesc').html("");

    try {
        $(".miracleGrid").isotope('destroy')
    } catch (error) {
        
    };

    $('.grid-item').remove();

    let htmlString = "";

    let cult = input;

    $('#cultBtn'+cult).addClass('btn-selected');
    

    for (let i = 0; i < miracle.length; i++) {
        let isBlessing = (blessByCult[cult].includes(miracle[i]["name"]))
        if (miracle[i]["god"] == cult || isBlessing) {


            var $div = $('#defaultMiracleCard');

            var $klon = $div.clone().prop('id', 'miracle' + i);


            if ($("#miracle" + (i - 1)).length === 0) {
                $div.after($klon.show().removeClass("w3-hide"));
            } else {
                $("#miracle" + (i - 1)).after($klon.show().removeClass("w3-hide"));
            }


            if (isBlessing) {
                $("#miracle" + i + " .miracleName").html("Blessing of " + miracle[i]["name"])
                $("#miracle" + i + " .miracleTier").html(0)
                $("#miracle" + i).addClass("blessCard")
            } else {
                $("#miracle" + i + " .miracleName").html(miracle[i]["name"])
                $("#miracle" + i + " .miracleTier").html(1)
            }

            if (isBlessing){
                $("#miracle" + i + " .miracleGod").text(cult)
            } else {
                $("#miracle" + i + " .miracleGod").text(miracle[i]["god"])
            }

            $("#miracle" + i + " .miracleRange").html(miracle[i]["range"])
            $("#miracle" + i + " .miracleTarget").html(miracle[i]["target"])
            $("#miracle" + i + " .miracleDuration").html(miracle[i]["duration"])

            if (miracle[i]["desc"] != undefined) {
                if (typeof (miracle[i]["desc"]) == "object") {
                    for (let j = 0; j < miracle[i]["desc"].length; j++) {
                        htmlString += "<p>" + miracle[i]["desc"][j] + "</p>";
                    }
                } else {
                    htmlString = "<p>" + miracle[i]["desc"] + "</p>"
                }
            }
            
            $("#miracle" + i + " .miracleDescription").html(htmlString)
            $("#miracle" + i).addClass("grid-item")

            htmlString = "";
        }

        initializeModals();

        setTimeout(() => {
            $('.miracleGrid').isotope({
                itemSelector: '.grid-item',
                masonry: {
                    columnWidth: 25
                },
                getSortData: {
                    name: '.miracleName',
                    tier: '.miracleTier'
                }
            });
            $('.miracleGrid').isotope({
                sortBy: ['tier','name']
            })
            $('miracleGrid').isotope('updateSortData').isotope();
        },150)


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
        "desc": "<p>Your target's weapon counts as Magical.</p>"
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
        "desc": "<p>You appeal to Verena, requesting her judgement concerning a suspected criminal. If your target committed a crime and claims they did not, while affected by this miracle they gain an Entangled Condition that cannot be removed for the duration. If you have falsely accused the target, Verena is displeased with your lack of wisdom: you gain +1 Sin point and must immediately roll on The Wrath of the Gods table.</p>"
    },
    {
        "name": "Sword of Justice",
        "god": "Verena",
        "range": "You",
        "target": "You",
        "duration": "Fellowship Bonus Rounds",
        "desc": "<p>You pray to Verena to guide your blade to strike down the unjust. If wielding a sword, it ignores APs, and counts as Magical. Further, if struck opponents are criminals (as determined by the GM), they must make an <b>Average (+20) Endurance Test</b> or suffer an <em>Unconscious</em> Condition that lasts for at least Fellowship Bonus Rounds. If any crime is perpetrated on the unconscious opponents, you suffer +1 Sin point per crime.</p>"
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
    }
]