canvas = document.querySelector("canvas")
c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.2
const player = new Player ({
    position : {
        x : 200,
        y : canvas.height-300
    },

    velocity : {
        x : 0,
        y : 0
    },
    "character" : "rufy"
})

const enemy = new Enemy ({
    position : {
        x : 500,
        y : canvas.height - 300
    },

    velocity : {
        x : 0,
        y : 0
    }
})

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.drawImage(createImage("./assets/eniesLobbyGameSprite.png"), 0, 0)

    player.drawHealthbar()
    enemy.drawHealthbar()

    player.update()
    enemy.update()

    checkIfKeysPressed()

    console.log(player.position.y, enemy.position.y)
    //console.log(player.attackBox.width)
}

animate()