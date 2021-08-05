import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
//导入路由
import VueRouter from "vue-router";
//use
Vue.use(VueRouter);
//导入需要路由管理的组件
import discovery from "./components/03.discovery.vue";
import playlist from "./components/04.playlists.vue";
import songs from "./components/05.songs.vue";
import mv from "./components/06.mvs.vue";
//创建路由
let router = new VueRouter({
  routes: [
    //配置地址和组件的对应关系
    {
      path: "/",
      component: discovery,
    },
    {
      //地址
      path: "/discovery",
      component: discovery,
    },
    {
      //地址
      path: "/playlists",
      component: playlist,
    },
    {
      //地址
      path: "/songs",
      component: songs,
    },
    {
      //地址
      path: "/mvs",
      component: mv,
    },
  ],
});
//挂载

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
