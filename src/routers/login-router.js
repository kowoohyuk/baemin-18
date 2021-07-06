import express from 'express';

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => res.render('login', { title: '로그인' }));

loginRouter.post('/', (req, res) => {
  // 로그인 처리
});

export default loginRouter;