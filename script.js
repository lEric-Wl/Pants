function redirect(link = document.URL) {
    if (link.includes("shorts")) {
        console.log("shorts detected");
        let videoId = link.split("/shorts/")[1].split("?")[0];
        window.location.replace("https://www.youtube.com/watch?v=" + videoId);
        console.log("redirected");
    }
}

/*
document.addEventListener("click", (e) => { //This is the most reliable way check for shorts content I found so far
    console.log("click event triggered");
    target = e.target.closest("a");
    console.log("target",target);
    redirect();
});
*/

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "redirect") {
        redirect();
        sendResponse({status: "done"});
        return true; // Important: lets the browser know you'll respond asynchronously
    }
});