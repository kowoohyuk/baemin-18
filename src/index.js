import express from "express";
import loginRouter from './routers/login-router.js';
import joinRouter from './routers/join-router.js';
const app = express();

app.set('views', 'src/views')
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.render('main', { title: '메인' }));
app.use('/login', loginRouter);
app.use('/join', joinRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});