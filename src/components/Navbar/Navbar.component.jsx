import { useLocation } from "react-router-dom";
import SearchBarComponent from "../SearchBar/SearchBar.component.jsx";
import PATHROUTES from "../../utils/PathRoutes.js";

import styles from "./NavbarComponent.module.css";

const NavbarComponent = () => {
  const { pathname } = useLocation();

  const is404ErrorPAge = pathname === PATHROUTES.ERROR;

  return (
    <div className={styles.navCoontainer}>
      {!is404ErrorPAge && <SearchBarComponent />}
    </div>
  );
};

export default NavbarComponent;
