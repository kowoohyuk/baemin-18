import express from 'express';
import db from '../database/database.js';
import { pwdHash } from '../apis/pwd.js';

const joinRouter = express.Router();

joinRouter.get('/', (req, res) =>
  res.render('join-agree', { title: '회원가입' })
);
joinRouter.get('/2', (req, res) =>
  res.render('join-phone', { title: '회원가입' })
);
joinRouter.get('/3', (req, res) =>
  res.render('join-info', { title: '회원가입' })
);

joinRouter.get('/email-check/:email', async (req, res) => {
  try {
    const users = await db.find({ email: req.params.email });
    if (users.length > 0) {
      return res.json({
        result: 1,
      });
    }
    return res.json({
      result: 0,
    });
  } catch (err) {
    return res.json({
      result: 1,
    });
  }
});

joinRouter.post('/', async (req, res) => {
  // 회원가입 처리

  try {
    const users = await db.find({ email: req.body.email });
    if (users.length > 0) throw new Error();
    const userInfos = req.body;
    await pwdHash(userInfos);
    await db.insert(userInfos);
    res.redirect('/login');
  } catch (err) {
    return res.redirect('/error');
  }
});

export default joinRouter;
