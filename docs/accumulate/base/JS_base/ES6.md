# ES6

[[toc]]


### 变量声明的三种方法 (var, let, const)

------

>`var`：
>
>声明的变量会被自动添加到最接近的上下文；
>
>有变量的声明提升
>
>声明提升只提升定义不提升值



>`let`：
>
>作用域范围只在块级作用域 ( if，while，for 或 单纯的 {} ) 中
>
>**不能二次声明**
>
>````js
>// case1：
>let a = 1;
>let a = 2;		// 报错
>
>// case2:
>function (a) {
>    let a = 1;
>    // 报错，即使前一个a不是使用let声明的
>    // 只要这个变量名被用过再次用let就会报错
>}
>````
>
>没有变量的声明提升
>
>十分适用于 for 语句的迭代中 
>
>````js
>for (let i = 0; i < 10; i++) {
>
>}
>console.log(i);		// ReferenceError：i is undefined;
>````
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
>````js
>const person = {}；
>// person = new object();		// 报错
>person.name = 'Nichola';
>console.log(person.name);		// Nichola
>````
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



### 模板字符串

------

>`'HH'` 或者 `"WW"`，这种用单引号或双引号括住的称为一般字符串
>
>用 \`WW` (反引号) 表示的即为模板字符串；
>
>一般字符串只能用加号拼接不同字符串，但是模板字符串可以使用 `${变量}` 来拼接

````js
const person = {
    name: 'HH',
    age: 21,
    sex: 'male'
}
// 一般字符串输出函数
console.log('我的名字是' + person.name + ', 我今年' + person.age + '岁了, 我的性别是' + person.sex);
// 模板字符串输出
console.log(`我的名字是${person.name}, 我今年${person.age}岁了,我的性别是${person.sex}`)
````

