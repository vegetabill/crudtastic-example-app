const { Server } = require('crudtastic');
const request = require('supertest');

describe('crudtastic REST API', () => {
  let app;
  before(() => {
    const dbUrl =
      process.env.DATABASE_URL ||
      'postgres://localhost:5432/crudtastic-example';

    const server = new Server({ dbUrl, logLevel: 'error', logBody: false });
    return server.mapResources().then(() => {
      app = request(server.app);
      return true;
    });
  });

  it('GET books index', () => {
    return app.get('/books').expect('Content-Type', /json/).expect(200);
  });
});
