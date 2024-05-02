import express from 'express';
import { playerRouter } from './modules/player/player.route.js';

const router = express.Router();

router.use('/players', playerRouter);

export { router as v1Router };