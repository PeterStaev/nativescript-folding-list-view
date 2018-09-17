# NativeScript Folding List View widget
[![Build Status](https://travis-ci.com/PeterStaev/nativescript-folding-list-view.svg?branch=master)](https://travis-ci.com/PeterStaev/nativescript-folding-list-view)
[![npm downloads](https://img.shields.io/npm/dm/nativescript-folding-list-view.svg)](https://www.npmjs.com/package/nativescript-folding-list-view)
[![npm downloads](https://img.shields.io/npm/dt/nativescript-folding-list-view.svg)](https://www.npmjs.com/package/nativescript-folding-list-view)
[![npm](https://img.shields.io/npm/v/nativescript-folding-list-view.svg)](https://www.npmjs.com/package/nativescript-folding-list-view)

![NativeScript+Ramotion=❤️](https://raw.githubusercontent.com/PeterStaev/nativescript-folding-list-view/master/media/header.gif)

A NativeScript ListView with foldable cells. Utilizes the wonderfull FoldingCell created by [Ramotion](https://github.com/Ramotion)!

## Screenshot
![ios](https://raw.githubusercontent.com/PeterStaev/nativescript-folding-list-view/master/media/folding_ios.gif)
![android](https://raw.githubusercontent.com/PeterStaev/nativescript-folding-list-view/master/media/folding_android.gif)

## Installation
Run the following command from the root of your project:

`tns plugin add nativescript-folding-list-view`

This command automatically installs the necessary files, as well as stores nativescript-folding-list-view as a dependency in your project's package.json file.

## Configuration
There is no additional configuration needed!

## API

### Events
* **itemLoading**  
Triggered when generating an item in the FoldingListView. 

* **loadMoreItems**  
Triggered when the generated items reached the end of the items property.

### Static Properties
* **itemLoadingEvent** - *String*  
String value used when hooking to itemLoadingEvent event.

* **loadMoreItemsEvent** - *String*  
String value used when hooking to itemTapEvent event.

### Instance Properties
* **ios** - *[UITableView](https://developer.apple.com/documentation/uikit/uitableview?language=objc)*  
Gets the native iOS view that represents the user interface for this component. Valid only when running on iOS.

* **android** - *[android.widget.ListView](https://developer.android.com/reference/android/widget/ListView)*  
Gets the native android widget that represents the user interface for this component. Valid only when running on Android OS.

* **items** - *Array | ItemsSource*  
Gets or sets the items collection of the FoldingListView. The items property can be set to an array or an object defining length and getItem(index) method.

* **foregroundItemTemplate** - *String*  
Gets or sets the item template of that is displayed for **folded** cell.

* **containerItemTemplate** - *String*  
Gets or sets the item template of that is displayed for **unfolded** cell.

* **foldedRowHeight** - *Length*  
Gets or sets the height for folded cells in the list.

* **foldsCount** - *number*  
Gets or sets the number of unfolds each cell will have. Minimum is 3.

* **backViewColor** - *Color*  
Gets or sets the color that will be displayed during the unfolding animation of the cell. 

* **detailDataLoader** - *Function*  
Gets or sets the a function that will be used for loading the data for the unfolded cell. By default, when this is not specified the widget binds both the folded and unfolded cells the current item. This means that the data for both views should be available in the item. If you set this function it will be called whenever the user taps on an item to unfold it. The function the current `item` and `index` and must return a `Promise` with the data item that should be bound to the unfolded cell. 

### Instance Methods
* **refresh()**  
Forces the FoldingListView to reload all its items.

* **scrollToIndex(index: number, animated: boolean = true)**  
Scrolls the FoldingListView to the item with the given index. This can be either animated or not. Defaults to animated.

## Usage
You need to add `xmlns:flv="nativescript-folding-list-view"` to your page tag, and then simply use `<flv:FoldingListView/>` in order to add the widget to your page. Use `<flv:FoldingListView.foregroundItemTemplate/>` to specify the template for folded cells and `<flv:FoldingListView.containerItemTemplate/>` to specify the template for unfolded cells:

```xml
<!-- test-page.xml -->
<Page xmlns="http://schemas.nativescript.org/tns.xsd" 
      xmlns:flv="nativescript-folding-list-view"
      navigatingTo="navigatingTo" class="page">

    <Page.actionBar>
        <ActionBar title="Folding LV" icon="" class="action-bar">
        </ActionBar>
    </Page.actionBar>

    <GridLayout>
        <flv:FoldingListView items="{{ items }}" foldsCount="5" foldedRowHeight="95" 
            detailDataLoader="detailDataLoader">
            <flv:FoldingListView.foregroundItemTemplate>
                <GridLayout columns="75, *" class="folded-cell">
                    <GridLayout row="0" col="0" rows="*, auto, auto, *" class="item-nbr">
                        <Label row="1" text="Item"/>
                        <Label row="2" text="{{ '#' + item }}"/>
                        <ActivityIndicator row="3" busy="{{ isBusyIn }}" />
                    </GridLayout>
                    <StackLayout col="1" padding="10">
                        <Label class="h2" text="My Header"/>
                        <Label class="label" textWrap="true" text="Short description. Tap to see more!"/>
                    </StackLayout>
                </GridLayout>
            </flv:FoldingListView.foregroundItemTemplate>
            
            <flv:FoldingListView.containerItemTemplate>
                <StackLayout rows="auto, *, auto" class="expanded-cell">
                    <Label class="item-nbr" text="{{ 'Item #' + item }}" />
                    <Label class="label" textWrap="true" text="{{ details }}" />
                    <Button id="btn" class="btn btn-primary" text="Click Me!" />
                </StackLayout>
            </flv:FoldingListView.containerItemTemplate>
        </flv:FoldingListView>
    </GridLayout>
</Page>
```
### Unfolded view height requirements
Note that in order for the widget to function properly the unfolded view height must be more than two times the height of the folded view. In order to ensure this (especially in cases where you load the detail data on demand and do not know exactly the height of the item) it is a good idea to set `min-height` on the wrapping layout for the unfolded cells. 

### Using `detailDataLoader` to load the bound item for the unfolded cells
In many cases when you have complex layout or you want to display many details in the unfolded cells, it is a good practice to not load all that data with your folded cells items. The widget provides a function which you can use to load that data on demand when the user taps to unfold a given cell. 
```ts
export function detailDataLoader(item: any, index: number) {
    item.set("isBusyIn", true);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            item.details = "< ... some very long text ... >";
            resolve(item);

            item.set("isBusyIn", false);
        }, 3000);
    });
}
```
Note that this simply a bound function, it is not an event! The function should **return** a `Promise` that resolves the loaded data from you backend for the given cell. 

### Having buttons inside the cells (Android)
Under Android there are problems for the `ListView` android widget to intercept tap evens in cases when you have a `Button` inside the cells. In order to overcome this you need to subscribe to the `itemLoading` event and then set the button to **not** be focusable:
```ts
export function itemLoading({ index, view }: ItemEventData) {
    if (isAndroid) {
        // HACK: Button inside the ListView prevents item click
        view.container.getViewById("btn").android.setFocusable(false);
    }
}
```

## Usage in Angular
Currently the Folding List View does **not** support Angular projects out of the box!

## Demos
This repository includes plain NativeScript demo. In order to run it execute the following in your shell:
```shell
$ git clone https://github.com/peterstaev/nativescript-folding-list-view
$ cd nativescript-folding-list-view
$ npm install
$ npm run demo-ios
```
This will run the  NativeScript demo project on iOS. If you want to run it on Android simply use the `-android` instead of the `-ios` sufix. 

## Donate
[![Donate](https://img.shields.io/badge/paypal-donate-brightgreen.svg)](https://bit.ly/2AS9QKB)

`bitcoin:14fjysmpwLvSsAskvLASw6ek5XfhTzskHC`

![Donate](https://www.tangrainc.com/qr.png)