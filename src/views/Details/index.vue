<template>
  <div class="details">
    <!-- 导航栏 -->
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
      class="details-navBar"
    />

    <!-- 标题 -->
    <h2 class="details-title">{{ articleObj.msg.title }}</h2>
    <!-- 用户信息 -->
    <userInfo :upId="upId" v-if="upId.length"></userInfo>
    <!-- 内容 -->
    <div v-html="articleObj.msg.content" class="details-text"></div>

    <!-- 分割线 -->
    <van-divider id="fenge">正文结束</van-divider>
    <!-- 加载 -->
    <van-loading color="#1989fa" />
    <!-- 评论 -->
    <levelOneComment
      :oneCommentList="commentList"
      :CommentNumber="CommentNumber"
      @refresh="getDetailsComment()"
    ></levelOneComment>

    <!-- 底部栏 -->
    <detailsFooter
      :CommentNumber="CommentNumber"
      :upId="upId"
      @refresh="getDetailsComment()"
    ></detailsFooter>
  </div>
</template>

<script>
import { getDetails, getDetailsComment } from '@/api'

import levelOneComment from './components/levelOneComment.vue'
import userInfo from './components/userInfo.vue'
import detailsFooter from './components/detailsFooter.vue'

export default {
  provide() {
    return {
      articleObj: this.articleObj
    }
  },

  data() {
    return {
      upId: '',
      articleObj: {
        msg: ''
      },
      commentList: [],
      CommentNumber: 0
    }
  },

  methods: {
    async getDetails(id) {
      const res = await getDetails(id)
      this.articleObj.msg = res.data.data
      this.upId = res.data.data.aut_id
    },
    //获取所有评论列表
    async getDetailsComment() {
      const res = await getDetailsComment(this.$route.params.keywords)
      this.commentList = res.data.data.results
      this.CommentNumber = res.data.data.total_count
    }
  },

  created() {
    this.getDetails(this.$route.params.keywords)
    this.getDetailsComment()
  },
  components: {
    levelOneComment,
    userInfo,
    detailsFooter
  }
}
</script>

<style lang="less" scoped>
.details {
  padding-bottom: 1.13rem;
}
//导航栏
.details-navBar {
  background-color: #3296fa;
  width: 100%;
  position: fixed;
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}
// 标题
.details-title {
  font-size: 0.52rem;
  padding: 0.66667rem 0.42667rem;
  margin: 0;
  color: #3a3a3a;
}

//内容
.details-text {
  -webkit-text-size-adjust: 100%;
  color: #24292e;
  font-size: 0.21333rem;
  line-height: 1.5;
  word-wrap: break-word;
  padding: 0.73333rem 0.42667rem;
  font-size: 0.21333rem;
  /deep/pre {
    padding: 0.21333rem;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 0.04rem;
  }
  /deep/a {
    color: #6aa4e7;
  }
  /deep/img {
    max-width: 100%;
    box-sizing: initial;
    background-color: #fff;
  }
  /deep/p {
    text-align: justify;
  }
  /deep/table {
    width: 100% !important;
    display: block;
    overflow: auto;
    border-collapse: collapse;
  }
  /deep/tbody {
    tr {
      background-color: #fff;
    }
    td {
      padding: 0.08rem 0.17333rem;
      border: 0.01333rem solid #dfe2e5;
    }
  }
}
</style>
