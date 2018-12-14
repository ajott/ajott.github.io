var planetDefault = {
    sizeRoll: 0,
    size: "",
    circum: 0,
    denRoll: 0,
    density: "",
    gravity: "",
    atmoRoll: 0,
    atmosphere: "",
    atmoPres: "",
    atmoType: "Breathable",
    atmoDesc: "Atmospheric gasses are able to support human life.",
    atmoCode: "OK",
    dayRoll: 0,
    dayLengthHours: 0,
    dayLengthTerranDays: 0,
    yearRoll: 0,
    yearLengthTerranDays: 0,
    yearLengthLocalDays: 0,
    yearLengthTerranYears: 0,
    tempRoll: 0,
    tempType: "",
    tempLow: 0,
    tempHigh: 0,
    tempRange: "",
    tiltRoll: 0,
    tiltDesc: "",
    tiltDegrees: 0,
    tiltString: "",
    hydroRoll: 0,
    hydroPercent: "",
    hydroDesc: "",
    terrainMods: [],
    terrainValues: [],
    terrainPercentages: [],
    terrainPresence: [],
    terrainDesc: [],
    classRoll: 0,
    classCode: -1,
    planetClass: "",
    prevClassCode: -1,
    planetPrevClass: "",
    popRoll: 0,
    population: "",
    popNum: 0,
    govRoll: 0,
    govType: "",
    govCode: -1,
    religRoll: 0,
    religion: "",
    religCode: -1,
    adeptaRolls: [],
    adeptaPresence: [],
    techRoll: 0,
    techLevel: "",
    defensePresence: [],
    defenseSize: [],
    defenseQuality: [],
    defenseDesc: []
};

var planet = {
    sizeRoll: 0,
    size: "",
    circum: 0,
    denRoll: 0,
    density: "",
    gravity: "",
    atmoRoll: 0,
    atmosphere: "",
    atmoPres: "",
    atmoType: "Breathable",
    atmoDesc: "Atmospheric gasses are able to support human life.",
    atmoCode: "OK",
    dayRoll: 0,
    dayLengthHours: 0,
    dayLengthTerranDays: 0,
    yearRoll: 0,
    yearLengthTerranDays: 0,
    yearLengthLocalDays: 0,
    yearLengthTerranYears: 0,
    tempRoll: 0,
    tempType: "",
    tempLow: 0,
    tempHigh: 0,
    tempRange: "",
    tiltRoll: 0,
    tiltDesc: "",
    tiltDegrees: 0,
    tiltString: "",
    hydroRoll: 0,
    hydroPercent: "",
    hydroDesc: "",
    terrainMods: [],
    terrainValues: [],
    terrainPercentages: [],
    terrainPresence: [],
    terrainDesc: [],
    classRoll: 0,
    classCode: -1,
    planetClass: "",
    prevClassCode: -1,
    planetPrevClass: "",
    popRoll: 0,
    population: "",
    popNum: 0,
    govRoll: 0,
    govType: "",
    govCode: -1,
    religRoll: 0,
    religion: "",
    religCode: -1,
    adeptaRolls: [],
    adeptaPresence: [],
    techRoll: 0,
    techLevel: "",
    defensePresence: [],
    defenseSize: [],
    defenseQuality: [],
    defenseDesc: []
};

function buildPlanetCard() {

    if (planet.prevClassCode != -1) {
        document.getElementById("prevTr").style = "";
    } else {
        document.getElementById("prevTr").style = "display:none";
    }

    for (key in planet) {
        try {
            document.getElementById(key.toString()).innerHTML = planet[key];
        } catch {

        }
    }

    document.getElementById("circumference").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"The circumference of Terra is 40,075 km\">" + planet.circum + "</span>"

    if (planet.religCode >= 0) {
        document.getElementById("religionTd").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + religionDescriptions[planet.religCode] + "\">" + planet.religion + "</span>"
    } else {
        document.getElementById("religionTd").innerHTML = planet.religion;
    }

    document.getElementById("class").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + classDescriptions[planet.classCode] + "\">" + planet.planetClass + "</span>"

    if (planet.prevClassCode >= 0) {
        document.getElementById("prevClass").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + classDescriptions[planet.prevClassCode] + "\">" + planet.planetPrevClass + "</span>"
    }

    if (planet.govCode >= 0) {
        document.getElementById("govTd").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + govtDescriptions[planet.govCode] + "\">" + planet.govType + "</span>"
    } else {
        document.getElementById("govTd").innerHTML = planet.govType;
    }

    document.getElementById("arbites").innerHTML = planet.adeptaPresence[0];
    document.getElementById("astraTelepathica").innerHTML = planet.adeptaPresence[1];
    document.getElementById("mechanicus").innerHTML = planet.adeptaPresence[2];
    document.getElementById("administratum").innerHTML = planet.adeptaPresence[3];
    document.getElementById("ministorum").innerHTML = planet.adeptaPresence[4];
    document.getElementById("inquisition").innerHTML = planet.adeptaPresence[5];
    document.getElementById("munitorium").innerHTML = planet.adeptaPresence[6];

    document.getElementById("enforcers").innerHTML = planet.defenseDesc[0];
    document.getElementById("militia").innerHTML = planet.defenseDesc[1];
    document.getElementById("army").innerHTML = planet.defenseDesc[2];
    document.getElementById("armouredForces").innerHTML = planet.defenseDesc[3];
    document.getElementById("titanLegions").innerHTML = planet.defenseDesc[4];
    document.getElementById("privateArmies").innerHTML = planet.defenseDesc[5];
    document.getElementById("navy").innerHTML = planet.defenseDesc[6];
    document.getElementById("stations").innerHTML = planet.defenseDesc[7];
    document.getElementById("planetMissiles").innerHTML = planet.defenseDesc[8];
    document.getElementById("orbitalMissiles").innerHTML = planet.defenseDesc[9];
    document.getElementById("lasers").innerHTML = planet.defenseDesc[10];
    document.getElementById("mercs").innerHTML = planet.defenseDesc[11];

    document.getElementById("chars").innerHTML = "";

    for (let i = 0; i < planet.terrainMods.length; i++) {
        document.getElementById("chars").innerHTML += "[" + planet.terrainMods[i] + "] ";
    }

    document.getElementById("terrainDetail").innerHTML = ""

    for (let i = 0; i < planet.terrainPercentages.length; i++) {
        if (planet.terrainPercentages[i] != 0) {
            document.getElementById("terrainDetail").innerHTML += planet.terrainDesc[i] + " " + terrain[i] + "&emsp;(" + planet.terrainPercentages[i] + "%) <br/>"
        }
    }

    document.getElementById("yearLength").innerHTML = "";

    document.getElementById("yearLength").innerHTML += planet.yearLengthLocalDays + "<br/>" + planet.yearLengthTerranYears;


    if (inRangeInclusive(planet.techRoll, "01-10")) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[0] + "\">" + planet.techLevel + "</span>"

    } else if (inRangeInclusive(planet.techRoll, "11-20")) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[1] + "\">" + planet.techLevel + "</span>"

    } else if (inRangeInclusive(planet.techRoll, "21-30")) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[2] + "\">" + planet.techLevel + "</span>"

    } else if (inRangeInclusive(planet.techRoll, "31-40")) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[3] + "\">" + planet.techLevel + "</span>"

    } else if (inRangeInclusive(planet.techRoll, "41-50")) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[4] + "\">" + planet.techLevel + "</span>"

    } else if (inRangeInclusive(planet.techRoll, "51-60")) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[5] + "\">" + planet.techLevel + "</span>"

    } else if (inRangeInclusive(planet.techRoll, "61-70")) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[6] + "\">" + planet.techLevel + "</span>"

    } else if (inRangeInclusive(planet.techRoll, "71-80")) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[7] + "\">" + planet.techLevel + "</span>"

    } else if (inRangeInclusive(planet.techRoll, "81-90")) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[8] + "\">" + planet.techLevel + "</span>"

    } else if (inRangeInclusive(planet.techRoll, "91-100")) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[9] + "\">" + planet.techLevel + "</span>"

    } else if (planet.techRoll > 100) {
        document.getElementById("tech").innerHTML = "<span class=\"toolTip\" data-toggle=\"tooltip\" title=\"" + techLevelDescriptions[10] + "\">" + planet.techLevel + "</span>"

    }




    $('[data-toggle="tooltip"]').tooltip();
}

function exportPlanet() {
    prompt("Your planet string:", JSON.stringify(planet));
}

function importPlanet() {
    var importedPlanet = JSON.parse(prompt("Paste your planet string:"))
    Object.assign(planet, importedPlanet);
    buildPlanetCard();
}

