var defaultProds = [0.1, 1, 8, 47, 260, 1400, 16000, 44000];
var defaultCosts = [15, 100, 1100, 12000, 130000, 1400000, 15000000, 99000000];
var multValues = [2, 3, 3, 5, 5, 10, 25];
var multCounts = [10, 25, 50, 100, 200, 500];

var costCheckOb = {
  laborers: [],
  techs: [],
  clerks: [],
  engineers: [],
  managers: [],
  directors: [],
  vps: [],
  pres: []
};

function buildCosts() {
  for (i = 0; i < 8; i += 1) {
    for (j = 0; j < 200; j += 1) {
      costCheckOb[workerObNames[i]][j] = Math.floor(defaultCosts[i] * Math.pow(1.15, j));
    }
  }
}



var workerObNames = ['laborers', 'techs', 'clerks', 'engineers', 'managers', 'directors', 'vps', 'pres'];
var workerIDs = ['#laborers', '#techs', '#clerks', '#engineers', '#managers', '#directors', '#vps', '#pres'];
var workerCostIDs = ['#laborerCost', '#techCost', '#clerkCost', '#engCost', '#managerCost', '#directorCost', '#vpCost', '#presCost'];
var workerProdIDs = ['#laborProd', '#techProd', '#clerkProd', '#engProd', '#managerProd', '#directorProd', '#vpProd', '#presProd'];
var workerBtnIDs = ['#hire0', '#hire1', '#hire2', '#hire3', '#hire4', '#hire5', '#hire6', '#hire7'];
var workerRowIDs = ['#laborRow', '#techRow', '#clerkRow', '#engRow', '#managerRow', '#directorRow', '#vpRow', '#presRow'];
var workerBadgeIDs = ['#laborBadge', '#techBadge', '#clerkBadge', '#engBadge', '#managerBadge', '#directorBadge', '#vpBadge', '#presBadge'];


function hire(index) {
  var workerCost = player.costs[index];
  if (player.dollars >= workerCost) {
    player.workers[index] = player.workers[index] + 1;
    player.dollars = player.dollars - workerCost;

    $(workerIDs[index]).text(player.workers[index]);
    $('#dollars').text(comma(player.dollars));

    updateMPS();
    player.costs[index] = Math.floor(defaultCosts[index] * Math.pow(1.15, player.workers[index]));
    $(workerCostIDs[index]).text(comma(player.costs[index]));

    for (i = 0; i < multValues.length; i++) {
      if (player.workers[index] == multCounts[i]) {
        player.workerMults[index] = player.workerMults[index] * multValues[i];
      }
    }

    if (index == 0) {
      $(workerProdIDs[index]).text(comma((player.workerProds[index] * player.workerMults[index]).toFixed(1)));
    } else {
      $(workerProdIDs[index]).text(comma(Math.floor(player.workerProds[index] * player.workerMults[index])));
    }
    unfold(index);
    prodPercents();
    validateButtons();
  }

}

function hireX(n, index) {
  var max = maxHireCalc(index);
  if (max >= n) {
    for (var i = 0; i < n; i += 1) {
      hire(index);
    }
  }
}

function hireMax(index) {
  var max = maxHireCalc(index);
  for (var i = 0; i < max; i += 1) {
    hire(index);
  }
}

var buyNum = 1;

function setBuyNum(n) {
  for (i = 0; i < player.workers.length; i++) {
    $(workerBtnIDs[i]).attr('onclick', 'hireX(' + n + ',' + i + ')');
  }

  if (n == 1) {
    $('#buy1Button').addClass('btn-success');
    $('#buy5Button').removeClass('btn-success');
    $('#buy10Button').removeClass('btn-success');
    $("#toggleMaxBuy").removeClass("btn-success");
    maxBuyOn = false;
    buyNum = 1;
  } else if (n == 5) {
    $('#buy1Button').removeClass('btn-success');
    $('#buy5Button').addClass('btn-success');
    $('#buy10Button').removeClass('btn-success');
    $("#toggleMaxBuy").removeClass("btn-success");
    maxBuyOn = false;
    buyNum = 5;
  } else if (n == 10) {
    $('#buy1Button').removeClass('btn-success');
    $('#buy5Button').removeClass('btn-success');
    $('#buy10Button').addClass('btn-success');
    $("#toggleMaxBuy").removeClass("btn-success");
    maxBuyOn = false;
    buyNum = 10;
  }
  validateButtons();
}


var laborerQueue = 0;

function checkLabor(number) {
  laborerQueue = laborerQueue + player.workerProds[0] * number * player.workerMults[0];

  if (Math.floor(laborerQueue) >= 1) {
    sendMoney = Math.floor(laborerQueue);
    laborerQueue = laborerQueue - sendMoney;
    getMoney(sendMoney);
  }
}
