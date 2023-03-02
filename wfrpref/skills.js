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




$(function() {
    $("#skillDialog").dialog({
      autoOpen: false,
      resizable: false,
      height: "auto",
      width: "auto",
      modal: true,
      buttons: {
        "Take me there": function() {
          outSkillSearch(this);
        },
        Close: function() {
            $(this).dialog("close");
          }
      }
    });
    $("skill").click(function() {

        let srchRslt = skillFuse.search(this.innerHTML)
        buildSkillLite(srchRslt[0]["item"])
        
      $("#skillDialog").dialog("open");
    });
  });


  $(function() {
    $("#talentDialog").dialog({
      autoOpen: false,
      resizable: false,
      height: "auto",
      width: "auto",
      modal: true,
      buttons: {
        "Take me there": function() {            
          outTalentSearch($("#talentDialog .talentName").html());
        },
        Close: function() {
            $(this).dialog("close");
          }
      }
    });
    $("talent").click(function() {

        let srchRslt = talentFuse.search(this.innerHTML)
        buildTalentLite(srchRslt[0]["item"])
        
      $("#talentDialog").dialog("open");
    });
  });





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
    let cpLink = (location.href.split("#")[0]) + "#skillList?s=" + encodeURIComponent(cpEl.value)

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

function buildSkillLite(skillSearch) {

        $("#skillDialog" + " .skillName").html(skillSearch["name"])

      
        $("#skillDialog" + " .skillChar").html(skillSearch["char"])

        if (skillSearch["spec"] != "") {
            $("#skillDialog" + " .skillTier").text(skillSearch["tier"]+", Grouped")
            $("#skillDialog").addClass("Grouped")
            $("#skillDialog" + " .skillSpec").html("<b>Example Specialisations: </b>"+skillSearch["spec"])
        } else {
            $("#skillDialog" + " .skillTier").text(skillSearch["tier"])
        }

        $("#skillDialog" + " .skillDesc").html(skillSearch["desc"])
        

        $("#skillDialog").addClass(skillSearch["tier"]+" "+skillSearch["char"])

        $("#skillDialog").addClass("skill-item")

}

function buildTalentLite(talentSearch) {
    $("#talentDialog .talentName").html(talentSearch["name"])

      
    $("#talentDialog .talentMax").html(talentSearch["max"])

    if (talentSearch["test"] != "") {
       $("#talentDialog .talentTest").html("<b class=\"w3-tooltip TooltipLight\">Test:<span class=\"w3-text w3-tag w3-darkslate-l1 w3-small w3-round\" style=\"position:absolute;left:0;bottom:18px; padding: 1em;\">Gain +1 SL on successful tests with this skill</span></b> "+talentSearch["test"])
    }

    $("#talentDialog .talentDesc").html(talentSearch["desc"])

    $("#talentDialog").addClass("talent-item")
}



