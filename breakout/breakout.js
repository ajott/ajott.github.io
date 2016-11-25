
var canvas=document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius=10;
var ballColor = "#0033FF";

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
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
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
var lives = 3;


function keyDownHandler(e){
	if(e.keyCode==39){
		
		rightPressed=true;
		
		}
		else if(e.keyCode==37){
		
		leftPressed=true;
		
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
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score ++;

                    if(score == brickColumnCount * brickRowCount){
                    	document.location.reload();
                    }

                }
            }
        }
    }
}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score,8,20)
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	collisionDetection();
	drawScore();
	drawLives();
 	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
			 if(y= y-paddleHeight){
            dy = -dy  ;
			 }
        }
        else {
            lives --
            if (!lives){
            	document.location.reload();
            } else {
            	x = canvas.width/2;
				y = canvas.height-30;
				dx = 3;
				dy = -3;
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

	requestAnimationFrame(draw);

}


document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width){
		paddleX = relativeX - paddleWidth / 2;
	}
}

draw();