<template>
  <div>
    <div class="details-userInfo">
      <div class="details-userInfo-L">
        <span>
          <img :src="articleObj.msg.aut_photo" alt="" />
        </span>
        <ul>
          <li>{{ articleObj.msg.aut_name }}</li>
          <li>{{ timer(articleObj.msg.pubdate) }}</li>
        </ul>
      </div>
      <!-- 关注 -->
      <userInfoAttention v-bind="$attrs"></userInfoAttention>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import userInfoAttention from './userInfoAttention.vue'
export default {
  inject: ['articleObj'],

  methods: {
    timer(nowtimer) {
      return dayjs(nowtimer).fromNow()
    }
  },
  components: {
    userInfoAttention
  }
}
</script>

<style lang="less" scoped>
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
</style>
