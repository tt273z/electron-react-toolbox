# 开发工具箱 (React + Electron壳

> react + react-router-dom + antd + electron

### `npm start`

开发环境下运行 访问地址为 [http://localhost:3000](http://localhost:3000) 

### `npm run build`

构建生产环境版本 build文件夹下生成


## 功能
- JS代码在线编辑器
    - Codemirror
    - 支持添加 cdn、本地文件作为js引用
    - localStorage 存储
- 简单的密码验证正则生成
    - 字符长度/种类组合
    - 在线test
- 三角形 CSS 生成
    - 方向/类型/宽高可选择
    - 可拖动 TODO
    - 可旋转角度 TODO
- 模板语法转换
    - es6模板语法转换为普通字符串连接

## React + Electron 打包过程

### 1. 安装 Electron
```
npm install electron --save
```
### 2. 配置 Electron 入口文件
项目根目录下创建 [main.js](https://github.com/mengQ99/electron-react-toolbox/blob/master/main.js)
### 3. 配置 package.json
```
{
  "name": "electron-react-toolbox",
  "version": "0.1.0",
  "private": true,
  "main": "main.js", //指定入口文件
  "homepage": ".", //静态文件配置为相对路径
  "dependencies": {...},
  "scripts": {...},
}
```
### 4. 安装打包插件 [electron-packager](https://github.com/electron-userland/electron-packager)
```
npm install electron-packager --save-dev
```
### 5. [打包命令](https://github.com/electron-userland/electron-packager#usage)
```
electron-packager <location of project> <name of project> <platform> <location of output> <architecture> <app version> <electron version> <optional options>
```
- location of project：项目所在路径 (打包好的build文件夹)
- name of project：项目名称
- platform：打包为哪个平台的应用（Windows/Mac/Linux） 
- architecture：使用 x86 还是 x64 
- location of output: 指定打包生成文件路径
- app version：项目版本
- electron version：electron 版本 
- optional options：可选选项


为了简便可直接配置 package.json 中的 scripts 添加，每次 `npm run package`可以直接打包：

```
"package": "electron-packager ./build ert --win --out=release --arch=x64 --app-version=0.1.0 --electron-version=4.0.4 --overwrite --icon=./public/favicon.ico"
```