window.setInterval(function(){

    for (i=1;i<(player.workers.length);i++){
        getMoney(player.workers[i]*player.workerProds[i]*player.workerMults[i]);
    }

    checkInterest();

	checkLabor(player.workers[0]);
    updateMPS();    
    //bankBarUpdate();  
	
}, player.tickLength);

window.setInterval(function(){
    
    //investInterest();

    checkTotalInterest();
    
}, 10 * player.tickLength);

window.setInterval(function(){
    saveToLocal();
}, 30000);