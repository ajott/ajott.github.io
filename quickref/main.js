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
    $("body").addClass("body-dark");
    $("h3").addClass("headingDark");
    $("h4").addClass("headingDark");
    $(".psyTooltipLight").addClass("psyTooltipDark").removeClass("psyTooltipLight");
    $(".btn-lightMode").addClass("btn-darkMode").removeClass("btn-lightMode");
    $(".dropdown-toggle").addClass("dropdown-dark");
    $(".dropdown-item").addClass("dropdown-dark");
    $(".dropdown-menu").addClass("dropdown-dark");
    $("#navBar").addClass("navbar-dark bg-dark");
    $("#headBar").addClass("navbar-dark bg-dark");
    $("#lightBtn").show();
    $("#darkBtn").hide();
}

function toLight() {
    $("table").removeClass("table-dark");
    $("body").removeClass("body-dark");
    $("h3").removeClass("headingDark");
    $("h4").removeClass("headingDark");
    $(".psyTooltipDark").addClass("psyTooltipLight").removeClass("psyTooltipDark");
    $(".btn-darkMode").addClass("btn-lightMode").removeClass("btn-darkMode");
    $(".dropdown-toggle").removeClass("dropdown-dark");
    $(".dropdown-item").removeClass("dropdown-dark");
    $(".dropdown-menu").removeClass("dropdown-dark");
    $("#navBar").removeClass("navbar-dark bg-dark");
    $("#headBar").removeClass("navbar-dark bg-dark");
    $("#lightBtn").hide();
    $("#darkBtn").show();
}
$(document).ready(function () {
    toDark();
});

function showMenu() {
    var x = document.getElementById("menu");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}


function dropdownShow(str) {
    let elements = ["combatDropdown", "critDropdown", "equipDropdown", "weaponDropdown", "armourDropdown", "psykerDropdown", "charDropdown", "effectsDropdown"]

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