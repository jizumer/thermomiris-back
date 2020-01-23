const firebaseAdmin = require("firebase-admin");
const gConfig = require("./config");
const utils = require("./utils");

function initializeApp() {
  let googleServiceConfigLocation = gConfig.gConfigParamByName(
    "google.service.account.key"
  );

  let googleServiceConfig = require(googleServiceConfigLocation);
  let googleDatabaseUrl = gConfig.gConfigParamByName("google.database.url");

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(googleServiceConfig),
    databaseURL: googleDatabaseUrl
  });
}

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

function saveIntoCloudStore(collectionName, document) {
  let db = firebaseAdmin.firestore();
  let docRef = db.collection(collectionName).doc(document.timestamp);
  console.log("Saving data: " + JSON.stringify(document));

  docRef
    .set({
      timestamp: document.timestamp,
      base: document.base,
      amount: document.amount
    })
    .catch(err => {
      console.log("Error adding data", err);
    });
}

exports.initializeApp = initializeApp;
exports.sendTopicNotification = sendTopicNotification;
exports.saveIntoCloudStore = saveIntoCloudStore;
