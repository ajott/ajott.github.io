tickOneTimer = window.setInterval(function(){

    tickOneFunction();
    //bankBarUpdate();  
	
}, player.tickLength);


function tickOneFunction() {
    for (i=1;i<(player.workers.length);i++){
        getMoney(player.workers[i]*player.workerProds[i]*player.workerMults[i]);
    }

    checkInterest();

    validateButtons();

    checkLabor(player.workers[0]);
    updateMPS();  
}



window.setInterval(function(){
    saveToLocal();
}, 30000);

function resetIntervals(tick){
    clearInterval(tickOneTimer);
    tickOneTimer = setInterval(function(){tickOneFunction();},tick);
}