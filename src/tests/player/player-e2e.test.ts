import { IPlayer } from '../../modules/player/player.interface.js';
import { createApp } from '../../create-app.js';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import testingConfig from '../../shared/di/testing-config.js';

describe('Player E2E Tests', () => {
    const app = createApp(testingConfig);
    let createdPlayer: IPlayer;
    let token: string;

    describe('POST /players', () => {

        beforeAll(async () => {
            await request(app)
                .post('/api/v1/auth/register')
                .send({
                    username: 'TestUser34',
                    password: 'password123'
                })

            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    username: 'TestUser34',
                    password: 'password123'
                });

            const loginData = res.body;
            token = loginData.token;
        })

        it('should create a new player when provided valid data', async () => {
            const playerData = {
                name: faker.person.fullName(),
                shirtNumber: faker.number.int({ min: 1, max: 99 }),
                position: faker.helpers.arrayElement(['Goalkeeper', 'Defender', 'Midfielder', 'Forward'])
            };

            const res = await request(app)
                .post('/api/v1/players')
                .send(playerData)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.name).toEqual(playerData.name);
            createdPlayer = res.body;
        });

        it('should return 400 if trying to create player with wrong data', async () => {
            const res = await request(app)
                .post('/api/v1/players')
                .send({
                    // missing required name
                })
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(400);
        });
    });

    describe('GET /players', () => {

        it('should return an array of players', async () => {
            const response = await request(app).get('/api/v1/players').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });
    });

    describe('GET /players/:id', () => {

        it('should get an existing player', async () => {
            const res = await request(app).get(`/api/v1/players/${createdPlayer.id}`).set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(createdPlayer.name);
        });

        it('should return 404 if player not found', async () => {
            const res = await request(app).get('/api/v1/players/123abc').set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(404);
        });

    });

    describe('PUT /players/:id', () => {
        it('should update player details', async () => {
            const updates = {
                name: faker.person.fullName(),
                shirtNumber: faker.number.int({ min: 1, max: 99 }),
                position: faker.helpers.arrayElement(['Goalkeeper', 'Defender', 'Midfielder', 'Forward'])
            };
            const response = await request(app).put(`/api/v1/players/${createdPlayer.id}`).send(updates).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(204);
        });
    });

    describe('DELETE /players/:id', () => {
        it('should delete a player', async () => {
            const response = await request(app).delete(`/api/v1/players/${createdPlayer.id}`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(204);
        });

        it('should return a 404 error when trying to delete a non-existent player', async () => {
            const response = await request(app).delete('/api/v1/players/999999').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(404);
        });
    });
});
