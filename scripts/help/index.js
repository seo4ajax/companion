/* global configuration */


(() => {

	const WELCOME_MESSAGE_CLASS = ".welcome-message";

	if (location.search == configuration.WELCOME_QUERY_PARAM) {
		document.querySelector(WELCOME_MESSAGE_CLASS).hidden = false;
	}

})();