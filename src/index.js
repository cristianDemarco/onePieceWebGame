canvas = document.querySelector("canvas")
c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.2
const groundOffset = mapHeight(50)
const player = new Player ({
    position : {
        x : mapWidth(200),
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
        x : undefined,
        y : undefined
    },

    velocity : {
        x : 0,
        y : 0
    },
    character : "arlong"
})

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.drawImage(createImage("../assets/eniesLobbyGameSprite.png"), 0, 0, canvas.width, canvas.height)

    drawFightingHUD()

    enemy.update()
    player.update()

    checkIfKeysPressed()
}

animate()