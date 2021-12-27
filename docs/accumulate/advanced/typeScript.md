---
sidebarDepth: 2
---

# TypeScript

-------

> 核心：对所具有的结构进行类型检查
>
> 安装：`npm install -g typescript`
>
> 编译为 .js 文件：`tsc greeter.ts`



### 类型注解

>为函数或变量添加约束的方式

````ts
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
````

- `: string`：表示参数只能接收 `string` 类型，此时传入的 `user` 是数组类型的，则报错 `Argument of type 'number[]' is not assignable to parameter of type 'string'.`；

- `Expected 0 arguments, but got 1.`：表示参数个数并不是期望的数量

- 定义数组：`:元素类型[] / Array<元素类型>`

- 元祖类型：允许表示一个一直元素数量和类型的数组，各元素的类型不必相同，若访问数组中一个越界的元素，会使用联合类型代替：

  ````ts
  // Declare a tuple type
  let x: [string, number];
  // Initialize it
  x = ['hello', 10]; // OK
  // Initialize it incorrectly
  x = [10, 'hello']; // Error
  ````

- 枚举类型：`enum` 是对标准数据类型的补充，可以为一组数值赋名：

  ````ts
  // 可手动或自动赋值
  enum Color {Red = 1, Green, Blue}
  let colorName: string = Color[2];
  
  console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
  ````

- `Any`：为在编编程阶段不清楚类型的变量指定类型，则使用`Any`标记：

  ````ts
  let notSure: any = 4;
  notSure = "maybe a string instead";
  notSure = false; // okay, definitely a boolean
  ````

- `Void`：`void` 与 `any` 相反，未表示任何类型，当一个函数没有返回值，通常起返回值类型为 `void`，若想为一个变量定义为 `void` 类型，则之能为妻赋值为 `undefined/null`：

  ````ts
  function warnUser(): void {
      console.log("This is my warning message");
  }
  ````

- `null/undefined`：是所有类型的字类型，因此一般不用特别定义这两种类型；

- `Never`：表示永不存在的值的类型，如抛出异常或根本不会有返回值的函数：

  ````ts
  // 返回never的函数必须存在无法达到的终点
  function error(message: string): never {
      throw new Error(message);
  }
  
  // 推断的返回值类型为never
  function fail() {
      return error("Something failed");
  }
  
  // 返回never的函数必须存在无法达到的终点
  function infiniteLoop(): never {
      while (true) {
      }
  }
  ````

但需要注意的是尽管报错，还是会编译成对应的 js文件，TS警告⚠️是提示代码可能不会按预期执行；



### 类型断言

> 类似于类型转换

````ts
// 写法1⃣️：尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// 写法2⃣️：as语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
````



### 接口

> 使用来描述一个拥有某些特定属性的对象

````ts
// Person就是一个接口
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
````

- 可选属性：`color?: string` 对可能存在的属性进行预定义；

  但是使用此属性后，书写其他的任何未定义的属性，都会报错 `error: 'colour' not expected in type 'SquareConfig'`，绕开检查的方式如下：

  1. 类型断言：`let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)`

  2. 字符串索引签名(最佳)：前提是能过确定该对象可能固有某些未作为特殊用途使用的额外属，如 `SquareConfig` 除了带有 `color` 和 `width` 属性之外，还会带有任意数量的其他属性，则可以如下定义：

     ````ts
     interface SquareConfig {
         color?: string;
         width?: number;
         [propName: string]: any;
     }
     ````

  3. 将对象赋值给另一个变量：

     ````ts
     let squareOptions = { colour: "red", width: 100 };
     let mySquare = createSquare(squareOptions);
     ````

     

- 只读属性：`readonly color: string` 只能在对象创建时修改该属性的值，此外有 `ReadonlyArray<type>` 类型，定义数组创建后不可再修改；

- 定义函数类型

  ````ts
  // 定义接口
  interface SearchFunc {
    // 括号内为传入参数，括号外为返回值
    (source: string, subString: string): boolean;
  }
  
  // 使用接口
  let mySearch: SearchFunc;
  // 注意，函数的参数名并不需要与接口中定义的名字相匹配
  mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
  }
  ````

- 可索引类型

  ````ts
  interface StringArray {
    [index: number]: string;
  }
  
  let myArray: StringArray;
  myArray = ["Bob", "Fred"];
  
  let myStr: string = myArray[0];
  ````

  仅支持两种索引签名：字符串 和 数字，可以在字段前加上 `readonly` 表示只读；

