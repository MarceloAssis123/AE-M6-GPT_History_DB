import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';

describe('StoryController (e2e)', () => {
    let app: INestApplication

    let StoryId: { id: string}

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Create', () => {
        it('(Sucesso) deve retornar a História', async () => {
            const newStory = { email: 'test@example.com', content: 'Texto teste' };

            const testeSucesso = await request(app.getHttpServer())
                .post('/story/new')
                .send(newStory)
                .then((response) => {
                    StoryId = { id: response.body._id }
                    expect(response.body).toEqual(expect.objectContaining({
                        _id: expect.any(String),
                        __v: expect.any(Number),
                        email: 'test@example.com',
                        content: 'Texto teste'
                    }));
                })
            return testeSucesso
        });
    });

    describe('Read', () => {
        it('(Sucesso) deve retornar a História com esse id', async () => {

            const testeSucesso = await request(app.getHttpServer())
                .get('/story/find')
                .send(StoryId)
                .then((response) => {
                    expect(response.body).toEqual(expect.objectContaining({
                        _id: expect.any(String),
                        __v: expect.any(Number),
                        email: 'test@example.com',
                        content: 'Texto teste'
                    }));
                })
            return testeSucesso
        });
    });

    describe('Update', () => {
        it('(Sucesso) deve retornar a História Atualizada', async () => {
            const updateStory = { id: StoryId.id, email: 'test@example.com', content: 'Texto Atualizado' };

            const testeSucesso = await request(app.getHttpServer())
                .post('/story/update')
                .send(updateStory)
                .then((response) => {
                    expect(response.body).toEqual(expect.objectContaining({
                        _id: expect.any(String),
                        __v: expect.any(Number),
                        email: 'test@example.com',
                        content: 'Texto Atualizado'
                    }));
                })
            return testeSucesso
        });
    });

    describe('Delete', () => {
        it('(Sucesso) Deve retornar uma confirmação de exclusão', async () => {

            const testeSucesso = await request(app.getHttpServer())
                .post('/story/delete')
                .send(StoryId)
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