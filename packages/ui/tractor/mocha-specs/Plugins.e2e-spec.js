/*{"name":"Plugins","tests":[{"name":"Load plugins"}],"version":"0.1.0"}*/
describe('Plugins', function () {
    it('Load plugins', function () {
        var Tractor = require('../../src/app/tractor.po.js'), tractor = new Tractor();
        var ControlPanel = require('../../src/app/features/ControlPanel/control-panel.po.js'), controlPanel = new ControlPanel();
        var step = Promise.resolve();
        step = step.then(function () {
            var element;
            element = tractor;
            return element.goHome();
        });
        step = step.then(function () {
            var element;
            element = controlPanel;
            return expect(element.pluginIsLoaded('Mocha Specs')).to.eventually.equal(true);
        });
        return step;
    });
});