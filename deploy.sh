#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

cp -rf docs/.vuepress/dist ../zypyezi.github.io/code-template

cd ../zypyezi.github.io
source push.sh


cd -