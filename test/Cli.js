var _chai = require("chai");
var expect = require("chai").expect;
var execa = require("execa");
var helpers = require("./helpers");

describe("bad-placeholder -n 3", () => {
	var _result;

	before((done) => {
		helpers.deletePlaceholders().then((_response) => {});
		execa
			.shell("node ./index.js -n 3")
			.then((response) => {
				_result = response.stdout;
				done();
			})
			.catch((error) => {
				console.log(error);
				done();
			});
	});

	it("should generate three images", () => {
		expect(helpers.getPlaceholders().length).to.be.equal(3);
	});

	it("should have default dimensions", () => {
		var dimensions = helpers.getDimensions(
			helpers.getPlaceholders()[Math.floor(Math.random() * 2) + 0],
		);
		expect(dimensions).to.be.equal("1024x768");
	});
});

describe("bad-placeholder -s 100x100", () => {
	var _result;

	before((done) => {
		helpers.deletePlaceholders().then((_response) => {});
		execa
			.shell("node ./index.js -s 100x100")
			.then((response) => {
				_result = response.stdout;
				done();
			})
			.catch((error) => {
				console.log(error);
				done();
			});
	});

	it("should generate one image", () => {
		expect(helpers.getPlaceholders().length).to.be.equal(1);
	});

	it("should be 100x100", () => {
		var dimensions = helpers.getDimensions(helpers.getPlaceholders()[0]);
		expect(dimensions).to.be.equal("100x100");
	});
});

for (const provider of ["DummyImage", "LoremPicsum", "PlaceBear"]) {
	("use strict");

	describe(`bad-placeholder -p ${provider}`, () => {
		var _result;

		before((done) => {
			helpers.deletePlaceholders().then((_response) => {});
			execa
				.shell(`node ./index.js -p ${provider}`)
				.then((response) => {
					_result = response.stdout;
					done();
				})
				.catch((error) => {
					console.log(error);
					done();
				});
		});

		it(`should generate one image from specified provider (${provider})`, () => {
			expect(helpers.getPlaceholders().length).to.be.equal(1);
		});

		it("should have default dimensions", () => {
			var dimensions = helpers.getDimensions(helpers.getPlaceholders()[0]);
			expect(dimensions).to.be.equal("1024x768");
		});

		after((done) => {
			helpers.deletePlaceholders().then((_response) => {
				done();
			});
		});
	});
}
