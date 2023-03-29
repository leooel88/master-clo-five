import request = require('supertest');
import app from '../../microservices/hotels/src/server';

describe('GET /hotels', () => {
  it('should return a list of hotels', async () => {
    const response = await request(app).get('/hotels').set('Authorization', 'Bearer my-secret-token');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});