import { createApp } from './create-app.js';
import dotenv from 'dotenv';
import loadConfig from './shared/di/config-loader.js';
import { logger } from './shared/logger.js';

dotenv.config();

async function startServer() {
    const env = process.env.NODE_ENV || 'development';
    const envConfig = await loadConfig(env);

    const app = createApp(envConfig);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
}

startServer().catch(error => {
    logger.error('Failed to start server:', error);
});
