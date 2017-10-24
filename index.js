/**
 * Created by daniel.irwin on 6/24/16.
 */

function arupex_map_attack(mapOrArray, key, asArrayValue){

    if(typeof arupex_deep_value === 'undefined' && typeof require !== 'undefined'){
        arupex_deep_value = require('deep-value');
    }

    if(typeof arupex_deep_setter === 'undefined' && typeof require !== 'undefined'){
        arupex_deep_setter = require('deep-setter');
    }

    function convertArrayToMap(array, key){
        return array.reduce(function(acc, element){
            if(asArrayValue) {
                if(!acc[arupex_deep_value(element, key)]){
                    acc[arupex_deep_value(element, key)] = [];
                }
                acc[arupex_deep_value(element, key)].push(element);
            }
            else {
                acc[arupex_deep_value(element, key)] = element;
            }
            return acc;
        }, {});
    }

    function convertMapToArray(map, key){
        return Object.keys(map).reduce(function(acc, id){
            acc.push(arupex_deep_setter(map[id], key, id));
            return acc;
        }, []);
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