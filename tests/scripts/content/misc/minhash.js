/* global QUnit, app */

let minhash;

QUnit.module("minhash", {
	beforeEach: () => {
		minhash = app.misc.minhash();
	}
});

QUnit.test("similarity(new Set(), new Set())", assert => {
	assert.expect(1);
	const value = minhash.similarity(new Set(), new Set());
	assert.equal(value, 1, "returned value is 1");
});

QUnit.test("similarity(new Set(['test']), new Set())", assert => {
	assert.expect(1);
	const value = minhash.similarity(new Set(["test"]), new Set());
	assert.equal(value, 0, "returned value is 0");
});

QUnit.test("similarity(new Set(), new Set(['test']))", assert => {
	assert.expect(1);
	const value = minhash.similarity(new Set(), new Set(["test"]));
	assert.equal(value, 0, "returned value is 0");
});

QUnit.test("similarity(new Set(['test']), new Set(['test']))", assert => {
	assert.expect(1);
	const value = minhash.similarity(new Set(["test"]), new Set(["test"]));
	assert.equal(value, 1, "returned value is 1");
});

QUnit.test("similarity(new Set(['test', 'test2']), new Set(['test']))", assert => {
	assert.expect(1);
	const value = minhash.similarity(new Set(["test", "test2"]), new Set(["test"]));
	assert.ok(value < 1, "returned value is < 1");
});

QUnit.start();