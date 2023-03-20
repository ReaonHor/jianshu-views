<template>
  <main>
    <div class="detail">
      <h1>{{data.title}}</h1>
      <div class="msg clear">
        <div class="avatar">
          <img :src="this.$store.state.avatar" />
        </div>
        <div>
          <div class="follow">
            <span>{{data.author?data.author:'匿名'}}</span>
            <span>
              <el-button round size="small">关注</el-button>
            </span>
          </div>
          <div class="main-msg">
            <span>{{data.createTime}}</span>
            <span>阅读{{data.read}}</span>
          </div>
        </div>
      </div>
      <div class="content" v-html="data.content">
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data () {
    return {
      data: {
        title: '',
        author: '',
        createTime: '',
        read: 0,
        content: ''
      }
    }
  },
  created () {
    this.$http({
      path: "/article/findOne",
      method: "get",
      params: {
        id: this.$route.params.id
      }
    }).then(res => {
      this.data = { ...res.data.data }
    })

  }


}
</script>

<style lang="scss" scoped>
main {
  padding-top: 78px;
  background-color: #f9f9f9;
  .clear {
    &::after {
      content: '.';
      clear: both;
      display: block;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }
  .detail {
    width: 700px;
    margin: 0 auto;
    background-color: #ffffff;
    height: 1000px;
    padding: 30px;
    h1 {
      margin: 32px 0 15px;
      color: #404040;
      font-size: 30px;
    }
    .msg {
      & > div {
        float: left;
      }
    }
    .msg {
      margin-bottom: 32px;
      .follow {
        color: #404040;
        font-size: 16px;
        span {
          margin-left: 10px;
        }
      }
      .main-msg {
        color: #969696;
        font-size: 13px;
        margin-top: 10px;
        span {
          margin-left: 10px;
        }
      }
      .avatar {
        background-color: #fff;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .content {
      p {
        color: #404040;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI', 'PingFang SC',
          'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica,
          Arial, sans-serif;
      }
      img {
      }
    }
  }
}
</style>