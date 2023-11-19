const validateEmail = (email) => {
  const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // const passwordRegex =
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
  // Esta es la expresión regular modificada para incluir la validación de un símbolo
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;
  return passwordRegex.test(password);
};

export { validateEmail, validatePassword };
