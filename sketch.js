var PLAY = 1;
var END = 0;
var gameState = PLAY;

//creating variables
var plane, planeImg;
var back, backImg;
var obstacle, obstacleImg, obstaclesGroup;
var bullet, bulletImg;
var shot,shotImg;
var shotNum = 5;
var gameState = "play";
var lives = 3;
var restart;
var backSound;
var bulletCollectSound;
var gameOverSound;

//loading the images and sounds in preload function
function preload(){
  planeImg = loadImage("fly_1.png")
  backImg = loadImage("backImg.jpg")
  obstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png","obstacle5.png","obstacle6.png","obstacle7.png","obstacle8.png");
  bulletImg = loadAnimation("bullet1.png","bullet2.png","bullet3.png","bullet4.png","bullet5.png");
  planeDead = loadImage("dead.png")
  shotImg = loadImage("shot.png")
  restartImg = loadImage("restart.png")
 backSound = loadSound("background 2.mp3")
 bulletCollectSound = loadSound("coins.wav")
 gameOverSound = loadSound("game over.wav")
}
function setup() {

  //backGround Sound
  backSound.loop()
  backSound.setVolume(0.4);

  //creating canvas
  createCanvas(1000,500);

  
  back = createSprite(500,250);
  back.addImage("back",backImg);
  back.scale = 2

  //creating sprite for restarting the game
  restart = createSprite(300,140)
  restart.addImage(restartImg);
  restart.scale = 0.5;
  score = 0;
 
  //creating plane sprite
  plane = createSprite(120, 180, 50, 50);
  plane.addImage("plane",planeImg)
  plane.addImage("dead",planeDead)
  plane.scale = 0.20

  // creating new groups
  obstaclesGroup = new Group()

  bulletsGroup = new Group()

  score = 0;

  shotsGroup = new Group()


}

function draw() {
  background(0);
  
  //making game states
  if (gameState==="play"){

  score = score+Math.round(getFrameRate()/60)

   back.velocityX = -2;
   if(back.x < 400){
      back.x = 500


    }

    restart.visible = false;

   spawnObstacles();

   spawnShots();

   if(keyDown("space")){
     bullet = createSprite(140,180)
     bullet.addAnimation("bullet",bulletImg);
     bullet.y = plane.y;
     bullet.scale = 0.6;
     bullet.velocityX = 4;
     bulletsGroup.add(bullet)
     if(shotNum > 0){
     shotNum = shotNum - 1;
     
     }

     else {
       gameState = "end";
       gameOverSound.play();
     }
     
   }

   //changing animation of plane
   if(obstaclesGroup.isTouching(plane)){
   plane.changeAnimation("dead",planeDead);
   
   obstaclesGroup[0].destroy();

   if (lives >= 1){
     lives = lives-1;
   }
   if(lives===0){
     gameState = "end";
     gameOverSound.play();
   }

   restart.visible = true;
   
   }

   //plane movement
   if (keyDown(UP_ARROW)){
    plane.y = plane.y-3;
   }

   if (keyDown(DOWN_ARROW)){
     plane.y = plane.y+3  
    }

    if (obstaclesGroup.isTouching(bulletsGroup)){
      obstaclesGroup[0].destroy();
    }

    if (shotsGroup.isTouching(plane)){
      shotsGroup[0].destroy();
      shotNum = shotNum + 1;
      bulletCollectSound.play();
    }
  
  
  drawSprites();

  //adding text to the game
  textSize(20);
  fill("white");
  text("SCORE: "+ score, 850,50);
  text("BULLETS: "+ shotNum, 50,50);
  text("LIVES: "+ lives, 450,50);
  }
  else if(gameState==="end"){

    textSize(50);
    fill("red");
    text("GAME OVER!!!", 340,250);
    textSize(25);
    fill("white");
    text("FINAL SCORE: " + score, 400,300);

    
    textSize(30)
    fill("yellow")
    text("Press 'R' to Restart", 470,450);
    
    if(keyDown("r")){
      gameState = "play";
      shotNum = 5;
      score = 0;
      lives = 3;
      plane.changeAnimation("plane");
    }
    if(backSound.isPlaying()){
        backSound.stop();
    }
  }

  
}


//spawning obstacles
function spawnObstacles(){
       if(frameCount%100===0){
         obstacle = createSprite(1000,180);
         obstacle.velocityX = -3;
         obstacle.addAnimation("flyingBird", obstacleImg);
         obstacle.scale = 0.7
         obstacle.y = Math.round(random(70,250))
         obstaclesGroup.add(obstacle);
       }

}

//spawning shots
function spawnShots(){
       if(frameCount%125===0){
       shot = createSprite(1000,130,20,10);
       shot.velocityX = -4;
       shot.y = Math.round(random(80,350))
       shotsGroup.add(shot);
       shot.addImage("shot",shotImg);
       shot.scale = 0.1

       }

}

