<template>
  <div id="home">
    <nav-bar  class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <feature-view/>
      <TabControl :titles="this.titles"
                  @tabClick="tabClick"
                  :class="{fixed:isTabFixed}"
                  ref="tabControl"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,
    getHomeGoods
  } from "network/home";
  import {debounce} from "common/utils";

  export default {
      name: "Home",
      data(){
        return {
          banners:[],
          recommends:[],
          titles:["流行","新款","精选"],
          goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]}
          },
          currentType:'pop',
          isShowBackTop: false,
          tabOffsetTop:0,
          isTabFixed: false,
          saveY:0
        }
      },
      components:{
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
      },
      computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      created() {
        //1.请求多个数据
        this.getHomeMultidata();
        //2.请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
      },
      mounted() {
        //1. 图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.refresh,500)
        this.$bus.$on("itemImageLoad",() => {
          refresh()
        })
        //2. 获取tabControl的offsetTop
        // 所有的组件都有一个属性$el：用于获取组件中的元素
        // mounted 确实都把组件加载进去了，但是现在取出来的offsetTOP，
        // 没有包含图片的大小。因为图片没有加载完。所以要监听图片是否加载完成。
      },
      activated() {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0,-this.saveY,0)
      },
      deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
      },
      methods:{
          /**
           *事件监听相关的方法
           */
          swiperImageLoad(){
            this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop;
          },
          tabClick(index){
            switch (index) {
              case 0:
                this.currentType='pop'
                break
              case 1:
                this.currentType='new'
                break
              case 2:
                this.currentType='sell'
                break
            }
          },
          loadMore(){
            this.getHomeGoods(this.currentType);
          },
          /**
           * 网络请求相关的方法
           */
          getHomeMultidata(){
            getHomeMultidata().then(res=>{
              this.result=res;
              this.banners=res.data.banner.list;
              this.recommends=res.data.recommend.list ;
            })
          },
          getHomeGoods(type){
            const page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res =>{
              this.goods[type].list.push(...res.data.list)
              this.goods[type].page+=1
              this.$refs.scroll.finishPullUp();
            })
          },
          backClick(){
            this.$refs.scroll.scrollTo(0,0,500)
          },
          contentScroll(position){
            this.isShowBackTop = (-position.y) >1000
            this.isTabFixed = -(position.y) > this.tabOffsetTop
          }


        }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }

  /*.content{*/
  /*  height: 300px;*/
  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/
  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }
  .fixed{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
</style>
