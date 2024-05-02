import express, { NextFunction, Request, Response } from 'express';

import DIContainer from './shared/di/di-container.js';
import { HttpError } from './shared/error/http-error.js';
import { IConfigTypes } from './shared/di/config-types.js';
import { errorMiddleware } from './shared/error/error.middleware.js';
import helmet from 'helmet';
import { v1Router } from './v1-router.js';

function injectDependencies(dependencies: IConfigTypes) {
    DIContainer.register('playerRepository', dependencies.playerRepository);
    DIContainer.register('playerService', dependencies.playerService);
    DIContainer.register('playerController', dependencies.playerController);
}

export function createApp(dependencies: IConfigTypes): express.Application {
    injectDependencies(dependencies)

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet())
    app.use('/api/v1', v1Router)

    app.use((req, res, next) => next(new HttpError('Not Found', 404)));

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => (errorMiddleware(err, req, res, next)));

    return app;
}
