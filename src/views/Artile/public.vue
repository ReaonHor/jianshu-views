<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="文章标题">
        <el-col :span="10">
          <el-input v-model="form.title" placeholder="请输入文章标题" clearable="" />
        </el-col>
      </el-form-item>
      <el-form-item label="文章内容">
        <div id="editor">

        </div>
      </el-form-item>
      <el-form-item label="文章来源">
        <el-radio label="原创" v-model="form.stemfrom" />
        <el-radio label="转载" v-model="form.stemfrom" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "wangeditor";
export default {
  mounted () {
    //创建editor实例
    this.editor = new Editor('#editor')

    //配置上传图片的接口
    this.editor.config.uploadImgServer = 'http://127.0.0.1:3000/upload/editor/img'
    this.editor.config.uploadFileName = 'editorFile'
    this.editor.config.uploadImgHeaders = {
      authorization: "Bearer " + this.$store.state.token
    }
    //设置富文本编辑器的高度
    this.editor.config.height = 430
    //设置提示文字
    this.editor.config.placeholder = '编辑文章内容'

    this.editor.create()
  },
  data () {
    return {
      editor: null,
      form: {
        title: '',
        stemfrom: '',
        author: this.$store.state.username
      }
    }
  },
  methods: {
    onSubmit () {
      let content = this.editor.txt.html()
      let date = new Date()
      this.$http({
        path: '/article/add',
        method: 'post',
        params: {
          id: Date.now(),
          title: this.form.title,
          createTime: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          stemfrom: this.form.stemfrom,
          content,
          author: this.form.author
        }
      }).then(res => {
        this.$message({
          message: res.data.msg,
          type: res.data.code === 200 ? 'success' : 'error'
        })
      })
    }
  }
}
</script>

<style>
</style>