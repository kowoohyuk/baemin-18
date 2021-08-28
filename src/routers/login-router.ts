import express from 'express';
import db from '../database/database';
import { generateToken } from '../apis/token';
import { comparePassword } from '../apis/pwd';
import { User } from '../types/User';
const loginRouter = express.Router();

loginRouter.get('/', (req, res) => res.render('login', { title: '로그인' }));

loginRouter.post('/', async (req, res) => {
  try {
    const users = await db.find<User>({ email: req.body.email });
    if (users.length === 0) return res.render('login', { title: '로그인' });
    let user = users[0];
    const isMatch = await comparePassword(req.body.pwd, user.pwd);
    if (!isMatch) return res.render('login', { title: '로그인' });

    user = await generateToken(user._id);

    res
      .cookie('w_auth', user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .redirect('/');
  } catch (err) {
    return res.redirect('/error');
  }
});

export default loginRouter;
