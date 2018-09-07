import { Observable } from "data/observable";

export class HelloWorldModel extends Observable {

    private _items: any[];

    constructor() {
        super();

        this._items = [];
        for (let loop = 0; loop < 100; loop++) {
            this._items.push({ item: `Item ${loop}` });
        }
    }

    public get items(): any[] {
        return this._items;
    }
}
