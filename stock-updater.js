const request = require("request");
const gConfig = require("./config");
const utils = require("./utils");
const firebaseAdmin = require("firebase-admin");

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

function bitcoinToEurSell(callback) {
  const url = gConfig.gConfigParamByName("stock.updater.url.coinbase.btc.eur");
  request(url, { json: true }, (error, response, body) => {
    if (error === null) {
      result =
        utils.formatCustomDate(new Date()) +
        ": " +
        body.data.base +
        ": " +
        body.data.amount;
      callback(result);
    } else {
      console.log("Error requesting bitcoin data: " + error);
    }
  });
}

exports.initializeApp = initializeApp;
exports.bitcoinToEurSell = bitcoinToEurSell;
