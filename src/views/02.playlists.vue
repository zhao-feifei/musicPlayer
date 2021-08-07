<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{ topList.name }}
        </div>
        <div class="info">
          {{ topList.description }}
        </div>
      </div>
      <img :src="topList.coverImgUrl" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item active">全部</span>
        <span class="item">欧美</span>
        <span class="item">华语</span>
        <span class="item">流行</span>
        <span class="item">说唱</span>
        <span class="item">摇滚</span>
        <span class="item">民谣</span>
        <span class="item">电子</span>
        <span class="item">轻音乐</span>
        <span class="item">影视原声</span>
        <span class="item">ACG</span>
        <span class="item">怀旧</span>
        <span class="item">治愈</span>
        <span class="item">旅行</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">66892</span>
              </div>
              <img src="../assets/cover.jpg" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">编辑推荐：一起探索这个未知的音乐罐头吧！</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "recommend",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //顶部的推荐歌单
      topList: {},
    };
  },
  created() {
    axios({
      method: "get",
      url: "https://autumnfish.cn/top/playlist/highquality",
      data: {
        limt: 10,
        cat: "全部",
      },
    }).then((res) => {
      this.topList = res.data.playlists[0];
      console.log(this.topList);
    });
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style></style>
