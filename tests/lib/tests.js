/* global window, document, location */

(() => {

	const SCRIPT_PATHS = [
		["configuration.js"],
		["bgpage/misc/netfilters.js", "bgpage/business.js", "bgpage/network.js", "bgpage/tabs.js", "bgpage/ui.js", "bgpage/welcome.js"],
		["content/misc/minhash.js", "content/misc/tokenizer.js", "content/bgpage.js", "content/business.js", "content/url.js"]
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
	window.onload = initIests;
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

	function appendTest(groupContainer, scriptPath) {
		const template = document.getElementById(TEMPLATE_ID).cloneNode(true);
		const link = template.querySelector("a");
		template.removeAttribute("id");
		link.textContent = scriptPath;
		link.href = `#${scriptPath}`;
		appendIframe(template, scriptPath);
		groupContainer.appendChild(template);
	}

	function appendIframe(parent, scriptPath) {
		const iframe = document.createElement("iframe");
		iframe.src = `${TEMPLATE_FILE_PATH}?${scriptPath}`;
		parent.appendChild(iframe);
	}

	function initIests() {
		Array.from(window.frames).forEach(iframe => {
			const stylesheet = document.createElement("link");
			const scriptPath = iframe.location.search.substring(1);
			const testScript = document.createElement("script");
			const script = document.createElement("script");
			stylesheet.rel = "stylesheet";
			stylesheet.href = STYLESHEET_PATH;
			iframe.document.title = `${scriptPath}`;
			script.async = testScript.async = false;
			script.src = `${SCRIPTS_PATH}/${scriptPath}`;
			testScript.src = `${TESTS_PATH}/${scriptPath}`;
			iframe.document.head.appendChild(stylesheet);
			iframe.document.body.appendChild(script);
			iframe.document.body.appendChild(testScript);
		});
	}

})();