class GameSetting {
    constructor(){
        //Point system
        this.timeWinPoint = 1000;
        this.ratio = 3.3;
        this.ratioWinPoint = 1,

        //Engine system
        this.isPaused = false;

        this.width = 1920;
        this.height = 1200;

        this.viewport ={
            width : window.innerWidth,
            height : window.innerHeight 
        }

        this.canvaGameId = "gamesContentCavnas";
    }
    
    paused = (_enable) => {

        _enable ? this.isPaused = true : this.isPaused = false;
    }
}