/* jshint esversion: 6 */
function domEl(id) {return document.getElementById(id);}
var topRow = [0,0,0];
var midRow = [0,0,0];
var botRow = [0,0,0];
var player = 1;
const version = "0.0.2";

function checkWin(){
  let xRight  = [topRow[0],midRow[1],botRow[2]];
  let xLeft   = [topRow[2],midRow[1],botRow[0]];
  let vLeft   = [topRow[0],midRow[0],botRow[0]];
  let vMid    = [topRow[1],midRow[1],botRow[1]];
  let vRight  = [topRow[2],midRow[2],botRow[2]];
  let rows    = [topRow,midRow,botRow,xRight,xLeft,vLeft,vMid,vRight];
  let rowsIds = [
    ['td00','td01','td02'],
    ['td10','td11','td12'],
    ['td20','td21','td22'],
    ['td00','td11','td22'],
    ['td02','td11','td20'],
    ['td00','td10','td20'],
    ['td01','td11','td21'],
    ['td02','td12','td22']
  ];
  let winningRow = -1;
  for (let i = 0; i < rows.length; i++){
    checkSum = arrSum(rows[i]);
    if (Math.abs(checkSum) === 3){
      winningRow = i;
      gameOver(false);
    }
  }
  if (winningRow >= 0){
    for (let i = 0; i < rowsIds[winningRow].length; i++){
      domEl(rowsIds[winningRow][i]).className = "winningRow";
    }
  }
  let playedSpaces = document.querySelectorAll('.played');
  playedSpaces.length === 9 ? gameOver(true) : null;
}

function arrSum(arr){
  var getSum = (x,y) => {return x+y;};
  return arr.reduce(getSum);
}

function placePiece(id){
  player == 1 ? domEl(id).innerHTML = "X" : domEl(id).innerHTML = "O";
  domEl(id).onclick = "";
  domEl(id).className = "played";

  switch (id){
    case 'td00': topRow[0] = player; break;
    case 'td01': topRow[1] = player; break;
    case 'td02': topRow[2] = player; break;
    case 'td10': midRow[0] = player; break;
    case 'td11': midRow[1] = player; break;
    case 'td12': midRow[2] = player; break;
    case 'td20': botRow[0] = player; break;
    case 'td21': botRow[1] = player; break;
    case 'td22': botRow[2] = player; break;
  }
  checkWin();
  player *= -1;
}

function gameOver(tie){
  domEl("reset").style.visibility = "visible";
  let x = document.querySelectorAll('.playable');
  for (let key in x){
    x[key].onclick = "";
  }

  if (tie){
    domEl("winner").innerHTML = "   It\'s a tie!";
    let y = document.querySelectorAll('.played');
    for (let key in y){
      y[key].className = "tied";
    }
  }else {
    if (player === 1){
      domEl("winner").innerHTML = "   X wins!";
    }else {
      domEl("winner").innerHTML = "   O wins!";
    }
  }
}

function reset() {
  location.reload();
}
