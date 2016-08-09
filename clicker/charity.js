var totalDonated = 0;
var karma = 0;
var karmaMult = 1;


function donate() {
    donation = document.getElementById('donationEntry').value;
    
    if (donation >= 0){
        if(dollars >= donation){                                        
            totalDonated = Number(totalDonated) + Number(donation);                                   
            dollars = dollars - donation;                             
            document.getElementById('totalDonated').innerHTML = Number(totalDonated);      
            document.getElementById('dollars').innerHTML = dollars;
            document.getElementById('donationEntry').value = null;
        };
    }

}


function karmaCalc(tD) {
    karma = tD / 100000;
    // karma = floor(totalDonated);
    document.getElementById('karma').innerHTML = karma;

    karmaMult = (Math.pow(2,(Math.log(karma)/Math.log(5)))).toFixed(0);
    document.getElementById('karmaMult').innerHTML = karmaMult;
}