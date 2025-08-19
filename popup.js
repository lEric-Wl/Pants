const checkbox = document.getElementById("shorts-block");

//load saves
browser.storage.local.get("hideShorts").then(result => {
    checkbox.checked = result.hideShorts || false;
});

//save changes
checkbox.addEventListener("change", () => {
    browser.storage.local.set({hideShorts: checkbox.checked});
});