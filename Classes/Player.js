class Player extends Fighter {
    constructor({position, velocity, character}){
            
        super(position, velocity, character)

        this.facingDirection = "right"
        this.maxHealth = 1000
        this.health = this.maxHealth

        this.animationManager = new AnimationManager({
            character : "rufy",
            isPlayerOrEnemy : "player"
        })
    }

    draw(){
        // Animations
        if(this.velocity.x === 0 && this.velocity.y === 0 && this.animationManager.animation != "standing"){
            this.animation = this.animationManager.setAnimation(
                "standing", this.facingDirection, false, this.position, this.width, this.height
            )
        }

        if(this.velocity.x != 0 && this.velocity.y === 0 && this.animationManager.animation != "running"){
            this.animation = this.animationManager.setAnimation(
                "running", this.facingDirection, false, this.position, this.width, this.height
            )
        }

        if(this.velocity.y != 0 && this.animationManager.animation != "jumping"){
            this.animation = this.animationManager.setAnimation(
                "jumping", this.facingDirection, false, this.position, this.width, this.height
            )
        }

        this.animationManager.facingDirection = this.facingDirection
    }

    drawAttackBox(){
        c.strokeStyle = "green"
        c.strokeRect(this.position.x, this.position.y, this.width, this.height)
        
        if(this.facingDirection == "right"){
            c.strokeStyle = "red"
            c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }else{
            c.strokeStyle = "red"
            c.strokeRect(this.attackBox.position.x + this.attackBox.width - 50, this.attackBox.position.y, -this.attackBox.width, this.attackBox.height)
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

    update(){
        this.drawAttackBox()
        this.drawHealthbar()

        if(this.position.x + this.velocity.x >= 0 &&
            this.position.x + this.velocity.x + this.width <= canvas.width){
                this.position.x += this.velocity.x
            }

        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height - groundOffset){
            this.velocity.y = 0
        } else this.velocity.y += gravity

        this.draw()
        this.animationManager.play()
    }
}
