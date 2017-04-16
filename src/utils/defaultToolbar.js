import { requestImageUploadFromLocal } from '../api/api.js'

export const toolbar = ['newFile', 'openFile', 'saveFile', 'split', 'undo', 'redo', 'bold', 'italic', 'quote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'hr', 'link', 'image', 'inlineCode', 'blockCode', 'split', 'previewMode', 'editMode', 'readMode', 'exchange'];

export const toolbarIconsClass = {
  'newFile': 'z-file-o',
  'openFile': 'z-folder-open-o',
  'saveFile': 'z-save1',
  'undo': 'z-undo',
  'redo': 'z-redo',
  'bold': 'z-bold',
  'italic': 'z-italic',
  'quote': 'z-yinyong',
  'h1': 'z-h',
  'h2': 'z-h1',
  'h3': 'z-h3',
  'h4': 'z-h2',
  'h5': 'z-h5',
  'h6': 'z-h4',
  'ul': 'z-wuxuliebiao1',
  'ol': 'z-youxuliebiao',
  'hr': 'z-hengxian',
  'link': 'z-module-link',
  'image': 'z-tupian',
  'inlineCode': 'z-ai-code',
  'blockCode': 'z-daimakuai',
  'previewMode': 'z-shuanglan',
  'editMode': 'z-bianji',
  'readMode': 'z-computer',
  'exchange': 'z-exchange',

}

export const toolbarIconTips = {
  'undo': '撤销(Ctrl+Z)',
  'redo': '重做',
  'bold': '加粗(Ctrl+B)',
  'italic': '斜体(Ctrl+I)',
  'quote': '引用(Ctrl+Q)',
  'h1': '标题1(Ctrl+1)',
  'h2': '标题2(Ctrl+2)',
  'h3': '标题3(Ctrl+3)',
  'h4': '标题4(Ctrl+4)',
  'h5': '标题5(Ctrl+5)',
  'h6': '标题6(Ctrl+6)',
  'ul': '无序列表(Ctrl+Shift+U)',
  'ol': '有序列表(Ctrl+Shift+O)',
  'hr': '横线(Ctrl+H)',
  'link': '链接(Ctrl+L或Ctrl+Shift+L)',
  'image': '图像(Ctrl+Shift+P)',
  'inlineCode': '行内代码(Ctrl+K)',
  'blockCode': '代码块(Ctrl+Shift+K)',
  'previewMode':'实时预览',
  'editMode':'编辑模式',
  'readMode':'阅读模式',
  'exchange':'左右交换'
}
export const toolbarHandlers = {
  undo: function(cm) {
    cm.undo();
  },
  redo: function(cm) {
    cm.redo()
  },
  bold: function(cm) {
    Common.setWrapLabel(cm, '**')
  },
  italic: function(cm) {
    Common.setWrapLabel(cm, '*')
  },
  quote: function(cm) {
    Common.setStartLabel(cm, '> ')
  },
  h1: function(cm) {
    Common.setStartLabel(cm, '# ')
  },
  h2: function(cm) {
    Common.setStartLabel(cm, '## ')
  },
  h3: function(cm) {
    Common.setStartLabel(cm, '### ')
  },
  h4: function(cm) {
    Common.setStartLabel(cm, '#### ')
  },
  h5: function(cm) {
    Common.setStartLabel(cm, '##### ')
  },
  h6: function(cm) {
    Common.setStartLabel(cm, '###### ')
  },
  ul: function(cm) {
    Common.setStartLabel(cm, '- ')
  },
  ol: function(cm) {
    Common.setStartLabel(cm, '1. ')
  },
  hr: function(cm) {
    Common.insertLabel(cm, '\n\n------\n\n')
  },
  link: function(cm, _this) {
    let defaultText = ''
    if (cm.somethingSelected()) {
      defaultText = cm.getSelection();
      // cm.replaceSelection('[' + selection + ']()')
    }
    // Common.insertLabel(cm, '[]()');
    let dialog = {
      show: true,
      title: '插入链接',
      formElements: [{
        //Input、Select、Checkbox、Radio、Switch
        label: '链接地址:',
        type: 'input',
        value: 'http://'
      }, {
        label: '链接内容',
        type: 'input',
        value: defaultText
      }],
      formButtons: [{
        text: '取消',
        type: 'text',
        handler: function() {
          _this.hideDialog();
        }
      }, {
        text: '确定',
        type: 'primary',
        handler: function() {
          let url = dialog.formElements[0].value;
          let urlText = dialog.formElements[1].value;
          let link = '[' + urlText + '](' + url + ')';
          cm.replaceSelection(link)
          _this.hideDialog();
        }
      }]
    }
    _this.showDialog(dialog);
  },
  image: function(cm, _this) {
    let dialog = {
      show: true,
      title: '上传图像',
      formElements: [{
        type: 'file',
        accept: 'image/jpeg, image/jpg, image/png, image/bmp',
        handler: function(file) {
          console.log('image this');
          console.log(file);
          let filePromise = requestImageUploadFromLocal(file);
          // add progress 
          // _this.$set(_this.dialogInfo, 'progress', 0)
          _this.loading = true;
          _this.loadingText = '准备开始上传...';
          filePromise.save({
            onprogress: function(e) {
              // change progress
              // _this.dialogInfo.progress = parseInt(e.percent);
              if (parseInt(e.percent) === 100) {
                _this.loadingText = '即将上传完成... \\(^o^)/';
              } else {
                _this.loadingText = '拼命上传中，已上传' + parseInt(e.percent) + '%';
              }
            }
          }).then(function(file) {
            console.log('uploaded file info');
            console.log(file);

            let url = file.url();

            if (cm.somethingSelected()) {
              let selection = cm.getSelection();
              let mdImage = '![' + selection + '](' + url + ')';
              cm.replaceSelection(mdImage);
            } else {
              let mdImage = '![](' + url + ')';
              let pos = cm.getCursor('from');
              cm.replaceRange(mdImage, pos);
              cm.setCursor({
                line: pos.line,
                ch: pos.ch + 2
              });
              cm.replaceSelection('图像描述', 'around');
            }
            _this.hideDialog();
            _this.loading = false;
          }, function(err) {
            _this.hideDialog();
            _this.loading = false;
            console.log(err);
          })
          return false;
          // return new Promise(function() {},function() {});
        }
      }]
    }
    _this.showDialog(dialog);
  },
  inlineCode: function(cm) {
    Common.setWrapLabel(cm, '\`');
  },
  blockCode: function(cm) {
    let defaultLang = 'javascript'
    if (cm.somethingSelected()) {
      let pos = cm.getCursor('from');
      Common.setWrapLabel(cm, '\`\`\`' + defaultLang + '\n', '\n\`\`\`');
      cm.setSelection({ line: pos.line, ch: 3 }, { line: pos.line, ch: 3 + defaultLang.length })
    } else {
      let pos = cm.getCursor('start');
      let lineContent = cm.getLine(pos.line);
      if (lineContent.trim()) { // 如果当前行有内容
        cm.setCursor({ line: pos.line + 1, ch: 0 }); // 鼠标设置到下一行头
        Common.setWrapLabel(cm, '\`\`\`' + defaultLang + '\n', '\n\`\`\`\n'); //插入标签
        cm.setSelection({ line: pos.line + 1, ch: 3 }, { line: pos.line + 1, ch: 3 + defaultLang.length })
      } else { //当前行无内容
        Common.setWrapLabel(cm, '\`\`\`' + defaultLang + '\n', '\n\`\`\`\n');
        cm.setSelection({ line: pos.line, ch: 3 }, { line: pos.line, ch: 3 + defaultLang.length })
      }
    }
  },
  previewMode: function(cm, _this) {
    _this.readShow = true;
    _this.readWidth = 50;
    _this.editShow = true;
    _this.editWidth = 50;
  },
  editMode: function(cm, _this) {
    _this.editShow = true;
    _this.readShow = false;
    _this.editWidth = 100;
  },
  readMode: function(cm, _this) {
    _this.readShow = true;
    _this.editShow = false;
    _this.readWidth = 100;
  },
  exchange:function(cm,_this) {
_this.layoutDirection = !_this.layoutDirection;
  },
  // 不显示在工具栏的命令，仅支持快捷键
  t: function(cm) { // Ctrl+T
    let pos = cm.getCursor('from');
    let currentContent = cm.getLine(pos.line);
    if (currentContent.trim()[0] == '#') {
      Common.setStartLabel(cm, '#')
    } else {
      Common.setStartLabel(cm, '# ')
    }
  },
  linkWithoutDialog: function(cm) { // Ctrl+Shift+L
    if (cm.somethingSelected()) {
      let selection = cm.getSelection();
      cm.replaceSelection('[' + selection + ']()')
    } else {
      Common.insertLabel(cm, '[]()');
    }
    let pos = cm.getCursor();
    cm.setCursor({
      line: pos.line,
      ch: pos.ch - 1
    })
  },

  // 向后添加行
  addNewLineAppend: function(cm) { // Ctrl+Enter
    let pos = cm.getCursor();
    cm.setCursor({ line: pos.line + 1, ch: 0 });
    cm.replaceSelection('\n', 'start');
    cm.setCursor({ line: pos.line + 1, ch: 0 });
  },
  // 向前添加行
  addNewLinePrepend: function(cm) { // Ctrl+Shift+Enter
    let pos = cm.getCursor();
    cm.setCursor({ line: pos.line, ch: 0 });
    cm.replaceSelection('\n', 'start');
  }
}



let Common = (function() {
  /* 设置包围标签 */
  function setWrapLabel(cm, startLabel, endLabel = undefined) {
    if (!endLabel) {
      endLabel = startLabel;
    }
    let pos = cm.getCursor('from');
    if (cm.somethingSelected()) { // 存在选中文本
      let selection = cm.getSelection();
      let replaceContent = startLabel + selection + endLabel
      cm.replaceSelection(replaceContent)
    } else { // 没有选中文本
      cm.replaceSelection(startLabel + endLabel, 'start')
      cm.setCursor(pos.line, pos.ch + startLabel.length)
    }
  }
  /* 设置标题 */
  function setStartLabel(cm, startLabel) {
    let pos = cm.getCursor('from');
    cm.replaceRange(startLabel, {
      line: pos.line,
      ch: 0
    })
  }
  /* 设置标题 */
  function insertLabel(cm, label) {
    let pos = cm.getCursor('from');
    cm.replaceRange(label, pos)
    return pos;
  }

  // 返回模块
  return {
    setWrapLabel: setWrapLabel,
    setStartLabel: setStartLabel,
    insertLabel: insertLabel
  }
})()
