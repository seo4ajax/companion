/* global app */

app.ui = (browserAction, configuration, tabs) => {

	const WELCOME_QUERY_PARAM = "?welcome";

	return Object.freeze({
		refreshBadge,
		refreshIcon,
		displayWelcomePage,
		onButtonClick
	});

	function refreshBadge(config) {
		browserAction.setBadgeText({ text: config.enabled ? configuration.BADGE_ON_LABEL : configuration.BADGE_OFF_LABEL });
		browserAction.setBadgeBackgroundColor({ color: config.enabled ? configuration.BADGE_ON_COLOR : configuration.BADGE_OFF_COLOR });
	}

	function refreshIcon(tabId, pageInfo) {
		const slug = pageInfo && pageInfo.probabilityEscapedKO === undefined ? "" : configuration.ICON_PATH_SEPARATOR + getIconSlug(pageInfo.probabilityEscapedKO);
		browserAction.setIcon({ path: configuration.ICON_PATH_PREFIX + slug + configuration.ICON_PATH_SUFFIX, tabId });
	}

	function displayWelcomePage() {
		tabs.create(configuration.HELP_PAGE_PATH + WELCOME_QUERY_PARAM);
	}

	function onButtonClick(buttonClickListener) {
		browserAction.onClicked.addListener(buttonClickListener);
	}

	function getIconSlug(probabilityEscapedKO) {
		if (probabilityEscapedKO > configuration.ERROR_THRESHOLD) {
			return configuration.ICON_PATH_ERROR;
		} else if (probabilityEscapedKO > configuration.WARNING_THRESHOLD || probabilityEscapedKO == configuration.ERROR_SIMILARITY) {
			return configuration.ICON_PATH_WARNING;
		} else {
			return configuration.ICON_PATH_OK;
		}
	}

};