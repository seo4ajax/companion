/* global QUnit, app */

const chromeTabs = {};
const runtime = {};
let tabs;

QUnit.module("tabs", {
	beforeEach: () => {
		tabs = app.tabs(chromeTabs, runtime);
	},
	afterEach: () => {
		chromeTabs.create = null;
		runtime.onMessage = null;
	}
});

QUnit.test("create(url)", assert => {
	chromeTabs.create = details => {
		assert.equal(typeof details.url, "string", "tabs.create: details.url is a string");
	};
	const value = tabs.create("");
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("onUpdate(listener)", assert => {
	runtime.onMessage = {
		hasListeners: () => {
			return false;
		},
		addListener: listener => {
			assert.equal(typeof listener, "function", "runtime.onMessage.addListener: listener is a function");
		}
	};
	const value = tabs.onUpdate(() => { });
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();