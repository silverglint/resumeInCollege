function Fruit() {
    this.orange = new Image();
    this.blue = new Image();
    this.fruitTyple = "";
}

var fruitnum = 15;
var fruits = [];

Fruit.prototype = {
    init:function () {
        this.orange.src = "../img/fish-game/fruit.png";
        this.blue.src = "../img/fish-game/blue.png";
        this.aniId = Math.floor(Math.random()*aninum);
        this.x = anis[this.aniId].headx;
        this.y = anis[this.aniId].heady;
        this.r = 0;
        this.wr = 30;
        this.rspeed = Math.random()*0.03+0.003;
        this.yspeed = Math.random()*0.1+0.02;
        var rand = Math.random();
        if(rand<0.2){
            this.fruitTyple = this.blue;
        }else {
            this.fruitTyple = this.orange;
        }
    },
    draw:function () {
        ctx1.drawImage(this.fruitTyple,this.x-this.r/2,this.y-this.r/2,this.r,this.r);
        this.update();
    },
    update:function () {
        if(this.r<=12){
            this.x = anis[this.aniId].headx;
            this.y = anis[this.aniId].heady;
            this.r += dtime*this.rspeed;
        }else{
            this.y -= dtime*this.yspeed;
        }


        if(this.y<0){
            this.init();
        }
    },
    wave:function () {
        var x = this.x;
        var y = this.y;
        this.wr += dtime*0.01;
        ctx2.strokeStyle = "deepskyblue";
        ctx2.beginPath();
        ctx2.arc(x,y,this.wr,0,Math.PI*2,true);
        ctx2.closePath();
        ctx2.stroke();
    }
};



for(var i=0;i<fruitnum;i++){

    var fruit = new Fruit();
    fruit.init();
    fruits.push(fruit);

}
