window.setInterval(function(){


    getMoney(workers[1]);
    getMoney(workers[2]*8);
	getMoney(workers[3]*47);
  
	
}, 1000);

window.setInterval(function(){
    
    investInterest();
    updateMPS();
    getMoney(workers[0]);
    checkTotalInterest();
    
}, 10000);