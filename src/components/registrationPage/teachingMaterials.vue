<template>
  <div id="teaching_materials_box" class="w">
    <section>
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
        请上传相对应的课例资料：
        <span
          style="
            font-size: 15px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 0, 0, 1);"
        >（*为必填项）</span>
      </p>
      <!-- 课例资料 -->
      <div class="material_box">
        <div class="cover_photo">
          <div class="title">
            封面图片: &nbsp;
            <em style="color:#FF0000">*</em>
          </div>
          <div class="file_outBox">
            <div class="file">
              <input type="file" ref="jpgFile" @change="jpgFile($event)" id="jpgFile">
              <span class="el-icon-plus"></span>
              <img id="imgTest" :src="dialogImageUrl" alt>
              <el-progress
                v-if="showProgressBar"
                class="image_progress_bar"
                style="
              width: 100%;
              height: 100%;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              background:rgba(0,0,0,0.5);
              "
                type="circle"
                :percentage="imagePrecentage"
              ></el-progress>
            </div>
          </div>
          <p class="introduce">请上传.jpg或.png或.jpeg格式照片</p>
        </div>
        <div class="cover_photo">
          <div class="title">
            教学设计: &nbsp;
            <em style="color:#FF0000">*</em>
          </div>
          <div class="file_outBox">
            <div class="file">
              <input type="file" ref="wordFile" @change="wordFile($event)" id="wordFile">
              <span class="el-icon-plus"></span>
              <img
                id="wordUrl"
                :src="dialogWordUrl"
                style="width:80px;height:97px;transform: scale(50%);"
                alt
              >
              <el-progress
                v-if="showWordProgressBar"
                class="image_progress_bar"
                style="
              width: 100%;
              height: 100%;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              background:rgba(0,0,0,0.5);
              "
                type="circle"
                :percentage="wordPrecentage"
              ></el-progress>
            </div>
          </div>
          <p class="introduce">请上传.doc或.docx格式文件</p>
        </div>
        <div class="cover_photo">
          <div class="title">
            课堂实录: &nbsp;
            <em style="color:#FF0000">*</em>
          </div>
          <div class="file_outBox">
            <div class="file">
              <input type="file" ref="videoFile" @change="videoFile($event)" id="videoFile">
              <span class="el-icon-plus"></span>
              <img
                id="videoUrl"
                :src="dialogVideoUrl"
                style="width: 78px;height: 67px;transform: scale(50%);"
                alt
              >
              <el-progress
                v-if="showVideoProgressBar"
                class="image_progress_bar"
                style="
              width: 100%;
              height: 100%;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              background:rgba(0,0,0,0.5);
              "
                type="circle"
                :percentage="videoPrecentage"
              ></el-progress>
            </div>
          </div>
          <p class="introduce">请上传.mp4格式文件</p>
        </div>
        <div class="cover_photo">
          <div class="title">
            教学课件: &nbsp;
            <em style="color:#FF0000">*</em>
          </div>
          <div class="file_outBox">
            <div class="file">
              <input type="file" ref="pptFile" @change="pptFile($event)" id="pptFile">
              <span class="el-icon-plus"></span>
              <img
                id="pptUrl"
                :src="dialogPptUrl"
                style="width: 71px;height: 88px;transform: scale(50%);"
                alt
              >
              <el-progress
                v-if="showPptProgressBar"
                class="image_progress_bar"
                style="
              width: 100%;
              height: 100%;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              background:rgba(0,0,0,0.5);
              "
                type="circle"
                :percentage="pptPrecentage"
              ></el-progress>
            </div>
          </div>
          <p class="introduce">请上传.ppt或.pptx格式文件</p>
        </div>
        <div class="cover_photo">
          <div style="margin-left:20px" class="title textbook">教学教材、音频:&nbsp;
            <!-- <em style="color:#FF0000">*</em> -->
          </div>
          <div class="file_outBox" style="margin-left: 11px;">
            <div class="file">
              <input type="file" ref="pptFile" @change="otherFile($event)" id="otherFile">
              <span class="el-icon-plus"></span>
              <img
                id="otherUrl"
                :src="dialogOtherUrl"
                style="width: 71px;height: 88px;transform: scale(50%);"
                alt
              >
              <el-progress
                v-if="showOtherProgressBar"
                class="image_progress_bar"
                style="
              width: 100%;
              height: 100%;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              background:rgba(0,0,0,0.5);
              "
                type="circle"
                :percentage="otherPrecentage"
              ></el-progress>
            </div>
          </div>
          <p class="introduce">可多次上传,音频请上传.mp3格式文件</p>
        </div>
      </div>

      <!-- 上传 -->
      <div @click="handelSubmit" class="upload__messages">确认提交</div>
      <el-dialog
        :closeOnClickModal="false"
        class="submitDialog"
        title="报名成功!"
        :visible.sync="centerDialogVisible"
        center
      >
        <span class="introduce">请添加微信号查看审核结果</span>
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
          src="//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/a4f72cbf07866277b0e9a5c97bf1bd5d.png"
          alt
        >
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>
<script>
import "../../statics/js/baidubce-sdk.bundle.min.js";
import { userInfo } from "../../common/localStorage.js";
export default {
  data() {
    return {
      //弹框
      centerDialogVisible: false,
      //image
      //展示
      dialogImageUrl: "",
      //进度条
      showProgressBar: false,
      //上传进度
      imagePrecentage: 0,
      //Word
      dialogWordUrl: "",
      showWordProgressBar: false,
      wordPrecentage: 0,
      //video
      dialogVideoUrl: "",
      showVideoProgressBar: false,
      videoPrecentage: 0,
      //ppt
      dialogPptUrl: "",
      showPptProgressBar: false,
      pptPrecentage: 0,
      //其他素材
      dialogOtherUrl: "",
      showOtherProgressBar: false,
      otherPrecentage: 0,
      //上传所需参数
      coverImgId: "",
      designId: "",
      videoId: "",
      pptId: "",
      material: [],
      // 以下为百度云对象存储数据
      baidubceData: {}
    };
  },
  methods: {
    //跳转判断
    isRemain() {
      if (
        !this.$route.query.case_id ||
        localStorage.getItem("case_id") != this.$route.query.case_id
      ) {
        this.$router.push("/userInfoPage");
      }
    },
    //上传凭证
    uploadAuthorization() {
      this.$axios
        .post(
          "/good-lesson/get-sts",
          {},
          {
            headers: {
              userid: userInfo().user_id,
              source: "Web",
              token: userInfo().token
            }
          }
        )
        .then(res => {
          this.baidubceData = res.data.data;
          // console.log(res.data.data);
        });
    },
    //初始化百度云bos参数
    initBosConfig() {
      let bosConfig = {
        credentials: {
          ak: this.baidubceData.accessKeyID,
          sk: this.baidubceData.secretAccessKey
        },
        sessionToken: this.baidubceData.sessionToken,
        endpoint: this.baidubceData.endPoint // 根据您选用bos服务的区域配置相应的endpoint
      };
      let bucket = this.baidubceData.bucket; // 设置您想要操作的bucket
      let client = new baidubce.sdk.BosClient(bosConfig);
      return {
        client,
        bucket
      };
    },
    //封装
    baseCallBack(e, callback, progressBar, handelPercentage) {
      let blob = e.target.files[0];
      const { client, bucket } = this.initBosConfig();
      let fileName = blob.name;
      let ext = fileName.split(/\./g).pop();
      let mimeType = baidubce.sdk.MimeType.guess(ext);
      if (/^text\//.test(mimeType)) {
        mimeType += ";charset=UTF-8";
      }
      let option = {
        "Content-Type": mimeType
      };
      let storeName =
        this.baidubceData.storePath + $.md5(`${blob}`) + "." + ext;
      client
        .putObjectFromBlob(bucket, storeName, blob, option)
        .then(res => {
          this.$axios
            .post(
              "/good-lesson/uploaded",
              {
                name: fileName,
                mime: mimeType,
                file_name: storeName
              },
              {
                headers: {
                  userid: userInfo().user_id,
                  source: "Web",
                  token: userInfo().token
                }
              }
            )
            .then(success => {
              callback(success.data.data.resource_id);
            });
        })
        .catch(err => {
          console.log(err);
        });
      client.on("progress", evt => {
        // 监听上传进度
        if (evt.lengthComputable) {
          progressBar(true);
          // 添加您的代码
          let percentage = parseInt((evt.loaded / evt.total) * 100);
          handelPercentage(percentage);
          // console.log(percentage);
        }
      });
      // return client;
    },
    //图片上传
    jpgFile(e) {
      let that = this;
      if (
        e.target.files[0].type == "image/png" ||
        e.target.files[0].type == "image/jpeg" ||
        e.target.files[0].type == "image/jpg"
      ) {
        this.dialogImageUrl = URL.createObjectURL(e.target.files[0]);
        $("#imgTest").animate(
          {
            opacity: 1
          },
          1000
        );
        let client = this.baseCallBack(
          e,
          function(argument) {
            that.coverImgId = argument;
          },
          function(argument) {
            that.showProgressBar = argument;
          },
          function(argument) {
            that.imagePrecentage = argument;
          }
        );
      } else {
        this.$message.error("请上传指定文件类型");
      }
    },
    //word上传
    wordFile(e) {
      let that = this;
      if (
        e.target.files[0].name.split(".").pop() == "doc" ||
        e.target.files[0].name.split(".").pop() == "docx"
      ) {
        this.dialogWordUrl =
          "//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/6f127ba8c138ab6c9229583db0c319a7.png";
        $("#wordUrl").animate(
          {
            opacity: 1
          },
          1000
        );
        let client = this.baseCallBack(
          e,
          function(argument) {
            that.designId = argument;
          },
          function(argument) {
            that.showWordProgressBar = argument;
          },
          function(argument) {
            that.wordPrecentage = argument;
          }
        );
      } else {
        this.$message.error("请上传word文件");
      }
    },
    //mp4上传
    videoFile(e) {
      let that = this;
      if (e.target.files[0].type == "video/mp4") {
        this.dialogVideoUrl =
          "//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/add0be6921b25505a2320486d27beb83.png";
        $("#videoUrl").animate(
          {
            opacity: 1
          },
          1000
        );
        let client = this.baseCallBack(
          e,
          function(argument) {
            // console.log(argument);
            that.videoId = argument;
          },
          function(argument) {
            that.showVideoProgressBar = argument;
          },
          function(argument) {
            that.videoPrecentage = argument;
          }
        );
      } else {
        this.$message.error("请上传.mp4文件");
      }
    },
    //ppt上传
    pptFile(e) {
      let that = this;
      if (
        e.target.files[0].name.split(".").pop() == "ppt" ||
        e.target.files[0].name.split(".").pop() == "pptx"
      ) {
        this.dialogPptUrl =
          "//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/bb8b7cf876e9a85a4a880bfb23037816.png";
        $("#pptUrl").animate(
          {
            opacity: 1
          },
          1000
        );
        let client = this.baseCallBack(
          e,
          function(argument) {
            that.pptId = argument;
          },
          function(augument) {
            that.showPptProgressBar = augument;
          },
          function(augument) {
            that.pptPrecentage = augument;
          }
        );
      }
    },
    //其他格式文件上传
    otherFile(e) {
      let that = this;
      this.dialogOtherUrl =
        "//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/65c78919ee37f2bf55fe87863ed90629.png";
      $("#otherUrl").animate(
        {
          opacity: 1
        },
        1000
      );
      let client = this.baseCallBack(
        e,
        function(argument) {
          that.material.push(argument);
          that.$alert("点击可以继续上传", `${e.target.files[0].name}上传成功`, {
            confirmButtonText: "确定",
            callback: action => {
              that.$message({
                type: "success",
                message: "上传成功"
              });
            }
          });
        },
        function(augument) {
          that.showOtherProgressBar = augument;
        },
        function(augument) {
          that.otherPrecentage = augument;
        }
      );
    },
    //提交
    handelSubmit() {
      if (
        this.coverImgId == "" ||
        this.designId == "" ||
        this.videoId == "" ||
        this.pptId == ""
      ) {
        this.$message.error("请上传完整");
      } else {
        const loading = this.$loading({
          lock: true,
          text: "正在提交",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$axios
          .post(
            "/good-lesson/submit-files",
            {
              case_id: this.$route.query.case_id,
              cover: this.coverImgId,
              design: this.designId,
              video: this.videoId,
              ppt: this.pptId,
              material: this.material
            },
            {
              headers: {
                userid: userInfo().user_id,
                source: "Web",
                token: userInfo().token
              }
            }
          )
          .then(res => {
            setTimeout(() => {
              if (res.data.result == 400) {
                this.$message.error(`${res.data.message}或者退出登录后重试`);
                return;
              }
              if (res.data.result == 500) {
                this.$message.error("服务器出错了");
                return;
              }
              if (res.data.result == 0) {
                this.centerDialogVisible = true;
                this.$message({
                  message: "提交成功,请关注二维码查看审核结果",
                  type: "success"
                });
              }
              loading.close();
            }, 1000);
          });
      }
    },
    //确定
    confirm() {
      this.$router.push("/lessonCollection");
    }
  },
  created() {
    this.isRemain();
    this.uploadAuthorization();
    this.initBosConfig();
  }
};
</script>
<style scoped>
@import "../../statics/css/teachingMaterials.css";
</style>
