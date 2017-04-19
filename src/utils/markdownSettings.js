import marked from 'marked'


let renderer = new marked.Renderer();

marked.toc = [];
marked.tocToTree = function() {
  let toc = this.toc;
  let headlines = [];
  let last = {};

  for (let headline of Array.from(toc)) {
    let level = headline.level || (headline.level = 1);
    if (last[level - 1]) {
      var name;
      if (!last[name = level - 1].children) {
        last[name].children = [];
      }
      last[level - 1].children.push(headline);
    } else {
      headlines.push(headline);
    }
    last[level] = headline;
  }
  this.toc = [];
  return headlines;
}

renderer.listitem = function(text) {
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text.replace(/^\s*\[\s\]\s*/, "<input type=\"checkbox\" class=\"task-list-item-checkbox\" /> ")
      .replace(/^\s*\[x\]\s*/, "<input type=\"checkbox\" class=\"task-list-item-checkbox\" checked disabled /> ");
    return '<li style="list-style: none"><label>' + text + '</label></li>';
  } else {
    return '<li>' + text + '</li>';
  }
};
renderer.heading = function(text, level) {

  var isChinese = /[\u4e00-\u9fa5]+$/.test(text);
  var id = (isChinese) ? escape(text).replace(/\%/g, "") : text.toLowerCase().replace(/[^\w]+/g, "-");

  marked.toc.push({
    level: level,
    id: id,
    text: text
  });
  return '<h' + level + ' id="' + id + '">' + text + '</h' + level + '>\n';
};

renderer.paragraph = function(text) {
  if (text.trim().match(/^\[toc\]$/i)) {
    return '<p class="markdown-toc">' + text + '</p>'
  } else {
    return '<p>' + text + '</p>';
  }
}

renderer.link = function(href, title, text) {
  return '<a target="_blank" href="' + href + '"' + (title ? 'title="' + title + '"' : '') + '>' + text + '</a>'
}

renderer.code = function(code, lang, escaped) {
  let lineNumbers = this.options.lineNumbers;
  if (this.options.highlight) {
    let out = this.options.highlight(code, lang);

    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }
  if (!lang) {
    return '<pre' + (lineNumbers ? ' class="line-numbers"' : '') + '><code>' + (escaped ? code : escape(code, true)) + '\n</code></pre>';
  }

  return '<pre class="' + this.options.langPrefix + escape(lang, true) + (lineNumbers ? ' line-numbers' : '') + '"><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + '\n</code></pre>\n';
}


marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'language-',
  lineNumbers: true
});

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


export default marked
