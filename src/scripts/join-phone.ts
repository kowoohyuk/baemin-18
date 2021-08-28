(function () {
  const resetInput = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const inputBlock = target.closest('.input-block') as HTMLElement;
    const inputBlockChildren = inputBlock.children[1] as HTMLInputElement;
    inputBlockChildren.value = '';
    inputBlockChildren.focus();
  };

  const getVerifyCode = () => {
    const number = Array(4)
      .fill(0)
      .map((_) => Math.floor(Math.random() * 10))
      .join('');
    verifyBtns.forEach((btn) => {
      btn.classList.add('loading');
    });
    setTimeout(() => {
      verifyInput.value = number;
      verifyBtns[1].classList.add('hidden');
      verifyBtns[0].classList.add('visible');
      verifyInputWrap.classList.remove('hidden');
      verifyBtns.forEach((btn) => {
        btn.classList.remove('loading');
      });
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
      isInputFulFilled();
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
      isInputFulFilled();
      return true;
    } else {
      verifyInputWrap.classList.remove('pass');
      verifyInputWrap.classList.add('alert');
      return false;
    }
  };

  const isInputFulFilled = () => {
    if (
      phoneInputWrap.classList.contains('pass') &&
      verifyInputWrap.classList.contains('pass')
    ) {
      nextBtn.classList.add('active');
    } else {
      nextBtn.classList.remove('active');
    }
  };

  const handleKeyUpPhoneInput = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value.replace(/[^\d]/g, '').slice(0, 11);
    target.value = value.replace(/^(.{3})(.+)(.{4})$/, '$1-$2-$3');
  };

  const nextPage = () => {
    if (
      phoneNumberValidation() &&
      verifyNumberValidation() &&
      nextBtn.classList.contains('active')
    ) {
      sessionStorage.setItem('phone', phoneInput.value);
      location.pathname = '/join/3';
    }
  };

  const clearBtns = document.querySelectorAll('.input-btns .btn-clear');
  const verifyBtns = document.querySelectorAll('.btn-verify');
  const phoneInputWrap = document.querySelector(
    '.input-phone'
  ) as HTMLDivElement;
  const verifyInputWrap = document.querySelector(
    '.input-verify'
  ) as HTMLDivElement;
  const phoneInput = document.querySelector(
    '.input-phone input'
  ) as HTMLInputElement;
  const verifyInput = document.querySelector(
    '.input-verify input'
  ) as HTMLInputElement;
  const nextBtn = document.querySelector('.next') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev') as HTMLButtonElement;

  clearBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => resetInput(e as MouseEvent));
  });

  verifyBtns.forEach((btn) =>
    btn.addEventListener(
      'click',
      () => phoneNumberValidation() && getVerifyCode()
    )
  );

  phoneInput.addEventListener('keyup', handleKeyUpPhoneInput);
  phoneInput.addEventListener('focusout', phoneNumberValidation);
  verifyInput.addEventListener('focusout', verifyNumberValidation);
  nextBtn.addEventListener('click', () => nextPage());
  prevBtn.addEventListener('click', () => history.go(-1));
})();
