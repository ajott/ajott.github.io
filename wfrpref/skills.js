function skillFilter(input, mod = 0) {
    let $this = $(input)

    if ($this.hasClass("btn-selected")) {
        $this.removeClass("btn-selected")

        $(".skillGrid").isotope({ filter: '*' })

    } else {

        $('.skillFilterBtn').removeClass("btn-selected")

        $("#skillNameSearch").val("")

        let filterText = "." + $this.html();

        $(".skillGrid").isotope({ filter: filterText })

        $this.addClass("btn-selected")
    }

}

function skillModalSearch() {
    outSkillSearch($('#skillDialog .skillName'))
}

function talentModalSearch() {
    outTalentSearch($('#talentDialog .talentName'))
}


function skillNameFilter(exact = 0) {

    $('.skillFilterBtn').removeClass("btn-selected")

    var input = document.getElementById('skillNameSearch').value.toUpperCase();

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
        $('.skillGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var name = $(this).find('.skillName').text().toUpperCase();
                // return true to show, false to hide
                if (exact == 1) {
                    return (name == input)
                } else {
                    return name.indexOf(input) > -1;
                }
            }
        })
    } else {
        $('.skillGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }

}

function clearSkillFilter() {
    $("#skillNameSearch").val("")

    skillNameFilter();
}

function skillNameCopy(el) {

    const cpEl = document.createElement('textarea');

    cpEl.value = $(el).siblings(".skillName").html()

    document.body.appendChild(cpEl);
    let cpLink = (location.href.split("#")[0]) + "#skillList?s=" + encodeURIComponent(cpEl.value)

    navigator.clipboard.writeText(cpLink)

    document.body.removeChild(cpEl);

    $(".tooltiptext").text("Copied");
    $(".tooltiptext").css("background-color", "darkslategrey");
    $(".tooltiptext").css("color", "white");

    setTimeout(function () {
        $(".tooltiptext").text("Copy Link");
        $(".tooltiptext").css("background-color", "black");
        $(".tooltiptext").css("color", "white");
    }, 500)
}




function buildSkills() {
    for (let i = 0; i < skill.length; i++) {


        var $div = $('#defaultSkillCard');

        var $klon = $div.clone().prop('id', 'skill' + i);

        if (i == 1) {
            $div.after($klon.show().removeClass("w3-hide"));
        } else {
            $("#skill" + (i - 1)).after($klon.show().removeClass("w3-hide"));
        }


        $("#skill" + i + " .skillName").html(skill[i]["name"])


        $("#skill" + i + " .skillChar").html(skill[i]["char"])

        if (skill[i]["spec"] != "") {
            $("#skill" + i + " .skillTier").text(skill[i]["tier"] + ", Grouped")
            $("#skill" + i).addClass("Grouped")
            $("#skill" + i + " .skillSpec").html("<b>Example Specialisations: </b>" + skill[i]["spec"])
        } else {
            $("#skill" + i + " .skillTier").text(skill[i]["tier"])
        }

        $("#skill" + i + " .skillDesc").html(skill[i]["desc"])

        $("#skill" + i + " .skillID").html(i);

        $("#skill" + i).addClass(skill[i]["tier"] + " " + skill[i]["char"])

        $("#skill" + i).addClass("skill-item")

        htmlString = "";

        initializeModals();


        setTimeout(() => {
            $('.skillGrid').isotope({
                itemSelector: '.skill-item',
                layoutMode: 'vertical',
                getSortData: {
                    name: '.skillName',
                    tier: '.skillTier',
                    char: '.skillChar',
                    ID: function (itemElem) {
                        let skill_ID = $(itemElem).find('.skillID').text();
                        return parseInt(skill_ID)
                    }
                }
            });
            $('.skillGrid').isotope({
                sortBy: 'name'
            })
            $('skillGrid').isotope('updateSortData').isotope();
        }, 150)


    }
}



function talentFilter(char, input) {
    let $this = $(input)

    if ($this.hasClass("btn-selected")) {
        $this.removeClass("btn-selected")

        $(".talentGrid").isotope({ filter: '*' })

    } else {

        $('.talentFilterBtn').removeClass("btn-selected")

        $("#talentNameSearch").val("")

        $("#talentTestSearch").val("")

        let filterText = "." + char;

        $(".talentGrid").isotope({ filter: filterText })

        $this.addClass("btn-selected")
    }

}

function talentNameFilter(exact = 0) {

    $('.talentFilterBtn').removeClass("btn-selected")

    $("#talentTestSearch").val("")

    var input = document.getElementById('talentNameSearch').value.toUpperCase();

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
        $('.talentGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var name = $(this).find('.talentName').text().toUpperCase();
                // return true to show, false to hide
                if (exact == 1) {
                    return (name == input)
                } else {
                    return name.indexOf(input) > -1;
                }
            }
        })
    } else {
        $('.talentGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }

}

function talentTestFilter(exact = 0) {

    $('.talentFilterBtn').removeClass("btn-selected")

    $("#talentNameSearch").val("")

    var input = document.getElementById('talentTestSearch').value.toUpperCase();

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
        $('.talentGrid').isotope({
            filter: function () {
                // _this_ is the item element. Get text of element's .name
                var name = $(this).find('.talentTest').text().toUpperCase();
                // return true to show, false to hide
                if (exact == 1) {
                    return (name == input)
                } else {
                    return name.indexOf(input) > -1;
                }
            }
        })
    } else {
        $('.talentGrid').isotope({
            // Clear filter
            filter: '*'
        })
    }

}

