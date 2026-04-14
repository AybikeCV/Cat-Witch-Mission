//*GLOBAL DOM ELEMENTS

//Screens

const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

//Buttons

const startBtnNode = document.querySelector("#start-btn");
const replayBtnNode = document.querySelector("#replay-btn");

//Game-box

const gameBoxNode = document.querySelector("#game-box");

//*GLOBAL GAME VARIABLES

let catObj = null;
let collectiblesArray = [];

let witchObj = null;

let gameIntervalId = null;

//*GLOBAL GAME FUNCTIONS

function gameStart() {

    //changing the screens
    startScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";

    //starting the main game Interval
    gameIntervalId = setInterval(gameLoop, Math.floor(1000/60));

      //Adding the game elements

    catObj = new Cat();
    witchObj = new Witch();

    

}

  


function gameLoop() {

witchObj.automaticMovement();
witchMovement();
witchWallCollisionCheck();

collectiblesArray.forEach(collectible => {
    collectible.automaticMovement();
});

deSpawnCollectible();




}


//*WITCH
function witchMovement() {
    if (witchObj.isMovingDown === true) {
        witchObj.y += witchObj.speed;
        witchObj.node.style.top = `${witchObj.y}px`;
    }

    if(witchObj.isMovingUp === true) {
        witchObj.y -= witchObj.speed;
        witchObj.node.style.top = `${witchObj.y}px`;
    }
}

function witchWallCollisionCheck() {
    if (witchObj.y + witchObj.height >= gameBoxNode.offsetHeight) {
        witchObj.isMovingDown = false;
        witchObj.isMovingUp = true;
    }

    if (witchObj.y <= 0) {
        witchObj.isMovingUp = false;
        witchObj.isMovingDown = true;
    }
}
 
//*COLLECTIBLES

function spawnCollectible() {

    const randomYPosition = Math.floor(Math.random() * gameBoxNode.offsetHeight - 50);
    
    let newCollectiblePotion = new Collectibles("potion",randomYPosition);
    collectiblesArray.push(newCollectiblePotion);

    let newCollectibleBook = new Collectibles("book", randomYPosition);
    collectiblesArray.push(newCollectibleBook);


}

function deSpawnCollectible() {
    collectiblesArray.forEach((collectible, index) => {
        if (collectible.x <= 0) {
            collectible.node.remove();
            collectiblesArray.splice(index, 1);
        }
    })
}





//*EVENT LISTENERS

startBtnNode.addEventListener("click", gameStart)
replayBtnNode.addEventListener("click", gameStart)





//*PLANNING