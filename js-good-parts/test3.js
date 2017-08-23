Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};

if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {
    };
    F.prototype = o;
    return new F();
  }
}

var fibonacci = (function () {
  var memo = [0, 1];
  var fib = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}());


// var memoizer = function (memo, formula) {
//   var recur = function (n) {
//     var result = memo[n];
//     if (typeof result !== 'number') {
//       result = formula(recur, n);
//       memo[n] = result;
//     }
//     return result;
//   };
//   return recur
// };
//
// var fibonacci = memoizer([0, 1], function (recur, n) {
//   return recur(n - 1) + recur(n - 2)
// });