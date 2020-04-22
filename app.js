const { Server } = require('crudtastic');

const dbUrl =
  process.env.DATABASE_URL || 'postgres://localhost:5432/crudtastic-example';

const server = new Server({ dbUrl });

server.listen();
