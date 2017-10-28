function Smallf() {
    //this.body = new Image();
    //this.eye = new Image();

}
var sTail = [];
for(var i=0;i<8;i++){
    sTail[i] = new Image();
    sTail[i].src = "../img/fish-game/babyTail"+i+".png";
}

var sEye = [];
for(var i=0;i<2;i++){
    sEye[i] = new Image();
    sEye[i].src = "../img/fish-game/babyEye"+i+".png";
}

var sBody = [];
for(var i=0;i<20;i++){
    sBody[i] = new Image();
    sBody[i].src = "../img/fish-game/babyFade"+i+".png";
}

Smallf.prototype = {
    init:function () {
        //this.body.src = "../img/fish-game/baby.png";
        //this.eye.src = "../img/fish-game/babyEye0.png";
        this.inter = (Math.random()*2+1)*600;
        this.tCount = 0;
        //this.tail.src = "../img/fish-game/babyTail0.png";
        this.x = W/2-90;
        this.y = H/2;
        this.angle = 5;
        this.eCount = 0;
        this.timer = 0;
        this.bCount = 0;
        this.btimer = 0;
    },
    draw:function () {

        this.x = lerpDistance(bigf.x,this.x,.992);
        this.y = lerpDistance(bigf.y,this.y,.992);
        var dx = bigf.x-this.x;
        var dy = bigf.y-this.y;
        var deg = Math.atan2(dy,dx)+Math.PI;
        this.angle = lerpAngle(deg,this.angle,0.6);
        this.timer += dtime;
        this.tCount++;
        if(this.tCount===8){
            this.tCount=0;
        }
        if(this.timer>this.inter){
            this.eCount++;
            if(this.eCount===2){
                this.eCount=0;
                this.inter = Math.random()*2000+1500;
            }else{
                this.inter = 200;
            }
            this.timer = 0;
        }
        this.btimer += dtime;
        if(this.btimer>300){
            this.bCount++;
            this.btimer %= 300;
            if(this.bCount>19){
                gameover = true;
                this.bCount=19;
            }
        }

        ctx2.save();
        ctx2.translate(this.x,this.y);
        ctx2.rotate(this.angle);
        ctx2.drawImage(sTail[this.tCount], -sTail[this.tCount].width/2+24, -sTail[this.tCount].height/2);
        ctx2.drawImage(sBody[this.bCount], -sBody[this.bCount].width/2, -sBody[this.bCount].height/2);
        ctx2.drawImage(sEye[this.eCount], -sEye[this.eCount].width/2, -sEye[this.eCount].height/2);

        ctx2.restore();
    }
};