/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
    console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
    console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
browser.menus.create({
    id: "context-steal",
    title: browser.i18n.getMessage("menuItemSteal"),
    contexts: ["image"],
    checked: false
}, onCreated);


/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info) => {
    switch (info.menuItemId) {
        case "context-steal":
            let path = info.srcUrl;
            console.log(info);
            browser.windows.create({
                type: "detached_panel",
                url: "https://art.janeo.me/upload/"+path,
                width: 600,
                height: 400
            });
        break;
    }
});
