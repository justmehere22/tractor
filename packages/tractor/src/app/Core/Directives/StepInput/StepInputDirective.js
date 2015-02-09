'use strict';

// Utilities
var _ = require('lodash');
var fs = require('fs');
var Promise = require('bluebird');

// Dependencies:
var camelcase = require('change-case').camel;

// Module:
var Core = require('../../Core');

// Dependencies:
require('../../Services/ValidationService');
require('../../../features/GherkinEditor/Models/StepDeclarationModel');

var StepInputDirective = function (ValidationService, StepDeclarationModel) {
    return {
        restrict: 'E',

        scope: {
            model: '=',
            label: '@'
        },

        /* eslint-disable no-path-concat */
        template: fs.readFileSync(__dirname + '/../TextInput/TextInput.html', 'utf8'),
        /* eslint-enable no-path-concat */

        link: link
    };

    function link ($scope) {
        if (_.isUndefined($scope.model)) {
            throw new Error('The "tractor-step-input" directive requires a "model" attribute.');
        }

        if (_.isUndefined($scope.label)) {
            throw new Error('The "tractor-step-input" directive requires a "label" attribute.');
        }

        $scope.$watch('model', function () {
            $scope.property = camelcase($scope.label);
            $scope.blur = _.partial(validateExampleVariableNames, $scope);
        });
    }

    function validateExampleVariableNames ($scope, value) {
        var variableNames = StepDeclarationModel.getExampleVariableNames(value);
        var validations = _.map(variableNames, function (variableName) {
            return ValidationService.validateVariableName(variableName);
        });

        Promise.all(validations)
        .then(function () {
            $scope.model.setValidValue($scope.property, value);
        });
    }
};

Core.directive('tractorStepInput', StepInputDirective);
