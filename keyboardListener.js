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
    "q" : {
        pressed : false
    },
    "e" : {
        pressed : false
    },
    "c" : {
        pressed : false
    }
}

let lastKey
let canJump = true

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
        player.velocity.y = -11.5
        canJump = false
        setTimeout(() => canJump = true, 2000)
        
    } else if (keys.q.pressed && player.moveset["ATTK1"].canAttack){
        player.moveset["ATTK1"].canAttack = false
        player.moveset["ATTK1"].isAttacking = true

        setTimeout(() => player.moveset["ATTK1"].canAttack = true, 2000)
            
        if(player.attackCollision()){
            enemy.health -= 10
        }
    } else if (keys.e.pressed && player.moveset["ATTK2"].canAttack){
        player.moveset["ATTK2"].canAttack = false
        player.moveset["ATTK2"].isAttacking = true

        setTimeout(() => player.moveset["ATTK2"].canAttack = true, 5000)
            
        if(player.attackCollision()){
            enemy.health -= 30
        }
    } else if (keys.c.pressed && player.moveset["ATTK3"].canAttack){
        player.moveset["ATTK3"].canAttack = false
        player.moveset["ATTK3"].isAttacking = true

        setTimeout(() => player.moveset["ATTK3"].canAttack = true, 10000)
            
        if(player.attackCollision()){
            enemy.health -= 70
        }
    }
}
