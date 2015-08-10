var scraper = require('./detail-scraper.js');
module.exports = function(model, callback) {
	scraper(model, function(data) {
		try {
			var color = data.split(" Paint")[0].split("package-detail notranslate\">");
			color = color[color.length - 1];
			callback({
				color: color
			});
		} catch(e) {
			console.log("E==" + model);
			console.log(e);
			callback({});
		}
	});
};
