function main(){
  console.log("hi! this script is being run.")
  addButtonListener()
}

function addButtonListener() {
  $('#notifyButton').bind('click', function() {
    console.log($('#emailInput').val())
    const emailInput = $('#emailInput').val()

    if (emailInput !== '') { //if email is not empty
      console.log('hi')
      $.getJSON(`http://habitlab.herokuapp.com/addsignup?${$.param({email: emailInput})}&callback=?`, null, function(response) {
        console.log('response data received')
      });
      //alert('Thank you! Your email has been added.');
    }
  });
}

$(document).ready(main);
