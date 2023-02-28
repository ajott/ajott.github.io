function skillFilter(input, mod = 0) {
    let $this = $(input)

    if ($this.hasClass("btn-selected")){        
        $this.removeClass("btn-selected")

        $(".skillGrid").isotope({filter: '*'})

    } else {

        $('.skillFilterBtn').removeClass("btn-selected")

        $("#skillNameSearch").val("")
    
        let filterText = "."+ $this.html();
    
        $(".skillGrid").isotope({filter: filterText})
    
        $this.addClass("btn-selected")
    }
    
}

function skillNameFilter(exact = 0) {

    $('.skillFilterBtn').removeClass("btn-selected")    

    var input = document.getElementById('skillNameSearch').value.toUpperCase();

    if (input[0] == "\"") {
        exact = 1;
        if (input[input.length - 1] == "\"") {
            input = input.substring(1, input.length - 1)
        } else {
            input = input.substring(1, input.length)
        }
    }

    if (input != "") {
        // Filter for spell names that match the input
        $('.skillGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var name = $(this).find('.skillName').text().toUpperCase();
                // return true to show, false to hide
                if (exact == 1) {
                    return (name == input)
                } else {
                    return name.indexOf(input) > -1;
                }
            }
        })
    } else {
        $('.skillGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }
    
}

function clearSkillFilter() {
    $("#skillNameSearch").val("")

    skillNameFilter();
}

function skillNameCopy(el) {

    const cpEl = document.createElement('textarea');

    cpEl.value = $(el).siblings(".skillName").html()

    document.body.appendChild(cpEl);
    let cpLink = (location.href.split("#")[0]) + "#skillList?s=" +cpEl.value

    navigator.clipboard.writeText(cpLink)
    
    //document.execCommand('copy');
    document.body.removeChild(cpEl);

    $(".tooltiptext").text("Copied");
    $(".tooltiptext").css("background-color","darkslategrey");
    $(".tooltiptext").css("color","white");

    setTimeout(function(){ 
        $(".tooltiptext").text("Copy Link");    
        $(".tooltiptext").css("background-color","black");
        $(".tooltiptext").css("color","white");
    }, 500)
}



function buildSkills() {
    for (let i = 0; i < skill.length; i++) {


        var $div = $('#defaultSkillCard');

        var $klon = $div.clone().prop('id', 'skill' + i);

        if (i > 0) {
            $div.after($klon.show().removeClass("w3-hide"));
        } else {
            $("#skill" + (i - 1)).after($klon.show().removeClass("w3-hide"));
        }


        $("#skill" + i + " .skillName").html(skill[i]["name"])

      
        $("#skill" + i + " .skillChar").html(skill[i]["char"])

        if (skill[i]["spec"] != "") {
            $("#skill" + i + " .skillTier").text(skill[i]["tier"]+", Grouped")
            $("#skill" + i).addClass("Grouped")
            $("#skill" + i + " .skillSpec").html("<b>Example Specialisations: </b>"+skill[i]["spec"])
        } else {
            $("#skill" + i + " .skillTier").text(skill[i]["tier"])
        }

        $("#skill" + i + " .skillDesc").html(skill[i]["desc"])

        $("#skill" + i).addClass(skill[i]["tier"]+" "+skill[i]["char"])

        $("#skill" + i).addClass("skill-item")

        htmlString = "";

        setTimeout(() => {
            $('.skillGrid').isotope({
                itemSelector: '.skill-item',
                layoutMode: 'vertical',
                getSortData: {
                    name: '.skillName',
                    tier: '.skillTier',
                    char: '.skillChar'
                }
            });
            $('.skillGrid').isotope({
                sortBy: 'name'
            })
            $('skillGrid').isotope('updateSortData').isotope();
        }, 150)


    }
}


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
        "char": "Ag",
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
        "desc": "<p>Charm makes people think favourably of you, your opinions, and proposed actions. Passing an <b>Opposed Charm/Cool Test</b> allows you to influence the behaviour of one or more targets, up to a maximum number equal to your Fellowship Bonus + SL, affecting those with the lowest Willpower first. If a target is amenable to your Charm, the Test will be uncontested.</p> <p>Your GM may permit you to use Charm in Combat if they think your foes might be susceptible to you pleading for your life or making persuasive arguments to stop the violence (although good luck charming a Goblin)!</p> <p>If you use Charm as your Action, calculate the number of targets affected as normal. If you use it to defend, you only affect your attacker. If you succeed, any affected targets will not attack you this round and you gain +1 Advantage as normal. You may do this in successive rounds until you choose to stop or fail a Charm Test, after which your words carry no more weight.</p><p><div class=\"w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Public Speaking</h4> <p>The Charm Skill can be used to make impressive speeches to sway multiple targets to your way of thinking. Assuming they can hear you and are inclined to listen, you can influence up to your Fellowship Bonus + SL targets with a single Charm Test, influencing targets with the lowest Willpower first. If the crowd is unruly, or not receptive to your words, the Test is Opposed by the crowd’s average Willpower (typically 35). A failure shows the crowd is unconvinced.</p> <p>The <em>Public Speaking</em> and <em>Master Orator</em> Talents can significantly increase the number of people you affect with public speaking. An Astounding Failure (-6) (see page 152) in a Charm Test means your crowd quickly becomes an angry mob, with you as the target of their ire…</p> </div></p><p><div class=\"w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Begging</h4> <p>The Charm Skill can be used to beg on the streets. A successful Test will scrounge Fellowship Bonus &times; SL brass pennies per hour from passers-by, with the Difficulty modified by the pitch chosen for begging, and how much sympathy your appearance can elicit. If you score no SL, but still pass the Skill Test, you only manage to scrounge a single pfennig. An Astounding Failure (-6) means you may have attracted problems from the local Watchmen, found some trouble with other, local beggars, or suffer some other significant set-back.</p> <p><b>Note: </b>characters who are caught begging by their peers or associates will likely lose Status unless they are already in the Beggar, or in some other destitute, career.</p> </div></p>"
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
        "desc": "<p>Your ability to handle alcohol without letting it cloud your judgment or render you senseless.</p> <p>After each alcoholic drink make a Consume Alcohol Test, modified by the strength of the drink. For each Test you fail, you suffer a –10 penalty to WS, BS, Ag, Dex, and Int, to a maximum of –30 per Characteristic. After you fail a number of Tests equal to your Toughness Bonus, you are Stinking Drunk. Roll on the following table to see what happens:</p><p> <table class=\"w3-table table-dark w3-striped w3-hoverable w3-bordered\"> <thead> <tr> <th>1d10</th> <th>Stinking Drunk</th> </tr> </thead> <tbody> <tr> <td>1-2</td> <td><b>\'Marienburgher\'s Courage!\': </b>Gain a bonus of +20 to your Cool skill.</td> </tr> <tr> <td>3-4</td> <td><b>\'You\'re my Besht Mate!\': </b>Ignore all your existing <em>Prejudices</em> and <em>Animosities</em> (see page 190).</td> </tr> <tr> <td>5-6</td> <td><b>\'Why\'s Everything Wobbling!\': </b>On your Turn, you can either Move or take an Action, but not both (see page 157).</td> </tr> <tr> <td>7-8</td> <td><b>\'I\'ll Take Yer All On!\': </b>Gain Animostity (Everybody) (see page 190).</td> </tr> <tr> <td>9-10</td> <td><b>\'How Did I Get Here?\': </b>You wake up the next day, massively hungover, with little memory of what transpired. The GM and other players with you will fill in the embarrassing gaps if you investigate. Pass a <b>Consume Alcohol Test</b> or also gain a Poisoned Condition (see page 169).</td> </tr> </tbody> </table> </p> <p>After not drinking for an hour, enact a Challenging (+0) Consume Alcohol Test. The effects of being drunk will wear off after 10–SL hours, with any Characteristic modifiers for being drunk lost over that time. After all effects wear off, enact another Challenging (+0) Consume Alcohol Test. You now gain a hangover, which is an Fatigued Condition that cannot be removed for 5–SL hours.</p> <p>You may expend 1 Resolve point to ignore the negative modifiers of being drunk until the end of the next round (see page 171).</p>"
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
        "char": "Ag",
        "spec": "",
        "desc": "<p>Dodge is your ability to avoid things, through ducking, diving, and moving quickly, and is used extensively to sidestep falling rocks, incoming weapons, unexpected traps, and the like.</p> <p>In combat, Dodge is generally used to resist attacks or avoid damage. Refer to Chapter 5: Rules for more on this.</p>"
    },
    {
        "name": "Drive",
        "tier": "Basic",
        "char": "Ag",
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
        "desc": "<p>Lets you determine the value of rare artefacts, unusual trade goods, and works of art. Everybody is assumed to know the relative worth of general items, but a successful use of the Evaluate allows you to identify the value of curious and unique items. A successful Evaluate Test may also alert you if the goods (or coins) you are studying are counterfeit — this Test will usually be Opposed by the forger’s SL on their Art or Trade Test. Your GM may apply modifiers based on just how rare or obscure the item is, or on your character’s particular expertise or background.</p>"
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
        "desc": "<p>Allows you to coerce or frighten sentient creatures. The precise manner of initiating an Intimidate Test depends on context: while it is generally accompanied by an overt threat, sometimes a subtle implication or even a look is enough. Intimidate is almost always Opposed by your target’s Cool Skill; if successful, you can intimidate a number of targets up to your Strength Bonus + SL. Each will react to Intimidate based on their individual personalities and how successful you were in menacing them, but in all cases, they will back down or move out of the way and will not speak out against you, or they will alternatively accept combat is the only way forward and prepare their weapons.</p> <p>In combat, you cause Fear (see page 190) in all Intimidated targets. You may also use your Intimidate Skill instead of Melee when defending against those afraid of you, causing the Intimidated parties to back away from the fight with your will and posture alone. Further, with your GM’s approval, you may use Intimidate to ‘attack’ such targets, issuing specific commands, such as ‘drop your weapons’ or ‘get out of here!’. However, if you fail any of these subsequent Intimidate Tests, you no longer Intimidate (or cause Fear) in affected opponents. With your GM’s permission you may try to Intimidate them again in a later Round, but this will incur a negative modifier, as they are less likely to fear you having seen through your bravado once already.</p> <p><div class=\"w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Alternative Characteristics</h4> <p>While Strength is the default stat for Intimidate Tests, the GM may decree certain situations may allow you to use a different Characteristic: a steely witch hunter may use Willpower to stare down an inquisitive bystander, or an academic may use Intelligence to cow a lowly student with his intimidating knowledge, for instance.</p> </div></p>"
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
        "desc": "<p>The Language Skill grants you access to extra languages beyond your native tongue. All characters are automatically assumed to be able to speak ‘Reikspiel’ &mdash; the language of the Empire &mdash; and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set in the Empire, replace Reikspiel with the local language.</p> <p>If you possess a Language Skill, you are generally able to make yourself understood in that language, or to understand simple concepts. You will be asked to Test your Language Skill when a particularly difficult concept must be conveyed, or an obscure dialect or vocabulary is employed.</p> <p><b>Note:</b> Language (Magick) is used to cast spells and may occasionally be Tested, with… unpleasant consequences if failed. Refer to Chapter 8: Magic, for more on this.</p><p><div class=\"w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Options: Battle Tongue</h4> <p>Battle Tongue represents a series of simple commands and gestures that may be made in the heat of combat. Players with Language (Battle Tongue) may communicate briefly with one another during combat without penalty. Those without the Skill cannot quickly coordinate their attacks or discuss strategy once combat begins.</p> </div></p>"
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
        "desc": "<p>The Outdoor Survival Skill is used to survive in the wild, including the ability to fish, hunt, forage, and build fires and shelters. Experienced travellers are skilled at reading the signs of incoming inclement weather and finding the spoor of various dangerous beasts.</p> <p>When camping, make an Outdoor Survival Test, modified by the harshness of conditions — for instance, a Test is <b>Challenging (+0)</b> if it is raining, <b>Hard (–20)</b> in a storm. A successful Test indicates you can provide yourself sustenance and shelter for the night. Each SL allows you to provide for one more character. If the Test is failed, you must make a <b>Challenging (+0) Endurance Test</b> or receive the <em>Fatigued</em> Condition. If you suffer an Astounding Failure, something untoward has happened, as determined by the GM; perhaps your camp is attacked in the night?</p> <p>When fighting in the wilderness, you may make an Outdoor Survival Test to receive +1 Advantage, in the same way as Intuition, to a maximum number of Advantage equal to your Intelligence Bonus, as you spy out treacherous and advantageous terrain that you can best use to your advantage.</p> <p><div class=\"w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Options: Gathering Food and Herbs</h4> <p> Gathering food or herbs normally takes around 2 hours. Hunting and foraging parties make one Assisted Outdoor Survival Test for the group, with the Difficulty determined by the circumstances. <ul> <li>Foraging: A success grants enough food for one character. Every SL yields sufficient extra food for one more person.</li> <li>Hunting and Fishing: If you have appropriate bows, spears, fishing rods, or nets, a successful Test feeds two people, and an extra two people per SL.</li> <li>Trapping: Use the Set Trap Skill to place Animal traps (see page 303). Feeds the same number of people as Hunting and Fishing.</li> <li>Lore (Herbs): If you are instead gathering herbs using Lore (Herbs), a success gathers enough for a dose of the sought herb (see page 307), with each SL adding an extra dose. Gathering tests are modified by herb Availability: Common (0), Scarce (–10), Rare (–20), or Exotic (–30).</li> </ul> </p></div></p>"
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
        "char": "Ag",
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
        "desc": "Your ability to make music with an instrument, hopefully well enough to impress others. A successful Play Test lets you entertain those near enough to see and hear you; the SL indicates the quality of the piece played."
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
        "char": "Ag",
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
        "char": "Ag",
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
        "desc": "<p>Lets you pick pockets, palm objects, and perform minor tricks of prestidigitation, as well as cheating with games of chance. This Skill is typically Opposed by the Perception Skill of your target; success means you have palmed the object, picked the pocket, or swapped the cards, while a Marginal Success (+0 to +1) may suggest that your nefarious misdeeds have left your opponent suspicious.</p> <p>You can also use Sleight of Hand to ‘help’ your Gamble Skill when playing appropriate games of chance. Before any round (or similar, depending upon the game at hand) you can attempt a <b>Sleight of Hand Test</b> (which will be opposed if others suspect). If successful, you may reverse your Gamble Test for the round if this will score a Success. If failed, your opponents may not be best pleased…</p> <p>Sleight of Hand and combat rarely mix, though inventive players may be able to conjure an impressive distraction with GM approval, perhaps even gaining Advantage by making a Dagger seemingly appear from nowhere, surprising a superstitious foe.</p>"
    },
    {
        "name": "Stealth",
        "tier": "Basic",
        "char": "Ag",
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


function talentFilter(char, input) {
    let $this = $(input)

    if ($this.hasClass("btn-selected")){        
        $this.removeClass("btn-selected")

        $(".talentGrid").isotope({filter: '*'})

    } else {

        $('.talentFilterBtn').removeClass("btn-selected")

        $("#talentNameSearch").val("")
    
        let filterText = "."+char;
    
        $(".talentGrid").isotope({filter: filterText})
    
        $this.addClass("btn-selected")
    }
    
}

function talentNameFilter(exact = 0) {

    $('.talentFilterBtn').removeClass("btn-selected")    

    var input = document.getElementById('talentNameSearch').value.toUpperCase();

    if (input[0] == "\"") {
        exact = 1;
        if (input[input.length - 1] == "\"") {
            input = input.substring(1, input.length - 1)
        } else {
            input = input.substring(1, input.length)
        }
    }

    if (input != "") {
        // Filter for spell names that match the input
        $('.talentGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var name = $(this).find('.talentName').text().toUpperCase();
                // return true to show, false to hide
                if (exact == 1) {
                    return (name == input)
                } else {
                    return name.indexOf(input) > -1;
                }
            }
        })
    } else {
        $('.talentGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }
    
}

function clearTalentFilter() {
    $("#talentNameSearch").val("")

    talentNameFilter();
}

function talentNameCopy(el) {

    const cpEl = document.createElement('textarea');

    cpEl.value = $(el).siblings(".talentName").html()

    document.body.appendChild(cpEl);
    let cpLink = (location.href.split("#")[0]) + "#talentList?s=" +cpEl.value

    navigator.clipboard.writeText(cpLink)
    
    //document.execCommand('copy');
    document.body.removeChild(cpEl);

    $(".tooltiptext").text("Copied");
    $(".tooltiptext").css("background-color","darkslategrey");
    $(".tooltiptext").css("color","white");

    setTimeout(function(){ 
        $(".tooltiptext").text("Copy Link");    
        $(".tooltiptext").css("background-color","black");
        $(".tooltiptext").css("color","white");
    }, 500)
}



function buildTalents() {
    for (let i = 0; i < talent.length; i++) {


        var $div = $('#defaultTalentCard');

        var $klon = $div.clone().prop('id', 'talent' + i);

        if (i > 0) {
            $div.after($klon.show().removeClass("w3-hide"));
        } else {
            $("#talent" + (i - 1)).after($klon.show().removeClass("w3-hide"));
        }


        $("#talent" + i + " .talentName").html(talent[i]["name"])

      
        $("#talent" + i + " .talentMax").html(talent[i]["max"])

        //$("#talent" + i).addClass(talent[i]["max"])

        if (talent[i]["test"] != "") {
            $("#talent" + i + " .talentTest").html("<b class=\"w3-tooltip TooltipLight\">Test:<span class=\"w3-text w3-tag w3-darkslate-l1 w3-small w3-round\" style=\"position:absolute;left:0;bottom:18px; padding: 1em;\">Gain +1 SL on successful tests with this skill</span></b> "+talent[i]["test"])
        }

        $("#talent" + i + " .talentDesc").html(talent[i]["desc"])

        $("#talent" + i).addClass("talent-item")

        htmlString = "";

        setTimeout(() => {
            $('.talentGrid').isotope({
                itemSelector: '.talent-item',
                layoutMode: 'vertical',
                getSortData: {
                    name: '.talentName',
                }
            });
            $('.talentGrid').isotope({
                sortBy: 'name',
                sortAscending: true
            })
            $('talentGrid').isotope('updateSortData').isotope();
        }, 150)


    }
}

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
        "desc": "<p>You are at home in shadowy backstreets. When using Stealth (Urban), you may reverse the dice of any failed Test if this will score a Success.</p>"
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
    }
]