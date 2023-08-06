class Enemy extends Fighter{
    constructor({position, velocity, character, scale}){

        super(position, velocity, character, scale)

        this.position.x = canvas.width - mapWidth(500) - this.width
        this.facingDirection = "left"
        this.maxHealth = 1000,
        this.health = this.maxHealth

        this.animationManager = new AnimationManager({
            character : this.character,
            isPlayer : "enemy"
        })
    }

    draw(){
        if(this.velocity.x === 0 && this.velocity.y === 0 && this.animationManager.animation != "standing"){
            this.animation = this.animationManager.setAnimation(
                "standing", this.facingDirection, null, this.position, this.width, this.height, this.scale
            )
        }

        this.animationManager.facingDirection = this.facingDirection
        this.animationManager.play()
        
    }

    drawHUD(){
        c.save()
        //Healthbar
        c.fillStyle = "black"
        c.fillRect(canvas.width - mapWidth(220), mapHeight(80), mapWidth(-600), mapHeight(75))
        c.fillStyle = "red"
        c.fillRect(canvas.width - mapWidth(230), mapHeight(90), mapWidth(-580), mapHeight(55))
        c.fillStyle = "green"
        c.fillRect(canvas.width - mapWidth(230), mapHeight(90), mapWidth((-580 * this.health)/this.maxHealth), mapHeight(55))

        //Icon
        c.drawImage(this.iconImage, canvas.width - mapWidth(230), mapHeight(25), mapWidth(180), mapHeight(180))
        c.strokeStyle = "black";
        c.lineWidth = 5;
        c.strokeRect(canvas.width - mapWidth(230), mapHeight(25), mapWidth(180), mapHeight(180))
        c.restore()
    }

    fightingAlgorithm(){
    }

    update(){
        if(this.position.x + this.velocity.x >= 0 &&
            this.position.x + this.velocity.x + this.width <= canvas.width){
                this.position.x += this.velocity.x
            }

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 100){
            this.velocity.y = 0
        } else this.velocity.y += gravity

        this.position.y = Math.round(this.position.y += this.velocity.y)

        this.draw()
    }
}