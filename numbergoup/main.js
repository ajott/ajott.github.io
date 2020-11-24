window.addEventListener ?
  window.addEventListener("load", setupGame, false) :
  window.attachEvent && window.attachEvent("onload", setupGame);

var healthNumber = 5;
var hitNumber = 0;
var monsterHit = 4;



function setupGame() {
  healthNumber = 5;
  hitNumber = 0;
  monsterHit = 4;
  $("#healthnumber").text(healthNumber);
  $("#healthdiv").css("background-color", "green");
  $("#hitnumber").text(hitNumber);
  $("#monsterhit").text(monsterHit);
  $("#d10roll").text("");
  $("#totalhit").text("");
  $("#hit").show();
  $("#win").hide();
  $("#slain").hide();
}


function trytohit() {
  let thisroll = roll("1d10");

  $("#d10roll").text(thisroll);

  let currentHit = thisroll + hitNumber;

  $("#totalhit").text(currentHit);


  if (currentHit >= monsterHit) {
    if (hitNumber >= 20 && monsterHit == 26) {
      $("#win").show();
      $("#hit").hide();
    } else {
      hitNumber += 1;
      monsterHit += 1;
      $("#hitnumber").text(hitNumber);
      $("#monsterhit").text(monsterHit);
    }    

  } else {
    healthNumber -= 1;
    if (healthNumber == 4) {
      $("#healthdiv").css("background-color", "greenyellow");
    } else if (healthNumber == 3) {
      $("#healthdiv").css("background-color", "yellow");
    } else if (healthNumber == 2) {
      $("#healthdiv").css("background-color", "orange");
    } else if (healthNumber == 1) {
      $("#healthdiv").css("background-color", "red");
    }
    $("#healthnumber").text(healthNumber);
    if (healthNumber == 0) {      
      $("#finalmonsterhit").text(monsterHit-1);
      $("#slain").show();
      $("#hit").hide();
    }
  }
}


function roll(str, mod = 0) {

  if (str == "-") {
      return 1;
  }

  let numRolls = Number(str.split("d")[0]);
  let diceValue = Number(str.split("d")[1]);

  let result = [];

  for (let i = 0; i < numRolls; i++) {
      result.push(Math.floor((Math.random() * diceValue) + 1))
  }

  // Sorts the array of rolls for ease of removing high/low values
  result.sort(function (a, b) {
      return a - b
  })

  if (mod == 1) {
      // Remove lowest value
      result.shift()
  } else if (mod == -1) {
      // Remove highest value
      result.pop()
  }

  let total = sumArr(result);

  return total;
}

function sumArr(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
  }

  return sum;
}