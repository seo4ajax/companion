/* global configuration, netfilters */

/* exported network */
var network = (() => {

	const REFERER_HEADER_NAME = "referer";
	const USER_AGENT_HEADER_NAME = "user-agent";
	const CSP_HEADER_NAME = "content-security-policy";
	const SCRIPT_SRC_DIRECTIVE = "script-src";
	const CSP_HEADER_VALUE = `${SCRIPT_SRC_DIRECTIVE} 'none',`;
	const CSP_HEADER_REPLACE = new RegExp(`${SCRIPT_SRC_DIRECTIVE}[^,]*;`, "i");
	const URL_FILTER_PREFIX = "*://*/*";
	const URL_FILTER_SUFFIX = "*";
	const URLS_FILTER = [URL_FILTER_PREFIX + configuration.ESCAPED_FRAGMENT_FIRST_PARAM + URL_FILTER_SUFFIX, URL_FILTER_PREFIX + configuration.ESCAPED_FRAGMENT_LAST_PARAM + URL_FILTER_SUFFIX];
	const REQUEST_FILTER = { urls: URLS_FILTER };
	const RESPONSE_FILTER = { urls: URLS_FILTER };

	return Object.freeze({
		init,
		setFiltering
	});

	function init(config) {
		netfilters.init(getRules(config));
		if (config.enabled) {
			netfilters.enable();
		}
	}

	function setFiltering(enabled) {
		if (enabled) {
			netfilters.enable();
		} else {
			netfilters.disable();
		}
	}

	function getRules(config) {
		return {
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

})();