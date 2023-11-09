import { Link, useNavigate } from "react-router-dom";

import styles from "./CardComponent.module.css";

const CardComponent = ({ driver }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/detail/${driver.id}`);
  };

  let teamsToShow = [];

  if (driver.nombre) {
    const { nombre, apellido, imagen, Teams, fecha_de_nacimiento, nacionalidad } = driver;

    if (Teams) {
      teamsToShow = Teams.slice(0, 4);
    }

    const teamsNames = teamsToShow.map((team) => team.nombre);

    return (
      <div className={styles.cardComponent} onClick={handleDetailClick}>
        {imagen && imagen ? (
          <img className={styles.imageDriver} src={imagen} alt="" />
        ) : null}
        <h3 className={styles.nameDriver}>
        {nombre !== "" ? nombre : ""} <span className={styles.spanNameDriver}>{apellido ? apellido : ""}</span>
        </h3>
        <h3 className={styles.teamsDriver}>TEAMS: <span className={styles.spanTeamsDriver}>{teamsNames ? teamsNames.join(", ") : []}</span></h3>
        <h3 className={styles.dobDriver}>BIRTH: <span className={styles.spanDobDriver}>{fecha_de_nacimiento ? fecha_de_nacimiento : ""}</span></h3>
        <h3 className={styles.nationDriver}>NATIONALITY: <span className={styles.spanNationDriver}>{nacionalidad ? nacionalidad : ""}</span></h3>
      </div>
    );
  } else if (driver.id) {

    const { name, teams, image, dob, nationality } = driver;

    if (teams) {
      teamsToShow = teams.split(" ", 4).join(" ")
    }

    return (
      <div className={styles.cardComponent} onClick={handleDetailClick}>
        {image && image.url ? (
          <img className={styles.imageDriver} src={image.url} alt="" />
        ) : null}
        <h3 className={styles.nameDriver}>
          {name && name.forename ? name.forename : ""} <span className={styles.spanNameDriver}>{name && name.surname ? name.surname : ""}</span>
        </h3>
        <h3 className={styles.teamsDriver}>TEAMS: <span className={styles.spanTeamsDriver}>{ teamsToShow }</span></h3>
        <h3 className={styles.dobDriver}>BIRTH: <span className={styles.spanDobDriver}>{ dob ? dob : "" }</span></h3>
        <h3 className={styles.nationDriver}>NATIONALITY: <span className={styles.spanNationDriver}>{ nationality ? nationality : "" }</span></h3>
      </div>
    );
  } else {
    return null;
  }
};

export default CardComponent;

