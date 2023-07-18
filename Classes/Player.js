class Player extends Fighter {
    constructor({position, velocity, character}){
            
        super(position, velocity, character)

        this.facingDirection = "right"
        this.maxHealth = 1000
        this.health = this.maxHealth
    }

    draw(){
        c.strokeStyle = "green"
        c.strokeRect(this.position.x, this.position.y, this.width, this.height)
        c.strokeStyle = "red"
        c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        
        if(this.isAttacking){
            player.createAnimation("gumStampSpriteSheet", player.facingDirection, 7, 13, 3, false)

        }else{
            if(this.velocity.x === 0 && this.velocity.y === 0){
                this.createAnimation("standingSpriteSheet", this.facingDirection, 7, 15, 3, true)
            }

            if(this.velocity.x != 0 && this.velocity.y === 0){
                this.createAnimation("runningSpriteSheet", this.facingDirection, 6, 8, 3, true)
            }

            if(this.velocity.y != 0){
                this.createAnimation("jumpingSpriteSheet", this.facingDirection, 10, 10, 3, true)
            }
        }
    }

    attackCollision(){
        if(this.facingDirection === "right"){
            return (this.attackBox.position.x + this.attackBox.width >= enemy.position.x) &&
            this.attackBox.position.y >= enemy.position.y &&
            this.attackBox.position.x + this.attackBox.width <= enemy.position.x + enemy.width
        }else{
            return (this.attackBox.position.x + this.width - this.attackBox.width >= enemy.position.x) &&
            this.attackBox.position.y >= enemy.position.y &&
            this.attackBox.position.x + this.width - this.attackBox.width <= enemy.position.x + enemy.width
        }
    }

    drawHealthbar(){
        c.fillStyle = "black"
        c.fillRect(100, 50, 750, 75)

        c.fillStyle = "red"
        c.fillRect(110, 60, 730, 55)
        c.fillStyle = "green"
        c.fillRect(110, 60, (730 * this.health)/this.maxHealth, 55)
    }
}
