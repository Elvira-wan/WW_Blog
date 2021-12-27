(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{490:function(t,s,a){t.exports=a.p+"assets/img/image-20210713092554481.2d9de0de.png"},537:function(t,s,a){"use strict";a.r(s);var n=a(54),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"ajax-asychronous-javascript-and-xml"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ajax-asychronous-javascript-and-xml"}},[t._v("#")]),t._v(" AJAX (Asychronous JavaScript And XML)")]),t._v(" "),n("hr"),t._v(" "),n("blockquote",[n("p",[t._v("在页面不刷新的情况下，向服务器发送异步请求，从而获取数据；")]),t._v(" "),n("p",[t._v("允许根据用户事件来更新页面内容，实现懒加载")])]),t._v(" "),n("p",[t._v("缺点：")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("SEO不友好 (搜索引擎无法搜索到)；")])]),t._v(" "),n("li",[n("p",[t._v("没有浏览历史不能回退；")])]),t._v(" "),n("li",[n("p",[t._v("存在跨域问题；")])])]),t._v(" "),n("p",[t._v("HTTP协议：")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("请求报文：")]),t._v(" "),n("div",{staticClass:"language-text extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("1. 行\t\t请求类型(GET、POST) / URL / HTTP协议版本\n2. 头\t\tHost、Cookie、Content-type等\n3. 空行      必须有空行\n4. 体\t\tGET请求体为空，POST则不一定\n")])])])]),t._v(" "),n("li",[n("p",[t._v("响应报文：")]),t._v(" "),n("div",{staticClass:"language-text extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("1. 行\t\tHTTP协议版本 / 响应状态码(200, 304等) / 响应状态字符串(OK)\n2. 头\t\tHost、Cookie、Content-type,charSet等\n3. 空行      必须有空行\n4. 体\t\thtml文件内容\n")])])])])]),t._v(" "),n("p",[t._v("同源策略：协议、域名号、端口号必须完全相同，违背同源策略就是跨域；")]),t._v(" "),n("p",[t._v("JSONP解决跨域：只支持get请求；")]),t._v(" "),n("h2",{attrs:{id:"axios-入门与源码"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#axios-入门与源码"}},[t._v("#")]),t._v(" axios 入门与源码")]),t._v(" "),n("ol",[n("li",[n("p",[t._v("首先搭建 "),n("code",[t._v("json-server")])]),t._v(" "),n("ul",[n("li",[t._v("安装")]),t._v(" "),n("li",[t._v("构建文件")]),t._v(" "),n("li",[t._v("启动服务")])])]),t._v(" "),n("li",[n("p",[t._v("安装axios：")]),t._v(" "),n("p",[t._v("项目中一般使用 "),n("code",[t._v("npm install axios")]),t._v(" 或  "),n("code",[t._v("yarn add axios")]),t._v(" 引入")])]),t._v(" "),n("li",[n("p",[t._v("axios 使用")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("axios")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 请求类型")]),t._v("\n    method"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// URL")]),t._v("\n    url"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:3000/posts'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 请求体内容")]),t._v("\n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        title"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'HH.'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        authod"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'WW.'")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    \n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("response")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    consloe"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("response"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[n("code",[t._v("axios")]),t._v(" 对象被调用，其传入一个对象类型的参数，其中可以传入 "),n("code",[t._v("url")]),t._v(", "),n("code",[t._v("method")]),t._v(" 等属性，调用后传回一个 "),n("code",[t._v("promise")]),t._v(" 对象作为返回值，其中使用 "),n("code",[t._v("then")]),t._v(" 调用成功时进行的操作；")]),t._v(" "),n("p",[t._v("此时控制台输出的 "),n("code",[t._v("response")]),t._v(" 是一个对象，其中：")]),t._v(" "),n("p",[n("img",{attrs:{src:a(490),alt:"image-20210713092554481"}})]),t._v(" "),n("ul",[n("li",[n("code",[t._v("config")]),t._v("：配置对象，与请求相关内容都保存在该属性中；")]),t._v(" "),n("li",[n("code",[t._v("data")]),t._v("：响应体内容；")]),t._v(" "),n("li",[n("code",[t._v("headers")]),t._v("：响应头信息；")]),t._v(" "),n("li",[n("code",[t._v("request")]),t._v("：保存原生的AJAX;")]),t._v(" "),n("li",[n("code",[t._v("status")]),t._v("：状态码；")]),t._v(" "),n("li",[n("code",[t._v("statusText")]),t._v("：状态内容；")])])])]),t._v(" "),n("ul",[n("li",[n("p",[t._v("axios默认配置")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("axios"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("method "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GET'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\naxios"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("defualt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("baseURL "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:3000'")]),t._v("\n")])])])])])])}),[],!1,null,null,null);s.default=e.exports}}]);