class Fighter {

    constructor(position, velocity, character, scale = 3){
        this.position = position
        this.velocity = velocity
        this.character = character
        this.scale = scale
        this.width = charactersData[this.character]["spriteSheets"]["standing"]["spriteSheet"][0]["w"] * this.scale
        this.height = charactersData[this.character]["spriteSheets"]["standing"]["spriteSheet"][0]["h"] * this.scale
        
        this.position.y = canvas.height - groundOffset - this.height

        this.facingDirection = null
        
        this.maxHealth = null
        this.health = this.maxHealth

        this.moveset = {}

        for (let i = 1; i <= 4; i++){
            this.moveset[`ATTK${i}`] = { 
                isAttacking : false,
                canAttack : true
            } 
        }
    }

    draw(){
    }

    drawHealthBar(){
    }

    update(){
    }
}
