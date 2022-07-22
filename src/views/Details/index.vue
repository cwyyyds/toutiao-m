<template>
  <div class="details">
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
      class="details-navBar"
    />
    <!-- 标题 -->
    <h2 class="details-title">{{ articleObj.title }}</h2>
    <!-- 用户信息 -->
    <div class="details-userInfo">
      <div class="details-userInfo-L">
        <span>
          <img :src="articleObj.aut_photo" alt="" />
        </span>
        <ul>
          <li>{{ articleObj.aut_name }}</li>
          <li>{{ articleObj.comm_count }}</li>
        </ul>
      </div>
      <div class="details-userInfo-R">
        <van-button round type="info" size="small"
          ><van-icon name="plus" />关注</van-button
        >
      </div>
    </div>
    <!-- 内容 -->
    <div v-html="articleObj.content" class="details-text"></div>
    <!-- 分割线 -->
    <van-divider>正文结束</van-divider>
    <!-- 评论 -->
    <div class="details-comment">评论</div>
    <!-- 底部栏 -->
    <div class="details-bottom">
      <van-tabbar v-model="active">
        <van-button type="default">默认按钮</van-button>
        <van-tabbar-item icon="chat-o" badge="9"></van-tabbar-item>
        <van-tabbar-item icon="star-o"></van-tabbar-item>
        <van-tabbar-item icon="good-job-o"></van-tabbar-item>
        <van-tabbar-item icon="share"></van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { getDetails } from '@/api'
export default {
  data() {
    return {
      articleObj: {},
      active: 0
    }
  },
  methods: {
    async getDetails(id) {
      const res = await getDetails(id)
      this.articleObj = res.data.data
    },
    onClickLeft() {
      this.$router.back()
    }
  },
  created() {
    this.getDetails(this.$route.params.keywords)
  }
}
</script>

<style lang="less" scoped>
.details-navBar {
  background-color: #3296fa;
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
//用户信息
.details-userInfo {
  display: flex;
  justify-content: space-between;
  padding: 0rem 0.42667rem;
  .details-userInfo-L {
    display: flex;
    font-size: 0.2rem;
    img {
      width: 0.93333rem;
      height: 0.93333rem;
      margin-right: 0.22667rem;
      border-radius: 100%;
    }
    li {
      &:nth-child(1) {
        color: #000;
        margin-bottom: 0.15rem;
      }
      &:nth-child(2) {
        font-size: 0.30667rem;
        color: #b7b7b7;
      }
    }
  }

  .details-userInfo-R {
    /deep/.van-button--info {
      padding: 0 0.5rem;
      .van-icon-plus {
        margin-right: 0.15rem;
      }
    }
  }
}
//内容
.details-text {
  -webkit-text-size-adjust: 100%;
  color: #24292e;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
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
}
//品论
.details-comment {
  margin-bottom: 2.06667rem;
}
//底部栏
/deep/.details-bottom {
  height: 1.2rem;
  border-radius: 1px solid #d8d8d8;
}
</style>
