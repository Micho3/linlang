(function(){
    var ajax = new Ajax({
        preStep: function(){
            loading();
        }
    });
    ajax.get('Practice/Index/trunk', function(data){
        let tree = document.getElementById('ll_tree');
        data.forEach(function(val, key, arr){
            let treeDiv = document.createElement('div');
            treeDiv.setAttribute('class','ll_trunk_bark');
            //treeDiv.className = 'll_trunk_bark';
            let treeLi = document.createElement('li');
            treeLi.setAttribute("class","ll_trunk");
            //treeLi.className = "ll_trunk";
            treeLi.innerHTML = val.content;
            treeDiv.appendChild(treeLi);
            let treeUl = document.createElement('ul');
            treeUl.setAttribute("class","ll_leaf");
            //treeUl.className = "ll_leaf";
            //if(val.child.length > 0){
                //val.child.forEach(function(v, k){
                    //let leaf = document.createAttribute('li');
                    //leaf.innerHTML = v.content;
                    //treeUl.appendChild(leaf);
                //});
            //}
            treeDiv.appendChild(treeUl);
            tree.appendChild(treeDiv);
        });
        loaded();
    },function(e){
        console.error(e);
    });
})();
