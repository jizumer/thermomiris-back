const firebaseAdmin = require("firebase-admin");
const utils = require("./utils");
function sendTopicNotification(msgToSend) {
  var message = {
    notification: {
      title: "ThermomIris alert!",
      body: msgToSend
    },
    topic: "thermomiris-topic"
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  firebaseAdmin
    .messaging()
    .send(message)
    .then(response => {
      // Response is a message ID string.
      console.log(
        utils.formatCustomDate(new Date()) + " Successfully sent message:",
        response
      );
    })
    .catch(error => {
      console.log(
        utils.formatCustomDate(new Date()) + " Error sending message:",
        error
      );
    });
}

exports.sendTopicNotification = sendTopicNotification;
