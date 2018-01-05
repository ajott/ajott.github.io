var state = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]

playerActive = false;

document.onload = buildPlayArea()

var numMoves = 0;

function makeState() {
    for (let i = 0; i < 24; i ++){
        let randId = Math.floor(Math.random()*25)
        press(randId);
    }
}

function el(id) {
    return document.getElementById(id);
}

function buildPlayArea(){
    let btnCount = 0;
    for (let i = 0; i < 5; i ++){
        el("buttonTable").innerHTML += "<tr id=\"row"+i+"\"></tr>"
        for (let j = 0; j < 5; j++){
            let idStr = btnCount;
            el("row"+i).innerHTML += "<td><button id=\"btn"+idStr+"\" onclick=\"press("+idStr+")\"></button></td>";
            btnCount ++;
        }
    } 
    makeState();
    numMoves = 0;
    playerActive = true;
    checkLights();
}

function findAdj(id){
    let adjArr = [];
    let leftEdge = false;
    let rightEdge = false;

    if (id % 5 == 0) {
        leftEdge = true;
    } else if (id == 4 || id == 9 || id == 14 || id == 19 || id == 24) {
        rightEdge = true;
    }

    adjArr.push(id)
    
    if ((id - 5) >= 0 && (id - 5) <= 24){
        adjArr.push(id - 5);
    }
    if ((id - 1) >= 0 && (id - 1) <= 24 && !leftEdge){
        adjArr.push(id - 1);
    }
    if ((id + 1) >= 0 && (id + 1) <= 24 && !rightEdge){
        adjArr.push(id + 1);
    }
    if ((id + 5) >= 0 && (id + 5) <= 24){
        adjArr.push(id + 5);
    }

    return adjArr;
}

function toggle(id){
    state[id] = !state[id]
}

function press(id){
    let adjArr = findAdj(id)
    for (each of adjArr){
        toggle(each)
    }

    numMoves ++;    

    if (playerActive){
        checkLights();    
    }
    
}

function arrBoolCheck(arr){
    let result = false;
    for (let i = 0; i < arr.length; i ++){
        if (arr[i]){
            result = true;
        }
    }

    return result;
}

function checkLights(){    
    
    el("moves").innerHTML = "Moves: "+numMoves;

    if (!arrBoolCheck(state)){
        alert("You won in "+numMoves+" moves!");
        resetGame();
    }
     for (let i = 0; i < state.length; i ++){
         if (state[i]){
            el("btn"+i).setAttribute("style","background-color:red");
         } else {
            el("btn"+i).setAttribute("style","background-color:none");
         }
     }
}


function resetGame(){
    makeState();
    numMoves = 0;
    playerActive = true;
    checkLights();
}