var terrainModifiers = {
    "Baseline": [40, 30, 60, 50, 50, 50, 30, 30, 20, 30, 30, 15, 35, 30, 30, 30, 40, 20, 50, 40],
    "Low Gravity": [0, 0, 30, 10, 20, 40, 40, 0, 0, -10, -10, 70, 10, 0, -10, 20, 20, 0, 10, 20],
    "High Gravity": [30, 30, -50, -40, -40, -50, -20, 0, 0, 10, 20, -15, -10, 10, -20, -20, -30, 0, -10, -35],
    "Non-existent Hydrographics": [-999, -999, -999, -999, -10, -10, -20, 10, 10, 0, 0, -20, -999, 40, -999, -25, -999, 30, -999, -30],
    "Low Hydrographics": [-10, 10, -20, -10, 0, 0, -10, 0, 0, 0, 10, -10, -10, 30, -20, -10, -20, 10, -30, -10],
    "High Hydrographics": [-10, -20, 30, 30, -10, -20, -10, 0, 0, 0, 30, 0, -20, -999, 40, 35, 30, -20, 30, 20],
    "Overwhelming Hydrographics": [-90, -90, -90, -90, -90, 0, -80, 15, 10, -90, -90, -80, -90, 0, -90, 40, -999, -999, -90, -90],
    "Low Temperature": [10, 10, -30, -20, 0, 0, 0, -20, -15, 0, 0, 0, 10, 30, -25, 10, -20, 0, 0, 10],
    "High Temperature": [-30, 20, -50, -40, 0, 0, 0, 20, 30, 0, 0, 0, -10, 40, -999, 0, -20, 40, -20, 0],
    "Non-existent Atmosphere": [-999, -999, -999, -999, -10, -20, -20, -20, -20, 0, -10, -10, -999, 90, -999, 0, -999, 40, -999, 20],
    "Thin Atmosphere": [-30, -20, -50, -40, -5, -10, -10, -10, -15, 0, 0, 0, -10, 30, -20, 0, -30, 20, -20, 10],
    "Dense Atmosphere": [30, 20, 10, 20, 5, 5, 0, 20, 20, 0, 0, 0, 0, -10, 10, 0, 5, -10, 0, 0],
    "Corrosive Atmosphere": [-10, -10, -20, -10, -10, -20, -10, 30, 30, 20, 10, 10, -10, 40, -20, 0, 10, 20, 0, -10],
    "Insidious Atmosphere": [-20, -20, -40, -20, -20, -40, -20, 50, 50, 30, 20, 20, -20, 50, -30, 0, 20, 30, 0, -20],
    "No Land": [-999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999]
}

var terrain = ["Grassland", "Savannah", "Continual Forest", "Broken Forest", "Hills", "Mountain", "Plateaus", "Dormant Volcanoes", "Active Volcanoes", "Broken Rock", "Flat Rock", "Columns", "Moors", "Barren", "Swamp", "Caves", "Ravines", "Sandy", "Islands", "Cliffs"]

var popClassMods = [40, 0, 20, 10, -20, -20, 0, -10, -20, 0, 0, 0, -40, -20, -30, 0, 0];

var popSizeMods = [-30, -20, -10, 0, 0, 0, 10, 20, 30, 40];

var classDescriptions = [
    "The most populous of Imperial worlds, with many large self-contained megacities each with populations in the billions. These worlds provide industrial labour to the Imperium, though the cities themselves are often riddled with crime",
    "A planet dedicated solely to the production of agricultural goods and food. Many planets, such as Hive and Forge worlds, are not capable of producing enough food for their population, and thus rely on Agri worlds to sustain them",
    "Directly controlled by the Adeptus Mechanicus, these worlds have a complete dedication to the manufacture of the various machines and devices of the Imperium",
    "Rich in natural resources, these worlds are often exploited for strategic materials. The population often consists of slaves or penal workers who spend their miserable lives extracting precious substances from the planet",
    "Also called a Civilised world, this is a planet without a dedicated purpose in the Imperium, the development of which has been allowed to progress \"naturally\". Often self-sufficient in terms of food supply and technology",
    "A world which the Imperium has chosen not to expose to their advanced technology. Often populated by many serfs and farmers, culturally and technologically similar to Terran society in the European Late Middle Ages",
    "A planet whose population consists of nomadic raiders and hunter-gatherers. These often have little oversight from the Imperium, and are more prone to developing local or heretical religions",
    "Dominated by the religion of the Imperial Cult, these worlds are covered in religious monuments and cathedrals. Often these were the birthplace of an Imperial Saint, or the location of another important religious event",
    "While the Forge worlds produce Imperial materiel of war, the Armoury worlds store it. These are heavily-defended stockpiles of munitions and equipment, often holding this treasure-trove for hundreds or thousands of years",
    "The playground of the Imperial elite, also known as a Paradise or Garden world. These are heavily cultured places, often with a large portion of their population dedicated just to the production and consumption of the fine arts",
    "For reasons possibly lost to time, the Imperium has decreed that none shall visit this planet, on penalty of death. Unlike a Forbidden world, these worlds were previously colonized and have only recently been lost to the Imperium",
    "A world consumed entirely by the vast war raging through the galaxy. This is a planet-wide battleground, under which the ruins of its previous existence as another planet class may sometimes be seen",
    "A world which is no longer capable of sustaining an ecosystem. These may have been another class of planet prior to an extinction event, and the Imperium will often re-colonise; either to establish research stations, or to maintain an important strategic location",
    "These worlds are generally recently-colonised by the Imperium, with a relatively small population of colonists. They may exist at the edge of Imperial space, where the threat of vast Xenos hordes is very close indeed. With little oversight from the Imperium, corruption and heresy often reign",
    "These worlds are near-impossible to colonise by Mankind due to their environmental conditions or the nature of their biospheres. Nonetheless, many of these worlds have large human settlements, which are notable for the strength and self-reliance of their people",
    "For reasons possibly lost to time, the Imperium has decreed that none shall visit this planet, on penalty of death",
    "The designation given to a planet by the Adeptus Administratum that lies outside of the bounds and control of the Imperium, and that is the homeworld or colony world of an intelligent alien species"
]

var governmentRanges = {
    "govtTypes": ["Democracy", "Meritocracy", "Elected Dictatorship", "Hereditary Dictatorship", "Tyrannical Dictatorship", "Elected Monarchy", "Hereditary Monarchy", "Oligarchy"],
    "Hive World": ["0-0", "0-0", "0-0", "01-20", "21-40", "0-0", "41-50", "51-100"],
    "Agri World": ["01-15", "16-40", "41-50", "51-55", "56-65", "66-70", "71-80", "81-100"],
    "Forge World": ["0-0", "01-20", "0-0", "21-40", "41-50", "0-0", "51-55", "56-100"],
    "Mining World": ["01-05", "0-0", "06-10", "11-35", "36-60", "61-65", "66-75", "76-100"],
    "Developing World": ["01-30", "31-35", "36-45", "46-55", "56-60", "61-65", "66-70", "71-100"],
    "Feudal World": ["0-0", "0-0", "01-05", "06-30", "31-60", "61-65", "66-95", "96-100"],
    "Feral World": ["0-0", "01-20", "0-0", "21-30", "31-45", "0-0", "46-50", "51-100"],
    "Shrine World": ["0-0", "01-05", "06-15", "16-45", "46-80", "0-0", "81-85", "86-100"],
    "Armoury World": ["0-0", "01-05", "06-30", "31-50", "51-60", "61-65", "66-70", "71-100"],
    "Pleasure World": ["01-05", "0-0", "06-10", "11-50", "51-60", "61-65", "66-80", "81-100"],
    "Death World": ["01-10", "11-40", "41-50", "51-55", "56-80", "81-85", "86-90", "91-100"],
    "Frontier World": ["01-60", "61-70", "71-75", "76-80", "81-85", "0-0", "0-0", "86-100"]
}

var govtDescriptions = [
    "A government ruled by the people, where the citizens take part in decisions that affect the way the government is run",
    "A government wherein societal rank is determined by ability and talent. Progress in society is directly tied to the capability of the individual",
    "One individual has absolute authority, though that person is put in power by the will of the people",
    "One individual has absolute authority. Absolute rule is passed on to the previous ruler's child",
    "The ruler has seized absolute power through conquest or oppression of the people",
    "The monarch must have been put in power by the will of the people. Unlike a dictator, they do not have absolute authority",
    "The throne is passed from parent to child. Unlike a dictator, a monarch does not have absolute authority",
    "Authority rests with a small group, generally unelected. This may be the wealthy or those with vast military power"

]

var religionRanges = {
    "religionTypes": ["Local Religion", "Imperial Cult", "Machine God", "Heretical"],
    "Hive World": ["01-05", "06-80", "81-95", "96-100"],
    "Agri World": ["01-20", "21-90", "91-95", "96-100"],
    "Forge World": ["01-05", "06-10", "11-95", "96-100"],
    "Mining World": ["01-05", "06-70", "71-95", "96-100"],
    "Developing World": ["01-75", "75-90", "91-95", "96-100"],
    "Feudal World": ["01-30", "31-85", "0-0", "86-100"],
    "Feral World": ["01-60", "61-65", "0-0", "66-100"],
    "Shrine World": ["0-0", "01-95", "0-0", "96-100"],
    "Armoury World": ["01-05", "06-70", "71-95", "96-100"],
    "Pleasure World": ["01-05", "06-75", "0-0", "76-100"],
    "Death World": ["01-20", "21-85", "0-0", "86-100"],
    "Frontier World": ["01-20", "21-75", "76-80", "81-100"]
}

var religionDescriptions = ["A Local religion is one that follows the Imperial Cult in all but name. It may contain an Emperor-like figure and have saints that fulfill the same function as Imperial Cult saints. Whether through ignorance or tradition, some worlds practice their own brand of the Imperial Creed",
    "The Imperial Cult venerates the Emperor as the Master of Mankind. It is the predominant religion in the Imperium of Man",
    "A Machine God religion is a very focused brand of a local religion, in which the Emperor is regarded as the Omnissiah, and the Machine Spirit is worshipped alongside that of the Emperor",
    "A Heretical religion is one that blasphemes against the Emperor and devotes its worshippers to the dark gods of Chaos, or unsanctions perversions of the Imperial Cult."
]

