const anchor = ['brief','exp','skill','prod','motto'];
let currentIndex = 0;
var common = require('./functions.js');

(function (){
    let scorll = document.getElementsByClassName("point");
    Array.prototype.forEach.call(scorll, function (val, key) {
        val.on("click",function () {
            let points = document.getElementsByClassName("point");
            Array.prototype.forEach.call(points,function(v){
                v.classList.remove("pointActive");
            });
            this.classList.add("pointActive");
            let index = parseInt(this.getAttribute('data-index'));
            currentIndex = index;
            let targetHeight = document.getElementById(anchor[index]).offsetTop;
            let currentHeight = document.documentElement.scrollTop;
            // console.log(document.documentElement);
            window.scrollTo(0, targetHeight);
            // location.href = "#" + anchor[index];
        });
    });
})();