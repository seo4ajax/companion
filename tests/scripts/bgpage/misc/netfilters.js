/* global QUnit, app */

const webRequest = {};
let netfilters;

QUnit.module("netfilters", {
	beforeEach: assert => {
		webRequest.onBeforeSendHeaders = { removeListener: () => { } };
		webRequest.onHeadersReceived = { removeListener: () => { } };
		netfilters = app.misc.netfilters(webRequest);
		const value = netfilters.init({
			request: {
				filter: { urls: "" }
			},
			response: {
				filter: { urls: "" }
			}
		});
		assert.equal(value, undefined, "netfilters.init: returned value is undefined");
	},
	afterEach: () => {
		webRequest.onBeforeSendHeaders.addListener = null;
		webRequest.onHeadersReceived.addListener = null;
		webRequest.onBeforeSendHeaders.removeListener = null;
		webRequest.onHeadersReceived.removeListener = null;
	}
});

QUnit.test("enable()", assert => {
	assert.expect(11);
	webRequest.onBeforeSendHeaders = {
		addListener: (listener, filter, options) => {
			assert.equal(typeof listener, "function", "webRequest.onBeforeSendHeaders.addListener: listener is a function");
			assert.equal(typeof filter.urls, "string", "webRequest.onBeforeSendHeaders.addListener: filter.urls is a string");
			assert.ok(Array.isArray(options) && typeof options[0] == "string", "webRequest.onHeadersReceived.addListener: options is an array of string");
		}
	};
	webRequest.onHeadersReceived = {
		addListener: (listener, filter, options) => {
			assert.equal(typeof listener, "function", "webRequest.onHeadersReceived.addListener: listener is a function");
			assert.equal(typeof filter.urls, "string", "webRequest.onHeadersReceived.addListener: filter.urls is a string");
			assert.ok(Array.isArray(options) && typeof options[0] == "string", "webRequest.onHeadersReceived.addListener: options is an array of string");
		}
	};
	const value = netfilters.enable();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("disable()", function (assert) {
	assert.expect(4);
	webRequest.onBeforeSendHeaders = {
		removeListener: listener => {
			assert.equal(typeof listener, "function", "webRequest.onBeforeSendHeaders.removeListener: listener is a function");
		}
	};
	webRequest.onHeadersReceived = {
		removeListener: listener => {
			assert.equal(typeof listener, "function", "webRequest.onHeadersReceived.removeListener: listener is a function");
		}
	};
	const value = netfilters.disable();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();