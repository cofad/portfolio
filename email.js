/*William Warner*/
/*willrwarner.com*/
/*email.js*/

var contactBtn = document.getElementById("js-contact__submit");
contactBtn.addEventListener("click", sendEmail);

var resetBtn = document.getElementById("js-contact__reset");
resetBtn.addEventListener("click", clearContactForm);

function sendEmail() {
  var contactName = document.getElementById("js-contact__name").value;
  var contactEmail = document.getElementById("js-contact__email").value;
  var contactMessage = document.getElementById("js-contact__message").value;

  //Initialize message feedback responses
  document.getElementById("js-contact__status").style.display = "Block";
  document.getElementById("js-contact__status").textContent =
    "Sending Message.....";

  document.getElementById("js-contact__status-receiver").style.display =
    "Block";
  document.getElementById("js-contact__status-receiver").textContent = "";

  document.getElementById("js-contact__status-sender").style.display = "Block";
  document.getElementById("js-contact__status-sender").textContent = "";

  clearContactForm();

  var receiverBody =
    "Name = " +
    contactName +
    " Email = " +
    contactEmail +
    " Message = " +
    contactMessage;
  var senderBody =
    "Thank you for contacting William Warner at will.r.warner@gmail.com. I will respond as soon possible.";

  Email.send({
    SecureToken: "d3b95c08-53cb-417b-9786-e652757e1724",
    To: "will.r.warner@gmail.com",
    From: "donotreply@willrwarner.com",
    Subject: "Contact from willrwarner.com",
    Body: receiverBody
  }).then(function(message) {
    if (message === "OK") {
      document.getElementById("js-contact__status-receiver").style.display =
        "Block";
      document.getElementById("js-contact__status-receiver").textContent =
        "Thank you for contacting me. Your message has been submitted successfully!";

      //Clear the messsage sending status
      document.getElementById("js-contact__status").textContent = "";
      document.getElementById("js-contact__status").style.display = "None";
    } else {
      document.getElementById("js-contact__status-receiver").style.display =
        "Block";
      document.getElementById("js-contact__status-receiver").textContent =
        "I'm sorry but there was an error submitting your message. Please send me an email at will.r.warner@gmail.com";

      //Clear the messsage sending status
      document.getElementById("js-contact__status").textContent = "";
      document.getElementById("js-contact__status").style.display = "None";
    }
  });

  Email.send({
    SecureToken: "d3b95c08-53cb-417b-9786-e652757e1724",
    To: contactEmail,
    From: "donotreply@willrwarner.com",
    Subject: "Message Sent from willrwarner.com",
    Body: senderBody
  }).then(function(message) {
    if (message === "OK") {
      document.getElementById("js-contact__status-sender").style.display =
        "Block";
      document.getElementById("js-contact__status-sender").textContent =
        "A copy of the message was successfully sent to your inbox!";

      //Clear the messsage sending status
      document.getElementById("js-contact__status").textContent = "";
      document.getElementById("js-contact__status").style.display = "None";
    } else {
      document.getElementById("js-contact__status-sender").style.display =
        "Block";
      document.getElementById("js-contact__status-sender").textContent =
        "I'm sorry but there was an error submitting a copy of the message to your inbox.";

      //Clear the messsage sending status
      document.getElementById("js-contact__status").textContent = "";
      document.getElementById("js-contact__status").style.display = "None";
    }
  });
}

function clearContactForm() {
  document.getElementById("js-contact__name").value = "";
  document.getElementById("js-contact__email").value = "";
  document.getElementById("js-contact__message").value = "";
}
