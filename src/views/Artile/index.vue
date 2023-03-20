<template>
  <div>
    <el-table :data="articles" style="width:100%">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="发布时间" prop="createTime"></el-table-column>
      <el-table-column label="来源" prop="stemfrom"></el-table-column>
      <el-table-column label="阅读量" prop="read"></el-table-column>
      <el-table-column label="点赞量" prop="star"></el-table-column>
      <el-table-column label="评论数" prop="comment"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="update(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      page: 1,
      pageSize: 0,
      count: 0,
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http({
        path: '/article/findAll',
        method: 'get',
        params: {
          page: this.page,
          author: this.$store.state.username
        }
      }).then(res => {
        this.articles = res.data.data
        this.page = res.data.page
        this.pageSize = res.data.pageSize
        this.count = res.data.count
      })
    },
    update (row) {
      this.$router.push({
        path: '/admin/artical/update',
        query: {
          id: row.id
        }
      })
    },
    del (row) {
      console.log(row)
      this.$confirm('确定要删除文章？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          path: '/article/del',
          method: 'post',
          params: {
            id: row.id
          }
        }).then(res => {
          console.log(res.data)
          this.$message({
            message: res.data.msg,
            type: res.code === 200 ? 'success' : 'error'
          })
          if (res.data.code === 200) {
            this.getData()
          }
        })
      }
      )
    },
    changePage (page) {
      this.page = page
    }

  }

}
</script>

<style scoped>
.el-pagination {
  margin-top: 100px;
}
</style>
