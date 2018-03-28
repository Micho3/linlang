/**
 * Created by shepg on 2018/2/2.
 */

// import Vue from './vue.js';
import Vue from 'vue';
import Ajax from '../common/ajax.js';
const skins = ['nozomi','eli','niko','maki','rin','hanayo','honoka','umi','kotori'];
const menu = ["我的","历史","委托","乐库"];

Vue.component("pushu-nav",{
    template:"<ul class='pushu_nav'>" +
    "<li v-for='item in menu'>{{item}}</li>"+
    "</ul>",
    data: function(){
        return {
            menu: menu
        };
    }
});

new Vue({
    el: "#pushu",
    data: {
        ajax: new Ajax(),
        audio: document.querySelector("#player"),
        skins: skins,
        logo: 'nozomi',
        menu: menu,
        searchKeyword: '',
        searchHistory: [],
        playStatus: false //,
        // currentSong: '',
        // playprogress: 0

    },
    // components: ["pushu-nav"],
    methods: {
        // 防止在进行其他操作时触发点击事件及冒泡后的操作
        preventClickBubble: function (e) {
            e.stopPropagation();
        },

        // 隐藏下拉列表
        hideDropdown: function (e) {
            document.querySelector(".list").style.display = "none";
            document.querySelector(".pushu_logo").classList.remove("pushu_logo_active");
            document.querySelector(".pushu_nav").classList.remove("pushu_active");
            document.querySelector(".historySearch").style.display = "none";
        },
        // 显示下拉列表
        showDropDown: function (e) {
            let list = e.target.querySelector(".list") || e.target.nextElementSibling;
            if(!list)
                return true;
            list.style.display = "block";
            e.stopPropagation();
        },

        // 更换皮肤
        changeSkin: function (e) {
            let flag = e.target.getAttribute("data-skin") || e.target.parentNode.getAttribute("data-skin");
            document.querySelector(".body").classList = flag + " body";
            // this.$data.logo = flag;
            this.logo = flag;
        },

        // 显示设置下拉框
        showSetting: function (e) {
            let logo = document.querySelector(".pushu_logo");
            logo.classList.add("pushu_logo_active");
            let nav = document.querySelector(".pushu_nav");
            nav.classList.add("pushu_active");
            e.stopPropagation();
        },

        // 点击搜索框出现搜索历史
        showHistory: function(e){
            this.searchHistory = JSON.parse(localStorage.getItem('LL_s_history'));
            document.querySelector('.historySearch').style.display = 'block';
            console.log("showHistory", e.target);
            e.stopPropagation();
        },

        // // 输入搜索字符匹配关键字
        // showKeyword: function(e){
        //     // searchHistory = localStorage.getItem('LL_s_history');
        //     console.log('showKeyword');
        // },

        // 搜索音乐时的操作
        searchMusic: function(e){
            if(e.type === 'click'){
                this.searchKeyword = e.target.innerHTML;
            }
            else if(e.type === "keydown"){
                this.searchKeyword = e.target.value;
            }
            document.querySelector('.historySearch').style.display = 'none';
            this.ajax.jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy",[], function (data) {
                console.log("pushu.js====>", data);
            })
        },

        // 点击播放时的操作
        play: function (e) {
            let elem = e.target;
            this.playStatus = !this.playStatus;
            if(this.playStatus){
                // Array.remove.call(elem.classList, 'play');
                elem.classList.remove('play');
                elem.classList.add('pause');
                document.querySelector("#album").classList.add("album_play");
                // TODO 歌曲播放操作

            }else{
                elem.classList.remove('pause');
                elem.classList.add('play');
                document.querySelector("#album").classList.remove("album_play");
                // TODO 歌曲暂停操作
            }
        },
        
        // 调整播放时间的方法
        adjustPlayTime: function () {
            console.log(document.querySelector(".progressBar"));
        }
    }
});
