import express from 'express';
import loginRouter from './routers/login-router.js';
import joinRouter from './routers/join-router.js';
import mainRouter from './routers/main-router.js';
import path from 'path';
import cookieParser from "cookie-parser"

const app = express();
const __dirname = path.resolve();

app.use('/js', express.static(path.join(__dirname, 'src', 'js')));
app.use('/public', express.static(path.join(__dirname, 'src', 'public')));
app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.get('/error',  (req, res) => { res.render('error') })

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
