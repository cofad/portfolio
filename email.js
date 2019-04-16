var contactBtn = document.getElementById("js-contact__submit");
contactBtn.addEventListener("click", sendEmail);

var resetBtn = document.getElementById("js-contact__reset");
resetBtn.addEventListener("click", clearContactForm);

function sendEmail(){

  var contactName = document.getElementById("js-contact__name").textContent;
  var contactEmail = document.getElementById("js-contact__email").textContent;
  var contactMessage = document.getElementById("js-contact__message").value;
	
  clearContactForm();

  Email.send({
    SecureToken : "d3b95c08-53cb-417b-9786-e652757e1724",
    To : 'will.r.warner@gmail.com',
    From : 'donotreply@willrwarner.com',
    Subject : "Contact from willrwarner.com",
    Body : contactMessage + contactEmail
  }).then(message => updateContactStatus(message));
}

function updateContactStatus(message) {
  if (message === "OK"){
	document.getElementById("js-contact__status").style.display = "Block";
  	document.getElementById("js-contact__status").textContent = "Thank you for contacting me. Your message has been submitted successfully!";
  }else{
	document.getElementById("js-contact__status").style.display = "Block";
	document.getElementById("js-contact__status").textContent = "I'm sorry but there was an error submitting your message. Please send me an email at will.r.warner@gmail.com";
  }
}

function clearContactForm() {
  document.getElementById("js-contact__name").value = "";
  document.getElementById("js-contact__email").value = "";
  document.getElementById("js-contact__message").value = "";
}