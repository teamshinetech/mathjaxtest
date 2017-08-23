Object.prototype.method = function (name, func) {
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

var foo = function () {
  var a = 3, b = 5;
  var bar = function () {
    var b = 7, c = 11;
    console.log('1 - a: ' + a + ' b: ' + b + ' c: ' + c);
    a += b + c;
    console.log('2 - a: ' + a + ' b: ' + b + ' c: ' + c);
  };
  console.log('3 - a: ' + a + ' b: ' + b + ' c: ' + (typeof c !== 'undefined' ? c : 'undefined'));
  bar();
  console.log('4 - a: ' + a + ' b: ' + b + ' c: ' + (typeof c !== 'undefined' ? c : 'undefined'));
};

foo();

var myObject = (function () {
  var value = 0;
  return {
    increment: function (inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function () {
      return value;
    }
  }
}());
myObject.increment(3);
console.log('myObject value: ' + myObject.getValue());

var quo = function (status) {
  return {
    get_status: function () {
      return status;
    }
  };
};

var myQuo = quo('amazed');
console.log('amazed: ' + myQuo.get_status());

//bad
var add_the_handles_bad = function (nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function (e) {
      alert(i);
    };
  }
};

//good
var add_the_handles_good = function (nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = (function (i) {
      return function (e) {
        alert(i);
      }
    }(i));
  }
};

for (var i = 0; i < 5; i++) {
  (function (idx) {
    setTimeout(function () {
      console.log(idx);
    }, 5);
  }(i));
}

//module
String.method('deentityify', function () {
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };

  return (function () {
    return this.replace(/\d/);
  }())
});

var serial_maker = function () {
  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function (p) {
      prefix = String(p);
    },
    set_seq: function (s) {
      seq = s;
    },
    gensym: function () {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  }
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
console.log('unique: ' + unique);