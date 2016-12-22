/* global app */

app.webpage = (window, document, configuration, minhash, tokenizer, url) => {

	const HASHCHANGE_EVENT = "hashchange";
	const DOM_CONTENT_LOADED_EVENT = "DOMContentLoaded";
	const LOADING_STATE = "loading";
	const META_FRAGMENT_SELECTOR = "meta[name=fragment][content=\"!\"]";
	const OBSERVER_OPTIONS = { childList: true, subtree: true };
	const FETCH_CREDENTIALS_INCLUDE = "include";
	const ERROR_HTTP_CODE = 400;

	return Object.freeze({
		isEscapedURL: url.isEscaped,
		getProbabilityEscapedKO,
		resetURL: url.reset,
		escapeURL,
		onHashBangChange
	});

	function getProbabilityEscapedKO() {
		return Promise.all([getContentTokens(url.getUnescaped()), getContentTokens(url.href)])
			.then(([unescapedContentTokens, contentTokens]) => minhash.similarity(unescapedContentTokens, contentTokens))
			.catch(() => configuration.ERROR_SIMILARITY);
	}

	function escapeURL() {
		getEscapedSearch()
			.then(setURLSearch)
			.catch(() => { /* tag <meta name="fragment" content="!"> not found */ });
	}

	function onHashBangChange(listener) {
		window.addEventListener(HASHCHANGE_EVENT, () => {
			if (url.isHashBang()) {
				listener();
			}
		});
	}

	function getContentTokens(url) {
		return window.fetch(url, { credentials: FETCH_CREDENTIALS_INCLUDE })
			.then(response => response.status >= ERROR_HTTP_CODE ? Promise.reject() : response.text())
			.then(text => tokenizer.getTokens(text));
	}

	function getEscapedSearch() {
		let promiseMetaFragment;
		if (document.head && document.head.querySelector(META_FRAGMENT_SELECTOR)) {
			promiseMetaFragment = Promise.resolve();
		} else if (document.readyState == LOADING_STATE) {
			promiseMetaFragment = new Promise(testMetaFragment);
		} else if (!url.isHashBang()) {
			promiseMetaFragment = Promise.reject();
		}
		return url.isHashBang() ? Promise.resolve(url.getHashBangEscapedSearch()) : promiseMetaFragment.then(url.getEscapedSearch);
	}

	function setURLSearch(search) {
		window.stop();
		url.setSearch(search);
	}

	function testMetaFragment(resolve, reject) {
		const observer = getMutationObserver(resolve);
		observer.observe(document.documentElement, OBSERVER_OPTIONS);
		document.addEventListener(DOM_CONTENT_LOADED_EVENT, () => {
			observer.disconnect();
			reject();
		});
	}

	function getMutationObserver(onMetaFragmentFound) {
		const observer = new window.MutationObserver(mutations => mutations.forEach(mutation => {
			if (findMetaFragment(mutation.addedNodes)) {
				observer.disconnect();
				onMetaFragmentFound();
			}
		}));
		return observer;
	}

	function findMetaFragment(nodes) {
		return Array.from(nodes).find(node => node.matches && node.matches(META_FRAGMENT_SELECTOR));
	}

};