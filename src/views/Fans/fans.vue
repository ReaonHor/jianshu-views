<template>
  <div>
    <el-table :data="fans">
      <el-table-column>
        <template #default="scope">
          <div class="fans-list">
            <div>
              <el-tag type="danger" size="small" effect="plain">粉丝</el-tag>
              {{scope.row.username}} 关注了你
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
      fans: [],
      page: 1,
      pageSize: 0,
      count: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http({
        path: '/fans/findAll',
        method: 'get',
        params: {
          page: this.page,
          author: this.$store.state.username
        }
      }).then(res => {
        this.fans = res.data.data
        this.page = res.page
        this.pageSize = res.pageSize
        this.count = res.count
      })
    },
    changePage (page) {
      this.page = page
      this.getData()
    },
    changePageSize (pageSize) {

    }
  }
}
</script>


<style scoped>
.fans-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>