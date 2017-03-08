// 错误
var theThing = null;
var count = 0;
var heapUsed = process.memoryUsage().heapUsed;
var replaceThing = function () {
  let 泄漏变量 = theThing;
  let unused = function () {
    if (泄漏变量)
      console.log("hi")
  };
  
  // if(count == 0){
  //   theThing = {}
  // }
  // theThing.longStr = new Array(100000000).join('*');
  // theThing.someMethod = function () {
  //   console.log('a')
  // };
  //
  //
  // count++;
  
  /////// 不断修改引用
  theThing = {
    longStr: new Array(1000000).join('*')
    // ,
    // someMethod: function () {
    //   console.log('a')
    // }
  };
  
  global.gc();
  // 每次输出的值会越来越大
  const used = process.memoryUsage().heapUsed
  if(heapUsed !== used){
    console.log(used);
    heapUsed = used
  }
};
setInterval(replaceThing, 1);
