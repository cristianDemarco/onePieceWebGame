class AnimationManager {
    constructor({character, isPlayerOrEnemy}){
        this.character = character
        this.currentFrame = 0
        this.isPlayerOrEnemy = isPlayerOrEnemy
    }

    setAnimation(animation, facingDirection, isAttack, position, width, height, scale = 3){
        this.animation = animation
        this.facingDirection = facingDirection
        this.isAttackOrAnimation = isAttack === true ? "attacks" : "spriteSheets"
        this.position = position
        this.width = width
        this.height = height
        this.scale = scale
        this.animationData = charactersData[this.character][this.isAttackOrAnimation][this.animation]
        this.maxFrames = this.animationData["maxFrames"]
        this.frameRate = this.animationData["frameRate"]
        this.spriteSheet = this.animationData["spriteSheet"]
        this.leftSpriteSheetImage = createImage("./assets/" + this.character + "SpriteSheetLeft.png")
        this.rightSpriteSheetImage = createImage("./assets/" + this.character + "SpriteSheetRight.png")
        this.frameCount = 0
    }

    play(){
        if(this.currentFrame >= this.maxFrames) {
            this.currentFrame = 0
        }

        let sprite = this.spriteSheet[this.currentFrame]

        if(this.facingDirection === "left"){
            c.drawImage(this.leftSpriteSheetImage,
                        sprite.x, sprite.y,
                        sprite.w, sprite.h,
                        this.position.x, this.position.y,
                        sprite.w * this.scale, sprite.h * this.scale)
        }else{
            c.drawImage(this.rightSpriteSheetImage,
                        this.rightSpriteSheetImage.width - sprite.x, sprite.y,
                        -sprite.w, sprite.h,
                        this.position.x, this.position.y,
                        sprite.w * this.scale, sprite.h * this.scale)
            }

        if(this.isPlayerOrEnemy === "player"){
            player.width = sprite.w * this.scale
            player.attackBox.width = sprite.w * this.scale + 50
        }else{
            enemy.width = sprite.w * this.scale
            enemy.attackBox.width = sprite.w * this.scale + 50
        }

        if(this.frameCount % this.frameRate === 0){
            this.currentFrame++
            if(this.currentFrame === this.maxFrames) {
                this.currentFrame = 0

                if(!this.isAttackOrAnimation === "attack") {
                    this.isAttacking = false
                }
            }
        }

        this.frameCount ++
    }
}