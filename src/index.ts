import startServer from 'server';

require('dotenv-flow').config();

global.ProductID = 'nutribot';

startServer({
  cors: {
    origin: [],
  },
  session: {
    secret: 'dev',
    store: process.env.DB_SRV ?? '',
  },
  port: process.env.PORT ?? '',
  databases: {
    Leagues_Management: {
      srv: process.env.DB_SRV ?? '',
      indexes: {
        users: {
          spec: { email: 1 },
        },
        teams: {
          spec: { year: 1 },
        },
      },
    },
  },
});
