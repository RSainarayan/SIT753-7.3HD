import request from 'supertest';
import app from '../src/app.js';

describe('API Smoke Tests', () => {
  it('GET /health should return ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('POST /api/orders should create and return an order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ item: 'Widget', quantity: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.item).toBe('Widget');
    expect(res.body.quantity).toBe(2);
  });

  it('GET /api/orders returns an array', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
