import { findByToken } from '../apis/token.js'

let auth = async (req, res, next) => {
  try{
    let token = req.cookies.w_auth;
    const users = await findByToken(token);
    
    if (users.length === 0) return res.render('main', { title: 'My배민' });
    
    const user = users[0];
    req.user = user;
    next();

  }catch(err){
    return res.redirect('/error');
  }
 
 
};

export { auth }

