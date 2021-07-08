(function () {
  const submit = () => emailValidation() && pwdValidation() && form.submit();

  const emailValidation = () => {
    if (emailInput.value.length) {
      emailInputWrap.classList.remove('alert');
      return true;
    }
    emailInputWrap.classList.add('alert');
    return false;
  };

  const pwdValidation = () => {
    if (pwdInput.value.length) {
      pwdInputWrap.classList.remove('alert');
      return true;
    }
    pwdInputWrap.classList.add('alert');
    return false;
  };

  const loginBtn = document.querySelector('.btn-login');
  const emailInputWrap = document.querySelector('.input-email');
  const pwdInputWrap = document.querySelector('.input-pwd');
  const emailInput = document.querySelector('.input-email input');
  const pwdInput = document.querySelector('.input-pwd input');
  const form = document.querySelector('form');

  emailInput.addEventListener('focusout', emailValidation);
  pwdInput.addEventListener('focusout', pwdValidation);
  loginBtn.addEventListener('click', submit);
})();
