import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';
import * as supertest from 'supertest';
import { UserEntity } from './entities/user.entity';
import { user } from './mocks/create-user.mock';
import { UserModule } from './user.module';

const prismaClient: PrismaClient = new PrismaClient();
let app: INestApplication;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      UserModule,
      PrismaModule,
    ],
  }).compile();
  app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('POST /users', () => {
  beforeEach(async () => {
    await prismaClient.user.deleteMany();
  });

  it('should fail if email is not provided', async () => {
    await supertest
      .agent(app.getHttpServer())
      .post('/user')
      .send({ name: 'john' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should fail if user already exists', async () => {
    await prismaClient.user.create({
      data: { email: 'test@example.com' },
    });
    await supertest
      .agent(app.getHttpServer())
      .post('/user')
      .send({ email: 'test@example.com' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .on('response', (response: Response) => console.log(response.body))
      .expect(403);
  });

  it('should return user and token', async () => {
    const response = await supertest
      .agent(app.getHttpServer())
      .post('/user')
      .send({ email: 'test@example.com' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .on('response', (response: Response) => console.log(response.body))
      .expect(201);

    expect(response.body.token).toBeDefined();
    delete response.body.user.id;
    const userWoId: Partial<UserEntity> = { ...user };
    delete userWoId.id;
    expect(response.body.user).toEqual(userWoId);
  });
});
