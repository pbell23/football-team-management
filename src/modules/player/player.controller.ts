import { Request, Response } from 'express';

import { IPlayerService } from './player.interface.js';

export class PlayerController {
    constructor(private playerService: IPlayerService) { }

    async createPlayer(req: Request, res: Response) {
        const player = await this.playerService.createPlayer(req.body);
        res.status(201).json(player);

    }

    async getPlayer(req: Request, res: Response) {
        const player = await this.playerService.getPlayerById(req.params.id);
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: 'Player not found' });
        }

    }

    async getPlayers(req: Request, res: Response) {
        const players = await this.playerService.getPlayers();
        if (players) {
            res.json(players);
        } else {
            res.status(404).json({ message: 'Players not found' });
        }
    }

    async updatePlayer(req: Request, res: Response) {
        const { id } = req.params;
        const playerData = req.body;

        const updatedPlayer = await this.playerService.updatePlayer(id, playerData);
        if (updatedPlayer) {
            res.status(204).send()
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    }

    async deletePlayer(req: Request, res: Response) {
        const { id } = req.params;

        const deletedPlayer = await this.playerService.deletePlayer(id);

        if (deletedPlayer) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    }
}
