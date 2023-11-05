import bodyParser from 'body-parser';
import express, { Express } from 'express';
import morgan from 'morgan';
import { startServer } from 'server';

import setupRoutes from './routers';

require('dotenv-flow').config();

const app: Express = express();
const port = process.env.PORT;

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = setupRoutes();
routes.forEach(({ path, router }) => {
  app.use(path, router);
});

startServer();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${port}`);
});
