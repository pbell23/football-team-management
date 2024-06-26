import { IConfigTypes } from './config-types.js';

async function loadConfig(env: string): Promise<IConfigTypes> {
    switch (env) {
        case 'development':
            return import('./development-config.js').then(config => config.default);
        case 'testing':
            return import('./testing-config.js').then(config => config.default);
        default:
            throw new Error(`Unknown environment: ${env}`);
    }
}

export default loadConfig;
