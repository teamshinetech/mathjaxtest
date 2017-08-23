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

var Mammal = function (name) {
  this.name = name;
};

Mammal.prototype.get_name = function () {
  console.log('Mammal get_name');
  return this.name;
};

Mammal.prototype.says = function () {
  console.log('Mammal says');
  return this.saying || '';
};

var myMammal = new Mammal('Herb the Mammal');

var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
};

Cat.prototype = new Mammal();
Cat.prototype.purr = function (n) {
  console.log('Cat purr');
  var i, s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};

Cat.prototype.get_name = function () {
  console.log('Cat get_name');
  // console.log(this.name);
  return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');
// var says = myCat.says();
var purr = myCat.purr(5);
var name = myCat.get_name();
myMammal.purr(5);