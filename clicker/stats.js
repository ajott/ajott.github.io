var percents = [];
var mpsIDs = ['#laborMPS','#techMPS','#clerkMPS','#engMPS','#managerMPS','#directorMPS','#vpMPS','#presMPS']; 
var percentIDs = ['#laborPct','#techPct','#clerkPct','#engPct','#managerPct','#directorPct','#vpPct','#presPct'];

function prodPercents() {
	for (var i = 0; i < player.workers.length; i+=1){
		percents[i] = (player.workers[i] * player.workerProds[i]*player.workerMults[i]) / MPS;
		var pctString = ((percents[i].toFixed(2)*100).toFixed(0)).toString();
		if (i == 0){
			$(mpsIDs[i]).text(comma((player.workers[i] * player.workerProds[i]*player.workerMults[i]).toFixed(1)))
		} else {
			$(mpsIDs[i]).text(comma((player.workers[i] * player.workerProds[i]*player.workerMults[i]).toFixed(0)))
		}
		$(percentIDs[i]).text(pctString + "%");
	}
}

function playerStats() {
	$('#resetSpan').text(comma(player.resets));
	$('#monkeySpan').text(comma(player.monkeyClicks-1));
	$('#clickNoSpan').text(comma(player.clicks));
	$('#totalDollarSpan').text(comma(player.totalDollars));
}