//GlobalVariable 
let gameEngine = null
let gameView = null
let gameSetting = null
const AXIS = {
    NONE : 1,
    HORIZONTAL : 2,
    VERTICAL : 3,
    BOTH : 4,
}


class GameEngine {
    constructor(config){
        this.element = config.element;
        this.canvas = undefined;
        this.context = undefined;
        //this.fps = 60;
        //this.frameDuration = 1000 / this.fps;

        this.isPaused = false;

        this.levelManager = undefined;
        this.gameSetting = undefined
        this.player = undefined

        this.currentMap = undefined
        this.camera = undefined

        this.FPS = 60 ;
        this.INTERVAL = 1000 / this.FPS;

        this.performance = performance.now();
        this.accumulatedFrameTime = 0;
    }

    init = () =>{

        gameSetting = new GameSetting();
    
        //Création de la zone de jeu Canvas avec les informations de Settings
        gameView = new Render({
            renderId : "mapLevel",
            width: gameSetting.viewport.width,
            height: gameSetting.viewport.height,
            priority : 1,
            contener: gameSetting.canvaGameId
        })
        gameView.create();

        this.player = new Player({
            name : "tchoune"
        })

        this.currentMap = new Maps({
            map: window.levelMap[this.player.position.mapId]
        })
        this.currentMap.generate();
        this.player.spawn();

        // Set the right viewport size for the camera
	    var viewportWidth = Math.min(this.currentMap.mapWidth, gameView.width);
	    var viewportHeight = Math.min(this.currentMap.mapHeight, gameView.height);

        this.camera = new Camera({
            xView : 0, 
            yView : 0, 
            viewportWidth: viewportWidth, 
            viewportHeight: viewportHeight, 
            atlasWidth: this.currentMap.mapWidth, 
            atlasHeight: this.currentMap.mapHeight});

        this.camera.follow(this.player, viewportWidth / 2, viewportHeight / 2);

    }

    gameLoop = () =>{
        this.update();  
        this.draw();
    }
    

        /*let gameLoop = setInterval(function(){
            if (!gameSetting.isPaused){
                if (player.currentPoint >= player.nextLevelPoint){
                    player.upLevel()
                }
                player.winPoint();
            }
        },  gameSetting.timeWinPoint);
    }*/
    update(){

        //player.update(STEP, room.width, room.height);
	    this.camera.update();
    }

    draw(){
        // clear the entire canvas
        gameView.context.clearRect(0, 0, gameView.width, gameView.height);

        //console.log(this.camera.xView, this.camera.yView)
        this.currentMap.draw(this.camera.xView, this.camera.yView);
        this.player.draw()


    }


}



//Lancement du jeu - Création des objects du moteur de jeu
window.addEventListener('load', function() {
    gameEngine = new GameEngine({
        config: document.querySelector("gameContent")
    });
    gameEngine.init();

    console.log(gameEngine.INTERVAL)
    setInterval(() => {
        gameEngine.gameLoop()
    }, gameEngine.INTERVAL)
})
//Initalialisation de la map





//Event OnClick pour gagner des points par clics
let winPointHandle = () =>{
    player.winPoint();
    document.getElementById("showWinPoint").innerHTML = "+ "+player.pointPerSeconde;
    setTimeout(function(){
        document.getElementById("showWinPoint").innerHTML = "";
    }, 250)
}

