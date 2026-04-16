//*GLOBAL DOM ELEMENTS

//Screens

const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const scoreNode = document.querySelector("#score");
//const livesNode = document.querySelector("#lives");

//Buttons

const startBtnNode = document.querySelector("#start-btn");
const replayBtnNode = document.querySelector("#replay-btn");
const soundOnNode = document.querySelector("#sound-on-button");
const soundOffNode = document.querySelector("#sound-off-button")

//Game-box

const gameBoxNode = document.querySelector("#game-box");

//Audio and lives(hearts)

const meowSoundNode = document.querySelector("#meow-sound")
const gameMusicNode = document.querySelector("#game-music")
const heartsNode = document.querySelector("#lives-container")

//*GLOBAL GAME VARIABLES

//characters and items
let catObj = null;
let collectiblesArray = [];
let evilSpellsArray = [];
let witchObj = null;

//game intervalIds
let gameIntervalId = null;
let deSpawnCollectibleIntervalId = null;
let deSpawnObstacleIntervalId = null

//UI
let score = 0;
let lives = 9;
let isSoundOn = true;
 


//*GLOBAL GAME FUNCTIONS

function gameStart() {

  clearAllIntervals();

  playGameMusic();

  //changing the screens
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  initGame();
  //starting the main game Interval
  gameIntervalId = setInterval(gameLoop, Math.floor(1000 / 60));
  
  deSpawnCollectibleIntervalId = setInterval(spawnCollectible, 3000);
  deSpawnObstacleIntervalId = setInterval(spawnObstacle, 2000);
 
    
}

function gameLoop() {

  witchObj.automaticMovement();

  //witchMovement();
  witchWallCollisionCheck();


  collectiblesArray.forEach((collectibles) => {
collectibles.automaticMovement();
});

  evilSpellsArray.forEach((obstacle) => {
  obstacle.automaticMovement();
});

catObj.move();
//catObj.updatePosition();
//catObj.didCollide(collectibles);
//catObj.didCollide(obstacles);
catObj.didCollideCollectibles();
catObj.didCollideObstacles();

deSpawnCollectible();
deSpawnObstacle();

addingUI();

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
  
  const randomXPosition = Math.floor(Math.random() * gameBoxNode.offsetWidth);
  const randomYPosition = Math.floor(Math.random() * gameBoxNode.offsetHeight);
  
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

function clearAllIntervals() {
  clearInterval(gameIntervalId);
  clearInterval(deSpawnCollectibleIntervalId);
  clearInterval(deSpawnObstacleIntervalId);

  gameIntervalId = null;
  deSpawnCollectibleIntervalId = null;
  deSpawnObstacleIntervalId = null;

}
function gameOver() {
  
  clearAllIntervals();

  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";
}

function initGame() {
  witchObj = new Witch();
  catObj = new Cat();

  collectiblesArray = [];
  evilSpellsArray = [];

  score = 0;
  lives = 9;

  addingUI();
}


function rePlay() {
 
    clearAllIntervals();
    
    document.querySelectorAll(".cat, .witch, .collectibles, .obstacles").forEach(el => el.remove());

    witchObj = null;
    catObj = null;
    collectiblesArray = [];
    evilSpellsArray = [];
  
    gameOverScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";


    gameStart();
}

//UI
function addingUI() {
  scoreNode.textContent = `Score: ${score}`;
  //livesNode.textContent = `Lives: ${lives}`; 
  minusLives();
}

// Sounds Audio
function playMeow() {

  if (!isSoundOn) return;

  meowSoundNode.currentTime = 0;
  meowSoundNode.play();
}

function playGameMusic () {

  if (!isSoundOn) return;

  gameMusicNode.currentTime = 0;
  gameMusicNode.play();
}

//Lives(Hearts)
function minusLives() {
  heartsNode.innerHTML = "";

  for (let i = 0; i < lives; i++) {
    const heart = document.createElement("div");

    if (i < lives) {
      heart.textContent = "❤️";
    } else {
      heart.textContent = "💔"
    }
    heartsNode.append(heart)
  }
}
    

 
//*EVENT LISTENERS

startBtnNode.addEventListener("click", () => {
  gameStart();
  playMeow();
});

replayBtnNode.addEventListener("click", () => {
  rePlay();
  playMeow();
});

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

soundOnNode.addEventListener("click", () => {
  isSoundOn = true,
  meowSoundNode.play();
  gameMusicNode.play();
})

soundOffNode.addEventListener("click", () => {
  isSoundOn = false;
  meowSoundNode.pause();
  gameMusicNode.pause();
})
