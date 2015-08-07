module.exports = function(data) {
  var html = data['2'].data;
  var vehicles = html.split("<a class=\"vehicle");
  var vehicles_array = [];
  for (var i = 0; i < vehicles.length; i++) {
    var vehicle = vehicles[i];
    var price = vehicle.split("<p>$");
    if (!price || !price[1]) continue;
    price = price[1].split("</p>")[0];
    var tagline = vehicle.split("<p>");
    tagline = tagline[1].split("</p>")[0].split(" | ");
    var year = tagline[0];
    var miles = tagline[1];
    var model = tagline[2];

    console.log(vehicle);
    var battery = vehicle.split("data-battery=\"")[1].split("\"")[0];
    battery = getBattery(battery);
    vehicles_array.push({
      year: year,
      miles: miles,
      price: price,
      model: model,
      battery: battery,
    });
  }
  return vehicles_array;
}

function getBattery(battery) {
  switch (battery) {
    case "BT60":
      return "S60";
    case "BT85":
      return "S85";
    case "PBT85":
      return "P85";
    case "perf":
      console.log("perffff");
      return "P85";
    default:
      return battery;
  }
}
