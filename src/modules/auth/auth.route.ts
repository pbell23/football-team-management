import { AuthController } from './auth.controller.js';
import DIContainer from '../../shared/di/di-container.js';
import { Router } from 'express';
import { catchAsync } from '../../shared/catch-async.middleware.js';

const router = Router();

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            authController: AuthController
        }
    }
}

router.use((req, res, next) => {
    const authController = DIContainer.resolve<AuthController>('authController');

    req.authController = authController;
    next();
});

router.post('/register', catchAsync((req, res) => req.authController.register(req, res)));
router.post('/login', catchAsync((req, res) => req.authController.login(req, res)));

export { router as authRouter }