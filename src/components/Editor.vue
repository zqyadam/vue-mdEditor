<template>
  <div class="main" v-loading="loading">
    <!-- toolbar  :element-loading-text="loadingText"-->
    <el-button-group class="dark" id="toolbar">
      <template v-for="tool in toolbar">
        <el-tooltip v-if="tool != 'split'" effect="dark" :content="toolbarIconTips[tool]?toolbarIconTips[tool]:tool" placement="bottom">
          <el-button :plain="true" :icon="toolbarIconsClass[tool]" size="small" @click="execuateCallback(tool)" class="dark"></el-button>
        </el-tooltip>
        <span class="split" v-else></span>
      </template>
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

import {
  toolbar,
  toolbarIconsClass,
  toolbarIconTips,
  toolbarHandlers
} from '../utils/defaultToolbar.js'

import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/edit/continuelist.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/lib/codemirror.css'
import '../css/myCodeMirror.css'

import marked from '../utils/markdownSettings.js'




// import marked from 'marked'
import 'github-markdown-css/github-markdown.css';


import fakeData from '../fake/data.js'


// hightlilght
import Prism from 'prismjs/prism.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js'
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords.min.js'
import 'prismjs/plugins/toolbar/prism-toolbar.min.js'
import 'prismjs/plugins/show-language/prism-show-language.min.js'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js'

import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/toolbar/prism-toolbar.css'

export default {
  data() {
      return {
        layoutDirection: true,
        MdContent: '',
        cm: null,
        editWidth: 50,
        readWidth: 50,
        editShow: true,
        readShow: true,
        loading: false,
        enableSyncScroll: true,
        editorScrolling: false,
        previewerScrolling: false,
        toolbar: toolbar,
        toolbarIconsClass: toolbarIconsClass,
        toolbarIconTips: toolbarIconTips,
        toolbarHandlers: toolbarHandlers,
      }
    },
    methods: {
      tocTreeToHtml: function(tree) {
        let startLabel = "<ul>";
        let endLabel = "</ul>";
        let html = "";
        for (let item of tree) {
          if (item.children) {
            html += '<li><a href="#' + item.id + '">' + item.text + '<a>' + this.tocTreeToHtml(item.children) + '</li>\n';
          } else {
            html += '<li><a href="#' + item.id + '">' + item.text + '<a></li>\n'
          }
        }
        return startLabel + html + endLabel;
      },
      execuateCallback: function(name) {
        if (this.toolbarHandlers[name]) {
          this.toolbarHandlers[name](this.cm, this)
        }
      },
      editorScroll: function(cm, e) {
        let _this = this;
        if (this.enableSyncScroll) {
          if (this.editorScrolling) {
            this.editorScrolling = false;
            return
          }
          this.previewerScrolling = true;
          let scrollObj = _this.cm.getScrollInfo();
          let percent = scrollObj.top / scrollObj.height;
          let previewer = document.getElementById('previewer');
          previewer.scrollTop = percent * previewer.scrollHeight;
        }
      },
      previewerScroll: function(e) {
        let _this = this;
        if (this.enableSyncScroll) {
          if (this.previewerScrolling) {
            this.previewerScrolling = false;
            return;
          }
          this.editorScrolling = true;
          let previewer1 = e.target;
          let percent = previewer1.scrollTop / previewer1.scrollHeight;
          let scrollObj = _this.cm.getScrollInfo();
          let editorTop = percent * scrollObj.height;
          _this.cm.scrollTo(null, editorTop)
        }
      },
    },
    computed: {
      HTMLContent: function() {
        let Content = marked(this.MdContent);
        let tocTree = marked.tocToTree();
        let html = Content.replace(/<p class="markdown-toc">(.*)<\/p>/gi, this.tocTreeToHtml(tocTree))
        return html;
      }
    },
    watch: {
      HTMLContent: function() {
        let _this = this;
        this.$nextTick(function() {
          // DOM 更新了
          Prism.highlightAll()
        })
      }
    },
    mounted: function() {
      let _this = this;

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

      //  滚动监听
      //  编辑区滚动
      this.cm.on('scroll', this.editorScroll)
        // 预览区滚动
      document.getElementById('previewer').addEventListener('scroll', _this.previewerScroll)

      // 内容变化监听
      this.cm.on('change', (cm, changeObj) => {

        if (!_this.rendering) {
          setTimeout(function() {
            _this.MdContent = cm.getValue();
            _this.rendering = false
          }, 300)
          _this.rendering = true;
        }
      })
      // 添加快捷键
      this.cm.setOption('extraKeys', {
        'Enter': "newlineAndIndentContinueMarkdownList",
        'Ctrl-B': () => {
          this.execuateCallback('bold');
        },
        'Ctrl-I': () => {
          this.execuateCallback('italic');
        },
        'Ctrl-Q': () => {
          this.execuateCallback('quote');
        },
        'Ctrl-1': () => {
          this.execuateCallback('h1');
        },
        'Ctrl-2': () => {
          this.execuateCallback('h2');
        },
        'Ctrl-3': () => {
          this.execuateCallback('h3');
        },
        'Ctrl-4': () => {
          this.execuateCallback('h4');
        },
        'Ctrl-5': () => {
          this.execuateCallback('h5');
        },
        'Ctrl-6': () => {
          this.execuateCallback('h6');
        },
        'Ctrl-L': () => {
          this.execuateCallback('link');
        },
        'Shift-Ctrl-L': () => {
          this.execuateCallback('linkWithoutDialog');
        },
        'Ctrl-T': () => {
          this.execuateCallback('t');
        },
        'Ctrl-P': () => {
          this.execuateCallback('image');
        },
        'Ctrl-K': () => {
          this.execuateCallback('inlineCode');
        },
        'Shift-Ctrl-K': () => {
          this.execuateCallback('blockCode');
        },
        'Ctrl-Enter':()=>{
          this.execuateCallback('addNewLineAppend');
        },
        'Shift-Ctrl-Enter':()=>{
          this.execuateCallback('addNewLinePrepend');
        }
      })

      this.cm.setValue(fakeData)

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
  /*line-height: 1;*/
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
