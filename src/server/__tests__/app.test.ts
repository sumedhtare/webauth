import request from 'supertest';
import app from '../index';
import { encrypt } from '../../utils/aes';

describe('User Registration and Login', () => {
  let authToken: string;
  const password = encrypt('testpassword');

  it('should register a new user', async () => {
    const response = await request(app).post('/api/register').send({
      username: 'testuser',
      password: password
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login with valid credentials', async () => {
    const response = await request(app).post('/api/login').send({
      username: 'testuser',
      password: password
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    authToken = response.body.token;
  });

  it('should access a protected route with a valid token', async () => {
    const response = await request(app)
      .get('/api/logged-in-users')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });

  it('should not access a protected route without a token', async () => {
    const response = await request(app).get('/api/users/1');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Access denied. Missing token');
  });

  it('should not access a protected route with an expired token', async () => {
    const expiredToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NTk3OTk5OCwiZXhwIjoxNjg1OTgzNTk4fQ.uHLX-5cNDIqLeMu8qPOHPdprYmsRN1-HBFM2bHuaAWI';

    const response = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${expiredToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });

  it('should logout and revoke the token', async () => {
    const response = await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Logged out successfully');

    const protectedResponse = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${authToken}`);

    expect(protectedResponse.status).toBe(401);
    expect(protectedResponse.body).toHaveProperty('message', 'Token has been revoked');
  });
});
