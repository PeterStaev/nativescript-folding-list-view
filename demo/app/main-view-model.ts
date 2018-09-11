import { Observable, fromObject } from "data/observable";

export class HelloWorldModel extends Observable {

    private _items: any[];

    constructor() {
        super();

        this._items = [];
        for (let loop = 0; loop < 100; loop++) {
            this._items.push(fromObject({ item: `${loop}`, details: "", isBusyIn: false }));
        }
    }

    public get items(): any[] {
        return this._items;
    }
}
