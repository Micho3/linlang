"use strict";
var Ajax = function(option){
    this.option = option || {};
    this.async = this.option.async || true;
    this.isJson = this.option.isJson || true;
}
Ajax.prototype.AjaxException = function(message, code){
        this.message = message;
        this.code = code;
        return this;
}
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
            var exception = Ajax.prototype.AjaxException("Can't find avaliable Ajax Object", 1);
            throw exception;
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
}
Ajax.prototype.dealData = function(data){
    let result = [];    
    try{
        for(let i in data){
            console.log(typeof data[i]);
            if(isArray(data[i])){
                data[i].forEach(function(val){
                    result.push(i + "=" + val);
                });
            }
            else{
                result.push(i+'='+data[i]);
            }
        };
        result = result.join("&");
    }catch(e){
        throw new Error(e);
    }finally{
        return result;
    }
}

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
    }
    url = url+"?"+data;
    let isJson = this.isJson;
    let jsonEncode = this.jsonEncode;
    this.stateChange = function(){
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
    }
    this.baseAjax.onreadystatechange = this.stateChange;
    this.baseAjax.open("GET", url, this.async);
    this.baseAjax.send();
};


this.isArray = function(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}
