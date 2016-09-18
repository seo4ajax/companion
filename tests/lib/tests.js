/* global window, document, location */

(() => {

	const SCRIPT_PATHS = [
		["configuration.js"],
		["bgpage/misc/netfilters.js", "bgpage/business.js", "bgpage/network.js", "bgpage/tabs.js", "bgpage/ui.js", "bgpage/welcome.js"],
		["content/misc/minhash.js", "content/misc/tokenizer.js", "content/bgpage.js", "content/business.js", "content/url.js", "content/webpage.js"]
	];
	const SELECTED_CLASS = "selected";
	const TEMPLATE_ID = "template-test-container";
	const TEMPLATE_FILE_PATH = "/tests/ui/template.html";
	const SCRIPTS_PATH = "/scripts";
	const TESTS_PATH = "/tests/scripts";
	const STYLESHEET_PATH = "/tests/vendor/qunit.css";

	let selectedTab;

	SCRIPT_PATHS.forEach(group => {
		const groupContainer = document.createElement("div");
		group.forEach(scriptPath => appendTest(groupContainer, scriptPath));
		document.body.querySelector("ul").appendChild(groupContainer);
	});
	refresh();
	window.onhashchange = refresh;

	function refresh() {
		const link = document.querySelector(`a[href=${JSON.stringify(location.hash)}]`);
		if (link) {
			const container = link.parentElement;
			if (selectedTab) {
				selectedTab.classList.remove(SELECTED_CLASS);
			}
			container.classList.add(SELECTED_CLASS);
			selectedTab = container;
		} else {
			location.hash = document.querySelector("ul li a").hash;
		}
	}

	function appendTest(parent, scriptPath) {
		const template = document.getElementById(TEMPLATE_ID).cloneNode(true);
		const link = template.querySelector("a");
		template.removeAttribute("id");
		link.textContent = scriptPath;
		link.href = `#${scriptPath}`;
		appendIframe(template, scriptPath);
		parent.appendChild(template);
	}

	function appendIframe(parent, scriptPath) {
		const iframe = document.createElement("iframe");
		iframe.src = TEMPLATE_FILE_PATH;
		parent.appendChild(iframe);
		iframe.onload = iframeOnload(iframe, scriptPath);
	}

	function iframeOnload(iframe, scriptPath) {
		return () => {
			const doc = iframe.contentDocument;
			doc.title = scriptPath;
			appendStylesheet(doc.head, STYLESHEET_PATH);
			const body = doc.body;
			appendScript(body, `${SCRIPTS_PATH}/${scriptPath}`);
			appendScript(body, `${TESTS_PATH}/${scriptPath}`);
		};
	}

	function appendStylesheet(parent, path) {
		const stylesheet = document.createElement("link");
		stylesheet.rel = "stylesheet";
		stylesheet.href = path;
		parent.appendChild(stylesheet);
	}

	function appendScript(parent, path) {
		const script = document.createElement("script");
		script.async = false;
		script.src = path;
		parent.appendChild(script);
	}

})();