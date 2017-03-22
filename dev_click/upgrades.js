
function buyClickUpgrade(){
    var cost = Math.floor(5 * Math.pow(2,player.clickUpgrades))
    // console.log(cost)

    if (player.karma >= cost){
        karmaDeduct(cost)
        player.clickUpgrades += 1
        player.clickPowString = " (" + (player.clickPower * player.karmaMult).toString()+" + "+(player.clickUpgrades * 10).toString()+"% of MPS)"
        $('#clickUpgradeCost').text(Math.floor(5 * Math.pow(2,player.clickUpgrades)))
    }
}


function buyMaxHire(){
    var cost = 10
    if (player.karma >= cost){
        karmaDeduct(cost)
        player.buyMax = true;
        $('#maxBuyCont').show()
        $('#buyMaxHireBtn').addClass('disabled darkButton');
        $('#buyMaxHireBtn').text("Owned")      
    }
    validateButtons()
}

var maxBuyOn = false;

function toggleMaxBuy(){
    buyNum = 1;

    maxBuyOn = true;

    $('#buy1Button').removeClass('btn-success')
    $('#buy5Button').removeClass('btn-success')
    $('#buy10Button').removeClass('btn-success')
    $("#toggleMaxBuy").addClass("btn-success")

    for (i=0;i<player.workers.length;i++){
        $(workerBtnIDs[i]).attr('onclick', 'hireMax('+i+')');
    }
    for (var i = 0; i < player.workers.length; i += 1){
        $(workerBadgeIDs[i]).text(maxHireCalc(i));
    }

}

function karmaDeduct(price){

	player.karma -= price;

    $("#karma").text(comma(player.karma));

    karmaMultTemp = Math.max(Math.floor(Math.pow(2,(Math.log(player.karma)/Math.log(10)))).toFixed(0),1);

    player.karmaMult = karmaMultTemp;

    $("#karmaMult").text(player.karmaMult);

    player.workerProds[0] = defaultProds[0] * player.karmaMult;
    $(workerProdIDs[0]).text(comma(player.workerProds[0].toFixed(1)));

    for (i=1;i<(player.workers.length+1);i+=1) {
        player.workerProds[i] = defaultProds[i] * player.karmaMult;
        $(workerProdIDs[i]).text(comma(player.workerProds[i]));
    }

}