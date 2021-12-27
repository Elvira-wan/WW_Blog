
# JS 及 ES6

----

- 具名函数

  ````js
  var a = 10;
  (function a(){
      a = 20;
      console.log(this.a);	// 10
      console.log(a);			// function a() {a = 20; console.log(a)}
  }())
  ````

  上面输出的 10 很好理解，因为 IIEF 执行的上下文就是 `window` 那么此时读取 `this.a` 就是外部定义的 `a = 10`；

  而 `a` 输出的 `function a` 就涉及到具名函数的知识点，即：

  这是一个立即执行的函数表达式（Immediately-invoked function expression, IIFE），更特殊的，该函数表达式是一个具名函数表达式（Named function expression, NFE)，NFE 两大特性：

  - 作为函数名的标识符（在这里是 `a` ）只能从函数体内部访问，在函数外部访问不到 (IE9+)；
  - 绑定为函数名的标识符（在这里是`a`）不能再绑定为其它值，即该标识符绑定是不可更改的（immutable），所以在 NFE 函数体内对 `A` 重新赋值是无效的；

  ````js
  var a = 10;
  function a() {
      console.log(a);
  }
  console.log(a);		// 10
  a();				// 报错：a不可调用
  ````

  出现这样的原因就是因为若函数不是赋值表达式的形式 那么该函数名只有在函数被调用时才会初始化赋值，否则不会；

  但若不写 `var a = 10` 这条赋值语句，会输出：

  ````js
  function a() {
      console.log(a);
  }
  console.log(a);		// function a
  ````

  这是js的一个类似保护机制，若一个变量没有声明，没有赋值，但有一个函数将其定义为自身函数名，则不输出 undefined，输出该函数；

  

- `for in` 和 `for of` 的区别

  > for in ：可以用来遍历数组或者对象的属性，该循环是。。。的内置方法，在原型链中被继承，只遍历可枚举属性，在遍历数组时，数组的索引只是具有整数名称的可枚举属性，并且与通用对象属性相同，**因此不能保证 for in 以任何特定的顺序返回索引**，因为迭代的顺序是依赖于执行环境的，所以数组遍历不一定按次序访问元素。因此当迭代访问顺序很重要的数组时，最好用整数索引去进行`for`循环（或者使用 `Array.prototype.forEach()` 或 `for...of` 循环）。
  >
  > 
  >
  > for of :是ES6新特性，用来遍历可迭代对象，例如`Array`，`Map`，`Set`，`String`，`TypedArray`，`arguments` 之类的，一个数据结构只要部署了 Symbol.iterator 属性, 就被视为具有 iterator接口, 就可以使用 for of循环。
  >
  > 
  >
  > 简单来说两者有以下区别：
  >
  > 1. for of无法循环遍历对象；
  >
  > 2. 遍历输出结果不同，for in循环遍历的是数组的键值(索引)，而for of循环遍历的是数组的值；
  >
  > 3. for in 会遍历自定义属性，for of不会
  >
  >    ````js
  >    var arr = ['nick','freddy','mike','james'];
  >    arr.name = "数组";
  >    
  >    for(var key in arr){
  >        console.log(key+': '+arr[key]);	
  >    }
  >    console.log('-----------分割线-----------');
  >    for(var item of arr){	
  >        console.log(item);
  >    }
  >    ````
  >
  >    输出结果：for in输出自定义属性name，而for of没有
  >
  >    ![20180531124338420](20180531124338420.png)

  

