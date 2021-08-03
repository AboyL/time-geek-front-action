通过微前端开发一个项目。并且打包到docker里面通过docker进行管理

### 微前端
主要实现的内容，如何进行子模块与父模块之间的通信。这里可以通过store来处理

week4-1为主应用，处理边栏

week4-2为子应用，处理文章。


1. 先实现侧边栏是目录，右边是文章内容
2. 实现点击目录切换文章
3. 根据目录id请求文章

### docker

1. 编写dockerfile生成镜像
2. 在本地对两个模块进行打包
3. 复制打包内容到镜像中
4. 配置端口
5. 根据镜像生成容器
6. 启动容器