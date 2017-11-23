
function Firework() {
    //每个烟花爆炸后的粒子
    this.paiticles = [];
    //每个烟花爆炸前也是一个粒子
    this.firework = new Particle(random(width),height,false);
    //是否爆炸
    this.exploded = false;
    //爆炸后透明度
    this.opacity = 255;

    this.color = [Math.floor(random(255)),Math.floor(random(255)),Math.floor(random(255))];
    this.update = function () {
        if(!this.exploded){
            stroke(this.color[0],this.color[1],this.color[2]);
            strokeWeight(4);
            //最高处爆炸
            if(this.firework.vel.y>=0){
                this.exploded = true;
                this.explode();
                return;
            }
            this.firework.applyForce(gravity);
            this.firework.update();
        }else{
            stroke(this.color[0],this.color[1],this.color[2],this.opacity);
            strokeWeight(2);
            this.opacity -= 6.4;
            for(var i=this.paiticles.length-1;i>=0;i--){
                if(this.opacity<=0){
                    this.paiticles.splice(i,1);
                }else{
                    this.paiticles[i].applyForce(gravity);
                    this.paiticles[i].vel.mult(0.96);
                    this.paiticles[i].update();
                }
            }
        }
    };

    this.explode = function () {
        for(var i=0;i<70;i++){
            var p = new Particle(this.firework.pos.x,this.firework.pos.y,true);
            this.paiticles.push(p);
        }
    };
}