var fs = require('fs');
var parser = require('./parser');
var detailedParser = require('./detail-parser');

var data = require('./file.json');
var currentFlat = require('./current.json');
var newFlat = {};

var now = Math.floor((new Date).getTime() / 1000);

var vehicles = parser(data);
var semaphore = 1;
vehicles.forEach(function(vehicle) {
  if (!currentFlat[vehicle.model]) {
    vehicle.date_added = now;
    currentFlat[vehicle.model] = vehicle;
  }
  newFlat[vehicle.model] = vehicle;
  if (!currentFlat[vehicle.model].extras) {
    currentFlat[vehicle.model].extras = {};
  }
  semaphore++;
  detailedParser(vehicle.model, function(extras) {
    console.log("parsing details");
    currentFlat[vehicle.model].extras = extras;
    semaphore--;
    if (semaphore === 0) {
      render();
    }
  });
});
if (semaphore === 1) {
  render();
} else {
  semaphore--;
}

function render() {
  var html = "<table id='datat'><thead><tr><td>VIN</td><td>Price</td><td>Year</td><td>Model</td><td>Color</td><td>Date added</td><td>Date removed</td></tr></thead><tbody>";
  for (key in currentFlat) {
    if (!newFlat[key]) {
      console.log("BAHHHHHHH");
      currentFlat[key].date_removed = now;
    } else {
      console.log(newFlat[key]);
      currentFlat[key].date_removed = 0;
    }
    html += "<tr><td>" + currentFlat[key].model + "</td><td>" + currentFlat[key].price + "</td><td>" + currentFlat[key].year + "</td><td>" + currentFlat[key].battery + "</td><td>" + currentFlat[key].extras.color + "</td><td>" + currentFlat[key].date_added + "</td><td>" + currentFlat[key].date_removed + "</td></tr>";

  }
  html += "</tbody></table>";

  fs.writeFileSync("current.json", JSON.stringify(currentFlat));

  var template = fs.readFileSync("template.html").toString();
  template = template.replace("{{DATA}}", html);
  fs.writeFileSync("output.html", template);
}
