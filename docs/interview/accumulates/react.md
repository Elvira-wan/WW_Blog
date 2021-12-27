
# React

----

- 组件化的理解以及如何去构建一个组件

- `react diff` 算法

  > 计算出 `VDOM` 中真正变化的部分，并只针对该部分对原生 `DOM` 进行操作，而非重新渲染整个页面；
  >
  > 
  >
  > 传统的 `DOM` 算法，是通过循环递归对节点进行依次对比，时间复杂度达到 `O(n^3)`，这样会导致页面更新的十分慢，影响用户体验，因此对 `diff` 算法进行以下三方面的改进：
  >
  > - `tree diff`：
  >
  >   `Web UI` 中 `DOM` 节点**跨层级移动操作较少，可忽略不计**；
  >
  > - `component diff`：
  >
  >   拥有相同类的两个组件，生成相似的树形结构；
  >
  >   拥有不同类的两个组件，生成不同的树形结构；
  >
  > - `element diff`：
  >
  >   对于**同一层级**的一组子节点，通过为一的 `id` 进行区分；
  >
  > 针对以上三方面，`diff` 算法只会对同一层次的节点进行比较，若某节点不存在时，会对该节点及其子节点进行完全删除，不会进行进一步比较，且只需遍历一次就能完成整颗 `DOM` 树的比较，若出现跨层级的操作，只能创建节点和删除节点的操作；

  

- 虚拟DOM的优点

- `React Hooks` 的优缺点

  优点：

  1. 更容易复用代码
  2. 清爽的代码且风格代码量少

  缺点：

  1. 响应式的`useEffect`
  2. 状态不同步

  

- React中的 `setState` 什么时候是同步的,什么时候是异步的

  >在React中，**如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state** 。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。
  >
  >**原因：** 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，**有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state**。
  >
  >**注意：** setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

- React 中的单向数据流和双向数据绑定

  > react的单向数据流实际上就是指父组件通过 `props` 传递 `state` 给子组件，而子组件获取父组件状态之后，是只读的，并不能通过任何操作来改变该值在父组件中的值，除非在父组件中定义操作该 `state` 的方法，并且通过 `prop` 一同传递给子组件供子组件调用，这样降低了组件之间的耦合程度，避免在其他组件中修改自身组件的数据而造成的混乱；

  > react的双向数据绑定：
  >
  > 双向数据绑定是指，视图会根据数据模型来进行一个动态显示，放在react中就是指 `state` 数据会驱动页面的显示，最常用的，填写表单中获取的数据，就是一种双向数据绑定，vue中有 `v-modal` 指令实现双向数据绑定，但是react中没有类似指令，所以就通过 onChange 事件监听元素的改变，再通过 `this.setState` 实现更新状态中数据；

- 组件间的几种通信方式

  父传子：`props`；

  子传父：

  - `props`：

    ````jsx
    class Child extends React.Component{
        data =  '我是子组件中的data'
        render(){
            this.props.getChildData(this.data);
            return <div>我是Child组件</div>
        }
    }
    class Parent extends React.Component{
        childData=null
        getChildData = (data)=>{
            this.childData = data;
            console.log(data);
        }
        render(){
            return <Child getChildData = { this.getChildData }  />
        }
    }
    ````

    此时 `Parent` 组件中的 `childData` 为 `我是子组件中的data`，其实这并不违反 react 的单项数据流，这也是将 父组件的属性作为 `props` 传递下去，只是该属性是一个函数，子组件取到该方法后，将数据作为参数传入该方法中，而父组件通过形参接收子组件数据；

  - `refs`：

    > 类似 html 标签中的 id，使用在一般 dom 中，可获取该 dom实例 的数据;
    >
    > 使用在子组件中，可获取子组件实例中的所有数据；
    >
    > 但是该方法需要谨慎使用；

  同级无嵌套关系：

  - 通过第三方媒介方式
    1. 通过缓存：组件A把数据存到缓存中，组件B就可以从中取出;
    2. 通过url：通过location对象拿到…；
    3. 通过与后端配合：组件A把数据扔到接口里去，组件B可以从中拿到…；
    4. redux，react-redux；
  - `context`
  - 发布订阅机制

  
