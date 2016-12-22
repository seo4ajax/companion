/* global app */

app.bgpage = (window, document, runtime) => {

	const FOCUS_EVENT = "focus";
	const INIT_MESSAGE = { init: true };

	const focusPromise = document.hasFocus() ? Promise.resolve() : new Promise(resolveOnFocus);
	let s4aHeaderDetected;
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
		runtime.onMessage.addListener((message) => {
			if (message.url == window.location.href && message.s4aHeaderDetected) {
				s4aHeaderDetected = true;
			}
		});
	}

	function updateTab(probabilityEscapedKO) {
		sendMessage({ probabilityEscapedKO: s4aHeaderDetected ? 0 : probabilityEscapedKO });
	}

	function sendMessage(message) {
		focusPromise.then(() => runtime.sendMessage(message));
	}

};