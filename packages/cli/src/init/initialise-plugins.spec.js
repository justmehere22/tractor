// Test setup:
import { expect, ineeda, NOOP, sinon } from '@tractor/unit-test';

// Dependencies:
import * as tractorLogger from '@tractor/logger';

// Under test:
import { initialisePlugins } from './initialise-plugins';

describe('tractor - initialise-plugins:', () => {
    it('should initialise all the installed plugins', async () => {
        let di = ineeda({
            call: () => Promise.resolve()
        });
        let plugin = ineeda({
            init: NOOP
        });
        let plugins = [plugin];

        await initialisePlugins(di, plugins);
        expect(di.call).to.have.been.calledWith(plugin.init);
    });

    it('should tell the user what it is doing', async () => {
        let di = ineeda({
            call: () => Promise.resolve()
        });
        let plugin = ineeda({
            init: () => {},
            name: 'test-plugin'
        });
        let plugins = [plugin];

        sinon.stub(tractorLogger, 'info');

        try {
            await initialisePlugins(di, plugins);
            expect(tractorLogger.info).to.have.been.calledWith('Initialising tractor-plugin-test-plugin...');
        } finally {
            tractorLogger.info.restore();
        }
    });
});
