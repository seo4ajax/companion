/* global app */

app.tabs = (tabs, runtime) => {

	return Object.freeze({
		create,
		onUpdate,
		notifyS4AHeaderDetected
	});

	function create(url) {
		tabs.create({ url });
	}

	function onUpdate(listener) {
		if (!runtime.onMessage.hasListeners()) {
			runtime.onMessage.addListener((message, sender) => listener(sender.tab.id, message));
		}
	}

	function notifyS4AHeaderDetected(tabId, url) {
		tabs.sendMessage(tabId, { url, s4aHeaderDetected: true });
	}

};