<template>
  <main>
    <div class="articles">
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="item in data" :key="item.id" class="infinite-list-item" @click="handleRoute(item.id)">
          <div class="msg" :class="imgControll(item.content)?'li-active':''">
            <div class="title">
              <a href="javascript:">{{item.title}}</a>
              <el-tag type="info" size="small" effect="plain">{{item.stemfrom}}</el-tag>
            </div>
            <div class="detail">
              {{setText(item.content)}}
            </div>
            <div class="meta">
              <span> {{item.author }} </span>
              <span>
                <el-icon>
                  <ChatDotSquare />
                </el-icon> {{item.comment}}
              </span>
              <span>
                <el-icon>
                  <Star />
                </el-icon> {{item.star}}
              </span>
            </div>
          </div>
          <div class="img" v-show="imgControll(item.content)">
            <img :src="imgControll(item.content)">
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    this.$http({
      path: '/article/find',
      method: 'get',
    }).then(res => {
      console.log(res.data.data)
      this.data = res.data.data
    })

  },
  methods: {
    toLogin () {
      this.$router.push("/login")
    },
    load () {

    },
    handleRoute (myid) {
      this.$router.push({
        name: "Detail",
        params: {
          id: myid
        }
      })
    },
    setText (html) {
      let txt = document.createElement("div");
      txt.innerHTML = html;
      let content = txt.innerText || txt.textContent;
      txt = null;
      content = content.slice(1, 90) + '...'
      return content;
    },
    imgControll (html) {
      let reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/;
      let src = html.match(reg)
      if (src) {
        return src[2]
      }
      else {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  padding-top: 60px;
  .articles {
    width: 700px;
    margin: 0 auto;
    padding: 30px 15px;
    .li-active {
      padding-right: 165px;
    }
    li {
      position: relative;
      height: 188px;
      border-bottom: 2px solid #f0f0f0;
      padding: 15px 0;
      .img {
        position: absolute;
        top: 45px;
        right: 10px;
        img {
          width: 150px;
          height: 100px;
        }
      }
      .title {
        font-size: 18px;
        font-weight: 600;
        a {
          color: #000;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
        .el-tag {
          position: absolute;
          top: 5px;
          right: 5px;
        }
      }
      .detail {
        margin-top: 15px;
        height: 90px;
        width: 100%;
        font-size: 13px;
        color: #999;
        line-height: 24px;
        overflow: hidden;
      }
      .meta {
        height: 20px;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        cursor: pointer;
        span {
          margin: 0 5px;
          transition: all 0.2s;
          &:hover {
            color: #ffd04b;
          }
        }
      }
    }
  }
}
</style>