//EVENT LISTENER
var bKeys = [];

setInterval(() => {
    document.addEventListener('keydown', (event) =>{

        if (bKeys.includes(event.key) === false) {
            bKeys.push(event.key);
        }
    
        if (bKeys.includes('w') || bKeys.includes('ArrowUp')){
            event.preventDefault();
            gameEngine.player.upKeyPress = true;
        }
        if (bKeys.includes('s') || bKeys.includes('ArrowDown')){
            event.preventDefault();
            gameEngine.player.downKeyPress = true;
        }
        if (bKeys.includes('a') || bKeys.includes('ArrowLeft')){
            event.preventDefault();
            gameEngine.player.leftKeyPress = true;
        }
        if (bKeys.includes('d') || bKeys.includes('ArrowRight')){
            event.preventDefault();
            gameEngine.player.rightKeyPress = true;
        }
    
    }, false);
    
    document.addEventListener('keyup', (event) =>{
        if (event.key == "w" || event.key == 'ArrowUp'){
            gameEngine.player.upKeyPress = false;
        }
         if (event.key == "s" || event.key == 'ArrowDown'){
            gameEngine.player.downKeyPress = false;
        }
        if (event.key == "a" || event.key == 'ArrowLeft'){
            gameEngine.player.leftKeyPress = false;
        }
        if (event.key == "d" || event.key == 'ArrowRight'){
            gameEngine.player.rightKeyPress = false;
        }
        
        bKeys.pop(event.key);
    }, false);

    gameEngine.player.movement();
  }, 40)