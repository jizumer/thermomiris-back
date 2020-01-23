const cron = require("node-cron");
const gConfig = require("./config");
gConfig.gConfigInit();
const utils = require("./utils");
const stockUpdater = require("./stock-updater");
firebaseConnector = require("./firebaseConnector");
firebaseConnector.initializeApp();

// schedule tasks to be run on the server
let schedule = gConfig.gConfigParamByName("stock.update.cronexpression");
cron.schedule(schedule, function() {
  stockUpdater.bitcoinToEurSell(newValue => {
    //firebaseConnector.sendTopicNotification(newValue);
    console.log("Saving record:" + JSON.stringify(newValue));
    firebaseConnector.saveIntoCloudStore(
      "stocks",
      "BTC" + utils.formatCustomDate(new Date()),
      {
        date: new Date(),
        USDTOEUR: newValue.BTC
      }
    );
  });
});
