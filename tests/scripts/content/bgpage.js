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
	const done = assert.async();
	runtime.sendMessage = message => {
		assert.equal(message.init, true, "runtime.sendMessage: message.init is true");
		done();
	};
	const value = bgpage.init();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("updateTab(probabilityEscapedOK)", assert => {
	const done = assert.async();
	const TEST_VALUE = 42;
	runtime.sendMessage = message => {
		assert.equal(message.probabilityEscapedOK, TEST_VALUE, "runtime.sendMessage: message.probabilityEscapedOK is OK");
		done();
	};
	const value = bgpage.updateTab(TEST_VALUE);
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();