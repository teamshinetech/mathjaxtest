// var scope = 'global scope';
//
// function checkscope() {
//   var scope = 'local scope';
//
//   function f() {
//     return scope;
//   }
//
//   return f;
// }
//
// console.log(checkscope()());
//
// var uniqueInteger = (
//   function () {
//     var count = 0;
//     return function () {
//       return count++;
//     };
//   }()
// );
//
// console.log(uniqueInteger());
// console.log(uniqueInteger());

// function counter() {
//   var n = 0;
//   return {
//     count: function () {
//       n++;
//       console.log(n);
//       return n;
//     },
//     reset: function () {
//       n = 0;
//       console.log(n);
//     }
//   }
// }
// var c = counter(), d = counter();
// c.count();
// d.count();
// c.reset();
// d.count();
// d.reset();

function counter(n) {
  return {
    get count() {
      n++;
      console.log(n);
      return n;
    },
    set count(m) {
      if (m > n) {
        n = m;
        console.log(n);
      } else {
        throw Error("count can only be set to a larger value");
      }
    }
  }
}

var c = counter(1000);
c.count;
c.count;
c.count = 2000;
c.count;
c.count = 2000;