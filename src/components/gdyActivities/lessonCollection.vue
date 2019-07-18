<template>
    <div class="w">
        <div id="header">
            <img :src="info.cover" alt="课例征集活动" class="left">
            <div class="right">
                <h4>{{info.name}}</h4>
                <div class="header-info">
                    <div class="first">
                        <img
              src="//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/11f18f080282c9bfda170a6c06640231.png"
              alt
            >
                        <div class="f-right">
                            <p>
                                复赛时间
                                <span>{{info.rematch_time}}</span>
                            </p>
                            <p>
                                决赛时间
                                <span>{{info.final_match_time}}</span>
                            </p>
                            <p>
                                投稿时间
                                <span>{{info.contribute_end_time | formatDate}}截止</span>
                            </p>
                        </div>
                    </div>
                    <div class="first">
                        <img
              src="//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/63cee83788d195a707af43968474a231.png"
              alt
            >
                        <div class="f-right">
                            <p v-for="(item,index) in info.sponsor" v-if="index==0">
                                主办方&nbsp;&nbsp;&nbsp;
                                <span>{{item}}</span>
                            </p>
                            <p v-else style="margin-left:55px;">
                                <span>{{item}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="flag">
                        <p>
                            <img
                src=" //gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/3cb5879c2a4af086b3be7cce807ceaf3.png"
                alt
              >
              参与人数：{{info.player_num}}
            </p>
                            <p>
                                <img
                src="//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/ce66175406a095ef4d2644afcb730560.png"
                alt
              >
              观看人数：{{info.viewer_num}}
            </p>
                                <p @click="dialogVisible=true">
                                    <img
                src=" //gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/10b88b730a5a4b61a82a0396053078bb.png "
                alt
              >联系我们
            </p>
                    </div>
                    <div class="first">
                        <div class="btn red" @click="signup">我要报名</div>
                        <div class="btn grad" @click="my(info.my_case_id)">我的投稿</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="content">
            <el-tabs v-model="activeName">
                <el-tab-pane label="活动简介" name="first" class="active-info">
                    <!--   <div class="content-first">
          <h4>众里寻她千百度，不知好课在何处
            <br>名师同台已在即，有个席位等着您
            <br>金秋十月英雄会，花好月圆在鹏城
          </h4>
        </div> -->
                    <p style="color:#212121;">国家统编小学语文教材将于今年九月份在全国各中小学校全面使用，语文基础教育站在了新的历史方位中，全国小语界为之振奋。如何真正理解国家统编教材？如何用好统编教材？如何在用好统编教材的基础上做好儿童阅读？这需要专门研究，需要专业培训，更需要每一位老师在课堂上带着全新的理念，创造性地用好教材。而用好统编教材的重中之重就是把课上好。“好课我来上”课例征集活动就是要放眼全国，发现老师们在使用统编教材、推进儿童阅读方面的可贵探索和经验成果。获奖的课例执教者不仅会得到相应的奖励，还有机会与名师同台展示。也许从此，您就走上了教学名师的星光大道。“好课我来上”课例征集活动隆重开启，您还等什么，来吧！</p>
                    <h5>一、参加对象</h5>
                    <p>1.全国各地小学语文教师、校长、教研员及儿童阅读推广人。<br />
                        2.参赛作品可报执教者1人，指导教师不超过2人。
                    </p>
                    <h5>二、参评方式</h5>
                    <p>参赛者登陆共读园网站：<a href="http://www.gongduyuan.com/">http://www.gongduyuan.com/</a>，点击页面上的“我要报名”，注册登陆后，填写真实详细的信息，提交教学课例。</p>
                    <h5>三、参赛作品及要求</h5>
                    <p>
                        1. 参赛作品内容，可以从下面三类中任选：<br />
                        （1）义务教育国家统编小学语文教材教学课例；<br />
                        （2）义务教育国家统编小学语文教材+《名师助你学·小学生全阅读读本》组合教学课例；<br />
                        （3）《名师助你学·小学生全阅读读本》教学课例。<br />
                        2.参赛者需要提交以下四份材料：一节课40分钟完整的课堂教学视频，一份教学设计，一个教学课件
                        教学内容的电子文档。<br />
                        3.课时安排：一课时40分钟。<br />
                        4.参赛作品格式要求：所有参赛作品须按主办方提供的统一文件格式提交电子稿(见附件)。
                    </p>
                    <h5>四、参赛流程</h5>
                    <p style="margin-bottom: 10px;">1.报名（2019年3月28日—7月1日）<br />
                        参赛者需在共读园网站：<a href="http://www.gongduyuan.com/">http://www.gongduyuan.com/</a>注册信息确认报名，并上传课例需要的四份材料。同时，参赛者需将“报名表”（网报生成）及“参赛作品”（刻录成光盘），邮寄至儿童阅读课程研究中心秘书处，邮寄地址：广东省深圳市南山区沙河西路3151号健兴科技大厦A栋701，广东省东南教育科学研究院，截止日期为2019年7月1日，以快递寄件时间为准。<br />
                        2.预赛（7月15——8月31）<br />
                        提交的课例在线点击超过300次即自动进入预赛环节。预赛为录像课在线评选，组委会将邀请教学专家对上报的课例进行评选，根据预赛分数评选二等奖、三等奖，优胜者进入决赛。<br />
                        3.决赛（2019年11月，具体时间地点另行通知）<br />
                        决赛为现场上课的形式，进入总决赛的选手参加“小学语文‘好课我来上’大赛暨2019年秋季儿童阅读推进大会”。采取专家和现场观摩教师投票评选相结合的方式，评选一等奖和特等奖。预赛和决赛为同一课题，课时不限。
                    </p>
                    <h5>五、奖项设置与颁发</h5>
                    <p>1.按比例设特等奖、一等奖、二等奖、三等奖若干名。进入决赛者将获得奖金和获奖证书。获奖名单将于活动结束后及时在东南教科院官方网站（<a href="http://www.dnjky.cn/">http://www.dnjky.cn/</a>）及微信公众号上公布。<br />
                        2.所有奖项于“小学语文‘好课我来上’大赛暨2019年秋季儿童阅读推进大会”现场颁奖，时间在2019年11月，具体时间地点另行通知。<br />
                        3.评分排名前300名参赛者于大会现场赠送一本儿童阅读用书。<br />
                        4.我们将持续安排一等奖和特等奖获得者与全国名师、特级教师同台执教展示课。<br />
                        5.参赛者教学案例将适时汇编成册，每位入选的作者将享有一本。
                    </p>
                    <h5>六、参赛须知</h5>
                    <p>1.本次活动免参赛费，所有来稿一律不退，请自留底稿。<br />
                        2.参赛作品须未参加过往届评选，未在公开出版物上发布，且未参加过其他同类型的评选。<br />
                        3.参赛作品必须为作者本人原创，严禁抄袭，如借鉴他人研究成果须标明来源，一旦发现有抄袭现象，将取消参赛资格，由参赛者单方引起的侵权纠纷，责任自负。<br />
                        4.主办方享有参赛作品的使用权，可以对参赛作品进行网络使用及汇编集结出版等，不同意此条款者，请在作品中予以声明。<br />
                        5.主办方将为大赛各等级奖获得者提供一份荣誉证书。
                    </p>
                    <h5>七、活动询问</h5>
                    <p>
                        全国统一电话：4006662828<br />
                        联系人：孙老师18566212828 陈老师13612878452<br />
                        邮箱：dnjky007@qq.com<br />
                        邮寄地址：广东省深圳市南山区沙河西路3151号健兴科技大厦A栋701，广东省东南教育科学研究院。<br />
                        活动监督电话：13632668001<br />
                        活动详情见微信公众号：东南教科院
                    </p>
                    <h5>八、学术支持</h5>
                    <p>本次活动由儿童阅读研究中心、《语文教学通讯C》《小学语文教学》《小学教学设计》《教师论坛》等杂志社提供学术支持。<br />
                        诚请各省（自治区）、市教研室（教科院、所）对本次活动给予支持和指导，谨表谢忱。
                    </p>
                    <h5>九、温馨提示</h5>
                    <p>东南讲堂2019年春季小学语文教研活动：2019年春季儿童阅读课程推进大会4月27-29日（深圳）；小学语文统编教材教学观摩研讨会6月14-15日（上海）；儿童阅读种子教师高级研修班7月13-17日（苏州）、7月19-22日（内蒙古），8月19-23日（成都），详细议程及相关活动，微信公众号“东南教科院”将陆续发布。</p>
                    <h5>附件：</h5>
                    <a href="https://gdy-public-1256922588.cos.ap-guangzhou.myqcloud.com/%E5%B0%8F%E5%AD%A6%E8%AF%AD%E6%96%87%E2%80%9C%E5%A5%BD%E8%AF%BE%E6%88%91%E6%9D%A5%E4%B8%8A%E2%80%9D%E5%BE%81%E9%9B%86%E6%B4%BB%E5%8A%A8.docx">请下载点击，活动通知详情</a>
                </el-tab-pane>
                <el-tab-pane label="文稿" name="second">
                    <div class="search">
                        <h4>文稿数：{{total}}&nbsp;&nbsp;&nbsp;&nbsp;投稿时间：{{info.contribute_end_time | formatDate}}截止</h4>
                        <el-input v-model="keyword" placeholder="请输入您要查找的文稿名称或者编号" class="input-with-select" style="width: 434px;">
                            <!-- <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style="width: 434px;"> -->
                            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                    </div>
                    <div class="lists">
                        <el-table :data="list" style="width: 100%;margin-bottom: 30px;" slot="empty" :header-cell-style="{background:'#F5F5F5',color:'#A3A3A3',fontSize:'13px',padding:'16px 0'}" :cell-style="{padding:'21px 0px'}">
                            <el-table-column prop="id" label="课例编号" width="120" align="left"></el-table-column>
                            <el-table-column prop="name" label="教师名称" width="240" align="left"></el-table-column>
                            <el-table-column prop="title" label="课例名称" width="500" align="left" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="view_count" label="观看次数" width="200" align="left"></el-table-column>
                            <el-table-column label width="140" align="left">
                                <template slot-scope="scope">
                                    <!--  <el-button
                     @click.native.prevent="deleteRow(scope.$index, tableData4)"
                     type="text"
                     size="small">
                     移除
                  </el-button>-->
                                    <el-button @click="lookPlay(scope.row.id)" type="text" class="look_btn">观看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-pagination @current-change="current_change" :page-size="page_size" layout="pager" :total="total"></el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog :visible.sync="dialogVisible" width="358px" height="368px" center text-align="center" :modal-append-to-body="false" id="dialog">
            <h4 class="dialog-head">主办方联系方式</h4>
            <p class="dialog-text">
                <span
          style="
        margin-bottom: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: -1px;"
        >：</span>400-666-2828
            </p>
            <img
        src="//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/336a87455d76e026e03667afe6aeb8c9.jpg"
        alt
        class="dialog-img"
      >
            <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogVisible = false" class="dialog-btn">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
import { bus } from "../../common/bus.js";
import { userInfo } from "../../common/localStorage.js";
export default {
    name: "lessonCollection",
    data() {
        return {
            info: {},
            activeName: "first",
            dialogVisible: false,
            keyword: "",
            page_num: 1,
            page_size: 8,
            list: [],
            total: 0,
            currentPage: 1,
            activity_id: 1
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
        this.getInfo();
        this.getList();
    },
    watch: {
        page_num() {
            this.getList(
                this.activity_id,
                this.keyword,
                this.page_num,
                this.page_size
            );
        }
    },
    methods: {
        signup() {
            let localUserInfo = userInfo();
            if (!localUserInfo.token) {
                bus.$emit("toLogin");
                this.$message.error("请先登录");
                return;
            }
            //如果已登录，跳转报名页面
            this.$router.push(`/userInfoPage`);
        },
        my(id) {
            let localUserInfo = userInfo();
            if (!localUserInfo.token) {
                bus.$emit("toLogin");
                this.$message.error("请先登录");
                return;
            } else {
                this.getInfo();
                if (id == null) {
                    this.$message.error("您暂未投稿，请先报名投稿");
                } else {
                    this.$router.push(`/myContribute?id=${id}`);
                }
            }
        },
        search() {
            this.page_num = 1;
            this.list = [];
            this.getList(
                this.activity_id,
                this.keyword,
                this.page_num,
                this.page_size
            );
        },
        lookPlay(id) {
            let localUserInfo = userInfo();
            if (!localUserInfo.token) {
                bus.$emit("toLogin");
                this.$message.error("请先登录");
                return;
            } else {
                this.$router.push(`/activeVideoPage?id=${id}`);
            }
        },
        getInfo() {
            let localUserInfo = userInfo();
            this.$axios
                .post(
                    "/good-lesson/case-activity", { activity_id: 1 }, {
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
                        // console.log(res.data);
                    }
                });
        },
        getList(activity_id = 1, keyword = "", page_num = 1, page_size = 8) {
            let localUserInfo = userInfo();
            this.$axios
                .post(
                    "/good-lesson/list", { activity_id, keyword, page_num, page_size }, {
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
#header {
    margin: 50px auto 40px;
    display: flex;
    justify-content: flex-start;
}

#header .left {
    width: 414px;
    height: 244px;
    margin-right: 20px;
    flex-shrink: 0;
}

#header .right h4 {
    width: 766px;
    height: 30px;
    font-size: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(32, 31, 31, 1);
    line-height: 30px;
    margin-bottom: 20px;
}

#header .right .header-info {
    width: 766px;
    height: 340px;
    border: 1px dotted rgba(238, 238, 238, 1);
    padding: 21px;
}

#header .right .header-info .first {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 20px;
}

#header .right .header-info .first img {
    margin-top: 3px;
    width: 13px;
    height: 13px;
    margin-right: 10px;
}

