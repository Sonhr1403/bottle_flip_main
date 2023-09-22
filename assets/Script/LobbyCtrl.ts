// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Shop from "./Shop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LobbyCtrl extends cc.Component {

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
        cc.director.preloadScene("GamePlay");
        // const canvas = cc.find("Canvas"); // Thay "Canvas" bằng tên của đối tượng Canvas trong cảnh của bạn
        // const canvasComponent = canvas.getComponent(cc.Canvas);

        // Thiết lập CanvasComponent để tự động điều chỉnh theo kích thước màn hình
        //canvasComponent.designResolution = cc.view.getFrameSize();

        this.gold = Number(localStorage.getItem("gold"));
        if (!this.goldCoin) {
            localStorage.setItem("goldCoin", "0");
            this.gold = 1000;
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
    }

    private onClickGuide(){
        this.guide.active = !this.guide.active;
    }
}
