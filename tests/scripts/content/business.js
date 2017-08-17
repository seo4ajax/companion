/* global QUnit, app */

const console = {};
const configuration = {};
const webpage = {};
const bgpage = {};
let business;

QUnit.module("business", {
	beforeEach: () => {
		business = app.business(console, configuration, webpage, bgpage);
	},
	afterEach: () => {
		configuration.get = null;
		configuration.onChange = null;
		webpage.onHashBangChange = null;
		webpage.isEscapedURL = null;
		webpage.escapeURL = null;
		webpage.getProbabilityEscapedKO = null;
		bgpage.init = null;
		bgpage.updateTab = null;
	}
});

QUnit.test("init() - disabled", assert => {
	assert.expect(4);
	configuration.onChange = (listener) => {
		assert.equal(typeof listener, "function", "configuration.onChange: listener is a function");
	};
	webpage.onHashBangChange = (listener) => {
		assert.equal(typeof listener, "function", "configuration.onHashBangChange: listener is a function");
	};
	configuration.get = () => {
		assert.ok(true, "configuration.get method called");
		const promiseDisabled = Promise.resolve({ enabled: false });
		return promiseDisabled;
	};
	const value = business.init();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("init() - enabled, regular path", assert => {
	assert.expect(6);
	const done = assert.async();
	configuration.onChange = (listener) => {
		assert.equal(typeof listener, "function", "configuration.onChange: listener is a function");
	};
	webpage.onHashBangChange = (listener) => {
		assert.equal(typeof listener, "function", "configuration.onHashBangChange: listener is a function");
	};
	configuration.get = () => {
		assert.ok(true, "configuration.get method called");
		return Promise.resolve({ enabled: true });
	};
	webpage.isEscapedURL = () => {
		assert.ok(true, "webpage.isEscapedURL method called");
		return false;
	};
	webpage.escapeURL = () => {
		assert.ok(true, "webpage.escapeURL method called");
		done();
	};
	const value = business.init();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("init() - enabled, escaped path", assert => {
	assert.expect(8);
	const TEST_VALUE = 42;
	const done = assert.async();
	configuration.onChange = (listener) => {
		assert.equal(typeof listener, "function", "configuration.onChange: listener is a function");
	};
	webpage.onHashBangChange = (listener) => {
		assert.equal(typeof listener, "function", "configuration.onHashBangChange: listener is a function");
	};
	configuration.get = () => {
		assert.ok(true, "configuration.get method called");
		return Promise.resolve({ enabled: true });
	};
	webpage.isEscapedURL = () => {
		assert.ok(true, "webpage.isEscapedURL method called");
		return true;
	};
	bgpage.init = () => {
		assert.ok(true, "bgpage.init method called");
	};
	webpage.getProbabilityEscapedKO = () => {
		assert.ok(true, "webpage.getProbabilityEscapedKO method called");
		return Promise.resolve(TEST_VALUE);
	};
	bgpage.updateTab = (probabilityEscapedKO) => {
		assert.equal(probabilityEscapedKO, TEST_VALUE, "probabilityEscapedKO is OK");
		done();
	};
	const value = business.init();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();