<template>
  <div class="login">
    <div class="login-bl">
      <h2>简书</h2>
      <div class="input_data">
        <input type="text" required="required" v-model="username" @input="maxLength">
        <div class="underline"></div>
        <label>用户名 <em v-show="ntl" class="long"> 用户名过长</em></label>
      </div>
      <div class="input_data">
        <input type="password" required="required" v-model="pwd" @input="maxLength">
        <div class="underline"></div>
        <label>密码 <em v-show="ptl" class="long"> 密码过长</em></label>
      </div>
      <div class="login_in">
        <span v-show="!isreg" @click="login">登 录</span>
        <span v-show="isreg" @click="reg">注 册</span>
      </div>
      <div class="reg">
        <span v-show="!isreg">还没有注册？点击</span>
        <span v-show="isreg">已经注册了？点击</span>
        <em v-show="!isreg" @click="handeleReg">注册</em>
        <em v-show="isreg" @click="handeleReg">登录</em>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/http/index'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      ntl: false,
      ptl: false,
      isreg: false,
      username: '',
      pwd: ''
    }
  },
  methods: {
    open4 () {

    },
    handeleReg () {
      this.isreg = !this.isreg
    },
    maxLength () {
      this.username.length > 10 ? this.ntl = true : this.ntl = false
      this.pwd.length > 16 ? this.ptl = true : this.ptl = false
    },
    login () {
      if (!this.ntl && !this.ptl) {
        http({
          method: 'post',
          path: '/users/login',
          params: {
            username: this.username,
            pwd: this.pwd
          }
        }).then(res => {
          if (res.data.msg === '登录成功') {
            ElMessage({
              message: '登录成功',
              type: 'success',
            }
            )
            this.$router.push('/admin/users/personal')
            this.$store.commit('getUsername', this.username)
          }
          if (res.data.msg === '用户名或者密码错误') {
            ElMessage.error('用户名或者密码错误')
          }
        })

      }
    },
    reg () {
      if (!this.ntl && !this.ptl) {
        http({
          method: 'post',
          path: '/users/reg',
          params: {
            username: this.username,
            pwd: this.pwd
          }
        }).then(res => {
          if (res.data.msg === '用户名存在') {
            alert("用户名已存在")
            this.username = ''
            this.pwd = ''
          }
          if (res.data.msg === '注册成功') {
            ElMessage({
              message: '注册成功',
              type: 'success',
            }
            )
            this.isreg = !this.isreg
          }
        })
      }
    },
  }



}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../../assets/jianshulogin.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;
  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    top: 0;
    left: 0;
    background: inherit;
    filter: blur(1.5px);
    z-index: 2;
  }
  .login-bl {
    box-sizing: border-box;
    position: absolute;
    right: 100px;
    top: 100px;
    height: 500px;
    width: 450px;
    padding: 30px;
    background-color: #fff;
    z-index: 10;
    border-radius: 20px;
    text-align: center;
    .long {
      color: #d61313;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      font-family: 宋体;
    }
    .reg {
      margin-top: 50px;
      padding-right: 20px;
      float: right;
      font-size: 14px;
      cursor: pointer;
      em {
        color: #056de8;
        font-weight: 600;
      }
    }
    h2 {
      margin-bottom: 80px;
      letter-spacing: 15px;
      cursor: default;
    }
    .login_in {
      height: 40px;
      width: 100%;
      margin-top: 60px;
      background-color: #056de8;
      color: #fff;
      line-height: 40px;
      font-size: 18px;
      font-weight: 550;
      border-radius: 5px;
      cursor: default;
      span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .input_data {
      position: relative;
      margin: 50px 0;
      width: 100%;
      height: 40px;
      label {
        position: absolute;
        bottom: 10px;
        left: 0;
        color: #808080;
        pointer-events: none;
        transition: all 0.3s ease;
      }
      input {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        font-size: 17px;
        border-bottom: 2px solid #c0c0c0;
        &:focus ~ label {
          transform: translateY(-25px);
          font-size: 15px;
          color: #2c6fdb;
        }
        &:valid ~ label {
          transform: translateY(-25px);
          font-size: 15px;
          color: #2c6fdb;
        }
        &:focus ~ .underline {
          transform: scaleX(1);
        }
        &:valid ~ .underline {
          transform: scaleX(1);
        }
      }
      .underline {
        position: absolute;
        bottom: -2px;
        height: 2px;
        width: 100%;
        background-color: #2c6fdb;
        transform: scaleX(0);
        transition: all 0.3s ease;
      }
    }
  }
}
</style>