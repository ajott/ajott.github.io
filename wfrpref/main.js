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
    $('test').attr('onclick', 'buildModal(this, \'skill\',0,1)');
    $('endeavour').attr('onclick', 'buildModal(this,\'endeavour\')');
    $('status').attr('onclick', 'buildModal(\'Income\',\'endeavour\',1)');
    $('a').attr('onclick', 'processAClick(this)');
    $('endeavour').attr('onclick', 'buildModal(this,\'endeavour\')');
}

function buildModal(el, type, mast = 0, isTest = 0) {
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
        "armQual": armourQualFuse,
        "endeavour": endeavourFuse,
        "betweenAdventureEvent": betweenAdventureEventFuse
    }


    if (mast == 1) {
        srchPhrase = el
    } else if (isTest == 1) {
        let htmlPhrase = el.innerText;
        let tstSplt = htmlPhrase.split(') ')[1].split(' (')[0] // eg "Challenging (+0) Perception Test" evaluates to "Perception Test" which then gets split to just "Perception"
    }
    else {
        let htmlPhrase = el.innerText;
        srchPhrase = htmlPhrase.split(' (')[0] // Get rid of specializations, such as Art (Engraving)
    }
    let srchRslt = fuses[type].search(srchPhrase)

    // Get the first result, which should be the closest match
    let dataRslt = srchRslt[0]["item"]


    var $div = $('#default-modal');

    var $klon = $div.clone().prop('id', 'modal' + modalCount).appendTo("#modalPlaceholder");

    $("#modal" + modalCount).html(modals[type])




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
            let miracleHTML = ""
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
                        miracleHTML += "<p>" + dataRslt["desc"][j] + "</p>";
                    }
                } else {
                    miracleHTML = "<p>" + dataRslt["desc"] + "</p>"
                }
            }

            $("#modal" + modalCount + " .miracleDescription").html(miracleHTML)

            miracleHTML = "";

            break;
        case "spell":
            let spellHTML = ""
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
                        spellHTML += "<p>" + dataRslt["description"][j] + "</p>";
                    }
                } else {
                    spellHTML = "<p>" + dataRslt["description"] + "</p>"
                }
            }

            $("#modal" + modalCount + " .spellDescription").html(spellHTML)

            spellHTML = "";

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


            $("#modal" + modalCount + " .attrTable th").show();
            $("#modal" + modalCount + " .attrTable td").show();

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
                let htmlString = ""
                let imgSrcs = ["./img/cross_64.png", "./img/axes_64_light.png", "./img/skull_64_light.png", "./img/shield_64_light.png"]
                $("#modal" + modalCount + " .careerpath" + k + " .path" + k + "name").html("<img src=\"" + imgSrcs[k - 1] + "\" class=\"oneemimg\"></img><br/>" + dataRslt["path" + k]["name"] + " &mdash; " + "<status>" + dataRslt["path" + k]["status"] + "</status>")

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

        case "endeavour":
            $("#modal" + modalCount + " .endeavourName").html(dataRslt["name"])

            $("#modal" + modalCount + " .endeavourType").html(dataRslt["type"])

            let endeavourHTML = ""

            dataRslt["description"].forEach((para) => {
                endeavourHTML += "<p>" + para + "</p>"
            }
            )
            $("#modal" + modalCount + " .endeavourDesc").html(endeavourHTML)

            endeavourHTML = "";

            if (dataRslt["classes"] != undefined) {
                $("#modal" + modalCount + " .endeavourClasses").html('(' + dataRslt["classes"] + ')')
            }

            break;

        case "betweenAdventureEvent":
            $("#modal" + modalCount + " .eventName").html(dataRslt["name"])

            $("#modal" + modalCount + " .eventRoll").html(dataRslt["roll"])


            $("#modal" + modalCount + " .eventDesc").html(dataRslt["desc"])


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
        "trait": "Creature Trait",
        "endeavour": "Endeavour",
        "betweenAdventureEvent": "Between-Adventures Event"
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
    $("#"+str).toggleClass('w3-show')
}

function outSkillSearch(el) {

    let baseURI = location.href.split("wfrpref")[0];
    let pageURI = baseURI + "wfrpref/skills.html#skillList?s=";
    let skillName = el.split(' (')[0];
    let skillURI = encodeURIComponent(skillName)

    let finalURI = pageURI + skillURI
    window.open(finalURI, '_blank');
}

