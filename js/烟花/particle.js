

function Particle(x,y,exploded) {
    //初始位置
    this.pos = createVector(x,y);
    //速度
    if(!exploded){
        this.vel = createVector(0,-(Math.random()*5+12));
    }else{
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(4,10));
    }
    //加速度
    this.acc = createVector(0,0);


    this.applyForce = function (force) {
        this.acc.add(force);
    };

    this.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.show();
    };

    this.show = function () {
        point(this.pos.x,this.pos.y);
    }
}

