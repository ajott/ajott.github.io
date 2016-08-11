var lastSaveText = "Last Save: "


function exportSave() {
	//$('#dollars').val(100);
	document.getElementById('exportText').value = window.btoa(JSON.stringify(player));
	document.getElementById('exportText').select();
	//document.getElementById('importText').value = window.atob(window.btoa(JSON.stringify(player)));
}

function importSave() {
	importString = window.atob(document.getElementById('importText').value);
	player = JSON.parse(importString);
}

function saveToLocal() {
	localStorage.setItem("playerStored", JSON.stringify(player));
	var d = new Date();
	document.getElementById('lastSave').innerHTML = lastSaveText + d.toLocaleTimeString();	
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
	for (i=0; i<6; i++){
            document.getElementById(workerIDs[i]).innerHTML = player.workers[i];
    };

    for (i=0; i<6; i++){
            document.getElementById(workerCostIDs[i]).innerHTML = Math.floor(player.costs[index] * Math.pow(1.15,player.workers[index]));
    }

    document.getElementById('clickPower').innerHTML = player.clickPower * player.karmaMult;
    document.getElementById('tickTime').innerHTML = player.tickLength.toFixed(0);

}