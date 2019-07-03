var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Player variable
var player = {
  health: 10,
  ammo: 25,
  x: 395, // Starting x coordinate
  y: 295, // Starting y coordinate
  vel: 5, // Player movespeed
  facing: "up", // Direction player is facing for purposes of spawning projectiles
  width: 11,
  height: 11,
  score: 15,
  level: 1,
  bulletDamage: 1, // Damage dealt to an enemy by player bullets
  shieldDefense: 0, // Damage reduction when an enemy strikes the player
  shieldDamage: 0, // Damage dealt to an enemy that strikes the player
  shieldKnockback: 25, // Multiplier for how far back an enemy is knocked when it strikes a player
  inLevel: false, // If true, level is drawn. If false, menu is drawn

  resetPos: function () {
    player.x = 395;
    player.y = 295;
  },

  // Player function to spawn a projectile
  spawnBullet: function () {
    let xvel = 0;
    let yvel = 0;
    let xpos = 0;
    let ypos = 0;

    if (player.facing == "up") {
      // If the player is facing up, the bullet is created in the upper-center of the player object and fired up
      yvel = -7;
      xvel = 0;
      xpos = player.x + (2);
      ypos = player.y;
    } else if (player.facing == "down") {
      // If the player is facing down, the bullet is created in the bottom-center of the player object and fired down
      yvel = 7;
      xvel = 0;
      xpos = player.x + (2);
      ypos = player.y + player.height;
    } else if (player.facing == "right") {
      // If the player is facing right, the bullet is created in the middle-right of the player object and fired right
      xvel = 7;
      yvel = 0;
      xpos = player.x + player.width;
      ypos = player.y + (2);
    } else if (player.facing == "left") {
      // If the player is facing left, the bullet is created in the middle-left of the player object and fired left
      xvel = -7;
      yvel = 0;
      xpos = player.x;
      ypos = player.y + (2);
    }

    bullets.push(Bullet({
      xVelocity: xvel,
      yVelocity: yvel,
      x: xpos,
      y: ypos
    }));
  },
  draw: function () {
    // Draw function for the player object
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

  }
}

// Level object
var level = {
  enemiesRemaining: 5 * player.level, // Determines how many enemies will spawn per level
  spawnTick: 150, // On which gameplay tick will the first enemy spawn?
  enemyMaxHealth: 1,

  spawnEnemy: function () {
    // Function to spawn an enemy object
    let edges = ["left", "top", "right", "bottom"];
    let spawnSide = edges[getRndInteger(0, 3)]; // Randomly chooses a map edge to spawn the enemy from
    let spawnX = 0;
    let spawnY = 25; // The white HUD bar is 25px tall

    if (spawnSide == "left") {
      spawnY = getRndInteger(25, canvas.height);

    } else if (spawnSide == "top") {
      spawnX = getRndInteger(0, canvas.width);

    } else if (spawnSide == "right") {
      spawnX = canvas.width;
      spawnY = getRndInteger(25, canvas.height);

    } else if (spawnSide == "bottom") {
      spawnX = getRndInteger(0, canvas.width);
      spawnY = canvas.height;
    }

    enemies.push(Enemy({
      x: spawnX,
      y: spawnY,
      maxHealth: level.enemyMaxHealth
    }));

    level.enemiesRemaining -= 1; // Decrements the enemy reserve

    bulletColor = bulletColors[Math.floor((Math.random() * bulletColors.length))] // Chooses a new color for the next enemy
  }
}

