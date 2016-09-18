/* global app */

app.configuration = storage => {

	const ENABLED_STORAGE_KEY = "configuration.enabled";
	const USER_AGENT_STORAGE_KEY = "configuration.userAgent";
	const STORAGE_KEYS = [USER_AGENT_STORAGE_KEY, ENABLED_STORAGE_KEY];
	const ESCAPED_FRAGMENT = "_escaped_fragment_=";
	const ESCAPED_FRAGMENT_FIRST_PARAM = `?${ESCAPED_FRAGMENT}`;
	const ESCAPED_FRAGMENT_LAST_PARAM = `&${ESCAPED_FRAGMENT}`;
	const WELCOME_QUERY_PARAM = "?welcome";
	const HASHBANG = "#!";
	const ERROR_SIMILARITY = -1;

	return Object.freeze({
		HASHBANG,
		ESCAPED_FRAGMENT,
		ESCAPED_FRAGMENT_FIRST_PARAM,
		ESCAPED_FRAGMENT_LAST_PARAM,
		WELCOME_QUERY_PARAM,
		CONFIG_USER_AGENT_DEFAULT: "Mozilla/5.0 (compatible, SEO4Ajax Companion/1.0)",
		CONFIG_ENABLED_DEFAULT: true,
		BADGE_ON_LABEL: "",
		BADGE_ON_COLOR: "#009300",
		BADGE_OFF_LABEL: "off",
		BADGE_OFF_COLOR: "gray",
		ICON_PATH_PREFIX: "icons/icon-38",
		ICON_PATH_SEPARATOR: "-",
		ICON_PATH_ERROR: "error",
		ICON_PATH_WARNING: "warning",
		ICON_PATH_OK: "ok",
		ICON_PATH_SUFFIX: ".png",
		HELP_PAGE_PATH: "ui/help.html",
		ERROR_THRESHOLD: 0.95,
		WARNING_THRESHOLD: 0.7,
		ERROR_SIMILARITY,
		get,
		set,
		onChange
	});

	function get() {
		return new Promise(resolve => storage.local.get(STORAGE_KEYS, items => resolve(mapItems(items))));
	}

	function set(config) {
		return new Promise(resolve => storage.local.set(mapConfig(config), () => resolve(config)));
	}

	function onChange(listener) {
		storage.onChanged.addListener(changes => listener(mapItems(changes)));
	}

	function mapConfig(config) {
		const items = {};
		setIfDefined(items, ENABLED_STORAGE_KEY, config.enabled);
		setIfDefined(items, USER_AGENT_STORAGE_KEY, config.userAgent);
		return items;
	}

	function mapItems(items) {
		return {
			enabled: items[ENABLED_STORAGE_KEY] !== undefined ? items[ENABLED_STORAGE_KEY] : app.configuration.CONFIG_ENABLED_DEFAULT,
			userAgent: items[USER_AGENT_STORAGE_KEY] || app.configuration.CONFIG_USER_AGENT_DEFAULT
		};
	}

	function setIfDefined(items, key, value) {
		if (value !== undefined) {
			items[key] = value;
		}
	}

};