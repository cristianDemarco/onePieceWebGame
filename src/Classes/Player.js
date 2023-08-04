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
            isPlayer : "player"
        })
    }

    draw(){
        // Animations
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
        this.animationManager.play()
    }

    attack(){
        if(this.moveset["ATTK1"].isAttacking && this.animationManager.animation != "stamp"){
            this.animation = this.animationManager.setAnimation(
                "stamp", this.facingDirection, "ATTK1", this.position, this.width, this.height, this.scale
            )

        } else if(this.moveset["ATTK2"].isAttacking && this.animationManager.animation != "pistol"){
            this.animation = this.animationManager.setAnimation(
                "pistol", this.facingDirection, "ATTK2", this.position, this.width, this.height, this.scale
            )
            
        } else if(this.moveset["ATTK3"].isAttacking && this.animationManager.animation != "gatling"){
            this.animation = this.animationManager.setAnimation(
                "gatling", this.facingDirection, "ATTK3", this.position, this.width, this.height, this.scale
            )

        } else if(this.moveset["ATTK4"].isAttacking && this.animationManager.animation != "bazooka"){
            this.animation = this.animationManager.setAnimation(
                "bazooka", this.facingDirection, "ATTK4", this.position, this.width, this.height, this.scale
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
                "standing", this.facingDirection, null, this.position, this.width, this.height, this.scale
            )
        }

        if(this.velocity.x != 0 && this.velocity.y === 0 && this.animationManager.animation != "running"){
            this.animation = this.animationManager.setAnimation(
                "running", this.facingDirection, null, this.position, this.width, this.height, this.scale
            )
        }

        if(this.velocity.y != 0 && this.animationManager.animation != "jumping"){
            this.animation = this.animationManager.setAnimation(
                "jumping", this.facingDirection, null, this.position, this.width, this.height, this.scale
            )
        }
    }

    drawAttackBox(){
        c.strokeStyle = "green"
        c.strokeRect(this.position.x, this.position.y, this.width, this.height)
    }

    attackCollision(){
        if(this.facingDirection === "right"){
            return (this.position.x + this.width >= enemy.position.x) &&
            this.position.y >= enemy.position.y &&
            this.position.x + this.width <= enemy.position.x + enemy.width
        }else{
            return (this.position.x + this.width - this.width >= enemy.position.x) &&
            this.position.y >= enemy.position.y &&
            this.position.x + this.width - this.width <= enemy.position.x + enemy.width
        }
    }

    drawHUD(){
        c.fillStyle = "black"
        c.fillRect(mapWidth(220), mapHeight(80), mapWidth(640), mapHeight(75))

        c.fillStyle = "red"
        c.fillRect(mapWidth(230), mapHeight(90), mapWidth(620), mapHeight(55))
        c.fillStyle = "green"
        c.fillRect(mapWidth(230), mapHeight(90), mapWidth((620 * this.health)/this.maxHealth), mapHeight(55))

        c.drawImage(this.iconImage, mapWidth(50), mapHeight(25), mapWidth(180), mapHeight(180))
        c.save()
        c.strokeStyle = "black";
        c.lineWidth = 5;
        c.strokeRect(mapWidth(50), mapHeight(25), mapWidth(180), mapHeight(180))
        c.restore()
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
