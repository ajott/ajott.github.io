var player = {
    money: 150,
    debt: 1500,
    currentPort: "Lisboa",
    validDestinations: [],
    year: 1501,
    month: 7,
    day: 1,
    buyMulti: 1.10,
    sellMulti: 0.90,

    ship: {
        hold: [],
        capacity: 10,
        supply: 15,
        range: 15 * 2 * 24,
        speed: 2
    }
}

var ports = {
    "Lisboa": {
        connections: {
            "Canarias": 710,
            "Azores": 920,
            "Nouadhibou": 1185
        },
        goodsPrices: {
            "Cloth": 0,
            "Food": 0,
            "Arms": 0,
            "Water": 0,
            "Spices": 0
        },
        priceMulti: {
            "Cloth": 0.70,
            "Food": 1.00,
            "Arms": 1.05,
            "Water": 0.65,
            "Spices": 1.70
        }
    },
    "Azores": {
        connections: {
            "Lisboa": 920,
            "Nouadhibou": 1250,
            "Canarias": 906
        },
        goodsPrices: {
            "Cloth": 0,
            "Food": 0,
            "Arms": 0,
            "Water": 0,
            "Spices": 0
        },
        priceMulti: {
            "Cloth": 1.15,
            "Food": 0.90,
            "Arms": 1.25,
            "Water": 1.00,
            "Spices": 1.55
        }
    },
    "Canarias": {
        connections: {
            "Lisboa": 710,
            "Cabo Verde": 869,
            "Azores": 906,
            "Nouadhibou": 475
        },
        goodsPrices: {
            "Cloth": 0,
            "Food": 0,
            "Arms": 0,
            "Water": 0,
            "Spices": 0
        },
        priceMulti: {
            "Cloth": 1.10,
            "Food": 0.90,
            "Arms": 1.25,
            "Water": 1.00,
            "Spices": 1.45
        }
    },
    "Nouadhibou": {
        connections: {
            "Lisboa": 1185,
            "Canarias": 475,
            "Azores": 1250,
            "Cabo Verde": 522
        },
        goodsPrices: {
            "Cloth": 0,
            "Food": 0,
            "Arms": 0,
            "Water": 0,
            "Spices": 0
        },
        priceMulti: {
            "Cloth": 0.90,
            "Food": 1.15,
            "Arms": 1.40,
            "Water": 1.15,
            "Spices": 1.35
        }
    },
    "Cabo Verde": {
        connections: {
            "Canarias": 869,
            "Nouadhibou": 522,
            "St Helena": 2288
        },
        goodsPrices: {
            "Cloth": 0,
            "Food": 0,
            "Arms": 0,
            "Water": 0,
            "Spices": 0
        },
        priceMulti: {
            "Cloth": 1.15,
            "Food": 1.00,
            "Arms": 1.35,
            "Water": 1.00,
            "Spices": 1.25
        }
    },
    "St Helena": {
        connections: {
            "Cabo Verde": 2288,
            "Mozambique": 3167
        },
        goodsPrices: {
            "Cloth": 0,
            "Cloth": 0,
            "Food": 0,
            "Arms": 0,
            "Water": 0,
            "Spices": 0
        },
        priceMulti: {
            "Cloth": 1.10,
            "Food": 0.90,
            "Arms": 1.35,
            "Water": 1.00,
            "Spices": 1.15
        }
    },
    "Mozambique": {
        connections: {
            "St Helena": 3167,
            "Mombasa": 1149
        },
        goodsPrices: {
            "Cloth": 0,
            "Food": 0,
            "Arms": 0,
            "Water": 0,
            "Spices": 0
        },
        priceMulti: {
            "Cloth": 0.85,
            "Food": 1.25,
            "Arms": 1.20,
            "Water": 1.05,
            "Spices": 1.10
        }
    },
    "Mombasa": {
        connections: {
            "Mozambique": 1149,
            "Calecut": 2342
        },
        goodsPrices: {
            "Cloth": 0,
            "Food": 0,
            "Arms": 0,
            "Water": 0,
            "Spices": 0
        },
        priceMulti: {
            "Cloth": 0.80,
            "Food": 1.20,
            "Arms": 1.15,
            "Water": 1.00,
            "Spices": 1.05
        }
    },
    "Calecut": {
        connections: {
            "Mombasa": 2342,
            "Goa": 286
        },
        goodsPrices: {
            "Cloth": 0,
            "Food": 0,
            "Arms": 0,
            "Water": 0,
            "Spices": 0
        },
        priceMulti: {
            "Cloth": 1.10,
            "Food": 1.00,
            "Arms": 1.30,
            "Water": 0.95,
            "Spices": 0.90
        }
    },
    "Goa": {
        connections: {
            "Calecut": 286
        },
        goodsPrices: {
            "Cloth": 0,
            "Food": 0,
            "Arms": 0,
            "Water": 0,
            "Spices": 0
        },
        priceMulti: {
            "Cloth": 0.95,
            "Food": 0.90,
            "Arms": 1.25,
            "Water": 1.00,
            "Spices": 0.75
        }
    }
}

