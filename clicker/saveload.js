var workerInfo = [workers,costs,workerProds]

var exportString = [dollars,clickPower,powerCost,workers,costs,workerProds,inbank,interestRate,totalInterest,increase50K,totalDonated,karma,karmaMult,];




function exportSave() {
	document.getElementById("exportText").style.visibility = "visible";
	document.getElementByID("exportText").value = workerInfo;
}