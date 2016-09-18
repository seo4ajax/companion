/* global QUnit, app, document */

const doc = { implementation: document.implementation };
let tokenizer;

QUnit.module("tokenizer", {
	beforeEach: () => {
		tokenizer = app.misc.tokenizer(doc);
	}
});

QUnit.test("tokenizer('')", assert => {
	assert.expect(1);
	const value = tokenizer.getTokens("");
	assert.ok(value.size === 0, "returned value is an empty Set");
});

QUnit.test("tokenizer('test1 test2')", assert => {
	assert.expect(1);
	const value = tokenizer.getTokens("test1 test2");
	assert.ok(value.size == 2 && value.has("test1") && value.has("test2"), "returned value is Set {'test1', 'test2'}");
});

QUnit.test("tokenizer('<script>test</script><body>test1 test2</body>')", assert => {
	assert.expect(1);
	const value = tokenizer.getTokens("<script>test</script><body>test1 test2</body>");
	assert.ok(value.size == 2 && value.has("test1") && value.has("test2"), "returned value is Set {'test1', 'test2'}");
});

QUnit.test("tokenizer('<style>test</style><body>test1 test2</body>')", assert => {
	assert.expect(1);
	const value = tokenizer.getTokens("<style>test</style><body>test1 test2</body>");
	assert.ok(value.size == 2 && value.has("test1") && value.has("test2"), "returned value is Set {'test1', 'test2'}");
});

QUnit.test("tokenizer('<!-- test --><body>test1 test2</body>')", assert => {
	assert.expect(1);
	const value = tokenizer.getTokens("<style>test</style><body>test1 test2</body>");
	assert.ok(value.size == 2 && value.has("test1") && value.has("test2"), "returned value is Set {'test1', 'test2'}");
});

QUnit.start();