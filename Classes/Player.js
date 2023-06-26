class Player {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 100
        this.facingDirection = "right"
        this.attackBox = {
            position : this.position,
            width : this.width + 50,
            height : this.height ,
        },
        this.maxHealth = 250,
        this.health = this.maxHealth
        this.currentFrame = 0
        this.maxFrames = 0
        this.frameCount = 0
        this.frameRate = 10
    }

    draw(){
        //c.fillStyle = "blue"
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        if(this.velocity.x === 0 && this.velocity.y === 0){
            this.maxFrames = 6
            if(this.facingDirection === "right"){
                this.createAnimation("/home/cristian/VSCode/onePieceWebGame/assets/rufyStandingSpriteSheetRight.png",
                    this.currentFrame * 39 + 5, 0,
                    279/this.maxFrames -10, 55,
                    this.position.x, this.position.y,
                    50 * 2, 70 * 2
                )
            }else{
                this.createAnimation("/home/cristian/VSCode/onePieceWebGame/assets/rufyStandingSpriteSheetLeft.png", 
                    this.currentFrame * 39, 0,
                    279/this.maxFrames -10, 55,
                    this.position.x, this.position.y,
                    50 * 2, 70 * 2
                )
           }
        }

        //c.fillStyle = "green"

        //if(this.facingDirection === "right"){
        //    c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, 50)
        //}else{
        //    c.fillRect(this.attackBox.position.x + this.width, this.attackBox.position.y, -this.attackBox.width, 50)
        //}   
        
    }

    createAnimation(src, sx, sy, sW, sH, dx, dy, dWidth, dHeight){
        image = createImage(src)
        c.drawImage(image, sx, sy, sW, sH, dx, dy, dWidth, dHeight)

        if(this.frameCount % this.frameRate  === 0){

            if(this.currentFrame >= this.maxFrames){
                this.currentFrame = 0
            }

            this.currentFrame++
        }

        this.frameCount ++
    }

    attackCollision(){
        if(this.facingDirection === "right"){
            return (this.attackBox.position.x + this.attackBox.width >= enemy.position.x) &&
            this.attackBox.position.y >= enemy.position.y &&
            this.attackBox.position.y + this.attackBox.height <= enemy.position.y + enemy.height &&
            this.attackBox.position.x + this.attackBox.width <= enemy.position.x + enemy.width
        }else{
            return (this.attackBox.position.x + this.width - this.attackBox.width >= enemy.position.x) &&
            this.attackBox.position.y >= enemy.position.y &&
            this.attackBox.position.y + this.attackBox.height <= enemy.position.y + enemy.height &&
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

            this.maxFrames = 11
            if(this.facingDirection === "right"){
                this.createAnimation("/home/cristian/VSCode/onePieceWebGame/assets/rufyJumpSpriteSheetRight.png",
                this.currentFrame * 0, 0,
                451/this.maxFrames, 68,
                this.position.x, this.position.y,
                50 * 2, 70 * 2)
            }else{
                this.createAnimation("/home/cristian/VSCode/onePieceWebGame/assets/rufyJumpSpriteSheetLeft.png",
                this.currentFrame * 0, 0,
                451/this.maxFrames, 68,
                this.position.x, this.position.y,
                50 * 2, 70 * 2)
            }
        }

        this.draw()
    }
}
