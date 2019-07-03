var bulletColors = ["#00bfff", "#ff0080", "#00ffbf", "#80ff00", "#ff8000", "#4000ff", "#bf00ff", "#00ff80", "#8000ff", "#bfff00", "#ff00bf", "#ff4000", "#00ffff", "#00ff00", "#00ff40", "#0040ff", "#0000ff", "#ffff00", "#ff00ff", "#40ff00", "#ff0040", "#ffbf00", "#0080ff", "#ff0000"];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bulletColor = bulletColors[Math.floor((Math.random() * bulletColors.length))];
var lastBulletColor = 0;

var dx = 0;
var dy = 0;
var paddleHeight = 15;
var paddleWidth = 30;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var targetRowCount = 3;
var targetColumnCount = 5;
var targetHeight = 20;
var targetPadding = 10;
var targetOffsetTop = 30;
var targetOffsetLeft = 30;
var bulletSize = 4;
var targetWidth = ((canvas.width - (targetOffsetLeft * 2)) - (targetPadding * (targetColumnCount - 1))) / targetColumnCount;

var targetDX = 0.25;

var ticks = 0;

var score = 0;
var gameScore = 0;
var shots = 3;
var level = 1;
var gameOver = false;
var useAmmo = true;
var multishot = false;
var homing = false;

var powerupX = Math.floor((Math.random() * (canvas.width - 40)) + 10);
var powerupY = Math.floor((Math.random() * (canvas.height - 150)) + 50);
var powerupAppear = true;
var powerupActive = false;
var powerupTypes = ["infinite", "ammo", "multishot", "big", "homing"];
var powerupType = powerupTypes[Math.floor((Math.random() * 5))];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var bullets = [];

function Bullet(I) {
  I.active = true;
  I.yVelocity = -7;
  I.width = bulletSize;
  I.height = bulletSize;
  I.color = bulletColor;

  I.inBounds = function () {
    return I.x >= 0 && I.x <= canvas.width &&
      I.y >= 0 && I.y <= canvas.height;
  };

  I.draw = function () {

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

  };

  I.update = function () {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.active = I.active && I.inBounds();
  };

  return I;
}

var missiles = [];

function Missile(I) {
  I.active = true;
  I.width = bulletSize;
  I.height = bulletSize * 1.5;
  I.color = "#FF0000";  
  I.targetX = targets[findBottommostActiveTarget()[0]][findBottommostActiveTarget()[1]].x + (targetWidth / 2);
  I.targetY = targets[findBottommostActiveTarget()[0]][findBottommostActiveTarget()[1]].y + (targetHeight / 2);

  I.xVelocity = (I.targetX - I.x) / 20;
  I.yVelocity = (I.targetY - I.y) / 20;

  I.inBounds = function () {
    return I.x >= 0 && I.x <= canvas.width &&
      I.y >= 0 && I.y <= canvas.height;
  };

  I.draw = function () {

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

  };

  I.update = function () {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.active = I.active && I.inBounds();
  };

  return I;
}



var targets = [];
for (c = 0; c < targetColumnCount; c++) {
  targets[c] = [];
  for (r = 0; r < targetRowCount; r++) {
    targets[c][r] = {
      x: 0,
      y: 0,
      status: 1
    };
  }
}


function keyDownHandler(e) {
  if (e.keyCode == 39) {

    rightPressed = true;

  } else if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 82) {
    reset();
  } else if (e.keyCode == 32) {
    if (shots > 0) {
      spawnBullet();
      if (useAmmo) {
        shots--;
      }
    }
  }

}

function keyUpHandler(e) {

  if (e.keyCode == 39) {

    rightPressed = false;
  } else if (e.keyCode == 37) {

    leftPressed = false;

  }
}


function drawShip() {
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.moveTo(paddleX, canvas.height);
  ctx.lineTo(paddleX, canvas.height - (paddleHeight - 5));
  ctx.lineTo(paddleX + (paddleWidth / 2), canvas.height - paddleHeight);
  ctx.lineTo(paddleX + paddleWidth, canvas.height - (paddleHeight - 5));
  ctx.lineTo(paddleX + paddleWidth, canvas.height)
  ctx.closePath();
  ctx.fill();
  ctx.closePath();
}

