/* global app */

app.business = (console, configuration, webpage, bgpage) => {

	return Object.freeze({
		init
	});

	function init() {
		configuration.onChange(onConfigurationChange);
		webpage.onHashBangChange(() => executeIfEnabled(webpage.escapeURL));
		executeIfEnabled(enable);
	}

	function onConfigurationChange(changes) {
		if (changes.enabled) {
			if (changes.enabled.newValue) {
				enable();
			} else if (webpage.isEscapedURL()) {
				webpage.resetURL();
			}
		}
	}

	function executeIfEnabled(fn) {
		configuration.get().then(config => {
			if (config.enabled) {
				fn();
			}
		});
	}

	function enable() {
		if (webpage.isEscapedURL()) {
			webpage.getProbabilityEscapedOK()
				.then(bgpage.updateTab)
				.catch(console.error);
		} else {
			bgpage.init();
			webpage.escapeURL();
		}
	}

};