(function () {
  const resetInput = (e) => {
    e.target.closest('.input-block').children[1].value = '';
    e.target.closest('.input-block').children[1].focus();
  };

  const getVerifyCode = () => {
    const number = Array(4)
      .fill(0)
      .map((_) => Math.floor(Math.random() * 10))
      .join('');
    setTimeout(() => {
      verifyInput.value = number;
      verifyBtns[1].classList.add('hidden');
      verifyBtns[0].classList.add('visible');
      verifyNumberValidation();
    }, 2000);
  };

  const verifyInputFilled = () => verifyInput.value.length === 4;
  const phoneNumberFilled = () =>
    phoneInput.value.length === 12 || phoneInput.value.length === 13;

  const phoneNumberValidation = () => {
    if (phoneNumberFilled() && phoneInput.value.slice(0, 3) === '010') {
      phoneInputWrap.classList.remove('alert');
      phoneInputWrap.classList.add('pass');
      return true;
    } else {
      phoneInputWrap.classList.remove('pass');
      phoneInputWrap.classList.add('alert');
      return false;
    }
  };

  const verifyNumberValidation = () => {
    if (verifyInputFilled()) {
      verifyInputWrap.classList.remove('alert');
      verifyInputWrap.classList.add('pass');
      return true;
    } else {
      verifyInputWrap.classList.remove('pass');
      verifyInputWrap.classList.add('alert');
      return false;
    }
  };

  const handleKeyUpPhoneInput = (e) => {
    const { target } = e;
    const value = target.value.replace(/[^\d]/g, '').slice(0, 11);
    target.value = value.replace(/^(.{3})(.+)(.{4})$/, '$1-$2-$3');
  };

  const nextPage = () => {
    if (phoneNumberValidation() && verifyNumberValidation()) {
      localStorage.setItem('phone', phoneInput.value);
      location.pathname = '/join/3';
    }
  };

  const clearBtns = document.querySelectorAll('.input-btns .btn-clear');
  const verifyBtns = document.querySelectorAll('.btn-verify');
  const phoneInputWrap = document.querySelector('.input-phone');
  const verifyInputWrap = document.querySelector('.input-verify');
  const phoneInput = document.querySelector('.input-phone input');
  const verifyInput = document.querySelector('.input-verify input');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  clearBtns.forEach((btn) => {
    btn.addEventListener('click', resetInput);
  });

  verifyBtns.forEach((btn) =>
    btn.addEventListener(
      'click',
      (e) => phoneNumberValidation() && getVerifyCode(e)
    )
  );

  phoneInput.addEventListener('keyup', handleKeyUpPhoneInput);
  phoneInput.addEventListener('focusout', phoneNumberValidation);
  verifyInput.addEventListener('focusout', verifyNumberValidation);
  nextBtn.addEventListener('click', () => nextPage());
  prevBtn.addEventListener('click', () => history.go(-1));
})();
