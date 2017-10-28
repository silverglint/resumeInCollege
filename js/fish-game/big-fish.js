function bigF() {
    //this.body = new Image();
    //this.eye = new Image();
    //this.tail = new Image();
}
var bTail = [];
for(var i=0;i<8;i++){
    bTail[i] = new Image();
    bTail[i].src = "../img/fish-game/bigTail"+i+".png";
}

var bEye = [];
for(var i=0;i<2;i++){
    bEye[i] = new Image();
    bEye[i].src = "../img/fish-game/bigEye"+i+".png"
}

var bBody = [],oBody = [];
for(var i=0;i<8;i++){
    bBody[i] = new Image();
    oBody[i] = new Image();
    oBody[i].src = "../img/fish-game/bigSwim"+i+".png";
    bBody[i].src = "../img/fish-game/bigSwimBlue"+i+".png";
}

bigF.prototype = {
    init:function () {
        //this.body.src = "../img/fish-game/big.png";
        //this.eye.src = "../img/fish-game/bigEye0.png";
        //this.tail.src = "../img/fish-game/bigTail0.png";
        this.x = W/2;
        this.y = H/2;
        this.angle = 5;
        this.Tcount = 0;
        this.eCount = 0;
        this.timer = 0;
        this.inter = (Math.random()*2+1)*1000;
        this.bCount = 0;
        this.oCount = 0;
    },
    draw:function () {
        var dx = mx-this.x;
        var dy = my-this.y;
        var deg = Math.atan2(dy,dx)+Math.PI;
        //角度不断趋近于鼠标
        this.angle = lerpAngle(deg,this.angle,0.6);
        //鱼位置不断趋近于鼠标
        this.x = lerpDistance(mx,this.x,0.98);
        this.y = lerpDistance(my,this.y,0.98);
        this.timer += dtime;
        this.Tcount++;
        if(this.Tcount===8){
            this.Tcount = 0;
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
        if(this.oCount>7){
            this.oCount = 7;
        }
        if(this.bCount>7){
            this.bCount = 7;
        }

        //存画布
        ctx2.save();
        ctx2.translate(this.x,this.y);
        //旋转画布
        ctx2.rotate(this.angle);

        //画出鱼的位置
        ctx2.drawImage(bTail[this.Tcount], -bTail[this.Tcount].width/2+30, -bTail[this.Tcount].height/2);

        if(score.double == 1){
            ctx2.drawImage(oBody[this.oCount], -oBody[this.oCount].width/2, -oBody[this.oCount].height/2);
        }else {
            ctx2.drawImage(bBody[this.bCount], -bBody[this.bCount].width/2, -bBody[this.bCount].height/2);
        }

        ctx2.drawImage(bEye[this.eCount], -bEye[this.eCount].width/2, -bEye[this.eCount].height/2);
        //恢复画布
        ctx2.restore();
    }

};