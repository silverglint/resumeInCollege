function Dust() {

}

var dusts = [];
var dustsImg = [];
for(var i=0;i<7;i++){
    dustsImg[i] = new Image();
    dustsImg[i].src = "../img/fish-game/dust"+i+".png";
}

Dust.prototype = {
        init:function () {
            this.x = Math.random()*W;
            this.y = Math.random()*H;
            this.No = Math.floor(Math.random()*7);
            this.l = 0;
            this.deg = 0;
            this.amp = ( 1 + this.No / 6) * 20;
        },
      draw:function () {
          this.deg += dtime*0.001;
          this.l = Math.sin(this.deg);
          //this.x = this.x+this.l*this.amp;
          ctx1.drawImage(dustsImg[this.No],this.x+this.l*this.amp,this.y);

      }
};


for(var i=0;i<30;i++){
    var dust = new Dust();
    dust.init();
    dusts.push(dust);
}