/**
 * Created by daniel.irwin on 6/24/16.
 */

describe('map-attack', function () {

    var mapAttack = require('../index');

    var assert = require('assert-diff').deepEqual;


    it('array2map', function () {
        assert(mapAttack([
                {
                    id: '1',
                    value: 'hello'
                },
                {
                    id: '2',
                    value: 'world'
                },
                {
                    id: '3',
                    value: '!'
                }
            ], 'id'),
            {
                1: {
                    id: '1',
                    value: 'hello'
                },
                2: {
                    id: '2',
                    value: 'world'
                },
                3: {
                    id: '3',
                    value: '!'
                }
            });
    });


    it('map2array', function () {
        assert(mapAttack({
            1: {
                id: '1',
                value: 'hello'
            },
            2: {
                value: 'world'
            },
            3: {
                value: '!'
            }
        }, 'id'), [
            {
                id: '1',
                value: 'hello'
            },
            {
                id: '2',
                value: 'world'
            },
            {
                id: '3',
                value: '!'
            }
        ]);
    });

    //These are probably unnecessary

    it('map2array2map', function () {
        assert(mapAttack(mapAttack({
            1: {
                value: 'hello'
            },
            2: {
                value: 'world'
            },
            3: {
                value: '!'
            }
        }, 'id'), 'id'), {
            1: {
                id: '1',
                value: 'hello'
            },
            2: {
                id: '2',
                value: 'world'
            },
            3: {
                id: '3',
                value: '!'
            }
        });
    });

    it('array2map2array', function () {
        assert(mapAttack(mapAttack([
            {
                id: '1',
                value: 'hello'
            },
            {
                id: '2',
                value: 'world'
            },
            {
                id: '3',
                value: '!'
            }
        ], 'id'), 'id'), [
            {
                id: '1',
                value: 'hello'
            },
            {
                id: '2',
                value: 'world'
            },
            {
                id: '3',
                value: '!'
            }
        ]);
    });


    //turn array to a map of arrays

    it('array to map of arrays', function () {
        assert(mapAttack([
            {
                id: '1',
                value: 'hello'
            },
            {
                id: '2',
                value: 'world'
            },
            {
                id: '3',
                value: '!'
            },
            {
                id: '3',
                value: 'geez'
            }
        ], 'id', true), {
            '1': [{
                id: '1',
                value: 'hello'
            }],
            '2': [{
                id: '2',
                value: 'world'
            }],
            '3': [
                {
                    id: '3',
                    value: '!'
                },
                {
                    id: '3',
                    value: 'geez'
                }
            ]
        });
    });


    it('array to map of arrays using bucket function', function () {
        assert(mapAttack([
            {
                id: '1',
                value: 'hello'
            },
            {
                id: '2',
                value: 'world'
            },
            {
                id: '3',
                value: '!'
            },
            {
                id: '3',
                value: 'geez'
            }
        ], function (obj) {
            if (parseInt(obj.id) > 2) {
                return 'gt2';
            }
            return 'lte2';
        }, true), {
            'lte2': [{
                id: '1',
                value: 'hello'
            },
                {
                    id: '2',
                    value: 'world'
                }],
            'gt2': [{
                id: '3',
                value: '!'
            },
                {
                    id: '3',
                    value: 'geez'
                }]
        });
    });


    it('map to arrays using bucket function hw', function () {
        assert(mapAttack({
            1: {msg: 'hello'},
            2: {msg: 'world'},
            3: {msg: '!'}
        }, function (obj) {
            return obj.msg;
        }, true), [
            {
                msg: 'hello',
                hello: '1'
            },
            {
                msg: 'world',
                world: '2'
            },
            {
                msg: '!',
                '!': '3'
            }
        ]);
    });

});