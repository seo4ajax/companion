/* global chrome, configuration */


(() => {

	const SUBMIT_EVENT = "submit";

	const form = document.forms[0];
	configuration.get().then(config => form.userAgent.value = config.userAgent);
	form.addEventListener(SUBMIT_EVENT, onSubmitForm);

	function onSubmitForm(event) {
		configuration.set({ userAgent: form.userAgent.value }).then(() =>
			chrome.runtime.getBackgroundPage(bgPage => {
				bgPage.business.init();
				window.close();
			})
		);
		event.preventDefault();
	}

})();