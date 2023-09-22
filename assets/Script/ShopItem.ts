// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { itemShop } from "./Shop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopItem extends cc.Component {

    @property(cc.Sprite)
    private bottle: cc.Sprite = null;

    @property(cc.Node)
    private btn: cc.Node = null;

    @property(cc.Label)
    private price: cc.Label = null;

    @property(cc.SpriteFrame)
    private coin: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private sfBottle: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    private sfBtn: cc.SpriteFrame[] = [];

    private item: itemShop = null;
    // LIFE-CYCLE CALLBACKS:

    public initItem(item: itemShop){
        this.item = item;
        this.bottle.spriteFrame = this.sfBottle[item.id];
        if (item.isBought) {
            if (item.isUsing) {
                this.btn.getComponent(cc.Sprite).spriteFrame = this.sfBtn[1];
            } else {
                this.btn.getComponent(cc.Sprite).spriteFrame = this.sfBtn[0];
            }
            this.price.string = "Use";
        } else {
            this.btn.getComponent(cc.Sprite).spriteFrame = this.sfBtn[0];
            this.price.string = item.price.toString();
            let coinNode = new cc.Node("coinNode" + item.id);
            coinNode.addComponent(cc.Sprite);
            coinNode.getComponent(cc.Sprite).spriteFrame = this.coin;
            this.btn.addChild(coinNode);
            coinNode.y = 5;
            coinNode.setScale(0.35);
        }
    }

    private onClick(){
        
    }
}
