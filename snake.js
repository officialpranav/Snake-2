class Snake{
    //Maximum x and y coords
    xBound;
    yBound;
    snakeDirection = "down";
    doSnakeCollisions = false;
    grid = [];
    bodyCoords = [];
    fruitCoords;
    

    constructor(xBound, yBound, initialSnakeLength, useGrid){
        this.xBound = xBound;
        this.yBound = yBound;
        for(let i = initialSnakeLength-1; i>-1; i--){
            this.bodyCoords.push([0,i])
        }
        if(useGrid)this.initGrid();
        this.fruitCoords = [floor(random(0, xBound)), floor(random(0, yBound))]
    }

    initGrid(){
        let row = [];

        //create row
        for(let i = 0; i<this.xBound; i++){
            row.push("- ");
        }

        //push yBound number of rows into grid
        for(let i = 0; i<this.yBound; i++){
            this.grid.push(row);
        }
    }

    move(direction){
        /*
        Moves snake in desired direction
        If snake is able to move in direction, returns 1
        If snake is going to collide if moved in desired direction, returns 0 and doesnt move snake
        */

        //store previous location of head
        let temp = Array.from(this.bodyCoords[0]);

        this.snakeDirection = direction;

        //move head in direction
        switch(this.snakeDirection){
            case "down":
                this.bodyCoords[0][1]++;
                break;
            case "up":
                this.bodyCoords[0][1]--;
                break;
            case "left":
                this.bodyCoords[0][0]--;
                break;
            case "right":
                this.bodyCoords[0][0]++;
                break;
        }

        if(this.checkSnakeCollision() || this.bodyCoords[0][0]>this.xBound-1 || this.bodyCoords[0][0]<0 || this.bodyCoords[0][1]>this.yBound-1 || this.bodyCoords[0][1]<0){
            //if any of the above conditions are true, snake should not move
            this.bodyCoords[0] = temp;
            //console.log("Collision! did not move " + this.snakeDirection);
            return 0;
        } else {
            //move parts of body one index up (e.g. body at index 1 becomes body at index 2)
            for(let i = this.bodyCoords.length-1; i>0; i--){
                this.bodyCoords[i] = this.bodyCoords[i-1];
            }
    
            //set 2nd element in array to the location of the previous head
            this.bodyCoords[1] = temp;        
            //console.log("moved " + this.snakeDirection);
            return 1;            
        }
    }

    addBodyAndMove(direction){
        let temp = this.bodyCoords[this.bodyCoords.length-1];
        if(this.move(direction)===1){
            this.bodyCoords.push(temp);
            return 1;
        }
        return 0;
    }

    updateFruitCoords(){
        this.fruitCoords = [floor(random(0, xBound)), floor(random(0, yBound))]
    }

    checkSnakeCollision() {
        if(!this.doSnakeCollisions){
            return false;
        }

        let snakeHeadX = this.bodyCoords[0][0];
        let snakeHeadY = this.bodyCoords[0][1];

        for(let i = 1; i<this.bodyCoords.length; i++){
            if(snakeHeadX === this.bodyCoords[i][0] && snakeHeadY === this.bodyCoords[i][1]){
                return true;
            }
        }
        return false;
    }

    drawGame(){
        let gridWithSnake = JSON.parse(JSON.stringify(this.grid));
        let gridString = "";

        this.bodyCoords.forEach(element => {
            gridWithSnake[element[1]][element[0]] = "# ";
        });

        gridWithSnake[this.bodyCoords[0][1]][this.bodyCoords[0][0]] = "O " 

        
        gridWithSnake.forEach(element => {
            let rowString = "";
            element.forEach(item => {
                rowString+=item;
            });
            gridString += rowString + "\n";
        });
        print(gridString);
    }

    setDirection(direction){
        if(
            !(
            (this.snakeDirection === "left" && direction === "right") ||
            (this.snakeDirection === "right" && direction === "left") ||
            (this.snakeDirection === "up" && direction === "down") ||
            (this.snakeDirection === "down" && direction === "up")
            )
        ){this.snakeDirection = direction;}
    }

    getFruitCoords(){
        return this.fruitCoords;
    }

    getDirection(){
        return this.direction;
    }

    getBodyCoords(){
        return(this.bodyCoords);
    }

    getBounds(){
        return[this.xBound, this.yBound];
    }

    getGrid(){
        return(this.grid);
    }

}