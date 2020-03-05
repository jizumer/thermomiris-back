const request = require("request");
const gConfig = require("./config");
const utils = require("./utils");

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("Received correct response: " + body);
    } else {
        console.log("Error updating ip: " + error)
    }
}

function updateIp() {
    console.log("Refreshing ip at :" + utils.formatCustomDate(new Date()));
    const url = gConfig.gConfigParamByName("ip.updater.url.noip");
    const user = gConfig.gConfigParamByName("ip.updater.username.noip");
    const passwd = gConfig.gConfigParamByName("ip.updater.passwd.noip");
    const hostname = gConfig.gConfigParamByName("ip.updater.hostname.noip");
    const useragent = gConfig.gConfigParamByName("ip.updater.useragent.noip");

    let credentials = Buffer.from(user + ':' + passwd).toString('base64');


    const options = {
        url: url + '?' + "hostname=" + hostname,
        headers: {
            'User-Agent': useragent,
            'Authorization': "Basic " + credentials
        }
    };


    request(options, callback);

}

exports.updateIp = updateIp;