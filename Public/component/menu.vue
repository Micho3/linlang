<template>
    <!-- 头部导航   -->
    <div class="pushu_head">
        <img class="pushu_logo" v-bind:src="" v-on:click="showSetting">
        <div class="greeting">
            <div class="skin" v-on:click="showDropDown">
                <span>skin</span>
                <ul class="list">
                    <li v-for="skin in skins" v-bind:data-skin="skin" v-on:click="changeSkin">
                        <img v-bind:src=" imgSrc + skin ">
                    </li>
                </ul>
            </div>
            <a href="#">注册</a>
            ·
            <a href="#">登录</a>
        </div>
        <div class="search">
            <input type="text" placeholder="搜索音乐，按下Enter开始吧">
        </div>
    </div>
</template>
<script>
    import pushuNav from './pushu_nav';
    export default {
        data () {
            return {
                imgSrc: '__PUBLIC__/img/',
                menu: ["我的","历史","委托","乐库"]
            };
        },
        method:{
            // 隐藏下拉列表
            hideDropdown: function () {
                let list = document.querySelector(".list");
                list.style.display = "none";
                let logo = document.querySelector(".pushu_logo");
                logo.classList.remove("pushu_logo_active");
                let nav = document.querySelector(".pushu_nav");
                nav.classList.remove("pushu_active");
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
            }
        },
        component: [pushuNav]
    };
</script>
<style src="../css/pushu.css"></style>