function createImage(src){
    image = new Image()
    image.src = src

    return image
}

function mapWidth(num){
    return (canvas.width * num)/1846
}

function mapHeight(num){
    return (canvas.height * num)/948
}

function drawFightingHUD(){
    player.drawHUD()
    enemy.drawHUD()
}

Math.toRadians = function(degrees) {
    return degrees * Math.PI/180
  }