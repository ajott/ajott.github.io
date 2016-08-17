var lastSaveText = "Last Save: "


function exportSave() {
	$('#exportText').val(window.btoa(JSON.stringify(player)));
	$('#exportText').select();
}	

function importSave() {
	var importString = window.atob($('#importText').val());

	player = JSON.parse(importString);
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

	$('#lastSave').text(numMissedTicks.toString());

	
	tickMakeupFunction(numMissedTicks);

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
	
	$(workerProdIDs[0]).text(comma(player.workerProds[0] * player.workerMults[0]).toFixed(1));
	
	for (i=1;i<(player.workers.length);i++){
            $(workerProdIDs[i]).text(comma(player.workerProds[i] * player.workerMults[i]));
    };

    intRateString = (player.interestRate*100).toFixed(1).toString();

    validateButtons();
    
    $('#dollars').text(comma(player.dollars));
    $('#inBank').text(comma(player.inBank));
    $('#intRate').text(intRateString + "%");
    $('#intPer10').text(comma((Number(player.inBank)*player.interestRate).toFixed(0)));
    $('#karma').text(comma(player.karma));
    $('#karmaMult').text(player.karmaMult);
   	$('#clickPower').text(player.clickPower * player.karmaMult);
   	$('#powerCost').text(comma(player.powerCost));
    $('#tickTime').text(player.tickLength.toFixed(0))
    $('#tickCost').text(comma(player.tickCost));
	

}

// mystring.replace(/\./g,'')
