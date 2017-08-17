/* global app */

app.business = (configuration, tabs, network) => {

	return Object.freeze({
		init,
		getConfiguration: configuration.get,
		toggleEnabled,
		onUpdate: tabs.onUpdate
	});

	function init() {
		network.onS4AHeaderDetected(tabs.onS4AHeaderDetected);
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
		network.enable(config.enabled);
		return config;
	}

};