<script>
  console.profile('test')
  var test1 = function () {
      var p = 0;
      for(var i =0;i< 5000000;i ++) {
          p = p + i;
      }
      console.log(p)
  }
  var test2 = function () {
      var p = 0;
      for(var i =0;i< 1000000;i ++) {
          p = p + i;
      }
      console.log(p)
  }
    var test3 = function () {
      var p = 0;
      for(var i =0;i< 5000000;i ++) {
          p = p + i;
      }
      console.log(p)
  }
  test1();
  test2();
  test3();
  console.profileEnd('test')
</script>