<template>
  <div id="header_box">
    <div id="top-header">
      <div class="w header__box">
        <img style="width:134px;height:44px" src="../../statics/images/logo.png">
        <div class="header__right">
          <!-- <router-link to=""></router-link> -->
          <router-link to="/lessonCollection" class="page_home">首页</router-link>
          <p @click="myLesson" style="margin-left:60px;">课例活动</p>
          <router-link to="/newsList" class="page_home" style="margin-left:60px;">实时新闻</router-link>
          <p v-if="userLoginInfo.user&&userLoginInfo.token" style="margin-left:123px">
            <img
              v-if="userLoginInfo.user.headimgurl"
              style="width:50px;height:50px"
              :src="userLoginInfo.user.headimgurl"
              :title="userLoginInfo.user.nickname"
            >
          </p>
          <p v-if="userLoginInfo.user&&userLoginInfo.token">
            <img
              v-if="!userLoginInfo.user.headimgurl"
              style="width:50px;height:50px;margin-left:123px"
              src="//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/3d533da34aa2c2d6f795c3376d0bd04c.jpg"
              title="共读会员"
            >
          </p>
          <p v-if="userLoginInfo.user&&userLoginInfo.token" style="margin-left:13px">
            <span v-if="userLoginInfo.user.nickname">{{userLoginInfo.user.nickname}}</span>
          </p>
          <p v-if="userLoginInfo.user&&userLoginInfo.token" style="margin-left:13px">
            <span v-if="!userLoginInfo.user.nickname">共读会员</span>
          </p>
          <p
            v-if="!userLoginInfo.token"
            class="user__login"
            @click="toLogin"
            style="margin-left:40px;color:rgba(228,102,49,1)"
          >登录</p>
          <p
            v-else
            class="user__login"
            @click="Logout"
            style="margin-left:40px;color:rgba(228,102,49,1)"
          >退出</p>
        </div>
      </div>
    </div>
    <!-- Form -->
    <el-dialog class="form_box" title="绑定手机" width="432px" :visible.sync="dialogFormVisible">
      <el-form class="login_form" :model="loginForm">
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input prefix-icon="el-icon-edit" v-model="loginForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-input
            prefix-icon="el-icon-edit"
            class="captcha"
            v-model="loginForm.code"
            autocomplete="off"
          ></el-input>
          <!-- <span @click="sendCode" class="send_code">59</span> -->
          <el-button
            :disabled="disabled"
            @click="sendCode"
            type="success"
            style="margin-left:4px;width: 112px;padding: 12px;"
          >{{sendCodeText}}</el-button>
          <!-- <el-button type="primary" class="confirm_button" @click="dialogFormVisible = false">发送验证码</el-button> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="confirm_button" @click="confirmLogin">确认</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 客服弹框 -->
    <el-dialog
      :closeOnClickModal="false"
      class="submitDialog"
      title="绑定成功!"
      :visible.sync="centerDialogVisible"
      center
    >
      <span class="introduce">请添加微信号查看更多活动</span>
      <p
        style="
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51,51,51,1);
          "
      >
        <img
          style="
        width: 16px;
        height: 16px;
        "
          src="	//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/04193044eeaacef475fb55821d8129f9.png"
          alt
        >
        ：400-666-2828
      </p>
      <img
        style="
          width:215px
          "
        src="//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/336a87455d76e026e03667afe6aeb8c9.jpg"
        alt
      >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible=false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 客服弹框 -->
  </div>
</template>
<script>
import { bus } from "../../common/bus.js";
export default {
  name: "top",
  data() {
    return {
      dialogFormVisible: false,
      loginForm: {
        mobile: "",
        code: ""
      },
      formLabelWidth: "68px",
      userLoginInfo: {},
      disabled: false,
      sendCodeText: "发送验证码",
      centerDialogVisible: false
    };
  },
  watch: {
    userLoginInfo() {}
  },
  methods: {
    //去登录
    toLogin() {
      this.dialogFormVisible = true;
    },
    //退出登录
    Logout() {
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          this.userLoginInfo = {};
          sessionStorage.removeItem("userLoginInfo");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //发送验证码
    sendCode() {
      if (!/^1[34578]\d{9}$/.test(this.loginForm.mobile)) {
        this.$message.error("请输入合法的手机号码");
        return;
      }
      this.disabled = true;
      this.sendCodeText = 59;
      this.timerId = setInterval(() => {
        this.sendCodeText--;
        if (this.sendCodeText == 0) {
          clearInterval(this.timerId);
          this.sendCodeText = "发送验证码";
          this.disabled = false;
        }
      }, 1000);
      this.$axios
        .post("/user/send-sms-code", { mobile: this.loginForm.mobile })
        .then(res => {
          if (res.data.result == 1025) {
            this.$message.error(res.data.message);
            return;
          }
          if (res.data.result == 400) {
            this.$message.error(res.data.message);
            return;
          }
          if (res.data.result == 0) {
            this.$message({
              message: "验证码已成功发送",
              type: "success"
            });
          }
          // console.log(res.data);
        });
    },
    //提交登录信息
    confirmLogin() {
      if (!/^1[34578]\d{9}$/.test(this.loginForm.mobile)) {
        this.$message.error("请输入合法的手机号码");
        return;
      }
      if (this.loginForm.code == "") {
        this.$message.error("验证码不能为空");
        return;
      }
      this.$axios
        .post("/user/login", {
          mobile: this.loginForm.mobile,
          code: this.loginForm.code,
          source: "Web"
        })
        .then(res => {
          if (res.data.result == 400) {
            this.$message.error(res.data.message);
            return;
          }
          if (res.data.result == 0) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.dialogFormVisible = false;
            setTimeout(() => {
              this.centerDialogVisible = true;
            }, 200);
            this.userLoginInfo = res.data.data;
            sessionStorage.setItem(
              "userLoginInfo",
              JSON.stringify(this.userLoginInfo)
            );
          }
          // console.log(res.data.data);
        });
    },
    //获取本地用户信息
    getLocalUserInfo() {
      return JSON.parse(sessionStorage.getItem("userLoginInfo") || "{}");
    },
    //判断用户是否已登录过
    handleUserIsLogin() {
      let userLoginInfo = this.getLocalUserInfo();
      // console.log(userLoginInfo);
      if (userLoginInfo.token) {
        this.userLoginInfo = userLoginInfo;
      }
    },
    myLesson() {
      this.$router.push("/lessonCollection");
      // this.$message({
      //   message: "我的课例完善中!",
      //   type: "error",
      //   duration: "500"
      // });
      啦啦啦啦啦啦
    }
  },
  created() {
    this.handleUserIsLogin();
    // 登录弹窗
    bus.$on("toLogin", this.toLogin);
  }
};
</script>
<style scope>
@import "../../statics/css/header.css";
</style>