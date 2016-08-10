var workers = [0, 0, 0, 0, 0, 0];
var costs = [15,100,1100,12000,130000,1400000];
var workerProds = [0.1,1,8,47,260,1400];
var defaultProds = [0.1,1,8,47,260,1400]

var workerIDs = ['laborers','techs','clerks','engineers','managers','directors'];
var workerCostIDs = ['laborerCost','techCost','clerkCost','engCost','managerCost','directorCost'];
var workerProdIDs = ['laborProd','techProd','clerkProd','engProd','managerProd','directorProd'];



function hire(index) {
    var workerCost = Math.floor(costs[index] * Math.pow(1.15,workers[index]));
    if(dollars >= workerCost) {
        workers[index] = workers[index] + 1
        dollars = dollars - workerCost

        document.getElementById(workerIDs[index]).innerHTML = workers[index];
        document.getElementById('dollars').innerHTML = comma(dollars);

        updateMPS();
    }
    var nextCost = Math.floor(costs[index] * Math.pow(1.15,workers[index]));
    document.getElementById(workerCostIDs[index]).innerHTML = comma(nextCost);
}



var laborerQueue = 0;
function checkLabor(number){
    laborerQueue = laborerQueue + workerProds[0]*number;

    if (Math.floor(laborerQueue) >= 1){
        sendMoney = Math.floor(laborerQueue);
        laborerQueue = laborerQueue - sendMoney;
        getMoney(sendMoney);
    }
}

