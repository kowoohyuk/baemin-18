import express from 'express';
import db from '../database/database.js';
import { generateToken } from '../apis/token.js';
import { comparePassword } from '../apis/pwd.js';
const loginRouter = express.Router();

loginRouter.get('/', (req, res) => res.render('login', { title: '로그인' }));

loginRouter.post('/', (req, res) => {
  // 로그인 처리

  // 데이터 검색
  db.find({ email: req.body.email }, (err, users) => {
    if (err) return res.redirect('/error');
    if (users.length === 0) return res.render('login', { title: '로그인' });

    const user = users[0];

    comparePassword(req.body.pwd, user.pwd, (err, isMatch) => {
      if (err) return res.redirect('/error');
      if (!isMatch) return res.render('login', { title: '로그인' });
      // 매치 시 isMatch is true

      generateToken(user._id, (err, user) => {
        if (err) return res.redirect('/error');
        res
          .cookie('w_auth', user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
          .status(200)
          .redirect('/'); // 닉네임인자전달가능?
      });
    });
  });
});

export default loginRouter;
