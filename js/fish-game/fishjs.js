var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var ctx1 = canvas1.getContext("2d");
var ctx2 = canvas2.getContext("2d");
var H = canvas1.height = canvas2.height = 600;
var W = canvas1.width = canvas2.width = 800;
var ntime,dtime,otime;
var bg;
var mx=W/2,my=H/2;
var bigf,smaf;
var score;
var gameover = false;
var x,y,Fx,Fy;
var wave,Fwave;

$(function () {

    function init() {
        //画出背景图
        bg = new Image();
        bg.src =  "../img/fish-game/background.jpg";
        ctx1.drawImage(bg,0,0);

        //创建时间
        otime = Date.now();

        //创建大鱼并初始化
        bigf = new bigF();
        bigf.init();

        //创建小鱼并初始化
        smaf = new Smallf();
        smaf.init();

        //创建分数
        score = new Score();

        //dust = new Dust();
        //var dust = new mDust();
        //dust.init();
        /*dust = new mDust();
        dust.init();
        console.log(dust);
        for(var i=0;i<7;i++){
            dusts[i] = new Image();
            dusts[i].src = "../img/fish-game/dust"+i+".png";
        }*/
    }
    init();

    //帧动画
    function paint() {

        ctx1.drawImage(bg,0,0);
        ntime = Date.now();
        dtime = ntime-otime;
        if(dtime>40){
            dtime=40;
        }
        //画出海葵
        ctx1.save();
        ctx1.lineWidth = 18;
        ctx1.lineCap = "round";
        ctx1.globalAlpha = 0.6;
        ctx1.strokeStyle = "#3b154e";
        for(var i=0;i<anis.length;i++){
            anis[i].draw();
        }
        ctx1.restore();


        //画出食物
        for(var i=0;i<fruits.length;i++){
            fruits[i].draw();
        }

        //画出大鱼
        ctx2.clearRect(0,0,W,H);
        bigf.draw();
        smaf.draw();
        score.draw();
        eat();
        feed();
        window.requestAnimFrame(paint);
        otime = ntime;

        if(gameover){
            score.gameover();
        }

        //遍历波纹的容器，并画出每一个
        for(var i=0;i<waves.length;i++){
            waves[i].draw();
        }
        for(var i=0;i<Fwaves.length;i++){
            Fwaves[i].draw();
        }
        //wave.draw();

        for(var i=0;i<dusts.length;i++){
            dusts[i].draw();
        }
        //dust.draw();
    }
    paint();

    //监听画布2鼠标位置，让大鱼获得其位置
    canvas2.onmousemove = function (event) {
        if(!gameover){
            mx = event.offsetX;
            my = event.offsetY;
        }
    };

    function eat() {
        if(!gameover){
            for(var i=0;i<fruits.length;i++){
                if(calLength2(fruits[i].x,fruits[i].y,bigf.x,bigf.y)<=20){

                    if(fruits[i].fruitTyple === fruits[i].orange){
                        score.num++;
                        bigf.oCount++;
                    }
                    if(fruits[i].fruitTyple === fruits[i].blue){
                        score.double++;
                        bigf.bCount++;
                    }

                    //新建波纹并加入容器中
                    wave = new Wave();
                    waves.push(wave);
                    wave.init(fruits[i].x,fruits[i].y);
                    //初始化食物
                    fruits[i].init();
                }
            }
        }
    }

    function feed() {
        if(bigf.oCount>0 && !gameover){
            if(calLength2(bigf.x,bigf.y,smaf.x,smaf.y)<=30){
                Fwave = new FeedW();
                Fwaves.push(Fwave);
                Fwave.init(smaf.x,smaf.y);
                smaf.bCount = 0;
                bigf.bCount = 0;
                bigf.oCount = 0;
                score.addscore();
            }
        }
    }

});