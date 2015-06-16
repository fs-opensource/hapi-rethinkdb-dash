// # Is Helper
// -> originally from Ghost: https://github.com/TryGhost/Ghost/blob/master/core/server/helpers/is.js
// Usage: `{{#is "dashboard"}}`
// Checks whether we're in a given context.
var _               = require('lodash'),
    is;

is = function (context, options) {
    options = options || {};

    var currentContext = options.data.root.context;

    if (!_.isString(context)) {
        console.log('no context given to this helper');
        return;
    }

    function evaluateContext(expr) {
        return expr.split(',').map(function (v) {
            return v.trim();
        }).reduce(function (p, c) {
            return p || _.contains(currentContext, c);
        }, false);
    }

    if (evaluateContext(context)) {
        return options.fn(this);
    }

    return options.inverse(this);
};

module.exports = is;
