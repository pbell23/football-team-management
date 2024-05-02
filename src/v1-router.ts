import { authRouter } from './modules/auth/auth.route.js';
import express from 'express';
import { playerRouter } from './modules/player/player.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/players', playerRouter);

export { router as v1Router };