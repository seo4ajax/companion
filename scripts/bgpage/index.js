/* global chrome, window, app */

(() => {

	const [welcome, ui, business] = (() => {
		const netfilters = app.misc.netfilters(chrome.webRequest);
		const configuration = app.configuration(chrome.storage);
		const welcome = app.welcome(chrome.runtime);
		const tabs = app.tabs(chrome.tabs, chrome.runtime);
		const ui = app.ui(chrome.browserAction, configuration, tabs);
		const network = app.network(configuration, netfilters);
		const business = app.business(configuration, tabs, network);
		return [welcome, ui, business];
	})();

	window.init = business.init;
	welcome.onInstalled(ui.displayWelcomePage);
	business.init();
	business.getConfiguration().then(ui.refreshBadge);
	business.onUpdate(ui.refreshIcon);
	ui.onButtonClick(() => business.toggleEnabled().then(ui.refreshBadge));

})();