<template>
  <div class="w">
    <div id="myhead">
      <img
        src="//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/d803d1371a64d36264ab63101f8d105e.png"
        alt
      >
      <div class="right-text">
        <h4>{{info.title}}</h4>
        <p>课例编号：{{info.id}}</p>
        <p>学校名称：{{info.school_name}}</p>
        <p>试用年级：{{info.grade_name}}</p>
        <p class="red">{{info.status_tip}}。。。</p>
      </div>
    </div>
    <p id="info">{{info.description}}</p>
    <div id="myinfo">
      <h4>观看人数：{{info.view_count}}</h4>
      <div class="lists">
        <el-table
          :data="info.list"
          style="width: 100%;margin-bottom: 30px;"
          slot="empty"
          :header-cell-style="{background:'#F5F5F5',color:'#A3A3A3',fontSize:'13px',padding:'16px 0'}"
          :cell-style="{padding:'21px 0px'}"
        >
          <el-table-column type="index" label="编号" width="220" align="left"></el-table-column>
          <el-table-column prop="cate_name" label="上传分类" width="340" align="left"></el-table-column>
          <el-table-column
            prop="note"
            label="上传名称"
            width="400"
            align="left"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="type" label="文件格式" width="240" align="left"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { userInfo } from "../common/localStorage.js";
export default {
  name: "myContribute",
  data() {
    return {
      info: {},
      id: ""
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
          "/good-lesson/detail",
          { good_lesson_id: id },
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
<style scope>
#myhead {
  margin: 30px auto 10px;
  display: flex;
  justify-content: flex-start;
}
#myhead img {
  width: 315px;
  height: 191px;
  margin-right: 20px;
}
#myhead .right-text h4 {
  font-size: 22px;
  font-family: PingFangSC-Medium;
  font-weight: 550;
  color: rgba(58, 58, 58, 1);
  line-height: 30px;
  margin-bottom: 15px;
}
#myhead .right-text p {
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(58, 58, 58, 1);
  line-height: 28px;
  margin-bottom: 10px;
}
#myhead .right-text p.red {
  color: #ff8b00;
}
#info {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(58, 58, 58, 1);
  line-height: 28px;
  margin-bottom: 30px;
}
#myinfo h4 {
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 550;
  color: rgba(58, 58, 58, 1);
  line-height: 28px;
  margin-bottom: 20px;
}
#myinfo .lists {
  margin-bottom: 30px;
  height: 646px;
}
#myinfo .lists .look_btn {
  background: rgba(255, 139, 0, 1);
  border-radius: 2px;
  color: #fff;
  font-size: 13px;
  padding: 5px 10px;
}
</style>