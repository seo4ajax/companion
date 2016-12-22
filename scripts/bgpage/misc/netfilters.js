/* global app */

app.misc.netfilters = webRequest => {

	const BLOCKING_OPTION = "blocking";
	const REQUEST_HEADERS_TYPE = "requestHeaders";
	const RESPONSE_HEADERS_TYPE = "responseHeaders";
	const REQUEST_OPTIONS = [BLOCKING_OPTION, REQUEST_HEADERS_TYPE];
	const RESPONSE_OPTIONS = [BLOCKING_OPTION, RESPONSE_HEADERS_TYPE];

	let upsertRequestHeaders, upsertResponseHeaders, filterRules, s4aHeaderListener;
	return Object.freeze({
		init,
		enable,
		disable,
		onS4AHeader
	});

	function init(rules) {
		disable();
		filterRules = rules;
		upsertRequestHeaders = updateHeaders(REQUEST_HEADERS_TYPE, rules.request.headers);
		upsertResponseHeaders = updateHeaders(RESPONSE_HEADERS_TYPE, rules.response.headers);
	}

	function enable() {
		webRequest.onBeforeSendHeaders.addListener(upsertRequestHeaders, filterRules.request.filter, REQUEST_OPTIONS);
		webRequest.onHeadersReceived.addListener(detectS4AHeader, filterRules.response.filter, RESPONSE_OPTIONS);
		webRequest.onHeadersReceived.addListener(upsertResponseHeaders, filterRules.response.filter, RESPONSE_OPTIONS);
	}

	function disable() {
		webRequest.onBeforeSendHeaders.removeListener(upsertRequestHeaders);
		webRequest.onHeadersReceived.removeListener(upsertResponseHeaders);
	}

	function onS4AHeader(listener) {
		s4aHeaderListener = listener;
	}

	function detectS4AHeader(details) {
		if (details.type == "xmlhttprequest") {
			const s4aHeader = details.responseHeaders.find(header => equalsHeaderName(header, filterRules.s4aHeader) && header.value == filterRules.s4aHeader.value);
			if (s4aHeader) {
				s4aHeaderListener(details.tabId, details.url);
			}
		}
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

};