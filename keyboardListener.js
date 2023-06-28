const keys = {
    "a" : {
        pressed : false
    },
    "d" : {
        pressed : false
    },
    "w" : {
        pressed : false,
    },
    "spacebar" : {
        pressed : false
    }
}

let lastKey
let canJump = true
let canAttack = true

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

        case " ":
            keys.spacebar.pressed = true
            //lastKey = " "
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

        case " ":
            keys.spacebar.pressed = false
            break
    }
})

function checkIfKeysPressed(){
    player.velocity.x = 0

    if(keys.a.pressed && lastKey === "a"){
        player.facingDirection = "left"
        player.velocity.x = -10
    }else if (keys.d.pressed && lastKey === "d"){
        player.facingDirection = "right"
        player.velocity.x = 10
    }else if (keys.w.pressed && lastKey === "w" && canJump){
        player.velocity.y = -15
        canJump = false
        setTimeout(() => canJump = true, 2000)
    } else if (keys.spacebar.pressed && canAttack){
        canAttack = false
        player.isAttacking = true

        setTimeout(() => canAttack = true, 1000)
            
        if(player.attackCollision()){
            enemy.health -= 10
        }
    }
}