function transaction(I) {
    I.active = true;

    I.update = function() {
        if (player.year >= this.year + 1 && player.month >= this.month) {
            I.active = false;
        }
    }

    return I;
}

var recentTransactions = []

var goods = {
    "Cloth": {
        basePrice: 100
    },
    "Food": {
        basePrice: 50
    },
    "Arms": {
        basePrice: 250
    },
    "Water": {
        basePrice: 20
    },
    "Spices": {
        basePrice: 400
    }
}


function doTravel(destination) {
    let start = player.currentPort;

    if (ports[start]["connections"][destination] != null && player.ship.range >= ports[start]["connections"][destination]) {
        player.day += Math.ceil((ports[start]["connections"][destination]) / (player.ship.speed * 24));
        if (player.day > 30) {
            player.day = player.day % 30;
            player.month += 1;

            if (player.month >= 13) {
                player.month -= 12;
                player.year += 1;
            }

            recentTransactions.forEach(function (trans) {
                trans.update();
            });

            recentTransactions = recentTransactions.filter(function (trans) {
                return trans.active;
              });


            if (player.month % 3 == 0) {
                accumulateInterest();
            }
        }
        player.currentPort = destination;
        findPorts();
        buildPortGoods();
        updateDOM();
    }

    if (player.currentPort != "Lisboa") {
        $('#bankBtn').hide();
        $('#shipyardBtn').hide();
    } else {
        $('#bankBtn').show();
        $('#shipyardBtn').show();
    }
}

function findPorts() {
    player.validDestinations = [];
    let currConnections = ports[player.currentPort]["connections"];
    let portNames = Object.keys(currConnections);

    portNames.forEach(function (port) {
        if (currConnections[port] <= player.ship.range) {
            player.validDestinations.push(port);
        }
    })

    let htmlString = ""

    portNames.forEach (function (destination) {
        if (player.validDestinations.indexOf(destination) >= 0) {
            htmlString += "<button class=\"w3-button w3-indigo w3-hover-blue\" onclick='doTravel(\""+destination+"\")'><span>"+destination+" - "+ports[destination]["connections"][player.currentPort]+" miles</span><br/><span>Travel time: "+Math.ceil((ports[destination]["connections"][player.currentPort])/(player.ship.speed * 24))+" days<span></button>";
        } else {
            htmlString += "<button class=\"w3-button w3-light-grey w3-disabled\" onclick='doTravel(\""+destination+"\")'><span>"+destination+" - "+ports[destination]["connections"][player.currentPort]+" miles</span><br/><span>Travel time: "+Math.ceil((ports[destination]["connections"][player.currentPort])/(player.ship.speed * 24))+" days<span></button>";
        }
    })

    $('#destinations').html(htmlString);
}

function buildPortGoods() {
    let port = player.currentPort;
    let goodsNames = Object.keys(goods);

    let portPurchases = recentTransactions.filter(function (trans) {
        return (trans.port == port && trans.type == "Purchase");
    });

    let portSales = recentTransactions.filter(function (trans) {
        return (trans.port == port && trans.type == "Sale");
    });

    let goodPurchase = {
        "Cloth": 0,
        "Food": 0,
        "Arms": 0,
        "Water": 0,
        "Spices": 0
    }

    let goodSale = {
        "Cloth": 0,
        "Food": 0,
        "Arms": 0,
        "Water": 0,
        "Spices": 0
    }

    portPurchases.forEach(function (purch) {
        goodPurchase[purch.item] += 1;
    });

    portSales.forEach(function (purch) {
        goodSale[purch.item] += 1;
    });

    goodsNames.forEach(function (item) {
        ports[port].goodsPrices[item] = Math.ceil(goods[item].basePrice * ports[port]["priceMulti"][item]);        
    })
    

    goodsNames.forEach(function (item) {
        $('#buy'+item+'Price').text(Math.ceil(ports[port].goodsPrices[item] * player.buyMulti * (1 + (0.01 * goodPurchase[item])) * (1 - (0.01 * goodSale[item]))))
        $('#sell'+item+'Price').text(Math.ceil(ports[port].goodsPrices[item] * player.sellMulti * (1 - (0.01 * goodSale[item])) * (1 + (0.01 * goodPurchase[item]))))
    })

    updateDOM();
}

function buy(good) {
    let buyPrice = Number($('#buy'+good+'Price').text());

    if (player.money >= buyPrice && player.ship.hold.length < player.ship.capacity) {
        player.money -= buyPrice
        player.ship.hold.push(good)

        recentTransactions.push(transaction({
            year: player.year,
            month: player.month,
            price: buyPrice,
            port: player.currentPort,
            item: good,
            type: "Purchase"
          }))
    }   

    buildPortGoods();
    updateDOM();
}

