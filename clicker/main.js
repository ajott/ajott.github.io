var dollars = 0;
var clickPower = 1;


function moneyClick(numClicks){
    for (i = 0; i < numClicks; i++){
    getMoney(clickPower);
    }
}

function getMoney(number){
    dollars = dollars + (number * karmaMult);
    document.getElementById("dollars").innerHTML = dollars;
};

function updateMPS(){
    document.getElementById("moneyPerSec").innerHTML = (((laborers / 10) + (techs) + (clerks * 8) + (engineers * 47))).toFixed(1);
}

function increasePower(){
    var powerCost = Math.floor(30 * Math.pow(2.25,clickPower-1));     //works out the cost of this click power upgrade
    if(dollars >= powerCost){                                        //checks that the player can afford the click power upgrade
        clickPower = clickPower + 1;                                 //increases number of laborers
        dollars = dollars - powerCost;                              //removes the dollars spent
        document.getElementById('clickPower').innerHTML = clickPower * karmaMult;      //updates the number of laborers for the user
        document.getElementById('dollars').innerHTML = dollars;      //updates the number of dollars for the user
        updateMPS();
    };
    var nextCost = Math.floor(30 * Math.pow(2.25,clickPower-1));       //works out the cost of the next click power upgrade
    document.getElementById('powerCost').innerHTML = nextCost;  //updates the click power upgrade cost for the user
};





function reset() {
    karmaString = (totalDonated/100000).toString();
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
        totalInterest = 0
        document.getElementById('totalInterest').innerHTML = totalInterest.toFixed(0);
        laborers = 0;
        document.getElementById('laborers').innerHTML = laborers;
        techs = 0;
        document.getElementById('techs').innerHTML = techs;
        clerks = 0;
        document.getElementById('clerks').innerHTML = clerks;
        engineers = 0;
        document.getElementById('engineers').innerHTML = engineers;
        powerCost = 30;
        document.getElementById('powerCost').innerHTML = powerCost;
        laborerCost = 15;
        document.getElementById('laborerCost').innerHTML = laborerCost;
        techCost = 100;
        document.getElementById('techCost').innerHTML = techCost;
        clerkCost = 1100;
        document.getElementById('clerkCost').innerHTML = clerkCost;
        engCost = 12000;
        document.getElementById('engCost').innerHTML = engCost;

        karmaCalc(totalDonated);

        totalDonated = 0;
        document.getElementById('totalDonated').innerHTML = totalDonated;

        document.getElementById('laborProd').innerHTML = 0.1*karmaMult;
        document.getElementById('techProd').innerHTML = 1*karmaMult;
        document.getElementById('clerkProd').innerHTML = 8 * karmaMult;
        document.getElementById('engProd').innerHTML = 47*karmaMult;
        document.getElementById('clickPower').innerHTML = 1*karmaMult;
    }
    else {
        return false
    }
}