<template>
  <div class="top">
    <img src="../assets/01.top.jpg" alt="" />
    <input type="text" v-model="inputValue" @keyup.enter="toSearch" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    toSearch() {
      if (this.inputValue == "") {
        alert("请输入内容！");
      } else {
        this.$routers.push("/result");
      }
    },
  },
};
</script>

<style>
.top {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
}
</style>
