/* global chrome */

/* exported tabs */
var tabs = (() => {

	return Object.freeze({
		create,
		onUpdate
	});

	function create(url) {
		chrome.tabs.create({ url });
	}

	function onUpdate(listener) {
		if (!chrome.runtime.onMessage.hasListeners()) {
			chrome.runtime.onMessage.addListener((message, sender) => listener(sender.tab.id, message));
		}
	}

})();