// Main draw function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the map

  // If the player is in a level, draw that level.
  if (player.inLevel) {
    drawBackground();
    player.draw();
    drawTopRect(); // Draws the white HUD bar
    drawAmmo(); // Draws the ammo count
    drawHealth(); // Draws the player health amount
    drawScore(); // Draws the player score/money
    drawEnemiesRemaining(); // Draws the enemy reserve
    drawLevel();
    collisionDetection(); // Runs collision detection logic


    if (rightPressed && player.x < canvas.width - player.width - 5) {
      // If the player is attempting to move right, and is not exceeding the 5px buffer on the right side, move them.
      player.x += player.vel;
      player.facing = "right";

    } else if (leftPressed && player.x > 5) {
      // If the player is moving left and is not exceeding the 5px buffer, move them.
      player.x -= player.vel;
      player.facing = "left";

    } else if (upPressed && player.y > 30) {
      // If the player is moving up, and is not exceeding the 5px buffer + 25px HUD bar, move them.
      player.y -= player.vel;
      player.facing = "up";

    } else if (downPressed && player.y < canvas.height - player.height - 5) {
      // If the player is moving down, and is not exceeding the 5px buffer, move them.
      player.y += player.vel;
      player.facing = "down";
    }

    bullets.forEach(function (bullet) { // Update each bullet
      bullet.update();
    });

    bullets = bullets.filter(function (bullet) { // Delete inactive bullets
      return bullet.active;
    });

    bullets.forEach(function (bullet) { // Draw all bullets (which will only be the active bullets after the filter)
      bullet.draw();
    })

    enemies.forEach(function (enemy) { // Updates each enemy
      enemy.update();
    });

    enemies = enemies.filter(function (enemy) { // Delete inactive enemies
      return enemy.active;
    });

    enemies.forEach(function (enemy) { // Draws all enemies
      enemy.draw();
    })

    if (level.enemiesRemaining > 0) { // Only bother tracking gameplay ticks if there are still enemies in reserve
      ticks++;
    }

    if (ticks >= level.spawnTick && level.enemiesRemaining > 0) { // If the gameplay tick exceeds the threshold,
      level.spawnEnemy() // Spawn an enemy
      level.spawnTick = Math.max((150 - 10 * player.level), 0) + getRndInteger(20, 50); // and determine the new threshold
      ticks = 0; // and reset the ticks
    }

    if (enemies.length == 0 && level.enemiesRemaining == 0) { // If there are no active enemies, and no reserves, the level is complete
      player.inLevel = false;
      player.resetPos();
      player.level++;
      player.score += 5;
      level.enemyMaxHealth = (1+ Math.floor(player.level/3));
      level.enemiesRemaining = 5 * player.level; // 5 enemies * the level number, per level
    }

    if (!gameOver) { // Obviously don't draw the next frame if the player lost
      requestAnimationFrame(draw); // Begins the loop anew
    }
  } else {
    drawBackground();
    drawTopRect();
    drawAmmo();
    drawLevel();
    drawScore();
    drawHealth();
    drawMenu();
    player.draw();
    menuCollision();

    if (rightPressed && player.x < canvas.width - player.width - 5) {
      // If the player is attempting to move right, and is not exceeding the 5px buffer on the right side, move them.
      player.x += player.vel;
      player.facing = "right";

    } else if (leftPressed && player.x > 5) {
      // If the player is moving left and is not exceeding the 5px buffer, move them.
      player.x -= player.vel;
      player.facing = "left";

    } else if (upPressed && player.y > 30) {
      // If the player is moving up, and is not exceeding the 5px buffer + 25px HUD bar, move them.
      player.y -= player.vel;
      player.facing = "up";

    } else if (downPressed && player.y < canvas.height - player.height - 5) {
      // If the player is moving down, and is not exceeding the 5px buffer, move them.
      player.y += player.vel;
      player.facing = "down";
    }

    requestAnimationFrame(draw);
  }
}
// End draw function


// Fills the map with a specified color
function drawBackground() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#CCCCCC";
  ctx.fill();
  ctx.closePath();
}

// Draws in the player ammo count
function drawAmmo() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Ammo: " + player.ammo, canvas.width - 130, 20);
}

// Draws in the player health
function drawHealth() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Health: " + player.health, 50, 20);
}

// Draws the top HUD bar
function drawTopRect() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, 25);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
}

// Functions that fire on keydown
function keyDownHandler(e) {
  if (e.keyCode == 39) { // Right arrow key
    rightPressed = true;
  } else if (e.keyCode == 37) { // Left arrow key
    leftPressed = true;
  } else if (e.keyCode == 38) { // Up arrow key
    upPressed = true;
  } else if (e.keyCode == 40) { // Down arrow key
    downPressed = true;
  } else if (e.keyCode == 32) { // Spacebar
    if (player.ammo > 0 && player.inLevel) {
      player.spawnBullet();
      player.ammo--;
    }
  } else if (e.keyCode == 82) { // "R" key
    reset();
  }
}