- `promise`

  >`Promise` 是异步操作的解决方案，一般用来**解决层层嵌套** (回调地狱 callback hell)  的回调函数；
  >
  >
  >
  >在实例化一个Promise时，必须传一个回调函数作为参数，该函数接收 `resolve/reject` 作为参数，在该函数中调用这两个参数作为函数，则可以改变Promise的状态；
  >
  >
  >
  >`Promise` 的三 个状态：
  >
  >- `pending`：初始态
  >- `fullfilled / resolved`：成功态
  >- `rejected`：失败态
  >
  >**Promise 的状态一旦变化就不会再改变**;
  >
  >
  >
  >Promise有一个 `then()` 方法，该方法参数为两个回调函数，在Promise为成功态时执行第一个回调，失败态时执行第二个回调，同时，then() 方法中可以接收 `resolve() 和 reject()` 中传的参数，在 `then()` 执行完成后 retrun 一个新的 Promise 对象；
  >
  >若不写 return 则直接返回一个成功态的 Promise；
  >
  >若 return new Promise()，则终止 链式then() 的执行； 
  >
  >
  >
  >`catch()` 方法：
  >
  >一般情况下，`then()` 方法被用来处理 `resolve()` 的状态，而当出现异常时我们一般不去调用 `then()` 方法的第二个回调函数，而是使用 `catch()` 处理出现的异常；如果一个异常没有被捕获，那么他将会一直向下传递直至被捕获为止；其实 `catch()` 算是一种特殊的 `then()`；
  >
  >
  >
  >Promise的其他方法
  >
  >- `finally()` 方法：表达一个 `Promise` 的状态，若变化则会调用该方法，不变则不调用； 
  >
  >- `Promise.resolve() / Promise.rejecte()` ：类似于构造函数 `Promise` 的简写形式；
  >
  >`Promise.resolve()` 参数的三种形式：
  >
  >1. 一般参数：原封不动的向后传递；
  >
  >2. 一个 `Promise` 对象作为参数：
  >
  >  ````js
  >const p1 = new Promise(() => {
  >    setTimeout(console.log, 2000, 'OK');
  >    // 该写法形同
  >    // setTimeout(() => {
  >    //     console.log('OK');
  >    // }, 2000)
  >});
  >Promise.resolve(p1).then(() => {
  >    console.log('end');
  >});
  >// 2s后输出OK，但不输出end
  >// 因为以上的写法就等同于
  >p1.then();
  >  ````
  >
  >  因此可知，当 Promise 作为参数传入时，等同于 参数Promise 直接调用 `then()`;
  >
  >3. 当一个含有 `then()` 方法的对象传入时：
  >
  >  ````js
  >const obj = {
  >    then() {
  >        console.log('ending');
  >    }
  >}
  >Promise.resolve(obj).then(() => {
  >    console.log('then');
  >});
  >// 输出 ending
  >  ````
  >
  >  传入对象的 `then()`，将 `promise` 中原本的 `then()` 覆盖
  >
  >- `Promise.all()`：同时监听多个 `Promise` 对象的状态

  

- 原型链

  

- 作用域与闭包

  闭包：是函数本身和该函数声明时所处的环境状态的组合；

  ![image-20210308194332246](image-20210308194332246.png)

  简而言之，函数能够<u>记住其**定义时**所处的环境</u>，即使函数不在其定义的环境中被调用，也能访问自身定义时所处的变量；

  ````js
  function fun() {
      var name = '慕课网';
      function innerFun() {
          alert(name);
      }
      return innerFun;
  }
  var inn = fun();
  var name = 'imooc';
  inn();      // 调用inn()，警告框弹出'慕课网'，而不是undefined
  ````

  - 为什么 `inn()` 执行后弹出的警告框为 '慕课网' ？

    错误理解：按照正常情况 `inn = innerFun()`，这是把 `fun()` 的内部函数放在外部调用，这样其实是无法获取到 `Fun()` 内部设置的局部变量 `name = '慕课网'` 的值的，因此输出 `imooc` ;

    但是，js中有一个**闭包原则**，由于闭包原则`innerFun()` 定义在 `Fun()` 闭包环境中，因此它能记住 `Fun()` 的环境，使用`inn()` 调用 `innerFun()`时，可以获取到 `Fun()` 中定义的局部变量 `name = '慕课网'`；

  另外，闭包有记忆性，闭包产生时，函数所处的环境状态 (活动对象) 会始终保存在内存中，不会在外部函数调用后被自动清除；

  ````js
  // 闭包常见面试题
  var data = [];
  
  for (var i = 0; i < 3; i++) {
    data[i] = function () {
      console.log(i);
    };
  }
  
  data[0]();		// 3
  data[1]();		// 3
  data[2]();		// 3
  // 因为在循环完成之后 i = 3， 此时再调用函数返回的一定都是 3
  
  // 解决方法一：
  for (let i = 0; i < 3; i++) {
    data[i] = function () {
      console.log(i);
    };
  }
  // 解决方法二：
  for (var i = 0; i < 3; i++) {
    data[i] = (function(i) {
        function () {
          console.log(i);
        };
    })(i)
  }
  ````

  ````js
  // 闭包常见面试题二：实现无限相加add(1)()
  ````

  

  

