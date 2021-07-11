(function () {
  const prevBtn = document.querySelector('.prev');
  prevBtn?.addEventListener('click', () => history.go(-1));
})();
