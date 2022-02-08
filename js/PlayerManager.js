class Player{
    constructor(config){
        this.netId = 0;
        this.canvas = null;
        this.canvasContext = undefined;
        this.player = null;
        
        this.name = config.name;
        this.level = 1;
        this.nextLevelPoint = 15;
        this.currentPoint = 0;

        this.timeWinPoint = 1000; //Gagne toutes les 1 seconde
        this.pointPerSeconde = 1;

        this.tileSizeOutput = 1.5;
        this.width = 32 * this.tileSizeOutput;
        this.height = 64 * this.tileSizeOutput;

        this.characterImage = new Image();
        this.characterImage.src = '/image/character/characterPlayer.png';

        this.speed = 32 * this.tileSizeOutput

        this.lastPosition = {mapId : 0, x: 0, y: 0};
        this.position = {mapId : 1, x: 288, y: 384};

        this.upKeyPress = false;
        this.downKeyPress = false;
        this.leftKeyPress = false;
        this.rightKeyPress = false;

    }
 
    spawn = () =>{

        document.getElementById("characterName").innerHTML = this.name;
        document.getElementById("currentLevel").innerHTML = this.level;
        document.getElementById("upPoint").innerHTML = this.nextLevelPoint;

         this.characterImage.onload = () => {
            gameView.draw(this.characterImage, this.position.x, this.position.y, this.width, this.height);
            
        }
    }

    draw = () =>{
        gameView.draw(this.characterImage, this.position.x, this.position.y, this.width, this.height);
    }
 
    winPoint = () => {
        this.currentPoint = parseInt(this.currentPoint + this.pointPerSeconde, 10);
        document.getElementById("havePoint").innerHTML = this.currentPoint;
    }
 
    upLevel = () => {
        this.currentPoint = 0;
        this.level++;
        this.pointPerSeconde = parseInt(this.pointPerSeconde * gameSetting.ratioWinPoint, 10);
        this.nextLevelPoint = parseInt(this.nextLevelPoint * gameSetting.ratio, 10);
 
        document.getElementById("currentLevel").innerHTML = this.level;
        document.getElementById("upPoint").innerHTML = this.nextLevelPoint;
    }
    
    movement = () => {
        document.getElementById("debug").innerHTML =  "X : " + this.position.x +"   Y : " +this.position.y + "   up : "+this.upKeyPress + "   down : "+this.downKeyPress + "   left : "+this.leftKeyPress + "    right : "+ this.rightKeyPress;

        if(this.upKeyPress && !this.downKeyPress){ 
            if ((this.position.y - this.speed) >= 0){
                this.position.y = this.position.y - this.speed;
            }
            if(this.rightKeyPress && !this.leftKeyPress){
                if (this.position.x + this.speed <= gameSetting.width - 64){
                    this.position.x = this.position.x + this.speed;
                }
            }
            else if(this.leftKeyPress && !this.rightKeyPress){
                if (this.position.x - this.speed >= 0){
                    this.position.x = this.position.x - this.speed;
                }
            }
        }
        else if(this.downKeyPress && !this.upKeyPress){
            if ((this.position.y + this.speed) <= gameSetting.height - 64){
                this.position.y = this.position.y + this.speed;
            }
            if(this.rightKeyPress && !this.leftKeyPress){
                if(this.position.x + this.speed <= gameSetting.width -64){
                    this.position.x = this.position.x + this.speed;
                }
            }
            else if(this.leftKeyPress && !this.rightKeyPress){
                if (this.position.x - this.speed >= -this.speed){
                    this.position.x = this.position.x - this.speed;
                }
            }
        }
        else{
            if(this.leftKeyPress && !this.rightKeyPress){
                if(this.position.x - this.speed >= 0){
                    this.position.x = this.position.x - this.speed;
                }
            }
            else if(this.rightKeyPress && !this.leftKeyPress){
                if(this.position.x + this.speed <= gameSetting.width - this.speed){
                    this.position.x = this.position.x + this.speed;
                }
            }
        }
        //console.log(mapManager.checkCollision(this.position.mapId, this.position.x, this.position.y))

        //if (mapManager.checkCollision(this.position.mapId, this.position.x, this.position.y) === 0){

            //this.player.x = this.position.x;
            //this.player.y = this.position.y;
           // this.canvasContext.renderContext.clearRect(0, 0, mapManager.gameView.width, mapManager.gameView.height);
           // this.player.sprite.draw(this.canvasContext.renderContext);

            //this.canvasContext.draw(this.characterImage, this.position.x, this.position.y, this.width, this.height, true)
        //}
    }
 }