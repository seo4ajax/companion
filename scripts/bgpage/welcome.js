/* global chrome */

/* exported welcome */
var welcome = (() => {

	const INSTALL_REASON = "install";

	return Object.freeze({
		onInstalled
	});

	function onInstalled(listener) {
		chrome.runtime.onInstalled.addListener(details => {
			if (details.reason == INSTALL_REASON) {
				listener();
			}
		});
	}

})();