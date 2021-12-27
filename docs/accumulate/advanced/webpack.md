# Babel 和 Webpack

### Webpack 配置步骤

1. 初始化项目：`npm init`

2. 安装包：`npm install --save-dev webpack-cli@3.3.12 webpack@4.44.1`

3. 配置：

   创建：`webpack.config.js`

   在 `package.json` 中的 `script` 对象中写：`"webpack": "webpack --config webpack.config.js"`

4. 运行：

   `cmd` 中输入 `npm run webpack`

    

### Webpack的核心概念

- #### `entry`

  单入口：`entry: './src/index.js'`

  多入口：

  ````js
  entry: {
      main: './src/index.js',
      search: './src/search.js'
  }
  ````

  

- #### `output`

  单出口：

  ````js
  output: {
  	// 表示出口文件的路径，_dirname表示当前cmd所在的路径，dist表示在路径下创建的文件夹名，这是一个绝对路径   
      path: path.resolve(__dirname, 'dist'),
      // filename是表示在上面路径下输出的文件的名字
      filename: 'bendle.js'
  }
  ````

  多出口：

  ````js
  output: {
      path: path.resolve(__dirname, 'dist');
      // 动态输出，name的值会根据多入口中的不同的属性名来进行变化打包
      filename: '[name].js'
  }
  ````

- #### `loader`：为了让webpack能够去处理非JS文件的模块

  babel-loader接口：为了可以将ES6先编译为ES5以下版本后打包

  配置步骤：

  1. 安装 babel-loader的包

     ````cmd
     npm install --save-dev babel-loader@8.1.0
     ````

  2. 因为需要使用 babel，因此也需要安装babel的包

     ````cmd
     npm install --save-dev @babel/core@7.11.0 @babel/preset-env@7.11.0
     ````

     这里不用安装 `babel/cli` 是因为不需要使用命令行去操控 `babel` ，而该包是一些命令行控制 babel 的语句；

     此外特别提出需要为 `babel/preset-env` 编写配置文件 `.babelrc`：

     ````json
     {
         "presets": ["@babel/preset-env"]
     }
     ````

     这是为了指定 ES6文件到底是要编译成什么版本的ES；

     

  3. 配置 `package.config.js` 文件

     ````js
     module: {
     	rules: [
     		{
     			test: /\.js$/,
                 exclude: /node_module/,
                 load: 'babel-loader'
     		}
     	]
     }
     ````

     `test`：值为一个正则表达式，表示只对 js 文件进行操作

     `exclude`：表示不对 node_module 文件夹下的文件进行操作

     `load`：表示使用 `babel-loader` 进行操作

     此外**特别**提出，这里的 `rules` 是一个数组，里面可以放多个对象，使用不同的 `load` 方式对不同的文件进行 `test`；

     

  4. 为了将 `Promise` 、`Array.form()` 此类ES6新增 API 消除，还可以为 babel 安装一个垫片包 `polyfill`：

     ````cmd
     npm install --save-dev core-js@3.6.5
     ````

     并在需要消除API的 js 文件中引入该包：

     ````js
     import "core-js/stable";
     ````

     

  5. 运行并测试：

     ````cmd
     npm run webpack
     ````

     

- #### `plugins`：插件，比起 loader 用于执行范围更广的任务；

  配置 `html-webpack-plugin`：

  >会自动将打包好的js文件引入html文件中，且将最后的html文件一起打包好放入最终的出口文件夹中；

  步骤：

  1. 安装核心包

     ````js
     npm install --save-dev html-webpack-plugin
     ````

  2. 编写配置文件：`webpack.config.js`

     ````js
     //首先在插件中引入该包
     const HtmlWebpackPlugin = require('html-webpack-plugin');
     
     plugins: {
         // 单入口，只需实例化一个构造函数
         // 多入口实例化多个，且指定不同的文件名，引入哪些js文件
     	new HtmlWebpackPlugin({
             // 需要打包的模板html文件
             template: './webpack-install.html',
             // 打包好的文件的输出名, 需要写文件名后缀
             filename: 'install.html',
             // 该html文件所需引入的js文件
             chunks: ['change']
             // 其他可选项
             minify: {
             	// 移除所有html文件中的注释
             	removeComments: true,
             	// 移除所有空格和换行
             	collapseWhitespace: true,
             	// 移除标签中属性的双引号
             	removeAttributeQuotes: true
         	}
         });
     }
     ````

  3. 在 `cmd` 中书写命令行语句 `npm run webpack` 执行

     

### 处理CSS文件

1. 将 CSS 文件引入 JS 文件中

   ````js
   import '../css/main.css'
   ````

2. 安装 `css-loader`，使 webpack 能够识别 css 文件

   ````cmd
   npm install --save-dev css-loader@4.1.1
   ````

   并在 `webpack.config.js` 中配置 `loader`：

   ````js
   {
   	// 表示该loader对后缀名为css的文件有效    
       test: /\.css$/，
       // 表示使用哪个loader
       loader：'css-loader'
   }
   ````

   此时的 webpack 可以识别css文件并将其打包进目录中，但样式不对 html 文件生效，因为此时还未将 css 文件引入 html 文件中；

