/* global QUnit, app */

const ENABLED_STORAGE_KEY = "configuration.enabled";
const USER_AGENT_STORAGE_KEY = "configuration.userAgent";
const ENABLED_CONFIG_KEY = "enabled";
const USER_AGENT_CONFIG_KEY = "userAgent";

const storage = {};
let configuration;

QUnit.module("configuration", {
	beforeEach: () => {
		configuration = app.configuration(storage);
	}
});

QUnit.test("configuration.set", assert => {
	const TEST_VALUE = {
		[ENABLED_CONFIG_KEY]: true,
		[USER_AGENT_CONFIG_KEY]: true
	};
	const done = assert.async();
	storage.local = {
		set: (data, callback) => {
			storage.local = null;
			assert.equal(data[ENABLED_STORAGE_KEY], TEST_VALUE[ENABLED_CONFIG_KEY], `storage.local.set: ${ENABLED_STORAGE_KEY} is OK`);
			assert.equal(data[USER_AGENT_STORAGE_KEY], TEST_VALUE[USER_AGENT_CONFIG_KEY], `storage.local.set: ${USER_AGENT_STORAGE_KEY} is OK`);
			assert.equal(typeof callback, "function", "storage.local.set: callback is a function");
			callback(TEST_VALUE);
		}
	};
	const promiseConfiguration = configuration.set(TEST_VALUE);
	assert.ok(promiseConfiguration instanceof Promise, "returned value is a Promise");
	promiseConfiguration.then(config => {
		assert.equal(config, TEST_VALUE, "then: config is OK");
		done();
	});
});

QUnit.test("configuration.get", assert => {
	const TEST_VALUE = {
		[ENABLED_CONFIG_KEY]: true,
		[USER_AGENT_CONFIG_KEY]: "42"
	};
	const done = assert.async();
	storage.local = {
		get: (keys, callback) => {
			storage.local = null;
			assert.ok(keys.includes(ENABLED_STORAGE_KEY), `storage.local.get: ${ENABLED_STORAGE_KEY} key is OK`);
			assert.ok(keys.includes(USER_AGENT_STORAGE_KEY), `storage.local.get: ${USER_AGENT_STORAGE_KEY} key is OK`);
			assert.equal(typeof callback, "function", "storage.local.get: callback is a function");
			callback({
				[ENABLED_STORAGE_KEY]: TEST_VALUE[ENABLED_CONFIG_KEY],
				[USER_AGENT_STORAGE_KEY]: TEST_VALUE[USER_AGENT_CONFIG_KEY]
			});
		}
	};
	const promiseConfiguration = configuration.get();
	assert.ok(promiseConfiguration instanceof Promise, "returned value is a Promise");
	promiseConfiguration.then(config => {
		assert.equal(config[ENABLED_CONFIG_KEY], TEST_VALUE[ENABLED_CONFIG_KEY], `then: ${ENABLED_CONFIG_KEY} is OK`);
		assert.equal(config[USER_AGENT_CONFIG_KEY], TEST_VALUE[USER_AGENT_CONFIG_KEY], `then: ${USER_AGENT_CONFIG_KEY} is OK`);
		done();
	});
});

QUnit.test("configuration.onChange", assert => {
	storage.onChanged = {
		addListener: listener => {
			storage.onChanged.addListener = null;
			assert.equal(typeof listener, "function", "storage.onChanged.addListener: listener is a function");
		}
	};
	const value = configuration.onChange(() => { });
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();