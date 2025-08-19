const sectionCheckbox = document.getElementById("shorts-block");
const tabCheckbox = document.getElementById("shorts-tab");

//load saves
browser.storage.local.get(["hideShorts","hideShortsTab"]).then(result => {
    sectionCheckbox.checked = result.hideShorts || false;
    tabCheckbox.checked = result.hideShortsTab || false;
});

//save changes
function save(){
    browser.storage.local.set({
        "hideShorts":sectionCheckbox.checked,
        "hideShortsTab":tabCheckbox.checked
    });
}
sectionCheckbox.addEventListener("change", save);
tabCheckbox.addEventListener("change", save);