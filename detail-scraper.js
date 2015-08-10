var http = require("http");
var fs = require("fs");

var URL = "http://www.teslamotors.com/models/preowned/";

module.exports = function(model, callback) {
  try {
    callback(fs.readFileSync("stored_cars/" + model).toString());
  } catch (e) {
    console.log(model);
    console.log(e);
    console.log("SCR");
    var options = {
      hostname: "www.teslamotors.com",
      path: "/models/preowned/" + model,
      method: "GET",
      headers: {
        "Accept":"application/json, text/javascript, */*; q=0.01",
        "Cache-Control":"no-cache",
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2465.2 Safari/537.36",
      },
    };
    var req = http.request(options, function(res) {
      var data = "";
      res.on("data", function(chunk) {
        data += chunk.toString();
      });
      res.on("end", function() {
        fs.writeFileSync("stored_cars/" + model, data);
      });
    });
    req.end();
  }
};

