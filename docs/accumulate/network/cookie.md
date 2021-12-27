# 本地存储



## Cookie

>全称 HTTP Cookie，是浏览器存储数据的一种方式；
>
>存储在用户本地，而非服务器上，一般会随着浏览器每次的请求发送到服务器端；
>
>作用：可以利用Cookie跟踪用户访问该网站的习惯，比如何时访问，访问哪些页面，在每个页面的停留时间等；

Cookie在浏览器可以随意获取，因此不应在Cookie中保存私密信息，密码等；



#### Cookie的基本用法：

- 写入 Cookie：`document.cookie = 'name = key'`；

- 读取 Cookie：`document.cookie`，只能一次性读取所有 Cookie，原生方法中不能择一读取；

  

#### Cookie的属性：

- Cookie的名称和值：

  如果包含非英文字母，则写入时需要使用 `encodeURLComponent()` 解码，读取时使用 `decodeURLComponent()` 解码：

  ````js
  document.cookie = `user = ${encodeURIComponent('万琪睿')}`
  ````

- Cookie 的失效时间：

  类似于 Cookie 的生命周期，一旦到期则该Cookie被浏览器清除，消失；

  若没有设置 失效时间的Cookie 则被称为会话Cookie (生命周期为session)，当浏览器关闭时，该 Cookie 消失；

  可利用 `expires` 和 `max-age` 设置 Cookie 的生命周期：

  ````js
  // 利用expires设置 值为Date类型
  document.cookie = `name = HH; expires = $(new Date('2021-1-01 00:00:00')) `
  
  // 利用max-age设置 值为数字，表示当前的时间 +多少秒后过期，单位是秒
  document.cookie = 'age = 18; max-age = 5'
  // 如果max-age的值为0或者负数，则 Cookie 会被删除
  // 由此可知，想要删除某个Cookie值可以直接将其max-age设置为-1
  ````

- Domain (域)：设置了 Cookie 访问的范围，用户不能访问别的域名下的 Cookie

  ````js
  // 添加 domain 属性
  document.cookie = 'username = WW; domain = ’www.imooc.com'
  ````

  使用 JS 只能读写当前域或者父域的 Cookie，而不能读写其他域的 Cookie；

  >拓展：
  >
  >子域：www.imooc.com  and  m.imooc.com
  >
  >父域 (两个子域共有的部分)：.imooc.com

- Path (路径)：限制同一域名下 Cookie 的访问范围

  ````js
  document.cookie = 'age = 18; path = /'
  ````

  使用 JS 只能读写当前路径或者当前路径的上级路径的 Cookie，而不能读写下级路径的 Cookie;

- HttpOnly：设置了该属性的 Cookie 不能通过 JS 去访问，目的是为了安全性；

- Secure 安全标志：限定了只有在使用 https 而不是 http 的情况下才可发送给服务端

  

**只有名字，domain 和 Path 这三个字段都相同时，才是同一个 Cookie**；

**只用 domain，path 和 secure 三个属性都满足条件，且不失效的 Cookie 才会被发送到服务端**；



#### Cookie 的封装：

- set (写入 Cookie)

  ````js
  // 给剩余参数设置默认值是因为如果在传参时没有给剩余参数传值
  // 则会默认传为undefined，undefined无法解构，则会报错
  const set = (name, value, {maxAge, domain, path, secure} = {}) => {
     let cookieContent = `${encodeURIComponent(name)} = ${encodeURIComponent(value)}; `;
     if (typeof(maxAge) == 'number') {
         cookieContent += `max-age = ${maxAge}`
     }
     if (domain) {
         cookieContent += `; domain = ${domain}`
     }
     if (path) {
         cookieContent += `; path = ${path}`
     }
     if (secure) {
         cookieContent += `; secure`
     }
     // 将cookieContent赋值给cookie 
     document.cookie = cookieContent;
  }
  ````

  

- get (获取 Cookie)

  ````js
  const get = (name) => {
      name = `${decodeURIComponent(name)}`;
      // 将所获得的cookie的所有项，分割成一项一项的数组
      let cookieContent = document.cookie.split('; ');
      for(let item of cookieContent) {
          // 解构每一项的name和value
          const [cookieName, cookieValue] = item.split('=');
          if (cookieName === name) {
              return decodeURIComponent(value);
          }
      }
      // 如果在for循环中什么都没有找到，则直接返回
      return;
  }
  ````

  

- remove (删除 Cookie)

  ````js
  // 要确定一个cookie必须有三个要点 name，domain，path
  const remove = (name, {domain, path} = {}) => {
      set(name, '', {domain, path, maxAge: -1});
  }
  ````



## localStorage

>也是一种浏览器存储数据的方式 (本地存储)，与 Cookie 不同，它存储在本地且不会发向服务器端;
>
>有总大小的限制，单个域名下最大小限制最大在 5M 左右



#### localStorage的方法：

````js
// setItem()
localStorage.setItem('username', 'WW.');
localStorage.setItem('age', '18');
localStorage.setItem('sex', 'male');

// removeItem();
localStorage.removeItem('age');
localStorage.removeItem('ID');      // 不报错

// localStorage.clear();       // 删除全部

// getItem()
console.log(localStorage.getItem('username'));
console.log(localStorage.getItem('age'));       // null
console.log(localStorage.getItem('sex'));

console.log(localStorage.length);       // 2
````

由上可知：

`localStorage.getItem()` 中的参数若不存在，会返回 `null` 而不会报错；

`localStorage.removeItem()` 中参数若不存在，也不会报错；



#### localstorage注意事项：

1. 生命周期：

   `localStorage` 是持久化的本地存储，除非手动清除 (比如通过 js 删除，或者清除浏览器缓存)，否则数据是永远存在的；

   与之各方面相似的 `sessionStorage`，就是在生命周期处与其不同，它的生命周期为一次会话，浏览器关闭，会话关闭则 `sessionStorage` 被清除；

2. 键和值的类型：只能是字符串类型，即使输入的不是字符串类型，系统也会将该值先转化为字符串类型后存储进去；

3. 不同域名下不可以共用 `localStorage`

4. IE8 以下不支持 `localStroage `