function clearTalentFilter() {
    $("#talentNameSearch").val("")
    $("#talentTestSearch").val("")

    talentNameFilter();
}

function talentNameCopy(el) {

    const cpEl = document.createElement('textarea');

    cpEl.value = $(el).siblings(".talentName").html()

    document.body.appendChild(cpEl);
    let cpLink = (location.href.split("#")[0]) + "#talentList?s=" + encodeURIComponent(cpEl.value)

    navigator.clipboard.writeText(cpLink)

    document.body.removeChild(cpEl);

    $(".tooltiptext").text("Copied");
    $(".tooltiptext").css("background-color", "darkslategrey");
    $(".tooltiptext").css("color", "white");

    setTimeout(function () {
        $(".tooltiptext").text("Copy Link");
        $(".tooltiptext").css("background-color", "black");
        $(".tooltiptext").css("color", "white");
    }, 500)
}



function buildTalents() {
    for (let i = 0; i < talent.length; i++) {


        var $div = $('#defaultTalentCard');

        var $klon = $div.clone().prop('id', 'talent' + i);

        if (i == 1) {
            $div.after($klon.show().removeClass("w3-hide"));
        } else {
            $("#talent" + (i - 1)).after($klon.show().removeClass("w3-hide"));
        }


        $("#talent" + i + " .talentName").html(talent[i]["name"])


        $("#talent" + i + " .talentMax").html(talent[i]["max"])

        if (talent[i]["test"] != "") {
            $("#talent" + i + " .talentTest").html("<b class=\"w3-tooltip TooltipLight\">Test:<span class=\"w3-text w3-tag w3-darkslate-l1 w3-small w3-round\" style=\"position:absolute;left:0;bottom:18px; padding: 1em;\">Gain +1 SL on successful tests with this skill</span></b> " + talent[i]["test"])
        }

        $("#talent" + i + " .talentDesc").html(talent[i]["desc"])

        $("#talent" + i).addClass("talent-item")

        htmlString = "";

        initializeModals();

        setTimeout(() => {
            $('.talentGrid').isotope({
                itemSelector: '.talent-item',
                layoutMode: 'vertical',
                getSortData: {
                    name: '.talentName',
                }
            });
            $('.talentGrid').isotope({
                sortBy: 'name',
                sortAscending: true
            })
            $('talentGrid').isotope('updateSortData').isotope();
        }, 250)


    }
}

