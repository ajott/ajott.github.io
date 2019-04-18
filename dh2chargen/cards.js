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

function navDiv() {
    $("#woundSelect").animate({
        opacity: 0
    }, 500);
    $("#woundSelect").hide();
    $("#divSelect").show();
    $("#divSelect").animate({
        opacity: 1
    }, 500);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function navSheet() {
    $("#divSelect").animate({
        opacity: 0
    }, 500);
    $("#divSelect").hide();
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
    character.Wounds = homeworlds[character["homeworld"]]["wounds"]
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
    navDiv();
}

function finishDiv() {
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

    let Aptitudes = ["Weapon Skill", "Ballistic Skill", "Strength", "Toughness", "Agility", "Intelligence", "Perception", "Willpower", "Fellowship", "Offense", "Defense", "Fieldcraft", "Social", "Knowledge", "Leadership", "Tech", "Finesse", "Psyker"].sort()

    var aptsUnique = character.Aptitudes.filter(function (item, index) {
        return character.Aptitudes.indexOf(item) >= index;
    });

    character.Aptitudes = aptsUnique;

    character.Aptitudes = character.Aptitudes.sort()

    Aptitudes = Aptitudes.filter(function (val) {
        return character.Aptitudes.indexOf(val) == -1;
    });


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

        el("aptTd_" + i).innerHTML += htmlStr;
    }

    for (let i = character.Aptitudes.length; i < 8; i++) {
        htmlStr = ""

        htmlStr += "<tr><td>"
        htmlStr += "<select id=\"aptBox_" + (i) + "\" onchange=\"aptChange(\'aptBox_" + (i) + "\')\">"
        htmlStr += "<option value=\"\">...</option>"

        for (let i = 0; i < Aptitudes.length; i++) {
            htmlStr += "<option value=\"" + Aptitudes[i] + "\">" + Aptitudes[i] + "</option>"
        }

        htmlStr += "</select>"
        htmlStr += "</td></tr>"

        el("aptTd_" + i).innerHTML += htmlStr;
    }
}


function aptChange(str) {
    var selectBox = el(str);

    var index = str.substring(str.search("_") + 1, str.length);

    var apt = selectBox.options[selectBox.selectedIndex].value;

    character.Aptitudes[index] = apt;

    let numOrs = 0;

    for (let i = 0; i < character.Aptitudes.length; i++) {
        if (character.Aptitudes[i].search("ZZ") >= 0) {
            numOrs += 1;
        }
    }

    if (numOrs == 0) {
        $("#btnAptNext").show();
    }
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

    let numOrs = 0;

    for (let i = 0; i < character.Talents.length; i++) {
        if (character.Talents[i].search("ZZ") >= 0) {
            numOrs += 1;
        }
    }

    if (numOrs == 0) {
        $("#btnTalNext").show();
    }
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

    let numOrs = 0;

    for (let i = 0; i < character.Equip.length; i++) {
        if (character.Equip[i].search("ZZ") >= 0) {
            numOrs += 1;
        }
    }

    if (numOrs == 0) {
        $("#btnEquipNext").show();
    }
}

function buildWounds() {
    $("#baseWounds").text(homeworlds[character["homeworld"]]["wounds"])
    $("#baseFate").text(homeworlds[character["homeworld"]]["fate"])
    $("#empBlessing").text(homeworlds[character["homeworld"]]["blessing"])
}

var rolledWounds = false;

function rollWounds() {
    let extra = roll("1d5");
    character.Wounds += extra;
    $("#rollWounds").text("Rolled " + extra).addClass("w3-disabled").addClass("w3-light-grey").removeClass("w3-red").attr("onclick", "")
    $("#totalWounds").text(character.Wounds)

    rolledWounds = true;

    if (rolledFate && rolledWounds) {
        $("#btnWoundNext").show();
    }
}

var rolledFate = false;

function rollFate() {
    let extra = roll("1d10");
    if (extra >= homeworlds[character["homeworld"]]["blessing"]) {
        character.Fate += 1;
        $("#rollFate").addClass("w3-green").removeClass("w3-red");
    }
    $("#rollFate").text("Rolled " + extra).addClass("w3-disabled").attr("onclick", "")
    $("#totalFate").text(character.Fate)

    rolledFate = true;

    if (rolledFate && rolledWounds) {
        $("#btnWoundNext").show();
    }
}

function buildSkills() {
    character.Skills = [];

    character.Skills.push(homeworlds[character["homeworld"]]["skill"]);

    if (character.Skills[0] == null) {
        character.Skills.shift();
    }

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

    let numOrs = 0;

    for (let i = 0; i < character.Skills.length; i++) {
        if (character.Skills[i].search("ZZ") >= 0) {
            numOrs += 1;
        }
    }

    if (numOrs == 0) {
        $("#btnSkillNext").show();
    }
}


