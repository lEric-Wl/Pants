function listener(details){
  console.log("updated", details.url);
  browser.tabs.sendMessage(details.tabId, {action: "redirect"});
}

browser.webNavigation.onHistoryStateUpdated.addListener(listener,null);
