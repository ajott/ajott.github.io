var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("click", mouseClickHandler, false);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var keys = [];
var powerupTypes = ["Ammo", "Health", "$", "TimeFreeze", "InfiniteAmmo", "Bomb"];
var powerup = powerupTypes[getRndInteger(0, 5)][0];

// Player variable
var player = {
  health: 10,
  ammo: 5,
  mags: 4,
  magSize: 5,
  reloadTicks: 0,
  reloadThresh: 100,
  x: 395, // Starting x coordinate
  y: 295, // Starting y coordinate
  vel: 4, // Player movespeed
  facing: "up", // Direction player is facing for purposes of spawning projectiles
  width: 11,
  height: 11,
  score: 15,
  level: 1,
  maxLevel: 1,
  bulletDamage: 1, // Damage dealt to an enemy by player bullets
  shieldDefense: 0, // Damage reduction when an enemy strikes the player
  shieldDamage: 1, // Damage dealt to an enemy that strikes the player
  shieldKnockback: 25, // Multiplier for how far back an enemy is knocked when it strikes a player
  inLevel: false, // If true, level is drawn. If false, menu is drawn
  bulletVel: 12, // Bullet velocity
  shootTicks: 0,
  shootThresh: 25,
  AmmoPrice: 5,
  GDmgPrice: 50,
  MagSizePrice: 25,
  ReloadTimePrice: 30,
  ShieldDmgPrice: 70,
  KnockbackPrice: 50,
  SDefPrice: 70,
  FireRatePrice: 100,
  ShotgunPrice: 1500,
  PiercingPrice: 2000,
  RegenPrice: 750,
  shotgun: false,
  piercing: false,
  regen: false,

  resetPos: function () { // Moves the player back to the center of the screen
    player.x = 395;
    player.y = 295;
  },


  spawnBulletMouse: function (xpos, ypos) { // Spawns a bullet when the mouse is clicked

    let xDiff = xpos - player.x; // Finds the difference between the mouse X and the player X
    let yDiff = ypos - player.y; // Finds the difference between the mouse Y and the player Y
    let xvel = 0;
    let yvel = 0;

    if (player.shotgun) {
      player.shotgun = false; // Temporarily set player.shotgun to false to avoid infinite recursion

      // Get the angle of the shot with the player's position as the origin
      let theta = Math.atan2(yDiff, xDiff)

      // Create an imaginary circle centered on the player, with the initial angle being the angle of the shot
      let circle = {
        centerX: player.x,
        centerY: player.y,
        radius: 25,
        angle: theta
      };

      // Initialize the imaginary target we're moving
      let target = {
        x: 0,
        y: 0
      };

      // This will fire 5 shots, at -8, -4, 0, 4, 8 degree offsets from the initial angle
      for (let i = -8; i <= 8; i += 4) {

        // Change the angle to whatever iteration of the loop we're on
        circle.angle += ((Math.PI * 2) / 360) * i;
        // And reset it to an absolute angle if it overflows 2 pi
        circle.angle = circle.angle % (Math.PI * 2);

        // Move the target x by the cosine of the angle
        target.x = circle.centerX + Math.cos(circle.angle) * circle.radius;
        // Move the target y by the cosine of the angle
        target.y = circle.centerY + Math.sin(circle.angle) * circle.radius;

        // Reset the target angle to the initial calculated theta
        circle.angle = theta;

        // So long as the player has ammo,
        if (player.ammo > 0) {
          // Spawn a bullet aimed at the coordinates calculated for the given angle
          player.spawnBulletMouse(target.x, target.y);
        }
      }

      // Return player.shotgun to its "true" state
      player.shotgun = true;

    } else {
      // The bullet's X and Y velocities are scaled based on the difference between the two and multiplied by the bullet velocity
      // The last clause determines if the velocity should be positive or negative, as all the math here is done with the absolute value.
      xvel = (Math.abs(xDiff) / (Math.abs(xDiff) + Math.abs(yDiff))) * (player.bulletVel) * (xDiff / Math.abs(xDiff));
      yvel = (Math.abs(yDiff) / (Math.abs(xDiff) + Math.abs(yDiff))) * (player.bulletVel) * (yDiff / Math.abs(yDiff));

      bullets.push(Bullet({
        xVelocity: xvel,
        yVelocity: yvel,
        x: player.x,
        y: player.y,
        width: bulletSize,
        height: bulletSize
      }));
      if (useAmmo) {
        player.ammo--;
      }
    }

    player.shootTicks = 0;

  },

  update: function () {
    player.shootTicks++;

    if (player.ammo == 0 && player.mags != 0 && player.reloadTicks < player.reloadThresh) {
      player.reloadTicks++;
    } else if (player.ammo == 0 && player.mags != 0 && player.reloadTicks >= player.reloadThresh) {
      player.ammo = player.magSize;
      player.mags -= 1;
      player.reloadTicks = 0;
    }


    if (player.reloadTicks != 0) {
      ctx.beginPath();
      ctx.rect(player.x - 4, player.y + player.height + 2, (player.reloadTicks / player.reloadThresh) * (player.width + 8), 3);
      ctx.fillStyle = "lime";
      ctx.fill();
      ctx.closePath();
    }
  },

  draw: function () {
    // Draw/update function for the player object
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
    if (player.shieldDefense > 0) {
      ctx.beginPath();
      ctx.rect(player.x - 1, player.y - 1, player.width + 2, player.height + 2);
      ctx.strokeStyle = "#7DF9FF";
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.rect(player.x - 2, player.y - 2, player.width + 4, player.height + 4);
      ctx.strokeStyle = "#7DF9FF";
      ctx.stroke();
      ctx.closePath();
    }
  }
}

// Level object
var level = {
  enemiesRemaining: 5 + 5 * player.level, // Determines how many enemies will spawn per level
  spawnTick: 150, // On which gameplay tick will the first enemy spawn?
  enemyMaxHealth: 1,

  spawnEnemy: function () {
    // Function to spawn an enemy object
    let edges = ["left", "top", "right", "bottom"];
    let spawnSide = edges[getRndInteger(0, 3)]; // Randomly chooses a map edge to spawn the enemy from
    let spawnX = 0;
    let spawnY = 25; // The white HUD bar is 25px tall

    let tempShoot = false; // Placeholder for the enemy's ability to fire at the player
    let shootColor = "#FF0000";
    let shootRoll = getRndInteger(1, 20);

    let tempShield = 0;
    let shieldRoll = getRndInteger(1, 20);

    let enemyColor = bulletColor;

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

    if (player.level > 4) { // If the player is on level 5 or higher
      if (shootRoll >= 16) {
        tempShoot = true; // Let the enemies fire at the player
        enemyColor = shootColor;
      }
    }

    if (player.level > 9) {
      if (shieldRoll >= 16) {
        tempShield = Math.floor(player.level / 5);
      }
    }

    if (player.level % 5 != 0) { // If the player is not on a level that is a multiple of 5, spawn regular enemies

      enemies.push(Enemy({
        x: spawnX,
        y: spawnY,
        maxHealth: level.enemyMaxHealth,
        canShoot: tempShoot,
        shield: tempShield,
        color: enemyColor,
        ID: currEnemyID // The enemy ID is used to check for collisions between enemies
      }));

      currEnemyID++;

    } else { // If the player is on a level that is a multiple of 5, spawn a boss instead
      enemies.push(Boss({
        x: spawnX,
        y: spawnY,
        maxHealth: level.enemyMaxHealth,
        canShoot: true
      }))
    }

    level.enemiesRemaining -= 1; // Decrements the enemy reserve

    bulletColor = bulletColors[Math.floor((Math.random() * bulletColors.length))] // Chooses a new color for the next enemy
  }
}

