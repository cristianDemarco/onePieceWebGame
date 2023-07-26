canvas = document.querySelector("canvas")
c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.2
const groundOffset = 50
const player = new Player ({
    position : {
        x : 200,
        y : undefined
    },

    velocity : {
        x : 0,
        y : 0
    },
    character : "rufy"
})

const enemy = new Enemy ({
    position : {
        x : 1400,
        y : undefined
    },

    velocity : {
        x : 0,
        y : 0
    },
    character : "arlong",
    scale : 3
})

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.drawImage(createImage("../assets/eniesLobbyGameSprite.png"), 0, 0)

    player.update()
    enemy.update()

    checkIfKeysPressed()
}

animate()