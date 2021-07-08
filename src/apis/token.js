import jwt from 'jsonwebtoken';
import db from '../database/database.js'

const findByToken = (token, cb) => {

    jwt.verify(token,'secret', (err, decode) => {
        db.find({"_id":decode, "token":token}, (err, users) => {
            if(err) return cb(err);
            cb(null, users);
        })
    })
}

const generateToken = (_id,cb) => {
    const token =  jwt.sign(_id,'secret')
   
    db.update({ _id : _id} , { $set: { token : token } }, (err) => {
      if(err) return cb(err);
  
      db.find({ _id : _id}, (err,user) => {
        if(err) return cb(err);
        cb(null,user[0]);
      })
    })
  }

export { findByToken, generateToken }