function rollDivination() {
    $("#rollDiv").addClass("w3-disabled").attr("onclick", "");

    var divRoll = roll("1d100");

    $("#divRoll").text(divRoll);

    for (let i = 0; i < Object.keys(divinations).length; i++) {

        if (inRangeInclusive(divRoll, Object.keys(divinations)[i])) {
            let divName = divinations[Object.keys(divinations)[i]]["name"]

            $("#divName").text(divName);

            let divText = divinations[Object.keys(divinations)[i]]["desc"]
            $("#divText").text(divText);

            character.Divination = divName + ": " + divText;
        }
    }

    $("#btnDivNext").show();
}

function addMelee() {

    for (let i = 0; i < character.Equip.length; i++) {
        for (let j = 0; j < Object.keys(meleeWeapons).length; j++) {
            //console.log(character.Equip[i].search(Object.keys(meleeWeapons)[j]))

            if (character.Equip[i].search(Object.keys(meleeWeapons)[j]) != -1) {
                var $div = $('#defaultMeleeWeapon');

                var $klon = $div.clone().prop('id', 'melee' + i);

                if ($("#melee" + (i - 1)).length === 0) {
                    $div.after($klon.show());
                } else {
                    $("#melee" + (i - 1)).after($klon.show());
                }

                $("#melee" + i).children().children().children(".weaponName").text(Object.keys(meleeWeapons)[j])
                $("#melee" + i).children().children().children(".weaponClass").text(meleeWeapons[Object.keys(
                    meleeWeapons)[j]][
                    "class"
                ]);
                $("#melee" + i).children().children().children(".weaponDamage").text(meleeWeapons[Object.keys(
                        meleeWeapons)[j]]
                    ["damage"]);
                $("#melee" + i).children().children().children(".weaponType").text(meleeWeapons[Object.keys(
                    meleeWeapons)[j]][
                    "type"
                ]);
                $("#melee" + i).children().children().children(".weaponPen").text(meleeWeapons[Object.keys(
                    meleeWeapons)[j]][
                    "pen"
                ]);
                $("#melee" + i).children().children().children(".weaponSpecial").text(meleeWeapons[Object.keys(
                    meleeWeapons)[
                    j]]["special"]);
            }
        }
    }


}

function addRanged() {

    for (let i = 0; i < character.Equip.length; i++) {
        for (let j = 0; j < Object.keys(rangedWeapons).length; j++) {

            if (character.Equip[i].search(Object.keys(rangedWeapons)[j]) != -1) {
                var $div = $('#defaultRangedWeapon');

                var $klon = $div.clone().prop('id', 'ranged' + i);

                if ($("#ranged" + (i - 1)).length === 0) {
                    $div.after($klon.show());
                } else {
                    $("#ranged" + (i - 1)).after($klon.show());
                }


                $("#ranged" + i).children().children().children(".weaponName").text(Object.keys(rangedWeapons)[j])
                $("#ranged" + i).children().children().children(".weaponClass").text(rangedWeapons[Object.keys(
                    rangedWeapons)[j]]["class"]);

                $("#ranged" + i).children().children().children(".weaponRange").text(rangedWeapons[Object.keys(
                        rangedWeapons)[
                        j]]
                    ["range"]);
                $("#ranged" + i).children().children().children(".weaponDamage").text(rangedWeapons[Object.keys(
                        rangedWeapons)[
                        j]]
                    ["damage"]);
                $("#ranged" + i).children().children().children(".weaponType").text(rangedWeapons[Object.keys(
                    rangedWeapons)[
                    j]][
                    "type"
                ]);
                $("#ranged" + i).children().children().children(".weaponPen").text(rangedWeapons[Object.keys(
                        rangedWeapons)[j]]
                    [
                        "pen"
                    ]);

                $("#ranged" + i).children().children().children(".weaponRoF").text(rangedWeapons[Object.keys(
                    rangedWeapons)[
                    j]]["RoF"]);
                $("#ranged" + i).children().children().children(".weaponClip").text(rangedWeapons[Object.keys(
                    rangedWeapons)[
                    j]]["clip"]);
                $("#ranged" + i).children().children().children(".weaponReload").text(rangedWeapons[Object.keys(
                    rangedWeapons)[
                    j]]["reload"]);

                $("#ranged" + i).children().children().children(".weaponSpecial").text(rangedWeapons[Object.keys(
                    rangedWeapons)[
                    j]]["special"]);
            }
        }
    }
}

