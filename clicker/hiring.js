// var workers = [0, 0, 0, 0, 0, 0];
// var costs = [15,100,1100,12000,130000,1400000];
// var workerProds = [0.1,1,8,47,260,1400];

var defaultProds = [0.1,1,8,47,260,1400]

var workerIDs = ['laborers','techs','clerks','engineers','managers','directors'];
var workerCostIDs = ['laborerCost','techCost','clerkCost','engCost','managerCost','directorCost'];
var workerProdIDs = ['laborProd','techProd','clerkProd','engProd','managerProd','directorProd'];



function hire(index) {
    var workerCost = Math.floor(player.costs[index] * Math.pow(1.15,player.workers[index]));
    if(player.dollars >= workerCost) {
        player.workers[index] = player.workers[index] + 1
        player.dollars = player.dollars - workerCost

        document.getElementById(workerIDs[index]).innerHTML = player.workers[index];
        document.getElementById('dollars').innerHTML = comma(player.dollars);

        updateMPS();
    }
    var nextCost = Math.floor(player.costs[index] * Math.pow(1.15,player.workers[index]));
    document.getElementById(workerCostIDs[index]).innerHTML = comma(nextCost);
}



var laborerQueue = 0;
function checkLabor(number){
    laborerQueue = laborerQueue + player.workerProds[0]*number;

    if (Math.floor(laborerQueue) >= 1){
        sendMoney = Math.floor(laborerQueue);
        laborerQueue = laborerQueue - sendMoney;
        getMoney(sendMoney);
    }
}

