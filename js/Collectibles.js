class Collectibles {

    constructor(type, xPosition, yPosition) {

    this.type = type;

    this.node = document.createElement("img")
    if(this.type === "potion") {
        this.node.src = "./images-in-game/items-game/item-potion.png"
}
    else if(this.type === "book") {
        this.node.src = "./images-in-game/items-game/item-book.png"
}
    gameBoxNode.append(this.node);

    this.x = xPosition;
    this.y = yPosition;
    this.width = 25;
    this.height = 25;

    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.position = "absolute";

    this.node.style.border = "0.5px dotted black";
    this.node.classList.add("collectibles");

    this.speed = 2;
}

    automaticMovement() {
        this.x -= this.speed;
        this.node.style.left = `${this.x}px`;
    }


}