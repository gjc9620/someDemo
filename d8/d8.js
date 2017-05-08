/**
 * Created by gujiacheng on 2017/5/7.
 */


function test( obj ) {
  return obj.prop + obj.prop;
}

var a = { prop: 'a' }, i = 0;

while ( i++ < 10000 ) {
  test( a );
}
