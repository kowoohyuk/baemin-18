(function () {
  const loginBtn = document.querySelector('.btn-login');
  const logoutBtn = document.querySelector('.btn-logout');
  loginBtn &&
    loginBtn.addEventListener('click', () => (location.pathname = '/login'));
  logoutBtn &&
    logoutBtn.addEventListener('click', () => (location.pathname = '/logout'));
  localStorage.removeItem('agree');
  localStorage.removeItem('phone');
})();
