var defaultPlayer = {
	money: 3,
	buildings: {
		0: 		1,	// wheat
		1: 		0,	// ranch 
		2: 		0,	// forest
		3: 		0,	// mine
		4:		0,	// orchard
		10: 	1,	// bakery
		11: 	0,	// store
		12: 	0, 	// cheese
		13: 	0,	// furniture
		14: 	0,	// market
		20: 	0, 	// cafe
		21: 	0,	// restaurant
		30: 	0, 	// stadium
		31: 	0, 	// tvStation
		32: 	0, 	// business
		50: 	0, 	// train
		51: 	0, 	//mall
		52: 	0, 	//park
		53: 	0  	//radio
	}
}

var deck = {
	0: 		6,	// wheat
	1: 		6,	// ranch 
	2: 		6,	// forest
	3: 		6,	// mine
	4:		6,	// orchard
	10: 	6,	// bakery
	11: 	6,	// store
	12: 	6, 	// cheese
	13: 	6,	// furniture
	14: 	6,	// market
	20: 	6, 	// cafe
	21: 	6,	// restaurant
	30: 	4, 	// stadium
	31: 	4, 	// tvStation
	32: 	4, 	// business
}


function rollOne(){
	"use strict"
  	//var x = Math.max(1,Math.floor(Math.random()*7));
  	var x = (1+ Math.floor(Math.random()*6));
	return x;
}

function rollTwo(){
	x = [rollOne(), rollOne()];
	x[2] = x[0]+x[1];
	return x;
}


var buildCosts = {
	0: 		1,	// wheat
	1: 		1,	// ranch 
	2: 		3,	// forest
	3: 		6,	// mine
	4:		3,	// orchard
	10: 	1,	// bakery
	11: 	2,	// store
	12: 	5, 	// cheese
	13: 	3,	// furniture
	14: 	2,	// market
	20: 	2, 	// cafe
	21: 	3,	// restaurant
	30: 	6, 	// stadium
	31: 	7, 	// tvStation
	32: 	8, 	// business
	50: 	4, 	// train
	51: 	10, //mall
	52: 	16, //park
	53: 	22  //radio
}

var buildNames = {
	0: 		"wheat",
	1: 		"ranch",
	2: 		"forest",	
	3: 		"mine",
	4:		"orchard",	
	10: 	"bakery",	
	11: 	"store",	
	12: 	"cheese", 	
	13: 	"furniture",	
	14: 	"market",	
	20: 	"cafe", 	
	21: 	"restaurant",	
	30: 	"stadium", 	
	31: 	"tvStation", 
	32: 	"business", 
	50: 	"train", 	
	51: 	"mall",
	52: 	"park", 
	53: 	"radio"  
}


var playerObject = [];
numPlayers = 0;

function setupGame(players){
	for (var i = 0; i < players; i ++){
		playerObject[i+1] = JSON.parse(JSON.stringify(defaultPlayer));
		numPlayers += 1;
	}
}

function buildingActivate(playerNum,dieRoll){
	switch (dieRoll){
		case 1:
			for (p = 1; p <= numPlayers; p++){
				playerObject[p]["money"] += playerObject[p]["buildings"][0];
			}
			break;
		case 2:
			for (p = 1; p < numPlayers; p++){
				playerObject[p]["money"] += playerObject[p]["buildings"][1];
			}
			playerObject[playerNum]["money"] += playerObject[playerNum]["buildings"][10] * (1 + playerObject[playerNum]["buildings"][51]);
			break;
		case 3:
			break;
		case 4:
			playerObject[playerNum]["money"] += playerObject[playerNum]["buildings"][11] * (3 + playerObject[playerNum]["buildings"][51]);
			break;
		default:
			break;

	}
}

function buyBuilding(playerNum, buildingNum){
	if (buildingNum < 30){
		if (playerObject[playerNum]["money"] >= buildCosts[buildingNum] && deck[buildingNum] > 0){
			playerObject[playerNum]["money"] -= buildCosts[buildingNum];
			playerObject[playerNum]["buildings"][buildingNum] += 1;
			deck[buildingNum] -= 1;
		}
	} else if (buildingNum < 50){
		if (playerObject[playerNum]["money"] >= buildCosts[buildingNum] && playerObject[playerNum]["buildings"][buildingNum] < 1){
			playerObject[playerNum]["money"] -= buildCosts[buildingNum];
			playerObject[playerNum]["buildings"][buildingNum] += 1;			
			deck[buildingNum] -= 1;
		}
	} else if (buildingNum > 49 && buildingNum < 60){
		if (playerObject[playerNum]["money"] >= buildCosts[buildingNum] && playerObject[buildingNum][buildingNum] < 1){
			playerObject[playerNum]["money"] -= buildCosts[buildingNum];
			playerObject[playerNum]["buildings"][buildingNum] += 1;	
		}
	}

}

function victoryCheck(playerNum){
	if (playerObject[playerNum]["buildings"][50] == 1 && playerObject[playerNum]["buildings"][51] == 1 && playerObject[playerNum]["buildings"][52] == 1 && playerObject[playerNum]["buildings"][53] == 1){
		alert("Player " + playerNum + " wins!");
	}
}


function rollTest(n){
	counts = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	counter = 0;

	while (counter < n){
		x = rollTwo()
		counts[x[2]] += 1;
		counter += 1;
	}

	return(counts)
}