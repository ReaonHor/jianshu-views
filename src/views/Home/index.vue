<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="sys-title">简书后台管理系统</div>
        <div class="header-right">
          <ul>
            <li @click="toSquire">广场</li>
            <li class="active">个人后台</li>
            <li @click="toLogin">退出登录</li>
          </ul>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="/admin/users/personal" text-color="#fff" :router="true">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <UserFilled />
                </el-icon>
                <span>个人中心</span>
              </template>
              <el-menu-item index="/admin/users/personal">个人资料</el-menu-item>
              <el-menu-item index="/admin/users/password">修改密码</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <EditPen />
                </el-icon>
                <span>文章管理</span>
              </template>
              <el-menu-item index="/admin/artical">文章列表</el-menu-item>
              <el-menu-item index="/admin/artical/public">发布文章</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/admin/comment">
              <el-icon>
                <ChatLineSquare />
              </el-icon>
              <span>评论管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/fans">
              <el-icon>
                <HelpFilled />
              </el-icon>
              <span>粉丝管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/star">
              <el-icon>
                <Star />
              </el-icon>
              <span>点赞管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    toSquire () {
      this.$router.push("/")
    },
    toLogin () {
      this.$router.push("/login")
    }
  }
}
</script>

<style lang="scss" scopd>
.home {
  height: 100%;
  .el-header {
    background-color: #545c64;
    cursor: pointer;
    .sys-title {
      float: left;
      font-size: 18px;
      color: #fff;
      font-weight: bolder;
      line-height: 60px;
    }
    .header-right {
      float: right;
      line-height: 60px;
      .active {
        color: #ffd04b;
        border-bottom: 2px solid #ffd04b;
      }
      ul {
        li {
          float: left;
          padding: 0 45px;
          font-size: 18px;
          height: 60px;
          box-sizing: border-box;
          color: #fff;
        }
      }
    }
  }
  .el-aside {
    background-color: #545c64;
    min-width: none;
    .el-menu {
      border: 0px;
      min-width: none;
    }
  }
  .el-container {
    height: 100%;
  }
}
</style>