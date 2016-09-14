/* global business, ui, welcome */


welcome.onInstalled(ui.displayHelp);
business.init();
business.getConfiguration().then(ui.refreshBadge);
business.onUpdate(ui.refreshIcon);
ui.onButtonClick(() => business.toggleEnabled().then(ui.refreshBadge));