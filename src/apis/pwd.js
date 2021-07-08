import bcrypt from 'bcrypt';

const saltRounds = 10;

const comparePassword = (plainPassword, hashPwd, cb ) => {
    bcrypt.compare(plainPassword, hashPwd, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch)
    })
  }

const pwdHash = (user, cb) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err) return cb(err); // err 처리 고민
        bcrypt.hash(user.pwd, salt, (err, hash) => {
            if(err) return cb(err); // err 처리 고민
            user.pwd = hash
            cb(null); 
        })
    })
}

export { comparePassword, pwdHash }