- 模板字符串中所有的空格，换行，缩进都会被保留在输出中
- 输出 \` 和  \ 等特殊字符需要采用转义字符： \\\`  和 \\\
- 模板字符串的注入：`${}`
  
  - 只要最终可以得出一个值的，都可以注入到模板字符串中;
  
    

模板字符串例子：

````html
<p>学生信息表</p>
<ul id='list'>
    <li style="list-style: none;">信息加载中</li>
</ul>
````

````js
const stu = [
    {
        username: 'HH',
        age: 21,
        sex: 'male'
    },
    {
        username: 'WW',
        age: 20,
        sex: 'famale'
    }
];
const list = document.getElementById('list');
var html = '';
for (let i = 0; i < stu.length; i++) {
    html += `<li>我的名字是：${stu[i].username}, 我的年龄为${stu[i].age}, 性别为 ${stu[i].sex}</li>`
    console.log(html)
}
list.innerHTML = html;
````

1. `stu` 是一个数组，里面的每个项都为对象，而不是对象中包含对象；
2. 首先要将 `html` 的值设置为 `''`，否则会导致后面 `html +=` 时 `html` 前面初始为 `undefined`;
3. 一定要预先定义 `html`，否则无法获取其值；



### 解构赋值

------

>解析某一数据的结构，将我们想要的东西提取出来，赋值给常量或者是变量
>
>`eg: const [a, b, c] = [1, 2, 3];`
>
>
>
>原理：
>
>- 模式/结构匹配 (数组配数组，对象配对象，不能数组配对象)
>
>- 相同 索引值/属性名 完成赋值，如果不想取的数可以直接用逗号跳过
>
>  eg:  `const [a, [,,b], c] = [1, [2, 3, 4], 5]`;
>
>  此时 `a = 1, b = 4, c = 5`



数组解构赋值的默认值：

````js
const [a, b] = [];
// 此时输出的 a = undefined, b = undefined
const [a = 1, b = 2] = []
// 此时输出 a = 1, b = 2
// 只有在当解构赋值的值严格等于(===)undefined时，才会将初始值赋给变量或常量
function fun() {
    console.log('我被执行了');
    return 2;
}
const [a = fun()] = [1];
// 此时 a = 1,且控制台没有输出语句
// 因为解构赋值的初始值是惰性赋值的，即若不被赋初始值，则一句也不执行
````

同理，当对象的属性值严格等于 `undefined` 时，默认值才会生效；

 如果将一个已经声明的变量用于对象的解构赋值：

````js
let x = 2;
// let {x} = {x: 1};	// 报错：let声明的变量不能重新赋值
// {x} = {x: 1}			// uncaught SyntaxError: Unexpected token '='
// 因为不写 let 浏览器会将 {x} 误解成一个块作用域，我们没办法给快作用域赋值
// 因此我们可以将使用以下方法
({x} = {x: 1});
// 这样便可正确赋值
````

**特别地：对象解构赋值可以顺着原型链获取到继承的属性**：

````js
let {x} = {}；
console.log(x);			// undefined
let {toString} = {};
console.log(toString);	// 输出toString方法
````



数组和对象的解构赋值的应用：

````js
// 数组解构赋值的应用场景
// 1. 类数组的解构赋值：arguments 和 NodeList
// arguments
function fun() {
    const [a, b] = arguments;
    console.log(a, b);
}
fun(1, 2);
// NodeList
let [p1, p2, p3] = document.querySelectorAll('p');
console.log(p1, p2, p3);

// 2. 函数参数的解构赋值
const arr1 = [1, 2];
// 一般函数
const add = arr => arr[0] + arr[1];
// 解构赋值参数的函数
const add1 = ([x, y]) => x + y;
console.log(add(arr1));     // 3
console.log(add1(arr1));    // 3

// 3. 交换变量的值
var w = 1, h = 2, temp;
// 一般情况交换 a, b 的值
temp = w;
w = h;
h = temp;
console.log(w, h);      // 2, 1
// 解构赋值交换
var w1 = 1, h1 = 2;
[w1, h1] = [h1, w1];
console.log(w1, h1);    // 2, 1
````

````js

// 对象的解构赋值的应用
// 1. 函数参数的解构赋值
// 一般写法
function personMessage(user) {
    console.log(user.username, user.age)
}
personMessage(person);      // HH 21
// 解构函数写法
const personMessage1 = ({username, age}) => {
    console.log(username, age);
}
personMessage1(person);     // HH 21

// 2. 复杂嵌套
const obj = {
    x: 1,
    y: [2, 3, 4],
    z: {
        W: 5,
        H: 6
    }
}
// 要求获取 3，6 和 y, z
const {
    // y: y,
    // 可简写为
    y,
    y: [,y3],
    // z: z,
    // 可简写为
    z,
    z: {
        H: H
    }
} = obj;
console.log(y, y3, z, H)
````



其他类型的解构赋值：

- 字符串：既可以按照数组的形式解构赋值，也可以按照对象的形式解构赋值

  ````js
  const [a, b] = 'hello';
  console.log(a, b);		// h l
  // 如果是按照数组的形式进行解构，就将字符串看成一个类数组
  const {0: a, 1: b} = 'hello';
  // 如果是按照对象来进行解构那么其属性名就为该字符串的一个索引
  ````

- 数值和布尔值的解构赋值：只可以以对象的形式进行解构赋值，系统会先将数值和布尔值转换为对象，然后进行解构赋值

- `null` 和 `undefined`：无法解构赋值，报错；



### 剩余参数

------

> **概念：在函数的参数为不确定的个数时，我们可以使用 (...剩余参数名) 的形式来表表示有不确定数目的函数的参数**
>
> 特别地：剩余参数是一个数组的形式，即使没有值也是一个空数组

````js
const add = (x, y, z, ...args) => {
    console.log(x, y, args)
}
// 定义剩余参数时要在剩余参数前加(...)，使用剩余参数时不需要加(...)
add(1, 2, 3);			// 1 2 [3]	
add(1, 2, 3, 4);		// 1 2 [3, 4]
````



注意：

1. 在箭头函数使用剩余参数时，即使参数列表中只书写一个剩余参数，都必须书写参数的圆括号；
2. 箭头函数无法使用 `arguments`，但是可以使用剩余参数来获取传入的参数；
3. 剩余参数的位置只能放在所有参数的后面，不能置于中间；



### 扩展运算符（...）

------

> **概念：对象中的扩展运算符（...）用于取出 数组或对象 中所有可便利属性，拷贝到当前 数组或对象中**
>
> 扩展运算符与剩余参数的区别：扩展运算符是将 数组或对象中 的数字展开，而剩余参数是将参数合成一个数组；



用法一：**复制 数组或对象**

```js
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
```

上述方法等价于：

```js
let bar = { a: 1, b: 2 };
let baz = Object.assign({}, bar); // { a: 1, b: 2 }
```

`Object.assign`方法用于对象的合并，将源对象(source)的所有可枚举属性，**复制**到目标对象(target)，此方法第一个参数是目标对象，后面的参数都是源对象。若目标对象与源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性。



这里有点需要注意的是扩展运算符对对象实例的拷贝属于一种**浅拷贝**：

```javascript
let obj1 = { a: 1, b: 2};
let obj2 = { ...obj1, b: '2-edited'};
console.log(obj1); // {a: 1, b: 2}
console.log(obj2); //  {a: 1, b: "2-edited"}
1234
```

**上面这个例子扩展运算符拷贝的对象是*基础数据类型*，因此对`obj2`的修改并不会影响`obj1`**，如果改成这样：

```javascript
let obj1 = { a: 1, b: 2, c: {nickName: 'd'}};
let obj2 = { ...obj1};
obj2.c.nickName = 'd-edited';
console.log(obj1); // {a: 1, b: 2, c: {nickName: 'd-edited'}}
console.log(obj2); // {a: 1, b: 2, c: {nickName: 'd-edited'}}
12345
```

这里可以看到，对`obj2`的修改影响到了被拷贝对象`obj1`，**因为`obj1`中的对象`c`是一个引用数据类型，拷贝的时候拷贝的是对象的引用**。

非对象的展开：如果展开的不是对象则会自动将非对象转换为对象，并将其属性罗列出来；但如果此时对 字符串 进行展开，则会自动将该字符串转换为一个类数组对象后展开；



用法二：**将类数组 (arguments、NodeList) 转化为数组**，以方便使用一些只有数组有的方法



用法三：**数组或者对象之间的合并**



### 迭代器

------

> 遍历器（Iterator）是一种接口，**为各种不同的数据结构提供统一的访问机制**。任何数据结构只要**部署 Iterator 接口，就可以完成遍历操作**（即依次处理该数据结构的所有成员）。

使用 `Iterator` 底层机制两步：

````js
// 1. 使用 Symbol.iterator() 方法将数组 [1, 2] 变为一个可便利对象  
const it = [1, 2][Symbol.iterator]();
// 2. 调用该集合方法
// 可认为该集合有一个指针，value指向的是当前遍历的值，done表示遍历是否完成
console.log(it.next());     // {value: 1, done: false}
console.log(it.next());     // {value: 2, done: false}
console.log(it.next());     // {value: undefined, done: true}
````

由于以上操作过于繁琐，则将Iterator封装成 `for...of... ` 循环：

````js
for (let item of arr) {
    consloe.log(item); 
}
// arr.keys()取得数组索引
for (let key of arr.keys()) {
    console.log(`key：${key}`);
}
// arr.values()获取值
for (let value of arr.values()) {
    console.log(`value：${value}`);
}
// arr.entries()获取索引+值
for (let [key, value] of arr.entries()) {
    console.log(`key：${key}, value：${value}`);
}
````

对于非原生可便利对象添加方法是其变为可便利对象：

````js
const obj = {
    name: 'WW.',
    age: 18,
    sex: 'female'
}
// 给对象添加可便利方法，调用该方法后，对象变为可遍历对象，含有next()方法，而next()方法中会返回 value和done的值
// 因此可以设计为 Symbol.iterator -> next() -> value,done
obj[Symbol.iterator] = () => {
    // 设置一个索引指向对象的一个属性
    let key = 'name';
    return {
        // 返回next()方法，使得对象在调用 Symbol.iterator() 方法后变为可遍历对象含有 next() 方法
        next() {
            // 判断其当前索引指向的对象属性
            if (key === 'name') {
                // 设置索引指向的下一个对象属性
                key = 'age';
                // 因为每次next()执行之后都会返回一个对象，包含该索引所对应的值以及是否遍历完成，因此这里也进行返回
                return {
                    value: 'WW.',
                    done: false
                }
            } else if (key === 'age') {
                key = 'sex';
                return {
                    value: 18,
                    done: false
                }
            } else if (key === 'sex') {
                key = undefined;
                return {
                    value: 'female',
                    done: false
                }
            } else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}
````



- ##### `Iterator` 的作用

  - 为各种数据结构，提供一个统一的、简便的访问接口

  - 使得数据结构的成员能够按某种次序排列

  - ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

    

- ##### `Iterator` 的迭代过程

  - 所有的迭代器对象都会有一个`next`方法，每次调用都会返回一个对象:`{done: boolean, value: any}`。`value`表示当前成员的值，`done`表示是否还有更多的数据。迭代器内部会维护一个指针，指向当前成员的位置，每次调用`next`都会指向下一个成员。

  - ```js
    function creatIterator(arr){
        let index = 0;
        return {
          next: () =>{
            return {
              done: index > arr.length - 1,
              value: this.done ? undefined : arr[index++]
            }
          }
        }
    }
    const iterator = creatIterator([1, 2, 3])
    console.log(a.next())  // { done: false, value: 1 }
    console.log(a.next())  // { done: false, value: 2 }
    console.log(a.next())  // { done: false, value: 3 }
    console.log(a.next())  // { done: true, value: undefined }
    // 之后的调用都会返回相同的内容
    console.log(a.next())  // { done: true, value: undefined }
    ```



- ##### 使用了 `Iterator` 的场合

  - 数组的展开运算符
  - 数组的解构赋值
  - Set 和 Map 的构造函数传参

  

### 箭头函数 ( => )

------

> 箭头函数相当于匿名函数，并简化了函数定义



**箭头函数有两种格式：**

- ```js
  x => x * x
  ```

  上面的箭头函数相当于：

  ```js
  function (x) {
      return x * x;
  }
  ```

  只包含一个表达式，连{ ... }和return都省略掉了，**两者必须同时省略**；

  

- 还有一种可以包含多条语句，这时候就不能省略{ ... }和return：

  ```js
  x => {
      if (x > 0) {
          return x * x;
      }
      else {
          return - x * x;
      }
  }
  ```

  **如果参数不是一个，就需要用括号()括起来：**

  ```js
  // 两个参数:
  (x, y) => x * x + y * y
  
  // 无参数:
  () => 3.14
  
  // 可变参数:
  (x, y, ...rest) => {
      var i, sum = x + y;
      for (i=0; i<rest.length; i++) {
          sum += rest[i];
      }
      return sum;
  }
  ```



如果要返回一个对象，就要注意，如果是单表达式，这么写的话会报错：

```js
// SyntaxError:
x => { foo: x }
```

因为和函数体的{ ... }有语法冲突，所以要改为：

```js
// ok:
x => ({ foo: x })
```



> 箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：
> **箭头函数内部的this是词法作用域，由上下文确定。**
>
> 词法作用域就是定义在词法阶段的作用域。
>
> 换句话说，**词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的**，因此当词法分析器处理代码时会保持作用域不变 。



回顾前面的例子，由于JavaScript函数对this绑定的错误处理，下面的例子无法得到预期结果：

```js
var obj = {
    birth: 1990,
    getAge: function () {
        // 对于函数getAge来说，是对象打点调用的 
        // 所以此时上下文为 1990，this指向1990
        var b = this.birth; // 1990
        // 由于用在fn()中无法通过this.birth获取值
        // 因此我们只能通过备份上下文的方法来获取obj.birth的值
        var that = this;
        var fn = function () {
            // alert(that.birth);      // 1990
        	return new Date().getFullYear() - that.birth; 
            // this指向window或undefined
        };
        // 而对于fn()来说，是直接调用的，此时上下文为window，则this为window
        // 而window中并未定义birth，因此this.birth的值为undefined
        return fn();
    }
};
console.log(obj.getAge());		// NaN
```

现在，箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者obj：

```js
var obj1 = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        // 当使用箭头函数的时候，无论调用方法如何，其this指向的就是当前函数定义时所处环境的作用域
        var fn = () => new Date().getFullYear() - this.birth; 
        // this指向obj对象
        return fn();
    }
};
console.log(obj1.getAge()); 	// 31
```

如果使用箭头函数，以前的那种hack写法，来备份上下文：

```js
var that = this;
```

就不再需要了。

箭头函数不适用场景：

- 构造函数
- 需要this指向调用对象时
- 需要使用 `arguments` 时

由于箭头函数既没有自己的 `this`，也没有 `arguments`，因此这三种情况下无法使用箭头函数；

**注意**：

````js
var a = 10
var obj = {
    a: 20,
    say: () => {
        console.log(this.a)
    }
}
obj.say()			// 10
var anotherobj = { a: 30 }
obj.say.apply(anotherobj)		// 10
````

- 对象并不算是一个块级作用域，在对象中定义的箭头函数，其 this 指向是指向 window 的；
- 通过`call 和 apply` 调用箭头函数没有意义，因为箭头函数没有自己的 `this` 指针，因此在使用上述两方法调用时，第一个参数设置的 this 指向会被忽略；



### 对象字面量的增强

------

> 对象字面量：对象的写法 `const person = {}`

属性的简洁表示法：

````js
// 键名和变量或常量名一样时，可以只写一个属性名
const age = 18;
const person = {
    // age: age
    age
}
console.log(person.age)		// 18
````

方法的简洁表示法：

````js
// 方法可以省略冒号和function关键字
const person = {
    // speak: function () {}
    speak() {}
}
console.log(person);
````

方括号语法：

````js
// 使用prop给person添加一个age属性
const prop = 'age';
// 原始方法
/*
cosnt person = {};
person[porp] = 18;
console.log(person.age);		// 18
*/

// 方括号语法: 现在可以写在对象字面量中，在方括号中可以放任何可以求得值得表达式子
const func = () => 'username';
const person = {
    [prop]: 18,
    [func()]: 'HH'
}
console.log(person.age);			// 18
console.log(person.username);			// HH
````

相较于点语法，方括号语法的功能更加全面，而点语法就相当于方括号语法的特殊形式；

当属性名由数字、字母、下划线以及$构成，且数字还不能打头时 (即合法标识符时)，使用点语法会更为便捷；



### 函数参数的默认值

------

> 当不传参数，或者明确传递函数参数为 `undefined` 时，函数参数的默认值生效；
>
> 如果默认值是表达式，默认值表达式是惰性求值；

````js
// 一般写法
const multiply = (x, y) => {
	if (y == undefined) {
        y = 1;
        
    }
    return x * y;
}0
// 默认值写法
const multiply = (x, y = 1) => x * y;
````

tips：函数参数的默认值最好从参数列表的右边开始设置；





### Set 和 Map

------

> `Set` ：是一系列**无序的，没有重复值**的数据集合；
>
> 使用 `const s = new Set()` 实例化，与数组有点相像，但没有下标表示每一个值；

`Set` 方法：

- `add()`：给 set 添加数据，可以连缀着写；

- `has(num)`：检查  `set` 中是否含有 `num`，返回布尔值；

- `delete(num)`：删除 `set` 中的 `num`，若没有 `num` 也不报错；

- `clear()`：清除 `set` 中所有数字；

- `forEach(function(value, key, set) {}, document);`：遍历顺序为成员添加进集合的顺序；

  `forEach` 的第一个参数为回调函数：

  - 其中 `value` 表示 `set` 中的值，由于 `set` 是无序的，因此 `key = vaule`；
  - 第三个参数 `set` 就是调用`forEach()`方法的 `set` 本身；

  `forEach` 的第二个参数为回调函数的 `this` 指向

`set` 属性：

- `size`：等同于数组的 `length`，用于获取数组的长度；

  

创建 `Set` 时，其构造函数的参数：数组、类数组 (arguments, NodeList)、另一个set集合；

`Set` 的注意事项：

- `Set` 判断重复的方式：严格相等 (`===`)

  特别地，NaN 在 Set中是自等的；

- 使用 Set 的时期：

  1. 数组或者字符串去重；

  2. 不需要通过下标访问，而只需要遍历时；

  3. 需要 Set 提供的方法和属性时；

     

>`Map` ：与对象相似，是键值对的集合；
>
>使用 `const m = new Map()` 实例化

`Map` 和 `对象` 的区别：

字符串一般使用字符串当作键，`Map` 可、以使用任何数据类型当作键；

`Map` 的方法：

- `set('键', '值')`：给 `Map` 添加数据，可以连缀着写，如果键已经存在，后添加的键值覆盖之前已有的；

- `get(键)`：获取 `Map` 中某个键的值，键为什么类型就在括号里添加什么类型，不是字符串就不需要用单引号包裹；

- `has(键)`：查找 `Map` 中是否含有某个键；

- `delete(键)`：删除某个键，删除不存在的键，不会报错；

- `clear()`：清除 `Map`;

- `forEach(function (value, key, map) {}, this)`：遍历顺序为成员添加进集合的顺序；

  `forEach` 的第一个参数为回调函数：

  - `value` 表示键名对应的值；
  - `key` 表示键名对应的；
  - q第三个参数就是`Map`本身；

  `forEach` 的第二个参数为回调函数的 `this` 指向；

`set` 属性：

- `size`：等同于数组的 `length`，用于获取数组的长度；



创建 `Map` 时，其构造函数的参数：二维数组 (必须体现出键和值)、另一个 `Set\Map` 集合；

使用 `Map` 的时期：

- 只需要单纯的 键值对 结构，或者需要字符串以外的类型做键；



### ES6 新增方法

------

- 字符串新增方方法

  - `includes()` 判断字符串中是否含有某些字符

    第一个参数：表示需要查找的字符

    第二个参数：表示开始搜素字符串的位置

    实际开发中的**运用**：url的改变

  - `padStart() 和 padEnd()` 补全字符串

    第一个参数：表示期望长度

    第二个参数：表示补全长度使用的字符串，若此参数为空，则默认使用空格补全

    **注意**：当原字符串大于最大长度，不会消减原字符串，而直接返回原字符串 

    实际开发中的**运用**：显示日期的格式，位数不够自动补零

  - `trimStart() / trimLeft()`  和 `trimEnd() / trimRight()` 和 `trim()` 清除首尾空格

    实际开发中的**运用**：表单提交 验证

    

- 数组的新增方法

  - `includes()` 判断数组中是否含有某些项

    注意：

    ````js 
    let arr = [2， 4， 9]；
    console.log(arr.includes('9'));			// false
    console.log(arr.includes(9));			// true
    ````

    由上可知，`includes()` 方法是按照 **全等 (===)** 严格判断的，其中特别提出 **NaN 在 `includes()` 判断中，是相等的**；

    

  - `reduce()` 对数组中的项做运算操作，参数应为一个回调函数

    ````js
    const arr1 = [1, 2, 3, 4, 5];
    const reducer = (accumulator, currentValue) => {
        return accumulator * currentValue; 
    }
    console.log(arr1.reduce(reducer));		// 120
    ````

    该方法的回调函数可以接收四个参数：

    1. 每次计算返回的值 `Accumulator (acc)`
    2. 当前遍历到的值 `Current Value (cur)`
    3. 当前遍历到的索引 `Current Index (idx)`
    4. 当前遍历数组 `Source Array (src)`

    特别的，该方法只会进行 `arr.length - 1` 次循环，直接将第二个数与第一个数做操作，然后次序向后遍历；

    另外，该方法可以接受第二个参数 `initialValue`，

    - 如果没有提供 initialValue，那么第一次调用 `callback` 函数时，accumulator 使用原数组中的第一个元素，currentValue 即是数组中的第二个元素。 在没有初始值的空数组上调用 reduce 将报错。
    - 如果提供了 initialValue，那么将作为第一次调用 `callback` 函数时的第一个参数的值，即 accumulator，currentValue 使用原数组中的第一个元素。

    若提供了第二个参数，则回循环 `arr.length` 次；

    

  - `filter()` 过滤数组中不想要的选项，返回符合条件的选项，并构造一个新数组

    ````js
    const arr = [3, 5, 1, 7, 0, -1, 9, 2];
    const newArr = arr.filter((ele, index, arr) => {
        console.log(ele, index, arr);
        if (ele > 5) {
            return ele;
        }
    }, thisArg)
    ````

    该方法接收两个参数：

    - 回调函数

      1. `ele`：当前遍历到的元素
      2. `index`：当前遍历元素的索引
      3. `arr`：便利的数组

    - `this` 指向

      

  - `map()` 遍历数组或类数组，并对其中的项做一些操作(不止可以做计算)

    ````js
    // 数组调用
    let kvArray = [{key: 1, value: 10}, 
                   {key: 2, value: 20}, 
                   {key: 3, value: 30}]
    
    let reformattedArray = kvArray.map(obj => {
       let rObj = {}
       rObj[obj.key] = obj.value
       return rObj
    })
    // reformattedArray = [{1: 10}, {2: 20}, {3: 30}], 
    
    // 类数组调用
    let map = Array.prototype.map
    let a = map.call('Hello World', function(x) { 
      return x.charCodeAt(0)
    })
    // a = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
    ````

    可传参数与 `filter` 相同；

    

  - `Array.from()` 将其他可便利对象转换为数组

    若为不可便利的数组调用此方法，则返回一个空数组；

    特殊地，如果一个对象**为不可便利对象，但其含有 `length` 属性**，也可以使用该方法：

    ````js
    let obj = {
        length: 4,
        1: 'HH.',
        2: 'WW.',
        date: 9999,
        4: 'yeah'
    }
    console.log(Array.from(obj));		// [undefined, 'HH.', 'WW.', undefined]
    ````

    由上可知，该对象虽然被转为了数组，但只有**属性名有下标指向的才可以被转化为数组中具体的项，且超过长度的项会被省略**；

    该方法一般用于：对某可便利对象进行一些操作，然后存入一个新数组中，省去了遍历的麻烦；

    

  - `find() 和 findIndex()` 在数组中查找满足某一条件的第一个数，并且返回其本身 或 其索引，可遍历属性才可调用该方法

    第一个参数：`callback(element, index, arr)` 函数；

    ​						三个参数类似forEach的参数：

    ​						element：当前遍历的值；

    ​						index：当前 element 在数组中的索引；

    ​						arr：当前调用 `find() / findIndex()` 方法的数组；

    第二个参数：this 指向，这里特别注意，若回调函数使用了箭头函数的写法，则无论 this 指向如何设置，都不会改变；

  

  

  问题：为什么有些方法可以通过实例调用，有些方法只能通过构造函数调用，实例不应该继承了构造函数的方法吗；

  **实例方法就类似class中直接设置的方法，可以被每创建一个实例，则会创建属于自己的方法，而构造函数的方法类似于class中的静态方法 `static` 是不会被继承的**

  

- 对象的新增方法 

  - Object.assign(目标对象， 源对象)

    基本数据类型作为源对象，会先转换为对象，再并入目标对象中；

    ````js
    // 与展开运算符的区别就是
    let apple = {
        name: 'apple',
        color: 'red',
        use: 'eat',
        date: '2021-01-04'
    }
    let pen = {
        name: 'pen',
        color: 'black',
        use: 'write'
    }
    let newObj = { ...apple, ...pen }
    console.log(newObj === apple)        // false
    let assignObj = Object.assign(apple, pen);
    console.log(assignObj === apple);   // true
    ````
  
    即展开运算符是直接创建一个新对象，而该方法是直接修改目标对象；
  
    在源对象和目标对象中若存在同名属性：无论是什么数据类型，都是源对象覆盖目标对象；
  
  - Object.keys() 、Object.values() 、Object.entries()
  
    与数组方法不同点：
  
    1. 对象是构造函数方法，数组是实例方法
  
    通过三个方法使用 for...of...
  
    注意：但其不保证顺序
  
  

### Promise 异步函数

------

>`Promise` 是异步操作的解决方案，一般用来**解决层层嵌套** (回调地狱 callback hell)  的回调函数；

````js
// 例题：小盒子的移动
````



使用 Promise (实例化 `Promise` 构造函数)：

````js
const p = new Promise((resolve, reject) => {
    // 1.resolve();   // pending -> fullfilled
    // 2.reject();	 // pending -> rejected
    /*
       3.
       resolve();
       reject();
       // pending -> fullfilled
    */
    // 这里的 reject() 常传参为 reject(new Error())，表示错误原因
});
````

注意：一定要传回调函数作为参数，否则报错；



`Promise` 的三 个状态：

- `pending`：初始态，刚刚初始化的 `Promise` 为这个状态，认为是未完成 或 等待态；
- `fullfilled / resolved`：成功态，执行 `resolve()` 变为此状态，认为是已成功；

- `rejected`：失败态，执行 `reject()` 变为此状态，认为是已失败；

这里值得一提的是上文中的第三种情况：先调用 `resolve()` 后调用 `reject()` ，那么最终态就是 `fullfilled` ，因为 **Promise 的状态一旦变化就不会再改变**;



`then()` 方法： 

````js
p.then(
    (resolve) => {
    	// 当执行 resolve() 执行该函数中的语句
	},
    (reject) => {
        // 当执行 reject() 执行该函数中的语句
    }
);
````

同时，then() 方法中可以接收 `resolve() 和 reject()` 中传的参数；

由上可知：

- `pending -> fullfilled` 时，执行 `then` 的第一个回调函数；

- `pending -> rejected` 时，执行 `then` 的第二个回调函数；

且在 **`then` 执行后返回一个新的 `Promise` 对象**；

````js
const p = new Promise((resolve, reject) => {
    reject();
});
const p2 = p.then();
console.log(p2 === p);		// false
p.then(
	() => {
        console.log(sucess1);
    },
    () => {
        console.log(err1);
        return;
        // 	等同于return undefined；
        /*
            等同于: 
            return new Promise((resolve) => {
            	resolve(undefined);
            });
        */
    }
).then(
		() => {
        console.log(sucess2);
    },
    () => {
        console.log(err2);
    }
);
// 控制台输出 err1 sucess2
````

由上可知，`p.then()` 返回的 `Promise` 对象的状态与 `p` 对象的状态无关，该 新 `Promise` 对象其实是在执行了回调函数的语句后，`return` 语句是以创建一个 `Promise` 对象的方式执行的，且默认在该 `Promise` 中会执行 `resolve()`，而 `return` 的内容就是 `resolve` 的参数；



`catch()` 方法：

一般情况下，`then()` 方法被用来处理 `resolve()` 的状态，而当出现异常时我们一般不去调用 `then()` 方法的第二个回调函数，而是使用 `catch()` 处理出现的异常；

````js
const p = new Promise((resolve, reject) => {
    reject('reason');
});
p.then(
    data => {
        console.log(data);
  	}
).catch(
	err => {
        console.log(err);
    }
);
````

如果一个异常没有被捕获，那么他将会一直向下传递直至被捕获为止；

其实 `catch()` 算是一种特殊的 `then()`：

````js
catch(err => {});
// 等同于
then(null, err => {});
// 由上可知，每次then执行完毕后都会返回一个默认成功状态的 Promise
// 我们可以通过 return 的方式将 Promise 改为默认错误的
// 但是同时也可以使用简写方法
then(data => {
    // programming
    throw new Error('reason');
});
````



`finally()` 方法：

表达一个 `Promise` 的状态，若变化则会调用该方法，不变则不调用； 



`Promise.resolve() / Promise.rejecte()` ：

````js
Promise.resolve('HH');
// 等同于
new Promise((resolve) => {
    resolve('HH');
});

Promise.reject('WW');
// 等同于
new Promise((resolve, reject) => {
    reject('WW');
});
````

换而言之，以上两种方法类似于构造函数 `Promise` 的简写形式；

参数：

- `Promise.resolve()` 的三种形式：

  1. 一般参数：原封不动的向后传递；

  2. 一个 `Promise` 对象作为参数：

     ````js
     const p1 = new Promise(() => {
         setTimeout(console.log, 2000, 'OK');
         // 该写法形同
         // setTimeout(() => {
         //     console.log('OK');
         // }, 2000)
     });
     Promise.resolve(p1).then(() => {
         console.log('end');
     });
     // 2s后输出OK，但不输出end
     // 因为以上的写法就等同于
     p1.then();
     ````

     因此可知，当 Promise 作为参数传入时，等同于 0参数Promise 直接调用 `then()`;

  3. 当一个含有 `then()` 方法的对象传入时：

     ````js
     const obj = {
         then() {
             console.log('ending');
         }
     }
     Promise.resolve(obj).then(() => {
         console.log('then');
     });
     // 输出 ending
     ````

     

  `Promise.all()`：

  同时监听多个 `Promise` 对象的状态



### await 和 async

------

>ES7 新语法，async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成；
>
>await 只能出现在 async 声明的函数中，两者结合目的是为了彻底消灭编码中的回调函数，实现异步调用"扁平化"；

async 会将一个普通函数的返回值改造为一个 `Promise` 对象，普通函数 `retrun` 的值作为 `Promise.resolve()` 的参数，因此应该使用 `.then().catch()` 来处理该对象；

await 关键字写在一个异步函数前，等待的是一个的返回值，`await` 像是一个**运算符**，用于组成表达式，该表达式的**运算结果**取决于 `await` 等到的返回值：

- 若等到的不是一个 `Promise` 对象，则运算结果就是返回值自身；

- 反之则会**阻塞**后面的代码，等待 `Promise` 对象 `resolve`，`resolve` 的值作为 `await` 表达式的运算结果；

  但是，若将 `await` 书写在由 `async` 声明的函数中，则不会发生阻塞，因为 `async` 函数内部搜有的阻塞都会被封装在 `Promise` 对象中异步执行；

````js
// 实现目标
function takeLongTime(n) {
    // 返回一个Promise对象
    return new Promise(resolve => {
        // n秒后，定时器触发回调函数 resolve()
        // 并返回一个新的成功态Promise对象，参数为 n+1000
        setTimeout(() => {resolve(n + 1000)}, n)
    })
}

const step1 = (n) => {
    console.log(`step1 with ${n}`);
    // 每执行一步返回一个新Promise对象
    return takeLongTime(n);
}
const step2 = (n) => {
    console.log(`step2 with ${n}`);
    // 每执行一步返回一个新Promise对象
    return takeLongTime(n);
}
const step3 = (n) => {
    console.log(`step3 with ${n}`);
    // 每执行一步返回一个新Promise对象
    return takeLongTime(n);
}

// Promise写法：
function doIt() {
    step1(1000)
        .then((time2) => step2(time2))
        .then((time3) => step3(time3));
}
doIt();

// await写法
async function asyncDoIt() {
    // 这样使的代码看起来像是同步编程，完全解决了回调问题
    const time2 = await step1(1000);
    const time3 = await step2(time2);
    const res = await step3(time3);
}
asyncDoIt();
````



因为 `await` 只会接收到 `Promise resolve` 的结果，无法接收错误，因此可以选择以下几种处理错误的方式：  

- `try...catch`(推荐)：将 `await` 语句放在 `try` 中，对错误的处理放在 `catch` 中，并且 `catch` 接收一个参数 `err`，表示错误原因，但是此方法的缺陷是会捕获一些不会被 `Promise` 捕获的错误，但当这个错误是由 `catch` 而不是由 js 本身打印出来时，其中一个调用者吞噬了错误，就非常难找到；
- 让函数返回两个值：`[err, user] = await to(UserModel.findById(1))`
- `.catch` 继续接收：但是此方法错误路径先于正常路径，非常不直观；



### Class类

------

>两个或多个对象的结构功能类似，可以抽象出一个模板，依照模板复制出多个相似的对象。通过类来创建对象，使得不必写重复代码达到代码复用的目的。

````js
class Person {
    // 实例属性设置方法一：
    // 可看作给类属性设置了默认值
    // 但若于constructor中需要赋值的变量重复则无论传不传参都会被覆盖
    name = 'WW';
    age = 0;
	sex = 'male';

    // 在constructor中定义属性相当于将属性定义在了本身中
    constructor(name, age, sex) {
        // 实例属性设置方法二：
        this.name = name;
         this.age = age;
        this.sex = sex;
    }
    // 在类本身定义方法其实相当于在其原型链上定义属性
    hello() {
        console.log(`hello, my name is ${this.name}`);
    }
    // 以上两种定义形式也符合构造函数构造一个对象的要求
}
const H = new Person('HH.', 18, 'male');
H.hello();      // hello, my name is HH
````

创建方法类似构造函数，类本质上也是一个函数：

````js
typeof class == "function"		// true
````



**静态方法和静态属性**：通过类方法调用 `Person.hello()`

静态方法中的this指向类本身，不可以被实例调用，与之相反，实例方法中的this指向实例；

````js
// 方法一：class内部添加
static hello() {
    console.log('我是Person的hello');
}
// 方法二：class外部添加
Person.hello = () => {
    console.log('我是Person的hello');
}
````

静态属性设置时，一般使用静态方法设置



**私有属性和方法**：

1. 下划线开头表示私有
2. 将私有的属性和方法移除类



类继承：`extends` 复制子类的方法，并拓展自己的功能，达到代码复用的效果；



