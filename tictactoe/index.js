/* jshint esversion: 6 */
function domEl(id) {return document.getElementById(id);}
var topRow = [0,0,0];
var midRow = [0,0,0];
var botRow = [0,0,0];
var player = 1;

function checkWin(){
  let xRight  = [topRow[0],midRow[1],botRow[2]];
  let xLeft   = [topRow[2],midRow[1],botRow[0]];
  let vLeft   = [topRow[0],midRow[0],botRow[0]];
  let vMid    = [topRow[1],midRow[1],botRow[1]];
  let vRight  = [topRow[2],midRow[2],botRow[2]];
  let rows    = [topRow,midRow,botRow,xRight,xLeft,vLeft,vMid,vRight];
  let winningRow = "";
  for (let i = 0; i < rows.length; i++){
    checkSum = arrSum(rows[i]);
    if (Math.abs(checkSum) === 3){
      domEl("reset").style.visibility = "visible";
      winningRow += i;
      x = document.querySelectorAll('.playable');
      for (let key in x){
        x[key].onclick = "";
      }
    }
  }
}

function arrSum(arr){
  var getSum = (x,y) => {return x+y;};
  return arr.reduce(getSum);
}

function placePiece(id){
  player == 1 ? domEl(id).innerHTML = "X" : domEl(id).innerHTML = "O";

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

function reset() {
  location.reload();
}
