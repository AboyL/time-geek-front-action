### Master/Worker
主从网络处理架构实现

### 概述
创建一个主从网络架构，Master 接受 Socket 连接，根据负载均衡，分发给 Worker，Worker 处理具体业务。


### 实现
直接通过 cluster 来实现

### 运行
1. node master.js
2. 命令行 curl "http://127.0.0.1:8000/"
3. 或者浏览器直接访问 http://127.0.0.1:8000/