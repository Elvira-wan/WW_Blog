
# Node.js

------

- Common.js 的 require 和 ES6 的 module有什么区别

  >曾经的js没有模块体系无法拆分为多个模块文件，因此出现了统一的规范(Common.js和AMD)，前者是争对服务端(Node.js)，后者是针对浏览器；ES6在语言标准层面上，实现了模块功能；
  >
  >Node.js主流还是采用Common.js规范，但是在v13.2版本已经实现了ES6模块语法，但未正式替换，v13.2版本将`js`文件以 `.mjs`结尾则将其视为`ES6`模块。以 `.cjs` 结尾则视为 `Common.js` 模块。也可以在包的package.json文件中增加 "type": "module"信息。nodejs则将整个包都视为ES6模块来加载运行

- 事件循环打印：

  ````js
  for(var i=0;i<5;i++) {
      setTimeout(()=>{
          console.log(i)
      }, i*1000)
  }
  // 打印什么
  
  let promise = new Promise((res,rej)=>{
       setTimeout(()=>{
          console.log(0)
      },0)
      console.log(1)
      res();
      rej();
  })
  promise.then(()=>{
      console.log(2)
    },()=>{
         console.log(3)
     } 
  )
  js闭包
  function fun(){
      let a =1
      function fun1(){
          console.log(a);
      }
      fun1();
  }
   
  fun();
  // 打印什么
  ````

  

- 事件循环

  >JS引擎常驻于内存中，等待宿主将JS代码或者函数传递给它，也就是等待宿主环境分配宏观任务，反复等待 - 执行 即为事件循环；
  >
  >
  >
  >执行栈：是一个存储函数调用的栈结构，遵循先进后出的原则，在开始执行 js 代码之前，会执行一个 `main` 函数，然后执行代码；更具先进后出的原则，后执行的函数会先弹出栈

  ![img](25750-50b8dfd7f560fe04.webp)

  >Event Loop中，每一次循环称为tick，每一次tick的任务如下：
  >
  >- 执行栈选择最先进入队列的宏任务（一般都是script），执行其同步代码直至结束；
  >- 检查是否存在微任务，有则会执行至微任务队列为空；
  >- 如果宿主为浏览器，可能会渲染页面；
  >- 开始下一轮tick，执行宏任务中的异步代码（setTimeout等回调）。

  ![2100352608-7bccadc45cd17413](2100352608-7bccadc45cd17413-1626947390046.gif)

  >执行步骤：
  >
  >1. 执行函数 `a()`先入栈
  >2. `a()`中先执行函数 `b()` 函数`b()` 入栈
  >3. 执行函数`b()`, `console.log('b')` 入栈
  >4. 输出 `b`， `console.log('b')`出栈
  >5. 函数`b()` 执行完成，出栈
  >6. `console.log('a')` 入栈，执行，输出 `a`, 出栈
  >7. 函数a 执行y，出栈。

  事件队列：

  在任务的执行过程中，遇到异步事件，并不会等待他的返回结果，而是将事件挂起，继续执行执行栈中的其他任务；当异步事件返回结果，再将它放到事件队列中，但并不会立即执行，而是等待当前执行栈中的任务都执行完毕，主线程空闲状态，主线程会去查找事件队列中是否有任务，如果有则取出排在第一位的时间，并把该事件的回调放到对应的执行栈中，然后继续执行其中的同步代码；

  

- 宏任务和微任务：

  >ES6 规范中，microtask 称为 `jobs`，macrotask 称为 `task`
  >宏任务是由宿主发起的，而微任务由JavaScript自身发起。
  >
  >页面渲染事件 和 各种IO完成事件等随时会被添加到任务队列中，队列会一致保持先进先出的原则执行，我们并不能准确的控制这些事件被添加到任务队列中的位置。此时若突然由高优先级的任务需要尽快执行，那么一种类型的任务就没办法满足了，因此引入了微任务队列；

  所以，总结一下，两者区别为：

  ![image-20210722164321588](image-20210722164321588.png)

  >**运行机制**：
  >
  >异步任务的返回结果会被放到一个任务队列中，根据异步事件的类型，这个事件实际上会被放到对应的宏任务和微任务队列中去。
  >
  >在当前执行栈为空时，主线程会查看微任务队列是否有事件存在
  >
  >- 存在，依次执行队列中的事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的事件，把当前的回调加到当前指向栈。
  >- 如果不存在，那么再去宏任务队列中取出一个事件并把对应的回到加入当前执行栈；
  >
  >当前执行栈执行完毕后时会立刻处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。
  >
  >
  >
  >在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的，但**关键步骤**如下：
  >
  >- 执行一个宏任务（栈中没有就从事件队列中获取）
  >- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
  >- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
  >- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
  >- 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

  ````js
  console.log('start')
  
  setTimeout(function() {
    console.log('setTimeout')
  }, 0)
  
  Promise.resolve().then(function() {
    console.log('promise1')
  }).then(function() {
    console.log('promise2')78I
  })
  
  console.log('end')
  ````

  ![1653721873-5adb68e2247cf](1653721873-5adb68e2247cf.gif)

  ````js
  const p = function() {
      return new Promise((resolve, reject) => {
          const p1 = new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve(1)
              }, 0)
              resolve(2)
          })
          p1.then((res) => {
              console.log(res);
          })
          console.log(3);
          resolve(4);
      })
  }
  
  
  p().then((res) => {
      console.log(res);
  })
  console.log('end');
  
  /*
  最后的执行结果如下:
  3
  end
  2
  4
  */
  ````

  ````js
  new Promise(resolve => {
      console.log(1);
      setTimeout(() => {
          console.log(5);
      }, 0);
      resolve(3);
      Promise.resolve().then(() => console.log(4));
  }).then(num => {
      console.log(num);
  })
  console.log(2);
  /*
  最后的执行结果如下:
  1
  2
  4
  3
  5
  */
  ````

  注意：虽然 `resolve(3)` 书写在 `Promise.resolve().then(() => console.log(4))` 之前，但是他是一个回调函数，会在自身的 `Promise` 执行结束之后再去执行自身 `.then()` 的内容，因此要先输出 4 再 输出 3；

  

  >Node 事件循环阶段如下：
  >
  >- 定时器检测阶段(timers): 这个阶段执行定时器队列中的回调如 setTimeout() 和 setInterval()。
  >- I/O事件回调阶段(I/O callbacks): 这个阶段执行几乎所有的回调。但是不包括close事件，定时器和setImmediate()的回调。
  >- 闲置阶段(idle, prepare): 这个阶段仅在内部使用，可以不必理会
  >- 轮询阶段(poll): 等待新的I/O事件，node在一些特殊情况下会阻塞在这里。
  >- 检查阶段(check): setImmediate()的回调会在这个阶段执行。
  >- 关闭事件回调阶段(close callbacks): 例如socket.on('close', ...)这种close事件的回调
  >
  >
  >
  >Node中事件循环的顺序：
  >
  >外部输入数据 --> 轮询阶段（poll） --> 检查阶段(check) --> 关闭事件回调阶段(close callback) --> 定时器检查阶段(timer) --> I/O 事件回调阶段(I/O callbacks) --> 闲置阶段(idle, prepare) --> 轮询阶段...


