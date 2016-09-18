/* global QUnit, app */

const netfilters = {};
const configuration = { ESCAPED_FRAGMENT_FIRST_PARAM: "" };
let network;

QUnit.module("network", {
	beforeEach: assert => {
		network = app.network(configuration, netfilters);
		netfilters.init = () => {
			netfilters.init = null;
			assert.ok(true, "netfilters.init method called");
		};
		const value = network.init({});
		assert.equal(value, undefined, "network.init: returned value is undefined");
	}, afterEach: () => {
		netfilters.enable = null;
		netfilters.disable = null;
	}
});

QUnit.test("setFiltering(true)", assert => {
	netfilters.enable = () => {
		assert.ok(true, "netfilters.enable method called");
	};
	const value = network.setFiltering(true);
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("setFiltering(false)", assert => {
	netfilters.disable = () => {
		assert.ok(true, "netfilters.disable method called");
	};
	const value = network.setFiltering(false);
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();