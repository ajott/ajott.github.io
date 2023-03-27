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


var dictDirect = {}

$(document).ready(function () {
    buildNavbar();
    setTimeout(function () {
        initializeModals();
    }, 300);

    $("#copyrightText").html(CRNotice)

});

var modalCount = 0;

function initializeModals() {
    $('skill').attr('onclick', 'buildModal(this,\'skill\')');
    $('talent').attr('onclick', 'buildModal(this,\'talent\')');
    $('condition').attr('onclick', 'buildModal(this,\'condition\')');
    $('weapon').attr('onclick', 'buildModal(this,\'weapon\')');
    $('armour').attr('onclick', 'buildModal(this,\'armour\')');
    $('weaponqual').attr('onclick', 'buildModal(this,\'qual\')');
    $('divineman').attr('onclick', 'buildModal(this,\'miracle\')');
    $('trait').attr('onclick', 'buildModal(this,\'trait\')');
    $('career').attr('onclick', 'buildModal(this,\'career\')');
    $('armourqual').attr('onclick', 'buildModal(this,\'armQual\')');
}

function buildModal(el, type, mast = 0) {
    // Used for building individual modal IDs
    modalCount++
    let srchPhrase = "";
    // Temporary until an overall fuse/dictionary can be attained
    let fuses = {
        "skill": skillFuse,
        "talent": talentFuse,
        "miracle": miracleFuse,
        "condition": conditionFuse,
        "qual": qualFuse,
        "spell": spellFuse,
        "weapon": weaponFuse,
        "armour": armourFuse,
        "trait": traitFuse,
        "career": careerFuse,
        "armQual": armourQualFuse
    }


    if (mast == 1) {
        srchPhrase = el
    } else {
        let htmlPhrase = el.innerText
        srchPhrase = htmlPhrase.split(' (')[0] // Get rid of specializations, such as Art (Engraving)
    }
    let srchRslt = fuses[type].search(srchPhrase)

    // Get the first result, which should be the closest match
    let dataRslt = srchRslt[0]["item"]


    var $div = $('#default-modal');

    var $klon = $div.clone().prop('id', 'modal' + modalCount).appendTo("#modalPlaceholder");

    $("#modal" + modalCount).html(modals[type])

    let htmlString = ""


    switch (type) {
        case 'skill':

            $("#modal" + modalCount + " .skillName").html(dataRslt["name"])


            $("#modal" + modalCount + " .skillChar").html(dataRslt["char"])

            if (dataRslt["spec"] != "") {
                $("#modal" + modalCount + " .skillTier").text(dataRslt["tier"] + ", Grouped")
                $("#modal" + modalCount + " .skillSpec").html("<b>Example Specialisations: </b>" + dataRslt["spec"])
            } else {
                $("#modal" + modalCount + " .skillSpec").html("")
                $("#modal" + modalCount + " .skillTier").text(dataRslt["tier"])
            }

            $("#modal" + modalCount + " .skillDesc").html(dataRslt["desc"])

            break;
        case "talent":

            $("#modal" + modalCount + " .talentName").html(dataRslt["name"])


            $("#modal" + modalCount + " .talentMax").html(dataRslt["max"])

            if (dataRslt["test"] != "") {
                $("#modal" + modalCount + " .talentTest").html("<b class=\"w3-tooltip TooltipLight\">Test:<span class=\"w3-text w3-tag w3-darkslate-l1 w3-small w3-round\" style=\"position:absolute;left:0;bottom:18px; padding: 1em;\">Gain +1 SL on successful tests with this skill</span></b> " + dataRslt["test"])
            } else {
                $("#modal" + modalCount + " .talentTest").html("")
            }

            $("#modal" + modalCount + " .talentDesc").html(dataRslt["desc"])

            break;
        case "condition":

            $("#modal" + modalCount + " .conditionName").html(dataRslt["name"])

            $("#modal" + modalCount + " .conditionDesc").html(dataRslt["desc"])

            break;
        case "qual":

            $("#modal" + modalCount + " .qualName").html(dataRslt["name"])

            $("#modal" + modalCount + " .qualDesc").html(dataRslt["desc"])

            break;
        case "armQual":

            $("#modal" + modalCount + " .qualName").html(dataRslt["name"])

            $("#modal" + modalCount + " .qualDesc").html(dataRslt["desc"])

            break;
        case "miracle":

            let isBlessing = (blessings.includes(dataRslt["name"]))

            if (isBlessing) {
                $("#modal" + modalCount + " .miracleName").html("Blessing of " + dataRslt["name"])
            } else {
                $("#modal" + modalCount + " .miracleName").html(dataRslt["name"])
            }

            if (isBlessing) {
                $("#modal" + modalCount + "  .miracleGod").text("")
            } else {
                $("#modal" + modalCount + "  .miracleGod").text(dataRslt["god"])
            }

            $("#modal" + modalCount + " .miracleRange").html(dataRslt["range"])
            $("#modal" + modalCount + " .miracleTarget").html(dataRslt["target"])
            $("#modal" + modalCount + " .miracleDuration").html(dataRslt["duration"])

            if (dataRslt["desc"] != undefined) {
                if (typeof (dataRslt["desc"]) == "object") {
                    for (let j = 0; j < dataRslt["desc"].length; j++) {
                        htmlString += "<p>" + dataRslt["desc"][j] + "</p>";
                    }
                } else {
                    htmlString = "<p>" + dataRslt["desc"] + "</p>"
                }
            }

            $("#modal" + modalCount + " .miracleDescription").html(htmlString)

            htmlString = "";

            break;
        case "spell":

            $("#modal" + modalCount + " .spellName").html(dataRslt["name"])

            if (dataRslt["lore"] == "Petty" || dataRslt["lore"] == "Arcane") {
                $("#modal" + modalCount + " .spellLore").text(dataRslt["lore"] + " Magic");
            } else {
                $("#modal" + modalCount + " .spellLore").text("Lore of " + dataRslt["lore"]);
            }

            $("#modal" + modalCount + " .spellCN").text(dataRslt["CN"])
            $("#modal" + modalCount + " .spellRange").html(dataRslt["range"])
            $("#modal" + modalCount + " .spellTarget").html(dataRslt["target"])
            $("#modal" + modalCount + " .spellDuration").html(dataRslt["duration"])

            if (dataRslt["description"] != undefined) {
                if (typeof (dataRslt["description"]) == "object") {
                    for (let j = 0; j < dataRslt["description"].length; j++) {
                        htmlString += "<p>" + dataRslt["description"][j] + "</p>";
                    }
                } else {
                    htmlString = "<p>" + dataRslt["description"] + "</p>"
                }
            }

            $("#modal" + modalCount + " .spellDescription").html(htmlString)

            htmlString = "";

            break;
        case "weapon":
            if (dataRslt["2h"] != undefined) {
                $("#modal" + modalCount + " .weapName").html(dataRslt["name"] + " (2H)")
            } else {
                $("#modal" + modalCount + " .weapName").html(dataRslt["name"])
            }
            $("#modal" + modalCount + " .weapGroup").html(dataRslt["group"])

            $("#modal" + modalCount + " .weapPrice").html("Price: " + dataRslt["price"])

            $("#modal" + modalCount + " .weapEnc").html("Encumbrance: " + dataRslt["enc"])

            $("#modal" + modalCount + " .weapAvail").html("Availability: " + dataRslt["avail"])

            $("#modal" + modalCount + " .weapReach").html("Reach/Range: " + dataRslt["reach"])

            $("#modal" + modalCount + " .weapDamage").html("Damage: " + dataRslt["damage"])

            if (dataRslt["qual"] != "") {
                $("#modal" + modalCount + " .weapQuals").html("Qualities/Flaws: " + dataRslt["qual"])
            }
            break;
        case "armour":
            $("#modal" + modalCount + " .weapName").html(dataRslt["name"])
            $("#modal" + modalCount + " .weapGroup").html(dataRslt["group"])

            $("#modal" + modalCount + " .weapPrice").html("Price: " + dataRslt["price"])

            $("#modal" + modalCount + " .weapEnc").html("Encumbrance: " + dataRslt["enc"])

            $("#modal" + modalCount + " .weapAvail").html("Availability: " + dataRslt["avail"])

            $("#modal" + modalCount + " .weapReach").html("Locations: " + dataRslt["loc"])

            $("#modal" + modalCount + " .weapDamage").html("APs: " + dataRslt["aps"])

            if (dataRslt["qual"] != "") {
                $("#modal" + modalCount + " .weapQuals").html("Qualities/Flaws: " + dataRslt["qual"])
            }
            break;
        case "trait":

            $("#modal" + modalCount + " .traitName").html(dataRslt["name"])

            $("#modal" + modalCount + " .traitDesc").html(dataRslt["desc"])

            break;
        case "career":
            $("#modal" + modalCount + " .careerName").text(dataRslt["name"])
            $("#modal" + modalCount + " .careerClass").text(dataRslt["class"])
            $("#modal" + modalCount + " .careerDesc").html("&ldquo;" + dataRslt["desc"] + "&rdquo;")
            $("#modal" + modalCount + " .careerRaces").html("<eh>" + dataRslt["races"] + "</eh>")

            $("#modal" + modalCount + " .career" + dataRslt["advances"][0] + "th").show()
            $("#modal" + modalCount + " .career" + dataRslt["advances"][0]).addClass("attr1").html("<img class=\"attrImg\" src=\"./img/cross_64.png\"></img>").show()
            $("#modal" + modalCount + " .career" + dataRslt["advances"][1] + "th").show()
            $("#modal" + modalCount + " .career" + dataRslt["advances"][1]).addClass("attr1").html("<img class=\"attrImg\" src=\"./img/cross_64.png\"></img>").show()
            $("#modal" + modalCount + " .career" + dataRslt["advances"][2] + "th").show()
            $("#modal" + modalCount + " .career" + dataRslt["advances"][2]).addClass("attr1").html("<img class=\"attrImg\" src=\"./img/cross_64.png\"></img>").show()

            $("#modal" + modalCount + " .career" + dataRslt["advances"][3] + "th").show()
            $("#modal" + modalCount + " .career" + dataRslt["advances"][3]).addClass("attr2").html("<img class=\"attrImg\" src=\"./img/axes_64.png\"></img>").show()
            $("#modal" + modalCount + " .career" + dataRslt["advances"][4] + "th").show()
            $("#modal" + modalCount + " .career" + dataRslt["advances"][4]).addClass("attr3").html("<img class=\"attrImg\" src=\"./img/skull_64.png\"></img>").show()
            $("#modal" + modalCount + " .career" + dataRslt["advances"][5] + "th").show()
            $("#modal" + modalCount + " .career" + dataRslt["advances"][5]).addClass("attr4").html("<img class=\"attrImg\" src=\"./img/shield_64.png\"></img>").show()

            $("#modal" + modalCount + " .careerIncome").html("<skill>" + dataRslt["incomeSkill"] + "</skill>")


            for (let k = 1; k < 5; k++) {
                let imgSrcs = ["./img/cross_64.png", "./img/axes_64_light.png", "./img/skull_64_light.png", "./img/shield_64_light.png"]
                $("#modal" + modalCount + " .careerpath" + k + " .path" + k + "name").html("<img src=\"" + imgSrcs[k - 1] + "\" class=\"oneemimg\"></img><br/>" + dataRslt["path" + k]["name"] + " &mdash; " + dataRslt["path" + k]["status"])

                for (let i = 0; i < dataRslt["path" + k]["skills"].length; i++) {
                    if (i == 0) {
                        htmlString += "<skill>"
                    } else {
                        htmlString += ", <skill>"
                    }
                    htmlString += dataRslt["path" + k]["skills"][i]
                    htmlString += "</skill>"
                }

                $("#modal" + modalCount + " .careerpath" + k + " .path" + k + "skills").html(htmlString)

                htmlString = ""

                for (let i = 0; i < dataRslt["path" + k]["talents"].length; i++) {
                    if (i == 0) {
                        htmlString += "<talent>"
                    } else {
                        htmlString += ", <talent>"
                    }
                    htmlString += dataRslt["path" + k]["talents"][i]
                    htmlString += "</talent>"
                }

                $("#modal" + modalCount + " .careerpath" + k + " .path" + k + "talents").html(htmlString)

                htmlString = ""

                for (let i = 0; i < dataRslt["path" + k]["trappings"].length; i++) {
                    if (i == 0) {
                        htmlString += "<span>"
                    } else {
                        htmlString += ", <span>"
                    }
                    htmlString += dataRslt["path" + k]["trappings"][i]
                    htmlString += "</span>"
                }

                $("#modal" + modalCount + " .careerpath" + k + " .path" + k + "trappings").html(htmlString)

                htmlString = ""
            }

            break;
    }

    $('#modal' + modalCount).on('click', function (e) {
        if (e.target !== this)
            return;
        hideModal(this)
    });

    $("#modal" + modalCount).show();

    initializeModals();
}


