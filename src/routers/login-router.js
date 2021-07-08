import express from 'express';
import Nedb from 'nedb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// DB 설정
const db = new Nedb({
    filename : 'src/models/User.db', // DB 파일의 위치 및 이름
    autoload : true // DB 생성시 파일 로드
});

const loginRouter = express.Router();

const comparePassword = (plainPassword, hashPwd, cb ) => {
  bcrypt.compare(plainPassword, hashPwd, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch)
  })
}

const generateToken = (_id,cb) => {
  const token =  jwt.sign(_id.toHexString(),'secret')
 
  db.update({ _id : _id} , { $set: { token : token } }, (err,user) =>{
    if(err) return cb(err)
    console.log('token확인',user);
    cb(null, user);
  })
}

loginRouter.get('/', (req, res) => res.render('login', { title: '로그인' }));

loginRouter.post('/', (req, res) => {
  // 로그인 처리

  // 데이터 검색
  db.find({ email : req.body.email }, (err, users) => {
    if(err) return console.log(err);
    if(users.length === 0) return console.log('없는 유저');
    
    const user = users[0];
    
    comparePassword(req.body.pwd, user.pwd, (err, isMatch) => {
      if(err) return console.log(err);
      if(!isMatch) return console.log("비밀번호를 확인해주세요");
      console.log('what value',isMatch);
    
      generateToken(user._id, (err, user) => {
        if (err) return console.log(err);

        res.cookie("w_auth", user.token , { httpOnly: true ,  secure: process.env.NODE_ENV === 'production'  })
            .status(200)
            .redirect('/') // 닉네임인자전달가능?
      });
    })
  })
});


export default loginRouter;