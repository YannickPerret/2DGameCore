// Map génère chaque mapp avec les collissions pour les envoyer au LevelManager
class Maps{
    constructor(config){
        this.mapToLoad = config.map;
        this.mapCols = config.map.mapCols;
        this.mapRows = config.map.mapRows;

        this.AtlasMap = new Image();
        this.AtlasMap.src = config.map.tileSet

        this.AtlasMapCols = config.map.tileSetCol

        this.tileSize = config.tileSize ||  32; 
        this.tileOutputSize = config.tileOutputSize || 1.5

        this.mapWidth = 0;
        this.mapHeight = 0;

        this.finalMap = new Image()

        this.collision = []

    }

    generate = () => {
        // Calcule de la hauteur du canvas par rapport au nombre de Row et de Cols
        this.mapHeight = parseInt(this.mapRows * this.tileSize, 10);
        this.mapWidth = parseInt(this.mapCols * this.tileSize, 10);

        let sourceX = 0;
        let sourceY = 0;
        let mapIndex = 0;

        let updatedTileSize = this.tileSize * this.tileOutputSize;

        this.AtlasMap.onload = () => {
            gameView.context.save()

            
            for (let layers = 0; layers < this.mapToLoad.sceneTile.length; layers++)
            {
                gameView.context.beginPath()
                
                for (let col = 0; col < this.mapHeight; col += this.tileSize) {
                    for (let row = 0; row < this.mapWidth; row += this.tileSize) {
    
                        let tileVal = this.mapToLoad.sceneTile[layers][mapIndex];
                        if(tileVal !=0) {
                            tileVal -= 1;
    
                            sourceY = Math.floor(tileVal/this.AtlasMapCols) * this.tileSize;
                            sourceX = (tileVal % this.AtlasMapCols) * this.tileSize
    
                           gameView.draw(this.AtlasMap, row * this.tileOutputSize, col * this.tileOutputSize, updatedTileSize, updatedTileSize, false, sourceX, sourceY, this.tileSize, this.tileSize);                             
                        }
                        mapIndex++;
                    }
                    gameView.context.closePath();
                }
                mapIndex = 0; 
            }
            gameView.context.restore();

            this.finalMap.src = gameView.context.canvas.toDataURL("image/png");
        }
    }

    draw = (_xView, _yView) =>{

        let sourceX, sourceY, destX, destY;
	    let sourceWidth, sourceHeight, destWidth, destHeight;


        sourceX = _xView;
        sourceY = _yView;

        sourceWidth = gameView.width;
        sourceHeight = gameView.height;
            

        if (this.finalMap.width - sourceX < sourceWidth) {
            sourceWidth = this.finalMap.width - sourceX;
        }
        if (this.finalMap.height - sourceY < sourceHeight) {
            sourceHeight = this.finalMap.height - sourceY;
        }   
          // location on canvas to draw the croped image
            destX = 0;
            destY = 0;

            // match destination with source to not scale the image
            destWidth = sourceWidth;
            destHeight = sourceHeight;

            console.log({sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight})
            gameView.context.drawImage(this.finalMap, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

          //document.getElementById("gamesContentCavnas").innerHTML += `<img src="${this.finalMap.src}" width="${sourceWidth}" height="1200" />`
    }   


}