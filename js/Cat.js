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

    }

}