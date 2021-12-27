# 计算机网络

----

- TCP的三次握手和四次挥手

- 输入url之后发生的事情以及浏览器渲染原理(DNS解析 HTTP握手 渲染什么的都仔细问了)

  1. 解析 URL (协议 + 域名 + 数据源文件路径名)；

  2. DNS域名查询，获取 IP 地址；

  3. 根据 IP 地址找到服务器，TCP 三次握手进行连接；

  4. 发送 HTTP 请求，请求页面资源；

  5. 收到 HTTP 响应，获取页面资源；

  6. 浏览器是渲染页面：

     - 解析HTML文件，创建DOM树自上而下，遇到任何 脚本 与 样式都会阻塞 (外部样式不阻塞，后续外部脚本加载)；

     - 解析 CSS 优先级：浏览器默认设置 < 用户设置 < 外部样式 < 内联样式 < HTML中的style 样式；

     - 将 CSS 与 DOM 合并，构建渲染树，DOM树 与 HTML 一 一对应，渲染树会忽略设置了 `display: none` 等样式的元素；

     - 布局和绘制，重绘和重排：

     

- URL里每部分是什么

  

- get和post的区别

  1. get的传参方式是通过地址栏url传参，是直接可视的，post传参是将参数放在body内传输；

  2. get因为通过url传输因此大小受到限制，url最大长度为2048个字符，post则无长度限制；

  3. get请求有幂等性，post请求每次提交新数组，并不是安全且幂等的；

  4. get请求可以被缓存，post请求不可以被缓存；

  5. get请求只支持url编码，post请求支持多种编码方式 (application/x-www-form-urlencoded，multipart/form-data，application/json， text/xml)；

  6. get的请求记录会留在浏览器中，post不会；

  7. get只支持ASCII字符，post没有字符类型限制；

     

- 网络请求的响应状态码：

  ![image-20210715011319577](image-20210715011319577.png)

  

  - **1xx：**属于提示信息，是协议处理中的⼀种中间状态，实际⽤到的⽐较少。

  - **2xx：**表示服务器成功处理了客户端的请求，也是我们最愿意看到的状态。

    - 「200 OK」是最常⻅的成功状态码，表示⼀切正常。如果是⾮ HEAD 请求，服务器返回的响应头都会有 body 数据。
    - 「204 No Content」也是常⻅的成功状态码，与 200 OK 基本相同，但响应头没有 body 数据。
    - 「**206 Partial Content**」是应⽤于 HTTP 分块下载或断点续传，表示响应返回的 body 数据并不是资源的全部，⽽是其中的⼀部分，也是服务器处理成功的状态。

  - **3xx：**表示客户端请求的资源发送了变动，需要客户端⽤新的 URL 新发送请求获取资源，也就是重定向。

    - 「301 Moved Permanently」表示永久᯿定向，说明请求的资源已经不存在了，需改⽤新的 URL 再次访问。
    - 「302 Found」表示临时定向，说明请求的资源还在，但暂时需要⽤另⼀个 URL 来访问。

    301 和 302 都会在响应头⾥使⽤字段 Location ，指明后续要跳转的 URL，浏览器会⾃动᯿定向新的 URL。 

    - 「304 Not Modified」不具有跳转的含义，表示资源未修改，定向已存在的缓冲⽂件，也称缓存定向，⽤于缓存控制。

  - **4xx：**表示客户端发送的报⽂有误，服务器⽆法处理，也就是错误码的含义。

    - 「400 Bad Request」表示客户端请求的报⽂有错误，但只是个笼统的错误。
    - 「403 Forbidden」表示服务器禁⽌访问资源，并不是客户端的请求出错。
    - 「404 Not Found」表示请求的资源在服务器上不存在或未找到，所以⽆法提供给客户端。

  - **5xx：**表示客户端请求报⽂正确，但是服务器处理时内部发⽣了错误，属于服务器端的错误码。

    - 「500 Internal Server Error」与 400 类型，是个笼统通⽤的错误码，服务器发⽣了什么错误，我们并不知道。

    - 「501 Not Implemented」表示客户端请求的功能还不⽀持，类似“即将开业，敬请期待”的意思。

    - 「502 Bad Gateway」通常是服务器作为⽹关或代理时返回的错误码，表示服务器⾃身⼯作正常，访问后端服务器发⽣了错误。

    - 「503 Service Unavailable」表示服务器当前很忙，暂时⽆法响应服务器，类似“⽹络服务正忙，请稍后重试”的意思

      