- 执行上下文

  >它定义了变量或函数有权访问的其它数据，决定了他们各自的行为。每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。
  >
  >函数的上下文是由函数的调用决定的：

  ![image-20210303214725221](image-20210303214725221.png)

  

- 作用域链和上下文

  >每个函数调用时都会产生自己的上下文，即this的指向；当代码执行流进入函数时，函数的上下文被推入一个上下文栈中，一旦函数执行完毕，则上下文栈弹出该上下文，将控制权还给前一个执行的上下文，因此每次代码执行时访问的始终是上下文栈最前端的上下文；
  >
  >上下文代码在执行时，会创建变量对象的一个**作用域链**，这个作用域链决定了各级上下文中的代码在访问遍历和函数的顺序，每次代码执行时访问的始终是上下文栈最前端的上下文，如果上下文为函数，则其活动对象用作变量对象，活动对象最初只有一个定义变量 (argument)，作用域链中的下一个变量对象包含来自上下文，再下一个对象来自再下一个包含上下文，以此类推直至全局上下文，全局上下文始终为作用域链的最后一个变量对象；
  >
  >其实函数作用域链就是一个沿着作用域一层层查找变量的过程，变量的作用域就是一个变量可使用的范围，像是ES6中新提出的let，const声明的变量就是在块级作用域中的；最外层的作用域叫全局作用域，还有函数声明的叫函数例如每声明一个函数就会创建出一个独立的作用域，其中函数可以嵌套，嵌套的函数也就形成了一个作用域链；
  >
  >在作用域中是有遮蔽效应的，如果在自身作用域和上层作用域中同时定义了 a 变量，那么会优先使用自身作用域的 a 变量的值；

  ````js
  function fn(callback){
      var age = 20;
      callback();
  }
  fn(function(){
      console.log(age);//报错
      //1.在当前作用域没有查找到age
      //2.查找上一级作用域：全局作用域
      //为何是全局作用域？因为看上一级作用域，不是看函数在哪调用，而是看函数在哪编写的。
      //这种特别的作用域，叫做“词法作用域”
  })
  ````

  **注意：**函数的上级作用域取决去它在何处编写，而不是在何处被调用，也就是词法作用域；而 this 的指向取决于动态作用域，即函数被执行时所在的位置；

  

- `call(), apply(), bind()`：三者均是用来重新定义 this指向 的

  不同点：

  1. bind() 的返回值是一个新的函数，另外两个则是直接改变调用者的 this，返回值取决于调用者的 `retrun`；
  2. `call() 和 bind()` 传的参数是单个传入，用逗号分隔，而 `apply()`  是以数组的形式将参数传入；

  

