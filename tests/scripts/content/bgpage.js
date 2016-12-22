/* global QUnit, app */

const win = {};
const doc = { hasFocus() { return true; } };
const runtime = {};
let bgpage;

QUnit.module("bgpage", {
	beforeEach: () => {
		bgpage = app.bgpage(win, doc, runtime);
	},
	afterEach: () => {
		runtime.sendMessage = null;
	}
});

QUnit.test("init()", assert => {
	assert.expect(3);
	const done = assert.async();
	runtime.sendMessage = message => {
		assert.equal(message.init, true, "runtime.sendMessage: message.init is true");
		done();
	};
	runtime.onMessage = { 
		addListener: () => {
			assert.ok(true, "runtime.onMessage.addListener method called");
		}
	};
	const value = bgpage.init();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("updateTab(probabilityEscapedKO)", assert => {
	assert.expect(2);
	const done = assert.async();
	const TEST_VALUE = 42;
	runtime.sendMessage = message => {
		assert.equal(message.probabilityEscapedKO, TEST_VALUE, "runtime.sendMessage: message.probabilityEscapedKO is OK");
		done();
	};
	const value = bgpage.updateTab(TEST_VALUE);
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();