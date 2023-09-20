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
  pause: cc.Node = null;
  @property(cc.Node)
  Setting: cc.Node = null;

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

  @property(cc.Sprite)
  scoreLoad: cc.Sprite = null;

  @property(cc.Node)
  endGameScreen: cc.Node = null;

  @property(Objects)
  private objControl: Objects = null;
  // LIFE-CYCLE CALLBACKS:

  private startClickPos: cc.Vec2 = null;
  private endPos: cc.Vec2 = null;

  private distance: number = null;
  private jumpDuration: number = null;
  private jumpDistance: cc.Vec3 = null;
  bottleOriginPos: cc.Vec2 = null;
  isfliped: number = 0;
  angleUp: number = 0;
  angleDown: number = 0;
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
    cc.v2(200, 150),
  ];

  onLoad() {
    GamePlayCtrl.instance = this;
    this.resetGame();
  }


  updateLives() {
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

  turnOn() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    console.log("on");
    console.log("----------------------");
  }

  turnOff() {
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
      this.jumpDuration = 0.5;
    }
    if (dis > 600 && dis <= 700) {
      this.jumpDuration = 0.53;
    }
    if (dis > 700) {
      this.jumpDuration = 0.58;
    }
  }

  setJumpDistance(dis: number) {
    console.log("is filiped", this.isfliped)
    if (this.isfliped === 0) {
      if (dis <= 300) {
        this.jumpDistance = cc.v3(-202 + 213, this.bottle.y + 300, 0);
      }
      if (dis > 300 && dis <= 400) {
        this.jumpDistance = cc.v3(-202 + 223, this.bottle.y + 450, 0);
      }
      if (dis > 400 && dis <= 480) {
        this.jumpDistance = cc.v3(-202 + 233, this.bottle.y + 550, 0);
      }
      if (dis > 480 && dis <= 520) {
        this.jumpDistance = cc.v3(-202 + 243, this.bottle.y + 600, 0);
      }
      if (dis > 520 && dis <= 600) {
        this.jumpDistance = cc.v3(-202 + 253, this.bottle.y + 650, 0);
      }
      if (dis > 600 && dis <= 700) {
        this.jumpDistance = cc.v3(-202 + 263, this.bottle.y + 750, 0);
      }
      if (dis > 700) {
        this.jumpDistance = cc.v3(-202 + 273, this.bottle.y + 900, 0);
      }
    } else {
      // this.bottleOriginPos = this.bottle.getPosition();
      if (dis < 300) {
        this.jumpDistance = cc.v3(225 - 213, this.bottle.y + 300, 0);
      }
      if (dis > 300 && dis <= 400) {
        this.jumpDistance = cc.v3(225 - 223, this.bottle.y + 450, 0);
      }
      if (dis > 400 && dis <= 480) {
        this.jumpDistance = cc.v3(225 - 233, this.bottle.y + 550, 0);
      }
      if (dis > 480 && dis <= 520) {
        this.jumpDistance = cc.v3(225 - 243, this.bottle.y + 600, 0);
      }
      if (dis > 520 && dis <= 600) {
        this.jumpDistance = cc.v3(225 - 253, this.bottle.y + 650, 0);
      }
      if (dis > 600 && dis <= 700) {
        this.jumpDistance = cc.v3(225 - 263, this.bottle.y + 750, 0);
      }
      if (dis > 700) {
        this.jumpDistance = cc.v3(225 - 273, this.bottle.y + 900, 0);
      }
    }
  }

  setAngle() {
    this.objectHeight = this.objControl.objectNode[this.isfliped].height;
    this.downY =
      this.jumpDistance.y - this.bottleOriginPos.y - this.objectHeight;
    if (this.downY < 300) {
      this.angleDown = 160;
      this.perfectLand = 0;
    }
    if (this.downY > 300 && this.downY <= 400) {
      this.angleDown = 170;
      this.perfectLand = 1;
    }
    if (this.downY > 400 && this.downY <= 480) {
      this.angleDown = 180;
      this.perfectLand = 2;
    }
    if (this.downY > 480 && this.downY <= 520) {
      this.angleDown = 180;
      this.perfectLand = 3;
    }
    if (this.downY > 520 && this.downY <= 600) {
      this.angleDown = 180;
      this.perfectLand = 2;
    }
    if (this.downY > 600 && this.downY <= 700) {
      this.angleDown = 190;
      this.perfectLand = 1;
    }
    if (this.downY > 700) {
      this.angleDown = 200;
      this.perfectLand = 0;
    }

    if (this.isfliped !== 0) {
      this.angleUp = -180;
      this.angleDown = -this.angleDown;
    } else {
      this.angleUp = 180;
    }

    cc.log(
      "downY: ",
      this.downY,
      " + angle: ",
      this.angleDown,
      " + perfect land: ",
      this.perfectLand
    );
  }

  up() {
    this.bottleTemp.active = false;
    cc.tween(this.bottle)
      .parallel(
        cc.tween().to(this.jumpDuration, { position: this.jumpDistance }),
        cc.tween().by(this.jumpDuration, { angle: this.angleUp })
      )
      .call(() => {
        this.down();
      })
      .start();
  }

  down() {
    let x = 0;
    if (this.isfliped === 0) {
      x = 225;
    } else {
      x = -202;
    }

    this.jumpDistance = cc.v3(this.bottleTemp.x, this.bottleTemp.y - 10, 0);
    // if (this.downY <= 300) {
    //   this.jumpDistance = cc.v3(this.bottleTemp.x, this.bottleTemp.y-10, 0);
    // }
    // if (this.downY > 300 && this.downY <= 400) {
    //   this.jumpDistance = cc.v3(this.bottleTemp.x, this.bottleTemp.y, 0);
    // }
    // if (this.downY > 400 && this.downY <= 4380) {
    //   this.jumpDistance = cc.v3(this.bottleTemp.x, this.bottleTemp.y, 0);
    // }
    // if (this.downY > 480 && this.downY <= 520) {
    //   this.jumpDistance = cc.v3(this.bottleTemp.x, this.bottleTemp.y, 0);
    // }
    // if (this.downY > 520 && this.downY <= 600) {
    //   this.jumpDistance = cc.v3(this.bottleTemp.x, this.bottleTemp.y, 0);
    // }
    // if (this.downY > 600 && this.downY <= 700) {
    //   this.jumpDistance = cc.v3(this.bottleTemp.x, this.bottleTemp.y, 0);
    // }
    // if (this.downY > 700) {
    //   this.jumpDistance = cc.v3(this.bottleTemp.x, this.bottleTemp.y-10, 0);
    // }

    this.tween = cc
      .tween(this.bottle)
      .parallel(
        cc.tween().to(this.jumpDuration, { position: this.jumpDistance }),
        cc.tween().by(this.jumpDuration, { angle: this.angleDown })
      );
    this.tween.start();
  }

  activeBottleTemp() {
    this.bottleTemp.active = true;
    let extra = this.getExtra();
    let x = this.isfliped == 0 ? 225 : -202;
    let pos = cc.v2(
      x,
      this.objControl.objectNode[this.isfliped].y + this.objControl.objectNode[this.isfliped].height + extra
    )
    this.bottleTemp.setPosition(pos);
    this.bottleOriginPos = this.bottle.getPosition();
  }

  getExtra(){
    let obj = this.objControl.iArray[this.isfliped];
    let extra = 0;
    switch (obj) {
      case 0:
        extra = 80;
        break;

      case 1:
        extra = 110;
        break;

      case 2:
        extra = 160;
        break;

      case 3:
        extra = 0;
        break;
    }
    return extra
  }

  showStar() {
    switch (this.perfectLand) {
      case 1:
        this.activeStar(1, this.starArrayPos[0]);
        break;

      case 2:
        this.activeStar(0, this.starArrayPos[1]);
        this.scheduleOnce(() => {
          this.activeStar(2, this.starArrayPos[2]);
        }, 0.2);
        break;

      case 3:
        this.activeStar(0, this.starArrayPos[3]);
        this.scheduleOnce(() => {
          this.activeStar(1, this.starArrayPos[0]);
        }, 0.2);
        this.scheduleOnce(() => {
          this.activeStar(2, this.starArrayPos[4]);
        }, 0.4);      
        break;

      default:
        break;
    }
  }

  updateBar() {
    this.scoreLoad.fillRange += 0.1;
    this.scoreLoad.fillRange = Number(this.scoreLoad.fillRange.toFixed(1));
    if(this.scoreLoad.fillRange == 1){
      this.scoreLoad.fillRange = 0
      if (this.lives < 3) {
        this.lives +=1;
        this.updateLives();
      }
    }
  }

  activeStar(i: number, pos: cc.Vec2) {
    this.starArrs[i].setPosition(this.bottle.getPosition());
    this.starArrs[i].scale = 0.25;
    // let pos2 = this.scoreLoad.node.convertToWorldSpaceAR(this.scoreLoad.node.getPosition());
    // let pos3 = this.starArrs[i].convertToNodeSpaceAR(pos2);
    this.starArrs[i].runAction(
      cc.sequence(
        cc.fadeIn(0.2),
        cc.spawn(cc.moveTo(0.5, pos), cc.scaleTo(0.5, 2)),
        cc.delayTime(0.5),
        cc.spawn(cc.moveTo(0.2, cc.v2(-130, 460)), cc.scaleTo(0.2, 0.25)),
        cc.fadeOut(0.2),
      )
    );
    this.scheduleOnce(()=>{
      this.updateBar();
    }, 1.6)
  }

  addScore() {
    this.lblScore.string = (Number(this.lblScore.string) + 1).toString();
  }

  resetGame() {
    this.objControl.noObject(this.objControl.objectNode[0]);
    this.objControl.noObject(this.objControl.objectNode[1]);
    this.objControl.iArray = [0,0];
    this.isfliped = 0;
    this.bottle.setPosition(cc.v2(-202, -144));
    this.bottle.angle = 0;
    this.bottleOriginPos = this.bottle.getPosition();
    this.bottleTemp.active = true;
    this.bottleTemp.setPosition(225, -144);
    this.lives = 3;
    this.updateLives();
    this.lblScore.string = "0";
    this.scoreLoad.fillRange = 0
    this.turnOn();
  }

  toggleSetting() {
    this.Setting.active = !this.Setting.active
  }
  togglePause() {
    this.pause.active = !this.pause.active
  }
}
