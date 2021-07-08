(function () {
  const resetInput = (e) => {
    e.target.closest('.input-block').children[1].value = '';
    e.target.closest('.input-block').children[1].focus();
  };

  const emailValidation = () => {
    // 이메일 정규표현식 출처
    // https://epthffh.tistory.com/entry/비밀번호-정규식 [물고기 개발자의 블로그]
    if (
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
        emailInput.value
      )
    ) {
      emailInputWrap.classList.remove('alert');
      emailInputWrap.classList.add('pass');
      return true;
    } else {
      emailInputWrap.classList.remove('pass');
      emailInputWrap.classList.add('alert');
      return false;
    }
  };

  const nicknameValidation = () => {
    if (nicknameInput.value !== '') {
      nicknameInputWrap.classList.remove('alert');
      nicknameInputWrap.classList.add('pass');
      return true;
    } else {
      nicknameInputWrap.classList.remove('pass');
      nicknameInputWrap.classList.add('alert');
      return false;
    }
  };

  const checkPwdWord = () => {
    const strings = pwdInput.value.split('');
    if (strings.length < 10) return false;
    const type = {
      upper: false,
      lower: false,
      number: false,
    };
    const sequenceStack = [];
    const sameStack = [];
    for (const str of strings) {
      if (/[A-Z]/.test(str)) type.upper = true;
      else if (/[a-z]/.test(str)) type.lower = true;
      else if (/\d/.test(str)) type.number = true;

      if (Number(sequenceStack[sequenceStack.length - 1]) + 1 === Number(str)) {
        sequenceStack.push(str);
        if (sequenceStack.length === 3) return false;
      } else {
        while (sequenceStack.length && sequenceStack.pop()) {}
        sequenceStack.push(str);
      }
      if (sameStack[sameStack.length - 1] === str) {
        sameStack.push(str);
        if (sameStack.length === 3) return false;
      } else {
        while (sameStack.length && sameStack.pop()) {}
        sameStack.push(str);
      }
    }
    if (Number(type.upper) + Number(type.lower) + Number(type.number) > 1)
      return true;
    return false;
  };
  const pwdValidation = () => {
    if (checkPwdWord()) {
      pwdInputWrap.classList.remove('alert');
      pwdInputWrap.classList.add('pass');
      return true;
    } else {
      pwdInputWrap.classList.remove('pass');
      pwdInputWrap.classList.add('alert');
      return false;
    }
  };

  const birthValidation = () => {
    if (checkBirthWord()) {
      birthInputWrap.classList.remove('alert');
      birthInputWrap.classList.add('pass');
      return true;
    } else {
      birthInputWrap.classList.remove('pass');
      birthInputWrap.classList.add('alert');
      return false;
    }
  };

  const checkBirthWord = () => {
    if (birthInput.value.length !== 10) return false;
    const [year, month, day] = birthInput.value.split('.');
    if (Number(month) < 1 || Number(month) > 12 || Number(day) < 1) {
      return false;
    }
    const date = new Date(new Date(year + '-' + month + '-' + '01').setDate(0));
    return date.getDate() >= Number(day);
  };

  const handleKeyUpBirthInput = (e) => {
    const { target } = e;
    const value = target.value.replace(/[^\d]/g, '').slice(0, 11);
    target.value = value.replace(/^(.{4})(.{2})(.{2})$/, '$1.$2.$3');
  };

  const submit = () => {
    if (
      emailValidation() &&
      nicknameValidation() &&
      pwdValidation() &&
      birthValidation()
    ) {
      const userInfo = combineUserInfo();
      if (!userInfo) return;
      joinUser(userInfo);
    }
  };

  const combineUserInfo = () => {
    const phone = localStorage.getItem('phone');
    if (!phone || !localStorage.getItem('agree')) return false;

    const { ageUp, privateInfo, smsReceive } = JSON.parse(
      localStorage.getItem('agree')
    );

    return {
      email: emailInput.value,
      pwd: pwdInput.value,
      nickname: nicknameInput.value,
      birth: birthInput.value,
      phone,
      ageUp,
      privateInfo,
      smsReceive,
      token: '',
    };
  };

  const joinUser = (userInfo) => {
    form.insertAdjacentHTML(
      'beforeend',
      `
      <input type="hidden" name="phone" value="${userInfo.phone}"/>
      <input type="hidden" name="ageUp" value="${userInfo.ageUp}"/>
      <input type="hidden" name="privateInfo" value="${userInfo.privateInfo}"/>
      <input type="hidden" name="smsReceive" value="${userInfo.smsReceive}"/>
      <input type="hidden" name="token" value="${userInfo.token}"/>
    `
    );
    form.submit();
  };
  const clearBtns = document.querySelectorAll('.input-btns .btn-clear');
  const duplicateBtn = document.querySelector('.btn-duplicate');
  const emailInputWrap = document.querySelector('.input-email');
  const nicknameInputWrap = document.querySelector('.input-nickname');
  const pwdInputWrap = document.querySelector('.input-pwd');
  const birthInputWrap = document.querySelector('.input-birth');

  const emailInput = document.querySelector('.input-email input');
  const nicknameInput = document.querySelector('.input-nickname input');
  const pwdInput = document.querySelector('.input-pwd input');
  const birthInput = document.querySelector('.input-birth input');

  const submitBtn = document.querySelector('.submit');
  const prevBtn = document.querySelector('.prev');
  const form = document.querySelector('form');

  clearBtns.forEach((btn) => btn.addEventListener('click', resetInput));

  duplicateBtn.addEventListener('click', (e) => e.preventDefault());
  birthInput.addEventListener('keyup', handleKeyUpBirthInput);
  emailInput.addEventListener('focusout', emailValidation);
  nicknameInput.addEventListener('focusout', nicknameValidation);
  pwdInput.addEventListener('focusout', pwdValidation);
  birthInput.addEventListener('focusout', birthValidation);

  submitBtn.addEventListener('click', submit);
  prevBtn.addEventListener('click', () => history.go(-1));
})();
