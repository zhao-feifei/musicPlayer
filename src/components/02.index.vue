<template>
  <div>
    <!-- 左侧导航 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery"> 发现音乐</router-link>
        </li>
        <li>
          <router-link to="/playlists"> 推荐歌单</router-link>
        </li>
        <li>
          <router-link to="/songs"> 最新音乐</router-link>
        </li>
        <li>
          <router-link to="/mvs"> 最新MV</router-link>
        </li>
      </ul>
    </div>
    <!-- 右侧容器 -->
    <div class="main">
      <!-- <discovery></discovery> -->
      <!-- 地址命中之后组件显示的位置 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
//导入发现音乐组件
// import discovery from "./03.discovery.vue";
export default {
  //   components: {
  //     discovery,
  //   },
};
</script>

<style>
.index {
  display: flex;
  height: 830px;
}

.index .nav {
  width: 200px;
  background-color: #ededed;
}

.index .nav li {
  text-align: center;
  margin: 10px;
}

.main {
  background-color: orange;
  flex: 1;
}
</style>
