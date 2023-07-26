class Player extends Fighter {
    constructor({position, velocity, character, scale}){
            
        super(position, velocity, character, scale)

        this.facingDirection = "right"
        this.maxHealth = 1000
        this.health = this.maxHealth
        this.canJump = true
        this.isAttacking = false

        this.animationManager = new AnimationManager({
            character : this.character,
            isPlayerOrEnemy : "player"
        })

        this.moveset = {
            ATTK1 : {
                isAttacking : false,
                canAttack : true
            },
            ATTK2 : {
                isAttacking : false,
                canAttack : true
            },
            ATTK3 : {
                isAttacking : false,
                canAttack : true
            },
            ATTK4 : {
                isAttacking : false,
                canAttack : true
            },
        }
    }

    draw(){
        // Animations
        console.log(this.animationManager.animation)
        let moveset = Object.values(this.moveset)

        moveset.forEach(element => {
            if(element.isAttacking){
                this.isAttacking = true
            }
        })
        
        if(this.isAttacking){
            this.attack()
        }else{
            this.animate()
        }


        this.animationManager.facingDirection = this.facingDirection
        
        this.drawAttackBox()
        this.drawHealthbar()
        this.animationManager.play()
    }

    attack(){
        if(this.moveset["ATTK1"].isAttacking && this.animationManager.animation != "stamp"){
            this.animation = this.animationManager.setAnimation(
                "stamp", this.facingDirection, true, "ATTK1", this.position, this.width, this.height, this.scale
            )
        }
        
        else if(this.moveset["ATTK2"].isAttacking && this.animationManager.animation != "pistol"){
            this.animation = this.animationManager.setAnimation(
                "pistol", this.facingDirection, true, "ATTK2", this.position, this.width, this.height, this.scale
            )
            
        } else if(this.moveset["ATTK3"].isAttacking && this.animationManager.animation != "gatling"){
            this.animation = this.animationManager.setAnimation(
                "gatling", this.facingDirection, true, "ATTK3", this.position, this.width, this.height, this.scale
            )
        }
    }

    resetAttacks(){
        let moveset = Object.values(this.moveset)
        moveset.forEach(element => {
            element.isAttacking = false
        })
    }

    animate(){
        if(this.velocity.x === 0 && this.velocity.y === 0 && this.animationManager.animation != "standing"){
            this.animation = this.animationManager.setAnimation(
                "standing", this.facingDirection, false, null, this.position, this.width, this.height, this.scale
            )
        }

        if(this.velocity.x != 0 && this.velocity.y === 0 && this.animationManager.animation != "running"){
            this.animation = this.animationManager.setAnimation(
                "running", this.facingDirection, false, null, this.position, this.width, this.height, this.scale
            )
        }

        if(this.velocity.y != 0 && this.animationManager.animation != "jumping"){
            this.animation = this.animationManager.setAnimation(
                "jumping", this.facingDirection, false, null, this.position, this.width, this.height, this.scale
            )
        }
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
        if(this.position.x + this.velocity.x >= 0 &&
            this.position.x + this.velocity.x + this.width <= canvas.width){
                this.position.x += this.velocity.x
            }

        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height - groundOffset){
            this.velocity.y = 0
        } else this.velocity.y += gravity

        this.draw()
    }
}
