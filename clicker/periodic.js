tickOneTimer = window.setInterval(function(){

    tickOneFunction();
    bankBarUpdate();  
	
}, player.tickLength);


function tickOneFunction() {
    for (i=1;i<(player.workers.length);i++){
        getMoney(player.workers[i]*player.workerProds[i]*player.workerMults[i]);
    }

    checkInterest();

    validateButtons();
    playerStats();

    var date = new Date();
    var lastTickTime = date.getTime();

    player.lastTickTime = lastTickTime;

    checkLabor(player.workers[0]);
    updateMPS();  
}

function tickMakeupFunction(numTicks) {
    for (i=1;i<(player.workers.length);i++){
        getMoney(player.workers[i]*player.workerProds[i]*player.workerMults[i]*numTicks);
    }

    for (i=0;i<numTicks;i++){
        checkInterest();
        checkLabor(player.workers[0]);
    }   
    

    validateButtons();
    updateMPS(); 
    
    
}



window.setInterval(function(){
    saveToLocal();
}, 30000);

function resetIntervals(tick){
    clearInterval(tickOneTimer);
    tickOneTimer = setInterval(function(){tickOneFunction();},tick);
}