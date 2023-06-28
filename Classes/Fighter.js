class Fighter {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.width = 100
        this.height = 100
        this.facingDirection;
        this.attackBox = {
            position : this.position,
            width : this.width,
            height : this.height
        },
        this.isAttacking = false
        this.maxHealth = 250,
        this.health = this.maxHealth
        this.currentFrame = 0
        this.frameCount = 0
        this.leftSpriteSheetImage = createImage("/home/cristian/VSCode/onePieceWebGame/assets/" + character + "SpriteSheetLeft.png")
        this.rightSpriteSheetImage = createImage("/home/cristian/VSCode/onePieceWebGame/assets/" + character + "SpriteSheetRight.png")
    }

    draw(){
        c.strokeStyle = "green"
        c.strokeRect(this.position.x, this.position.y, this.width, this.height)
        c.strokeStyle = "red"
        c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        
        if(this.isAttacking){
            player.createAnimation("gumKickSpriteSheet", player.facingDirection, 7, 13, 3, false)

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

    createAnimation(animation, direction, maxFrames, frameRate, scale, loop){
        if(this.currentFrame >= maxFrames) this.currentFrame = 0
        let sprite = spriteSheets.rufySpriteSheet[animation][this.currentFrame]
        if(direction === "left"){
            c.drawImage(this.leftSpriteSheetImage,
                        sprite.x, sprite.y,
                        sprite.w, sprite.h,
                        this.position.x, this.position.y,
                        sprite.w * scale, sprite.h * scale)
        }else{
            c.drawImage(this.rightSpriteSheetImage,
                        this.rightSpriteSheetImage.width - sprite.x, sprite.y,
                        -sprite.w, sprite.h,
                        this.position.x, this.position.y,
                        sprite.w * scale, sprite.h * scale)
            }
        
        this.width = sprite.w * 3
        this.attackBox.width = sprite.w * 3 + 50
        
        if(this.frameCount % frameRate === 0){
            this.currentFrame++
            if(this.currentFrame === maxFrames) {
                this.currentFrame = 0

                if(!loop) this.isAttacking = false
            }
        }

        this.frameCount ++
    }

    attackCollision(){
        console.log(this.attackBox.position.y >= enemy.position.y)
        if(this.facingDirection === "right"){
            return (this.attackBox.position.x + this.attackBox.width >= enemy.position.x) &&
            this.attackBox.position.y >= enemy.position.y &&
            //this.attackBox.position.y + this.attackBox.height <= enemy.position.y + enemy.height &&
            this.attackBox.position.x + this.attackBox.width <= enemy.position.x + enemy.width
        }else{
            return (this.attackBox.position.x + this.width - this.attackBox.width >= enemy.position.x) &&
            this.attackBox.position.y >= enemy.position.y &&
            //this.attackBox.position.y + this.attackBox.height <= enemy.position.y + enemy.height &&
            this.attackBox.position.x + this.width - this.attackBox.width <= enemy.position.x + enemy.width
        }
    }

    drawHealthbar(){
        c.fillStyle = "black"
        c.fillRect(100, 50, 750, 75)

        c.fillStyle = "green"
        c.fillRect(110, 60, (730 * this.health)/this.maxHealth, 55)
    }

    update(){
        if(this.position.x + this.velocity.x >= 0 &&
            this.position.x + this.velocity.x + this.width <= canvas.width){
                this.position.x += this.velocity.x
            }
        
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 100){
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }

        this.draw()

    }
}
