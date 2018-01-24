//var LL_LIST = require('./config.js');
var ll_index = new Vue({
    el:'#ll_index',
    data: {
        trunk: LL_LIST,
        treeShow: true,
    },
    methods:{
        toggleTrunk: function(isShow){
            LL_LIST.forEach(function(val, index){
                val.show = false;
            });
            return !isShow;
        },
        hideTree: function(){
            let elem = document.getElementById('ll_tree');
            elem.style.animation = 'hideTree 1s ease-in 1';
            setTimeout(function(){
                //ll_index.$data.set('TreeShow', false);
                elem.style.display = 'none';
            },800);
            //console.log(elem.style);
            //$data.treeShow = false;
            //console.log(this, ll_index);
            //elem.style.display = 'none';
        }
    }
});
