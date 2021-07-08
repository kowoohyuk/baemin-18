import express from 'express';

const joinRouter = express.Router();

joinRouter.get('/', (req, res) => res.render('join-1', { title: '회원가입' , leftbtn: 'X'}));
/* 수정 */

joinRouter.post('/', (req, res) => {
  // 회원가입 처리
});

export default joinRouter;