- 类类型

  ````ts
  // 实现接口
  interface ClockInterface {
      currentTime: Date;
  }
  
  class Clock implements ClockInterface {
      currentTime: Date;
      constructor(h: number, m: number) { }
  }
  ````

  接口只描述了类的公共部分，而不是公共和私有两部分，因此并不会检查私有成员；

  

  **类静态部分与实例部分区别**

  ````ts
  interface ClockConstructor {
      new (hour: number, minute: number);
  }
  
  class Clock implements ClockConstructor {
      currentTime: Date;
      constructor(h: number, m: number) { }
  }
  ````

  且当试图使用构造器签名定义并实现一个接口时会得到一个错误：

  ![image-20211213104419936](/Users/user/Library/Application Support/typora-user-images/image-20211213104419936.png)

  因为当一个类实现了一个接口时，**只对其实例部分进行类型检查**。 constructor存在于类的静态部分，所以不在检查的范围内。因此应该直接操作里的静态部分：

  ````ts
  // 为构造函数所用
  interface ClockConstructor {
      new (hour: number, minute: number): ClockInterface;
  }
  // 为实例方法所用
  interface ClockInterface {
      tick();
  }
  // 构造函数
  function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    	// 此时ClockInterface检查的是return的对象中是否含有tick()
      return new ctor(hour, minute);
  }
  
  // 实现接口
  class DigitalClock implements ClockInterface {
      constructor(h: number, m: number) { }
      tick() {
          console.log("beep beep");
      }
  }
  
  let digital = createClock(DigitalClock, 12, 17);
  ````

- 继承接口

  > 可以从一个接口里复制成员到另一个接口里，以便于更灵活的将接口分割到可重用模块中；

  ````ts
  interface Shape {
      color: string;
  }
  
  interface PenStroke {
      penWidth: number;
  }
  // 继承多个接口使用逗号分隔
  interface Square extends Shape, PenStroke {
      sideLength: number;
  }
  
  let square = <Square>{};
  square.color = "blue";
  square.sideLength = 10;
  square.penWidth = 5.0;
  ````

- 接口继承类

  > 当接口继承了一个类类型是会继承类的成员，但不包括其实现，就类似接口声明了类中存在的成员，但并没有提供具体实现一样，接口同样会继承类的 `private and protected` 成员；
  >
  > 当创建了一个接口继承了一个拥有 `private/protected` 的成员的类时，这个接口类型只能被这个类或其子类所实现；

  ````ts
  class Control {
      private state: any;
  }
  
  interface SelectableControl extends Control {
      select(): void;
  }
  
  // Button为Control子类，继承了私有属性，因此可以实现接口
  class Button extends Control implements SelectableControl {
      select() { }
  }
  // 错误：“Image”类型缺少“state”属性。
  class Image implements SelectableControl {
      select() { }
  }
  ````

  

### 类

> 带有一个抽象函数和一些公共字段

````ts
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
````

- 类继承

  ````ts
  class Animal {
      name: string;
      constructor(theName: string) { this.name = theName; }
      move(distanceInMeters: number = 0) {
          console.log(`${this.name} moved ${distanceInMeters}m.`);
      }
  }
  
  class Horse extends Animal {
    	// 派生类包含了自己的构造函数
      // 因此必须调用super(),并写在构造函数最前面的位置
      constructor(name: string) { super(name); }
      move(distanceInMeters = 45) {
          console.log("Galloping...");
          super.move(distanceInMeters);
      }
  }
  
  let tom: Animal = new Horse("Tommy the Palomino");
  
  tom.move(34);
  ````

- 抽象类

  > 作为其他派生类的基类使用，一般不会被直接实例化，不同于接口，抽象类可以包含成员的实现细节，`abstract` 关键字时用于定义抽象类和在抽象类内部定义的抽象方法；

  ````ts
  abstract class Animal {
      abstract makeSound(): void;
      move(): void {
          console.log('roaming the earch...');
      }
  }
  ````

  抽象方法不包含具体实现且**必须在派生类中实现**，与接口定义方法类似，两者都是定义方法签名，但不包含方法体；



### 泛型

> 创建组件不仅要能够支持当前的数据类型，也要能支持未来的数据类型，那么可以使用泛型来创建可重用组件，让一个组件可支持多种数据类型；

````ts
function identity(arg: any): any {
    return arg;
}
````

使用`any`类型会导致这个函数可以接收任何类型的`arg`参数，这样就丢失了一些信息：传入的类型与返回的类型应该是相同的。如果我们传入一个数字，我们只知道任何类型的值都有可能被返回。

因此，我们需要一种方法**使返回值的类型与传入参数的类型是相同的**。 这里，我们使用了 *类型变量*，它是一种特殊的变量，只用于表示类型而不是值。

````ts
function identity<T>(arg: T): T {
  	// 由于T是一个泛型，且若传入Number属性参数并没有length属性，因此会报错
  	console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}

// 若确定定义为一个数组则可以写为
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
````

**`<T>`** 用来捕获用户传入的类型，此时我们可以明确，参数的类型和返回值是一致的，这允许我们跟踪函数里使用的类型的信息；



### 模块

> 正常导入导出方法与 JS 相同；
>
> 为了支持 `CommonJS and AMD` 的 `exports`，TypeScript提供了 `export = ` 语法，且对应的必须使用 `import <module-name> = require("path")` 来导入对应模块；