- 304什么意思？也就是要讲讲http 缓存机制

- HTTP 1.1/ HTTP 2 .... 区别

- http2.0有什么缺点？为什么会有http3.0？

- HTTP的理解

- `cookie` 携带在哪里发送，以及其常见属性

- HTTP 常见请求头

  1. `accept`：浏览器可接受的服务器返回类型

  2. `accept-encoding`：浏览器声明可接受的编码压缩方法(gzip)；

  3. `accept-language`：浏览器声明自己接收的语言；

  4. `connection`：指定是否使用长连接 (keep-alive)；

  5. `referer`：字段，告诉服务器此请求来自哪个页面链接；

  6. `host`：指定被请求资源所在域名；

  7. `cookie`：用来存储用户信息；

  8. `User-Agent`：客户端使用的操作系统版本以及浏览器的名称和版本；

  9. `Cache-Control`：缓存控制

     ![img](20180921155944100)

     

- HTTP 常见响应头

  1. `Cache-Control`：对应请求中的Cache-Control

     ![在这里插入图片描述](2018092116013247)

  2. `Last-Modified`：表示所请求的响应对象最后的修改时间；

  3. `Etag`：类似于一个html文件的摘要，服务器会将请求收到的 `Etag`，与响应的 `Etag` 进行对比，判断文件是否变化，是否可以继续读取缓存中的页面；

  4. `Content-Type`：告诉客户端，资源文件的类型和字符编码类型；

  5. `Content-Encoding`：对应 `Accept-Encoding`，表示编码的压缩方法；

  6. `Date`：服务器发送资源时的时间；

  7. `Expires`：缓存相关响应头，表示缓存保存的最大时间，但该响应头没有 `Cache-Control: max-age` 准确，因为那是相对时间，而该字段只能设置绝对时间；

  8. `Connection`：与请求头中 `Connection` 对应，也回应 `keep-alive`;

  9. `Refresh`：用于重定向，返回重定向时间以及重定向网址；

  10. `Access-Control-Allow-Origin` / `Access-Control-Allow-Methods` / `Access-Control-Allow-Credentials`：允许跨域的三个响应头；

      

- 什么是跨域，如何请求跨域资源？

  由于浏览器的同源策略，凡是发送请求 url 的协议，域名，端口三者之间任一与当前页面地址不同即为跨域：

  1. 网络协议不同：http 和 https；
  2. 端口不同：3000 访问 5000；
  3. 域名不同：www.youzan.com 访问 open.weixin.com；
  4. 子域名不同：zhifuyun.youzan.com 访问 store.youzan,com；

  实现跨域的方法：

  - `proxy` 代理：将请求发送给中间的代理服务器，由代理服务器去转发请求 (因为服务器不存在跨域情况)，请求到的结果也会先发给代理服务器，再由代理服务器提供给当前页面；

    在生产环境中，常使用在 `package.lock.json` 中配置  `proxy`(配置单个代理) 或 `src` 下创建 `setupProxy` (配置多个代理)；

    在打包环境中，常用 `nginx`;

  - CORS：在后台处理请求时，增加允许跨服的语句；

    `Access-Control-Allow-Origin`

    `Access-Control-Allow-Methods`

    `Access-Control-Allow-Header`

  - `jsonp`：利用了 `script` 标签的 `src` 不受浏览器同源策略的影响，允许跨域引用资源的性质进行跨域，当前较为流行，但只支持Get请求；

    ````js
    // 1. 定义一个 回调函数 handleResponse 用来接收返回的数据
    function handleResponse(data) {
        console.log(data);
    };
    
    // 2. 动态创建一个 script 标签，并且告诉后端回调函数名叫 handleResponse
    var body = document.getElementsByTagName('body')[0];
    var script = document.gerElement('script');
    script.src = 'http://www.laixiangran.cn/json?callback=handleResponse';
    body.appendChild(script);
    
    // 3. 通过 script.src 请求 `http://www.laixiangran.cn/json?callback=handleResponse`，
    // 4. 后端能够识别这样的 URL 格式并处理该请求，然后返回 handleResponse({"name": "laixiangran"}) 给浏览器
    // 5. 浏览器在接收到 handleResponse({"name": "laixiangran"}) 之后立即执行 ，也就是执行 handleResponse 方法，获得后端返回的数据，这样就完成一次跨域请求了。
    ````

  - `document.domain`：解决主域名相同，但子域名不同的情况，适用于 iframe 跨域；

    对于主域名相同，而子域名不同的情况，可以使用 document.domain 来跨域。这种方式非常适用于 iframe 跨域的情况。

    比如，从地址是 `http://www.laixiangran.cn/a.html`，访问 src 为 `http://laixiangran.cn/b.html` 的 iframe。此时子域不同，无法通过在页面中书写 js 代码来获取 iframe 中的内容。

    为了解决只需要将两个页面的 `document.domain` 设成相同的域名即可：

    ````html
    // a.html
    <iframe src="http://laixiangran.cn/b.html" id="myIframe" onload="test()">
    <script>
        document.domain = 'laixiangran.cn'; // 设置成主域
        function test() {
            console.log(document.getElementById('myIframe').contentWindow);
        }
    </script>
    
    // b.html
    <script>
        document.domain = 'laixiangran.cn'; // document.domain 设置成与主页面相同
    </script>
    ````

    **注意**：document.domain 的设置是有限制的，我们只能把 document.domain 设置成自身或更高一级的父域，且主域必须相同。例如：`a.b.laixiangran.cn` 中某个文档的 document.domain 可以设成 `a.b.laixiangran.cn`、`b.laixiangran.cn` 、`laixiangran.cn` 中的任意一个，但是不可以设成 `c.a.b.laixiangran.cn` ，因为这是当前域的子域，也不可以设成 `baidu.com`，因为主域已经不相同了。

    

