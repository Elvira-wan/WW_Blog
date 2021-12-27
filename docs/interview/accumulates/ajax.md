
# AJAX

------

- Ajax原理：

  1. 创建对象：`var xhr = new XMLHttpRequest()`

  2. 创建请求：`xhr.open('GET', 'example.txt', true)`

  3. 发送请求:：`xhr.send()`

  4. 接收响应：`xhr.onreadystatechange = function(){}`

     - 当 `readystate` 的值改变时就会触发该事件；

     - 若 `readystate == 4`，表示已经接收到所有的响应数据；

     - 当 `status == 200`时，表示服务器已成功返回页面和数据；

     - 若该事件被触发且以上两点全部满足，则可以通过 `xhr.responseText`，获得服务器返回内容；

       

- axios拦截器的原理?

- axios怎么区分[客户端](https://www.nowcoder.com/jump/super-jump/word?word=客户端)和服务器端的请求?

- `cookie`、`sessionstorage` 、`localstorage`

  1. 后两者是新特性，同样保存在浏览器端；
  2. `localstorage` 生命周期是永久的，除非调用 api 清除，且其不参与和服务器的通信，数据大小 5M 左右；
  3. `sessionStorage` 仅在当此会话有效，浏览器关闭即被清除，不参与与服务器通信，数据大小 5M 左右；
  4. `cookie` 储存大小 4k 左右，一般不超过 20 个，在有效期前一直有效，参与与服务器通信，会被携带在请求头中；

- cookie有哪些属性？samesite了解嘛？

- cookie跨域吗？那cookie跨域要怎么做？

- readyState 属性表示Ajax请求的当前状态。它的值用数字代表。

  > 0 代表未初始化。 还没有调用 open 方法
  > 1 代表正在加载。 open 方法已被调用，但 send 方法还没有被调用
  > 2 代表已加载完毕。send 已被调用。请求已经开始
  > 3 代表交互中。服务器正在发送响应
  > 4 代表完成。响应发送完毕

- 讲讲同源策略cors

  > 同源策略是一种约定，Web是构建在同源策略的基础之上的，浏览器只是针对同源策略的一种实现；其核心在于它认为自任何站点装载的信赖内容是不安全的。当被浏览器半信半疑的脚本运行在沙箱时，它们应该只被允许访问来自同一站点的资源，而不是那些来自其它站点可能怀有恶意的资源。

  同源策略又分为以下两种：

  - **DOM 同源策略**：禁止对不同源页面 DOM 进行操作。这里主要场景是 iframe 跨域的情况，不同域名的 iframe 是限制互相访问的。

    如果没有 DOM 同源策略，也就是说不同域的 iframe 之间可以相互访问，那么黑客可以这样进行攻击

    1. 做一个假网站，里面用 iframe 嵌套一个银行网站 `http://mybank.com`；
    2. 把 iframe 宽高啥的调整到页面全部，这样用户进来除了域名，别的部分和银行的网站没有任何差别；
    3. 这时如果用户输入账号密码，我们的主网站可以跨域访问到 `http://mybank.com` 的 dom 节点，就可以拿到用户的账户密码了；

  - **XMLHttpRequest 同源策略**：禁止使用 XHR 对象向不同源的服务器地址发起 HTTP 请求。

    如果没有 XMLHttpRequest 同源策略，那么黑客可以进行 CSRF（跨站请求伪造） 攻击：

    1. 用户登录了自己的银行页面 `http://mybank.com`，`http://mybank.com` 向用户的 cookie 中添加用户标识。
    2. 用户浏览了恶意页面 `http://evil.com`，执行了页面中的恶意 AJAX 请求代码。
    3. `http://evil.com` 向 `http://mybank.com` 发起 AJAX HTTP 请求，请求会默认把 `http://mybank.com` 对应 cookie 也同时发送过去。
    4. 银行页面从发送的 cookie 中提取用户标识，验证用户无误，response 中返回请求数据。此时数据就泄露了。
    5. 而且由于 Ajax 在后台执行，用户无法感知这一过程。
