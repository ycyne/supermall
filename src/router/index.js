import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const BuyCar = () => import('../views/buycar/BuyCar')
const Profile = () => import('../views/profile/Profile')

//1.安装插件
Vue.use(VueRouter);
//2.创建路由对象
const routes=[
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: "/home",
    component:Home
  },
  {
    path: "/category",
    component:Category
  },
  {
    path: "/buycar",
    component:BuyCar
  },
  {
    path: "/profile",
    component:Profile
  }
]
const router=new VueRouter({
  routes,
  mode:'history'
})
//3.导出路由
export default router
