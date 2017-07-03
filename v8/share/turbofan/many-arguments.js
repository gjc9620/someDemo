
const arr = new Array(4000);
function mymax() { return Math.max.apply(undefined, arguments); }
for (let i = 0; i < 2000; ++i) mymax(...arr);  //too many arguments




