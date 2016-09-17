/* global app */

app.bgpage = (window, document, runtime) => {

	const FOCUS_EVENT = "focus";
	const INIT_MESSAGE = { init: true };

	const focusPromise = document.hasFocus() ? Promise.resolve() : new Promise(resolveOnFocus);
	return Object.freeze({
		init,
		updateTab
	});

	function resolveOnFocus(resolve) {
		window.addEventListener(FOCUS_EVENT, onFocus);

		function onFocus() {
			resolve();
			window.removeEventListener(FOCUS_EVENT, onFocus);
		}
	}

	function init() {
		sendMessage(INIT_MESSAGE);
	}

	function updateTab(probabilityEscapedOK) {
		sendMessage({ probabilityEscapedOK });
	}

	function sendMessage(message) {
		focusPromise.then(() => runtime.sendMessage(message));
	}

};