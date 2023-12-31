//HOOKS
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//ACTIONS
import { getDrivers, logout } from "../../redux/actions";
//UTILS
import PATHROUTES from "../../utils/PathRoutes";
//STYLES
import styles from "./SearchBarComponent.module.css";

const SearchBarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allDrivers = useSelector((state) => state.drivers);

  const handleHomeClick = () => {
    dispatch(getDrivers(allDrivers));
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userData");
    navigate(PATHROUTES.LOGIN);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonsRow}>
        <Link to={PATHROUTES.ABOUT}>
          <button className={styles.buttonLogout}>Acerda de</button>
        </Link>
        <Link className={styles.link} to={PATHROUTES.CREATE}>
          <button className={styles.buttonRandom}>Crear - Editar</button>
        </Link>
        <Link to={PATHROUTES.HOME}>
          <button className={styles.buttonAdd} onClick={handleHomeClick}>
            Inicio
          </button>
        </Link>
          <button className={styles.buttonLogout} onClick={handleLogout}>
            Cerrar Sesion
          </button>
      </div>
    </div>
  );
};

export default SearchBarComponent;
