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

        $("#spell" + i).children().children().children(".spellName").text(spell[i]["name"])
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

        $("#monster" + i).children().children().children(".monsterName").text(monster[i]["name"])

        if (monster[i]["size"] != undefined) {
            htmlString += "<em>" + monster[i]["size"];
            monsterFilterString += "size:"+monster[i]["size"] + ", "
        }
        if (monster[i]["type"] != undefined) {
            htmlString += " " + monster[i]["type"]            
            monsterFilterString += "type:"+monster[i]["type"] + ", "
        }
        if (monster[i]["alignment"] != undefined) {
            htmlString += ", " + toTitleCase(monster[i]["alignment"]) + "</em>"
        }

        $("#monster" + i).children().children().children().children(".monsterSizeTypeAlignment").html(htmlString)
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

        if (monster[i]["save"] != undefined) {
            $("#monster" + i).children().children().children(".monsterSave").html("<emph>Saves: </emph>" + monster[i]["save"] + "<br/>")
        }

        if (monster[i]["skill"] != undefined) {
            $("#monster" + i).children().children().children(".monsterSkill").html("<emph>Skill: </emph>" + monster[i]["skill"] + "<br/>")
        }

        if (monster[i]["resist"] != undefined) {
            $("#monster" + i).children().children().children(".monsterResist").html("<emph>Damage Resistances: </emph>" + monster[i]["resist"] + "<br/>")
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
                            htmlString += "<p><emph>" + monster[i]["trait"][j]["name"] + ": </emph>" + monster[i]["trait"][j]["text"][0] + "</p>";
                            for (let k = 1; k < monster[i]["trait"][j]["text"].length; k++) {
                                if (monster[i]["trait"][j]["text"][k].length != 0 ) {
                                htmlString += "<p>&emsp;" + monster[i]["trait"][j]["text"][k] + "</p>";
                            }
                            }
                        } else {
                            htmlString += "<p><emph>" + monster[i]["trait"][j]["name"] + ": </emph>" + monster[i]["trait"][j]["text"] + "</p>";
                        }
                    } else {
                        htmlString += "<p><emph>" + monster[i]["trait"][j]["name"] + "</emph></p>";
                    }
                }
            } else {
                htmlString += "<p><emph>" + monster[i]["trait"]["name"] + ": </emph>";
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
                            htmlString += "<p><emph>" + monster[i]["action"][j]["name"] + ": </emph>" + monster[i]["action"][j]["text"][0] + "</p>";
                            for (let k = 1; k < monster[i]["action"][j]["text"].length; k++) {
                                htmlString += "<p>&emsp;" + monster[i]["action"][j]["text"][k] + "</p>";
                            }
                        } else {
                            htmlString += "<p><emph>" + monster[i]["action"][j]["name"] + ": </emph>" + monster[i]["action"][j]["text"] + "</p>";
                        }
                    } else {
                        htmlString += "<p><emph>" + monster[i]["action"][j]["name"] + "</emph></p>";
                    }
                }
            } else {
                htmlString += "<p><emph>" + monster[i]["action"]["name"] + ": </emph>";
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
                            htmlString += "<p><emph>" + monster[i]["legendary"][j]["name"] + ": </emph>" + monster[i]["legendary"][j]["text"][0] + "</p>";
                            for (let k = 1; k < monster[i]["legendary"][j]["text"].length; k++) {
                                htmlString += "<p>&emsp;" + monster[i]["legendary"][j]["text"][k] + "</p>";
                            }
                        } else {
                            htmlString += "<p><emph>" + monster[i]["legendary"][j]["name"] + ": </emph>" + monster[i]["legendary"][j]["text"] + "</p>";
                        }
                    } else {
                        htmlString += "<p><emph>" + monster[i]["legendary"][j]["name"] + "</emph></p>";
                    }
                }
            } else {
                htmlString += "<p><emph>" + monster[i]["legendary"]["name"] + ": </emph>";
                htmlString += monster[i]["legendary"]["text"] + "</p>";
            }
            
            
            
            
            $("#monster" + i).children().children().children(".monsterLegendary").html(htmlString)

            htmlString = ""
        }


        $("#monster" + i).children().children().children(".monsterFilters").text(monsterFilterString)
        $("#monster" + i).addClass("monster-item")

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

    if (!duplicate) {
        if(mod != 2 && mod != 3) {
            $this.addClass("w3-blue").removeClass("w3-grey")
        }
        monsterFilters.push(filterText);
    } else {
        if (mod != 1 && mod != 2) {
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

        $("#feat" + i).children().children().children(".featName").text(feat[i]["name"])
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
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function accordionSidebar(id) {
    var x = document.getElementById(id);
    let sidebarDivs = ["barbsidebar", "bardsidebar", "clericsidebar", "druidsidebar", "fightersidebar", "monksidebar", "paladinsidebar", "rangersidebar", "roguesidebar", "sorcerersidebar", "warlocksidebar", "wizardsidebar"]

    for (let i = 0; i < sidebarDivs.length; i++) {
        if (sidebarDivs[i] != id) {
            $("#" + sidebarDivs[i]).removeClass("w3-show")
            document.getElementById(sidebarDivs[i]).previousElementSibling.className = document.getElementById(sidebarDivs[i]).previousElementSibling.className.replace("w3-goldenrod", "");
        }
    }

    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-goldenrod";
    } else {
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className = x.previousElementSibling.className.replace("w3-goldenrod", "");
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

        $("#item" + i).children().children().children(".itemName").text(magicItems[i]["name"])
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
                    htmlString += "<p>" + magicItems[i]["text"][j] + "</p>";
                }
            } else {
                htmlString = "<p>" + magicItems[i]["text"] + "</p>"
            }
        }
        $("#item" + i).children().children().children(".itemDesc").html(htmlString)
        $("#item" + i).addClass("grid-item")
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