#! /usr/bin/env node
var followRedirects = require("follow-redirects");
var http = followRedirects.http;
var https = followRedirects.https;
var fileSystem = require("node:fs");
var randomString = require("random-string");
var image = require("./Image");
var readline = require("node:readline");
/* Require Commander configuration */
var cliOptions = require("./commanderConfig");
// Counter of files downloaded
var downloadedFileCounter = 0;
// List of files downloaded
var downloadedFiles = [];
// Download an image
var downloadPlaceHolder = (imageUrl, imageFileName) => {
	var fileStream = fileSystem.createWriteStream(imageFileName);
	var handle = (response) => {
		response.pipe(fileStream);
		fileStream.on("finish", () => {
			fileStream.close(() => {
				downloadedFileCounter++;
				downloadedFiles.push(imageFileName);
				var downloadProgress = Math.ceil(
					(downloadedFileCounter / cliOptions.number) * 100,
				);
				readline.cursorTo(process.stdout, 0);
				process.stdout.write(
					"Downloaded " +
						downloadedFileCounter +
						" of " +
						cliOptions.number +
						". [" +
						downloadProgress +
						" %]",
				);
				if (downloadedFileCounter === cliOptions.number) {
					console.info(
						`\n${cliOptions.number} image(s) successfully downloaded`,
					);
				}
			});
		});
		fileStream.on("error", () => {
			console.log("Failed");
		});
	};
	if (imageUrl.substring(0, 7) === "http://") {
		http.get(imageUrl, (response) => {
			handle(response);
		});
	} else {
		https.get(imageUrl, (response) => {
			handle(response);
		});
	}
};
followRedirects.maxRedirects = 10;
// Generate a randome file name
var generateRandomFileName = (fileNumber) =>
	"placeholder_" +
	cliOptions.size +
	"_" +
	randomString({ length: 4 }) +
	fileNumber +
	randomString({ length: 4 }) +
	".jpg";
for (i = 1; i <= cliOptions.number; i++) {
	downloadPlaceHolder(
		image.getImgUrl(cliOptions.size),
		generateRandomFileName(i),
	);
}
