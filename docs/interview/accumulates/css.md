
# css

-------

- CSS选择器的类型和权重

  1. id选择器
  2. className选择器，属性选择器，伪类选择器；
  3. 标签选择器，伪元素选择器；
  4. 后代选择器，子选择器，兄弟选择器；

  优先级排序：**!important > 行内样式>ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性**

  

- CSS渲染的详细过程？

- 哪些css属性会导致重排？

- translate 3d 和 flex 在渲染上有什么不同的地方？

- flex:1 是什么意思？

  

- 垂直居中和水平居中的几种方式

- `position` 的属性

- BCF

- CSS盒模型

  > 常见的 div、a、span都是盒模型，但表单元素，图片这些自闭合标签，不能算做盒模型；
  >
  > 盒模型主要区域：`width、height、padding、border、margin`；
  >
  > `真实占有宽度 = 左border + 左padding + width + 右padding + 右border`
  >
  > 在标准的盒模型中，`width` 就是 `content` 的宽度；
  >
  > 在 IE 盒模型中，`width` 是 `content + padding + border`
  >
  > 可使用 `box-sizing` 来设置盒子遵循的模型：`border-box(IE盒模型)、content-box(标准盒模型, 默认值)`

- flex布局

  >传统的布局方案，以来 `display` 属性 + `position` 属性 + `float` 属性来实现，但是书写起来比较麻烦，对于特殊的布局也不方便，因此提出 flex 布局；
  >
  >一般情况下，我们给父盒子设置 `flex`，也就是将其作为 `flex` 容器，该容器中的每一个子元素都作为 `flex item`；
  >
  >
  >
  >父盒子 (flex 容器)：
  >
  >该容器含有两个轴：水平的主轴 (main start) 和 垂直的交叉轴 (cross start)；
  >
  >其含有六个属性：
  >
  >- flex-direction (item排列方向)：`row | row-reverse | column | column-reverse`
  >
  >- flex-wrap (换行问题)：`nowrap | wrap | wrap-reverse`
  >
  >- flex-flow (上两者的简写)：`<flex-direction> || <flex-wrap>`
  >
  >- justify-content (主轴对齐方式)：`flex-start | flex-end | center | space-between(两端对齐，项目之间间隔相等) | space-around(项目两侧间隔相等)`
  >
  >- align-items (交叉轴上对齐方式)：`flex-start | flex-end | center | baseline | stretch`
  >
  >- align-content (多根轴线对齐方式)：`flex-start | flex-end | center | space-between | space-around | stretch`
  >
  >
  >
  >子盒子 (item 属性)：
  >
  >六个属性：
  >
  >- order (item排列方式)：`数值`
  >- flex-grow (默认放大比例)：`默认0, 表默认不放大`
  >- flex-shrink (默认缩小比例)：`默认1, 表默认缩小`
  >- flex-basis (分配多余空间前，项目占据的主轴空间)：`默认为auto`
  >- flex (前三者的简写)：`0 1 auto | 1 1 auto(auto) | 0 0 auto(none)`
  >- align-self (单个项目有不同的对齐方式)：`auto | flex-start | flex-end | center | baseline | stretch`

- `grid` 布局

  >采用网格布局的区域称为**容器(`container`)**，容器内部采用网格定位的子元素，称为**项目(`item`)**；
  >
  >````html
  ><div>
  ><div><p>1</p></div>
  ><div><p>2</p></div>
  ><div><p>3</p></div>
  ></div>
  >````
  >
  >上述代码中，最外层的 `div` 就是容器，内层的三个 `div` 就是项目；
  >
  >**注意**：项目只能是容器顶层的子元素，不包含项目的子元素，比如上面的 `p` 元素就不是项目，`grid` 布局只对项目生效；
  >
  >
  >
  >在 容器中 水平的统称为行，竖直的统称为列，行和列的交叉区域称为单元格，n行和m列会产生 m x n个单元格；
  >
  >划分网格的线，被称为网格线水平网格划分出行，垂直网格划分为列，grid容器也分为容器属性和项目属性两类；
  >
  >
  >
  >容器(contain)：
  >
  >设置了 `display: grid/inline-grid` 的盒子称为容器；
  >
  >- `grid-template-columns/grid-template-rows`：定义每一列的列宽/行高(可以使用百分比 或者 px 或 `repeat(3, 33.3%)` 或 auto-fill 或 fr 或 auto 或 maxmin(min, max) )
  >- `row-gap/column-gap/gap`：定义 行/列 之间的间隔 (px)
  >- `grid-template-areas`：网格布局允许指定区域，一个区域由单个或多个单元格组成，区域的命名会影响网格线，每个区域的 起始/结束 网格线会自动命名为 `区域名-start/区域名-end`
  >- `grid-auto-flow`：定义项目的排列顺序，先行后列/先列后行/某些项目位置指定后剩下的项目自动放置(row/column/row-dense/column-dense)
  >- `justify-items/align-items/place-items`：调整**单元格内容的位置** (`start/end/center/stretch(默认)`)
  >- `justify-content/align-content/place-content`：调整**整个内容区域在容器中的位置**(`start/end/center/stretch/space-around/space-between/space-evenly`)
  >- `grid-auto-columns/grid-auto-rows`：用来指定浏览器自动生成多余网格的行宽列高(px)；
  >- `grid/grid-template`：合并写法，但最好不要使用；
  >
  >
  >
  >项目(item)：
  >
  >在容器顶层的子元素；
  >
  >- `grid-column-start/grid-column-end/grid-row-start/grid-row-end`：类似于指定项目边框，指定项目开始位置和结束位置(数值 或 网格线名字 或 span+数值)；
  >- `grid-column/grid-row`：是一样两种形式的简写(start-line / end-line)；
  >- `grid-area`：指定项目位于哪一个区域(区域名/以上四种属性的简写)；
  >- `justify-self/align-self/place-self`：设置单元格内容的 水平/垂直 位置 (start/end/center/stretch)；
  >
  >**注意**：设置为网格布局后，容器子元素项目(item)的 `float、display: inline-block/table-cell、vertical-align、column-*` 都将失效；

- flex 和 grid 的区别 

  > flex 布局是轴线布局，只能指定 `item` 针对周线的位置，可以看作是一种一维布局；
  >
  > grid 布局则是将容器划分为行和列，产生单元格，然后指定 `item` 所在单元格，可以看作是二维布局，相对 flex 布局更为强大，其将网页划分为一个个网格，可以任意组合不同网格，对网页进行布局；

- 两栏布局（左栏固定宽度 右栏自适应）有几种方法

  
