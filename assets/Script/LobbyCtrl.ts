// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.director.preloadScene("Loading");
        cc.director.preloadScene("GamePlay");
        // const canvas = cc.find("Canvas"); // Thay "Canvas" bằng tên của đối tượng Canvas trong cảnh của bạn
        // const canvasComponent = canvas.getComponent(cc.Canvas);

        // Thiết lập CanvasComponent để tự động điều chỉnh theo kích thước màn hình
        //canvasComponent.designResolution = cc.view.getFrameSize();
    }

    onClickPlayGame(){
        cc.director.loadScene("GamePlay");
    }

    onClickShop(){}

    onClickRank(){}

    onClickGuide(){}
}
