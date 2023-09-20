// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GamePlayCtrl from "./GamePlayCtrl";
const {ccclass, property} = cc._decorator;

@ccclass
export default class endGame extends cc.Component {
    public static instance = null;

    @property(cc.Label)
    private scoreLabel: cc.Label = null;

    protected onLoad () {
        endGame.instance = this;
        cc.director.preloadScene('Lobby');
    }

    protected onEnable(): void {
        this.scoreLabel.string = GamePlayCtrl.instance.lblScore.string
    }

    private resetGame(){
        GamePlayCtrl.instance.resetGame();
    }
    
    private backtolobby(){
        cc.director.loadScene('Lobby');
    }

    // update (dt) {}
}
