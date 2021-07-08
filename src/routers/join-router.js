import express from 'express';

const joinRouter = express.Router();

joinRouter.get('/2', (req, res) => res.render('join-2', { title: '회원가입' }));
joinRouter.get('/3', (req, res) => res.render('join-3', { title: '회원가입' }));
joinRouter.get('/', (req, res) => res.render('join-1', { title: '회원가입' , leftbtn: 'X'}));

joinRouter.post('/', (req, res) => {
  // 회원가입 처리
});

export default joinRouter;
