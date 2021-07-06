import express from 'express';

const joinRouter = express.Router();

joinRouter.get('/', (req, res) => res.render('join', { title: '회원가입' }));

joinRouter.post('/', (req, res) => {
  // 회원가입 처리
});

export default joinRouter;