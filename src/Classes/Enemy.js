class Enemy extends Fighter{
    constructor({position, velocity, character, scale}){

        super(position, velocity, character, scale)

        this.position.x = canvas.width - mapWidth(200) - this.width
        this.facingDirection = "left"
        this.maxHealth = 1000,
        this.health = this.maxHealth

        this.animationManager = new AnimationManager({
            character : "arlong",
            isPlayerOrEnemy : "enemy"
        })
    }

    draw(){
        if(this.velocity.x === 0 && this.velocity.y === 0 && this.animationManager.animation != "standing"){
            this.animation = this.animationManager.setAnimation(
                "standing", this.facingDirection, null, this.position, this.width, this.height, this.scale
            )
        }

        //c.fillStyle = "blue"
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //c.fillStyle = "green"
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.animationManager.facingDirection = this.facingDirection
        this.drawHealthbar()
        this.animationManager.play()
        
    }

    drawHealthbar(){
        c.fillStyle = "black"
        c.fillRect(canvas.width - mapWidth(100), mapHeight(50), mapWidth(-760), mapHeight(75))

        c.fillStyle = "red"
        c.fillRect(canvas.width - mapWidth(110), mapHeight(60), mapWidth(-740), mapHeight(55))
        c.fillStyle = "green"
        c.fillRect(canvas.width - mapWidth(110), mapHeight(60), mapWidth((-740 * this.health)/this.maxHealth), mapHeight(55))
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