// Functions that fire on keyup
function keyUpHandler(e) {
  if (e.keyCode == 39) { // Right arrow key
    rightPressed = false;
  } else if (e.keyCode == 37) { // Left arrow key
    leftPressed = false;
  } else if (e.keyCode == 38) { // Up arrow key
    upPressed = false;
  } else if (e.keyCode == 40) { // Down arrow key
    downPressed = false;
  }
}


// 24 web-safe colors
var bulletColors = ["#00bfff", "#ff0080", "#00ffbf", "#80ff00", "#ff8000", "#4000ff", "#bf00ff", "#00ff80", "#8000ff", "#bfff00", "#ff00bf", "#ff4000", "#00ffff", "#00ff00", "#00ff40", "#0040ff", "#0000ff", "#ffff00", "#ff00ff", "#40ff00", "#ff0040", "#ffbf00", "#0080ff", "#ff0000"];

// Choose a random color to begin with
var bulletColor = bulletColors[Math.floor((Math.random() * bulletColors.length))];


var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var bulletSize = 4;

var ticks = 0;

var gameOver = false;

var bullets = [];
var enemies = [];


// Bullet constructor
function Bullet(I) {
  I.active = true;
  I.width = bulletSize;
  I.height = bulletSize;
  I.color = bulletColor;

  // Used to delete bullets that strike the border of the map
  I.inBounds = function () {
    return I.x >= 5 && I.x <= canvas.width - 5 &&
      I.y >= 30 && I.y <= canvas.height - 5;
  };

  // Draw function
  I.draw = function () {

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

  };

  I.update = function () {
    // Move the bullet by its velocities
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    // The bullet only remains active if it is in bounds
    I.active = I.active && I.inBounds();
  };

  return I;
}


// Enemy constructor
function Enemy(I) {
  I.active = true;
  I.width = 10;
  I.height = 10;
  I.health = I.maxHealth;
  I.color = bulletColor;
  I.speed = 2;
  I.lastXVel = 0;
  I.lastYVel = 0;

  // Draw function
  I.draw = function () {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
  }

  I.update = function () {
    // Targeting logic, which allows the enemies to track the player.
    // First, get the player position
    let targetX = player.x;
    let targetY = player.y;

    I.lastXVel = I.xVelocity;
    I.lastYVel = I.yVelocity;

    // Find the difference between where the enemy currently is, and where the player currently is
    let xDiff = targetX - I.x;
    let yDiff = targetY - I.y;

    // The distance (diff) between the player and the enemy is determined to be either positive or negative
    // by dividing itself by its absolute value. This determines whether the velocity needed to reach the player is
    // positive (towards the right or bottom) or negative (towards the left or top)

    if (xDiff == 0 && yDiff != 0) { // The enemy doesn't need to move in the x plane if it is already even with the player
      I.xVelocity = 0;
      I.yVelocity = I.speed * (yDiff / Math.abs(yDiff));

    } else if (xDiff != 0 && yDiff == 0) { // The enemy doesn't need to move in the y plane if it is already even with the player
      I.xVelocity = I.speed * (xDiff / Math.abs(xDiff));
      I.yVelocity = 0;

    } else if (xDiff != 0 && yDiff != 0) { // If the enemy is not even with the player in either plane, it moves diagonally
      // 1.414 is the square root of 2, which would be geometrically correct for this diagonal movement.
      // However, in practice, it feels like the enemies are moving faster in a diagonal than they do in a straight line, 
      // so I've used 1.3
      I.xVelocity = (I.speed / 1.3) * (xDiff / Math.abs(xDiff));
      I.yVelocity = (I.speed / 1.3) * (yDiff / Math.abs(yDiff));
    }

    I.x += I.xVelocity;
    I.y += I.yVelocity;

    // Enemies only remain active so long as they have health remaining.
    I.active = (I.active && I.health > 0);
  }

  return I;
}