// Main draw function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the map



  // If the player is in a level, draw that level.
  if (player.inLevel) {

    ctx.drawImage(levelImg, 0, 0);

    player.draw();
    drawTopRect(); // Draws the white HUD bar
    drawAmmo(); // Draws the ammo count
    drawHealth(); // Draws the player health amount
    drawScore(); // Draws the player score/money
    drawEnemiesRemaining(); // Draws the enemy reserve
    drawLevel();

    if (paused) {
      enemies.forEach(function (enemy) { // Draws all enemies
        enemy.draw();
      })

      bullets.forEach(function (bullet) { // Draw all bullets (which will only be the active bullets after the filter)
        bullet.draw();
      })

      enemyBullets.forEach(function (bullet) { // Draw all enemy bullets (which will only be the active bullets after the filter)
        bullet.draw();
      })

      if (powerupSpawned) {
        drawPowerup();
      }

      drawPaused();
    }

    if (!paused) {

      player.update();

      collisionDetection(); // Runs collision detection logic


      if (rightPressed && player.x < canvas.width - player.width - 5) {
        // If the player is attempting to move right, and is not exceeding the 5px buffer on the right side, move them.
        player.x += player.vel;


      }
      if (leftPressed && player.x > 5) {
        // If the player is moving left and is not exceeding the 5px buffer, move them.
        player.x -= player.vel;


      }
      if (upPressed && player.y > 30) {
        // If the player is moving up, and is not exceeding the 5px buffer + 25px HUD bar, move them.
        player.y -= player.vel;


      }
      if (downPressed && player.y < canvas.height - player.height - 5) {
        // If the player is moving down, and is not exceeding the 5px buffer, move them.
        player.y += player.vel;

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

      if (!timeFreeze) {
        enemies.forEach(function (enemy) { // Updates each enemy
          enemy.update();
        });
      } else {
        if (powerupTicks == freezeTick + 250) {
          timeFreeze = false;
          freezeTick = 0;
        }
      }

      if (!useAmmo) {
        if (powerupTicks == ammoTick + 250) {
          useAmmo = true;
          ammoTick = 0;
        }
      }

      enemies = enemies.filter(function (enemy) { // Delete inactive enemies
        return enemy.active;
      });

      enemies.forEach(function (enemy) { // Draws all enemies
        enemy.draw();
      })

      enemyBullets.forEach(function (bullet) { // Update each enemy bullet
        bullet.update();
      });

      enemyBullets = enemyBullets.filter(function (bullet) { // Delete inactive enemy bullets
        return bullet.active;
      });

      enemyBullets.forEach(function (bullet) { // Draw all enemy bullets (which will only be the active bullets after the filter)
        bullet.draw();
      })

      if (level.enemiesRemaining > 0) { // Only bother tracking gameplay ticks if there are still enemies in reserve
        ticks++;
      }

      if (ticks >= level.spawnTick && level.enemiesRemaining > 0) { // If the gameplay tick exceeds the threshold,
        level.spawnEnemy() // Spawn an enemy
        level.spawnTick = Math.max((150 - 10 * player.level), 0) + getRndInteger(20, 50); // and determine the new threshold
        ticks = 0; // and reset the ticks
      }

      if (player.level > 5) {
        powerupTicks++;

        if (powerupTicks >= powerupThresh && powerupTicks < powerupDespawn) {
          powerupSpawned = true;
        } else if (powerupTicks == powerupDespawn) {
          powerupSpawned = false;
          powerupTicks = 0;
          powerupX = getRndInteger(30, canvas.width - 30);
          powerupY = getRndInteger(55, canvas.height - 30);
          powerup = powerupTypes[getRndInteger(0, 5)][0];
        } else {
          powerupSpawned = false;
        }

        if (powerupTicks < powerupThresh && !powerupSpawned) {
          drawPowerupShadow();
        }

        if (powerupSpawned) {
          drawPowerup();
        }

      }

      if (enemies.length == 0 && level.enemiesRemaining == 0) { // If there are no active enemies, and no reserves, the level is complete
        bullets = [] // Remove any active bullets

        enemyBullets = [] // Remove any active enemy bullets        

        if (player.regen) {
          player.health += (1 + Math.floor(player.level / 3))
        }

        player.score += 5 + player.level

        timeFreeze = false;
        useAmmo = true;

        player.inLevel = false;
        player.resetPos(); // Move the player back to the center
        if (player.level == player.maxLevel) {
          player.maxLevel++;
        }
        player.level++; // Increment level
        levelImg.src = levels[getRndInteger(0, levels.length - 1)];

        if (player.level % 5 != 0) { // If this is not a boss level
          level.enemiesRemaining = getRndInteger(5 + 5 * player.level, 10 + 5 * player.level); // 5-10 enemies + 5 * the level number, per level
          level.enemyMaxHealth = (1 + Math.floor(player.level / 3)); // Enemy max health
        } else { // If it is a boss level
          if (getRndInteger(0, 1) == 1) {
            let numBosses = getRndInteger(2, 4);
            level.enemiesRemaining = numBosses;
            level.enemyMaxHealth = Math.ceil((player.level * 10) * (1 / numBosses) * 1.1);
          } else {
            level.enemiesRemaining = 1;
            level.enemyMaxHealth = player.level * 10;
          }
        }

        saveToLocal();
      }
    }



    if (!gameOver) { // Obviously don't draw the next frame if the player lost
      requestAnimationFrame(draw); // Begins the loop anew
    }

  } else { // If the player is at the menu, draw the menu
    drawBackground();
    drawTopRect();
    drawAmmo();
    drawLevel();
    drawScore();
    drawHealth();
    drawMenu();

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
  ctx.textAlign = "left"
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Ammo: " + player.ammo + "/" + player.magSize + " (" + player.mags + ")" + "  [" + ((player.ammo) + (player.mags * player.magSize)) + "]", canvas.width - 160, 20);
}

// Draws in the player health
function drawHealth() {
  ctx.textAlign = "left";
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
  keys[e.keyCode] = true;


  if (e.keyCode == 39 || e.keyCode == 68) { // Right arrow key or D
    rightPressed = true;
  }
  if (e.keyCode == 37 || e.keyCode == 65) { // Left arrow key or A
    leftPressed = true;
  }
  if (e.keyCode == 38 || e.keyCode == 87) { // Up arrow key or W
    upPressed = true;
  }
  if (e.keyCode == 40 || e.keyCode == 83) { // Down arrow key or S
    downPressed = true;
  }

  if (e.keyCode == 80) { // "P"
    if (!paused) {
      paused = true;
    } else {
      paused = false;
    }
  }

  if (e.keyCode == 82) { // "R" key
    reset();
  }

  if (e.keyCode == 67) {
    if (localStorage.getItem("mundusSave") != null) {
      gameOver = false;
      loadFromLocal();
      draw();
    }
  }
}

// Functions that fire on keyup
function keyUpHandler(e) {
  keys[e.keyCode] = false;

  if (e.keyCode == 39 || e.keyCode == 68) { // Right arrow key or D
    rightPressed = false;
  }
  if (e.keyCode == 37 || e.keyCode == 65) { // Left arrow key or A
    leftPressed = false;
  }
  if (e.keyCode == 38 || e.keyCode == 87) { // Up arrow key or W
    upPressed = false;
  }
  if (e.keyCode == 40 || e.keyCode == 83) { // Down arrow key or S
    downPressed = false;
  }
}

function mouseMoveHandler(e) {
  let rect = canvas.getBoundingClientRect();
  var mouseX = e.clientX - rect.left; // Determine the relative X position of the mouse within the canvas
  var mouseY = e.clientY - rect.top; // Determine the relative Y position of the mouse within the canvas
  if (!player.inLevel) { // If the player isn't in a level

    // This logic governs the hover-over colors for the menu buttons
    if (mouseX > startX && mouseX < startX + 150 && mouseY > startY && mouseY < startY + 35) {
      startColor = "limegreen";
    } else if (mouseX > startX - 40 && mouseX < startX - 25 && mouseY > startY && mouseY < startY + 35) {
      if (player.level >= 2) {
        lowerLevelColor = "limegreen";
      } else {
        lowerLevelColor = "green";
      }
    } else if (mouseX > startX + 175 && mouseX < startX + 190 && mouseY > startY && mouseY < startY + 35) {
      if (player.level < player.maxLevel) {
        raiseLevelColor = "limegreen";
      } else {
        raiseLevelColor = "green";
      }
    } else if (mouseX > startX && mouseX < startX + 150 && mouseY > menuRow1 && mouseY < menuRow1 + 35) {
      if (player.score >= player.MagSizePrice) {
        magColor = "#DDDDDD";
      } else {
        magColor = "#FFFFFF";
      }
    } else if (mouseX > startX && mouseX < startX + 150 && mouseY > menuRow2 && mouseY < menuRow2 + 35) {
      if (player.score >= player.ReloadTimePrice && player.reloadThresh >= 25) {
        reloadColor = "#DDDDDD";
      } else {
        reloadColor = "#FFFFFF";
      }
    } else if (mouseX > startX && mouseX < startX + 150 && mouseY > menuRow3 && mouseY < menuRow3 + 35) {
      if (player.score >= player.FireRatePrice && player.shootThresh >= 10) {
        fireRateColor = "#DDDDDD";
      } else {
        fireRateColor = "#FFFFFF";
      }
    } else if (mouseX > menuCol1 && mouseX < menuCol1 + 150 && mouseY > menuRow1 && mouseY < menuRow1 + 35) {
      if (player.score >= player.AmmoPrice) {
        ammoColor = "#DDDDDD";
      } else {
        ammoColor = "#FFFFFF";
      }
    } else if (mouseX > menuCol1 && mouseX < menuCol1 + 150 && mouseY > menuRow2 && mouseY < menuRow2 + 35) {
      if (player.score >= 20) {
        healthColor = "#DDDDDD";
      } else {
        healthColor = "#FFFFFF";
      }
    } else if (mouseX > menuCol1 && mouseX < menuCol1 + 150 && mouseY > menuRow3 && mouseY < menuRow3 + 35) {
      if (player.score >= player.GDmgPrice) {
        GDmgColor = "#DDDDDD";
      } else {
        GDmgColor = "#FFFFFF";
      }
    } else if (mouseX > menuCol2 && mouseX < menuCol2 + 150 && mouseY > menuRow1 && mouseY < menuRow1 + 35) {
      if (player.score >= player.ShieldDmgPrice) {
        SDmgColor = "#DDDDDD";
      } else {
        SDmgColor = "#FFFFFF";
      }
    } else if (mouseX > menuCol2 && mouseX < menuCol2 + 150 && mouseY > menuRow2 && mouseY < menuRow2 + 35) {
      if (player.score >= player.KnockbackPrice) {
        KnockbackColor = "#DDDDDD";
      } else {
        KnockbackColor = "#FFFFFF";
      }
    } else if (mouseX > menuCol2 && mouseX < menuCol2 + 150 && mouseY > menuRow3 && mouseY < menuRow3 + 35) {
      if (player.score >= player.SDefPrice) {
        SDefColor = "#DDDDDD";
      } else {
        SDefColor = "#FFFFFF";
      }
    } else if (mouseX > menuCol1 && mouseX < menuCol1 + 150 && mouseY > menuRow4 && mouseY < menuRow4 + 35) {
      if (player.score >= player.ShotgunPrice) {
        shotgunColor = "#DDDDDD";
      } else {
        shotgunColor = "#FFFFFF";
      }
    } else if (mouseX > startX && mouseX < startX + 150 && mouseY > menuRow4 && mouseY < menuRow4 + 35) {
      if (player.score >= player.PiercingPrice) {
        piercingColor = "#DDDDDD";
      } else {
        piercingColor = "#FFFFFF";
      }
    } else if (mouseX > menuCol2 && mouseX < menuCol2 + 150 && mouseY > menuRow4 && mouseY < menuRow4 + 35) {
      if (player.score >= player.RegenPrice) {
        regenColor = "#DDDDDD";
      } else {
        regenColor = "#FFFFFF";
      }
    } else if (mouseX > (canvas.width / 2) - 100 - 37.5 && mouseX < (canvas.width / 2) - 100 - 37.5 + 75 && mouseY > canvas.height - 35 && mouseY < canvas.height - 10) {
      saveColor = "#FFFFFF"
    } else if (mouseX > (canvas.width / 2) - 37.5 && mouseX < (canvas.width / 2) + 37.5 && mouseY > canvas.height - 35 && mouseY < canvas.height - 10) {
      loadColor = "#FFFFFF"
    } else if (mouseX > (canvas.width / 2) + 100 - 37.5 && mouseX < (canvas.width / 2) + 100 + 37.5 && mouseY > canvas.height - 35 && mouseY < canvas.height - 10) {
      clearColor = "#FFFFFF"
    } else { // Resets the hover colors to the default color
      startColor = "lime";
      mouseStyle = "auto";
      magColor = "#FFFFFF";
      reloadColor = "#FFFFFF";
      fireRateColor = "#FFFFFF";
      ammoColor = "#FFFFFF";
      healthColor = "#FFFFFF";
      GDmgColor = "#FFFFFF";
      SDmgColor = "#FFFFFF";
      KnockbackColor = "#FFFFFF";
      SDefColor = "#FFFFFF";
      shotgunColor = "#FFFFFF";
      piercingColor = "#FFFFFF";
      regenColor = "#FFFFFF";
      lowerLevelColor = "green";
      raiseLevelColor = "green";
      saveColor = "#DDDDDD";
      loadColor = "#DDDDDD";
      clearColor = "#DDDDDD";
    }
  }
}

function mouseClickHandler(e) {
  let rect = canvas.getBoundingClientRect();
  var clickX = e.clientX - rect.left; // Determine the relative X position of the mouse within the canvas
  var clickY = e.clientY - rect.top; // Determine the relative Y position of the mouse within the canvas

  if (!player.inLevel) {
    menuAction(clickX, clickY); // If the player isn't in a level, handle the menu options
  }

  if (player.ammo > 0 && player.inLevel && !paused && player.shootTicks > player.shootThresh) {
    player.spawnBulletMouse(clickX, clickY); // Otherwise, spawn a bullet and decrement ammo
  }
}


// Web-safe colors
var bulletColors = ["#00bfff", "#00ffbf", "#80ff00", "#ff8000", "#4000ff", "#bf00ff", "#00ff80", "#8000ff", "#bfff00", "#ff00bf", "#00ffff", "#00ff00", "#00ff40", "#0040ff", "#0000ff", "#ffff00", "#ff00ff", "#40ff00", "#ffbf00", "#0080ff"];

// Choose a random color to begin with
var bulletColor = bulletColors[Math.floor((Math.random() * bulletColors.length))];


var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var bulletSize = 4;
var mouseStyle = "auto";

var levels = ["concrete.jpg", "grass.jpg", "gravel.jpg", "parking.jpg", "snow.jpg", "ice.jpg", "tiles.jpg", "road.jpg", "diamond.jpg"]
var levelImg = new Image;
levelImg.src = levels[getRndInteger(0, levels.length - 1)]

var paused = false;
var ticks = 0; // Used to delay spawning enemies
var powerupTicks = 0;
var powerupThresh = 500;
var powerupDespawn = powerupThresh + 250
var powerupSpawned = false;
var currEnemyID = 0; // Used for tracking unique enemies for purposes of enemy/enemy collision
var gameOver = false;
var powerupX = getRndInteger(30, canvas.width - 30);
var powerupY = getRndInteger(55, canvas.height - 30);
var timeFreeze = false;
var freezeTick = 0;
var useAmmo = true;
var ammoTick = 0;

var bullets = [];
var enemies = [];
var enemyBullets = [];


// Bullet constructor
function Bullet(I) {
  I.active = true;
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
  I.speed = 3.5;
  I.xVelocity = 0;
  I.yVelocity = 0;
  I.lastXVel = 0;
  I.lastYVel = 0;
  I.bulletVel = 9;
  I.shootTicks = 150; // Tracks the time since the enemy fired its weapon

  // Draw function
  I.draw = function () {


    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();

    if (I.shield > 0) {

      // Double electric blue circle for shield
      ctx.beginPath();
      ctx.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width - 2, 0, 2 * Math.PI);
      ctx.strokeStyle = "#7DF9FF"
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width - 1, 0, 2 * Math.PI);
      ctx.strokeStyle = "#7DF9FF"
      ctx.stroke();
      ctx.closePath();
    }

    ctx.beginPath();
    ctx.rect(this.x - 5, this.y - 5, (I.health / I.maxHealth) * (this.width + 10), 2)
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }

  I.shoot = function () { // Handles an enemy firing at the player

    // The enemy will target the centerpoint of the player
    let xDiff = (player.x + (player.width / 2)) + getRndInteger(-30, 30) - I.x;
    let yDiff = (player.y + (player.height / 2)) + getRndInteger(-30, 30) - I.y;

    let xvel = 0;
    let yvel = 0;

    // Uses the same math as the player's shoot function
    xvel = (Math.abs(xDiff) / (Math.abs(xDiff) + Math.abs(yDiff))) * (I.bulletVel) * (xDiff / Math.abs(xDiff));
    yvel = (Math.abs(yDiff) / (Math.abs(xDiff) + Math.abs(yDiff))) * (I.bulletVel) * (yDiff / Math.abs(yDiff));

    enemyBullets.push(Bullet({
      xVelocity: xvel,
      yVelocity: yvel,
      x: I.x,
      y: I.y,
      width: bulletSize,
      height: bulletSize
    }));
  },

    I.update = function () {
      // Targeting logic, which allows the enemies to track the player.
      // First, get the player position
      let targetX = player.x;
      let targetY = player.y;

      // Set the last X and Y velocity variables (this is used for enemy collision and for knockback)
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

        I.xVelocity = (Math.abs(xDiff) / (Math.abs(xDiff) + Math.abs(yDiff))) * (I.speed / 1) * (xDiff / Math.abs(xDiff));
        I.yVelocity = (Math.abs(yDiff) / (Math.abs(xDiff) + Math.abs(yDiff))) * (I.speed / 1) * (yDiff / Math.abs(yDiff));

      }

      // Enemy collision handling. If the current enemy intersects with an enemy that is not itself (ID != ID), its velocity in that direction stops
      enemies.forEach(function (enemy) {
        if (enemy.active && enemy.ID != I.ID) {
          if (((I.x + I.xVelocity > enemy.x && I.x + I.xVelocity < enemy.x + enemy.width) &&
            (I.y + I.yVelocity + I.height > enemy.y && I.y + I.yVelocity < enemy.y + enemy.height)) ||
            ((I.x + I.xVelocity + I.width > enemy.x && I.x + I.xVelocity + I.width < enemy.x + enemy.width) &&
              (I.y + I.yVelocity + I.height > enemy.y && I.y + I.yVelocity < enemy.y + enemy.height))
          ) {
            I.xVelocity = 0;
          }

          if (((I.y + I.yVelocity > enemy.y && I.y + I.yVelocity < enemy.y + enemy.height) &&
            (I.x + I.xVelocity + I.width > enemy.x && I.x + I.xVelocity < enemy.x + enemy.width)) ||
            ((I.y + I.yVelocity + I.height > enemy.y && I.y + I.yVelocity + I.height < enemy.y + enemy.height) &&
              (I.x + I.xVelocity + I.width > enemy.x && I.x + I.xVelocity < enemy.x + enemy.width))
          ) {
            I.yVelocity = 0;
          }
        }
      })

      // If both velocities have been zeroed by the collision detection, reverse its previous move
      // This will keep enemies from getting permanently stuck on each other
      if (I.xVelocity == 0 && I.yVelocity == 0) {
        I.xVelocity = -1 * I.lastXVel;
        I.yVelocity = -1 * I.lastYVel;
      }

      // Move the enemy
      I.x += I.xVelocity;
      I.y += I.yVelocity;

      // If the enemy can shoot, increment its shoot ticks
      if (I.canShoot) {
        I.shootTicks++;

        if (I.shootTicks == 200) {
          I.shoot();
          I.shootTicks = 0;
        }
      }

      if (isNaN(I.x) || isNaN(I.y)) {
        I.active = false;
      }

      // Enemies only remain active so long as they have health remaining.
      I.active = (I.active && I.health > 0);
    }

  return I;
}


