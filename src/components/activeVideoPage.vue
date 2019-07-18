<template>
  <div class="w">
    <div id="videos">
      <div style="height:675px" id="dplayer"></div>
      <div class="play-top">{{info.title}}</div>
    </div>
    <div class="introduce">
      <h4 class="title">{{info.title}}</h4>
      <h4>{{info.grade_name}} | {{info.view_count}}次播放</h4>
      <p>{{info.description}}</p>
    </div>
    <div class="other">
      <h4 class="head">其他作品</h4>
      <el-row>
        <el-col :span="6" v-for="(item, index) in list" :key="index">
          <div class="layout" @click="page(item.id,index)">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.cover" class="image" style="width: 285px;height: 161px;">
              <div class="list_bottom">
                <span>{{item.title}}</span>
                <div class="info">
                  <p>{{item.name}}</p>
                  <p
                    class="look_num"
                    style="display: flex;
                    justify-content: center;
                    align-items: center;"
                  >
                    <i class="el-icon-view" style="font-size:15px;margin-right:6px"></i>
                    {{item.view_count}}
                  </p>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      @current-change="current_change"
      :page-size="page_size"
      layout="pager"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { userInfo } from "../common/localStorage.js";
import "dplayer/dist/DPlayer.min.css";
import DPlayer from "dplayer";
export default {
  name: "activeVideoPage",
  data() {
    return {
      id: "",
      info: {},
      page_num: 1,
      page_size: 8,
      list: [],
      total: 0,
      currentPage: 1,
      activity_id: 1
    };
  },
  created() {
    this.id = this.$route.query.id;
    // console.log(this.id);
    this.getInfo(this.id);
    this.getList();
    this.$nextTick(() => {
      this.initDplayer();
    });
  },
  watch: {
    page_num() {
      this.getList(
        this.activity_id,
        this.keyword,
        this.page_num,
        this.page_size
      );
    },
    id() {
      this.getInfo(this.id);
    }
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
    },
    getList(activity_id = 1, keyword = "", page_num = 1, page_size = 8) {
      this.$axios
        .post("/good-lesson/list", {
          activity_id,
          keyword,
          page_num,
          page_size
        })
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
      // console.log(currentPage);
      this.page_num = currentPage;
    },
    page(id, index) {
      this.id = id;
      $(".el-col")
        .eq(index)
        .addClass("active")
        .siblings()
        .removeClass("active");
      // console.log(index);
      setTimeout(() => {
        this.initDplayer();
      }, 500);
    },
    //dplayer
    initDplayer() {
      const dp = new DPlayer({
        container: document.getElementById("dplayer"), //播放器容器
        screenshot: true, //开启截图
        video: {
          //视频信息
          url: this.info.video //视频连接
          //pic: require('../assets/images/10.jpeg'),//视频封面
          //thumbnails: require('../assets/images/10.jpeg')//视频缩略图
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.initDplayer();
    }, 500);
  }
};
</script>
<style scope>
#videos {
  width: 100%;
  height: 675px;
  position: relative;
  margin-top: 40px;
}
#videos .play {
  width: 100%;
  height: 675px;
}
#videos .play-top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  padding-left: 20px;
  font-size: 30px;
}
.introduce {
  margin: 30px 0;
}
.introduce h4 {
  height: 42px;
  font-size: 30px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(137, 137, 137, 1);
  line-height: 42px;
  margin-bottom: 10px;
}
.introduce h4.title {
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}
.introduce p {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(98, 98, 98, 1);
  line-height: 33px;
  margin: 20px 0;
}
.other {
  padding: 0 0 20px;
}
.other .head {
  font-size: 30px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 42px;
  margin-bottom: 20px;
}
.other .layout {
  margin: 10px 15px 10px 0px;
}
.other .layout .list_bottom {
  padding: 14px;
}
.other .layout .list_bottom span {
  width: 260px;
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-bottom: 5px;
}
.other .layout .list_bottom .info {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 10px 0 5px;
}
.other .layout .list_bottom .info p {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
}
.other .layout .list_bottom .info p.look_num {
  color: rgba(185, 185, 185, 1);
  position: relative;
  padding-left: 18px;
}
.w .el-pagination {
  text-align: center;
  margin-bottom: 60px;
}
.w .el-pagination .el-pager li.active {
  color: #fff;
  cursor: default;
  background: #ff8b00;
  min-width: 28px;
  height: 28px;
  border-radius: 100%;
}
.w .el-pagination .el-pager li {
  font-weight: 400;
  color: #3a3a3a;
}
.el-col:hover .list_bottom span {
  color: rgba(0, 161, 214);
  transition: all 0.5s;
}
.el-col:hover .list_bottom .info p {
  color: rgba(0, 161, 214);
  transition: all 0.5s;
}
.el-col:hover .list_bottom .info .look_num {
  color: rgba(0, 161, 214) !important;
  transition: all 0.5s;
}
.el-col:hover .el-card.is-always-shadow {
  transition: all 0.5s;
  box-shadow: 0 2px 12px 0 rgba(0, 161, 214, 0.5);
}
.el-col.active .el-card.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 161, 214, 0.5);
}
.el-col.active .list_bottom span {
  color: rgba(0, 161, 214);
  transition: all 0.5s;
}
.el-col.active .list_bottom .info p {
  color: rgba(0, 161, 214);
  transition: all 0.5s;
}
.el-col.active .list_bottom .info .look_num {
  color: rgba(0, 161, 214) !important;
  transition: all 0.5s;
}
</style>
