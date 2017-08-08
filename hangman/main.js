var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var newWord = '';
var over = false;
var strikes = 0;
var bodyParts = ["hangHead", "hangLArm", "hangBody", "hangRArm", "hangLLeg", "hangRLeg"];
var version = "0.0.3 Typist";

function buildLetters() {
  for (var j = 0; j < 13; j++) {
    document.getElementById("AL").innerHTML += "<td id=\'" + alphabet[j] + "\'> " + alphabet[j] + "</td>";
  }
  for (j = 13; j < 26; j++) {
    document.getElementById("MZ").innerHTML += "<td id=\'" + alphabet[j] + "\'> " + alphabet[j] + "</td>";
  }
  for (var i = 0; i < 26; i++) {
    document.getElementById(alphabet[i]).setAttribute("onclick", "guess(\"" + alphabet[i] + "\")");
  }
}

function guess(letter) {
  console.log(letter);
  document.getElementById(letter).setAttribute("style", "opacity:0;");
  var guessed = [];
  var gotOne = false;
  for (i = 0; i < newWord.length; i++) {
    if (letter === newWord[i]) {
      document.getElementById(i).setAttribute("style", "color:black;");
      gotOne = true;
    }
  }
  if (!gotOne) {
    document.getElementById(bodyParts[strikes]).setAttribute("style", "color:black;");
    strikes += 1;
  }
  for (j = 0; j < newWord.length; j++) {
    if (!document.getElementById(j).hasAttribute("style")) {
      guessed.push(false);
    }
  }
  if (guessed.length === 0) {
    document.getElementById("winButton").setAttribute("style", "visibility: visible;");
    document.getElementById("AL").setAttribute("style","visibility:hidden;");
    document.getElementById("MZ").setAttribute("style","visibility:hidden;");
    over = true;
  }
  if (strikes === 6){
    youLose();
    over = true;
  }
}

function getWord() {
  var x = (1 + Math.floor(Math.random() * (wordList.length - 1)));
  newWord = wordList[x].toUpperCase();
  for (i = 0; i < newWord.length; i++) {
    document.getElementById("word").innerHTML += "<td id=\'" +
      i + "\' class=\'hiddenLetter\'>" + newWord[i] + "</td>";
  }
}

function winner() {
  document.getElementById("word").innerHTML = "";
  document.getElementById("AL").innerHTML = "";
  document.getElementById("MZ").innerHTML = "";
  buildLetters();
  getWord();
  document.getElementById("winButton").setAttribute("style", "visibility:hidden;");
  document.getElementById("loseButton").setAttribute("style", "visibility:hidden;");
  document.getElementById("AL").setAttribute("style","visibility:visible;");
  document.getElementById("MZ").setAttribute("style","visibility:visible;");
  strikes = 0;
  for (i = 0; i < bodyParts.length; i ++){
    document.getElementById(bodyParts[i]).setAttribute("style","color:white;");
  }
  over = false;
}

document.addEventListener("DOMContentLoaded", function() {
  buildLetters();
  getWord();
});

function youLose() {
  for (j = 0; j < newWord.length; j++) {
    if (!document.getElementById(j).hasAttribute("style")) {
      document.getElementById(j).setAttribute("style","color:red;");
    }
  }
  document.getElementById("loseButton").setAttribute("style", "visibility: visible;");
  document.getElementById("AL").setAttribute("style","visibility:hidden;");
  document.getElementById("MZ").setAttribute("style","visibility:hidden;");
}

window.addEventListener("keypress", keyListen, false);

function keyListen(e) {
  if (!over) {
    guess(e.key.toUpperCase());
  } else {
    if (e.code == "Space") {
      winner();
    }
  }
}
