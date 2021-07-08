import { findByToken } from '../apis/token.js'

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  findByToken(token, (err, users) => {
    if (err) return res.redirect('/error');
    if (users.length === 0) return res.render('main', { title: 'My배민' });

    const user = users[0];

    req.token = token;
    req.user = user;
  
    next();
  });
};

export { auth }

