const sectionCheckbox = document.getElementById("shorts-block");
const tabCheckbox = document.getElementById("shorts-tab");
const onOff = document.getElementById("on-off");
const icon = document.getElementById("icon");
const bg = document.getElementById("bg");

//load saves
chrome.storage.local.get(["hideShorts","hideShortsTab","onOff"]).then(result => {
    sectionCheckbox.checked = result.hideShorts || false;
    tabCheckbox.checked = result.hideShortsTab || false;
    onOff.checked = result.onOff==undefined ? true : result.onOff; 
});

//save changes
function save(){
    chrome.storage.local.set({
        "hideShorts":sectionCheckbox.checked,
        "hideShortsTab":tabCheckbox.checked,
        "onOff": onOff.checked
    });
    if(onOff.checked){
        icon.style.filter = "drop-shadow(0 15px 17px #ff0000ff)";
    }
    else{
        icon.style.filter = "drop-shadow(0 15px 17px #000000ff)";
    }
}

sectionCheckbox.addEventListener("change", save);
tabCheckbox.addEventListener("change", save);
onOff.addEventListener("change", save);
