var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var newWord = '';
var over = false;
var strikes = 0;
var hangBodyParts = ["hangHead", "hangLArm", "hangBody", "hangRArm", "hangLLeg", "hangRLeg"];
var version = "0.1.3 I\'m Not Passive-Aggressive, You\'re Passive-Aggressive";
var guessedArray = [];

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

function buildWord() {
  var x = (Math.floor(Math.random() * (phraseList.length - 1)));
  newWord = phraseList[x].toUpperCase();
  newWord = newWord.replace(/ /g, " ");
  for (i = 0; i < newWord.length; i++) {
    if (alphabet.includes(newWord[i])) {
      document.getElementById("word").innerHTML += "<td id=\'" +
        i + "\' class=\'hiddenLetter\'>" + newWord[i].toUpperCase() + "</td>";
    } else {
      document.getElementById("word").innerHTML += "<td id=\'" +
        i + "\' class=\'letterPunc\'>" + newWord[i] + "</td>";
      document.getElementById(i).setAttribute("style", "color:black;");
    }
  }
}

function guess(letter) {
  if (!guessedArray.includes(letter)) {
    var guessed = [];
    var gotOne = false;
    for (i = 0; i < newWord.length; i++) {
      if (letter === newWord[i]) {
        document.getElementById(i).setAttribute("style", "color:black;");
        gotOne = true;
      }
    }
    if (!gotOne) {
      document.getElementById(hangBodyParts[strikes]).setAttribute("style", "color:red;");
      strikes += 1;
    }
    for (j = 0; j < newWord.length; j++) {
      if (!document.getElementById(j).hasAttribute("style")) {
        guessed.push(false);
      }
    }
    if (guessed.length === 0) {
      if (strikes === 0){
        document.getElementById("liveTalk").innerHTML = "No sweat";
      }
      else if (strikes < 5){
        document.getElementById("liveTalk").innerHTML = "Hooray!";
      } else {
        document.getElementById("liveTalk").innerHTML = "That was close";
      }
      var living = document.getElementsByClassName("live");
      for (i=0; i<living.length;i++){
        living[i].style.color = "black";
      }
      for (i = 0; i < hangBodyParts.length; i++) {
        document.getElementById(hangBodyParts[i]).setAttribute("style", "color:white;");
      }
      document.getElementById("liveTalk").setAttribute("style","color:black;");
      document.getElementById("winButton").setAttribute("style", "visibility: visible;");
      document.getElementById("AL").setAttribute("style", "visibility:hidden;");
      document.getElementById("MZ").setAttribute("style", "visibility:hidden;");
      over = true;
    }
    if (strikes === 6) {
      youLose();
      over = true;
    }
  }
  if (alphabet.includes(letter)){
    guessedArray.push(letter);
  }
  for (i = 0; i < guessedArray.length; i++) {
    document.getElementById(guessedArray[i]).setAttribute("style", "opacity:0;");
    document.getElementById(guessedArray[i]).setAttribute("onclick", "");
  }

}


function gameWon() {
  document.getElementById("word").innerHTML = "";
  document.getElementById("AL").innerHTML = "";
  document.getElementById("MZ").innerHTML = "";
  buildLetters();
  buildWord();
  document.getElementById("winButton").setAttribute("style", "visibility:hidden;");
  document.getElementById("loseButton").setAttribute("style", "visibility:hidden;");
  document.getElementById("AL").setAttribute("style", "visibility:visible;");
  document.getElementById("MZ").setAttribute("style", "visibility:visible;");
  strikes = 0;
  for (i = 0; i < hangBodyParts.length; i++) {
    document.getElementById(hangBodyParts[i]).setAttribute("style", "color:white;");
  }
  var living = document.getElementsByClassName("live");
  for (i=0; i<living.length;i++){
    living[i].style.color = "white";
  }
  document.getElementById("deadTalk").setAttribute("style","color:white;");
  document.getElementById("speechLeader").setAttribute("style","color:white;");
  guessedArray = [];
  over = false;
}

function youLose() {
  for (j = 0; j < newWord.length; j++) {
    if (!document.getElementById(j).hasAttribute("style")) {
      document.getElementById(j).setAttribute("style", "color:red;");
    }
  }
  var x = (Math.floor(Math.random() * (deathSayings.length)));
  var dedManSez = deathSayings[x];
  document.getElementById("deadTalk").innerHTML = dedManSez;
  document.getElementById("deadTalk").setAttribute("style","color:black;");
  document.getElementById("speechLeader").setAttribute("style","color:black;");
  document.getElementById("loseButton").setAttribute("style", "visibility: visible;");
  document.getElementById("AL").setAttribute("style", "visibility:hidden;");
  document.getElementById("MZ").setAttribute("style", "visibility:hidden;");
}

window.addEventListener("keypress", keyListen, false);

function keyListen(e) {
  if (!over && alphabet.includes(e.key.toUpperCase())) {
    guess(e.key.toUpperCase());
  } else if (e.key == "\\"){
    guess(e.key);
  }
   else {
    if (e.code == "Space" && over) {
      gameWon();
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  buildLetters();
  buildWord();
  document.getElementById("verNum").innerHTML = version;
});
