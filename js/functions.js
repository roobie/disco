(function () {
  var __slice = [].slice;

  var fun = function(fn) {
    // Augments the oarameter with funcy properties.
    fn.curry = curry;
  };

  var curry = function curry(fn) {
    var fn = typeof this === "function" ? this || fn,
        arity = fn.length,
        totalArgs = [];

    function currier () {
      totalArgs = totalArgs.concat(slice.call(arguments));
      if (totalArgs.length >= arity) {
        return fn.apply(this, totalArgs);
      } else {
        return currier;
      }
    }
    return currier;
  };

})();
