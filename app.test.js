const request = require('supertest');
const app = require('./server.js');
//import('./jest.config').Config;

describe('GET /api/electrics', () => {
  it('responds with json', async () => {
    const response = await request(app).GET('/api/electrics');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
  });
});

describe('GET /api/electrics/count', () => {
  it('responds with json', async () => {
    const response = await request(app).GET('/api/electrics/count');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
  });
});

describe('GET /api/electrics/:id', () => {
  it('responds with json', async () => {
    const response = await request(app).GET('/api/electrics/1');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
  });
});

describe('POST /api/electrics/create', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .POST('/api/electrics/create')
      .send({
        station: 'Test Station',
        typestaion: 'Test Type Station',
        facility: 'Test Facility',
        startdate: '2023-03-20 00:00:00',
        enddate: '2023-03-20 01:00:00',
        detail: 'Test Detail',
        users: 'Test User',
        downtime: 'ออกอากาศปกติ'
      });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
  });
});

describe('PUT /api/electrics/update', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .PUT('/api/electrics/update')
      .send({
        id: 1,
        station: 'ทับสะแก',
        typestaion: 'เสริม',
        facility: 'สสท.',
        startdate: '2023-03-20 00:00:00',
        enddate: '2023-03-20 01:00:00',
        detail: 'Updated Test Detail',
        users: 'นายสิทธิชัย มากวิสัย',
        downtime: 'ออกอากาศปกติ'
      });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
  });
});

describe('DELETE /api/electrics/delete', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .DELETE('/api/electrics/delete')
      .send({ id: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
  });
});