function outTalentSearch(el) {
    let baseURI = location.href.split("wfrpref")[0];
    let pageURI = baseURI + "wfrpref/skills.html#talentList?s=";
    //let talentName = el.innerText.split(' (')[0];
    let talentName = el.split(' (')[0];
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


function buildCareerCards() {
    let htmlString = ""

    let careerClasses = ["Academics", "Burghers", "Courtiers", "Peasants", "Rangers", "Riverfolk", "Rogues", "Warriors"]


    //let careerEntry = career[1]

    for (let i = 1; i < career.length; i++) {
        let careerEntry = career[i]


        let $div = $('#templateCareerSection');

        let cleanedName = careerEntry["name"].replace(" ", "")

        let $klon = $div.clone().prop('id', 'career' + i).appendTo("#" + career[i]["class"] + "Careers");

        $("#career" + i + " .careerButton").attr('onclick', 'accordion(\'' + cleanedName + 'Container\')').prop('id', cleanedName)
        $("#career" + i + " .careerContainer").attr('id', cleanedName + 'Container')
        $("#career" + i + " .careerName").text(careerEntry["name"])
        $("#career" + i + " .careerDesc").html("&ldquo;" + careerEntry["desc"] + "&rdquo;")
        $("#career" + i + " .careerRaces").html("<eh>" + careerEntry["races"] + "</eh>")



        $("#career" + i + " .attrTable th").show();
        $("#career" + i + " .attrTable td").show();

        $("#career" + i + " .career" + careerEntry["advances"][0] + "th").show()
        $("#career" + i + " .career" + careerEntry["advances"][0]).addClass("attr1").html("<img class=\"attrImg\" src=\"./img/cross_64.png\"></img>").show()
        $("#career" + i + " .career" + careerEntry["advances"][1] + "th").show()
        $("#career" + i + " .career" + careerEntry["advances"][1]).addClass("attr1").html("<img class=\"attrImg\" src=\"./img/cross_64.png\"></img>").show()
        $("#career" + i + " .career" + careerEntry["advances"][2] + "th").show()
        $("#career" + i + " .career" + careerEntry["advances"][2]).addClass("attr1").html("<img class=\"attrImg\" src=\"./img/cross_64.png\"></img>").show()

        $("#career" + i + " .career" + careerEntry["advances"][3] + "th").show()
        $("#career" + i + " .career" + careerEntry["advances"][3]).addClass("attr2").html("<img class=\"attrImg\" src=\"./img/axes_64.png\"></img>").show()
        $("#career" + i + " .career" + careerEntry["advances"][4] + "th").show()
        $("#career" + i + " .career" + careerEntry["advances"][4]).addClass("attr3").html("<img class=\"attrImg\" src=\"./img/skull_64.png\"></img>").show()
        $("#career" + i + " .career" + careerEntry["advances"][5] + "th").show()
        $("#career" + i + " .career" + careerEntry["advances"][5]).addClass("attr4").html("<img class=\"attrImg\" src=\"./img/shield_64.png\"></img>").show()

        let attr = ["WS", "BS", "S", "T", "I", "Agi", "Dex", "Int", "WP", "Fel"]

        attr.forEach(characteristic => {
            if (careerEntry["advances"].includes(characteristic) == false) {
                $("#career" + i + " .attrTable .career" + characteristic + "th").addClass('w3-hide-small w3-hide-medium')
                $("#career" + i + " .career" + characteristic).addClass('w3-hide-small w3-hide-medium');
            }
        })

        $("#career" + i + " .careerIncome").html("<skill>" + careerEntry["incomeSkill"] + "</skill>")


        for (let k = 1; k < 5; k++) {
            let imgSrcs = ["./img/cross_64.png", "./img/axes_64_light.png", "./img/skull_64_light.png", "./img/shield_64_light.png"]
            $("#career" + i + " .careerpath" + k + " .path" + k + "name").html("<img src=\"" + imgSrcs[k - 1] + "\" class=\"oneemimg\"></img><br/>" + careerEntry["path" + k]["name"] + " &mdash; " + "<status class='status" + careerEntry["path" + k]["status"].split(" ")[0] + "'>" + careerEntry["path" + k]["status"] + "</status>")

            for (let i = 0; i < careerEntry["path" + k]["skills"].length; i++) {
                if (i == 0) {
                    htmlString += "<skill>"
                } else {
                    htmlString += ", <skill>"
                }
                htmlString += careerEntry["path" + k]["skills"][i]
                htmlString += "</skill>"
            }

            $("#career" + i + " .careerpath" + k + " .path" + k + "skills").html(htmlString)

            htmlString = ""

            for (let i = 0; i < careerEntry["path" + k]["talents"].length; i++) {
                if (i == 0) {
                    htmlString += "<talent>"
                } else {
                    htmlString += ", <talent>"
                }
                htmlString += careerEntry["path" + k]["talents"][i]
                htmlString += "</talent>"
            }

            $("#career" + i + " .careerpath" + k + " .path" + k + "talents").html(htmlString)

            htmlString = ""

            for (let i = 0; i < careerEntry["path" + k]["trappings"].length; i++) {
                if (i == 0) {
                    htmlString += "<span>"
                } else {
                    htmlString += ", <span>"
                }
                htmlString += careerEntry["path" + k]["trappings"][i]
                htmlString += "</span>"
            }

            $("#career" + i + " .careerpath" + k + " .path" + k + "trappings").html(htmlString)

            htmlString = ""

            if (careerEntry["flavour"] != undefined) {

                careerEntry["flavour"].forEach(flavText => {
                    htmlString += "<p>" + flavText + "</p>"
                })

                $("#career" + i + " .careerFlavour").html(htmlString);

                htmlString = ""
            }

            if (careerEntry["quotes"] != undefined) {
                careerEntry["quotes"].forEach(quot => {
                    htmlString += "<p><blockquote class='w3-panel w3-round-large careerQuote w3-leftbar w3-border-dark-gray'><p><em><span style='font-size: 1.5rem; font-family: Sophia, sans-serif; line-height: 0'>&ldquo;</span>" + quot["quote"] + "<span style='font-size: 1.5rem; font-family: Sophia, sans-serif; line-height: 0;'>&rdquo;</span></em></p><p style='text-align: right !important; white-space:normal;'>&mdash;" + quot["author"] + "</p></blockquote></p>"
                })
                $("#career" + i + " .careerQuotes").html(htmlString);

                htmlString = ""
            }
            $klon.show();
        }
    }
}

function careerModalSearch(el) {
    let parentModal = "#" + $(el).parents('.resultModal').prop('id')
    let careerCleanName = $(parentModal + " .careerName").text().replace(" ", "")

    let baseURI = location.href.split("wfrpref")[0];
    let pageURI = baseURI + "wfrpref/career.html#" + careerCleanName;
    window.open(pageURI, '_blank');

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
$(document).ready(function () {
    endeavourFuse = new Fuse(endeavour, {
        keys: ["name"]
    })
});

$(document).ready(function () {
    betweenAdventureEventFuse = new Fuse(betweenAdventureEvent, {
        keys: ["name"]
    })
});

$(document).ready(function () {
    setTimeout(function () {
        scrollToDiv();
    }, 200);
});

function scrollToDiv(uri = undefined) {
    if (uri == undefined) {
        uri = String(document.location)
    }

    let divTarget = uri.split("#")[1]


    if (divTarget != undefined) {

        divTarget = divTarget.split("?")[0] // remove any search parameters being passed

        let targetDiv = String("#" + divTarget) // put the pound sign back



        try {
            targetOffset = $(targetDiv).offset().top; // top of the target div
        } catch (e) {
            targetOffset = undefined;
        }

        let windowPad = ($(window).height() * 0.10) // 10% of the viewport height

        if (targetOffset != undefined) { // Undefined if the element isn't found
            $('html, body').animate({
                scrollTop: (targetOffset - windowPad)
            }, 300);
            setTimeout(
                animateHighlight($(targetDiv), "rgba(255, 255, 156,0.2)", 1000),
                400
            )
        }
    }

}

function buildEventTable() {
    let trHTML = ""

    betweenAdventureEvent.forEach(ev => {

        if (ev["name"] != "") {

            trHTML += "<tr>"

            trHTML += "<td>" + ev["roll"] + "</td>"

            trHTML += "<td><strong>" + ev["name"] + ": </strong>" + ev["desc"] + "</td>"

            trHTML += "</tr>"

            $('#eventTableBody:last-child').append(trHTML);
        }

        trHTML = ""
    })
}

function toggleDesc(el) {
    let innerTxt = $(el).text();
    if (innerTxt.includes("Show")) {
        $(el).html("&#9650;<br/>Hide Description")
    } else {
        $(el).html("Show Description<br/>&#9660")
    }
    $(el).siblings('.well-desc').toggleClass('w3-hide');
}

function buildEndeavours() {
    let $div = $('#endeavPrefab');
    let endvHTML = "";
    let endID = ""

    let DR = []
    let gen = []
    let cls = []
    let trav = []

    for (let i = 0; i < endeavour.length; i++) {
        let endv = endeavour[i]

        if (endv["name"] != "") {

            switch (endv["type"]) {
                case "Duties & Responsibilities":
                    DR.push(endv)
                    break;

                case "General Endeavours":
                    gen.push(endv)
                    break;

                case "Class Endeavours":
                    cls.push(endv)
                    break;
                
                case "Travel Endeavours":
                    trav.push(endv);
                    break;
            }

        }
    }


    DR.forEach(DRendv => {
        endID = DRendv["cleanName"];

        if (DR.indexOf(DRendv) % 2 == 0) {
            endvHTML += "<div class='w3-row-padding'><div class='w3-col s12 m12 l6'>"

            endvHTML += "<div id="+endID+"><div class='w3-card-2 w3-round-large grid-card padCard'><div class='w3-row-padding'><h4><span class='endeavourName'>"
            
            endvHTML += DRendv["name"];

            endvHTML += "</span></h4></div>"

            endvHTML += "<p><blockquote class='w3-panel w3-round-large careerQuote w3-leftbar w3-border-dark-gray'><p><em><span style='font-size: 1.5rem; font-family: Sophia, sans-serif; line-height: 0'>&ldquo;</span>" + DRendv["flavor"] + "<span style='font-size: 1.5rem; font-family: Sophia, sans-serif; line-height: 0;'>&rdquo;</span></em></p><p style='text-align: right !important; white-space:normal;'>&mdash;" + DRendv["appelation"] + "</p></blockquote></p>"
            
            endvHTML += "<div class='w3-row-padding'><div class='endeavourDesc w3-hide well well-desc'>"
            
            DRendv["description"].forEach(para => {
                endvHTML += "<p>" + para + "</p>"
            })

            endvHTML += "</div><h6 class='w3-center descExpando' onclick='toggleDesc(this)'>Show Description<br/>&#9660;</h6></div><br /></div></div></div>"

        } else {
            endvHTML += "<div class='w3-col s12 m12 l6'>"

            endvHTML += "<div id="+endID+"><div class='w3-card-2 w3-round-large grid-card padCard'><div class='w3-row-padding'><h4><span class='endeavourName'>"
            
            endvHTML += DRendv["name"];

            endvHTML += "</span></h4></div>"

            endvHTML += "<p><blockquote class='w3-panel w3-round-large careerQuote w3-leftbar w3-border-dark-gray'><p><em><span style='font-size: 1.5rem; font-family: Sophia, sans-serif; line-height: 0'>&ldquo;</span>" + DRendv["flavor"] + "<span style='font-size: 1.5rem; font-family: Sophia, sans-serif; line-height: 0;'>&rdquo;</span></em></p><p style='text-align: right !important; white-space:normal;'>&mdash;" + DRendv["appelation"] + "</p></blockquote></p>"
            
            endvHTML += "<div class='w3-row-padding'><div class='endeavourDesc w3-hide well well-desc'>"
            
            DRendv["description"].forEach(para => {
                endvHTML += "<p>" + para + "</p>"
            })

            endvHTML += "</div><h6 class='w3-center descExpando' onclick='toggleDesc(this)'>Show Description<br/>&#9660;</h6></div><br /></div></div></div></div>"


        }

    })

    $(endvHTML).appendTo("#dutiesEndeav")

    endvHTML = ""


    gen.forEach(GENendv => {
        endID = GENendv["cleanName"];

        if (gen.indexOf(GENendv) % 2 == 0) {
            endvHTML += "<div class='w3-row-padding'><div class='w3-col s12 m12 l6'>"

            endvHTML += "<div id="+endID+"><div class='w3-card-2 w3-round-large grid-card padCard'><div class='w3-row-padding'><h4><span class='endeavourName'>"
            
            endvHTML += GENendv["name"];

            endvHTML += "</span></h4></div><div class='w3-row-padding'><div class='endeavourDesc w3-hide well well-desc'>"
            
            GENendv["description"].forEach(para => {
                endvHTML += "<p>" + para + "</p>"
            })

            endvHTML += "</div><h6 class='w3-center descExpando' onclick='toggleDesc(this)'>Show Description<br/>&#9660;</h6></div><br /></div></div></div>"

        } else {
            endvHTML += "<div class='w3-col s12 m12 l6'>"

            endvHTML += "<div id="+endID+"><div class='w3-card-2 w3-round-large grid-card padCard'><div class='w3-row-padding'><h4><span class='endeavourName'>"
            
            endvHTML += GENendv["name"];

            endvHTML += "</span></h4></div><div class='w3-row-padding'><div class='endeavourDesc w3-hide well well-desc'>"
            
            GENendv["description"].forEach(para => {
                endvHTML += "<p>" + para + "</p>"
            })

            endvHTML += "</div><h6 class='w3-center descExpando' onclick='toggleDesc(this)'>Show Description<br/>&#9660;</h6></div><br /></div></div></div></div><br/>"


        }
    })
    
    $(endvHTML).appendTo("#genEndeav")

    endvHTML = ""


    cls.forEach(CLSendv => {
        endID = CLSendv["cleanName"];

        if (cls.indexOf(CLSendv) % 2 == 0) {
            endvHTML += "<div class='w3-row-padding'><div class='w3-col s12 m12 l6'>"

            endvHTML += "<div id="+endID+"><div class='w3-card-2 w3-round-large grid-card padCard'><div class='w3-row-padding'><h4><span class='endeavourName'>"
            
            endvHTML += CLSendv["name"];

            endvHTML += "</span></h4></div>"
            
            endvHTML += "<div class='w3-row-padding w3-center'><div class='endeavourClasses'><eh>" + CLSendv["classes"] + "</eh></div></div>"
            
            endvHTML += "<div class='w3-row-padding'><div class='endeavourDesc w3-hide well well-desc'>"
            
            CLSendv["description"].forEach(para => {
                endvHTML += "<p>" + para + "</p>"
            })

            endvHTML += "</div><h6 class='w3-center descExpando' onclick='toggleDesc(this)'>Show Description<br/>&#9660;</h6></div><br /></div></div></div>"

        } else {
            endvHTML += "<div class='w3-col s12 m12 l6'>"

            endvHTML += "<div id="+endID+"><div class='w3-card-2 w3-round-large grid-card padCard'><div class='w3-row-padding'><h4><span class='endeavourName'>"
            
            endvHTML += CLSendv["name"];

            endvHTML += "</span></h4></div>"
            
            endvHTML += "<div class='w3-row-padding w3-center'><div class='endeavourClasses'><eh>" + CLSendv["classes"] + "</eh></div></div>"
            
            endvHTML += "<div class='w3-row-padding'><div class='endeavourDesc w3-hide well well-desc'>"
            
            CLSendv["description"].forEach(para => {
                endvHTML += "<p>" + para + "</p>"
            })

            endvHTML += "</div><h6 class='w3-center descExpando' onclick='toggleDesc(this)'>Show Description<br/>&#9660;</h6></div><br /></div></div></div></div><br/>"


        }
    })
    
    $(endvHTML).appendTo("#classEndeav")

    endvHTML = ""

    trav.forEach(travEndv => {
        if (trav.indexOf(travEndv) % 2 == 0) {
            endvHTML += "<div class='w3-row-padding'><div class='w3-col s12 m12 l6'>"

            endvHTML += "<div id="+endID+"><div class='w3-card-2 w3-round-large grid-card padCard'><div class='w3-row-padding'><h4><span class='endeavourName'>"
            
            endvHTML += travEndv["name"];

            endvHTML += "</span></h4></div>"
            
            endvHTML += "<div class='w3-row-padding'><div class='endeavourDesc w3-hide well well-desc'>"
            
            travEndv["description"].forEach(para => {
                endvHTML += "<p>" + para + "</p>"
            })

            endvHTML += "</div><h6 class='w3-center descExpando' onclick='toggleDesc(this)'>Show Description<br/>&#9660;</h6></div><br /></div></div></div>"

        } else {
            endvHTML += "<div class='w3-col s12 m12 l6'>"

            endvHTML += "<div id="+endID+"><div class='w3-card-2 w3-round-large grid-card padCard'><div class='w3-row-padding'><h4><span class='endeavourName'>"
            
            endvHTML += travEndv["name"];

            endvHTML += "</span></h4></div>"
            
            endvHTML += "<div class='w3-row-padding'><div class='endeavourDesc w3-hide well well-desc'>"
            
            travEndv["description"].forEach(para => {
                endvHTML += "<p>" + para + "</p>"
            })

            endvHTML += "</div><h6 class='w3-center descExpando' onclick='toggleDesc(this)'>Show Description<br/>&#9660;</h6></div><br /></div></div></div></div><br/>"
        }
    })

    $(endvHTML).appendTo("#travelEndeavours")

    endvHTML = ""

}

function buildTravelEncounters() {
    travelEncounter.forEach(encounter => {
        let encounterHTML = ""
        
        encounterHTML += "<tr><td>"

        encounterHTML += encounter["roll"]

        encounterHTML += "</td><td>"

        encounterHTML += "<eh>" + encounter["name"] + ": </eh>" + encounter["desc"] + "</td>"

        switch (encounter["type"]){
            case "Positive":
                $(encounterHTML).appendTo('#positiveEncounterBody')
                break;
                case "Coincidental":
                    $(encounterHTML).appendTo('#coincidentalEncounterBody')
                    break;
                    case "Harmful":
                        $(encounterHTML).appendTo('#harmfulEncounterBody')
                        break;
        }
    })
}

function toggleEncounters(el) {
    $(el).parents().children('button').removeClass('btn-selected')
    $(el).addClass('btn-selected')
    if ($(el).text().includes("Positive")) {
        $("#positiveEncounterBody").show();
        $("#coincidentalEncounterBody").hide();
        $("#harmfulEncounterBody").hide();
    } else if ($(el).text().includes("Coincidental")) {
        $("#positiveEncounterBody").hide();
        $("#coincidentalEncounterBody").show();
        $("#harmfulEncounterBody").hide();

    } else if ($(el).text().includes("Harmful")) {
        $("#positiveEncounterBody").hide();
        $("#coincidentalEncounterBody").hide();
        $("#harmfulEncounterBody").show();

    }
}


function animateHighlight(div, highlightColor, duration) {
    var highlightBg = highlightColor || "#FFFF9C";
    var animateMs = duration || 1500;
    var originalBg = div.css("backgroundColor");
    div.stop().css("background-color", highlightBg)
        .animate({ backgroundColor: originalBg }, animateMs);
    setTimeout(function () { notLocked = true; }, animateMs);
}


function proc() {

    let str = $('#procIn').val()
    // Take the input box value

    let procObj = {}

    let prName = str.split(" — ")[0]
    // The name is followed by an emdash

    procObj["name"] = prName

    let prStanding = str.split(" — ")[1].split("Skills")[0]
    // Between the emdash and 'Skills:' is the status

    procObj["status"] = prStanding;

    let pr1 = str.split('Talents: ')[0]
    let skillArr = pr1.split("Skills: ")[1].split(", ")
    // Get everything between 'Skills' and 'Talents'

    procObj["skills"] = skillArr


    let pr2 = str.split('Talents: ')[1].split("Trappings: ")[0].split(", ")
    // Everything between 'talents' and 'trappings'

    procObj["talents"] = pr2

    let pr3 = str.split('Trappings: ')[1].split(", ")
    // Everything else - aka the trappings

    procObj["trappings"] = pr3

    $("#procOut").val(JSON.stringify(procObj) + ",")
    // Set the output box value to the post-process template
}

function copyProc() {
    navigator.clipboard.writeText($("#procOut").val())
    // We need user input to write to the clipboard.  Thanks, "security" experts
}

function processAClick(el) {
    let targetAttr = $(el).attr('href');

    let targetURI = targetAttr.split("#")[0]

    let targetEl = targetAttr.split('#')[1]

    let currURI = '.' + String(document.location).split("#")[0].split('wfrpref')[1]

    if (targetURI == currURI && targetEl != undefined) {
        scrollToDiv(targetAttr)
    }


}