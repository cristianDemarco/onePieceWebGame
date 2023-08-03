class AnimationManager {
    constructor({character, isPlayer}){
        this.character = character
        this.isPlayer = isPlayer === "player" ? true : false
        this.currentFrame = 0
        this.width = 0
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
        this.cooldown = this.animationData["cooldown"]
        this.damage = this.animationData["damage"] / this.maxFrames
        this.isFlipped = this.animationData["isFlipped"]
        this.spriteSheet = this.animationData["spriteSheet"]
        this.initialWidth = this.animationData["spriteSheet"][0].w
        this.spriteSheetImage = createImage(`../assets/${this.character}Spritesheet.png`)
        this.frameCount = 0
        this.currentFrame = 0
        this.offsetx = 0
        this.flipSign = 1

        if(this.isPlayer && this.isAttackOrAnimation === "attacks"){
            setTimeout(() => player.moveset[ATTK].canAttack = true, this.cooldown)
        }
    }

    play(){
        const sprite = this.spriteSheet[this.currentFrame]

        this.offsetx = 0
        this.flipSign = 1

        if(this.facingDirection === this.isFlipped){
            this.flipSign = -1

            if(this.facingDirection === "left"){
                this.offsetx = this.initialWidth * this.scale
            } else {
                this.offsetx = -this.initialWidth * this.scale
            }

        }

        if(this.facingDirection === "left"){

            c.drawImage(this.spriteSheetImage,
                        sprite.x,
                        sprite.y,
                        sprite.w,
                        sprite.h,
                        this.position.x + this.offsetx,
                        this.position.y,
                        sprite.w * this.flipSign * this.scale,
                        sprite.h * this.scale
            )
        } else {

            c.save()
            c.scale(-1, 1)

            c.drawImage(this.spriteSheetImage,
                        sprite.x,
                        sprite.y,
                        sprite.w,
                        sprite.h,
                        -this.position.x - sprite.w * this.flipSign * this.scale + this.offsetx,
                        this.position.y,
                        sprite.w * this.scale * this.flipSign,
                        sprite.h * this.scale
            )

            c.restore()
        }


        if(this.frameCount % this.frameRate === 0){
            this.currentFrame++

        if(this.isPlayer){
            player.width = (sprite.w * this.flipSign) * this.scale

            if(this.isAttackOrAnimation === "attacks" && player.attackCollision()){
                enemy.health -= this.damage
            }
        }
        else{
            enemy.width = (sprite.w * this.flipSign) * this.scale

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