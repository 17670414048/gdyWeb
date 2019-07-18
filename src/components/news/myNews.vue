<template>
  <div class="w">
    <div class="top-nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/newsList'}">列表</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="news">
      <h4>{{info.title}}</h4>
      <div id="info" v-html="info.content"></div>
    </div>
  </div>
</template>
<script>
import { userInfo } from "../../common/localStorage.js";
export default {
  name: "myNews",
  data() {
    return {
      id: "",
      info: {}
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getInfo(this.id);
  },
  methods: {
    getInfo(id) {
      let localUserInfo = userInfo();
      this.$axios
        .post(
          "/news/detail",
          { news_id: id },
          {
            headers: {
              userid: localUserInfo.user_id,
              source: "Web",
              token: localUserInfo.token
            }
          }
        )
        .then(res => {
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
<style scoped>
.top-nav{
  margin: 30px auto;
}
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
