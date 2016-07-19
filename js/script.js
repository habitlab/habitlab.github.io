function main(){
  console.log("hi! this script is being run.")
  addButtonListener()
}

function addButtonListener() {
  $('#emailform').bind('submit', function(evt) {
    evt.preventDefault(); // prevents refreshing on form submit
    console.log($('#emailInput').val())
    const emailInput = $('#emailInput').val()

    if (emailInput !== '') { //if email is not empty
      console.log('hi')
      $.getJSON(`//habitlab.herokuapp.com/addsignup?${$.param({email: emailInput})}&callback=?`, null, function(response) {
        console.log('response data received');
        $('#emailInput').val(''); // clears the email input
      });
      //alert('Thank you! Your email has been added.');
    }
  });
}

$(document).ready(main);