// Boss constructor. These are essentially identical to regular enemies but with a larger sprite and more health
function Boss(I) {
  I.active = true;
  I.width = 35;
  I.height = 35;
  I.health = I.maxHealth;
  I.color = bulletColor;
  I.speed = 1.5;
  I.lastXVel = 0;
  I.lastYVel = 0;
  I.bulletVel = 7;
  I.shootTicks = 75;

  // Draw function
  I.draw = function () {
    let healthPercent = (I.health / I.maxHealth) * 100;
    let healthBarColor = "#00AA00";
    if (healthPercent <= 66 && healthPercent >= 34) {
      healthBarColor = "#FFA500";
    } else if (healthPercent <= 33) {
      healthBarColor = "#FF0000";
    }


    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();


    // Double electric blue circle for shield
    ctx.beginPath();
    ctx.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width - 7, 0, 2 * Math.PI);
    ctx.strokeStyle = "#7DF9FF"
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width - 8, 0, 2 * Math.PI);
    ctx.strokeStyle = "#7DF9FF"
    ctx.stroke();
    ctx.closePath();



    ctx.beginPath();
    ctx.rect(this.x - 5, this.y - 8, (I.health / I.maxHealth) * (this.width + 10), 4)
    ctx.fillStyle = healthBarColor;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(this.x - 5, this.y - 9, this.width + 10, 6)
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();

  }

  I.shoot = function () {

    let xDiff = (player.x + (player.width / 2)) - I.x;
    let yDiff = (player.y + (player.height / 2)) - I.y;
    let xvel = 0;
    let yvel = 0;


    xvel = (Math.abs(xDiff) / (Math.abs(xDiff) + Math.abs(yDiff))) * (I.bulletVel) * (xDiff / Math.abs(xDiff));
    yvel = (Math.abs(yDiff) / (Math.abs(xDiff) + Math.abs(yDiff))) * (I.bulletVel) * (yDiff / Math.abs(yDiff));

    enemyBullets.push(Bullet({
      xVelocity: xvel,
      yVelocity: yvel,
      x: (I.x + (I.width / 2)),
      y: (I.y + (I.height / 2)),
      width: 8,
      height: 8
    }));
  },

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

        I.xVelocity = (Math.abs(xDiff) / (Math.abs(xDiff) + Math.abs(yDiff))) * (I.speed / 1.2) * (xDiff / Math.abs(xDiff));
        I.yVelocity = (Math.abs(yDiff) / (Math.abs(xDiff) + Math.abs(yDiff))) * (I.speed / 1.2) * (yDiff / Math.abs(yDiff));

      }

      I.x += I.xVelocity;
      I.y += I.yVelocity;

      // If the enemy can shoot, increment its shoot ticks
      if (I.canShoot) {
        I.shootTicks++;

        if (I.shootTicks == 100) {
          I.shoot();
          I.shootTicks = 0;
        }
      }

      if (isNaN(I.x) || isNaN(I.y)) {
        I.active = false;
      }

      // Enemies only remain active so long as they have health remaining.
      I.active = (I.active && I.health > 0);
    }

  return I;
}

