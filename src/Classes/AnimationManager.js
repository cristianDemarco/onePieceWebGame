class AnimationManager {
    constructor({character, isPlayer}){
        this.character = character
        this.isPlayer = isPlayer === "player" ? true : false
        this.currentFrame = 0
    }

    setAnimation(animation, facingDirection, ATTK, position, width, height, scale){
        this.animation = animation
        this.facingDirection = facingDirection
        this.isAttackOrAnimation = typeof ATTK === "string" ? "attacks" : "spriteSheets"
        this.ATTK = ATTK
        this.position = position
        this.width = width
        this.height = height
        this.scale = scale
        this.animationData = charactersData[this.character][this.isAttackOrAnimation][this.animation]
        this.maxFrames = this.animationData["maxFrames"]
        this.frameRate = this.animationData["frameRate"]
        this.spriteSheet = this.animationData["spriteSheet"]
        this.damage = this.animationData["damage"] / this.maxFrames
        this.leftSpriteSheetImage = createImage(`../assets/${this.character}LeftSpritesheet.png`)
        this.rightSpriteSheetImage = createImage(`../assets/${this.character}RightSpritesheet.png`) 
        this.frameCount = 0
        this.currentFrame = 0
    }

    play(){
        let sprite = this.spriteSheet[this.currentFrame]

        if(this.facingDirection === "left"){
            c.drawImage(this.leftSpriteSheetImage,
                        sprite.x,
                        sprite.y,
                        sprite.w,
                        sprite.h,
                        this.position.x,
                        this.position.y,
                        sprite.w * this.scale,
                        sprite.h * this.scale)
        }else{
            c.drawImage(this.rightSpriteSheetImage,
                        this.rightSpriteSheetImage.width - sprite.x,
                        sprite.y,
                        -sprite.w,
                        sprite.h,
                        this.position.x,
                        this.position.y,
                        sprite.w * this.scale,
                        sprite.h * this.scale)
            }

        if(this.frameCount % this.frameRate === 0){
            this.currentFrame++

        if(this.isPlayer){
            player.width = sprite.w * this.scale

            if(this.isAttackOrAnimation === "attacks" && player.attackCollision()){
                enemy.health -= this.damage
            }
        }
        else{
            enemy.width = sprite.w * this.scale

            if(this.isAttackOrAnimation === "attacks" && player.attackCollision()){
                player.health -= this.damage
            }
        }

            if(this.currentFrame === this.maxFrames) {
                this.currentFrame = 0

                if(this.isAttackOrAnimation === "attacks") {
                    if(this.isPlayer){
                        player.moveset[this.ATTK].isAttacking = false
                        player.isAttacking = false
                    }
                }
            }
        }

        this.frameCount ++
    }
}