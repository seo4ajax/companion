/* global app */

app.welcome = runtime => {

	const INSTALL_REASON = "install";

	return Object.freeze({
		onInstalled
	});

	function onInstalled(listener) {
		runtime.onInstalled.addListener(details => {
			if (details.reason == INSTALL_REASON) {
				listener();
			}
		});
	}

};