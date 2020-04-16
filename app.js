const { Server } = require('crudtastic');

const dbUrl =
  process.env.DATABASE_URL ||
  'postgres://localhost:5432/crudtastic-example-app';

const server = new Server({ dbUrl });

server.listen();
