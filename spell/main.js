var displayWord = "start";
var activeChar = 0;
var cacheWord = "start";
var exp = 0;
var errors = 0;
var sorted = 0;

var version = "0.0.3"

function changeWord(){
	if (sorted == 0){
		wordList = wordList.sort(function(a,b){return a.length-b.length})
		sorted = 1;
	}

	if (exp < 10){
		wordDiff = 101
	} else if (exp >= 10 && exp < 50){
		wordDiff = 401
	} else if (exp >= 50 && exp < 100){
		wordDiff = 501
	} else if (exp >= 100 && exp < 150){
		wordDiff = 601
	} else if (exp >= 150 && exp < 200){
		wordDiff = 701
	} else {
		wordDiff = wordList.length
	}

	

	var x = (1+ Math.floor(Math.random()*(wordDiff-1)));

	displayWord = wordList[x];
	cacheWord = displayWord;
	updateDisplay();
}

window.addEventListener("keypress", keyListen, false);

function keyListen(e){
	
	if (activeChar < displayWord.length){
		if (displayWord[activeChar] == e.key){
			displayWord = changeCase(activeChar);
			activeChar += 1;
		}
		else {
			displayWord = cacheWord;
			activeChar = 0;
			errors += 1;
			if (exp > 0){
				exp -= 1;
			}
		}

		updateDisplay();
	}
	else if (activeChar == displayWord.length){
		if (e.code == "Space"){				
			exp += displayWord.length;
			changeWord();
			activeChar = 0;
		}

		updateDisplay();
	}

}

function changeCase(char){
	return displayWord.slice(0,activeChar) + displayWord[activeChar].toUpperCase() + displayWord.slice(activeChar + 1);
}

function updateDisplay(){
	document.getElementById("word").innerHTML = displayWord;
	document.getElementById("exp").innerHTML = exp;
	document.getElementById("errors").innerHTML = errors;
}