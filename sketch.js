var gameState = "INTRO";
var playerIM, enemyBulletIM;
var bulletIM, enemyIM, background1, heartIM, player, enemy1, enemy2, enemy;
var playerBullet, enemyBullet, heart, enemy2;
var laserIM, textBox, spaceStation, spaceStationIM, eRemaining;

var explosionIM, explosion1, explosion2;
var enemy3;
var bgMusic;
var upCoolDown = 0;
var overHeatingText, trouble, troubleIM;
var health = 100;
var missilesLeftTextBox;
var missilesRemaining = 10;
var enemyBullet2;
//SOUND EFFECTS
var bgMusic;
var laserSound;
var eRemainingText;
var playerBullet3, enemy3, enemyBullet3;
var healthTextBox;
var healthRemaining;
var leftBarrier, rightBarrier;

var temperature = 20;
var temperatureTextBox;
var check = 0;
var eChecker = 0;
var e1checker = 0;

var rocketFlame;
var flame;
function preload() {
  playerIM = loadImage("rocket.png");
  bulletIM = loadImage("bullet.png");
  laserIM = loadImage("laser.png");
  enemyIM = loadImage("enemy.png");
  background1 = loadImage("background.png");
  enemyBulletIM = loadImage("enemybullet.png");
  explosionIM = loadImage("explosion.png");

  bgMusic = loadSound("backgroundmusic.mp3");

  heartIM = loadImage("heart.png");
  spaceStationIM = loadImage("spacestation.png");
  troubleIM = loadImage("trouble.png");
  rocketFlame = loadImage("flame.png");

  bgMusic = createAudio("gameMusic.wav");
  laserSound = createAudio("laserSound.wav");
}

function setup() {
  createCanvas(1440, 820.5);

  stroke("white");
  textBox = createSprite(122, 60, 270, 100);
  textBox.shapeColor = "black";

  player = createSprite(600, 740);
  player.scale = 0.35;
  player.addImage(playerIM);

  flame = createSprite(player.x, player.y + 70);
  flame.addImage(rocketFlame);
  flame.scale = 0.7;

  enemy1 = createSprite(300, 200, 800, 800);
  enemy1.scale = 0.2;
  enemy1.addImage(enemyIM);

  enemy2 = createSprite(780, 200);
  enemy2.scale = 0.2;
  enemy2.addImage(enemyIM);

  playerBullet = createSprite(player.x, player.y - 140);
  playerBullet.addImage(laserIM);
  playerBullet.scale = 0.1;
  playerBullet.visible = false;

  enemy3 = createSprite(400, player.y - 500);
  enemy3.scale = 0.2;
  enemy3.addImage(enemyIM);

  trouble = createSprite(
    Math.round(random(30, 1500)),
    Math.round(random(player.y - 40, player.y + 700))
  );

  trouble.visible = false;
  enemyBullet = createSprite(enemy1.x, enemy1.y + 10);
  enemyBullet.visible = false;
  enemyBullet.addImage(enemyBulletIM);
  enemyBullet.scale = 0.1;

  enemyBullet2 = createSprite(enemy1.x, enemy1.y + 10);
  enemyBullet2.visible = false;
  enemyBullet2.addImage(enemyBulletIM);
  enemyBullet2.scale = 0.1;

  temperatureTextBox = createSprite(
    1330,
    player.y - 580,
    textBox.width,
    textBox.height
  );
  temperatureTextBox.shapeColor = "black";

  enemy1.setCollider(
    "circle",
    enemy1.x - 310,
    enemy1.y - 230,
    enemy1.width + 115
  );
  player.setCollider("rectangle", player.x - 600, player.y - 760, 340, 300);

  //enemy1.setCollider("rectangle", 0, 0, enemy1.width, enemy1.height);

  //playerBullet.visible = false;

  enemyBullet3 = createSprite(enemy3.x, enemy3.y + 10);
  enemyBullet3.visible = false;
  enemyBullet3.addImage(enemyBulletIM);
  enemyBullet3.scale = 0.1;
  //15500
  spaceStation = createSprite(Math.round(random(299, 999)), -14500);
  spaceStation.addImage(spaceStationIM);
  spaceStation.scale = 0.7;

  missilesLeftTextBox = createSprite(1300, player.y + 160, 300, 100);
  missilesLeftTextBox.shapeColor = "black";

  trouble = createSprite(-40);
  trouble.shapeColor = "black";
  trouble.addImage(troubleIM);
  trouble.scale = 0.2;

  healthTextBox = createSprite(70, player.y + 170, 270, 100);
  healthTextBox.shapeColor = "black";

  leftBarrier = createSprite(250, player.y, 30, 9999);
  rightBarrier = createSprite(1150, player.y, 30, 9999);

  leftBarrier.visible = false;
  rightBarrier.visible = false;
}

