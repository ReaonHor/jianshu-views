<template>
  <header>
    <div class="login">
      <h2>简书</h2>
    </div>
    <div class="nav">
      <ul>
        <li class="active" @click="toSquire()">广场</li>
        <li @click="toBack()">个人后台</li>
        <li v-show="!this.$store.state.username" @click="toLogin()">登录/注册</li>
        <li v-show="this.$store.state.username">{{this.$store.state.username}}</li>
      </ul>
    </div>
    <div class="avatar" v-show="this.$store.state.avatar">
      <img :src="this.$store.state.avatar">
    </div>
  </header>
  <router-view></router-view>
  <footer>
    <div class="msg"></div>
  </footer>

</template>

<script>
import List from "@/views/Web/list.vue"
export default {
  methods: {
    toLogin () {
      this.$router.push("/login")
    },
    load () {

    },
    toBack () {
      this.$store.state.username ? this.$router.push("/admin/users/personal") : this.$router.push("/login")
    },
    toSquire () {
      this.$router.push("/")
    }
  },
  components: {
    articleList: List
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: #545c64;
  color: #fff;
  z-index: 10;
  cursor: pointer;
  .active {
    color: #ffd04b;
    border-bottom: 2px solid #ffd04b;
  }
  .login {
    float: left;
    margin-left: 30px;
  }
  .nav {
    float: right;
    margin-right: 60px;
    ul {
      li {
        float: left;
        padding: 0 30px;
        font-size: 18px;
        height: 60px;
        box-sizing: border-box;
      }
    }
  }
  .avatar {
    float: right;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 10px;
    margin-right: 30px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}

footer {
  height: 150px;
  background-color: #f9f9f9;
  padding-top: 50px;
}
</style>