#header .right .header-info .first p {
    height: 18px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(52, 52, 52, 1);
    line-height: 18px;
    margin-bottom: 14px;
}

#header .right .header-info .first p>span {
    margin-left: 30px;
}

#header .right .header-info .flag {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 30px;
}

#header .right .header-info .flag p {
    margin-right: 30px;
    height: 25px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(52, 52, 52, 1);
    line-height: 18px;
    padding: 3px 0px;
}

#header .right .header-info .flag p:last-child {
    padding: 2px 5px;
    border-radius: 2px;
    border: 1px solid rgba(238, 238, 238, 1);
    cursor: pointer;
}

#header .right .header-info .flag img {
    width: 16px;
    height: 13px;
    margin-right: 5px;
    margin-bottom: 4px;
}

#header .right .header-info .first .btn {
    width: 96px;
    height: 36px;
    background: rgba(255, 139, 0, 1);
    border-radius: 2px;
    margin-right: 37px;
    line-height: 36px;
    color: #fff;
    text-align: center;
    cursor: pointer;
}

#header .right .header-info .first .btn.grad {
    background: #409eff;
}

#header .right .header-info .first .btn.red {
    background: #ff8b00;
}

#content .active-info {
    margin: 37px auto;
}

#content .active-info .content-first {
    text-align: center;
    margin-bottom: 33px;
}