function draw() {
  bgMusic.loop();

  eRemaining = 2;

  if (gameState === "INTRO") {
    //INTRO TEXT
    //INTRO TEXT
    background(0);
    fill("orange");
    textSize(30);
    text("You are a human who is defending Earth from ALIENS!", 290, 300);
    text(
      "Your goal is to reach the Universal Space Station up ahead",
      300,
      340
    );
    text("But be warned, the aliens aren't too kind", 400, 380);
    text("What's that? You want to save your planet anyway?", 350, 420);
    text("Oh well, don't say I didn't warn you. Press P to play!", 320, 460);

    player.visible = false;
    enemy1.visible = false;
    enemy2.visible = false;
    enemy3.visible = false;
    flame.visible = false;

    if (keyDown("P")) {
      gameState = "PLAY";
      bgMusic.play();
    }
  }
  if (gameState === "PLAY") {
    background(background1);

    enemy3.visible = false;
    flame.visible = true;
    flame.x = player.x + 7;
    flame.y = player.y + 190;

    player.visible = true;
    if (e1checker === 0) {
      enemy1.visible = true;
      enemy2.visible = true;
    }
    if (e1checker === 2) {
      enemy1.visible = false;

      enemy2.visible = false;
      enemy3.visible = false;
    }

    enemy1.y = player.y - 500;
    enemy2.y = player.y - 500;

    textBox.y = player.y - 560;
    healthTextBox.y = player.y + 190;

    temperatureTextBox.y = textBox.y;

    console.log(gameState);

    missilesLeftTextBox.y = player.y + 190;

    if (enemyBullet.visible === false) {
      enemyBullet.y = player.y - 300;
    }
    if (enemyBullet2.visible === false) {
      enemyBullet2.y = player.y - 300;
    }

    if (keyDown("right_arrow") && player.x < rightBarrier.x) {
      player.x = player.x + 20;
    }

    if (keyDown("left_arrow") && player.x > leftBarrier.x) {
      player.x = player.x - 20;
    }

    if (enemy1.x < player.x) {
      enemy1.x = enemy1.x + 6;
    }

    if (enemy1.x > player.x) {
      enemy1.x = enemy1.x - 5;
    }

    if (enemy2.x < player.x) {
      enemy2.x = enemy2.x + 5;
    }

    if (enemy2.x > player.x) {
      enemy2.x = enemy2.x - 6;
    }

    console.log(player.y);

    // if (enemy1.x === player.x) {
    //   enemyBullet.velocityY = 8;
    //   enemyBullet.visible = true;
    // }
    if (enemy1.x === player.x && enemyBullet.visible === false) {
      enemyBullet.velocityY = 8;
      enemyBullet.visible = true;
      enemyBullet.x = enemy1.x;
      enemyBullet.y = enemy1.y + 35;
    }

    if (enemy2.x === player.x && enemyBullet2.visible === false) {
      enemyBullet2.velocityY = 8;
      enemyBullet2.visible = true;
      enemyBullet2.x = enemy2.x;
      enemyBullet2.y = enemy2.y + 35;
    }

    // CAMERA CHANGING
    camera.y = player.y - 200;
    //CAMERA CHANGING

    // if (enemy1.x < enemy2.x - 50) {
    //   enemy2.velocityX = +4;
    // }

    if (playerBullet.y < enemy1.y) {
      playerBullet.y = player.y - 130;
    }

    if (playerBullet.y === player.y - 130) {
      playerBullet.visible = false;
      playerBullet.velocityY = 0;
    }

    if (enemyBullet2.y > player.y + 70) {
      enemyBullet2.y = enemy2.y - 35;
      enemyBullet2.velocityY = 0;
      enemyBullet2.visible = false;
    }
    if (enemyBullet.y > player.y + 70) {
      enemyBullet.y = enemy1.y - 35;
      enemyBullet.velocityY = 0;
      enemyBullet.visible = false;
    }

    if (
      keyWentDown("SPACE") &&
      missilesRemaining !== 0 &&
      playerBullet.visible === false
    ) {
      playerBullet.velocityY = -20;
      playerBullet.visible = true;
      playerBullet.x = player.x;
      playerBullet.y = player.y - 40;
      //playing sound

      laserSound.play();

      //updating missleremaining
      missilesRemaining = missilesRemaining - 1;
    }
    if (enemyBullet.isTouching(player)) {
      health = health - 25;
      playerBullet.visible = false;
      enemyBullet.visible = false;
      enemyBullet2.visible = false;
      // textSize(30);
      // fill("red");
      // text("Ouch! Just lost 50 health!", healthTextBox.x, healthTextBox.y - 50);
    }

    if (enemyBullet2.isTouching(player)) {
      health = health - 25;
      playerBullet.visible = false;
      enemyBullet.visible = false;
      enemyBullet2.visible = false;

      // textSize(30);
      // fill("red");
      // text("Ouch! Just lost 50 health!", healthTextBox.x, healthTextBox.y - 50);
    }

    // NEW WAVE OF ENEMIES

    if (enemy1.x > 5999 && enemy2.x > 5999) {
      check = 0;

      setTimeout(function () {
        textSize(39);
        fill("BLUE");
        text("THIS IS YOUR CHANCE, RUN!", 400, player.y - 300);
        enemy1.visible = false;
        enemy2.visible = false;
      }, 1);

      setTimeout(function () {
        //  enemy1.x = 88;
        enemy1.visible = true;
      }, 1000);
      setTimeout(function () {
        //enemy2.x = 1200;
        enemy2.visible = true;
      }, 1000);
    }

    if (enemy1.x === 999901928401928340) {
      textSize(40);
      fill("red");
      stroke("white");
      text("ENEMIES, INCOMING!", 450, player.y - 200);

      e1checker = 2;
      // enemy2.x = 1200;
      // enemy1.x = -10;

      //check = 2;

      enemy1.visible = true;
      enemy2.visible = true;
      // enemy1.visible = false;
      // enemy2.visible = false;
    }

    if (enemy1.x < 130) {
      enemy1.visible = false;
      eRemaining = eRemaining - 1;
    }
    if (enemy2.x > 1500) {
      enemy2.visible = false;
    }

    if (playerBullet.isTouching(enemy1)) {
      enemy1.velocityX = 0;

      enemy1.x = 999999;
      enemy1.visible = false;

      ////
      ////
      ///

      setTimeout(function () {
        enemy1.x = -80;
      }, 6200);
    }

    if (playerBullet.isTouching(enemy2)) {
      enemy2.x = 999999;

      enemy2.velocityX = 0;
      enemy2.visible = false;
      // setTimeout(function () {
      //   enemy2.x = 9000;
      // }, 6000);

      //enemy2.visible = false;
      // // enemy2.y = 80;
      setTimeout(function () {
        enemy2.x = 1110;
      }, 6200);
    }

    if (enemy1.x > -70 && enemy1.x < 0 && enemy2.x > 1190 && enemy2.x < 1310) {
      fill("red");
      stroke("white");
      text("ENEMIES, INCOMING!", 450, player.y - 200);
    }

    if (health <= 0) {
      gameState = "LOSE END";
    }

    if (player.isTouching(spaceStation)) {
      if (enemy1.x < 9999 && missilesRemaining > 0) {
        textSize(50);
        fill("white");
        stroke("red");
        text("YOU CANNOT WIN IF ENEMIES EXIST!", 300, player.y - 250);
      }
      if (enemy2.x < 9999 && missilesRemaining > 0) {
        textSize(50);
        fill("white");
        stroke("red");
        text("YOU CANNOT WIN IF ENEMIES EXIST!", 300, player.y - 250);
      }
      if (enemy2.x < 9999 && missilesRemaining === 0) {
        textSize(50);
        fill("orange");
        stroke("red");
        text(
          "Uh-Oh, you have no missiles to shoot the aliens..",
          200,
          player.y - 270
        );
        text("You have to try again!!", 400, player.y - 210);
      }

      if (enemy1.x < 9999 && missilesRemaining === 0) {
        textSize(50);
        fill("orange");
        stroke("red");
        text(
          "Uh-Oh, you have no missiles to shoot the aliens..",
          200,
          player.y - 270
        );
        text("You have to try again!!", 400, player.y - 210);
      }

      if (enemy1.x > 9999 && enemy2.x > 9999) {
        gameState = "WIN END";
      }
    }
    // if (enemy1.visible === false) {
    //   enemy1.visible = false;
    // }
    // if (enemy2.visible === false) {
    //   enemy2.visible = false;
    // }

    if (keyDown("UP_ARROW") && temperature < 600) {
      if (check === 0 && player.y > spaceStation.y + 20) {
        //CONTROLS
        upCoolDown = upCoolDown + 50;
        temperature = temperature + 1;

        player.y = player.y - 30;
        upCoolDown = upCoolDown + 2;
      }

      if (check === 2) {
        textSize(40);
        fill("blue");
        text("YOU CANNOT MOVE FORWARD!!", 360, player.y - 400);
        text("Destroy Remaining enemies to proceed", 340, player.y - 300);
      }
    }

    if (check === 3) {
      enemy1.visible = true;
      enemy2.visible = true;
    }

    // if (player.y < -1500) {
    //   if (enemy1.x > 0 || enemy1.x < 2000) {
    //     check = 2;
    //   }
    //   if (enemy2.x > 0 || enemy2.x < 2000) {
    //     check = 2;
    //   }
    // }

    //controls ending here

    //cooldown mechanism

    if (temperature >= 350) {
      var colorRandom = Math.round(random(1, 2));
      if (colorRandom === 1) {
        trouble.x = 660;
        trouble.y = player.y - 130;

        trouble.addImage(troubleIM);
        trouble.scale = 0.8;
        trouble.depth = trouble.depth - 200;

        fill("red");
        textSize(50);
        text("SYSTEMS OVERHEATING", 400, player.y - 320);
        text("PRESS DOWN ARROW TO COOL OFF!", 260, player.y - 400);
      }
      if (colorRandom === 2) {
        trouble.x = 660;
        trouble.y = player.y - 130;

        trouble.addImage(troubleIM);
        trouble.scale = 0.8;

        trouble.depth = trouble.depth - 200;
        fill("orange");
        textSize(50);
        text("SYSTEMS OVERHEATING", 400, player.y - 320);
        text("PRESS DOWN ARROW TO COOL OFF!", 260, player.y - 400);
      }
    }

    if (enemy1.x > 9999) {
      eRemaining = eRemaining - 1;
      // var times = 5 - second();
      // if (times === 0) {
      //   enemy1.x = 230;
      // // }
      // setTimeout(function () {
      //   enemy1.x = -10;
      // }, 6000);
    }
    if (enemy2.x > 9999) {
      eRemaining = eRemaining - 1;
      // var timeR = 5 - second();
      // if (timeR === 0) {
      //   enemy2.x = 888;
      // }
      // setTimeout(function () {
      //   enemy2.x = 80;
      // }, 7000); setTimeout(function () {

      // setTimeout(function () {
      //   enemy2.x = 9000;
      // }, 6000);
    }
    if (keyWentDown("DOWN_ARROW") && temperature > 0) {
      temperature = temperature - 10;
      if (temperature > 350) {
        trouble.visible = false;
      }
    }
    if (temperature < 0) {
      temperature = 0;
    }

    if (temperature >= 400) {
      rest();
    }

    //cooldown ENDS HERE

    // console.log(upCoolDown);
    drawSprites();

    fill("red");
    stroke("black");
    textSize(20);

    text("Temperature : " + temperature, 1250, textBox.y + 10);

    text(eRemaining + " Enemies Remaining!", 20, textBox.y + 10);

    text(
      "Missiles remaining : " + missilesRemaining,
      missilesLeftTextBox.x - 120,
      missilesLeftTextBox.y + 10
    );

    text(
      "Health : " + health,
      healthTextBox.x - 49,
      missilesLeftTextBox.y + 10
    );

    //eRemaining.y = textBox.y;
  }
  if (gameState === "LOSE END") {
    background(0);
    player.visible = false;
    enemy1.visible = false;
    enemy2.visible = false;
    fill("blue");
    textSize(34);
    text(
      "Uh-Oh, you lose! Refresh Your Page to try Again!",
      350,
      player.y - 300
    );

    //   console.log("LOSE ENDDdD");
  }

  if (gameState === "WIN END") {
    background(0);
    fill("red");
    textSize(30);
    text(
      "YOU WIN!! Refresh Your page if You Want to Play Again!",
      330,
      player.y - 300
    );
  }
}
function rest() {
  background(0);
  player.visible = false;
  enemy1.visible = false;
  enemy2.visible = false;
  playerBullet.visible = false;
  enemy1.x = -123123123123;
  enemy2.x = -123412341234123;

  if (keyDown("UP_ARROW")) {
    player.y = player.y;
  }

  camera.x = -4399;

  textSize(50);
  fill("red");
  text("Oh-No! Your ship's temperature was too hot!", -4900, player.y - 400);
  text("Refresh Your Page to Try Again", -4800, player.y - 200);
}
