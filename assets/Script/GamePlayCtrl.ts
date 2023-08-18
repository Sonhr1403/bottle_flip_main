// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Objects from "./Objects";
import Bottle from "./bottle";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayCtrl extends cc.Component {

  public static instance = null;

  @property(cc.Node)
  bottle: cc.Node = null;

  @property(cc.Node)
  bottleTemp: cc.Node = null;

  @property(cc.Label)
  lblScore: cc.Label = null;

  @property(cc.Node)
  starArrs: cc.Node[] = [];

  @property(cc.Node)
  livesArrs: cc.Node[] = [];

  // LIFE-CYCLE CALLBACKS:

  private startClickPos: cc.Vec2 = null;
  private endPos: cc.Vec2 = null;

  private distance: number = null;
  private jumpDuration: number = null;
  private jumpDistance: cc.Vec3 = null;
  bottleOriginPos: cc.Vec2 = null;
  isfliped: number = 0;
  angle: number = 0;
  perfectLand: number = -1;
  private objectHeight: number = -1;
  private downY: number = -1;

  lives: number = 3;

  tween: cc.Tween = null;

  private starArrayPos = [
    cc.v2(0, 100),
    cc.v2(-140, 100),
    cc.v2(140, 100),
    cc.v2(-200, 150),
    cc.v2(200, 150)
  ]

  onLoad() {
    GamePlayCtrl.instance = this;
    this.bottleTemp.active = true;
    this.bottleTemp.setPosition(130, -260);
    this.bottleOriginPos = this.bottle.getPosition();
    this.updateLives();
    this.turnOn();
  }

  updateLives(){
    switch (this.lives) {
      case 3:
        this.livesArrs[0].active = true;
        this.livesArrs[1].active = true;
        break;
      case 2:
        this.livesArrs[0].active = true;
        this.livesArrs[1].active = false;
        break;
      case 1:
        this.livesArrs[0].active = false;
        this.livesArrs[1].active = false;
        break;
    
      default:
        break;
    }
  }

  turnOn(){
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    console.log("on");
    console.log("----------------------");
  }

  turnOff(){
    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    console.log("off");
  }

  onTouchStart(event: cc.Event.EventTouch) {
    this.startClickPos = event.getLocation();
  }

  onTouchEnd(event: cc.Event.EventTouch) {
    this.endPos = event.getLocation();

    // Tính khoảng cách giữa hai vị trí
    this.distance = this.startClickPos.sub(this.endPos).mag();

    console.log("Khoảng cách:", this.distance);

    if (this.distance > 50) {
      Bottle.instance.collisionCheck = 0;
      this.setJumpDuration(this.distance);
      this.setJumpDistance(this.distance);
      this.setAngle();
      this.turnOff();
      this.scheduleOnce(this.up, 0.1);
    }
  }

  setJumpDuration(dis: number) {
    if (dis <= 300) {
      this.jumpDuration = 0.4;
    }
    if (dis > 300 && dis <= 400) {
      this.jumpDuration = 0.45;
    }
    if (dis > 400 && dis <= 480) {
      this.jumpDuration = 0.48;
    }
    if (dis > 480 && dis <= 520) {
      this.jumpDuration = 0.49;
    }
    if (dis > 520 && dis <= 600) {
      this.jumpDuration = 0.50;
    }
    if (dis > 600 && dis <= 700) {
      this.jumpDuration = 0.53;
    }
    if(dis > 700){
      this.jumpDuration = 0.58;
    }
  }

  setJumpDistance(dis: number) {
    if (this.isfliped === 0) {
      if (dis <= 300) {
        this.jumpDistance = cc.v3(-150 + 140, this.bottle.y + 300, 0);
      }
      if (dis > 300 && dis <= 400) {
        this.jumpDistance = cc.v3(-150 + 150, this.bottle.y + 450, 0);
      }
      if (dis > 400 && dis <= 480) {
        this.jumpDistance = cc.v3(-150 + 158, this.bottle.y + 550, 0);
      }
      if (dis > 480 && dis <= 520) {
        this.jumpDistance = cc.v3(-150 + 162, this.bottle.y + 600, 0);
      }
      if (dis > 520 && dis <= 600) {
        this.jumpDistance = cc.v3(-150 + 170, this.bottle.y + 650, 0);
      }
      if (dis > 600 && dis <= 700) {
        this.jumpDistance = cc.v3(-150 + 180, this.bottle.y + 750, 0);
      }
      if (dis > 700) {
        this.jumpDistance = cc.v3(-150 + 190, this.bottle.y + 900, 0);
      }
    } else {
      this.bottleOriginPos = this.bottle.getPosition();
      if (dis < 300) {
        this.jumpDistance = cc.v3(130 - 140, this.bottle.y + 300, 0);
      }
      if (dis > 300 && dis <= 400) {
        this.jumpDistance = cc.v3(130 - 150, this.bottle.y + 450, 0);
      }
      if (dis > 400 && dis <= 480) {
        this.jumpDistance = cc.v3(130 - 158, this.bottle.y + 550, 0);
      }
      if (dis > 480 && dis <= 520) {
        this.jumpDistance = cc.v3(130 - 162, this.bottle.y + 600, 0);
      }
      if (dis > 520 && dis <= 600) {
        this.jumpDistance = cc.v3(130 - 170, this.bottle.y + 650, 0);
      }
      if (dis > 600 && dis <= 700) {
        this.jumpDistance = cc.v3(130 - 180, this.bottle.y + 750, 0);
      }
      if (dis > 700) {
        this.jumpDistance = cc.v3(130 - 190, this.bottle.y + 900, 0);
      }
    }
  }

  setAngle(){
    this.objectHeight = Objects.instance.objectNode[this.isfliped].height;
    this.downY = this.jumpDistance.y - this.bottleOriginPos.y - this.objectHeight;
    if(this.downY < 300) {
      this.angle = 140;
      this.perfectLand = 0;
    }
    if(this.downY > 300 && this.downY <= 400) {
      this.angle = 170;
      this.perfectLand = 1;
    }
    if(this.downY > 400 && this.downY <= 480) {
      this.angle = 180;
      this.perfectLand = 2;
    }
    if(this.downY > 480 && this.downY <= 520) {
      this.angle = 180;
      this.perfectLand = 3;
    }
    if(this.downY > 520 && this.downY <= 600) {
      this.angle = 180;
      this.perfectLand = 2;
    }
    if(this.downY > 600 && this.downY <= 700) {
      this.angle = 190;
      this.perfectLand = 1;
    }
    if(this.downY > 700) {
      this.angle = 220;
      this.perfectLand = 0;
    }
    cc.log("downY: ", this.downY," + angle: ", this.angle," + perfect land: ", this.perfectLand);
  }

  up() {
    this.bottleTemp.active = false;
    cc.tween(this.bottle)
      .parallel(
        cc.tween().to(this.jumpDuration, { position: this.jumpDistance }),
        cc.tween().by(this.jumpDuration, { angle: 180 })
      )
      .call(() => {
        this.down();
      })
      .start();
  }

  down() {
    if (this.isfliped === 0) {
      if (this.downY < 300) {
        this.jumpDistance = cc.v3(130, -260 + this.objectHeight -100, 0);
      }
      if (this.downY > 300 && this.downY <= 400) {
        this.jumpDistance = cc.v3(110, -260 + this.objectHeight, 0);
      }
      if (this.downY > 400 && this.downY <= 4380) {
        this.jumpDistance = cc.v3(110, -260 + this.objectHeight, 0);
      }
      if (this.downY > 480 && this.downY <= 520) {
        this.jumpDistance = cc.v3(130, -260 + this.objectHeight, 0);
      }
      if (this.downY > 520 && this.downY <= 600) {
        this.jumpDistance = cc.v3(110, -260 + this.objectHeight, 0);
      }
      if (this.downY > 600 && this.downY <= 700) {
        this.jumpDistance = cc.v3(110, -260 + this.objectHeight, 0);
      }
      if (this.downY > 700) {
        this.jumpDistance = cc.v3(130, -260 + this.objectHeight - 100, 0);
      }
    } else {
      if (this.downY < 300) {
        this.jumpDistance = cc.v3(-150, -260 + this.objectHeight -100, 0);
      }
      if (this.downY > 300 && this.downY <= 400) {
        this.jumpDistance = cc.v3(-130, -260 + this.objectHeight, 0);
      }
      if (this.downY > 400 && this.downY <= 480) {
        this.jumpDistance = cc.v3(-130, -260 + this.objectHeight, 0);
      }
      if (this.downY > 480 && this.downY <= 520) {
        this.jumpDistance = cc.v3(-150, -260 + this.objectHeight, 0);
      }
      if (this.downY > 520 && this.downY <= 600) {
        this.jumpDistance = cc.v3(-130, -260 + this.objectHeight, 0);
      }
      if (this.downY > 600 && this.downY <= 700) {
        this.jumpDistance = cc.v3(-130, -260 + this.objectHeight, 0);
      }
      if (this.downY > 700) {
        this.jumpDistance = cc.v3(-150, -260 + this.objectHeight - 100, 0);
      }
    }

    this.tween =
      cc.tween(this.bottle)
        .parallel(
          cc.tween().to(this.jumpDuration, { position: this.jumpDistance }),
          cc.tween().by(this.jumpDuration, { angle: this.angle })
        )
    this.tween.start();
  }

  activeBottleTemp(){
    this.bottleTemp.active = true;
    this.bottleTemp.setPosition(cc.v2(this.bottleOriginPos.x, -260 + Objects.instance.objectNode[this.isfliped].height));
    this.bottleOriginPos = this.bottle.getPosition();
  }

  showStar(){
    switch (this.perfectLand) {
      case 1:
        this.activeStar(1, this.starArrayPos[0]);
        break;
      case 2:
        this.activeStar(0, this.starArrayPos[1]);
        this.scheduleOnce(()=>{
          this.activeStar(2, this.starArrayPos[2]);
        },0.2)
        break;
      case 3:
        this.activeStar(0, this.starArrayPos[3]);
        this.scheduleOnce(()=>{
          this.activeStar(1, this.starArrayPos[0]);
        }, 0.2)
        this.scheduleOnce(()=>{
          this.activeStar(2, this.starArrayPos[4]);
        }, 0.4)
        break;
    
      default:
        break;
    }
  }

  activeStar(i: number,pos: cc.Vec2){
    console.log(pos)
    this.starArrs[i].setPosition(this.bottle.getPosition());
    this.starArrs[i].scale = 0.25;
    this.starArrs[i].runAction(
      cc.sequence(
        cc.fadeIn(0.2),
        cc.spawn(cc.moveTo(0.5, pos), cc.scaleTo(0.5, 2)),
        cc.delayTime(1),
        cc.spawn(cc.moveTo(0.2, cc.v2(0, 450)), cc.scaleTo(0.2, 0.25)),
        cc.fadeOut(0.2)
      )
    )
  }

  addScore(){
    this.lblScore.string = (Number(this.lblScore.string) + 1).toString();
  }

  resetGame(){
    Objects.instance.noObject(Objects.instance.objectNode[0]);
    Objects.instance.noObject(Objects.instance.objectNode[1]);
    this.bottle.setPosition(cc.v2(-150, -260));
    this.bottle.angle = 0;
    this.lives = 3;
    this.updateLives();
    this.lblScore.string = "0";
    this.turnOn();
  }
}
