import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { logger } from '../logger.js';

export const errorMiddleware: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error: ${err.message}`, { stack: err.stack, path: req.path });

    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;
    const errorMessage = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;

    res.status(statusCode).json({
        error: {
            message: errorMessage,
            status: statusCode,
        }
    });
};