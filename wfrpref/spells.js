function spellFilter(input) {
    $('.btn-selected').removeClass('btn-selected')
    $('#loreDesc').html("");


    if ($(".spellCard").length != 0) {
        $(".spellGrid").isotope('destroy')
    } else {

    }

    $('.grid-item').remove();

    let htmlString = "";

    let lore = input;

    $('#loreBtn'+lore).addClass('btn-selected');

    if (lores[lore]["wind"]) {
        $('.loreDesc').html("<div class=\"w3-card-2 w3-round-large w3-center loreDescDetail\"><img class=\"loreDescIcon\" w3-card src=\"img/" + lores[lore]["wind"] + ".png\"/><h3><em>Lore of "+lore+"</em></h3>"+lores[lore]["desc"]+"</div>");
    } else if (lore == "Petty" || lore == "Arcane") {
        $('.loreDesc').html("<div class=\"w3-card-2 w3-round-large w3-center loreDescDetail\"><h3 style=\"padding-top:1em;\"><em>"+lore+" Magic</em></h3>"+lores[lore]["desc"]+"</div>");
    } else {
        $('.loreDesc').html("<div class=\"w3-card-2 w3-round-large w3-center loreDescDetail\"><h3 style=\"padding-top:1em;\"><em>Lore of "+lore+"</em></h3>"+lores[lore]["desc"]+"</div>");
    }
    

    for (let i = 0; i < spell.length; i++) {
        if (spell[i]["lore"] == lore) {


            var $div = $('#defaultSpellCard');

            var $klon = $div.clone().prop('id', 'spell' + i);

            if ($("#spell" + (i - 1)).length === 0) {
                $div.after($klon.show().removeClass("w3-hide"));
            } else {
                $("#spell" + (i - 1)).after($klon.show().removeClass("w3-hide"));
            }


            $("#spell" + i + " .spellName").html(spell[i]["name"])
            
            $("#spell" + i + " .spellCN").text(spell[i]["CN"])
            $("#spell" + i + " .spellRange").html(spell[i]["range"])
            $("#spell" + i + " .spellTarget").html(spell[i]["target"])
            $("#spell" + i + " .spellDuration").html(spell[i]["duration"])

            if (spell[i]["description"] != undefined) {
                if (typeof (spell[i]["description"]) == "object") {
                    for (let j = 0; j < spell[i]["description"].length; j++) {
                        htmlString += "<p>" + spell[i]["description"][j] + "</p>";
                    }
                } else {
                    htmlString = "<p>" + spell[i]["description"] + "</p>"
                }
            }
            
            $("#spell" + i + " .spellDescription").html(htmlString)
            $("#spell" + i).addClass("grid-item spellCard")

            htmlString = "";
        }

        setTimeout(() => {
            $('.spellGrid').isotope({
                itemSelector: '.grid-item',
                masonry: {
                    columnWidth: 25
                },
                getSortData: {
                    name: '.spellName',
                    CN: '.spellCN',
                    lore: '.spellLore'
                }
            });
            $('.spellGrid').isotope({
                sortBy: 'name'
            })
            $('spellGrid').isotope('updateSortData').isotope();
        },150)
        

        initializeModals();


    }



}
