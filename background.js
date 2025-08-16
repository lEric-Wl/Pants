function listener(details){
  console.log("updated", details.url);
  setTimeout(() =>{
    browser.tabs.sendMessage(details.tabId, {action: "redirect"});
  },250)
}

browser.webNavigation.onHistoryStateUpdated.addListener(listener,null);
