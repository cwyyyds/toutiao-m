<template>
  <div>
    <!-- 每一篇文章的结构 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPage"
        offset="0"
        finished-text="没有更多了"
        :finished="isFinished"
        :error.sync="error"
        error-text="出错了.请重新加载"
      >
        <ArticleItem
          v-for="(item, index) in articles"
          :key="index"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem'
export default {
  data() {
    return {
      articles: '',
      pre_timestamp: '',
      isFinished: false,
      error: false,
      isLoading: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    //频道id
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        //保存第一次页码
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
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
    async loadNextPage() {
      try {
        //滚动条触底，加载下一页数据
        const { data } = await getArticleList(this.id, this.pre_timestamp)

        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }

        if (this.isLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          // 将第n页的数据，放在articles
          this.articles.push(...data.data.results)
        }

        //更新页数
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        //不管对错都会执行
        // loding设置为false
        this.loading = false
        this.isLoading = false
      }
    }
  }
}
</script>

<style></style>
