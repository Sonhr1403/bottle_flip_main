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
    type: string,
    isBought: boolean,
    isUsing: boolean,
    price: number
}

@ccclass
export default class Shop extends cc.Component {
    public static instance: Shop = null;

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.Prefab)
    private shopItem: cc.Prefab = null;

    @property(cc.Node)
    public popUp: cc.Node = null;

    @property(cc.Label)
    public ribbonLbl: cc.Label = null;

    private listItem: itemShop[] = [];

    public currentItem: itemShop = null;

    private listItemInit = [
        { id: 0, type: "bottle", isBought: true, isUsing: true, price: 0 },
        { id: 1, type: "bottle", isBought: false, isUsing: false, price: 100 },
        { id: 2, type: "bottle", isBought: false, isUsing: false, price: 200 },
        { id: 3, type: "bottle", isBought: false, isUsing: false, price: 300 },
        { id: 4, type: "bottle", isBought: false, isUsing: false, price: 500 },
        { id: 5, type: "bottle", isBought: false, isUsing: false, price: 800 },
        { id: 6, type: "table", isBought: true, isUsing: true, price: 0 },
        { id: 7, type: "table", isBought: false, isUsing: false, price: 800 },
        { id: 8, type: "bg", isBought: true, isUsing: true, price: 0 },
        { id: 9, type: "bg", isBought: false, isUsing: false, price: 1000 },
    ]
    // LIFE-CYCLE CALLBACKS:

    protected onLoad(): void {
        Shop.instance = this;
    }
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

    private onClickYes(){
        if(!this.currentItem.isBought){
        } else {
            if (!this.currentItem.isUsing) {
            }
        }
    }

    private onClickNo(){
        this.popUp.active = false;
    }
}
