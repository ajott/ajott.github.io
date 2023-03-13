function inRangeInclusive(num, range) {
    let lowerBound = Number(range.split("-")[0]);
    let upperBound = Number(range.split("-")[1]);

    if (isNaN(upperBound)) {
        if (num == lowerBound) {
            return true;
        } else {
            return false;
        }
    } else {
        return (num >= lowerBound && num <= upperBound);
    }
}

function toDark() {
    $("table").addClass("table-dark");
    $("h3").addClass("headingDark");
    $("h4").addClass("headingDark");
}

function sumArr(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}

function parseRoll(str) {

}

$(document).ready(function () {
    spellFuse = new Fuse(spell, {keys: ['name']});

})


function roll(str, mod = 0, sum = true) {

    if (str == "-") {
        return 1;
    }

    let numRolls = Number(str.split("d")[0]);
    let diceValue = Number(str.split("d")[1]);

    let result = [];

    for (let i = 0; i < numRolls; i++) {
        result.push(Math.floor((Math.random() * diceValue) + 1))
    }

    // Sorts the array of rolls for ease of removing high/low values
    result.sort(function (a, b) {
        return a - b
    })

    if (mod == 1) {
        // Remove lowest value
        result.shift()
    } else if (mod == -1) {
        // Remove highest value
        result.pop()
    }

    let totals = {
        "rolls": result,
        "total": sumArr(result)
    };

    if (sum) {
        return totals["total"];
    } else {
        return totals;
    }

}

function rollCrypto(str, mod = 0, sum = true) {

    if (str == "-") {
        return 1;
    }

    let numRolls = Number(str.split("d")[0]);
    let diceValue = Number(str.split("d")[1]);

    console.log(str.split(String(diceValue)));

    let result = [];

    for (let i = 0; i < numRolls; i++) {
        result.push(window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295)
    }

    for (let i = 0; i < result.length; i++) {
        result[i] = Math.floor(result[i] * diceValue) + 1;
    }


    // Sorts the array of rolls for ease of removing high/low values
    result.sort(function (a, b) {
        return a - b
    })

    if (mod == 1) {
        // Remove lowest value
        result.shift()
    } else if (mod == -1) {
        // Remove highest value
        result.pop()
    }

    let totals = {
        "rolls": result,
        "total": sumArr(result)
    };

    if (sum) {
        return totals["total"];
    } else {
        return totals;
    }
}

function rollDice() {
    const rollType = $("input[name=rollType]:checked").val();
    const dropType = $("input[name=rollDrop]:checked").val();
    const rollString = $("#diceString").val();

    if (rollType == "roll") {
        result = roll(rollString, dropType, false);
    } else {
        result = rollCrypto(rollString, dropType, false);
    }

    $("#diceRollTotal").text(result["total"]);

    let htmlString = "";

    result["rolls"].forEach(function (die) {
        htmlString += ("&emsp;<span>" + die + "</span>&emsp;");
    })


    // let rollResultString = "";  

    // result["rolls"].forEach(function(die) {
    //     rollResultString += (die + "   ");
    // })

    $("#diceRollResults").html(htmlString);
}


$(document).ready(function () {
    buildNavbar();
    setTimeout( function() {
        toDark()}, 250);
});

function buildSpells() {
    let htmlString = "";

    for (let i = 0; i < spell.length; i++) {
        var $div = $('#defaultSpellCard');

        var $klon = $div.clone().prop('id', 'spell' + i);

        if ($("#spell" + (i - 1)).length === 0) {
            $div.after($klon.show().removeClass("w3-hide"));
        } else {
            $("#spell" + (i - 1)).after($klon.show().removeClass("w3-hide"));
        }

        if (spell[i]["homebrew"] != undefined) {
            $("#spell" + i).children().children().children(".spellName").text(spell[i]["name"] + " (Homebrew)")
        } else {
            $("#spell" + i).children().children().children(".spellName").text(spell[i]["name"])
        }

        $("#spell" + i).children().children().children(".copyText").text(String(window.location).split('?s=')[0] + "?s=" + encodeURIComponent(spell[i]["name"]))

        if (spell[i]["concentration"]) {
            $("#spell" + i).children().children().children().children(".concentration").text("Concentration")
        }

        $("#spell" + i).children().children().children().children().children(".spellSchool").text(spell[i]["school"])
        $("#spell" + i).children().children().children().children().children(".spellLevel").text(spell[i]["level"])
        $("#spell" + i).children().children().children(".spellFilters").text(spell[i]["school"] + ", " + spell[i]["classes"] + ", " + spell[i]["level"])
        $("#spell" + i).children().children().children(".spellTime").text(spell[i]["time"])
        $("#spell" + i).children().children().children(".spellRange").text(spell[i]["range"])
        $("#spell" + i).children().children().children(".spellComponents").text(spell[i]["components"])
        $("#spell" + i).children().children().children(".spellDuration").text(spell[i]["duration"])
        $("#spell" + i).children().children().children(".spellClasses").text(spell[i]["classes"])
        if (spell[i]["text"] != undefined) {
            if (typeof (spell[i]["text"]) == "object") {
                for (let j = 0; j < spell[i]["text"].length; j++) {
                    htmlString += "<p>" + spell[i]["text"][j] + "</p>";
                }
            } else {
                htmlString = "<p>" + spell[i]["text"] + "</p>"
            }
        }
        if (spell[i]["ritual"] == "YES") {
            $("#spell" + i).children().children().children().children(".ritual").text("Ritual")
        }
        $("#spell" + i).children().children().children(".spellDescription").html(htmlString)
        $("#spell" + i).addClass("grid-item")
        if (spell[i]["homebrew"] != undefined) {
            $("#spell" + i).children().addClass("homebrew-card");
        } 

        htmlString = "";
    }

    $('.spellGrid').isotope({
        itemSelector: '.grid-item',
        masonry: {
            columnWidth: 25
        },
        getSortData: {
            name: '.spellName',
            school: '.spellSchool'
        }
    });
    $('.spellGrid').isotope({
        sortBy: 'name'
    })
    $('spellGrid').isotope('updateSortData').isotope();

    setTimeout( function() {getFilterCount()},500);
}



function addSpellSlotBadges() {

    let classes = ["bard", "cleric", "druid", "paladin", "ranger", "sorcerer", "warlock", "wizard"];

    classes.forEach(function (goClass) {
        for (let i = 0; i < 10; i++) {
            $("#" + goClass + i + "Badge").text("")
        }
        $("#" + goClass + "SpellSpan").hide();
        $("#" + goClass + "Notice").hide();
    })

    let classSelect = document.getElementById("slotClassSelect")
    let levelSelect = document.getElementById("slotLevelSelect")

    let classSelection = classSelect.options[classSelect.selectedIndex].value;
    let levelSelection = levelSelect.options[levelSelect.selectedIndex].value;

    $("#" + classSelection + "Notice").show();

    for (let i = 0; i < classSlots[classSelection][levelSelection].length; i++) {
        if (classSlots[classSelection][levelSelection][i] > 0) {
            $("#" + classSelection + i + "Badge").text(classSlots[classSelection][levelSelection][i]);
        } else {
            $("#" + classSelection + i + "Badge").text("");
        }
    }

    if (classSelection == "bard" || classSelection == "ranger" || classSelection == "sorcerer" || classSelection == "warlock" || classSelection == "wizard") {
        $("#" + classSelection + "SpellSpan").show();
        $("#" + classSelection + "SpellsKnown").text(classSpellsKnown[classSelection][levelSelection]);
    }
}

function levelSliderMove() {
    $("#levelSlider").slider({
        create: function () {
            handle.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            handle.text(ui.value);
        }
    });
}


