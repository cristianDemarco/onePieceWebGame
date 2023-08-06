class AnimationManager {
    constructor({character, isPlayer}){
        this.character = character
        this.isPlayer = isPlayer === "player" ? true : false
        this.currentFrame = 0
        this.width = 0
    }

    dealDamage(subject){
        if(this.isAttackOrAnimation === "attacks"
            && player.attackCollision(this.flipSign)
        ){
            if(this.isMultiHit === true){
                subject.health -= this.damage/this.maxFrames
    
            }else if(this.isMultiHit === false){
                subject.health -= this.damage
                this.isMultiHit = null
            }
        }
    }

    setAnimation(animation, facingDirection, position, width, height, scale){
        this.animation = animation
        this.facingDirection = facingDirection
        this.isAttackOrAnimation = animation.includes("ATTK") ? "attacks" : "spriteSheets"
        this.position = position
        this.width = width
        this.height = height
        this.scale = scale
        this.animationData = charactersData[this.character][this.isAttackOrAnimation][this.animation]
        this.maxFrames = this.animationData["maxFrames"]
        this.frameRate = this.animationData["frameRate"]
        const cooldown = this.animationData["cooldown"]
        this.damage = this.animationData["damage"]
        this.isFlipped = this.animationData["isFlipped"]
        this.isMultiHit = this.animationData["isMultiHit"]
        this.spriteSheet = this.animationData["spriteSheet"]
        this.initialWidth = this.animationData["spriteSheet"][0].w
        this.spriteSheetImage = createImage(`../assets/spriteSheets/${this.character}.png`)
        this.frameCount = 0
        this.currentFrame = 0
        this.offsetx = 0
        this.flipSign = 1

        if(this.isPlayer && this.isAttackOrAnimation === "attacks"){
            player.moveset[animation].angle = 2

            const interval = setInterval(() => {
                player.moveset[animation].angle -= 360 / (cooldown / 1000)
            }, 1000)

            setTimeout(() => {
                player.moveset[animation].canAttack = true
                player.moveset[animation].angle = 0
                clearInterval(interval)
            }, cooldown)
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

                this.dealDamage(enemy)
            } else {
                enemy.width = (sprite.w * this.flipSign) * this.scale

                this.dealDamage(player)
            }

            if(this.currentFrame === this.maxFrames) {
                this.currentFrame = 0

                if(this.isAttackOrAnimation === "attacks") {
                    if(this.isPlayer){
                        player.moveset[this.animation].isAttacking = false
                        player.isAttacking = false
                    }
                }
            }
        }

        this.frameCount ++
    }
}