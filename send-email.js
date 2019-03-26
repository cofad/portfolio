//Event Listeners
var contactForm = document.getElementById("js-contact-card");
contactForm.addEventListener("submit", clickSubmit);

function clickSubmit() {
  var contactForm = document.getElementById("js-contact-card");
  var formData = new FormData(contactForm);

  var xhttp = new XMLHttpRequest();
    
  event.preventDefault();

  // // Display the key/value pairs
  // for (var pair of formData.entries()) {
  //   console.log(pair[0]+ ', ' + pair[1]); 
  // }

  xhttp.open("POST","send-email.php",true);
  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhttp.send(formData);
  
  //Alert user that email was sent
  element = document.getElementById("js-contact__text");
  element.textContent = "Message sent!";

  return false;
}