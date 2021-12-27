
# 一些需要熟悉的手写函数

- 给你一组数和一个数值，要你返回数值由数组内的数组合而成的所有可能，数组中的数可以无限次使用；

  ````js
  function sum(arr, target) {
      var res = []
      var temp = []
      arr.sort((a, b) => a - b)
  
      function getSum(arr) {
          let total = 0;
          for (let i = 0; i < arr.length; i++) {
              total += arr[i]
          }
          return total
      }
  
      function dfs(arr, target, index) {
          for (let i = index; i < arr.length; i++) {
              if (getSum(temp) + arr[i] < target) {
                  temp.push(arr[i])
                  while (arr[i] == arr[i + 1]) { //防止重复元素
                      i++;
                  }
                  dfs(arr, target, i)
                  temp.pop()
              } else if (getSum(temp) + arr[i] === target) {
                  temp.push(arr[i])
                  res.push(temp.slice());
                  temp.pop()
              }
          }
      }
      dfs(arr, target, 0)
      return res
  }
  
  console.log(sum([2, 3, 6, 7], 7));
  ````

  

- 通过reduce来实现map函数：

  ````js
  Array.prototype.map2 = function (fn) {
      let result = []
      this.reduce((prev, cur) => {
          result.push(fn(cur))
      }, arr[0])
      return result
  }
   
  let arr2 = arr.map2(function(item) {
      return item * 2
  })
  ````

- [最长递增子序列](https://www.nowcoder.com/jump/super-jump/word?word=最长递增子序列)意思是在一组数字中，找出最长一串递增的数字；

  

- 手写深拷贝

  

- ````js
  // 打印什么
  Promise.resolve(1)
  .then(res => {
      console.log(res)
      return 2
  })
  .then(res => {
      console.log(res)
  })
  // 1 2
  ````

  

- 手写 apply

  ````js
  Function.prototype.apply2 = apply2
   
  function apply2(obj) {
      let args = []
      let obj.fn = this
      for(let i = 0; i < arguments[1].length; i++) {
          args.push('arguments[1][' + i + ']')
      }
      let result = eval('obj.fn(' + args + ')')
      delete obj.fn
      return result
  }
   
  function f(){
      console.log(1)
  }
   
  const obj = {
   
  }
  f.apply2(obj, [2, 3, 4])
  ````

  

- 手写 Promise.all()



