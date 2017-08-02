// 错误
var theThing = null;

var replaceThing = function () {
  let a = theThing;
  let unused = function () {
    if (a) console.log("hi")
  };
  
  /////// 不断修改引用
  theThing = {
    longStr: new Array(1000000).join('*')
    ,
    someMethod: function () {
      console.log('a')
    }
  };
  
  global.gc();
  // 每次输出的值会越来越大
  console.log(process.memoryUsage().heapUsed)
};


setInterval(replaceThing, 1);
