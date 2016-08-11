window.setInterval(function(){


    getMoney(player.workers[1]);
    getMoney(player.workers[2]*8);
	getMoney(player.workers[3]*47);
	getMoney(player.workers[4]*260);
    getMoney(player.workers[5]*1400);

	checkLabor(player.workers[0]);
  
	
}, player.tickLength);

window.setInterval(function(){
    
    investInterest();
    updateMPS();
    // getMoney(workers[0]);
    checkTotalInterest();
    
}, 10 * player.tickLength);

window.setInterval(function(){
    bankBarUpdate();
}, (player.tickLength/10))

window.setInterval(function(){
    saveToLocal();
}, 30000);