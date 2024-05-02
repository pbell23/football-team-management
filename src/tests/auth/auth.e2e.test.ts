import { IRegisterDTO } from '../../modules/auth/interface/user-dto.interface.js';
import { createApp } from '../../create-app.js';
import request from 'supertest';
import testingConfig from '../../shared/di/testing-config.js';

describe('Auth E2E Tests', () => {
    const app = createApp(testingConfig);

    describe('register', () => {
        it('should create a new user', async () => {
            const user: IRegisterDTO = {
                username: 'JohnDoe',
                password: 'password123'
            }
            const res = await request(app).post('/api/v1/auth/register').send(user).expect(201);

            expect(res.body).toEqual({
                id: expect.any(String),
                username: 'JohnDoe',
                role: 'user'
            });
        })
    })

    describe('login', () => {
        it('should return 400 if email is missing', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    password: 'password123',
                })
                .expect(400);

            expect(res.body.message).toEqual('"username" is required');
        });

        it('should return 400 if password is missing', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    username: 'test@example.com',
                })
                .expect(400);

            expect(res.body.message).toEqual('"password" is required');
        });

        it('should return 401 if credentials are invalid', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    username: 'JohnDoe',
                    password: 'invalidpassword',
                })
                .expect(401);

            expect(res.body.error.message).toEqual('Invalid credentials');
        });

        it('should return 200 and JWT token if credentials are valid', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    username: 'JohnDoe',
                    password: 'password123',
                })
                .expect(200);

            expect(res.body).toHaveProperty('token');
        });
    });
})