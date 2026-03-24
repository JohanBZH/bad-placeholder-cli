module.exports = {
	list: {
		// DummyImage
		DummyImage: {
			getImgUrl: (s) => `https://dummyimage.com/${s}/000/fff`,
		},
		// LoremPicsum
		LoremPicsum: {
			getImgUrl: (s) => {
				var s2 = s.split("x");
				return `https://picsum.photos/${s2[0]}/${s2[1]}/?random`;
			},
		},
		// PlaceBear
		PlaceBear: {
			getImgUrl: (s) => {
				var s2 = s.split("x");
				return `https://placebear.com/${s2[0]}/${s2[1]}`;
			},
		},
	},
	currentProvider: "random",
	getPrvd: function () {
		// Select random image provider
		if (this.currentProvider === "random") {
			let providers = Object.keys(this.list);
			let randomIndex = Math.floor(Math.random() * providers.length);
			return providers[randomIndex];
		}
		return this.currentProvider;
	},
	setPrvd: function (currentProvider) {
		this.currentProvider = currentProvider;
	},
	getImgUrl: function (size) {
		return this.list[this.getPrvd()].getImgUrl(size);
	},
};
