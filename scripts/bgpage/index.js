/* global chrome, app */

const netfilters = app.misc.netfilters(chrome.webRequest);
const configuration = app.configuration(chrome.storage);
const welcome = app.welcome(chrome.runtime);
const tabs = app.tabs(chrome.tabs, chrome.runtime);
const ui = app.ui(chrome.browserAction, configuration, tabs);
const network = app.network(configuration, netfilters);
const business = app.business(configuration, tabs, network);

/* exported init */
var init = business.init;

welcome.onInstalled(ui.displayHelp);
business.init();
business.getConfiguration().then(ui.refreshBadge);
business.onUpdate(ui.refreshIcon);
ui.onButtonClick(() => business.toggleEnabled().then(ui.refreshBadge));