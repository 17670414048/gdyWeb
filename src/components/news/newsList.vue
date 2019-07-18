<template>
  <div class="w" id="list">
    <h4>新闻列表</h4>
    <ul class="lists">
      <li v-for="(item,index) in list" @click="go_news(item.id)">
        <img :src="item.cover" alt>
        <div>
          <h4>{{item.title}}</h4>
          <p>浏览量：{{item.read_num}}</p>
          <p>发布时间：{{item.create_time | formatDate}}</p>
        </div>
      </li>
    </ul>
    <el-pagination
      @current-change="current_change"
      :page-size="page_size"
      :current-page="currentPage"
      layout="pager"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { userInfo } from "../../common/localStorage.js";

export default {
  name: "newsList",
  data() {
    return {
      page_num: 1,
      page_size: 6,
      list: [],
      total: 0,
      currentPage: 1
    };
  },
  filters: {
    formatDate(value) {
      let date = new Date(value * 1000);
      let year = date.getFullYear();
      let mouth = date.getMonth() + 1;
      let day = date.getDate();
      return year + "年" + mouth + "月" + day + "日";
    }
  },
  created() {
    this.getList();
  },
  watch: {
    page_num() {
      this.getList(this.page_num, this.page_size);
    }
  },
  methods: {
    go_news(id) {
      this.$router.push(`/myNews?id=${id}`);
    },
    getList(page_num = 1, page_size = 6) {
      let localUserInfo = userInfo();
      this.$axios
        .post(
          "/news",
          { page_num, page_size },
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
            this.list = res.data.data.list;

            this.total = res.data.data.total_count - 0;
          }
        });
    },
    current_change(currentPage) {
      this.page_num = currentPage;
    }
  }
};
</script>
<style>
#list {
  padding: 20px 0;
}
#list h4 {
  font-size: 30px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(31, 31, 31, 1);
  line-height: 42px;
  letter-spacing: 1px;
  margin-bottom: 20px;
  text-align: center;
}
#list ul.lists {
  margin: 10px auto 30px;
  height: 1217px;
}
#list ul.lists li {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#list ul.lists li h4 {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(31, 31, 31, 1);
  line-height: 42px;
  letter-spacing: 1px;
	margin-bottom: 20px;
	text-align: left;
}
#list ul.lists li img {
  width: 300px;
  height: 177px;
  margin-right: 30px;
  flex-shrink: 0;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#list ul.lists li p {
  font-size: 17px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(31, 31, 31, 1);
  line-height: 24px;
  margin-bottom: 15px;
}

#list .el-pagination {
  text-align: center;
  margin-bottom: 60px;
}
#list .el-pagination .el-pager li.active {
  color: #fff;
  cursor: default;
  background: #ff8b00;
  min-width: 28px;
  height: 28px;
  border-radius: 100%;
}
#list .el-pagination .el-pager li {
  font-weight: 400;
  color: #3a3a3a;
}
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
}
</style>
