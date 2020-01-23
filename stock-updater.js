const request = require("request");
const gConfig = require("./config");
const utils = require("./utils");

function bitcoinToEurSell(callback) {
  const url = gConfig.gConfigParamByName("stock.updater.url.coinbase.btc.eur");
  request(url, { json: true }, (error, response, body) => {
    if (error === null) {
      result = {
        timestamp: utils.formatCustomDate(new Date()),
        base: body.data.base,
        amount: body.data.amount
      };
      callback(result);
    } else {
      console.log("Error requesting bitcoin data: " + error);
    }
  });
}

exports.bitcoinToEurSell = bitcoinToEurSell;
