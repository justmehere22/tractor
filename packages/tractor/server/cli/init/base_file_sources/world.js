/*global browser:true, protractor:true, By:true, expect:true, Promise:true */
'use strict';

var CustomWorld = (function () {
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');

    var CustomWorld = function CustomWorld () {
        browser = protractor = require('protractor').getInstance();
        By = protractor.By;
        chai.use(chaiAsPromised);
        expect = chai.expect;
        Promise = require('bluebird');
    };

    return CustomWorld;
})();

module.exports = function () {
    this.World = function (callback) {
        var w = new CustomWorld();
        return callback(w);
    };
    return this.World;
};
