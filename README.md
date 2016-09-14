# SEO4Ajax Companion

SEO4Ajax Companion allows testing the [Google Ajax Scheme](https://developers.google.com/webmasters/ajax-crawling/docs/learn-more) implementation directly in your browser.

## How to install the extension

You can install SEO4Ajax Companion through the [Chrome web store](https://chrome.google.com/webstore/detail/seo4ajax-companion/biomhooeobfaecacpeblladnfbjebnnp) or load the unpacked extension as described [here](https://developer.chrome.com/extensions/getstarted#unpacked).  

## How to use the extension

- Open the URL of any website implementing the [Google Ajax Scheme](https://developers.google.com/webmasters/ajax-crawling/docs/learn-more) specification.
- The extension checks that the website is respecting the specification and appends the query parameter `_escaped_fragment_=` to the URL if so.
- The extension disables JavaScript so you can preview exactly what compliant bots see, in your browser.
- The color of the extension icon turns to green ![alt text](/icons/icon-16-ok.png) meaning the snapshot of the page has been properly served.

## Notes

- You can have an overview on how bots are crawling the website by navigating through its inner links. During the navigation, the extension will append automatically the `_escaped_fragment_=` query parameter and the icon status will be updated.
- Click on the icon to enable/disable the extension. When disabled, the extension icon stays gray ![alt text](/icons/icon-16-default.png) and a badge labelled "off" is displayed above the icon.
- Go to the options page (via the contextual menu of extension icon) to set the user-agent used when downloading snapshots.
- When enabled, the color of the extension icon will be gray ![alt text](/icons/icon-16-default.png) if the extension is not active (e.g. on chrome://* pages).

## Troubleshooting

### The extension doesn't append the `_escaped_fragment_=` query parameter to the URL. The color of the extension icon stays black ![alt text](/icons/icon-16.png).

The cause can vary depending on how the website implements the Google Ajax Scheme specification:

- If the website is using the [History API](https://developer.mozilla.org/en/docs/Web/API/History) to handle navigation, then make sure that the `<meta name="fragment" content="!">` is present in the `<head>` of the page.
- If the website is relying on the [fragment identifier](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax) to handle navigation, then make sure that fragments begin with #! (e.g. #!home instead of #home).

### Instead of being green, the color of the extension icon is orange ![alt text](/icons/icon-16-warning.png) or red ![alt text](/icons/icon-16-error.png).

This indicates that the page is correctly implementing the Google Ajax Scheme specification but the snapshot content is almost identical (orange) or identical (red) to the page served without the `_escaped_fragment_=` parameter.

- If the displayed page content is complete, this could mean there is no need to implement the Google Ajax Scheme specification.
- If the display page is partially rendered or empty then it probably means the server is not able to provide the snapshot of the page. You can also check that the user-agent is not blocked by the server and change it if needed in the options page.

### The extension doesn't work

Please contact us at team@seo4ajax.com. We will do our best to fix your issue.