function redirect(link = document.URL) {
    if (link.includes("shorts")) {
        console.log("shorts detected");
        let videoId = link.split("/shorts/")[1].split("?")[0];
        window.location.replace("https://www.youtube.com/watch?v=" + videoId);
        console.log("redirected");
    }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "redirect") {
        redirect();
        sendResponse({status: "done"});
        return true; 
    }
});
