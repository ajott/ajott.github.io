var lastSaveText = "Last Save: "


function exportSave() {
	$('#exportText').val(window.btoa(JSON.stringify(player)));
	$('#exportText').select();
}	

function importSave() {
	var date = new Date();
	var importString = window.atob($('#importText').val());
	var currTickTime = date.getTime();

	player = JSON.parse(importString);

	var tickDifference = currTickTime - player.lastTickTime;
	var numMissedTicks = (tickDifference / player.tickLength).toFixed(0);

	$('#lastSave').text("Missed ticks: " + numMissedTicks.toString());

	
	tickMakeupFunction(numMissedTicks);
	
	verifyValues()
}

function saveToLocal() {
	localStorage.setItem("playerStored", JSON.stringify(player));
	var d = new Date();
	$('#lastSave').text(lastSaveText + d.toLocaleTimeString());	
}

function loadFromLocal() {
	var date = new Date();
    var currTickTime = date.getTime();

	player = JSON.parse(localStorage.getItem("playerStored"));

	var tickDifference = currTickTime - player.lastTickTime;
	var numMissedTicks = (tickDifference / player.tickLength).toFixed(0);

	$('#lastSave').text("Missed ticks: " + numMissedTicks.toString());

	
	tickMakeupFunction(numMissedTicks);

	verifyValues();

}

function clearSave() {
	localStorage.removeItem("playerStored");
}

function hardReset() {
	
	localStorage.removeItem("playerStored");
	location.reload();
	
}

function verifyValues() {
	
	updateMPS();
	for (i=0;i<(player.workers.length);i++){
            $(workerIDs[i]).text(player.workers[i]);
    };

    for (i=0;i<(player.workers.length);i++){
            $(workerCostIDs[i]).text(comma(player.costs[i]));
    };
	

    $(workerProdIDs[0]).text((player.workerProds[0] * player.workerMults[0]).toFixed(1));
	

	for (i=0;i<(player.workers.length);i++){
            $(workerProdIDs[i]).text(comma(player.workerProds[i] * player.workerMults[i]));

            if (player.workers[i] > 0){
            	unfold(i);
            }
    };

    intRateString = (player.interestRate*100).toFixed(1).toString();

    validateButtons();
    
    $('#dollars').text(comma(player.dollars));
    $('#inBank').text(comma(player.inBank));
    $('#intRate').text(intRateString + "%");
    $('#intPer10').text(comma(Math.floor(Number(player.inBank)*player.interestRate)));
    $('#karma').text(comma(Math.floor(parseFloat(player.karma)).toString()));
    $('#karmaOnUpgrades').text(comma(Math.floor(parseFloat(player.karma)).toString()));
    $('#karmaMult').text(player.karmaMult);
   	$('#clickPower').text(player.clickPower * player.karmaMult);
   	$('#powerCost').text(comma(player.powerCost));
    $('#tickTime').text(player.tickLength.toFixed(0))
    $('#tickCost').text(comma(player.tickCost));
    $('#totalDonated').text(comma(Math.floor(player.totalDonated)));

    resetIntervals(player.tickLength);

    if (player.buyMax){
    	$('#maxBuyCont').show()
    }
	
    $('#verName').text(version)
    $('#clickUpgradeCost').text(Math.floor(5 * Math.pow(2,player.clickUpgrades)))

	prodPercents();

}

