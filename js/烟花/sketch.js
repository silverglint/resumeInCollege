
 var W = window.innerWidth;
 var H = window.innerHeight;
var fireworks = [];
var gravity;


function setup() {
    createCanvas(W-6,H-6);
    gravity = createVector(0,0.2);
    background(0);
    colorMode(RGB);
}

function draw() {
    background(0,50);
    if(random(1)<0.03){
        fireworks.push(new Firework());
    }

    for(var i=fireworks.length-1;i>=0;i--){
        if(fireworks[i].paiticles.length===0&&fireworks[i].opacity<=0){
            fireworks.splice(i,1);
        }else{
            fireworks[i].update();
        }
    }
}