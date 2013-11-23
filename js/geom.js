(function () {
  "use strict";

  var module = {},
      twod;

  module.Ratio = function Ratio(a, b) {
    this.a = a;
    this.b = b;
  };

  module.Ratio.prototype.valueOf = function() {
    return a / b;
  };

  twod = module.twod = {};

  twod.Point = function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  twod.distance = function distance(point1, point2) {
    var dx = point2.x - point1.x,
        dy = point2.y - point1.y;

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  };

  twod.bearing = function bearing(point1, point2) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x);
  };

  twod.vector = function vector(point1, point2) {
    return {
      magnitude: twod.distance(point1, point2),
      bearing: twod.bearing(point1, point2)
    };
  };

  twod.inverseAngle = function(theta) {
    if (theta < 0) {
      return theta + Math.PI;
    }
    return theta - Math.PI;
  };

  twod.angleToRatio = function(theta) {
    var tan = Math.tan(theta), cos = Math.cos(theta), sin = Math.sin(theta);
    /*var ratio = [
      sin / tan,
      tan * cos
    ];*/

    return new Ratio(new Ratio(sin, tan), tan * cos);
  };

  twod.rect = {};

  twod.rect.overlaps = function(x1, y1, w1, h1, x2, y2, w2, h2) {
    var a, b, c, d;
    a = x2 > x1 + w1;
    b = x2 + w2 < x1;
    c = y2 > y1 + h1;
    d = y2 + h2 < y1;
    return !(a || b || c || d);
  };

  twod.circle = {};

  twod.circle.overlaps = function(x1, y1, r1, x2, y2, r2) {
    var dist = distance({x: x1, y: y1}, {x: x2, y: y2});
    return dist < r1 || dist < r2;
  };

  this.geom = module;
}).call(this);
