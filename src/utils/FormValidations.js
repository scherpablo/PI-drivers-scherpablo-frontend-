const containsSymbols = (str) => {
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
  return symbolRegex.test(str);
};

const validateNotEmpty = (value) => {
  if (
    value.nombre === "" ||
    value.apellido === "" ||
    value.descripcion === "" ||
    value.nacionalidad === "" ||
    value.fecha_de_nacimiento === "" ||
    value.equipos === 0
  ) {
    alert("debes completar todos los campos");
    return false;
  }
  return true;
};

const validateName = (value) => {
  if (value.nombre.length < 3 || value.nombre.length > 15) {
    alert("mínimo 3 caracteres, máximo 15 para el nombre");
    return false;
  } else if (containsSymbols(value.nombre)) {
    alert("el nombre no puede contener símbolos");
    return false;
  }
  return true;
};

const validateLastName = (value) => {
  if (value.apellido.length < 5 || value.apellido.length > 25) {
    alert("apellido: mínimo 5 caracteres, máximo 25");
    return false;
  } else if (containsSymbols(value.apellido)) {
    alert("el apellido no puede contener símbolos");
    return false;
  }
  return true;
};

const validateDescription = (value) => {
  if (value.descripcion.length < 10 || value.descripcion.length > 100) {
    alert("descripción: mínimo 10 caracteres, máximo 100");
    return false;
  } else if (containsSymbols(value.descripcion)) {
    alert("la descripción no puede contener símbolos");
    return false;
  }
  return true;
};

const validateNationality = (value) => {
  if (value.nacionalidad.length < 5 || value.nacionalidad.length > 15) {
    alert("mínimo 5 caracteres, máximo 15 para la nacionalidad");
    return false;
  } else if (containsSymbols(value.nacionalidad)) {
    alert("la nacionalidad no puede contener símbolos");
    return false;
  }
  return true;
};

const validateDate = (value) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value.fecha_de_nacimiento)) {
    alert("utiliza el formato aaaa-mm-dd");
    return false;
  }
  return true;
};

const validateTeams = (value) => {
  const teamsRegex = /^\d+(,\d+)*$/;
  if (!teamsRegex.test(value.equipos.join(","))) {
    alert("utiliza números separados por comas sin espacios -  1,6,10,24");
    return false;
  }
  return true;
};

export {
  validateNotEmpty,
  validateName,
  validateLastName,
  validateDescription,
  validateNationality,
  validateDate,
  validateTeams,
};
