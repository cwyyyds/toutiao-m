<template>
  <div>
    <van-cell title="搜索历史">
      <template #right-icon>
        <van-icon
          v-if="isShow"
          @click="isShow = !isShow"
          name="delete-o"
        ></van-icon>
        <div v-else>
          <van-icon @click="clearFn" class="icon-left">全部删除 </van-icon>
          <van-icon @click="isShow = !isShow">完成</van-icon>
        </div>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in historyList"
      :key="index"
      @click="clickFn(item)"
      :style="{ 'pointer-events': !isShow ? 'none' : 'auto' }"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
      <template #right-icon>
        <van-icon
          name="cross"
          class="icon-name-x"
          v-show="!isShow"
          @click.stop="clearOneFn(index)"
          style="pointer-events: auto"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyList: [],
      isShow: true
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },

  methods: {
    clickFn(value) {
      this.$emit('clickFn', value)
    },
    //全部删除
    clearFn() {
      this.$store.commit('removeHistory', 'HEIMA_TOUTIAO_HISTORY')
      this.historyList = this.$store.state.historyList
      if (this.historyList.length === 0) {
        return
      }
      this.isShow = !isShow
    },
    clearOneFn(index) {
      this.historyList.splice(index, 1)
      this.$store.commit('setHistory', this.historyList)
    }
  },
  created() {
    this.historyList = this.$store.state.historyList
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
.van-icon-cross {
  position: absolute;
  top: 0;
  right: 14px;
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
.icon-name-x {
  font-size: 0.01333rem;
  background-color: #e493d0;
  transform: translateY(0.1rem);
  z-index: 99;
}
.icon-left {
  margin-right: 10px;
}
</style>
