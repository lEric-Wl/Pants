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

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "redirect") {
        redirect();
        sendResponse({status: "done"});
        return true; 
    }
});
