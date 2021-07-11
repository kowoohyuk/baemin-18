interface IUserInfo {
  email: string;
  pwd: string;
  nickname: string;
  birth: string;
  phone: string;
  ageUp: string;
  privateInfo: string;
  smsReceive: string;
  token: string;
}

(function () {
  const resetInput = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const inputBlock = target.closest('.input-block') as HTMLElement;
    const inputBlockChildren = inputBlock.children[1] as HTMLInputElement;
    inputBlockChildren.value = '';
    inputBlockChildren.focus();
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

      const emailAlertTag = emailInputWrap.querySelector(
        '.alert-text'
      ) as HTMLParagraphElement;
      emailAlertTag.textContent = '올바른 이메일을 입력해주세요.';
      emailInputWrap.classList.add('alert');
      return false;
    }
  };

  const handleDuplicate = async (e: MouseEvent) => {
    e.preventDefault();
    if (emailValidation()) {
      duplicateBtn.classList.add('loading');
      const data = await fetch(`/join/email-check/${emailInput.value}`);
      const result = await data.json();
      setTimeout(() => {
        duplicateBtn.classList.remove('loading');
        if (Number(result.result) === 1) {
          const emailAlertTag = emailInputWrap.querySelector(
            '.alert-text'
          ) as HTMLParagraphElement;
          emailAlertTag.textContent = '중복된 이메일 입니다.';
          emailInputWrap.classList.remove('pass');
          emailInputWrap.classList.add('alert');
        } else {
          nicknameInputWrap.classList.remove('hidden');
          pwdInputWrap.classList.remove('hidden');
          birthInputWrap.classList.remove('hidden');
        }
      }, 1000);
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
    const sequenceStack: string[] = [];
    const sameStack: string[] = [];
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
    const date = new Date(year + '-' + month + '-' + '01');
    const tmpDate = new Date(
      new Date(date.setMonth(date.getMonth() + 1)).setDate(0)
    );
    return tmpDate.getDate() >= Number(day);
  };

  const handleKeyUpBirthInput = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
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
      if (typeof userInfo === 'boolean') return;
      joinUser(userInfo);
    }
  };

  const combineUserInfo = (): IUserInfo | boolean => {
    const phone = sessionStorage.getItem('phone');
    const agree = sessionStorage.getItem('agree');
    if (!phone || !agree) return false;

    const { ageUp, privateInfo, smsReceive } = JSON.parse(agree);

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

  const joinUser = (userInfo: IUserInfo) => {
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
  const duplicateBtn = document.querySelector(
    '.btn-duplicate'
  ) as HTMLButtonElement;
  const emailInputWrap = document.querySelector(
    '.input-email'
  ) as HTMLDivElement;
  const nicknameInputWrap = document.querySelector(
    '.input-nickname'
  ) as HTMLDivElement;
  const pwdInputWrap = document.querySelector('.input-pwd') as HTMLDivElement;
  const birthInputWrap = document.querySelector(
    '.input-birth'
  ) as HTMLDivElement;

  const emailInput = document.querySelector(
    '.input-email input'
  ) as HTMLInputElement;
  const nicknameInput = document.querySelector(
    '.input-nickname input'
  ) as HTMLInputElement;
  const pwdInput = document.querySelector(
    '.input-pwd input'
  ) as HTMLInputElement;
  const birthInput = document.querySelector(
    '.input-birth input'
  ) as HTMLInputElement;

  const submitBtn = document.querySelector('.submit') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev') as HTMLButtonElement;
  const form = document.querySelector('form') as HTMLFormElement;

  clearBtns.forEach((btn) =>
    btn.addEventListener('click', (e) => resetInput(e as MouseEvent))
  );

  duplicateBtn.addEventListener('click', handleDuplicate);
  birthInput.addEventListener('keyup', handleKeyUpBirthInput);
  emailInput.addEventListener('focusout', emailValidation);
  nicknameInput.addEventListener('focusout', nicknameValidation);
  pwdInput.addEventListener('focusout', pwdValidation);
  birthInput.addEventListener('focusout', birthValidation);

  submitBtn.addEventListener('click', submit);
  prevBtn.addEventListener('click', () => history.go(-1));
})();
