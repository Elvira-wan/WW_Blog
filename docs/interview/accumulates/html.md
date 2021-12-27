
# HTML

-----

- meta标签里有什么 什么作用

- herf 和 src 的区别：

  >href 标识超文本的引用，用在 link 和 a标签上， herf 是是引用和页面关联，是在当前元素和引用资源之间建立联系；
  >
  >
  >
  >src 表示引用资源替换当前元素，用在 img，iframe 上，是页面中不可或缺的部分；
  >
  >src是source的缩写，是指向外部资源的位置，指向的内部会迁入到文档中当前标签所在的位置；在请求src资源时会将其指向的资源下载并应用到当前文档中，例如js脚本，img图片和frame等元素。
  >
  >`<script src='javascript.js'> </script>` 当浏览器解析到这一句的时候会暂停其他资源的下载和处理，直至将该资源加载，编译，执行完毕，图片和框架等元素也是如此，类似于该元素所指向的资源嵌套如当前标签内，这也是为什么要把js脚本放在底部而不是头部。
  >
  >`<link href="common.css" rel="stylesheet"/>` 当浏览器解析到这一句的时候会识别该文档为 css 文件，会下载但是不会停止对当前文档的处理，这也是为什么建议使用 link 方式来加载 css 而不是使用 @import。

  

- link 和 @import 的区别

  1. link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS；

  2. link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载；

  3. link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。

  4. link支持使用Java控制DOM去改变样式；而@import不支持。

     

- HTML5新增（主要是标签什么的）

  1. 语义化标签 `<Nav>、<header>、<footer>、<aside>、<article>`
  2. 新增了视频、音频api
  3. 新增了 canvas 的api
  4. 新增了表单控件 ：`calender | data | time | email | url | search`;
  5. 新增本地储存：`localStorage | sessionStorage`;
  6. 新技术 `webworker | websocket`
  7. 删除基础元素 `big | font | center`
  8. 删除对可用性产生负面影响的：`frame | frameset | noframes`
