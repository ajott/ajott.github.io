var investEntry = 0;
var inBank = 0;
var interestRate = .003;
var totalInterest = 0;
var totalCheck = 50000;
var increase50K = 0;


function deposit(depAmount){
    if (depAmount == null) {
        investEntry = document.getElementById('investmentEntry').value;
        if (investEntry > 0){
            if(dollars >= investEntry){                                        
                inBank = Number(inBank) + Number(investEntry);                                   
                dollars = dollars - investEntry;                             
                document.getElementById('inBank').innerHTML = comma(inBank);
                document.getElementById('dollars').innerHTML = comma(dollars);
                document.getElementById('investmentEntry').value = null;
                document.getElementById('intPer10').innerHTML = comma((Number(inBank)*interestRate).toFixed(0));
            }
        }
    }   else {
            inBank = Number(inBank) + depAmount;
            dollars = dollars - depAmount;
            document.getElementById('inBank').innerHTML = comma(inBank);      
            document.getElementById('dollars').innerHTML = comma(dollars);
            document.getElementById('intPer10').innerHTML = comma((Number(inBank)*interestRate).toFixed(0)); 
        }
}

function withdraw(withAmount){
    if (withAmount == null) {
        investEntry = document.getElementById('investmentEntry').value;
        if (investEntry > 0){
            if(Number(inBank) >= Number(investEntry)){
                inBank = Number(inBank) - Number(investEntry);
                dollars = dollars + Number(investEntry);
                document.getElementById('inBank').innerHTML = comma(inBank);
                document.getElementById('dollars').innerHTML = comma(dollars);
                document.getElementById('investmentEntry').value = null;
                document.getElementById('intPer10').innerHTML = comma((Number(inBank)*interestRate).toFixed(0));
            }
        }  
    } else {
        inBank = Number(inBank) - withAmount;
        dollars = dollars + withAmount;
        document.getElementById('inBank').innerHTML = comma(inBank);
        document.getElementById('dollars').innerHTML = comma(dollars);
        document.getElementById('intPer10').innerHTML = comma((Number(inBank)*interestRate).toFixed(0));
    }

       
}

function investInterest(){
    inBank = Math.floor(Number(inBank) + (Number(inBank)*interestRate));
    
    if (inBank < 10000000){
        totalInterest = Math.floor(totalInterest + (Number(inBank)*interestRate));
        document.getElementById('totalInterest').innerHTML = comma(totalInterest.toFixed(0));
        document.getElementById('inBank').innerHTML = comma(inBank.toFixed(0));
        document.getElementById('intPer10').innerHTML = comma((Number(inBank)*interestRate).toFixed(0));
    } else {
        document.getElementById('intPer10').innerHTML = "0 - Balance Maxed"
    }
}



function increaseInterest() {
    interestRate = (interestRate + .001);
    intRateString = (interestRate*100).toFixed(1).toString();
    document.getElementById('intRate').innerHTML = intRateString + "%";
    document.getElementById('intPer10').innerHTML = comma((Number(inBank)*interestRate).toFixed(0));
}

function checkTotalInterest() {
    if (totalInterest >= totalCheck) {
        
        increaseInterest();
        totalCheck = totalCheck * 10;
        
    }
}