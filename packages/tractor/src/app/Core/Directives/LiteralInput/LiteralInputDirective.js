'use strict';

// Utilities:
var _ = require('lodash');
var fs = require('fs');

// Module:
var Core = require('../../Core');

var LiteralInputDirective = function () {
    return {
        restrict: 'E',

        scope: {
            model: '=',
            name: '=',
            description: '=',
            required: '=',
            type: '='
        },

        /* eslint-disable no-path-concat */
        template: fs.readFileSync(__dirname + '/LiteralInput.html', 'utf8'),
        /* eslint-enable no-path-concat */

        link: link
    };

    function link ($scope) {
        if (_.isUndefined($scope.model)) {
            throw new Error('The "tractor-literal-input" directive requires a "model" attribute.');
        }

        if (_.isUndefined($scope.name)) {
            throw new Error('The "tractor-literal-input" directive requires a "name" attribute.');
        }
    }
};

Core.directive('tractorLiteralInput', LiteralInputDirective);
