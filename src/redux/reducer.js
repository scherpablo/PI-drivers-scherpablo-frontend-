import {
  LOGIN,
  POST_USER,
  GET_DRIVERS,
  GET_DRIVER_BY_ID,
  GET_DRIVER_DETAIL,
  GET_DRIVERS_BY_NAME,
  GET_DRIVERS_BY_TEAM,
  SORT_DRIVERS_BY_NAME,
  SORT_DRIVERS_BY_BIRTHDATE,
  CREATE_DRIVER,
  UPDATE_DRIVER,
  DELETE_DRIVER,
} from "./actionsTypes";

const initalState = {
  user: null,
  allDrivers: [],
  driverById: null,
  allDriversCopy: [],
  detailDriver: {},
  allTeams: [],
  setOrder: null,
  drivers: [],
};

const rootReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, user: payload };

    case POST_USER:
      return { ...state, user: payload };

    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: payload,
        allDriversCopy: payload,
        setOrder: null,
      };

    case GET_DRIVER_BY_ID:
      return { ...state, driverById: payload };

    case GET_DRIVER_DETAIL:
      return { ...state, detailDriver: payload };

    case GET_DRIVERS_BY_NAME:
      return { ...state, allDrivers: payload };

    case GET_DRIVERS_BY_TEAM:
      return { ...state, allDrivers: payload };

    case SORT_DRIVERS_BY_NAME:
      const isAscendingName = payload === "asc";
      const sortedDriversName = [...state.allDrivers].sort((a, b) => {
        let nameA, nameB;

        if (a.name) {
          nameA = `${a.name.forename} ${a.name.surname}`;
        } else {
          nameA = `${a.nombre} ${a.apellido}`;
        }
        if (b.name) {
          nameB = `${b.name.forename} ${b.name.surname}`;
        } else {
          nameB = `${b.nombre} ${b.apellido}`;
        }

        return isAscendingName
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      return {
        ...state,
        allDrivers: sortedDriversName,
        sortOrder: isAscendingName ? "name-asc" : "name-desc",
      };

    case SORT_DRIVERS_BY_BIRTHDATE:
      const isAscendingDob = payload === "asc";
      const sortedDriversDob = [...state.allDrivers].sort((a, b) => {
        let dobA, dobB;

        if (a.dob) {
          dobA = `${a.dob}`;
        } else {
          dobA = `${a.fecha_de_nacimiento}`;
        }
        if (b.dob) {
          dobB = `${b.dob}`;
        } else {
          dobB = `${b.fecha_de_nacimiento}`;
        }

        return isAscendingDob
          ? dobA.localeCompare(dobB)
          : dobB.localeCompare(dobA);
      });

      return {
        ...state,
        allDrivers: sortedDriversDob,
        sortOrder: isAscendingDob ? "birthdate-asc" : "birthdate-desc",
      };

    case CREATE_DRIVER:
      return { ...state, drivers: [...state.drivers, payload] };

    case UPDATE_DRIVER:
      const updatedDrivers = state.drivers.map((driver) => {
        if (driver.id === payload.id) {
          return payload;
        }
        return driver;
      });
      return {
        ...state,
        drivers: updatedDrivers,
      };

    case DELETE_DRIVER:
      const filteredDrivers = state.drivers.filter(
        (driver) => driver.id !== payload
      );
      return {
        ...state,
        drivers: filteredDrivers,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
