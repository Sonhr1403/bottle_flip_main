// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import LobbyCtrl from "./LobbyCtrl";
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

    @property(cc.Node)
    public alert: cc.Node = null;

    @property(cc.SpriteFrame)
    public sfItem: cc.SpriteFrame[] = [];

    private listItem: itemShop[] = [];

    public currentItem: itemShop = null;

    private listItemInit = [
        { id: 0, type: "bottle", isBought: true, isUsing: true, price: 0 },
        { id: 1, type: "bottle", isBought: false, isUsing: false, price: 10 },
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
        let gold = Number(localStorage.getItem("goldCoin"));
        if(!this.currentItem.isBought){
            if (gold >= this.currentItem.price ) {
                this.currentItem.isBought = true;
                gold -= this.currentItem.price;
                localStorage.setItem("goldCoin", gold.toString());
                LobbyCtrl.instance.gold = gold;
            } else{
                this.alert.active = true;
                this.alert.children[0].getComponent(cc.Label).string = "You don't have enough gold to buy the item!";
                this.scheduleOnce(()=>{
                    this.alert.active = false;
                }, 3);
            }
        } else {
            if (!this.currentItem.isUsing) {
                this.currentItem.isUsing = true;
                this.updateUsingItem();
            } else {
                this.alert.active = true;
                this.alert.children[0].getComponent(cc.Label).string = "You're already using the item";
                this.scheduleOnce(()=>{
                    this.alert.active = false;
                }, 3);
            }
        }
        this.updateCurrentItem();
        localStorage.setItem("listItem", JSON.stringify(this.listItem));
        this.updateItem();
        this.onClickNo();
    }

    private onClickNo(){
        this.popUp.active = false;
    }

    private updateCurrentItem(){
        for (let i = 0; i < this.listItem.length; i++) {
            if (this.listItem[i].id === this.currentItem.id) {
                this.listItem[i] = this.currentItem;
            }
        }
    }

    private updateUsingItem(){
        for (let index = 0; index < this.listItem.length; index++) {
            if (this.listItem[index].type === this.currentItem.type && this.listItem[index].id !== this.currentItem.id) {
                this.listItem[index].isUsing = false;
            }
        }
    }
}
