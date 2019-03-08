// Utilities:
import { info } from '@tractor/logger';

// Dependencies:
import { requirePlugins } from './require-plugins';

// Errors:
import { TractorError } from '@tractor/error-handler';

let loadedPlugins;
export function getPlugins () {
    if (!loadedPlugins) {
        throw new TractorError(`
            You must call \`loadPlugins()\` before you can use \`getPlugins()\`!

            Example:

                import { loadConfig } from '@tractor/config-loader';
                import { loadPlugins } from '@tractor/plugin-loader';

                const config = loadConfig(process.cwd(), './path/to/tractor.config.js');
                const plugins = loadPlugins(config);
        `);
    }
    return loadedPlugins;
}

export function loadPlugins (config) {
    info('Loading plugins...');
    const { cwd, plugins } = config;
    loadedPlugins = requirePlugins(cwd, plugins);
    return loadedPlugins;
}