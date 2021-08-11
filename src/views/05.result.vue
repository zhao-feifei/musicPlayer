<template>
  <div class="result-container">
    <div class="title-wrap">
      <!-- 标题 -->
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title">找到{{ count }}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in songList"
              :key="index"
              class="el-table__row"
              @dblclick="playMusic(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span v-if="item.mvid != 0" class="iconfont icon-mv"></span>
                  </div>
                  <span v-if="item.alias.length != 0">{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div
            v-for="(item, index) in playlists"
            :key="index"
            class="item"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div
            v-for="(item, index) in mv"
            :key="index"
            class="item"
            @click="toMv(item.id)"
          >
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.count }}</div>
              </div>
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "result",
  data() {
    return {
      //tab切换时会改变的数据
      activeIndex: "songs",
      //保存查询到的歌曲
      songList: [],
      //搜索结果的总数
      count: 0,
      //保存歌单的字段
      playlists: [],
      //保存mv的字段
      mv: [],
    };
  },
  //生命周期钩子
  created() {
    axios({
      method: "get",
      url: "https://autumnfish.cn/search",
      params: {
        keywords: this.$route.query.q,
        type: "1",
        limit: 10,
      },
    }).then((res) => {
      this.songList = res.data.result.songs;
      //处理时间格式
      for (let i = 0; i < this.songList.length; i++) {
        let duration = this.songList[i].duration;
        let min = parseInt(duration / 1000 / 60);
        if (min < 10) {
          min = "0" + min;
        }
        let sec = parseInt((duration / 1000) % 60);
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.songList[i].duration = `${min}:${sec}`;
      }
      //保存总数
      this.count = res.data.result.songCount;
    });
  },
  //侦听器
  watch: {
    activeIndex() {
      //songs   歌曲
      //lists   歌单
      //mv      mv
      let type = 1;
      //获取个数
      let limit = 10;
      switch (this.activeIndex) {
        case "songs":
          type = 1;
          limit = 10;
          break;
        case "lists":
          type = 1000;
          limit = 10;
          break;
        case "mv":
          type = 1004;
          limit = 8;
          break;

        default:
          break;
      }

      axios({
        method: "get",
        url: "https://autumnfish.cn/search",
        params: {
          keywords: this.$route.query.q,
          type,
          limit,
        },
      }).then((res) => {
        //获取的是歌曲
        if (type == 1) {
          this.songList = res.data.result.songs;
          //处理时间格式
          for (let i = 0; i < this.songList.length; i++) {
            let duration = this.songList[i].duration;
            let min = parseInt(duration / 1000 / 60);
            if (min < 10) {
              min = "0" + min;
            }
            let sec = parseInt((duration / 1000) % 60);
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.songList[i].duration = `${min}:${sec}`;
          }
          //保存总数
          this.count = res.data.result.songCount;
        }
        //获取的是歌单
        else if (type == 1000) {
          //歌单
          this.playlists = res.data.result.playlists;
          //总数
          this.count = res.data.result.playlistCount;
          //处理播放次数
          for (var i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].playCount > 100000) {
              this.playlists[i].playCount =
                parseInt(this.playlists[i].playCount / 10000) + "万";
            }
          }
        }
        //获取的是mv
        else {
          //保存mv
          console.log(res);
          this.mv = res.data.result.mvs;
          //保存数量
          this.count = res.data.result.mvCount;
          //处理数据
          for (let i = 0; i < this.mv.length; i++) {
            let duration = this.mv[i].duration;
            let min = parseInt(duration / 1000 / 60);
            if (min < 10) {
              min = "0" + min;
            }
            let sec = parseInt((duration / 1000) % 60);
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.mv[i].duration = `${min}:${sec}`;
            //播放次数

            if (this.playlists[i].playCount > 100000) {
              this.playlists[i].playCount =
                parseInt(this.playlists[i].playCount / 10000) + "万";
            }
          }
        }
      });
    },
  },
  methods: {
    //去mv详情页面
    toMv(id) {
      this.$router.push(`/mv?q=${id}`);
    },
    // 去歌单详情页面
    toPlaylist(id) {
      this.$router.push(`/playlist?q=${id}`);
    },
    playMusic(id) {
      axios({
        method: "get",
        url: "https://autumnfish.cn/song/url",
        params: { id },
      }).then((res) => {
        let url = res.data.data[0].url;
        //给父组件设置播放地址
        this.$parent.musicUrl = url;
      });
    },
  },
};
</script>

<style></style>
