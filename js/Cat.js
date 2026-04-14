class Cat {

    constructor() {

        this.node = document.createElement("img");
        this.node.src = "images-in-game/cats-game/cat-witch-flying.png";
        gameBoxNode.append(this.node);

        this.x = 50;
        this.y = 300;
        this.width = 125;
        this.height = 125;
        
        this.node.style.width = `${this.width}px`;
        this.node.style.height = `${this.height}px`;
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.position = "absolute";

        this.directionX = 0
        this.directionY = 0
    }

    move() {

         this.x += this.directionX;
         this.y += this.directionY;
        
        if (this.x < 10) {
      this.x = 10;
        }
        if (this.y < 10) {
      this.y= 10;
    }
        if (this.x > gameBoxNode.offsetWidth - this.width - 10) {
      this.x = gameBoxNode.offsetWidth - this.width - 10;
    }
         if (this.y > gameBoxNode.offsetHeight - this.height - 10) {
      this.y = gameBoxNode.offsetHeight - this.height - 10;
    }

        this.updatePosition()
    }

    updatePosition(){
        
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;;
    }


   /* handleKeydown(event) {
    console.log(event.type, event.key);
      if (event.type === "keydown") {
        switch (event.key) {
          case "ArrowLeft":
            game.player.directionX = -1;
            break;
          case "ArrowUp":
            game.player.directionY = -1;
            break;
          case "ArrowRight":
            game.player.directionX = 1;
            break;
          case "ArrowDown":
            game.player.directionY = 1;
            break;
        }
      }
        else if (event.type === "keyup") {
          switch (event.key) {
            case "ArrowLeft":
              game.player.directionX = 0;
              break;
            case "ArrowUp":
              game.player.directionY = 0;
              break;
            case "ArrowRight":
              game.player.directionX = 0;
              break;
            case "ArrowDown":
              game.player.directionY = 0;
              break;
          }
        }
      }*/


    /*didCollide(obstacleObj) {

        if (
          this.x < obstacleObj.x + obstacleObj.width &&
          this.x + this.width > obstacleObj.x &&
          this.y < obstacleObj.y + obstacleObj.height &&
          this.y + this.height > obstacleObj.y
        ) {
          return true;
        }

    }*/

    }