#content .active-info .content-first h4 {
    height: 90px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    color: rgba(60, 60, 60, 1);
    line-height: 30px;
}

#content .active-info p {
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(58, 58, 58, 1);
    line-height: 30px;
    margin-bottom: 10px;
}

#content .active-info h5 {
    font-size: 15px;
    font-family: PingFangSC-Medium;
    color: rgba(58, 58, 58, 1);
    line-height: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
}
#content .active-info a{
  color: rgb(0,0,238);
}

#dialog .dialog-head {
    height: 24px;
    font-size: 17px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    margin-bottom: 10px;
    text-align: center;
}

#dialog .dialog-text {
    width: 165px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 17px;
    margin-bottom: 5px;
    text-align: center;
    margin: 0 auto 5px;
    position: relative;
    padding-left: 16px;
    display: flex;
    justify-content: center;
}

#dialog .dialog-text:before {
    content: "";
    position: absolute;
    top: 0;
    left: 26px;
    height: 16px;
    width: 16px;
    background: url(//gdy-doc-1256922588.cos.ap-guangzhou.myqcloud.com/webresource/5d6c78c048e7cd64ac393e64fe0e9e17.png) top center no-repeat;
    background-size: contain;
}

#dialog .dialog-img {
    width: 215px;
    height: 215px;
    margin: 0 auto;
}

