canvas = document.querySelector("canvas")
c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

fetch("./assets/rufySpriteSheet.json")
  .then(response => response.json())
  .then(json => {
    // Utilizza l'oggetto JSON come desideri
    console.log(json)
  })
  .catch(err => console.error(err));

const gravity = 0.2
const player = new Player ({
    position : {
        x : 200,
        y : canvas.height-200
    },

    velocity : {
        x : 0,
        y : 0
    }
})

const enemy = new Enemy ({
    position : {
        x : 500,
        y : canvas.height - 200
    },

    velocity : {
        x : 0,
        y : 0
    }
})

function createImage(src){
    image = new Image
    image.src = src

    return image
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.drawImage(createImage("./assets/eniesLobbyGameSprite.png"), 0, 0)

    player.drawHealthbar()
    enemy.drawHealthbar()

    player.update()
    enemy.update()

    checkIfKeysPressed()

    console.log(enemy.position.y)
}

animate()