<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              @click="area = '全部'"
              :class="{ active: area == '全部' }"
              >全部</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '内地'"
              :class="{ active: area == '内地' }"
              >内地</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '港台'"
              :class="{ active: area == '港台' }"
              >港台</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '欧美'"
              :class="{ active: area == '欧美' }"
              >欧美</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '日本'"
              :class="{ active: area == '日本' }"
              >日本</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '韩国'"
              :class="{ active: area == '韩国' }"
              >韩国</span
            >
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              @click="type = '全部'"
              :class="{ active: type == '全部' }"
              >全部</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="type = '官方版'"
              :class="{ active: type == '官方版' }"
              >官方版</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="type = '原声'"
              :class="{ active: type == '原声' }"
              >原声</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="type = '现场版'"
              :class="{ active: type == '现场版' }"
              >现场版</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="type = '网易出品'"
              :class="{ active: type == '网易出品' }"
              >网易出品</span
            >
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              @click="order = '上升最快'"
              :class="{ active: order == '上升最快' }"
              >上升最快</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="order = '最热'"
              :class="{ active: order == '最热' }"
              >最热</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="order = '最新'"
              :class="{ active: order == '最新' }"
            >
              最新</span
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div
          class="item"
          @click="toMv(10)"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
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
        :page-size="5"
        :limit="limit"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mvs",
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 8,
      //地区
      area: "全部",
      //类型
      type: "全部",
      //排序
      order: "上升最快",
      //查询的结果
      list: [],
    };
  },
  //侦听器
  watch: {
    area() {
      this.page = 1;
      this.getList();
    },
    type() {
      this.page = 1;
      this.getList();
    },
    order() {
      this.page = 1;
      this.getList();
    },
  },
  created() {
    //获取数据
    this.getList();
  },
  methods: {
    getList() {
      //获取数据
      axios({
        method: "get",
        url: " https://autumnfish.cn/mv/all",
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          //数量
          limit: this.limit,
          //偏移值
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        this.list = res.data.data;
        //处理播放次数
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].playCount > 100000) {
            this.list[i].playCount =
              parseInt(this.list[i].playCount / 10000) + "万";
          }
        }
        //保存总条数
        if (res.data.count) {
          this.total = res.data.count;
        }
      });
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    //页码改变的回调函数
    handleCurrentChange(val) {
      //保存页码,重新获取数据
      this.page = val;
      this.getList();
    },
  },
};
</script>

<style></style>
