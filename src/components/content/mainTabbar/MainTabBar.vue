<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_red.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_red.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/buycar">
      <img slot="item-icon" src="~assets/img/tabbar/buycar.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/buycar_red.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/my.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/my_red.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBarItem from "components/common/tabbar/TabBarItem";
  import TabBar from "components/common/tabbar/TabBar";
    export default {
        name: "MainTabBar",
      components:{
          TabBar,
          TabBarItem
      }
    }
</script>

<style scoped>

</style>