function buildMonsters() {
    let htmlString = "";

    for (let i = 0; i < monster.length; i++) {
        var $div = $('#defaultMonsterCard');

        var $klon = $div.clone().prop('id', 'monster' + i);

        let monsterFilterString = "";

        if ($("#monster" + (i - 1)).length === 0) {
            $div.after($klon.show());
        } else {
            $("#monster" + (i - 1)).after($klon.show());
        }

        if (monster[i]["homebrew"] != undefined) {
            $("#monster" + i).children().children().children(".monsterName").text(monster[i]["name"] + " (Homebrew)")
            monsterFilterString += "special:homebrew, "
        } else if (monster[i]["template"] != undefined) {
            $("#monster" + i).children().children().children(".monsterName").text(monster[i]["name"] + " (Template)")
            monsterFilterString += "special:template, "
        }
        else {
            $("#monster" + i).find(".monsterName").text(monster[i]["name"])
        }

        if (monster[i]["template"] != undefined) {
            monsterFilterString += "special:template, "
        }

        $("#monster" + i).children().children().children(".copyText").text(String(window.location).split('?s=')[0] + "?s=" + encodeURIComponent(monster[i]["name"]))

        if (monster[i]["size"] != undefined) {
            htmlString += "<em>" + monster[i]["size"];
            monsterFilterString += "size:"+monster[i]["size"] + ", "
            $("#monster" + i).find(".monsterSize").text(monster[i]["size"])
        }
        if (monster[i]["type"] != undefined) {
            htmlString += " " + monster[i]["type"]            
            monsterFilterString += "type:"+monster[i]["type"] + ", "
            $("#monster" + i).find(".monsterType").text(monster[i]["type"] + ",")
        }
        if (monster[i]["alignment"] != undefined) {
            htmlString += ", " + toTitleCase(monster[i]["alignment"]) + "</em>"
            $("#monster" + i).find(".monsterAlignment").html(toTitleCase(monster[i]["alignment"]))
        }

        htmlString = ""

        if (monster[i]["ac"] != undefined) {
            $("#monster" + i).children().children().children().children(".monsterAC").html("<emph>AC: </emph>" + monster[i]["ac"])            
            monsterFilterString += "ac:"+monster[i]["ac"] + ", "
        }
        if (monster[i]["hp"] != undefined) {
            $("#monster" + i).children().children().children().children(".monsterHP").html("<emph>Hit Points: </emph>" + monster[i]["hp"])
        }
        if (monster[i]["speed"] != undefined) {
            $("#monster" + i).children().children().children().children(".monsterSpeed").html("<emph>Speed: </emph>" + monster[i]["speed"])
        }


        if (monster[i]["str"] != undefined) {
            $("#monster" + i).children().children().children().children(".monsterStr").html("<emph>Str: </emph>" + monster[i]["str"] + " (" + findStatMod(monster[i]["str"]) + ") &emsp;")
        }
        if (monster[i]["dex"] != undefined) {
            $("#monster" + i).children().children().children().children(".monsterDex").html("<emph>Dex: </emph>" + monster[i]["dex"] + " (" + findStatMod(monster[i]["dex"]) + ") &emsp;")
        }
        if (monster[i]["con"] != undefined) {
            $("#monster" + i).children().children().children().children(".monsterCon").html("<emph>Con: </emph>" + monster[i]["con"] + " (" + findStatMod(monster[i]["con"]) + ") &emsp;")
        }
        if (monster[i]["int"] != undefined) {
            $("#monster" + i).children().children().children().children(".monsterInt").html("<emph>Int: </emph>" + monster[i]["int"] + " (" + findStatMod(monster[i]["int"]) + ") &emsp;")
        }
        if (monster[i]["wis"] != undefined) {
            $("#monster" + i).children().children().children().children(".monsterWis").html("<emph>Wis: </emph>" + monster[i]["wis"] + " (" + findStatMod(monster[i]["wis"]) + ") &emsp;")
        }
        if (monster[i]["cha"] != undefined) {
            $("#monster" + i).children().children().children().children(".monsterCha").html("<emph>Cha: </emph>" + monster[i]["cha"] + " (" + findStatMod(monster[i]["cha"]) + ")")
        }

        if (monster[i]["saveObj"] != undefined) {
            htmlString = "<emph>Saves: </emph>"
            let saveKeys = Object.keys(monster[i]["saveObj"])
            for (let j = 0; j < saveKeys.length; j ++) {
                htmlString += toTitleCase(saveKeys[j]) + " +" + monster[i]["saveObj"][saveKeys[j]]
                if (j < saveKeys.length-1) {
                    htmlString += ", "
                }
            }
            htmlString += "<br/>"
            $("#monster" + i).find(".monsterSave").html(htmlString)
        }

        htmlString = ""

        if (monster[i]["skillObj"] != undefined) {
            htmlString = "<emph>Skill: </emph>"
            let skillKeys = Object.keys(monster[i]["skillObj"])
            for (let j = 0; j < skillKeys.length; j ++) {
                htmlString += skillKeys[j] + " +" + monster[i]["skillObj"][skillKeys[j]]
                if (j < skillKeys.length-1) {
                    htmlString += ", "
                }
            }
            htmlString += "<br/>"
            $("#monster" + i).find(".monsterSkill").html(htmlString)
        }

        htmlString = ""

        if (monster[i]["resist"] != undefined) {
            $("#monster" + i).children().children().children(".monsterResist").html("<emph>Damage Resistances: </emph>" + monster[i]["resist"] + "<br/>")
        }

        if (monster[i]["vulnerable"] != undefined) {
            $("#monster" + i).children().children().children(".monsterVulnerable").html("<emph>Damage Vulnerabilities: </emph>" + monster[i]["vulnerable"] + "<br/>")
        }

        if (monster[i]["immune"] != undefined) {
            $("#monster" + i).children().children().children(".monsterImmune").html("<emph>Damage Immunities: </emph>" + monster[i]["immune"] + "<br/>")
        }

        if (monster[i]["conditionImmune"] != undefined) {
            $("#monster" + i).children().children().children(".monsterCondImmune").html("<emph>Condition Immunities: </emph>" + monster[i]["conditionImmune"] + "<br/>")
        }

        if (monster[i]["senses"] != undefined) {
            $("#monster" + i).children().children().children(".monsterSenses").html("<emph>Senses: </emph>" + monster[i]["senses"] + "<br/>")
        }

        if (monster[i]["passive"] != undefined) {
            $("#monster" + i).children().children().children(".monsterPassPer").html("<emph>Passive Perception: </emph>" + monster[i]["passive"] + "<br/>")
        }

        if (monster[i]["languages"] != undefined) {
            $("#monster" + i).children().children().children(".monsterLanguages").html("<emph>Languages: </emph>" + monster[i]["languages"] + "<br/>")
        }

        if (monster[i]["cr"] != undefined) {
            $("#monster" + i).children().children().children(".monsterCR").html("<emph>Challenge: </emph>" + monster[i]["cr"])            
            monsterFilterString += "cr:"+monster[i]["cr"] + ", "
        }




        if (monster[i]["trait"] != undefined) {
            
            if (typeof monster[i]["trait"][0] != "undefined") {
                for (let j = 0; j < monster[i]["trait"].length; j++) {
                    if (monster[i]["trait"][j]["text"] != undefined) {
                        if (typeof monster[i]["trait"][j]["text"] == "object") {
                            htmlString += "<p><emph><em>" + monster[i]["trait"][j]["name"] + ": </em></emph>" + monster[i]["trait"][j]["text"][0] + "</p>";
                            for (let k = 1; k < monster[i]["trait"][j]["text"].length; k++) {
                                if (monster[i]["trait"][j]["text"][k].length != 0 ) {
                                htmlString += "<p>&emsp;" + monster[i]["trait"][j]["text"][k] + "</p>";
                            }
                            }
                        } else {
                            htmlString += "<p><emph><em>" + monster[i]["trait"][j]["name"] + ": </em></emph>" + monster[i]["trait"][j]["text"] + "</p>";
                        }
                    } else {
                        htmlString += "<p><emph><em>" + monster[i]["trait"][j]["name"] + "</em></emph></p>";
                    }
                }
            } else {
                htmlString += "<p><emph><em>" + monster[i]["trait"]["name"] + ": </em></emph>";
                htmlString += monster[i]["trait"]["text"] + "</p>";
            }
            
            
            
            
            $("#monster" + i).children().children().children(".monsterTraits").html(htmlString)

            htmlString = ""
            
        }

        if (monster[i]["action"] != undefined) {
            $("#monster" + i).children().children().children(".monsterActionTitle").html("<h4 style=\"text-align: left !important;\">Actions</h4>")
            $("#monster" + i).children().children().children(".monsterActionTitle").next().css("border-bottom","1px solid goldenrod")
            
            if (typeof monster[i]["action"][0] != "undefined") {
                for (let j = 0; j < monster[i]["action"].length; j++) {
                    if (monster[i]["action"][j]["text"] != undefined) {
                        if (typeof monster[i]["action"][j]["text"] == "object") {
                            htmlString += "<p><emph><em>" + monster[i]["action"][j]["name"] + ": </em></emph>" + monster[i]["action"][j]["text"][0] + "</p>";
                            for (let k = 1; k < monster[i]["action"][j]["text"].length; k++) {
                                htmlString += "<p>&emsp;" + monster[i]["action"][j]["text"][k] + "</p>";
                            }
                        } else {
                            htmlString += "<p><emph><em>" + monster[i]["action"][j]["name"] + ": </em></emph>" + monster[i]["action"][j]["text"] + "</p>";
                        }
                    } else {
                        htmlString += "<p><emph><em>" + monster[i]["action"][j]["name"] + "</em></emph></p>";
                    }
                }
            } else {
                htmlString += "<p><emph><em>" + monster[i]["action"]["name"] + ": </em></emph>";
                htmlString += monster[i]["action"]["text"] + "</p>";
            }
            
            
            
            
            $("#monster" + i).children().children().children(".monsterActions").html(htmlString)

            htmlString = ""
        }

        if (monster[i]["legendary"] != undefined) {
            $("#monster" + i).children().children().children(".monsterLegendaryTitle").html("<h4 style=\"text-align: left !important;\">Legendary Actions</h4><div style=\"border-bottom: 1px solid goldenrod !important\"></div><br/>The "+monster[i]["name"]+" can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time, and only at the end of another creature's turn. The "+ monster[i]["name"] + " regains spent legendary actions at the start of its turn.")
            
            
            if (typeof monster[i]["legendary"][0] != "undefined") {
                for (let j = 0; j < monster[i]["legendary"].length; j++) {
                    if (monster[i]["legendary"][j]["text"] != undefined) {
                        if (typeof monster[i]["legendary"][j]["text"] == "object") {
                            htmlString += "<p><emph><em>" + monster[i]["legendary"][j]["name"] + ": </em></emph>" + monster[i]["legendary"][j]["text"][0] + "</p>";
                            for (let k = 1; k < monster[i]["legendary"][j]["text"].length; k++) {
                                htmlString += "<p>&emsp;" + monster[i]["legendary"][j]["text"][k] + "</p>";
                            }
                        } else {
                            htmlString += "<p><emph><em>" + monster[i]["legendary"][j]["name"] + ": </em></emph>" + monster[i]["legendary"][j]["text"] + "</p>";
                        }
                    } else {
                        htmlString += "<p><emph><em>" + monster[i]["legendary"][j]["name"] + "</em></emph></p>";
                    }
                }
            } else {
                htmlString += "<p><emph><em>" + monster[i]["legendary"]["name"] + ": </em></emph>";
                htmlString += monster[i]["legendary"]["text"] + "</p>";
            }
            
            
            
            
            $("#monster" + i).children().children().children(".monsterLegendary").html(htmlString)

            htmlString = ""
        }



        $("#monster" + i).children().children().children(".monsterFilters").text(monsterFilterString)
        $("#monster" + i).addClass("monster-item")


        // Determine allowable templates
        templateNames = Object.keys(template);

        for (let t = 0; t < templateNames.length; t ++) {
            // All non-restricted templates first
            if (template[templateNames[t]]["hasRestriction"] == false) {
                $("#monster" + i).find(".templateSelect").html($("#monster" + i).find(".templateSelect").html() + "<option>" + templateNames[t] + "</option>")
            } else {
                // And here's where the "fun" is...
                
                let passesAllChecks = false;

                for (let f = 0; f < template[templateNames[t]]["restrictions"].length; f ++) {
                    let filterType = template[templateNames[t]]["restrictions"][f].split("%")[0]
                    let filterCheck = template[templateNames[t]]["restrictions"][f].split("%")[1]

                    try {
                        passesAllChecks = eval(filterType);
                    } catch {

                    }
                }

                if (passesAllChecks) {
                    $("#monster" + i).find(".templateSelect").html($("#monster" + i).find(".templateSelect").html() + "<option>" + templateNames[t] + "</option>")
                }
            }
        }

        if(monster[i]["homebrew"] != undefined) {
            $("#monster" + i).children().addClass("homebrew-card")
        } else if (monster[i]["template"] != undefined) {
            $("#monster" + i).children().addClass("template-card")
        }

        htmlString = "";
        monsterFilterString = ""
    }

    setTimeout( function() {getFilterCount()},500);
}

