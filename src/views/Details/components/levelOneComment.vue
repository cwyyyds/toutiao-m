<template>
  <div class="comment">
    <div
      class="details-comment"
      v-for="item in oneCommentList"
      :key="item.com_id"
    >
      <!-- 左侧头像 -->
      <div class="details-comment-L">
        <img :src="item.aut_photo" />
      </div>
      <!-- 右侧文本 -->
      <div class="details-comment-R">
        <div class="details-comment-R-title">
          {{ item.aut_name }} <van-icon name="good-job-o">赞</van-icon>
        </div>
        <div class="details-comment-R-content">{{ item.content }}</div>
        <div class="details-comment-R-time">
          {{ timer(item.pubdate) }}
          <van-cell
            :title="`回复 ${item.reply_count}`"
            @click="getDetailsReply(item)"
            class="details-comment-R-time-reply"
          />
          <van-action-sheet
            v-model="showreply"
            :title="
              item.reply_count === 0 ? '暂无回复' : `${item.reply_count}条回复`
            "
            closeable
            close-icon="arrow-left"
            :round="false"
          >
            <!-- 楼主 -->
            <div v-if="showreply">
              <!-- 选中评论 -->
              <div class="details-comment">
                <div class="details-comment-L">
                  <img :src="item.aut_photo" />
                </div>
                <div class="details-comment-R">
                  <div class="details-comment-R-title">
                    {{ item.aut_name }}
                    <van-icon name="good-job-o">赞</van-icon>
                  </div>
                  <div class="details-comment-R-content">
                    {{ item.content }}
                  </div>
                  <div class="details-comment-R-time">
                    {{ timer(item.pubdate) }}
                    <van-cell
                      :title="`回复 ${item.reply_count}`"
                      class="details-comment-R-time-reply"
                    />
                    <div class="details-comment-R-time-placeholder"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 回复 -->
            <div class="details-comment-R-time-replyText">全部回复</div>
            <div>
              <div
                class="details-comment"
                v-for="ele in checkComment"
                :key="ele.com_id"
              >
                <div class="details-comment-L">
                  <img :src="ele.aut_photo" />
                </div>
                <div class="details-comment-R">
                  <div class="details-comment-R-title">
                    {{ ele.aut_name }}
                    <van-icon name="good-job-o">赞</van-icon>
                  </div>
                  <div class="details-comment-R-content">
                    {{ ele.content }}
                  </div>
                  <div class="details-comment-R-time">
                    {{ timer(ele.pubdate) }}
                    <van-cell
                      title="回复 0"
                      class="details-comment-R-time-reply"
                    />
                    <div class="details-comment-R-time-placeholder"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 底部栏评论 -->
            <div class="details-comment-R-time-reply-bottom" v-if="!show">
              <button @click="show = true">评论</button>
            </div>
            <van-overlay :show="show" v-else>
              <van-field
                v-model="message"
                rows="2"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
                class="bottom-input"
              >
                <template #extra>
                  <button
                    class="bottom-input-text"
                    @click="sendDetailsReply(item, item.com_id, message)"
                  >
                    发布
                  </button>
                </template>
              </van-field>
            </van-overlay>
          </van-action-sheet>
          <div class="details-comment-R-time-placeholder"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getDetailsReply, sendDetailsReply } from '@/api'
export default {
  inject: ['articleObj'],
  data() {
    return {
      checkComment: '',
      showreply: false,
      message: '',
      show: false
    }
  },
  props: {
    oneCommentList: {
      typeof: Array
    },
    CommentNumber: {
      type: Number,
      default: 0
    }
  },

  methods: {
    //选中评论
    async getDetailsReply(value) {
      try {
        const res = await getDetailsReply(value.com_id)
        console.log(res)
        this.checkComment = res.data.data.results
        this.showreply = true
      } catch (error) {
        console.log(error)
      }
    },
    timer(nowtimer) {
      return dayjs(nowtimer).fromNow()
    },
    //评论回复
    async sendDetailsReply(value, target, content) {
      try {
        await sendDetailsReply(
          this.$store.state.user.token,
          target,
          content,
          this.$route.params.keywords
        )

        this.show = false

        this.$emit('refresh')
        this.getDetailsReply(value)
      } catch (e) {
        console.log(e)
      }
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
//评论
.details-comment {
  padding-top: 0.25rem;
  padding-bottom: 0.21rem;
  display: flex;
  margin: 0 0.5rem;
  border-bottom: 1px solid #f5f6f7;
  .details-comment-L {
    img {
      width: 0.96rem;
      height: 0.96rem;
      margin-right: 0.33333rem;
      border-radius: 50%;
    }
  }
  .details-comment-R {
    font-size: 0.2rem;
    flex: 1;
    .details-comment-R-title {
      display: flex;
      justify-content: space-between;
      color: #406599;
      font-size: 0.35rem;
      padding: 0.1rem 0 0.5rem;
      .van-icon-good-job-o {
        color: #000;
      }
    }
    .details-comment-R-content {
      font-size: 0.45rem;
      font-weight: normal;
      color: #3d3d3d;
      padding-bottom: 0.34rem;
    }
    .details-comment-R-time {
      display: flex;
      align-items: center;
      .details-comment-R-time-reply {
        padding: 0 0.4rem;
        border: 0.0125rem solid #efefef;
        width: 1.8rem;
        font-size: 0.3rem;
        border-radius: 0.5rem;
        text-align: center;
        margin-left: 0.3rem;
        height: 0.66rem;
        flex: 1;
      }
      .details-comment-R-time-replyText {
        font-size: 0.38rem;
        height: 1.1rem;
        border-bottom: 1px solid #f5f6f7;
        line-height: 1.1rem;
        margin: 0 0.4rem;
      }
      .van-popup {
        max-height: 100%;
        height: 100%;
      }
      .details-comment-R-time-placeholder {
        flex: 3;
      }
    }
  }
}
.details-comment-R-time-reply-bottom {
  background-color: #ff69b4;
  bottom: 0px;
  position: fixed;
  width: 100%;
  height: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background-color: #fff;
    width: 8.5rem;
    height: 1.1rem;
    border-radius: 1.1rem;
    border: 0;
  }
}
/deep/.bottom-input {
  position: fixed;
  bottom: 0;
  z-index: 2;

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
</style>
