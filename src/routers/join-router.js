import express from 'express';
import db from '../database/database.js'
import { pwdHash } from '../apis/pwd.js'

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
  
  db.find({ email : req.body.email }, (err, users) => {
    if(err) return res.redirect('/error');
    if(users.length > 0) return console.log('Email 중복!!');
    const userInfos = req.body;
    pwdHash(userInfos, (err) => {
      if(err) return res.redirect('/error');

      db.insert(userInfos, (err, newDoc) => {
        if(err) {
            return res.redirect('/error');
            // 에러처리 논의
        }
        console.log('save! ',newDoc);
        res.redirect('/login');
      });
    });
  });
});

export default joinRouter;


/*
  기본틀 작성!
  err 처리 및 리팩토링 토의 생각중..
*/