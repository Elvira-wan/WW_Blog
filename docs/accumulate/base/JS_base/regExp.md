# 正则表达式


* **正则表达式写法**
  
  * var 变量 = new RegExp(" ");
  * var 变量 = / /
  
  ````javascript
  var patt = new RegExp("e");//验证字符串里有没有e，显式定义
  var patt = /e/ //意义同上，隐式定义
  var str = "abcdf"
  alter(patt.test(str)); //验证字符串方法test
  ````
  
  
  
* **正则表达式方法**：

  * test：检测是否匹配正则表达式模式
  * match：在字符串内检所指定的值，找打一个或多个正则表达式
  * exec：返回字符串数组

  <u>注释：sreach和replace常用正则表达式搜索字符串中字符</u>

  

* **正则表达式基本用法**
  * i：执行对大小写不敏感匹配
  * g：执行全局匹配，查找所有而非在找到第一个后停止
  * ^：以什么开头
  * $：以什么结尾
  * [a-zA-Z]：可以包含的字母
  * [0-9]：匹配数字
  * {n,m}：至少匹配n次，至多匹配m次
  * *：零次或多次匹配前面的字符或者子表达式，等效于{0,}
  * +：一次或多次匹配前面的字符或者子表达式，等效于{1,}
  * ?：零次或一次匹配到前面的字符或者子表达式
  * ()：分组
  * \b：单词边界
  * \d：查找数字
  * \s：查找空白字符
  * \w：查找单词字符

