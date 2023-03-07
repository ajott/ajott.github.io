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

// function toDark() {
//     $("table").addClass("table-dark");
// }

var dictDirect = {}

$(document).ready(function () {
    buildNavbar();
    setTimeout(function () {
        initializeModals();
    }, 300);

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

function initializeModals() {
    $('skill').attr('onclick', 'initializeSkillModal(this)');
    $('talent').attr('onclick', 'initializeTalentModal(this)');
    $('condition').attr('onclick', 'initializeConditionModal(this)');
    $('weaponqual').attr('onclick', 'initializeQualityModal(this)');
    $('divineman').attr('onclick', 'initializeQualityModal(this)');
}




function masterSearch() {
    $('#masterSearchOptions').html("")
    let searchType = $('input[name="masterSearch"]:checked').val()
    let searchTxt = $('#masterSearchBox').val()

    let searchEl = document.getElementById('masterSearchBox')
    let y = searchEl.getBoundingClientRect().top + window.pageYOffset - 100
    window.scrollTo({ top: y, behavior: 'smooth' });

    let fuses = {
        "skill": skillFuse,
        "talent": talentFuse,
        "condition": conditionFuse,
        // "spell": spellFuse,
        "miracle": miracleFuse,
        "weaponQual": qualFuse,
    }

    let modals = {
        "skill": 'initializeSkillModal(this)',
        "talent": 'initializeTalentModal(this)',
        "condition": 'initializeConditionModal(this)',
        "weaponQual": 'initializeQualityModal(this)',
        "miracle": 'initializeMiracleModal(this)'
    }

    let srchRslt = fuses[searchType].search(searchTxt)

    

    srchRslt.forEach(result => {
        $('#masterSearchOptions').append("<div class=\"masterSearchResult w3-blue-grey w3-hover-grey\" onclick=\"" + modals[searchType] + "\">" + result["item"]["name"] + "</div>")
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

function psyPowerFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("psySearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("psyPowerTable");
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

    document.getElementById("psyDiscSelect").options.selectedIndex = 0;
}

function psyFilterDisc() {
    let selectBox = document.getElementById("psyDiscSelect")

    let selection = selectBox.options[selectBox.selectedIndex].value;

    var input, filter, table, tr, td, i;
    input = selection;

    filter = input.toUpperCase();
    table = document.getElementById("psyPowerTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "...") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    $("#psySearch").val("")
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

function weaponFilterFamily() {
    let selectBox = document.getElementById("weaponFamilySelect")

    let selection = selectBox.options[selectBox.selectedIndex].value;

    var input, filter, table, tr, td, i;
    input = selection;

    filter = input.toUpperCase();
    table = document.getElementById("weaponTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "...") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    $("#weaponSearch").val("")
    document.getElementById("weaponClassSelect").options.selectedIndex = 0;
    document.getElementById("weaponBookSelect").options.selectedIndex = 0;
}

function weaponFilterClass() {
    let selectBox = document.getElementById("weaponClassSelect")

    let selection = selectBox.options[selectBox.selectedIndex].value;

    var input, filter, table, tr, td, i;
    input = selection;

    filter = input.toUpperCase();
    table = document.getElementById("weaponTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "...") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    $("#weaponSearch").val("")
    document.getElementById("weaponFamilySelect").options.selectedIndex = 0;
    document.getElementById("weaponBookSelect").options.selectedIndex = 0;
}

function weaponFilterBook() {
    let selectBox = document.getElementById("weaponBookSelect")

    let selection = selectBox.options[selectBox.selectedIndex].value;

    var input, filter, table, tr, td, i;
    input = selection;

    filter = input.toUpperCase();
    table = document.getElementById("weaponTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[13];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "...") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    $("#weaponSearch").val("")
    document.getElementById("weaponFamilySelect").options.selectedIndex = 0;
    document.getElementById("weaponClassSelect").options.selectedIndex = 0;
}

function initializeConditionModal(el) {
    let htmlPhrase = el.innerText
    let srchPhrase = htmlPhrase.split(' (')[0]
    let srchRslt = conditionFuse.search(srchPhrase)
    buildConditionLite(srchRslt[0]["item"])
    openConditionModal();
}

function buildConditionLite(conditionSearch) {

    $("#conditionDialog" + " .conditionName").html(conditionSearch["name"])

    $("#conditionDialog" + " .conditionDesc").html(conditionSearch["desc"])
    
    $('#conditionDialog').on('click', function (e) {
        if (e.target !== this)
            return;

        hideConditionModal();
    });

    initializeModals();

}

function openConditionModal() {
    document.getElementById('conditionDialog').style.display = 'block'

}

function hideConditionModal() {
    document.getElementById('conditionDialog').style.display = 'none'
}

function conditionModalSearch() {
    outConditionSearch($('#conditionDialog .conditionName'))
}

function initializeQualityModal(el) {
    let htmlPhrase = el.innerText
    let srchPhrase = htmlPhrase.split(' (')[0]
    let srchRslt = qualFuse.search(srchPhrase)
    buildQualityLite(srchRslt[0]["item"])
    openQualityModal();
}

function buildQualityLite(qualSearch) {

    $("#qualDialog" + " .qualName").html(qualSearch["name"])

    $("#qualDialog" + " .qualDesc").html(qualSearch["desc"])

    $('#qualDialog').on('click', function (e) {
        if (e.target !== this)
            return;

        hideQualityModal();
    });

    initializeModals();

}

function openQualityModal() {
    document.getElementById('qualDialog').style.display = 'block'

}

function hideQualityModal() {
    document.getElementById('qualDialog').style.display = 'none'
}

function qualModalSearch() {
    outQualitySearch($('#qualDialog .qualName'))
}

function buildNavbar() {
    $('#navBarDiv').load("./navbar.html");
    $('#modalPlaceholder').load('./modals.html')
}

