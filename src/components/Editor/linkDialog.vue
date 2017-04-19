<template>
  <el-dialog v-model="options.show" title="添加链接" :close-on-press-escape="true"  @open="open" :modal="false" :close-on-click-modal="false">
    <el-form label-width="80px" label-position="right">
      <el-form-item label="链接内容">
        <el-input v-model="linkText" :autofocus="true"></el-input>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="linkAddress"></el-input>
      </el-form-item>
      <el-form-item label="链接标题">
        <el-input v-model="linkTitle"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
      return {
        linkAddress: '',
        linkText: '',
        linkTitle: '',
        modal:false
      }
    },
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    methods: {
      cancel: function() {
        this.close();
      },
      confirm: function() {
        let link = '[' + this.linkText + '](' + this.linkAddress + (this.linkTitle ? ' "' + this.linkTitle + '"' : '') + ')';
        this.options.cm.replaceSelection(link);
        this.close();
      },
      close: function() {
        this.linkText = '';
        this.linkTitle = '';
        this.linkAddress = '';
        this.options.show = false;
        this.options.cm.focus();
      },
      open: function() {
        if (this.options.cm.somethingSelected()) {
          console.log(this.options.cm.getSelection());
          this.linkText = this.options.cm.getSelection();
        }
      }
    }
}
</script>
<style scoped>
</style>
