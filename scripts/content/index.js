/* global chrome, window, document, location, history, console, app */

const minhash = app.misc.minhash();
const tokenizer = app.misc.tokenizer(document);
const configuration = app.configuration(chrome.storage);
const bgpage = app.bgpage(window, document, chrome.runtime);
const url = app.url(document, location, history, configuration);
const webpage = app.webpage(window, document, configuration, minhash, tokenizer, url);
const business = app.business(console, configuration, webpage, bgpage);

business.init();