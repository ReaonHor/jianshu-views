<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="头像">
        <el-upload class="avatar-uploader" action="http://127.0.0.1:3000/upload/img" name="myfile" :headers="uploadHeader" :show-file-list="false" :limit="1" :on-success="onSuccess">
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <el-icon v-if="!form.avatar" class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名">
        <el-col :span="4">
          <el-input v-model="form.username" />
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" v-model="form.sex" />
          <el-radio label="女" v-model="form.sex" />
          <el-radio label="保密" v-model="form.sex" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-col :span="6">
          <el-input v-model="form.desc" type="textarea" placeholder="填写你的个人简介" />
        </el-col>
      </el-form-item>
      <el-form-item label="手机号">
        <el-col :span="8">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-col :span="8">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  data () {
    return {
      uploadHeader: {
        authorization: `Bearer ${this.$store.state.token}`
      },
      form: {
        username: '',
        sex: '',
        avatar: '',
        desc: '',
        email: '',
        phone: ''
      }

    }
  },
  created () {
    this.$http({
      path: '/users/find',
      method: 'post',
      params: {
        username: this.$store.state.username
      }
    }).then(res => {
      // console.log(res.data.data)
      this.form = res.data.data
      this.$store.commit("getAvatar", this.form.avatar)
    })

  },
  methods: {
    onSuccess (res) {
      this.form.avatar = res.data
    },
    onSubmit () {
      this.$http({
        path: '/users/update/personal',
        method: 'post',
        params: this.form
      }).then(res => {
        console.log(res)
        this.$message({
          message: res.data.msg,
          type: res.data.code === 200 ? 'success' : 'error'
        })
      })
    }
  }

}
</script>

<style  scoped>
.avatar-uploader .avatar {
  width: 135px;
  height: 135px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 135px;
  height: 135px;
  text-align: center;
}
</style>