var startX = (canvas.width / 2) - 75;
var startY = 50;
var menuCol1 = (canvas.width / 4) - 75;
var menuCol2 = (canvas.width / 4) * 3 - 75;
var menuRow1 = 150;
var menuRow2 = 250;
var menuRow3 = 350;

function drawMenu() {

  // Draw start button
  ctx.beginPath();
  ctx.rect(startX, startY, 150, 35);
  ctx.fillStyle = "lime";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "20px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Start", startX + 50, startY + 25);


  // Draw buy ammo button
  ctx.beginPath();
  ctx.rect(menuCol1, menuRow1, 150, 35);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Ammo: 5/$8", menuCol1 + 30, menuRow1 + 23);

  // Draw buy health button
  ctx.beginPath();
  ctx.rect(menuCol1, menuRow2, 150, 35);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Health: 5/$20", menuCol1 + 25, menuRow2 + 23);

  // Draw buy gun damage button
  ctx.beginPath();
  ctx.rect(menuCol1, menuRow3, 150, 35);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("GDmg +1: $50", menuCol1 + 20, menuRow3 + 23);

  // Draw buy shield damage button
  ctx.beginPath();
  ctx.rect(menuCol2, menuRow1, 150, 35);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("SDmg +1: $70", menuCol2 + 25, menuRow1 + 23);

  // Draw buy shield knockback button
  ctx.beginPath();
  ctx.rect(menuCol2, menuRow2, 150, 35);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Knockback +5: $50", menuCol2 + 6, menuRow2 + 23);

  // Draw buy shield defense button
  ctx.beginPath();
  ctx.rect(menuCol2, menuRow3, 150, 35);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("SDef +1: $70", menuCol2 + 25, menuRow3 + 23);

  // Draw left info panel
  ctx.beginPath();
  ctx.rect(0, canvas.height-100, 200, 100);
  ctx.fillStyle = "#EEEEEE";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Level: "+player.level, 15, canvas.height - 75);
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Enemies: "+level.enemiesRemaining, 15, canvas.height - 55);
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Enemy Health: "+level.enemyMaxHealth, 15, canvas.height - 35);
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Enemy Damage: "+player.level, 15, canvas.height - 15);


  // Draw right info panel
  ctx.beginPath();
  ctx.rect(canvas.width-200, canvas.height-100, 200, 100);
  ctx.fillStyle = "#EEEEEE";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Gun Damage: "+player.bulletDamage, canvas.width-185, canvas.height - 75);
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Shield Damage: "+player.shieldDamage, canvas.width-185, canvas.height - 55);
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Shield Defense: "+player.shieldDefense, canvas.width-185, canvas.height - 35);
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Shield Knockback: "+player.shieldKnockback, canvas.width-185, canvas.height - 15);
}


function collisionDetection() {
  bullets.forEach(function (bullet) { // Loop through each active bullet
    enemies.forEach(function (enemy) { // And each active enemy

      // If the bullet intersects an enemy (falls within any of the four corners of the enemy square)
      if (bullet.x > enemy.x && bullet.y > enemy.y && bullet.x < (enemy.x + enemy.width) && bullet.y < (enemy.y + enemy.height)) {
        enemy.health -= player.bulletDamage; // Decrease enemy health
        bullet.active = false; // and despawn the bullet
        // If the enemy is dead
        if (enemy.health <= 0) {
          enemy.active = false; // Despawn the enemy
          player.score += enemy.maxHealth + 1; // and increment the player score
        }
      }
    })
  })

  // Loop through each active enemy
  enemies.forEach(function (enemy) {

    // If any of the four corners of the enemy intersect the player's square
    if (enemy.active && (
        (enemy.x > player.x && enemy.y > player.y && enemy.x < (player.x + player.width) && enemy.y < (player.y + player.height)) ||
        (enemy.x + enemy.width > player.x && enemy.y > player.y && enemy.x + enemy.width < (player.x + player.width) && enemy.y < (player.y + player.height)) ||
        (enemy.x > player.x && enemy.y + enemy.height > player.y && enemy.x < (player.x + player.width) && enemy.y + enemy.height < (player.y + player.height)) ||
        (enemy.x + enemy.width > player.x && enemy.y + enemy.height > player.y && enemy.x + enemy.width < (player.x + player.width) && enemy.y + enemy.height < (player.y + player.height))
      )) {
      let dmg = (1 + Math.floor(player.level / 3) - player.shieldDefense) // Calculate the damage dealt by the enemy
      if (dmg > 0) {
        flashColor("red");
        player.health -= dmg; // Decrement the player health
      }

      enemy.x -= enemy.lastXVel * player.shieldKnockback; // Move the enemy back the way it came
      enemy.y -= enemy.lastYVel * player.shieldKnockback; // Move the enemy back the way it came

      enemy.health -= player.shieldDamage; // Decrease the enemy health by the player's shield damage

      if (enemy.health <= 0) {
        enemy.active = true; // and despawn the enemy if the player's shield did enough damage
      }

      // If the player's health reaches zero, it's GAME OVER, MAN!
      if (player.health <= 0) {
        gameOver = true;
      }
    }
  })


  if (gameOver) {
    drawGameOver();
  }
}

