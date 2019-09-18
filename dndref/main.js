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


$(document).ready(function () {
    buildNavbar();
    setTimeout(
        toDark(), 250);   
    $('.features').isotope({
        itemSelector: '.grid-item',
        masonry: {
            columnWidth: 25
        }
    });
    // $('.advancements').isotope({
    //     itemSelector: '.grid-item',
    //     masonry: {
    //         columnWidth: 600
    //     }
    // })
});

function buildSpells() {
    let htmlString = "";

    for (let i = 0; i < spell.length; i++) {
        var $div = $('#defaultSpellCard');

        var $klon = $div.clone().prop('id', 'spell' + i);

        if ($("#spell" + (i - 1)).length === 0) {
            $div.after($klon.show());
        } else {
            $("#spell" + (i - 1)).after($klon.show());
        }

        $("#spell" + i).children().children().children(".spellName").text(spell[i]["name"])
        $("#spell" + i).children().children().children().children().children(".spellSchool").text(spell[i]["school"])
        $("#spell" + i).children().children().children().children().children(".spellLevel").text(spell[i]["level"])
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
        if (spell[i]["ritual"] == "YES"){
            $("#spell" + i).children().children().children().children(".ritual").text("Ritual")
        }
        $("#spell" + i).children().children().children(".spellDescription").html(htmlString)
        $("#spell" + i).addClass("grid-item")

        htmlString = "";
    }
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


function showMenu() {
    var x = document.getElementById("menu");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}


function dropdownShow(str) {
    let elements = ["classesDropdown", "spellDropdown", "equipDropdown"]

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
    let sidebarDivs = ["barbsidebar","bardsidebar","clericsidebar","druidsidebar","fightersidebar","monksidebar","paladinsidebar","rangersidebar","roguesidebar","sorcerersidebar","warlocksidebar","wizardsidebar"]

    for (let i = 0; i < sidebarDivs.length; i ++) {
        if (sidebarDivs[i] != id)   {
            $("#"+sidebarDivs[i]).removeClass("w3-show")
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

function spellNameFilter() {
    let classNames = ["All", "Artificer", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]

    classNames.forEach(function (className) {
        $("#classBtn" + className).removeClass('w3-blue').removeClass('w3-grey').addClass('w3-grey');
    });

    $("#classBtnAll").removeClass('w3-grey').addClass('w3-blue');


    var input = document.getElementById('spellNameSearch').value.toUpperCase();

    if (input != "") {
        // Filter for spell names that match the input
        $('.spellGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var name = $(this).find('.spellName').text().toUpperCase();
                // return true to show, false to hide
                return name.indexOf(input) > -1;
            }
        })
    } else {
        $('.spellGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }
}

function spellClassFilter(input) {
    $("#spellNameSearch").val("");

    let classNames = ["All", "Artificer", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]

    let filter = input.toUpperCase();

    classNames.forEach(function (className) {
        if (className != input) {
            $("#classBtn" + className).removeClass('w3-blue').removeClass('w3-grey').addClass('w3-grey');
        }
    });

    $("#classBtn" + input).removeClass('w3-grey').addClass('w3-blue');


    if (input != "All") {
        // Filter for spell names that match the input
        $('.spellGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var spClass = $(this).find('.spellClasses').text().toUpperCase();
                // return true to show, false to hide
                return spClass.indexOf(filter) > -1;
            }
        })
    } else {
        $('.spellGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }
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
}


function buildNavbar() {
    $('#navBarDiv').load("./navbar.html");
}


function spellSearchClick(el) {
    $("#spellNameSearch").val(el.firstChild.textContent);
    spellNameFilter();
    $('html, body').animate({
        scrollTop: ($('#spellNameSearch').offset().top)
    }, 150);
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