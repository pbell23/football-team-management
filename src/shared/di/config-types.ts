import { IPlayerRepository } from '../../modules/player/player.interface.js';
import { IPlayerService } from '../../modules/player/player.interface.js';
import { PlayerController } from '../../modules/player/player.controller.js';

export interface IConfigTypes {
    playerRepository: IPlayerRepository;
    playerService: IPlayerService;
    playerController: PlayerController;
}
