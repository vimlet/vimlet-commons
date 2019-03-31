// @function json (public) [JSON Utils]
module.exports.json = {
    // @function deepMerge (public) [Merge two objects] @param args
    deepMerge: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var merged = {};
        var merge = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (obj[prop] && typeof obj[prop] == "object" && !Array.isArray(obj[prop])) {
                        merged[prop] = module.exports.json.deepMerge(merged[prop], obj[prop]);
                    } else {
                        merged[prop] = obj[prop];
                    }
                }
            }
        };
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            merge(obj);
        }
        return merged;
    }
};

// @function string (public) [String Utils]
module.exports.string = {
    // @function asyncReplace (public) [Asynchronous string replace] @param str @param re [Regex] @param replacer [Function]
    asyncReplace: function (str, re, replacer) {
        return Promise.resolve().then(() => {
            var fns = []
            str.replace(re, (m, ...args) => {
                fns.push(replacer(m, ...args))
                return m
            });
            return Promise.all(fns).then(replacements => {
                return str.replace(re, () => replacements.shift())
            });
        });
    },
    // @function escapeRegExp (public) [Escape regex expression] @param str
    escapeRegExp: function (str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
};


// @function async (public) [Async Utils]
module.exports.async = {
    // @function stdFromCallback (public) [Standardize callback function] @param fn [Function]
    stdFromCallback: function (fn) {
        return Object.defineProperty(function () {
            if (typeof arguments[arguments.length - 1] === "function") fn.apply(this, arguments)
            else {
                return new Promise((resolve, reject) => {
                    arguments[arguments.length] = (err, res) => {
                        if (err) return reject(err)
                        resolve(res)
                    }
                    arguments.length++
                    fn.apply(this, arguments)
                })
            }
        }, "name", { value: fn.name })
    },
    // @function stdFromPromise (public) [Standardize promise function] @param fn [Function]
    stdFromPromise: function (fn) {
        return Object.defineProperty(function () {
            const cb = arguments[arguments.length - 1]
            if (typeof cb !== "function") return fn.apply(this, arguments)
            else fn.apply(this, arguments).then(r => cb(null, r), cb)
        }, "name", { value: fn.name })
    }
};
