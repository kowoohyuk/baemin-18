import express from 'express';
import Nedb from 'nedb';
import bcrypt from 'bcrypt';

const saltRounds = 10;

// DB 설정
const db = new Nedb({
    filename : 'src/models/User.db', // DB 파일의 위치 및 이름
    autoload : true // DB 생성시 파일 로드
});

const joinRouter = express.Router();

const pwdHash = (plaintext) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if(err) return console.log(err); // err 처리 고민
    
      bcrypt.hash(plaintext, salt, (err, hash) => {
          if(err) return console.log(err); // err 처리 고민
          return hash 
      })
    })
}

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

  // 저장할 파일 예제 (필요 속성들)
  // const userInfo = {
  //   email : 'jiho@naver.com',
  //   pwd : '1234',
  //   nickname : 'jiho',
  //   birth : '19950509',
  //   phone : '010-3212-1664',
  //   ageUp : T,
  //   privateInfo : T,
  //   smsReceive : T,
  //   token : ''
  // };

  /*
    --- 중복성 추가 ---
    함수 api로 뺄지 밑으로 뺄지
  */
  db.find({ email : req.body.email }, (err, users) => {
    if(err) return console.log(err);
    if(users.length > 0) return console.log('Email 중복!!');
    
    const userInfo = req.body;
    req.body.pwd = pwdHash(req.body.pwd);
    
    // 데이터 저장
    db.insert(userInfo, (err, newDoc) => {
      if(err) {
          return console.log(err);
          // alert 를 이용한 에러문구 생성 ?! 에러처리 논의
      }
      console.log('save! ',newDoc);
      res.redirect('/login');
    });
  });
  
});

export default joinRouter;


/*
  기본틀 작성!
  err 처리 및 리팩토링 토의 생각중..
*/