var player = {
    dollars:0,
    clickPower:1,
    workers:[0, 0, 0, 0, 0, 0],
    costs:[15,100,1100,12000,130000,1400000],
    workerProds:[0.1,1,8,47,260,1400],
    inBank:0,
    interestRate:.003,
    totalInterest:0,
    totalCheck:50000,
    increase50K:0,
    totalDonated:0,
    karma:0,
    karmaMult:1
};


function moneyClick(numClicks){
   getMoney(player.clickPower);
}

function getMoney(number){
    player.dollars = player.dollars + (number * player.karmaMult);
    document.getElementById("dollars").innerHTML = comma(player.dollars);
}

function updateMPS(){
    document.getElementById("moneyPerSec").innerHTML = comma((((player.workers[0] / 10) + (player.workers[1]) + (player.workers[2] * 8) + (player.workers[3] * 47) + (player.workers[4] * 260) + player.workers[5] * 1400) * player.karmaMult).toFixed(1));
}

function increasePower(){
    var powerCost = Math.floor(30 * Math.pow(2.25,player.clickPower-1));     //works out the cost of this click power upgrade
    if(player.dollars >= powerCost){                                        //checks that the player can afford the click power upgrade
        player.clickPower = player.clickPower + 1;                                 //increases number of laborers
        player.dollars = player.dollars - powerCost;                              //removes the dollars spent
        document.getElementById('clickPower').innerHTML = player.clickPower * player.karmaMult;      //updates the number of laborers for the user
        document.getElementById('dollars').innerHTML = comma(player.dollars);      //updates the number of dollars for the user
        updateMPS();
    };
    var nextCost = Math.floor(30 * Math.pow(2.25,player.clickPower-1));       //works out the cost of the next click power upgrade
    document.getElementById('powerCost').innerHTML = comma(nextCost);  //updates the click power upgrade cost for the user
};



function reset() {
    karmaString = (player.totalDonated/1000000).toString();
    if(confirm('Are you sure you want to reset? \nYou will receive ' + karmaString + ' karma for money donated to charity.')) {
        player.dollars = 0;
        document.getElementById('dollars').innerHTML = player.dollars;
        
        player.clickPower = 1;
        document.getElementById('clickPower').innerHTML = player.clickPower;
        
        investEntry = 0;
        document.getElementById('investmentEntry').value = null;
        
        player.inBank = 0;
        document.getElementById('inBank').innerHTML = player.inBank;
        
        player.interestRate = .003;
        intRateString = (player.interestRate*100).toFixed(1).toString();
        document.getElementById('intRate').innerHTML = intRateString + "%";
        
        player.totalCheck = 50000;

        player.totalInterest = 0;
        document.getElementById('totalInterest').innerHTML = player.totalInterest.toFixed(0);

        player.workers=[0,0,0,0,0,0];

        for (i=0; i<6; i++){
            document.getElementById(player.workerIDs[i]).innerHTML = player.workers[i];
        };

        powerCost = 30;
        document.getElementById('powerCost').innerHTML = powerCost;


        player.costs = [15,100,1100,12000,130000,1400000];
        for (i=0; i<6; i++){
            document.getElementById(workerCostIDs[i]).innerHTML = comma(player.costs[i]);
        }

        karmaCalc(player.totalDonated);

        player.totalDonated = 0;
        document.getElementById('totalDonated').innerHTML = player.totalDonated;

        document.getElementById('clickPower').innerHTML = 1*player.karmaMult;

        updateMPS();

        for (i=0; i < 6; i++) {
            player.workerProds[i] = defaultProds[i] * player.karmaMult;
            document.getElementById(workerProdIDs[i]).innerHTML = player.workerProds[i];
        }

        
    }
    else {
        return false
    }
};


function comma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var chimp = new Audio("chimp.mp3");

function getMonkey(){
    chimp.play();
}


