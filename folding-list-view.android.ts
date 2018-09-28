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
import { KeyedTemplate, PercentLength, View, layout } from "ui/core/view";

import { ItemEventData } from ".";
import {
    FoldingListViewBase,
    containerItemTemplatesProperty,
    foregroundItemTemplatesProperty,
    paddingBottomProperty,
    paddingLeftProperty,   
    paddingRightProperty,
    paddingTopProperty,
} from "./folding-list-view-common";

export * from "./folding-list-view-common";

interface ItemClickListener {
    new(owner: FoldingListView): android.widget.AdapterView.OnItemClickListener;
}

interface FoldingCellView {
    foreground: View;
    container: View;
}

let ItemClickListener: ItemClickListener;

function initializeItemClickListener(): void {
    if (ItemClickListener) {
        return;
    }

    @Interfaces([android.widget.AdapterView.OnItemClickListener])
    class ItemClickListenerImpl extends java.lang.Object implements android.widget.AdapterView.OnItemClickListener {
        constructor(public owner: FoldingListView) {
            super();
            return global.__native(this);
        }

        public onItemClick<T extends android.widget.Adapter>(parent: android.widget.AdapterView<T>, convertView: android.view.View, index: number, id: number) {
            const owner = this.owner;
            const cell = convertView as com.ramotion.foldingcell.FoldingCell;
            const isExpandedIn = owner._getIsCellExpandedIn(index);
            const cellView = owner._realizedItems.get(cell);

            if (!isExpandedIn && owner.detailDataLoader) {
                owner._getDetailDataLoaderPromise(index)
                    .then((result) => {
                        owner._setCachedDetailData(index, result);

                        cellView.container.bindingContext = result;

                        cell.toggle(false);
                        owner._setIsCellExpandedIn(index, !isExpandedIn);
                    })
                    .catch((e) => { console.error("ERROR LOADING DETAILS:", e); });
            }
            else {
                cell.toggle(false);
                owner._setIsCellExpandedIn(index, !isExpandedIn);
            }

            // If cell is collapsed clear the cached data so it can be loaded again on expand. 
            if (!isExpandedIn) {
                owner.invalidateChachedDetailData(index);
            }
        }
    }
    ItemClickListener = ItemClickListenerImpl;
}

export class FoldingListView extends FoldingListViewBase {
    public nativeViewProtected: android.widget.ListView;

    public _realizedItems = new Map<android.view.View, FoldingCellView>();
    public _realizedForegroundTemplates = new Map<string, Map<android.view.View, View>>();
    public _realizedContainerTemplates = new Map<string, Map<android.view.View, View>>();

    public get _childrenCount(): number {
        return this._realizedItems.size;
    }

    private _androidViewId: number = -1;

