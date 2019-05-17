function toDark() {
    $("table").addClass("table-dark");
    $("h2").addClass("headingDark");
    $("h4").addClass("headingDark");
}


$(document).ready(function () {
    buildNavbar();
    setTimeout(
        toDark(), 250);
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
    let elements = ["combatDropdown", "intrigueDropdown", "warfareDropdown", "weaponDropdown", "tradeDropdown", "charDropdown", "houseDropdown"]

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

function benefitFilter() {
    let groups = [".abilityBenefits", ".fateBenefits", ".heritageBenefits", ".martialBenefits", ".socialBenefits"]

    for (let i = 0; i < groups.length; i++) {
        $(groups[i]).show();
    }
    var input, filter, table, tr, td;
    input = document.getElementById("benefitSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("benefitTable");
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
    document.getElementById("benefitGroupSelect").options.selectedIndex = 0;
}

function benefitFilterGroup() {
    let selectBox = document.getElementById("benefitGroupSelect")

    let selection = selectBox.options[selectBox.selectedIndex].value;

    let groups = [".abilityBenefits", ".fateBenefits", ".heritageBenefits", ".martialBenefits", ".socialBenefits"]

    if (selection == "...") {
        for (let i = 0; i < groups.length; i++) {
            $(groups[i]).show();
        }
    } else {
        for (let i = 0; i < groups.length; i++) {
            $(groups[i]).hide();
            $(selection).show();
        }
    }

    $("#benefitSearch").val("")
}

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
    $("#weaponQualSearch").val("")
}

function weaponQualFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("weaponQualSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("weaponTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[5];
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
    $("#weaponSearch").val("")
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
    $("#weaponQualSearch").val("")
}


function buildNavbar() {
    $('#navBarDiv').load("./navbar.html");

}

function filterLand() {
    let domains = {
        "Dorne": {
            "terrain": ["Hills", "Mountains", "Plains"],
            "features": ["Coast", "Community", "Island", "Road", "Ruin", "Water"]
        },
        "Dragonstone": {
            "terrain": ["Hills", "Plains", "Wetlands"],
            "features": ["Coast", "Community", "Grassland", "Island", "Road", "Ruin"]
        },
        "Iron Islands": {
            "terrain": ["Hills", "Plains"],
            "features": ["Coast", "Community", "Grassland", "Island", "Road", "Ruin"]
        },
        "King's Landing": {
            "terrain": ["Plains"],
            "features": ["Coast", "Community", "Grassland", "Road", "Ruin", "Water", "Woods"]
        },
        "Mountains of the Moon": {
            "terrain": ["Hills", "Mountains"],
            "features": ["Coast", "Community", "Grassland", "Island", "Road", "Ruin", "Water"]
        },
        "The North": {
            "terrain": ["Hills", "Mountains", "Plains", "Wetlands"],
            "features": ["Coast", "Community", "Grassland", "Island", "Road", "Ruin", "Water", "Woods"]
        },
        "The Reach": {
            "terrain": ["Plains"],
            "features": ["Coast", "Community", "Grassland", "Island", "Road", "Ruin", "Water"]
        },
        "The Riverlands": {
            "terrain": ["Hills", "Plains", "Wetlands"],
            "features": ["Community", "Grassland", "Road", "Ruin", "Water"]
        },
        "The Stormlands": {
            "terrain": ["Hills", "Mountains", "Plains", "Wetlands"],
            "features": ["Coast", "Community", "Grassland", "Island", "Road", "Ruin", "Water", "Woods"]
        },
        "The Westerlands": {
            "terrain": ["Hills", "Mountains", "Plains"],
            "features": ["Coast", "Community", "Grassland", "Island", "Road", "Ruin", "Water"]
        }
    }

    terrainTable = document.getElementById("terrainTable");
    featuresTable = document.getElementById("featuresTable");

    terrainTR = terrainTable.getElementsByTagName("tr");
    featuresTR = featuresTable.getElementsByTagName("tr");

    let selectBox = document.getElementById("realmSelect")

    let realm = selectBox.options[selectBox.selectedIndex].value;


    if (realm === "All"){
        for (let i = 0; i < terrainTR.length; i++) {
            terrainTR[i].style.display = "";        
        }
        for (let i = 0; i < featuresTR.length; i ++){
            featuresTR[i].style.display = "";
        }
        return;
    } else {

        let terrain = domains[realm]["terrain"];
        let features = domains[realm]["features"];
    
        for (let i = 0; i < terrainTR.length; i++) {
            terrainTR[i].style.display = "none";        
        }
        for (let i = 0; i < featuresTR.length; i ++){
            featuresTR[i].style.display = "none";
        }
    
        $("#terrainHeader").show();
        $("#featuresHeader").show();
    
        for (let j = 0; j < terrain.length; j++){
            for (let i = 0; i < terrainTR.length; i ++){
                td = terrainTR[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (terrain[j].indexOf(txtValue) > -1) {
                        terrainTR[i].style.display = "";
                    }
                }
            }
        }
    
        for (let j = 0; j < features.length; j ++){
            for (let i = 0; i < featuresTR.length; i ++){
                td = featuresTR[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.indexOf(features[j]) > -1) {
                        featuresTR[i].style.display = "";
                    }
                }
            }
        }
    }
}