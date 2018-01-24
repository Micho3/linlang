(function(){
    let loading = document.getElementsByClassName('loading');
    //var xHR = new Ajax();
    var data = {
        b: 'a',
        c: [1,2,3],
    }
    var ajax = new Ajax();
    ajax.get('Home/Index/trunk', data,  function(data){
        console.log(data);
    },function(){
        console.error("#$%@#$%^");
    });
})();
