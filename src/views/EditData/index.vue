<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="details-navBar"
    />
    <!-- 编辑信息 -->
    <div class="edit">
      <!-- 头像 -->
      <input type="file" hidden ref="file" @change="onFileChange" />

      <van-cell title="头像" is-link @click="$refs.file.click()">
        <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
      </van-cell>
      <!-- 编辑头像弹层 -->
      <van-popup
        v-model="isUpdatePhotoShow"
        style="height: 100%"
        position="bottom"
      >
        <updatePhoto
          v-if="isUpdatePhotoShow"
          @update-photo="userInfo.photo = $event"
          @close="isUpdatePhotoShow = false"
          :img="img"
        />
      </van-popup>
      <!-- 编辑头像弹层 -->
      <!-- 昵称 -->
      <van-cell
        title="昵称"
        is-link
        :value="userInfo.name"
        @click=";(nameShow = true), (message = userInfo.name)"
      />

      <!-- 弹窗 -->
      <van-popup
        v-model="nameShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <!-- 导航栏 -->
        <van-nav-bar
          title="更新昵称"
          left-text="取消"
          right-text="保存"
          @click-left="onClickLeft"
          @click-right="onClickRight(message)"
        />
        <!-- 输入框 -->
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="20"
          show-word-limit
        />
      </van-popup>
      <!-- 性别 -->
      <van-cell
        title="性别"
        is-link
        :value="userInfo.gender == 0 ? '男' : '女'"
        @click="genderShow = true"
      />
      <!-- 弹窗 -->
      <van-popup
        v-model="genderShow"
        position="bottom"
        :style="{ height: '45%' }"
      >
        <!-- 选择器 -->
        <van-picker
          show-toolbar
          title="更新性别"
          :columns="columns"
          :default-index="userInfo.gender"
          @confirm="updateUserGender"
          @cancel="onCancel"
        />
      </van-popup>
      <!-- 生日 -->
      <van-cell
        title="生日"
        is-link
        :value="userInfo.birthday"
        @click="timerShow = true"
      />
      <!-- 弹窗 -->
      <van-popup
        v-model="timerShow"
        position="bottom"
        :style="{ height: '45%' }"
      >
        <!-- 时间 -->
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="updateUserBirthday"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import updatePhoto from './components/updatePhoto.vue'
import {
  getUser,
  updateUserName,
  updateUserGender,
  updateUserBirthday
} from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  components: {
    updatePhoto
  },
  data() {
    return {
      token: '',
      show: false,
      photo: '',
      isUpdatePhotoShow: false,
      img: '',
      userInfo: {},
      nameShow: false,
      message: '',
      columns: ['男', '女'],
      genderShow: false,
      timerShow: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17)
    }
  },
  created() {
    this.token = this.$store.state.user.token
    this.getUser()
    this.nowTimer()
  },
  methods: {
    //生日
    //确认
    async updateUserBirthday(value) {
      let birthday = dayjs(value).format('YYYY-MM-DD')
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserBirthday(this.token, birthday)
        this.timerShow = false
        this.getUser()
        this.$toast.clear()
        this.$toast.success('更新成功')
      } catch (error) {
        console.log(error)
        this.$toast.clear()
        this.$toast.fail('更新失败')
      }
    },
    //现在时间
    nowTimer() {
      let nowtimer = new Date(dayjs(new Date()).format('YYYY,MM,DD'))
      this.maxDate = nowtimer
      this.currentDate = new Date(this.userInfo.birthday)
    },

    // 性别
    async updateUserGender(value, index) {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserGender(this.token, index)
        this.genderShow = false
        this.getUser()
        this.$toast.clear()
        this.$toast.success('更新成功')
      } catch (error) {
        console.log(error)
        this.$toast.clear()
        this.$toast.fail('更新失败')
      }
    },

    onCancel() {
      this.genderShow = false
      this.$toast('取消')
    },
    // 名字左返回
    onClickLeft() {
      this.nameShow = false
    },
    // 名字右保存
    async onClickRight(message) {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserName(this.token, message)
        this.getUser()
        this.nameShow = false
        this.$toast.clear()
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.clear()
        this.$toast.clear()
        this.$toast.fail('更新失败')
      }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 获取blob数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      // 同一张图片，change事件不会触发
      this.$refs.file.value = ''
    },
    //获取用户信息
    async getUser() {
      try {
        const res = await getUser(this.token)
        this.userInfo = res.data.data
        //更改弹出生日
        let timer = this.userInfo.birthday.replace(/-/g, ',').split('')
        timer = timer.join('')
        this.currentDate = new Date(timer)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
//导航栏
.avatar {
  width: 0.8rem;
  height: 0.8rem;
}
/deep/.details-navBar {
  background-color: #3296fa;
  width: 100%;
  .van-icon-arrow-left {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
//编辑信息
</style>
