<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightData"
      :key="index"
      @click="clickFn(index)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>

      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'

export default {
  data() {
    return {
      suggestions: [],
      rawData: '',
      historyList: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    async getSearchSuggestion() {
      try {
        const res = await getSearchSuggestion(this.keywords)
        if (res.data.data.options.length == 0) {
          this.$toast.fail('没有搜索建议')
        }

        this.suggestions = res.data.data.options.filter(Boolean)
        this.rawData = res.data.data.options
      } catch (error) {
        console.log(error)
      }
    },
    clickFn(index) {
      let res = this.suggestions[index]
      this.$emit('clickFn', res)
      this.historyList = this.$store.state.historyList
      console.log(!!this.historyList.find((item) => item === res))
      if (!this.historyList.find((item) => item === res)) {
        this.historyList.unshift(res)
        this.$store.commit('setHistory', this.historyList)
      }
    }
  },
  computed: {
    highlightData() {
      //将搜索建议每一项处理
      const reg = new RegExp(this.keywords, 'ig')

      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
