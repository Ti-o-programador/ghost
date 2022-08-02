var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostJumpImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostJumpImg = loadImage("ghost-jumping.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("standing", ghostImg );
  ghost.addImage("jumping", ghostJumpImg );
  ghost.scale = 0.3
  ghost.setCollider("circle", 0,0,150);
  doorsGroup = new Group(); 
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background("black");
  
  if(gameState === "play"){

    if(tower.y > 400){
      tower.y = 300;
    }
  
    if(keyDown("space")){
      ghost.velocityY = -5;
      ghost.changeImage("jumping");
    }
    else{
      ghost.changeImage("standing");
    }
    
    ghost.velocityY += 0.6;
  
    if(keyDown("right_arrow")) {
      ghost.x += 5;
    } 

    if(keyDown("left_arrow")) {
      ghost.x -= 5;
    }

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(ghost.y > 600){
      gameState = "end";
      ghost.destroy();
    }

    spawnDoors();
  }
  else if(gameState === "end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over", 230, 250);
      spookySound.play();
      spookySound.setVolume(0.01)
  }

  drawSprites();
}

function spawnDoors() {
  if (frameCount % 90 === 0) {
    door = createSprite(200, -50);
    door.addImage(doorImg);
    door.velocityY = 4;
    door.x = Math.round(random(120, 400));
    door.lifetime = 500;
    
    climber = createSprite(200, 10);
    climber.addImage(climberImg);

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //ghost.debug = true;

    ghost.depth = door.depth;
    ghost.depth += 1

    invisibleBlock.velocityY = climber.velocityY = door.velocityY;
    invisibleBlock.x = climber.x = door.x;
    invisibleBlock.lifetime = climber.lifetime = door.lifetime;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
