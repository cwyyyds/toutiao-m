<template>
  <div>
    <van-tabbar v-model="active" active-color="black" class="details-bottom">
      <van-cell
        title="写评论"
        @click="show = true"
        class="details-bottom-comment"
      />
      <van-action-sheet v-model="show" :round="false" class="bottom-input">
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        >
          <template #extra>
            <button class="bottom-input-text" @click="sendContent(message)">
              发布
            </button></template
          ></van-field
        >
      </van-action-sheet>

      <!-- 评论数 -->
      <van-tabbar-item
        icon="comment-o"
        :badge="CommentNumber"
      ></van-tabbar-item>
      <!-- 收藏 -->
      <van-tabbar-item
        icon="star"
        @click="cancelCollection"
        style="color: #3296fa"
        v-if="collectionIsShow"
      ></van-tabbar-item>

      <van-tabbar-item
        icon="star-o"
        @click="getCollection"
        v-else
      ></van-tabbar-item>

      <!-- 点赞 -->
      <van-tabbar-item
        icon="good-job"
        @click="cancelLike"
        v-if="goodisShow"
        style="color: #3296fa"
      ></van-tabbar-item>
      <van-tabbar-item
        icon="good-job-o"
        @click="getLike"
        v-else
      ></van-tabbar-item>

      <!-- 转发 -->
      <van-tabbar-item icon="share" @click="showShare = true" />
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
        @click-overlay="onSelect"
        @cancel="onSelect"
      />
    </van-tabbar>
  </div>
</template>

<script>
import {
  sendContent,
  getCollection,
  cancelCollection,
  getCollectionList,
  getLike,
  cancelLike
} from '@/api'
export default {
  props: {
    CommentNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active: '',
      show: false,
      message: '',
      userToken: '',
      collectionIsShow: '',
      collectionList: [],
      goodisShow: '',
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  created() {
    this.userToken = this.$store.state.user.token
    this.getCollectionList()
  },
  methods: {
    //转发
    onSelect() {
      this.showShare = false
    },

    //取消点赞
    async cancelLike() {
      try {
        await cancelLike(this.userToken, this.$route.params.keywords)
        this.goodisShow = false
      } catch (e) {
        console.log(e)
      }
    },
    //点赞
    async getLike() {
      try {
        await getLike(this.userToken, this.$route.params.keywords)
        this.goodisShow = true
      } catch (e) {
        console.log(e)
      }
    },
    //收藏列表
    async getCollectionList() {
      try {
        const res = await getCollectionList(this.userToken)
        this.collectionList = res.data.data.results
        // 判断列表里面有没有同样的收藏
      } catch (e) {
        console.log(e)
      }
    },
    //取消收藏
    async cancelCollection() {
      try {
        await cancelCollection(this.userToken, this.$route.params.keywords)
        this.collectionIsShow = false
      } catch (e) {
        console.log(e)
      }
    },
    //收藏
    async getCollection() {
      try {
        await getCollection(this.userToken, this.$route.params.keywords)
        this.collectionIsShow = true
      } catch (e) {
        console.log(e)
      }
    },
    //发评论
    async sendContent(content) {
      try {
        this.$toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true
        })
        await sendContent(this.userToken, this.$route.params.keywords, content)
        this.$toast.success('成功文案')
        this.message = ''
        this.show = false
        this.$emit('refresh')
      } catch (error) {
        this.$toast.clear()
        this.$toast.fail(error.response.data.message)
      }
    }
  },
  watch: {
    collectionList: {
      handler() {
        this.collectionIsShow = this.collectionList.some(
          (value) => value.art_id === this.$route.params.keywords
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
//底部栏
/deep/.details-bottom {
  height: 1.13rem;
  border-top: 1px solid #d8d8d8;
  .van-icon {
    font-size: 0.49rem;
  }
}
.details-bottom-comment {
  padding-top: 0;
  height: 0.62rem;
  width: 3.6rem;
  text-align: center;
  border: 0.0125rem solid #efefef;
  border-radius: 0.26667rem;
  margin: 0.3rem 0.35rem;
  line-height: 1.5;
  color: #a7a7a7;
}
.content {
  padding: 16px 16px 160px;
}

.bottom-input {
  .van-cell {
    height: 3.2rem;
    .van-field__value {
      overflow: visible;
      background: #f5f7f9;
      margin: 0.17rem 0.4rem 0.17rem 0;
      padding: 0.3rem 0.5rem 0 0.5rem;
    }
    .bottom-input-text {
      color: #bdd6ee;
      display: flex;
      align-items: center;
      background-color: transparent;
      border: 0;
    }
  }
}
</style>
