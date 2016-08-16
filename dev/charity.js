

function donate(donAmount){
    if (donAmount == null) {
        donation = $('#donationEntry').val();
        if (donation > 0){
            if(player.dollars >= donation){                                        
                player.totalDonated = Number(player.totalDonated) + Number(donation);                                   
                player.dollars = player.dollars - donation;                             
                $('#totalDonated').text(comma(player.totalDonated));
                $('#dollars').text(comma(player.dollars));
                $('#donationEntry').val(null);
            }
        }
    }   else {
           player.totalDonated = Number(player.totalDonated) + donAmount;
            player.dollars = player.dollars - donAmount;
            $('#totalDonated').text(comma(player.totalDonated));      
            $('#dollars').text(comma(player.dollars));
        }
}


function karmaCalc(tD) {
    karmaTemp = (tD / 1000000);

    if (karmaTemp > 0){
        player.resets ++;
    } else {

    }

    player.karma = player.karma + karmaTemp;

    $("#karma").text(comma(player.karma));

    karmaMultTemp = Math.max((Math.pow(2,(Math.log(player.karma)/Math.log(10)))).toFixed(0),1);

    player.karmaMult = karmaMultTemp;

    $("#karmaMult").text(player.karmaMult);
}