function Cell(i,j,w) {
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*w;
    this.w = w;
    this.aroundbee = 0;
    this.bee = false;
    this.revealed = false;
}

Cell.prototype.show = function () {
    //stroke为颜色rgb格式，strokeWidth为描边宽度
    stroke(0);
    noFill();
    rect(this.x,this.y,this.w,this.w);

    if(this.revealed){
       if(this.bee){
           fill(160);
           ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w*0.5,this.w*0.5);
       }else{
           fill(220);
           rect(this.x,this.y,this.w,this.w);
           if(this.aroundbee>0){
               textAlign(CENTER);
               textSize(30);
               fill(0);
               text(this.aroundbee,this.x+this.w*0.5,this.y+this.w*0.5+12);
           }
       }
    }
};

Cell.prototype.countBee = function () {
    if(this.bee){
        return;
    }
    var count = 0;


    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var around = grid[i][j];
                if (around.bee) {
                    console.log('run')
                    count++;
                }
            }
        }
    }
    console.log(count)
    this.aroundbee = count;
    return count;
};

Cell.prototype.contains = function (x,y) {
    return (x>this.x&&x<this.x+this.w&&y>this.y&&y<this.y+this.w);
};

Cell.prototype.reveal = function () {
    this.revealed = true;
    block--;
    if(this.aroundbee===0){
        this.floorFill();
    }

};




Cell.prototype.floorFill = function () {
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var around = grid[i][j];
                if (!around.bee && !around.revealed) {
                    around.reveal();
                }
            }
        }
    }
};