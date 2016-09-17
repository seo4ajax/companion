/* global chrome, document, location, app */

(() => {

	const WELCOME_MESSAGE_CLASS = ".welcome-message";

	const configuration = app.configuration(chrome.storage);
	if (location.search == configuration.WELCOME_QUERY_PARAM) {
		document.querySelector(WELCOME_MESSAGE_CLASS).hidden = false;
	}

})();