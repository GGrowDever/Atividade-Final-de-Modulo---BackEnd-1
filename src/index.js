import express from 'express';
import cors from 'cors';

import usersRouter from './routes/users';
import notesRouter from './routes/notes';

const app = express();

app.use(express.json());

app.use(cors());

// const corsOptions = {
//      origin: 'http://localhost:3333'
// }

app.use('/users', usersRouter);
app.use('/notes', notesRouter);

app.listen(3333, console.log('Servidor iniciado na porta 3333 !!!'));