function monsterNameFilter() {

    var input = document.getElementById('monsterNameSearch').value.toUpperCase();

    $('.sizeBtn').removeClass('w3-blue').addClass('w3-grey')
    $('.typeBtn').removeClass('w3-blue').addClass('w3-grey')

    if (input != "") {
        // Filter for monster names that match the input
        $('.monsterGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var name = $(this).find('.monsterName').text().toUpperCase();
                // return true to show, false to hide
                return name.indexOf(input) > -1;
            }
        })
    } else {
        $('.monsterGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }

    setTimeout( function() {getFilterCount()},500);
}

var monsterFilters = []


function monsterFilter(input, mod=0) {
    $("#monsterNameSearch").val("")

    $this = $(input)

    if (input.getAttribute("id") == "monsterACSelect") {
        let selectBox = document.getElementById("monsterACSelect")
        filterText = selectBox.options[selectBox.selectedIndex].value;
    } else if (input.getAttribute("id") == "monsterCRSelect") {
        let selectBox = document.getElementById("monsterCRSelect")
        filterText = selectBox.options[selectBox.selectedIndex].value;
    } else {
        filterText = input.getAttribute("value")
    }


    let duplicate = (monsterFilters.indexOf(filterText) > -1);

    if (mod == 0) {
        monsterFilters.forEach(function (filter) {
            if (filter.search("size:") > -1) {
                monsterFilters.splice(monsterFilters.indexOf(filter), 1)
            }
        })

        $this.parent().children().removeClass("w3-blue").addClass("w3-grey")
    }

    if (mod == 1) {
        monsterFilters.forEach(function (filter) {
            if (filter.search("type:") > -1) {
                monsterFilters.splice(monsterFilters.indexOf(filter), 1)
            }
        })

        $this.parent().children().removeClass("w3-blue").addClass("w3-grey")
    }

    if (mod == 2) {
        monsterFilters.forEach(function (filter) {
            if (filter.search("ac:") > -1) {
                monsterFilters.splice(monsterFilters.indexOf(filter), 1)
            }
        })
    }

    if (mod == 3) {
        monsterFilters.forEach(function (filter) {
            if (filter.search("cr:") > -1) {
                monsterFilters.splice(monsterFilters.indexOf(filter), 1)
            }
        })
    }

    if (mod == 4) {
        monsterFilters.forEach(function (filter) {
            if (filter.search("special:") > -1) {
                monsterFilters.splice(monsterFilters.indexOf(filter), 1)
            }
        })
    }

    if (!duplicate) {
        if(mod != 2 && mod != 3 && mod != 4) {
            $this.addClass("w3-blue").removeClass("w3-grey")
        }
        monsterFilters.push(filterText);
    } else {
        if (mod != 1 && mod != 2 && mod != 4) {
            monsterFilters.splice(monsterFilters.indexOf(filterText), 1);
        }
        $this.removeClass("w3-blue").addClass("w3-grey");
    }


    $('.monsterGrid').isotope({
        filter: function () {
            // _this_ is the item element. Get text of element's .name
            var mFilter = $(this).find('.monsterFilters').text()//.toUpperCase();

            let matches = [];

            monsterFilters.forEach(function (filterVal) {
                matches.push(mFilter.indexOf(filterVal) > -1);
            })


            // return true to show, false to hide
            return matches.every(filterMatches);
        }
    })

    $("#monsterCurrentFilters").text(monsterFilters.join(", "))

    setTimeout( function() {getFilterCount()},500);
}

function clearMonsterFilter() {
    monsterFilters = [];

    $("#monsterNameSearch").val("")
    
    $('.sizeBtn').removeClass('w3-blue').addClass('w3-grey')
    $('.typeBtn').removeClass('w3-blue').addClass('w3-grey')
    $('#monsterCRSelect').prop('selectedIndex',0);

    setTimeout(function(){$('#monsterACSelect').prop('selectedIndex',0)},100)


    $('.monsterGrid').isotope({
        // Clear filter
        filter: '*'
    })

    $("#monsterCurrentFilters").text(monsterFilters)

    setTimeout( function() {getFilterCount()},500);
}

function findStatMod(str) {
    let mod = Math.floor((Number(str) - 10) / 2)

    if (mod > 0) {
        mod = "+" + String(mod)
    } else {
        mod = String(mod);
    }

    return mod;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function getFilterCount() {
    let objects = document.getElementsByClassName("grid-item");
    let objectCount = 0;
    for (let i = 0; i < objects.length; i ++) {
        if ($("#"+objects[i].id).css("display") != "none"){ 
            objectCount += 1
        }
    }

    let monsters = document.getElementsByClassName("monster-item");
    for (let i = 0; i < monsters.length; i ++) {
        if ($("#"+monsters[i].id).css("display") != "none"){ 
            objectCount += 1
        }
    }

    $("#filterCount").text(objectCount);
}


itemFilters = []

function itemFilter(input, mod=0) {
    $("#magicItemNameSearch").val("")

    $this = $(input)

    if (mod == 0) {
        filterText = "type:" + input.firstChild.textContent
    } else {
        filterText = "rarity:" + input.firstChild.textContent
    }

    let duplicate = (itemFilters.indexOf(filterText) > -1);

    if (mod == 0) {
        itemFilters.forEach(function (filter) {
            if (filter.search("type:") > -1) {
                itemFilters.splice(itemFilters.indexOf(filter), 1)
            }
        })

        $this.parent().children().removeClass("w3-blue").addClass("w3-grey")
    }

    if (mod == 1) {
        itemFilters.forEach(function (filter) {
            if (filter.search("rarity:") > -1) {
                itemFilters.splice(itemFilters.indexOf(filter), 1)
            }
        })

        $this.parent().children().removeClass("w3-blue").addClass("w3-grey")
    }

    if (!duplicate) {
            $this.addClass("w3-blue").removeClass("w3-grey")
        itemFilters.push(filterText);
    }

    $('.magicItemGrid').isotope({
        filter: function () {
            // _this_ is the item element. Get text of element's .name
            var mFilter = $(this).find('.itemFilters').text()//.toUpperCase();

            let matches = [];

            itemFilters.forEach(function (filterVal) {
                matches.push(mFilter.indexOf(filterVal) > -1);
            })


            // return true to show, false to hide
            return matches.every(filterMatches);
        }
    })

    setTimeout( function() {getFilterCount()},500);
}

function buildFeats() {
    let htmlString = "";

    for (let i = 0; i < feat.length; i++) {
        var $div = $('#defaultFeatCard');

        var $klon = $div.clone().prop('id', 'feat' + i);

        if ($("#feat" + (i - 1)).length === 0) {
            $div.after($klon.show());
        } else {
            $("#feat" + (i - 1)).after($klon.show());
        }

        if (feat[i]["homebrew"] != undefined) {
            $("#feat" + i).children().children().children(".featName").text(feat[i]["name"] + " (Homebrew)")
        } else {
            $("#feat" + i).children().children().children(".featName").text(feat[i]["name"])
        }
        
        if (feat[i]["modifier"]) {
            $("#feat" + i).children().children().children(".modSpan").html("<emph>Modifier: </emph><span class=\"featMod\"></span>")
            $("#feat" + i).children().children().children(".modSpan").children(".featMod").text(feat[i]["modifier"]["text"])
        }
        if (feat[i]["prerequisite"] != undefined) {
            $("#feat" + i).children().children().children(".featPrereq").html("<emph>Prerequisite: </emph>" + feat[i]["prerequisite"])
        }
        if (feat[i]["text"] != undefined) {
            if (typeof (feat[i]["text"]) == "object") {
                for (let j = 0; j < feat[i]["text"].length; j++) {
                    htmlString += "<p>" + feat[i]["text"][j] + "</p>";
                }
            } else {
                htmlString = "<p>" + feat[i]["text"] + "</p>"
            }
        }
        $("#feat" + i).children().children().children(".featDesc").html(htmlString)
        $("#feat" + i).addClass("grid-item")
        if (feat[i]["homebrew"] != undefined) {
            $("#feat" + i).children().addClass("homebrew-card")
        } else if (feat[i]["ua"] != undefined) {
            $("#feat" + i).children().addClass("ua-card")
        } else if (feat[i]["tce"] != undefined) {
            $("#feat" + i).children().addClass("tce-card")
        }

        htmlString = "";
    }
}

function deityFilter() {
    let pantheons = [".forgotten", ".greyhawk", ".dragonlance", ".eberron", ".nonhuman", ".celtic", ".greek", ".egyptian", ".norse"]

    for (let i = 0; i < pantheons.length; i++) {
        $(pantheons[i]).show();
    }
    var input, filter, table, tr, td;
    input = document.getElementById("deitySearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("deityTable");
    tr = table.getElementsByTagName("tr");
    theads = table.getElementsByClassName("midHead");
    if (filter != "") {
        for (let i = 0; i < theads.length; i++) {
            theads[i].style.display = "none";
        }
    } else {
        for (let i = 0; i < theads.length; i++) {
            theads[i].style.display = "";
        }
    }

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 && txtValue != null) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    document.getElementById("deityPantheonSelect").options.selectedIndex = 0;
}

function deityPantheonSearch() {
    let selectBox = document.getElementById("deityPantheonSelect")

    let selection = selectBox.options[selectBox.selectedIndex].value;

    let pantheons = [".forgotten", ".greyhawk", ".dragonlance", ".eberron", ".nonhuman", ".celtic", ".greek", ".egyptian", ".norse"]

    if (selection == "...") {
        for (let i = 0; i < pantheons.length; i++) {
            $(pantheons[i]).show();
        }
    } else {
        for (let i = 0; i < pantheons.length; i++) {
            $(pantheons[i]).hide();
            $(selection).show();
        }
    }

    $("#deitySearch").val("")
}

function showMenu() {
    var x = document.getElementById("menu");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}


function dropdownShow(str) {
    let elements = ["classesDropdown", "spellDropdown", "equipDropdown", "raceDropdown"]

    for (let i = 0; i < elements.length; i++) {
        if (str == elements[i]) {
            let x = document.getElementById(elements[i]);
            if (x.className.indexOf("w3-show") == -1) {
                x.className += " w3-show";
            } else {
                x.className = x.className.replace(" w3-show", "");
            }
        } else {
            let x = document.getElementById(elements[i]);
            x.className = x.className.replace(" w3-show", "");
        }
    }
}


window.addEventListener('scroll', function (e) {

    if (document.documentElement.scrollTop > 60) {
        $("#headTitle").hide();
        $("#headTitleBuffer").hide();
    } else if (document.documentElement.scrollTop <= 60) {
        $("#headTitle").show();
        $("#headTitleBuffer").show();
    }
});



function accordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        $('#'+id).removeClass("w3-hide").addClass("w3-show")
    } else {
        $('#'+id).removeClass("w3-show").addClass("w3-hide")
    }
}