- 为什么会变量提升

  - 先从函数提升讲起

    1. 允许声明前调用

       ````js
       function addTwo(x) { return addOne(addOne(x)) } // 能够调用后面的addOne函数
       function addOne(x) { return x + 1 } // 想要调用addTwo也是可以的
       ````

    2. 明确自我递归的语意（`let rec`）

       ````js
       function fib(n) { return n == 2 ? 1 : n == 1 ? 1 : fib(n - 1) + fib (n - 2) } 
       // 由于fib声明提升了，所以无论是let还是let rec，很明白地，fib指的都是自己
       ````

    3. 比较适合解释器分析程序

       因为函数提升到了block前面，所以解释器可以集中地了解到这个block里有哪些函数，然后进行一些准备操作。这类似于一种Top-Down的思想。

       

    例题：

    ````js
    var x = 1, y = z = 0;
    function add(n) {
        n = n + 1;
    }
    y = add(x);
    function add(n) {
        console.log(n)
        x = n + 3;
    }
    z = add(x);
    console.log(x ,y, z)
    ````

    注意：`x = 7` 因为函数的声明提升会直接将上一个覆盖 无论调用在哪里，调用的都是最后的 add();

    

  - 至于var变量提升的作用

    根据Brendan Eich本人的说法，这是函数提升的一个"unintended consequence"

    …行吧，果然是个神奇的语言。不过这样做的好处和函数提升的第三点是一样的——集中处理变量声明，并且关联作用域。

    ````js
    // 简述产生此结果的理由
    (function(){
        var x = y = 1;
    })();
    console.log(y);		// 1
    console.log(x);		// x is not defined;
    ````

    连等操作符的赋值顺序是由右至左的，因此可以看作赋值过程为 `y = 1, var x = y`，可以看出 x 是由 var 声明并赋值的，为一个IIEF函数中的一个局部变量，而 `y = 1` 是没有任何声明标识符直接赋值的，是一个全局变量，因此在IIEF函数执行结束之后， x 变量被销毁，而 y 变量保存在全局中可以被读取；

    ````js
    var a = { n: 1 };
    var b = a;
    // 1. 先将a指向了一个新对象的引用，即 a = {n: 2}
    // 2. 将原来的 a = {n：1} 的a.x赋值为一个对象，即 a.x = {n：2}
    a.x = a = { n: 2 };
    console.log(a);			// {n: 2}
    console.log(b);			// {n: 1, X: {n: 2}}
    ````

    **注意**：

    - 因为 `.` 的优先级高于 `=`，因此在连等中 a.x 中的 a 并不是引用改变之后的 a，此时堆内存中的 `{n: 1}` 就会变为 `{n: 1, x: undefined}`，则 `b` 指向的堆内存被改变了；

    - 赋值操作是从右至左，因此先执行 `a = {n: 2}`，则 `a` 的引用被改变，后将返回值赋堆内存中的 `{n: 1, x: undefined}`，变为 `{n: 1, x: {n: 2}}`

      

    ````js
    if (!('a' in window)) {
        var a = 10;
        console.log(a);
    }
    ````

    在这道题中 `if` 中的语句就不会被执行，因为 `var` 已经将变量 `a` 声明提升了，只是还没有进行初始化赋值而已，因此此时 `'a' in window` 的值是 `true`；

    

- var、let、const

  >`var`：
  >
  >声明的变量会被自动添加到最接近的上下文；
  >
  >有变量的声明提升
  >
  >声明提升只提升定义不提升值

  

  >`let`：
  >
  >作用域范围只在块级作用域 ( if，while，for 或 单纯的 {} ) 中，**不能二次声明**
  >
  >没有变量的声明提升
  >
  >十分适用于 for 语句的迭代中 
  >
  >特别地：就算 let 定义的变量没有被块级作用域包裹，就将 let 定义写在全局中，其定义的变量也不属于 `window` 对象；

  

  >`const`：
  >
  >与 let 相同，作用于块级作用域，没有变量声明提升
  >
  >此外，必须在声明时就设定好初始值，且**不能二次赋值**
  >
  >但这里说的不能二次赋值是指 const 变量如果是一个基本数据类型，则不能被二次赋值，若 const 变量为一个引用，例如对象，则该对象的键依旧可以被重新赋值
  >
  >若想使对象的值也不可改变的话，可以使用 `const person = Object.freeze({});`

  

  此外 `let` 和 `const` 中存在一个暂时性死区：

  ````js
  var a = 1;
  var b = 2;
  function fun () {
      console.log(a);		// 1
      console.log(b);		// Uncaught ReferenceError: Cannot access 'b' before initialization
      let b = 1;
  }
  fun();
  ````

  这里的 `b `无法获取到函数作用域外的 `b` 的值就是因为，在 `fun` 中 `let b` 的声明导致函数形成了暂时性死区，无法顺着作用域链去全局中搜索变量。

  

- 链表和数组的区别

  数组是一种线性表的数据结构，是一组连续的内存空间，来存储一组数据，数组创建时，计算机会给其分配一块连续的内存空间，并给出内存首地址 `base_address`，每次访问数组获取数据时，计算机就会根据寻址公示计算出内存地址；

  而链表存储于一组零散的内存块，前一个内存空间的next指针指向下一个内存空间。访问链表时，只需获得链表的头节点，即可通过next指针访问整个链表；

  

