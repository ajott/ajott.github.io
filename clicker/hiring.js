
var workers = [0, 0, 0, 0,0];
var costs = [15,100,1100,12000,130000];
var workerProds = [0.1,1,8,47,260];

var workerIDs = ['laborers','techs','clerks','engineers','managers'];
var workerCostIDs = ['laborerCost','techCost','clerkCost','engCost','managerCost'];
var workerProdIDs = ['laborProd','techProd','clerkProd','engProd','managerProd'];



function hire(index) {
    var workerCost = Math.floor(costs[index] * Math.pow(1.15,workers[index]));
    if(dollars >= workerCost) {
        workers[index] = workers[index] + 1
        dollars = dollars - workerCost

        document.getElementById(workerIDs[index]).innerHTML = workers[index];
        document.getElementById('dollars').innerHTML = dollars;

        updateMPS();
    }
    var nextCost = Math.floor(costs[index] * Math.pow(1.15,workers[index]));
    document.getElementById(workerCostIDs[index]).innerHTML = nextCost;
}

