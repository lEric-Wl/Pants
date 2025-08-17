function listener(details){
  console.log("updated", details.url);
  setTimeout(() =>{
    browser.tabs.sendMessage(details.tabId, {action: "redirect"}); //Signals to main script to run redirect
  },250) //Added delay to make it smoother, else trying to load in the main player immediately will cause a no connection error
}

//Param: function, website filter
browser.webNavigation.onHistoryStateUpdated.addListener(listener,null); //This works in the background and checks for url changes
