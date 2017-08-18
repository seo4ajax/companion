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
			bgpage.init();
			webpage.getProbabilityEscapedKO()
				.then(bgpage.updateTab)
				.catch(console.error);
			webpage.getCaptureInfo()
				.then(displayCaptureInfo);
		} else {
			webpage.escapeURL();
		}
	}

	function displayCaptureInfo(info) {
		console.group("%c SEO4Ajax Companion", "color: #00a88e");
		console.info();
		console.info("Title: %c" + (info.title || "(empty)"), "color: #00a88e");
		console.info("Description: %c" + (info.description || "(empty)"), "color: #00a88e");
		console.info("Canonical URL: %c" + (info.canonical || "(default URL)"), "color: #00a88e");
		console.info("Meta robots: %c" + (info.robots || "(index, follow)"), "color: #00a88e");
		console.groupEnd();
	}

};