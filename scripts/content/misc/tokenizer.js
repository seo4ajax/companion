

/* exported tokenizer */
var tokenizer = (() => {

	const REMOVED_ELEMENTS_CSS_SELECTOR = "script, style";
	const REMOVED_NODES_XPATH_SELECTOR = "//comment()";

	return Object.freeze({
		getTokens
	});

	function getTokens(content) {
		return new Set(getTextContent(content).split(/\s+/).filter(token => token));
	}

	function getTextContent(content) {
		const doc = getDocument(content);
		doc.documentElement.querySelectorAll(REMOVED_ELEMENTS_CSS_SELECTOR).forEach(script => script.remove());
		const iterator = doc.evaluate(REMOVED_NODES_XPATH_SELECTOR, doc);
		const comments = [];
		for (let node = iterator.iterateNext(); node; node = iterator.iterateNext()) {
			comments.push(node);
		}
		comments.forEach(comment => comment.remove());
		return doc.documentElement.textContent.trim();
	}

	function getDocument(content) {
		const doc = document.implementation.createHTMLDocument();
		doc.write(content);
		doc.close();
		return doc;
	}

})();