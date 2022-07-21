<template>
  <div>
    <van-list
      @load="onLoad"
      :finished="finished"
      finished-text="没有更多了"
      offset="0"
      :error.sync="error"
      error-text="出错了.请重新加载"
    >
      <van-cell v-for="(item, index) in resultList" :key="index">{{
        item.title
      }}</van-cell>
      <van-loading size="24px" v-show="isShow">加载中...</van-loading>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  data() {
    return {
      resultList: [],
      pageNumber: 1,
      per_pageNumber: 15,
      finished: false,
      error: false,
      isShow: false,
      throttle: true
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  created() {
    this.getSearchResult()
  },
  methods: {
    async getSearchResult() {
      try {
        const res = await getSearchResult(
          this.pageNumber,
          this.per_pageNumber,
          this.keywords
        )

        if (res.data.data.results.length == 0) {
          return this.$toast.fail('没有搜索结果')
        }
        this.resultList = res.data.data.results
      } catch (error) {
        //1. 获取状态码
        const status = error.response.status

        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    async onLoad() {
      if (this.throttle) {
        this.isShow = true
        this.throttle = false
        try {
          this.pageNumber++
          const res = await getSearchResult(
            this.pageNumber,
            this.per_pageNumber,
            this.keywords
          )

          if (res.data.data.results.length !== 0) {
            this.resultList.push(...res.data.data.results)

            this.throttle = true
          } else {
            this.finished = true
          }
        } catch (error) {
          this.error = true
        } finally {
          this.isShow = false
          //不管对错都会执行
          // loding设置为false
          this.loading = false
          this.isLoading = false
        }
      }
    }
  }
}
</script>

<style></style>
