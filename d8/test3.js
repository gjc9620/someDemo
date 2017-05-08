/**
 * Created by gujiacheng on 2017/5/7.
 */
function factorial( n ) {
  return equal( n, 1 ) ? n : multiply( n, factorial( --n ) );
}

function multiply( x, y ) {
  return x * y;
}

function equal( a, b ) {
  return a === b;
}

var i = 0;

while ( i++ < 1e7 ) {
  factorial( 10 );
}
