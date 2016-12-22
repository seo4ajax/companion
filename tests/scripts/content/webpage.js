/* global QUnit, app */

const win = {
	stop() { }
};
const doc = {};
const configuration = {};
const minhash = {};
const tokenizer = {};
const url = {};
let webpage;

QUnit.module("business", {
	beforeEach: () => {
		webpage = app.webpage(win, doc, configuration, minhash, tokenizer, url);
	},
	afterEach: () => {
		url.isEscaped = null;
		url.getUnescaped = null;
		win.fetch = null;
		tokenizer.getTokens = null;
		minhash.similarity = null;
		url.reset = null;
		doc.head = null;
		url.isHashBang = null;
		url.getEscapedSearch = null;
		url.setSearch = null;
		win.addEventListener = null;
		url.href = null;
	}
});

QUnit.test("isEscaped()", assert => {
	assert.expect(2);
	const TEST_VALUE = false;
	url.isEscaped = () => {
		assert.ok(true, "url.isEscaped method called");
		return TEST_VALUE;
	};
	webpage = app.webpage(win, doc, configuration, minhash, tokenizer, url);
	const value = webpage.isEscapedURL();
	assert.equal(value, TEST_VALUE, "returned value is OK");
});

QUnit.test("getProbabilityEscapedKO()", assert => {
	assert.expect(11);
	const done = assert.async();
	const TEST_VALUE = 0.42;
	url.getUnescaped = () => {
		assert.ok(true, "url.getUnescaped method called");
		return "";
	};
	url.href = "";
	win.fetch = (url, options) => {
		assert.equal(typeof url, "string", "window.fetch: url is a string");
		assert.equal(options.credentials, "include", "window.fetch: options.credentials is OK");
		return Promise.resolve({
			status: 200,
			text: () => Promise.resolve("")
		});
	};
	tokenizer.getTokens = text => {
		assert.equal(typeof text, "string", "tokenizer.getTokens: text is a string");
		return new Set();
	};
	minhash.similarity = (set1, set2) => {
		assert.ok(set1 instanceof Set, "minhash.similarity: set1 is a Set");
		assert.ok(set2 instanceof Set, "minhash.similarity: set2 is a Set");
		return TEST_VALUE;
	};
	webpage = app.webpage(win, doc, configuration, minhash, tokenizer, url);
	const probabilityPromise = webpage.getProbabilityEscapedKO();
	assert.equal(probabilityPromise instanceof Promise, true, "returned value is a Promise");
	probabilityPromise.then(probability => {
		assert.equal(probability, TEST_VALUE, "then: probability is OK");
		done();
	});
});

QUnit.test("resetURL()", assert => {
	assert.expect(2);
	url.reset = () => {
		assert.ok(true, "url.reset method called");
	};
	webpage = app.webpage(win, doc, configuration, minhash, tokenizer, url);
	const value = webpage.resetURL();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("escapeURL()", assert => {
	assert.expect(5);
	const TEST_VALUE = "42";
	const done = assert.async();
	doc.head = {
		querySelector: selector => {
			assert.equal(selector, "meta[name=fragment][content=\"!\"]", "document.querySelector: selector is OK");
			return {};
		}
	};
	url.isHashBang = () => {
		assert.ok(true, "url.isHashBang method called");
		return false;
	};
	url.getEscapedSearch = () => {
		assert.ok(true, "url.getEscapedSearch method called");
		return Promise.resolve(TEST_VALUE);
	};
	url.setSearch = search => {
		assert.equal(search, TEST_VALUE, "url.setSearch: search is OK");
		done();
	};
	const value = webpage.escapeURL();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("onHashBangChange(listener)", assert => {
	assert.expect(3);
	win.addEventListener = (type, listener) => {
		assert.equal(type, "hashchange", "window.addEventListener: type is OK");
		assert.equal(typeof listener, "function", "window.addEventListener: listener is a function");
	};
	const value = webpage.onHashBangChange(() => { });
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();