// Coordinates for the start button
var startX = (canvas.width / 2) - 75;
var startY = 50;

//Coordinates for the different columns/rows of the menu
var menuCol1 = (canvas.width / 4) - 75;
var menuCol2 = (canvas.width / 4) * 3 - 75;
var menuRow1 = 150;
var menuRow2 = 225;
var menuRow3 = 300;
var menuRow4 = 375;

// Menu colors
var startColor = "lime";
var ammoColor = "#FFFFFF";
var magColor = "#FFFFFF";
var reloadColor = "#FFFFFF";
var healthColor = "#FFFFFF";
var GDmgColor = "#FFFFFF";
var SDmgColor = "#FFFFFF";
var KnockbackColor = "#FFFFFF";
var fireRateColor = "#FFFFFF";
var SDefColor = "#FFFFFF";
var shotgunColor = "#FFFFFF";
var piercingColor = "#FFFFFF";
var regenColor = "#FFFFFF";
var lowerLevelColor = "green";
var raiseLevelColor = "#999999";
var saveColor = "#DDDDDD";
var loadColor = "#DDDDDD";
var clearColor = "#DDDDDD";


function drawMenu() {
  ctx.textAlign = "center";

  // Draw start button
  ctx.beginPath();
  ctx.rect(startX, startY, 150, 35);
  ctx.fillStyle = startColor;
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "20px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Start Level " + player.level, startX + 75, startY + 25);

  // Draw lower level arrow
  ctx.beginPath();
  ctx.moveTo(startX - 25, startY);
  ctx.lineTo(startX - 25, startY + 35);
  ctx.lineTo(startX - 40, startY + 17.5);
  if (player.level >= 2) {
    ctx.fillStyle = lowerLevelColor;
  } else {
    ctx.fillStyle = "#999999";
  }
  ctx.fill();
  ctx.closePath();

  // Draw raise level arrow
  ctx.beginPath();
  ctx.moveTo(startX + 175, startY);
  ctx.lineTo(startX + 175, startY + 35);
  ctx.lineTo(startX + 190, startY + 17.5);
  if (player.level < player.maxLevel) {
    ctx.fillStyle = raiseLevelColor;
  } else {
    ctx.fillStyle = "#999999";
  }
  ctx.fill();
  ctx.closePath();

  // Draw buy mag size button
  ctx.beginPath();
  ctx.rect(startX, menuRow1, 150, 35);
  if (player.score >= player.MagSizePrice) {
    ctx.fillStyle = magColor
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Mag Size + 3: $" + player.MagSizePrice, startX + 75, menuRow1 + 23);

  // Draw buy reload time button
  ctx.beginPath();
  ctx.rect(startX, menuRow2, 150, 35);
  if (player.reloadThresh >= 25 && player.score >= player.ReloadTimePrice) {
    ctx.fillStyle = reloadColor;
  } else if (player.reloadThresh < 25) {
    ctx.fillStyle = "#00BB00";
  } else {
    ctx.fillStyle = "#999999";
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("R. Time - 15: $" + player.ReloadTimePrice, startX + 75, menuRow2 + 23);

  // Draw buy fire rate button
  ctx.beginPath();
  ctx.rect(startX, menuRow3, 150, 35);
  if (player.shootThresh >= 10 && player.score > player.FireRatePrice) {
    ctx.fillStyle = fireRateColor;
  } else if (player.shootThresh < 10) {
    ctx.fillStyle = "#00BB00";
  } else {
    ctx.fillStyle = "#999999";
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Fire Rate + 5: $" + player.FireRatePrice, startX + 75, menuRow3 + 23);

  // Draw buy ammo button
  ctx.beginPath();
  ctx.rect(menuCol1, menuRow1, 150, 35);
  if (player.score >= player.AmmoPrice) {
    ctx.fillStyle = ammoColor;
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Magazine: $" + player.AmmoPrice, menuCol1 + 75, menuRow1 + 23);

  // Draw buy health button
  ctx.beginPath();
  ctx.rect(menuCol1, menuRow2, 150, 35);
  if (player.score >= 20) {
    ctx.fillStyle = healthColor;
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Health: 5/$20", menuCol1 + 75, menuRow2 + 23);

  // Draw buy gun damage button
  ctx.beginPath();
  ctx.rect(menuCol1, menuRow3, 150, 35);
  if (player.score >= player.GDmgPrice) {
    ctx.fillStyle = GDmgColor;
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("GDmg +1: $" + player.GDmgPrice, menuCol1 + 75, menuRow3 + 23);

  // Draw buy shield damage button
  ctx.beginPath();
  ctx.rect(menuCol2, menuRow1, 150, 35);
  if (player.score >= player.ShieldDmgPrice) {
    ctx.fillStyle = SDmgColor;
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("SDmg +1: $" + player.ShieldDmgPrice, menuCol2 + 75, menuRow1 + 23);

  // Draw buy shield knockback button
  ctx.beginPath();
  ctx.rect(menuCol2, menuRow2, 150, 35);
  if (player.score >= player.KnockbackPrice) {
    ctx.fillStyle = KnockbackColor;
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Knockback +5: $" + player.KnockbackPrice, menuCol2 + 75, menuRow2 + 23);

  // Draw buy shield defense button
  ctx.beginPath();
  ctx.rect(menuCol2, menuRow3, 150, 35);
  if (player.score >= player.SDefPrice) {
    ctx.fillStyle = SDefColor;
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("SDef +1: $" + player.SDefPrice, menuCol2 + 75, menuRow3 + 23);

  // Draw buy player.shotgun button
  ctx.beginPath();
  ctx.rect(menuCol1, menuRow4, 150, 35);
  if (player.score >= player.ShotgunPrice && !player.shotgun) {
    ctx.fillStyle = shotgunColor;
  } else if (player.shotgun) {
    ctx.fillStyle = "#00BB00"
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Shotgun: $" + player.ShotgunPrice, menuCol1 + 75, menuRow4 + 23);

  // Draw buy player.piercing button
  ctx.beginPath();
  ctx.rect(startX, menuRow4, 150, 35);
  if (player.score >= player.PiercingPrice && !player.piercing) {
    ctx.fillStyle = piercingColor;
  } else if (player.piercing) {
    ctx.fillStyle = "#00BB00"
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Piercing: $" + player.PiercingPrice, startX + 75, menuRow4 + 23);

  // Draw buy player.regen button
  ctx.beginPath();
  ctx.rect(menuCol2, menuRow4, 150, 35);
  if (player.score >= player.RegenPrice && !player.regen) {
    ctx.fillStyle = regenColor;
  } else if (player.regen) {
    ctx.fillStyle = "#00BB00"
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Health Regen: $" + player.RegenPrice, menuCol2 + 75, menuRow4 + 23);


  ctx.textAlign = "left";


  // Draw left info panel
  ctx.beginPath();
  ctx.rect(0, canvas.height - 125, 200, 125);
  ctx.fillStyle = "#EEEEEE";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  if (player.level > 4 && player.level <= 9) {
    shootString = "Melee & Gun Enemies"
  } else if (player.level > 9) {
    shootString = "Melee, Gun & Shield Enemies"
  } else {
    shootString = "Melee Enemies Only"
  }

  if (player.level % 5 == 0) {
    bossString = "BOSS LEVEL"
  } else {
    bossString = "";
  }

  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Level: " + player.level, 10, canvas.height - 105);
  ctx.fillText("Enemies: " + level.enemiesRemaining, 10, canvas.height - 85);
  ctx.fillText("Enemy Health: " + level.enemyMaxHealth, 10, canvas.height - 65);
  ctx.fillText("Enemy Damage: " + level.enemyMaxHealth, 10, canvas.height - 45);
  ctx.fillText(shootString, 10, canvas.height - 25);
  ctx.fillStyle = "#FF0000";
  ctx.fillText(bossString, 10, canvas.height - 5);


  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.fillText("Press \"P\" at any time to pause", (canvas.width / 2), canvas.height - 75);

  ctx.textAlign = "left"


  // Draw save button
  ctx.beginPath();
  ctx.rect((canvas.width / 2) - 100 - 35.5, canvas.height - 35, 75, 25);
  ctx.fillStyle = saveColor;
  ctx.strokeStyle = "#000000"
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.textAlign = "center"

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Save", (canvas.width / 2) - 100, canvas.height - 17);


  // Draw clear button
  ctx.beginPath();
  ctx.rect((canvas.width / 2) + 100 - 35.5, canvas.height - 35, 75, 25);
  if (localStorage.getItem("mundusSave") != null) {
    ctx.fillStyle = clearColor;
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.strokeStyle = "#000000"
  ctx.fill();
  ctx.stroke();
  ctx.closePath();


  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Clear", (canvas.width / 2) + 100, canvas.height - 17);


  // Draw load button
  ctx.beginPath();
  ctx.rect((canvas.width / 2) - 35.5, canvas.height - 35, 75, 25);
  if (localStorage.getItem("mundusSave") != null) {
    ctx.fillStyle = loadColor;
  } else {
    ctx.fillStyle = "#999999"
  }
  ctx.strokeStyle = "#000000"
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Load", (canvas.width / 2), canvas.height - 17);


  ctx.textAlign = "left"



  // Draw right info panel
  ctx.beginPath();
  ctx.rect(canvas.width - 200, canvas.height - 125, 200, 125);
  ctx.fillStyle = "#EEEEEE";
  ctx.fill();
  ctx.strokeStyle = "#000000";
  ctx.stroke();
  ctx.closePath();

  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Gun Damage: " + player.bulletDamage, canvas.width - 190, canvas.height - 105);
  ctx.fillText("Shield Damage: " + player.shieldDamage, canvas.width - 190, canvas.height - 85);
  ctx.fillText("Shield Defense: " + player.shieldDefense, canvas.width - 190, canvas.height - 65);
  ctx.fillText("Shield Knockback: " + player.shieldKnockback, canvas.width - 190, canvas.height - 45);
  ctx.fillText("Fire Rate: 1 per " + player.shootThresh + " ticks", canvas.width - 190, canvas.height - 25)
  ctx.fillText("Reload Time: " + player.reloadThresh + " ticks", canvas.width - 190, canvas.height - 5)
}

function drawPowerup() {
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.beginPath();
  ctx.rect(powerupX, powerupY, 30, 30);
  ctx.fillStyle = "rgba(139,69,19," + (powerupDespawn - powerupTicks) / (powerupDespawn - powerupThresh);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(powerupX + 5, powerupY + 5, 20, 20);
  ctx.fillStyle = "rgba(244,164,96," + (powerupDespawn - powerupTicks) / (powerupDespawn - powerupThresh);
  ctx.fill();
  ctx.closePath();
  ctx.font = "15px Arial"
  ctx.fillStyle = "rgba(0,0,0," + (powerupDespawn - powerupTicks) / (powerupDespawn - powerupThresh);
  ctx.fillText(powerup, powerupX + 15, powerupY + 15)
  ctx.textBaseline = "alphabetic";
}

function drawPowerupShadow() {
  ctx.beginPath();
  ctx.arc(powerupX + 15, powerupY + 15, (powerupTicks / powerupThresh) * 15, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(0,0,0," + ((powerupTicks / powerupThresh) - .65);
  ctx.closePath();
  ctx.fill();
}

function collisionDetection() {
  bullets.forEach(function (bullet) { // Loop through each active bullet
    enemies.forEach(function (enemy) { // And each active enemy

      // If the bullet intersects an enemy (falls within any of the four corners of the enemy square)
      if ((bullet.x > enemy.x - 5 && bullet.y > enemy.y - 5 && bullet.x < (enemy.x + enemy.width + 5) && bullet.y < (enemy.y + enemy.height + 5)) ||
        (bullet.x + bullet.width > enemy.x - 5 && bullet.y + bullet.width > enemy.y - 5 && bullet.x + bullet.height < (enemy.x + enemy.width + 5) && bullet.y + bullet.height < (enemy.y + enemy.height + 5))) {

        if (player.level % 5 != 0) {
          enemy.health -= Math.max(0, player.bulletDamage - enemy.shield); // Decrease enemy health normall if it's not a boss
        } else {
          enemy.health -= Math.max(0, player.bulletDamage - (player.level / 5));
        }

        if (!player.piercing) {
          bullet.active = false; // and despawn the bullet
        }

        // If the enemy is dead
        if (enemy.health <= 0) {
          enemy.active = false; // Despawn the enemy
          player.score += Math.floor((player.level == player.maxLevel ? 1 : 0.75) * (enemy.maxHealth + 1)); // and increment the player score
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
      let dmg = (level.enemyMaxHealth - player.shieldDefense) // Calculate the damage dealt by the enemy
      if (dmg > 0) {
        flashColor("red");
        player.health -= dmg; // Decrement the player health
      }

      enemy.x -= enemy.lastXVel * player.shieldKnockback; // Move the enemy back the way it came
      enemy.y -= enemy.lastYVel * player.shieldKnockback; // Move the enemy back the way it came

      enemy.health -= player.shieldDamage; // Decrease the enemy health by the player's shield damage

      if (enemy.health <= 0) {
        enemy.active = false; // and despawn the enemy if the player's shield did enough damage
      }

      // If the player's health reaches zero, it's GAME OVER, MAN!
      if (player.health <= 0) {
        gameOver = true;
      }
    }
  })

  enemyBullets.forEach(function (bullet) {
    // If an enemy bullet intersects the player's square
    if ((bullet.x > player.x && bullet.y > player.y && bullet.x < (player.x + player.width) && bullet.y < (player.y + player.height)) ||
      (bullet.x + bullet.width > player.x && bullet.y + bullet.height > player.y && bullet.x + bullet.width < (player.x + player.width) && bullet.y + bullet.height < (player.y + player.height))) {
      let dmg = (level.enemyMaxHealth - player.shieldDefense)
      if (dmg > 0) {
        flashColor("red");
        player.health -= dmg; // Decrement the player health
      }
      bullet.active = false; // and despawn the bullet
      // If the player is dead
      if (player.health <= 0) {
        gameOver = true;
      }
    }
  })

  if (powerupSpawned) {
    if (player.x < powerupX + 30 && player.y < powerupY + 30 && player.x > powerupX && player.y > powerupY) {
      powerupSpawned = false;
      powerupTicks = powerupDespawn + 50; // Sets the powerup ticks forward. This prevents another powerup from spawning in the level

      if (powerup == "A") { // Ammo pickup
        player.mags += 1;
      } else if (powerup == "H") { // Health pickup
        player.health += 5;
      } else if (powerup == "$") { // Money pickup
        player.score += (5 + player.level);
      } else if (powerup == "T") { // Timefreeze pickup
        freezeTick = powerupTicks;
        timeFreeze = true;
      } else if (powerup == "I") { // Infinite ammo pickup
        ammoTick = powerupTicks;
        useAmmo = false;
      } else if (powerup == "B") { // Bomb pickup
        enemies.forEach(function (enemy) {
          enemy.health -= ((1 + Math.floor(player.level / 3)) - enemy.shield);
        })
      }
    }
  }

  if (gameOver) {
    drawGameOver();
  }
}

// Takes clicks on the menu screen and handles them
function menuAction(x, y) {
  if (x > startX && x < startX + 150 && y > startY && y < startY + 35) {
    // If the start button is clicked, pick a random background, reset the player position, and start the level
    player.resetPos();

    setTimeout(function () { // 15ms timeout to prevent a bullet from being spawned due to clicking "start"
      player.inLevel = true;
      powerupTicks = 0;
      powerup = powerupTypes[getRndInteger(0, 5)][0];
    }, 15);
  } else if (x > startX - 40 && x < startX - 25 && y > startY && y < startY + 35) {
    if (player.level >= 2) {
      player.level -= 1;
      if (player.level % 5 != 0) { // If this is not a boss level
        if (player.level == 1) {
          level.enemiesRemaining = 10;
        } else {
          level.enemiesRemaining = getRndInteger(5 + 5 * player.level, 10 + 5 * player.level); // 5-10 enemies + 5 * the level number, per level
        }
        level.enemyMaxHealth = (1 + Math.floor(player.level / 3)); // Enemy max health
      } else { // If it is a boss level
        if (getRndInteger(0, 1) == 1) {
          let numBosses = getRndInteger(2, 4);
          level.enemiesRemaining = numBosses;
          level.enemyMaxHealth = Math.ceil((player.level * 10) * (1 / numBosses) * 1.1);
        } else {
          level.enemiesRemaining = 1;
          level.enemyMaxHealth = player.level * 10;
        }
      }
    }
  } else if (x > startX + 175 && x < startX + 190 && y > startY && y < startY + 35) {
    if (player.level < player.maxLevel) {
      player.level += 1;
      if (player.level % 5 != 0) { // If this is not a boss level
        level.enemiesRemaining = getRndInteger(5 + 5 * player.level, 10 + 5 * player.level); // 5-10 enemies + 5 * the level number, per level
        level.enemyMaxHealth = (1 + Math.floor(player.level / 3)); // Enemy max health
      } else { // If it is a boss level
        if (getRndInteger(0, 1) == 1) {
          let numBosses = getRndInteger(2, 4);
          level.enemiesRemaining = numBosses;
          level.enemyMaxHealth = Math.ceil((player.level * 10) * (1 / numBosses) * 1.1);
        } else {
          level.enemiesRemaining = 1;
          level.enemyMaxHealth = player.level * 10;
        }
      }
    }
  } else if (x > startX && x < startX + 150 && y > menuRow1 && y < menuRow1 + 35) {
    // Mag size purchase
    if (player.score >= player.MagSizePrice) {
      player.score -= player.MagSizePrice;

      let newMags = Math.floor((player.magSize * player.mags) / (player.magSize + 3));
      let spareAmmo = (player.magSize * player.mags) % (player.magSize + 3)

      player.mags = newMags
      player.magSize += 3;
      player.ammo = Math.min(player.ammo + spareAmmo, player.magSize);
      player.MagSizePrice += Math.ceil(player.MagSizePrice * 0.50)
      player.AmmoPrice += 2;
    }
  } else if (x > startX && x < startX + 150 && y > menuRow2 && y < menuRow2 + 35) {
    // Reload time purchase
    if (player.score >= player.ReloadTimePrice && player.reloadThresh >= 25) {
      player.score -= player.ReloadTimePrice;
      player.reloadThresh -= 15;
      player.ReloadTimePrice += 15
    }
  } else if (x > startX && x < startX + 150 && y > menuRow3 && y < menuRow3 + 35) {
    // Fire rate purchase
    if (player.score >= player.FireRatePrice && player.shootThresh >= 10) {
      player.score -= player.FireRatePrice;
      player.shootThresh -= 5;
      player.FireRatePrice += Math.ceil(player.FireRatePrice * 0.75);
    }
  } else if (x > menuCol1 && x < menuCol1 + 150 && y > menuRow1 && y < menuRow1 + 35) {
    // Mag purchase
    if (player.score >= player.AmmoPrice) {
      player.score -= player.AmmoPrice;
      player.mags += 1;
    }
  } else if (x > menuCol1 && x < menuCol1 + 150 && y > menuRow2 && y < menuRow2 + 35) {
    // Health purchase
    if (player.score >= 20) {
      player.score -= 20;
      player.health += 5;
    }
  } else if (x > menuCol1 && x < menuCol1 + 150 && y > menuRow3 && y < menuRow3 + 35) {
    // Gun Damage purchase
    if (player.score >= player.GDmgPrice) {
      player.score -= player.GDmgPrice;
      player.bulletDamage += 1;
      player.GDmgPrice += Math.ceil(player.GDmgPrice * 0.5);
    }
  } else if (x > menuCol2 && x < menuCol2 + 150 && y > menuRow1 && y < menuRow1 + 35) {
    // Shield Damage purchase
    if (player.score >= player.ShieldDmgPrice) {
      player.score -= player.ShieldDmgPrice;
      player.shieldDamage += 1;
      player.ShieldDmgPrice += 20
    }
  } else if (x > menuCol2 && x < menuCol2 + 150 && y > menuRow2 && y < menuRow2 + 35) {
    // Knockback purchase
    if (player.score >= player.KnockbackPrice) {
      player.score -= player.KnockbackPrice;
      player.shieldKnockback += 5;
      player.KnockbackPrice += 10
    }
  } else if (x > menuCol2 && x < menuCol2 + 150 && y > menuRow3 && y < menuRow3 + 35) {
    // Shield Defense purchase
    if (player.score >= player.SDefPrice) {
      player.score -= player.SDefPrice;
      player.shieldDefense += 1;
      player.SDefPrice += Math.ceil(player.SDefPrice * 0.5)
    }
  } else if (x > menuCol1 && x < menuCol1 + 150 && y > menuRow4 && y < menuRow4 + 35) {
    // Shotgun purchase
    if (player.score >= player.ShotgunPrice && !player.shotgun) {
      player.score -= player.ShotgunPrice;
      player.shotgun = true;
      player.ShotgunPrice = 0;
    }
  } else if (x > startX && x < startX + 150 && y > menuRow4 && y < menuRow4 + 35) {
    // Piercing purchase
    if (player.score >= player.PiercingPrice && !player.piercing) {
      player.score -= player.PiercingPrice;
      player.piercing = true;
      player.PiercingPrice = 0;
    }
  } else if (x > menuCol2 && x < menuCol2 + 150 && y > menuRow4 && y < menuRow4 + 35) {
    // Regen purchase
    if (player.score >= player.RegenPrice && !player.regen) {
      player.score -= player.RegenPrice;
      player.regen = true;
      player.RegenPrice = 0;
    }
  } else if (x > (canvas.width / 2) - 100 - 37.5 && x < (canvas.width / 2) - 100 - 37.5 + 75 && y > canvas.height - 35 && y < canvas.height - 10) {
    saveToLocal();
  } else if (x > (canvas.width / 2) - 37.5 && x < (canvas.width / 2) + 37.5 && y > canvas.height - 35 && y < canvas.height - 10) {
    checkAndLoad();
  } else if (x > (canvas.width / 2) + 100 - 37.5 && x < (canvas.width / 2) + 100 + 37.5 && y > canvas.height - 35 && y < canvas.height - 10) {
    clearSave();
  }
}


// Draws the level number text
function drawLevel() {
  ctx.textAlign = "left";
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Level: " + player.level, (canvas.width / 2) - 135, 20);
}

// Draws the score/$
function drawScore() {
  ctx.textAlign = "left";
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

  if (localStorage.getItem("mundusSave") != null) {    
    ctx.fillText("Press C to continue from the end of last level", canvas.width / 2, (canvas.height / 2 + 60));
  }
}

function drawPaused() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText("Paused", (canvas.width / 2), canvas.height / 2 - 20);
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Press P to Unpause", canvas.width / 2, (canvas.height / 2));
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
  ctx.textAlign = "left"

  flashColor("black");

  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;

  paused = false;

  player.health = 10;
  player.ammo = 5;
  player.mags = 4;
  player.magSize = 5;
  player.reloadThresh = 100;
  player.reloadTicks = 0;
  player.shootTicks = 0;
  player.shootThresh = 25;
  player.level = 1;
  player.maxLevel = 1;
  player.score = 15;
  player.shieldDamage = 1;
  player.shieldKnockback = 25;
  player.shieldDefense = 0;
  player.bulletDamage = 1;
  player.inLevel = false;
  player.shotgun = false;
  player.piercing = false;
  player.regen = false;


  player.AmmoPrice = 5;
  player.GDmgPrice = 50;
  player.MagSizePrice = 25;
  player.ReloadTimePrice = 30;
  player.ShieldDmgPrice = 70;
  player.KnockbackPrice = 50;
  player.SDefPrice = 70;
  player.FireRatePrice = 100;
  player.ShotgunPrice = 1500;
  player.PiercingPrice = 2000;
  player.RegenPrice = 750;

  level.spawnTick = 150;
  level.enemiesRemaining = 5 + 5 * player.level;
  level.enemyMaxHealth = 1;

  ticks = 0;

  enemies = [];
  bullets = [];
  enemyBullets = [];

  if (gameOver) {
    gameOver = false;
    draw();
  }
}


function saveToLocal() {
  // This presented a problem: JSON does not retain object methods, of which the player object has 4
  localStorage.setItem("mundusSave", JSON.stringify(player));
}

function loadFromLocal() {
  // Solution: Create a temp object with the information (read: variables) that JSON is able to save
  let loadedPlayer = JSON.parse(localStorage.getItem("mundusSave"));
  // Get a list of all the keys in this temp object, which will include all of the player variables that would
  // change with game state
  let loadedData = Object.keys(loadedPlayer);

  // Iterate through each of those keys and replace the player[key] value with those from the local storage
  loadedData.forEach(function (key) {
      player[key] = loadedPlayer[key];
  })
}

function clearSave() {
  // Deletes the local cache item for the save
  localStorage.removeItem("mundusSave");
}



draw();