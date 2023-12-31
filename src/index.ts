import 'server/firebase';

import startServer from 'server';

require('dotenv-flow').config();

global.ProductID = 'nutribot';

startServer({
  cors: {
    origin: [],
  },
  // session: {
  //   secret: 'dev',
  //   store: process.env.DB_SRV ?? '',
  // },
  port: process.env.PORT ?? '',
  databases: {
    Leagues_Management: {
      srv: process.env.DB_SRV ?? '',
      indexes: {
        users: {
          spec: { email: 1 },
        },
        players: {
          spec: { team: 1 },
        },
        matches: {
          spec: { league: 1 },
        },
        events: {
          spec: { match: 1 },
        },
        comments: {
          spec: { path: 1 },
        },
      },
    },
  },
});
