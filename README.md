## 描述
根据鸿洋大神提供的接口，制作的微信小程序版本WanAndroid，使用原生技术开发

## 项目预览
### 正常模式

| 首页 | 公众号| 我的 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/home.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/offcialaccount.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/mine.png) |

| 登录 | 注册| 积分排行 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/login.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/register.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/rank.png) |

| 收藏文章 | 搜索 | 待办事项 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/collection.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/search.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/todo.png) |

### 暗黑模式

| 首页 | 公众号| 我的 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/home_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/offcialaccount_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/mine_dark.png) |

| 登录 | 注册| 积分排行 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/login_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/register_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/rank_dark.png) |

| 收藏文章 | 搜索 | 待办事项 |
|-----|------|------|
| ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/collection_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/search_dark.png) | ![](https://github.com/ASCII13/WanAndroid/blob/master/screenshot/todo_dark.png) |


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

## 计划
- [x] 适配暗黑模式
- [ ] 引入字体图标
- [ ] 引入骨架屏

## 使用说明
由于项目appid使用的是测试id，所以无法添加体验权限，请将项目clone到本地，安装<a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html">微信开发者工具</a>后将工程导入即可查看，
如需在真机上预览，请在开发者工具生成预览码后，使用微信扫码即可（如页面无法展示，开启debug模式）

## 更新说明
### 2020-05-27
暗黑模式适配完毕，但由于一些不可抗力的因素，暂时还不够完美，主要如下：
1. 原生导航头标题颜色无法随意修改（目前官方仅支持black和white两种）
2. 详情页由于是webView，里边呈现的内容，除了微信公众号的网页会自己适配暗黑模式外，其它站点不可控制
3. 部分图标颜色暂未修改，如：未选中状态下的tabBar item，公众号页面的搜索等等，这一部分如果现在修改，需要新增一些图标来解决，但是由于自己后续打算引入字体图标，所以之后统一解决。

注：暗黑模式需要基础库最低版本v2.11.0，开发者工具最低版本1.03.2004271。工具建议使用<a href="https://servicewechat.com/wxa-dev-logic/download_redirect?type=darwin&from=mpwiki&download_version=1032004271&version_type=1">RC Build（1.03.2004271）</a>，截止更新日期，微信开发者工具Stable Build（1.03.2005140），RC Build（1.03.2005141）在模拟器切换为暗黑模式后，仅有原生tabBar和导航头相关配置生效（真机不受影响）。

真机体验方式如下：
1. iOS在设置-显示中开启暗黑模式
2. Android由于各品牌不一致，请自行查找开启暗黑模式方法
