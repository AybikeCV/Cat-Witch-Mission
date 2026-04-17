class Cat {

    constructor() {

        this.node = document.createElement("img");
        this.node.src = "./images-in-game/cats-game/cat-witch-flying.png";
        gameBoxNode.append(this.node);

        this.x = 50;
        this.y = 200;
        this.width = 65;
        this.height = 65;
        
        this.node.style.width = `${this.width}px`;
        this.node.style.height = `${this.height}px`;
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.position = "absolute";

        this.node.style.border = "0.5px dotted black";
        this.node.classList.add("cat");

        this.directionX = 0;
        this.directionY = 0;

        this.isUndefeated = false;
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

        this.updatePosition();
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

    didCollide(witchObj) {
  return (
        this.x < witchObj.x + witchObj.width &&
        this.x + this.width > witchObj.x &&
        this.y < witchObj.y + witchObj.height &&
        this.y + this.height > witchObj.y
  );
}

didCollideCollectibles() {

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

    for (let i = evilSpellsArray.length - 1; i >= 0; i--) {
    let obstacle = evilSpellsArray[i];

    if (this.didCollide(obstacle)) {
      lives -= 1;
      addingUI();

      obstacle.node.remove();
      evilSpellsArray.splice(i, 1);

    if (lives <= 0) {
      clearInterval(gameIntervalId);
      clearInterval(deSpawnCollectibleIntervalId);
      clearInterval(deSpawnObstacleIntervalId);

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


  didCollideWitch() {

    if (this.didCollide(witchObj) && !this.isUndefeated) {
    this.isUndefeated = true;

    if (witchObj.mode === "scare") {
      lives -= 2;
    } else {
      lives -= 1;
    }

    addingUI();

    setTimeout(() => {
      this.isUndefeated = false;
    }, 2000); // immune for 2 seconds otherwise witch is really annoying

    if (lives <= 0) {
      clearAllIntervals();
      gameScreenNode.style.display = "none";
      gameOverScreenNode.style.display = "flex";
    }
  }
  }
}



 

