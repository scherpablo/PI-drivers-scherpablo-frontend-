import axios from "axios";
import {
  LOGIN,
  POST_USER,
  LOGOUT,
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

const loginUrl = import.meta.env.VITE_LOGIN_URL;
const registerUrl = import.meta.env.VITE_REGISTER_URL;
const driversUrl = import.meta.env.VITE_DRIVERS_URL;

const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(loginUrl, { email, password });

      if (data) {
        dispatch({
          type: LOGIN,
          payload: data,
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const postUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(registerUrl, { email, password });

      if (data) {
        dispatch({
          type: POST_USER,
          payload: data,
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
}

const getDrivers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(driversUrl);

      return dispatch({
        type: GET_DRIVERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getDriverById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${driversUrl}/${id}`);

      return dispatch({
        type: GET_DRIVER_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getDriverDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${driversUrl}/${id}`);
      return dispatch({
        type: GET_DRIVER_DETAIL,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getDriversByName = (queryName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${driversUrl}?name=${queryName}`);

      return dispatch({
        type: GET_DRIVERS_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getDriversByTeam = (team) => {
  return async (dispatch, getState) => {
    try {
      const searchTeamLower =
        team.charAt(0).toUpperCase() + team.slice(1).toLowerCase();

      const allDrivers = getState().allDrivers;

      const filteredApiDrivers = allDrivers.filter((driver) => {
        if (driver.teams) {
          const apiTeams = driver.teams.split(",").map((team) => team.trim());
          return apiTeams.includes(searchTeamLower);
        }
        return false;
      });

      const driversFromDb = allDrivers.filter((driver) => {
        if (driver.Teams) {
          return driver.Teams.some((team) => team.nombre === searchTeamLower);
        }
        return false;
      });

      const filteredDrivers = [...filteredApiDrivers, ...driversFromDb];

      if (Array.isArray(allDrivers)) {
        return dispatch({
          type: GET_DRIVERS_BY_TEAM,
          payload: filteredDrivers,
        });
      } else {
        console.log("El estado de allDrivers no es un arreglo válido");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const sortDriversByName = (order) => {
  return { type: SORT_DRIVERS_BY_NAME, payload: order };
};

const sortDriversByBirthdate = (order) => {
  return { type: SORT_DRIVERS_BY_BIRTHDATE, payload: order };
};

const createDriver = (driver) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(driversUrl, driver);
      return dispatch({
        type: CREATE_DRIVER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const updateDriver = (id, driver) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${driversUrl}/${id}`, driver);
      return dispatch({
        type: UPDATE_DRIVER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteDriver = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${driversUrl}/${id}`);
      return dispatch({
        type: DELETE_DRIVER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  login,
  postUser,
  logout,
  getDrivers,
  getDriverById,
  getDriverDetail,
  getDriversByName,
  getDriversByTeam,
  sortDriversByName,
  sortDriversByBirthdate,
  createDriver,
  updateDriver,
  deleteDriver,
};
