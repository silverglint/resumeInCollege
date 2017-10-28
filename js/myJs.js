var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
window.onresize = function () {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};
ctx.fillStyle = "deepskyblue";

//定义雨滴类
function Drop() {
}

//原型，即雨滴的模板
Drop.prototype = {
    init: function () {
        //x，y轴位置
        this.x = random(0, w);
        this.y = 0;
        //y轴移动速度
        this.vy = random(2, 7);
        //雨滴散开的高度
        this.heightest = h * random(0.1, 0.9);
        //散开的半径及散开速度
        this.r = 1;
        this.vr = random(1, 3);
        this.l = 3;
        this.s = 1;
        this.lv = random(1, 3);
        this.sv = this.lv * .7;
        //散开的透明度及其变化速度
        this.ar = .9;
        this.a = .05;
    },
    //画出
    draw: function () {
        if (this.y < this.heightest) {
            //在达到散开高度之前画出雨滴
            ctx.fillStyle = "deepskyblue";
            ctx.fillRect(this.x, this.y, 2, 8);

        }
        if (this.y > this.heightest) {
            //达到散开高度后，画出散开
            /*
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
            ctx.strokeStyle="deepskyblue";
            ctx.stroke();
            */

            //散开为椭圆
            function Ellipse(context, x, y, a, b) {
                context.save();
                var r = (a > b) ? a : b;
                var ratioX = a / r;
                var ratioY = b / r;
                context.scale(ratioX, ratioY);
                context.beginPath();
                context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
                context.closePath();
                context.restore();
                context.strokeStyle = "deepskyblue";
                context.stroke();
            }

            Ellipse(ctx, this.x, this.y, this.l, this.s);
        }
        //每画一次，更新位置
        this.update();
    },
    //位置更新
    update: function () {
        if (this.y < this.heightest) {
            //y轴位置变化
            this.y += this.vy;
        } else {
            if (this.a > .03) {
                //散开半径及透明度变化
                this.r += this.vr;
                this.a = this.a * this.ar;
                this.l += this.lv;
                this.s += this.sv;

            } else {
                //结束后再次初始化
                this.init();
            }
        }
    }
};
//定义容器，将所有雨滴初始化
var drops = [];
for (var i = 0; i < 30; i++) {
    //延时初始化
    setTimeout(function () {
        var drop = new Drop();
        drop.init();
        drops.push(drop);
    }, 400)

}

//
function move() {
    //画出透明背景，不断叠加，达到渐变效果
    ctx.fillStyle = "rgba(0,0,0,.1)";
    ctx.fillRect(0, 0, w, h);
    //画出容器中的雨滴
    for (var i = 0; i < drops.length; i++) {
        drops[i].draw();
    }
    //这个方法原理其实也就跟setTimeout/setInterval差不多，通过递归调用同一方法来不断更新画面以达到动起来的效果，但它优            于setTimeout/setInterval的地方在于它是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果              页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销。
    requestAnimationFrame(move);
}

move();

function random(min, max) {
    return Math.random() * (max - min) + min;
}


//ss


//js类名操作
function hasClass(ele, cls) {
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
//为指定的dom元素添加样式
function addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;

}
//删除指定dom元素的样式
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
    }
}
//如果存在(不存在)，就删除(添加)一个样式
function toggleClass(ele,cls){
    if(hasClass(ele,cls)){
        removeClass(ele, cls);
    }else{
        addClass(ele, cls);
    }
}

