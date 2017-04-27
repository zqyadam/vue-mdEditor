<template>
  <el-dialog @close="close" v-model="options.show" @open="open" :close-on-press-escape="true" :modal="false" :close-on-click-modal="false">
    <span slot="title"><i class="el-icon-z-folder-open-o"></i><span style="margin-left:5px;">打开文件</span></span>
    <el-collapse accordion v-model="activePanel">
      <el-collapse-item title="打开网络文件" name="1">
        <el-table style="width: 100%" :data="postArr" :border="true" height="300">
          <el-table-column property="attributes.title" label="文件名"></el-table-column>
          <el-table-column property="attributes.category.attributes.label" label="分类" width="150"></el-table-column>
          <el-table-column property="postOperate" label="分类" align="center" width="80">
            <template scope="scope">
              <el-button type="primary" size="small" @click="openWebPost(scope.row)">
                打开
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="打开本地文件" name="2">
        <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="openLocalFile">
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">选择本地文件进行打开</div>
        </el-upload>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>
<script>
import {
  getAllPosts
} from '../../api/api'

export default {
  data() {
      return {
        activePanel: '1',
        postArr: []
      }
    },
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    methods: {
      open: function() {
        let _this = this;
        getAllPosts().then(function(posts) {
          _this.postArr = posts;
        }, function(err) {
          this.$message({
            message: '获取文件列表失败！',
            type: 'error',
            showClose: true
          })
          console.log(err);
        })
      },
      close: function() {
      	console.log('closing openPostDialog');
      	this.postArr = null;
        this.$parent.openPostDialog = false;
      },
      openWebPost: function(row) {
        console.log('打开网络文件:');
        this.$parent.webPost = row;
        this.$parent.cm.setValue(row.attributes.content)
        this.$parent.cm.markClean();
        localStorage.setItem('currentPostID', row.id);
        this.$message({
          message: '打开文章成功！',
          type: 'success',
          showClose: true
        })
        this.$parent.openPostDialog = false;
      },
      openLocalFile: function(file) {
        if (/\.(md|txt)$/i.test(file.name)) {
          // 打开本地文件
          console.log('打开本地文件');
          this.$parent.openLocalFile(file);
        }
        this.$parent.openPostDialog = false;
        // 禁止上传
        return false;
      }
    }
}
</script>
<style scoped>
.avatar-uploader {
  text-align: center;
  margin-bottom: 5px;
}

.avatar-uploader-icon {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-size: 38px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}

.avatar-uploader-icon:hover {
  border-color: #20a0ff;
}
</style>
