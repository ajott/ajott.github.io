var $form = $('#saveChar');
var postUrl = 'https://script.google.com/macros/s/AKfycbye3aGgK5tredKN9iJBUuajoCC7Mn1hVTe2eD8_EiEw-lp-ygZe/exec'
var getURL = 'https://script.google.com/macros/s/AKfycbzdnRMfwTdW9jJ9Sv-8_aJEsoZtUab_mpTKiuUklK_W98acebTy/exec'

$('#submit-form').on('click', function (e) {
    var today = new Date();
    $("#saveCharTime").val(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes());
    $('#saveCharString').val(window.btoa(JSON.stringify(character)));
    e.preventDefault();
    var jqxhr = $.ajax({
        url: postUrl,
        method: "GET",
        dataType: "json",
        data: $form.serialize()
    })
})

$('#retrieve-char').on('click', function (e) {
    e.preventDefault();
    var jqxhr = $.ajax({
        url: getURL,
        method: "GET"
    })

    jqxhr.done(function (response, textStatus, jqXHR) {
        post(response);
        buildCharList();
    });

})

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