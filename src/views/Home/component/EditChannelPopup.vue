<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <!-- 我的频道 -->
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 我的频道 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="(item, index) in myChannels"
            :key="item.id"
            :text="item.name"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="onClickMyChannel(item, index)"
          >
            <template #icon>
              <van-icon
                v-show="isEdit && item.name !== '推荐'"
                name="cross"
                class="icon-name-x"
              />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <!-- 推荐频道的标题 -->
        <van-cell title="推荐频道"></van-cell>

        <!-- 推荐频道 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="item in recommendChannels"
            :key="item.id"
            :text="item.name"
            icon="plus"
            @click="addMyChannel(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShow: false,
      allChannels: [],
      isEdit: true
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onClickMyChannel(channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        //删除
        return this.$emit('del-mychannel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    addMyChannel(myChannel) {
      this.$emit('add-mychannel', { ...myChannel })
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        // const result = this.myChannels.find((i) => i.id === item.id)
        // if (result) {
        //   return false
        // } else {
        //   return true
        // }
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.popupMain {
  padding-top: 100px;
  //按钮的样式
  .edit-btn {
    color: #fff;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid #fff;
    background-image: linear-gradient(-100deg, darkgreen, limegreen);
  }
}
// 我的频道
.my-channel {
  .active-channel {
    :deep(.van-grid-item__text) {
      color: red;
    }
  }
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        text-align: center;
        line-height: 0.32rem;
      }
      .icon-name-x {
        font-size: 1px;
        background-color: #e493d0;
      }
    }
  }
}
// 推荐频道的样式
.recommend-channel {
  // 推荐频道加号样式

  :deep(.van-grid-item__content) {
    flex-direction: row;
    background-color: #f5f6f7;
    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
