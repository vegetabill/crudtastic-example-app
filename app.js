const { Server } = require('crudtastic');

const BooksController = require('./app/controllers/books-controller');

const dbUrl =
  process.env.DATABASE_URL ||
  'postgres://localhost:5432/crudtastic-example-app';

const server = new Server({ dbUrl });

// TODO auto-register controllers in folder
server.register(BooksController);

server.listen();
