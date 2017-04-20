<template>
  <el-dialog v-model="options.show" size="tiny" :close-on-press-escape="true" :modal="false" :close-on-click-modal="false" @close="close">
    <span slot="title"><i class="el-icon-z-wenzhang-copy"></i><span style="margin-left:5px;">新建文章</span></span>
    <el-form label-width="80px" label-position="top">
      <el-form-item label="文章标题">
        <el-input v-model.trim="postTitle" :autofocus="true"></el-input>
      </el-form-item>
      <!-- <el-form-item label="标签分类">
        <el-input v-model.trim="tag" @keyup.enter.native="addTag">
          <el-button slot="append" icon="plus" @click.native="addTag"></el-button>
        </el-input>
        <el-tag v-for="(tagItem,index) in tags" :closable="true" type="gray" @close="tagDelete(tagItem)">{{tagItem}}
        </el-tag>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  createNewPost
} from '../../api/api'

export default {
  data() {
      return {
        postTitle: '',
        // tag: '',
        // tags: []
      }
    },
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    methods: {
      // tagDelete(tag) {
      //   this.tags.splice(this.tags.indexOf(tag), 1);
      // },
      // addTag: function() {
      //   if (this.tag !== '') {
      //     this.tags.push(this.tag);
      //     this.tag = ""
      //   }
      // },
      close: function() {
      	this.postTitle = '';
        this.options.cm.setOption('readOnly', false)
        this.options.cm.focus();
        this.$emit('close')
      },
      cancel: function() {
        this.close();
      },
      confirm: function() {
        let _this = this;
        _this.options.cm.setValue('');
        _this.options.cm.clearHistory();
        _this.options.cm.markClean();
        _this.options.cm.replaceSelection('# ' + this.postTitle)
        let postPromise = createNewPost(this.postTitle, this.options.cm.getValue());
        postPromise.then(function(post) {
          console.log(post);
          localStorage.setItem('currentPostID', post.id)
          _this.close()
        }, function(err) {
          _this.$message({
            message: '新建文章失败！',
            type: 'error'
          })
          console.log(err);
        })


      }
    }
}
</script>
<style scoped>
.el-tag {
  margin: 3px;
}
</style>
