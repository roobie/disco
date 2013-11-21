(function () {
  "use strict";

  var module = {},
      twod;

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
      length: twod.distance(point1, point2),
      bearing: twod.bearing(point1, point2)
    };
  };

  this.geom = module;
}).call(this);
