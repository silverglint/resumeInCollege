function Score() {
    this.num = 0;
    this.double = 1;
    this.score = 0;
    this.totalScore = 0;
    this.alpha = 0;
}

Score.prototype = {
    init:function () {
        this.num = 0;
        this.double = 1;
        this.score = 0;
    },
    draw:function () {
        ctx2.save();
        ctx2.fillStyle = "white";
        ctx2.font = "30px Verdana";
        ctx2.textAlign = "center";
        ctx2.shadowBlur = "10";
        ctx2.shadowColor = "white";
        ctx2.fillText("score:  "+this.totalScore,W/2,40);
        ctx2.restore();
    },
    addscore:function () {
        this.score = this.double*this.num;
        this.totalScore += this.score;
        this.init();
    },
    gameover:function () {
        ctx2.save();
        this.alpha += dtime*0.0005;
        if(this.alpha>1){
            this.alpha=1;
        }
        ctx2.shadowBlur = "30";
        ctx2.shadowColor = "deepskyblue";
        ctx2.fillStyle = "rgba(255,255,255,"+(this.alpha)+")";
        ctx2.font = "60px Verdana";
        ctx2.textAlign = "center";
        ctx2.fillText("GAMEOVER",W/2,H/2);
        ctx2.restore();
    }
};