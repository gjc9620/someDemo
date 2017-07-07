# v8

## 架构 历史 机器码 jit crankshaft turbofan + ignition 字节码
  https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/ .  
  https://v8project.blogspot.hk/

## dir

## warm-up
  new array()
  a.push

## optimise deoptimise d8
  try catch
  deoptimise
  arguments
  https://github.com/vhf/v8-bailout-reasons

## async microtask macrotask
  https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context



## hidden class fast mode
  https://github.com/petkaantonov/bluebird/blob/7454401269cfa47e5b001354388c062509103de7/src/util.js#L180-L187
  http://mrale.ph/s3/nodecamp.eu/#42
  https://jsperf.com/test-dictionary-mode

## memory
  ofm demo
  typedArray limit  gc outofmenory demo -expose-gc

## tailCallOptimize


https://docs.google.com/presentation/d/1_eLlVzcj94_G4r9j9d_Lj5HRKFnq6jgpuPJtnmIBs88/edit#slide=id.g2134da681e_0_682

有技术上的问题随时可以和我讨论 😄
###reference
http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection
https://github.com/v8/v8/wiki/Design-Elements
https://github.com/petkaantonov/bluebird/blob/7454401269cfa47e5b001354388c062509103de7/src/util.js#L180-L187
http://mrale.ph/s3/nodecamp.eu/#1
https://docs.google.com/presentation/d/1_eLlVzcj94_G4r9j9d_Lj5HRKFnq6jgpuPJtnmIBs88/edit#slide=id.p
https://jsperf.com/test-dictionary-mode
http://kangax.github.io/compat-table/es6/
https://github.com/tc39/proposal-ptc-syntax#performance
https://promisesaplus.com/
https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context
https://github.com/joyeecheung/v8-gc-talk/blob/master/Are%20Your%20V8%20GC%20Logs%20Speaking%20to%20You.pdf
http://alinode.aliyun.com/blog/38
http://www.ecma-international.org/ecma-262/.0/#sec-relational-operators
  video
[https://www.youtu1be.com/watch?v=8aGhZQkoFbQ&t=1303s](Philip Roberts: What the heck is the event loop anyway? | JSConf EU 2014)
[https://www.yout1ube.com/watch?v=M1FBosB5tjM&t=2375s](MNUG 2017.03.23 TurboFan: A new code generation architecture for V8)
[https://www.yout1ube.com/watch?v=z-RXUzkFOSI&t=403s](Tech Talk: How to Use V8 for FastProperty Access in JavaScript)
