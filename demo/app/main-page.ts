/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

import { FoldingListView } from "nativescript-folding-list-view";

export function navigatingTo(args: EventData) {
    const page = args.object as Page;
    // const flv: any = page.getViewById<FoldingListView>("lv");

    // console.log(flv.foregroundTemplate());
    // console.log(flv.containerTemplate());
   page.bindingContext = new HelloWorldModel();
}