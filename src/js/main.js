(function () {
  const logout = async () => {
    const res = await fetch('/logout', { method: 'put' });
    const data = res.json();
    if (Number(data.result) === 1) {
      location.pathname = '/error';
    } else {
      location.pathname = '/';
    }
  };

  const loginBtn = document.querySelector('.btn-login');
  const logoutBtn = document.querySelector('.btn-logout');
  loginBtn &&
    loginBtn.addEventListener('click', () => (location.pathname = '/login'));
  logoutBtn &&
    logoutBtn.addEventListener('click', () => {
      logout();
    });
  sessionStorage.removeItem('agree');
  sessionStorage.removeItem('phone');
})();
