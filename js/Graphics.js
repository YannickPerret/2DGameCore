// Créer un canvas et le modifier en temps réelle 60 images par seconde
class Render {
    constructor(config){
        this.render = undefined;
        this.context = undefined;
        this.renderId = config.renderId;

        this.width = config.width;
        this.height = config.height;

        this.zIndex = config.zIndex;
        this.contener = config.contener;
    }

    create = () =>{

        let gameContentCavnas = document.getElementById(this.contener);
        this.context = document.createElement('canvas').getContext("2d");

        this.context.canvas.id = this.renderId;
        this.context.canvas.style.position = "absolute";
        this.context.canvas.style.width = "100%";
        
        this.context.canvas.style.zIndex = this.zIndex;
        //canvas.style.cursor = "none";

        //Ajouter le canvas à l'élément
        gameContentCavnas.appendChild(this.context.canvas);

        //Récuprér l'object Canva qu'on vient de créer
        this.render = document.getElementById(this.renderId)

        this.render.width = this.width;
        this.render.height = this.height;

        if(!this.context){
            alert("Votre navigateur ne supporte pas le HTML 5, nous vous conseillons de le mettre à vous ou d'essayer avec un autre navigateur")
        }
    }

    draw = (_image, _destX, _destY, _destWidth, _destHeight, _handleReset = false, _sourceX, _sourceY, _sourceWidth, _sourceHeight ) =>{
        if ( _handleReset){
            this.context.clearRect(0, 0, this.render.width, this.render.height);
        }
        if (_sourceX == undefined){
            this.context.drawImage(_image, _destX, _destY, _destWidth, _destHeight);
        }else{
            this.context.drawImage(_image, _sourceX, _sourceY, _sourceWidth, _sourceHeight, _destX, _destY, _destWidth, _destHeight);
        }
    }
}


class Camera {
    constructor(config){
        this.xView = config.xView || 0;
        this.yView = config.yView || 0;

        this.xDeadZone = 0;
        this.yDeadZone = 0;

        //ViewPort  Dimension
        this.wView = config.viewportWidth;
        this.yView = config.viewportHeight;

        this.axis = AXIS.BOTH;

        this.followed = null

        this.gameObject = config.gameObject;
    }

    follow = (_gameObject, _xDeadZone, _yDeadZone) =>{
        this.followed = _gameObject;
        this.xDeadZone = _xDeadZone;
        this.yDeadZone = _yDeadZone;
    }
    update = () =>{

        if ( this.followed != null){
            if(this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH){
                if (this.followed.position.x - this.xView + this.xDeadZone > this.wView)

	                 this.xView = this.followed.position.x - (this.wView - this.xDeadZone);

	            else if (this.followed.position.x - this.xDeadZone < this.xView)

	                this.xView = this.followed.position.x - this.xDeadZone;  
            }

            if(this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH){

                if (this.followed.position.y - this.yView + this.yDeadZone > this.hView){
                    this.yView = this.followed.position.y - (this.hView - this.yDeadZone);
                }
                    

                else if (this.followed.position.y - this.yDeadZone < this.yView)
                {                   
                    this.yView = this.followed.position.y - this.yDeadZone;
                }
            }
        }

    }

}