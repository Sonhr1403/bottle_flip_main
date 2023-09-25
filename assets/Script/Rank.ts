// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import RankItem from "./RankItem";

const { ccclass, property } = cc._decorator;

export interface itemRank {
  time: string;
  score: string;
}

@ccclass
export default class Rank extends cc.Component {
  @property(cc.Prefab)
  private prfRankItem: cc.Prefab = null;

  @property(cc.Node)
  private content: cc.Node = null;

  private listRank: itemRank[] = [];

  /////////////////////////////////////////////

  public initRankItem() {
    this.listRank = JSON.parse(localStorage.getItem("listRank"));

    this.content.removeAllChildren();
    for (let i = 0; i < this.listRank.length; i++) {
      let itemNode = cc.instantiate(this.prfRankItem);
      itemNode.getComponent(RankItem).initItem(this.listRank[i], (i+1).toString() );
      this.content.addChild(itemNode);
    }
  }

  private hide() {
    this.node.active = false;
  }
}
