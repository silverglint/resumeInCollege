function FeedW() {

}

var Fwaves = [];

FeedW.prototype = {
    init:function (x,y) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.a = 0;
    },
    draw:function () {
        ctx2.save();
        ctx2.strokeStyle =  "rgba(255,145,35,"+(this.a)+")";
        ctx2.lineWidth = "3";
        ctx2.shadowColor = "red";
        ctx2.shadowBlur = "5";
        ctx2.beginPath();
        ctx2.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        ctx2.closePath();
        ctx2.stroke();
        this.update();
        ctx2.restore();
    },
    update:function () {
        if(this.r<100){
            this.a = 1 - this.r/100;
            this.r += dtime*0.05;
        }
        if(waves.length>10){
            Fwaves.shift();
        }
    }
};