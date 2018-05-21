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
    },
    19: {
        Name: "Blue Dog",
        Area: "West Grand",
        Type: "Bar/Pub"
    },
    20: {
        Name: "Big Willy's Italian Beef",
        Area: "East Hills",
        Type: "Sandwiches"
    },
    21: {
        Name: "Wok & Mortar",
        Area: "Eastown",
        Type: "Asian/Sushi"
    },
    22: {
        Name: "Peaches Cafe",
        Area: "East Hills",
        Type: "Deli"
    },
    23: {
        Name: "Wolfgang's",
        Area: "Eastown",
        Type: "Brunch"
    }
};

Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function docEl(id) {
    return document.getElementById(id);
}

function loadOrigin() {
    let text = docEl("origin").value;
    if (text == "") {
        text = "Dematic";
    }
    text = text.replace(/\s/g, "+");
    return text + "+Grand+Rapids,+MI";
}

function randRest() {
    return Math.floor(Math.random() * Object.size(lunchList));
}

function getDirections(dest) {
    let origin = loadOrigin();    
    let restaurant = lunchList[dest].Name;    
    restaurant = restaurant.replace(/\&/g, "%26");
    var preOriginString = "www.google.com/maps/dir/?api=1&origin=";
    var destinationString = "&destination=" + restaurant + " Grand Rapids, MI";
    destinationString = destinationString.replace(/\s/g, "+");
    var modeString = "&travelmode=driving";

    var endString = "http://" + preOriginString + origin + destinationString + modeString;

    return endString;
}

function loadRest(dest) {

    docEl("restCard").style = "display:inline";

    docEl("clickInstructions").href = getDirections(dest);
    docEl("result").innerHTML = lunchList[dest].Name;
    docEl("restDetails").innerHTML = "Style: " + lunchList[dest].Type;
    docEl("restArea").innerHTML = "Area: " + lunchList[dest].Area;
}

function loadRestTable() {
    docEl("restTable").style = "display:inline";
    docEl("buildTableButt").style = "display:none";
    let origin = loadOrigin();
    origin = origin.replace("+Grand+Rapids,+MI", "");
    origin = origin.replace(/\+/g, " ");
    for (let i = 0; i < Object.size(lunchList); i++) {
        let htmlString = "<tr><td>";
        htmlString += lunchList[i].Name + "</td><td>";
        htmlString += lunchList[i].Area + "</td><td>";
        htmlString += lunchList[i].Type + "</td><td class=\"directions\">";
        htmlString += "<a target=\"_blank\" id=\"direct"+i+"\" href=\"";
        htmlString += getDirections(i) + "\">from "+origin+"</a></td></tr>";
        docEl("restBody").innerHTML += htmlString;
    }
}

function updateOrigin(){
    let origin = loadOrigin();
    origin = origin.replace("+Grand+Rapids,+MI", "");
    origin = origin.replace(/\+/g, " ");
    for (let i = 0; i < Object.size(lunchList); i++){
        docEl("direct"+i).innerHTML = "from " + origin;
        docEl("direct"+i).href = getDirections(i);
    }
}