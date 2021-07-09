import bcrypt from 'bcrypt';

const saltRounds = 10;

const comparePassword = async (plainPassword, hashPwd) => {
  try{
    const isMatch = await bcrypt.compare(plainPassword, hashPwd);
    return isMatch;
  }catch(err){
    return err;
  }
}

const pwdHash = async (user) => {
  try{
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.pwd, salt);
    user.pwd = hash;
    return;
  }catch(err){
    return err;
  }
}

export { comparePassword, pwdHash }