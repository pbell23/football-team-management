import { AuthController } from '../../modules/auth/auth.controller.js';
import { IPlayerRepository } from '../../modules/player/player.interface.js';
import { IPlayerService } from '../../modules/player/player.interface.js';
import { IUserRepository } from '../../modules/auth/interface/user-repository.interface.js';
import { IUserService } from '../../modules/auth/interface/user-service.interface.js';
import { PlayerController } from '../../modules/player/player.controller.js';

export interface IConfigTypes {
    playerRepository: IPlayerRepository;
    playerService: IPlayerService;
    playerController: PlayerController;
    userRepository: IUserRepository;
    userService: IUserService;
    authController: AuthController;
}
