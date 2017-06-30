/**
 * Created by gujiacheng on 30/06/2017.
 */
var callbacks = [
  function sloppy() {},
  function strict() { "use strict"; }
];

function dispatch() {
  for (var l = callbacks.length, i = 0; i < l; ++i) {
    callbacks[i].apply(null, arguments);
  }
}
