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
