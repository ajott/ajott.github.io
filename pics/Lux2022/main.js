function accordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        $('#'+id).removeClass("w3-hide").addClass("w3-show")
    } else {
        $('#'+id).removeClass("w3-show").addClass("w3-hide")
    }
}