function buildSkills() {
    for (let i = 0; i < skill.length; i++) {


        var $div = $('#defaultSkillCard');

        var $klon = $div.clone().prop('id', 'skill' + i);

        if (i == 1) {
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
        
        $("#skill" + i + " .skillID").html(i);

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
                    char: '.skillChar',
                    ID: function(itemElem) {
                        let skill_ID = $(itemElem).find('.skillID').text();
                        return parseInt(skill_ID)
                    }
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
        
        $("#talentTestSearch").val("")
    
        let filterText = "."+char;
    
        $(".talentGrid").isotope({filter: filterText})
    
        $this.addClass("btn-selected")
    }
    
}

function talentNameFilter(exact = 0) {

    $('.talentFilterBtn').removeClass("btn-selected")
        
    $("#talentTestSearch").val("")

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

function talentTestFilter(exact = 0) {

    $('.talentFilterBtn').removeClass("btn-selected")   

    $("#talentNameSearch").val("") 

    var input = document.getElementById('talentTestSearch').value.toUpperCase();

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
                var name = $(this).find('.talentTest').text().toUpperCase();
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
    $("#talentTestSearch").val("")

    talentNameFilter();
}

function talentNameCopy(el) {

    const cpEl = document.createElement('textarea');

    cpEl.value = $(el).siblings(".talentName").html()

    document.body.appendChild(cpEl);
    let cpLink = (location.href.split("#")[0]) + "#talentList?s=" + encodeURIComponent(cpEl.value)

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

        if (i == 1) {
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
        }, 250)


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
        "desc": "<p>You have dedicated your pain to the service of your God. Each day, you must spend half a bell (half an hour) praying as you maintain a number of Wounds suffered equal to your level in Flagellent. Until you next sleep, if you have the <talent>Frenzy</talent> Talent you may enter Frenzy immediately without testing.</p> <p>The <talent>Frenzy</talent> Talent is added to the Talent list of any career you are in. Should you fail to flagellate yourself on any given day, or allow your castigated flesh to be healed, you may not spend any Resilience or Resolve until you flagellate yourself again.</p>"
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
        "name": "Hunter\'s Eye",
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
        "desc": "<p>Your rousing words and pleas can turn the tide of a battle. Refer to the following table to see how many people you can now influence with your Leadership Skill (see page 126) when at war.</p><p><table class=\"w3-table table-dark w3-striped w3-hoverable w3-bordered\"> <thead> <tr> <th>Talent Taken</th> <th>Number of soldiers influenced</th> </tr> </thead> <tbody> <tr> <td>1</td> <td>As normal &times; 5</td> </tr> <tr> <td>2</td> <td>As normal &times; 10</td> </tr> <tr> <td>3</td> <td>As normal &times; 20</td> </tr> <tr> <td>4</td> <td>As normal &times; 50</td> </tr> <tr> <td>5</td> <td>As normal &times; 100</td> </tr> <tr> <td>6</td> <td>As normal &times; 200</td> </tr> <tr> <td>7</td> <td>As normal &times; 500</td> </tr> <tr> <td>8</td> <td>As normal &times; 1000</td> </tr> <tr> <td>9</td> <td>All who can hear your inspiring voice</td> </tr> </tbody> </table></p><p><div class=\"w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue\"> <h4>Example</h4> <p>Abbess Birgitte van der Hoogenband’s monastery is under attack by Greenskins, and things are going badly. So, she decides to bolster her soldiers’ spirits with a Leadership Test, granting them +10 to all Psychology Tests. Her Leadership Test scores 3 SL. Given she has a Fellowship Bonus of 6, and she can influence her Fellowship Bonus + SL of her soldiers using Leadership, she bolsters 9 soldiers. However, as she has Inspiring 3, that number is multiplied by 20, meaning 180 of her soldiers take heart from her screamed encouragement to, ‘HOLD THE LINE!’</p></div></p>"
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
        "desc": "<p>You are blessed by one of the Gods and can empower one of your Cult’s Miracles. Further, you may purchase extra miracles for 100 XP per miracle you currently know. So, if you already know 3 miracles, your next miracle costs 300 XP to purchase. Full rules for learning new miracles are provided in Chapter 7: Religion and Belief. Under normal circumstances, you may not learn more than one Invoke (Divine Lore) Talent. Further, you may not learn the <talent>Petty Magic</talent> or <talent>Arcane Magic</talent> Talents when you have the Invoke Talent. You can unlearn this Talent for 100 XP, but will lose all of your miracles if you do so, and will also garner the extreme disfavour of your God, with effects determined by your GM.</p>"
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
        "desc": "<p>You have earned an air of respectability despite your nefarious ways. You may ignore the Status loss of the <talent>Criminal</talent> Talent.</p>"
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
        "desc": "<p>You are resistant to magic. The SL of any spell affecting you is reduced by 2 per point you have in this Talent. The SL of a spell is only modified by the highest Magic Resistance Talent within its target area. Further, you may never learn the <talent>Arcane Magic</talent>, <talent>Bless</talent>, <talent>Invoke</talent>, <talent>Petty Magic</talent>, or <talent>Witch!</talent> Talents.</p>"
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
        "desc": "<p>You are exceptionally learned, and have a significant degree of specialised knowledge in a single field of study. You automatically know a number of pieces of correct information equal to you Savant (Lore) level about a relevant issue without having to test your Lore Skill. Testing, as always, will provide yet more information as normal as determined by the GM.</p>"
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
        "desc": "<p>You have learned magic through trial and error. Add <skill>Language (Magick)</skill> to any Career you enter; if it is already in your Career, you may purchase the Skill for 5 XP fewer per Advance. Further, you may spend 1 Resilience point to immediately cast any spell as if it were one of your Arcane Lore spells; you also instantly memorise that spell as one of your Arcane Lore spells for 0 XP. You can do this a number of times equal to your level in this Talent.</p>"
    }
]