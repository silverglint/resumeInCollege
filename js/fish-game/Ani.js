//海葵
function Ani() {

}
var aninum = 50;
Ani.prototype = {

    init:function () {
        this.rootx = rndi2(0,W);
        this.heady = H-200+Math.random()*50;
        this.amp = rndi2(20,80);
        this.deg = rndi2(0,Math.PI/2);
        this.l = 0;
        this.headx = this.rootx;
    },
    draw:function () {
        this.deg+=dtime*0.001;
        ctx1.beginPath();
        this.l = Math.sin(this.deg);
        this.headx = this.rootx+this.l*this.amp;
        ctx1.moveTo(this.rootx,H);
        ctx1.quadraticCurveTo(this.rootx,H-100,this.headx,this.heady);
        ctx1.stroke();
    }
};

var anis = [];

for(var i=0;i<aninum;i++){
    var ani = new Ani();
    ani.init();
    anis.push(ani);
}
