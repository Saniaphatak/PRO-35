var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position;
var balloonPos;
var edges;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {

  //connect code to database
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  //location from where to get balloon position
  balloonPos = database.ref("balloon/position");
  //update the values from readposition function
  balloonPos.on("value", readPosition, showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updatePosition(-10, 0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updatePosition(10, 0);
  }
  else if(keyDown(UP_ARROW)){
    //write code to move air balloon in up direction
    updatePosition(0, -10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    //write code to move air balloon in down direction
    updatePosition(0, 10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale + 0.01;
  }

  edges = createEdgeSprites();
  balloon.collide(edges);
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}

//update the position of the balloon in the database
function updatePosition(x,y){
  database.ref('balloon/position').set({
    "x" : position.x + x,
    "y" : position.y + y,
  })
  
}

//read the position from the database
function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

//show an error if any occurred
function showError(){
  console.log("ERROR");
}
