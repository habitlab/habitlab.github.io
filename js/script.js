function main(){
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
        swal({
          title: 'Thanks for signing up',
          text: 'Once HabitLab is ready you will get an email at ' + emailInput,
          type: 'success',
        });
      });
      //alert('Thank you! Your email has been added.');
    }
  });
}

$(document).ready(main);
