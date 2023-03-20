<template>
  <div>
    <el-table :data="comments">
      <el-table-column>
        <template #default="scope">
          <div class="comment-list">
            <div>
              <el-tag type="info" size="small" effect="plain">用户</el-tag>
              {{scope.row.username}} 评论了你的文章【{{scope.row.articleTitle}}】
            </div>
            <div>
              {{scope.row.createTime}}
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      comments: [],
      page: 1,
      pageSize: 10,
      count: 0,
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http({
        path: '/comment/admin/find',
        method: 'get',
        params: {
          page: this.page,
          author: this.$store.state.username
        }
      }).then(res => {
        this.comments = res.data.data
        this.page = res.data.page
        this.pageSize = res.data.pageSize
        this.count = res.data.count
      })
    },
    changePage (page) {
      console.log(page)
      this.page = page
      this.getData()
    },
    sizechange () {

    }
  }
}
</script>

<style scoped>
.comment-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
