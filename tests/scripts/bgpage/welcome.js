/* global QUnit, app */

const runtime = {};
let welcome;

QUnit.module("welcome", {
	beforeEach: () => {
		welcome = app.welcome(runtime);
	},
	afterEach: () => {
		runtime.onInstalled.addListener = null;
	}
});

QUnit.test("onInstalled(listener)", assert => {
	runtime.onInstalled = {
		addListener: listener => {
			assert.equal(typeof listener, "function", "runtime.onInstalled.addListener: listener is a function");
		}
	};
	const value = welcome.onInstalled(() => { });
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();