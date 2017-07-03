var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

// add tests
suite.add('case1', function() {
    
    function A() {
      
    }
    for(let i = 0;i< 10000000; i++){
      var a = new A();
      a.a = 1;
      a.b = 2;
      a.c = 3;
      a.d = 3;
      a.e = 3;
      a.f = 3;
      a.g = 3;
      a.h = 3;
      a.i = 3;
      a.j = 3;
    }
    
  })
  .add('case2', function() {
  
    function B(a, b, c, a ,b ,c ,d ,e ,f ,g ,h ,i ,j) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.e = e;
      this.f = f;
      this.g = g;
      this.h = h;
      this.i = i;
      this.j = j;
    }
  
    for(let i = 0;i< 10000000; i++) {
      var b = new B(1, 2 ,3, 4,5,6,7,8,9,10,11,13,14);
    }
    
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });

