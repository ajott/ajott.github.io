function togglePanel(panel) {
    var panels = ['#combat', '#gear', '#weapons', '#armour', "#weaponQual", "#weaponMods", "#tools",
     "#armourMods", "#psyPowers","#psyPhenom","#psyPerils","#ammo", "#skills","#talents","#traits","#mutations","#maligna","#shock","#exp"];
    var tabs = ['#combatTab', '#gearTab', '#weaponTab', '#armourTab', "#weaponTab", "#weaponTab", "#gearTab",
     "#armourTab", "#psykerTab", "#psykerTab", "#psykerTab", "#weaponTab", "#charTab", "#charTab", "#charTab", "#charTab", "#charTab", "#charTab", "#expTab"];

    for (i = 0; i < panels.length; i++) {
        $(panels[i]).hide();
        $(tabs[i]).removeClass("btn-danger");
    }
    $(panels[panel]).show();
    $(tabs[panel]).addClass("btn-danger");
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