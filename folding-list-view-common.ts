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
import { Observable } from "data/observable";
import { ChangedData, ObservableArray } from "data/observable-array";
import { parse } from "ui/builder";
import { CoercibleProperty, Property } from "ui/core/properties";
import { CSSType, Color, CssProperty, EventData, KeyedTemplate, Length, Style, Template, View } from "ui/core/view";
import { addWeakEventListener, removeWeakEventListener } from "ui/core/weak-event-listener";
import { Label } from "ui/label";
import { StackLayout } from "ui/layouts/stack-layout";
import { ItemsSource } from "ui/list-view";
import { ProxyViewContainer } from "ui/proxy-view-container";

export * from "ui/core/view";

import {
    DetailDataLoaderFunc,
    FoldingListView as FoldingListViewDefinition,
    ItemEventData,
    TemplateSelectorFunc,
} from ".";

export module knownTemplates {
    export const foregroundItemTemplate = "foregroundItemTemplate";
    export const containerItemTemplate = "containerItemTemplate";
}

const enum Constants {
    DefaultTemplateKey = "default",
}

const autoEffectiveRowHeight = -1;
const defaultFoldedRowHeight: Length = 44;

@CSSType("FoldingListView")
export abstract class FoldingListViewBase extends View implements FoldingListViewDefinition {
    public static itemLoadingEvent = "itemLoading";
    public static loadMoreItemsEvent = "loadMoreItems";
    // TODO: get rid of such hacks.
    public static knownFunctions = ["itemTemplateSelector", "detailDataLoader"]; // See component-builder.ts isKnownFunction

    public items: any[] | ItemsSource;
    public foldsCount: number;
    public foldedRowHeight: Length;

    public detailDataLoader: DetailDataLoaderFunc;

    public get backViewColor(): Color {
        return (this.style as any).backViewColor;
    }
    public set backViewColor(value: Color) {
        (this.style as any).backViewColor = value;
    }

    public _effectiveFoldedRowHeight: number = Length.toDevicePixels(defaultFoldedRowHeight, autoEffectiveRowHeight);

    public foregroundItemTemplate: string | Template;
    public _defaultForegroundItemTemplate: KeyedTemplate = {
        key: Constants.DefaultTemplateKey,
        createView: () => {
            if (this.foregroundItemTemplate) {
                return parse(this.foregroundItemTemplate, this);
            }
            return undefined;
        }
    };
    public _foregroundItemTemplatesInternal = new Array<KeyedTemplate>(this._defaultForegroundItemTemplate);

    public containerItemTemplate: string | Template;
    public _defaultContainerItemTemplate: KeyedTemplate = {
        key: Constants.DefaultTemplateKey,
        createView: () => {
            if (this.containerItemTemplate) {
                return parse(this.containerItemTemplate, this);
            }
            return undefined;
        }
    };
    public _containerTemplatesInternal = new Array<KeyedTemplate>(this._defaultContainerItemTemplate);

    private _itemTemplateSelector: TemplateSelectorFunc;
    private _itemTemplateSelectorBindable = new Label();
    private _cachedDetailData = new Array<any>();
    private _cellExpanded = new Array<boolean>();

    public get itemTemplateSelector(): string | TemplateSelectorFunc {
        return this._itemTemplateSelector;
    }
    public set itemTemplateSelector(value: string | TemplateSelectorFunc) {
        if (typeof value === "string") {
            this._itemTemplateSelectorBindable.bind({
                sourceProperty: null,
                targetProperty: "templateKey",
                expression: value
            });
            this._itemTemplateSelector = (item: any, index: number, items: any) => {
                item["$index"] = index;
                this._itemTemplateSelectorBindable.bindingContext = item;
                return this._itemTemplateSelectorBindable.get("templateKey");
            };
        }
        else if (typeof value === "function") {
            this._itemTemplateSelector = value;
        }
    }

    public abstract refresh();
    public abstract scrollToIndex(index: number, animated?: boolean);

    public _getForegroundItemTemplate(index: number): KeyedTemplate {
        let templateKey: string = Constants.DefaultTemplateKey;
        if (this.itemTemplateSelector) {
            const dataItem = this._getDataItem(index);
            templateKey = this._itemTemplateSelector(dataItem, index, this.items);
        }

        for (let loop = 0, length = this._foregroundItemTemplatesInternal.length; loop < length; loop++) {
            if (this._foregroundItemTemplatesInternal[loop].key === templateKey) {
                return this._foregroundItemTemplatesInternal[loop];
            }
        }

        // This is the default template
        return this._foregroundItemTemplatesInternal[0];
    }

