var fs = require("node:fs");

module.exports = {
	getRootFiles: () => fs.readdirSync("./"),

	getPlaceholders: function () {
		var files = this.getRootFiles();

		return files.filter((filename) => {
			if (filename.indexOf("placeholder_") !== -1) {
				return filename;
			}
			return null;
		});
	},

	deletePlaceholders: function () {
		var placeholders = this.getPlaceholders();
		var count = placeholders.length;

		return new Promise((resolve, _reject) => {
			if (count) {
				placeholders.forEach((filename) => {
					fs.unlinkSync(filename);
					count--;

					if (!count) {
						resolve();
					}
				});
			}

			resolve();
		});
	},

	getDimensions: (filename) => filename.split("_")[1],
};
