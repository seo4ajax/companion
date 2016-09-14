

/* exported tokenizer */
var tokenizer = (() => {

	const REMOVED_ELEMENTS_CSS_SELECTOR = "script, style";
	const REMOVED_NODES_XPATH_SELECTOR = "//comment()";
	const HTML_MIME_TYPE = "text/html";

	return Object.freeze({
		getTokens
	});

	function getTokens(content, mimeType = HTML_MIME_TYPE) {
		return new Set(getTextContent(content, mimeType).split(/\s+/).filter(token => token));
	}

	function getTextContent(content, mimeType) {
		const doc = getDocument(content, mimeType);
		doc.documentElement.querySelectorAll(REMOVED_ELEMENTS_CSS_SELECTOR).forEach(script => script.remove());
		const iterator = doc.evaluate(REMOVED_NODES_XPATH_SELECTOR, doc);
		const comments = [];
		for (let node = iterator.iterateNext(); node; node = iterator.iterateNext()) {
			comments.push(node);
		}
		comments.forEach(comment => comment.remove());
		return doc.documentElement.textContent.trim();
	}

	function getDocument(content, mimeType) {
		const domParser = new window.DOMParser();
		const doc = domParser.parseFromString(content, mimeType);
		return doc;
	}

})();