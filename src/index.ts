import express from 'express';
import loginRouter from './routers/login-router';
import joinRouter from './routers/join-router';
import mainRouter from './routers/main-router';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();

const DEFAULT_PORT = 5000;

app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/public', express.static(path.join(__dirname, '../src', 'public')));
app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.get('/error', (req, res) => {
  res.render('error');
});

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
