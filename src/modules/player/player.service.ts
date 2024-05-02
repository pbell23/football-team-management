import { IPlayer, IPlayerRepository } from './player.interface.js';

export class PlayerService {
    constructor(private playerRepository: IPlayerRepository) { }

    async createPlayer(playerData: any): Promise<IPlayer> {
        return this.playerRepository.create(playerData);
    }

    async getPlayerById(playerId: string): Promise<IPlayer | null> {
        return this.playerRepository.findById(playerId);
    }

    async getPlayers(): Promise<IPlayer[] | null> {
        return this.playerRepository.findAll();
    }

    async updatePlayer(playerId: string, playerData: any): Promise<IPlayer | null> {
        return this.playerRepository.update(playerId, playerData);
    }

    async deletePlayer(playerId: string): Promise<IPlayer | null> {
        return this.playerRepository.delete(playerId);
    }
}
