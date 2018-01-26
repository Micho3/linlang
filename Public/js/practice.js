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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Ajax = __webpack_require__(1);
var common = __webpack_require__(2);

(function(){
    let ajax = new Ajax({
        preStep: function(){
            common.loading();
        }
    });
    ajax.get('/Practice/Index/trunk', function(data){
        let tree = document.getElementById('ll_tree');
        data.forEach(function(val){
            let treeDiv = document.createElement('div');
            treeDiv.setAttribute('class','ll_trunk_bark');
            let treeLi = document.createElement('li');
            treeLi.setAttribute("class","ll_trunk");
            treeLi.innerHTML = val.content;
            treeDiv.appendChild(treeLi);
            let treeUl = document.createElement('ul');
            treeUl.setAttribute("class","ll_leaf");
            treeDiv.appendChild(treeUl);
            if(val.child.length > 0){
                val.child.forEach(function(v){
                    let leaf = document.createElement('li');
                    leaf.innerHTML = v.content;
                    leaf.setAttribute("class","ll_leaf_leafage");
                    leaf.setAttribute("data-title",v.name);
                    leaf.on("click",function () {
                        let page = this.getAttribute("data-title");
                        window.location.href = "/Practice/Index/getPractice?page=" + page;
                    });
                    treeUl.appendChild(leaf);
                });
            }
            tree.appendChild(treeDiv);
        });
        let trunks = document.getElementsByClassName("ll_trunk");
        Array.prototype.forEach.call(trunks,function(val){
            val.on("click", function(){
                let siblingUl = this.nextElementSibling;
                let flag = siblingUl.style.display === 'flex';
                let leaves = document.getElementsByClassName("ll_leaf");
                Array.prototype.forEach.call(leaves, function(item){
                    item.style.display = 'none';
                });
                if(flag){
                    siblingUl.style.display = 'none';
                }
                else{
                    siblingUl.style.display = 'flex';
                }
            });
        });
        common.loaded();
    },function(e){
        console.error(e);
    });
})();

var hideTree = function(){                                                
    let elem = document.getElementById('ll_tree');
    elem.style.animation = 'hideTree 1s ease-in 1';
    setTimeout(function(){
        elem.style.display = 'none';
    },800);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Ajax = function(option){
    this.option = option || {};
    this.async = this.option.async || true;
    this.isJson = this.option.isJson || true;
    this.preStep = this.option.preStep || function(){};
};

Ajax.prototype.option = function(option){
    this.option = option || {};
    this.async = this.option.async || true;
    this.isJson = this.option.isJson || true;
    this.preStep = this.option.preStep || function(){};
};

Ajax.prototype.AjaxException = function(message, code){
        this.message = message;
        this.code = code;
        return this;
};
Ajax.prototype.baseAjax = (function(){
    let AjaxObj = null;
    if(window.XMLHttpRequest){
        AjaxObj = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        AjaxObj = new ActiveXObject();
    }
    if(AjaxObj === null){
        try{
            var except = Ajax.prototype.AjaxException("Can't find avaliable Ajax Object", 1);
            throw except;
        }catch(e){
            throw new Error(e.message)
        }
    }
    return AjaxObj;
})();

// 将字符串转换为json对象
Ajax.prototype.jsonEncode = function(str){
    let result = {};
    try{
        result = JSON.parse(str);
    }catch(e){
        throw new Error(e)
    }
    return result;
};

// 判断当前变量是否为数组
Ajax.prototype.isArray = function(o){
    return Object.prototype.toString.call(o)=='[object Array]';
};

// 将js的对象处理成http请求中变量的格式
Ajax.prototype.dealData = function(data){
    let result = [];    
    try{
        for(let i in data){
            if(data.hasOwnProperty(i) && this.isArray(data[i])){
                data[i].forEach(function(val){
                    result.push(i + "[]=" + val);
                });
            }
            else if(typeof data[i] === 'object'){
                for(let key in data[i]){
                    result.push(i+'['+ key +']='+data[i][key]);
                }
            }
            else{
                result.push(i+'='+data[i]);
            }
        }
        return result.join("&");
    }catch(e){
        throw new Error(e);
    }
};

//模拟ajax的get方法
Ajax.prototype.get = function(url, data, s, f){
    if(typeof data === 'function'){
        if(typeof s !== 'undefined'){
            f = s;
            s = data;
            data = null;
        }
        else{
            f = function(){};
            s = data;
            data = null;
        }
    }
    if(data){
        data = this.dealData(data);
        url = url+"?"+data;
    }
    let isJson = this.isJson;
    let jsonEncode = this.jsonEncode;
    this.baseAjax.stateChange = function(){
        if(this.readyState === 4){
            if(this.status == '200'){
                let result = this.responseText;
                if(isJson){
                    result = jsonEncode(result);
                }
                s(result);
            }
            else{
                f();
            }
        }
    };
    this.preStep();
    this.baseAjax.onreadystatechange = this.baseAjax.stateChange;
    this.baseAjax.open("GET", url, this.async);
    this.baseAjax.send();
};

//模拟ajax的post方法
Ajax.prototype.post = function(url, data, s, f){
    if(typeof data === 'function'){
        if(typeof s !== 'undefined'){
            f = s;
            s = data;
            data = null;
        }
        else{
            f = function(){};
            s = data;
            data = null;
        }
    }
    if(data){
        data = this.dealData(data);
    }
    let isJson = this.isJson;
    let jsonEncode = this.jsonEncode;
    this.baseAjax.stateChange = function(){
        if(this.readyState === 4){
            if(this.status == '200'){
                let result = this.responseText;
                if(isJson){
                    result = jsonEncode(result);
                }
                s(result);
            }
            else{
                f();
            }
        }
    };
    this.preStep();
    this.baseAjax.onreadystatechange = this.baseAjax.stateChange;
    this.baseAjax.open("POST", url, this.async);
    this.baseAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    this.baseAjax.send(data);
};

module.exports = Ajax;


/***/ }),
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

/***/ })
/******/ ]);