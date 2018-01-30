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
/* 0 */,
/* 1 */,
/* 2 */
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
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const anchor = ['brief','exp','skill','prod','motto'];
let currentIndex = 0;
var common = __webpack_require__(2);

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

/***/ })
/******/ ]);