    public _getContainerItemTemplate(index: number): KeyedTemplate {
        let templateKey: string = Constants.DefaultTemplateKey;
        if (this.itemTemplateSelector) {
            const dataItem = this._getDataItem(index);
            templateKey = this._itemTemplateSelector(dataItem, index, this.items);
        }

        for (let loop = 0, length = this._containerTemplatesInternal.length; loop < length; loop++) {
            if (this._containerTemplatesInternal[loop].key === templateKey) {
                return this._containerTemplatesInternal[loop];
            }
        }

        // This is the default template
        return this._containerTemplatesInternal[0];
    }

    public _getDetailDataLoaderPromise(index: number): Promise<any> {
        if (this.detailDataLoader) {
            return this.detailDataLoader(this._getDataItem(index), index);
        }

        return null;
    }

    public _prepareItem(item: View, index: number) {
        if (item) {
            item.bindingContext = this._getDataItem(index);
        }
    }

    public _onFoldedRowHeightPropertyChanged(oldValue: Length, newValue: Length) {
        this.refresh();
    }

    public _onItemsChanged(args: ChangedData<any>) {
        this.refresh();
    }

    public _getCachedDetailData(index: number): any {
        return this._cachedDetailData[index];
    }
    public _setCachedDetailData(index: number, value: any) {
        this._cachedDetailData[index] = value;
    }

    public _getIsCellExpandedIn(index: number): boolean {
        return this._cellExpanded[index];
    }
    public _setIsCellExpandedIn(index: number, value: boolean): void {
        this._cellExpanded[index] = value;
    }

    public _getDataItem(index: number): any {
        const thisItems = this.items as ItemsSource;
        return thisItems.getItem ? thisItems.getItem(index) : thisItems[index];
    }

    public _checkAndWrapProxyContainers(view: View): View {
        // Proxy containers should not get treated as layouts.
        // Wrap them in a real layout as well.
        if (view instanceof ProxyViewContainer) {
            const sp = new StackLayout();
            sp.addChild(view);
            return sp;
        }

        return view;
    }

    protected updateEffectiveFoldedRowHeight(): void {
        foldedRowHeightProperty.coerce(this);
    }
}

// Dummy augment of the base class to satisfy TS. 
export interface FoldingListViewBase {
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    on(event: "itemLoading", callback: (args: ItemEventData) => void, thisArg?: any);
    on(event: "loadMoreItems", callback: (args: EventData) => void, thisArg?: any);
}

export const itemsProperty = new Property<FoldingListViewBase, any[] | ItemsSource>({
    name: "items",
    valueChanged: (target, oldValue, newValue) => {
        if (oldValue instanceof Observable) {
            removeWeakEventListener(oldValue, ObservableArray.changeEvent, target._onItemsChanged, target);
        }

        if (newValue instanceof Observable) {
            addWeakEventListener(newValue, ObservableArray.changeEvent, target._onItemsChanged, target);
        }

        target.refresh();
    }
});
itemsProperty.register(FoldingListViewBase);

export const foregroundItemTemplateProperty = new Property<FoldingListViewBase, string | Template>({
    name: "foregroundItemTemplate",
    valueChanged: (target) => {
        target.refresh();
    },
});
foregroundItemTemplateProperty.register(FoldingListViewBase);

export const containerItemTemplateProperty = new Property<FoldingListViewBase, string | Template>({
    name: "containerItemTemplate",
    valueChanged: (target) => {
        target.refresh();
    },
});
containerItemTemplateProperty.register(FoldingListViewBase);

export const foldsCountProperty = new CoercibleProperty<FoldingListViewBase, number>({
    name: "foldsCount",
    defaultValue: 3,
    coerceValue: (target, value) => {
        // Require minimum 3 folds, otherwise there is a special requirement for both views
        return value <= 2 ? 3 : value;
    },
    valueChanged: (target, oldValue, newValue) => {
        target.refresh();
    },
    valueConverter: (v) => +v,
});
foldsCountProperty.register(FoldingListViewBase);

export const foldedRowHeightProperty = new CoercibleProperty<FoldingListViewBase, Length>({
    name: "foldedRowHeight",
    defaultValue: defaultFoldedRowHeight,
    equalityComparer: Length.equals,
    coerceValue: (target, value) => {
        // We coerce to default value if we don't have display density.
        return target.nativeViewProtected && value > 0 ? value : defaultFoldedRowHeight;
    },
    valueChanged: (target, oldValue, newValue) => {
        target._effectiveFoldedRowHeight = Length.toDevicePixels(newValue, autoEffectiveRowHeight);
        target._onFoldedRowHeightPropertyChanged(oldValue, newValue);
    },
    valueConverter: Length.parse
});
foldedRowHeightProperty.register(FoldingListViewBase);

export const backViewColorProperty = new CssProperty<Style, Color>({
    name: "backViewColor",
    cssName: "back-view-color",
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v),
});
backViewColorProperty.register(Style);