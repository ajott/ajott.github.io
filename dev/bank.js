var investEntry = 0;
var interestTicks = 0;


function deposit(depAmount){
    if (depAmount == null) {
        investEntry = document.getElementById('investmentEntry').value;
        if (investEntry > 0){
            if(player.dollars >= investEntry){                                        
                player.inBank = Number(player.inBank) + Number(investEntry);                                   
                player.dollars = player.dollars - investEntry;
                interestTicks = 0;
                $('#inBank').text(comma(player.inBank));
                $('#dollars').text(comma(player.dollars));
                $('#investmentEntry').val(null);
                $('#intPer10').text(comma((Number(player.inBank)*player.interestRate).toFixed(0)));
            }
        }
    }   else {
           player.inBank = Number(player.inBank) + depAmount;
            player.dollars = player.dollars - depAmount;
            interestTicks = 0;
            $('#inBank').text(comma(player.inBank));
            $('#dollars').text(comma(player.dollars));
            $('#intPer10').text(comma((Number(player.inBank)*player.interestRate).toFixed(0))); 
        }
}

function withdraw(withAmount){
    if (withAmount == null) {
        investEntry = document.getElementById('investmentEntry').value;
        if (investEntry > 0){
            if(Number(player.inBank) >= Number(investEntry)){
                player.inBank = Number(player.inBank) - Number(investEntry);
                player.dollars = player.dollars + Number(investEntry);
                interestTicks = 0;
                $('#inBank').text(comma(player.inBank));
                $('#dollars').text(comma(player.dollars));
                $('#investmentEntry').val(null);
                $('#intPer10').text(comma((Number(player.inBank)*player.interestRate).toFixed(0)));
            }
        }  
    } else {
        player.inBank = Number(player.inBank) - withAmount;
        player.dollars = player.dollars + withAmount;
        interestTicks = 0;
        $('#inBank').text(comma(player.inBank));
        $('#dollars').text(comma(player.dollars));
        $('#intPer10').text(comma((Number(player.inBank)*player.interestRate).toFixed(0)));
    }

       
}

function investInterest(){
    var maxBalance = 10000000*Math.pow(10,player.resets)
    $('#maxBalance').text(comma(maxBalance));
      
    if ((player.inBank + (Number(player.inBank)*player.interestRate)) < maxBalance){
            
        player.totalInterest = Math.floor(player.totalInterest + (Number(player.inBank)*player.interestRate));
        player.inBank = Math.floor(Number(player.inBank) + (Number(player.inBank)*player.interestRate));

        $('#totalInterest').text(comma(player.totalInterest.toFixed(0)));
        $('#inBank').text(comma(player.inBank.toFixed(0)));
        $('#intPer10').text(comma((Number(player.inBank)*player.interestRate).toFixed(0)));
    } else if (player.inBank < maxBalance && ((player.inBank + (Number(player.inBank)*player.interestRate)) >= maxBalance)) {
        player.totalInterest = Math.floor(player.totalInterest + (maxBalance - player.inBank));
        player.inBank = Math.floor(player.inBank + (maxBalance - player.inBank));
        $('#totalInterest').text(comma(player.totalInterest.toFixed(0)));
        $('#inBank').text(comma(player.inBank.toFixed(0)));
        $('#intPer10').text("0 - Balance Maxed");
    } else {
        $('#totalInterest').text(comma(player.totalInterest.toFixed(0)));
        $('#inBank').text(comma(player.inBank.toFixed(0)));
        $('#intPer10').text("0 - Balance Maxed");
    }
}



function increaseInterest() {
    player.interestRate = (player.interestRate + .001);
    intRateString = (player.interestRate*100).toFixed(1).toString();
    document.getElementById('intRate').innerHTML = intRateString + "%";
    document.getElementById('intPer10').innerHTML = comma((Number(player.inBank)*player.interestRate).toFixed(0));
}

function checkTotalInterest() {
    if (player.totalInterest >= player.totalCheck) {
        
        increaseInterest();
        player.totalCheck = player.totalCheck * 10;
        
    }
}

function checkInterest() {
    if (interestTicks < 10) {
        interestTicks = interestTicks + 1;

    } else if (interestTicks == 10){
        interestTicks = 1;
        investInterest();
        checkTotalInterest();  
    }
}


// function bankBarUpdate() {
//     wdth = document.getElementById('progressBar').style.width.toString()
//     wdth = Number(wdth.substring(0,wdth.length-1))

//     if (wdth < 100){
//         wdth = wdth + 10;
//         document.getElementById('progressBar').className = "progress-bar progress-bar-success progress-bar-striped active"
//     } else if (wdth == 100){
//         wdth = 10;
//         document.getElementById('progressBar').className = "progress-bar progress-bar-success progress-bar-striped active notransition"
//     }

//     wdth = wdth.toString()
//     wdth = wdth + "%"

//     document.getElementById('progressBar').style.width = wdth
    
// }