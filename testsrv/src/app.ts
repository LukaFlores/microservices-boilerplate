import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@lukaflorestickets/common';
import { getGithubActivity } from './routes/new';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  }),
);

app.use(getGithubActivity);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