var adeptaRolls = {
    "adeptaTypes": ["Arbites", "Astra Telepathica", "Mechanicus", "Administratum", "Ministorum", "Inquisition", "Munitorium"],
    "Hive World": ["3d10", "3d10", "2d10", "4d10", "3d10", "3d10", "2d10"],
    "Agri World": ["1d10", "1d10", "1d10", "2d10", "2d10", "1d5", "1d10"],
    "Forge World": ["1d10", "1d10", "5d10", "2d10", "1d5", "1d10", "2d10"],
    "Mining World": ["1d5", "1d5", "3d10", "2d10", "2d10", "1d5", "1d10"],
    "Developing World": ["1d5", "1d5", "1d10", "1d10", "1d10", "1d5", "1d10"],
    "Feudal World": ["-", "1d5", "-", "1d5", "1d10", "1d5", "1d5"],
    "Feral World": ["-", "-", "-", "-", "-", "1d5", "-"],
    "Shrine World": ["1d10", "1d5", "1d5", "2d10", "4d10", "1d5", "1d5"],
    "Armoury World": ["1d5", "1d10", "1d5", "2d10", "1d10", "1d5", "4d10"],
    "Pleasure World": ["2d10", "2d10", "1d5", "2d10", "2d10", "1d10", "1d5"],
    "Death World": ["-", "-", "1d5", "1d10", "1d10", "1d5", "1d10"],
    "Frontier World": ["-", "1d5", "1d10", "1d10", "1d5", "1d5", "2d10"]
}

var techLevelDescriptions = [
    "Inhabited by people who live in small family groups, dwell in caves or rough shelters, and use only the most basic tools made of stone",
    "The inhabitants have started to learn how to shape and work iron, and live in more substantial buildings. Small farms may be found",
    "Metallurgy and the use of alloys have been developed. Farming and trade are the primary way of life. Ruling classes live in stone castles",
    "While the poor still toil on farms, a richer upper-class has developed, and makes use of rudimentary technology such as the printing press",
    "Everything is mechanised and automated. The population mostly lives in large cities, and computers are starting to become common. Solid projectile weapons are the norm for military forces",
    "The planet has developed basic space flight, and may have established settlements on orbiting moons or nearby planets. Basic las weapons may have been developed",
    "The local system has been explored, and viable planets colonised. Las weapons are common, and cybernetics are becoming more practical",
    "The advanced technologies of the Imperium can be found here, but are not always available. Rare, expensive, or high-tech items are unavailable most of the time",
    "The median technology level in the Imperium. Most of of the Imperium's technology can be found on these worlds, with only the most obscure being unavailable",
    "The peak of Imperial technology can be found here. Anything and everything that can be found on the open market may be bought here, and the local troops have access to the most advanced weapons, armour, and equipment",
    "This world has access to otherwise limited or developing technology. Normally only the greatest of Hive or Forge worlds have this level of technology, though the mysterious technology of a Xenos world may qualify"
]

function inRangeInclusive(num, range) {
    let lowerBound = Number(range.split("-")[0]);
    let upperBound = Number(range.split("-")[1]);

    return (num >= lowerBound && num <= upperBound);
}

function sumArr(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}

function roll(str) {

    if (str == "-") {
        return 1;
    }

    let numRolls = Number(str.split("d")[0]);
    let diceValue = Number(str.split("d")[1]);

    let result = [];

    for (let i = 0; i < numRolls; i++) {
        result.push(Math.floor((Math.random() * diceValue) + 1))
    }

    let total = sumArr(result);

    return total;
}

function randBtwn(min, max, len = 2) {
    return (Math.random() * (max - min + 1) + min).toFixed(len);
}


function buildPlanet() {
    Object.assign(planet, planetDefault);

    findSize();
    findDen();
    findAtmo();
    findDayLengthHours();
    findYearLength();

    planet.dayLengthHours += " standard hours";
    planet.yearLengthLocalDays = comma(planet.yearLengthLocalDays) + " local days";
    planet.yearLengthTerranYears += " Terran years";

    findTemp();
    findTilt();
    addTempVariance();
    findHydro();
    findTerrain();
    findClass();
    findPop();
    findGovt();
    findReligion();
    findAdepta();
    findTechLevel();
    findDefenses();

    buildPlanetCard();
}


function displayPlanet() {
    var tbody = document.getElementById('planet');
    tbody.innerHTML = "";
    for (var key in planet) {
        var tr = "<tr id=\"" + key + "\">";
        tr += "<td>" + key + "</td>" + "<td>" + planet[key] + "</td>"
        tbody.innerHTML += tr;
    }
}

function hide() {
    document.getElementById("genBtn").style = "display:none;";
    document.getElementById("hideBtn").style = "display:none;";

    document.getElementById("sizeRoll").style = "display:none;";
    document.getElementById("denRoll").style = "display:none;";
    document.getElementById("atmoRoll").style = "display:none;";
    document.getElementById("dayRoll").style = "display:none;";
    document.getElementById("yearRoll").style = "display:none;";
    document.getElementById("tempRoll").style = "display:none;";
    document.getElementById("tiltRoll").style = "display:none;";
    document.getElementById("hydroRoll").style = "display:none;";
    document.getElementById("classRoll").style = "display:none;";
    document.getElementById("popRoll").style = "display:none;";
    document.getElementById("govRoll").style = "display:none;";
    document.getElementById("religRoll").style = "display:none;";
    document.getElementById("adeptaRolls").style = "display:none;";
}

