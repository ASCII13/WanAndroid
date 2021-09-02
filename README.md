<h1 align="center">WanAndroid</h1>
<p align="center">
    <a href="https://github.com/ASCII13/WanAndroid/issues"><img alt="issues" src="https://img.shields.io/github/issues/ASCII13/WanAndroid"></a>
    <a href="https://github.com/ASCII13/WanAndroid/network"><img alt="forks" src="https://img.shields.io/github/forks/ASCII13/WanAndroid"></a>
    <a href="https://github.com/ASCII13/WanAndroid/stargazers"><img alt="stars" src="https://img.shields.io/github/stars/ASCII13/WanAndroid"></a>
    <a href="https://github.com/ASCII13/WanAndroid/blob/master/LICENSE"><img alt="license" src="https://img.shields.io/github/license/ASCII13/WanAndroid"></a>
</p>

## 描述
根据鸿洋大神提供的接口，制作的微信小程序版本 WanAndroid，使用原生技术开发，集成 WebPack

## 项目预览
<h3 align="center">正常模式</h3>

| 首页 | 公众号| 我的 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/home.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/offcialaccount.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/mine.png) |

| 登录 | 注册| 积分排行 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/login.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/register.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/rank.png) |

| 收藏文章 | 搜索 | 待办事项 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/collection.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/search.jpg) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/todo.png) |

<h3 align="center">暗黑模式</h3>

| 首页 | 公众号| 我的 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/home_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/offcialaccount_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/mine_dark.png) |

| 登录 | 注册| 积分排行 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/login_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/register_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/rank_dark.png) |

| 收藏文章 | 搜索 | 待办事项 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/collection_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/search_dark.jpg) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/todo_dark.png) |


## 已实现功能
* 登录 / 退出登录
* 注册
* 收藏文章
* 待办清单
* 积分排行
* 公众号
* 公众号文章搜索
* 首页文章
* 首页轮播
* 站内消息

## 计划
- [x] 适配暗黑模式
- [x] 引入字体图标
- [x] 引入骨架屏
- [x] 集成 WebPack
- [ ] 集成 SCSS 预处理器

## 使用说明
1. 由于项目appid使用的是测试id，所以无法添加体验权限，请将项目clone到本地，安装<a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html">微信开发者工具</a>后将工程导入
2. 打开控制台，注意路径定位在项目根目录
3. 执行`npm install`安装项目依赖
4. 执行`npm run build`打包
5. 编译项目，即可在模拟器预览，如需在真机上预览，请在开发者工具生成预览码后，使用微信扫码即可（如页面无法展示，开启debug模式）

## 重大更新说明
### 2021-07-12
增加站内消息，tabBar 红点提示未读消息

### 2021-06-16
公众号搜索页面增加历史搜索记录展示（最近10条）

### 2021-06-11
重构登录体系

### 2021-05-06
集成 WebPack，探索小程序工程化体系

### 2020-12-05
规范文件命名

### 2020-09-21
首页引入骨架屏，骨架屏文件由开发者工具生成，具体配置可参考[官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html)

### 2020-09-01
部分图标已更换为字体图标

### 2020-05-27
暗黑模式适配完毕，但由于一些不可抗力的因素，暂时还不够完美，主要如下：
1. 原生导航头标题颜色无法随意修改（目前官方仅支持black和white两种）
2. 详情页由于是webView，里边呈现的内容，除了微信公众号的网页会自己适配暗黑模式外，其它站点不可控制
3. 部分图标颜色暂未修改，如：未选中状态下的tabBar item，公众号页面的搜索等等，这一部分如果现在修改，需要新增一些图标来解决，但是由于自己后续打算引入字体图标，所以之后统一解决。

注：暗黑模式需要基础库最低版本v2.11.0，开发者工具最低版本1.03.2004271。工具建议使用<a href="https://servicewechat.com/wxa-dev-logic/download_redirect?type=darwin&from=mpwiki&download_version=1032004271&version_type=1">RC Build（1.03.2004271）</a>，截止更新日期，微信开发者工具Stable Build（1.03.2005140），RC Build（1.03.2005141）在模拟器切换为暗黑模式后，仅有原生tabBar和导航头相关配置生效（真机不受影响）。

真机体验方式如下：
1. iOS在设置-显示中开启暗黑模式
2. Android由于品牌差异，请自行查找对应的开启暗黑模式方法
