/*! *****************************************************************************
Copyright (c) 2018 Tangra Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
***************************************************************************** */
import { Color, EventData, Length, Template, View } from "ui/core/view";
import { ItemsSource } from "ui/list-view";

export type TemplateSelectorFunc = (item: any, index: number, items: any) => string;
export type DetailDataLoaderFunc = (item: any, index: number) => Promise<any>;

export class FoldingListView extends View {
    public static itemLoadingEvent: string;
    public static loadMoreItemsEvent: string;

    public items: any[] | ItemsSource;
    public foldsCount: number;
    public backViewColor: Color;
    public foldedRowHeight: Length;

    public foregroundItemTemplate: string | Template;
    public containerItemTemplate: string | Template;

    public itemTemplateSelector: string | TemplateSelectorFunc;
    public detailDataLoader: DetailDataLoaderFunc;

    public android: any /* android.widget.ListView */;
    public ios: any /* UITableView */;

    public refresh();
    public scrollToIndex(index: number, animated?: boolean);
    public invalidateChachedDetailData(index: number);

    public on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    public on(event: "itemLoading", callback: (args: ItemEventData) => void, thisArg?: any);
    public on(event: "loadMoreItems", callback: (args: EventData) => void, thisArg?: any);
}

export interface ItemEventData extends EventData {
    index: number;
    view: { foreground: View, container: View };
    ios: any /* UITableViewCell */;
    android: any /* android.view.ViewGroup */;
}