function comma(x) {
    if (x > 999) {
        return (Math.floor(parseFloat(x))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else if ((parseFloat(x) - parseFloat(x).toFixed(0)) != 0) {
        x = parseFloat(x).toFixed(1);
        return x.toString();
    } else {
        x = parseFloat(x).toFixed(0);
        return x.toString();
    }
}

function findSize() {
    let rollNum = roll("1d10");

    planet.sizeRoll = rollNum;

    switch (rollNum) {
        case 1:
            planet.size = "Miniscule";
            planet.circum = comma(roll("1d10") + 4 * 1000) + " km";
            break;
        case 2:
            planet.size = "Tiny";
            planet.circum = comma(roll("2d10") * 1000) + " km";
            break;
        case 3:
            planet.size = "Small";
            planet.circum = comma(roll("4d10") * 1000) + " km";
            break;
        case 4:
        case 5:
        case 6:
            planet.size = "Average";
            planet.circum = comma(roll("10d10") * 1000) + " km";
            break;
        case 7:
            planet.size = "Large";
            planet.circum = comma(roll("10d10") * 2 * 1000) + " km";
            break;
        case 8:
            planet.size = "Huge";
            planet.circum = comma(roll("10d10") * 3 * 1000) + " km";
            break;
        case 9:
            planet.size = "Enormous";
            planet.circum = comma(roll("10d10") * 4 * 1000) + " km";
            break;
        case 10:
            planet.size = "Massive";
            planet.circum = comma(roll("10d10") * 5 * 1000) + " km";
            break;
    }
}

function findDen() {
    let rollNum = roll("1d10") - 4 + planet.sizeRoll;

    planet.denRoll = rollNum;

    if (rollNum < 1) {
        rollNum = 1;
    } else if (rollNum > 12) {
        rollNum = 12;
    }

    switch (rollNum) {
        case 1:
            planet.density = "Negligible";
            planet.gravity = "Negligible";
            break;
        case 2:
            planet.density = "Very Low";
            planet.gravity = randBtwn(1, 4, 2) * 0.01 + " G";
            break;
        case 3:
            planet.density = "Low";
            planet.gravity = (randBtwn(5, 10) * 0.01).toFixed(2) + " G";
            break;
        case 4:
            planet.density = "Light";
            planet.gravity = (randBtwn(20, 40) * 0.01).toFixed(2) + " G";
            break;
        case 5:
            planet.density = "Below Average";
            planet.gravity = (randBtwn(50, 70) * 0.01).toFixed(2) + " G";
            break;
        case 6:
            planet.density = "Average";
            planet.gravity = (randBtwn(80, 120) * 0.01).toFixed(2) + " G";
            break;
        case 7:
            planet.density = "Above Average";
            planet.gravity = (randBtwn(130, 170) * 0.01).toFixed(2) + " G";
            break;
        case 8:
            planet.density = "Heavy";
            planet.gravity = (randBtwn(180, 200) * 0.01).toFixed(2) + " G";
            break;
        case 9:
            planet.density = "Very Heavy";
            planet.gravity = (randBtwn(210, 250) * 0.01).toFixed(2) + " G";
            break;
        case 10:
            planet.density = "Huge";
            planet.gravity = (randBtwn(260, 270) * 0.01).toFixed(2) + " G";
            break;
        case 11:
            planet.density = "Enormous";
            planet.gravity = (randBtwn(280, 300) * 0.01).toFixed(2) + " G";
            break;
        case 12:
            planet.density = "Massive";
            planet.gravity = "3.1+ G";
            break;
    }
}

function findAtmo() {
    let rollNum = roll("1d10") - 4 + Math.ceil(planet.sizeRoll / 2) + Math.ceil(planet.denRoll / 2);

    if (rollNum < 0) {
        rollNum = 0;
    } else if (rollNum > 15) {
        rollNum = 15;
    }

    planet.atmoRoll = rollNum;

    switch (rollNum) {
        case 0:
            planet.atmosphere = "None";
            planet.atmoPres = "0 atm";
            planet.atmoType = "None"
            planet.atmoDesc = "This planet has no atmospheric pressure at all."
            break;
        case 1:
            planet.atmosphere = "Trace";
            planet.atmoPres = (randBtwn(1, 9) * 0.001).toFixed(2) + " atm"
            break;
        case 2:
            planet.atmosphere = "Very Thin";
            planet.atmoPres = (randBtwn(10, 42) * 0.01).toFixed(2) + " atm"
            planet.atmoType = "Tainted"
            planet.atmoDesc = "Harmful to humans, can only be breathed for a short time before causing unconsciousness and, soon thereafter, death."
            break;
        case 3:
            planet.atmosphere = "Very Thin";
            planet.atmoPres = (randBtwn(10, 42) * 0.01).toFixed(2) + " atm"
            break;
        case 4:
            planet.atmosphere = "Thin";
            planet.atmoPres = (randBtwn(43, 70) * 0.01).toFixed(2) + " atm"
            planet.atmoType = "Tainted"
            planet.atmoDesc = "Harmful to humans, can only be breathed for a short time before causing unconsciousness and, soon thereafter, death."
            break;
        case 5:
            planet.atmosphere = "Thin";
            planet.atmoPres = (randBtwn(43, 70) * 0.01).toFixed(2) + " atm"
            break;
        case 6:
            planet.atmosphere = "Standard";
            planet.atmoPres = (randBtwn(71, 149) * 0.01).toFixed(2) + " atm"
            break;
        case 7:
            planet.atmosphere = "Standard";
            planet.atmoPres = (randBtwn(71, 149) * 0.01).toFixed(2) + " atm"
            planet.atmoType = "Tainted"
            planet.atmoDesc = "Harmful to humans, can only be breathed for a short time before causing unconsciousness and, soon thereafter, death."
            break;
        case 8:
            planet.atmosphere = "Dense";
            planet.atmoPres = (randBtwn(150, 249) * 0.01).toFixed(2) + " atm"
            break;
        case 9:
            planet.atmosphere = "Dense";
            planet.atmoPres = (randBtwn(150, 249) * 0.01).toFixed(2) + " atm"
            planet.atmoType = "Tainted"
            planet.atmoDesc = "Harmful to humans, can only be breathed for a short time before causing unconsciousness and, soon thereafter, death."
            break;
        case 10:
            planet.atmosphere = "Exotic";
            planet.atmoPres = "Varies";
            planet.atmoType = "Exotic",
                planet.atmoDesc = "Unbreathable to humans, but not otherwise hazardous. Requires an air supply for survival.",
                planet.atmoCode = "A"
            break;
        case 11:
            planet.atmosphere = "Corrosive";
            planet.atmoPres = "Varies";
            planet.atmoType = "Corrosive",
                planet.atmoDesc = "Causes damage to lungs when breathed. Quickly causes unconsciousness followed shortly by death.",
                planet.atmoCode = "B"
            break;
        case 12:
            planet.atmosphere = "Insidious";
            planet.atmoPres = "Varies";
            planet.atmoType = "Insidious",
                planet.atmoDesc = "Harmful to gear as well as people. Will get around seals after 2d6 hours on average, but maintenance and better gear can protect.",
                planet.atmoCode = "C"
            break;
        case 13:
            planet.atmosphere = "Dense";
            planet.atmoPres = "2.5+ atm";
            planet.atmoType = "Dense, High",
                planet.atmoDesc = "Surface pressure too high to support unprotected human life. High enough altitudes yield habitable atmosphere",
                planet.atmoCode = "D"
            break;
        case 14:
            planet.atmosphere = "Thin";
            planet.atmoPres = "0.5 atm or less";
            planet.atmoType = "Thin, Low",
                planet.atmoDesc = "Lowlands and depressions may have habitable atmosphere, but regular altitude is near vacuum",
                planet.atmoCode = "E"
            break;
        case 15:
            planet.atmosphere = "Unusual";
            planet.atmoPres = "Varies";
            planet.atmoType = "Unusual",
                planet.atmoDesc = "Strange atmospheres - elliptical (thin at poles thick at equator), rocky world surrounded by water layer, huge storms, etc",
                planet.atmoCode = "F"
            break;
    }
}

function findDayLengthHours() {
    let rollNum = roll("1d10") - 4 + planet.sizeRoll;

    if (rollNum < 1) {
        rollNum = 1;
    } else if (rollNum > 13) {
        rollNum = 13;
    }

    planet.dayRoll = rollNum;

    switch (rollNum) {
        case 1:
            planet.dayLengthHours = roll("1d5");
            break;
        case 2:
            planet.dayLengthHours = roll("1d10");
            break;
        case 3:
            planet.dayLengthHours = roll("2d10");
            break;
        case 4:
            planet.dayLengthHours = roll("3d10");
            break;
        case 5:
            planet.dayLengthHours = roll("4d10");
            break;
        case 6:
            planet.dayLengthHours = roll("5d10");
            break;
        case 7:
            planet.dayLengthHours = roll("6d10");
            break;
        case 8:
            planet.dayLengthHours = roll("7d10");
            break;
        case 9:
            planet.dayLengthHours = roll("8d10");
            break;
        case 10:
            planet.dayLengthHours = roll("9d10");
            break;
        case 11:
            planet.dayLengthHours = roll("10d10");
            break;
        case 12:
            planet.dayLengthHours = roll("10d10") * 2;
            break;
        case 13:
            planet.dayLengthHours = roll("10d10") * 3;
            break;
    }

    planet.dayLengthTerranDays = (planet.dayLengthHours / 24).toFixed(2);
}

function findYearLength() {
    let rollNum = roll("1d10");

    planet.yearRoll = rollNum;

    switch (rollNum) {
        case 1:
            planet.yearLengthTerranDays = roll("10d10");
            break;
        case 2:
            planet.yearLengthTerranDays = roll("10d10") * 2;
            break;
        case 3:
            planet.yearLengthTerranDays = roll("10d10") * 3;
            break;
        case 4:
            planet.yearLengthTerranDays = roll("10d10") * 4;
            break;
        case 5:
            planet.yearLengthTerranDays = roll("10d10") * 5;
            break;
        case 6:
            planet.yearLengthTerranDays = roll("10d10") * 6;
            break;
        case 7:
            planet.yearLengthTerranDays = roll("10d10") * 7;
            break;
        case 8:
            planet.yearLengthTerranDays = roll("10d10") * 8;
            break;
        case 9:
            planet.yearLengthTerranDays = roll("10d10") * 9;
            break;
        case 10:
            planet.yearLengthTerranDays = roll("10d10") * 10;
            break;
    }

    planet.yearLengthLocalDays = ((planet.yearLengthTerranDays * 24) / planet.dayLengthHours).toFixed(0);
    planet.yearLengthTerranYears = (planet.yearLengthTerranDays / 365).toFixed(2);
}

function findTemp() {
    let rollNum = roll("1d10") + 1;

    if (planet.atmoRoll == 2 || planet.atmoRoll == 3) {
        rollNum -= 2
    } else if (planet.atmoRoll == 4 || planet.atmoRoll == 5 || planet.atmoCode == "E") {
        rollNum -= 1
    } else if (planet.atmoRoll == 8 || planet.atmoRoll == 9) {
        rollNum += 1
    } else if (planet.atmoCode == "A" || planet.atmoCode == "D" || planet.atmoCode == "F") {
        rollNum += 2
    } else if (planet.atmoCode == "B" || planet.atmoCode == "C") {
        rollNum += 6
    }

    if (rollNum < 1) {
        rollNum = 1;
    } else if (rollNum > 13) {
        rollNum = 13;
    }

    planet.tempRoll = rollNum;

    switch (rollNum) {
        case 1:
            planet.tempType = "Frozen";
            planet.tempLow = -999;
            planet.tempHigh = -81;
            break;
        case 2:
            planet.tempType = "Cold";
            planet.tempLow = -80;
            planet.tempHigh = -31;
            break;
        case 3:
        case 4:
            planet.tempType = "Chilly";
            planet.tempLow = -30;
            planet.tempHigh = 0;
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            planet.tempType = "Temperate";
            planet.tempLow = 0;
            planet.tempHigh = 30;
            break;
        case 10:
        case 11:
            planet.tempType = "Warm";
            planet.tempLow = 31;
            planet.tempHigh = 50;
            break;
        case 12:
            planet.tempType = "Hot";
            planet.tempLow = 51;
            planet.tempHigh = 80;
            break;
        case 13:
            planet.tempType = "Roasting";
            planet.tempLow = 81;
            planet.tempHigh = 999;
            break;
    }

    if (planet.atmoRoll <= 1) {
        planet.tempType = "Variable";
        planet.tempLow = -999;
        planet.tempHigh = 999;
    }
}

function findTilt() {
    let rollNum = roll("1d10");

    planet.tiltRoll = rollNum;

    switch (rollNum) {
        case 1:
            planet.tiltDesc = "None";
            planet.tiltDegrees = 0;
            break;
        case 2:
            planet.tiltDesc = "Slight";
            planet.tiltDegrees = randBtwn(1, 5);
            break;
        case 3:
        case 4:
            planet.tiltDesc = "Notable";
            planet.tiltDegrees = randBtwn(6, 15);
            break;
        case 5:
        case 6:
        case 7:
            planet.tiltDesc = "Moderate";
            planet.tiltDegrees = randBtwn(16, 25);
            break;
        case 8:
            planet.tiltDesc = "Large";
            planet.tiltDegrees = randBtwn(26, 35);
            break;
        case 9:
            planet.tiltDesc = "Severe";
            planet.tiltDegrees = randBtwn(36, 45);
            break;
        case 10:
            planet.tiltDesc = "Extreme";
            planet.tiltDegrees = randBtwn(45, 90);
            break;
    }

    planet.tiltString = planet.tiltDesc + ", " + planet.tiltDegrees + "°";
}

function addTempVariance() {
    switch (planet.tiltDesc) {
        case "Slight":
            planet.tempLow -= 5;
            planet.tempHigh += 5;
            break;
        case "Notable":
            planet.tempLow -= 10;
            planet.tempHigh += 10;
            break;
        case "Moderate":
            planet.tempLow -= 20;
            planet.tempHigh += 20;
            break;
        case "Large":
            planet.tempLow -= 30;
            planet.tempHigh += 30;
            break;
        case "Severe":
            planet.tempLow -= 40;
            planet.tempHigh += 40;
            break;
        case "Extreme":
            planet.tempLow -= 50;
            planet.tempHigh += 50;
            break;
    }

    if (planet.tempType == "Variable") {
        planet.tempLow = "-81 or less";
        planet.tempHigh = "81 or higher";
    } else if (planet.tempType == "Frozen") {
        planet.tempLow = "-273.15";
        planet.tempHigh = "-81"
    } else if (planet.tempType == "Roasting") {
        planet.tempLow = "81";
        planet.tempHigh = "???";
    } else {
        planet.tempLow = planet.tempLow.toString();
        planet.tempHigh = planet.tempHigh.toString();
    }

    planet.tempRange = planet.tempLow + " to " + planet.tempHigh + " (°C)";
}

function findHydro() {
    let rollNum = roll("1d10") - 4 + planet.sizeRoll;

    if (planet.sizeRoll == 1 || planet.atmoRoll == 0) {
        rollNum = 0;
    } else if (planet.atmoRoll == 1 || planet.atmoCode == "A" || planet.atmoCode == "B" || planet.atmoCode == "C") {
        rollNum -= 4;
    } else if (planet.atmoCode != "D") {
        if (planet.tempType == "Warm") {
            rollNum -= 2;
        } else if (planet.tempType == "Hot") {
            rollNum -= 4;
        } else if (planet.tempType == "Roasting") {
            rollNum -= 6;
        }
    }

    if (rollNum < 0) {
        rollNum = 0;
    } else if (rollNum > 10) {
        rollNum = 10;
    }

    planet.hydroRoll = rollNum;

    switch (rollNum) {
        case 0:
            planet.hydroPercent = Math.floor(randBtwn(0, 5)) + "%";
            planet.hydroDesc = "A desert world";
            break;
        case 1:
            planet.hydroPercent = Math.floor(randBtwn(6, 15)) + "%";
            planet.hydroDesc = "A dry world";
            break;
        case 2:
            planet.hydroPercent = Math.floor(randBtwn(16, 25)) + "%";
            planet.hydroDesc = "A world with a few small seas";
            break;
        case 3:
            planet.hydroPercent = Math.floor(randBtwn(26, 35)) + "%";
            planet.hydroDesc = "A world with small seas and oceans";
            break;
        case 4:
            planet.hydroPercent = Math.floor(randBtwn(36, 45)) + "%";
            planet.hydroDesc = "A world with many seas and moderately-sized oceans";
            break;
        case 5:
            planet.hydroPercent = Math.floor(randBtwn(46, 55)) + "%";
            planet.hydroDesc = "A world with large oceans between huge continents";
            break;
        case 6:
            planet.hydroPercent = Math.floor(randBtwn(56, 65)) + "%";
            planet.hydroDesc = "A world with large continents surrounded by many large oceans";
            break;
        case 7:
            planet.hydroPercent = Math.floor(randBtwn(66, 75)) + "%";
            planet.hydroDesc = "A world with medium-sized continents surrounded by many large oceans";
            break;
        case 8:
            planet.hydroPercent = Math.floor(randBtwn(76, 85)) + "%";
            planet.hydroDesc = "A water world with small continents";
            break;
        case 9:
            planet.hydroPercent = Math.floor(randBtwn(86, 95)) + "%";
            planet.hydroDesc = "A world with only a few small islands and archipelagos";
            break;
        case 10:
            planet.hydroPercent = Math.floor(randBtwn(96, 100)) + "%";
            if (Number(planet.hydroPercent.substring(0, planet.hydroPercent.length - 1)) < 100){
                planet.hydroDesc = "A world that is almost entirely water";
            } else if (Number(planet.hydroPercent.substring(0, planet.hydroPercent.length - 1)) >= 100){
                planet.hydroDesc = "A world that is entirely covered by water";
            }            
            break;
    }
}

function findTerrain() {
    let modifiers = [];
    planet.terrainMods = modifiers;
    planet.terrainValues = [];

    planetDefault.terrainValues = [];
    planetDefault.terrainPercentages = [];
    planetDefault.terrainPresence = [];
    planetDefault.terrainDesc = [];


    let DoS = 0;

    if (planet.denRoll <= 4) {
        modifiers.push("Low Gravity")
    }
    if (planet.denRoll >= 7) {
        modifiers.push("High Gravity")
    }
    if (planet.hydroRoll <= 1) {
        modifiers.push("Non-existent Hydrographics")
    }
    if (planet.hydroRoll == 2 || planet.hydroRoll == 3) {
        modifiers.push("Low Hydrographics")
    }
    if (planet.hydroRoll == 8 || planet.hydroRoll == 9) {
        modifiers.push("High Hydrographics")
    }
    if (planet.hydroRoll == 10) {
        modifiers.push("Overwhelming Hydrographics")
    }
    if (planet.tempRoll <= 4) {
        modifiers.push("Low Temperature")
    }
    if (planet.tempRoll >= 10) {
        modifiers.push("High Temperature")
    }
    if (planet.atmoRoll <= 1) {
        modifiers.push("Non-existent Atmosphere")
    }
    if ((planet.atmoRoll >= 2 && planet.atmoRoll <= 5) || planet.atmoCode == "E") {
        modifiers.push("Thin Atmosphere")
    }
    if ((planet.atmoRoll >= 8 && planet.atmoRoll <= 9) || planet.atmoCode == "D") {
        modifiers.push("Dense Atmosphere")
    }
    if (planet.atmoCode == "B") {
        modifiers.push("Corrosive Atmosphere")
    }
    if (planet.atmoCode == "C") {
        modifiers.push("Insidious Atmosphere")
    }
    if (Number(planet.hydroPercent.substring(0, planet.hydroPercent.length - 1)) >= 100) {
        modifiers.push("No Land")
    }

    planet.terrainMods = modifiers;

    let terrainChecks = [];

    for (let i = 0; i < terrain.length; i++) {
        terrainChecks.push(terrainModifiers["Baseline"][i]);
    }

    for (let i = 0; i < modifiers.length; i++) {
        for (let j = 0; j < terrainChecks.length; j++) {
            let combi = terrainChecks[j] + terrainModifiers[modifiers[i]][j];
            if (combi < 0) {
                combi = 0;
            }
            terrainChecks[j] = combi;
        }
    }

    for (let i = 0; i < terrain.length; i++) {
        let rollNum = roll("1d100");

        let terrainCheckNum = terrainChecks[i] - rollNum;

        if (terrainCheckNum < 0) {
            terrainCheckNum = 0;
        }

        planet.terrainValues.push(terrainCheckNum);

    }

    let terrainTotal = sumArr(planet.terrainValues);

    for (let i = 0; i < planet.terrainValues.length; i++) {
        if (planet.terrainValues[i] != 0) {
            planet.terrainPercentages[i] = ((planet.terrainValues[i] / terrainTotal) * 100).toFixed(2);
        } else {
            planet.terrainPercentages[i] = 0;
        }
    }

    for (let i = 0; i < planet.terrainPercentages.length; i++) {
        planet.terrainPresence[i] = planet.terrainPercentages[i] + "% " + terrain[i];
    }

    planet.terrainPresence = planet.terrainPresence.filter(pres => Number(pres[0]) > 0 || Number(pres[1] > 0) || Number(pres[2] > 0) || Number(pres[3] > 0) || Number(pres[4] > 0))

    for (let i = 0; i < planet.terrainPercentages.length; i++) {

        let val = Number(planet.terrainPercentages[i]);

        if (val == 0) {
            planet.terrainDesc[i] = ("None");
        } else if (val > 0 && val < 7) {
            planet.terrainDesc[i] = ("Insignificant");
        } else if (val >= 7 && val < 20) {
            planet.terrainDesc[i] = ("Mild");
        } else if (val >= 20 && val < 40) {
            planet.terrainDesc[i] = ("Common");
        } else if (val >= 40 && val < 60) {
            planet.terrainDesc[i] = ("Widespread");
        } else if (val >= 60 && val < 80) {
            planet.terrainDesc[i] = ("Near Total");
        } else if (val >= 80) {
            planet.terrainDesc[i] = ("Dominating");
        }
    }
}

function findClass(prim = true) {
    let rollNum = roll("1d100");

    if (!prim) {
        while (rollNum >= 73 && rollNum <= 87) {
            rollNum = roll("1d100");
        }
    }

    if (prim) {
        planet.classRoll = rollNum;
    }

    if (rollNum >= 1 && rollNum <= 15) {
        if (prim) {
            planet.planetClass = "Hive World";
            planet.classCode = 0;
        } else {
            planet.planetPrevClass = "Hive World";
            planet.prevClassCode = 0;
        }

    } else if (rollNum >= 16 && rollNum <= 20) {
        if (prim) {
            planet.planetClass = "Agri World";
            planet.classCode = 1;
        } else {
            planet.planetPrevClass = "Agri World";
            planet.prevClassCode = 1;
        }

    } else if (rollNum >= 21 && rollNum <= 30) {
        if (prim) {
            planet.planetClass = "Forge World";
            planet.classCode = 2;
        } else {
            planet.planetPrevClass = "Forge World";
            planet.prevClassCode = 2;
        }

    } else if (rollNum >= 31 && rollNum <= 35) {
        if (prim) {
            planet.planetClass = "Mining World";
            planet.classCode = 3;
        } else {
            planet.planetPrevClass = "Mining World";
            planet.prevClassCode = 3;
        }

    } else if (rollNum >= 36 && rollNum <= 45) {
        if (prim) {
            planet.planetClass = "Developing World";
            planet.classCode = 4;
        } else {
            planet.planetPrevClass = "Developing World";
            planet.prevClassCode = 4;
        }

    } else if (rollNum >= 46 && rollNum <= 55) {
        if (planet.atmoCode != "A" && planet.atmoCode != "B" && planet.atmoCode != "C" && planet.atmoRoll > 3 && planet.atmoRoll != 8 && planet.atmoRoll != 9) {
            planet.planetClass = "Feudal World";
            planet.classCode = 5;
        } else {
            findClass();
        }

    } else if (rollNum >= 56 && rollNum <= 60) {
        if (planet.atmoCode != "A" && planet.atmoCode != "B" && planet.atmoCode != "C" && planet.atmoRoll > 3 && planet.atmoRoll != 8 && planet.atmoRoll != 9) {
            planet.planetClass = "Feral World";
            planet.classCode = 6;
        } else {
            findClass();
        }

    } else if (rollNum >= 61 && rollNum <= 65) {
        if (prim) {
            planet.planetClass = "Shrine World";
            planet.classCode = 7;
        } else {
            planet.planetPrevClass = "Shrine World";
            planet.prevClassCode = 7;
        }

    } else if (rollNum >= 66 && rollNum <= 68) {
        if (prim) {
            planet.planetClass = "Armoury World";
            planet.classCode = 8;
        } else {
            planet.planetPrevClass = "Armoury World";
            planet.prevClassCode = 8;
        }

    } else if (rollNum >= 69 && rollNum <= 72) {
        if (prim) {
            planet.planetClass = "Pleasure World";
            planet.classCode = 9;
        } else {
            planet.planetPrevClass = "Pleasure World";
            planet.prevClassCode = 9;
        }

    } else if (rollNum >= 73 && rollNum <= 75) {
        planet.planetClass = "Quarantined World";
        planet.classCode = 10;
        findClass(false);

    } else if (rollNum >= 76 && rollNum <= 84) {
        planet.planetClass = "War World";
        planet.classCode = 11;
        findClass(false);

    } else if (rollNum >= 85 && rollNum <= 87) {
        planet.planetClass = "Dead World";
        planet.classCode = 12;
        findClass(false);

    } else if (rollNum >= 88 && rollNum <= 90) {
        if (prim) {
            planet.planetClass = "Frontier World";
            planet.classCode = 13;
        } else {
            planet.planetPrevClass = "Frontier World";
            planet.prevClassCode = 13;
        }

    } else if (rollNum >= 91 && rollNum <= 95) {
        if (prim) {
            planet.planetClass = "Death World";
            planet.classCode = 14;
        } else {
            planet.planetPrevClass = "Death World";
            planet.prevClassCode = 14;
        }

    } else if (rollNum >= 96 && rollNum <= 98) {
        if (prim) {
            planet.planetClass = "Forbidden World";
            planet.classCode = 15;
        } else {
            planet.planetPrevClass = "Forbidden World";
            planet.prevClassCode = 15;
        }

    } else if (rollNum >= 99 && rollNum <= 100) {
        if (prim) {
            planet.planetClass = "Xenos World";
            planet.classCode = 16;
        } else {
            planet.planetPrevClass = "Xenos World";
            planet.prevClassCode = 16;
        }

    }
}

function findPop() {
    let rollNum = roll("1d100") + popClassMods[planet.classCode] + popSizeMods[planet.sizeRoll - 1];

    if (rollNum < 1) {
        rollNum = 1;
    }

    planet.popRoll = rollNum;

    if (rollNum >= 1 && rollNum <= 5) {
        let pop = roll("10d10");
        planet.popNum = pop;
        planet.population = pop;
    } else if (rollNum >= 6 && rollNum <= 10) {
        let pop = roll("10d10") * 10;
        planet.popNum = pop;
        planet.population = pop;
    } else if (rollNum >= 11 && rollNum <= 15) {
        let pop = roll("10d10") * 100;
        planet.popNum = pop;
        planet.population = pop;
    } else if (rollNum >= 16 && rollNum <= 20) {
        let pop = roll("10d10") * 1000;
        planet.popNum = pop;
        planet.population = pop;
    } else if (rollNum >= 21 && rollNum <= 25) {
        let pop = roll("10d10") * 10000;
        planet.popNum = pop;
        planet.population = pop;
    } else if (rollNum >= 26 && rollNum <= 30) {
        let pop = roll("1d5")
        planet.popNum = pop * 1000000
        planet.population = pop + " million";
    } else if (rollNum >= 31 && rollNum <= 35) {
        let pop = roll("1d10")
        planet.popNum = pop * 1000000
        planet.population = pop + " million";
    } else if (rollNum >= 36 && rollNum <= 40) {
        let pop = roll("5d10")
        planet.popNum = pop * 1000000
        planet.population = pop + " million";
    } else if (rollNum >= 41 && rollNum <= 50) {
        let pop = roll("10d10")
        planet.popNum = pop * 1000000
        planet.population = pop + " million";
    } else if (rollNum >= 51 && rollNum <= 70) {
        let pop = roll("1d10") * 100
        planet.popNum = pop * 1000000
        planet.population = pop + " million";
    } else if (rollNum >= 71 && rollNum <= 90) {
        let pop = roll("1d5")
        planet.popNum = pop * 1000000000
        planet.population = pop + " billion";
    } else if (rollNum >= 91 && rollNum <= 100) {
        let pop = roll("1d10")
        planet.popNum = pop * 1000000000
        planet.population = pop + " billion";
    } else if (rollNum >= 101 && rollNum <= 110) {
        let pop = roll("2d10")
        planet.popNum = pop * 1000000000
        planet.population = pop + " billion";
    } else if (rollNum >= 111) {
        let pop = roll("3d10")
        planet.popNum = pop * 1000000000
        planet.population = pop + " billion";
    }
}

function findGovt() {
    let rollNum = roll("1d100");

    planet.govRoll = rollNum;

    let classToCheck = planet.planetClass;
    let codeToCheck = planet.classCode;

    if (inRangeInclusive(planet.classCode, "10-12")) {
        classToCheck = planet.planetPrevClass;
        codeToCheck = planet.prevClassCode;
    }

    if (codeToCheck == 15 || codeToCheck == 16) {
        planet.govType = "Unknown"
    } else {
        for (let i = 0; i < governmentRanges.govtTypes.length; i++) {
            if (inRangeInclusive(rollNum, governmentRanges[classToCheck][i])) {
                planet.govType = governmentRanges.govtTypes[i];
                planet.govCode = i;
            }
        }
    }
}

function findReligion() {
    let rollNum = roll("1d100");

    planet.religRoll = rollNum;

    let classToCheck = planet.planetClass;
    let codeToCheck = planet.classCode;

    if (inRangeInclusive(planet.classCode, "10-12")) {
        classToCheck = planet.planetPrevClass;
        codeToCheck = planet.prevClassCode;
    }

    if (codeToCheck == 15 || codeToCheck == 16) {
        planet.religion = "Unknown"
    } else {
        for (let i = 0; i < religionRanges.religionTypes.length; i++) {
            if (inRangeInclusive(rollNum, religionRanges[classToCheck][i])) {
                planet.religion = religionRanges.religionTypes[i];
                planet.religCode = i;
            }
        }
    }
}

function findAdepta() {
    planet.adeptaRolls = [];
    planetDefault.adeptaRolls = [];

    let adeptaTypes = ["Arbites", "Astra Telepathica", "Mechanicus", "Administratum", "Ministorum", "Inquisition", "Munitorium"]

    let bonusRoll = [0, 0, 0, 0, 0, 0, 0];
    let classToCheck = planet.planetClass;
    let codeToCheck = planet.classCode;

    if (inRangeInclusive(planet.classCode, "10-12")) {
        classToCheck = planet.planetPrevClass;
        codeToCheck = planet.prevClassCode;
    }

    if (planet.religion == "Imperial Cult") {
        bonusRoll[4] = roll("1d10");
    } else if (planet.religion == "Machine God") {
        bonusRoll[2] == roll("1d10");
    } else if (planet.religion == "Heretical") {
        bonusRoll[4] = -roll("2d10");
    }

    for (let i = 0; i < adeptaRolls.adeptaTypes.length; i++) {
        if (codeToCheck == 15 || codeToCheck == 16) {
            planet.adeptaRolls.push(-1);
        } else {
            planet.adeptaRolls.push(roll(adeptaRolls[classToCheck][i]) + bonusRoll[i]);
        }
    }

    for (let i = 0; i < planet.adeptaRolls.length; i++) {
        if (inRangeInclusive(planet.adeptaRolls[i], "01-03")) {
            planet.adeptaPresence[i] = "None";

        } else if (inRangeInclusive(planet.adeptaRolls[i], "04-06")) {
            planet.adeptaPresence[i] = "Token";

        } else if (inRangeInclusive(planet.adeptaRolls[i], "07-09")) {
            planet.adeptaPresence[i] = "Slight";

        } else if (inRangeInclusive(planet.adeptaRolls[i], "10-12")) {
            planet.adeptaPresence[i] = "Small";

        } else if (inRangeInclusive(planet.adeptaRolls[i], "13-15")) {
            planet.adeptaPresence[i] = "Moderate";

        } else if (inRangeInclusive(planet.adeptaRolls[i], "16-18")) {
            planet.adeptaPresence[i] = "Notable";

        } else if (inRangeInclusive(planet.adeptaRolls[i], "19-21")) {
            planet.adeptaPresence[i] = "Significant";

        } else if (inRangeInclusive(planet.adeptaRolls[i], "22-24")) {
            planet.adeptaPresence[i] = "Major";

        } else if (planet.adeptaRolls[i] >= 25) {
            planet.adeptaPresence[i] = "Dominating";

        } else if (planet.adeptaRolls[i] == -1) {
            planet.adeptaPresence[i] = "Unknown";

        }
    }

}

function findTechLevel() {
    var techRolls = {
        "Hive World": "2d10",
        "Agri World": "3d10",
        "Forge World": "1d10",
        "Mining World": "4d10",
        "Developing World": "2d10",
        "Feudal World": "1d10",
        "Feral World": "1d10",
        "Shrine World": "4d10",
        "Armoury World": "3d10",
        "Pleasure World": "2d10",
        "Death World": "5d10",
        "Frontier World": "2d10",
        "Forbidden World": "10d10",
        "Xenos World": "10d10"
    }

    var techBonuses = {
        "Hive World": 45,
        "Agri World": 20,
        "Forge World": 80,
        "Mining World": 25,
        "Developing World": 40,
        "Feudal World": 10,
        "Feral World": 0,
        "Shrine World": 40,
        "Armoury World": 40,
        "Pleasure World": 50,
        "Death World": 0,
        "Frontier World": 60,
        "Forbidden World": 0,
        "Xenos World": 0
    }

    var techModifiers = {
        "planetClasses": ["Hive World", "Agri World", "Forge World", "Mining World", "Developing World", "Feudal World", "Feral World", "Shrine World", "Armoury World", "Pleasure World", "Death World", "Frontier World", "Forbidden World", "Xenos World"],
        "size<=1": [10, 10, 20, 5, 10, 5, 5, 5, 5, 10, 5, 5, 0, 0],
        "size2-4": [5, 5, 10, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0],
        "atmo<=3": [5, 5, 10, 5, 5, 0, 0, 5, 5, 10, 5, 5, 0, 5],
        "atmoSpecial": [5, 10, 10, 10, 10, 5, 5, 5, 10, 15, 5, 5, 0, 0],
        "hydro0or9": [5, 10, 5, 5, 5, 5, 5, 5, 5, 10, 5, 5, 0, 0],
        "hydro10": [10, 10, 10, 10, 10, 5, 5, 10, 10, 5, 10, 5, 0, 0],
        "pop<1mill": [0, 5, 5, 5, 5, 0, 0, 5, 5, 5, 5, 5, 0, 5],
        "pop1-9bill": [10, 5, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
        "pop10+bill": [15, 10, 15, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
        "democracy": [0, 5, 20, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5],
        "meritOrElectDict": [0, -5, -10, -5, -5, -5, -5, -5, -5, -5, -5, -5, 0, 0],
        "tyrant": [-10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, 0, -10],
        "religionLocal": [-15, -15, -15, -15, -15, -10, -10, 0, 0, -15, -15, -15, 0, -10],
        "religionMech": [20, 20, 20, 20, 20, 0, 0, 0, 10, 0, 5, 5, 0, 5],
        "mech<=9": [-10, -10, 0, -10, -10, 0, 0, -5, -15, -5, 0, -5, 0, 0],
        "mech13-21": [5, 0, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "mech22+": [0, 0, 20, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "munit<=9": [-5, -5, -5, -5, -5, -5, 0, -5, -10, -5, -5, -5, 0, 0],
        "munit13-21": [5, 0, 5, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0],
        "munit22+": [0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0]
    }

    let classToCheck = planet.planetClass;
    let codeToCheck = planet.classCode;

    if (inRangeInclusive(planet.classCode, "10-12")) {
        classToCheck = planet.planetPrevClass;
        codeToCheck = planet.prevClassCode;
    }

    planet.techRoll = roll(techRolls[classToCheck]) + techBonuses[classToCheck];

    let modTotal = 0;

    if (planet.sizeRoll <= 1) {
        modTotal += techModifiers["size<=1"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (inRangeInclusive(planet.sizeRoll, "2-4")) {
        modTotal += techModifiers["size2-4"][techModifiers["planetClasses"].indexOf(classToCheck)]
    }

    if (planet.atmoRoll <= 3) {
        modTotal += techModifiers["atmo<=3"][techModifiers["planetClasses"].indexOf(classToCheck)]
    }
    if (planet.atmoCode != "OK") {
        modTotal += techModifiers["atmoSpecial"][techModifiers["planetClasses"].indexOf(classToCheck)]
    }

    if (planet.hydroRoll == 0 || planet.hydroRoll == 9) {
        modTotal += techModifiers["hydro0or9"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (planet.hydroRoll == 10) {
        modTotal += techModifiers["hydro10"][techModifiers["planetClasses"].indexOf(classToCheck)]
    }

    if (planet.popNum < 1000000) {
        modTotal += techModifiers["pop<1mill"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (inRangeInclusive(planet.popNum, "1000000000-9000000000")) {
        modTotal += techModifiers["pop1-9bill"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (planet.popNum > 10000000000) {
        modTotal += techModifiers["pop10+bill"][techModifiers["planetClasses"].indexOf(classToCheck)]
    }

    if (planet.govCode == 0) {
        modTotal += techModifiers["democracy"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (planet.govCode == 1 || planet.govCode == 2) {
        modTotal += techModifiers["meritOrElectDict"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (planet.govCode == 4) {
        modTotal += techModifiers["tyrant"][techModifiers["planetClasses"].indexOf(classToCheck)]
    }

    if (planet.religCode == 0) {
        modTotal += techModifiers["religionLocal"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (planet.religCode == 2) {
        modTotal += techModifiers["religionMech"][techModifiers["planetClasses"].indexOf(classToCheck)]
    }

    if (planet.adeptaRolls[2] <= 9) {
        modTotal += techModifiers["mech<=9"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (inRangeInclusive(planet.adeptaRolls[2], "13-21")) {
        modTotal += techModifiers["mech13-21"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (planet.adeptaRolls[2] > 22) {
        modTotal += techModifiers["mech22+"][techModifiers["planetClasses"].indexOf(classToCheck)]
    }

    if (planet.adeptaRolls[6] <= 9) {
        modTotal += techModifiers["munit<=9"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (inRangeInclusive(planet.adeptaRolls[6], "13-21")) {
        modTotal += techModifiers["munit13-21"][techModifiers["planetClasses"].indexOf(classToCheck)]
    } else if (planet.adeptaRolls[6] > 22) {
        modTotal += techModifiers["munit22+"][techModifiers["planetClasses"].indexOf(classToCheck)]
    }

    planet.techRoll += modTotal;


    if (inRangeInclusive(planet.techRoll, "01-10")) {
        planet.techLevel = "Stone Age"

    } else if (inRangeInclusive(planet.techRoll, "11-20")) {
        planet.techLevel = "Iron Age"

    } else if (inRangeInclusive(planet.techRoll, "21-30")) {
        planet.techLevel = "Steel Age"

    } else if (inRangeInclusive(planet.techRoll, "31-40")) {
        planet.techLevel = "Pre-Industrial"

    } else if (inRangeInclusive(planet.techRoll, "41-50")) {
        planet.techLevel = "Industrial"

    } else if (inRangeInclusive(planet.techRoll, "51-60")) {
        planet.techLevel = "Early Space"

    } else if (inRangeInclusive(planet.techRoll, "61-70")) {
        planet.techLevel = "Advanced Space"

    } else if (inRangeInclusive(planet.techRoll, "71-80")) {
        planet.techLevel = "Low Imperial"

    } else if (inRangeInclusive(planet.techRoll, "81-90")) {
        planet.techLevel = "Mid Imperial"

    } else if (inRangeInclusive(planet.techRoll, "91-100")) {
        planet.techLevel = "High Imperial"

    } else if (planet.techRoll > 100) {
        planet.techLevel = "Advanced"

    }
}

function findDefenses() {

    var defenseChecks = {
        "defenseTypes": ["Enforcers", "Militia", "Standing Army", "Armoured Forces", "Titan Legions", "Private Armies", "Naval Forces", "Orbital Stations", "Missile Silos (Planetary)", "Missile Silos (Orbital)", "Defense Lasers", "Mercenary Forces"],
        "Hive World": [95, 95, 95, 95, 30, 30, 95, 60, 85, 70, 40, 10],
        "Agri World": [70, 80, 45, 5, 0, 30, 15, 5, 5, 5, 10, 30],
        "Forge World": [50, 20, 60, 80, 70, 5, 90, 80, 90, 90, 90, 0],
        "Mining World": [95, 60, 5, 0, 0, 20, 5, 15, 0, 0, 10, 10],
        "Developing World": [70, 90, 85, 45, 0, 20, 10, 5, 75, 10, 10, 40],
        "Feudal World": [55, 95, 35, 0, 0, 90, 0, 0, 0, 0, 0, 85],
        "Feral World": [10, 95, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "Shrine World": [60, 20, 40, 0, 0, 0, 10, 0, 5, 0, 10, 0],
        "Armoury World": [60, 90, 95, 65, 10, 0, 50, 20, 40, 35, 70, 0],
        "Pleasure World": [90, 10, 40, 5, 0, 30, 5, 0, 0, 0, 15, 30],
        "Frontier World": [50, 30, 40, 5, 0, 20, 5, 0, 0, 0, 0, 20]
    }

    var defenseSizes = {
        "defenseTypes": ["Enforcers", "Militia", "Standing Army", "Armoured Forces", "Titan Legions", "Private Armies", "Naval Forces", "Orbital Stations", "Missile Silos (Planetary)", "Missile Silos (Orbital)", "Defense Lasers", "Mercenary Forces"],
        "Hive World": ["3d10", "3d10", "3d10", "3d10", "2d10", "2d10", "3d10", "2d10", "3d10", "2d10", "3d10", "3d10"],
        "Agri World": ["1d10", "2d10", "1d10", "1d10", "-", "1d10", "1d10", "1d10", "1d10", "1d10", "1d10", "2d10"],
        "Forge World": ["2d10", "1d10", "2d10", "3d10", "3d10", "1d10", "3d10", "2d10", "2d10", "3d10", "3d10", "-"],
        "Mining World": ["2d10", "3d10", "2d10", "-", "-", "2d10", "1d10", "1d10", "-", "-", "1d10", "1d10"],
        "Developing World": ["3d10", "2d10", "3d10", "2d10", "-", "2d10", "1d10", "1d10", "3d10", "2d10", "1d10", "3d10"],
        "Feudal World": ["2d10", "2d10", "3d10", "-", "-", "2d10", "-", "-", "-", "-", "-", "2d10"],
        "Feral World": ["1d10", "3d10", "3d10", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        "Shrine World": ["2d10", "2d10", "1d10", "-", "-", "-", "1d10", "-", "-", "-", "-", "-"],
        "Armoury World": ["2d10", "3d10", "3d10", "2d10", "1d10", "-", "2d10", "1d10", "2d10", "2d10", "3d10", "-"],
        "Pleasure World": ["3d10", "2d10", "2d10", "1d10", "-", "3d10", "2d10", "-", "-", "-", "2d10", "2d10"],
        "Frontier World": ["2d10", "2d10", "3d10", "-", "-", "1d10", "1d10", "-", "-", "-", "-", "1d10"]
    }

    var defenseQualities = {
        "defenseTypes": ["Enforcers", "Militia", "Standing Army", "Armoured Forces", "Titan Legions", "Private Armies", "Naval Forces", "Orbital Stations", "Missile Silos (Planetary)", "Missile Silos (Orbital)", "Defense Lasers", "Mercenary Forces"],
        "Hive World": ["2d10", "2d10", "3d10", "3d10", "2d10", "2d10", "3d10", "2d10", "2d10", "2d10", "2d10", "2d10"],
        "Agri World": ["1d10", "1d10", "2d10", "1d10", "-", "2d10", "2d10", "1d10", "1d10", "1d10", "1d10", "1d10"],
        "Forge World": ["2d10", "2d10", "3d10", "3d10", "3d10", "2d10", "3d10", "3d10", "3d10", "3d10", "3d10", "-"],
        "Mining World": ["2d10", "1d10", "2d10", "-", "-", "2d10", "2d10", "2d10", "-", "-", "1d10", "1d10"],
        "Developing World": ["2d10", "2d10", "2d10", "3d10", "-", "2d10", "2d10", "1d10", "2d10", "1d10", "1d10", "2d10"],
        "Feudal World": ["2d10", "2d10", "2d10", "-", "-", "2d10", "-", "-", "-", "-", "-", "2d10"],
        "Feral World": ["2d10", "2d10", "2d10", "-", "-", "2d10", "-", "-", "-", "-", "-", "-"],
        "Shrine World": ["3d10", "2d10", "2d10", "-", "-", "-", "2d10", "-", "1d10", "-", "1d10", "-"],
        "Armoury World": ["2d10", "3d10", "3d10", "2d10", "2d10", "-", "3d10", "2d10", "2d10", "2d10", "2d10", "-"],
        "Pleasure World": ["2d10", "2d10", "2d10", "2d10", "-", "2d10", "2d10", "-", "-", "-", "2d10", "2d10"],
        "Frontier World": ["2d10", "2d10", "2d10", "-", "-", "2d10", "1d10", "-", "-", "-", "-", "2d10"]
    }


    let classToCheck = planet.planetClass;
    let codeToCheck = planet.classCode;

    if (inRangeInclusive(planet.classCode, "10-12")) {
        classToCheck = planet.planetPrevClass;
        codeToCheck = planet.prevClassCode;
    }

    if (codeToCheck == 14 || codeToCheck == 15 || codeToCheck == 16) {
        planet.defensePresence = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    } else {
        for (let i = 0; i < defenseChecks["defenseTypes"].length; i++) {
            let rollNum = roll("1d100");

            if (rollNum <= defenseChecks[classToCheck][i]) {
                planet.defensePresence[i] = 1;
            } else {
                planet.defensePresence[i] = 0;
            }
        }
    }

    if (codeToCheck == 14 || codeToCheck == 15 || codeToCheck == 16) {
        planet.defenseSize = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    } else {
        for (let i = 0; i < defenseSizes["defenseTypes"].length; i++) {
            planet.defenseSize[i] = roll(defenseSizes[classToCheck][i]) * planet.defensePresence[i];
        }
    }

    if (codeToCheck == 14 || codeToCheck == 15 || codeToCheck == 16) {
        planet.defenseQuality = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    } else {
        for (let i = 0; i < defenseQualities["defenseTypes"].length; i++) {
            if (planet.adeptaPresence[2] >= 16) {
                planet.defenseQuality[i] = (roll(defenseQualities[classToCheck][i]) * planet.defensePresence[i]) + 5;
            } else {
                planet.defenseQuality[i] = (roll(defenseQualities[classToCheck][i]) * planet.defensePresence[i]);
            }
        }
    }

    for (let i = 0; i < defenseChecks["defenseTypes"].length; i++) {
        if (planet.defensePresence[i] > 0) {
            let sizeDesc = ""
            let qualityDesc = ""

            if (inRangeInclusive(planet.defenseSize[i], "01-03")) {
                sizeDesc = "tiny";
            } else if (inRangeInclusive(planet.defenseSize[i], "04-06")) {
                sizeDesc = "small";
            } else if (inRangeInclusive(planet.defenseSize[i], "07-10")) {
                sizeDesc = "medium";
            } else if (inRangeInclusive(planet.defenseSize[i], "11-15")) {
                sizeDesc = "large";
            } else if (inRangeInclusive(planet.defenseSize[i], "16-20")) {
                sizeDesc = "huge";
            } else if (planet.defenseSize[i] >= 21) {
                sizeDesc = "massive";
            }

            if (inRangeInclusive(planet.defenseQuality[i], "01-04")) {
                qualityDesc = "terrible";
            } else if (inRangeInclusive(planet.defenseQuality[i], "05-09")) {
                qualityDesc = "poor";
            } else if (inRangeInclusive(planet.defenseQuality[i], "10-15")) {
                qualityDesc = "moderate";
            } else if (inRangeInclusive(planet.defenseQuality[i], "16-20")) {
                qualityDesc = "high";
            } else if (planet.defenseQuality[i] >= 21) {
                qualityDesc = "superb";
            }

            planet.defenseDesc[i] = "A " + sizeDesc + " force of " + qualityDesc + " quality.";
        } else if (planet.defensePresence[i] == 0) {
            planet.defenseDesc[i] = "None"
        } else {
            planet.defenseDesc[i] = "Unknown"
        }
    }
}