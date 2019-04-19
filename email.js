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

  if (contactName === "") {
    alert("Please enter a contact name.");
  } else if (contactEmail === "") {
    alert("Please enter an email address.");
  } else if (!validateEmail(contactEmail)) {
    alert("Please enter a valid email address.");
  } else if (contactMessage === "") {
    alert("Please enter a message.");
  } else {
    document.getElementById("js-contact__status-receiver").style.display =
      "Block";
    document.getElementById("js-contact__status-receiver").textContent =
      "Sending message to William Warner ...";

    document.getElementById("js-contact__status-sender").style.display =
      "Block";
    document.getElementById("js-contact__status-sender").textContent =
      "Sending message to You ...";

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
      } else {
        document.getElementById("js-contact__status-receiver").style.display =
          "Block";
        document.getElementById("js-contact__status-receiver").textContent =
          "I'm sorry but there was an error submitting your message. Please send me an email at will.r.warner@gmail.com";
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
          "A copy of the message was sent to" + contactEmail + "!";
      } else {
        document.getElementById("js-contact__status-sender").style.display =
          "Block";
        document.getElementById("js-contact__status-sender").textContent =
          "I'm sorry but there was an error submitting a copy of the message to your inbox.";
      }
    });
  }
}

function clearContactForm() {
  document.getElementById("js-contact__name").value = "";
  document.getElementById("js-contact__email").value = "";
  document.getElementById("js-contact__message").value = "";
}

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}
