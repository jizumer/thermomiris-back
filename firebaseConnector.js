const firebaseAdmin = require("firebase-admin");
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

function saveIntoCloudStore(collectionName, documentName, document) {
  let db = firebaseAdmin.firestore();
  let docRef = db.collection(collectionName).doc(documentName);

  docRef.set(documentName);
}

exports.initializeApp = initializeApp;
exports.sendTopicNotification = sendTopicNotification;
exports.saveIntoCloudStore = saveIntoCloudStore;
