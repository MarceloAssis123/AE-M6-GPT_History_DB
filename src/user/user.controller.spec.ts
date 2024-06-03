import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Create', () => {
        it('(Sucesso) deve retornar o usuário', async () => {
            const newUser = { email: 'test@example.com', name: 'Test User', age: 25 };

            const testeSucesso = await request(app.getHttpServer())
                .post('/user/new')
                .send(newUser)
                .then((response) => {
                    expect(response.body).toEqual(expect.objectContaining({
                        _id: expect.any(String),
                        __v: expect.any(Number),
                        email: 'test@example.com',
                        name: 'Test User',
                        age: 25
                    }));
                })
            return testeSucesso
        });
    });

    describe('Read', () => {
        it('(Sucesso) deve retornar o usuário com esse email', async () => {
            const newUser = { email: 'test@example.com' };

            const testeSucesso = await request(app.getHttpServer())
                .get('/user/find')
                .send(newUser)
                .then((response) => {
                    expect(response.body).toEqual(expect.objectContaining({
                        _id: expect.any(String),
                        __v: expect.any(Number),
                        email: 'test@example.com',
                        name: 'Test User',
                        age: 25
                    }));
                })
            return testeSucesso
        });
    });

    describe('Update', () => {
        it('(Sucesso) deve retornar o usuário Atualizado', async () => {
            const newUser = { email: 'test@example.com', name: 'Update User', age: 19 };

            const testeSucesso = await request(app.getHttpServer())
                .post('/user/update')
                .send(newUser)
                .then((response) => {
                    expect(response.body).toEqual(expect.objectContaining({
                        _id: expect.any(String),
                        __v: expect.any(Number),
                        email: 'test@example.com',
                        name: 'Update User',
                        age: 19
                    }));
                })
            return testeSucesso
        });
    });

    describe('Delete', () => {
        it('(Sucesso) Deve retornar uma confirmação de exclusão', async () => {
            const User = { email: 'test@example.com' };

            const testeSucesso = await request(app.getHttpServer())
                .post('/user/delete')
                .send(User)
                .then((response) => {
                    expect(response.body).toEqual({"deleted": true});
                })
            return testeSucesso
        });
    });




    afterAll(async () => {
        await app.close();
    });
});