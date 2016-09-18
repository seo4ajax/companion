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
	}
});

QUnit.test("isEscaped()", assert => {
	url.isEscaped = () => {
		assert.ok(true, "url.isEscaped method called");
	};
	webpage = app.webpage(win, doc, configuration, minhash, tokenizer, url);
	const value = webpage.isEscapedURL();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("getProbabilityEscapedOK()", assert => {
	const TEST_VALUE = 0.42;
	url.getUnescaped = () => {
		assert.ok(true, "window.fetch method called");
		return "";
	};
	win.fetch = () => {
		assert.ok(true, "window.fetch method called");
		return Promise.resolve({
			status: 200,
			text: () => Promise.resolve("")
		});
	};
	tokenizer.getTokens = () => {
		assert.ok(true, "tokenizer.getTokens method called");
		return [];
	};
	minhash.similarity = () => {
		assert.ok(true, "minhash.similarity method called");
		return TEST_VALUE;
	};
	const probabilityPromise = webpage.getProbabilityEscapedOK();
	assert.equal(probabilityPromise instanceof Promise, true, "returned value is a Promise");
	probabilityPromise.then(probability => {
		assert.equal(probability, TEST_VALUE, "then: probability is OK");
	});
});

QUnit.test("resetURL()", assert => {
	url.reset = () => {
		assert.ok(true, "url.reset method called");
	};
	webpage = app.webpage(win, doc, configuration, minhash, tokenizer, url);
	const value = webpage.resetURL();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("escapeURL()", assert => {
	doc.head = {
		querySelector: () => {
			assert.ok(true, "document.querySelector method called");
			return {};
		}
	};
	url.isHashBang = () => {
		assert.ok(true, "url.isHashBang method called");
		return false;
	};
	url.getEscapedSearch = () => {
		assert.ok(true, "url.getEscapedSearch method called");
		return Promise.resolve();
	};
	url.setSearch = () => {
		assert.ok(true, "url.setSearch method called");
	};
	const value = webpage.escapeURL();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("onHashBangChange(listener)", assert => {
	win.addEventListener = (type, listener) => {
		assert.equal(type, "hashchange", "window.addEventListener: type is OK");
		assert.equal(typeof listener, "function", "window.addEventListener: listener is a function");
	};
	const value = webpage.onHashBangChange(() => { });
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();