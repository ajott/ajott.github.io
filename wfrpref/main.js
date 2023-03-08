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

    // dictDirect = [lores, spell, cults, miracle, talent, skill, condition, weaponQual]

    // dictDirect = {
    //     "lore": lores,
    //     "spell": spell,
    //     "cults": cults,
    //     "miracle": miracle,
    //     "talent": talent,
    //     skill,
    //     condition,
    //     "weaponQual": weaponQual
    // }

    // dictFuse = new Fuse(dictDirect, {
    //     keys:[['skill','name'],['talent','name']]
    // })

});

var modalCount = 0;

function initializeModals() {
    $('skill').attr('onclick', 'buildModal(this,\'skill\')');
    $('talent').attr('onclick', 'buildModal(this,\'talent\')');
    $('condition').attr('onclick', 'buildModal(this,\'condition\')');
    $('weaponqual').attr('onclick', 'buildModal(this,\'qual\')');
    $('divineman').attr('onclick', 'buildModal(this,\'miracle\')');
}

function buildModal(el, type, mast = 0) {
    // Used for building individual modal IDs
    modalCount++

    // Temporary until an overall fuse/dictionary can be attained
    let fuses = {
        "skill": skillFuse,
        "talent": talentFuse,
        "miracle": miracleFuse,
        "condition": conditionFuse,
        "qual": qualFuse,
        "spell": spellFuse
    }

    if (mast == 1) {
        srchPhrase = el
    } else {
        let htmlPhrase = el.innerText
        let srchPhrase = htmlPhrase.split(' (')[0] // Get rid of specializations, such as Art (Engraving)
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

// var searchType = "skill"

// function changeSearch(type) {
//     searchType = type;

//     $('.searchBtn').removeClass('btn-selected')

//     $('#masterSearch-'+type).addClass('btn-selected')
//     masterSearch();
// }

function masterSearch() {
    $('#masterSearchOptions').html("")
    
    let searchTxt = $('#masterSearchBox').val()

    let searchEl = document.getElementById('masterSearchBox')
    let y = searchEl.getBoundingClientRect().top + window.pageYOffset - 100
    window.scrollTo({ top: y, behavior: 'smooth' });

    let fuses = {
        "skill": skillFuse,
        "talent": talentFuse,
        "condition": conditionFuse,
        "spell": spellFuse,
        "miracle": miracleFuse,
        "weaponQual": qualFuse,
    }

    let modals = {
        "skill": 'buildModal(this,\'skill\')',
        "talent": 'buildModal(this,\'talent\')',
        "condition": 'buildModal(this,\'condition\')',
        "weaponQual": 'buildModal(this,\'qual\')',
        "miracle": 'buildModal(this,\'miracle\')',
        "spell": 'buildModal(this, \'spell\')'
    }

    let srchRslt = masterFuse.search(searchTxt)
    srchRslt.length = 10;
    srchRslt.forEach(result => {
        let rsltName = result["item"]["name"]
        let rsltType = result["item"]["type"]
        $('#masterSearchOptions').append("<div class=\"masterSearchResult w3-blue-grey w3-hover-grey\" onclick=\"buildModal(\'" + rsltName+ "\',\'" + rsltType + "\',1)\">" + result["item"]["name"] + "&emsp; <em style=\"color: lightgrey;\">" + rsltType + "</em></div>")
    });

    // let srchRslt = fuses[searchType].search(searchTxt)

    // srchRslt.length = 10;

    // srchRslt.forEach(result => {
    //     $('#masterSearchOptions').append("<div class=\"masterSearchResult w3-blue-grey w3-hover-grey\" onclick=\"" + modals[searchType] + "\">" + result["item"]["name"] + "</div>")
    // });
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
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}


function dropdownShow(str) {
    let elements = ["charDropdown", "magicDropdown", "religionDropdown", "skillDropdown", "combatDropdown"]

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