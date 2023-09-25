// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { itemRank } from "./Rank";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankItem extends cc.Component {

    @property(cc.Label)
    private id: cc.Label = null;

    @property(cc.Label)
    private time: cc.Label = null;

    @property(cc.Label)
    private score: cc.Label = null;
 
    @property(cc.SpriteFrame)
    private rankItemBg: cc.SpriteFrame = null;
 
    @property(cc.Sprite)
    private bg: cc.Sprite = null;

    ///////////////////////////////////////////////

    public initItem(item: itemRank, id: string){
        this.id.string = id;
        this.time.string =item.time;
        this.score.string = item.score;

        this.bg.spriteFrame = Number(id) % 2 === 0 ? this.rankItemBg : null;
    }

}
