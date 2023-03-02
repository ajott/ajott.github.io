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


            // Cult Description
            $('.cultImg').attr('src',"./img/"+cult+" Shrine.webp")

            $('.godDesc').html(cults[cult]["title"]);
            $('.cultSOP').html(cults[cult]["SOP"]);
            $('.cultHOC').html(cults[cult]["HOC"]);
            $('.cultOrders').html(cults[cult]["Orders"]);
            $('.cultFestivals').html(cults[cult]["Festivals"]);
            $('.cultBooks').html(cults[cult]["Books"]);
            $('.cultSymbols').html(cults[cult]["Symbols"]);
            $('.cultGodDesc').html(cults[cult]["GodDesc"]);
            $('.cultWorshippers').html(cults[cult]["Worshippers"]);
            $('.cultSites').html(cults[cult]["Sites"]);
            $('.cultPenances').html(cults[cult]["Penances"]);
            $('.cultStrictures').html(cults[cult]["Strictures"]);
            $('.cultDescDetail').show();


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