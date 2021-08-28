import jwt from 'jsonwebtoken';
import db from '../database/database.js';
import { User } from '../types/User.js';

const findByToken = async (
  token: string,
  cb: (err: Error | null, users?: User[]) => void
) => {
  try {
    jwt.verify(token, 'secret', async (err, decode) => {
      const users = await db.find<User>({ _id: decode, token: token });
      cb(null, users);
    });
  } catch (err) {
    cb(err);
  }
};

const generateToken = async (_id: string) => {
  const token = jwt.sign(_id, 'secret');
  try {
    await db.update({ _id: _id }, { $set: { token: token } });
    const user = await db.find({ _id: _id });
    return user[0];
  } catch (err) {
    return err;
  }
};

export { findByToken, generateToken };
