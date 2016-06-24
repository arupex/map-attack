# map-attack
Turns Maps into Arrays, Turns Arrays into Maps

[![npm version](https://badge.fury.io/js/map-attack.svg)](https://badge.fury.io/js/map-attack) [![dependencies](https://david-dm.org/arupex/map-attack.svg)](http://github.com/arupex/map-attack) ![Build Status](https://api.travis-ci.org/arupex/map-attack.svg?branch=master) <a href='https://pledgie.com/campaigns/31873'><img alt='Pledge To Arupex!' src='https://pledgie.com/campaigns/31873.png?skin_name=chrome' border='0' ></a>

#Install

    npm install map-attack --save

#Usage

var mapAttack = require('map-attack');

mapAttack( Map||Array, indexByString)

#Converting Array to Map

        mapAttack([
            {
                id : '1',
                value : 'hello'
            },
            {
                id : '2',
                value : 'world'
            },
            {
                id : '3',
                value : '!'
            }
        ],'id');

Result :

        //Results in a Map indexed by your second parameter
        {
             1 : {
                 id : '1',
                 value : 'hello'
             },
             2 : {
                 id : '2',
                 value : 'world'
             },
             3 : {
                 id : '3',
                 value : '!'
             }
         }


#Converting Map to Array

        mapAttack({
               1 : {
                   value : 'hello'
               },
               2 : {
                   value : 'world'
               },
               3 : {
                   value : '!'
               }
           }, 'id')

Result :

        //Results in a Array with ids by your second parameter
           [
                {
                    id : '1',
                    value : 'hello'
                },
                {
                    id : '2',
                    value : 'world'
                },
                {
                    id : '3',
                    value : '!'
                }
            ]

#Notes:

    This library uses
        deep-setter
        deep-value
        So any syntax those accept for setting/getting values from objects you can use for your index by parameter