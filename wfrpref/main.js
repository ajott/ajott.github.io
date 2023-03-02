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


$(document).ready(function () {
    buildNavbar();
    setTimeout( function() {
        $('skill').attr('onclick','initializeSkillModal(this)');
        $('talent').attr('onclick','initializeTalentModal(this)');
    }, 300);

    
});

function accordion(id, el) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        $('#'+id).removeClass("w3-hide").addClass("w3-show")
    } else {
        $('#'+id).removeClass("w3-show").addClass("w3-hide")
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
    let elements = ["charDropdown","magicDropdown","skillDropdown"]

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

function buildNavbar() {
    $('#navBarDiv').load("./navbar.html");
    $('#modalPlaceholder').load('./modals.html')
}

