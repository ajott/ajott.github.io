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


function roll(str, mod = 0) {

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

    return totals;
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
        if (spell[i]["ritual"] == "YES"){
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
        spellFilters.forEach(function(filter) {
            if (spellSchools.indexOf(filter) > -1) {
                spellFilters.splice(spellFilters.indexOf(filter),1)
            }
        })

        $this.parent().children().removeClass("w3-blue").addClass("w3-grey")

    }

    if (mod == 2) {
        spellFilters.forEach(function(filter) {
            if (spellLevels.indexOf(filter) > -1) {
                spellFilters.splice(spellFilters.indexOf(filter),1)
            }
        })
        $this.parent().children().removeClass("w3-blue").addClass("w3-grey")
    }

    if (!duplicate) {
        $this.addClass("w3-blue").removeClass("w3-grey")
        spellFilters.push(filterText);
    } else {
        if (mod != 1 && mod != 2) {
        spellFilters.splice(spellFilters.indexOf(filterText),1);
    }
        $this.removeClass("w3-blue").addClass("w3-grey");
    }


    $('.spellGrid').isotope({
        filter: function () {
            // _this_ is the item element. Get text of element's .name
            var spFilter = $(this).find('.spellFilters').text().toUpperCase();

            let matches = [];

            spellFilters.forEach(function(filterVal) {
                matches.push(spFilter.indexOf(filterVal) > -1);
            })


            // return true to show, false to hide
            return matches.every(filterMatches);
        }
    })
}

function spellNameFilter(exact = 0) {
    let classNames = ["All", "Artificer", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]


    classNames.forEach(function (className) {
        $("#classBtn" + className).removeClass('w3-blue').removeClass('w3-grey').addClass('w3-grey');
    });

    let schoolNames = [
        "All",
        "Abjuration",
        "Conjuration",
        "Divination",
        "Enchantment",
        "Evocation",
        "Illusion",
        "Necromancy",
        "Transmutation"
      ]

    schoolNames.forEach(function (schoolName) {
        $("#schoolBtn" + schoolName).removeClass('w3-blue').removeClass('w3-grey').addClass('w3-grey');
    });

    for (let i = 0; i < 10; i ++) {
        $("#levelBtn" + i).removeClass('w3-blue').removeClass('w3-grey').addClass('w3-grey');
    }

    var input = document.getElementById('spellNameSearch').value.toUpperCase();

    if (input[0] == "\"") {
        exact = 1;
        if (input[input.length-1] == "\"") {
            input = input.substring(1,input.length - 1)
        } else {
            input = input.substring(1,input.length)
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
}


function clearSpellFilter() {
    spellFilters = [];

    $("#spellNameSearch").val("")

    $('.spellGrid').isotope({
        // Clear filter
        filter: '*'
    })

    let classNames = ["All", "Artificer", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]

    classNames.forEach(function (className) {
        $("#classBtn" + className).removeClass('w3-blue').removeClass('w3-grey').addClass('w3-grey');
    });

    let schoolNames = [
        "All",
        "Abjuration",
        "Conjuration",
        "Divination",
        "Enchantment",
        "Evocation",
        "Illusion",
        "Necromancy",
        "Transmutation"
      ]

    schoolNames.forEach(function (schoolName) {
        $("#schoolBtn" + schoolName).removeClass('w3-blue').removeClass('w3-grey').addClass('w3-grey');
    });

    for (let i = 0; i < 10; i ++) {
        $("#levelBtn" + i).removeClass('w3-blue').removeClass('w3-grey').addClass('w3-grey');
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
    $("#spellNameSearch").val("\""+el.firstChild.textContent+"\"");
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