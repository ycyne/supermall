<template>
    <div id="detail">
      <DetailNavBar/>
      <scroll>
        <DetailSwiper :top-images="topImages"/>
        <DetailBaseInfo :goods="goods"/>
        <DetailShopInfo :shop="shop"/>
        <DetailParamsInfo :param-info="itemParams"/>
      </scroll>
    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";

  import Scroll from "components/common/scroll/Scroll";
  import {getDetail,Goods,Shop} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailParamsInfo,
      Scroll
    },
    data(){
      return{
        iid:0,
        topImages:[],
        goods: {},
        shop:{},
        detailInfo: {},
        itemParams: {}
      }
    },
    created() {2
      //1.保存传入iid
      this.iid = this.$route.params.iid;
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        //1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages=data.itemInfo.topImages
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.column,data.shopInfo.services)
        //3.创建店铺信息对象
        this.shop = new Shop(data.shopInfo)
        //4.取出店铺的信息
        this.shop = data.shopInfo;
        //5.取出详情的信息
        this.detailInfo = data.detailInfo;
        //6.取出参数的信息
        this.itemParams = data.itemParams
      })
    }
  }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
