import Vnode from "./vnode.js";
import {get} from 'lodash'
export default class Engine {
  constructor() {
    this.nodes = new Map();
  }

  render (template, data) {
    const re1 = /<(\w+)\s*([^>]*)>([^<]*)<\/\1>/gm; //匹配<div class="a">XXX</div>
    const re2 = /<(\w+)\s*([^(/>)]*)\/>/gm; //匹配<img src="a"/>
    while (re1.test(template) || re2.test(template)) {
      //<div class="a">XXX</div>类型
      template = template.replace(re1, (s0, s1, s2, s3) => {
        let attr = this.parseAttribute(s2);
        let node = new Vnode(s1, attr, [], null, s3);
        this.nodes.set(node.uuid, node);
        return `(${node.uuid})`;
      });
      //<img src="a"/>类型
      template = template.replace(re2, (s0, s1, s2) => {
        let attr = this.parseAttribute(s2);
        let node = new Vnode(s1, attr, [], null, "");
        this.nodes.set(node.uuid, node);
        return `(${node.uuid})`;
      });
    }

    let rootNode = this.parseToNode(template);
    console.log("第二阶段|构建nodeTree>>>", rootNode, data);
    let dom = this.parseNodeToDom(rootNode, data);
    return dom;
  }

  parseToNode (template) {
    let re = /\((.*?)\)/g;
    let stack = [];
    let parent = new Vnode("root", {}, [], null, template, null);
    stack.push(parent);
    const _this = this
    //转成成node节点
    while (stack.length > 0) {
      let pnode = stack.pop();
      let nodestr = pnode.childrenTemplate.trim();
      re.lastIndex = 0;
      [...nodestr.matchAll(re)].forEach((item) => {
        let n = _this.nodes.get(item[1]);
        let newn = new Vnode(
          n.tag,
          n.attr,
          [],
          pnode,
          n.childrenTemplate,
          null
        );
        pnode.children.push(newn);
        stack.push(newn);
      });
    }
    return parent.children[0];
  }

  specialDealWith () {
    return {
      'v-if': (stack, pnode, pdom, scope) => {
        // 如果得到为true那么就可以去掉
        let key = pnode.attr.get("v-if")
        const value=get(scope,key)
        if(value){
          pnode.attr.delete("v-if")
          // 可以进行下一步渲染
          let newnode = new Vnode(
            pnode.tag,
            pnode.attr,
            pnode.children,
            pnode.parent,
            pnode.childrenTemplate
          );
          stack.push([newnode, pdom, scope]);
        }
      },
      'v-for': (stack, pnode, pdom, scope) => {
        // 先对参数进行解析
        let [key, prop] = pnode.attr.get("v-for").split("in");
        key = key.trim();
        prop = prop.trim();
        // 这个item就是后面的子节点的currentScope
        for (let i = 0; i < scope[prop].length; i++) {
          // 排除两个特殊属性
          pnode.attr.delete('v-for')
          if (pnode.attr.get('v-if')) {
            pnode.attr.delete('v-if')
          }
          // 生成新的node
          let newnode = new Vnode(
            pnode.tag,
            pnode.attr,
            pnode.children,
            pnode.parent,
            pnode.childrenTemplate
          );
          // 处理重复嵌套的作用域
          let newScope = Object.create(scope);
          newScope[key] = scope[prop][i];
          // 被注释的写法可以不用处理上面的特殊属性
          // let html = this.scopehtmlParse(newnode, scope, newScope);
          // let ele = this.createElement(newnode, html);
          // this.scopeAtrrParse(ele, newnode, scope, newScope);
          // pdom.appendChild(ele);
          // newnode.children.forEach((item) => {
          //   stack.push([item, ele, newScope]);
          // });
          stack.push([newnode, pdom, newScope]);
        }
      }
    }
  }

  parseNodeToDom (root, data) {
    let fragment = document.createDocumentFragment();
    let stack = [[root, fragment, data]];
    //转成成node节点
    while (stack.length > 0) {
      let [pnode, pdom, scope] = stack.shift();
      if (['v-for', 'v-if'].some(value => pnode.attr.get(value))) {
        // 进行特殊的处理
        // 先判断v-if 假如没有v-if都可以不处理了
        // 处理v-for
        if (pnode.attr.get('v-if')) {
          // 如果返回了false 直接跳过
          this.specialDealWith()['v-if'](stack, pnode, pdom, scope)
          continue
        }

        if (pnode.attr.get('v-for')) {
          this.specialDealWith()['v-for'](stack, pnode, pdom, scope)
        }
      } else {
        let html = this.scopehtmlParse(pnode, data, scope); // 得到子节点的html
        let ele = this.createElement(pnode, html); // 得到子节点
        this.scopeAtrrParse(ele, pnode, data, scope);
        pdom.appendChild(ele);
        pnode.children.forEach((item) => {
          stack.push([item, ele, scope]);
        });
      }
    }
    return fragment;
  }

  scopeAtrrParse (ele, node, globalScope, curentScope) {
    for (let [key, value] of node.attr) {
      let result = /\{\{(.*?)\}\}/.exec(value);
      if (result && result.length > 0) {
        let props = result[1].split(".");
        let val = curentScope[props[0]] || globalScope[props[0]];
        props.slice(1).forEach((item) => {
          val = val[item];
        });
        ele.setAttribute(key, val);
      }
    }
  }

  scopehtmlParse (node, globalScope, curentScope) {
    return node.childrenTemplate.replace(/\{\{(.*?)\}\}/g, (s0, s1) => {
      let props = s1.split(".");
      let val = curentScope[props[0]] || globalScope[props[0]];
      props.slice(1).forEach((item) => {
        val = val[item];
      });
      return val;
    });
  }


  createElement (node, html) {
    let ignoreAttr = ["v-for", "v-if"];
    let dom = document.createElement(node.tag);
    for (let [key, val] of node.attr) {
      if (!ignoreAttr.includes(key)) {
        dom.setAttribute(key, val);
      }
    }
    if (node.children.length === 0) {
      dom.innerHTML = html;
    }
    return dom;
  }

  scopeAtrrParse (ele, node, globalScope, curentScope) {
    for (let [key, value] of node.attr) {
      let result = /\{\{(.*?)\}\}/.exec(value);
      if (result && result.length > 0) {
        let props = result[1].split(".");
        let val = curentScope[props[0]] || globalScope[props[0]];
        props.slice(1).forEach((item) => {
          val = val[item];
        });
        ele.setAttribute(key, val);
      }
    }
  }

  parseAttribute (str) {
    let attr = new Map();
    str = str.trim();
    str.replace(/(\w{1,1}-\w+|\w+)\s*=['"](.*?)['"]/gm, (s0, s1, s2) => {
      attr.set(s1, s2);
      return s0;
    });
    return attr;
  }
}
