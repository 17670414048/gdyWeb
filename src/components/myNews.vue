<template>
  <div class="w">
    <div class="news">
      <h4>{{info.title}}</h4>
      <div id="info" v-html="info.content"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "myNews",
  data() {
    return {
      id: 1,
      info: {}
    };
  },
  created() {
    this.getInfo(this.id);
  },
  methods: {
    getInfo(id) {
      this.$axios.post("/news/detail", { news_id: id }).then(res => {
        if (res.data.result != 0) {
          this.$message.error(res.data.message);
          return;
        } else {
          this.info = res.data.data;
        }
      });
    }
  }
};
</script>
<style scope>
.news {
  margin: 30px auto;
}
.news h4 {
  margin-bottom: 30px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 550;
  color: rgba(32, 31, 31, 1);
  line-height: 30px;
  text-align: center;
}
#info {
  font-size: 20px;
  line-height: 32px;
}
</style>
