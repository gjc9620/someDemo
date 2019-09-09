const adder = new Function('a', 'b', 'return b%2 ? a + b : b%3 ? a - b : b%5 ? b / a : a * b');
let b = 0, b2 = 0;
function _throw() {
  throw new Error('Ups');
}
function _catch() {
  try {_throw()} catch(e) {}
}
function printStatus(fn) {
  switch (%GetOptimizationStatus(fn)) {
  case 1: console.log(fn.name, "function is optimized"); break;
  case 2: console.log(fn.name, "function is not optimized"); break;
  case 3: console.log(fn.name, "function is always optimized"); break;
  case 4: console.log(fn.name, "function is never optimized"); break;
  case 6: console.log(fn.name, "function is maybe deoptimized"); break;
  }
}
eval('function evil(a,b) {return b%2 ? a + b : b%3 ? a - b : b%5 ? b / a : a * b}');
printStatus(adder);
printStatus(evil);
printStatus(_throw);
printStatus(_catch);