function accordionSidebar(id) {

    if ($('#'+id).hasClass("w3-show")) {
        $('#'+id).removeClass('w3-show').addClass('w3-hide')
    } else {

        $('.classNavSidebar').removeClass('w3-show').addClass('w3-hide')
    
        $('#'+id).removeClass('w3-hide').addClass('w3-show');

    }

}

var spellFilters = []

function filterMatches(val) {
    return val;
}

var spellSchools = [
    "ABJURATION",
    "CONJURATION",
    "DIVINATION",
    "ENCHANTMENT",
    "EVOCATION",
    "ILLUSION",
    "NECROMANCY",
    "TRANSMUTATION"
]

var spellLevels = ["CANTRIP", "1ST", "2ND", "3RD", "4TH", "5TH", "6TH", "7TH", "8TH", "9TH"]

function spellFilter(input, mod = 0) {
    $("#spellNameSearch").val("")


    $this = $(input)

    filterText = input.firstChild.textContent.toUpperCase()

    let duplicate = (spellFilters.indexOf(filterText) > -1);


    if (mod == 1) {
        spellFilters.forEach(function (filter) {
            if (spellSchools.indexOf(filter) > -1) {
                spellFilters.splice(spellFilters.indexOf(filter), 1)
            }
        })

        $this.parent().children().removeClass("w3-blue").addClass("w3-grey")

    }

    if (mod == 2) {
        spellFilters.forEach(function (filter) {
            if (spellLevels.indexOf(filter) > -1) {
                spellFilters.splice(spellFilters.indexOf(filter), 1)
            }
        })
        $this.parent().children().removeClass("w3-blue").addClass("w3-grey")
    }

    if (!duplicate) {
        $this.addClass("w3-blue").removeClass("w3-grey")
        spellFilters.push(filterText);
    } else {
        if (mod != 1 && mod != 2) {
            spellFilters.splice(spellFilters.indexOf(filterText), 1);
        }
        $this.removeClass("w3-blue").addClass("w3-grey");
    }


    $('.spellGrid').isotope({
        filter: function () {
            // _this_ is the item element. Get text of element's .name
            var spFilter = $(this).find('.spellFilters').text().toUpperCase();

            let matches = [];

            spellFilters.forEach(function (filterVal) {
                matches.push(spFilter.indexOf(filterVal) > -1);
            })


            // return true to show, false to hide
            return matches.every(filterMatches);
        }
    })
    

    setTimeout( function() {getFilterCount()},500);
}

