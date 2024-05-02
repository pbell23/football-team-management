import { ICreatePlayerDto, IPlayer, IPlayerRepository } from './player.interface.js';

const playersDB: IPlayer[] = [];

export class InMemoryPlayerRepository implements IPlayerRepository {
    async create(playerInput: ICreatePlayerDto): Promise<IPlayer> {
        const newPlayer: IPlayer = {
            id: new Date().valueOf().toString(),  // simple ID generation
            ...playerInput
        };
        playersDB.push(newPlayer);
        return newPlayer;
    }

    async update(playerId: string, playerInput: any): Promise<IPlayer | null> {
        const playerIndex = playersDB.findIndex(player => player.id === playerId);
        if (playerIndex === -1) return null;

        const updatedPlayer = { ...playersDB[playerIndex], ...playerInput };
        playersDB[playerIndex] = updatedPlayer;
        return updatedPlayer;
    }

    async delete(playerId: string): Promise<IPlayer | null> {
        const playerIndex = playersDB.findIndex(player => player.id === playerId);
        if (playerIndex === -1) return null;

        const [deletedPlayer] = playersDB.splice(playerIndex, 1);
        return deletedPlayer;
    }

    async findById(playerId: string): Promise<IPlayer | null> {
        return playersDB.find(player => player.id === playerId) || null;
    }

    async findAll(): Promise<IPlayer[] | null> {
        return playersDB;
    }
}
