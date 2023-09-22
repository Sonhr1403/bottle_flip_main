// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ShopItem from "./ShopItem";

const {ccclass, property} = cc._decorator;

export interface itemShop {
    id: number,
    isBought: boolean,
    isUsing: boolean,
    price: number
}

@ccclass
export default class Shop extends cc.Component {

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.Prefab)
    private shopItem: cc.Prefab = null;

    private listItem: itemShop[] = [];

    private listItemInit = [
        { id: 0, isBought: true, isUsing: true, price: 0 },
        { id: 1, isBought: false, isUsing: false, price: 100 },
        { id: 2, isBought: false, isUsing: false, price: 200 },
        { id: 3, isBought: false, isUsing: false, price: 300 },
        { id: 4, isBought: false, isUsing: false, price: 500 },
        { id: 5, isBought: false, isUsing: false, price: 800 }
    ]
    // LIFE-CYCLE CALLBACKS:

    public updateItem(): void {
        this.listItem = JSON.parse(localStorage.getItem("listItem"));
        if (!this.listItem) {
            localStorage.setItem("listItem", JSON.stringify(this.listItemInit));
            this.listItem = this.listItemInit;
        }

        this.content.removeAllChildren();
        for(let item of this.listItem){
            let itemNode = cc.instantiate(this.shopItem);
            itemNode.getComponent(ShopItem).initItem(item);
            this.content.addChild(itemNode);
        }
    }

    private hide(){
        this.node.active = false;
    }
}
