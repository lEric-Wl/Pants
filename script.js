var link = document.URL;
console.log("THIS IS THE LINK------------------",link);

var videoId = link.split("/").at(-1);
console.log("THIS IS THE VIDEO ID------------------", videoId);

window.location.href = "https://www.youtube.com/watch?v=" + videoId;