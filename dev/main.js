window.addEventListener ? 
window.addEventListener("load",setupGame,false) : 
window.attachEvent && window.attachEvent("onload",setupGame);

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

var buildIDs = ["#build0","#build1","#build2","#build3","#build4","#build10","#build11","#build12","#build13","#build14","#build20","#build21","#build30","#build31","#build32","#build50","#build51","#build52","#build53"]
var deckIDs = ["#deck0","#deck1","#deck2","#deck3","#deck4","#deck10","#deck11","#deck12","#deck13","#deck14","#deck20","#deck21","#deck30","#deck31","#deck32","#deck50","#deck51","#deck52","#deck53"]
var buildNumbers = [0,1,2,3,4,10,11,12,13,14,20,21,30,31,32,50,51,52,53];

var doubles = 0;
var phase = 0; // 0: Roll  1: Build

var currentPlayer = 1;

var playerObject = [];
var numPlayers = 0;

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

var activations = {
	1: 	[0],
	2:  [1,10],
	3: 	[20],
	4: 	[11],
	5: 	[2],
	6: 	[30,31,32],
	7: 	[12],
	8: 	[13],
	9: 	[3,21],
	10: [4,21],
	11: [14],
	12: [14],
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

var titles = ["Wheat fields give you $1 when a [1] is rolled on anyone's turn.","Ranches give you $1 when a [2] is rolled on anyone's turn.","Forests give you $1 when a [5] is rolled on anyone's turn.","Mines give you $5 when a [9] is rolled on anyone's turn.", "Orchards give you $3 when a [10] is rolled on anyone's turn.","Bakeries give you $1 when a [2] or [3] is rolled on your turn only.","Convenience stores give you $3 when a [4] is rolled on your turn only.","Cheese factories give you $3 per Ranch owned when a [7] is rolled on your turn only.","Furniture factories give you $3 for each Forest and Mine owned when an [8] is rolled on your turn only.","Markets give $3 per Wheat Field and Orchard when an [11] or [12] is rolled on your turn only.","A cafe will take $1 from the active player if they roll a [3] on their turn.","A Restaurant will take $2 from the active player if they roll a [9] or [10] on their turn.", "A Stadium will take $2 from the other player when a [6] is rolled on your turn only. You may only own one.","A TV Station will take $5 from the other player when a [6] is rolled on your turn only. You may only own one.","A Business Center will do nothing and take your money. Consider it a failed startup.","A Train Station will allow you to roll either 1 or 2 dice.","A Mall will increase the income of all your Bakeries, Convenience Stores, Cafes, and Restaurants by $1.","A Park will allow you to take another turn immediately after this one, if you roll doubles.","A radio tower will do nothing for you currently, but is required to win."]

// Simple functions
function dieFunction(){
	"use strict"
  	var x = (1+ Math.floor(Math.random()*6));
	return x;
}

function rollOne(){
	x = dieFunction()
	diceAnimate(x);
	phase = 1;
	return x;
}

function rollTwo(){
	x = [dieFunction(), dieFunction()];
	x[2] = x[0]+x[1];
	diceAnimate(x[0],x[1])
	if (x[0] == x[1]){
		doubles = 1;
	} else {
		doubles = 0;
	}
	phase = 1;
	return x;
}

function setupGame(){
	for (var i = 0; i < 2; i ++){
		playerObject[i+1] = JSON.parse(JSON.stringify(defaultPlayer));
		numPlayers += 1;
	}
	for (i = 0; i < buildIDs.length; i++){
		$(buildIDs[i]).attr("title",titles[i])
	}
	validate();
}

function rollPhase(playerNum,n){
	if (n == 1){
		$('#roll1').prop("disabled",true)
		$('#roll2').prop("disabled",true)
		x = rollOne();
		buildingActivate(playerNum,x);
	} else {
		$('#roll1').prop("disabled",true)
		$('#roll2').prop("disabled",true)
		x = rollTwo();
		buildingActivate(playerNum,x[2])
	}
	phase = 1;
}

function victoryCheck(playerNum){
	var resetBool = false;
	if (playerObject[playerNum]["buildings"][50] == 1 && playerObject[playerNum]["buildings"][51] == 1 && playerObject[playerNum]["buildings"][52] == 1 && playerObject[playerNum]["buildings"][53] == 1){
		resetBool = confirm("Player " + playerNum + " wins!");
	}
	if (resetBool){
		location.reload(true)
	}
}

// Complex functions

function buildingActivate(playerNum,dieRoll){
	switch (dieRoll){
		case 1:
			// Wheat Field
			for (p = 1; p <= numPlayers; p++){
				playerObject[p]["money"] += playerObject[p]["buildings"][0];
			}
			break;

		case 2:
			// Ranch
			for (p = 1; p <= numPlayers; p++){
				playerObject[p]["money"] += playerObject[p]["buildings"][1];
			}

			// Bakery
			playerObject[playerNum]["money"] += playerObject[playerNum]["buildings"][10] * (1 + playerObject[playerNum]["buildings"][51]);
			break;

		case 3:
			// Cafe
			for (p = 1; p <= numPlayers; p++){
				if (p != playerNum){
					var temp = playerObject[playerNum]["money"]
					playerObject[playerNum]["money"] = Math.max(playerObject[playerNum]["money"] - (playerObject[p]["buildings"][20] * (1 + playerObject[playerNum]["buildings"][51])), 0)
					playerObject[p]["money"] += temp - playerObject[playerNum]["money"]
				}
			}

			// Bakery
			playerObject[playerNum]["money"] += playerObject[playerNum]["buildings"][10] * (1 + playerObject[playerNum]["buildings"][51]);
			break;

		case 4:
			// Convenience Store
			playerObject[playerNum]["money"] += playerObject[playerNum]["buildings"][11] * (3 + playerObject[playerNum]["buildings"][51]);
			break;

		case 5:
			// Forest
			for (p = 1; p <= numPlayers; p++){
				playerObject[p]["money"] += (1 * playerObject[p]["buildings"][2]);
			}
			break;

		case 6:
			// Stadium
			for (p = 1; p <= numPlayers; p++){
				if (p != playerNum && playerObject[playerNum]["buildings"][30] > 0){
					var temp = playerObject[p]["money"]
					playerObject[p]["money"] = Math.max(playerObject[p]["money"] - 2, 0)
					playerObject[playerNum]["money"] += temp - playerObject[playerNum]["money"]
				}
			}

			// TV Station
			for (p = 1; p <= numPlayers; p++){
				if (p != playerNum && (playerObject[p]["money"] >= 5 && playerObject[playerNum]["buildings"][31] > 0)){
					playerObject[p]["money"] -= 5;
					playerObject[playerNum]["money"] += 5;
				}
			}

			// Business Center
			// NO IMPLEMENTATION CURRENTLY			
			break;

		case 7:
			// Cheese Factory
			playerObject[playerNum]["money"] += playerObject[playerNum]["buildings"][12] * (3 * playerObject[playerNum]["buildings"][1]);
			break;

		case 8:
			// Furniture Factory
			playerObject[playerNum]["money"] += playerObject[playerNum]["buildings"][13] * (3 * (playerObject[playerNum]["buildings"][2] + playerObject[playerNum]["buildings"][3]));
			break;

		case 9:
			// Family Restaurant
			for (p = 1; p <= numPlayers; p++){
				if (p != playerNum){
					var temp = playerObject[playerNum]["money"]
					playerObject[playerNum]["money"] = Math.max(playerObject[playerNum]["money"] - (playerObject[p]["buildings"][21] * (2 + playerObject[playerNum]["buildings"][51])), 0)
					playerObject[p]["money"] += temp - playerObject[playerNum]["money"]
				}
			}

			// Mine
			for (p = 1; p <= numPlayers; p++){
				playerObject[p]["money"] += (5 * playerObject[p]["buildings"][3]);
			}
			break;

		case 10:
			// Family Restaurant
			for (p = 1; p <= numPlayers; p++){
				if (p != playerNum){
					var temp = playerObject[playerNum]["money"]
					playerObject[playerNum]["money"] = Math.max(playerObject[playerNum]["money"] - (playerObject[p]["buildings"][21] * (2 + playerObject[playerNum]["buildings"][51])), 0)
					playerObject[p]["money"] += temp - playerObject[playerNum]["money"]
				}
			}

			// Orchard
			for (p = 1; p <= numPlayers; p++){
				playerObject[p]["money"] += (3 * playerObject[p]["buildings"][4]);
			}
			break;

		case 11:
			// Fruit and Veg Market
			playerObject[playerNum]["money"] += playerObject[playerNum]["buildings"][14] * (2 * (playerObject[playerNum]["buildings"][0] + playerObject[playerNum]["buildings"][4]));
			break;

		case 12:
			// Fruit and Veg Market
			playerObject[playerNum]["money"] += playerObject[playerNum]["buildings"][14] * (2 * (playerObject[playerNum]["buildings"][0] + playerObject[playerNum]["buildings"][4]));
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
		if (playerObject[playerNum]["money"] >= buildCosts[buildingNum] && playerObject[playerNum]["buildings"][buildingNum] < 1){
			playerObject[playerNum]["money"] -= buildCosts[buildingNum];
			playerObject[playerNum]["buildings"][buildingNum] += 1;	
			victoryCheck(playerNum);
		}
	}
	phase = 3;
	validate();

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

function advanceTurn(){
	if (doubles == 1 && playerObject[currentPlayer]["buildings"][52] == 1){
		doubles = 0;
	}
	else {
		if (currentPlayer < numPlayers){
			currentPlayer += 1;
		} else {
			currentPlayer = 1;
		}
	}
	phase = 0;
	validate();
}

function getPlayerDecks(){
	var tbody = document.getElementById('playerDeck');
	tbody.innerHTML = "";
	var tr = "<tr>"
	tr += "<td>" + "Player 1 Deck" + "</td>" + "<td></td>" + "<td></td>" + "<td>" + "Player 2 Deck" + "</td></tr>"
	tbody.innerHTML += tr;
	for (var key in buildNames) {
		var tr = "<tr>";
		tr += "<td>" + buildNames[key] + "</td>" + "<td>" + playerObject[1]["buildings"][key] + "</td>" + "<td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>" + "<td>" + buildNames[key] + "</td>" + "<td>" + playerObject[2]["buildings"][key] + "</td></tr>";
		tbody.innerHTML += tr;
	}
}


function validate(){
	$('#currPlayer').text(currentPlayer);
	$('#player1Money').text("$" + playerObject[1]['money']);
	$('#player2Money').text("$" + playerObject[2]['money']);
	
	if (playerObject[currentPlayer]["buildings"][50] > 0){
		$('#dieG').show();
		$('#roll2').show();
	} else {
		$('#dieG').hide();
		$('#roll2').hide();
	}

	getPlayerDecks();

	if (phase == 1){
		$('#roll1').prop("disabled",true)
		$('#roll2').prop("disabled",true)
		$('#phase0').hide();
		$('#buildTable').show();
		$('#landmarkTable').show();
		$('#endTurn').show();
		for (i = 0; i < buildIDs.length; i++){
			if (playerObject[currentPlayer]["money"] < buildCosts[buildNumbers[i]]){
				$(buildIDs[i]).prop("disabled",true);				
				$(buildIDs[i]).addClass("greyed");
			}
			else{
				$(buildIDs[i]).prop("disabled",false);				
				$(buildIDs[i]).removeClass("greyed");
			}
		}
		for (i = 50; i < 54; i++){
			if (playerObject[currentPlayer]["buildings"][i] > 0){
				$(buildIDs[buildNumbers.indexOf(i)]).hide();
			} else {
				$(buildIDs[buildNumbers.indexOf(i)]).show();
			}
		}
	} else if (phase == 0){
		$('#roll1').prop("disabled",false)
		$('#endTurn').hide();
		if (playerObject[currentPlayer]["buildings"][50] == 1){
			$('#roll2').prop("disabled",false)
		}
		$('#buildTable').hide();
		$('#landmarkTable').hide();
		$('#phase0').show();
	} else {
		$('#roll1').prop("disabled",true)
		$('#roll2').prop("disabled",true)
		$('#phase0').hide();
		for (i = 0; i < buildIDs.length; i++){		
			$(buildIDs[i]).prop("disabled",true);
			$(buildIDs[i]).addClass("greyed");
			$(deckIDs[i]).text(deck[buildNumbers[i]])
		}
	}
}

function diceAnimate(die1,die2){
	var interval_id = window.setInterval("", 9999); // Get a reference to the last
	for (var i = 1; i < interval_id; i++)
        window.clearInterval(i);
	die2 = die2 || 0
	var count = 0;
	b = ["images/die1Blue.png","images/die2Blue.png","images/die3Blue.png","images/die4Blue.png","images/die5Blue.png","images/die6Blue.png"]
	g = ["images/die1Green.png","images/die2Green.png","images/die3Green.png","images/die4Green.png","images/die5Green.png","images/die6Green.png"]
	if (die2 == 0){
		dieRollAnimate1 = window.setInterval(function(){
			var x = (Math.floor(Math.random()*6));
			
			$('#dieB').attr('src', b[x])

			if (count == 10){
			clearInterval(dieRollAnimate1);
			$('#dieB').attr('src', b[die1-1]);
			validate();
			}

			count += 1
		}, 75)
	}
	else {
		dieRollAnimate2 = window.setInterval(function(){
			var x = (Math.floor(Math.random()*6));
			var y = (Math.floor(Math.random()*6));
			
			$('#dieB').attr('src', b[x])
			$('#dieG').attr('src', g[y])
			if (count == 10){
				clearInterval(dieRollAnimate2);
				$('#dieB').attr('src', b[die1-1]);
				$('#dieG').attr('src', g[die2-1]);
				validate();
			}

			count += 1
		}, 75)
	}

}

