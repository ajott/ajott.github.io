var player = {
    dollars:0,
    clickPower:1,
    powerCost:30,
    workers:[0, 0, 0, 0, 0, 0, 0, 0],
    costs:[15,100,1100,12000,130000,1400000,15000000, 99000000],
    workerProds:[0.1,1,8,47,260,1400,16000, 44000],
    workerMults:[1, 1, 1, 1, 1, 1, 1, 1],
    inBank:0,
    interestRate:.003,
    totalInterest:0,
    totalCheck:50000,
    increase50K:0,
    totalDonated:0,
    karma:0,
    karmaMult:1,
    tickLength:1000,
    tickLevel:1,
    tickCost:10000,
    resets:0,
    version:"Alpha 0.9.8.5 Reddit Revision Redeux"
};


function moneyClick(numClicks){
   getMoney(player.clickPower * player.karmaMult);
   validateButtons();
}

function getMoney(number){
    player.dollars = player.dollars + (number);
    $("#dollars").text(comma(player.dollars));
}

function updateMPS(){
    MPS = 0;
    for (i=0;i<(player.workers.length);i+=1){
        MPS = MPS + (player.workers[i]*player.workerProds[i]*player.workerMults[i]);
    }
    $("#moneyPerSec").text(comma(MPS.toFixed(1)));
}

function increasePower(){
         
    if(player.dollars >= player.powerCost){                                       
        player.clickPower = player.clickPower + 1;                              
        player.dollars = player.dollars - player.powerCost;                              
        $('#clickPower').text(player.clickPower * player.karmaMult);
        $('#dollars').text(comma(player.dollars));   
        updateMPS();
    };
    player.powerCost = Math.floor(30 * Math.pow(2,player.clickPower-1));      
    $('#powerCost').text(comma(player.powerCost));
    validateButtons();
};

var minTickTime = 250;

function decreaseTick(){
      
    if(player.dollars >= player.tickCost){
        if(player.tickLength > minTickTime) {
            if ((player.tickLength * 0.9) >= minTickTime) {                                  
                player.tickLevel = player.tickLevel + 1;
                player.tickLength = player.tickLength * .90;
                player.dollars = player.dollars - player.tickCost;
                $('#tickTime').text(player.tickLength.toFixed(0));   
                $('#dollars').text(comma(player.dollars));
                updateMPS();
                resetIntervals(player.tickLength);
            } else {
                player.tickLevel = player.tickLevel + 1;
                player.tickLength = minTickTime;
                player.dollars = player.dollars - player.tickCost;
                $('#tickTime').text(player.tickLength.toFixed(0));   
                $('#dollars').text(comma(player.dollars));
                $('#tickDecrease').addClass("disabled");
                $('#tickDecrease').text("Sold Out")
                updateMPS();
                resetIntervals(player.tickLength);
            }
        }
    };
    player.tickCost = Math.floor(10000 * Math.pow(2.75,player.tickLevel-1));
    $('#tickCost').text(comma(player.tickCost));
    validateButtons();
}


