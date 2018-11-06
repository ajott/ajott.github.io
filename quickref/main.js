function togglePanel(panel) {
    var panels = ['#combat', '#gear', '#weapons', '#armour', "#weaponQual", "#weaponMods", "#tools",
     "#armourMods", "#psyPowers","#psyPhenom","#psyPerils","#ammo", "#skills","#talents","#traits",
     "#mutations","#maligna","#shock","#exp","#energyCrit","#explosiveCrit","#impactCrit","#rendingCrit","#cybernetics","#consumables",
    "#homeworlds","#backgrounds","#roles","#divinations"];
    var tabs = ['#combatTab', '#gearTab', '#weaponTab', '#armourTab', "#weaponTab", "#weaponTab", "#gearTab",
     "#armourTab", "#psykerTab", "#psykerTab", "#psykerTab", "#weaponTab", "#charTab", "#charTab", "#charTab", 
     "#charTab", "#charTab", "#charTab", "#expTab","#critTab","#critTab","#critTab","#critTab","#gearTab","#gearTab",
     "#charTab", "#charTab", "#charTab", "#charTab"];

    for (i = 0; i < panels.length; i++) {
        $(panels[i]).hide();
        $(tabs[i]).removeClass("btn-danger");
    }
    $(panels[panel]).show();
    $(tabs[panel]).addClass("btn-danger");
}