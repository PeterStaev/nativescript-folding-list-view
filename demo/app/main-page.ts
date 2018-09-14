/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { EventData } from "data/observable";
import { Page, isAndroid } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

import { FoldingListView, ItemEventData } from "nativescript-folding-list-view";

export function navigatingTo(args: EventData) {
    const page = args.object as Page;
    
    setTimeout(() => {
        page.bindingContext = new HelloWorldModel();
    }, 500);
}

export function detailDataLoader(item: any, index: number) {
    item.set("isBusyIn", true);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // item.details = "test";
            item.details = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            // item.details += item.details;
            // item.details += item.details;
            resolve(item);

            item.set("isBusyIn", false);
        }, 3000);
    });
}

export function loadMoreItems() {
    console.log("LOAD MORE ITEMS");
}

export function itemLoading({ index, view }: ItemEventData) {
    console.log(`ITEM LOADING ${index}`);
    
    if (isAndroid) {
        // HACK: Button inside the ListView prevents item click
        view.container.getViewById("btn").android.setFocusable(false);
    }
}

export function buttonTap() {
    console.log("TAP");
}