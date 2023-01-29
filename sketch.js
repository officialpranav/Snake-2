//import * as Snake from "snake.js";

function setup() {
  createCanvas(900, 900);
  frameRate(30);
  noStroke();
  textSize(10);
  
  notMoved = true;
  snake = new Snake(50, 50, 5, true);
  fruitCoords = [floor(random(0, snake.getBounds()[0])), floor(random(0, snake.getBounds()[1]))];
  snakeW = width/snake.getBounds()[0];
  snakeH = height/snake.getBounds()[1];
  score = 5;
}

function draw() {
  notMoved = true;
  background(22);
  let snakeCoords = snake.getBodyCoords();
  fill("black");
  text("Length: " + score, 10,10);

  fill("yellow");
  rect(fruitCoords[0]*snakeW, fruitCoords[1]*snakeH, snakeW, snakeH);
  fill("white");
  for(let i = 0; i<snakeCoords.length; i++){
    rect(snakeCoords[i][0]*snakeW, snakeCoords[i][1]*snakeH, snakeW, snakeH);
  }


  if(snakeCoords[0][0]==fruitCoords[0] && snakeCoords[0][1]==fruitCoords[1]){
    if(snake.addBodyAndMove(snake.snakeDirection)!=1){
      textSize(30);
      text("GAME OVER", width-50, height)
      noLoop();
    }
    updateFruitLocation();
    score++;
    console.log("true!");
  } else {
    if(snake.move(snake.snakeDirection)!=1){
      textSize(100);
      text("GAME OVER", (width/2)-300, height/2)
      noLoop();
    }
  }
  console.clear();
  snake.drawGame();
}

function keyPressed(){
  if(notMoved){
    switch(keyCode){
      case LEFT_ARROW:
        notMoved = false;
        snake.setDirection("left");
        break;
      case RIGHT_ARROW:
        notMoved = false;
        snake.setDirection("right");
        break;
      case UP_ARROW:
        notMoved = false;
        snake.setDirection("up");
        break;
      case DOWN_ARROW:
        notMoved = false;
        snake.setDirection("down");
        break;
    }
  }
}

function updateFruitLocation(){
  fruitCoords = [floor(random(0, snake.getBounds()[0])), floor(random(0, snake.getBounds()[1]))];
}
