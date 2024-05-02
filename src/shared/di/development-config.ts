import { AuthController } from '../../modules/auth/auth.controller.js';
import { IConfigTypes } from './config-types.js';
import { InMemoryPlayerRepository } from '../../modules/player/in-memory-player.repository.js';
import { InMemoryUserRepository } from '../../modules/auth/in-memory-user.repository.js';
import { PasswordService } from '../../modules/auth/password.service.js';
import { PlayerController } from '../../modules/player/player.controller.js';
import { PlayerService } from '../../modules/player/player.service.js';
import { UserService } from '../../modules/auth/user.service.js';

const developmentConfig: IConfigTypes = {
    playerRepository: new InMemoryPlayerRepository(),
    playerService: new PlayerService(new InMemoryPlayerRepository()),
    playerController: new PlayerController(new PlayerService(new InMemoryPlayerRepository())),
    userRepository: new InMemoryUserRepository(),
    userService: new UserService(new InMemoryUserRepository(), new PasswordService()),
    authController: new AuthController(new UserService(new InMemoryUserRepository(), new PasswordService())),
};

export default developmentConfig;

