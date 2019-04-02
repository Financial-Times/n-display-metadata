const flags = require('./flags');
const prefixText = require('./prefix-text');
const link = require('./link');
const altLink = require('./alt-link');

module.exports = (content) => {
	// 1. A link selected according to the logic agreed in the /docs folder
	const selectedLink = link(content);
	// 2. A fallback "display tag" defined with isDisplayTag predicate or legacy waterfall logic
	const selectedAltLink = altLink(content);
	// 3. The prefix text according to the logic agreed in the /docs folder
	const selectedPrefixText = prefixText(content);
	// 4. Use any link which has been selected
	const link = selectedLink || selectedAltLink;
	// 5. If we're already using the fallback link then don't try to use it again 
	const altLink = selectedLink ? selectedAltLink : null;
	// 6. Ensure that any prefix text does not match any link labels
	const prefixText = link && link.label !== selectedPrefixText ? selectedPrefixText : null;

	return {
		flags: flags(content),
		link,
		altLink,
		prefixText
	};
};
