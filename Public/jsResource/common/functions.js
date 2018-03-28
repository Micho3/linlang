"use strict";
let loading = function(){
    let elem = document.getElementsByClassName("loading")[0];
    elem.style.display = 'flex';
};

let loaded = function(){
    let elem = document.getElementsByClassName("loading")[0];
    elem.style.display = 'none';
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