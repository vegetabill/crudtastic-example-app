const { Server } = require('crudtastic');

const BooksController = require('./app/controllers/books-controller');
const Book = require('./app/models/book');

const dbUrl =
  process.env.DATABASE_URL ||
  'postgres://localhost:5432/crudtastic-example-app';

const server = new Server({ dbUrl });

server.register(BooksController, Book);

server.listen();
