let uuid=1
export default class Vnode {
  constructor(tag, attr, children, parent, childrenTemplate) {
    this.tag = tag; // 组件的标签
    this.attr = attr; // 组件的属性 一个Map
    this.children = children; // 子组件
    this.parent = parent; // 父组件
    this.childrenTemplate = childrenTemplate; // 子组件的template
    this.uuid = this.uuid(); // 存放在map中的唯一id
  }

  uuid() {
    return `${++uuid}`;
  }

  toString(){
    return `
    tag:${this.tag};
    attr:${this.attr};
    children:${this.children};
    parent:${this.parent};
    childrenTemplate:${this.childrenTemplate};
    uuid:${this.uuid};
    `
  }
}
