/* global configuration, tabs, network */

/* exported business */
var business = (() => {

	return Object.freeze({
		init,
		getConfiguration: configuration.get,
		toggleEnabled,
		onUpdate: tabs.onUpdate
	});

	function init() {
		return configuration.get().then(network.init);
	}

	function toggleEnabled() {
		return configuration.get()
			.then(updateConfiguration)
			.then(configuration.set)
			.then(setNetworkFiltering);
	}

	function updateConfiguration(config) {
		config.enabled = !config.enabled;
		return config;
	}

	function setNetworkFiltering(config) {
		network.setFiltering(config.enabled);
		return config;
	}

})();