const cron = require("node-cron");
const gConfig = require("./config");
gConfig.gConfigInit();
const utils = require("./utils");
const notificationSender = require("./notificationSender");
const stockUpdater = require("./stock-updater");
stockUpdater.initializeApp();

// schedule tasks to be run on the server
let schedule = gConfig.gConfigParamByName("stock.update.cronexpression");
cron.schedule(schedule, function() {
  stockUpdater.bitcoinToEurSell(newValue => {
    notificationSender.sendTopicNotification(newValue);
  });
});
