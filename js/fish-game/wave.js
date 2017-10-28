function Wave() {

}

var waves = [];


Wave.prototype = {
    init:function (x,y) {
      this.x = x;
      this.y = y;
      this.r = 10;
      this.a = 0;
    },
    draw:function () {
        ctx2.save();
        ctx2.strokeStyle =  "rgba(150,200,255,"+(this.a)+")";
        ctx2.lineWidth = "2";
        ctx2.shadowColor = "white";
        ctx2.shadowBlur = "10";
        ctx2.beginPath();
        ctx2.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        ctx2.closePath();
        ctx2.stroke();
        this.update();
        ctx2.restore();
    },
    update:function () {
        if(this.r<50){
            this.a = 1 - this.r/50;
            this.r += dtime*0.04;
        }
        if(waves.length>10){
            waves.shift();
        }
    }
};

