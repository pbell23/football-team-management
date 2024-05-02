export interface IPlayer {
    id: string;
    name: string;
    position: string;
    shirtNumber: number;
}

export interface IPlayerService {
    createPlayer(playerData: any): Promise<IPlayer>;
    updatePlayer(playerId: string, playerData: any): Promise<IPlayer | null>;
    getPlayerById(playerId: string): Promise<IPlayer | null>;
    getPlayers(): Promise<IPlayer[] | null>;
    deletePlayer(playerId: string): Promise<IPlayer | null>;
}

export interface IPlayerRepository {
    create(playerData: any): Promise<IPlayer>;
    update(playerId: string, playerData: any): Promise<IPlayer | null>;
    delete(playerId: string): Promise<IPlayer | null>;
    findById(playerId: string): Promise<IPlayer | null>;
    findAll(): Promise<IPlayer[] | null>;
}

export interface ICreatePlayerDto {
    name: string;
    position: string;
    shirtNumber: number;
}

export interface IUpdatePlayerDto {
    name: string;
    position: string;
    shirtNumber: number;
}