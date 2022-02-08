class Sprites{
    constructor(config){

        //load Sprite
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // Sprite Animation & initial state
        this.animations = config.animations || {
            idleDown:[
                [0, 0]
            ],
            walkDown:[
                [0, 0],[1, 0],[2, 0],[3, 0],
            ],
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        //Reference to GameObject
        this.gameObject = config.gameObject;
    }

    draw = (ctx) =>{
        const x = this.gameObject.x;
        const y = this.gameObject.y;
        const width = this.gameObject.width;
        const height = this.gameObject.height;

        if (this.isLoaded){
            ctx.drawImage(this.image, 0, 0, 32, 64, x, y, width, height)
        }

    }
}