function addCharacteristics() {
    $("#attr_WS").attr('value', character["WS"]);
    $("#attr_BS").attr('value', character["BS"]);
    $("#attr_S").attr('value', character["S"]);
    $("#attr_T").attr('value', character["T"]);
    $("#attr_Ag").attr('value', character["Ag"]);
    $("#attr_Int").attr('value', character["Int"]);
    $("#attr_Per").attr('value', character["Per"]);
    $("#attr_WP").attr('value', character["WP"]);
    $("#attr_Fel").attr('value', character["Fel"]);
    $("#attr_Infl").attr('value', character["Infl"]);

    let ST = (Math.floor(character["S"] / 10) + Math.floor(character["T"] / 10))

    let weights = [0.9, 2.25, 4.5, 9, 18, 27, 36, 45, 56, 67, 78, 90, 112, 225, 337, 450, 675, 900, 1350, 1800, 2250]

    $("#attr_baseCarry").text(ST);
    $("#attr_GearCarryMax").text(weights[ST]);
    $("#attr_GearCarryAvailable").text(weights[ST] - Number($("#attr_GearCarryCurrent").text()));
}

function addGear() {
    for (let i = 0; i < character.Equip.length; i++) {
        if (character.Equip[i].search("Mechadendrite") == -1) {

            var $div = $('#defaultGear');

            var $klon = $div.clone().prop('id', 'gear' + i);

            if ($("#gear" + (i - 1)).length === 0) {
                $div.after($klon.show());
            } else {
                $("#gear" + (i - 1)).after($klon.show());
            }

            $("#gear" + i).children().children(".gearName").text(character.Equip[i])
            $("#gear" + i).children().children(".gearWt").text(equipment[character.Equip[i]]["weight"].split("k")[0])

            $("#attr_GearCarryCurrent").text(Number($("#attr_GearCarryCurrent").text()) + Number(equipment[character
                .Equip[i]]["weight"].split("k")[0]));
        } else if (character.Equip[i].search("Mechadendrite") >= -1) {
            $("#attr_Cybernetics").text(character.Equip[i]);
            $(".repeating_Cybernetics").show();
        }
    }
}

function addHomeBackRoleDiv() {
    $("#attr_Homeworld").text(homeworlds[character.homeworld]["name"]);
    $("#attr_Background").text(backgrounds[character.background]["name"]);
    $("#attr_Role").text(roles[character.role]["name"]);
    try {
        $("#attr_Divination").text(character.Divination.split(":")[0]);

    } catch {
        console.log("No Divination Found")
    }
}

function addBonuses() {


    $("#homeBonus").text(character.HomeBonus);

    $("#backBonus").text(character.BackBonus);

    $("#roleBonus").text(character.RoleBonus);

    try {
        $("#divBonus").text(character.Divination);

    } catch {
        console.log("No Divination Found")
    }

}

function addTalents() {
    for (let i = 0; i < character.Talents.length; i++) {

        var $div = $('#defaultTalent');

        var $klon = $div.clone().prop('id', 'talent' + i);

        if ($("#talent" + (i - 1)).length === 0) {
            $div.after($klon.show());
        } else {
            $("#talent" + (i - 1)).after($klon.show());
        }

        $klon.children().children().text(character.Talents[i])
    }
}

function addSkills() {
    for (let i = 0; i < character.Skills.length; i++) {

        var $div = $('#defaultSkill');

        var $klon = $div.clone().prop('id', 'skill' + i);

        if ($("#skill" + (i - 1)).length === 0) {
            $div.after($klon.show());
        } else {
            $("#skill" + (i - 1)).after($klon.show());
        }

        $klon.children().children().text(character.Skills[i])
    }
}

function addWoundsFateMovementFatigue() {
    $("#halfMove").text(character.Movement[0] + " m")
    $("#fullMove").text(character.Movement[1] + " m")
    $("#charge").text(character.Movement[2] + " m")
    $("#run").text(character.Movement[3] + " m")

    $("#attr_Wounds_max").text(character.Wounds);
    $("#attr_Fate_max").text(character.Fate);
    $("#attr_FatigueThreshold").text(character.Fatigue);
}

function addAptitudes() {
    for (let i = 0; i < character.Aptitudes.length; i++) {

        $("#aptitude" + i).text(character.Aptitudes[i])
    }
}


function buildSheet() {
    addHomeBackRoleDiv();
    addMelee();
    addRanged();
    addGear();
    addCharacteristics();
    addBonuses();
    addSkills();
    addTalents();
    addWoundsFateMovementFatigue();
    addAptitudes();
}
