contactBtn = document.getElementById("js-contact__button");
contactBtn.addEventListener("onclick", sendEmail);

function sendEmail(){

  contactName = document.getElementById("js-contact__name").textContent;
  contactEmail = document.getElementById("js-contact__email").textContent;
  contactMessage = document.getElementById("js-contact__message").textContent;

  document.getElementById("js-contact__name").textContent = "";
  document.getElementById("js-contact__email").textContent = "";
  document.getElementById("js-contact__message").textContent = "";
  document.getElementById("js-contact__button").textContent = "";

  Email.send({
    SecureToken : "d3b95c08-53cb-417b-9786-e652757e1724",
    To : 'will.r.warner@gmail.com',
    From : contactEmail,
    Subject : "Contact from WillRWarner.com",
    Body : contactMessage
  }).then(message => alert(message));

}