var dollars = 0;
var clickPower = 1;
var investEntry = 0;
var inBank = 0;
var interestRate = .003;
var totalInterest = 0
var laborers = 0;
var techs = 0;
var engineers = 0;

function moneyClick(numClicks){
    for (i = 0; i < numClicks; i++){
    getMoney(clickPower);
    }
}

function getMoney(number){
    dollars = dollars + number;
    document.getElementById("dollars").innerHTML = dollars;
};

function updateMPS(){
    document.getElementById("moneyPerSec").innerHTML = (((laborers / 10) + (techs) + (engineers * 8))).toFixed(1);
}

function increasePower(){
    var powerCost = Math.floor(30 * Math.pow(2.25,clickPower-1));     //works out the cost of this click power upgrade
    if(dollars >= powerCost){                                        //checks that the player can afford the click power upgrade
        clickPower = clickPower + 1;                                 //increases number of laborers
        dollars = dollars - powerCost;                              //removes the dollars spent
        document.getElementById('clickPower').innerHTML = clickPower;      //updates the number of laborers for the user
        document.getElementById('dollars').innerHTML = dollars;      //updates the number of dollars for the user
        updateMPS();
    };
    var nextCost = Math.floor(30 * Math.pow(2.25,clickPower-1));       //works out the cost of the next click power upgrade
    document.getElementById('powerCost').innerHTML = nextCost;  //updates the click power upgrade cost for the user
};


window.setInterval(function(){
	
    getMoney(techs);
    getMoney(engineers*8);
	
}, 1000);

window.setInterval(function(){
    
    investInterest();
    updateMPS();
    getMoney(laborers);
    checkTotalInterest();
    
}, 10000);