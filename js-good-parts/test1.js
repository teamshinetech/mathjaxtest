Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};

Number.method('integer', function () {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {
    };
    F.prototype = o;
    return new F();
  }
}

//Objects
var test = {name: "test"};
test.prototype = {
  testname: "testname"
};

for (prop in test) {
  if (test.hasOwnProperty(prop)) {
    console.log('prop: ' + prop);
  }
}

var status_1 = test.status || 'unknown';

var status_2 = test.status && test.status.value;

var stooge = {
  'first-name': 'William',
  'last-name': 'Howard'
};

//原型链接在更新时不起作用，对某个对象做出改变不会影响其原型
var another_stooge = Object.create(stooge);
another_stooge['first-name'] = 'Harry';

//原型链接是动态的，添加一个新属性到原型，立刻对所有基于该原型创建的对象可用
stooge['second-name'] = 'Xu';


//Functions
var add = function (a, b) {
  return a + b;
};

//方法调用模式(绑定到某个对象)， method invocation pattern.
var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();

//函数调用模式(未绑定到任何对象), function invocation pattern, 内部函数this指向全局
var sum = add(3, 4); //this => global
myObject.double = function () {
  var that = this;
  var helper = function () {
    that.value = add(that.value, that.value);
  };
  console.log(myObject.value);
  helper();
  console.log(myObject.value);
};

myObject.double();

//构造器调用模式, constructor invocation pattern,
/*
* If a function is invoked with the new prefix, then a new object will be created with a hidden link to the value of the
 * function’s prototype member, and this will be bound to that new object
* */
var Quo = function (string) {
  this.status = string;
};

Quo.prototype.get_status = function () {
  return this.status;
};

var myQuo = new Quo('confused');
console.log(myQuo.get_status());

//Apply 调用模式
var array = [3, 4];
var sumApply = add.apply(null, array);
var statusObject = {
  status: 'A-OK'
};
var status = Quo.prototype.get_status.apply(statusObject);

//未指定返回值则返回undefined

//hanoi
var hanoi = function (disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst);
    hanoi(disc - 1, aux, src, dst);
  }
};

hanoi(3, 'Src', 'Aux', 'Dst');