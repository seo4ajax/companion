/* global QUnit, app */

const doc = {};
const loc = {};
const hist = {};
const configuration = {
	ESCAPED_FRAGMENT: "_escaped_fragment_=",
	ESCAPED_FRAGMENT_FIRST_PARAM: "?_escaped_fragment_=",
	ESCAPED_FRAGMENT_LAST_PARAM: "&_escaped_fragment_=",
	HASHBANG: "#!"
};
let url;

QUnit.module("url", {
	beforeEach: () => {
		url = app.url(doc, loc, hist, configuration);
	},
	afterEach: () => {
		loc.hash = null;
		loc.search = null;
		loc.pathname = null;
		loc.replace = null;
	}
});

QUnit.test("href", assert => {
	assert.expect(1);
	const TEST_VALUE = "42";
	loc.href = TEST_VALUE;
	url = app.url(doc, loc, hist, configuration);
	assert.equal(url.href, TEST_VALUE, "href is OK");
});

QUnit.test("isHashBang()", assert => {
	assert.expect(1);
	assert.equal(url.isHashBang(), false, "isHashBang() is false");
});

QUnit.test("isHashBang()", assert => {
	assert.expect(1);
	loc.hash = "#!test";
	assert.equal(url.isHashBang(), true, "isHashBang() is true");
});

QUnit.test("isEscaped()", assert => {
	assert.expect(1);
	assert.equal(url.isEscaped(), false, "isEscaped() is false");
});

QUnit.test("isEscaped()", assert => {
	assert.expect(1);
	loc.search = "?_escaped_fragment_=test";
	assert.equal(url.isEscaped(), true, "isEscaped() is true");
});

QUnit.test("isEscaped()", assert => {
	assert.expect(1);
	loc.search = "?test&_escaped_fragment_=";
	assert.equal(url.isEscaped(), true, "isEscaped() is true");
});

QUnit.test("getEscapedSearch()", assert => {
	assert.expect(1);
	loc.search = "";
	assert.equal(url.getEscapedSearch(), "?_escaped_fragment_=", "getEscapedSearch() is OK");
});

QUnit.test("getEscapedSearch()", assert => {
	assert.expect(1);
	const TEST_VALUE = 42;
	loc.search = `?${TEST_VALUE}`;
	assert.equal(url.getEscapedSearch(), `?${TEST_VALUE}&_escaped_fragment_=`, "getEscapedSearch() is OK");
});

QUnit.test("getHashBangEscapedSearch()", assert => {
	assert.expect(1);
	const TEST_VALUE = 42;
	loc.hash = `#!${TEST_VALUE}`;
	assert.equal(url.getHashBangEscapedSearch(), "?_escaped_fragment_=" + TEST_VALUE, "getHashBangEscapedSearch() is OK");
});

QUnit.test("getUnescaped()", assert => {
	assert.expect(1);
	const TEST_VALUE = 42;
	loc.pathname = "";
	loc.search = `?${TEST_VALUE}&_escaped_fragment_=`;
	assert.equal(url.getUnescaped(), `?${TEST_VALUE}`, `getUnescaped() is OK`);
});

QUnit.test("setSearch()", assert => {
	assert.expect(2);
	const TEST_VALUE = "42";
	loc.pathname = "";
	loc.replace = path => {
		assert.equal(path, TEST_VALUE, "location.replace: path is OK");
	};
	assert.equal(url.setSearch(TEST_VALUE), undefined, "returned value is undefined");
});

QUnit.test("reset()", assert => {
	assert.expect(2);
	const TEST_VALUE = "42";
	loc.pathname = TEST_VALUE;
	loc.search = "?_escaped_fragment_=";
	loc.replace = path => {
		assert.equal(path, TEST_VALUE, "location.replace: path is OK");
	};
	assert.equal(url.reset(), undefined, "returned value is undefined");
});

QUnit.test("reset()", assert => {
	assert.expect(2);
	const TEST_VALUE = "42";
	const QUERY_PARAM = "?test";
	loc.pathname = TEST_VALUE;
	loc.search = `${QUERY_PARAM}&_escaped_fragment_=`;
	loc.replace = path => {
		assert.equal(path, TEST_VALUE + QUERY_PARAM, "location.replace: path is OK");
	};
	assert.equal(url.reset(), undefined, "returned value is undefined");
});

QUnit.start();