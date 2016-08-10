


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
	document.getElementById('lastSave').innerHTML = d.toLocaleTimeString();	
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