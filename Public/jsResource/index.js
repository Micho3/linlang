const Ajax = require("./ajax");
const common = require("./functions");

(function(){
    let ajax = new Ajax({
        preStep: function(){
            common.loading();
        }
    });
    ajax.get('Practice/Index/trunk', function(data){
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
                    leaf.setAttribute("data-title",v.title);
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
                let leaves = document.getElementsByClassName("ll_trunk");
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

let hideTree = function(){
    let elem = document.getElementById('ll_tree');
    elem.style.animation = 'hideTree 1s ease-in 1';
    setTimeout(function(){
        elem.style.display = 'none';
    },800);
};