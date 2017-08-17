/* global app */

app.network = (configuration, netfilters) => {

	const REFERER_HEADER_NAME = "referer";
	const USER_AGENT_HEADER_NAME = "user-agent";
	const CSP_HEADER_NAME = "content-security-policy";
	const SCRIPT_SRC_DIRECTIVE = "script-src";
	const CSP_HEADER_VALUE = `${SCRIPT_SRC_DIRECTIVE} 'none',`;
	const CSP_HEADER_REPLACE = new RegExp(`${SCRIPT_SRC_DIRECTIVE}[^,]*;`, "i");
	const X_POWERED_BY_HEADER_NAME = "x-powered-by";
	const X_POWERED_BY_HEADER_VALUE = /SEO4Ajax/i;
	const VARY_HEADER_NAME = "vary";
	const VARY_HEADER_VALUE = /X-S4a-Debug/i;

	const URL_FILTER_PREFIX = "*://*/*";
	const URL_FILTER_SUFFIX = "*";
	const URLS_FILTER = [URL_FILTER_PREFIX + configuration.ESCAPED_FRAGMENT_FIRST_PARAM + URL_FILTER_SUFFIX, URL_FILTER_PREFIX + configuration.ESCAPED_FRAGMENT_LAST_PARAM + URL_FILTER_SUFFIX];
	const REQUEST_FILTER = { urls: URLS_FILTER };
	const RESPONSE_FILTER = { urls: URLS_FILTER };

	return Object.freeze({
		init,
		enable,
		onS4AHeaderDetected: netfilters.onS4AHeaderDetected
	});

	function init(config) {
		netfilters.init(getRules(config));
		if (config.enabled) {
			netfilters.enable();
		}
	}

	function enable(enabled) {
		if (enabled) {
			netfilters.enable();
		} else {
			netfilters.disable();
		}
	}

	function getRules(config) {
		return {
			s4aHeader: {
				name: X_POWERED_BY_HEADER_NAME,
				value: X_POWERED_BY_HEADER_VALUE
			},
			varyHeader: {
				name: VARY_HEADER_NAME,
				value: VARY_HEADER_VALUE
			},
			request: {
				filter: REQUEST_FILTER,
				headers: [{ name: REFERER_HEADER_NAME }, { name: USER_AGENT_HEADER_NAME, value: config.userAgent }]
			},
			response: {
				filter: RESPONSE_FILTER,
				headers: [{ name: CSP_HEADER_NAME, value: CSP_HEADER_VALUE, replace: CSP_HEADER_REPLACE }]
			}
		};
	}

};