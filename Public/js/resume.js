/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

let loading = function(){
    let elem = document.getElementsByClassName("loading")[0];
    elem.style.visibility = 'visible';
};

let loaded = function(){
    let elem = document.getElementsByClassName("loading")[0];
    elem.style.visibility = 'hidden';
};

window.HTMLElement.prototype.on = function(type, fn, capture){
    let el = this;
    if(window.addEventListener){
        el.addEventListener(type, function(e) {
            fn.call(el, e);
        }, capture);
    }
    else{
        el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
        });
    }
};

module.exports = {
    loading: loading,
    loaded: loaded
};

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const anchor = ['brief','exp','skill','prod','motto'];
let currentIndex = 0;
var aniAct = null; //移动滚动条的事件
var scrollAct = true;
var common = __webpack_require__(0);

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

/***/ })
/******/ ]);