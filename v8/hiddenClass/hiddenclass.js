var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

function Point(x, y){
  this.x = x;
  this.y = y;
}
// add tests
suite.add('case1', function() {
  
  var point = [50,100];
  point[0];
  point[1];
  
})
.add('case2', function() {
  
  var point = new Point(50, 100);
  point.x;
  point.y;
})
.add('case3', function() {
  
  var point = { x: 50, y: 100 };
  point.x;
  point.y;
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

