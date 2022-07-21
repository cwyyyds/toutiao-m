<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPage"
        @focus="visibleSearchSuggestion"
        background="#3296fa"
        class="search"
      />
    </form>
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  computed: {
    componentName() {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return SearchSuggestion
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    onSearch() {
      this.isShowSearchResult = true
      console.log('正在搜索')
    },

    backToPage() {
      this.$router.go(-1)
    },
    visibleSearchSuggestion() {
      this.isShowSearchResult = false
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
