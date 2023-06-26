class Enemy {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 100
        this.attackBox = {
            position : this.position,
            width : this.width + 50,
            height : 50,
        },
        this.maxHealth = 1000,
        this.health = this.maxHealth
        this.canAttack = true
    }

    draw(){
        c.fillStyle = "blue"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //c.fillStyle = "green"
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        
    }

    drawHealthbar(){
        c.fillStyle = "black"
        c.fillRect(canvas.width - 100, 50, -750, 75)

        c.fillStyle = "green"
        c.fillRect(canvas.width - 110, 60, (-730 * this.health)/this.maxHealth, 55)
    }

    fightingAlgorithm(){
        let randomNumber = Math.random()
        if(player.attackCollision()){
            if(randomNumber < 0.1){
                this.velocity.y = -10

                if(player.facingDirection === "right") this.velocity.x = 2
                else this.velocity.x = -2

                setTimeout(() => {
                    this.velocity.x = 0
                    this.velocity.y = 0
                }, 2000)

            }else if (this.canAttack){
                player.health -= 10
                this.canAttack = false
                setTimeout(() => this.canAttack = true, 500)
            }
        }
    }

    update(){
        //this.fightingAlgorithm()

        if(this.position.x + this.velocity.x >= 0 &&
            this.position.x + this.velocity.x + this.width <= canvas.width){
                this.position.x += this.velocity.x
            }

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 100){
            this.velocity.y = 0
        } else this.velocity.y += gravity

        this.position.y = Math.round(this.position.y += this.velocity.y)
        

        this.draw()
    }
}