function hideModal(el) {
    let parDiv = $(el).parents(".resultModal")

    if (parDiv.length == 0) {
        $(el).remove()
    } else {
        parDiv.remove();
    }
}

function clearMasterSearch() {
    $('#masterSearchBox').val("")
    masterSearch()
}

function masterSearch() {
    $('#masterSearchOptions').html("")

    let searchTxt = $('#masterSearchBox').val()

    if (searchTxt == "") {
        $("#masterClearButton").hide()
        $("#masterSearchOptions").hide()
    } else {
        $("#masterClearButton").show()
        $("#masterSearchOptions").show()
    }

    let searchEl = document.getElementById('masterSearchBox')
    let y = searchEl.getBoundingClientRect().top + window.pageYOffset - 100
    window.scrollTo({ top: y, behavior: 'smooth' });

    let typeTexts = {
        "skill": "Skill",
        "talent": "Talent",
        "condition": "Condition",
        "spell": "Spell",
        "miracle": "Divine Manifestation",
        "career": "Career",
        "qual": "Weapon Quality/Flaw",
        "armQual": "Armour Quality/Flaw",
        "weapon": "Weapon",
        "armour": "Armour",
        "trait": "Creature Trait"
    }

    let srchRslt = masterFuse.search(searchTxt)
    srchRslt.length = 10;
    let rsltNum = 1
    srchRslt.forEach(result => {
        let rsltName = result["item"]["name"]
        let rsltType = result["item"]["type"]
        $('#masterSearchOptions').append("<div class=\"masterSearchResult w3-blue-grey w3-hover-grey\" tabindex=\"" + rsltNum + "\" onclick=\"buildModal(\'" + rsltName + "\',\'" + rsltType + "\',1)\">" + result["item"]["name"] + "&emsp; <em class=\"w3-small\" style=\"color: lightgrey;\">(" + typeTexts[rsltType] + ")</em></div>")
        rsltNum++
    });
}

