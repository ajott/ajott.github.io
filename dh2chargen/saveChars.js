var $form = $('#saveChar');
var postUrl = 'https://script.google.com/macros/s/AKfycbyRSCbysT47R5r_YeqJ4L8FEuAg9HJwa3NR5rO_-zh4aDkPoMeOnB4ReuF8o-O9AFI1kg/exec';
var getURL = 'https://script.google.com/macros/s/AKfycbz6J_WmcTcVfKtP72xPKA2GUvvR_SUXWc97VKw9aQfK43QyGsLz_oGAZVmgcq09spgUTw/exec';

$('#submit-form').on('click', function (e) {
    var today = new Date();
    $("#saveCharTime").val(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes());
    $('#saveCharString').val(window.btoa(JSON.stringify(character)));
     let userVal = $('#saveUser').val(); 
     userVal = userVal.replace(/,/g, '')
     userVal = userVal.replace(/'/g, '')
     userVal = userVal.replace(/"/g, '')
     $('#saveUser').val(userVal); 

     let charVal = $('#saveCharName').val(); 
     charVal = charVal.replace(/,/g, '')
     charVal = charVal.replace(/'/g, '')
     charVal = charVal.replace(/"/g, '')
     $('#saveCharName').val(charVal); 
    e.preventDefault();
    var jqxhr = $.ajax({
        url: postUrl,
        crossDomain: true,
        method: "GET",
        dataType: "json",
        data: $form.serialize()
    })
})

function retrieveChar() {

    $('#retrieve-char').addClass("w3-disabled").addClass("w3-light-grey").attr("onclick", "");

    $('html').css("cursor","progress");

    var jqxhr = $.ajax({
        url: getURL,
        crossDomain: true,
        method: "GET"
    })

    jqxhr.done(function (response, textStatus, jqXHR) {
        post(response);

        $('#retrieve-char').removeClass("w3-disabled").removeClass("w3-light-grey").attr("onclick", "retrieveChar()");

        $('html').css("cursor", "auto");

        el("charList").innerHTML = "";

        buildCharList();
    });
}

var importedChars = {};
var userChars = {};

function buildCharList() {
    let htmlStr = "";

    for (let i = 0; i < Object.keys(userChars).length; i++) {
        htmlStr = ""

        htmlStr += "<option>"

        htmlStr += Object.keys(userChars)[i];

        htmlStr += "</option>"

        el("charList").innerHTML += htmlStr
    }

    $("#charList").show()
    $("#charLoad").show()
}

function post(str) {
    var importName = $("#userInput").val();

    var resultArray = str.split(',');

    var numChars = (resultArray.length - 4) / 4;

    for (let i = 1; i < numChars + 1; i++) {
        importedChars[i] = {};
        importedChars[i][resultArray[0]] = resultArray[(i * 4) + 0];
        importedChars[i][resultArray[1]] = resultArray[(i * 4) + 1];
        importedChars[i][resultArray[2]] = resultArray[(i * 4) + 2].substring(4, 21);
        importedChars[i][resultArray[3]] = resultArray[(i * 4) + 3];
    }


    userChars = {}

    for (let i = 1; i < numChars + 1; i++) {
        if (importedChars[i]["username"] == importName) {
            userChars[importedChars[i]["character"] + " - " + importedChars[i]["dateTime"]] = importedChars[i]["data_string"];
        }
    }

}

function chooseChar() {
    var selectBox = el("charList");
    var charImp = selectBox.options[selectBox.selectedIndex].value;

    var importString = window.atob(userChars[charImp]);

    let tempChar = JSON.parse(importString);

    document.getElementById('importModal').style.display = 'none'

    character = tempChar;

    navFromMenuToSheet();

    buildSheet();
}

var input = el("userInput");

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();

        el("retrieve-char").click();
    }
})
