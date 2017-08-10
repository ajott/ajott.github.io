var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var newPhrase = '';
var over = false;
var strikes = 0;
var hangBodyParts = ["hangHead", "hangLArm", "hangBody", "hangRArm", "hangLLeg", "hangRLeg"];
var version = "0.1.4 I\'m Not Asking Again";
var guessedArray = [];
var usedPhrases = [];

function el(id) {
  return document.getElementById(id);
}

function buildLetters() {
  for (var j = 0; j < 13; j++) {
    el("AL").innerHTML += "<td id=\'" + alphabet[j] + "\'> " + alphabet[j] + "</td>";
  }
  for (j = 13; j < 26; j++) {
    el("MZ").innerHTML += "<td id=\'" + alphabet[j] + "\'> " + alphabet[j] + "</td>";
  }
  for (var i = 0; i < 26; i++) {
    el(alphabet[i]).setAttribute("onclick", "guess(\"" + alphabet[i] + "\")");
  }
}

function buildWord() {
  var x = (Math.floor(Math.random() * (phraseList.length)));
  newPhrase = phraseList[x].toUpperCase();
  newPhrase = newPhrase.replace(/ /g, " ");
  if (!usedPhrases.includes(newPhrase)) {
    for (i = 0; i < newPhrase.length; i++) {
      if (alphabet.includes(newPhrase[i])) {
        el("word").innerHTML += "<td id=\'" +
          i + "\' class=\'hiddenLetter\'>" + newPhrase[i].toUpperCase() + "</td>";
      } else {
        el("word").innerHTML += "<td id=\'" +
          i + "\' class=\'letterPunc\'>" + newPhrase[i] + "</td>";
        el(i).setAttribute("style", "color:black;");
      }
    }
    usedPhrases.push(newPhrase);
  } else {
    try {
      buildWord();
    } catch (err) {
      location.reload();
    }
  }
}

function guess(letter) {
  if (!guessedArray.includes(letter)) {
    var guessed = [];
    var gotOne = false;
    for (i = 0; i < newPhrase.length; i++) {
      if (letter === newPhrase[i]) {
        el(i).setAttribute("style", "color:black;");
        gotOne = true;
      }
    }
    if (!gotOne) {
      el(hangBodyParts[strikes]).setAttribute("style", "color:red;");
      strikes += 1;
    }
    for (j = 0; j < newPhrase.length; j++) {
      if (!el(j).hasAttribute("style")) {
        guessed.push(false);
      }
    }
    if (guessed.length === 0) {
      youWon();
    }
    if (strikes === 6) {
      youLose();
    }
  }
  if (alphabet.includes(letter)) {
    guessedArray.push(letter);
  }
  for (i = 0; i < guessedArray.length; i++) {
    el(guessedArray[i]).setAttribute("style", "opacity:0;");
    el(guessedArray[i]).setAttribute("onclick", "");
  }
}

function reset() {
  el("word").innerHTML = "";
  el("AL").innerHTML = "";
  el("MZ").innerHTML = "";
  buildLetters();
  buildWord();
  el("winButton").setAttribute("style", "visibility:hidden;");
  el("loseButton").setAttribute("style", "visibility:hidden;");
  el("AL").setAttribute("style", "visibility:visible;");
  el("MZ").setAttribute("style", "visibility:visible;");
  strikes = 0;
  for (i = 0; i < hangBodyParts.length; i++) {
    el(hangBodyParts[i]).setAttribute("style", "color:white;");
  }
  var living = document.getElementsByClassName("live");
  for (i = 0; i < living.length; i++) {
    living[i].style.color = "white";
  }
  el("deadTalk").setAttribute("style", "color:white;");
  el("speechLeader").setAttribute("style", "color:white;");
  guessedArray = [];
  over = false;
  el("question").style.visibility = "hidden";
}

function youWon() {
  if (strikes === 0) {
    el("liveTalk").innerHTML = "No sweat";
  } else if (strikes < 5) {
    el("liveTalk").innerHTML = "Hooray!";
  } else {
    el("liveTalk").innerHTML = "That was close";
  }
  var living = document.getElementsByClassName("live");
  for (i = 0; i < living.length; i++) {
    living[i].style.color = "black";
  }
  for (i = 0; i < hangBodyParts.length; i++) {
    el(hangBodyParts[i]).setAttribute("style", "color:white;");
  }
  el("liveTalk").setAttribute("style", "color:black;");
  el("winButton").setAttribute("style", "visibility: visible;");
  el("AL").setAttribute("style", "visibility:hidden;");
  el("MZ").setAttribute("style", "visibility:hidden;");
  over = true;
  el("question").style.visibility = "visible";
}

function youLose() {
  for (j = 0; j < newPhrase.length; j++) {
    if (!el(j).hasAttribute("style")) {
      el(j).setAttribute("style", "color:red;");
    }
  }
  var x = (Math.floor(Math.random() * (deathSayings.length)));
  var dedManSez = deathSayings[x];
  el("deadTalk").innerHTML = dedManSez;
  el("deadTalk").setAttribute("style", "color:black;");
  el("speechLeader").setAttribute("style", "color:black;");
  el("loseButton").setAttribute("style", "visibility: visible;");
  el("AL").setAttribute("style", "visibility:hidden;");
  el("MZ").setAttribute("style", "visibility:hidden;");
  el("question").style.visibility = "visible";
  over = true;
}

window.addEventListener("keypress", keyListen, false);

function keyListen(e) {
  if (!over && alphabet.includes(e.key.toUpperCase())) {
    guess(e.key.toUpperCase());
  } else if (e.key == "\\") {
    guess(e.key);
  } else {
    if (e.code == "Space" && over) {
      reset();
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  buildLetters();
  buildWord();
  el("verNum").innerHTML = version;
});
