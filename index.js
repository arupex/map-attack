/**
 * Created by daniel.irwin on 6/24/16.
 */

function arupex_map_attack(mapOrArray, key, asArrayValue){

    if(typeof arupex_deep_value == 'undefined' && typeof require !== 'undefined'){
        arupex_deep_value = require('deep-value');
    }

    if(typeof arupex_deep_setter == 'undefined' && typeof require !== 'undefined'){
        arupex_deep_setter = require('deep-setter');
    }

    function convertArrayToMap(array, key){
        var result = {};

        array.forEach(function(element){
            if(asArrayValue) {
                if(!result[arupex_deep_value(element, key)]){
                    result[arupex_deep_value(element, key)] = [];
                }
                result[arupex_deep_value(element, key)].push(element);
            }
            else {
                result[arupex_deep_value(element, key)] = element;
            }
        });

        return result;
    }

    function convertMapToArray(map, key){
        var result = [];

        Object.keys(map).forEach(function(id){
            result.push(arupex_deep_setter(map[id], key, id));
        });

        return result;
    }


    if(mapOrArray && typeof mapOrArray === 'object') {
        if(Array.isArray(mapOrArray)){
            return convertArrayToMap(mapOrArray, key);
        }
        else {
            return convertMapToArray(mapOrArray, key);
        }
    }
    return mapOrArray;
}


if(typeof module !== 'undefined'){
    module.exports = arupex_map_attack;
}