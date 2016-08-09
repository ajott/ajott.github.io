function hireLaborer(){
    var laborerCost = Math.floor(15 * Math.pow(1.15,laborers));     //works out the cost of this worker
    if(dollars >= laborerCost){                                   //checks that the player can afford the worker
        laborers = laborers + 1;                                   //increases number of laborers
    	dollars = dollars - laborerCost;                          //removes the dollars spent
        document.getElementById('laborers').innerHTML = laborers;  //updates the number of laborers for the user
        document.getElementById('dollars').innerHTML = dollars;  //updates the number of dollars for the user
        updateMPS();
    };
    var nextCost = Math.floor(15 * Math.pow(1.15,laborers));       //works out the cost of the next worker
    document.getElementById('laborerCost').innerHTML = nextCost;  //updates the worker cost for the user
};

function hireTech(){
    var techCost = Math.floor(100 * Math.pow(1.15,techs));     //works out the cost of this worker
    if(dollars >= techCost){                                   //checks that the player can afford the worker
        techs = techs + 1;                                   //increases number of laborers
        dollars = dollars - techCost;                          //removes the dollars spent
        document.getElementById('techs').innerHTML = techs;  //updates the number of laborers for the user
        document.getElementById('dollars').innerHTML = dollars;  //updates the number of dollars for the user
        updateMPS();
    };
    var nextCost = Math.floor(100 * Math.pow(1.15,techs));       //works out the cost of the next worker
    document.getElementById('techCost').innerHTML = nextCost;  //updates the worker cost for the user
};

function hireEngineer(){
    var engCost = Math.floor(1100 * Math.pow(1.15,engineers));     //works out the cost of this worker
    if(dollars >= engCost){                                   //checks that the player can afford the worker
        engineers = engineers + 1;                                   //increases number of laborers
        dollars = dollars - engCost;                          //removes the dollars spent
        document.getElementById('engineers').innerHTML = engineers;  //updates the number of laborers for the user
        document.getElementById('dollars').innerHTML = dollars;  //updates the number of dollars for the user
        updateMPS();
    };
    var nextCost = Math.floor(1100 * Math.pow(1.15,engineers));       //works out the cost of the next worker
    document.getElementById('engCost').innerHTML = nextCost;  //updates the worker cost for the user
};