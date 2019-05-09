(function() {
  "use strict";
  function clone() {
    var toString = Object.prototype.toString;
    if(arguments.length === 0) {
      return;
    }
    var newParam = null,
        oldParam = arguments[0];
    if(toString.apply(oldParam) === '[object Object]'){
      newParam = {};
      for(var i in oldParam) {
        var temp = oldParam[i];
        newParam[i] = toString.apply(temp).indexOf('object') ? clone(temp) :temp;
      }
    } else if(toString.apply(oldParam) === '[object Array]'){
      newParam = [];
      for(var i = 0, lens = oldParam.length; i < lens; i++) {
        var temp = oldParam[i];
        newParam[i] = toString.apply(temp).indexOf('object') ? clone(temp) :temp;
      }
    } else if(toString.apply(oldParam) === '[object Function]'){
      newParam = eval('('+ oldParam.toString()+')');
    } else {
      newParam = oldParam;
    }
    return newParam;
  }
  var array = [1, 2, 3],
      fn = function(){console.log(1);},
      array1 = clone(array),
      fn1 = clone(fn),
      obj = {
        a: 1,
        b: [1, 2],
        c: {
          d: 3
        }
      },
      obj1 = clone(obj);
      array1[0] = 4;
      console.log(array[0]);
      console.log(array1[0]);
      fn1();
      obj1.b[0] = 5;
      obj1.c.d = 6;
      console.log(obj.b[0],obj.c.d)
      console.log(obj1.b[0],obj1.c.d)
})()