- `socket` 和 `webSocket`

  > 在网络中的**两个进程**需要全双工相互通信 (双方可同时向对方发送消息)，需要用到`socket`，它能够提供**端对端通信**。
  >
  > 程序员只需要在某个应用程序的一端 (eg: 客户端) 创建一个 `socket`,mkn 实例并且提供它所要连接一端 (eg: 服务端) 的IP地址和端口，而另外一端创建另一个 `socket` 并绑定本地端口进行 `listen`，然后客户端进行 `connect` 服务端，服务端接受连接之后双方建立了一个端对端的TCP连接，在该连接上就可以双向通讯了；
  >
  > 一旦建立这个连接之后，通信双方就没有客户端服务端之分了，提供的就是端对端通信了。
  >
  > 从本质上来说，socket并不是一个新的协议，它只是为了便于程序员进行网络编程而对tcp/ip协议族通信机制的一种封装。

  >`websocket` 是 `html5` 规范中的一个部分，它借鉴了 `socket` 思想，为web应用程序**客户端和服务端**之间提供了一种全双工通信机制；
  >
  >同时，它又是一种新的应用层协议，通常表示为：`ws://echo.websocket.org/?encoding=text HTTP/1.1`，除了协议名和http不同之外，它的表示地址就是传统的url地址；
  >
  >
  >
  >websocket具有以下几个方面的优势：
  >
  >1. 建立在 TCP 协议之上，服务器端的实现比较容易；
  >2. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器；
  >3. 数据格式比较轻量，性能开销小，通信高效；
  >4. 可以发送文本，也可以发送二进制数据；
  >5. 没有同源限制，客户端可以与任意服务器通信；
  >6. 协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL；
  >
  >
  >
  >webSocket 与 HTTP/2服务器主动推送 的区别：
  >
  >**HTTP/2 引入了 Server Push ，它使服务器能够主动地将资源推送到客户端缓存。但是，它并不允许将数据推送到客户端应用程序本身**。服务器推送只能由浏览器处理，不会在应用程序代码中弹出服务器数据，这意味着应用程序没有 API 来获取这些事件的通知；
  >
  >而 webSocket 是全双工通信，将数据推送到客户端本身；

  

- TCP 和 UDP的区别

  1. TCP面向连接（如打电话要先拨号建立连接）;UDP是无连接的，即发送数据之前不需要建立连接
  2. TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保证可靠交付；
  3. TCP的逻辑通信信道是全双工的可靠信道，UDP则是不可靠信道；
  4. TCP面向字节流，实际上是TCP把数据看成一连串无结构的字节流;UDP是面向报文的，UDP没有拥塞控制，因此网络出现拥塞不会使源主机的发送速率降低（对实时应用很有用，如IP电话，实时视频会议等）
  5. 每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信；
  6. TCP首部开销20字节，UDP的首部开销小，只有8个字节；

   

