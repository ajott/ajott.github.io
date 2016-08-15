var lastSaveText = "Last Save: "


function exportSave() {
	//$('#dollars').val(100);
	$('#exportText').val(window.btoa(JSON.stringify(player)));
	$('#exportText').select();
	//document.getElementById('importText').value = window.atob(window.btoa(JSON.stringify(player)));
}

function importSave() {
	importString = window.atob(document.getElementById('importText').value);
	player = JSON.parse(importString);
}

function saveToLocal() {
	localStorage.setItem("playerStored", JSON.stringify(player));
	var d = new Date();
	$('#lastSave').text(lastSaveText + d.toLocaleTimeString());	
}

function loadFromLocal() {
	player = JSON.parse(localStorage.getItem("playerStored"));
}

function clearSave() {
	localStorage.removeItem("playerStored");
}

function hardReset() {
	r=confirm('This will delete local save data and refresh the page.\nYou will lose everything.\nContinue?');
	if (r==true){
		localStorage.removeItem("playerStored");
		location.reload();
	}
	else {};
}

function verifyValues() {
	updateMPS();
	for (i=0;i<(player.workers.length);i++){
            $(workerIDs[i]).text(player.workers[i]);
    };

    for (i=0;i<(player.workers.length);i++){
            $(workerCostIDs[i]).text(comma(player.costs[i]));
    };
	
	for (i=0;i<(player.workers.length);i++){
            $(workerProdIDs[i]).text(comma(player.workerProds[i]));
    };

    intRateString = (player.interestRate*100).toFixed(1).toString();

    
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