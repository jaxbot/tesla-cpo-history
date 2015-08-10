var scraper = require('./detail-scraper.js');
module.exports = function(model, callback) {
	scraper(model, function(data) {
		var color = data.split("package-detail notranslate\">")[1].split(" Paint")[0];
		callback({
			color: color
		});
	});
};
