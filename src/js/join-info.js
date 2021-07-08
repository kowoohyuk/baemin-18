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
    for (const str of strings) {
      if (/[A-Z]/.test(str)) type.upper = true;
      else if (/[a-z]/.test(str)) type.lower = true;
      else if (/\d/.test(str)) type.number = true;
    }
    if (Number(type.upper) + Number(type.lower) + Number(type.number) > 1)
      return true;
    return false;
  };
  // 추가 기능
  // 같은 숫자 혹은 연속된 숫자를 3개 이상 입력할 수 없습니다.
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

  const submit = async () => {
    if (
      emailValidation() &&
      nicknameValidation() &&
      pwdValidation() &&
      birthValidation()
    ) {
      const userInfo = combineUserInfo();
      if (!userInfo) return;
      const result = await joinUser(userInfo);
      if (result) location.pathname = '/';
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

  const joinUser = async (userInfo) => {
    const data = await fetch('/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    const result = data.json();
    return false;
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

  clearBtns.forEach((btn) => btn.addEventListener('click', resetInput));

  // 중복체크 보류
  duplicateBtn.addEventListener('click', () => {});
  birthInput.addEventListener('keyup', handleKeyUpBirthInput);
  emailInput.addEventListener('focusout', emailValidation);
  nicknameInput.addEventListener('focusout', nicknameValidation);
  pwdInput.addEventListener('focusout', pwdValidation);
  birthInput.addEventListener('focusout', birthValidation);

  submitBtn.addEventListener('click', submit);
  prevBtn.addEventListener('click', () => history.go(-1));
})();
