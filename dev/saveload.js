


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
}

function loadFromLocal() {
	player = JSON.parse(localStorage.getItem("playerStored"));
}