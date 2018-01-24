var ajax = (function(){
    let Ajax = null;
    let AjaxException = function(message, code){
        this.message = message;
        this.code = code;
        return this;
    }
    if(window.XMLHttpRequest){
        Ajax = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        Ajax = new ActiveXObject();
    }
    if(Ajax === null){
        try{
            var exception = AjaxException("Can't find avaliable Ajax Object", 1);
            throw exception;
        }catch(e){
           console.error(e.message); 
        }    
        return ;
    }
    var ajax = function(option){
        var
        option = option || {},
        async = option.async || true,
        isJson = option.async || true,
        succ = option.async || function(){},
        fail = option.async || function(){},
        get = function(url, data, s, f){
            succ = s || function(){};
            fail = f || function(){};
            Ajax.onreadystatechange = stateChange;
            Ajax.open("GET", url, async);
            Ajax.send(data);
        },

        stateChange = function(){
            if(Ajax.readyState === 4){
                if(Ajax.status == '200'){
                    let result = Ajax.responseText;
                    if(isJson){
                        result = jsonEncode(result);
                    }
                    succ(result);
                }
                else{
                    fail();
                }
            }
        },

        jsonEncode = function(str){
            return JSON.parse(str);
        }
        return {
            get: get,
        };
    }

    return ajax();
})();
