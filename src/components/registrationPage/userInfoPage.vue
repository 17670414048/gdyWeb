<template>
  <!-- 活动报名页面 -->
  <div id="sign_up_box" class="w">
    <!-- 用户基本信息 -->
    <section class="user_info_box">
      <!-- 注意事项 -->
      <p
        style="
        padding-top: 15px;
        padding-bottom: 14px;
        padding-left: 20px;
        background: rgba(239, 239, 239, 1);
        font-size:15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(25, 25, 25, 1);"
        class="matters_needing_attention"
      >
        在线报名请如实填写以下内容完成报名：
        <span
          style="
            font-size: 15px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 0, 0, 1);"
        >（*为必填项）</span>
      </p>
      <!-- /注意事项 -->
      <div class="user_name">
        <span class="title">
          姓名: &nbsp;
          <em style="color:rgba(255,0,0,1)">*</em>
        </span>
        <el-input
          prefix-icon="el-icon-edit"
          style="width:200px;height:30px;margin-right:15px"
          v-model="userForm.username"
        ></el-input>
        <span style="color:rgba(255,0,0,1)">请填写姓名*</span>
      </div>
      <div class="user_name">
        <span class="title" style="margin-right:132px">
          学校名称: &nbsp;
          <em style="color:rgba(255,0,0,1)">*</em>
        </span>
        <!-- <input type="text"> -->
        <el-input
          prefix-icon="el-icon-edit"
          style="width:200px;height:30px;margin-right:15px"
          v-model="userForm.school_name"
        ></el-input>
        <span style="color:rgba(255,0,0,1)">请填写学校名称*</span>
      </div>
      <div class="user_name">
        <span class="title" style="margin-right:132px">
          课程名称: &nbsp;
          <em style="color:rgba(255,0,0,1)">*</em>
        </span>
        <!-- <input type="text"> -->
        <el-input
          prefix-icon="el-icon-edit"
          style="width:200px;height:30px;margin-right:15px"
          v-model="userForm.course"
        ></el-input>
        <span style="color:rgba(255,0,0,1)">请填写课程名称*</span>
      </div>
      <div class="user_name">
        <span class="title" style="margin-right:132px">
          适用年级: &nbsp;
          <em style="color:rgba(255,0,0,1)">*</em>
        </span>
        <!-- <input type="text">-->
        <!-- <el-input
          prefix-icon="el-icon-edit"
          style="width:200px;height:30px;margin-right:15px"
          v-model="userForm.grade"
        ></el-input>-->
        <el-select style="margin-right:15px" v-model="userForm.selectGrade" placeholder="请选择">
          <el-option
            v-for="item in gradeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="color:rgba(255,0,0,1)">请填写适用年级*</span>
      </div>
      <div class="user_name introduction">
        <span class="title" style="display:flex;width: 65px">
          简介: &nbsp;
          <em style="color:rgba(255,0,0,1)">*</em>
        </span>
        <!-- <input type="text"> -->
        <el-input
          type="textarea"
          :rows="7"
          style="height:150px;margin-right:15px"
          v-model="userForm.intro"
        ></el-input>
      </div>
    </section>
    <!-- 下一步 -->
    <div @click="nextStep" class="userInfo_next">下一步</div>
  </div>
</template>
<script>
import { bus } from "../../common/bus.js";
import { userInfo, registrationInfo } from "../../common/localStorage.js";
import { gradeList } from "../../common/gradeListData.js";
export default {
  data() {
    return {
      userForm: {
        username: "",
        school_name: "",
        course: "",
        intro: "",
        selectGrade: ""
      },
      gradeOptions: gradeList()
      // selectGrade: ""
    };
  },
  methods: {
    nextStep() {
      let localUserInfo = userInfo();
      if (!localUserInfo.token) {
        bus.$emit("toLogin");
        this.$message.error("请先登录");
        return;
      }
      const {
        username,
        school_name,
        course,
        intro,
        selectGrade
      } = this.userForm;
      if (
        username == "" ||
        school_name == "" ||
        course == "" ||
        selectGrade == "" ||
        intro == ""
      ) {
        this.$message.error("此处全部均为必填项");
        return;
      } else {
        this.$axios
          .post(
            "/good-lesson/regist",
            {
              activity_id: 1,
              name: username,
              school_name: school_name,
              title: course,
              grade: selectGrade,
              description: intro
            },
            {
              headers: {
                userid: localUserInfo.user_id,
                source: "Web",
                token: localUserInfo.token
              }
            }
          )
          .then(res => {
            // console.log(res);
            if (res.data.result == 0) {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              localStorage.setItem(
                "registrationInfo",
                JSON.stringify(this.userForm)
              );
              localStorage.setItem("case_id", res.data.data.case_id);
              this.$router.push(
                `/teachingMaterials?case_id=${res.data.data.case_id}`
              );
            } else {
              this.$message.error("提交失败,请退出登录后重试");
            }
          });
      }
    }
  },
  created() {
    if (registrationInfo().username) {
      this.userForm = registrationInfo();
    }
  }
};
</script>
<style scoped>
@import "../../statics/css/userInfoPage.css";
</style>