function sell(good) {

    if (player.ship.hold.indexOf(good) >= 0) {
        let salePrice = Number($('#sell'+good+'Price').text());
        player.money += salePrice;

        player.ship.hold.splice(player.ship.hold.indexOf(good),1);

        recentTransactions.push(transaction({
            year: player.year,
            month: player.month,
            price: salePrice,
            port: player.currentPort,
            item: good,
            type: "Sale"
          }))
    }    
    buildPortGoods();
    updateDOM();
}

function accumulateInterest() {
    player.debt = Math.ceil(player.debt * 1.05);

    if (player.month % 6 == 0) {
        let debtPayment = Math.ceil(player.debt * 0.10)
        player.money -= debtPayment
        player.debt -= debtPayment

        if (player.money < 0) {
            player.debt -= player.money;
            player.money = 0;
        }
    }
}

function updateDOM() {
    $('#playerMoney').text((player.money))
    $('#playerDebt').text((player.debt))
    
    for (let i = 0; i < player.ship.capacity; i ++) {
        if (player.ship.hold[i] != null) {
            $('#shipHold'+i).html("<object type=\"image/svg+xml\" data=\"./assets/" + player.ship.hold[i] + ".svg\"></object>")
        } else {
            $('#shipHold'+i).html("");
        }
    }

    for (let i = 0; i < Object.keys(goods).length; i ++) {
        $("#"+Object.keys(goods)[i]+"BuyBtn").removeClass("w3-disabled");
        $("#"+Object.keys(goods)[i]+"SellBtn").removeClass("w3-disabled");

        if (Math.ceil($('#buy'+Object.keys(goods)[i]+"Price").text() > player.money || player.ship.hold.length == player.ship.capacity)){
            $("#"+Object.keys(goods)[i]+"BuyBtn").addClass("w3-disabled");
        }
        
        if (player.ship.hold.indexOf(Object.keys(goods)[i]) < 0) {
            $("#"+Object.keys(goods)[i]+"SellBtn").addClass("w3-disabled");
        }
    }

    
    $('#year').text(player.year)
    $('#month').text(player.month)
    $('#day').text(player.day)
    $('#location').text(player.currentPort)
    $('#shipRange').text(player.ship.range)
    $('#shipSpeed').text(player.ship.speed)
    $('#shipSupply').text(player.ship.supply)
    $('#shipCapacity').text(player.ship.capacity)
}

function takeLoan(amount) {
    player.debt += Math.ceil(amount * 1.05);
    player.money += amount;

    updateDOM();
}

function payDebt(amount) {
    if (player.money >= amount) {
    player.debt -= amount;
    player.money -= amount;
}
    updateDOM();
}

function upgradeShipSupply() {
    player.money -= 500
    player.ship.supply += 5;
    player.ship.range = player.ship.speed * player.ship.supply * 24;

    findPorts();
    updateDOM();
}

function upgradeShipSpeed() {
    player.money -= 1000
    player.ship.speed += 1;
    player.ship.range = player.ship.speed * player.ship.supply * 24;

    findPorts();
    updateDOM();
}

function upgradeShipHold() {
    player.money -= 500
    player.ship.capacity += 5

    let htmlString = "";
    for (let i = 0; i < player.ship.capacity; i ++) {
        if (i % 10 == 0) {
            htmlString += "<tr>"
        }
        htmlString += "<td id=\"shipHold"+i+"\"></td>"
        if (i + 1 % 10 == 0) {
            htmlString += "</tr>"
        }
    }
    $('#playerShipHold').html(htmlString)

    updateDOM();
}

function togglePanel(panel) {
    switch (panel) {
        case 0: 
            $('#travel').show()
            $('#market').hide();
            $('#bank').hide();
            $('#shipyard').hide();
            
            $('#travelBtn').removeClass("w3-light-grey").addClass("w3-blue w3-hover-blue")
            $('#marketBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")
            $('#bankBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")
            $('#shipyardBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")

            break;
        case 1:
        $('#travel').hide()
        $('#market').show();
        $('#bank').hide();
        $('#shipyard').hide();

        $('#travelBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")
        $('#marketBtn').removeClass("w3-light-grey").addClass("w3-blue w3-hover-blue")
        $('#bankBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")
        $('#shipyardBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")

            break;
        case 2:
        $('#travel').hide()
        $('#market').hide();
        $('#bank').show();
        $('#shipyard').hide();

        $('#travelBtn').removeClass("w3-blue w3-hover-blue w3-hover-blue").addClass("w3-light-grey")
            $('#marketBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")
            $('#bankBtn').removeClass("w3-light-grey").addClass("w3-blue w3-hover-blue")
            $('#shipyardBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")

            break;
        case 3: 
        $('#travel').hide()
        $('#market').hide();
        $('#bank').hide();
        $('#shipyard').show();

        $('#travelBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")
            $('#marketBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")
            $('#bankBtn').removeClass("w3-blue w3-hover-blue").addClass("w3-light-grey")
            $('#shipyardBtn').removeClass("w3-light-grey").addClass("w3-blue w3-hover-blue")

            break;
    }

    updateDOM();
}