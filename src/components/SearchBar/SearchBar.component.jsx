//HOOKS
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//ACTIONS
import { getDrivers } from "../../redux/actions";
//UTILS
import PATHROUTES from "../../utils/PathRoutes";
//STYLES
import styles from "./SearchBarComponent.module.css";

const SearchBarComponent = () => {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.drivers);

  const handleHomeClick = () => {
    dispatch(getDrivers(allDrivers));
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonsRow}>
        <Link to={PATHROUTES.ABOUT}>
          <button className={styles.buttonLogout}>About</button>
        </Link>
        <Link className={styles.link} to={PATHROUTES.CREATE}>
          <button className={styles.buttonRandom}>Create</button>
        </Link>
        <Link to={PATHROUTES.HOME}>
          <button className={styles.buttonAdd} onClick={handleHomeClick}>Home</button>
        </Link>
      </div>
      <div className={styles.buttonsRow}>
        <button className={styles.buttonLogout}>Logout</button>
      </div>
    </div>
  );
};

export default SearchBarComponent;
