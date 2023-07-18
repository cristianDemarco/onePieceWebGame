class Fighter {

    constructor(position, velocity, character){
        this.width = 100
        this.height = 100
        this.position = position
        this.velocity = velocity
        this.character = character
        this.facingDirection = null
        this.attackBox = {
            position : this.position,
            width : this.width,
            height : this.height
        }
        this.isAttacking = false
        this.maxHealth = null
        this.health = this.maxHealth
        this.currentFrame = 0
        this.frameCount = 0
        this.leftSpriteSheetImage = createImage("/home/cristian/VSCode/onePieceWebGame/assets/" + this.character + "SpriteSheetLeft.png")
        this.rightSpriteSheetImage = createImage("/home/cristian/VSCode/onePieceWebGame/assets/" + this.character + "SpriteSheetRight.png")
    }

    draw(){
    }

    createAnimation(animation, direction, maxFrames, frameRate, scale, loop){
        if(this.currentFrame >= maxFrames) this.currentFrame = 0
        let sprite = spriteSheets[this.character + "SpriteSheets"][animation][this.currentFrame]
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

        this.width = sprite.w * scale
        this.attackBox.width = sprite.w * scale + 50
        
        if(this.frameCount % frameRate === 0){
            this.currentFrame++
            if(this.currentFrame === maxFrames) {
                this.currentFrame = 0

                if(!loop) this.isAttacking = false
            }
        }

        this.frameCount ++
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