3. 安装 loader，将打包后的 css 文件引入 html 文件中

   方法一：安装 `style-loader`，用 `style` 标签将其引入

   ````cmd
   npm install --save-dev style-loader@1.2.1
   ````

   更改 `webpack.config.js`：

   ````js
   {
       test: /\.css$/,
       // loader 由右至左被读取
      	use: ['style-loader', 'css-loader']
   }
   ````

   方法二：安装插件 `mini-css-extract-plugin`

   ````cmd
   npm install --save-dev mini-css-extract-plugin@0.9.0
   ````

   在 `webpack.config.js` 中引入：

   ````js
   const MiniCssExtractPlugin = require('mini-css-extract-pligin');
   ````

   在 `Plugin` 中创建该插件：、

   ````js
   new MiniCssExtractPlugin({
       // 规定其文件名
       filename: 'css/[name].css'
   })
   ````

   更改上述配置：

   ````js
   use: [MiniCssExtractPlugin.loader, 'css-loader']
   ````



### 处理图片 (如果是外部图片是无需被webpack处理的，只处理本地图片)

- #### css中：`file-loader`

  1. 安装核心包

     ````cmd
     npm install --save-dev file-loader@6.0.0
     ````

     该包的作用是处理图片；

  2. 在 `module` 中更改 `loader` 的配置

     ````js
     {
         test: /\.(png|jpg|svg|gif)$/,
         use: 'file-loader'
     }
     ````

     此时打包css已经可以成功了，img文件已经被成功引入 dist 目录中，但是此时引用的 img 依旧无法在页面中显示；

     这是因为在引入图片时，webpack同时也改变了引入图片时的路径，`mini-css-extract-plugin` 认为图片默认与 css 文件在一个文件夹下，因此在引入图片时，只书写了其文件名，为写其路径；

  3. 修改 `mini-css-extract-plugin` 插件公共路径，以及 `file-loader` 中文件默认储存位置：

     ````js
     // mini-css-extract-plugin插件配置
     {
         test: /\.css$/,
         use: [
             {
                 loader: MiniCssExtractPlugin.loader,
                 // 给打包的css中更改的路径都添加默认的公共路径
                 options: {
                 	publicPath: '../'
             	}
             },
             'css-loader'
         ]
     }
     ````

     

     ````js
     // file-loader配置
     {
         test: /\.(png|gif|jpg|svg$)/,
         use: {
             loader: 'file-loader',
             options: {
                 // 给打包好的文件设置命名，以防名字为乱码     
                 name: 'images/[name].[ext]'
             }
         }
     }
     ````

     

- #### html中：`html-withimg-loader`

  1. 安装核心包

     ````cmd
     npm install --save-dev html-withimg-loader@0.1.16
     ````

     该包作用是解析 html 文件，但解析到的 img 还是交给 `file-loader` 处理，因此以下步骤全是在上述步骤的基础上完成的；

  2. 配置 `loader`

     ````js
     {
         test: /\.(htm|html)$/,
         loader: 'html-withimg-loader'
     }
     ````

     此时打包webpack不出错，但是 `img.src` 后的值变为了一个类似模块的内容，这是因为 `file-loader` 处理时默认的使用了 es6 的模块；

  3. 改变 `file-loader` 的配置

     ````js
     {
         test: /\.(png|jpg|svg|gif)$/,
         use: [
             loader: 'file-loader',
             options:{
                 name: 'images/[name].[ext]',
                 esModule：false
             }
         ]
     }
     ````

     

- #### js中：`file-loader`

  1. 在安装好 `file-loader`的基础上， 将图片作为一个模块，引入 js 文件中：

     ````js
     import img from '../images/logo.png'
     ````

     在webpack打包后，此时的 img 就是直接可以在 js 文件中使用的了，无需其他操作；

     

### 使用 `url-loader` 处理图片，将小图片转化为base64格式，嵌入文件中

1. 安装核心包 (因为 `url-loader` 底层也是借助 `file-loader` 因此也需要安装 `file-loader` 包，但是无需配置)

   ````js
   npm install --save-dev url-loader@4.1.0
   ````

2. 配置 `url-loader`

   ````js
   {
       test: /\.(png|jpg|gif|svg)$/,
       use: {
           loader: 'url-loader',
           options: {
               name: 'images/[name].[ext]'
               esModule: false,
               // 单位为字节，表示多少字节以下的图片被转换为base64字节格式
               limit: 3000
           }
       }
   }
   ````

   

### 使用 `webpack-dev-server` 搭建开发环境

1. 安装核心包

   ````cmd
   npm install --save-dev webpack-dev-server@3.11.0
   ````

2. 在 `package.json`  中配置命令

   ````json
   "script": {
       "webpack": "webpack --config webpack.config.js",
       "dev": "webpack-dev-server"
       // 可在后面加一些参数 例如 --open chrome等
       // 使用 dev 时，会生成dist目录，但存在与内存中，我们无法看见
   }
   ````

   