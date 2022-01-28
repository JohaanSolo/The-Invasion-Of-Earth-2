var canvasW, canvasW, gameState, play, end;
var player, playerImg, leftAlien, rightAlien, blueAlienImg, greenAlienImg, redAlienImg, alienBullet;
var gameOver, gameOverImg, restart, restartImg;
var playerBulletsGroup, aliensGroup, alienBulletsGroup, leftAliensGroup, rightAliensGroup;

function preload() {
  playerImg = loadImage("./assets/playerImg.png");

  blueAlienImg = loadImage("./assets/blueAlienImg.png");
  greenAlienImg = loadImage("./assets/greenAlienImg.png");
  redAlienImg = loadImage("./assets/redAlienImg.png");

  gameOverImg = loadImage("./assets/gameOverImg.png");
  //restartImg = loadImage("./assets/restartImg.png");

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  player = createSprite(window.innerWidth/2, window.innerHeight/1.15);
  player.addImage(playerImg);
  player.scale = 0.2;

  gameOver = createSprite(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.75;
  gameOver.visible = false;

  playerBulletsGroup = new Group();
  aliensGroup = new Group();
  alienBulletsGroup = new Group();
  leftAliensGroup = new Group();
  rightAliensGroup = new Group();

  canvasW = window.innerWidth;
  canvasH = window.innerHeight;

  play = 0;
  end = 1;
  gameState = play;

  let fs = fullscreen();
  //let value = 0;

  console.log("Press Left and Right arrow keys to move your Space-Ship");
  console.log("Press Space to deploy Missiles at The aliens");
  console.log("Press F to fullscreen your Game for the best experince");
}

function draw() {
  if (gameState === play) {
    playerMovement();
    spawnAliens();

  }

  else if (gameState === end) {
    gameOver.visible = true;
    
  }

  coolStuff();
  resize();
  background(10,5,4);
  drawSprites();
}

function reset() {
  gameOver.visible = false;
  player.x = window.innerWidth/2;

  gameState = play;
}

function resize() {
  if (canvasW < window.innerWidth || canvasW > window.innerWidth || canvasH < window.innerHeight || canvasH > window.innerHeight) {
    resizeCanvas(window.innerWidth, window.innerHeight);
    console.log("canvas resized");
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
  }
}

function playerMovement() {
  if (keyDown("left") && player.x >= 0) {
    player.x = player.x - 15;
  }

  if (keyDown("right") && player.x <= window.innerWidth) {
    player.x = player.x + 15;
  }
}

function keyTyped() {
  if (key === " ") {
    playersBullets();
  }
}

function playersBullets() {
  if (gameState === play) {
    var playerBullet = createSprite(player.x, player.y, window.innerWidth/70, window.innerHeight/15);
    playerBullet.setCollider("rectangle", 0, 0, window.innerWidth/70, window.innerHeight/15);
    playerBullet.velocityY = - 15;
    playerBullet.debug;
    playerBulletsGroup.add(playerBullet);
    playerBullet.lifetime = 750;
  }
}

function spawnAliens() {
  if (frameCount%150===0) {
    var leftAlien = createSprite(-10, random(30, window.innerHeight/2), 40, 40);
    leftAlien.setCollider("rectangle", 0, 0, 200, 200);
    switch(Math.round(random(2, 3))) {
      case 1:
      leftAlien.addImage(blueAlienImg);
      leftAlien.scale = 0.3;
      break;

      case 2:
      leftAlien.addImage(greenAlienImg);
      leftAlien.scale = 0.25;
      break;

      case 3:
      leftAlien.addImage(redAlienImg);
      leftAlien.scale = 0.08;
      break;

      default:
      break;
    }
    leftAlien.velocityX = 4;
    aliensGroup.add(leftAlien);
    leftAliensGroup.add(leftAlien);
  }

  if (frameCount%160===0) {
    var rightAlien = createSprite(window.innerWidth + 10, random(30, window.innerHeight/2), 40, 40);
    rightAlien.setCollider("rectangle", 0, 0, 200, 200);
    switch(Math.round(random(2, 3))) {
      case 1:
      rightAlien.addImage(blueAlienImg);
      rightAlien.scale = 0.3;
      break;

      case 2:
      rightAlien.addImage(greenAlienImg);
      rightAlien.scale = 0.25;
      break;

      case 3:
      rightAlien.addImage(redAlienImg);
      rightAlien.scale = 0.08;
      break;

      default:
      break;
    }
    rightAlien.velocityX = -4;
    aliensGroup.add(rightAlien);
    rightAliensGroup.add(rightAlien);
  }
}



function coolStuff() {
  if (keyDown("f")) {
    let fs = fullscreen();
    fullscreen([fs]);
  }

  noCursor();
}