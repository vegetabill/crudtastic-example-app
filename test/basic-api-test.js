const { Server } = require('crudtastic');
const request = require('supertest');
const should = require('should');

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

  it('DELETE books/1', () => {
    return app
      .delete('/books/1')
      .expect(200)
      .then(() => {
        return app.get('/books/1').expect(404);
      });
  });

  it('POST /books adds new book', () => {
    const book = {
      title: "Osito's Day Out",
      publicationDate: '2020-01-01T08:00:00.000Z',
      authorId: 2,
      coverImageUrl: 'http://bonito.org/book-cover.jpg',
      summary: 'A good read'
    };
    return app
      .post('/books')
      .send(book)
      .expect(201)
      .then((resp) => {
        const { body } = resp;
        body.should.containEql(book);
        return app.get(`/books/${body.id}`).expect(200);
      });
  });

  after(() => {
    process.exit(0);
  });
});