#dialog .dialog-btn {
    width: 70px;
    background: rgba(255, 139, 0, 1);
    border-radius: 2px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;
    padding: 4px 0px;
}

#dialog .el-dialog--center .el-dialog__body {
    text-align: center;
    padding: 25px 25px 10px;
}

#dialog .el-button--text:focus,
#dialog .el-button--text:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(255, 139, 0, 1);
}

/* 文稿投票 */
#content .search {
    display: flex;
    justify-content: space-between;
    padding: 21px 0;
}

#content .search h4 {
    height: 40px;
    font-size: 13px;
    font-family: PingFangSC-Medium;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
}

#content .lists {
    margin-bottom: 30px;
    height: 646px;
}

#content .lists .look_btn {
    background: rgba(255, 139, 0, 1);
    border-radius: 2px;
    color: #fff;
    font-size: 13px;
    padding: 5px 10px;
}

#content .el-pagination {
    text-align: center;
    margin-bottom: 60px;
}

#content .el-pagination .el-pager li.active {
    color: #fff;
    cursor: default;
    background: #ff8b00;
    min-width: 28px;
    height: 28px;
    border-radius: 100%;
}

#content .el-pagination .el-pager li {
    font-weight: 400;
    color: #3a3a3a;
}

/* 修改el的样式 */
#content .el-tabs__nav-wrap:after {
    height: 0px;
}

#content .el-tabs__item {
    margin: 0 20px;
    color: #333;
    font-size: 13px;
    font-weight: 500;
    padding: 0 20px !important;
}

#content .el-tabs__item.is-active {
    border-bottom: 2px solid #ff8b00;
    color: #333;
    font-weight: 550;
}

#content .el-tabs__active-bar {
    width: 0px !important;
    background-color: #ff8b00;
}

#content .el-tabs__item:hover {
    color: #ff8b00;
    cursor: pointer;
}
</style>