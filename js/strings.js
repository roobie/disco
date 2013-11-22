var formatString = function format(template, data) {
    /// function `format`
    /// Parameters
    ///     0, `template`   [String]:       The template
    ///     1, `data`       [Array|Object]: The data
    ///
    /// Returns
    ///     [String]: The result of formatting the template or unformatted template if data is nothing
    ///
    /// Throws:
    ///     TypeError: If template is nothing
    ///
    /// Examples:
    /// formatString("Hello %user.name, my name is %name", {
    ///     user: {
    ///         name: function () {
    ///             return "Adam";
    ///         }
    ///     },
    ///     name: "Björn"
    /// });

    // ==== BEGIN var section =================================================
    var
        // the interpolation symbol:
        interpolationSymbol = "%",

        // This regex checks if template contains any matches that are similar to:
        // %user.toString or %3.toLocaleString
        extCheckRe = new RegExp(interpolationSymbol + "([A-Za-z0-9]+)[\.]{1}([A-Za-z]+)", "g"),

        // function names:
        checkIsExtended, foreach, isNothing, getRe, getValue;
    // ==== END var section ===================================================

    isNothing = function (a) {
        return a === null || a === void 0;
    };

    checkIsExtended = function() {
        var r = new RegExp(extCheckRe);
        return r.test(template);
    };

    getRe = function (key, prop) {
        if (isNothing(prop)) {
            return new RegExp(interpolationSymbol + key, "g");
        }
        return new RegExp(interpolationSymbol + key + "\\." + prop, "g");
    };

    getValue = function (obj, prop) {
        if (obj === void 0 || prop === void 0) {
            return void 0;
        }
        if (typeof obj[prop] === "function") {
            return obj[prop]();
        } else {
            return obj[prop].toString();
        }
    };

    foreach = function (collection, callback, optContext) {
        var i, k, maxi;
        if (isNothing(callback)) {
            return;
        }

        if (collection instanceof Array) {
            maxi = collection.length;
            for (i = 0; i < maxi; i++) {
                callback.call(optContext || this, collection[i], i, collection);
            }
        } else {
            for (k in collection) {
                if (collection.hasOwnProperty(k)) {
                    callback.call(optContext || this, collection[k], k, collection);
                }
            }
        }
    };

    if (isNothing(template)) {
        throw new TypeError("Parameter [0] (`template`) cannot be nothing!");
    }

    if (isNothing(data)) {
        return template;
    }

    return (function main() {
        var result = template;

        if (checkIsExtended()) {
            (function () {
                var koi, prop, match;
                while ((match = extCheckRe.exec(result))) {
                    koi = match[1];
                    prop = match[2];

                    result = result.replace(getRe(koi, prop), getValue(data[koi], prop));
                }
            })();
        }

        foreach(data, function (value, koi) {
            result = result.replace(getRe(koi), value);
        });

        return result;
    })();
};
