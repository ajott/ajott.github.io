

function donate() {
    donation = document.getElementById('donationEntry').value;
    
    if (donation >= 0){
        if(player.dollars >= donation){                                        
            player.totalDonated = Number(player.totalDonated) + Number(donation);                                   
            player.dollars = player.dollars - donation;                             
            document.getElementById('totalDonated').innerHTML = comma(Number(player.totalDonated));
            document.getElementById('dollars').innerHTML = comma(player.dollars);
            document.getElementById('donationEntry').value = null;
        };
    }

}


function karmaCalc(tD) {
    karmaTemp = (tD / 1000000);
    player.karma = player.karma + karmaTemp;

    document.getElementById('karma').innerHTML = player.karma;


    player.karmaMult = Math.max((Math.pow(2,(Math.log(player.karma)/Math.log(10)))).toFixed(0),1);

    document.getElementById('karmaMult').innerHTML = player.karmaMult;
}