//jQ文档加载时加载
$(function () {
    //刷新返回顶部
    //$(window).scrollTop(0);



    //JQuery标题动画添加
    $(".education .school").addClass("animated fadeIn").css("animation-duration","2.5s");
    $("#edu-ex").hover(function () {
       $(this).addClass("animated rotateIn");
   });
   $("#ms").hover(function () {
       $(this).addClass("animated bounce");
   });
   $("#credential").hover(function () {
        $(this).addClass("animated rubberBand");
   });
   $("#myproject").hover(function () {
      $(this).addClass("animated tada")
   });

   //点击导航栏定位
    var top1 = 0;
    var top2 = $("#edu-ex").offset().top-170;
    var top3 = $("#credential").offset().top-170;
    var top4 = $("#contact").offset().top;

   $("#firstpage,.sider-back").on("click",function () {
       $("body").animate({
           scrollTop:top1
       },600,"swing")
   });
    $("#info").on("click",function () {
        $("body").animate({
            scrollTop:top2+20
        },600,"swing")
    });
    $("#skill").on("click",function () {
        $("body").animate({
            scrollTop:top3+20
        },600,"swing")
    });
    $("#conme,.sider-cont").on("click",function () {
        $("body").animate({
            scrollTop:top4
        },600,"swing");
    });


    //根据位置改变导航栏样式
    $(window).scroll(function () {

        //滚动条距文档顶部高度
        var currheight = $(this).scrollTop();
        //文档高度
        var documentHeight = $(document).height();
        //当前窗口高度
        var windowHeight = $(window).height();
        //滚动条底端局页面底部距离
        var bot = documentHeight-currheight-windowHeight;
        if(currheight>top1&&currheight<top2){
            $(".div-cont ul li").removeClass("current");
            $("#firstpage").addClass("current");

        }
        if(currheight>top2&&currheight<top3){
            $(".div-cont ul li").removeClass("current");
            $("#info").addClass("current");
        }
        if(currheight>top3&&currheight<top4){
            $(".div-cont ul li").removeClass("current");
            $("#skill").addClass("current");
        }
        if(bot<10){
            $(".div-cont ul li").removeClass("current");
            $("#conme").addClass("current");
        }
    });

    //载入页面添加效果
    $(document).scroll(function () {
        if($(this).scrollTop()>=top2){
            $(".gain .mycre").addClass("animated fadeIn");
            $(".gain .skill").addClass("animated slideInRight")
        }
        if($(this).scrollTop()>=530){
            $(".myskill .progress").addClass("animated fadeInDown dadeIn").css("animation-duration","2s");
            var percent_number_step = $.animateNumber.numberStepFactories.append('%');
            $(".myskill .progress .items .java").animate({
                    width:300*0.65
                },2000,"swing");
                $(".myskill .progress .items .htmlcss").animate({
                    width:300*0.9
                },2000,"swing");
                $(".myskill .progress .items .adob").animate({
                    width:300*0.55
                },2000,"swing");
                $(".myskill .progress .items .js").animate({
                    width:300*0.7
                },2000,"swing");

            $(".myskill .progress .items .java span").animateNumber({
                number:65,
                easing:"swing",
                numberStep: percent_number_step
            },2000);
            $(".myskill .progress .items .htmlcss span").animateNumber({
                number:90,
                easing:"swing",
                numberStep: percent_number_step
            },2000);
            $(".myskill .progress .items .adob span").animateNumber({
                number:55,
                easing:"swing",
                numberStep: percent_number_step
            },2000);
            $(".myskill .progress .items .js span").animateNumber({
                number:70,
                easing:"swing",
                numberStep: percent_number_step
            },2000);
        }

    });

    //mywork中列表展开收缩
    $(".mywork .mywork-html p").mouseover(function () {
        $(".mywork .mywork-html .mywork-ul").slideDown(400);
    });
    $(".mywork .mywork-html").mouseleave(function () {
        $(".mywork .mywork-html .mywork-ul").slideUp(400);
    });


    $(".mywork .mywork-ae p").mouseover(function () {
        $(".mywork .mywork-ae .mywork-ul").slideDown(400);
    });
    $(".mywork .mywork-ae").mouseleave(function () {
        $(".mywork .mywork-ae .mywork-ul").slideUp(400);
    });

    // var omask = "<div id='mask' style='background: black;width: 100%;height: 100%;position: fixed;z-index: 10;opacity: .6'></div>";
    // $("#snow").click(function () {
    //     $(".container").prepend(omask);
    // });
    var omask = document.createElement("div");
    omask.id = "mask";
    $(".mywork .mywork-right li").click(function () {
        document.body.appendChild(omask);
    });
    omask.onclick = function () {
        document.body.removeChild(omask);
        $("#snow-inner").css("display","none");
        $("#e3d-inner").css("display","none");
        $("#water-inner").css("display","none");
    };

    $("#snow").click(function () {
        $("#snow-inner").css("display","block");
    });
    $("#e3d").click(function () {
        $("#e3d-inner").css("display","block");
    });
    $("#water").click(function () {
        $("#water-inner").css("display","block");
    });
});