<template>
  <div class="main" v-loading="loading">
    <!-- toolbar  :element-loading-text="loadingText"-->
    <el-button-group class="dark" id="toolbar">
      <el-tooltip effect="light" content="新建文档">
        <el-button icon="z-file-o" size="small" class="dark" :plain="true" @click="newFile"></el-button>
      </el-tooltip>
      <el-tooltip effect="light" content="打开本地文件">
        <el-button icon="z-folder-open-o" size="small" class="dark" :plain="true" @click="openLocalFile"></el-button>
      </el-tooltip>
      <el-tooltip effect="light" content="保存到本地">
        <el-button icon="z-save1" size="small" class="dark" :plain="true" @click="saveLocalFile"></el-button>
      </el-tooltip>
      <span class="split"></span>
      <!-- <el-tooltip v-for="tool in toolbarIcons" effect="light" :content="toolbarIconTips[tool]?toolbarIconTips[tool]:tool" placement="bottom">
        <el-button :plain="true" :icon="toolbarIconsClass[tool]" size="small" @click="execuateCallback(tool)" class="dark"></el-button>
      </el-tooltip>
      <span class="split"></span>
      <el-tooltip effect="light" content="实时预览">
        <el-button icon="z-shuanglan" size="small" class="dark" :plain="true" @click="previewMode"></el-button>
      </el-tooltip>
      <el-tooltip effect="light" content="编辑模式">
        <el-button icon="z-bianji" size="small" class="dark" :plain="true" @click="editMode"></el-button>
      </el-tooltip>
      <el-tooltip effect="light" content="阅读模式">
        <el-button icon="z-computer" size="small" class="dark" :plain="true" @click="readMode"></el-button>
      </el-tooltip>
      <el-tooltip effect="light" content="左右交换">
        <el-button icon="z-exchange" size="small" class="dark" :plain="true" @click="changeLayoutDirection"></el-button>
      </el-tooltip> -->
    </el-button-group>
    <!-- main -->
    <div class="half b" :class="layoutDirection?'direction':'reverse'">
      <section :style="{width:editWidth+'%'}" v-show="editShow">
        <div class="fit">
          <textarea id="editor"></textarea>
        </div>
      </section>
      <section :style="{width:readWidth+'%'}" style="max-width:1200px" v-show="readShow">
        <div class="previewer-container" id="previewer">
          <div class="markdown-body" id="HTMLContent" v-html="HTMLContent"></div>
        </div>
      </section>
    </div>
    <!-- a very complex dialog -_-!!  -->
    <!-- <el-dialog v-model="dialogInfo.show" :title="dialogInfo.title" :close-on-click-modal="false" :show-close="dialogInfo.showClose">
      <template v-for="(element,index) in dialogInfo.formElements">
        <template v-if="element.type === 'file'">
          <el-upload class="avatar-uploader" :before-upload="element.handler" action="" :show-file-list="false" select :accept="element.accept">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>
        <el-form v-else label-width="80px" label-position="right">
          <el-form-item :label="element.label">
            <el-input v-if="element.type === 'input'" v-model="element.value"></el-input>
            <el-select v-if="element.type === 'select'" v-model="element.value">
              <el-option v-for="option in element.options" :label="option.label" :value="option.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button v-for="button in dialogInfo.formButtons" :type="button.type" v-text="button.text" @click="button.handler"></el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import {
  requestLogout,
  requestImageUploadFromStream,
  requestImageUploadFromLocal
} from '../api/api.js'


import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/edit/continuelist.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/lib/codemirror.css'
import '../css/myCodeMirror.css'

// import marked from 'marked'
import 'github-markdown-css/github-markdown.css';

export default {
  data() {
      return {
        layoutDirection: true,
        // MdContent:'',
        HTMLContent: '',
        cm: null,
        editWidth: 50,
        readWidth: 50,
        editShow: true,
        readShow: true,
        loading: false
      }
    },
    mounted: function() {
      this.cm = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: 'markdown',
        lineNumbers: true,
        lineWrapping: true,
        foldGutter: true,
        tabSize: 2,
        autofocus: true,
        theme: "default",
        showCursorWhenSelecting: true,
        matchBrackets: true,
        styleActiveLine: true,
        autoCloseBrackets: true,
      });
    }
}
</script>
<style scoped>
.main {
  margin: 0px;
  border: none;
  display: flex;
  flex-direction: column;
  background-color: rgb(242, 242, 242);
  /*overflow-x: hidden;*/
}

.half {
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  /*  width: 100%;*/
  overflow-x: none;
}

.direction {
  flex-direction: row;
}

.reverse {
  flex-direction: row-reverse;
}

.half-item {
  width: 50%;
}

.b {
  border: 1px solid blue;
}


/* toolbar css */

#toolbar {
  display: flex;
  flex-direction: row;
  line-height: 1;
}

.dark {
  background-color: rgb(68, 68, 68);
  color: #EFF2F7;
  border: none;
}

.split {
  border: 1.5px solid #fff;
  margin: 3px 0px;
  padding: 0;
}


/* editor css */

.fit {
  width: 100%;
  height: 100%;
  overflow-y: none;
}


/*previewer css */


/*.paper {
  transition: all .45s cubic-bezier(0.23, 1, 0.32, 1);
  color: rgba(0, 0, 0, 0.87);
  background-color: #fcfcfc;
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  border-radius: 2px;
  height: 100%;
  padding: 20px;
  margin: 0 5px;
  word-break: break-all;
}*/

.previewer-container {
  height: 100%;
  width: 100%;
  margin: 0px;
  overflow-y: auto;
  background-color: rgb(249, 249, 245);
}


/* github-markdown.css */

.markdown-body {
  box-sizing: border-box;
  margin: 5px;
  padding: 15px;
  border: 2px dashed rgb(187, 187, 187);
  font-size: 18px;
  font-family: 'Consolas', '微软雅黑';
}
</style>
<style>
html {
  overflow: hidden;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader {
  text-align: center;
  margin-bottom: 5px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
