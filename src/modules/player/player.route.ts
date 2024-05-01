import DIContainer from '../../shared/di/di-container.js';
import { PlayerController } from './player.controller.js';
import { Router } from 'express';
import { catchAsync } from '../../shared/catch-async.middleware.js';

const router = Router();

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            playerController: PlayerController
        }
    }
}

router.use((req, res, next) => {
    const playerController = DIContainer.resolve<PlayerController>('playerController');

    req.playerController = playerController;
    next();
});

router.post('/', catchAsync((req, res) => req.playerController.createPlayer(req, res)));
router.get('/', catchAsync((req, res) => req.playerController.getPlayers(req, res)));
router.get('/:id', catchAsync((req, res) => req.playerController.getPlayer(req, res)));
router.put('/:id', catchAsync((req, res) => req.playerController.updatePlayer(req, res)));
router.delete('/:id', catchAsync((req, res) => req.playerController.deletePlayer(req, res)));

export { router as playerRouter }