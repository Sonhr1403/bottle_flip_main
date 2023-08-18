// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GamePlayCtrl from "./GamePlayCtrl";
import Bottle from "./bottle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Objects extends cc.Component {

    public static instance = null;

    @property(cc.SpriteFrame)
    objectSF: cc.SpriteFrame[] = [];

    @property(cc.Node)
    objectNode: cc.Node[] = [];

    private iArray: number[] = [0, 0];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Objects.instance = this;
        cc.director.getCollisionManager().enabled = true;

    }

    // start () {}

    // update (dt) {}

    createObject(){
        let i = Bottle.instance.getRandomNumberInRange(0, this.objectSF.length);
        let objNode = this.objectNode[GamePlayCtrl.instance.isfliped];
        if(i !== this.iArray[0] && i !== this.iArray[1]){
            this.iArray[GamePlayCtrl.instance.isfliped] = i;
            if (i !== this.objectSF.length) {
                objNode.getComponent(cc.Sprite).spriteFrame = this.objectSF[i];
                objNode.getComponent(cc.BoxCollider).size = objNode.getContentSize();
                objNode.getComponent(cc.BoxCollider).offset.y = objNode.getContentSize().height/2;
            } else {
                this.noObject(objNode);
            }
            cc.log(this.iArray)
        } else{
            this.createObject();
        }

    }

    noObject(objNode){
        objNode.getComponent(cc.Sprite).spriteFrame = null;
        objNode.width = 0;
        objNode.height = 0;
        objNode.getComponent(cc.BoxCollider).size = cc.size(200,10);
    }
}
