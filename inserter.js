var fs = require('fs');
var parser = require('./parser');

var data = require('./file.json');
var currentFlat = require('./current.json');
var newFlat = {};

var now = Math.floor((new Date).getTime() / 1000);

var vehicles = parser(data);
vehicles.forEach(function(vehicle) {
  if (!currentFlat[vehicle.model]) {
    vehicle.date_added = now;
    currentFlat[vehicle.model] = vehicle;
    newFlat[vehicle.model] = vehicle;
  }
});

var html = "<table id='datat'><thead><tr><td>VIN</td><td>Price</td><td>Year</td><td>Model</td><td>Color</td><td>Date added</td><td>Date removed</td></tr></thead><tbody>";
for (key in currentFlat) {
  if (!newFlat[key]) {
    currentFlat[key].date_removed = now;
  }
  html += "<tr><td>" + currentFlat[key].model + "</td><td>" + currentFlat[key].price + "</td><td>" + currentFlat[key].year + "</td><td>" + currentFlat[key].battery + "</td><td>" + currentFlat[key].color + "</td><td>" + currentFlat[key].date_added + "</td><td>" + currentFlat[key].date_removed + "</td></tr>";

}
html += "</tbody></table>";

fs.writeFileSync("output.json", JSON.stringify(currentFlat));

var template = fs.readFileSync("template.html").toString();
template = template.replace("{{DATA}}", html);
fs.writeFileSync("output.html", template);
