function togglePanel(panel) {
    var panels = ['#combat', '#gear', '#weapons', '#armour', "#weaponQual", "#weaponMods", "#tools", "#armourMods", "#psyPowers","#psyPhenom","#psyPerils","#ammo"];
    var tabs = ['#combatTab', '#gearTab', '#weaponTab', '#armourTab', "#weaponTab", "#weaponTab", "#gearTab", "#armourTab", "#psykerTab", "#psykerTab", "#psykerTab", "#weaponTab"];

    for (i = 0; i < panels.length; i++) {
        $(panels[i]).hide();
        $(tabs[i]).removeClass("btn-info");
    }
    $(panels[panel]).show();
    $(tabs[panel]).addClass("btn-info");
}

// function loadFile(filePath) {
//     var result = null;
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("GET", filePath, false);
//     xmlhttp.send();
//     if (xmlhttp.status == 200) {
//         result = xmlhttp.responseText;
//     }
//     return result;
// }

// function importTables() {
//     var tables = ['#combat', '#gear', '#weapons', '#armour', "#weaponQual", "#weaponMods", "#tools", "#armourMods"];
//     var file = ["combat","gear","weapons","armour","weaponQual","weaponMods","tools","armourMods"]
    
//     for (i=0; i<tables.length; i++){
//         $(tables[i]).html(loadFile("tables/"&file[i]&".txt"));
//     }
    
// }