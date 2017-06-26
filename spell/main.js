var displayWord = "start";
var activeChar = 0;
var cacheWord = "start";
var exp = 0;
var errors = 0;

function changeWord(){
	var x = (1+ Math.floor(Math.random()*(wordList.length-1)));

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