function redirect(link = document.URL) {
    if (link.includes("shorts")) {
        console.log("shorts detected");
        let videoId = link.split("/shorts/")[1].split("?")[0];
        history.pushState(null,"","https://www.youtube.com/watch?v=" + videoId);
        window.location.reload()
        console.log("redirected");
    }
}

document.addEventListener("click", () => { //This is the most reliable way check for shorts content I found so far
    console.log("click event triggered");
    redirect();
});

redirect();