import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import * as supertest from 'supertest';
import { UserModule } from './user.module';

let app: INestApplication;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [UserModule, PrismaModule],
  }).compile();
  app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('POST /users', () => {
  it('should fail if email is not provided', async () => {
    await supertest
      .agent(app.getHttpServer())
      .post('/user')
      .send({ name: 'john' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should return user and token', async () => {
    const result = await supertest
      .agent(app.getHttpServer())
      .post('/user')
      .send({ email: 'test@example.com' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    console.log({ result });
  });
});
