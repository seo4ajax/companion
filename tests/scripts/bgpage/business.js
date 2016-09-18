/* global QUnit, app */

const network = {};
const configuration = {};
const tabs = {};
let business;

QUnit.module("business", {
	afterEach: () => {
		configuration.get = null;
		configuration.set = null;
		network.setFiltering = null;
		tabs.onUpdate = null;
	}
});

QUnit.test("init()", assert => {
	assert.expect(3);
	const done = assert.async();
	configuration.get = () => {
		assert.ok(true, "configuration.get method called");
		return Promise.resolve({});
	};
	network.init = () => {
		network.init = null;
		assert.ok(true, "network.init method called");
		done();
	};
	business = app.business(configuration, tabs, network);
	const value = business.init();
	assert.equal(value instanceof Promise, true, "returned value is a Promise");
});

QUnit.test("getConfiguration()", assert => {
	assert.expect(3);
	const done = assert.async();
	configuration.get = () => {
		assert.ok(true, "configuration.get method called");
		return Promise.resolve({});
	};
	business = app.business(configuration, tabs, network);
	const value = business.getConfiguration();
	assert.equal(value instanceof Promise, true, "returned value is a Promise");
	value.then(config => {
		assert.equal(typeof config, "object", "config is an object");
		done();
	});
});

QUnit.test("toggleEnabled()", assert => {
	assert.expect(5);
	const done = assert.async();
	configuration.get = () => {
		assert.ok(true, "configuration.get method called");
		return Promise.resolve({
			enabled: false
		});
	};
	configuration.set = config => {
		assert.equal(config.enabled, true, "configuration.set: config.enabled is true");
		return Promise.resolve(config);
	};
	network.setFiltering = enabled => {
		assert.equal(enabled, true, "network.setFiltering: config.enabled is true");
	};
	business = app.business(configuration, tabs, network);
	const value = business.toggleEnabled();
	assert.equal(value instanceof Promise, true, "returned value is a Promise");
	value.then(config => {
		assert.equal(typeof config, "object", "config is an object");
		done();
	});
});

QUnit.test("onUpdate(listener)", assert => {
	assert.expect(2);
	tabs.onUpdate = listener => {
		assert.equal(typeof listener, "function", "tabs.onUpdate: listener is a function");
	};
	business = app.business(configuration, tabs, network);
	const value = business.onUpdate(() => { });
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();