function menuCollision() {
  if (player.x > startX && player.x < startX + 150 && player.y > startY && player.y < startY + 35) {
    player.inLevel = true;
    player.resetPos();
  } else if (player.x > menuCol1 && player.x < menuCol1 + 150 && player.y > menuRow1 && player.y < menuRow1 + 35) {
    if (player.score >= 8) {
      player.score -= 8;
      player.ammo += 5;
      player.resetPos();
    }
  } else if (player.x > menuCol1 && player.x < menuCol1 + 150 && player.y > menuRow2 && player.y < menuRow2 + 35) {
    if (player.score >= 20) {
      player.score -= 20;
      player.health += 5;
      player.resetPos();
    }
  } else if (player.x > menuCol1 && player.x < menuCol1 + 150 && player.y > menuRow3 && player.y < menuRow3 + 35) {
    if (player.score >= 50) {
      player.score -= 50;
      player.bulletDamage += 1;
      player.resetPos();
    }
  } else if (player.x > menuCol2 && player.x < menuCol2 + 150 && player.y > menuRow1 && player.y < menuRow1 + 35) {
    if (player.score >= 70) {
      player.score -= 70;
      player.shieldDamage += 1;
      player.resetPos();
    }
  } else if (player.x > menuCol2 && player.x < menuCol2 + 150 && player.y > menuRow2 && player.y < menuRow2 + 35) {
    if (player.score >= 50) {
      player.score -= 50;
      player.shieldKnockback += 5;
      player.resetPos();
    }
  } else if (player.x > menuCol2 && player.x < menuCol2 + 150 && player.y > menuRow3 && player.y < menuRow3 + 35) {
    if (player.score >= 70) {
      player.score -= 70;
      player.shieldDefense += 1;
      player.resetPos();
    }
  }
}
player.x
// Draws the level number text
function drawLevel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Level: " + player.level, (canvas.width / 2) - 135, 20);
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("$" + player.score, 175, 20);
}

// Draws the enemy reserve text
function drawEnemiesRemaining() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Enemy Reserve: " + level.enemiesRemaining, (canvas.width / 2), 20);
}

// Draws the gameover screen
function drawGameOver() {
  player.draw();

  ctx.font = "24px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", (canvas.width / 2), canvas.height / 2 - 20);
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Press R to Restart", canvas.width / 2, (canvas.height / 2));
}

// When given a basic color as a string, flashes that color across the entire screen
function flashColor(color) {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fill();
}

// Resets the game
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  flashColor("black");

  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;

  player.health = 10;
  player.ammo = 25;
  player.level = 1;
  player.score = 15;
  player.shieldDamage = 0;
  player.shieldKnockback = 25;
  player.shieldDefense = 0;
  player.bulletDamage = 1;

  level.spawnTick = 150;
  level.enemiesRemaining = 5 * player.level;
  level.enemyMaxHealth = 1;

  ticks = 0;

  enemies = [];
  bullets = [];

  if (gameOver) {
    gameOver = false;
    draw();
    reset();
  }
}

draw();
