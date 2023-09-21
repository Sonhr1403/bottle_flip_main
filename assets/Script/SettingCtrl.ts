// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

export enum SOUND_TYPE {
    BACKGROUND = 0,
    START_NEW_GAME = 1,
    THROW_BOTTLE = 2,
    BOTTLE_LAND = 3,
    BOTTLE_FALL = 4,
    GAIN_STARS = 5,
    GAIN_LIVE = 6,
    LOST_LIVE = 7,
    GAME_OVER = 8,
    BTN_CLICK = 9,
}

@ccclass
export default class SettingCtrl extends cc.Component {

    public static instance: SettingCtrl = null;

    @property(cc.AudioClip)
    private backGroundMusic: cc.AudioClip = null;

    @property(cc.AudioClip)
    private startNewGame: cc.AudioClip = null;

    @property(cc.AudioClip)
    private throwBottle: cc.AudioClip = null;

    @property(cc.AudioClip)
    private bottleLand: cc.AudioClip = null;

    @property(cc.AudioClip)
    private bottleFall: cc.AudioClip = null;

    @property(cc.AudioClip)
    private gainStar: cc.AudioClip = null;

    @property(cc.AudioClip)
    private gainLive: cc.AudioClip = null;

    @property(cc.AudioClip)
    private lostLive: cc.AudioClip = null;

    @property(cc.AudioClip)
    private gameOver: cc.AudioClip = null;

    @property(cc.AudioClip)
    private btnClick: cc.AudioClip = null;

    @property(cc.SpriteFrame)
    private status: cc.SpriteFrame[] = [];

    @property(cc.Node)
    private sound: cc.Node = null;

    @property(cc.Node)
    private music: cc.Node = null;

    // @property(cc.Node)
    // private vibration: cc.Node = null;

    // @property(cc.Slider)
    // private volumeSlider: cc.Slider = null;

    // @property(cc.Sprite)
    // private progressBar: cc.Sprite = null;

    private _audioId: number = -1;


    //////////////////////////////////////////////////////////////////////////////

    protected onLoad(): void {
        SettingCtrl.instance = this;
    }

    private getSystemVolume() {
        return Number(localStorage.getItem("volume"));
    }

    private setSystemVolume(volume: number) {
        localStorage.setItem("volume",volume.toString());
    }

    public playType(type: number) {
        let audioClip: cc.AudioClip = null;
        let musicClip: cc.AudioClip = null;
        switch (type) {
            case SOUND_TYPE.BACKGROUND:
                musicClip = this.backGroundMusic;
                break;
            case SOUND_TYPE.START_NEW_GAME:
                audioClip = this.startNewGame;
                break;
            case SOUND_TYPE.THROW_BOTTLE:
                audioClip = this.throwBottle;
                break;
            case SOUND_TYPE.BOTTLE_LAND:
                audioClip = this.bottleLand;
                break;
            case SOUND_TYPE.BOTTLE_FALL:
                audioClip = this.bottleFall;
                break;
            case SOUND_TYPE.GAIN_STARS:
                audioClip = this.gainStar;
                break;
            case SOUND_TYPE.GAIN_LIVE:
                audioClip = this.gainLive;
                break;
            case SOUND_TYPE.LOST_LIVE:
                audioClip = this.lostLive;
                break;
            case SOUND_TYPE.GAME_OVER:
                audioClip = this.gameOver;
                break;
            case SOUND_TYPE.BTN_CLICK:
                audioClip = this.btnClick;
                break;
        }
        if (audioClip && this.getSoundStatus() === "true") {
            this.playSound(audioClip);
        }

        if (musicClip) {
            if (this.getMusicStatus() === "true"){
                if (this._audioId === -1) {
                    this.playMusic(musicClip);
                }
            } else {
                this.stopAll();
                this._audioId = -1;
            }
        }

    }

    private playSound(audioClip: cc.AudioClip) {
        cc.audioEngine.play(audioClip, false, this.getSystemVolume());
    }

    private playMusic(audioClip: cc.AudioClip) {
        this._audioId = cc.audioEngine.play(audioClip, true, this.getSystemVolume());
    }

    private setMusicStatus(status: string){
        localStorage.setItem("musicStatus", status.toString());
    }

    private getMusicStatus(){
        return localStorage.getItem("musicStatus");
    }

    private setSoundStatus(status: string){
        localStorage.setItem("soundStatus", status.toString());
    }

    private getSoundStatus(){
        return localStorage.getItem("soundStatus");
    }

    public stopAll() {
        cc.audioEngine.stopAll();
    }

    // private setVolume(progress: number){
    //     this.volumeSlider.progress = progress;
    //     this.setProgressBar(progress);
    //     RLTSoundControler.instance.setSystemVolume(progress);
    // }

    // private setProgressBar(progress: number){
    //     this.progressBar.fillRange = progress;
    // }

    public setMusicOnOff(){
        this.music.getComponent(cc.Sprite).spriteFrame = this.getMusicStatus() === "true" ? this.status[1] : this.status[0];
        this.playType(0);
    }

    public setSoundOnOff(){
        this.sound.getComponent(cc.Sprite).spriteFrame = this.getSoundStatus() === "true" ? this.status[1] : this.status[0];
    }

    // public setVibrationOnOff(isOn: boolean){
    //     if (isOn) {
    //         this.vibration.getComponent(cc.Sprite).spriteFrame = this.status[1];
    //     } else {
    //         this.vibration.getComponent(cc.Sprite).spriteFrame = this.status[0];
    //     }
    // }

    private onClickMusic(){
        let musicStatus = this.getMusicStatus();
        musicStatus = musicStatus === "true"? "false" : "true";
        this.setMusicStatus(musicStatus);
        this.setMusicOnOff();
    }

    private onClickSound(){
        let soundStatus = this.getSoundStatus();
        soundStatus = soundStatus === "true"? "false" : "true";
        this.setSoundStatus(soundStatus);
        this.setSoundOnOff();
    }

    // private onClickVibation(){
    //     let vibrationStatus = RouletteController.instance.getVibrationStatus();
    //     vibrationStatus = !vibrationStatus;
    //     this.setVibrationOnOff(vibrationStatus);
    //     RouletteController.instance.setVibrationStatus(vibrationStatus);
    // }

    // private onSliderEvent(sender, eventType){
    //     console.log(sender.progress);
    //     this.setVolume(sender.progress);
    // }
    
    private hide(){
        this.node.active = false;
    }
}
