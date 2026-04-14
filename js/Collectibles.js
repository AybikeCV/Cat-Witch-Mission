class Collectibles {

    constructor(type, yPosition) {

    this.type = type

    this.node = document.createElement("img")
    if(this.type === "potion") {
        this.node.src = "images-in-game/items-game/item-potion.png"
}
    else if(this.type === "book") {
        this.node.src = "images-in-game/items-game/item-book.png"
}
    //else if(this.type === "catnip") {this.node.src = "images-in-game/items-game/item-catnip.png"}
    gameBoxNode.append(this.node)

    this.x = 1100
    this.y = yPosition
    this.width = 75
    this.height = 75

    this.node.style.width = `${this.width}px`
    this.node.style.height = `${this.height}px`
    this.node.style.left = `${this.x}px`
    this.node.style.top = `${this.y}px`
    this.node.style.position = "absolute"

    this.speed = 3
}

    automaticMovement() {
        this.x -= this.speed
        this.node.style.left = `${this.x}px`
    }


}