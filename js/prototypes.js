var isNothing = function(v) {
    return v === null || v === void 0;
};

var mixin = function mixin(dst) {
    var args = [].slice.call(arguments, 1),
        i, k, len = args.length;

    for (i = 0; i < len; i++) {
        for (k in args[i]) {
            if (args[i].hasOwnProperty(k)) {
                dst[k] = args[i][k];
            }
        }
    }
};

var extend = function extend(Super, Sub, createOpts) {
    if (isNothing(Super) || isNothing(Sub)) {
        return void 0;
    }
    
    Sub.prototype = Object.create(Super.prototype, createOpts);
    Sub.prototype.constructor = Sub;
    Sub.prototype.super = Super;

    return Sub;
};
