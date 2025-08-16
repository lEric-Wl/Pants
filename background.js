function listener(details){
  console.log("updated", details.url);
  setTimeout(() =>{
    browser.tabs.sendMessage(details.tabId, {action: "redirect"}); //Signals to main script to run redirect
  },250)
}

//Param: function, website filter
browser.webNavigation.onHistoryStateUpdated.addListener(listener,null); //This works in the background and checks for url changes