    public createNativeView() {
        initializeItemClickListener();

        const listView = new android.widget.ListView(this._context);
        listView.setDescendantFocusability(android.view.ViewGroup.FOCUS_AFTER_DESCENDANTS);

        // Fixes issue with black random black items when scrolling
        listView.setCacheColorHint(android.graphics.Color.TRANSPARENT);

        // Hide dividers
        listView.setDivider(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        listView.setDividerHeight(0);

        listView.setScrollBarStyle(android.widget.ListView.SCROLLBARS_OUTSIDE_OVERLAY);

        ensureFoldingListViewAdapterClass();
        const adapter = new FoldingListViewAdapterClass(this);
        listView.setAdapter(adapter);
        (listView as any).adapter = adapter;

        const itemClickListener = new ItemClickListener(this);
        listView.setOnItemClickListener(itemClickListener);
        (listView as any).itemClickListener = itemClickListener;

        return listView;
    }

    public initNativeView(): void {
        super.initNativeView();
        super.updateEffectiveFoldedRowHeight();

        const nativeView: any = this.nativeViewProtected;
        (nativeView as any).itemClickListener.owner = this;

        const adapter = (nativeView as any).adapter;
        adapter.owner = this;
        nativeView.setAdapter(adapter);

        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        nativeView.setId(this._androidViewId);
    }

    public disposeNativeView() {
        const nativeView = this.nativeViewProtected;
        nativeView.setAdapter(null);
        (nativeView as any).itemClickListener.owner = null;
        (nativeView as any).adapter.owner = null;

        this.clearRealizedCells();
        super.disposeNativeView();
    }

    public onLoaded() {
        super.onLoaded();
        // Without this call itemClick won't be fired... :(
        this.requestLayout();
    }

    public refresh() {
        const nativeView = this.nativeViewProtected;
        if (!nativeView || !nativeView.getAdapter()) {
            return;
        }

        const clearBindingContext = (view: View) => {
            if (!(view.bindingContext instanceof Observable)) {
                view.bindingContext = null;
            }
        };

        // clear bindingContext when it is not observable because otherwise bindings to items won't reevaluate
        this._realizedItems.forEach((view, cell) => {
            clearBindingContext(view.foreground);
            clearBindingContext(view.container);
        });

        (nativeView.getAdapter() as android.widget.BaseAdapter).notifyDataSetChanged();
    }

    public scrollToIndex(index: number, animated: boolean = true) {
        const nativeView = this.nativeViewProtected;
        if (nativeView) {
            if (animated) {
                nativeView.smoothScrollToPosition(index);
            }
            else {
                nativeView.setSelection(index);
            }
        }
    }

    public eachChildView(callback: (child: View) => boolean): void {
        const performCallback = (view: View) => {
            if (view.parent instanceof FoldingListView) {
                callback(view);
            }
            else {
                // in some cases (like item is unloaded from another place (like angular) view.parent becomes undefined)
                if (view.parent) {
                    callback(view.parent as View);
                }
            }
        };

        this._realizedItems.forEach((view, cell) => {
            performCallback(view.foreground);
            performCallback(view.container);
        });
    }

    public [paddingTopProperty.getDefault](): number {
        return ((this.nativeView as any) as android.view.View).getPaddingTop();
    }
    public [paddingTopProperty.setNative](value: PercentLength) {
        this._setPadding({ top: this.effectivePaddingTop });
    }

    public [paddingRightProperty.getDefault](): number {
        return ((this.nativeView as any) as android.view.View).getPaddingRight();
    }
    public [paddingRightProperty.setNative](value: PercentLength) {
        this._setPadding({ right: this.effectivePaddingRight });
    }

    public [paddingBottomProperty.getDefault](): number {
        return ((this.nativeView as any) as android.view.View).getPaddingBottom();
    }
    public [paddingBottomProperty.setNative](value: PercentLength) {
        this._setPadding({ bottom: this.effectivePaddingBottom });
    }

    public [paddingLeftProperty.getDefault](): number {
        return ((this.nativeView as any) as android.view.View).getPaddingLeft();
    }
    public [paddingLeftProperty.setNative](value: PercentLength) {
        this._setPadding({ left: this.effectivePaddingLeft });
    }

    public [foregroundItemTemplatesProperty.getDefault](): KeyedTemplate[] {
        return null;
    }
    public [foregroundItemTemplatesProperty.setNative](value: KeyedTemplate[]) {
        this._foregroundItemTemplatesInternal = new Array<KeyedTemplate>(this._defaultForegroundItemTemplate);
        if (value) {
            this._foregroundItemTemplatesInternal = this._foregroundItemTemplatesInternal.concat(value);
        }

        this.nativeViewProtected.setAdapter(new FoldingListViewAdapterClass(this));
        this.refresh();
    }

    public [containerItemTemplatesProperty.getDefault](): KeyedTemplate[] {
        return null;
    }
    public [containerItemTemplatesProperty.setNative](value: KeyedTemplate[]) {
        this._containerItemTemplatesInternal = new Array<KeyedTemplate>(this._defaultContainerItemTemplate);
        if (value) {
            this._containerItemTemplatesInternal = this._containerItemTemplatesInternal.concat(value);
        }

        this.nativeViewProtected.setAdapter(new FoldingListViewAdapterClass(this));
        this.refresh();
    }

    private clearRealizedCells(): void {
        const removeView = (view: View) => {
            if (view.parent) {
                // This is to clear the StackLayout that is used to wrap non LayoutBase & ProxyViewContainer instances.
                if (!(view.parent instanceof FoldingListView)) {
                    this._removeView(view.parent);
                }
                view.parent._removeView(view);
            }
        };

        // clear the cache
        this._realizedItems.forEach((view, nativeView) => {
            removeView(view.foreground);
            removeView(view.container);
        });

        this._realizedItems.clear();
        this._realizedForegroundTemplates.clear();
        this._realizedContainerTemplates.clear();
    }

    private _setPadding(newPadding: { top?: number, right?: number, bottom?: number, left?: number }) {
        const nativeView: android.view.View = this.nativeView as any;
        const padding = {
            top: nativeView.getPaddingTop(),
            right: nativeView.getPaddingRight(), 
            bottom: nativeView.getPaddingBottom(),
            left: nativeView.getPaddingLeft()
        };
        
        // tslint:disable-next-line:prefer-object-spread
        const newValue = Object.assign(padding, newPadding);
        nativeView.setPadding(newValue.left, newValue.top, newValue.right, newValue.bottom);
    }
}

let FoldingListViewAdapterClass;
function ensureFoldingListViewAdapterClass() {
    if (FoldingListViewAdapterClass) {
        return;
    }

    class FoldingListViewAdapter extends android.widget.BaseAdapter {
        constructor(public owner: FoldingListView) {
            super();
            return global.__native(this);
        }

        public getCount() {
            return this.owner && this.owner.items && this.owner.items.length ? this.owner.items.length : 0;
        }

        public getItem(i: number) {
            if (this.owner && this.owner.items && i < this.owner.items.length) {
                return this.owner._getDataItem(i);
            }

            return null;
        }

        public getItemId(i: number) {
            return long(i);
        }

        public hasStableIds(): boolean {
            return true;
        }

        // public getViewTypeCount() {
        //     return this.owner._itemTemplatesInternal.length;
        // }

        // public getItemViewType(index: number) {
        //     let template = this.owner._getItemTemplate(index);
        //     let itemViewType = this.owner._itemTemplatesInternal.indexOf(template);
        //     return itemViewType;
        // }

        public getView(index: number, convertView: android.view.View, parent: android.view.ViewGroup): android.view.View {
            if (!this.owner) {
                return null;
            }

            const totalItemCount = this.owner.items ? this.owner.items.length : 0;
            if (index === (totalItemCount - 1)) {
                this.owner.notify({
                    eventName: FoldingListViewBase.loadMoreItemsEvent,
                    object: this.owner,
                });
            }

            // Recycle an existing view or create a new one if needed.
            const owner = this.owner;
            const foregroundTemplate = owner._getForegroundItemTemplate(index);
            const containerTemplate = owner._getContainerItemTemplate(index);
            let foregroundView: View;
            let containerView: View;
            let cell = convertView as com.ramotion.foldingcell.FoldingCell;
            const isCellExpandedIn = owner._getIsCellExpandedIn(index);
            if (cell) {
                foregroundView = owner._realizedForegroundTemplates.get(foregroundTemplate.key).get(cell);
                if (!foregroundView) {
                    throw new Error(`There is no entry with key '${cell}' in the realized views cache for template with key'${foregroundTemplate.key}'.`);
                }

                containerView = owner._realizedContainerTemplates.get(containerTemplate.key).get(cell);
                if (!containerView) {
                    throw new Error(`There is no entry with key '${cell}' in the realized views cache for template with key'${containerTemplate.key}'.`);
                }
            }
            else {
                foregroundView = owner._checkAndWrapProxyContainers(foregroundTemplate.createView());
                owner._addView(foregroundView);

                containerView = owner._checkAndWrapProxyContainers(containerTemplate.createView());
                owner._addView(containerView);

                const context = owner._context;
                const MATCH_PARENT = android.view.ViewGroup.LayoutParams.MATCH_PARENT;
                const WRAP_CONTENT = android.view.ViewGroup.LayoutParams.WRAP_CONTENT;

                cell = new com.ramotion.foldingcell.FoldingCell(context);
                org.nativescript.widgets.ViewHelper.setWidth(cell, MATCH_PARENT);
                org.nativescript.widgets.ViewHelper.setHeight(cell, WRAP_CONTENT);

                const container = new android.widget.FrameLayout(context);
                // container.setVisibility(android.view.View.GONE);
                org.nativescript.widgets.ViewHelper.setWidth(container, MATCH_PARENT);
                org.nativescript.widgets.ViewHelper.setHeight(container, WRAP_CONTENT);
                container.addView(containerView.nativeViewProtected);
                cell.addView(container);

                const foreground = new android.widget.FrameLayout(context);
                org.nativescript.widgets.ViewHelper.setWidth(foreground, MATCH_PARENT);
                org.nativescript.widgets.ViewHelper.setHeight(foreground, WRAP_CONTENT);
                foreground.addView(foregroundView.nativeViewProtected);
                cell.addView(foreground);
            }

            owner.notify({
                eventName: FoldingListViewBase.itemLoadingEvent,
                object: owner,
                index,
                view: {
                    foreground: foregroundView,
                    container: containerView,
                },
                android: parent,
                ios: undefined,
            } as ItemEventData);

            // -2 is because here we need the additional folds count after the first one. 
            // 330 is to match the 0.33 seconds animation duration in iOS
            cell.initialize(owner.foldsCount * 330, owner.backViewColor.android, owner.foldsCount - 2);

            foregroundView.height = layout.toDeviceIndependentPixels(owner._effectiveFoldedRowHeight);
            foregroundView.marginBottom = 0; // To match iOS implementation

            owner._prepareItem(foregroundView, index);

            if (!owner.detailDataLoader) {
                owner._prepareItem(containerView, index);
            }
            else {
                const cachedData = owner._getCachedDetailData(index);
                if (cachedData) {
                    containerView.bindingContext = cachedData;
                }
                else if (isCellExpandedIn) {
                    owner._getDetailDataLoaderPromise(index)
                        .then((result) => {
                            owner._setCachedDetailData(index, result);
                            containerView.bindingContext = result;
                        })
                        .catch((e) => { console.error("ERROR LOADING DETAILS:", e); });
                }
            }

            // Cache the views for recycling
            let realizedForegroundItemsForTemplateKey = owner._realizedForegroundTemplates.get(foregroundTemplate.key);
            if (!realizedForegroundItemsForTemplateKey) {
                realizedForegroundItemsForTemplateKey = new Map<android.view.View, View>();
                owner._realizedForegroundTemplates.set(foregroundTemplate.key, realizedForegroundItemsForTemplateKey);
            }
            realizedForegroundItemsForTemplateKey.set(cell, foregroundView);

            let realizedContainerItemsForTemplateKey = owner._realizedContainerTemplates.get(foregroundTemplate.key);
            if (!realizedContainerItemsForTemplateKey) {
                realizedContainerItemsForTemplateKey = new Map<android.view.View, View>();
                owner._realizedContainerTemplates.set(foregroundTemplate.key, realizedContainerItemsForTemplateKey);
            }
            realizedContainerItemsForTemplateKey.set(cell, containerView);

            owner._realizedItems.set(cell, { foreground: foregroundView, container: containerView });

            // HACK: The container view needs to be shown so that all controls are correctly measured and layout. 
            // So we set the cell height to the height of the foreground view so the list does not flicker. 
            // Then we use a timeout so we wait for some minimal time for the view to be rendered before we hide it. 
            if (!isCellExpandedIn) {
                org.nativescript.widgets.ViewHelper.setHeight(
                    cell,
                    PercentLength.toDevicePixels(foregroundView.height)
                    + PercentLength.toDevicePixels(foregroundView.marginTop)
                    + PercentLength.toDevicePixels(foregroundView.borderTopWidth)
                    + PercentLength.toDevicePixels(foregroundView.borderBottomWidth)
                );
            }
            setTimeout(() => {
                if (isCellExpandedIn) {
                    cell.unfold(true);
                }
                else {
                    cell.getChildAt(0).setVisibility(android.view.View.GONE);

                    cell.fold(true);
                }
            }, 1);

            return cell;
        }
    }

    FoldingListViewAdapterClass = FoldingListViewAdapter;
}