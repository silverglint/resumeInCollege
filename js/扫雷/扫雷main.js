
var grid;
var cols,rows;
var w = 60;
var bees = 10;
var block = 0;

function make2DArrays(cols,rows) {
    var arr = new Array(cols);
    for(var i=0;i<cols;i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

function mousePressed() {

    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            if(grid[i][j].contains(mouseX,mouseY)){
                grid[i][j].reveal();

                if(grid[i][j].bee){
                    gameOver();
                }
                if(block==bees){
                    setTimeout(function () {
                        alert('win')
                    },100)
                }
            }
        }
    }
}
function setup() {
  // put setup code here
    createCanvas(601,601);

    cols = Math.floor(width/w);
    rows = Math.floor(height/w);
    block = cols*rows;
    grid = make2DArrays(cols,rows);
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j] = new Cell(i,j,w);
        }
    }



    for(var n=0;n<bees;n++){
        var i = Math.floor(Math.random()*cols);
        var j = Math.floor(Math.random()*rows);
        if(grid[i][j].bee === true){
            n--;
        }
        grid[i][j].bee = true;
    }

    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].countBee();
        }
    }
}

function gameOver() {
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].revealed = true;
        }
    }
    setTimeout(function () {
        alert('gameOver')
    },100)
}


function draw() {
  // put drawing code here

    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].show();
        }
    }
}