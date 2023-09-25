// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Rank, { itemRank } from "./Rank";
import Shop from "./Shop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LobbyCtrl extends cc.Component {

    public static instance: LobbyCtrl = null;

    @property(cc.Node)
    private shop: cc.Node = null;

    @property(cc.Node)
    private rank: cc.Node = null;

    @property(cc.Node)
    private guide: cc.Node = null;

    @property(cc.Label)
    private goldCoin: cc.Label = null;

    public gold: number = -1;

    // LIFE-CYCLE CALLBACKS:

    protected onLoad () {
        LobbyCtrl.instance = this;
        cc.director.preloadScene("GamePlay");
        // const canvas = cc.find("Canvas"); // Thay "Canvas" bằng tên của đối tượng Canvas trong cảnh của bạn
        // const canvasComponent = canvas.getComponent(cc.Canvas);

        // Thiết lập CanvasComponent để tự động điều chỉnh theo kích thước màn hình
        //canvasComponent.designResolution = cc.view.getFrameSize();

        this.gold = Number(localStorage.getItem("goldCoin"));
        if (!this.gold) {
            localStorage.setItem("goldCoin", "10");
            this.gold = 10;
        }
        this.goldCoin.string = this.gold.toString();

        let listRank = JSON.parse(localStorage.getItem("listRank"));
        if (!listRank) {
          localStorage.setItem("listRank", JSON.stringify([]));
          listRank = [];
        }
    }

    private onClickPlayGame(){
        cc.director.loadScene("GamePlay");
    }

    private onClickShop(){
        this.shop.active = true;
        this.shop.getComponent(Shop).updateItem();
    }

    private onClickRank(){
        this.rank.active = !this.rank.active;
        this.rank.getComponent(Rank).initRankItem();
    }

    private onClickGuide(){
        this.guide.active = !this.guide.active;
    }
}
