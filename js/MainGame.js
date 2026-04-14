//*GLOBAL DOM ELEMENTS

//Screens

const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const scoreNode = document.querySelector("#score");
const livesNode = document.querySelector("#lives");
//Buttons

const startBtnNode = document.querySelector("#start-btn");
const replayBtnNode = document.querySelector("#replay-btn");

//Game-box

const gameBoxNode = document.querySelector("#game-box");

//*GLOBAL GAME VARIABLES

let catObj = null;
let collectiblesArray = [];
let evilSpellsArray = [];

let witchObj = null;

let gameIntervalId = null;

let score = 0;
let lives =3;
    function addingUI() {
  scoreNode.textContent = `Score: ${score}`;
  livesNode.textContent = `Lives: ${lives}`;
    }


//*GLOBAL GAME FUNCTIONS

function gameStart() {
  //changing the screens
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //starting the main game Interval
  gameIntervalId = setInterval(gameLoop, Math.floor(1000 / 60));
  deSpawnCollectible = setInterval(spawnCollectible, 3000);
  deSpawnObstacle = setInterval(spawnObstacle, 2000);
  //Adding the game elements

    witchObj = new Witch();
    catObj = new Cat();



    gameLoop();
  
}

function gameLoop() {
  
witchObj.automaticMovement();
//witchMovement();
catObj.move();
//catObj.updatePosition();
addingUI()
deSpawnCollectible();
deSpawnObstacle();


//Collectibles be in function then in the loop
collectiblesArray.forEach((collectibles, index) => {
  if(catObj.didCollide(collectibles)) {
    score += 10;
    addingUI();
    collectibles.node.remove();
    collectiblesArray.splice(index, 1);
  }
}
);

collectiblesArray.forEach((collectibles) => {
  collectibles.automaticMovement();
});


// evil spells be in function then in the loop
evilSpellsArray.forEach((obstacles, index) => {
  
  if(catObj.didCollide(obstacles)) {
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
  if (spell.x + spell.width < 0) {
      spell.node.remove();
      evilSpellsArray.splice(index, 1);
    }
}
);
}


//*Witch
/*function witchMovement() {
  if (witchObj.isMovingDown === true) {
    witchObj.y += witchObj.speed;
    witchObj.node.style.top = `${witchObj.y}px`;

    return isMovingDown;
  }

  if (witchObj.isMovingUp === true) {
    witchObj.y -= witchObj.speed;
    witchObj.node.style.top = `${witchObj.y}px`;

    return isMovingUp;
  }
}*/

function witchWallCollisionCheck() {
  if (
    witchObj.y + witchObj.height >= gameBoxNode.offsetHeight) {
    witchObj.isMovingDown = false;
    }
  if (witchObj.y <= 0) {
    (witchObj.isMovingDown = true);
    //witchObj.isMovingDown = true;
  }
}

//*Collectibles

function spawnCollectible() {

    const randomXPosition = Math.floor(Math.random() * gameBoxNode.offsetWidth);
    const randomYPosition = Math.floor(Math.random() * gameBoxNode.offsetHeight);
 
    let newCollectiblePotion = new Collectibles("potion", randomXPosition, randomYPosition);
  collectiblesArray.push(newCollectiblePotion);

    const randomXPosition2 = Math.floor(Math.random() * gameBoxNode.offsetWidth);
    const randomYPosition2 = Math.floor(Math.random() * gameBoxNode.offsetHeight);

  let newCollectibleBook = new Collectibles("book", randomXPosition2, randomYPosition2);
  collectiblesArray.push(newCollectibleBook);
}

function deSpawnCollectible() {
  collectiblesArray.forEach((collectibles, index) => {
    if (collectibles.x <= 0) {
      collectibles.node.remove();
      collectiblesArray.splice(index, 1);
    }
  });
}

//*Obstacles

function spawnObstacle() {
  const randomXPosition = Math.floor(
    Math.random() * gameBoxNode.offsetWidth,
  );

  const randomYPosition = Math.floor(
    Math.random() * gameBoxNode.offsetHeight,
  );

  let newEvilSpell = new Obstacles(randomXPosition, randomYPosition);
  evilSpellsArray.push(newEvilSpell);
}

function deSpawnObstacle() {
  evilSpellsArray.forEach((obstacles, index) => {
    if (obstacles.x <= 0) {
      obstacles.node.remove();
      evilSpellsArray.splice(index, 1);
    }
  });
}

 


//*EVENT LISTENERS

startBtnNode.addEventListener("click", gameStart);
replayBtnNode.addEventListener("click", gameStart);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") catObj.directionX = -5;
  if (event.key === "ArrowRight") catObj.directionX = 5;
  if (event.key === "ArrowUp") catObj.directionY = -5;
  if (event.key === "ArrowDown") catObj.directionY = 5;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") catObj.directionX = 0;
  if (event.key === "ArrowRight") catObj.directionX = 0;
  if (event.key === "ArrowUp") catObj.directionY = 0;
  if (event.key === "ArrowDown") catObj.directionY = 0;
})

//*PLANNING
