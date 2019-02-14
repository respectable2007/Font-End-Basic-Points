onmessage = function(e){
  var sum = 0;
  for(var i = e.data;i>0;i--){
      sum += i;
  }
  postMessage(sum);
}