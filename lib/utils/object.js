var keys = Object.keys, values = Object.values, entries = Object.entries;
var map = function (object, fn) {
    var updated = {};
    entries(object).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        updated[key] = fn(key, value);
    });
    return updated;
};
var filter = function (object, fn) {
    var updated = {};
    entries(object).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (fn(key, value)) {
            updated[key] = value;
        }
    });
    return updated;
};
var some = function (object) {
    var result = false;
    values(object).forEach(function (value, index) {
        if (value) {
            result = true;
        }
    });
    return result;
};
var every = function (object) {
    var result = true;
    if (keys(object).length === 0) {
        return false;
    }
    keys(object).forEach(function (key) {
        if (!object[key]) {
            result = false;
            return;
        }
    });
    return result;
};
// export default { keys, values, map, filter, some, every };
module.exports = {
    keys: keys,
    values: values,
    map: map,
    filter: filter,
    some: some,
    every: every,
};
