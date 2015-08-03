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
    vehicles_array.push({
      year: year,
      miles: miles,
      price: price,
      model: model,
    });
  }
  return vehicles_array;
}
