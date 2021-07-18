问题与练习

1. 为什么0.1+0.2!==0.3
2. toFixed 与 toPrices的区别
toFixed 是取小数点后的两位
[文章地址](https://www.yuque.com/aboyl/hvp1oc/avh6eh)

3. 编写一个函数返回传入的值的类型
packages/front-base/__tests__/type.test.js

4. 如何实现图片的粘贴

5. 实现屏幕截图

6. 实现图片懒加载

7. 研究css grid技术

8. 关于缓存的文章、可以写一个例子

9. pwd的实现

10. 为什么Math.random是不安全的

[如果要将数组随机排序，千万不要再用(a, b) => Math.random() - 0.5这样的方法
](https://www.cnblogs.com/7qin/p/9710034.html)

[随机数的故事](https://zhuanlan.zhihu.com/p/205359984)


11. 如何实现换肤

12. 数据结构与算法
   1. 链表
   2. 双链表
链表，插入删除之类的速度很快，但那是查找速度比较的慢。
  3. 树 树的遍历。前中后层序。跟元素什么时候访问 树的数据结构是什么样子的？通过数组存储树吗？可以通过数组来存储树。通过递归来完成遍历。
  4. 二叉搜索树，左节点比父节点小，右节点比父节点大，没有相当的节点，中序遍历，链表和数组的一个折中，插入删除查找遍历等都操作都相对比较快的容器。
  5. hash表。
  6. B/B+树 平衡多路查找树


13. 位运算与位掩码
八瓶水的问题



作业
1. 设计一个函数，将一个10进制浮点数转换成64进制。
__tests__/hexadecimalConversion.test.js

2. 读取图片并且灰度保存
[Window.showOpenFilePicker](https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker)

[The File System Access API: simplifying access to local files](https://web.dev/file-system-access/)

[使用 File System Access API 在浏览器里操作本地文件](https://blog.meathill.com/tag/showopenfilepicker)

整体上来还是需要借助canvas来实现

  1. yarn dev
  2. 进入 /read-image
  3. 选择读取保存文件

3. 通过monaco-editor编辑本地文件并且保存

monaco-editor文件夹

