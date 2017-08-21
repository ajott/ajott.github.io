// Variable to hold request
var request;

var rando = Math.floor(Math.random() * 1000);


function postScore() {
  if (request) {
      request.abort();
  }

  var serializedData = "score="+score;

  request = $.ajax({
      url: "https://script.google.com/macros/s/AKfycbx7UoJ1UNpfZpIUsK0RuRaMVODQStp9QGt5QbyFQw9IF73txIM/exec",
      type: "post",
      data: serializedData
  });
  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR){
      // Log a message to the console
      console.log(response);
      console.log(jqXHR);
  });

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
          "The following error occurred: "+
          textStatus, errorThrown
      );
  });

}

function maxScore() {
    // Abort any pending request
    if (request) {
        request.abort();
    }

    function whipple(){

    }

    // Fire off the request
    request = $.ajax({
      url: "https://script.google.com/macros/s/AKfycbx7UoJ1UNpfZpIUsK0RuRaMVODQStp9QGt5QbyFQw9IF73txIM/exec",
      type: "get"
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        post(response);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });
    function post(str){
      $("#goat").text(str);
    }

}
