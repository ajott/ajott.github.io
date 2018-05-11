var lunchList = {
    0: {
        Name: "Pita House",
        Area: "Eastown",
        Type: "Mediterranean"
    },
    1: {
        Name: "Two Beards",
        Area: "Downtown",
        Type: "Deli"
    },
    2: {
        Name: "Logan's Alley",
        Area: "Midtown",
        Type: "Bar/Pub"
    },
    3: {
        Name: "Cousin's Tasty Chicken",
        Area: "Creston",
        Type: "American"
    },
    4: {
        Name: "Taco Boy",
        Area: "North Park",
        Type: "Mexican"
    },
    5: {
        Name: "YesterDog",
        Area: "Eastown",
        Type: "Hotdog"
    },
    6: {
        Name: "Big Bob's Pizza",
        Area: "Eastown",
        Type: "Pizza"
    },
    7: {
        Name: "Sheshco",
        Area: "Knapp's Corner",
        Type: "Mediterranean"
    },
    8: {
        Name: "Swanky's Pizza",
        Area: "Creston",
        Type: "Pizza"
    },
    9: {
        Name: "Cherie Inn",
        Area: "East Hills",
        Type: "American"
    },
    10: {
        Name: "Donkey Taqueria",
        Area: "East Hills",
        Type: "Mexican"
    },
    11: {
        Name: "Winchester",
        Area: "East Hills",
        Type: "Bar/Pub"
    },
    12: {
        Name: "HopCat",
        Area: "Downtown",
        Type: "Bar/Pub"
    },
    13: {
        Name: "Downtown Market",
        Area: "Downtown",
        Type: "Various"
    },
    14: {
        Name: "Stella's",
        Area: "Downtown",
        Type: "Bar/Pub"
    },
    15: {
        Name: "Ming Ten",
        Area: "Knapp's Corner",
        Type: "Asian"
    },
    16: {
        Name: "Schnitz Deli",
        Area: "Eastown",
        Type: "Deli"
    },
    17: {
        Name: "Maru",
        Area: "East Hills",
        Type: "Sushi"
    },
    18: {
        Name: "Ando",
        Area: "West Grand",
        Type: "Ramen/Sushi"
    }
};

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function loadOrigin(){
    let text = document.getElementById("origin").value;
    if (text == ""){
        text = "Dematic";
    }
    text = text.replace(/\s/g, "+");
    return text + "+Grand+Rapids,+MI";
}

function randRest(){
    return Math.floor(Math.random() * Object.size(lunchList));
}

function getDirections(dest){
    let origin = loadOrigin();
    var preOriginString = "www.google.com/maps/dir/?api=1&origin=";
    var destinationString = "&destination="+lunchList[dest].Name + " Grand Rapids, MI";
    destinationString = destinationString.replace(/\s/g, "+");
    var modeString = "&travelmode=driving"

    var endString = "http://" + preOriginString + origin + destinationString + modeString;

    document.getElementById("restLabel").style = "display:inline";
    document.getElementById("clickInstructions").style = "display:inline";
    //console.log(endString);

    document.getElementById("result").href = endString;
    document.getElementById("result").innerHTML = lunchList[dest].Name;
}