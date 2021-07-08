import express from 'express';
import { auth } from '../middleware/auth.js'

const mainRouter = express.Router();

mainRouter.get('/', auth, (req, res) => {  
    res.render('main', { title: 'My배민' , nickname: req.user.nickname })
})

export default mainRouter;