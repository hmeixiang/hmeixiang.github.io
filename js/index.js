window.onload=function(){
    search();
    slider();
    sktime();
}
function search(){
    //需求分析：
    //当页面滚动不超过轮播图时，随着滚动越多，不透明度越高
    //当页面滚动超过轮播图时，不透明度固定不变
    //获取事件源
    var search = document.querySelector(".jd_header_box");
    var banner = document.querySelector(".jd_banner");
    var height = banner.offsetHeight;
    var opacity = 0;
    window.onscroll=function(){
        if(document.body.scrollTop<height){
            opacity = document.body.scrollTop/height*0.85;
        }else{
            opacity = 0.85;
        }
        search.style.background="rgba(201,21,35,"+opacity+")";
    }
}
function slider(){
    //需求分析
    //1、自动轮播 (定时器 过渡)
    //2、小圆点随着图片滚动(监听图片显示的索引，然后设置当前样式now)
    //3、图片能滑动(touch)
    //4、滑动不超过一定距离 吸附回去 (过渡)
    //5、滑动超过一定距离 滚动到下一张(过渡)
    
    //0、获取事件源和相关元素
    var box = document.querySelector(".jd_banner");
    var imgUl = box.children[0];
    var dotUl = box.children[1];
    var imgLis = imgUl.children;
    var dotLis = dotUl.children;
    var width = box.offsetWidth;
    var num = 1;
    //1、自动轮播 (定时器 过渡)
    clearInterval(box.timer);
    box.timer = setInterval(function(){
        num++;
        chinasofti.addTransition(imgUl);
        chinasofti.setTransform(imgUl,-num*width);
    }, 5000)
    
    chinasofti.addTransitionEnd(imgUl, function(){
        if(num>imgLis.length-2){
            num = 1;
            chinasofti.removeTransition(imgUl);
            chinasofti.setTransform(imgUl,-num*width);
        }else if(num==0){
            num = imgLis.length-2;
            chinasofti.removeTransition(imgUl);
            chinasofti.setTransform(imgUl,-num*width);
        }
        light();
    })
    //2、小圆点随着图片滚动(监听图片显示的索引，然后设置当前样式now)
    function light(){
        for(var i =0;i<dotLis.length;i++){
            dotLis[i].className = "";
        }
        dotLis[num-1].className = "now";
    }
    
    //4、滑动不超过一定距离 吸附回去 (过渡)
    //5、滑动超过一定距离 滚动到下一张(过渡)
    var startX = 0 ;
    var moveX = 0 ;
    var endX = 0;
    var isMove = false;
    var distance = 0;
    imgUl.addEventListener("touchstart", function(e){
        clearInterval(box.timer);
        startX = e.touches[0].clientX;
    })
    imgUl.addEventListener("touchmove", function(e){
        moveX = e.touches[0].clientX;
        isMove = true;
        //3、图片能滑动(touch)
            distance = moveX - startX;
            chinasofti.removeTransition(imgUl);
            chinasofti.setTransform(imgUl,-num*width+distance);
        // if(distance>0){
        //     //distance>0,右滑，就是要看上一张
        //     setTransform(imgUl,-num*width+distance);
        // }else{
        //     //distance<0,左滑，就是要看下一张
        //     setTransform(imgUl,-num*width+distance);
        // }
        
    })
    imgUl.addEventListener("touchend", function(e){
        endX = moveX;
        if(isMove){
            if(Math.abs(distance)>width/3){
              if(distance>0){
                    num--;
              }else{
                    num++;
              }
                chinasofti.addTransition(imgUl);
                chinasofti.setTransform(imgUl,-num*width);

            }else{
                chinasofti.addTransition(imgUl);
                chinasofti.setTransform(imgUl,-num*width);
            }
        }
        clearInterval(box.timer);
        box.timer = setInterval(function(){
        num++;
        chinasofti.addTransition(imgUl);
        chinasofti.setTransform(imgUl,-num*width);

        }, 5000)
        startX = 0 ;
        moveX = 0 ;
        endX = 0;
        isMove = false;
        distance = 0;
    });
    
}
function sktime(){
    var sk = 5*60*60;
    var skDiv = document.querySelector(".sk_time");
    var spanS = skDiv.children;
    skDiv.timer=setInterval(function(){
        if(sk<0){
           clearInterval(skDiv.timer)
        }else{
            sk--;
            var hour = Math.floor(sk/3600);
            var minute = Math.floor(sk%3600/60);
            var second = sk%60;
            spanS[0].innerHTML=0;
            spanS[1].innerHTML=hour;
            if(minute<10){
                spanS[3].innerHTML=0;
                spanS[4].innerHTML=minute;
            }else{
                spanS[3].innerHTML=Math.floor(minute/10);
                spanS[4].innerHTML=minute%10;
            }
            if(second<10){
                spanS[6].innerHTML=0;
                spanS[7].innerHTML=second;
            }else{
                spanS[6].innerHTML=Math.floor(second/10);
                spanS[7].innerHTML=second%10;
            }
        }
    }, 1000)
}




