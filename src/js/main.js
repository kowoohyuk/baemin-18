(function () {
  const loginBtn = document.querySelector('.btn-login');
  loginBtn.addEventListener('click', () => (location.pathname = '/login'));

  localStorage.removeItem('agree');
  localStorage.removeItem('phone');
})();
