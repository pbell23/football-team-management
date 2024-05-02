import { IConfigTypes } from './config-types.js';
import { InMemoryPlayerRepository } from '../../modules/player/in-memory-player.repository.js';
import { PlayerController } from '../../modules/player/player.controller.js';
import { PlayerService } from '../../modules/player/player.service.js';

const developmentConfig: IConfigTypes = {
    playerRepository: new InMemoryPlayerRepository(),
    playerService: new PlayerService(new InMemoryPlayerRepository()),
    playerController: new PlayerController(new PlayerService(new InMemoryPlayerRepository())),
};

export default developmentConfig;
