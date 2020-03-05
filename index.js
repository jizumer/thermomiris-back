const cron = require("node-cron");
const gConfig = require("./config");
gConfig.gConfigInit();
const stockUpdater = require("./stock-updater");
const ipUpdater = require("./ip-updater");
firebaseConnector = require("./firebaseConnector");
firebaseConnector.initializeApp();


// schedule tasks to be run on the server
let stockUpdateSchedule = gConfig.gConfigParamByName("stock.update.cronexpression");
cron.schedule(stockUpdateSchedule, function () {
  stockUpdater.bitcoinToEurSell(newValue => {
    //firebaseConnector.sendTopicNotification(newValue);
    firebaseConnector.saveIntoCloudStore(newValue.base, newValue);
  });
});

let ipUpdateSchedule = gConfig.gConfigParamByName("ip.update.cronexpression");
cron.schedule(ipUpdateSchedule, function () {
  ipUpdater.updateIp();
});
