const anchor = ['brief','exp','skill','prod','motto'];
let currentIndex = 0;
var aniAct = null; //移动滚动条的事件
var scrollAct = true;
var common = require('./functions.js');

(function (){
    let scorll = document.getElementsByClassName("point");
    Array.prototype.forEach.call(scorll, function (val, key) {
        val.on("click",function () {
            let index = parseInt(this.getAttribute('data-index'));
            switchPage(index);
        });
    });
    document.addEventListener("DOMMouseScroll", function (e) {
        e = e || window.event;
        setDirection((e.detail > 0));
    });
    document.addEventListener("mousewheel", function (e){
        e = e || window.event;
        setDirection(e.wheelDelta < 0);
    }, {passive: true});
})();

var setDirection = function (flag) {
    if (scrollAct) {
        scrollAct = false;
        if (flag) {
            if (currentIndex < (anchor.length - 1))
                switchPage(++currentIndex);
            else {
                switchPage(anchor.length - 1);
            }

        }
        else {
            if (currentIndex > 0) {
                switchPage(--currentIndex);
            }
            else {
                switchPage(0);
            }
        }
    }
};

var switchPage = function (index) {
    let points = document.getElementsByClassName("point");
    Array.prototype.forEach.call(points,function(v){
        v.classList.remove("pointActive");
    });
    points[index].classList.add("pointActive");
    currentIndex = index;
    let targetHeight = document.getElementById(anchor[index]).offsetTop;
    setAniAct(targetHeight);
};

var setAniAct = function (target) {
    if(aniAct){
        clearInterval(aniAct);
    }
    aniAct = setInterval(function () {
        let current = document.documentElement.scrollTop;
        let direction = parseInt(window.screen.height * 0.01);
        if(current > target){
            direction = -direction;
        }
        if(current === target || Math.abs(current - target) < Math.abs(direction)){
            document.documentElement.scrollTop = target;
            clearInterval(aniAct);
        }
        else{
            document.documentElement.scrollTop = current + direction;
        }
        scrollAct = true;
    }, 1);
};