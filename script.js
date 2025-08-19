function redirect(link = document.URL) {
    if (link.includes("shorts")) {
        console.log("shorts detected");
        let videoId = link.split("/shorts/")[1].split("?")[0]; //Takes the videoId
        window.location.replace("https://www.youtube.com/watch?v=" + videoId);
        console.log("redirected");

        //Autoplays the video, as if you clicked on it normally
        const video = document.querySelector('video');
        if(video){
            video.play().catch(error => { //This is based on user autoplay settings. Some needs to be muted for autoplay to work
                video.muted = true; // Mute the video if autoplay fails
                video.play().catch(err => { //Some just does not allow autoplay at all
                    console.error("Autoplay blocked");
                });
            });
        }
    }
}

var hideShorts = false;
function findSections(){
    if(!hideShorts) return; // If the user chooses not to hide shorts, then immediately return this function
    console.log("Removing");
    let observer = new MutationObserver(() => {
        var shelves = document.querySelectorAll("ytd-rich-shelf-renderer");
        for(const shelf of shelves){
            shelf.remove();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received:", message);
    if (message.action === "redirect") {
        redirect();
        sendResponse({status: "done"});
        return true; 
    }
    else if (message.action === "home" && hideShorts == true){
        console.log("Home action triggered");
        findSections();
        sendResponse({status: "sections removed"});
        return true; 
    }
    return false;
});

findSections();