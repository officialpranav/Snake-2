//import * as Snake from "snake.js";

let resetButton;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);
  noStroke();
  textSize(25);
  
  notMoved = true;
  snake = new Snake(70, floor((70/window.innerWidth)*window.innerHeight), 5, true);
  fruitCoords = [floor(random(0, snake.getBounds()[0])), floor(random(0, snake.getBounds()[1]))];
  snakeW = width/snake.getBounds()[0];
  snakeH = height/snake.getBounds()[1];
  score = 5;

  resetButton = createButton("Play Again");
  resetButton.position(10,40);
  resetButton.mousePressed(reset);
}

function draw() {
  notMoved = true;
  background(22);
  let snakeCoords = snake.getBodyCoords();
  fill("white");
  text("Length: " + score, 10,25);

  fill("yellow");
  rect(fruitCoords[0]*snakeW, fruitCoords[1]*snakeH, snakeW, snakeH);
  fill("white");
  for(let i = 0; i<snakeCoords.length; i++){
    rect(snakeCoords[i][0]*snakeW, snakeCoords[i][1]*snakeH, snakeW, snakeH);
  }


  if(snakeCoords[0][0]==fruitCoords[0] && snakeCoords[0][1]==fruitCoords[1]){
    if(snake.addBodyAndMove(snake.snakeDirection)!=1){
      textSize(30);
      text("GAME OVER", width-50, height);
      textSize(25);
      noLoop();
    }
    updateFruitLocation();
    score++;
    console.log("true!");
  } else {
    if(snake.move(snake.snakeDirection)!= 1){
      textSize(100);
      text("GAME OVER", (width/2)-300, height/2);
      textSize(25);
      noLoop();
    }
  }
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

function reset(){
  notMoved = true;
  snake = new Snake(70, floor((70/window.innerWidth)*window.innerHeight), 5, true);
  fruitCoords = [floor(random(0, snake.getBounds()[0])), floor(random(0, snake.getBounds()[1]))];
  snakeW = width/snake.getBounds()[0];
  snakeH = height/snake.getBounds()[1];
  score = 5;
  loop();
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
