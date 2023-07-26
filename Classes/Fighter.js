class Fighter {

    constructor(position, velocity, character, scale = 3){
        this.position = position
        this.velocity = velocity
        this.character = character
        this.scale = scale
        this.width = charactersData[this.character]["spriteSheets"]["standing"]["spriteSheet"][0]["w"] * scale
        this.height = charactersData[this.character]["spriteSheets"]["standing"]["spriteSheet"][0]["h"] * scale
        
        this.position.y = canvas.height - groundOffset- this.height

        this.facingDirection = null
        this.attackBox = {
            position : this.position,
            width : this.width,
            height : this.height
        }
        this.maxHealth = null
        this.health = this.maxHealth
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
    }
}
