var PLAY = 1, END = 0, gameState = PLAY;
var ground, invisibleGround
var monkey , monkey_running,monkey_collided;
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survival=0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  
 monkey=createSprite(80,315,20,20); 
  monkey.addAnimation("running",monkey_running);
  
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-6;
  ground.x=ground.width/2;
  console.log(ground.x)

bananaGroup = new Group();
  obstacleGroup = new Group();
  
  survival =0;
}
function draw() {
  background("white");
  fill("blue")
  text("Survival time: "+ survival, 200,50);
  bananaF();
  obstacleF();
 
  if(gameState === PLAY){
    survival = survival+Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*survival/100);
    
    if(keyDown("space") && monkey.y >= 189) {
      monkey.velocityY = -12;
    }
     monkey.velocityY = monkey.velocityY + 0.9
     monkey.collide(ground);
  if(ground.x<0){
  ground.x=ground.width/2
}
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
 else if(gameState === END){
     ground.velocityX=0;
      monkey.velocityY=0;
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
  }
  
drawSprites();
 
}
  
function bananaF(){
  if(frameCount % 100 === 0){
     banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-3;
    banana.lifetime=400;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth +1;
    bananaGroup.add(banana);
    
  }
}

function obstacleF(){
 if(frameCount % 80 === 0){
   var obstacle = createSprite(600,310,10,40);
   obstacle.velocityX = -4;
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacleGroup.add(obstacle);
 } 
}