function spellNameFilter(exact = 0) {

    $('.classBtn').removeClass('w3-blue').addClass('w3-grey')
    $('.schoolBtn').removeClass('w3-blue').addClass('w3-grey')
    $('.levelBtn').removeClass('w3-blue').addClass('w3-grey')
    

    var input = document.getElementById('spellNameSearch').value.toUpperCase();

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
        $('.spellGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var name = $(this).find('.spellName').text().toUpperCase();
                // return true to show, false to hide
                if (exact == 1) {
                    return (name == input)
                } else {
                    return name.indexOf(input) > -1;
                }
            }
        })
    } else {
        $('.spellGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }
    

    setTimeout( function() {getFilterCount()},500);
}


function clearSpellFilter() {
    spellFilters = [];

    $("#spellNameSearch").val("")

    $('.spellGrid').isotope({
        // Clear filter
        filter: '*'
    })

    $('.classBtn').removeClass('w3-blue').addClass('w3-grey')
    $('.schoolBtn').removeClass('w3-blue').addClass('w3-grey')
    $('.levelBtn').removeClass('w3-blue').addClass('w3-grey')
}

function featNameFilter() {

    var input = document.getElementById('featNameSearch').value.toUpperCase();

    if (input != "") {
        // Filter for spell names that match the input
        $('.featGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var name = $(this).find('.featName').text().toUpperCase();
                // return true to show, false to hide
                return name.indexOf(input) > -1;
            }
        })
    } else {
        $('.featGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }
    

    setTimeout( function() {getFilterCount()},500);
}

function magicItemNameFilter() {
    
    itemFilters = []

    $('.rarityBtn').removeClass('w3-blue').addClass('w3-grey')
    $('.typeBtn').removeClass('w3-blue').addClass('w3-grey')

    var input = document.getElementById('magicItemNameSearch').value.toUpperCase();

    if (input != "") {
        // Filter for spell names that match the input
        $('.magicItemGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var name = $(this).find('.itemName').text().toUpperCase();
                // return true to show, false to hide
                return name.indexOf(input) > -1;
            }
        })
    } else {
        $('.magicItemGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }

    setTimeout( function() {getFilterCount()},500);
}


function buildNavbar() {
    $('#navBarDiv').load("./navbar.html");
}


function spellSearchClick(el) {
    $("#spellNameSearch").val("\"" + el.firstChild.textContent + "\"");
    spellNameFilter();
    $('html, body').animate({
        scrollTop: ($('#spellNameSearch').offset().top)
    }, 150);
}

function exSpellSearch(el) {


    //+ "?s=" + encodeURIComponent("\"" + el.firstChild.textContent + "\"")

}

function buildMagicItems() {
    let htmlString = "";
    let itemFilterString = "";

    for (let i = 0; i < magicItems.length; i++) {
        var $div = $('#defaultItemCard');

        var $klon = $div.clone().prop('id', 'item' + i);

        if ($("#item" + (i - 1)).length === 0) {
            $div.after($klon.show());
        } else {
            $("#item" + (i - 1)).after($klon.show());
        }

        if (magicItems[i]["homebrew"] != undefined) {
            $("#item" + i).children().children().children(".itemName").text(magicItems[i]["name"] + " (Homebrew)")
        } else {
            $("#item" + i).children().children().children(".itemName").text(magicItems[i]["name"])
        }

        $("#item" + i).children().children().children(".copyText").text(String(window.location).split('?s=')[0] + "?s=" + encodeURIComponent(magicItems[i]["name"]))

        $("#item" + i).children().children().children().children().children(".itemType").text(magicItems[i]["type"])
        itemFilterString += "type:" + magicItems[i]["type"] + ", "

        if (magicItems[i]["weight"]) {
            htmlString = $("#item" + i).children().children().children(".itemAttributes").html()
            htmlString += "<emph>Weight: </emph><span class=\"itemWeight\"></span><br/>"
            $("#item" + i).children().children().children(".itemAttributes").html(htmlString)
            $("#item" + i).children().children().children(".itemAttributes").children(".itemWeight").text(magicItems[i]["weight"] + " lbs")
            htmlString = ""
        }

        if (magicItems[i]["ac"]) {
            htmlString = $("#item" + i).children().children().children(".itemAttributes").html()
            htmlString += "<emph>AC: </emph><span class=\"itemAC\"></span><br/>"
            $("#item" + i).children().children().children(".itemAttributes").html(htmlString)
            $("#item" + i).children().children().children(".itemAttributes").children(".itemAC").text(magicItems[i]["ac"])
            htmlString = ""
        }

        if (magicItems[i]["dmg1"]) {
            htmlString = $("#item" + i).children().children().children(".itemAttributes").html()
            htmlString += "<emph>Damage: </emph><span class=\"itemDMG\"></span><br/>"
            $("#item" + i).children().children().children(".itemAttributes").html(htmlString)
            if (magicItems[i]["dmgtype"]) {
                $("#item" + i).children().children().children(".itemAttributes").children(".itemDMG").text(magicItems[i]["dmg1"] + " " + magicItems[i]["dmgtype"])
            } else {
                $("#item" + i).children().children().children(".itemAttributes").children(".itemDMG").text(magicItems[i]["dmg1"])
            }            
            htmlString = ""
        }

        if (magicItems[i]["range"]) {
            htmlString = $("#item" + i).children().children().children(".itemAttributes").html()
            htmlString += "<emph>Range: </emph><span class=\"itemRNG\"></span><br/>"
            $("#item" + i).children().children().children(".itemAttributes").html(htmlString)
            $("#item" + i).children().children().children(".itemAttributes").children(".itemRNG").text(magicItems[i]["range"])
            htmlString = ""
        }

        if (magicItems[i]["strength"]) {
            htmlString = $("#item" + i).children().children().children(".itemAttributes").html()
            htmlString += "<emph>Min Str: </emph><span class=\"itemStrReq\"></span><br/>"
            $("#item" + i).children().children().children(".itemAttributes").html(htmlString)
            $("#item" + i).children().children().children(".itemAttributes").children(".itemStrReq").text(magicItems[i]["strength"])
            htmlString = ""
        }

        if (magicItems[i]["stealth"]) {
            htmlString = $("#item" + i).children().children().children(".itemAttributes").html()
            htmlString += "<emph>Disadvantage on Stealth Rolls</emph><br/>"
            $("#item" + i).children().children().children(".itemAttributes").html(htmlString)
            htmlString = ""
        }

        if (magicItems[i]["rarity"]) {
            htmlString = $("#item" + i).children().children().children(".itemAttributes").html()
            htmlString += "<br/><emph>Rarity: </emph><span class=\"itemRarity\"></span><br/>"
            $("#item" + i).children().children().children(".itemAttributes").html(htmlString)
            $("#item" + i).children().children().children(".itemAttributes").children(".itemRarity").text(magicItems[i]["rarity"])
            htmlString = ""
            itemFilterString += "rarity:" + magicItems[i]["rarity"]
        }




        if (magicItems[i]["text"] != undefined) {
            if (typeof (magicItems[i]["text"]) == "object") {
                for (let j = 0; j < magicItems[i]["text"].length; j++) {
                    if (magicItems[i]["text"][j].search("Requires Attunement") != -1) {
                        htmlString += "<p><h5>" + magicItems[i]["text"][j] + "</h5></p>";
                    } else {
                        htmlString += "<p>" + magicItems[i]["text"][j] + "</p>";
                    }
                }
            } else {
                htmlString = "<p>" + magicItems[i]["text"] + "</p>"
            }
        }
        $("#item" + i).children().children().children(".itemDesc").html(htmlString)
        $("#item" + i).addClass("grid-item")
        if (magicItems[i]["homebrew"] != undefined) {
            $("#item" + i).children().addClass("homebrew-card")
        }
        $("#item" + i).children().children().children(".itemFilters").html(itemFilterString)
        htmlString = "";
        itemFilterString = ""
    }

    setTimeout( function() {getFilterCount()},500);
}

function gearNameFilter() {
    var input, filter, table, tr, td;
    input = document.getElementById("gearSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("gearTable");
    tr = table.getElementsByTagName("tr");
    theads = table.getElementsByClassName("gearMidHead");
    if (filter != "") {
        for (let i = 0; i < theads.length; i++) {
            theads[i].style.display = "none";
        }
    } else {
        for (let i = 0; i < theads.length; i++) {
            theads[i].style.display = "";
        }
    }

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 && txtValue != null) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function cardNameCopy(el) {

    const cpEl = document.createElement('textarea');
    cpEl.value = $(el).siblings()[1].innerText;
    document.body.appendChild(cpEl);
    cpEl.select();
    document.execCommand('copy');
    document.body.removeChild(cpEl);

    $(".tooltiptext").text("Copied");
    $(".tooltiptext").css("background-color","goldenrod");
    $(".tooltiptext").css("color","black");

    setTimeout(function(){ 
        $(".tooltiptext").text("Copy Link");    
        $(".tooltiptext").css("background-color","black");
        $(".tooltiptext").css("color","white");
    }, 500)
}


function applyTemplate(el) {
    $this = $(el)

    let currTemp = $this[0].selectedOptions[0]["value"]
    let monsterID = ($this.parents(".monster-item")[0]["id"]).split("monster")[1]
    let temp = template[currTemp];

    $monster = $("#monster"+monsterID)

    // Rebuild the monster before doing anything else. This will reset the card to its default, untemplated state.
    rebuildMonster(monsterID);

    if (currTemp != "") {
        //Find original proficiency bonus
        let cr = monster[monsterID]["cr"].split(" ")[0];
        let prof = 0;

        switch (cr) {
            case "0":
            case "1/8":
            case "1/4":
            case "1/2":
            case "1":
            case "2":
            case "3":
            case "4":
                prof = 2;
                break;
            case "5":
            case "6":
            case "7":
            case "8":
                prof = 3;
                break;
            case "9":
            case "10":
            case "11":
            case "12":
                prof = 4;
                break;            
            case "13":
            case "14":
            case "15":
            case "16":
                prof = 5;
                break;            
            case "17":
            case "18":
            case "19":
            case "20":
                prof = 6;
                break;            
            case "21":
            case "22":
            case "23":
            case "24":
                prof = 7;
                break;            
            case "25":
            case "26":
            case "27":
            case "28":
                prof = 8;
                break;            
            case "29":
            case "30":
                prof = 9;
                break;
            default:
                prof = 4;
                break;
        }

        //Modify name
        if (temp["displayOrder"] == 0) {
            $monster.find(".monsterName").text(temp["displayName"] + monster[monsterID]["name"])
        } else {
            $monster.find(".monsterName").text(monster[monsterID]["name"] + temp["displayName"])
        }

        //Modify size
        if (temp["sizeMod"] != "none") {
            let monsterSize = monster[monsterID]["size"]
            let sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"]
            let monsterSizeIndex = sizes.indexOf(monsterSize);

            if (typeof(temp["sizeMod"]) == "string") {
                $monster.find(".monsterSize").text(temp["sizeMod"])
            } else {
                $monster.find(".monsterSize").text(sizes[monsterSizeIndex + temp["sizeMod"]])
            }

        } else {
            $monster.find(".monsterSize").text(monster[monsterID]["size"])
        }

        //Modify type
        if (temp["typeMod"] != "none") {
            $monster.find(".monsterType").text(temp["typeMod"] + ",")
        } else {
            $monster.find(".monsterType").text(monster[monsterID]["type"] + ",")
        }

        //Modify alignment
        if (temp["alignmentMod"] != "none") {
            $monster.find(".monsterAlignment").text(temp["alignmentMod"])
        } else {
            $monster.find(".monsterAlignment").text(toTitleCase(monster[monsterID]["alignment"]))
        }

        //Modify AC
        if (temp["acModType"] != "none") {
            if (temp["acModType"] == "mod") {
            if (monster[monsterID]["ac"].split("(")[1] != undefined) {
                $monster.find(".monsterAC").html("<emph>AC: </emph>" + (Number(monster[monsterID]["ac"].split("(")[0].split(" ")[0]) + Number(temp["acMod"])) + " (" + monster[monsterID]["ac"].split("(")[1]);
            } else {
                $monster.find(".monsterAC").html("<emph>AC: </emph>" + (Number(monster[monsterID]["ac"]) + Number(temp["acMod"])));
            }
        } else {
            $monster.find(".monsterAC").html("<emph>AC: </emph>" + temp["acMod"]);
        }
        } else {
            $monster.find(".monsterAC").html("<emph>AC: </emph>" + monster[monsterID]["ac"]);
        }


        //Modify ability scores
        let abilities = ["str", "dex", "con", "wis", "int", "cha"];
        let newAbilityScores = {}

        let oldAbilityMods = {}
        let newAbilityMods = {}


        for (let i = 0; i < abilities.length; i ++) {
            switch (temp[abilities[i]+"Type"]) {
                case "set": 
                    $monster.find(".monster"+toTitleCase(abilities[i])).html("<emph>"+toTitleCase(abilities[i])+": </emph>" + temp[abilities[i]] + " (" + findStatMod(temp[abilities[i]]) + ") &emsp;")
                    newAbilityScores[abilities[i]] = temp[abilities[i]]
                    oldAbilityMods[abilities[i]] = findStatMod(Number(monster[monsterID][abilities[i]]))
                    newAbilityMods[abilities[i]] = findStatMod(Number(newAbilityScores[abilities[i]]))
                    break;
                case "mod": 
                    $monster.find(".monster"+toTitleCase(abilities[i])).html("<emph>"+toTitleCase(abilities[i])+": </emph>" + (Number(monster[monsterID][abilities[i]]) + temp[abilities[i]]) + " (" + findStatMod((Number(monster[monsterID][abilities[i]]) + temp[abilities[i]])) + ") &emsp;")
                    newAbilityScores[abilities[i]] = Number(monster[monsterID][abilities[i]]) + temp[abilities[i]]                    
                    oldAbilityMods[abilities[i]] = findStatMod(Number(monster[monsterID][abilities[i]]))
                    newAbilityMods[abilities[i]] = findStatMod(Number(newAbilityScores[abilities[i]]))
                    break;
                case "min": 
                    $monster.find(".monster"+toTitleCase(abilities[i])).html("<emph>"+toTitleCase(abilities[i])+": </emph>" + Math.min(Number(monster[monsterID][abilities[i]]), temp[abilities[i]]) + " (" + findStatMod(Math.min(Number(monster[monsterID][abilities[i]]), temp[abilities[i]])) + ") &emsp;")
                    newAbilityScores[abilities[i]] = Math.min(Number(monster[monsterID][abilities[i]]), temp[abilities[i]])
                    oldAbilityMods[abilities[i]] = findStatMod(Number(monster[monsterID][abilities[i]]))
                    newAbilityMods[abilities[i]] = findStatMod(Number(newAbilityScores[abilities[i]]))
                    break;
                case "max": 
                    $monster.find(".monster"+toTitleCase(abilities[i])).html("<emph>"+toTitleCase(abilities[i])+": </emph>" + Math.max(Number(monster[monsterID][abilities[i]]), temp[abilities[i]]) + " (" + findStatMod(Math.max(Number(monster[monsterID][abilities[i]]), temp[abilities[i]])) + ") &emsp;")
                    newAbilityScores[abilities[i]] = Math.max(Number(monster[monsterID][abilities[i]]), temp[abilities[i]])
                    oldAbilityMods[abilities[i]] = findStatMod(Number(monster[monsterID][abilities[i]]))
                    newAbilityMods[abilities[i]] = findStatMod(Number(newAbilityScores[abilities[i]]))
                    break;
                default:
                    $monster.find(".monster"+toTitleCase(abilities[i])).html("<emph>"+toTitleCase(abilities[i])+": </emph>" + monster[monsterID][abilities[i]] + " (" + findStatMod(monster[monsterID][abilities[i]]) + ") &emsp;")
                    newAbilityScores[abilities[i]] = Number( monster[monsterID][abilities[i]])
                    oldAbilityMods[abilities[i]] = findStatMod(Number(monster[monsterID][abilities[i]]))
                    newAbilityMods[abilities[i]] = findStatMod(Number(newAbilityScores[abilities[i]]))
                    break;
            }
        }  


        let hitDieSizes = ["d2", "d4", "d6", "d8", "d10", "d12", "d20", "d24"];
        let newHitDie = ""
        let newHitDice = ""

        //Modify HP
        if (temp["hpMod"] != "none") {

            if (temp["hitDieMod"] != undefined) {
                newHitDie = hitDieSizes[hitDieSizes.indexOf(monster[monsterID]["hitDieSize"])+temp["hitDieMod"]]
                if (newHitDie == undefined) {
                    newHitDie = monster[monsterID]["hitDieSize"];
                }
            }
            if (temp["hitDiceMod"] != undefined) {
                newHitDice = String(Number(monster[monsterID]["hitDice"]) + Number(temp["hitDiceMod"]))
            }

            if (newHitDice == "") {
                newHitDice = monster[monsterID]["hitDice"]
            }
            if (newHitDie == "") {
                newHitDie = monster[monsterID]["hitDieSize"]
            }
            
            let newConAdd = Number(newHitDice) * findStatMod(newAbilityScores["con"])
            let newHP = (Math.ceil((Number(newHitDie.split("d")[1]) + 1) / 2 * Number(newHitDice))) + newConAdd

            let conAddString = ""

            if (newConAdd >= 0) {
                conAddString = "+" + newConAdd
            } else {
                conAddString = newConAdd
            }

            $monster.find(".monsterHP").html("<emph>Hit Points: </emph>" + newHP + " (" + newHitDice + newHitDie + conAddString + ")");
        } else {
            $monster.find(".monsterHP").html("<emph>Hit Points: </emph>" + monster[monsterID]["hp"]);
        }
        

        //Modify traits
        if (temp["traitModType"] != "none"){
                htmlString = ""   
                
                    if (typeof temp["trait"][0] != undefined) {
                        for (let j = 0; j < temp["trait"].length; j++) {
                            if (temp["trait"][j]["text"] != undefined) {
                                if (typeof temp["trait"][j]["text"] == "object") {
                                    htmlString += "<p><emph><em>" + temp["trait"][j]["name"] + ": </em></emph>" + temp["trait"][j]["text"][0] + "</p>";
                                    for (let k = 1; k < temp["trait"][j]["text"].length; k++) {
                                        if (temp["trait"][j]["text"][k].length != 0 ) {
                                        htmlString += "<p>&emsp;" + temp["trait"][j]["text"][k] + "</p>";
                                    }
                                    }
                                } else {
                                    htmlString += "<p><emph><em>" + temp["trait"][j]["name"] + ": </em></emph>" + temp["trait"][j]["text"] + "</p>";
                                }
                            } else {
                                htmlString += "<p><emph><em>" + temp["trait"][j]["name"] + "</em></emph></p>";
                            }
                        }
                    } else {
                        htmlString += "<p><emph><em>" + temp["trait"]["name"] + ": </em></emph>";
                        htmlString += temp["trait"]["text"] + "</p>";
                    }
                    
            if (temp["traitModType"] == "replace") {

                    $monster.find(".monsterTraits").html(htmlString)
        
                    htmlString = ""
    
            } else if (temp["traitModType"] == "add") {
                

                $monster.find(".monsterTraits").html($monster.find(".monsterTraits").html() + htmlString)
        
                htmlString = ""

            }

        }       

        //Modify senses
        if (temp["senseModType"] != "none") {
            if (temp["senseModType"] == "replace") {
                $monster.find(".monsterSenses").html("<emph>Senses: </emph>" + temp["senses"] + "<br/>")
            } else if (temp["senseModType"] == "add") {
                if (monster[monsterID]["senses"] != undefined) {
                    $monster.find(".monsterSenses").html("<emph>Senses: </emph>" + monster[monsterID]["senses"] + ", " + temp["senses"] + "<br/>")
                } else {
                    $monster.find(".monsterSenses").html("<emph>Senses: </emph>" + temp["senses"] + "<br/>")
                }                
            }
        }

        //Modify passive perception
        if (monster[monsterID]["passive"] != undefined) {
            $monster.find(".monsterPassPer").html("<emph>Passive Perception: </emph>" + (Number(monster[monsterID]["passive"]) + (findStatMod(newAbilityScores["wis"]) - findStatMod(Number(monster[monsterID]["wis"])))) + "<br/>")
        }

        //Modify damage resistances 
        if (temp["dmgResistModType"] != "none") {
            if (temp["dmgResistModType"] == "add") {
                if (monster[monsterID]["resist"] != undefined) {
                    $monster.find(".monsterResist").html("<emph>Damage Resistances: </emph>" + monster[monsterID]["resist"] + ", " + temp["resist"] + "<br/>")
                } else {
                    $monster.find(".monsterResist").html("<emph>Damage Resistances: </emph>" + temp["resist"] + "<br/>")
                }                
            } else if (temp["dmgResistModType"] == "replace") {                
                $monster.find(".monsterResist").html("<emph>Damage Resistances: </emph>" + temp["resist"] + "<br/>")
            }
        }

        //Modify damage vulnerabilities 
        if (temp["vulnerableModType"] != "none") {
            if (temp["vulnerableModType"] == "add") {
                if (monster[monsterID]["vulnerable"] != undefined) {
                    $monster.find(".monsterVulnerable").html("<emph>Damage Vulnerabilities: </emph>" + monster[monsterID]["vulnerable"] + ", " + temp["vulnerable"] + "<br/>")
                } else {
                    $monster.find(".monsterVulnerable").html("<emph>Damage Vulnerabilities: </emph>" + temp["vulnerable"] + "<br/>")
                }                
            } else if (temp["vulnerableModType"] == "replace") {                
                $monster.find(".monsterVulnerable").html("<emph>Damage Vulnerabilities: </emph>" + temp["vulnerable"] + "<br/>")
            }
        }

        //Modify damage immunities 
        if (temp["dmgImmuneModType"] != "none") {
            if (temp["dmgImmuneModType"] == "add") {
                if (monster[monsterID]["immune"] != undefined) {
                    $monster.find(".monsterImmune").html("<emph>Damage Immunities: </emph>" + monster[monsterID]["immune"] + ", " + temp["immune"] + "<br/>")
                } else {
                    $monster.find(".monsterImmune").html("<emph>Damage Immunities: </emph>" + temp["immune"] + "<br/>")
                }                
            } else if (temp["dmgImmuneModType"] == "replace") {                
                $monster.find(".monsterImmune").html("<emph>Damage Immunities: </emph>" + temp["immune"] + "<br/>")
            }
        }

        //Modify condition immunities
        if (temp["condImmuneModType"] != "none") {
            if (temp["condImmuneModType"] == "add") {
                if (monster[monsterID]["conditionImmune"] != undefined) {
                    $monster.find(".monsterCondImmune").html("<emph>Condition Immunities: </emph>" + monster[monsterID]["conditionImmune"] + ", " + temp["conditionImmune"] + "<br/>")
                } else {
                    $monster.find(".monsterCondImmune").html("<emph>Condition Immunities: </emph>" + temp["conditionImmune"] + "<br/>")
                }                
            } else if (temp["condImmuneModType"] == "replace") {                
                $monster.find(".monsterCondImmune").html("<emph>Condition Immunities: </emph>" + temp["conditionImmune"] + "<br/>")
            }
        }

        //Modify saves
        if (monster[monsterID]["saveObj"] != undefined) {
            htmlString = "<emph>Saves: </emph>"
            let saveKeys = Object.keys(monster[monsterID]["saveObj"])
            for (let j = 0; j < saveKeys.length; j ++) {
                htmlString += toTitleCase(saveKeys[j]) + " +" + (Number(monster[monsterID]["saveObj"][saveKeys[j]]) - Number(oldAbilityMods[saveKeys[j]]) + Number(newAbilityMods[saveKeys[j]]))
                if (j < saveKeys.length-1) {
                    htmlString += ", "
                }
            }
            htmlString += "<br/>"
            $monster.find(".monsterSave").html(htmlString)
        }

        //Modify skills
        if (monster[monsterID]["skillObj"] != undefined) {
            htmlString = "<emph>Skill: </emph>"
            let skillKeys = Object.keys(monster[monsterID]["skillObj"])
            for (let j = 0; j < skillKeys.length; j ++) {
                htmlString += skillKeys[j] + " +" + (Number(monster[monsterID]["skillObj"][skillKeys[j]]) - Number(oldAbilityMods[skillAbilities[skillKeys[j]]]) + Number(newAbilityMods[skillAbilities[skillKeys[j]]]))
                if (j < skillKeys.length-1) {
                    htmlString += ", "
                }
            }
            htmlString += "<br/>"
            $monster.find(".monsterSkill").html(htmlString)
        }

        // Modify speeds


        // Modify languages


        // Modify legendary

        
        // "Modify" cr
        $monster.find(".monsterCR").html($monster.find(".monsterCR").html() + " originally; use your discretion with templates.")

        //Modify actions
        if (temp["actionModType"] != "none") {
            htmlString = ""
            if (temp["action"] != undefined) {
                $monster.find(".monsterActionTitle").html("<h4 style=\"text-align: left !important;\">Actions</h4>")
                $monster.find(".monsterActionTitle").next().css("border-bottom","1px solid goldenrod")
                
                if (typeof temp["action"][0] != "undefined") {
                    for (let j = 0; j < temp["action"].length; j++) {
                        if (temp["action"][j]["text"] != undefined) {
                            if (typeof temp["action"][j]["text"] == "object") {
                                htmlString += "<p><emph><em>" + temp["action"][j]["name"] + ": </em></emph>" + temp["action"][j]["text"][0] + "</p>";
                                for (let k = 1; k < temp["action"][j]["text"].length; k++) {
                                    htmlString += "<p>&emsp;" + temp["action"][j]["text"][k] + "</p>";
                                }
                            } else {
                                htmlString += "<p><emph><em>" + temp["action"][j]["name"] + ": </em></emph>" + temp["action"][j]["text"] + "</p>";
                            }
                        } else {
                            htmlString += "<p><emph><em>" + temp["action"][j]["name"] + "</em></emph></p>";
                        }
                    }
                } else {
                    htmlString += "<p><emph><em>" + temp["action"]["name"] + ": </em></emph>";
                    htmlString += temp["action"]["text"] + "</p>";
                }
                
                
                if (temp["actionModType"] == "replace") {
                    $monster.find(".monsterActions").html(htmlString)
                } else if (temp["actionModType"] == "add") {
                    $monster.find(".monsterActions").html($monster.find(".monsterActions").html() + htmlString)
                }
                
    
                htmlString = ""
            } else {
                $monster.find(".monsterActionTitle").html("")
                $monster.find(".monsterActionTitle").next().css("border-bottom","0px solid goldenrod")
                $monster.find(".monsterActions").html("")
            }
        }


        $monster.children().addClass("template-card")
    } else {
        rebuildMonster(monsterID)
    }

    $('.monsterGrid').isotope({
        sortBy: 'name'
    })
}

function rebuildMonster(id) {
    let htmlString = "";
    let monsterFilterString = "";

        if (monster[id]["homebrew"] != undefined) {
            $("#monster" + id).find(".monsterName").text(monster[id]["name"] + " (Homebrew)")
            monsterFilterString += "special:homebrew, "
        } else {
            $("#monster" + id).find(".monsterName").text(monster[id]["name"])
        }

        if (monster[id]["template"] != undefined) {
            monsterFilterString += "special:template, "
        }

        $("#monster" + id).find(".copyText").text(String(window.location).split('?s=')[0] + "?s=" + encodeURIComponent(monster[id]["name"]))

        
        if (monster[id]["size"] != undefined) {
            htmlString += "<em>" + monster[id]["size"];
            monsterFilterString += "size:"+monster[id]["size"] + ", "
            $("#monster" + id).find(".monsterSize").text(monster[id]["size"])
        }
        if (monster[id]["type"] != undefined) {
            htmlString += " " + monster[id]["type"]            
            monsterFilterString += "type:"+monster[id]["type"] + ", "
            $("#monster" + id).find(".monsterType").text(monster[id]["type"] + ",")
        }
        if (monster[id]["alignment"] != undefined) {
            htmlString += ", " + toTitleCase(monster[id]["alignment"]) + "</em>"
            $("#monster" + id).find(".monsterAlignment").html(toTitleCase(monster[id]["alignment"]))
        }

        htmlString = ""

        if (monster[id]["ac"] != undefined) {
            $("#monster" + id).find(".monsterAC").html("<emph>AC: </emph>" + monster[id]["ac"])            
            monsterFilterString += "ac:"+monster[id]["ac"] + ", "
        }
        if (monster[id]["hp"] != undefined) {
            $("#monster" + id).find(".monsterHP").html("<emph>Hit Points: </emph>" + monster[id]["hp"])
        }
        if (monster[id]["speed"] != undefined) {
            $("#monster" + id).find(".monsterSpeed").html("<emph>Speed: </emph>" + monster[id]["speed"])
        }


        if (monster[id]["str"] != undefined) {
            $("#monster" + id).find(".monsterStr").html("<emph>Str: </emph>" + monster[id]["str"] + " (" + findStatMod(monster[id]["str"]) + ") &emsp;")
        }
        if (monster[id]["dex"] != undefined) {
            $("#monster" + id).find(".monsterDex").html("<emph>Dex: </emph>" + monster[id]["dex"] + " (" + findStatMod(monster[id]["dex"]) + ") &emsp;")
        }
        if (monster[id]["con"] != undefined) {
            $("#monster" + id).find(".monsterCon").html("<emph>Con: </emph>" + monster[id]["con"] + " (" + findStatMod(monster[id]["con"]) + ") &emsp;")
        }
        if (monster[id]["int"] != undefined) {
            $("#monster" + id).find(".monsterInt").html("<emph>Int: </emph>" + monster[id]["int"] + " (" + findStatMod(monster[id]["int"]) + ") &emsp;")
        }
        if (monster[id]["wis"] != undefined) {
            $("#monster" + id).find(".monsterWis").html("<emph>Wis: </emph>" + monster[id]["wis"] + " (" + findStatMod(monster[id]["wis"]) + ") &emsp;")
        }
        if (monster[id]["cha"] != undefined) {
            $("#monster" + id).find(".monsterCha").html("<emph>Cha: </emph>" + monster[id]["cha"] + " (" + findStatMod(monster[id]["cha"]) + ")")
        }

        if (monster[id]["saveObj"] != undefined) {
            htmlString = "<emph>Saves: </emph>"
            let saveKeys = Object.keys(monster[id]["saveObj"])
            for (let j = 0; j < saveKeys.length; j ++) {
                htmlString += toTitleCase(saveKeys[j]) + " +" + monster[id]["saveObj"][saveKeys[j]]
                if (j < saveKeys.length-1) {
                    htmlString += ", "
                }
            }
            htmlString += "<br/>"
            $("#monster" + id).find(".monsterSave").html(htmlString)
        } else {
            $("#monster" + id).find(".monsterSave").html("")
        }

        htmlString = ""

        if (monster[id]["skillObj"] != undefined) {
            htmlString = "<emph>Skill: </emph>"
            let skillKeys = Object.keys(monster[id]["skillObj"])
            for (let j = 0; j < skillKeys.length; j ++) {
                htmlString += skillKeys[j] + " +" + monster[id]["skillObj"][skillKeys[j]]
                if (j < skillKeys.length-1) {
                    htmlString += ", "
                }
            }
            htmlString += "<br/>"
            $("#monster" + id).find(".monsterSkill").html(htmlString)
        } else {
            $("#monster" + id).find(".monsterSkill").html("")
        }

        htmlString = ""

        if (monster[id]["resist"] != undefined) {
            $("#monster" + id).find(".monsterResist").html("<emph>Damage Resistances: </emph>" + monster[id]["resist"] + "<br/>")
        }  else {
            $("#monster" + id).find(".monsterResist").html("")
        }       

        if (monster[id]["vulnerable"] != undefined) {
            $("#monster" + id).find(".monsterVulnerable").html("<emph>Damage Vulnerabilities: </emph>" + monster[id]["vulnerable"] + "<br/>")
        } else {
            $("#monster" + id).find(".monsterVulnerable").html("")
        }

        if (monster[id]["immune"] != undefined) {
            $("#monster" + id).find(".monsterImmune").html("<emph>Damage Immunities: </emph>" + monster[id]["immune"] + "<br/>")
        } else {
            $("#monster" + id).find(".monsterImmune").html("")
        }

        if (monster[id]["conditionImmune"] != undefined) {
            $("#monster" + id).find(".monsterCondImmune").html("<emph>Condition Immunities: </emph>" + monster[id]["conditionImmune"] + "<br/>")
        } else {
            $("#monster" + id).find(".monsterCondImmune").html("")
        }

        if (monster[id]["senses"] != undefined) {
            $("#monster" + id).find(".monsterSenses").html("<emph>Senses: </emph>" + monster[id]["senses"] + "<br/>")
        } else {
            $("#monster" + id).find(".monsterSenses").html("")
        }

        if (monster[id]["passive"] != undefined) {
            $("#monster" + id).find(".monsterPassPer").html("<emph>Passive Perception: </emph>" + monster[id]["passive"] + "<br/>")
        } else {
            $("#monster" + id).find(".monsterPassPer").html("")
        }

        if (monster[id]["languages"] != undefined) {
            $("#monster" + id).find(".monsterLanguages").html("<emph>Languages: </emph>" + monster[id]["languages"] + "<br/>")
        } else {
            $("#monster" + id).find(".monsterLanguages").html("")
        }

        if (monster[id]["cr"] != undefined) {
            $("#monster" + id).find(".monsterCR").html("<emph>Challenge: </emph>" + monster[id]["cr"])            
            monsterFilterString += "cr:"+monster[id]["cr"] + ", "
        }




        if (monster[id]["trait"] != undefined) {
            
            if (typeof monster[id]["trait"][0] != "undefined") {
                for (let j = 0; j < monster[id]["trait"].length; j++) {
                    if (monster[id]["trait"][j]["text"] != undefined) {
                        if (typeof monster[id]["trait"][j]["text"] == "object") {
                            htmlString += "<p><emph><em>" + monster[id]["trait"][j]["name"] + ": </em></emph>" + monster[id]["trait"][j]["text"][0] + "</p>";
                            for (let k = 1; k < monster[id]["trait"][j]["text"].length; k++) {
                                if (monster[id]["trait"][j]["text"][k].length != 0 ) {
                                htmlString += "<p>&emsp;" + monster[id]["trait"][j]["text"][k] + "</p>";
                            }
                            }
                        } else {
                            htmlString += "<p><emph><em>" + monster[id]["trait"][j]["name"] + ": </em></emph>" + monster[id]["trait"][j]["text"] + "</p>";
                        }
                    } else {
                        htmlString += "<p><emph><em>" + monster[id]["trait"][j]["name"] + "</em></emph></p>";
                    }
                }
            } else {
                htmlString += "<p><emph><em>" + monster[id]["trait"]["name"] + ": </em></emph>";
                htmlString += monster[id]["trait"]["text"] + "</p>";
            }
            
            
            
            
            $("#monster" + id).find(".monsterTraits").html(htmlString)

            htmlString = ""
            
        } else {
            $("#monster" + id).find(".monsterTraits").html("")
        }

        if (monster[id]["action"] != undefined) {
            $("#monster" + id).find(".monsterActionTitle").html("<h4 style=\"text-align: left !important;\">Actions</h4>")
            $("#monster" + id).find(".monsterActionTitle").next().css("border-bottom","1px solid goldenrod")
            
            if (typeof monster[id]["action"][0] != "undefined") {
                for (let j = 0; j < monster[id]["action"].length; j++) {
                    if (monster[id]["action"][j]["text"] != undefined) {
                        if (typeof monster[id]["action"][j]["text"] == "object") {
                            htmlString += "<p><emph><em>" + monster[id]["action"][j]["name"] + ": </em></emph>" + monster[id]["action"][j]["text"][0] + "</p>";
                            for (let k = 1; k < monster[id]["action"][j]["text"].length; k++) {
                                htmlString += "<p>&emsp;" + monster[id]["action"][j]["text"][k] + "</p>";
                            }
                        } else {
                            htmlString += "<p><emph><em>" + monster[id]["action"][j]["name"] + ": </em></emph>" + monster[id]["action"][j]["text"] + "</p>";
                        }
                    } else {
                        htmlString += "<p><emph><em>" + monster[id]["action"][j]["name"] + "</em></emph></p>";
                    }
                }
            } else {
                htmlString += "<p><emph><em>" + monster[id]["action"]["name"] + ": </em></emph>";
                htmlString += monster[id]["action"]["text"] + "</p>";
            }
            
            
            
            
            $("#monster" + id).find(".monsterActions").html(htmlString)

            htmlString = ""
        } else {
            $("#monster" + id).find(".monsterActionTitle").html("")
            $("#monster" + id).find(".monsterActionTitle").next().css("border-bottom","0px solid goldenrod")
            $("#monster" + id).find(".monsterActions").html("")
        }

        if (monster[id]["legendary"] != undefined) {
            $("#monster" + id).find(".monsterLegendaryTitle").html("<h4 style=\"text-align: left !important;\">Legendary Actions</h4><div style=\"border-bottom: 1px solid goldenrod !important\"></div><br/>The "+monster[id]["name"]+" can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time, and only at the end of another creature's turn. The "+ monster[id]["name"] + " regains spent legendary actions at the start of its turn.")
            
            
            if (typeof monster[id]["legendary"][0] != "undefined") {
                for (let j = 0; j < monster[id]["legendary"].length; j++) {
                    if (monster[id]["legendary"][j]["text"] != undefined) {
                        if (typeof monster[id]["legendary"][j]["text"] == "object") {
                            htmlString += "<p><emph><em>" + monster[id]["legendary"][j]["name"] + ": </em></emph>" + monster[id]["legendary"][j]["text"][0] + "</p>";
                            for (let k = 1; k < monster[id]["legendary"][j]["text"].length; k++) {
                                htmlString += "<p>&emsp;" + monster[id]["legendary"][j]["text"][k] + "</p>";
                            }
                        } else {
                            htmlString += "<p><emph><em>" + monster[id]["legendary"][j]["name"] + ": </em></emph>" + monster[id]["legendary"][j]["text"] + "</p>";
                        }
                    } else {
                        htmlString += "<p><emph><em>" + monster[id]["legendary"][j]["name"] + "</em></emph></p>";
                    }
                }
            } else {
                htmlString += "<p><emph><em>" + monster[id]["legendary"]["name"] + ": </em></emph>";
                htmlString += monster[id]["legendary"]["text"] + "</p>";
            }
            
            
            
            
            $("#monster" + id).find(".monsterLegendary").html(htmlString)

            htmlString = ""
        }


        $("#monster" + id).find(".monsterFilters").text(monsterFilterString)
        
        $("#monster" + id).children().removeClass("template-card")

        if(monster[id]["homebrew"] != undefined) {
            $("#monster" + id).children().addClass("homebrew-card")
        }

        htmlString = "";
        monsterFilterString = ""
}

let skillAbilities = {
    "Acrobatics": "dex",
    "Animal Handling": "wis",
    "Arcana": "int",
    "Athletics": "str",
    "Deception": "cha",
    "History": "int",
    "Insight": "wis",
    "Intimidation": "cha",
    "Investigation": "int",
    "Medicine": "wis",
    "Nature": "int",
    "Perception": "wis",
    "Performance": "cha",
    "Persuasion": "cha",
    "Religion": "int",
    "Sleight of Hand": "dex",
    "Stealth": "dex",
    "Survival": "wis"
}