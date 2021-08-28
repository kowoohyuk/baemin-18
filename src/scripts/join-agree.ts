(function () {
  const handleCheckBox = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    target.classList.toggle('active');
    if (target.classList.contains('all-check')) {
      const isActive = target.classList.contains('active');
      agreeCheckBoxes.forEach((checkbox) => {
        isActive
          ? checkbox.classList.add('active')
          : checkbox.classList.remove('active');
      });
    }
    changeAllAgreeCheckBoxState();
    changeNextBtnState();
  };

  const changeAllAgreeCheckBoxState = () => {
    let checkedCount = -Number(allAgreeCheckBox.classList.contains('active'));
    agreeCheckBoxes.forEach(
      (checkbox) =>
        (checkedCount += Number(checkbox.classList.contains('active')))
    );
    if (checkedCount + 1 === agreeCheckBoxes.length) {
      allAgreeCheckBox.classList.add('active');
    } else {
      allAgreeCheckBox.classList.remove('active');
    }
  };

  const changeNextBtnState = () => {
    if (isPass()) {
      nextBtn.classList.add('active');
    } else {
      nextBtn.classList.remove('active');
    }
  };

  const changeFourTeenState = (type: string) => {
    if (type === 'up') {
      fourteenDownRadioBtn.classList.remove('active');
      fourteenUpRadioBtn.classList.add('active');
    } else {
      fourteenUpRadioBtn.classList.remove('active');
      fourteenDownRadioBtn.classList.add('active');
    }
  };

  const nextPage = () => {
    if (nextBtn.classList.contains('active') && isPass()) {
      sessionStorage.setItem('agree', JSON.stringify(getAgreeState()));
      location.pathname = '/join/2';
    }
  };

  const isPass = () =>
    agreeCheckBoxes[1].classList.contains('active') &&
    agreeCheckBoxes[2].classList.contains('active') &&
    agreeCheckBoxes[3].classList.contains('active');

  const getAgreeState = () => {
    const agree = {
      ageUp: 'F',
      privateInfo: 'F',
      smsReceive: 'F',
    };
    if (agreeCheckBoxes[4].classList.contains('active'))
      agree.privateInfo = 'T';
    if (agreeCheckBoxes[5].classList.contains('active')) agree.smsReceive = 'T';
    if (fourteenUpRadioBtn.classList.contains('active')) agree.ageUp = 'T';
    return agree;
  };

  const agreeCheckBoxes = document.querySelectorAll('.checklists__box');
  const allAgreeCheckBox = document.querySelector('.all-check') as HTMLElement;
  const fourteenUpRadioBtn = document.querySelector(
    '.fourteen__up'
  ) as HTMLElement;
  const fourteenDownRadioBtn = document.querySelector(
    '.fourteen__down'
  ) as HTMLElement;
  const nextBtn = document.querySelector('.btn-next') as HTMLElement;
  const prevBtn = document.querySelector('.prev') as HTMLElement;

  agreeCheckBoxes.forEach((checkbox) =>
    checkbox.addEventListener('click', (e) => handleCheckBox(e as MouseEvent))
  );
  fourteenUpRadioBtn.addEventListener('click', () => changeFourTeenState('up'));
  fourteenDownRadioBtn.addEventListener('click', () =>
    changeFourTeenState('down')
  );
  nextBtn.addEventListener('click', () => nextPage());
  prevBtn.addEventListener('click', () => history.go(-1));
})();
