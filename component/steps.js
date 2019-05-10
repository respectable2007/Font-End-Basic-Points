(function() {
  "use strict";
  var _global;
  // 工具函数
    // 对象合并
    function extend(o,n,override) {
        for(var key in n){
            if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
                o[key]=n[key];
            }
        }
        return o;
    }
    // 自定义模板引擎
    function templateEngine(html, data) {
        var re = /<%([^%>]+)?%>/g,
            reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
            code = 'var r=[];\n',
            cursor = 0;
        var match;
        var add = function(line, js) {
            js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
    }
    // 通过class查找dom
    if(!('getElementsByClass' in HTMLElement)){
        HTMLElement.prototype.getElementsByClass = function(n){
            var el = [],
                _el = this.getElementsByTagName('*');
            for (var i=0; i<_el.length; i++ ) {
                if (!!_el[i].className && (typeof _el[i].className == 'string') && _el[i].className.indexOf(n) > -1 ) {
                    el[el.length] = _el[i];
                }
            }
            return el;
        };
        ((typeof HTMLDocument !== 'undefined') ? HTMLDocument : Document).prototype.getElementsByClass = HTMLElement.prototype.getElementsByClass;
    }
  function Steps(opt) {
    this._init(opt)
  }
  Steps.prototype = {
    constructor: Steps,
    _init: function(opt) {
      var defaults = {
        active: 0,
        tmpId: null
      }
      this.defaults = extend(defaults, opt, true);
      this.tpl = this._parseTpl(this.defaults.tmpId);
      this.dom = this._parseToDom(this.tpl);
      document.body.appendChild(this.dom[0]);
    },
    _parseTpl:function(id) {
      var data = this.defaults;
      var tplStr = document.getElementById(id).innerHTML.trim();
      return templateEngine(tplStr, data);
    },
    _parseToDom:function(str) {
      var div = document.createElement('div');
      if(typeof str === 'string') {
        div.innerHTML = str;
      }
      div.getElementsByTagName('li')[this.defaults.active].className = 'active';
      return div.childNodes;
    }
  }
  _global = (function(){
    return this || (0, eval)('this');
  }());
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = Steps;
  } else if(typeof define === 'function' && define.amd) {
    define(function(){
      return Steps;
    })
  } else {
    !('Steps' in _global) && (_global.Steps = Steps);
  }
})()