function miracleFilter(obj, input) {
    if ($(obj).hasClass("btn-selected")) {


        $('#cultDesc').html("");
        $('.cultDescDetail').hide();

        $(".miracleGrid").isotope('destroy')

        $('.grid-item').remove();
        $('.btn-selected').removeClass('btn-selected')


    } else {

        let htmlString = "";

        let cult = input;
        $('#cultDesc').html("");

        if ($(".blessCard").length != 0) {
            $(".miracleGrid").isotope('destroy')
        }

        $('.grid-item').remove();
        $('.btn-selected').removeClass('btn-selected')
        $('#cultBtn' + cult).addClass('btn-selected');


        for (let i = 0; i < miracle.length; i++) {
            let isBlessing = (blessByCult[cult].includes(miracle[i]["name"]))
            if (miracle[i]["god"] == cult || isBlessing) {


                // Cult Description
                $('.cultImg').attr('src', "./img/" + cult + " Shrine.webp")

                $('.godDesc').html(cults[cult]["title"]);
                $('.cultSOP').html(cults[cult]["SOP"]);
                $('.cultHOC').html(cults[cult]["HOC"]);
                $('.cultOrders').html(cults[cult]["Orders"]);
                $('.cultFestivals').html(cults[cult]["Festivals"]);
                $('.cultBooks').html(cults[cult]["Books"]);
                $('.cultSymbols').html(cults[cult]["Symbols"]);
                $('.cultGodDesc').html(cults[cult]["GodDesc"]);
                $('.cultWorshippers').html(cults[cult]["Worshippers"]);
                $('.cultSites').html(cults[cult]["Sites"]);
                $('.cultPenances').html(cults[cult]["Penances"]);
                $('.cultStrictures').html(cults[cult]["Strictures"]);
                $('.cultDescDetail').show();


                var $div = $('#defaultMiracleCard');

                var $klon = $div.clone().prop('id', 'miracle' + i);


                if ($("#miracle" + (i - 1)).length === 0) {
                    $div.after($klon.show().removeClass("w3-hide"));
                } else {
                    $("#miracle" + (i - 1)).after($klon.show().removeClass("w3-hide"));
                }


                if (isBlessing) {
                    $("#miracle" + i + " .miracleName").html("Blessing of " + miracle[i]["name"])
                    $("#miracle" + i + " .miracleTier").html(0)
                    $("#miracle" + i).addClass("blessCard")
                } else {
                    $("#miracle" + i + " .miracleName").html(miracle[i]["name"])
                    $("#miracle" + i + " .miracleTier").html(1)
                }

                if (isBlessing) {
                    $("#miracle" + i + " .miracleGod").text(cult)
                } else {
                    $("#miracle" + i + " .miracleGod").text(miracle[i]["god"])
                }

                $("#miracle" + i + " .miracleRange").html(miracle[i]["range"])
                $("#miracle" + i + " .miracleTarget").html(miracle[i]["target"])
                $("#miracle" + i + " .miracleDuration").html(miracle[i]["duration"])

                if (miracle[i]["desc"] != undefined) {
                    if (typeof (miracle[i]["desc"]) == "object") {
                        for (let j = 0; j < miracle[i]["desc"].length; j++) {
                            htmlString += "<p>" + miracle[i]["desc"][j] + "</p>";
                        }
                    } else {
                        htmlString = "<p>" + miracle[i]["desc"] + "</p>"
                    }
                }

                $("#miracle" + i + " .miracleDescription").html(htmlString)
                $("#miracle" + i).addClass("grid-item")

                htmlString = "";
            }

            initializeModals();

            setTimeout(() => {
                $('.miracleGrid').isotope({
                    itemSelector: '.grid-item',
                    masonry: {
                        columnWidth: 25
                    },
                    getSortData: {
                        name: '.miracleName',
                        tier: '.miracleTier'
                    }
                });
                $('.miracleGrid').isotope({
                    sortBy: ['tier', 'name']
                })
                $('miracleGrid').isotope('updateSortData').isotope();
            }, 150)


        }

    }

    document.getElementById("miracleCards").scrollIntoView();


}

$(document).ready(function () {
    buildBlessByCultTable();

});

function buildBlessByCultTable() {
    let htmlString = ""

    Object.entries(blessByCult).forEach(god => {

        htmlString += "<tr>"
        htmlString += "<td>" + god[0] + "</td>"

        god[1].forEach(blessing => {
            htmlString += "<td><divineman>" + blessing + "</divineman></td>"
        });

        htmlString += "</tr>"
    });

    $("#blessTable").html(htmlString)
}

