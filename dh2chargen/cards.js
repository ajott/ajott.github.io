function navHome() {
    $("#path").animate({
        opacity: 0
    }, 500);
    $("#path").hide();
    $("#homeSelect").show();
    $("#homeSelect").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navBack() {
    $("#homeSelect").animate({
        opacity: 0
    }, 500);
    $("#homeSelect").hide();
    $("#backSelect").show();
    $("#backSelect").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navRole() {
    $("#backSelect").animate({
        opacity: 0
    }, 500);
    $("#backSelect").hide();
    $("#roleSelect").show();
    $("#roleSelect").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navChars() {
    $("#roleSelect").animate({
        opacity: 0
    }, 500);
    $("#roleSelect").hide();
    $("#charRoll").show();
    $("#charRoll").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navApts() {
    $("#charRoll").animate({
        opacity: 0
    }, 500);
    $("#charRoll").hide();
    $("#aptSelect").show();
    $("#aptSelect").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navTalents() {
    $("#aptSelect").animate({
        opacity: 0
    }, 500);
    $("#aptSelect").hide();
    $("#talentSelect").show();
    $("#talentSelect").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navEquip() {
    $("#talentSelect").animate({
        opacity: 0
    }, 500);
    $("#talentSelect").hide();
    $("#equipSelect").show();
    $("#equipSelect").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navSkills() {
    $("#equipSelect").animate({
        opacity: 0
    }, 500);
    $("#equipSelect").hide();
    $("#skillSelect").show();
    $("#skillSelect").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navWounds() {
    $("#skillSelect").animate({
        opacity: 0
    }, 500);
    $("#skillSelect").hide();
    $("#woundSelect").show();
    $("#woundSelect").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navSheet() {
    $("#woundSelect").animate({
        opacity: 0
    }, 500);
    $("#woundSelect").hide();
    $("#charSheet").show();
    $("#charSheet").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navFromMenuToSheet() {
    $("#path").animate({
        opacity: 0
    }, 500);
    $("#path").hide();
    $("#charSheet").show();
    $("#charSheet").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function chooseHome(str) {
    character.homeworld = str;
    navBack();

    character.HomeBonus = homeworlds[character["homeworld"]]["bonus"]
    character.CharPlus = homeworlds[character["homeworld"]]["charPlus"].slice(0);
    character.CharMinus = homeworlds[character["homeworld"]]["charMinus"];

    character.Fate = homeworlds[character["homeworld"]]["fate"]

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
}

function chooseBack(str) {
    character.background = str;
    character.BackBonus = backgrounds[character["background"]]["bonus"]
    navRole();
}

function chooseRole(str) {
    character.role = str;
    character.RoleBonus = roles[character["role"]]["bonus"]
    navChars();
}

function finishChars() {
    getFullApts();
    $("select").addClass("w3-round");
    navApts();
}

function finishApts() {

    var aptsUnique = character.Aptitudes.filter(function (item, index) {
        return character.Aptitudes.indexOf(item) >= index;
    });

    character.Aptitudes = aptsUnique.slice(0, 12);

    buildTalentCard();

    $("select").addClass("w3-round");

    navTalents();
}

function finishTalents() {

    buildEquipCard();

    $("select").addClass("w3-round");

    navEquip();
}

function finishEquip() {
    buildSkills();

    navSkills();
}

function finishSkills() {
    buildWounds();

    navWounds();
}

function finishWounds() {
    buildSheet();

    navSheet();
}

function cardRollChars() {

    $("#btnCardRoll").hide();
    $("#btnCharNext").show();

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

    character.Fatigue = fatigue;

    // Movement is dependent upon the character's AgB (ten's place of their Agility)
    character.Movement[0] = Math.floor(character.Ag / 10);
    character.Movement[1] = Math.floor(character.Ag / 10) * 2;
    character.Movement[2] = Math.floor(character.Ag / 10) * 3;
    character.Movement[3] = Math.floor(character.Ag / 10) * 6;

    // Uses those carry weights from earlier.
    // This is determined by the character's SB + TB
    character.Carry = carry[(Math.floor(character.S / 10) + Math.floor(character.T / 10))]
}

function getFullApts() {
    // Builds (or re-builds) the character's aptitudes from their
    // homeworld, background, and role
    character.Aptitudes = ["General"];
    character.Aptitudes.push(homeworlds[character.homeworld]["aptitude"]);
    character.Aptitudes.push(backgrounds[character.background]["aptitude"]);
    character.Aptitudes = character.Aptitudes.concat(roles[character.role]["aptitudes"]);

    let Aptitudes = ["Weapon Skill", "Ballistic Skill", "Strength", "Toughness", "Agility", "Intelligence", "Perception", "Willpower", "Fellowship", "Offense", "Defense", "Fieldcraft", "Social", "Knowledge", "Leadership", "Tech", "Finesse", "Psyker"]

    var aptsUnique = character.Aptitudes.filter(function (item, index) {
        return character.Aptitudes.indexOf(item) >= index;
    });

    character.Aptitudes = aptsUnique;

    Aptitudes = Aptitudes.filter(function(val) {
        return character.Aptitudes.indexOf(val) == -1;
    });

    Aptitudes = Aptitudes.sort();

    // Starting with an empty string for the inner HTML of the aptitude table
    let htmlStr = ""

    for (let i = 0; i < character.Aptitudes.length; i++) {
        htmlStr = ""

        let str = character.Aptitudes[i];

        // If the aptitude includes a choice (the aforementioned "ZZ")
        if (str.search("ZZ") != -1) {

            // Build a dropdown box for the user to choose
            htmlStr += "<select id=\"aptBox_" + i + "\" onchange=\"aptChange(\'aptBox_" + i + "\')\"><option value=\"\">...</option><option>" + str.slice(0, str.search("ZZ") - 1) + "</option><option>" + str.slice(str.search("ZZ") + 3, str.length) + "</option></select>"

        } else {
            // Otherwise, just add it to the table

            htmlStr += str;

        };

        el("aptBox_" + i).innerHTML += htmlStr;
    }

    for (let i = character.Aptitudes.length; i < 12; i ++) {
        htmlStr = ""

        htmlStr += "<tr><td>"
        htmlStr += "<select id=\"aptBox_" + (i) + "\" onchange=\"aptChange(\'aptBox_" + (i) + "\')\">"
        htmlStr += "<option value=\"\">...</option>"

        for (let i = 0; i < Aptitudes.length; i++) {
            htmlStr += "<option value=\"" + Aptitudes[i] + "\">" + Aptitudes[i] + "</option>"
        }

        htmlStr += "</select>"
        htmlStr += "</td></tr>"

        el("aptBox_" + i).innerHTML += htmlStr;
    }
}


function aptChange(str) {
    var selectBox = el(str);

    var index = str.substring(str.search("_") + 1, str.length);

    var apt = selectBox.options[selectBox.selectedIndex].value;

    character.Aptitudes[index] = apt;
}

function buildTalentCard() {
    character.Talents = [];

    character.Talents.push(homeworlds[character.homeworld]["talent"]);

    if (character.Talents[0] == null) {
        character.Talents.shift();
    }

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
            htmlStr += "<select id=\"talent_" + i + "\" onchange=\"talChange(\'talent_" + i + "\')\"><option>...</option><option>" + str.slice(0, str.search("ZZ") - 1) + "</option><option>" + str.slice(str.search("ZZ") + 3, str.length) + "</option></select>"

            htmlStr += "</td><td id=\"talent_tier_" + i + "\"></td><td id=\"talent_desc_" + i + "\"></td></tr>"
        } else {
            // Otherwise, just add it to the table
            htmlStr += "<tr><td id=\"talent_" + i + "\">";

            htmlStr += str;

            htmlStr += "</td><td id=\"talent_tier_" + i + "\">"

            htmlStr += talents[str]["tier"];

            htmlStr += "</td><td id=\"talent_desc_" + i + "\">"

            htmlStr += talents[str]["description"]

            htmlStr += "</td></tr>"
        };
    }

    el("talentTable").innerHTML = htmlStr;
}

function talChange(str) {
    var selectBox = el(str);
    var index = str.substring(str.search("_") + 1, str.length);
    var tal = selectBox.options[selectBox.selectedIndex].value;
    character.Talents[index] = tal;

    el("talent_tier_" + index).innerHTML = talents[tal]["tier"];

    el("talent_desc_" + index).innerHTML = talents[tal]["description"];
}

function buildEquipCard() {
    character.Equip = [];

    character.Equip = character.Equip.concat(backgrounds[character.background]["equipment"]);

    // Starting with an empty string for the inner HTML of the talent table
    let htmlStr = ""

    for (let i = 0; i < character.Talents.length; i++) {
        if (character.Talents[i].search("Use") >= 0 || character.Talents[i].search("Training") >= 0) {
            htmlStr = ""

            htmlStr += "<tr><td>";

            htmlStr += character.Talents[i];

            htmlStr += "</td></tr>";

            el("equipTalentTable").innerHTML += htmlStr;
        }
    }

    htmlStr = ""

    for (let i = 0; i < character.Equip.length; i++) {

        let str = character.Equip[i];

        // If the talent includes a choice (the aforementioned "ZZ")
        if (str.search("ZZ") != -1) {
            htmlStr += "<tr><td>";

            // Build a dropdown box for the user to choose
            htmlStr += "<select id=\"equip_" + i + "\" onchange=\"equipChange(\'equip_" + i + "\')\"><option>...</option><option>" + str.slice(0, str.search("ZZ") - 1) + "</option><option>" + str.slice(str.search("ZZ") + 3, str.length) + "</option></select>"

            htmlStr += "</td><td id=\"equip_desc_" + i + "\"></td><td id=\"equip_wt_" + i + "\"></td></tr>"
        } else {
            // Otherwise, just add it to the table
            htmlStr += "<tr><td id=\"equip_" + i + "\">";

            htmlStr += str;

            htmlStr += "</td><td id=\"equip_desc_" + i + "\">"

            htmlStr += equipment[str]["description"];

            htmlStr += "</td><td id=\"equip_wt_" + i + "\">"

            htmlStr += equipment[str]["weight"];

            htmlStr += "</td></tr>"
        };
    }

    el("equipTable").innerHTML = htmlStr;
}

function equipChange(str) {
    var selectBox = el(str);
    var index = str.substring(str.search("_") + 1, str.length);
    var equip = selectBox.options[selectBox.selectedIndex].value;
    character.Equip[index] = equip;

    el("equip_desc_" + index).innerHTML = equipment[equip]["description"];

    el("equip_wt_" + index).innerHTML = equipment[equip]["weight"];
}

function buildWounds() {
    $("#baseWounds").text(homeworlds[character["homeworld"]]["wounds"])
    $("#baseFate").text(homeworlds[character["homeworld"]]["fate"])
    $("#empBlessing").text(homeworlds[character["homeworld"]]["blessing"])
}

function rollWounds() {
    let extra = roll("1d5");
    character.Wounds += homeworlds[character["homeworld"]]["wounds"] + extra;
    $("#rollWounds").text("Rolled " + extra).addClass("w3-disabled").addClass("w3-light-grey").removeClass("w3-red")
    $("#totalWounds").text(character.Wounds)
}

function rollFate() {
    let extra = roll("1d10");
    if (extra >= homeworlds[character["homeworld"]]["blessing"]) {
        character.Fate += 1;
        $("#rollFate").addClass("w3-green").removeClass("w3-red");
    }
    $("#rollFate").text("Rolled " + extra).addClass("w3-disabled")
    $("#totalFate").text(character.Fate)
}

function buildSkills() {
    character.Skills = [];

    character.Skills = character.Skills.concat(backgrounds[character["background"]]["skills"]);


    // Starting with an empty string for the inner HTML of the talent table
    let htmlStr = ""

    for (let i = 0; i < character.Skills.length; i++) {

        let str = character.Skills[i];

        // If the talent includes a choice (the aforementioned "ZZ")
        if (str.search("ZZ") != -1) {
            htmlStr += "<tr><td>";

            // Build a dropdown box for the user to choose
            htmlStr += "<select id=\"skill_" + i + "\" onchange=\"skillChange(\'skill_" + i + "\')\"><option>...</option><option>" + str.slice(0, str.search("ZZ") - 1) + "</option><option>" + str.slice(str.search("ZZ") + 3, str.length) + "</option></select>"

            htmlStr += "</td><td id=\"skill_desc_" + i + "\"></td></tr>"
        } else {
            // Otherwise, just add it to the table
            htmlStr += "<tr><td id=\"skill_" + i + "\">";

            htmlStr += str;

            htmlStr += "</td><td id=\"skill_desc_" + i + "\">"

            for (let j = 0; j < Object.keys(skills).length; j++) {
                if (str.search(Object.keys(skills)[j]) >= 0) {
                    htmlStr += skills[Object.keys(skills)[j]]["description"];
                }
            }

            htmlStr += "</td></tr>"
        };
    }

    el("skillTable").innerHTML = htmlStr;
}

function skillChange(str) {
    var selectBox = el(str);
    var index = str.substring(str.search("_") + 1, str.length);
    var skill = selectBox.options[selectBox.selectedIndex].value;
    character.Skills[index] = skill;

    for (let j = 0; j < Object.keys(skills).length; j++) {
        if (skill.search(Object.keys(skills)[j]) >= 0) {
            let desc = skills[Object.keys(skills)[j]]["description"];
            el("skill_desc_" + index).innerHTML = desc;
        }
    }
}


function buildSheet() {
    let htmlStr = ""

    $("#exportText").val("")

    $("#sheetHome").text(homeworlds[character["homeworld"]]["name"]);
    $("#sheetBack").text(backgrounds[character["background"]]["name"]);
    $("#sheetRole").text(roles[character["role"]]["name"]);

    // Wounds, fate, fatigue, movement, carry

    $("#sheetWounds").text(character.Wounds);
    $("#sheetFatigue").text(character.Fatigue);
    $("#sheetFate").text(character.Fate);
    $("#sheetMove").text(character.Movement[0]+"/"+character.Movement[1]+"/"+character.Movement[2]+"/"+character.Movement[3]+" metres (Half/Full/Charge/Run)")
    $("#sheetCarry").text(character.Carry + "kg");

    // Characteristics
    $("#sheetWS").text(character.WS);
    $("#sheetBS").text(character.BS);
    $("#sheetS").text(character.S);
    $("#sheetT").text(character.T);
    $("#sheetAg").text(character.Ag);
    $("#sheetInt").text(character.Int);
    $("#sheetPer").text(character.Per);
    $("#sheetWP").text(character.WP);
    $("#sheetFel").text(character.Fel);
    $("#sheetInfl").text(character.Infl);

    for (let i = 0; i < character.Skills.length; i ++) {
        htmlStr = ""

        htmlStr += "<tr><td>"

        htmlStr += character.Skills[i]

        htmlStr += "</td></tr>"

        $("#sheetSkills:last-child").append(htmlStr)
    }

    for (let i = 0; i < character.Talents.length; i ++) {
        htmlStr = ""

        htmlStr += "<tr><td>"

        htmlStr += character.Talents[i]

        htmlStr += "</td></tr>"

        $("#sheetTalents:last-child").append(htmlStr)
    }

    for (let i = 0; i < character.Aptitudes.length; i ++) {
        htmlStr = ""

        htmlStr += "<tr><td>"

        htmlStr += character.Aptitudes[i]

        htmlStr += "</td></tr>"

        $("#sheetApts:last-child").append(htmlStr)
    }

    for (let i = 0; i < character.Equip.length; i ++) {
        htmlStr = ""

        htmlStr += "<tr><td>"

        htmlStr += character.Equip[i]

        htmlStr += "</td><td>"

        htmlStr += equipment[character["Equip"][i]]["weight"]

        htmlStr += "</td></tr>"

        $("#sheetEquip:last-child").append(htmlStr)
    }
    
}