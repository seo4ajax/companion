/* global chrome */

/* exported netfilters */
var netfilters = (() => {

	const BLOCKING_OPTION = "blocking";
	const REQUEST_HEADERS_TYPE = "requestHeaders";
	const RESPONSE_HEADERS_TYPE = "responseHeaders";
	const REQUEST_OPTIONS = [BLOCKING_OPTION, REQUEST_HEADERS_TYPE];
	const RESPONSE_OPTIONS = [BLOCKING_OPTION, RESPONSE_HEADERS_TYPE];

	let upsertRequestHeaders, upsertResponseHeaders, filterRules;
	return Object.freeze({
		init,
		enable,
		disable
	});

	function init(rules) {
		disable();
		filterRules = rules;
		upsertRequestHeaders = updateHeaders(REQUEST_HEADERS_TYPE, rules.request.headers);
		upsertResponseHeaders = updateHeaders(RESPONSE_HEADERS_TYPE, rules.response.headers);
	}

	function enable() {
		chrome.webRequest.onBeforeSendHeaders.addListener(upsertRequestHeaders, filterRules.request.filter, REQUEST_OPTIONS);
		chrome.webRequest.onHeadersReceived.addListener(upsertResponseHeaders, filterRules.response.filter, RESPONSE_OPTIONS);
	}

	function disable() {
		chrome.webRequest.onBeforeSendHeaders.removeListener(upsertRequestHeaders);
		chrome.webRequest.onHeadersReceived.removeListener(upsertResponseHeaders);
	}

	function updateHeaders(type, headers) {
		return details => {
			headers.forEach(updateHeader(type, details));
			details[type] = details[type].filter(detailsHeader => {
				const foundHeader = headers.find(header => equalsHeaderName(detailsHeader, header));
				return !foundHeader || foundHeader.value !== undefined;
			});
			return { [type]: details[type] };
		};
	}

	function updateHeader(type, details) {
		return header => {
			const foundHeader = details[type].find(detailsHeader => equalsHeaderName(detailsHeader, header));
			if (header.value !== undefined) {
				if (foundHeader) {
					foundHeader.value = header.replaced ? foundHeader.value.replace(header.replaced, header.value) : header.value;
				} else {
					details[type].push({ name: header.name, value: header.value });
				}
			}
		};
	}

	function equalsHeaderName(header, otherHeader) {
		return header.name.toLowerCase() == otherHeader.name.toLowerCase();
	}

})();