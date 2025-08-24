async function redirect(link = document.URL){
    console.log("redirect called");

    let on = await browser.storage.local.get("onOff");
    console.log("onOff value:", on.onOff);
    if(!on.onOff) return; 
    
    if(link.includes("shorts")){
        console.log("shorts detected");
        let videoId = link.split("/shorts/")[1].split("?")[0]; //Takes the videoId

        history.back(); //That way, the shorts page does not try to load in
        window.location.href = "https://www.youtube.com/watch?v=" + videoId;
        console.log("redirected");
            
        //Autoplays the video, as if you clicked on it normally
        const video = document.querySelector('video');
        if(false){
            video.play().catch(error => { //This is based on user autoplay settings. Some needs to be muted for autoplay to work
                video.muted = true; // Mute the video if autoplay fails
                video.play().catch(error => { //Some just does not allow autoplay at all
                    console.error("Autoplay blocked");
                });
            });
        }
    }
    link = document.URL; //Update the link to after redirect
    findSections("ytd-reel-shelf-renderer"); //The main player also has a shorts section

}

async function afterRedirect(){
    if(document.URL == "*://*.youtube.com") return; 
    console.log("in a video player");

    let video = document.querySelector("video");

    let observer = new MutationObserver(() => {
        findSections("ytd-reel-shelf-renderer");

        console.log("found the player");
        if(video){ //Autoplays the video
            console.log("found the video", video);
            video.play().catch(error => { //This is based on user autoplay settings. Some needs to be muted for autoplay to work
                video.muted = true; // Mute the video if autoplay fails
                video.play().catch(error => { //Some just does not allow autoplay at all
                    console.error("Autoplay blocked");
                });
            });
        }

        observer.disconnect();
    });

    observer.observe(video, {"attributes": true, "childList": true, "subtree": true});
}

async function findSections(section = "ytd-rich-shelf-renderer"){
    let hideShorts = await browser.storage.local.get("hideShorts");
    console.log("hideShorts value:", hideShorts.hideShorts);
    if(!hideShorts.hideShorts) return; //If the user chooses not to hide shorts, then immediately return this function
    console.log("Removing");
    let observer = new MutationObserver(() => {
        let shelves = document.querySelectorAll(section);
        for(const shelf of shelves){
            shelf.remove();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

async function removeTab(){
    let hideShortsTab = await browser.storage.local.get("hideShortsTab");
    console.log("hideShortsTab value:", hideShortsTab.hideShortsTab);
    if(!hideShortsTab.hideShortsTab) return; 
    console.log("Removing Shorts tab");
    let observer = new MutationObserver(() => {
        let tab = document.querySelector('[aria-label="Shorts"]');
        if(tab){
            tab.remove();
        }
        let expandedTab = document.querySelector('[title="Shorts"]');
        if(expandedTab){
            expandedTab=expandedTab.closest("ytd-guide-entry-renderer");
            if(expandedTab){
                expandedTab.remove();
            }
        }   
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener("yt-navigate-start", () => redirect());
document.addEventListener("yt-navigate-finish", () => afterRedirect());
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dom content loaded for url: ", document.URL);
    findSections(); //This is to call it on initial load
    removeTab();
});
