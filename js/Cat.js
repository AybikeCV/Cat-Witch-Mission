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

        this.node.style.border = "2px dotted black"

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


    didCollide(collectibles) {

  return (
    this.x < collectibles.x + collectibles.width &&
    this.x + this.width > collectibles.x &&
    this.y < collectibles.y + collectibles.height &&
    this.y + this.height > collectibles.y
  );

    }
    
    didCollide(obsctacles) {
  return (
    this.x < obsctacles.x + obsctacles.width &&
    this.x + this.width > obsctacles.x &&
    this.y < obsctacles.y + obsctacles.height &&
    this.y + this.height > obsctacles.y
  );
}

didCollideCollectibles() {
      /*collectiblesArray.forEach((collectibles, index) => {
  if(this.didCollide(collectibles)) {
    score += 10;
    addingUI();
    collectibles.node.remove();
    collectiblesArray.splice(index, 1);
  }
}
);*/

for (let i = collectiblesArray.length - 1; i >= 0; i--) {
    let collectible = collectiblesArray[i];

    if (this.didCollide(collectible)) {
      score += 10;
      addingUI();

      collectible.node.remove();
      collectiblesArray.splice(i, 1);
    }
  }
}

didCollideObstacles() {
      /*evilSpellsArray.forEach((obstacles, index) => {
  
  if(this.didCollide(obstacles)) {
    lives -= 1;
    addingUI();
    obstacles.node.remove();
    evilSpellsArray.splice(index, 1);

    if(lives <= 0) {
      clearInterval(gameIntervalId);
      gameScreenNode.style.display = "none";
      gameOverScreenNode.style.display = "flex";
    }
  }
  if (obstacles.x + obstacles.width < 0) {
      obstacles.node.remove();
      evilSpellsArray.splice(index, 1);
    }
}
);
}*/
for (let i = evilSpellsArray.length - 1; i >= 0; i--) {
    let obstacle = evilSpellsArray[i];

    if (this.didCollide(obstacle)) {
      lives -= 1;
      addingUI();

      obstacle.node.remove();
      evilSpellsArray.splice(i, 1);

      if (lives <= 0) {
        clearInterval(gameIntervalId);
        clearInterval(spawnCollectibleInterval);
        clearInterval(spawnObstacleInterval);

        gameScreenNode.style.display = "none";
        gameOverScreenNode.style.display = "flex";
      }
    }

    // despawn check
    if (obstacle.x + obstacle.width < 0) {
      obstacle.node.remove();
      evilSpellsArray.splice(i, 1);
    }
  }

  }

}

    /*didCollideCollectibles() {
      collectiblesArray.forEach((collectibles, index) => {
  if(this.didCollide(collectibles)) {
    score += 10;
    addingUI();
    collectibles.node.remove();
    collectiblesArray.splice(index, 1);
  }
}
);
    }*/

    /*didCollideObstacles() {
      evilSpellsArray.forEach((obstacles, index) => {
  
  if(this.didCollide(obstacles)) {
    lives -= 1;
    addingUI();
    obstacles.node.remove();
    evilSpellsArray.splice(index, 1);

    if(lives <= 0) {
      clearInterval(gameIntervalId);
      gameScreenNode.style.display = "none";
      gameOverScreenNode.style.display = "flex";
    }
  }
  if (obstacles.x + obstacles.width < 0) {
      obstacles.node.remove();
      evilSpellsArray.splice(index, 1);
    }
}
);
}
    }*/

   /* handleKeydown(event) {
    console.log(event.type, event.key);
      if (event.type === "keydown") {
        switch (event.key) {
          case "ArrowLeft":
            catObj.move.directionX = -5;
            break;
          case "ArrowUp":
           catObj.move.directionY = -5;
            break;
          case "ArrowRight":
            catObj.move.directionX = 5;
            break;
          case "ArrowDown":
            catObj.move.directionY = 5;
            break;
        }
      }
        else if (event.type === "keyup") {
          switch (event.key) {
            case "ArrowLeft":
              catObj.move.directionX = 0;
              break;
            case "ArrowUp":
              catObj.move.directionY = 0;
              break;
            case "ArrowRight":
              catObj.move.directionX = 0;
              break;
            case "ArrowDown":
              catObj.move.directionY = 0;
              break;
          }
        }
      }*/


 

