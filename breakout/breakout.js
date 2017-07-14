
var ballColors = ["#0033FF","#800000","#808000","#800080","#808080"] // Blue, Maroon, Olive, Purple, Grey
var canvas=document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius=10;
var ballColor = ballColors[0];
var lastBallColor = 0;

var x=canvas.width/2;
var y=canvas.height-30;
var dx=3;
var dy=-3;
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed= false;
var leftPressed=false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickWidth = ((canvas.width - (brickOffsetLeft * 2)) - (brickPadding * (brickColumnCount-1)))/brickColumnCount

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}


var score = 0;
var gameScore = 0;
var lives = 3;
var level = 1;
var gameOver = false;
var ballPoints = {
    left : {x: 0, y: 0},
    top : {x: 0, y: 0},
    right : {x: 0, y: 0},
    bottom : {x: 0, y: 0}
}


function keyDownHandler(e){
	if(e.keyCode==39){
		
		rightPressed=true;
		
		}
		else if(e.keyCode==37){
		  leftPressed=true;
		}
		// else if(e.keyCode==69){
		// 	gameScore = (brickColumnCount * brickRowCount) -1
		// }
        else if (e.keyCode==82){
            location.reload()
        }
		
}
	
function keyUpHandler(e){
	
	if(e.keyCode==39){
		
		rightPressed=false;
	}
	else if(e.keyCode==37){
		
		leftPressed=false;
		
	} 
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,2*Math.PI);
	ctx.fillstyle=ballColor;
	ctx.fillStroke=ballColor;
	ctx.Stroke="10"
	ctx.fill();
	ctx.closePath();
}


function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillstyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}


function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = ballColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    if (y < canvas.height / 2){
    ballPoints.left.x = x-ballRadius;
    ballPoints.left.y = y;
    ballPoints.top.x = x;
    ballPoints.top.y = y-ballRadius;
    ballPoints.right.x = x+ballRadius;
    ballPoints.right.y = y;
    ballPoints.bottom.x = x;
    ballPoints.bottom.y = y+ballRadius;
    var vertColl = false;
    var horzColl = false;

    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if((ballPoints.left.x > b.x && ballPoints.left.x < b.x+brickWidth && ballPoints.left.y > b.y && ballPoints.left.y < b.y+brickHeight) ||
                   (ballPoints.right.x > b.x && ballPoints.right.x < b.x+brickWidth && ballPoints.right.y > b.y && ballPoints.right.y < b.y+brickHeight)){
                    horzColl = true;
                } else if ((ballPoints.top.x > b.x && ballPoints.top.x < b.x+brickWidth && ballPoints.top.y > b.y && ballPoints.top.y < b.y+brickHeight) ||
                            (ballPoints.bottom.x > b.x && ballPoints.bottom.x < b.x+brickWidth && ballPoints.bottom.y > b.y && ballPoints.bottom.y < b.y+brickHeight)) {
                    vertColl = true;
                }
                if((ballPoints.left.x > b.x && ballPoints.left.x < b.x+brickWidth && ballPoints.left.y > b.y && ballPoints.left.y < b.y+brickHeight) ||
                   (ballPoints.top.x > b.x && ballPoints.top.x < b.x+brickWidth && ballPoints.top.y > b.y && ballPoints.top.y < b.y+brickHeight) ||
                   (ballPoints.right.x > b.x && ballPoints.right.x < b.x+brickWidth && ballPoints.right.y > b.y && ballPoints.right.y < b.y+brickHeight) ||
                   (ballPoints.bottom.x > b.x && ballPoints.bottom.x < b.x+brickWidth && ballPoints.bottom.y > b.y && ballPoints.bottom.y < b.y+brickHeight)) {

                    if (vertColl){
                        dy = -dy;
                    } else if (horzColl){
                        dx = -dx;
                    }
                    b.status = 0;
                    score ++;
                    gameScore ++;

                    if(gameScore == brickColumnCount * brickRowCount){ // Win condition
                    	gameScore = 0;
                        flashColor("black");
                        drawBricks();
                        drawBall();
                        drawPaddle();
                        collisionDetection();
                        drawScore();
                        drawLives();
                        drawLevel();
                        if (level % 3 == 0){
                            brickColumnCount += 1;
                            brickWidth = ((canvas.width - (brickOffsetLeft * 2)) - (brickPadding * (brickColumnCount-1)))/brickColumnCount
                        }
                       
                    	paddleWidth -= 1.5;
                    	lives += 1;
                    	level += 1;
                    	dy *= 1.05;
                    	dx *= 1.05;
                    	bricks = [];
                    	for(c=0; c<brickColumnCount; c++) {
                    	    bricks[c] = [];
                    	    for(r=0; r<brickRowCount; r++) {
                    	         bricks[c][r] = { x: 0, y: 0, status: 1 };
                    	    }
                    	}

                    	
                    	if (lastBallColor == 4){
                    		lastBallColor = 0;
                    	} else {
                    		lastBallColor += 1;
                    	}
                    	ballColor = ballColors[lastBallColor]


    	            	x = canvas.width/2;
    					y = canvas.height-30;
    					if (dy > 0){
    						dy = -dy;
    					}
    					paddleX = (canvas.width-paddleWidth)/2;
                    }

                }
            }
        }
    }
}
}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = ballColor;
	ctx.fillText("Score: "+score,8,20)
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = ballColor;
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawLevel() {
	ctx.font = "16px Arial";
    ctx.fillStyle = ballColor;
    ctx.fillText("Level: "+level, (canvas.width/2)-30, 20);
}

function drawGameOver() {
    ctx.font = "24px Arial";
    ctx.fillStyle = ballColor;
    ctx.textAlign="center"
    ctx.fillText("Game Over", (canvas.width/2), canvas.height/2-20)
    ctx.font = "16px Arial";
    ctx.textAlign="center"
    ctx.fillText("Press R to Restart",canvas.width/2,(canvas.height/2));
}

function flashColor(color){
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fill();
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	collisionDetection();
	drawScore();
	drawLives();
	drawLevel();
 	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius-(paddleHeight/2)) {
        if(x > paddleX && x < paddleX + paddleWidth) {
			 if(y = y-paddleHeight){
                dy = -dy  ;
			 }
        }
        else {
            lives --
            if (!lives){
                ctx.clearRect(0,0,canvas.width,canvas.height);
                drawGameOver();
                gameOver = true;
            } else {
                flashColor("red");
            	x = canvas.width/2;
				y = canvas.height-30;
				dx = Math.abs(dx)
				dy = -dy
				paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

	if(rightPressed && paddleX<canvas.width-paddleWidth){
		paddleX+=7;
	}

	 else if(leftPressed && paddleX>0 ){
		 paddleX-=7;
		 
		 }
		 
		 x=x+dx;
	     y=y+dy;
    if(!gameOver){
        requestAnimationFrame(draw);    
    }
	

}


document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width){
		paddleX = relativeX - paddleWidth / 2;
	}
}

function verifyNewColor(tempColor){
	if (tempColor == lastBallColor){
		tempColor = Math.floor(Math.random()*5);
		verifyNewColor();
	} else {
		lastBallColor = tempColor;
		ballColor = ballColors[tempColor];
	}
}

draw();