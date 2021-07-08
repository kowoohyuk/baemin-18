import Nedb from 'nedb';
import jwt from 'jsonwebtoken';

const db = new Nedb({
    filename : 'src/models/User.db', // DB 파일의 위치 및 이름
    autoload : true // DB 생성시 파일 로드
});

const findByToken = (token, cb) => {

    jwt.verify(token,'secret', (err, decode) => {
        db.find({"_id":decode, "token":token}, (err, users) => {
            if(err) return cb(err);
            cb(null, users);
        })
    })
}

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  findByToken(token, (err, users) => {
    if (err) return console.log(err);
    if (users.length === 0) res.redirect('/login');

    const user = users[0];
    
    req.token = token;
    req.user = user;
    
    next();
  });
};

module.exports = { auth };