function accordion(id, el) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        $('#' + id).removeClass("w3-hide").addClass("w3-show")
    } else {
        $('#' + id).removeClass("w3-show").addClass("w3-hide")
    }

    $this = $(el)
    $this.toggleClass('btn-selected')
}

function showMenu() {
    var x = document.getElementById("menu");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        $("#mobileMenuBtn").html("&times;")
    } else {
        x.className = x.className.replace(" w3-show", "");
        $("#mobileMenuBtn").html("&#9776;")
    }
}


function dropdownShow(str) {
    let elements = ["charDropdown", "magicDropdown", "religionDropdown", "skillDropdown", "combatDropdown", "equipDropdown"]

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

function outSkillSearch(el) {

    let baseURI = location.href.split("wfrpref")[0];
    let pageURI = baseURI + "wfrpref/skills.html#skillList?s=";
    let skillName = el.text().split(' (')[0];
    let skillURI = encodeURIComponent(skillName)

    let finalURI = pageURI + skillURI
    window.open(finalURI, '_blank');
}

function outTalentSearch(el) {
    let baseURI = location.href.split("wfrpref")[0];
    let pageURI = baseURI + "wfrpref/skills.html#talentList?s=";
    //let talentName = el.innerText.split(' (')[0];
    let talentName = el.text().split(' (')[0];
    let talentURI = encodeURIComponent(talentName)

    let finalURI = pageURI + talentURI
    window.open(finalURI, '_blank');
}


window.addEventListener('scroll', function (e) {

    if (document.documentElement.scrollTop > 60) {
        $("#headTitle").hide();
    } else if (document.documentElement.scrollTop <= 60) {
        $("#headTitle").show();
    }
});

function weaponFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("weaponSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("weaponTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    document.getElementById("weaponFamilySelect").options.selectedIndex = 0;
    document.getElementById("weaponClassSelect").options.selectedIndex = 0;
    document.getElementById("weaponBookSelect").options.selectedIndex = 0;
}

function talentFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("talentSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("talentTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    document.getElementById("talentTierSelect").options.selectedIndex = 0;
}

function talentTierFilter() {
    let selectBox = document.getElementById("talentTierSelect")

    let selection = selectBox.options[selectBox.selectedIndex].value;

    var input, filter, table, tr, td, i;
    input = selection;

    filter = input.toUpperCase();
    table = document.getElementById("talentTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "...") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    $("#talentSearch").val("")
}

function divFilter() {
    var input, table, tr, td, i;
    input = document.getElementById("divRoll").value;

    table = document.getElementById("divTable");

    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (inRangeInclusive(input, txtValue) || input == "") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function buildNavbar() {
    $('#navBarDiv').load("./navbar.html");
    $('#modalPlaceholder').load('./modals.html')
}


function buildCareerCard() {
    let htmlString = ""

    $("#careerCard .careerName").text(career[1]["name"])
    $("#careerCard .careerClass").text(career[1]["class"])
    $("#careerCard .careerDesc").html("&ldquo;" + career[1]["desc"] + "&rdquo;")
    $("#careerCard .careerRaces").html("<eh>" + career[1]["races"] + "</eh>")

    $("#careerCard .career" + career[1]["advances"][0]).addClass("attr1").html("<img class=\"attrImg\" src=\"./img/cross_64.png\"></img>")
    $("#careerCard .career" + career[1]["advances"][1]).addClass("attr1").html("<img class=\"attrImg\" src=\"./img/cross_64.png\"></img>")
    $("#careerCard .career" + career[1]["advances"][2]).addClass("attr1").html("<img class=\"attrImg\" src=\"./img/cross_64.png\"></img>")

    $("#careerCard .career" + career[1]["advances"][3]).addClass("attr2").html("<img class=\"attrImg\" src=\"./img/axes_64.png\"></img>")
    $("#careerCard .career" + career[1]["advances"][4]).addClass("attr3").html("<img class=\"attrImg\" src=\"./img/skull_64.png\"></img>")
    $("#careerCard .career" + career[1]["advances"][5]).addClass("attr4").html("<img class=\"attrImg\" src=\"./img/shield_64.png\"></img>")

    $("#careerCard .careerIncome").html("<skill>" + career[1]["incomeSkill"] + "</skill>")


    for (let k = 1; k < 5; k++) {
        $("#careerCard .careerpath" + k + " .path" + k + "name").html(career[1]["path" + k]["name"] + " &mdash; " + career[1]["path" + k]["status"])

        for (let i = 0; i < career[1]["path" + k]["skills"].length; i++) {
            if (i == 0) {
                htmlString += "<skill>"
            } else {
                htmlString += ", <skill>"
            }
            htmlString += career[1]["path" + k]["skills"][i]
            htmlString += "</skill>"
        }

        $("#careerCard .careerpath" + k + " .path" + k + "skills").html(htmlString)

        htmlString = ""

        for (let i = 0; i < career[1]["path" + k]["talents"].length; i++) {
            if (i == 0) {
                htmlString += "<talent>"
            } else {
                htmlString += ", <talent>"
            }
            htmlString += career[1]["path" + k]["talents"][i]
            htmlString += "</talent>"
        }

        $("#careerCard .careerpath" + k + " .path" + k + "talents").html(htmlString)

        htmlString = ""

        for (let i = 0; i < career[1]["path" + k]["trappings"].length; i++) {
            if (i == 0) {
                htmlString += "<em>"
            } else {
                htmlString += ", <em>"
            }
            htmlString += career[1]["path" + k]["trappings"][i]
            htmlString += "</em>"
        }

        $("#careerCard .careerpath" + k + " .path" + k + "trappings").html(htmlString)

        htmlString = ""
    }


}


$(document).ready(function () {
    skillFuse = new Fuse(skill, {
        keys: ["name"]
    })
});
$(document).ready(function () {
    talentFuse = new Fuse(talent, {
        keys: ["name"]
    })
});
$(document).ready(function () {
    miracleFuse = new Fuse(miracle, {
        keys: ["name"]
    })
});
$(document).ready(function () {
    conditionFuse = new Fuse(condition, {
        keys: ["name"]
    })
});
$(document).ready(function () {
    qualFuse = new Fuse(weaponQual, {
        keys: ["name"]
    })
});
$(document).ready(function () {
    spellFuse = new Fuse(spell, {
        keys: ["name"]
    })
});
$(document).ready(function () {
    weaponFuse = new Fuse(weapon, {
        keys: ["name"]
    })
});
$(document).ready(function () {
    traitFuse = new Fuse(trait, {
        keys: ["name"]
    })
});
$(document).ready(function () {
    careerFuse = new Fuse(career, {
        keys: ["name"]
    })
});
$(document).ready(function () {
    armourFuse = new Fuse(armour, {
        keys: ["name"]
    })
});
$(document).ready(function () {
    armourQualFuse = new Fuse(armourQual, {
        keys: ["name"]
    })
});


// $(document).ready(function () {
//     buildConditionTable();

// });

// function buildConditionTable() {
//     let htmlString = ""

//     Object.entries(condition).forEach(cond => {
//         htmlString += "<tr>"
//         htmlString += "<td>" + cond[1]["name"] + "</td>"
//         htmlString += "<td>" + cond[1]["desc"] + "</td>"

//         htmlString += "</tr>"
//     });

//     $("#conditionTable").html(htmlString)
// }

