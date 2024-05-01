import { NextFunction, Request, Response } from 'express';

/**
 * Higher-order function to catch errors from async route handlers and pass them to the next error handler.
 * @param fn The async function to wrap.
 * @returns A function that executes the wrapped function and catches any errors.
 */
export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction): any => {
        fn(req, res, next).catch(next);
    };
};
