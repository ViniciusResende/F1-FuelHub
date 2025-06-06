import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { notFound, errorHandler } from './middlewares/error.middleware';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler); // must be last
