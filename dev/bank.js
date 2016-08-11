var investEntry = 0;



function deposit(depAmount){
    if (depAmount == null) {
        investEntry = document.getElementById('investmentEntry').value;
        if (investEntry > 0){
            if(player.dollars >= investEntry){                                        
                player.inBank = Number(player.inBank) + Number(investEntry);                                   
                player.dollars = player.dollars - investEntry;                             
                document.getElementById('inBank').innerHTML = comma(player.inBank);
                document.getElementById('dollars').innerHTML = comma(player.dollars);
                document.getElementById('investmentEntry').value = null;
                document.getElementById('intPer10').innerHTML = comma((Number(player.inBank)*player.interestRate).toFixed(0));
            }
        }
    }   else {
           player.inBank = Number(player.inBank) + depAmount;
            player.dollars = player.dollars - depAmount;
            document.getElementById('inBank').innerHTML = comma(player.inBank);      
            document.getElementById('dollars').innerHTML = comma(player.dollars);
            document.getElementById('intPer10').innerHTML = comma((Number(player.inBank)*player.interestRate).toFixed(0)); 
        }
}

function withdraw(withAmount){
    if (withAmount == null) {
        investEntry = document.getElementById('investmentEntry').value;
        if (investEntry > 0){
            if(Number(player.inBank) >= Number(investEntry)){
                player.inBank = Number(player.inBank) - Number(investEntry);
                player.dollars = player.dollars + Number(investEntry);
                document.getElementById('inBank').innerHTML = comma(player.inBank);
                document.getElementById('dollars').innerHTML = comma(player.dollars);
                document.getElementById('investmentEntry').value = null;
                document.getElementById('intPer10').innerHTML = comma((Number(player.inBank)*player.interestRate).toFixed(0));
            }
        }  
    } else {
        player.inBank = Number(player.inBank) - withAmount;
        player.dollars = player.dollars + withAmount;
        document.getElementById('inBank').innerHTML = comma(player.inBank);
        document.getElementById('dollars').innerHTML = comma(player.dollars);
        document.getElementById('intPer10').innerHTML = comma((Number(player.inBank)*player.interestRate).toFixed(0));
    }

       
}

function investInterest(){
    player.totalInterest = Math.floor(player.totalInterest + (Number(player.inBank)*player.interestRate));
    player.inBank = Math.floor(Number(player.inBank) + (Number(player.inBank)*player.interestRate));
    
    if (player.inBank < 10000000){
        
        document.getElementById('totalInterest').innerHTML = comma(player.totalInterest.toFixed(0));
        document.getElementById('inBank').innerHTML = comma(player.inBank.toFixed(0));
        document.getElementById('intPer10').innerHTML = comma((Number(player.inBank)*player.interestRate).toFixed(0));
    } else {
        document.getElementById('intPer10').innerHTML = "0 - Balance Maxed"
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

function bankBarUpdate() {
    wdth = document.getElementById('progressBar').style.width.toString()
    wdth = Number(wdth.substring(0,wdth.length-1))

    if (wdth < 100){
        wdth = wdth + 1;
        document.getElementById('progressBar').className = "progress-bar progress-bar-success progress-bar-striped active"
    } else if (wdth == 100){
        wdth = 1;
        document.getElementById('progressBar').className = "progress-bar progress-bar-success progress-bar-striped active notransition"
    }

    wdth = wdth.toString()
    wdth = wdth + "%"

    document.getElementById('progressBar').style.width = wdth
    
}