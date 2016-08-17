
var defaultProds = [0.1,1,8,47,260,1400,16000,44000]
var defaultCosts = [15,100,1100,12000,130000,1400000,15000000,99000000]
var multValues = [2,3,3,5,5,10,25];
var multCounts = [10,25,50,100,200,500];

var workerIDs = ['#laborers','#techs','#clerks','#engineers','#managers','#directors','#vps','#pres'];
var workerCostIDs = ['#laborerCost','#techCost','#clerkCost','#engCost','#managerCost','#directorCost','#vpCost','#presCost'];
var workerProdIDs = ['#laborProd','#techProd','#clerkProd','#engProd','#managerProd','#directorProd','#vpProd','#presProd'];
var workerBtnIDs = ['#hire0','#hire1','#hire2','#hire3','#hire4','#hire5','#hire6','#hire7'];



function hire(index) {
    var workerCost = player.costs[index];
    if(player.dollars >= workerCost) {
        player.workers[index] = player.workers[index] + 1
        player.dollars = player.dollars - workerCost

        $(workerIDs[index]).text(player.workers[index]);
        $('#dollars').text(comma(player.dollars));

        updateMPS();
        player.costs[index] = Math.floor(defaultCosts[index] * Math.pow(1.15,player.workers[index]));
        $(workerCostIDs[index]).text(comma(player.costs[index]))

        for (i=0;i<multValues.length;i++){
            if(player.workers[index] == multCounts[i]){
                player.workerMults[index] = player.workerMults[index] * multValues[i];
            }
        }

        if (index == 0){
            $(workerProdIDs[index]).text((player.workerProds[index]*player.workerMults[index]).toFixed(1));
        }
        else {
            $(workerProdIDs[index]).text(comma(Math.floor(player.workerProds[index]*player.workerMults[index])));
        }
    validateButtons();
    }
    
}


var laborerQueue = 0;
function checkLabor(number){
    laborerQueue = laborerQueue + player.workerProds[0]*number*player.workerMults[0];

    if (Math.floor(laborerQueue) >= 1){
        sendMoney = Math.floor(laborerQueue);
        laborerQueue = laborerQueue - sendMoney;
        getMoney(sendMoney);
    }
}

