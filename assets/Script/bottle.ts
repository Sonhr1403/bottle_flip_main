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

    tween: cc.Tween = null;

    collisionCheck: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Bottle.instance = this;
        cc.director.getCollisionManager().enabled = true;
    }

    onCollisionEnter(otherCollider, selfCollider) {
        if(selfCollider == this.node.getComponent(cc.BoxCollider)){
            if(this.collisionCheck === 0){
                console.log('Collision enter');
                let perfectLand = GamePlayCtrl.instance.perfectLand;
                cc.log("perfect land: ", perfectLand);
                let pos = cc.v2();
                let pos2 = cc.v2();
                let angle = 360 - GamePlayCtrl.instance.bottle.angle;
                switch (perfectLand) {
                    case 0:
                        GamePlayCtrl.instance.tween.stop();
                        if (GamePlayCtrl.instance.isfliped === 0) {
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
                            this.scheduleOnce(()=>{
                                GamePlayCtrl.instance.lives -= 1;
                                if (GamePlayCtrl.instance.lives > 0) {
                                    GamePlayCtrl.instance.updateLives();
                                    this.reset();
                                } else{
                                    this.scheduleOnce(() => {GamePlayCtrl.instance.endGameScreen.active = true}, 0.5);
                                }
                            }, 1)
                        }, 0.2)
                        break;

                    case 1:
                        if (GamePlayCtrl.instance.isfliped === 0) {
                            pos = cc.v2(10,10);
                            pos2 = cc.v2(10,- 10);
                        } else {
                            pos = cc.v2(- 10, 10);
                            pos2 = cc.v2(- 10, - 10);
                        }
                        cc.tween(this.node)
                        .parallel(
                        cc.tween().by(0.1, { position: pos }),
                        cc.tween().by(0.1, { angle: angle/2 })
                        )
                        .start();

                        this.tween = cc.tween(this.node)
                        .parallel(
                        cc.tween().by(0.1, { position: pos2 }),
                        cc.tween().by(0.1, { angle: angle/2 })
                        )
                        .call(()=>{
                            GamePlayCtrl.instance.addScore();
                            GamePlayCtrl.instance.showStar();
                            this.scheduleOnce(()=>{
                                GamePlayCtrl.instance.isfliped = GamePlayCtrl.instance.isfliped === 0 ? 1 : 0;
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
                        if (GamePlayCtrl.instance.isfliped === 0) {
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
                                GamePlayCtrl.instance.isfliped = GamePlayCtrl.instance.isfliped === 0 ? 1 : 0;
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
                            GamePlayCtrl.instance.isfliped = GamePlayCtrl.instance.isfliped === 0 ? 1 : 0;
                            Objects.instance.createObject();
                            GamePlayCtrl.instance.activeBottleTemp();
                            GamePlayCtrl.instance.turnOn();
                        }, 2);
                        break;
                }
                this.collisionCheck = 1;
            }     
        }
    }

    reset(){
        this.node.setPosition(GamePlayCtrl.instance.bottleOriginPos);
        this.node.angle = 0;
        GamePlayCtrl.instance.bottleTemp.active = true;
        GamePlayCtrl.instance.perfectLand = -1;
        GamePlayCtrl.instance.turnOn();
    }

    getRandomNumberInRange(min: number, max: number): number {
        let randomValue = Math.random();
        let randomNumberInRange = randomValue * (max - min) + min;
        return Math.floor(randomNumberInRange);
      }

}
