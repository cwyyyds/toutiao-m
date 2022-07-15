<template>
  <div>
    <van-nav-bar class="navbar" title="登录" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-form @submit="login" ref="form" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <!-- 验证码倒计时 -->
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            @finish="isShowCountDown = false"
            format="ss SSS"
            :millisecond="true"
          />
          <!-- 发送验证码 -->
          <van-button
            v-else
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules.js'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCountDown: false
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async login() {
      this.$toast.loading({
        message: '不要着急，加载中..',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        // 提示成功
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        const status = error.response.status
        let message = '登录错误,请刷新'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     //400的提示错
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 507:
        //     //服务端的错误
        //     this.$toast.fail('登录错误,请刷新')
        //     break
        //   default:
        //     //其他错误
        //     this.$toast.fail('登录错误,请刷新')
        //     break
        // }
        // this.$toast.fail('登录失败')
      }
    },
    async sendCode() {
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile')
        // 发送请求，获取验证码
        await sendCode(this.mobile)
        //显示倒计时
        this.isShowCountDown = true
      } catch (error) {
        console.log(error)

        if (!error) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    },
    increment() {
      this.$store.commit('setNumber', 1)
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.van-field {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 20;
  }
  :deep(.toutiao) {
    font-size: 0.5rem;
  }
}

.code-btn {
  background-color: #eee;
  padding: 0 10px;
  color: #666;
}
</style>
