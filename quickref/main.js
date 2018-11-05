$("#gearTable").stupidtable();


function togglePanel(panel) {
    var panels = ['#combat','#gear','#weapons','#armour'];
    var tabs = ['#combatTab','#gearTab', '#weaponTab','#armourTab'];
  
    for (i = 0; i < panels.length; i++) {
      if (i == panel) {
        $(panels[i]).show();
        $(tabs[i]).addClass("btn-info");
      } else {
        $(panels[i]).hide();
        $(tabs[i]).removeClass("btn-info");
      }
    }
  }