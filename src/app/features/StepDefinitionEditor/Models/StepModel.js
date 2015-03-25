'use strict';

// Utilities;
var _ = require('lodash');

// Module:
var StepDefinitionEditor = require('../StepDefinitionEditor');

// Dependencies:
require('../../../Core/Services/ASTCreatorService');
require('./ExpectationModel');
require('./TaskModel');
require('./MockModel');

var createStepModelConstructor = function (
    ASTCreatorService,
    ExpectationModel,
    TaskModel,
    MockModel
) {
    var StepModel = function StepModel (stepDefinition) {
        var expectations = [];
        var tasks = [];
        var mocks = [];

        Object.defineProperties(this, {
            stepDefinition: {
                get: function () {
                    return stepDefinition;
                }
            },
            expectations: {
                get: function () {
                    return expectations;
                }
            },
            tasks: {
                get: function () {
                    return tasks;
                }
            },
            mocks: {
                get: function () {
                    return mocks;
                }
            },
            ast: {
                get: function () {
                    return toAST.call(this);
                }
            }
        });
    };

    StepModel.prototype.stepTypes = ['Given', 'When', 'Then', 'And', 'But'];

    StepModel.prototype.addExpectation = function () {
        this.expectations.push(new ExpectationModel(this));
    };

    StepModel.prototype.removeExpectation = function (expectation) {
        _.remove(this.expectations, expectation);
    };

    StepModel.prototype.addTask = function () {
        this.tasks.push(new TaskModel(this));
    };

    StepModel.prototype.removeTask = function (task) {
        _.remove(this.tasks, task);
    };

    StepModel.prototype.addMock = function () {
        this.mocks.push(new MockModel(this));
    };

    StepModel.prototype.removeMock = function (mock) {
        _.remove(this.mocks, mock);
    };

    return StepModel;

    function toAST () {
        var ast = ASTCreatorService;

        var expectations = this.expectations.map(function (expectation) {
            return expectation.ast;
        });

        var mocks = this.mocks.map(function (mock) {
            return mock.ast;
        });

        var tasks = this.tasks.map(function (task) {
            return task.ast;
        });

        var template = 'this.<%= type %>(<%= regex %>, function (done) { ';
        if (mocks.length) {
            template += '%= mocks %; ';
        }

        if (tasks.length) {
            template += 'var tasks = <%= tasks[0] %>';
            tasks.slice(1).forEach(function (taskAST, index) {
                template += '.then(function () { return %= tasks[' + (index + 1) + '] %; })';
            });
            template += '; ';
        }

        if (tasks.length) {
            template += 'Promise.all(tasks)';
        }
        if (expectations.length) {
            template += 'Promise.all([%= expectations %])';
        }

        var done = tasks.length || expectations.length || mocks.length ? 'done(); ' : 'done.pending(); ';
        if (tasks.length || expectations.length) {
            template += '.then(function () { ' + done + ' }); ';
        } else {
            template += done;
        }
        template += '}); ';

        return ast.template(template, {
            type: ast.identifier(this.type),
            regex: ast.literal(this.regex),
            mocks: mocks,
            tasks: tasks,
            expectations: expectations
        });
    }
};

StepDefinitionEditor.factory('StepModel', function (
    ASTCreatorService,
    ExpectationModel,
    TaskModel,
    MockModel
) {
    return createStepModelConstructor(ASTCreatorService, ExpectationModel, TaskModel, MockModel);
});
