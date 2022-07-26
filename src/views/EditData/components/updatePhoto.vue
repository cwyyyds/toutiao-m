<template>
  <div class="update-avatar">
    <img :src="img" ref="img" />
    <div class="toolbar">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm" @click="confirmFn">完成</span>
    </div>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  props: {
    img: {
      type: [String, Object],
      retuired: true
    }
  },
  mounted() {
    // 别忘了给当前的 img 增加ref 属性， 要不然获取不到
    const image = this.$refs.img
    this.Cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  methods: {
    confirmFn() {
      this.Cropper.getCroppedCanvas().toBlob(async (blob) => {
        // 创建formData数据
        const formData = new FormData()
        formData.append('photo', blob)
        this.$toast.loading({
          message: '裁剪中...',
          forbidClick: true,
          duration: 0
        })
        try {
          const res = await updateUserPhoto(formData)
          this.$emit('close')
          this.$emit('update-photo', res.data.data.photo)
          this.$toast.clear()
          this.$toast.success('头像更换成功')
        } catch (e) {
          console.log(e)
          this.$toast.clear()
          this.$toast.fail('更新失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
img {
  width: 100%;
}
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