function drawPowerup() {
  ctx.beginPath();
  ctx.rect(powerupX, powerupY, 30, 30);
  ctx.fillStyle = "#000000";
  ctx.stroke();
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
}

function drawPowerupText() {
  ctx.font = "20px Monospace";
  ctx.fillStyle = "#000000";
  ctx.fillText(powerupType[0].toUpperCase(),powerupX+9, powerupY+20);
}

function drawPowerupEffect() {
  if (multishot) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("*multishot*",180,20)
  } else if (!useAmmo){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("*infinite ammo*",130,20)
  } else if (bulletSize > 4) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("*big bullets*",130,20)
  } else if (homing) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("*missiles*",130,20)
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Score: " + score, 50, 20);
}

function drawTargets() {
  for (c = 0; c < targetColumnCount; c++) {
    for (r = 0; r < targetRowCount; r++) {
      var targetX = (c * (targetWidth + targetPadding)) + targetOffsetLeft;
      var targetY = (r * (targetHeight + targetPadding)) + targetOffsetTop;
      targets[c][r].x = targetX;
      targets[c][r].y = targetY;
      if (targets[c][r].status == 1) {
        ctx.beginPath();
        ctx.rect(targetX, targetY, targetWidth, targetHeight);
        ctx.fillStyle = bulletColor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function findLeftmostActiveTarget() {
  for (c = 0; c < targetColumnCount; c++) {
    for (r = 0; r < targetRowCount; r++) {
      if (targets[c][r].status == 1) {
        return c;
      }
    }
  }
}

function findRightmostActiveTarget() {
  for (c = targetColumnCount - 1; c >= 0; c--) {
    for (r = 0; r < targetRowCount; r++) {
      if (targets[c][r].status == 1) {
        return c;
      }
    }
  }
}

function findBottommostActiveTarget() {
  for (r = targetRowCount - 1; r >= 0; r--) {
  for (c = 0; c < targetColumnCount; c++) {    
      if (targets[c][r].status == 1) {
        return [c, r];
      }
    }
  }
}

function collisionDetection() {
  missiles.forEach(function (missile) {

    if (missile.x > powerupX && missile.x < powerupX + 30 && missile.y > powerupY && missile.y < powerupY + 30 && powerupAppear) {
      missile.active = false;
      shots++;
      powerupAppear = false;
      if (powerupType == "ammo") {
        shots += 3;
      } else if (powerupType == "infinite") {
        useAmmo = false;
      } else if (powerupType == "multishot") {
        multishot = true;
      } else if (powerupType == "big"){
        missileSize = 10;
      }
      powerupType = powerupTypes[Math.floor((Math.random() * 5))];
      powerupX = Math.floor((Math.random() * (canvas.width - 40)) + 10);
      powerupY = Math.floor((Math.random() * (canvas.height - 150)) + 50);
      ticks = 0;
    }

    for (c = 0; c < targetColumnCount; c++) {
      for (r = 0; r < targetRowCount; r++) {
        var b = targets[c][r];
        if (b.status == 1) {
          if (missile.x > b.x && missile.x < b.x + targetWidth && missile.y > b.y && missile.y < b.y + targetHeight) {
            missile.active = false;
            b.status = 0;
            score++;
            gameScore++;
            if (useAmmo){
              shots++;
            }            

            if (gameScore == targetColumnCount * targetRowCount) { // Win condition
              gameScore = 0;

              missiles.forEach(function(missile) {
                missile.active = false;
              })

              missiles = missiles.filter(function (missile) {
                return missile.active;
              });


              flashColor("black");
              drawTargets();
              drawShip();
              collisionDetection();
              drawshots();
              drawLevel();
              if (level % 3 == 0) {
                targetColumnCount += 1;
                targetWidth = ((canvas.width - (30 * 2)) - (targetPadding * (targetColumnCount - 1))) / targetColumnCount;
              }

              if (level % 5 == 0) {
                targetRowCount += 1;
              }

              shots = Math.min(shots, 3 + (Math.floor(level / 3)));
              shots += 1;

              useAmmo = true;
              multishot = false;
              homing = false;
              missileSize = 4;

              level += 1;
              targets = [];
              for (c = 0; c < targetColumnCount; c++) {
                targets[c] = [];
                for (r = 0; r < targetRowCount; r++) {
                  targets[c][r] = {
                    x: 0,
                    y: 0,
                    status: 1
                  };
                }
              }

              targetDX = 0.25 + (0.10 * (level - 1));
              targetOffsetTop = 30;
              targetOffsetLeft = 30;

              let newColor = Math.floor((Math.random() * bulletColors.length))

              missileColor = bulletColors[newColor];


              paddleX = (canvas.width - paddleWidth) / 2;
            }

          }
        }
      }
    }
  })
  
  bullets.forEach(function (bullet) {

    if (bullet.x > powerupX && bullet.x < powerupX + 30 && bullet.y > powerupY && bullet.y < powerupY + 30 && powerupAppear) {
      bullet.active = false;
      shots++;
      powerupAppear = false;
      if (powerupType == "ammo") {
        shots += 3;
      } else if (powerupType == "infinite") {
        useAmmo = false;
      } else if (powerupType == "multishot") {
        multishot = true;
      } else if (powerupType == "big"){
        bulletSize = 10;
      } else if (powerupType == "homing"){
        homing = true;
      }
      powerupType = powerupTypes[Math.floor((Math.random() * 5))];
      powerupX = Math.floor((Math.random() * (canvas.width - 40)) + 10);
      powerupY = Math.floor((Math.random() * (canvas.height - 150)) + 50);
      ticks = 0;
    }

    for (c = 0; c < targetColumnCount; c++) {
      for (r = 0; r < targetRowCount; r++) {
        var b = targets[c][r];
        if (b.status == 1) {
          if (bullet.x > b.x && bullet.x < b.x + targetWidth && bullet.y > b.y && bullet.y < b.y + targetHeight) {
            bullet.active = false;
            b.status = 0;
            score++;
            gameScore++;
            if (useAmmo){
              shots++;
            }            

            if (gameScore == targetColumnCount * targetRowCount) { // Win condition
              gameScore = 0;

              bullets.forEach(function(bullet) {
                bullet.active = false;
              })

              bullets = bullets.filter(function (bullet) {
                return bullet.active;
              });


              flashColor("black");
              drawTargets();
              drawShip();
              collisionDetection();
              drawshots();
              drawLevel();
              if (level % 3 == 0) {
                targetColumnCount += 1;
                targetWidth = ((canvas.width - (30 * 2)) - (targetPadding * (targetColumnCount - 1))) / targetColumnCount;
              }

              if (level % 5 == 0) {
                targetRowCount += 1;
              }

              shots = Math.min(shots, 3 + (Math.floor(level / 3)));
              shots += 1;

              useAmmo = true;
              multishot = false;
              homing = false;
              bulletSize = 4;

              level += 1;
              targets = [];
              for (c = 0; c < targetColumnCount; c++) {
                targets[c] = [];
                for (r = 0; r < targetRowCount; r++) {
                  targets[c][r] = {
                    x: 0,
                    y: 0,
                    status: 1
                  };
                }
              }

              targetDX = 0.25 + (0.10 * (level - 1));
              targetOffsetTop = 30;
              targetOffsetLeft = 30;

              let newColor = Math.floor((Math.random() * bulletColors.length))

              bulletColor = bulletColors[newColor];


              paddleX = (canvas.width - paddleWidth) / 2;
            }

          }
        }
      }
    }
  })

  try {
    if (targets[findBottommostActiveTarget()[0]][findBottommostActiveTarget()[1]].y + targetHeight + paddleHeight >= canvas.height) {
      gameOver = true;
    }
  } catch {

  }

  if (gameOver) {
    drawGameOver();
  }
}


function drawshots() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Ammo: " + shots, canvas.width - 110, 20);
}

function drawLevel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Level: " + level, (canvas.width / 2) - 20, 20);
}

function drawGameOver() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "#FF0000";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", (canvas.width / 2), canvas.height / 2 - 20);
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Press R to Restart", canvas.width / 2, (canvas.height / 2));
}

function flashColor(color) {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fill();
}

function checkTargetCollision() {
  let leftTarget = targets[findLeftmostActiveTarget()][0]
  let rightTarget = targets[findRightmostActiveTarget()][0]



  if (rightTarget.x + targetWidth >= canvas.width) {
    return 1;
  } else if (leftTarget.x <= 0) {
    return -1;
  } else {
    return 0;
  }
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTargets();
  drawShip();
  collisionDetection();
  drawshots();
  drawLevel();
  drawScore();
  drawPowerupEffect();

  if (checkTargetCollision() == 1) {
    targetOffsetTop += targetHeight / 2;
    targetDX *= -1;
  } else if (checkTargetCollision() == -1) {
    targetOffsetTop += targetHeight / 2;
    targetDX = Math.abs(targetDX);
  };

  targetOffsetLeft += targetDX;

  ticks++;
  

  if (ticks >= 100 && powerupAppear) {
    drawPowerup();
    drawPowerupText();
  }
  if (ticks >= 200 && !powerupAppear){
    useAmmo = true;
    multishot = false;
    homing = false;
    bulletSize = 4;
  } 
  if (ticks >= 1000 && !powerupAppear) {
    powerupAppear = true;
    ticks = 0;
  }

  bullets.forEach(function (bullet) {
    bullet.update();
  });

  bullets = bullets.filter(function (bullet) {
    return bullet.active;
  });

  bullets.forEach(function (bullet) {
    bullet.draw();
  })


  missiles.forEach(function(missile) {
    missile.update();
  })

  missiles = missiles.filter(function(missile) {
    return missile.active;
  })

  missiles.forEach(function(missile) {
    missile.draw();
  })

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;

  }

  if (!gameOver) {
    requestAnimationFrame(draw);
  }


}

