const getVerifyCode = () => {
  const number = Array(4)
    .fill(0)
    .map((_) => Math.floor(Math.random() * 10))
    .join('');
};

const verifyButtonHandler = () => {
  setTimeout(getVerifyCode, 2000);
};

const verifyButtons = document.querySelectorAll('.btn-verify');
verifyButtons.forEach((btn) =>
  btn.addEventListener('click', verifyButtonHandler)
);
