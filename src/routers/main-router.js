import express from 'express';
import { auth } from '../middleware/auth.js';
import db from '../database/database.js';

const mainRouter = express.Router();

mainRouter.get('/', auth, (req, res) => {  
    res.render('main', { title: 'My배민' , nickname: req.user.nickname })
})

mainRouter.get("/logout", auth, (req, res) => {
    db.update({ _id: req.user._id }, { token: "" }, (err) => {
        if (err) return res.redirect('/error');
        return res.render('main', { title: 'My배민' })
  });
});

export default mainRouter;