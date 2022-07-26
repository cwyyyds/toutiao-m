<template>
  <div>
    <div v-if="isLogin">
      <div
        class="details-userInfo-R"
        v-if="isShow"
        @click="getUserInfoAttentionDelete(userToken, newupId)"
      >
        <van-button
          round
          type="info"
          size="small"
          style="background-color: #fff; color: #000; border: 1px solid #000"
          ><van-icon name="plus" />已关注</van-button
        >
      </div>
      <div class="details-userInfo-R" @click="getDetailsAttention" v-else>
        <van-button round type="info" size="small"
          ><van-icon name="plus" />关注</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
// beforeCreate  ->inject -> Props ->  Methods ->  Data -> Computed -> Watch ->provide-> created
import {
  getDetailsAttention,
  getUserInfoAttentionList,
  getUserInfoAttentionDelete
} from '@/api'
export default {
  props: {
    upId: {
      default: String,
      default: () => ''
    }
  },
  // inject: ['articleObj'],
  data() {
    return {
      userToken: '',
      newupId: '',
      UserInfoAttentionList: '',
      isShow: false,
      isLogin: false
    }
  },
  created() {
    this.newupId = this.upId
    this.userToken = this.$store.state.user.token
    this.getUserInfoAttentionList()
  },
  methods: {
    //关注
    async getDetailsAttention() {
      const res = await getDetailsAttention(this.userToken, this.newupId)
      this.newupId = res.data.data.target
      this.isShow = !!this.newupId
    },
    //关注列表
    async getUserInfoAttentionList() {
      try {
        const res = await getUserInfoAttentionList(this.userToken)
        this.UserInfoAttentionList = res.data.data.results
      } catch (error) {
        console.log(error)
      }
      // 判断列表里面有没有同样的up
      if (
        this.UserInfoAttentionList.some((value) => value.id === this.newupId)
      ) {
        this.isShow = true
      }
      this.isLogin = true
    },
    //删除
    async getUserInfoAttentionDelete(token, id) {
      await getUserInfoAttentionDelete(token, id), (this.isShow = false)
    }
  }
}
</script>

<style></style>
