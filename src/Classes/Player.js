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

        const keys = ["Q", "E", "C", "X"]

        Object.values(this.moveset).forEach((element, i) => {
            element["icon"] = createImage(`../assets/movesetIcons/${this.character}ATTK${i + 1}.png`)
            element["angle"] = 0
            element["letter"] = keys[i]
        })
    }

    draw(){
        // Animations
        Object.values(this.moveset).forEach(element => {
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
        if(this.moveset["ATTK1"].isAttacking && this.animationManager.animation != "ATTK1"){
            this.animation = this.animationManager.setAnimation(
                "ATTK1", this.facingDirection, this.position, this.width, this.height, this.scale
            )

        } else if(this.moveset["ATTK2"].isAttacking && this.animationManager.animation != "ATTK2"){
            this.animation = this.animationManager.setAnimation(
                "ATTK2", this.facingDirection, this.position, this.width, this.height, this.scale
            )
            
        } else if(this.moveset["ATTK3"].isAttacking && this.animationManager.animation != "ATTK3"){
            this.animation = this.animationManager.setAnimation(
                "ATTK3", this.facingDirection, this.position, this.width, this.height, this.scale
            )

        } else if(this.moveset["ATTK4"].isAttacking && this.animationManager.animation != "ATTK4"){
            this.animation = this.animationManager.setAnimation(
                "ATTK4", this.facingDirection, this.position, this.width, this.height, this.scale
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
                "standing", this.facingDirection, this.position, this.width, this.height, this.scale
            )
        }

        if(this.velocity.x != 0 && this.velocity.y === 0 && this.animationManager.animation != "running"){
            this.animation = this.animationManager.setAnimation(
                "running", this.facingDirection, this.position, this.width, this.height, this.scale
            )
        }

        if(this.velocity.y != 0 && this.animationManager.animation != "jumping"){
            this.animation = this.animationManager.setAnimation(
                "jumping", this.facingDirection, this.position, this.width, this.height, this.scale
            )
        }
    }

    drawAttackBox(){
        c.save()
        c.strokeStyle = "red"
        c.lineWidth = 3
        c.strokeRect(this.position.x, this.position.y, this.width, this.height)
        c.fillRect(this.position.x -5 , this.position.y -5, 10, 10)
        c.restore()
    }

    attackCollision(flipSign, initialWidth){
        if(this.facingDirection === "right"){
            if(flipSign === -1){
                return this.position.x + initialWidth >= enemy.position.x &&
                this.position.y >= enemy.position.y &&
                this.position.x + initialWidth <= enemy.position.x + enemy.width
            } else {
                return this.position.x + this.width >= enemy.position.x &&
                this.position.y >= enemy.position.y &&
                this.position.x + this.width <= enemy.position.x + enemy.width
            }
        }else{
            if(flipSign === -1){
                return this.position.x + this.width <= enemy.position.x + enemy.width &&
                this.position.y >= enemy.position.y &&
                this.position.x + this.width >= enemy.position.x

            } else {
                return this.position.x <= enemy.position.x + enemy.width &&
                this.position.y >= enemy.position.y &&
                this.position.x >= enemy.position.x
           }
        }
    }

    drawHUD(){
        const fontsize = mapWidth(30)

        //Healthbar
        c.font = `${fontsize}px serif`
        c.save()
        c.strokeStyle = "black"
        c.fillRect(mapWidth(220), mapHeight(80), mapWidth(640), mapHeight(75))
        c.strokeStyle = "red"
        c.fillRect(mapWidth(230), mapHeight(90), mapWidth(620), mapHeight(55))
        c.fillStyle = "green"
        c.fillRect(mapWidth(230), mapHeight(90), mapWidth((620 * this.health)/this.maxHealth), mapHeight(55))
        c.fillStyle = "black"
        c.fillText(`${this.health}/${this.maxHealth}`, 700, 117 + fontsize/3)
        c.restore()

        //Character icon
        c.save()
        c.drawImage(this.iconImage, mapWidth(50), mapHeight(25), mapWidth(180), mapHeight(180))
        c.strokeStyle = "black"
        c.lineWidth = 5
        c.strokeRect(mapWidth(50), mapHeight(25), mapWidth(180), mapHeight(180))
        c.restore()

        //Moveset
        const y = mapHeight(220)
        const radius = mapWidth(40)
        const offsetRadius = mapWidth(10)
        
        for(let i = 1; i <= Object.keys(this.moveset).length; i++){
            const x = mapWidth(200) + mapWidth(125) * i
            
            //Draw the image
            c.moveTo(x + radius + offsetRadius, y)
            c.drawImage(this.moveset[`ATTK${i}`].icon, x - radius, y - radius, radius * 2, radius * 2)

            // Draw the black circle
            c.save()
            c.beginPath()
            c.arc(x, y, radius + offsetRadius, 0, Math.PI * 2)
            c.lineWidth = 3
            c.strokeStyle = "black"
            c.stroke()
            c.restore()

            // Draw the white translucent circle
            c.save();
            c.beginPath();
            c.arc(
                x,
                y,
                radius + offsetRadius,
                Math.toRadians(0) * Math.PI, 
                Math.toRadians(this.moveset[`ATTK${i}`].angle)
            )
            
            c.fillStyle = "rgba(255, 255, 255, 0.8)"
            c.fill()
            c.restore()

            c.save()
            c.fillText(this.moveset[`ATTK${i}`].letter, x - fontsize/3, y + radius * 2)
            c.restore()
        }
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
