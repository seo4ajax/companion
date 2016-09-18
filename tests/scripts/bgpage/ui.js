/* global QUnit, app */

const browserAction = {};
const configuration = {
	BADGE_ON_LABEL: "",
	BADGE_OFF_LABEL: "",
	BADGE_ON_COLOR: "",
	BADGE_OFF_COLOR: "",
	HELP_PAGE_PATH: ""
};
const tabs = {};
let ui;

QUnit.module("ui", {
	beforeEach: () => {
		ui = app.ui(browserAction, configuration, tabs);
	},
	afterEach: () => {
		browserAction.setBadgeText = null;
		browserAction.setBadgeBackgroundColor = null;
		browserAction.setIcon = null;
		tabs.create = null;
		browserAction.onClicked = null;
	}
});

QUnit.test("refreshBadge(details)", assert => {
	browserAction.setBadgeText = details => {
		assert.equal(typeof details.text, "string", "browserAction.setBadgeText: details.text is a string");
	};
	browserAction.setBadgeBackgroundColor = details => {
		assert.equal(typeof details.color, "string", "browserAction.setBadgeBackgroundColor: details.color is a string");
	};
	const value = ui.refreshBadge({ enabled: false });
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("refreshIcon(tabId, details)", assert => {
	browserAction.setIcon = details => {
		assert.equal(typeof details.path, "string", "browserAction.setIcon: details.path is a string");
	};
	const value = ui.refreshIcon(0, {});
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("displayWelcomePage()", assert => {
	tabs.create = url => {
		assert.equal(typeof url, "string", "tabs.create: url is a string");
	};
	const value = ui.displayWelcomePage();
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.test("onButtonClick(listener)", assert => {
	browserAction.onClicked = {
		addListener: listener => {
			assert.equal(typeof listener, "function", "browserAction.onClicked.addListener: listener is a function");
		}
	};
	const value = ui.onButtonClick(() => { });
	assert.equal(value, undefined, "returned value is undefined");
});

QUnit.start();