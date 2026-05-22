import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;
  let createdUserId: string;
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = 'password123';
  const testUsername = 'testuser';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/signup (POST) - Create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: testEmail,
        password: testPassword,
        username: testUsername,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(testEmail);
    expect(response.body.username).toBe(testUsername);
    createdUserId = response.body.id;
  });

  it('/users/signup (POST) - Fail to create duplicate user', async () => {
    await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: testEmail,
        password: testPassword,
        username: testUsername,
      })
      .expect(409);
  });

  it('/users (GET) - Get all users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    const user = response.body.find((u: any) => u.id === createdUserId);
    expect(user).toBeDefined();
    expect(user.email).toBe(testEmail);
  });

  it('/users/:id (GET) - Get a single user by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .expect(200);

    expect(response.body.id).toBe(createdUserId);
    expect(response.body.email).toBe(testEmail);
  });

  it('/users/:id (PATCH) - Update user details', async () => {
    const newUsername = 'updateduser';
    const response = await request(app.getHttpServer())
      .patch(`/users/${createdUserId}`)
      .send({
        username: newUsername,
      })
      .expect(200);

    expect(response.body.username).toBe(newUsername);
  });

  it('/users/:id (DELETE) - Delete user', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .expect(200);

    // Verify the user is deleted (findUnique returns null, mapping to 200 empty/null body in NestJS)
    const response = await request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .expect(200);
    
    expect(response.body).toEqual({});
  });

  afterAll(async () => {
    await app.close();
  });
});