- {}、new Object()，Object.create({})的区别

  `{} 和 new Object() ` 除了本身创建的对象，都继承了 Object 原型链上`(Object.prototype)` 的属性或者方法，eg：toString()；当创建的对象相同时，可以说 {} 等价于 new Object() 
  `Object.create() `是将创建的对象继承到原型链上，而本身没有继承 `Object.prototype` 的属性和方法。

  

- `new` 做了什么

  1. 系统首先在构造函数的内部创建了一个实例对象

  2. 该函数的 this 指向实例对象

  3. 根据构造器 `constructor` 中的赋值语句给实例对象创建属性

  4. 返回该实例对象

     

- 事件绑定，解绑

- 垃圾回收机制

  >JS 有自动的垃圾收集机制，垃圾收集器会每隔一段事件就执行一次释放操作，找出那些不再继续使用的值，然后是放其占用内存；
  >
  >以Google的V8引擎为例，V8引擎中所有的JS对象都是通过堆来进行内存分配的：
  >
  >- 初始分配：当声明变量并赋值时，V8引擎就会在堆内存中分配给这个变量。
  >- 继续申请：当已申请的内存不足以存储这个变量时，V8引擎就会继续申请内存，直到堆的大小达到了V8引擎的内存上限为止。
  >
  >V8引擎对堆内存中的JS对象进行分代管理：
  >
  >- 新生代：存活周期较短的JS对象，如临时变量、字符串等。
  >- 老生代：经过多次垃圾回收仍然存活，存活周期较长的对象，如主控制器、服务器对象等。

  局部变量和全局变量的销毁：

  - 局部变量：局部作用域中，当函数执行完毕，局部变量也就没有存在的必要了，因此垃圾收集器很容易做出判断并回收。
  - 全局变量：全局变量什么时候需要自动释放内存空间则很难判断，所以在开发中尽量**避免**使用全局变量。

  >垃圾回收算法的核心思想就是如何判断内存已经不再使用；
  >
  >常用的垃圾回收算法有两种：

  >**引用计数** (被现代浏览器弃用)：引用计数算法定义“内存不再使用”的标准很简单，就是看一个对象是否有指向它的**引用**。如果没有其他对象指向它了，说明该对象已经不再需要了；
  >
  >````js
  >// 创建一个对象person，他有两个指向属性age和name的引用
  >var person = {
  >age: 12,
  >name: 'aaaa'
  >};
  >
  >person.name = null; // 虽然name设置为null，但因为person对象还有指向name的引用，因此name不会回收
  >
  >var p = person; 
  >person = 1;         //原来的person对象被赋值为1，但因为有新引用p指向原person对象，因此它不会被回收
  >
  >p = null;           //原person对象已经没有引用，很快会被回收
  >````
  >
  >引用计数有一个致命的问题，那就是**循环引用** ？？？？
  >
  >如果两个对象相互引用，尽管他们已不再使用，但是垃圾回收器不会进行回收，最终可能会导致内存泄露。
  >
  >```js
  >function cycle() {
  >var o1 = {};
  >var o2 = {};
  >o1.a = o2;
  >o2.a = o1; 
  >
  >return "cycle reference!"
  >}
  >
  >cycle();
  >```
  >
  >`cycle`函数执行完成之后，对象`o1`和`o2`实际上已经不再需要了，但根据引用计数的原则，他们之间的相互引用依然存在，因此这部分内存不会被回收。所以现代浏览器**不再使用**这个算法。
  >
  >但是IE依旧使用。
  >
  >```js
  >var div = document.createElement("div");
  >div.onclick = function() {
  >console.log("click");
  >};
  >```
  >
  >上面的写法很常见，但是上面的例子就是一个循环引用。
  >
  >变量div有事件处理函数的引用，同时事件处理函数也有div的引用，因为div变量可在函数内被访问，所以循环引用就出现了

  >**标记清除** (常用)：标记清除算法将 “不再使用的对象” 定义为 “无法到达的对象”。即从根部（在JS中就是全局对象）出发定时扫描内存中的对象，凡是能从根部到达的对象，**保留**。那些从根部出发无法触及到的对象被标记为**不再使用**，稍后进行回收
  >
  >无法触及的对象包含了没有引用的对象这个概念，但反之未必成立。所以上面的例子就可以正确被垃圾回收处理了。
  >
  >所以现在对于主流浏览器来说，只需要切断需要回收的对象与根部的联系。最常见的内存泄露一般都与DOM元素绑定有关：
  >
  >```js
  >email.message = document.createElement(“div”);
  >displayList.appendChild(email.message);
  >
  >// 稍后从displayList中清除DOM元素
  >displayList.removeAllChildren();
  >```
  >
  >上面代码中，`div`元素已经从DOM树中清除，但是该`div`元素还绑定在email对象中，所以如果email对象存在，那么该`div`元素就会一直保存在内存中；

  

  内存泄漏：

  > 对于持续运行的服务进程（daemon），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。 对于不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）

  

