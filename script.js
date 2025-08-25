async function redirect(link = document.URL){
    let on = await browser.storage.local.get({"onOff": true});
    console.log("onOff value:", on.onOff);
    if(!on.onOff) return; 
    
    if(link.includes("shorts")){
        console.log("shorts detected");
        let videoId = link.split("/shorts/")[1].split("?")[0]; //Takes the videoId

        history.back(); //That way, the shorts page does not try to load in
        window.location.href = "https://www.youtube.com/watch?v=" + videoId;
    }
}

async function afterRedirect(){
    let video = document.querySelector("video");
    let player = document.getElementById("movie_player");

    let observer = new MutationObserver(() => {
        findSections("ytd-reel-shelf-renderer");

        console.log("found the player", video);

        //Video.play is just to check if autoplay is enabled with audio. If it is, the video should just play 
        video.play().catch((error) =>{
            if(player){ //Autoplays the video if the setting is autoplay on mute
                console.log("adding script to play video muted");
                addScript(`
                    let player = document.getElementById("movie_player");
                    player.mute()
                    player.playVideo();
                    `);
            }
        });

        observer.disconnect();
    });

    observer.observe(video, {"attributes": true, "childList": true, "subtree": true});
}

function addScript(code){
    let script = document.createElement("script");
    script.textContent = code;
    document.documentElement.appendChild(script);
    script.remove();
}

async function findSections(section = "ytd-rich-shelf-renderer"){
    let hideShorts = await browser.storage.local.get({"hideShorts": false});
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
    let hideShortsTab = await browser.storage.local.get({"hideShortsTab": false});
    console.log("hideShortsTab value:", hideShortsTab.hideShortsTab);
    if(!hideShortsTab.hideShortsTab) return; 
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
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dom content loaded for url: ", document.URL);
    if(location.hostname == "www.youtube.com" && location.pathname == "/"){ 
        console.log("On the home page");
        findSections(); //This is to call it on initial load
        removeTab();
    }
    else{
        console.log("On the video page");
        afterRedirect();
    }
});

