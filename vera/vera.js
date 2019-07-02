var ballColors = ["#00bfff", "#ff0080", "#00ffbf", "#80ff00", "#ff8000", "#4000ff", "#bf00ff", "#00ff80", "#8000ff", "#bfff00", "#ff00bf", "#ff4000", "#00ffff", "#00ff00", "#00ff40", "#0040ff", "#0000ff", "#ffff00", "#ff00ff", "#40ff00", "#ff0040", "#ffbf00", "#0080ff", "#ff0000"
];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballColor = ballColors[Math.floor((Math.random() * ballColors.length))];
var lastBallColor = 0;

var dx = 0;
var dy = 0;
var paddleHeight = 15;
var paddleWidth = 30;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickWidth = ((canvas.width - (brickOffsetLeft * 2)) - (brickPadding * (brickColumnCount - 1))) / brickColumnCount;

var brickDX = 0.25;

var score = 0;
var gameScore = 0;
var shots = 5;
var level = 1;
var gameOver = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var balls = [];

function Ball(I) {
  I.active = true;

  I.xVelocity = 0;
  I.yVelocity = -7;
  I.width = 4;
  I.height = 4;
  I.color = ballColor;

  I.inBounds = function () {
    return I.x >= 0 && I.x <= canvas.width &&
      I.y >= 0 && I.y <= canvas.height;
  };

  I.draw = function () {

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillstyle = ballColor;
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



var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
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
      spawnBall();
      shots--;
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


function drawPaddle() {
  ctx.fillstyle = "#0095DD";
  ctx.beginPath();
  ctx.moveTo(paddleX,canvas.height);
  ctx.lineTo(paddleX,canvas.height-(paddleHeight-5));
  ctx.lineTo(paddleX+(paddleWidth/2),canvas.height-paddleHeight);
  ctx.lineTo(paddleX+paddleWidth,canvas.height-(paddleHeight-5));
  ctx.lineTo(paddleX+paddleWidth,canvas.height)
  ctx.closePath();
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Score: " + score, 50, 20);
}

function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
      var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      if (bricks[c][r].status == 1) {
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = ballColor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function findLeftmostActiveBrick() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        return c;
      }
    }
  }
}

function findRightmostActiveBrick() {
  for (c = brickColumnCount - 1; c >= 0; c--) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        return c;
      }
    }
  }
}

function findBottommostActiveBrick() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = brickRowCount - 1; r >= 0; r--) {
      if (bricks[c][r].status == 1) {
        return [c, r];
      }
    }
  }
}

function collisionDetection() {
  balls.forEach(function (ball) {

    for (c = 0; c < brickColumnCount; c++) {
      for (r = 0; r < brickRowCount; r++) {
        var b = bricks[c][r];
        if (b.status == 1) {
          if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
            ball.active = false;
            b.status = 0;
            score++;
            gameScore++;
            shots++;

            if (gameScore == brickColumnCount * brickRowCount) { // Win condition
              gameScore = 0;
              
              balls = balls.filter(function (ball) {
                return ball.active;
              });

              balls.forEach(function(ball){
                shots ++;
                ball.active = false;
              })
              flashColor("black");
              drawBricks();
              drawPaddle();
              collisionDetection();
              drawshots();
              drawLevel();
              if (level % 3 == 0) {
                brickColumnCount += 1;
                shots += 1;
                brickWidth = ((canvas.width - (30 * 2)) - (brickPadding * (brickColumnCount - 1))) / brickColumnCount;
              }

              if (level % 5 == 0){
                brickRowCount += 1;
              }

              level += 1;
              bricks = [];
              for (c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (r = 0; r < brickRowCount; r++) {
                  bricks[c][r] = {
                    x: 0,
                    y: 0,
                    status: 1
                  };
                }
              }

              brickDX = 0.25 + (0.10 * (level - 1));
              brickOffsetTop = 30;
              brickOffsetLeft = 30;

              let newColor = Math.floor((Math.random() * ballColors.length))

              ballColor = ballColors[newColor];


              paddleX = (canvas.width - paddleWidth) / 2;
            }

          }
        }
      }
    }
  })

  try {
    if (bricks[findBottommostActiveBrick()[0]][findBottommostActiveBrick()[1]].y + brickHeight + paddleHeight >= canvas.height) {
      gameOver = true;
    }
  } catch {

  }

  if (balls.length == 0 && shots == 0 && gameScore != (brickColumnCount * brickRowCount)) {
    gameOver = true;
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

function checkBrickCollision() {
  let leftBrick = bricks[findLeftmostActiveBrick()][0]
  let rightBrick = bricks[findRightmostActiveBrick()][0]



  if (rightBrick.x + brickWidth >= canvas.width) {
    return 1;
  } else if (leftBrick.x <= 0) {
    return -1;
  } else {
    return 0;
  }
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  collisionDetection();
  drawshots();
  drawLevel();
  drawScore();

  if (checkBrickCollision() == 1) {
    brickOffsetTop += brickHeight / 2;
    brickDX *= -1;
  } else if (checkBrickCollision() == -1) {
    brickOffsetTop += brickHeight / 2;
    brickDX = Math.abs(brickDX);
  };

  brickOffsetLeft += brickDX;


  balls.forEach(function (ball) {
    ball.update();
  });

  balls = balls.filter(function (ball) {
    return ball.active;
  });

  balls.forEach(function (ball) {
    ball.draw();
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

function spawnBall() {
  balls.push(Ball({
    x: paddleX + (paddleWidth / 2) - 2,
    y: canvas.height - paddleHeight
  }));
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
    spawnBall();
    shots--;
  }
}


function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ballColor = ballColors[0];
  lastBallColor = 0;

  brickDX = 0.25;

  paddleX = (canvas.width - paddleWidth) / 2;
  rightPressed = false;
  leftPressed = false;
  brickRowCount = 3;
  brickColumnCount = 5;
  brickHeight = 20;
  brickPadding = 10;
  brickOffsetTop = 30;
  brickOffsetLeft = 30;
  brickWidth = ((canvas.width - (brickOffsetLeft * 2)) - (brickPadding * (brickColumnCount - 1))) / brickColumnCount;

  score = 0;
  gameScore = 0;
  shots = 5;
  level = 1;
  drawshots();
  drawLevel();

  for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
      bricks[c][r] = {
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
