'use strict';

// Angular:
var angular = require('angular');
require('angular-mocks');

// Testing:
var ActionDirective;

describe('ActionDirective.js:', function() {
    var $compile;
    var $rootScope;

    beforeEach(function () {
        ActionDirective = require('./ActionDirective');
    });

    beforeEach(angular.mock.module('Core'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    var compileDirective = function (template, scope) {
        var directive = $compile(template)(scope);
        scope.$digest();
        return directive;
    };

    describe('Link function:', function () {
        it('should throw an error when `action` is not passed in:', function () {
            expect(function () {
                var scope = $rootScope.$new();
                var directive = compileDirective('<tractor-action></tractor-action>', scope);
            }).to.throw('The "tractor-action" directive requires an "action" attribute.');
        });

        it('should throw an error when `model` is not passed in:', function () {
            expect(function () {
                var scope = $rootScope.$new();
                var directive = compileDirective('<tractor-action action="Some action"></tractor-action>', scope);
            }).to.throw('The "tractor-action" directive requires a "model" attribute.');
        });

        it('should convert the "action" attribute into a camel-cased "method":', function () {
            var scope = $rootScope.$new();
            scope.model = {};
            var directive = compileDirective('<tractor-action model="model" action="Some Action"></tractor-action>', scope);
            expect(directive.isolateScope().method).to.equal('someAction');
        });
    });
});
