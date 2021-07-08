import express from 'express';

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

joinRouter.post('/', (req, res) => {
  // 회원가입 처리
});

export default joinRouter;