- 前端安全问题：

  1. XSS (跨站脚本攻击)：

     > html 或 js 脚本攻击，恶意攻击者向 `Web` 页面中插入恶意代码 (一般会在 a 标签或者 img 标签前插入一些 html 或 js 脚本)，当用户浏览网页时，这些恶意代码会被执行从而达到恶意攻击用户的目的；
     >
     > 通常是通过 php 输出函数将 js 代码输出到 html 页面中，通过用户本地浏览器执行；
     >
     > 
     >
     > 预防 XSS 攻击：
     >
     > 1、前端替换关键字，如替换`<`为`<` `>` 为`>`
     > 2、后台替换。
     > 3、任何内容写到页面之前都必须加以encode，避免不小心把html tag 弄出来。

  2. CSRF (跨站请求伪造)：

     > CSRF也称为跨站请求伪造，其实就是对网站中的一些表单提交行为被黑客利用。例如在登陆 A 网站时存在 cookie 中的一些个人信息，而在退出登录之前，无意点击访问黑客的网站时，黑客网站收到用户的页面请求后，返回一些攻击性代码，并发出请求 (提交url) 求用户访问 A 网站，浏览器在接收到攻击性代码后，就根据黑客网站的请求，在用户不知情的情况下，携带用户的 cookie 信息，向 A 网站发出请求；而 A 网站并不知道请求是由黑客网站发起的，因此会根据恶意请求进行操作；
     >
     > 
     >
     > 预防 CSRF 攻击：
     >
     > - 验证 HTTP Referer：
     >
     >   在 HTTP 头部中有 Referer 字段，记录了 HTTP 请求的来源地址，但若黑客要对网站进行攻击，只能在自己的网站构造请求，因此当 A网站发现 Referer 不是规定网站的话，就会拒绝该请求；
     >
     > - 在请求地址中添加 token 并验证：
     >
     >   CSRF 攻击在于黑客网站能完全伪造请求，在传统的 Session 请求中的所有用户验证信息，都是存在 cookie 中，因此黑客可以在不知道验证信息的情况下直接利用用户自己的 cookie 通过安全验证；因此可以在请求中放入黑客不能伪造的信息，且该信息不存在于 cookie 中；
     >
     >   此时就可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务端建立拦截器来验证该 token，如果请求中没有 token 或者内容不正确，则拒绝请求；
     >
     > - 在 HTTP 投中自定义属性并进行验证：
     >
     >   同样是使用 token 进行验证，但是把 token 放在 HTTP 请求头的自定义属性中；

  3. 本地存储数据问题：一些个人信息不经加密就存储在本地或cookie中是极度不安全的，这会导致信息十分容易被盗用；

  4. HTTPS加密传输数据：

     >在浏览器对服务器访问或者请求的过程中，会经过很多的协议或者步骤，当其中某一步被拦截时，若没有被加密就极易被盗取；
     >
     >HTTPS中间人攻击：
     >
     >1. 服务器向客户端发送公钥，攻击者截获公钥，保留在自己手上，然后攻击者自己生成一个【伪造的】公钥，发给客户端。
     >2. 客户端收到伪造的公钥后，生成加密hash值发给服务器，攻击者获得加密hash值，用自己的私钥解密获得真秘钥，同时生成假的加密hash值，发给服务器；
     >3. 服务器用私钥解密获得假秘钥，服务器假秘钥加密传输信息；
     >
     >此时如果使用了数字证书，将服务器的公钥放入数字证书中再发送给客户端。则浏览器可以通过自身内置的CA的公钥验证数字证书的真实性；

  5. SQL注入

     >通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令
     >
     >
     >
     >预防 SQL 注入的方法：
     >
     >- 永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双"-"进行转换等。
     >- 永远不要使用动态拼装SQL，可以使用参数化的SQL或者直接使用存储过程进行数据查询存取。
     >- 永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。
     >- 不要把机密信息明文存放，请加密或者hash掉密码和敏感的信息。

     

  - CSRF 与 XSS区别：
    - XSS是向页面注入js去运行，然后在js函数体中做他想做的事情。
      CSRF是利用网站漏洞，自动执行接口。用户需要登陆网站。
    - XSS是获取信息，不需要提前知道其他用户页面的代码和数据包。
      CSRF是代替用户完成指定的动作，需要知道其他用户页面的代码和数据包。
