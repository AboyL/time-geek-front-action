# 先去各个文件夹执行相关命令再进行打包生成docker image
cd ../..
# yarn
cd ./packages/week4-1
# 生成父模块的镜像
yarn run build
docker build -t main-module ../.. -f ../week4-1/dockerfile
# 生成子模块的镜像
cd ../week4-1
yarn run build
docker build -t sub-module ../.. -f ../week4-2/dockerfile
# 根据docker-compose生成对应的container
cd ../week4
docker-compose up