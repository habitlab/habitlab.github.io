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
      $.post("http://habitlab.herokuapp.com/addsignup",
      {
          email: emailInput
      },
      function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
      });
          
      //alert('Thank you! Your email has been added.');
    }
  });
}

$(document).ready(main);