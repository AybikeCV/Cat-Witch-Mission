class Witch {

    constructor() {

        this.node = document.createElement("img");
        this.node.src = "./images-in-game/evil-witch-game/Clarice-noctural-creature-hunter-Run.png";
        gameBoxNode.append(this.node);

        this.x = 460;
        this.y = 0;
        this.width = 65;
        this.height = 75;
        
        this.node.style.width = `${this.width}px`;
        this.node.style.height = `${this.height}px`;
        this.node.style.left = `${this.x}px`;
        this.node.style.top = `${this.y}px`;
        this.node.style.position = "absolute";

        this.node.style.border = "0.5px dotted black";
        this.node.classList.add("witch");

        this.directionX = 0;
        this.directionY = 0;

        this.speed = 4;
        
        this.mode = "vertical";
        this.isMovingDown = true;  
    }

  automaticMovement() {

    if (this.mode !== "vertical") 
      return;
  
    if (this.isMovingDown) {
    this.y += this.speed;
    } else {
    this.y -= this.speed;
    }

     // Update position once
    this.node.style.top = `${this.y}px`;

    // Bottom boundary
    if (this.y + this.height >= gameBoxNode.offsetHeight) {
    this.isMovingDown = false;

    // Top boundary 
    } else if (this.y <= 0) {
    this.isMovingDown = true;
  } 
}

   triggerScare() {

    if (this.mode === "scare") return;

  this.mode = "scare";

  let jumps = 0;
  const maxJumps = 4;

  const teleportInterval = setInterval(() => {

    this.isMovingDown = false;

    
    this.x = Math.random() * (gameBoxNode.offsetWidth - this.width);
    this.y = Math.random() * (gameBoxNode.offsetHeight - this.height);

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;

    jumps++;

    if (jumps >= maxJumps) {
      clearInterval(teleportInterval);

      this.mode = "vertical";
      this.isMovingDown = true;
      this.node.style.left = `${this.x}px`;
      this.node.style.top = `${this.y}px`
    }

  }, 400);

  }
}
