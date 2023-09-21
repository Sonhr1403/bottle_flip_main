// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GamePlayCtrl from "./GamePlayCtrl";
import Objects from "./Objects";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bottle extends cc.Component {

    public static instance = null;

    private tween: cc.Tween = null;

    private collisionCheck: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Bottle.instance = this;
        cc.director.getCollisionManager().enabled = true;
    }

    private onCollisionEnter(otherCollider, selfCollider) {
        if(selfCollider == this.node.getComponent(cc.BoxCollider)){
            if(this.collisionCheck === 0){
                console.log('Collision enter');
                let perfectLand = GamePlayCtrl.instance.perfectLand;
                let pos = cc.v2();
                let pos2 = cc.v2();
                let isFliped = GamePlayCtrl.instance.isfliped;
                let angle = GamePlayCtrl.instance.angleDown;
                let angle2 = isFliped === 0 ? 180 - angle : - 180 - angle;
                let angle3 = isFliped === 0 ? 360 : 0;
                console.error("isFliped", isFliped, "Angle: ", angle2)
                this.scheduleOnce(()=>{
                    switch (perfectLand) {
                    case 0:
                        GamePlayCtrl.instance.tween.stop();
                        if (isFliped === 0) {
                            pos = cc.v2(50,75);
                        } else {
                            pos = cc.v2(- 50, 75);
                        }
                        cc.tween(this.node)
                        .parallel(
                        cc.tween().by(0.3, { position: pos }),
                        cc.tween().by(0.3, { angle: 20 })
                        )
                        .start();

                        pos = cc.v2(0, - 1000)
                        this.tween = cc.tween(this.node)
                        .parallel(
                        cc.tween().by(0.5, { position: pos }),
                        cc.tween().by(0.5, { angle: this.getRandomNumberInRange(60, 210)})
                        )
        
                        this.scheduleOnce(()=>{
                            this.tween.start();
                            GamePlayCtrl.instance.settingCtrl.playType(4);
                            this.scheduleOnce(()=>{
                            GamePlayCtrl.instance.settingCtrl.playType(7);
                                GamePlayCtrl.instance.lives -= 1;
                                if (GamePlayCtrl.instance.lives > 0) {
                                    GamePlayCtrl.instance.updateLives();
                                    this.reset();
                                } else{
                                    this.scheduleOnce(() => {
                                        GamePlayCtrl.instance.settingCtrl.playType(8);
                                        GamePlayCtrl.instance.endGame.active = true;
                                    }, 0.5);
                                }
                            }, 1)
                        }, 0.2)
                        break;

                    case 1:
                        if (isFliped === 0) {
                            pos = cc.v2(10,10);
                            pos2 = cc.v2(10,- 10);
                        } else {
                            pos = cc.v2(- 10, 10);
                            pos2 = cc.v2(- 10, - 10);
                        }
                        cc.tween(this.node)
                        .parallel(
                        cc.tween().by(0.1, { position: pos }),
                        cc.tween().by(0.1, { angle: angle2/2 })
                        )
                        .start();

                        this.tween = cc.tween(this.node)
                        .parallel(
                        cc.tween().by(0.1, { position: pos2 }),
                        cc.tween().to(0.1, { angle: angle3 })
                        )
                        .call(()=>{
                            GamePlayCtrl.instance.addScore();
                            GamePlayCtrl.instance.showStar();
                            this.scheduleOnce(()=>{
                                GamePlayCtrl.instance.isfliped = isFliped === 0 ? 1 : 0;
                                Objects.instance.createObject();
                                GamePlayCtrl.instance.activeBottleTemp();
                                GamePlayCtrl.instance.turnOn();
                            }, 1.8);
                        });
                        this.scheduleOnce(()=>{
                            this.tween.start();
                        },0.11);
                        break;

                    case 2:
                        if (isFliped === 0) {
                            pos = cc.v2(+ 10, + 10);
                            pos2 = cc.v2(+ 10, - 10);
                        } else {
                            pos = cc.v2(- 10, + 10);
                            pos2 = cc.v2(- 10, - 10);
                        }
                        let posv3= cc.v3(pos);
                        let posv3_2= cc.v3(pos2);
                        cc.tween(this.node)
                        .by(0.1, { position: posv3 })
                        .start();

                        this.tween = cc.tween(this.node)
                        .by(0.1, { position: posv3_2 })
                        .call(()=>{
                            GamePlayCtrl.instance.addScore();
                            GamePlayCtrl.instance.showStar();
                            this.scheduleOnce(()=>{
                                GamePlayCtrl.instance.isfliped = isFliped === 0 ? 1 : 0;
                                Objects.instance.createObject();
                                GamePlayCtrl.instance.activeBottleTemp();
                                GamePlayCtrl.instance.turnOn();
                            }, 1.8);
                        });

                        this.scheduleOnce(()=>{
                            this.tween.start();
                        },0.11);
                        break;

                    case 3:
                        GamePlayCtrl.instance.addScore();
                        GamePlayCtrl.instance.showStar();
                        this.scheduleOnce(()=>{
                            GamePlayCtrl.instance.isfliped = isFliped === 0 ? 1 : 0;
                            Objects.instance.createObject();
                            GamePlayCtrl.instance.activeBottleTemp();
                            GamePlayCtrl.instance.turnOn();
                        }, 2);
                        break;
                    default:
                        this.onCollisionEnter(null, this.node.getComponent(cc.BoxCollider));
                        break;
                    }
                }, 0.05)
                
                this.collisionCheck = 1;
            }     
        }
    }

    private reset(){
        this.node.setPosition(GamePlayCtrl.instance.bottleOriginPos);
        this.node.angle = GamePlayCtrl.instance.isfliped == 0 ? 0 : 360;
        GamePlayCtrl.instance.bottleTemp.active = true;
        GamePlayCtrl.instance.perfectLand = -1;
        GamePlayCtrl.instance.turnOn();
    }

    public getRandomNumberInRange(min: number, max: number): number {
        let randomValue = Math.random();
        let randomNumberInRange = randomValue * (max - min) + min;
        return Math.floor(randomNumberInRange);
      }

}