function reset() {
    var karmaString = (player.totalDonated/1000000).toString();
    if(confirm('Are you sure you want to reset? \nYou will receive ' + karmaString + ' karma for money donated to charity.')) {
        var i = 0;
        player.dollars = 0;
        $('#dollars').text(player.dollars);
        
        player.clickPower = 1;
        $('#clickPower').text(player.clickPower);
        
        $('#investmentEntry').val(null);
        
        player.inBank = 0;
        $('#inBank').text(player.inBank);
        
        player.interestRate = 0.003;
        var intRateString = (player.interestRate*100).toFixed(1).toString();
        $('#intRate').text(intRateString + "%");
        
        player.totalCheck = 50000;

        player.totalInterest = 0;
        $('#totalInterest').text(player.totalInterest.toFixed(0));

        for (i=0;i<(player.workers.length);i+=1){
            player.workers[i]=0;
        }

        for (i=0;i<(player.workers.length);i+=1){
            $(workerIDs[i]).text(player.workers[i]);
        }

        player.powerCost = 30;
        $('#powerCost').text(player.powerCost);

        player.tickLevel = 1;

        player.tickLength = 1000;
        $('#tickTime').text(player.tickLength);

        player.tickCost = 10000;
        $('#tickCost').text(comma(player.tickCost));

        for (i=0;i<(player.workers.length);i+=1){
           player.costs[i] = defaultCosts[i];
        }

        for (i=0;i<(player.workers.length);i+=1){
            $(workerCostIDs[i]).text(comma(player.costs[i]));
        }

        karmaCalc(player.totalDonated);

        player.totalDonated = 0;
        $('#totalDonated').text(player.totalDonated);

        $('#clickPower').text(1*player.karmaMult);

        updateMPS();

        for (i=0;i<(player.workers.length+1);i+=1) {
            player.workerProds[i] = defaultProds[i] * player.karmaMult;
            $(workerProdIDs[i]).text(comma(player.workerProds[i]));
        }

        for (i=0;i<(player.workers.length+1);i+=1) {
            player.workerMults[i] = 1;
        }

        $('#tickDecrease').removeClass("disabled");
        $('#tickDecrease').text("Decrease Tick Time")

        investInterest();
        interestTicks = 0;
        togglePanel(0);
        validateButtons();
    }
    else {
        return false;
    }
}


function comma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function togglePanel(panel) {
    if (panel == 0) {
        $('#staff').show()
        $('#bankTable').hide()
        $('#charityTable').hide()
        $('#optionsPanel').hide()
        
        $('#staffTab').addClass("btn-info")
        $('#bankTab').removeClass("btn-info")
        $('#charityTab').removeClass("btn-info")
        $('#optionsTab').removeClass("btn-info")

        validateButtons();

    } else if (panel == 1) {
        $('#staff').hide()
        $('#bankTable').show()
        $('#charityTable').hide()
        $('#optionsPanel').hide()

        $('#staffTab').removeClass("btn-info")
        $('#bankTab').addClass("btn-info")
        $('#charityTab').removeClass("btn-info")
        $('#optionsTab').removeClass("btn-info")

    } else if (panel == 2) {
        $('#staff').hide()
        $('#bankTable').hide()
        $('#charityTable').show()
        $('#optionsPanel').hide()

        $('#staffTab').removeClass("btn-info")
        $('#bankTab').removeClass("btn-info")
        $('#charityTab').addClass("btn-info")
        $('#optionsTab').removeClass("btn-info")

    } else if (panel == 3) {
        $('#staff').hide()
        $('#bankTable').hide()
        $('#charityTable').hide()
        $('#optionsPanel').show()

        $('#staffTab').removeClass("btn-info")
        $('#bankTab').removeClass("btn-info")
        $('#charityTab').removeClass("btn-info")
        $('#optionsTab').addClass("btn-info")
    }

}

var monkeyClicks = 0;

var chimp = new Audio("chimp.mp3");

function getMonkey(){
    if (monkeyClicks == 0){
        if(confirm("This was added as a reference to a typo in the code. \n If you click it again, it WILL make a chimpanzee noise. It's loud.")){
            monkeyClicks ++;
        }
    }
    else if (monkeyClicks < 5){
        chimp.play(); 
        monkeyClicks ++;   
    } else if (monkeyClicks >= 5) {
        chimp.play();
        getMoney(1000000);
        monkeyClicks ++;
    }    
}

function showCredits() {
    $('#creditsWell').toggle();
}

function setTitle() {
    $('#title').text($('#titleInput').val())
    $('#titleInput').val(null);
}


function validateButtons() {
    if (player.dollars < player.powerCost){
        $('#powerButton').addClass('disabled darkButton');
    } else {
        $('#powerButton').removeClass('disabled darkButton');
    }

    if (player.dollars < player.tickCost){
        $('#tickDecrease').addClass('disabled darkButton');
    } else {
        $('#tickDecrease').removeClass('disabled darkButton');
    }

    for (var i = 0; i<(player.workers.length); i += 1){
        if (player.dollars < player.costs[i]){
            $(workerBtnIDs[i]).addClass('disabled darkButton');
        } else {
            $(workerBtnIDs[i]).removeClass('disabled darkButton');
        }
    }
}