function spawnBullet() {
  if (multishot) {
    bullets.push(Bullet({
      xVelocity: -2,
      x: paddleX + (paddleWidth / 2) - 2,
      y: canvas.height - paddleHeight
    }));
    bullets.push(Bullet({
      xVelocity: 0,
      x: paddleX + (paddleWidth / 2) - 2,
      y: canvas.height - paddleHeight
    }));
    bullets.push(Bullet({
      xVelocity: 2,
      x: paddleX + (paddleWidth / 2) - 2,
      y: canvas.height - paddleHeight
    }));
  } else {
    bullets.push(Bullet({
      xVelocity: 0,
      x: paddleX + (paddleWidth / 2) - 2,
      y: canvas.height - paddleHeight
    }));
  }
}

function spawnMissile() {
  missiles.push(Missile({
    x: paddleX + (paddleWidth / 2) - 2,
    y: canvas.height - paddleHeight
  }))
}


document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

document.addEventListener("click", mouseClickHandler, false);

function mouseClickHandler(e) {
  if (shots > 0) {
    if (!homing){
      spawnBullet();
    } else {
      spawnMissile();
    }
    
    if (useAmmo) {
      shots--;
    }
  }
}


function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bulletColor = bulletColors[0];
  lastBulletColor = 0;

  targetDX = 0.25;

  paddleX = (canvas.width - paddleWidth) / 2;
  rightPressed = false;
  leftPressed = false;
  targetRowCount = 3;
  targetColumnCount = 5;
  targetHeight = 20;
  targetPadding = 10;
  targetOffsetTop = 30;
  targetOffsetLeft = 30;
  targetWidth = ((canvas.width - (targetOffsetLeft * 2)) - (targetPadding * (targetColumnCount - 1))) / targetColumnCount;

  useAmmo = true;
  multishot = false;
  homing = false;
  bulletSize = 4;

  score = 0;
  gameScore = 0;
  shots = 3;
  level = 1;
  drawshots();
  drawLevel();

  for (c = 0; c < targetColumnCount; c++) {
    targets[c] = [];
    for (r = 0; r < targetRowCount; r++) {
      targets[c][r] = {
        x: 0,
        y: 0,
        status: 1
      };
    }
  }
  if (gameOver) {
    gameOver = false;
    draw();
    reset();
  }
}

draw();
