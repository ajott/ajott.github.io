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
    monkeyClicks: 0,
    clicks:0,
    lastTickTime: 0,
    buyMax:false,
    clickUpgrades:0,
    clickPowString:"",
    totalDollars:0,
    version:"Beta 0.10.2.2"
};



function moneyClick(numClicks){
   getMoney(player.clickPower * player.karmaMult + Math.floor((player.clickUpgrades * 0.1 * MPS).toFixed(0)));
   player.clicks += 1;
   validateButtons();
}

function getMoney(number){
    player.dollars = player.dollars + (number);
    player.totalDollars += number;
    $("#dollars").text(comma(player.dollars));
    validateButtons();
}

function updateMPS(){
    MPS = 0;
    for (i=0;i<(player.workers.length);i+=1){
        MPS = MPS + (player.workers[i]*player.workerProds[i]*player.workerMults[i]);
    }
    $("#moneyPerSec").text(comma(MPS.toFixed(1)));
    $('#clickPower').text(player.clickPower * player.karmaMult + Math.floor((player.clickUpgrades * 0.1 * MPS).toFixed(0)) + player.clickPowString);
}

function increasePower(){
         
    if(player.dollars >= player.powerCost){                                       
        player.clickPower = player.clickPower + 1;                              
        player.dollars = player.dollars - player.powerCost;
        if (player.clickUpgrades > 0){
            player.clickPowString = " (" + (player.clickPower * player.karmaMult).toString()+" + "+(player.clickUpgrades * 10).toString()+"% of MPS)"
        }

        
        $('#clickPower').text(player.clickPower * player.karmaMult + Math.floor((player.clickUpgrades * 0.1 * MPS).toFixed(0)) + player.clickPowString);
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
                player.tickLength = player.tickLength - 50;
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
    player.tickCost = Math.floor(10000 * Math.pow(2.5,player.tickLevel-1));
    $('#tickCost').text(comma(player.tickCost));
    validateButtons();
}


function reset() {       
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
        $(workerBtnIDs[i]).removeClass('disabled darkButton');
        $(workerBtnIDs[i]).attr('disabled',false);
    }

    player.powerCost = 30;
    $('#powerCost').text(player.powerCost);

    player.tickLevel = 1;

    player.tickLength = 1000;
    $('#tickTime').text(player.tickLength);
    resetIntervals(player.tickLength);

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

    player.workerProds[0] = defaultProds[0] * player.karmaMult;
    $(workerProdIDs[0]).text(comma(player.workerProds[0].toFixed(1)));

    for (i=1;i<(player.workers.length+1);i+=1) {
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


function comma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function unfold(index){
    if (index < 7){
        $(workerRowIDs[index+1]).show();
    }
}

function togglePanel(panel) {
    var panels = ['#staff','#bankTable','#charityTable','#optionsPanel','#statsPanel','#upgradePanel'];
    var tabs = ['#staffTab','#bankTab','#charityTab','#optionsTab','#statsTab','#upgradeTab']

    for (i = 0; i < panels.length; i ++){
        if (i == panel){
            $(panels[i]).show();
            $(tabs[i]).addClass("btn-info");
        } else {
            $(panels[i]).hide();
            $(tabs[i]).removeClass("btn-info");
        }
    }
    validateButtons();
}


var chimp = new Audio("chimp.mp3");

function getMonkey(){
    if (player.monkeyClicks == 0){
        if(confirm("This was added as a reference to a typo in the code. \n If you click it again, it WILL make a chimpanzee noise. It's loud.")){
            player.monkeyClicks ++;
            $('#monkeyTd').show();
        }
    }
    else if (player.monkeyClicks > 0){
        chimp.play(); 
        player.monkeyClicks ++;   
    }  
}

function showCredits() {
    $('#creditsWell').toggle();
}

function setTitle() {
    $('#title').text($('#titleInput').val())
    $('#titleInput').val(null);
}

function maxHireCalc(index){
    var tempCount = player.workers[index];
    var buyCount = 0;


    var tempDollars = player.dollars;


    while (tempDollars >= costCheckOb[workerObNames[index]][tempCount]){
        tempDollars -= costCheckOb[workerObNames[index]][tempCount]    
        buyCount += 1
        tempCount+= 1
    }

    if (tempDollars >= 0){
        return buyCount;
    } else {
        return buyCount-1;
    }
}


function validateButtons() {
    if (player.dollars < player.powerCost){
        $('#powerButton').addClass('disabled darkButton');
    } else {
        $('#powerButton').removeClass('disabled darkButton');
    }

    if (player.dollars < player.tickCost && player.tickLength > minTickTime){
        $('#tickDecrease').addClass('disabled darkButton');
    } else if (player.dollars > player.tickCost && player.tickLength > minTickTime) {
        $('#tickDecrease').removeClass('disabled darkButton');
    } else {        
        $('#tickDecrease').addClass("disabled");
        $('#tickDecrease').text("Sold Out")
    }

    for (var i = 0; i<(player.workers.length); i += 1){
        if (player.dollars < player.costs[i]){
            $(workerBtnIDs[i]).addClass('disabled darkButton');
        } else {
            $(workerBtnIDs[i]).removeClass('disabled darkButton');
        }

        if (maxHireCalc(i) < buyNum){
            $(workerBtnIDs[i]).addClass('disabled darkButton');
        } else {
            $(workerBtnIDs[i]).removeClass('disabled darkButton');
        }

        if (player.workers[i]==200){
            $(workerBtnIDs[i]).addClass('disabled darkButton');
            $(workerBtnIDs[i]).attr('disabled','disabled');
        }
    }

    playerStats();

    if (player.karma < 10 && (player.buyMax===false)){
        $('#buyMaxHireBtn').addClass('disabled darkButton');
    } else if (player.karma >= 10 && (player.buyMax===false)) {
        $('#buyMaxHireBtn').removeClass('disabled darkButton');
    } else {
        $('#buyMaxHireBtn').addClass('disabled darkButton');
        $('#buyMaxHireBtn').text("Owned")
    }

    if (player.karma < (Math.floor(5 * Math.pow(2,player.clickUpgrades)))){
        $('#clickUpgradeButton').addClass('disabled darkButton');
    } else if (player.karma >= (Math.floor(5 * Math.pow(2,player.clickUpgrades)))) {
        $('#clickUpgradeButton').removeClass('disabled darkButton');
    }


    if (maxBuyOn){
        for (var i = 0; i < player.workers.length; i += 1){
            $(workerBadgeIDs[i]).text(maxHireCalc(i));
        }
    } else {
        for (var i = 0; i < player.workers.length; i += 1){
            $(workerBadgeIDs[i]).text("");
        }
    }

    if (player.resets > 0){
        $('#upgradeCont').show();
    }
}


$(function() {
    $( "#nukeDialog" ).dialog({
        autoOpen:false,
        resizable: false,
        height: "auto",
        width: "auto",
        modal: true,
        buttons: {
            "Burn it all!": function() {
                $( this ).dialog( "close" );
                hardReset();
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });
    $( "#nukeButton" ).click(function() {
        $( "#nukeDialog" ).dialog( "open" );
    });
});
