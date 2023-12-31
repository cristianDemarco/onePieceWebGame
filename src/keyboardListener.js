const keys = {
    "a" : {
        pressed : false
    },
    "d" : {
        pressed : false
    },
    "w" : {
        pressed : false
    },
    "q" : {
        pressed : false
    },
    "e" : {
        pressed : false
    },
    "c" : {
        pressed : false
    },
    "x" : {
        pressed : false
    }
}

let lastKey

addEventListener("keydown", (event) => {
    switch(event.key){
        case "a":
            keys.a.pressed = true
            lastKey = "a"
            break

        case "d":
            keys.d.pressed = true
            lastKey = "d"
            break

        case "w":
            keys.w.pressed = true
            lastKey = "w"
            break

        case "q":
            keys.q.pressed = true
            lastKey = "q"
            break

        case "e":
            keys.e.pressed = true
            lastKey = "e"
            break
        
        case "c":
            keys.c.pressed = true
            lastKey = "c"
            break
        
        case "x":
            keys.x.pressed = true
            lastKey = "x"
            break
}
})

addEventListener("keyup", (event) => {
    switch(event.key){
        case "a":
            keys.a.pressed = false
            break

        case "d":
            keys.d.pressed = false
            break

        case "w":
            keys.w.pressed = false
            break

        case "q":
            keys.q.pressed = false
            break

        case "e":
            keys.e.pressed = false
            break

        case "c":
            keys.c.pressed = false
            break

        case "x":
            keys.x.pressed = false
            break
    }
})

function checkIfKeysPressed(){
    player.velocity.x = 0
    player.resetAttacks()

    if(keys.a.pressed && lastKey === "a"){
        player.facingDirection = "left"
        player.velocity.x = -mapWidth(10)
    }else if (keys.d.pressed && lastKey === "d"){
        player.facingDirection = "right"
        player.velocity.x = mapWidth(10)
    }else if (keys.w.pressed && lastKey === "w" && player.canJump){
        player.velocity.y = mapHeight(-11.5)
        player.canJump = false
        setTimeout(() => player.canJump = true, 2000)
        
    } else if (keys.q.pressed && player.moveset["ATTK1"].canAttack){
        player.moveset["ATTK1"].canAttack = false
        player.moveset["ATTK1"].isAttacking = true

    } else if (keys.e.pressed && player.moveset["ATTK2"].canAttack){
        player.moveset["ATTK2"].canAttack = false
        player.moveset["ATTK2"].isAttacking = true

    } else if (keys.c.pressed && player.moveset["ATTK3"].canAttack){
        player.moveset["ATTK3"].canAttack = false
        player.moveset["ATTK3"].isAttacking = true

    } else if (keys.x.pressed && player.moveset["ATTK4"].canAttack){
        player.moveset["ATTK4"].canAttack = false
        player.moveset["ATTK4"].isAttacking = true
    }
}