- JS数据类型：

- 数组扁平化：

  ````js
  // 方法一：直接使用数组方法 flat()
  arr.flat();
  
  // 方法二：toString()
  // 注意：该方法需要调用map()方法将各项转化为数字，否则各项都为字符串
  arr.toString().split(',').map(Number);
  
  // 方法三：重写flat()方法
  function flatten(arr) {
      // arr.some()，若数组中有任何一项满足条件则返回true
      // 则arr中只要有数组就会再循环中不停的层层解构
      while (arr.some(item => Array.isArray(item))) {
          arr = [].concat(...arr);
      }
      return arr;
  }
  
  // 去重
  [...new Set(arr)]
  ````

  特别地，数组中若有**空项**，在 方法1 中会被自动删去，在 方法2 中会被转化为0，在方法3 中 依旧保持为空；





- 隐式类型转换：

  - 如果参与数学运算的某操作数不是数字类型，那么JavaScript会自动将此操作数转换为数字类型；

    ````js
    3 * '4'			// 12
    true + true		// 2
    false + 2		// 2
    3 * '2天'	   // NaN
    3 + null		// 3
    3 + undefined	// NaN
    ````

    其本质是内部调用 Number() 函数；

    **注意**：若 `+` 的任意一边有字符串参加运算的话，会自动调用 `string()` 采用字符串拼接；

    ````js
    {} + []		// 0
    [] + {}		// [object Object]
    ````

    在第一个算式中 `{}` 会被当成 **代码块**，因此解析的是 `+ []`，而此时 `[].valueof = [] `，不是基本数据类型，因此调用其 `toString()` 方法，将其转换为 `''` 空字符串；

    在第二个算式中 `[]` 同上步骤转化为 `''` 空串，使得后置的 `{}` 隐式类型转换为 `[objext Object]` ，因此结果为 `[object Object]`

  - 对象的属性名：

    ````js
    const obj = {
        a: {},
        b: {a: 2}
    }
    obj[obj.a] = 2;
    obj[obj.b] = 3;
    console.log(obj[{}]);  // 2
    ````

    因为在对象中只有字符串才是标准的属性名，其实此时存储 `2` 的变量名会被为隐式类型转换为字符串 `[object Object]`，因此想要读取 `2`，只需要输入 `obj[{}]` 任意一个对象作为属性名，系统将自动将对象名转化为 `[object Object]` 并访问到变量 `2`;

    

  - 对象到字符串的转换 (这里说的是String()方法的原理)

    1. 若具有 `toString()` 方法，调用 `toString()`，如果它返回一个原始值，将这个原始值转换为字符串返回；
    2. 若无 `toString()` 方法，或 `toString()` 的返回值并不是一个原始值，寻找其`valueOf()` 方法，若存在这个方法，调用它，如果它返回一个原始值，将这个原始值转换为字符串返回；
    3. 否则 (无 `valueOf()` 或 `valueOf()` 的返回值不是原始值），JS无法从`toString()` 或 `valueOf()` 方法获得一个原始值，因此 `throw TypeError`；

  - 对象到数字的转换 (这里说的是Number()方法的原理)

    1. 若具有 `valueOf()` 方法，调用 `valueOf()`，如果它返回一个原始值，将这个原始值转换为数字返回；

    2. 若无 `valueOf()` 方法，或 `valueOf()` 的返回值并不是一个原始值，寻找其`toString()` 方法，若存在这个方法，调用它，如果它返回一个原始值，将这个原始值转换为数字返回；

    3. 否则 (无toString()或toString()的返回值不是原始值)，JS无法从 `toString()` 或`valueOf()` 方法获得一个原始值，因此 `throw TypeError`；

       

  - 调用 `ValueOf()` 也会进行类型转换：

    步骤如下：

    1. 调用ToObject方法得到一个对象O；
    2. 原始数据类型转换为对应的内置对象， 引用类型则不变；
    3. 调用该对象(O)内置valueOf方法；

    ````js
     // 规则如下：
     var str = new String('123')
     console.log(str.valueOf())  // 123
     var num = new Number(123)
     console.log(num.valueOf())  // 122
     var date = new Date()
     console.log(date.valueOf()) // 数字值
     var bool = new Boolean('1')
     console.log(bool.valueOf()) // true, 若为空串则返回false
     var obj = new Object({
         a: 10,
         valueOf: () => {
             return 1
         }
     })
     // 依赖于内部实现，若未实现就该对象
     console.log(obj.valueOf())  // 1
    ````

    ````js
    // 下题隐式类型转换输出：
    var obj1 = {
        valueOf:function(){
            return 1
        }
    }
    var obj2 = {
        toString:function(){
            return 'a'
        }
    }
    //2
    console.log(1+obj1)
    //1a
    console.log('1'+ obj2)
    //1a
    console.log(obj1+obj2)
    ````

    

  - 在 `==` 之间的比较：

    1. 若 x，y 均为 number 类型，直接比较；

    2. 若存在对象，且对象有 `valueOf` 属性，返回值与另一个值相等，则相等，否则不等；

    3. 存在 boolean，则 `true = 1` or `false = 0`，再进行比较；

    4. 若为 string，先转换为 number，再进行比较；

    5. 此外 `null = 0` or `undefined = NaN`；

       

- `call()` 和 `apply()`

  `Array.prototype.push.apply(arr1, arr2)`：将 `arr2` 合并进 `arr1`，但由于函数可接受参数长度有限，为了避免丢参，在数组长度过多时不宜使用该方法；



- JS 模块化

  >将一个系统分为独立功能部分，严格定义模块接口，更加方便其复用；
  >
  >优点：
  >
  >- 灵活架构，jia

- ES6 的新特性

  1. let/const

  2. 模板字符串

  3. 解构赋值

  4. 剩余参数和展开运算符

  5. 对象字面量增强

  6. 箭头函数

  7. 字符串，数组，对象新增方法

  8. Map 和 Set

  9. class 类

  10. Promise

       

- 数组去重

- 手写 `bind()`

  ````js
  function bind(fn, obj) {
      return function() {
          return fn.apply(obj, arguments);
      }
  }
  ````

  `bind()` 不同于 `apply` 和 `apply` 只是单纯的设置 `this` 值后传参，且返回绑定 `this` 函数的返回值，`bind()` 还会将所有传入 `bind()` 方法中的实参 (除第一个 `this` 指向外的参数) 与 `this` 一起绑定，例如：

  ````js
  var sum = function(x,y) { return x + y }; 
  var succ = sum.bind(null, 1); //让this指向null，其后的实参也会作为实参传入被绑定的函数sum
  succ(2); // => 3: 可以看到1绑定到了sum函数中的x
  ````

  已知函数有两个属性：`name: 函数名，length: 参数长度`，此时 `bind()` 所返回函数的 `length` 属性等于原函数中的 `length` 属性 减去 已经传入 `bind()` 中的实参个数，上述例子的 `succ,length = 1`；

  **特别地**：当 `bind()` 所返回的函数用作构造函数的时候，`bind()` 的 `this` 将被忽略，实参依旧会传入原函数；

  

  

  

- 手写 `IntanceOf`

- 手写发布订阅模式

- 手写 `Promise` 实现失败后重新请求

- ES7 新特性


