// Test setup:
import { expect, ineeda, NOOP, sinon } from '@tractor/unit-test';

// Dependencies:
import * as tractorLogger from '@tractor/logger';

// Under test:
import { upgradePlugins } from './upgrade-plugins';

describe('tractor - upgrade-plugins:', () => {
    it('should upgrade all the installed plugins', async () => {
        let di = ineeda({
            call: () => Promise.resolve()
        });
        let plugin = ineeda({
            upgrade: NOOP
        });
        let plugins = [plugin];

        sinon.stub(tractorLogger, 'info');

        try {
            await upgradePlugins(di, plugins);
            expect(di.call).to.have.been.calledWith(plugin.upgrade);
        } finally {
            tractorLogger.info.restore();
        }
    });

    it('should tell the user what it is doing', async () => {
        let di = ineeda({
            call: () => Promise.resolve()
        });
        let plugin = ineeda({
            name: 'test-plugin',
            upgrade: NOOP
        });
        let plugins = [plugin];

        sinon.stub(tractorLogger, 'info');

        try {
            await upgradePlugins(di, plugins);
            expect(tractorLogger.info).to.have.been.calledWith('Upgrading tractor-plugin-test-plugin files...');
        } finally {
            tractorLogger.info.restore();
        }
    });
});
