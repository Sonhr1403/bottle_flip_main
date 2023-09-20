const {ccclass, property} = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.Sprite)
    private bar: cc.Sprite = null;

    @property(cc.Label)
    private loadLbl: cc.Label = null;

    private progress: number = 0;

    protected onLoad () {
        this.progress = 0;

        this.bar.fillRange = 0;

        cc.director.preloadScene('Lobby');

        this.schedule(this.updateString, 0.4, 3)

        // localStorage.setItem("musicStatus", "true");
        // localStorage.setItem("soundStatus", "true");
    }

    private updateString() {
        cc.log("run")
        this.loadLbl.string = "Loading";
        this.scheduleOnce(() => {
            this.loadLbl.string = "Loading.";
        }, 0.1);
        this.scheduleOnce(() => {
            this.loadLbl.string = "Loading..";
        }, 0.2);     
        this.scheduleOnce(() => {
            this.loadLbl.string = "Loading...";
        }, 0.3);     
    }

    protected update (dt) {
        this.progress += 0.01;
        this.bar.fillRange = this.progress;
        if (this.bar.fillRange == 1) {
            cc.director.loadScene('Lobby');
            this.progress = 0
        }
    }
}
