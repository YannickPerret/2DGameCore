//Liste des objects du jeux 
class GameObjects {
    constructor(config){
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 0;
        this.height = config.height || 0;

        this.sprite = new Sprites({
            gameObject: this,
            src: config.src || "default sprite",
        });

        



        this.map = new Maps({
            gameObject: this,
            mapToLoad: config.map,
            tileSize: config.tileSize || 32,
            tileOutputSize: config.tileOutputSize || 1.5
        });

        this.render = new Render({
            gameObject: this,
            renderId: config.renderId || "default render",
            zIndex: config.zIndex,
            contener: config.contener,
        });

        this.camera = new Camera({
            gameObject: this,

        });

        this.player = new Player({
            gameObject: this,
            name: config.name,
        })
        
    }
}