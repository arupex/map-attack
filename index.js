/**
 * Created by daniel.irwin on 6/24/16.
 */

'use strict';

if (typeof arupex_deep_value === 'undefined' && typeof require !== 'undefined') {
    global.arupex_deep_value = require('deep-value');
}

if (typeof arupex_deep_setter === 'undefined' && typeof require !== 'undefined') {
    global.arupex_deep_setter = require('deep-setter');
}

function arupex_map_attack(mapOrArray, key, asArrayValue) {
    let fncKey = (typeof key === 'function');

    let complex = !fncKey && typeof key === 'string' && (key.indexOf('.') !== -1);
    let accessor = function (element, skey) {
        return element[skey];
    };
    let setter = function (element, key, value) {
        element[key] = value;
        return element;
    };

    if (complex) {
        accessor = arupex_deep_value;
        setter = arupex_deep_setter;
    }

    if (mapOrArray && typeof mapOrArray === 'object') {

        if (Array.isArray(mapOrArray)) {
            let result = {};
            mapOrArray.forEach(function (element) {
                let keyRef = fncKey ? key(element) : accessor(element, key);
                if (asArrayValue) {
                    if (!result[keyRef]) {
                        result[keyRef] = [];
                    }
                    result[keyRef].push(element);
                }
                else {
                    result[keyRef] = element;
                }
            });
            return result;
        }

        return Object.keys(mapOrArray).map(function (id) {
            return setter(mapOrArray[id], fncKey ? key(mapOrArray[id]) : key, id);
        });

    }
    return mapOrArray;
}


if (typeof module !== 'undefined') {
    module.exports = arupex_map_attack;
}