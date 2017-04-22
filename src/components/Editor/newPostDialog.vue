<template>
  <el-dialog v-model="options.show" size="tiny" :close-on-press-escape="true" :modal="false" :close-on-click-modal="false" @close="close" @open="open">
    <span slot="title"><i class="el-icon-z-wenzhang-copy"></i><span style="margin-left:5px;">新建文章</span></span>
    <el-form label-width="80px" label-position="top">
      <el-form-item label="填写文章标题">
        <el-input v-model.trim="postTitle" :autofocus="true"></el-input>
      </el-form-item>
      <!-- <el-form-item label="标签分类">
        <el-input v-model.trim="tag" @keyup.enter.native="addTag">
          <el-button slot="append" icon="plus" @click.native="addTag"></el-button>
        </el-input>
        <el-tag v-for="(tagItem,index) in tags" :closable="true" type="gray" @close="tagDelete(tagItem)">{{tagItem}}
        </el-tag>
      </el-form-item> -->
      <el-form-item label="选择文章分类">
        <el-select v-model="postCategory" filterable placeholder="请选择文章分类" style="width:100%">
          <el-option v-for="item in categories" :label="item.attributes.label" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  createNewPost,
  getCategories
} from '../../api/api'

export default {
  data() {
      return {
        postTitle: '',
        postCategory: '',
        categories: [],
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
    watch: {
      filterText(val) {
        this.$refs.categoryTree.filter(val);
      },
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
      open: function() {
        let _this = this;
        console.log('dialog open');
        getCategories().then(function(results) {
          _this.categories = results;
        }, function(err) {
          _this.$message({
            message: '获取文章分类列表失败！',
            type: 'error'
          })
          console.error(err);
        })
      },
      close: function() {
        this.postTitle = '';
        this.postCategory = '';
        this.options.cm.setOption('readOnly', false)
        this.options.cm.focus();
        this.$emit('close')
      },
      cancel: function() {
        this.close();
      },
      confirm: function() {
        let _this = this;
        if (_this.postTitle === '') {
          _this.$message({
            message: '文章标题不能为空！',
            type: 'error'
          })
          return
        }
        if (_this.postCategory === '') {
          _this.$message({
            message: '请选择文章分类！',
            type: 'error'
          })
          return
        }
        let postPromise = createNewPost(this.postTitle, this.options.cm.getValue());
        postPromise.then(function(post) {
          console.log(post);
          _this.options.cm.setValue('');
          _this.options.cm.clearHistory();
          _this.options.cm.markClean();
          _this.options.cm.replaceSelection('# ' + _this.postTitle + '\n\n')
          localStorage.setItem('currentPostID', post.id)
          localStorage.setItem('currentCategory',_this.postCategory)
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
