var dollars = 0;
var clickPower = 1;


function moneyClick(numClicks){
    getMoney(clickPower);
}

function getMoney(number){
    dollars = dollars + (number * karmaMult);
    document.getElementById("dollars").innerHTML = comma(dollars);
};

function updateMPS(){
    document.getElementById("moneyPerSec").innerHTML = comma((((workers[0] / 10) + (workers[1]) + (workers[2] * 8) + (workers[3] * 47) + (workers[4] * 260) + workers[5] * 1400) * karmaMult).toFixed(1));
}

function increasePower(){
    var powerCost = Math.floor(30 * Math.pow(2.25,clickPower-1));     //works out the cost of this click power upgrade
    if(dollars >= powerCost){                                        //checks that the player can afford the click power upgrade
        clickPower = clickPower + 1;                                 //increases number of laborers
        dollars = dollars - powerCost;                              //removes the dollars spent
        document.getElementById('clickPower').innerHTML = clickPower * karmaMult;      //updates the number of laborers for the user
        document.getElementById('dollars').innerHTML = comma(dollars);      //updates the number of dollars for the user
        updateMPS();
    };
    var nextCost = Math.floor(30 * Math.pow(2.25,clickPower-1));       //works out the cost of the next click power upgrade
    document.getElementById('powerCost').innerHTML = comma(nextCost);  //updates the click power upgrade cost for the user
};



function reset() {
    karmaString = (totalDonated/1000000).toString();
    if(confirm('Are you sure you want to reset? \nYou will receive ' + karmaString + ' karma for money donated to charity.')) {
        dollars = 0;
        document.getElementById('dollars').innerHTML = dollars;
        
        clickPower = 1;
        document.getElementById('clickPower').innerHTML = clickPower;
        
        investEntry = 0;
        document.getElementById('investmentEntry').value = null;
        
        inBank = 0;
        document.getElementById('inBank').innerHTML = inBank;
        
        interestRate = .003;
        intRateString = (interestRate*100).toFixed(1).toString();
        document.getElementById('intRate').innerHTML = intRateString + "%";
        
        totalCheck = 50000;

        totalInterest = 0
        document.getElementById('totalInterest').innerHTML = totalInterest.toFixed(0);

        workers=[0,0,0,0,0,0];

        for (i=0; i<6; i++){
            document.getElementById(workerIDs[i]).innerHTML = workers[i];
        };

        powerCost = 30;
        document.getElementById('powerCost').innerHTML = powerCost;


        costs = [15,100,1100,12000,130000,1400000];
        for (i=0; i<6; i++){
            document.getElementById(workerCostIDs[i]).innerHTML = comma(costs[i]);
        }

        karmaCalc(totalDonated);

        totalDonated = 0;
        document.getElementById('totalDonated').innerHTML = totalDonated;

        document.getElementById('clickPower').innerHTML = 1*karmaMult;

        updateMPS();

        for (i=0; i < 6; i++) {
            workerProds[i] = workerProds[i] * karmaMult
            document.getElementById(workerProdIDs[i]).innerHTML = workerProds[i];
        };

        
    }
    else {
        return false
    }
}


function comma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var chimp = new Audio("chimp.mp3");

function getMonkey(){
    chimp.play();
}