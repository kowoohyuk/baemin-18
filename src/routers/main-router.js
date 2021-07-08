import express from 'express';
import { auth } from '../middleware/auth.js';
import db from '../database/database.js';

const mainRouter = express.Router();

mainRouter.get('/', auth, (req, res) => {
  res.render('main', { title: 'My배민', nickname: req.user.nickname });
});

mainRouter.put('/logout', auth, (req, res) => {
  db.update({ _id: req.user._id }, { $set: { token: '' } }, (err) => {
    if (err)
      return res.json({
        result: 1,
      });
    return res.json({
      result: 0,
    });
  });
});

export default mainRouter;
