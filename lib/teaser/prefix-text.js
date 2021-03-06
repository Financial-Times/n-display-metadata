const assert = require('../utils/assert');
const find = require('../utils/find');

module.exports = ({ annotations = [], containedIn = [] }) => {
	const brand = find.brand(annotations);
	const genre = find.genre(annotations);

	if (assert.isOpinion(genre)) {
		return brand && brand.prefLabel;
	} else {
		if (assert.isInPackage(containedIn)) {
			const pkg = containedIn[0];
			return pkg.brand;
		} else {
			if (assert.isGenrePrefix(genre)) {
				return genre.prefLabel;
			}
		}
	}
};
